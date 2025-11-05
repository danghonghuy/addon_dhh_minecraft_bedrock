// --- START OF FILE survival_challenge.js --- (PHIÊN BẢN SỬA LỖI CUỐI CÙNG)

import { world, system, BlockPermutation, GameMode, ItemStack, TimeOfDay, BlockVolume } from "@minecraft/server";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";
import { CONFIG } from "./config.js";
import { Vector } from "./skills/vector.js";

export const activeChallenges = new Map();

const CHALLENGE_CONFIG = CONFIG.SURVIVAL_CHALLENGE;
system.runInterval(() => {
    // Nếu không có trận đấu nào đang diễn ra, không làm gì cả
    if (activeChallenges.size === 0) return;

    const currentTick = system.currentTick;

    // Lặp qua tất cả các trận đấu đang hoạt động
    for (const [hostName, challengeState] of activeChallenges.entries()) {
        try {
            // --- BẮT ĐẦU KHỐI LOGIC MỚI: KIỂM TRA NGƯỜI CHƠI CHẾT ---
            let livingPlayerCount = 0;
            const playersToEliminate = [];

            for (const playerName of challengeState.party) {
                // Bỏ qua nếu người chơi này đã bị loại từ trước
                if (challengeState.eliminatedPlayers.has(playerName)) {
                    continue;
                }

                const player = getPlayerByName(playerName);
                // Nếu người chơi thoát game hoặc đã chết (hết máu)
                if (!player || player.getComponent('health').currentValue <= 0) {
                    playersToEliminate.push(playerName); // Thêm vào danh sách chờ loại
                } else {
                    livingPlayerCount++; // Nếu còn sống, tăng biến đếm
                }
            }

            // Xử lý loại những người chơi vừa bị phát hiện là đã chết
            if (playersToEliminate.length > 0) {
                for (const eliminatedName of playersToEliminate) {
                    challengeState.eliminatedPlayers.add(eliminatedName);
                    
                    // Thông báo cho mọi người trong đội biết
                    for (const memberName of challengeState.party) {
                        const member = getPlayerByName(memberName);
                        if (member) {
                            member.sendMessage(`§c[Thử Thách] Người chơi ${eliminatedName} đã bị loại!`);
                        }
                    }
                }
            }

            // Nếu không còn ai sống sót, kết thúc thử thách
            if (livingPlayerCount === 0 && challengeState.party.length > 0) {
                // Gửi thông báo lần cuối
                for (const memberName of challengeState.party) {
                    const member = getPlayerByName(memberName);
                    if (member) member.sendMessage("§c§lCả đội đã bị hạ gục! Thử thách kết thúc.");
                }
                
                endChallenge(hostName, false); // Gọi hàm kết thúc và dọn dẹp
                continue; // Chuyển sang xử lý thử thách tiếp theo, bỏ qua phần code bên dưới
            }
            // --- KẾT THÚC KHỐI LOGIC MỚI ---


            // Phần code cũ để xử lý thời gian và action bar (giữ nguyên)
            if (challengeState.isWaveEnding || !challengeState.waveEndTime) continue;
            
            const timeLeftTicks = challengeState.waveEndTime - currentTick;

            if (timeLeftTicks <= 0) {
                challengeState.isWaveEnding = true;
                for (const playerName of challengeState.party) {
                    // Chỉ gửi thông báo cho người còn sống
                    if (!challengeState.eliminatedPlayers.has(playerName)) {
                        const player = getPlayerByName(playerName);
                        if (player?.isValid) {
                            player.playSound("random.orb", { pitch: 1.2 });
                            player.sendMessage(`§a§lHết giờ! Sống sót qua đợt ${challengeState.currentWave}!`);
                        }
                    }
                }
                endWaveAndProceed(hostName);
            } 
            else {
                const timeLeftSeconds = Math.round(timeLeftTicks / 20);
                for (const playerName of challengeState.party) {
                    // Chỉ hiển thị cho người còn sống
                    if (!challengeState.eliminatedPlayers.has(playerName)) {
                        const player = getPlayerByName(playerName);
                        if (player?.isValid) {
                            player.onScreenDisplay.setActionBar(`§eThời gian: §f${timeLeftSeconds}s §7| §cQuái: §f${challengeState.mobsRemaining}`);
                        }
                    }
                }
            }
        } catch (e) {
            console.error(`Lỗi trong vòng lặp thời gian thử thách của ${hostName}:`, e);
            // Xóa thử thách nếu có lỗi nghiêm trọng để tránh kẹt
            activeChallenges.delete(hostName);
        }
    }
}, 20); // Chạy mỗi 20 ticks = 1 giây
/**
 * Lấy một đối tượng Player bằng tên, sử dụng phương thức API chính xác.
 * @param {string} playerName Tên của người chơi cần tìm.
 * @returns {import("@minecraft/server").Player | undefined} Trả về đối tượng Player nếu tìm thấy, ngược lại là undefined.
 */
function getPlayerByName(playerName) {
    // world.getPlayers() trả về một mảng, nên chúng ta lấy phần tử đầu tiên [0].
    return world.getPlayers({ name: playerName })[0];
}

export async function showChallengeMainMenu(player) {
    if ([...activeChallenges.values()].some(c => c.party.includes(player.nameTag))) {
        player.sendMessage("§cBạn đã đang trong một thử thách rồi!");
        return;
    }

    const form = new ActionFormData();
    form.title("§g§lTHỬ THÁCH SINH TỒN");
    form.body("§fChọn một độ khó để bắt đầu. Người chơi ở gần sẽ nhận được lời mời tham gia.");

    CHALLENGE_CONFIG.DIFFICULTIES.forEach(difficulty => {
        form.button(difficulty.name);
    });

    const { selection, canceled } = await form.show(player);
    if (canceled) return;

    startChallengeLobby(player, selection);
}

function startChallengeLobby(host, difficultyIndex) {
    const difficulty = CHALLENGE_CONFIG.DIFFICULTIES[difficultyIndex];
    if (!difficulty) return;

    const acceptedPlayers = new Set([host.nameTag]);

    host.sendMessage(`§e[Thử Thách] Bạn đã bắt đầu Thử thách ${difficulty.name}.§f Đang mời người chơi xung quanh...`);

    const allPlayers = world.getPlayers();

    for (const invitee of allPlayers) {
        if (invitee.nameTag === host.nameTag) continue;
        if (invitee.dimension.id !== host.dimension.id) continue;

        const distance = Vector.magnitude(Vector.subtract(host.location, invitee.location));

        if (distance <= CHALLENGE_CONFIG.INVITE_RADIUS) {
            if ([...activeChallenges.values()].some(c => c.party.includes(invitee.nameTag))) continue;

            handleInvitation(host, invitee, difficulty.name).then(accepted => {
                if (accepted && invitee.isValid) {
                    acceptedPlayers.add(invitee.nameTag);
                    invitee.teleport(host.location);

                    for (const memberName of acceptedPlayers) {
                        const member = getPlayerByName(memberName); // SỬA Ở ĐÂY
                        if (member?.isValid) {
                            member.sendMessage(`§a[Thử Thách] §f${invitee.nameTag}§a đã tham gia đội!`);
                        }
                    }
                }
            });
        }
    }

    let lobbyTime = CHALLENGE_CONFIG.LOBBY_WAIT_SECONDS;
    const lobbyInterval = system.runInterval(() => {
        if (lobbyTime > 0) {
            for (const memberName of acceptedPlayers) {
                const member = getPlayerByName(memberName); // SỬA Ở ĐÂY
                if (member?.isValid) {
                    member.onScreenDisplay.setActionBar(`§eThử thách bắt đầu sau §f${lobbyTime}§e giây...`);
                }
            }
            lobbyTime--;
        } else {
            system.clearRun(lobbyInterval);

            const startingParty = [...acceptedPlayers]
                .map(name => getPlayerByName(name)) // SỬA Ở ĐÂY
                .filter(p => p?.isValid);

            if (startingParty.length > 0) {
                beginTheChallenge(startingParty, difficultyIndex);
            }
        }
    }, 20);
}

async function handleInvitation(host, invitee, difficultyName) {
    const form = new MessageFormData();
    form.title("§eLời Mời Thử Thách");
    form.body(`§fNgười chơi §b${host.nameTag}§f mời bạn tham gia Thử Thách Sinh Tồn!\n\n§fĐộ khó: ${difficultyName}`);
    form.button1("§a§lTừ Chối");
    form.button2("§cĐồng Ý");

    const timeoutSeconds = Math.max(1, CHALLENGE_CONFIG.LOBBY_WAIT_SECONDS - 2);
    const uiPromise = form.show(invitee);
    const timeoutPromise = new Promise(resolve => system.runTimeout(() => resolve({ canceled: true }), timeoutSeconds * 20));

    const result = await Promise.race([uiPromise, timeoutPromise]);

    return !result?.canceled && result?.selection === 1;
}

async function beginTheChallenge(party, difficultyIndex) {
    const host = party[0];
    if (!host || !host.isValid) {
        for (const member of party) {
            if (member.isValid) member.sendMessage("§cThử thách bị hủy do chủ phòng đã thoát.");
        }
        return;
    }

    host.sendMessage("§eĐang chuẩn bị sàn đấu...");
    const { arenaBackup, arenaCenter } = await buildArena(host);

    if (!arenaBackup) {
        for (const member of party) {
            if (member.isValid) member.sendMessage("§cKhông thể tạo sàn đấu tại vị trí này. Thử thách bị hủy.");
        }
        return;
    }

    const originalTimeOfDay = world.getTimeOfDay();
    const originalDaylightCycle = world.gameRules.doDaylightCycle;
    world.setTimeOfDay(TimeOfDay.Night);
    world.gameRules.doDaylightCycle = false;
    host.sendMessage("§7Màn đêm đã bao trùm sàn đấu...");

    const hostName = host.nameTag;

    activeChallenges.set(hostName, {
        difficultyIndex,
        currentWave: 0,
        waveEndTime: 0,
        mobsRemaining: 0,
        party: party.map(p => p.nameTag),
        originalLocation: {
            location: { x: host.location.x, y: host.location.y, z: host.location.z },
            dimensionId: host.dimension.id
        },
        arenaBackup,
        arenaCenter,
        originalGameRules: {
            timeOfDay: originalTimeOfDay,
            doDayLightCycle: originalDaylightCycle
        },
         isWaveEnding: false,
          eliminatedPlayers: new Set(),
    });

    for (const member of party) {
        if (member.isValid) {
            member.teleport(arenaCenter);
            member.sendMessage("§g§lThử Thách Bắt Đầu!");
        }
    }

    system.runTimeout(() => startNextWave(hostName), CHALLENGE_CONFIG.REST_TIME_SECONDS * 20);
}

export function startNextWave(hostName) {
    const challengeState = activeChallenges.get(hostName);
    if (!challengeState) return;

    // THAY ĐỔI: Reset "cờ" báo hiệu đợt đấu mới BẮT ĐẦU
    challengeState.isWaveEnding = false;
    challengeState.currentWave++;

    const difficulty = CHALLENGE_CONFIG.DIFFICULTIES[challengeState.difficultyIndex];
    const waveConfig = difficulty.waves[challengeState.currentWave - 1];

    if (!waveConfig) {
        endChallenge(hostName, true);
        return;
    }

    const livePartyMembers = challengeState.party
        .map(playerName => getPlayerByName(playerName))
        .filter(player => player?.isValid);

    challengeState.party = livePartyMembers.map(p => p.nameTag);
    const partySize = livePartyMembers.length;

    if (partySize === 0) {
        endChallenge(hostName, false);
        return;
    }

    let mobCount = waveConfig.count;
    if (partySize > 1) {
        mobCount = Math.floor(mobCount * (1 + (partySize - 1) * CHALLENGE_CONFIG.PLAYER_SCALING_FACTOR));
    }

    const arenaCenter = challengeState.arenaCenter;
    const arenaSize = CHALLENGE_CONFIG.ARENA_SIZE / 2 - 2;
    const dimension = world.getDimension(challengeState.originalLocation.dimensionId);

    for (let i = 0; i < mobCount; i++) {
        const mobId = waveConfig.mobs[Math.floor(Math.random() * waveConfig.mobs.length)];
        const spawnX = arenaCenter.x + Math.random() * arenaSize * 2 - arenaSize;
        const spawnZ = arenaCenter.z + Math.random() * arenaSize * 2 - arenaSize;
        const spawnLocation = { x: spawnX, y: arenaCenter.y, z: spawnZ };
        try {
            const spawnedMob = dimension.spawnEntity(mobId, spawnLocation);
            spawnedMob.addTag(`challenge_mob_${hostName}`);
        } catch (e) { console.error(`[Survival Challenge] Không thể spawn quái vật: ${mobId}`, e); }
    }

    challengeState.mobsRemaining = mobCount;

    // THAY ĐỔI: Đặt thời gian kết thúc cho đợt này (tính bằng tick)
    challengeState.waveEndTime = system.currentTick + (CHALLENGE_CONFIG.WAVE_DURATION_SECONDS * 20);

    for (const player of livePartyMembers) {
        // THAY ĐỔI: Cập nhật lại tin nhắn cho phù hợp
        player.sendMessage(`§c§lĐợt ${challengeState.currentWave}§c đã bắt đầu! Sống sót trong ${CHALLENGE_CONFIG.WAVE_DURATION_SECONDS} giây!`);
        player.playSound("note.pling", { pitch: 1.5 });
    }
}

export function endWaveAndProceed(hostName) {
    const challengeState = activeChallenges.get(hostName);
    if (!challengeState) return;

    const dimension = world.getDimension(challengeState.originalLocation.dimensionId);
    const mobs = dimension.getEntities({ tags: [`challenge_mob_${hostName}`] });
    for (const mob of mobs) {
        try { mob.kill(); } catch (e) { }
    }

    const difficulty = CHALLENGE_CONFIG.DIFFICULTIES[challengeState.difficultyIndex];
    let rewardKey = `milestone_${challengeState.currentWave}`;

    if (rewardKey && difficulty.rewards[rewardKey]) {
        for (const playerName of challengeState.party) {
            const player = getPlayerByName(playerName); // SỬA Ở ĐÂY
            if (player?.isValid) {
                player.sendMessage(`§a§lChúc mừng đạt mốc thưởng đợt ${challengeState.currentWave}!`);
                difficulty.rewards[rewardKey].forEach(reward => {
                    // <<<--- THÊM VÀO ĐÂY (PHẦN 1) ---
                    if (reward.nguyen_thach) {
                        const currentNT = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
                        player.setDynamicProperty("dhh:nguyen_thach", currentNT + reward.nguyen_thach);
                        player.sendMessage(`§d+${reward.nguyen_thach} Nguyên Thạch`);
                    }
                    // --- Hết phần thêm ---

                    // --- Chỉnh sửa lại phần thưởng vật phẩm ---
                    if (reward.id) {
                        const itemStack = new ItemStack(reward.id, reward.amount);
                        if (reward.name) itemStack.nameTag = reward.name;
                        // Code cũ của anh thiếu phần kiểm tra và áp dụng enchantments, em bổ sung luôn
                        if (reward.enchantments) {
                           const enchantable = itemStack.getComponent("enchantable");
                           for (const enchant in reward.enchantments) {
                                enchantable.addEnchantment({typeId: enchant, level: reward.enchantments[enchant]});
                           }
                        }
                        player.getComponent('inventory').container.addItem(itemStack)
                    }
                });
                
                player.playSound("random.orb");
            }
        }
    }

    if (challengeState.currentWave >= difficulty.waves.length) {
        endChallenge(hostName, true);
        return;
    }

    for (const playerName of challengeState.party) {
        const player = getPlayerByName(playerName); // SỬA Ở ĐÂY
        if (player?.isValid) player.sendMessage(`§eĐợt tiếp theo sẽ bắt đầu sau ${CHALLENGE_CONFIG.REST_TIME_SECONDS} giây...`);
    }

    system.runTimeout(() => startNextWave(hostName), CHALLENGE_CONFIG.REST_TIME_SECONDS * 20);
}

export function endChallenge(hostName, wasVictory) {
    const challengeState = activeChallenges.get(hostName);
    if (!challengeState) return;

    const { originalLocation, party, difficultyIndex, arenaBackup, originalGameRules } = challengeState;
    const dimension = world.getDimension(originalLocation.dimensionId);

    const remainingMobs = dimension.getEntities({ tags: [`challenge_mob_${hostName}`] });
    for (const mob of remainingMobs) {
        try { mob.kill(); } catch (e) { }
    }

    const difficulty = CHALLENGE_CONFIG.DIFFICULTIES[difficultyIndex];

    for (const playerName of party) {
        const player = getPlayerByName(playerName); // SỬA Ở ĐÂY
        if (player?.isValid) {
            if (wasVictory) {
               player.sendMessage("§a§lCHIẾN THẮNG!§f Bạn đã hoàn thành Thử Thách Sinh Tồn!");
                
                if (difficulty.rewards.final) {
                    // Thay thế đoạn difficulty.rewards.final.forEach... cũ bằng đoạn mới này
                    difficulty.rewards.final.forEach(itemInfo => {
                        // <<<--- THÊM VÀO ĐÂY (PHẦN 2) ---
                        if (itemInfo.nguyen_thach) {
                            const currentNT = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
                            player.setDynamicProperty("dhh:nguyen_thach", currentNT + itemInfo.nguyen_thach);
                            player.sendMessage(`§d+${itemInfo.nguyen_thach} Nguyên Thạch`);
                        }
                        // --- Hết phần thêm ---
                        
                        // --- Chỉnh sửa lại phần thưởng vật phẩm ---
                        if (itemInfo.id) {
                            const item = new ItemStack(itemInfo.id, itemInfo.amount ?? 1);
                            if (itemInfo.name) item.nameTag = itemInfo.name;
                             // Bổ sung phần enchantments cho phần thưởng cuối cùng
                            if (itemInfo.enchantments) {
                               const enchantable = item.getComponent("enchantable");
                               for (const enchant in itemInfo.enchantments) {
                                   enchantable.addEnchantment({typeId: enchant, level: itemInfo.enchantments[enchant]});
                               }
                            }
                            player.getComponent('inventory').container.addItem(item);
                        }
                    });
                }

                player.playSound("random.levelup", { volume: 2, pitch: 1.2 });
            } else {
                player.sendMessage("§c§lTHẤT BẠI!§f Thử thách đã kết thúc.");
            }
            player.teleport(originalLocation.location, { dimension: dimension });
        }
    }

    restoreArena(arenaBackup, dimension);

    if (originalGameRules) {
        world.setTimeOfDay(originalGameRules.timeOfDay);
        world.gameRules.doDaylightCycle = originalGameRules.doDaylightCycle;
    }

    activeChallenges.delete(hostName);
}


async function buildArena(player) {
    try {
        const S = CHALLENGE_CONFIG.ARENA_SIZE;
        const H = CHALLENGE_CONFIG.ARENA_HEIGHT;
        const loc = player.location;
        const dim = player.dimension;

        // --- BẮT ĐẦU PHẦN ĐÃ SỬA ---
        // Làm tròn tọa độ để đảm bảo là số nguyên
        const floorY = Math.floor(loc.y - 1); // Tính floorY trước
        const from = {
            x: Math.floor(loc.x - S / 2),
            y: Math.floor(loc.y) - 5, // Tọa độ đáy của vùng sao lưu
            z: Math.floor(loc.z - S / 2)
        };
        
        const worldMinY = world.getDimension("overworld").heightRange.min;
        const worldMaxY = world.getDimension("overworld").heightRange.max;

        if (from.y < worldMinY) from.y = worldMinY;

        // Kiểm tra xem vị trí có hợp lệ không
        if (floorY < worldMinY || floorY > worldMaxY) {
            player.sendMessage("§cVị trí xây dựng sàn đấu không hợp lệ (quá cao hoặc quá thấp).");
            return { arenaBackup: null, arenaCenter: null };
        }

        // TÍNH LẠI 'to.y' CHO ĐỒNG BỘ VỚI CHIỀU CAO TƯỜNG
        const to = {
            x: from.x + S,
            y: floorY + H + 1, // <<<<<<<<<<< SỬA LỖI CHÍNH LÀ Ở ĐÂY
            z: from.z + S
        };

        if (to.y > worldMaxY) to.y = worldMaxY; // Vẫn giới hạn trong thế giới

        const centerTeleport = { x: loc.x, y: loc.y, z: loc.z };
        
        // Tạo một thể hiện BlockVolume hợp lệ với tọa độ đã sửa
        const boundsVolume = new BlockVolume(from, to); 
        
        const arenaBackup = {
            blocks: [],
            bounds: boundsVolume // Gán volume hợp lệ vào backup
        };
        // --- KẾT THÚC PHẦN ĐÃ SỬA ---

        const wallBlock = BlockPermutation.resolve(CHALLENGE_CONFIG.ARENA_WALL_BLOCK);
        const floorBlock = BlockPermutation.resolve(CHALLENGE_CONFIG.ARENA_FLOOR_BLOCK);
        const airBlock = BlockPermutation.resolve("minecraft:air");
        
        player.sendMessage("§e[1/3] Đang dọn dẹp không gian...");

        // Bước 1: Vòng lặp này bây giờ sẽ dùng đúng tọa độ 'to.y' đã sửa
        for (let x = from.x; x <= to.x; x++) {
            for (let z = from.z; z <= to.z; z++) {
                for (let y = from.y; y <= to.y; y++) {
                    const blockLoc = { x, y, z };
                    try {
                        const block = dim.getBlock(blockLoc);
                        if (block && !block.isAir) {
                            arenaBackup.blocks.push({ location: blockLoc, permutation: block.permutation });
                        }
                        if (y !== floorY) { 
                            block.setPermutation(airBlock);
                        }
                    } catch (e) { /* Bỏ qua nếu không lấy được block */ }
                }
            }
        }
        
        player.sendMessage("§e[2/3] Đang xây dựng sàn đấu và tường...");

        // Bước 2: Vòng lặp xây tường không cần thay đổi
        for (let x = from.x; x <= to.x; x++) {
            for (let z = from.z; z <= to.z; z++) {
                dim.getBlock({ x, y: floorY, z }).setPermutation(floorBlock);
                if (x === from.x || x === to.x) {
                    for (let y = floorY; y <= floorY + H; y++) {
                       if (y <= worldMaxY) dim.getBlock({ x, y, z }).setPermutation(wallBlock);
                    }
                }
                 if (z === from.z || z === to.z) {
                    for (let y = floorY; y <= floorY + H; y++) {
                       if (y <= worldMaxY) dim.getBlock({ x, y, z }).setPermutation(wallBlock);
                    }
                }
            }
        }
        
        player.sendMessage("§a[3/3] Sàn đấu đã sẵn sàng!");

        return { arenaBackup, arenaCenter: centerTeleport };

    } catch (e) {
        console.error("Lỗi khi xây dựng sàn đấu:", e, e.stack);
        player.sendMessage("§cĐã xảy ra lỗi nghiêm trọng khi tạo sàn đấu. Thử thách bị hủy.");
        return { arenaBackup: null, arenaCenter: null };
    }
}

function restoreArena(arenaBackup, dimension) {
    if (!arenaBackup) return;

    // === PHẦN SỬA LỖI BẮT ĐẦU ===
    
    // 1. Chỉ cần lấy toàn bộ đối tượng 'bounds', không cần tách 'from' và 'to' nữa
    const volume = arenaBackup.bounds; // `volume` bây giờ là một đối tượng { from: {x,y,z}, to: {x,y,z} }

    // 2. Định nghĩa block 'air' để lấp đầy
    const airPermutation = BlockPermutation.resolve("minecraft:air");

    try {
        // 3. Gọi hàm `fillBlocks` với đúng 2 tham số theo tài liệu
        //    Tham số 1: 'volume' (BlockVolumeBase)
        //    Tham số 2: 'airPermutation' (loại block)
        dimension.fillBlocks(volume, airPermutation);
        
    } catch (e) {
        console.warn("Lỗi khi dọn dẹp sàn đấu lúc khôi phục (sử dụng fillBlocks):", e);
        
        // GIẢI PHÁP DỰ PHÒNG: nếu fillBlocks vẫn lỗi (do lý do khác)
        // thì ta quay lại dùng cách thủ công để đảm bảo sàn đấu vẫn được dọn.
        console.warn("Đang thử dọn dẹp theo cách thủ công...");
        const { from, to } = volume; // Lúc này mới cần tách ra
        for (let x = from.x; x <= to.x; x++) {
            for (let z = from.z; z <= to.z; z++) {
                for (let y = from.y; y <= to.y; y++) {
                    try {
                        dimension.getBlock({x, y, z}).setPermutation(airPermutation);
                    } catch {}
                }
            }
        }
    }
    // === PHẦN SỬA LỖI KẾT THÚC ===

    // Code phía sau giữ nguyên, không thay đổi.
    // Lên lịch để khôi phục lại các block đã sao lưu.
    system.run(() => {
        // Vòng lặp này khôi phục lại các block cũ, đã đúng sẵn rồi
        for (const blockData of arenaBackup.blocks) {
            try {
                const block = dimension.getBlock(blockData.location);
                if (block) block.setPermutation(blockData.permutation);
            } catch (e) {
                // Bỏ qua lỗi nhỏ nếu không thể đặt lại một block
            }
        }

        // Tạo âm thanh hoàn tác
        const center = { 
            x: volume.from.x + (volume.to.x - volume.from.x) / 2, 
            y: volume.from.y + (volume.to.y - volume.from.y) / 2, 
            z: volume.from.z + (volume.to.z - volume.from.z) / 2 
        }
        try {
            dimension.playSound("block.generic.large_fall", center, { pitch: 0.7 });
        } catch (e) { /* Bỏ qua nếu không thể phát âm thanh */ }
    });
}
/**
 * Xử lý khi một quái vật trong thử thách bị tiêu diệt.
 * Vai trò của hàm này GIỜ CHỈ LÀ ĐỂ GIẢM SỐ ĐẾM HIỂN THỊ TRÊN MÀN HÌNH.
 * @param {import("@minecraft/server").Entity} deadEntity
 */
export function handleChallengeMobDeath(deadEntity) {
    const challengeTag = deadEntity.getTags().find(tag => tag.startsWith("challenge_mob_"));
    if (!challengeTag) return;

    const hostName = challengeTag.substring("challenge_mob_".length);
    const challengeState = activeChallenges.get(hostName);

    // Bỏ qua nếu không tìm thấy trận đấu hoặc đợt đấu đang kết thúc
    if (!challengeState || challengeState.isWaveEnding) return;

    // Giảm số lượng quái còn lại để hiển thị cho chính xác
    if (challengeState.mobsRemaining > 0) {
        challengeState.mobsRemaining--;
    }
    
    // Lưu ý: Phần kiểm tra if (mobsRemaining <= 0) đã được gỡ bỏ hoàn toàn,
    // vì "bộ não" thời gian sẽ quyết định khi nào kết thúc đợt.
}