// --- START OF FILE: skills/void_step.js (PHIÊN BẢN NÂNG CẤP "VÔ HẠ HẠN") ---

import { world, system, BlockPermutation, MolangVariableMap } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { Vector } from "./vector.js";

const activeVoidSteps = new Map();



// Danh sách các loại đạn thù địch cần xóa
const HOSTILE_PROJECTILES = [
    "minecraft:arrow", "minecraft:fireball", "minecraft:small_fireball", "minecraft:snowball",
    "minecraft:wither_skull", "minecraft:wither_skull_dangerous", "minecraft:shulker_bullet"
];


function endVoidStep(player, message) {
    if (!activeVoidSteps.has(player.nameTag)) return;
    const state = activeVoidSteps.get(player.nameTag);
    system.clearRun(state.intervalId);
    player.removeTag("void_step_active");

 
    activeVoidSteps.delete(player.nameTag);
    
    if (player.isValid) {
        player.onScreenDisplay.setActionBar("");
        if (message) player.sendMessage(message);
        player.playSound("block.beacon.deactivate", { pitch: 0.7 });
        const cooldownSeconds = CONFIG.SKILL_COOLDOWNS.VOID_STEP;
        player.setDynamicProperty("dhh:cd_void_step", system.currentTick + cooldownSeconds * 20);
    }
}


function manageVoidAura(player, stats) {
    const skillLevel = stats.skills.void_step ?? 1;
    const radius = 5 + skillLevel;
    const manaDrainPerSecond = 2;

    // --- BẮT ĐẦU NÂNG CẤP VÔ HẠ HẠN ---
    const MELEE_SLOW_RADIUS = 5 +skillLevel; // Phạm vi đẩy lùi cận chiến
    const PROJECTILE_ERASURE_RADIUS = 5 + skillLevel*2; // Phạm vi xóa đạn
    // --- KẾT THÚC NÂNG CẤP VÔ HẠ HẠN ---

    const state = {
        player, stats, radius,
      
        intervalId: null
    };

    let tickCounter = 0; // Đếm tick để spawn circle không quá thường xuyên
    
    const intervalId = system.runInterval(() => {
        const currentMana = player.getDynamicProperty("dhh:mana");
        if (!player.isValid || !player.hasTag("void_step_active") || currentMana < (manaDrainPerSecond / 10)) {
            endVoidStep(player, currentMana < (manaDrainPerSecond / 10) ? "§cKhông đủ mana để duy trì!" : "§eBước Chân Hư Vô kết thúc.");
            return;
        }

        player.setDynamicProperty("dhh:mana", currentMana - (manaDrainPerSecond / 10)); // Trừ mana mỗi 2 tick

        const playerLoc = player.location;
        const dimension = player.dimension;
        
        // Hiển thị vòng tròn phạm vi dưới chân (mỗi 10 ticks = 0.5s)
        tickCounter++;
        if (tickCounter >= 10) {
            tickCounter = 0;
            const circlePos = {
                x: playerLoc.x,
                y: playerLoc.y + 0.2,
                z: playerLoc.z
            };
            const molang = new MolangVariableMap();
            molang.setFloat("variable.circle_size", radius * 2); // Đường kính = bán kính x 2
            molang.setFloat("variable.particle_lifetime", 0.5); // Tồn tại 0.5 giây
            dimension.spawnParticle("dhh:dark_circle", circlePos, molang);
        }

        // --- HIỆU ỨNG VÔ HẠ HẠN ---
        // 1. Lớp phòng thủ cận chiến
        const nearbyMonsters = dimension.getEntities({
            location: playerLoc, maxDistance: MELEE_SLOW_RADIUS, families: ["monster"]
        });
        for (const monster of nearbyMonsters) {
            monster.addEffect("slowness", 5, { amplifier: 15, showParticles: false });
            // Đẩy lùi quái vật bằng cách thay đổi velocity
            const pushVector = Vector.subtract(monster.location, playerLoc);
            const pushMagnitude = 0.3;
            const normalized = Vector.normalize(pushVector);
            try {
                monster.applyImpulse({ 
                    x: normalized.x * pushMagnitude, 
                    y: 0.1, 
                    z: normalized.z * pushMagnitude 
                });
            } catch(e) {
                // Nếu applyImpulse fail, thử teleport nhẹ
                monster.teleport({
                    x: monster.location.x + normalized.x * 0.5,
                    y: monster.location.y,
                    z: monster.location.z + normalized.z * 0.5
                });
            }
        }

        // 2. Lớp phòng thủ chống đạn
        const nearbyProjectiles = dimension.getEntities({
            location: playerLoc, maxDistance: PROJECTILE_ERASURE_RADIUS
        });
        for (const proj of nearbyProjectiles) {
            // Chỉ xóa projectiles thù địch (không phải item, xp orb, etc)
            if (!HOSTILE_PROJECTILES.includes(proj.typeId)) continue;
            
            // Bỏ qua nếu projectile ở quá xa theo chiều dọc
            if (Math.abs(proj.location.y - playerLoc.y) > 3) continue;
            
            // Xóa sổ viên đạn khỏi thực tại
            dimension.spawnParticle("minecraft:totem_particle", proj.location);
            dimension.playSound("random.fizz", proj.location, { pitch: 2.0 });
            proj.kill();
        }

        // --- HIỆU ỨNG HÌNH ẢNH (Hào quang Hư Vô) ---
        for (let i = 0; i < 15; i++) {
             const angle = Math.random() * Math.PI * 2;
             const dist = Math.random() * radius;
             const yOffset = Math.random() * 3 - 1.5;
             const particleLoc = { x: playerLoc.x + Math.cos(angle) * dist, y: playerLoc.y + yOffset + 1, z: playerLoc.z + Math.sin(angle) * dist};
             dimension.spawnParticle("minecraft:portal_particle", particleLoc);
        }
        
      
        
        player.onScreenDisplay.setActionBar(`§5§lVô Hạ Hạn: §r§d- Tốn ${manaDrainPerSecond.toFixed(1)} Mana/s`);
    }, 2); // Chạy 10 lần mỗi giây để phản ứng nhanh với đạn và kẻ địch

    state.intervalId = intervalId;
    activeVoidSteps.set(player.nameTag, state);
}


/**
 * Hàm kích hoạt chính
 */
export function activateVoidStep(player, stats) {
    if (player.hasTag("void_step_active")) {
        endVoidStep(player, "§eBạn đã chủ động dừng Vô Hạ Hạn.");
        return false;
    }
    
    const cooldownTick = player.getDynamicProperty("dhh:cd_void_step") ?? 0;
    if (system.currentTick < cooldownTick) {
        player.sendMessage(`§cKỹ năng chưa hồi! (${Math.ceil((cooldownTick - system.currentTick) / 20)}s)`);
        return false;
    }

    player.addTag("void_step_active");
    player.sendMessage("§5Chú thuật Thức·Thương đã được kích hoạt.");
    player.playSound("block.beacon.activate", { pitch: 1.2 });
    
    manageVoidAura(player, stats);

    return true;
}