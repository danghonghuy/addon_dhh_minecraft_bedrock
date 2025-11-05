// --- START OF FILE: skills/celestial_step.js (PHIÊN BẢN SỬA LỖI CUỐI CÙNG - DÙNG NÚT SNEAK) ---

import { system, MolangVariableMap } from "@minecraft/server";
import { CONFIG } from "../config.js";

// === CÁC THAM SỐ ===
const BASE_JUMPS = 5;
const JUMPS_PER_LEVEL_UPGRADE = 5; 
const JUMP_VERTICAL_FORCE = 4; 
const JUMP_HORIZONTAL_FORCE = 5;
const MANA_DRAIN_PER_SECOND = 1;
const BASE_DURATION_SECONDS = 30;
const DURATION_PER_LEVEL_SECONDS = 30;

const activeCelestialSteps = new Map();
let mainIntervalId = null;

function endStep(player) {
    if (!activeCelestialSteps.has(player.nameTag)) return;
    activeCelestialSteps.delete(player.nameTag);

    if (activeCelestialSteps.size === 0 && mainIntervalId !== null) {
        system.clearRun(mainIntervalId);
        mainIntervalId = null;
    }
    
    player.removeEffect("slow_falling");
    player.setDynamicProperty("dhh:celestial_step_active", false);
    player.addEffect("slow_falling", 600, { amplifier: 0, showParticles: false })
    player.onScreenDisplay.setActionBar("§7Bước Chân Thiên Giới kết thúc.");
    player.playSound("block.beacon.deactivate", { pitch: 1.2 });
    
    const cooldownSeconds = CONFIG.SKILL_COOLDOWNS.CELESTIAL_STEP;
    player.setDynamicProperty("dhh:cd_celestial_step", system.currentTick + cooldownSeconds * 20);
    player.sendMessage(`§cKỹ năng Bước Chân Thiên Giới đang hồi... (${cooldownSeconds} giây)`);
}

function startStep(player, stats) {
    const skillLevel = stats.skills.celestial_step ?? 1;
    const durationTicks = (BASE_DURATION_SECONDS + (skillLevel - 1) * DURATION_PER_LEVEL_SECONDS) * 20;
    const totalJumps = BASE_JUMPS + Math.floor((skillLevel - 1) / JUMPS_PER_LEVEL_UPGRADE);

    // Lưu trữ trạng thái ban đầu của người chơi
    const playerState = {
        player,
        endTime: system.currentTick + durationTicks,
        remainingJumps: totalJumps,
        wasSneaking: player.isSneaking, // <<< THEO DÕI NÚT NGỒI
    };
    activeCelestialSteps.set(player.nameTag, playerState);
    
    player.setDynamicProperty("dhh:celestial_step_active", true);

    // Đẩy người chơi lên trời để bắt đầu bay
    player.applyImpulse({ x: 0, y: 0.9, z: 0 }); 
    player.addEffect("slow_falling", durationTicks + 40, { amplifier: 1, showParticles: false });
    
    player.playSound("block.beacon.activate", { pitch: 1.5 });
    player.sendMessage("§bBạn đã kích hoạt Bước Chân Thiên Giới!");
    // HƯỚNG DẪN NGƯỜI CHƠI CÁCH DÙNG MỚI
    player.sendMessage("§eNhấn Ngồi (Sneak) khi đang ở trên không để bật nhảy!");
    
    if (mainIntervalId === null) {
        initializeMainLoop();
    }
}

function initializeMainLoop() {
    mainIntervalId = system.runInterval(() => {
        for (const [name, state] of activeCelestialSteps.entries()) {
            const player = state.player;

            if (!player.isValid) {
                activeCelestialSteps.delete(name);
                continue;
            }

            const currentMana = player.getDynamicProperty("dhh:mana");
            if (system.currentTick > state.endTime || currentMana < (MANA_DRAIN_PER_SECOND / 20)) {
                endStep(player);
                continue;
            }

            // Xử lý trừ mana, ActionBar, hiệu ứng (không thay đổi)
            player.setDynamicProperty("dhh:mana", currentMana - (MANA_DRAIN_PER_SECOND / 20));
            const remainingTime = Math.ceil((state.endTime - system.currentTick) / 20);
            player.onScreenDisplay.setActionBar(
                `§bBước Chân Thiên Giới: §e${remainingTime}s §f| §a${state.remainingJumps} lần bật nhảy`
            );
            
            if (system.currentTick % 5 === 0) {
                player.dimension.spawnParticle("dhh:fly", player.location);
            }

            const groundCircleLocation = { x: player.location.x, y: player.location.y, z: player.location.z };
            const groundCircleMolang = new MolangVariableMap();
            groundCircleMolang.setFloat("variable.particle_lifetime", 0.3);
            groundCircleMolang.setFloat("variable.circle_size", 1.5);
         
            
            // --- LOGIC NHẬN BIẾT BẬT NHẢY MỚI (DÙNG NÚT NGỒI) ---
            const isSneakingNow = player.isSneaking;
            
            // Nếu người chơi VỪA MỚI NHẤN nút ngồi (trước đó không ngồi, bây giờ ngồi)
            if (isSneakingNow && !state.wasSneaking && state.remainingJumps > 0) {
                state.remainingJumps--; // Trừ đi 1 lần bật nhảy
                
                // Áp dụng lực đẩy (impulse) để tạo cú bật nhảy
                const viewDirection = player.getViewDirection();
                const impulse = {
                    x: viewDirection.x * JUMP_HORIZONTAL_FORCE,
                    y: JUMP_VERTICAL_FORCE,
                    z: viewDirection.z * JUMP_HORIZONTAL_FORCE,
                };
                player.applyImpulse(impulse);

                // Thêm hiệu ứng âm thanh và hình ảnh cho cú bật nhảy
                player.playSound("entity.ender_dragon.flap", { pitch: 1.5 });
                player.dimension.spawnParticle("minecraft:totem_particle", player.location);
            }
            
            // Cập nhật lại trạng thái `wasSneaking` cho lần kiểm tra ở tick sau
            state.wasSneaking = isSneakingNow; 
        }
    }, 1); 
}

/**
 * Hàm kích hoạt chính, được gọi từ file main.js
 */
export function activateCelestialStep(player, stats) {
    // Nếu đang bay mà ngồi xuống => HỦY kỹ năng
    // Điều này phải được kiểm tra trong `main.js` tại `handleSkillActivation`
    // Do đó, logic hủy ở đây sẽ không bao giờ được gọi nữa.
    if (player.getDynamicProperty("dhh:celestial_step_active")) {
        endStep(player);
        return false;
    }

    const cooldownTick = player.getDynamicProperty("dhh:cd_celestial_step") ?? 0;
    if (system.currentTick < cooldownTick) {
        const timeLeft = Math.ceil((cooldownTick - system.currentTick) / 20);
        player.sendMessage(`§cKỹ năng chưa hồi! (${timeLeft}s)`);
        return false;
    }

    const manaCost = CONFIG.SKILL_MANA_COSTS.CELESTIAL_STEP;
    if (stats.currentMana < manaCost) {
        player.sendMessage(`§cKhông đủ mana! Cần §b${manaCost}§c, bạn có §b${Math.floor(stats.currentMana)}§c.`);
        return false;
    }

    player.setDynamicProperty("dhh:mana", stats.currentMana - manaCost);
    startStep(player, stats);

    return true; 
}