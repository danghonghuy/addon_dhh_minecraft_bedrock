// --- START OF FILE skills/earthen_grave.js --- (PHIÊN BẢN NÂNG CẤP "BẢN ÁN TỬ HÌNH")

import { system, BlockPermutation } from "@minecraft/server";
import { Vector } from "./vector.js";

const TRAP_BLOCK_TYPE_ID = "minecraft:cobblestone";

/**
 * Xây dựng và quản lý một ngôi mộ trói buộc đa hiệu ứng.
 * @param {import("@minecraft/server").Entity} target
 * @param {number} durationSeconds
 * @param {number} skillLevel
 * @param {import("@minecraft/server").Player} player
 */
function buildAndManageTrap(target, durationSeconds, skillLevel, player) {
    const dimension = target.dimension;
    const trapLocation = target.location;
    const trapBlockPermutation = BlockPermutation.resolve(TRAP_BLOCK_TYPE_ID);

    // THÔNG SỐ NÂNG CẤP
    const witherAmplifier = Math.floor((skillLevel - 1) / 3); // Cấp 1-3: I, 4-6: II, 7-9: III
    const finalBurstDamage = 10 + (skillLevel * 5);

    const cageOffsets = [
        { x: -1, y: -1, z: -1 }, { x: 0, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
        { x: -1, y: -1, z: 0 },                         { x: 1, y: -1, z: 0 },
        { x: -1, y: -1, z: 1 }, { x: 0, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
        { x: -1, y: 0, z: -1 }, { x: 0, y: 0, z: -1 }, { x: 1, y: 0, z: -1 },
        { x: -1, y: 0, z: 0 },                         { x: 1, y: 0, z: 0 },
        { x: -1, y: 0, z: 1 }, { x: 0, y: 0, z: 1 }, { x: 1, y: 0, z: 1 },
        { x: -1, y: 1, z: -1 }, { x: 0, y: 1, z: -1 }, { x: 1, y: 1, z: -1 },
        { x: -1, y: 1, z: 0 },                         { x: 1, y: 1, z: 0 },
        { x: -1, y: 1, z: 1 }, { x: 0, y: 1, z: 1 }, { x: 1, y: 1, z: 1 },
        { x: -1, y: 2, z: -1 }, { x: 0, y: 2, z: -1 }, { x: 1, y: 2, z: -1 },
        { x: -1, y: 2, z: 0 }, { x: 0, y: 2, z: 0 }, { x: 1, y: 2, z: 0 },
        { x: -1, y: 2, z: 1 }, { x: 0, y: 2, z: 1 }, { x: 1, y: 2, z: 1 },
    ];

    const placedBlocks = [];
    for (const offset of cageOffsets) {
        const blockLoc = { x: Math.floor(trapLocation.x + offset.x), y: Math.floor(trapLocation.y + offset.y), z: Math.floor(trapLocation.z + offset.z) };
        const block = dimension.getBlock(blockLoc);
        if (block && block.isAir) {
            try {
                block.setPermutation(trapBlockPermutation);
                placedBlocks.push(blockLoc);
            } catch (e) {}
        }
    }
    
    // Vòng lặp gây hiệu ứng xấu khi bị nhốt
    const debuffInterval = system.runInterval(() => {
        if (!target.isValid) {
            system.clearRun(debuffInterval);
            return;
        }
        target.addEffect("wither", 40, { amplifier: witherAmplifier, showParticles: false });
        target.addEffect("slowness", 40, { amplifier: 4, showParticles: false });
        target.addEffect("weakness", 40, { amplifier: 1, showParticles: false });
        
        // Hiệu ứng hạt để cho thấy kẻ địch đang bị rút sinh lực
        target.dimension.spawnParticle("minecraft:sculk_soul_particle", target.getHeadLocation());

    }, 20); // Mỗi giây

    // Hẹn giờ để phá lồng và gây sát thương nổ
    system.runTimeout(() => {
        system.clearRun(debuffInterval); // Dừng vòng lặp debuff

        // Gây sát thương nổ "Mộ Sập"
        if (target.isValid) {
            target.applyDamage(finalBurstDamage, { causingEntity: player, cause: "magic" });
            target.dimension.spawnParticle("minecraft:huge_explosion_emitter", target.location);
            target.playSound("random.explode", { location: target.location, pitch: 0.8 });
        }

        // Phá lồng
        const airPermutation = BlockPermutation.resolve("minecraft:air");
        for (const blockLoc of placedBlocks) {
            const currentBlock = dimension.getBlock(blockLoc);
            if (currentBlock && currentBlock.typeId === TRAP_BLOCK_TYPE_ID) {
                try {
                    currentBlock.setPermutation(airPermutation);
                } catch(e) {}
            }
        }
    }, durationSeconds * 20);
}

/**
 * Kích hoạt kỹ năng Giam Cầm
 * @param {import("@minecraft/server").Player} player
 * @param {object} stats
 * @returns {boolean}
 */
export function activateEarthenGrave(player, stats) {
    try {
        const skillLevel = stats.skills.earthen_grave ?? 1;

        const DURATION_SECONDS = 5 + skillLevel; // Thời gian giam cầm
        const MAX_TARGETS = 1 + Math.floor(skillLevel / 2); // Số mục tiêu
        const RADIUS = 8 + skillLevel * 2; // Phạm vi

        const nearbyEnemies = player.dimension.getEntities({
            location: player.location,
            maxDistance: RADIUS,
            families: ["monster"]
        });

        if (nearbyEnemies.length === 0) {
            player.sendMessage("§cKhông có mục tiêu nào trong phạm vi!");
            return false;
        }

        nearbyEnemies.sort((a, b) => {
            const distA = Vector.magnitude(Vector.subtract(player.location, a.location));
            const distB = Vector.magnitude(Vector.subtract(player.location, b.location));
            return distA - distB;
        });

        const targetsToTrap = nearbyEnemies.slice(0, MAX_TARGETS);

        player.playSound("block.rooted_dirt.break", { volume: 1.5, pitch: 0.8 });
        
        for (const target of targetsToTrap) {
            // Hiệu ứng trồi lên từ mặt đất
            for (let i = 0; i < 20; i++) {
                const offset = { x: Math.random() * 2 - 1, y: 0, z: Math.random() * 2 - 1 };
                target.dimension.spawnParticle(`minecraft:block_destruct?${TRAP_BLOCK_TYPE_ID}`, Vector.add(target.location, offset));
            }
            buildAndManageTrap(target, DURATION_SECONDS, skillLevel, player);
        }
        
        player.sendMessage(`§6Đã chôn sống §e${targetsToTrap.length}§6 mục tiêu!`);
        return true;

    } catch (e) {
        player.sendMessage("§cKhông thể thực hiện kỹ năng!");
        console.error("Earthen Grave skill failed: ", e.stack);
        return false;
    }
}