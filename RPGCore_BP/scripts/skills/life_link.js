// --- START OF FILE: skills/life_link.js (PHIÊN BẢN HOÀN CHỈNH) ---

import { world, system, EntityComponentTypes } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { Vector } from "./vector.js";
import { CONFIG } from "../config.js"; // QUAN TRỌNG: Import CONFIG để lấy cooldown

const SKILL_MAX_LEVEL = 9;

function getSkillParameters(skillLevel) {
  const duration = 30 + (skillLevel - 1) * 30;
  const damageTransferPercent = 1.0 - ((skillLevel - 1) / (SKILL_MAX_LEVEL - 1)) * 0.5;

  return {
    selectRange: 500,
    duration: duration,
    damageTransferPercent: Math.max(0.5, damageTransferPercent),
  };
}

export function endLifeLink(caster, target, message) {
    if (!caster || !caster.isValid) return;

    // Chỉ thực hiện hành động nếu kỹ năng đang thực sự kích hoạt
    if (!caster.hasTag("life_link_active")) return;

    caster.removeTag("life_link_active");
    const intervalId = caster.getDynamicProperty("dhh:life_link_interval");
    if (intervalId) {
        system.clearRun(intervalId);
    }
    
    caster.setDynamicProperty("dhh:life_link_target", undefined);
    caster.setDynamicProperty("dhh:life_link_active", undefined);
    caster.setDynamicProperty("dhh:life_link_end_tick", undefined);
    caster.setDynamicProperty("dhh:life_link_transfer_percent", undefined);
    caster.setDynamicProperty("dhh:life_link_interval", undefined);

    if (message) {
        caster.sendMessage(message);
    }
    caster.playSound("block.beacon.deactivate", { pitch: 0.8 });

    if (target && target.isValid) {
        target.removeTag("life_link_active");
        target.setDynamicProperty("dhh:life_link_caster", undefined);
        target.sendMessage("§cLiên kết sinh mệnh đã bị ngắt.");
    }

    // LOGIC CHUẨN: Đặt hồi chiêu KHI KỸ NĂNG KẾT THÚC
    const cooldownSeconds = CONFIG.SKILL_COOLDOWNS.LIFE_LINK;
    if (cooldownSeconds > 0) {
        const now = system.currentTick;
        caster.setDynamicProperty("dhh:cd_life_link", now + cooldownSeconds * 20);
        caster.sendMessage(`§cKỹ năng Huyết Mạch Tương Liên đang hồi... (${cooldownSeconds}s)`);
    }
}

async function showAllySelectionMenu(player, params) {
    const allPlayers = world.getAllPlayers();
    const nearbyPlayers = [];

    for (const otherPlayer of allPlayers) {
        if (otherPlayer.nameTag === player.nameTag) continue;
        if (otherPlayer.dimension.id !== player.dimension.id) continue;

        const distance = Vector.magnitude(
            Vector.subtract(player.location, otherPlayer.location)
        );
        if (distance <= params.selectRange) {
            nearbyPlayers.push(otherPlayer);
        }
    }

    if (nearbyPlayers.length === 0) {
        player.sendMessage(`§cKhông có đồng đội nào trong phạm vi ${params.selectRange}m!`);
        player.playSound("note.bass");
        return;
    }

    const form = new ActionFormData();
    form.title("§c§lHuyết Mạch Tương Liên");
    form.body(
        `§fChọn một đồng minh để thiết lập liên kết sinh mệnh.\n§7Phạm vi chọn: §e${params.selectRange}m`
    );

    nearbyPlayers.sort((a, b) => {
        const distA = Vector.magnitude(Vector.subtract(player.location, a.location));
        const distB = Vector.magnitude(Vector.subtract(player.location, b.location));
        return distA - distB;
    });
    
    for (const p of nearbyPlayers) {
        const distance = Math.floor(Vector.magnitude(Vector.subtract(player.location, p.location)));
        const healthComp = p.getComponent(EntityComponentTypes.Health);
        const currentHealth = healthComp ? Math.floor(healthComp.currentValue) : "N/A";
        const maxHealth = healthComp ? healthComp.effectiveMax : "N/A";
        form.button(`§f${p.nameTag} §7(${distance}m)\n§cHP: ${currentHealth} / ${maxHealth}`);
    }

    const { canceled, selection } = await form.show(player);
    if (canceled) return;

    const selectedAlly = nearbyPlayers[selection];
    player.setDynamicProperty("dhh:life_link_target", selectedAlly.nameTag);
    player.sendMessage(`§cĐã khóa mục tiêu: §f${selectedAlly.nameTag}§c. Kích hoạt kỹ năng lần nữa để bắt đầu liên kết!`);
    player.playSound("random.orb");
}

export function activateLifeLink(player, stats) {
    const targetName = player.getDynamicProperty("dhh:life_link_target");
    const skillLevel = stats.skills.life_link ?? 1;
    const params = getSkillParameters(skillLevel);

    if (player.hasTag("life_link_active")) {
        const linkedTarget = targetName ? world.getPlayers({ name: targetName })[0] : undefined;
        endLifeLink(player, linkedTarget, "§eBạn đã chủ động hủy bỏ Huyết Mạch Tương Liên.");
        return false; // Trả về false để main.js không trừ mana/đặt cd
    }
    
    if (targetName) {
        const target = world.getPlayers({ name: targetName })[0];

        if (!target || !target.isValid) {
            player.sendMessage(`§cMục tiêu §f${targetName}§c không còn tồn tại. Liên kết đã bị hủy.`);
            player.setDynamicProperty("dhh:life_link_target", undefined);
            return false;
        }

        if (player.dimension.id !== target.dimension.id) {
            player.sendMessage(`§cBạn và §f${targetName}§c không cùng một chiều không gian!`);
            player.setDynamicProperty("dhh:life_link_target", undefined);
            return false;
        }
        
        player.addTag("life_link_active");
        target.addTag("life_link_active");
        
        player.setDynamicProperty("dhh:life_link_active", true);
        player.setDynamicProperty("dhh:life_link_end_tick", system.currentTick + params.duration * 20);
        player.setDynamicProperty("dhh:life_link_transfer_percent", params.damageTransferPercent);
        target.setDynamicProperty("dhh:life_link_caster", player.nameTag);

        player.sendMessage(`§cĐã liên kết sinh mệnh với §f${target.nameTag}§c trong §e${params.duration}§c giây!`);
        player.sendMessage(`§7(Tỷ lệ chuyển sát thương: §e${(params.damageTransferPercent * 100).toFixed(0)}%§7)`);
        target.sendMessage(`§c§l${player.nameTag} đã dùng Huyết Mạch Tương Liên để bảo vệ bạn!`);

        player.playSound("block.beacon.activate", { volume: 1.0, pitch: 0.7 });
        target.playSound("block.conduit.activate", { volume: 1.0, pitch: 1.5 });

        const intervalId = system.runInterval(() => {
            const currentTarget = world.getPlayers({name: targetName})[0];
            if (!player.isValid || !currentTarget?.isValid || !player.hasTag("life_link_active")) {
                endLifeLink(player, currentTarget, "§cLiên kết đã bị ngắt do mục tiêu không hợp lệ.");
                return;
            }

            const distance = Vector.magnitude(Vector.subtract(player.location, currentTarget.location));
            if (distance > 60 || player.dimension.id !== currentTarget.dimension.id) {
                endLifeLink(player, currentTarget, "§cLiên kết đã bị ngắt do khoảng cách quá xa hoặc khác chiều không gian.");
                return;
            }

            const start = player.getHeadLocation();
            const end = currentTarget.getHeadLocation();
            const vec = Vector.subtract(end, start);
            const dir = Vector.normalize(vec);
            
            for(let i = 0; i < distance; i += 0.5) {
                const particlePos = Vector.add(start, Vector.multiply(dir, i));
                player.dimension.spawnParticle("minecraft:falling_dust_redstone_particle", particlePos);
            }
        }, 10);
        player.setDynamicProperty("dhh:life_link_interval", intervalId);
        
        system.runTimeout(() => {
            const currentTarget = world.getPlayers({name: targetName})[0];
            endLifeLink(player, currentTarget, "§aHuyết Mạch Tương Liên đã kết thúc.");
        }, params.duration * 20);

        return true;
    } 
    else {
        showAllySelectionMenu(player, params);
        return false;
    }
}