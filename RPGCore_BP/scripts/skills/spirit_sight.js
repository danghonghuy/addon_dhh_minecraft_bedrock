import { world, system, EffectTypes } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { CONFIG } from "../config.js";
import { getPlayerStats } from "../main.js";

const Vector = {
    magnitude(v) { return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z); },
    subtract(v1, v2) { return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z }; },
    add(v1, v2) { return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z }; },
    multiply(v, scalar) { return { x: v.x * scalar, y: v.y * scalar, z: v.z * scalar }; },
};

function endSpiritSight(player, message) {
    if (!player.isValid || !player.hasTag("spirit_sight_active")) return;
    
    const timeoutId = player.getDynamicProperty("spiritsight:timeout_id");
    if (timeoutId) system.clearRun(timeoutId);

    player.camera.clear();
    player.removeTag("spirit_sight_active");
    
    const locationJson = player.getDynamicProperty("spiritsight:location");
    const rotationJson = player.getDynamicProperty("spiritsight:rotation");
    
    if (locationJson) {
        try {
            const loc = JSON.parse(locationJson);
            const rot = JSON.parse(rotationJson);
            player.teleport(loc, { rotation: rot });
        } catch(e) {}
    }
    
    // Sửa lỗi removeEffect - sử dụng EffectTypes
    const invisibilityEffect = EffectTypes.get("invisibility");
    const resistanceEffect = EffectTypes.get("resistance");
    
    if (invisibilityEffect) player.removeEffect(invisibilityEffect);
    if (resistanceEffect) player.removeEffect(resistanceEffect);

    if (message) player.sendMessage(message);

    player.setDynamicProperty("spiritsight:target_id", undefined); 
    player.setDynamicProperty("spiritsight:timeout_id", undefined);
    player.setDynamicProperty("spiritsight:location", undefined);
    player.setDynamicProperty("spiritsight:rotation", undefined);

    const cooldownSeconds = CONFIG.SKILL_COOLDOWNS.SPIRIT_SIGHT;
    const cooldownTicks = cooldownSeconds * 20;
    const now = system.currentTick;
    player.setDynamicProperty("dhh:cd_spirit_sight", now + cooldownTicks);
    
    player.sendMessage(`§cKỹ năng Thị Kiến Tâm Linh đang hồi... (${cooldownSeconds}s)`);
}

async function startSpiritSight(player, stats) {
    const skillLevel = stats.skills.spirit_sight || 1;
    const selectRange = 1000 + (skillLevel - 1) * 1000;
    const durationSeconds = 30 + (skillLevel - 1) * 15;
    
    const nearbyPlayers = world.getPlayers().filter(p => 
        p.nameTag !== player.nameTag && p.dimension.id === player.dimension.id &&
        Vector.magnitude(Vector.subtract(player.location, p.location)) <= selectRange
    );

    if (nearbyPlayers.length === 0) {
        player.sendMessage(`§cKhông có người chơi nào trong phạm vi ${selectRange}m!`);
        return false;
    }
    
    const form = new ActionFormData();
    form.title("§dThị Kiến Tâm Linh"); 
    form.body("Chọn một đồng minh để kết nối thị kiến.");
    nearbyPlayers.sort((a, b) => Vector.magnitude(Vector.subtract(player.location, a.location)) - Vector.magnitude(Vector.subtract(player.location, b.location)));
    nearbyPlayers.forEach(p => form.button(`§f${p.nameTag}\n§7§o~${Math.floor(Vector.magnitude(Vector.subtract(player.location, p.location)))}m`));

    const { canceled, selection } = await form.show(player);
    if (canceled) return false;
    const targetPlayer = nearbyPlayers[selection];
    if (!targetPlayer?.isValid) { 
        player.sendMessage("§cMục tiêu không còn hợp lệ."); 
        return false; 
    }
    
    player.setDynamicProperty("spiritsight:location", JSON.stringify(player.location));
    player.setDynamicProperty("spiritsight:rotation", JSON.stringify(player.getRotation()));
    
    player.addTag("spirit_sight_active");
    player.setDynamicProperty("spiritsight:target_id", targetPlayer.id);

    const durationTicks = durationSeconds * 20;
    
    // Sửa lỗi addEffect - sử dụng EffectTypes
    const invisibilityEffect = EffectTypes.get("invisibility");
    const resistanceEffect = EffectTypes.get("resistance");
    const darknessEffect = EffectTypes.get("darkness");
    
    if (invisibilityEffect) {
        player.addEffect(invisibilityEffect, durationTicks + 40, { showParticles: false });
    }
    if (resistanceEffect) {
        player.addEffect(resistanceEffect, durationTicks + 40, { amplifier: 255, showParticles: false });
    }
    
    player.playSound("amethyst_block.resonate");
    player.sendMessage(`§d§oBắt đầu thị kiến tâm linh với ${targetPlayer.nameTag}...`);
    
    if (darknessEffect) {
        player.addEffect(darknessEffect, 20, { showParticles: false });
    }

    const timeoutId = system.runTimeout(() => {
        endSpiritSight(player, "§aThị kiến đã kết thúc.");
    }, durationTicks);
    
    player.setDynamicProperty("spiritsight:timeout_id", timeoutId);
    return true;
}

export function SPIRIT_SIGHT(player, stats) {
    if (player.hasTag("spirit_sight_active")) {
        endSpiritSight(player, "§eBạn đã chủ động ngắt kết nối thị kiến.");
        return false;
    } else {
        return startSpiritSight(player, stats);
    }
}

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        if (player.hasTag("spirit_sight_active")) {
            const targetId = player.getDynamicProperty("spiritsight:target_id");
            if (!targetId) { 
                endSpiritSight(player, "§cMục tiêu kết nối đã mất.");
                continue;
            }

            const target = world.getEntity(targetId);
            if (!target?.isValid) { 
                endSpiritSight(player, "§cMục tiêu không còn tồn tại.");
                continue;
            }
            
            const invisibilityEffect = EffectTypes.get("invisibility");
            const effect = invisibilityEffect ? player.getEffect(invisibilityEffect) : null;
            const timeLeft = effect ? Math.round(effect.duration / 20) : 0;
            player.onScreenDisplay.setActionBar(`§d§lThị Kiến: §f${target.nameTag} §7- §e${timeLeft}s §7(Cúi để hủy)`);
            
            try {
                const headLocation = target.getHeadLocation();
                const viewDirection = target.getViewDirection();
                const forwardOffset = Vector.multiply(viewDirection, 0.5); 
                const cameraLocation = Vector.add(headLocation, forwardOffset);
                
                player.camera.setCamera('minecraft:free', { location: cameraLocation, rotation: target.getRotation() });
            } catch(e) {}
        }
    }
}, 2);

// --- DANH SÁCH EFFECT ĐÃ SỬA ---
const BUFF_LIST = ["strength", "speed", "regeneration"];
const DEBUFF_LIST = ["slowness", "weakness", "wither", "poison", "mining_fatigue", "blindness"];
const EFFECT_DURATION_TICKS = 200; // 10 giây

/**
 * Hiển thị menu lựa chọn hành động khi đang trong trạng thái Thị Kiến.
 */
export async function showSpiritSightActionMenu(player) {
    const targetId = player.getDynamicProperty("spiritsight:target_id");
    const target = world.getEntity(targetId);

    if (!target?.isValid) {
        endSpiritSight(player, "§cMục tiêu không còn hợp lệ để thực hiện hành động.");
        return;
    }

    const form = new ActionFormData();
    form.title("§dHành Động Tâm Linh");
    form.body(`Bạn đang kết nối với §f${target.nameTag}§d.\nChọn một hành động để thực hiện.`);

    form.button("§c[Hủy Bỏ]\n§7Ngắt kết nối và quay về.");
    form.button("§b[Dịch Chuyển]\n§7Tức thời đến vị trí của họ.");
    form.button("§a[Hỗ Trợ]\n§7Ban phước trực tiếp cho mục tiêu.");
    form.button("§4[Nguyền Rủa]\n§7Nguyền rủa trực tiếp mục tiêu.");

    const { canceled, selection } = await form.show(player);
    if (canceled) return;

    const stats = getPlayerStats(player);
    const skillLevel = stats.skills.spirit_sight || 1;
    const effectAmplifier = Math.floor((skillLevel - 1) / 3);

    switch (selection) {
        case 0:
            endSpiritSight(player, "§eBạn đã ngắt kết nối thị kiến.");
            break;

        case 1:
            player.sendMessage(`§bĐang dịch chuyển đến vị trí của ${target.nameTag}...`);
            endSpiritSight(player, "");
            system.run(() => player.teleport(target.location));
            break;

        // --- Case 2: Hỗ Trợ (Buff chính mục tiêu đang theo dõi) ---
        case 2: {
            const randomBuff = BUFF_LIST[Math.floor(Math.random() * BUFF_LIST.length)];
            const buffEffect = EffectTypes.get(randomBuff);
            
            if (buffEffect) {
                target.addEffect(buffEffect, EFFECT_DURATION_TICKS, { 
                    amplifier: effectAmplifier 
                });
                target.dimension.spawnParticle("minecraft:totem_particle", target.location);
                
                // Thông báo cho target
                target.sendMessage(`§a§l${player.nameTag} đã ban phước cho bạn!`);
                player.sendMessage(`§aBạn đã ban phước cho ${target.nameTag}!`);
            } else {
                player.sendMessage("§cKhông thể áp dụng hiệu ứng hỗ trợ!");
            }
            
            endSpiritSight(player, "");
            break;
        }

        // --- Case 3: Nguyền Rủa (Debuff chính mục tiêu đang theo dõi) ---
        case 3: {
            const randomDebuff = DEBUFF_LIST[Math.floor(Math.random() * DEBUFF_LIST.length)];
            const debuffEffect = EffectTypes.get(randomDebuff);
            
            if (debuffEffect) {
                target.addEffect(debuffEffect, EFFECT_DURATION_TICKS, { 
                    amplifier: effectAmplifier 
                });
                target.dimension.spawnParticle("minecraft:knockback_roar_particle", target.location);
                
                // Thông báo cho target
                target.sendMessage(`§c§lBạn đã bị ${player.nameTag} nguyền rủa!`);
                player.sendMessage(`§cBạn đã nguyền rủa ${target.nameTag}!`);
            } else {
                player.sendMessage("§cKhông thể áp dụng hiệu ứng nguyền rủa!");
            }
            
            endSpiritSight(player, "");
            break;
        }
    }
}