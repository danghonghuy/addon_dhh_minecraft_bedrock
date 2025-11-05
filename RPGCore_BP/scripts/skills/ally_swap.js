import {
  world,
  system,
  EntityComponentTypes,
  MolangVariableMap,
} from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { Vector } from "./vector.js";

const DEBUFF_LIST = [
  "slowness",
  "weakness",
  "wither",
  "poison",
  "mining_fatigue",
  "blindness",
  "darkness",
];

/**
 * Lấy các thông số của kỹ năng dựa trên cấp độ hiện tại.
 * @param {number} skillLevel Cấp độ kỹ năng của người chơi.
 * @returns {{selectRange: number, aidRange: number, canCrossDimension: boolean}}
 */
function getSkillParameters(skillLevel) {
  const newSelectRange = 1000 + (skillLevel - 1) * 1000;

  if (skillLevel >= 7) {
    return {
      selectRange: newSelectRange,
      aidRange: Infinity,
      canCrossDimension: true,
    };
  } else if (skillLevel >= 4) {
    return {
      selectRange: newSelectRange,
      aidRange: 4000 + (skillLevel - 4) * 2000,
      canCrossDimension: false,
    };
  } else {
    return {
      selectRange: newSelectRange,
      aidRange: 2000 + (skillLevel - 1) * 1000,
      canCrossDimension: false,
    };
  }
}

/**
 * Hiển thị UI để người chơi chọn đồng đội làm mục tiêu.
 * @param {import("@minecraft/server").Player} player
 * @param {object} params Các thông số từ getSkillParameters
 */
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
    player.sendMessage("§cKhông có đồng đội nào trong phạm vi lựa chọn!");
    player.playSound("note.bass");
    return;
  }

  const form = new ActionFormData();
  form.title("§b§lThần Hộ Mệnh Chi Viện");
  form.body(
    `§fChọn một đồng minh để thiết lập liên kết.\n§7Phạm vi chọn: §e${params.selectRange}m`
  );

  nearbyPlayers.sort((a, b) => {
    const distA = Vector.magnitude(
      Vector.subtract(player.location, a.location)
    );
    const distB = Vector.magnitude(
      Vector.subtract(player.location, b.location)
    );
    return distA - distB;
  });

  for (const p of nearbyPlayers) {
    const distance = Math.floor(
      Vector.magnitude(Vector.subtract(player.location, p.location))
    );
    const healthComp = p.getComponent(EntityComponentTypes.Health);
    const currentHealth = healthComp
      ? Math.floor(healthComp.currentValue)
      : "N/A";
    const maxHealth = healthComp ? healthComp.effectiveMax : "N/A";
    form.button(
      `§f${p.nameTag} §7(${distance}m)\n§cHP: ${currentHealth} / ${maxHealth}`
    );
  }

  const { canceled, selection } = await form.show(player);
  if (canceled) return;

  const selectedAlly = nearbyPlayers[selection];
  player.setDynamicProperty("dhh:ally_swap_target", selectedAlly.nameTag);
  player.setDynamicProperty(
    "dhh:ally_swap_return_loc",
    JSON.stringify(player.location)
  );
  player.setDynamicProperty("dhh:ally_swap_return_dim", player.dimension.id);
  player.sendMessage(
    `§bĐã khóa mục tiêu: §f${selectedAlly.nameTag}§b. Kích hoạt kỹ năng lần nữa để chi viện!`
  );
  player.playSound("random.orb");
}

/**
 * Kích hoạt kỹ năng
 * @param {import("@minecraft/server").Player} player
 * @param {object} stats Chỉ số của người chơi
 */
export function activateAllySwap(player, stats) {
    const targetName = player.getDynamicProperty("dhh:ally_swap_target");
    const skillLevel = stats.skills.ally_swap ?? 1;
    const params = getSkillParameters(skillLevel);

    const resetSkillState = () => {
        player.setDynamicProperty("dhh:ally_swap_target", undefined);
        player.setDynamicProperty("dhh:ally_swap_return_loc", undefined);
        player.setDynamicProperty("dhh:ally_swap_return_dim", undefined);
    };

    if (targetName) {
        const target = world.getAllPlayers().find((p) => p.nameTag === targetName);

        if (!target || !target.isValid) {
            player.sendMessage(`§cMục tiêu §f${targetName}§c không còn tồn tại. Liên kết đã bị hủy.`);
            resetSkillState();
            return false;
        }

        if (!params.canCrossDimension && player.dimension.id !== target.dimension.id) {
            player.sendMessage(`§cBạn và §f${targetName}§c không cùng một chiều không gian!`);
            resetSkillState();
            return false;
        }

        const distance = Vector.magnitude(Vector.subtract(player.location, target.location));
        if (params.aidRange !== Infinity && distance > params.aidRange) {
            player.sendMessage(`§cMục tiêu §f${targetName}§c đã ở quá xa.`);
            resetSkillState();
            return false;
        }

        const returnLocJson = player.getDynamicProperty("dhh:ally_swap_return_loc");
        const returnDimId = player.getDynamicProperty("dhh:ally_swap_return_dim");

        if (!returnLocJson || !returnDimId) {
            player.sendMessage("§cKhông tìm thấy vị trí quay về. Đã hủy chi viện.");
            resetSkillState();
            return false;
        }

        const SKILL_DURATION_SECONDS = 5.0;
        const RETURN_PROXIMITY_RADIUS = 2.0;

        const casterOriginalLocation = player.location;
        player.dimension.spawnParticle("minecraft:enderman_teleport_particle", casterOriginalLocation);
        player.dimension.playSound("entity.enderman.teleport", casterOriginalLocation);

        player.teleport(target.location, { dimension: target.dimension });
        
        player.dimension.spawnParticle("minecraft:enderman_teleport_particle", player.location);
        player.playSound("block.beacon.activate", { volume: 1.5, pitch: 1.2 });
        player.sendMessage(`§bĐã chi viện cho §f${target.nameTag}!`);
        target.sendMessage(`§b§l${player.nameTag} đã xuất hiện để bảo vệ bạn!`);

        try {
            const molang = new MolangVariableMap();
            molang.setFloat("variable.circle_size", RETURN_PROXIMITY_RADIUS * 2);
            molang.setFloat("variable.particle_lifetime", SKILL_DURATION_SECONDS + 0.5);
            player.dimension.spawnParticle(
                "dhh:magic_circle_explosion",
                player.location,
                molang
            );
        } catch (e) {}

        let cleansed = false;
        for (const debuff of DEBUFF_LIST) {
            if (target.getEffect(debuff)) {
                target.removeEffect(debuff);
                cleansed = true;
            }
        }
        if (cleansed) {
            target.dimension.spawnParticle("minecraft:totem_particle", target.location);
            target.sendMessage("§aBạn đã được thanh tẩy khỏi các hiệu ứng xấu!");
        }

        const healAmount = 15 + (skillLevel * 3) + (stats.intelligence * 0.2);
        const healthComp = target.getComponent(EntityComponentTypes.Health);
        if (healthComp) {
            const actualHealed = Math.min(healAmount, healthComp.effectiveMax - healthComp.currentValue);
            healthComp.setCurrentValue(healthComp.currentValue + actualHealed);
            target.sendMessage(`§aBạn được chữa lành, hồi §e${Math.round(actualHealed)}§a máu!`);
        }
        
        player.sendMessage(`§eSẽ quay về vị trí cũ sau ${SKILL_DURATION_SECONDS} giây...`);
        target.sendMessage("§eHãy đứng trong vòng tròn ma thuật để được dịch chuyển cùng!");

        system.runTimeout(() => {
            if (!player.isValid) {
                resetSkillState();
                return;
            }

            try {
                const returnLocation = JSON.parse(returnLocJson);
                const returnDimension = world.getDimension(returnDimId);
                const departureLocation = player.location; 

                player.dimension.spawnParticle("minecraft:enderman_teleport_particle", departureLocation);
                player.dimension.playSound("entity.enderman.teleport", departureLocation);
                
                player.teleport(returnLocation, { dimension: returnDimension });

                if (target.isValid) {
                    const distanceToAlly = Vector.magnitude(Vector.subtract(departureLocation, target.location));
                    
                    if (distanceToAlly <= RETURN_PROXIMITY_RADIUS) {
                        target.teleport(returnLocation, { dimension: returnDimension });
                        player.sendMessage("§bĐồng đội đã quay về cùng bạn!");
                    } else {
                        target.sendMessage(`§cBạn đã ở quá xa ${player.nameTag} nên không được dịch chuyển cùng!`);
                        player.sendMessage(`§e${target.nameTag} đã ở quá xa và không quay về cùng bạn.`);
                    }
                }
 
                returnDimension.spawnParticle("minecraft:enderman_teleport_particle", returnLocation);
                  returnDimension.playSound("dhh.teleport", returnLocation);
                player.playSound("mob.shulker.teleport", returnLocation);
                player.sendMessage("§bĐã quay về thành công!");

            } catch (e) {
                player.sendMessage("§cKhông thể quay về vị trí cũ do lỗi dữ liệu.");
            }
            
            resetSkillState();
        }, SKILL_DURATION_SECONDS * 20);

        return true;
    } else {
        showAllySelectionMenu(player, params);
        return false;
    }
}