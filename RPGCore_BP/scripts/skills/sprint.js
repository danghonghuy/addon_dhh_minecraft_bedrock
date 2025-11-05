// --- START OF FILE skills/sprint.js ---

import { system } from "@minecraft/server";

function manageSprintEffects(player, durationInSeconds) {
    const skillDurationTicks = durationInSeconds * 20;
    let ticksLived = 0;
    
    // Tạo hiệu ứng vệt gió
    const trailInterval = system.runInterval(() => {
        // Điều kiện dừng
        if (ticksLived >= skillDurationTicks || !player.isValid) {
            system.clearRun(trailInterval);
            player.onScreenDisplay.setActionBar(""); // Xóa thanh trạng thái
            return;
        }

        // --- HIỆU ỨNG VỆT GIÓ ---
        // Chỉ tạo hiệu ứng nếu người chơi đang di chuyển nhanh
        if (player.getVelocity().x !== 0 || player.getVelocity().z !== 0) {
            // Tạo 2-3 hạt khói/mây ở vị trí cũ của người chơi để tạo vệt mờ
            for (let i = 0; i < 12; i++) {
                const particleLoc = {
                    x: player.location.x + (Math.random() * 0.4 - 0.2),
                    y: player.location.y + 0.5,
                    z: player.location.z + (Math.random() * 0.4 - 0.2)
                };
                player.dimension.spawnParticle("minecraft:basic_smoke_particle", particleLoc);
            }
        }
        
        // --- CẬP NHẬT THANH TRẠNG THÁI ---
        const remainingSeconds = Math.ceil((skillDurationTicks - ticksLived) / 20);
        player.onScreenDisplay.setActionBar(`§b§lBứt Tốc: §f${remainingSeconds} giây`);
        
        ticksLived += 2; // Cập nhật sau mỗi 4 tick để tối ưu
    }, 2); 
}

export function activateSprint(player, stats) {
    try {
        const skillLevel = stats.skills.sprint ?? 1;
        const durationInSeconds = 10 + (skillLevel * 5);

        // ===================================================================
        // === NÂNG CẤP: Thêm Jump Boost và công thức Speed mới =============
        // ===================================================================
        // Speed: Bắt đầu từ cấp I, tăng 1 cấp sau mỗi 2 level kỹ năng
        const speedAmplifier = Math.floor((skillLevel - 1) / 2); // Cấp 1-2: 0 (Speed I), Cấp 9: 4 (Speed V)
        // Jump Boost: Bắt đầu từ cấp 0, tăng 1 cấp sau mỗi 3 level kỹ năng
        const jumpAmplifier = Math.floor((skillLevel - 1) / 3); // Cấp 1-3: 0 (Jump I), Cấp 9: 2 (Jump III)

        // Áp dụng các hiệu ứng
        player.addEffect("speed", durationInSeconds * 20, { amplifier: speedAmplifier, showParticles: false }); // Tắt hạt mặc định
        player.addEffect("jump_boost", durationInSeconds * 20, { amplifier: jumpAmplifier, showParticles: false });

        // ===================================================================
        // === NÂNG CẤP: Hiệu ứng và quản lý thời gian ======================
        // ===================================================================
        player.playSound("entity.generic.swoop", { volume: 1, pitch: 1.2 });
        player.sendMessage(`§bBạn đã kích hoạt Bứt Tốc trong §f${durationInSeconds}§b giây!`);
        
        // Gọi hàm quản lý hiệu ứng vệt gió và thanh trạng thái
        manageSprintEffects(player, durationInSeconds);
        
        return true;
    } catch (e) {
        player.sendMessage("§cKhông thể thực hiện kỹ năng!");
        console.error("Sprint skill failed: ", e.stack);
        return false;
    }
}