import { system, world, BlockPermutation, EntityComponentTypes } from "@minecraft/server";
import { Vector } from "./vector.js";

const PLAYER_RNG_EFFECTS = [
    { effectId: "speed", duration: 100, amplifier: 2, message: "§bbỗng trở nên nhanh nhẹn!" },
    { effectId: "strength", duration: 100, amplifier: 1, message: "§ccảm thấy sức mạnh cuộn trào!" },
    { effectId: "jump_boost", duration: 100, amplifier: 2, message: "§anhảy cao như một con thỏ!" },
    { effectId: "regeneration", duration: 60, amplifier: 2, message: "§dcảm nhận sinh lực hồi phục!" },
    { effectId: "resistance", duration: 100, amplifier: 1, message: "§7trở nên cứng cáp lạ thường!" },
    { effectId: "fire_resistance", duration: 200, amplifier: 0, message: "§6cảm thấy mát mẻ!" },
    { effectId: "slowness", duration: 80, amplifier: 1, message: "§8cảm thấy chân nặng trịch!" },
    { effectId: "weakness", duration: 80, amplifier: 1, message: "§8cảm thấy bủn rủn tay chân!" },
    { effectId: "mining_fatigue", duration: 100, amplifier: 1, message: "§8bỗng nhiên lười biếng!" },
    { effectId: "nausea", duration: 120, amplifier: 0, message: "§2thấy trời đất quay cuồng!" },
    { effectId: "blindness", duration: 40, amplifier: 0, message: "§8mọi thứ tối sầm lại!" },
    { effectId: "levitation", duration: 40, amplifier: 0, message: "§bđang lơ lửng!" }
];

function applyRandomPlayerEffect(dimension, center, radius) {
    const players = dimension.getPlayers({ location: center, maxDistance: radius });
    for (const player of players) {
        const randomEffect = PLAYER_RNG_EFFECTS[Math.floor(Math.random() * PLAYER_RNG_EFFECTS.length)];
        // SỬA LỖI: Truyền thẳng effectId (chuỗi) thay vì đối tượng EffectType
        player.addEffect(randomEffect.effectId, randomEffect.duration, { amplifier: randomEffect.amplifier, showParticles: false });
        player.sendMessage(`§eTrong Vùng Hỗn Loạn, bạn ${randomEffect.message}`);
    }
}

// ... (TOÀN BỘ PHẦN CÒN LẠI CỦA FILE GIỮ NGUYÊN, KHÔNG CẦN THAY ĐỔI)
const ANOMALIES = {
    GRAVITY_FLUX: (d, c, r, p) => {
        const targets = d.getEntities({ location: c, maxDistance: r, families: ["monster"] });
        for (const target of targets) {
            target.applyKnockback(0, 0, 0, 1.5);
            target.addEffect("slow_falling", 80, { amplifier: 1 });
        }
        p.sendMessage("§dDị thường: Trọng lực vô hiệu!");
        d.playSound("entity.warden.sonic_boom", c);
    },
    POSITION_SCRAMBLE: (d, c, r, p) => {
        const targets = d.getEntities({ location: c, maxDistance: r, families: ["monster"] });
        if (targets.length < 2) return;
        const locations = targets.map(t => t.location);
        for (let i = locations.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [locations[i], locations[j]] = [locations[j], locations[i]];
        }
        targets.forEach((target, index) => {
            target.teleport(locations[index]);
            d.spawnParticle("minecraft:portal_reverse_particle", target.location);
        });
        p.sendMessage("§dDị thường: Ma trận vị trí!");
        d.playSound("mob.shulker.teleport", c, { volume: 2 });
    },
    TARGET_SWAP: (d, c, r, p) => {
        const targets = d.getEntities({ location: c, maxDistance: r, families: ["monster"] });
        if (targets.length < 2) return;
        let t1 = targets[Math.floor(Math.random() * targets.length)];
        let t2 = targets.find(t => t !== t1);
        if (!t2) return;
        const loc1 = t1.location, loc2 = t2.location;
        t1.teleport(loc2);
        t2.teleport(loc1);
        p.sendMessage("§dDị thường: Hoán đổi mục tiêu!");
        d.playSound("mob.shulker.teleport", c);
    },
    RANDOM_TELEPORT: (d, c, r, p) => {
        const targets = d.getEntities({ location: c, maxDistance: r, families: ["monster"] });
        for (const target of targets) {
            const angle = Math.random() * 2 * Math.PI;
            const dist = Math.random() * r;
            target.teleport({ x: c.x + Math.cos(angle) * dist, y: target.location.y, z: c.z + Math.sin(angle) * dist }, { checkForBlocks: true });
        }
        p.sendMessage("§dDị thường: Dịch chuyển hỗn loạn!");
        d.playSound("mob.endermen.portal", c);
    },
    LIQUID_METEOR: (d, c, r, p) => {
        const meteorType = Math.random() < 0.5 ? "water" : "lava";
        const blockType = BlockPermutation.resolve(`minecraft:${meteorType}`);
        const meteorCenter = { x: c.x, y: c.y + 20, z: c.z };
        const meteorRadius = 4;
        p.sendMessage(`§dDị thường: Một thiên thạch §c${meteorType === "lava" ? "DUNG NHAM" : "NƯỚC"}§d đang hình thành!`);
        d.playSound("entity.wither.spawn", c);
        for (let x = -meteorRadius; x <= meteorRadius; x++) {
            for (let y = -meteorRadius; y <= meteorRadius; y++) {
                for (let z = -meteorRadius; z <= meteorRadius; z++) {
                    if (x * x + y * y + z * z <= meteorRadius * meteorRadius) {
                        const blockLoc = { x: meteorCenter.x + x, y: meteorCenter.y + y, z: meteorCenter.z + z };
                        const block = d.getBlock(blockLoc);
                        if (block && block.isAir) {
                            block.setPermutation(blockType);
                        }
                    }
                }
            }
        }
        system.runTimeout(() => {
            const air = BlockPermutation.resolve("minecraft:air");
            for (let x = -meteorRadius; x <= meteorRadius; x++) {
                for (let y = -meteorRadius; y <= meteorRadius; y++) {
                    for (let z = -meteorRadius; z <= meteorRadius; z++) {
                        if (x * x + y * y + z * z <= meteorRadius * meteorRadius) {
                            const blockLoc = { x: meteorCenter.x + x, y: meteorCenter.y + y, z: meteorCenter.z + z };
                            const block = d.getBlock(blockLoc);
                            if (block && (block.typeId === "minecraft:water" || block.typeId === "minecraft:lava")) {
                                block.setPermutation(air);
                            }
                        }
                    }
                }
            }
            d.playSound("entity.generic.explode", c);
        }, 60);
    },
    UNSTABLE_GROUND: (d, c, r, p) => {
        const hazardBlocks = [BlockPermutation.resolve("minecraft:cobweb"), BlockPermutation.resolve("minecraft:soul_sand"), BlockPermutation.resolve("minecraft:magma_block"), BlockPermutation.resolve("minecraft:powder_snow"), BlockPermutation.resolve("minecraft:sweet_berry_bush")];
        const changeCount = 20;
        for (let i = 0; i < changeCount; i++) {
            const randomAngle = Math.random() * 2 * Math.PI;
            const randomDist = Math.random() * r;
            const checkLoc = { x: Math.floor(c.x + Math.cos(randomAngle) * randomDist), y: Math.floor(c.y), z: Math.floor(c.z + Math.sin(randomAngle) * randomDist) };
            for (let y = 0; y < 5; y++) {
                const groundBlock = d.getBlock({ x: checkLoc.x, y: checkLoc.y - y, z: checkLoc.z });
                const airBlock = d.getBlock({ x: checkLoc.x, y: checkLoc.y - y + 1, z: checkLoc.z });
                if (groundBlock && !groundBlock.isAir && airBlock && airBlock.isAir) {
                    const randomHazard = hazardBlocks[Math.floor(Math.random() * hazardBlocks.length)];
                    groundBlock.setPermutation(randomHazard);
                    break;
                }
            }
        }
        p.sendMessage("§dDị thường: Vùng đất bị nguyền rủa!");
        d.playSound("block.sculk.spread", c);
    },
    FANG_ERUPTION: (d, c, r, p) => {
        const fangCount = 15 + Math.floor(Math.random() * 10);
        for (let i = 0; i < fangCount; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * r;
            const loc = { x: c.x + Math.cos(angle) * distance, y: c.y, z: c.z + Math.sin(angle) * distance };
            system.runTimeout(() => {
                d.spawnEntity("minecraft:evocation_fang", loc);
            }, i * 2);
        }
        p.sendMessage("§dDị thường: Nanh địa ngục trỗi dậy!");
        d.playSound("entity.evoker.prepare_attack", c);
    },
    TERRAFORM: (d, c, r, p) => {
        p.sendMessage("§dDị thường: Địa hình biến dạng!");
        d.playSound("block.sculk.charge", c);
        const blocksToChange = ["stone", "dirt", "grass_block", "sand", "gravel", "deepslate", "netherrack", "end_stone"];
        const targetBlocks = ["glass", "wool", "slime", "honey_block", "ice", "soul_sand", "cobweb"];
        for (let i = 0; i < 50; i++) {
            const loc = { x: c.x + Math.random() * r * 2 - r, y: c.y + Math.random() * 10 - 5, z: c.z + Math.random() * r * 2 - r };
            const block = d.getBlock(loc);
            if (block && blocksToChange.some(b => block.typeId.includes(b))) {
                block.setPermutation(BlockPermutation.resolve(`minecraft:${targetBlocks[Math.floor(Math.random() * targetBlocks.length)]}`));
            }
        }
    },
    TIME_DISTORTION: (d, c, r, p) => {
        const targets = d.getEntities({ location: c, maxDistance: r, families: ["monster"] });
        if (targets.length < 1) return;
        for (let i = targets.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [targets[i], targets[j]] = [targets[j], targets[i]];
        }
        const half = Math.ceil(targets.length / 2);
        const frozenTargets = targets.slice(0, half);
        const spedUpTargets = targets.slice(half);
        for (const target of frozenTargets) {
            target.addEffect("slowness", 160, { amplifier: 255 });
        }
        for (const target of spedUpTargets) {
            target.addEffect("speed", 160, { amplifier: 4 });
        }
        p.sendMessage("§dDị thường: Thời gian phân mảnh!");
        d.playSound("block.portal.trigger", c, { pitch: 0.5 });
    },
    SHRINK_AND_GROW: (d, c, r, p) => {
        p.sendMessage("§dDị thường: Kích thước biến đổi!");
        d.playSound("entity.pufferfish.blow_up", c);
        const targets = d.getEntities({ location: c, maxDistance: r, families: ["monster"] });
        for (const target of targets) {
            const scaleComp = target.getComponent(EntityComponentTypes.Scale);
            if (scaleComp) {
                scaleComp.value = Math.random() * 1.5 + 0.5;
            }
        }
        system.runTimeout(() => {
            for (const target of targets) {
                if (target.isValid) target.getComponent(EntityComponentTypes.Scale)?.resetToDefaultValue();
            }
        }, 160);
    },
    INVENTORY_CHAOS: (d, c, r, p) => {
        const players = d.getPlayers({ location: c, maxDistance: r });
        for (const player of players) {
            const inv = player.getComponent('inventory').container;
            if (inv) {
                const item = inv.getItem(player.selectedSlotIndex);
                const randomSlot = Math.floor(Math.random() * inv.size);
                inv.setItem(player.selectedSlotIndex, undefined);
                inv.setItem(randomSlot, item);
                p.sendMessage(`§dDị thường: Vật phẩm của §f${player.nameTag}§d bị hoán đổi!`);
            }
        }
        d.playSound("random.pop", c);
    },
    PROJECTILE_REFLECTION: (d, c, r, p) => {
        const projectiles = d.getEntities({ location: c, maxDistance: r, types: ["minecraft:arrow", "minecraft:fireball", "minecraft:snowball", "minecraft:wither_skull"] });
        for (const proj of projectiles) {
            const vel = proj.getVelocity();
            proj.clearVelocity();
            proj.applyImpulse({ x: -vel.x * 1.2, y: -vel.y * 1.2, z: -vel.z * 1.2 });
        }
        if (projectiles.length > 0) p.sendMessage("§dDị thường: Đạn dược bị phản hồi!");
    },
    PHANTOM_SUMMON: (d, c, r, p) => {
        const count = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < count; i++) d.spawnEntity("minecraft:phantom", c);
        p.sendMessage("§dDị thường: Bóng ma từ trên trời!");
        d.playSound("entity.phantom.ambient", c);
    },
    ANIMAL_STAMPEDE: (d, c, r, p) => {
        const animals = ["cow", "pig", "sheep", "chicken", "horse", "llama"];
        const count = Math.floor(Math.random() * 10) + 15;
        for (let i = 0; i < count; i++) {
            const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
            const angle = Math.random() * Math.PI * 2;
            const dist = r * (0.8 + Math.random() * 0.2);
            const loc = { x: c.x + Math.cos(angle) * dist, y: c.y + 1, z: c.z + Math.sin(angle) * dist };
            d.spawnEntity(`minecraft:${randomAnimal}`, loc);
        }
        p.sendMessage("§dDị thường: Đàn gia súc nổi loạn!");
        d.playSound("entity.ravager.roar", c);
    },
    ENTITY_DUPLICATION: (d, c, r, p) => {
        const targets = d.getEntities({ location: c, maxDistance: r, families: ["monster"] });
        if (targets.length === 0) return;
        const target = targets[Math.floor(Math.random() * targets.length)];
        d.spawnEntity(target.typeId, target.location);
        p.sendMessage(`§dDị thường: §c${target.typeId.split(':')[1]}§d đã tự nhân đôi!`);
        d.playSound("entity.evoker.prepare_summon", c);
    },
    BEE_SWARM: (d, c, r, p) => {
        p.sendMessage("§dDị thường: Bầy ong thịnh nộ!");
        d.playSound("entity.bee.angry", c);
        const count = Math.floor(Math.random() * 5) + 5;
        for (let i = 0; i < count; i++) {
            const bee = d.spawnEntity("minecraft:bee", p.location);
            bee.triggerEvent('minecraft:become_angry');
        }
    },
    LOCALIZED_STORM: (d, c, r, p) => {
        p.sendMessage("§dDị thường: Cơn bão sấm sét cục bộ!");
        d.playSound("ambient.weather.thunder", c);
        const count = Math.floor(Math.random() * 4) + 3;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const dist = Math.random() * r;
            system.runTimeout(() => d.spawnEntity("minecraft:lightning_bolt", { x: c.x + Math.cos(angle) * dist, y: c.y, z: c.z + Math.sin(angle) * dist }), i * 15);
        }
    },
    FLASH_FREEZE: (d, c, r, p) => {
        p.sendMessage("§dDị thường: Đóng băng tức thời!");
        d.playSound("block.glass.break", c, { volume: 2 });
        for (let x = -r; x <= r; x++) {
            for (let z = -r; z <= r; z++) {
                for (let y = -2; y <= 4; y++) {
                    if (Math.sqrt(x * x + z * z) > r) continue;
                    const loc = { x: c.x + x, y: c.y + y, z: c.z + z };
                    const block = d.getBlock(loc);
                    if (!block) continue;
                    if (block.typeId === "minecraft:water") block.setPermutation(BlockPermutation.resolve("minecraft:ice"));
                    if (block.typeId === "minecraft:lava") block.setPermutation(BlockPermutation.resolve("minecraft:obsidian"));
                }
            }
        }
    },
    RANDOM_EXPLOSIONS: (d, c, r, p) => {
        const count = Math.floor(Math.random() * 5) + 3;
        p.sendMessage("§dDị thường: Chuỗi nổ bất ngờ!");
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const dist = Math.random() * r;
            const loc = { x: c.x + Math.cos(angle) * dist, y: c.y, z: c.z + Math.sin(angle) * dist };
            system.runTimeout(() => d.createExplosion(loc, 2, { breaksBlocks: false, causesFire: true }), i * 10);
        }
    },
    UPHEAVAL: (d, c, r, p) => {
        p.sendMessage("§dDị thường: Mặt đất trồi sụt!");
        d.playSound("block.piston.extend", c, { volume: 2 });
        for (let i = 0; i < 25; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const dist = Math.random() * r;
            const loc = { x: Math.floor(c.x + Math.cos(angle) * dist), y: Math.floor(c.y - 1), z: Math.floor(c.z + Math.sin(angle) * dist) };
            const block = d.getBlock(loc);
            if (block && !block.isAir) {
                const perm = block.permutation;
                block.setPermutation(BlockPermutation.resolve("minecraft:air"));
                system.runTimeout(() => { if (d.getBlock(loc)) d.getBlock(loc).setPermutation(perm); }, 80 + Math.random() * 40);
            }
        }
    },
    SILENCE: (d, c, r, p) => {
        const players = d.getPlayers({ location: c, maxDistance: r });
        p.sendMessage("§dDị thường: Câm lặng bao trùm!");
        d.playSound("entity.warden.listening", c);
        for (const player of players) {
            player.addTag('dhh_silenced');
            player.onScreenDisplay.setTitle("§8CÂM LẶNG", { subtitle: "Bạn không thể dùng kỹ năng", stayDuration: 60 });
            system.runTimeout(() => player.removeTag('dhh_silenced'), 60);
        }
    }
};

const ALL_ANOMALIES = Object.values(ANOMALIES);

export function activateRealityWarp(player, stats) {
    try {
        if (player.hasTag('dhh_silenced')) {
            player.sendMessage("§cBạn đang bị Câm Lặng!");
            return false;
        }

        const skillLevel = stats.skills.reality_warp ?? 1;
        const RADIUS = 8 + skillLevel * 2;
        const DURATION_SECONDS = 20 + (skillLevel - 1) * 10;
        const ANOMALY_INTERVAL_TICKS = 60;
        const PLAYER_FX_INTERVAL_TICKS = 60;

        const centerLocation = player.location;
        let ticksLived = 0;
        const durationTicks = DURATION_SECONDS * 20;

        player.sendMessage("§5Bạn giải phóng một Vùng Hỗn Loạn Cực Đại!");
        player.playSound("block.end_portal.spawn", { pitch: 0.8, volume: 2.0 });

        const warpZoneInterval = system.runInterval(() => {
            if (!player.isValid || ticksLived >= durationTicks) {
                system.clearRun(warpZoneInterval);
                if (player.isValid) {
                    player.onScreenDisplay.setActionBar("");
                    player.sendMessage("§5Vùng Hỗn Loạn đã ổn định.");
                    player.playSound("block.beacon.deactivate", { pitch: 0.7, volume: 2.0 });
                }
                return;
            }

         const particleCount = 40 + Math.floor(RADIUS * 2);
            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * RADIUS;
                const yOffset = Math.random() * 5 - 0.5;
                const particleLoc = { x: centerLocation.x + Math.cos(angle) * distance, y: centerLocation.y + yOffset, z: centerLocation.z + Math.sin(angle) * distance };

                let particleType;
                const remainder = i % 4; // Chia cho 4 để có 4 loại hạt luân phiên

                if (remainder === 0) {
                    particleType = "minecraft:totem_particle";
                } else if (remainder === 1) {
                    particleType = "minecraft:end_rod_particle";
                } else if (remainder === 2) {
                    particleType = "minecraft:sculk_soul_particle";
                } else { // remainder === 3
                    particleType = "minecraft:conduit_attack_particle"; // <<-- ĐÂY LÀ HẠT BẠN MỚI THÊM
                }

                player.dimension.spawnParticle(particleType, particleLoc);
            }

            if (ticksLived > 0 && ticksLived % ANOMALY_INTERVAL_TICKS === 0) {
                const randomAnomaly = ALL_ANOMALIES[Math.floor(Math.random() * ALL_ANOMALIES.length)];
                try {
                    randomAnomaly(player.dimension, centerLocation, RADIUS, player);
                } catch (e) {
                    console.warn(`[Reality Warp] Anomaly failed to execute: ${e}`);
                }
            }

            if (ticksLived > 0 && ticksLived % PLAYER_FX_INTERVAL_TICKS === 0) {
                try {
                    applyRandomPlayerEffect(player.dimension, centerLocation, RADIUS);
                } catch (e) {
                    console.warn(`[Reality Warp] Player FX failed to execute: ${e}`);
                }
            }

            const remainingSeconds = Math.ceil((durationTicks - ticksLived) / 20);
            player.onScreenDisplay.setActionBar(`§d§lVùng Hỗn Loạn: §f${remainingSeconds} giây`);
            ticksLived += 4;
        }, 4);

        return true;

    } catch (e) {
        player.sendMessage("§cKhông thể thực hiện kỹ năng!");
        console.error("Reality Warp skill failed: ", e.stack ?? e);
        return false;
    }
}