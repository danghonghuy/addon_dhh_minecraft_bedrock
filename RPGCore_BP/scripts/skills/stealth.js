// --- START OF FILE skills/stealth.js ---

import { system } from "@minecraft/server";

function manageStealthEffects(player, durationInSeconds) {
    const skillDurationTicks = durationInSeconds * 20;
    let ticksLived = 0;
    
    const stealthInterval = system.runInterval(() => {
        // Điều kiện dừng: Lấy giá trị từ Dynamic Property
        const isStealthReady = player.getDynamicProperty("dhh:stealth_ready") ?? false;
        
        if (ticksLived >= skillDurationTicks || !player.isValid || !isStealthReady) {
            system.clearRun(stealthInterval);
            player.onScreenDisplay.setActionBar("");
            
            // Xóa Dynamic Property
            player.setDynamicProperty("dhh:stealth_ready", false);
            
           if (player.getEffect("invisibility"))  {
                player.removeEffect("invisibility");
                player.sendMessage("§7Bạn đã hiện hình.");
            }
            return;
        }

        const remainingSeconds = Math.ceil((skillDurationTicks - ticksLived) / 20);
        player.onScreenDisplay.setActionBar(`§8§lBóng Ẩn: §cHiệu lực trong (§f${remainingSeconds}s§c)`);
        
        ticksLived += 20;
    }, 20);
}

export function activateStealth(player, stats) {
    try {
        const skillLevel = stats.skills.stealth ?? 1;
        const agility = stats.agility;
        const durationInSeconds = 15 + (skillLevel * 5) + (agility * 0.25);

        player.addEffect("invisibility", Math.floor(durationInSeconds * 20) + 10, { amplifier: 0, showParticles: false });
        player.addEffect("speed", 60, { amplifier: 1, showParticles: false });
        
        // SỬA LỖI: Dùng setDynamicProperty thay vì Tag
        player.setDynamicProperty("dhh:stealth_ready", true);

        player.playSound("mob.enderdragon.flap", { volume: 0.8, pitch: 1.5 });
        for (let i = 0; i < 40; i++) {
            const particleLoc = { x: player.location.x + (Math.random() - 0.5), y: player.location.y + 1, z: player.location.z + (Math.random() - 0.5) };
            player.dimension.spawnParticle("minecraft:ink_particle", particleLoc);
        }
        
        player.sendMessage(`§7Bạn đã hòa vào bóng tối trong §f${durationInSeconds.toFixed(1)}§7 giây!`);
        manageStealthEffects(player, durationInSeconds);
        
        return true;
    } catch (e) {
        player.sendMessage("§cKhông thể thực hiện kỹ năng!");
        console.error("Stealth skill failed: ", e.stack);
        return false;
    }
}