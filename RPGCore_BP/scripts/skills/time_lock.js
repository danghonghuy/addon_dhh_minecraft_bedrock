// --- START OF FILE skills/time_lock.js --- (PHIÊN BẢN NÂNG CẤP THEO YÊU CẦU)

import { system, world, GameMode } from "@minecraft/server";
import { Vector } from "./vector.js";

// Một đối tượng toàn cục để lưu trữ trạng thái của các thực thể bị đóng băng
const frozenEntities = new Map();

/**
 * Quản lý hiệu ứng của kỹ năng Giam Cầm Thời Gian
 * @param {import("@minecraft/server").Player} player
 * @param {object} stats
 */
function manageTimeLockAura(player, stats) {
    const skillLevel = stats.skills.time_lock ?? 1;

    // ===================================================================
    // === CÁC THÔNG SỐ KỸ NĂNG MỚI THEO YÊU CẦU =========================
    // ===================================================================
    const DURATION_SECONDS = 10 + skillLevel * 5; // Cấp 1: 15s, Cấp 9: 55s
    const DURATION_TICKS = DURATION_SECONDS * 20;
    const RADIUS = 6 + skillLevel * 2; // Cấp 1: 8 khối, Cấp 9: 24 khối
    const RUN_EVERY_X_TICKS = 4; // Tăng tần suất quét để cảm giác mượt hơn

    let ticksLived = 0;
    const timeLockInstanceId = Date.now();
    player.setDynamicProperty("dhh:timelock_instance", timeLockInstanceId);
    
    // --- Hiệu ứng hình ảnh và âm thanh khi kích hoạt ---
    player.dimension.playSound("block.beacon.activate", player.location, { volume: 2.0, pitch: 0.5 });
    player.dimension.spawnParticle("minecraft:sonic_explosion", player.location);

    // Thêm hiệu ứng màn hình cho người chơi
    try {
        player.onScreenDisplay.setTitle(" ", { subtitle: "§d§lTHỜI GIAN NGƯNG ĐỌNG", fadeInDuration: 20, stayDuration: 40, fadeOutDuration: 20 });
        player.camera.setCamera("minecraft:free", {
            rotation: { x: player.getRotation().x, y: player.getRotation().y },
            location: player.getHeadLocation(),
            effects: {
                post: "powder_snow", 
                inherited: false,
            }
        });
        system.runTimeout(() => {
            if (player.isValid) player.camera.clear();
        }, 80);
    } catch(e) { /* Bỏ qua lỗi camera nếu có */ }

    const auraInterval = system.runInterval(() => {
        // --- Điều kiện dừng ---
        if (
            !player.isValid ||
            ticksLived >= DURATION_TICKS ||
            player.getDynamicProperty("dhh:timelock_instance") !== timeLockInstanceId
        ) {
            system.clearRun(auraInterval);
            
            // Cleanup: Xóa tất cả effects khỏi entities bị đóng băng
            for (const [entityId, originalState] of frozenEntities.entries()) {
                const entity = world.getEntity(entityId);
                if (entity && entity.isValid) {
                    try {
                        // Xóa tất cả effects
                        entity.removeEffect("slowness");
                        entity.removeEffect("jump_boost");
                        entity.removeEffect("weakness");
                        entity.removeEffect("mining_fatigue");
                        entity.removeEffect("blindness");
                        
                        // Khôi phục velocity cho projectile
                        if (originalState.velocity) {
                           entity.applyImpulse(originalState.velocity); 
                        }
                        
                        // Nếu là player, clear thông báo
                        if (entity.typeId === "minecraft:player") {
                            entity.onScreenDisplay.setTitle("", { 
                                subtitle: "", 
                                fadeInDuration: 1, 
                                stayDuration: 1, 
                                fadeOutDuration: 1 
                            });
                            entity.sendMessage("§aThời gian đã trở lại bình thường!");
                        }
                    } catch (e) { /* Ignored */ }
                }
            }
            frozenEntities.clear();
            
            if (player.isValid) {
                player.setDynamicProperty("dhh:timelock_instance", undefined);
                player.sendMessage("§eThời gian đã trở lại bình thường.");
                player.onScreenDisplay.setActionBar("");
                player.dimension.playSound("block.beacon.deactivate", player.location, { volume: 2.0, pitch: 0.5 });
            }
            return;
        }
        
        // ===================================================================
        // === HIỆU ỨNG HÌNH ẢNH MỚI CỦA LÃNH ĐỊA ===========================
        // ===================================================================
        const playerLoc = player.location;

        // --- Hiệu ứng mưa lá anh đào rơi từ trên cao ---
        const leafParticles = 30;
        for (let i = 0; i < leafParticles; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * RADIUS;
            const yOffset = Math.random() * 6 + 4;
            const particleLoc = { 
                x: playerLoc.x + Math.cos(angle) * distance, 
                y: playerLoc.y + yOffset, 
                z: playerLoc.z + Math.sin(angle) * distance 
            };
            player.dimension.spawnParticle("minecraft:cherry_leaves_particle", particleLoc);
        }

        // --- Hiệu ứng hạt ender bay lơ lửng xung quanh ---
        const enderParticles = 30;
        for (let i = 0; i < enderParticles; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * RADIUS;
            const yOffset = Math.random() * 3;
            const particleLoc = { 
                x: playerLoc.x + Math.cos(angle) * distance, 
                y: playerLoc.y + yOffset, 
                z: playerLoc.z + Math.sin(angle) * distance 
            };
            player.dimension.spawnParticle("minecraft:portal_particle", particleLoc); 
        }

        // --- Logic chính: Đóng băng các thực thể mới ---
     const VERTICAL_RANGE = 128; 

const entitiesInRadius = player.dimension.getEntities({
    location: player.location,
    maxDistance: RADIUS, // Vẫn giữ để tối ưu bước đầu
    excludeNames: [player.nameTag] 
}).filter(entity => {
    // Lọc lại lần nữa: chỉ giữ lại những thực thể có khoảng cách chiều dọc đủ gần
    return Math.abs(entity.location.y - player.location.y) <= VERTICAL_RANGE;
});

        for (const entity of entitiesInRadius) {
            if (!frozenEntities.has(entity.id)) {
                const originalState = {};
                
                // Xử lý projectile (mũi tên, fireball, etc.)
                if (entity.getComponent("minecraft:projectile")) {
                    originalState.velocity = entity.getVelocity();
                        entity.clearVelocity();
                }
                
                frozenEntities.set(entity.id, originalState);

                try {
                    // Áp dụng effects đóng băng cho TẤT CẢ entities
                    entity.addEffect("slowness", DURATION_TICKS, { amplifier: 255, showParticles: false });
                    entity.addEffect("jump_boost", DURATION_TICKS, { amplifier: 128, showParticles: false });
                    entity.addEffect("weakness", DURATION_TICKS, { amplifier: 255, showParticles: false });
                    entity.addEffect("mining_fatigue", DURATION_TICKS, { amplifier: 255, showParticles: false });
                    entity.addEffect("blindness", DURATION_TICKS, { amplifier: 1, showParticles: false });
                    
                    // Xử lý đặc biệt cho player bị đóng băng
                    if (entity.typeId === "minecraft:player") {
                        try {
                            entity.onScreenDisplay.setTitle("§c§lĐÓNG BĂNG!", { 
                                subtitle: "§7Bạn bị giam cầm trong thời gian...", 
                                fadeInDuration: 10, 
                                stayDuration: DURATION_TICKS, 
                                fadeOutDuration: 10 
                            });
                            entity.sendMessage(`§c§lBạn đã bị ${player.nameTag} đóng băng bởi Time Lock!`);
                        } catch(e) { /* Ignore screen errors */ }
                    }
                    
                } catch(e) { 
                    console.warn("Failed to apply freeze effects to entity:", entity.id, e);
                }
            }
            
            // Hiệu ứng hạt dày đặc trên thực thể bị đóng băng
            player.dimension.spawnParticle("minecraft:portal_particle", entity.location);
        }
        
        // --- Cập nhật ActionBar ---
        const remainingSeconds = Math.ceil((DURATION_TICKS - ticksLived) / 20);
        const frozenCount = frozenEntities.size;
        player.onScreenDisplay.setActionBar(
            `§e§lGiam Cầm Thời Gian: §f${remainingSeconds}s §7(${RADIUS}m) §c${frozenCount} entities`
        );

        ticksLived += RUN_EVERY_X_TICKS;
    }, RUN_EVERY_X_TICKS);
}


/**
 * Kích hoạt kỹ năng Giam Cầm Thời Gian
 * @param {import("@minecraft/server").Player} player
 * @param {object} stats
 * @returns {boolean}
 */
export function activateTimeLock(player, stats) {
    try {
        if (player.getDynamicProperty("dhh:timelock_instance")) {
            player.sendMessage("§cBạn chỉ có thể giam cầm thời gian một lần!");
            return false;
        }

        player.sendMessage("§eBạn bẻ cong thực tại, ngưng đọng thời gian!");
        manageTimeLockAura(player, stats);
        return true;

    } catch (e) {
        player.sendMessage("§cKhông thể thực hiện kỹ năng!");
        console.error("Time Lock skill failed: ", e.stack);
        return false;
    }
}