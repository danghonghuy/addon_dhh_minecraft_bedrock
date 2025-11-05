// --- START OF FILE skills/hellfire_pit.js --- (PHIÊN BẢN SỬA LỖI)

import { system, world, BlockPermutation, GameMode, MolangVariableMap } from "@minecraft/server";
import { Vector } from "./vector.js";

const PIT_DEPTH = 10;
const WARNING_DURATION_TICKS = 40; // 2 giây cảnh báo

/**
 * Tạo một hố dung nham riêng lẻ dưới chân một mục tiêu, kèm theo hiệu ứng nâng cấp.
 * @param {import("@minecraft/server").Entity} target
 * @param {number} durationSeconds Thời gian hố tồn tại
 */
async function createSinglePitForTarget(player,target, durationSeconds) {
    if (!target.isValid) return;

    const dimension = target.dimension;
    const centerLocation = target.location;

    // --- BƯỚC 1: CẢNH BÁO TẠI VỊ TRÍ MỤC TIÊU VỚI HÀO QUANG LỬA ---
    const warningInterval = system.runInterval(() => {
        if (!target.isValid) {
            system.clearRun(warningInterval);
            return;
        }
        // Hào quang lửa bao quanh mục tiêu
            const firePillarHeight = 10; // Số vòng lửa xếp chồng lên nhau
        const particlesPerRing = 12; // Số hạt mỗi vòng

        for (let y = 0; y < firePillarHeight; y++) { // Vòng lặp chiều cao
            for (let i = 0; i < particlesPerRing; i++) { // Vòng lặp vẽ vòng tròn
                const angle = (i / particlesPerRing) * 2 * Math.PI;
                const radius = 1.5;
                const particleLoc = {
                    x: target.location.x + Math.cos(angle) * radius,
                    y: target.location.y + (y * 0.5), // Tăng chiều cao mỗi vòng, 0.5 là khoảng cách giữa các vòng
                    z: target.location.z + Math.sin(angle) * radius
                };
                dimension.spawnParticle("minecraft:basic_flame_particle", particleLoc);
            }
        }
    }, 4);
    dimension.playSound("note.bass", centerLocation, { pitch: 0.5 });

    // --- BƯỚC 2: SAU 2 GIÂY, TẠO HỐ VỚI HIỆU ỨNG NỔ ---
    system.runTimeout(async () => {
        system.clearRun(warningInterval);
        if (!target.isValid) return;

        const pitLocation = target.location;
        const pitSize = 1;
        
        // Đảm bảo tọa độ hợp lệ và không âm
        const centerX = Math.floor(pitLocation.x);
        const centerZ = Math.floor(pitLocation.z);
        const topY = Math.floor(pitLocation.y - 1);
        const bottomY = Math.max(topY - PIT_DEPTH, -64); // Giới hạn không đào quá sâu
        
        const fromVec = {
            x: centerX - pitSize,
            y: bottomY,
            z: centerZ - pitSize
        };
        const toVec = {
            x: centerX + pitSize,
            y: topY,
            z: centerZ + pitSize
        };
        
        // Lưu trữ blocks gốc
        const originalBlocks = [];
        
        // Hiệu ứng nổ khi tạo hố
         // Âm thanh nổ to và trầm
        dimension.playSound("random.explode", pitLocation, {
            volume: 1.5,
            pitch: 0.7
        });
        // Hiệu ứng hạt nổ lớn
        dimension.spawnParticle("minecraft:huge_explosion_emitter", pitLocation);

        // Tạo hố từng block một thay vì dùng fillBlocks
        try {
            for (let x = fromVec.x; x <= toVec.x; x++) {
                for (let z = fromVec.z; z <= toVec.z; z++) {
                    for (let y = toVec.y; y >= fromVec.y; y--) {
                        const blockLoc = { x, y, z };
                        const block = dimension.getBlock(blockLoc);
                        
                        if (block) {
                            // Lưu block gốc nếu không phải air
                            if (!block.isAir) {
                                originalBlocks.push({ 
                                    location: { x, y, z }, 
                                    permutation: block.permutation 
                                });
                            }
                            
                            // Đặt block mới
                            if (y === bottomY) {
                                // Đáy hố là lava
                                block.setPermutation(BlockPermutation.resolve("minecraft:lava"));
                            } else {
                                // Phần trên là air
                                block.setPermutation(BlockPermutation.resolve("minecraft:air"));
                            }
                        }
                    }
                }
            }
            
            // Thêm hiệu ứng lửa xung quanh hố
              const pitFirePillarHeight = 10; // Chiều cao trụ lửa
        const pitParticlesPerRing = 16; // Số hạt mỗi vòng

        for (let y = 0; y < pitFirePillarHeight; y++) { // Vòng lặp chiều cao
            for (let i = 0; i < pitParticlesPerRing; i++) { // Vòng lặp vẽ vòng tròn
                const angle = (i / pitParticlesPerRing) * 2 * Math.PI;
                const radius = 2.5; // Tăng bán kính một chút cho rộng
                const flameLoc = {
                    x: pitLocation.x + Math.cos(angle) * radius,
                    y: pitLocation.y + (y * 0.5), // Tăng chiều cao mỗi vòng
                    z: pitLocation.z + Math.sin(angle) * radius
                };
                dimension.spawnParticle("minecraft:basic_flame_particle", flameLoc);
            }
        }

        } catch(e) { 
            console.error("[Hellfire Pit] Error creating single pit:", e);
            player?.sendMessage("§cLỗi khi tạo hố lửa!");
            return;
        }

        // --- BƯỚC 3: HẸN GIỜ KHÔI PHỤC VỚI HIỆU ỨNG "CHỮA LÀNH" ĐỊA HÌNH ---
        system.runTimeout(() => {
            try {
                dimension.playSound("block.generic.large_fall", pitLocation, { pitch: 0.7 });
                
                // Hiệu ứng "chữa lành" địa hình
                for(const blockData of originalBlocks) {
                    dimension.spawnParticle("minecraft:totem_particle", blockData.location);
                    const block = dimension.getBlock(blockData.location);
                    if (block) {
                        try {
                            block.setPermutation(blockData.permutation);
                        } catch(restoreError) {
                            console.warn("[Hellfire Pit] Could not restore block at", blockData.location);
                        }
                    }
                }
            } catch(restoreError) {
                console.error("[Hellfire Pit] Error during pit restoration:", restoreError);
            }
        }, durationSeconds * 20);

    }, WARNING_DURATION_TICKS);
}

/**
 * Kích hoạt kỹ năng Vực Lửa Địa Ngục
 * @param {import("@minecraft/server").Player} player
 * @param {object} stats
 * @returns {boolean}
 */
export function activateHellfirePit(player, stats) {
    try {
        const skillLevel = stats.skills.hellfire_pit ?? 1;

        const MAX_TARGETS = 1 + skillLevel * 2;
        const RADIUS = 6 + skillLevel * 2;
        const DURATION_SECONDS = 10 + skillLevel;

        const nearbyEnemies = player.dimension.getEntities({
            location: player.location,
            maxDistance: RADIUS,
            excludeTags: ["dhh_spirit_beast"],
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

        player.sendMessage(`§cMặt đất dưới chân §e${targetsToTrap.length}§c mục tiêu sắp sụp đổ!`);
        
        for (const target of targetsToTrap) {
            createSinglePitForTarget(player,target, DURATION_SECONDS);
        }
        
        return true;

    } catch (e) {
        player.sendMessage("§cKhông thể thực hiện kỹ năng!");
        console.error("Hellfire Pit skill failed: ", e);
        return false;
    }
}