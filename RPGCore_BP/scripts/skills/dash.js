import { system } from "@minecraft/server";
import { Vector } from "./vector.js";
import { CONFIG } from "../config.js"; // Import CONFIG để lấy mana cost

export function activateDash(player, stats) {
    const skillLevel = stats.skills.dash ?? 1;

    // Tính số charge tối đa dựa trên skill level
    const maxCharges = 1 + Math.floor(skillLevel / 3);

    // Lấy số charge hiện tại của người chơi
    let currentCharges = player.getDynamicProperty("dhh:dash_charges") ?? maxCharges;

    // Nếu chưa có charge, khởi tạo full charge
    if (player.getDynamicProperty("dhh:dash_charges") === undefined) {
        player.setDynamicProperty("dhh:dash_charges", maxCharges);
        currentCharges = maxCharges;
    }

    if (currentCharges <= 0) {
        // Kiểm tra thời gian hồi charge
        const rechargeTick = player.getDynamicProperty("dhh:dash_recharge_tick") ?? 0;
        const timeLeft = (rechargeTick - system.currentTick) / 20;
        
        if (timeLeft > 0) {
            player.onScreenDisplay.setActionBar(`§c§lHẾT LƯỢT LƯỚT! Hồi sau: §e${timeLeft.toFixed(1)}s`);
        } else {
            player.onScreenDisplay.setActionBar("§c§lHẾT LƯỢT LƯỚT!");
        }
        player.playSound("note.bass", { pitch: 0.8 });
        return false;
    }

    try {
        // Khoảng cách lướt
        const dashDistance = 15 + skillLevel;

        const startLocation = player.getHeadLocation();
        const viewDirection = player.getViewDirection();

        // Hiệu ứng và âm thanh khởi đầu
        for (let i = 0; i < 30; i++) {
            const offsetX = Math.random() * 0.4 - 0.2;
            const offsetY = Math.random() * 0.4 - 0.2;
            const offsetZ = Math.random() * 0.4 - 0.2;
            player.dimension.spawnParticle("minecraft:portal_particle", { 
                x: startLocation.x + offsetX, 
                y: startLocation.y + offsetY, 
                z: startLocation.z + offsetZ 
            });
        }
        player.playSound("mob.endermen.portal");

        // Dịch chuyển
        const endLocation = Vector.add(player.location, Vector.multiply(viewDirection, dashDistance));
        player.teleport(endLocation, { checkForBlocks: true });

        // QUAN TRỌNG: Trừ charge NGAY SAU KHI TELEPORT THÀNH CÔNG
        player.setDynamicProperty("dhh:dash_charges", currentCharges - 1);

        // THÊM ĐOẠN NÀY: Trừ mana ngay trong file dash.js
      const manaCost = CONFIG.SKILL_MANA_COSTS.DASH_CHARGE;
        player.setDynamicProperty("dhh:mana", stats.currentMana - manaCost);

        // Hiệu ứng sau khi lướt
        system.run(() => {
            if (!player.isValid) return;
            
            const finalLocation = player.location;
            player.playSound("mob.shulker.teleport", { volume: 0.8, pitch: 1.5 });
            
            for (let i = 0; i < 25; i++) {
                const spread = 0.5;
                const particleLoc = Vector.add(finalLocation, { 
                    x: Math.random() * spread * 2 - spread, 
                    y: 1, 
                    z: Math.random() * spread * 2 - spread 
                });
                player.dimension.spawnParticle("minecraft:end_rod_particle", particleLoc);
            }

            // Tạo trail particles
            const trailVector = Vector.subtract(finalLocation, startLocation);
            const trailLength = Vector.magnitude(trailVector);
            const trailDirection = Vector.normalize(trailVector);
            const particlesPerBlock = 10;
            const totalParticles = Math.floor(trailLength * particlesPerBlock);

            for (let i = 1; i <= totalParticles; i++) {
                const distanceAlongTrail = (i / totalParticles) * trailLength;
                const particlePos = Vector.add(startLocation, Vector.multiply(trailDirection, distanceAlongTrail));
                player.dimension.spawnParticle("minecraft:end_rod_particle", particlePos);
            }

            // Hiển thị số charge còn lại
            const remainingCharges = player.getDynamicProperty("dhh:dash_charges") ?? 0;
            const chargeBar = "█".repeat(remainingCharges) + "░".repeat(maxCharges - remainingCharges);
            player.onScreenDisplay.setActionBar(`§b§lLướt Đi §r§7[§b${chargeBar}§7] §f${remainingCharges}/${maxCharges}`);
        });
        
        return true;

    } catch (e) {
        player.sendMessage("§cKhông thể lướt đến vị trí này!");
        player.playSound("note.bass", { pitch: 0.8 });
        return false;
    }
}