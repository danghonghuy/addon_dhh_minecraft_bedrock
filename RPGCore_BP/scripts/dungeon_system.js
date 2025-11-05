// --- START OF FILE dungeon_system.js ---

import { world, system, ItemStack, EntityComponentTypes, BlockPermutation, EffectTypes, BlockVolume } from "@minecraft/server";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";
import { Vector } from "./skills/vector.js";
import { CONFIG } from "./config.js";
import { getPlayerStats } from "./main.js";

const GUIDE_NPC_TAG = "dhh:dungeon_guide";
const NPC_LIFETIME_SECONDS = 300;
const DUNGEON_MOB_TAG = "dungeon_mob";
export const activeDungeons = new Map();

function removeOldGuide(player) {
    const oldGuides = player.dimension.getEntities({ tags: [`${GUIDE_NPC_TAG}_${player.nameTag}`] });
    for (const guide of oldGuides) {
        if (guide.isValid) guide.kill();
    }
}

function summonDungeonGuide(player) {
    removeOldGuide(player);
    const viewDir = player.getViewDirection();
    const spawnPos = { x: player.location.x + viewDir.x * 2, y: player.location.y, z: player.location.z + viewDir.z * 2 };
    const guideNpc = player.dimension.spawnEntity("minecraft:armor_stand", spawnPos);
    guideNpc.nameTag = "§e§lNgười Dẫn Lối\n§7(Tương tác để bắt đầu)";
    guideNpc.addTag(GUIDE_NPC_TAG);
    guideNpc.addTag(`${GUIDE_NPC_TAG}_${player.nameTag}`);
    try {
        const equippable = guideNpc.getComponent(EntityComponentTypes.Equippable);
        if (equippable) {
            equippable.setEquipment("Mainhand", new ItemStack("minecraft:diamond_sword"));
            equippable.setEquipment("Head", new ItemStack("minecraft:diamond_helmet"));
            equippable.setEquipment("Chest", new ItemStack("minecraft:diamond_chestplate"));
            equippable.setEquipment("Legs", new ItemStack("minecraft:diamond_leggings"));
            equippable.setEquipment("Feet", new ItemStack("minecraft:diamond_boots"));
        }
        const resistance = EffectTypes.get("resistance");
        const glowing = EffectTypes.get("glowing");
        if (resistance) guideNpc.addEffect(resistance, 20000000, { amplifier: 255, showParticles: false });
        if (glowing) guideNpc.addEffect(glowing, 20000000, { amplifier: 0, showParticles: false });
        const particleInterval = system.runInterval(() => {
            if (!guideNpc.isValid) { system.clearRun(particleInterval); return; }
            try { guideNpc.dimension.spawnParticle("minecraft:totem_particle", { x: guideNpc.location.x, y: guideNpc.location.y + 1, z: guideNpc.location.z }); }
            catch (e) { system.clearRun(particleInterval); }
        }, 20);
    } catch (e) { console.error(`[Dungeon] Failed to setup NPC: ${e}`); }
    system.runTimeout(() => { if (guideNpc.isValid) guideNpc.kill(); }, NPC_LIFETIME_SECONDS * 20);
    return guideNpc;
}

function generateDungeonLayout(startX, startY, startZ, numRooms) {
    const rooms = [];
    const roomSize = { width: 11, height: 6 };
    const directions = [{ x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 }];
    const occupied = new Set([`${startX},${startZ}`]);
    
    const roomTemplates = ['library', 'dining_hall', 'jail', 'mob', 'mob'];
    rooms.push({ x: startX, y: startY, z: startZ, type: 'start' });

    while (rooms.length < numRooms) {
        let createdRoom = false;
        const potentialOrigins = [...rooms].sort(() => 0.5 - Math.random());
        for (const originRoom of potentialOrigins) {
            const shuffledDirections = [...directions].sort(() => 0.5 - Math.random());
            for (const dir of shuffledDirections) {
                const newX = originRoom.x + dir.x * (roomSize.width + 5);
                const newZ = originRoom.z + dir.z * (roomSize.width + 5);
                const newKey = `${newX},${newZ}`;
                if (!occupied.has(newKey)) {
                    let type;
                    if (rooms.length === numRooms - 1) {
                        type = 'boss';
                    } else if (Math.random() < 0.2) {
                        type = 'treasure';
                    } else {
                        type = roomTemplates[Math.floor(Math.random() * roomTemplates.length)];
                    }
                    rooms.push({ x: newX, y: startY, z: newZ, type, from: originRoom });
                    occupied.add(newKey);
                    createdRoom = true;
                    break;
                }
            }
            if (createdRoom) break;
        }
        if (!createdRoom) break;
    }
    return rooms;
}

async function decorateLibrary(dimension, room, size) {
    const BOOKSHELF = BlockPermutation.resolve("minecraft:bookshelf");
    const fromY = room.y + 1;
    for (let i = 2; i < size.width - 2; i++) {
        dimension.setBlockPermutation({x: room.x - Math.floor(size.width/2) + i, y: fromY, z: room.z - Math.floor(size.width/2) + 2}, BOOKSHELF);
        dimension.setBlockPermutation({x: room.x - Math.floor(size.width/2) + i, y: fromY + 1, z: room.z - Math.floor(size.width/2) + 2}, BOOKSHELF);
    }
}

async function decorateDiningHall(dimension, room, size, materials) {
    const CARPET = BlockPermutation.resolve(materials.carpet);
    const FENCE = BlockPermutation.resolve(materials.log);
    const y = room.y + 1;
    for (let i = 2; i < size.width - 2; i++) {
        dimension.setBlockPermutation({x: room.x - Math.floor(size.width/2) + i, y: y, z: room.z}, FENCE);
        dimension.setBlockPermutation({x: room.x - Math.floor(size.width/2) + i, y: y + 1, z: room.z}, CARPET);
    }
}

async function decorateJail(dimension, room, size) {
    const IRON_BARS = BlockPermutation.resolve("minecraft:iron_bars");
    const y = room.y + 1;
    await dimension.fillBlocks(new BlockVolume({x: room.x, y: y, z: room.z - 3}, {x: room.x, y: y + 2, z: room.z + 3}), IRON_BARS);
}

async function buildDungeonFromLayout(dimension, rooms, player) {
    const originalBlocks = new Map();
    const getAndCacheBlock = (location) => {
        const key = `${location.x},${location.y},${location.z}`; if (originalBlocks.has(key)) return;
        try { const block = dimension.getBlock(location); if (block) originalBlocks.set(key, { location, permutation: block.permutation }); } catch (e) {}
    };
    const fillAndCacheVolume = async (dim, from, to, perm) => {
        const minX = Math.min(from.x, to.x); const maxX = Math.max(from.x, to.x);
        const minY = Math.min(from.y, to.y); const maxY = Math.max(from.y, to.y);
        const minZ = Math.min(from.z, to.z); const maxZ = Math.max(from.z, to.z);
        for (let x = minX; x <= maxX; x++) for (let y = minY; y <= maxY; y++) for (let z = minZ; z <= maxZ; z++) getAndCacheBlock({ x, y, z });
        await dim.fillBlocks(new BlockVolume(from, to), perm);
    };

    const roomSize = { width: 11, height: 6 };
    const halfW = Math.floor(roomSize.width / 2);
    const dungeonId = activeDungeons.get(player.nameTag)?.dungeonId;
    const dungeonConfig = CONFIG.DUNGEON_CONFIG[dungeonId];
    if (!dungeonConfig) {
        player.sendMessage("§cLỗi: Không tìm thấy cấu hình cho dungeon này!");
        return [];
    }
    const materials = dungeonConfig.materials;
    
    const BEDROCK = BlockPermutation.resolve("minecraft:bedrock");
    const AIR = BlockPermutation.resolve("minecraft:air");
    const CHEST = BlockPermutation.resolve("minecraft:chest");
    const TORCH = BlockPermutation.resolve("minecraft:torch");
    const PLANK = BlockPermutation.resolve(materials.plank);
    const STONE = BlockPermutation.resolve(materials.stone);

    // Gộp lại thành một vòng lặp duy nhất để đảm bảo sự ổn định
    for (const room of rooms) {
        // Xây phòng
        const from = { x: room.x - halfW, y: room.y, z: room.z - halfW };
        const to = { x: room.x + halfW, y: room.y + roomSize.height - 1, z: room.z + halfW };
        
        await fillAndCacheVolume(dimension, from, to, BEDROCK);
        
        const innerFrom = { x: from.x + 1, y: from.y + 1, z: from.z + 1 };
        const innerTo = { x: to.x - 1, y: to.y - 1, z: to.z - 1 };

        await fillAndCacheVolume(dimension, {x:innerFrom.x, y: from.y+1, z:innerFrom.z}, {x:innerTo.x, y:from.y+1, z:innerTo.z}, PLANK);
        await fillAndCacheVolume(dimension, {x:innerFrom.x, y: to.y-1, z:innerFrom.z}, {x:innerTo.x, y:to.y-1, z:innerTo.z}, PLANK);
        await fillAndCacheVolume(dimension, {x: innerFrom.x, y: innerFrom.y, z: innerFrom.z}, {x: innerTo.x, y: innerTo.y-1, z: innerFrom.z}, STONE);
        await fillAndCacheVolume(dimension, {x: innerFrom.x, y: innerFrom.y, z: innerTo.z}, {x: innerTo.x, y: innerTo.y-1, z: innerTo.z}, STONE);
        await fillAndCacheVolume(dimension, {x: innerFrom.x, y: innerFrom.y, z: innerFrom.z}, {x: innerFrom.x, y: innerTo.y-1, z: innerTo.z}, STONE);
        await fillAndCacheVolume(dimension, {x: innerTo.x, y: innerFrom.y, z: innerFrom.z}, {x: innerTo.x, y: innerTo.y-1, z: innerTo.z}, STONE);
        await fillAndCacheVolume(dimension, {x:innerFrom.x+1, y:innerFrom.y, z:innerFrom.z+1}, {x:innerTo.x-1, y:innerTo.y-1, z:innerTo.z-1}, AIR);
        
        const torchY = innerFrom.y + 2;
        dimension.setBlockPermutation({ x: innerFrom.x + 1, y: torchY, z: innerFrom.z + 1 }, TORCH);
        dimension.setBlockPermutation({ x: innerTo.x - 1, y: torchY, z: innerFrom.z + 1 }, TORCH);
        dimension.setBlockPermutation({ x: innerFrom.x + 1, y: torchY, z: innerTo.z - 1 }, TORCH);
        dimension.setBlockPermutation({ x: innerTo.x - 1, y: torchY, z: innerTo.z - 1 }, TORCH);
        dimension.setBlockPermutation({ x: room.x, y: torchY, z: from.z + 1 }, TORCH); // Đuốc giữa tường phía Bắc
        dimension.setBlockPermutation({ x: room.x, y: torchY, z: to.z - 1 }, TORCH);   // Đuốc giữa tường phía Nam
        dimension.setBlockPermutation({ x: from.x + 1, y: torchY, z: room.z }, TORCH); // Đuốc giữa tường phía Tây
        dimension.setBlockPermutation({ x: to.x - 1, y: torchY, z: room.z }, TORCH);   // Đuốc giữa tường phía Đông

        // Trang trí phòng (gọi lại các hàm đã bị bỏ quên)
        switch (room.type) {
            case 'treasure':
                dimension.setBlockPermutation({ x: room.x, y: room.y + 1, z: room.z }, CHEST);
                break;
            case 'library':
                await decorateLibrary(dimension, room, roomSize);
                break;
            case 'dining_hall':
                await decorateDiningHall(dimension, room, roomSize, materials);
                break;
            case 'jail':
                await decorateJail(dimension, room, roomSize);
                break;
        }

        // Xây hành lang nối với phòng trước đó
        if (room.from) {
            const prevRoom = room.from;
            const y = room.y;
            const startPos = {x: prevRoom.x, y, z: prevRoom.z};
            const endPos = {x: room.x, y, z: room.z};
            const corridorMin = {x: Math.min(startPos.x, endPos.x), y, z: Math.min(startPos.z, endPos.z)};
            const corridorMax = {x: Math.max(startPos.x, endPos.x), y: y + 3, z: Math.max(startPos.z, endPos.z)};
            const isXCorridor = corridorMin.z === corridorMax.z;
            const corridorWidth = 4;
            
            const bedrockMin = {x: corridorMin.x - (isXCorridor ? 0 : corridorWidth), y: y - 1, z: corridorMin.z - (isXCorridor ? corridorWidth : 0)};
            const bedrockMax = {x: corridorMax.x + (isXCorridor ? 0 : corridorWidth), y: y + roomSize.height - 1, z: corridorMax.z + (isXCorridor ? corridorWidth : 0)};
            await fillAndCacheVolume(dimension, bedrockMin, bedrockMax, BEDROCK);
            
            const innerMin = {x: corridorMin.x - (isXCorridor ? 0 : corridorWidth), y: y, z: corridorMin.z - (isXCorridor ? corridorWidth : 0)};
            const innerMax = {x: corridorMax.x + (isXCorridor ? 0 : corridorWidth), y: y + 3, z: corridorMax.z + (isXCorridor ? corridorWidth : 0)};
            
            await fillAndCacheVolume(dimension, { ...innerMin, y: innerMin.y }, { ...innerMax, y: innerMin.y }, PLANK);
            await fillAndCacheVolume(dimension, { ...innerMin, y: innerMax.y }, { ...innerMax, y: innerMax.y }, PLANK);
            await fillAndCacheVolume(dimension, { ...innerMin, y: innerMin.y + 1 }, { ...innerMax, y: innerMax.y - 1 }, STONE);
            
            const walkableMin = {
                x: isXCorridor ? innerMin.x : innerMin.x + 1,
                y: innerMin.y + 1,
                z: isXCorridor ? innerMin.z + 1 : innerMin.z
            };
            const walkableMax = {
                x: isXCorridor ? innerMax.x : innerMax.x - 1,
                y: innerMax.y - 1,
                z: isXCorridor ? innerMax.z - 1 : innerMax.z
            };
            await fillAndCacheVolume(dimension, walkableMin, walkableMax, AIR);

            const doorPos1 = {x: prevRoom.x + Math.sign(room.x - prevRoom.x) * halfW, y: y+1, z: prevRoom.z + Math.sign(room.z - prevRoom.z) * halfW};
            const doorPos2 = {x: room.x - Math.sign(room.x - prevRoom.x) * halfW, y: y+1, z: room.z - Math.sign(room.z - prevRoom.z) * halfW};
            await fillAndCacheVolume(dimension, doorPos1, {x: doorPos1.x, y: doorPos1.y+1, z: doorPos1.z}, AIR);
            await fillAndCacheVolume(dimension, doorPos2, {x: doorPos2.x, y: doorPos2.y+1, z: doorPos2.z}, AIR);
             const torchYCorridor = y + 2;
            if (isXCorridor) { // Hành lang theo trục X
                const midX = Math.round((startPos.x + endPos.x) / 2);
                dimension.setBlockPermutation({ x: midX, y: torchYCorridor, z: startPos.z }, TORCH);
            } else { // Hành lang theo trục Z
                const midZ = Math.round((startPos.z + endPos.z) / 2);
                dimension.setBlockPermutation({ x: startPos.x, y: torchYCorridor, z: midZ }, TORCH);
            }
        }
        
        await system.waitTicks(2); // Tăng nhẹ thời gian chờ để đảm bảo chunk được tải
    }
    return Array.from(originalBlocks.values());
}

async function restoreDungeonArena(dimension, originalBlocks) {
    if (!originalBlocks || originalBlocks.length === 0) return;
    for (const blockData of originalBlocks) {
        try {
            if (originalBlocks.indexOf(blockData) % 50 === 0) await system.waitTicks(1);
            const block = dimension.getBlock(blockData.location);
            if (block) block.setPermutation(blockData.permutation);
        } catch (e) {}
    }
}

async function startDungeon(player, dungeonId, difficultyId) {
    const dungeonConfig = CONFIG.DUNGEON_CONFIG[dungeonId];
    const returnLocation = { location: player.location, dimension: player.dimension };

    let buildY = Math.round(player.location.y) + 30;
    const dimensionHeightLimit = player.dimension.heightRange.maximum;
    const dungeonTopY = buildY + 5; 
    if (dungeonTopY >= dimensionHeightLimit) buildY = dimensionHeightLimit - 10;
    
    const dungeonCenter = { x: Math.round(player.location.x), y: buildY, z: Math.round(player.location.z) };

    let dungeonState = null;
    try {
        player.sendMessage("§7Đang kiến tạo hầm ngục, quá trình này có thể gây lag nhẹ...");
        const layout = generateDungeonLayout(dungeonCenter.x, dungeonCenter.y, dungeonCenter.z, dungeonConfig.num_rooms);
        dungeonState = { dungeonId, difficulty: difficultyId, returnLocation, modifiedBlocks: [], layout };
        activeDungeons.set(player.nameTag, dungeonState);

        const modifiedBlocks = await buildDungeonFromLayout(player.dimension, layout, player);
        dungeonState.modifiedBlocks = modifiedBlocks;
        activeDungeons.set(player.nameTag, dungeonState);
        
        player.playSound("block.rooted_dirt.break", { location: player.location });
        const startRoom = layout[0];
        player.teleport({ x: startRoom.x, y: startRoom.y + 1, z: startRoom.z }, { dimension: returnLocation.dimension });
        player.playSound("portal.travel");
        player.sendMessage(`§cChào mừng đến với ${dungeonConfig.name}! Hãy tìm và tiêu diệt trùm cuối.`);
        spawnMobsInRooms(player);
        
        // --- PHẦN NÀY ĐÃ BỊ XÓA ---
        // Không còn tạo và đưa La Bàn Rút Lui nữa

    } catch (error) {
        console.error(`[Dungeon] Lỗi nghiêm trọng khi bắt đầu hầm ngục: ${error}\n${error.stack}`);
        player.sendMessage("§c§lLỗi! Không thể tạo hầm ngục. Đang hoàn tác...");
        if (dungeonState?.modifiedBlocks) {
            await restoreDungeonArena(returnLocation.dimension, dungeonState.modifiedBlocks);
        }
        player.teleport(returnLocation.location, { dimension: returnLocation.dimension });
        activeDungeons.delete(player.nameTag);
    }
}

export async function finishDungeon(player, isWin) {
    if (!activeDungeons.has(player.nameTag)) return;
    const state = activeDungeons.get(player.nameTag);
    player.sendMessage("§7Không gian hầm ngục đang tan rã...");
    await restoreDungeonArena(state.returnLocation.dimension, state.modifiedBlocks);
    player.playSound("block.amethyst_block.break", { location: player.location });
    const remainingMobs = state.returnLocation.dimension.getEntities({ tags: [`dungeon_owner_${player.nameTag}`] });
    for (const mob of remainingMobs) if (mob.isValid) mob.kill();
    const returnLoc = state.returnLocation;
    activeDungeons.delete(player.nameTag);
    
    // Đoạn code này vẫn hữu ích để dọn dẹp la bàn cũ nếu có, không cần xóa
    try {
        const inventory = player.getComponent("inventory").container;
        for (let i = 0; i < inventory.size; i++) {
            const item = inventory.getItem(i);
            if (item && item.getComponent("minecraft:item")?.hasTag("dhh:dungeon_quit_item")) {
                inventory.setItem(i, undefined);
                break;
            }
        }
    } catch(e) {}

    player.teleport(returnLoc.location, { dimension: returnLoc.dimension });
    if (isWin) {
        await showWinScreen(player, state);
    } else {
        player.sendMessage("§cBạn đã thất bại trong hầm ngục.");
    }
    removeOldGuide(player);
}

function spawnMobsInRooms(player) {
    if (!activeDungeons.has(player.nameTag)) return;
    const state = activeDungeons.get(player.nameTag);
    const dungeonConfig = CONFIG.DUNGEON_CONFIG[state.dungeonId];
    let totalMobs = 0;

    const safeRoomTypes = ['start', 'treasure'];

    state.layout.forEach(room => {
        if (safeRoomTypes.includes(room.type)) return;

        const spawnLocation = { x: room.x, y: room.y + 1, z: room.z };
        let mobToSpawn;

        if (room.type === 'boss') {
            const bossConfig = dungeonConfig.mobs.boss;
            mobToSpawn = player.dimension.spawnEntity(bossConfig.type, spawnLocation);
            mobToSpawn.nameTag = bossConfig.name;
            try {
                const healthComp = mobToSpawn.getComponent(EntityComponentTypes.Health);
                const healthBoost = EffectTypes.get("health_boost");
                if (healthBoost && healthComp) {
                   mobToSpawn.addEffect(healthBoost, 20000000, { amplifier: Math.ceil(bossConfig.health / 4) - 1, showParticles: false });
                   healthComp.resetToMaxValue();
                }
                if(bossConfig.scale) mobToSpawn.getComponent(EntityComponentTypes.Scale)?.setValue(bossConfig.scale);
            } catch(e) {}
            mobToSpawn.addTag('dungeon_boss');
            mobToSpawn.addTag(DUNGEON_MOB_TAG);
            mobToSpawn.addTag(`dungeon_owner_${player.nameTag}`);
            totalMobs++;
        } else {
            // Spawn ngẫu nhiên 1-3 quái thường cho mỗi phòng
            const numToSpawn = (['mob', 'library', 'dining_hall', 'jail'].includes(room.type)) ? (Math.floor(Math.random() * 3) + 1) : 1;
            for(let i = 0; i < numToSpawn; i++) {
                 // Tạo vị trí ngẫu nhiên nhỏ trong phòng
                const mobOffset = {
                    x: spawnLocation.x + (Math.random() - 0.5) * 4, 
                    y: spawnLocation.y, 
                    z: spawnLocation.z + (Math.random() - 0.5) * 4
                };
                mobToSpawn = player.dimension.spawnEntity(dungeonConfig.mobs.normal, mobOffset);
                if (mobToSpawn.typeId === 'minecraft:vindicator') {
                    try {
                        const equippable = mobToSpawn.getComponent(EntityComponentTypes.Equippable);
                        if (equippable) equippable.setEquipment("Mainhand", new ItemStack("minecraft:iron_axe"));
                    } catch(e) {}
                }
                mobToSpawn.addTag(DUNGEON_MOB_TAG);
                mobToSpawn.addTag(`dungeon_owner_${player.nameTag}`);
                totalMobs++;
            }
        }
    });
    state.mobsRemaining = totalMobs;
    activeDungeons.set(player.nameTag, state);
    player.sendMessage(`§c${totalMobs} kẻ địch đã xuất hiện trong hầm ngục!`);
}

async function showWinScreen(player, state) {
    const form = new MessageFormData().title("§a§lCHIẾN THẮNG!").body("Bạn đã chinh phục hầm ngục!").button1("§aNhận Thưởng").button2("§aNhận Thưởng");
    await form.show(player);
    const dungeonConfig = CONFIG.DUNGEON_CONFIG[state.dungeonId];
    const rewards = dungeonConfig.difficulties[state.difficulty].rewards;
    const inventory = player.getComponent("inventory").container;
    rewards.forEach(reward => {
        inventory.addItem(new ItemStack(reward.id, reward.amount));
    });
    player.sendMessage("§eBạn đã nhận được phần thưởng!");
    player.playSound("random.orb");
}

function onDungeonMobKilled(player, killedMob) {
    if (!activeDungeons.has(player.nameTag)) return;
    const state = activeDungeons.get(player.nameTag);
    state.mobsRemaining -= 1;
    activeDungeons.set(player.nameTag, state);
    player.onScreenDisplay.setActionBar(`§cKẻ địch còn lại: ${state.mobsRemaining}`);
    
    if (killedMob.hasTag('dungeon_boss') || state.mobsRemaining <= 0) {
        player.sendMessage("§a§lBạn đã hạ gục trùm cuối! Hầm ngục đã được chinh phục!");
        finishDungeon(player, true);
    }
}

export async function showDungeonChallengeIntro(player) {
    if (activeDungeons.has(player.nameTag)) {
        player.sendMessage("§cBạn đang trong một thử thách!");
        return;
    }
    const form = new ActionFormData();
    form.title("§g§lThử Thách Hầm Ngục");
    form.body("Chào mừng, nhà thám hiểm. Hãy chọn một hầm ngục để đối mặt.");
    const dungeonIds = Object.keys(CONFIG.DUNGEON_CONFIG);
    dungeonIds.forEach(id => {
        form.button(CONFIG.DUNGEON_CONFIG[id].name);
    });
    const { selection, canceled } = await form.show(player);
    if (canceled) return;
    const dungeonId = dungeonIds[selection];
    if (!dungeonId) {
        player.sendMessage("§cLựa chọn không hợp lệ.");
        return;
    }
    player.sendMessage("§aNgười Dẫn Lối gật đầu: 'Một lựa chọn dũng cảm. Hãy nói chuyện với ta để chọn độ khó.'");
    const guide = summonDungeonGuide(player);
    guide.setDynamicProperty("dungeon_id_pending", dungeonId);
}

async function showDifficultySelectionMenu(player, npc) {
    const dungeonId = npc.getDynamicProperty("dungeon_id_pending");
    if (!dungeonId || !CONFIG.DUNGEON_CONFIG[dungeonId]) {
        player.sendMessage("§cNPC này không có thử thách nào.");
        return;
    }
    const stats = getPlayerStats(player);
    const dungeonConfig = CONFIG.DUNGEON_CONFIG[dungeonId];
    const form = new ActionFormData().title(dungeonConfig.name).body("Hãy chọn độ khó.");
    const difficulties = Object.keys(dungeonConfig.difficulties);
    const availableDifficulties = [];
    difficulties.forEach(key => {
        const diff = dungeonConfig.difficulties[key];
        if (stats.level >= diff.level_req) {
            form.button(`${diff.name}\n§7(Cấp ${diff.level_req})`);
            availableDifficulties.push(key);
        } else {
            form.button(`§m${diff.name}\n§c(Cấp ${diff.level_req})`);
            availableDifficulties.push(null);
        }
    });
    const { selection, canceled } = await form.show(player);
    if (canceled) return;
    const selectedDifficultyId = availableDifficulties[selection];
    if (selectedDifficultyId === null) {
        player.sendMessage("§cBạn chưa đủ cấp độ.");
        player.playSound("note.bass");
        return;
    }
    startDungeon(player, dungeonId, selectedDifficultyId);
}

// --- HÀM NÀY KHÔNG CÒN ĐƯỢC SỬ DỤNG ---
// async function showQuitMenu(player) { ... }

// Tương tác với NPC
world.afterEvents.playerInteractWithEntity.subscribe(event => {
    const { player, target } = event;
    if (target.hasTag(GUIDE_NPC_TAG) && !activeDungeons.has(player.nameTag)) {
        showDifficultySelectionMenu(player, target);
    }
});

// --- SỰ KIỆN NÀY KHÔNG CÒN CẦN THIẾT ---
// world.afterEvents.itemUse.subscribe(event => { ... });

// Xử lý các sự kiện chết
world.afterEvents.entityDie.subscribe(event => {
    const { deadEntity, damageSource } = event;
    const killer = damageSource?.damagingEntity;

    // Trường hợp 1: Người chơi giết quái
    if (killer?.typeId === 'minecraft:player' && deadEntity.hasTag(DUNGEON_MOB_TAG) && deadEntity.hasTag(`dungeon_owner_${killer.nameTag}`)) {
        onDungeonMobKilled(killer, deadEntity);
    }
    
    // Trường hợp 2: Người chơi bị chết
    else if (deadEntity.typeId === 'minecraft:player') {
        const player = deadEntity;
        if (activeDungeons.has(player.nameTag)) {
            player.sendMessage("§cBạn đã gục ngã! Hầm ngục sẽ được hoàn tác.");
            system.runTimeout(() => {
                finishDungeon(player, false);
            }, 60); // Đợi 3 giây để người chơi thấy màn hình chết
        }
    }
});