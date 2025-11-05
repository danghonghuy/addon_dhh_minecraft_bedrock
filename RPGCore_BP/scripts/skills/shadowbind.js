import { system } from "@minecraft/server";

function manageShadowbindAura(player, stats) {
   const skillLevel = stats.skills.shadowbind ?? 1;
    const radius = 5 + (skillLevel * 2); // Bán kính = 5 (cơ bản) + cấp * 2
    const manaDrainPerSecond = 2 + (skillLevel * 0.5)

    const slownessAmplifier = 4;
    const blindnessAmplifier = 0;
    const witherAmplifier = Math.floor(skillLevel / 3);
    const debuffDuration = 40; 

    const particlesPerDraw = 15;
    const runEveryXTicks = 2;

    const auraInterval = system.runInterval(() => {
        if (!player.isValid || !player.hasTag("shadowbind_active")) {
            system.clearRun(auraInterval);
            player.onScreenDisplay.setActionBar("");
            player.removeEffect("darkness");
            return;
        }

        const playerLocation = player.location;
        let currentMana = player.getDynamicProperty("dhh:mana") ?? 0;
        
        const manaToDrain = manaDrainPerSecond / (20 / runEveryXTicks);
        currentMana -= manaToDrain;
        
        if (currentMana <= 0) {
            player.setDynamicProperty("dhh:mana", 0);
            player.removeTag("shadowbind_active"); 
            player.playSound("random.fizz");
            return;
        }
        player.setDynamicProperty("dhh:mana", currentMana);

        for (let i = 0; i < particlesPerDraw; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * radius;
            const groundParticleLoc = { x: playerLocation.x + Math.cos(angle) * distance, y: playerLocation.y + 0.2, z: playerLocation.z + Math.sin(angle) * distance };
            
            if (i % 2 === 0) {
                player.dimension.spawnParticle("minecraft:totem_particle", groundParticleLoc);
            } else {
                player.dimension.spawnParticle("minecraft:sculk_soul_particle", groundParticleLoc);
            }
        }
        
        const targets = player.dimension.getEntities({ location: playerLocation, maxDistance: radius, families: ["monster"], excludeTags: ["dhh_spirit_beast"] });
        for (const target of targets) {
            target.addTag(`shadowbind_victim:${player.nameTag}`);
            target.addEffect("slowness", debuffDuration, { amplifier: slownessAmplifier });
            target.addEffect("blindness", debuffDuration, { amplifier: blindnessAmplifier });
            target.addEffect("wither", debuffDuration, { amplifier: witherAmplifier });
        }
        
        player.onScreenDisplay.setActionBar(`§5§lHào Quang Hắc Ám§r - Mana: §b${Math.floor(currentMana)}`);

    }, runEveryXTicks);
}

export function activateShadowbind(player, stats) {
    try {
        if (player.hasTag("shadowbind_active")) {
            player.removeTag("shadowbind_active");
            player.sendMessage("§5Hào quang Hắc Ám đã tan biến.");
            return true;
        }
        
        player.addTag("shadowbind_active");
        
        const skillLevel = stats.skills.shadowbind ?? 1;
        const duration = (8 + (skillLevel * 3)) * 20;
        player.addEffect("darkness", duration, { amplifier: 0, showParticles: false });
        
        player.sendMessage("§5Bạn giải phóng Hào Quang Hắc Ám!");
        player.playSound("mob.warden.attack_impact", { volume: 1.2, pitch: 0.9 });
        
        manageShadowbindAura(player, stats);
        return true;

    } catch (e) {
        player.sendMessage("§cKhông thể thực hiện kỹ năng!");
        console.error("Shadowbind skill failed: ", e.stack);
        return false;
    }
}