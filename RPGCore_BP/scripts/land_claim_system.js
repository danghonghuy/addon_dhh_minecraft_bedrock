import { world, system, EntityHealthComponent,MolangVariableMap } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";

const CLAIM_DATA_KEY = "dhh:land_claims";
const MAX_CLAIMS_PER_PLAYER = 3;

const CLAIM_OPTIONS = {
  small: { name: "§aNhỏ (16x16 Blocks)", size: 16, cost: 50 },
  medium: { name: "§eVừa (32x32 Blocks)", size: 32, cost: 200 },
  large: { name: "§cĐại (64x64 Blocks)", size: 64, cost: 800 },
};

const INTERACTIVE_BLOCKS = [
    "minecraft:chest", "minecraft:ender_chest", "minecraft:trapped_chest",
    "minecraft:barrel", "minecraft:shulker_box", "minecraft:undyed_shulker_box",
    "minecraft:furnace", "minecraft:blast_furnace", "minecraft:smoker",
    "minecraft:dispenser", "minecraft:dropper", "minecraft:hopper",
    "minecraft:beehive", "minecraft:bee_nest",
    "minecraft:brewing_stand", "minecraft:enchanting_table", "minecraft:anvil",
    "minecraft:lever", "minecraft:stone_button", "minecraft:oak_button",
    "minecraft:oak_door", "minecraft:spruce_door", "minecraft:birch_door", "minecraft:jungle_door",
    "minecraft:acacia_door", "minecraft:dark_oak_door", "minecraft:mangrove_door", "minecraft:cherry_door",
    "minecraft:bamboo_door", "minecraft:crimson_door", "minecraft:warped_door", "minecraft:iron_door",
    "minecraft:oak_fence_gate", "minecraft:crafter", "minecraft:crafting_table"
];


function visualizeClaimBoundary(player, claim) {
    const DURATION_SECONDS = 15;
    const PARTICLE_NAME = "dhh:claim_indicator";

    player.sendMessage(`§aĐang hiển thị ranh giới vùng đất trong §e${DURATION_SECONDS} giây...`);

    const spawnLocation = {
        x: claim.centerX + 0.5,
        y: player.location.y + 1,
        z: claim.centerZ + 0.5
    };

    const molangVariables = new MolangVariableMap();
    molangVariables.setFloat("variable.claim_size", claim.size);
    molangVariables.setFloat("variable.lifetime", DURATION_SECONDS);

    try {
        player.dimension.spawnParticle(PARTICLE_NAME, spawnLocation, molangVariables);
    } catch (e) {
        console.warn(`[Land Claim] Không thể tạo hiệu ứng ranh giới: ${e}`);
        player.sendMessage("§cĐã xảy ra lỗi khi hiển thị ranh giới.");
    }
}
export function getAllClaimsData() {
  const dataString = world.getDynamicProperty(CLAIM_DATA_KEY);
  if (!dataString) return {};
  try {
    return JSON.parse(dataString);
  } catch (e) {
    console.error("Lỗi khi parse dữ liệu claim:", e);
    return {};
  }
}
export function saveAllClaimsData(data) {
  world.setDynamicProperty(CLAIM_DATA_KEY, JSON.stringify(data));
}
function getPlayerClaims(player) {
  const allClaims = getAllClaimsData();
  return allClaims[player.nameTag] || [];
}
export function isAreaOverlapping(x, z, size, dimensionId) {
  const allClaimsData = getAllClaimsData();
  const newRadius = size / 2;
  const newMinX = x - newRadius;
  const newMaxX = x + newRadius;
  const newMinZ = z - newRadius;
  const newMaxZ = z + newRadius;
  for (const owner in allClaimsData) {
    for (const claim of allClaimsData[owner]) {
      if (claim.dimensionId !== dimensionId) continue;
      const existingRadius = claim.size / 2;
      const existingMinX = claim.centerX - existingRadius;
      const existingMaxX = claim.centerX + existingRadius;
      const existingMinZ = claim.centerZ - existingRadius;
      const existingMaxZ = claim.centerZ + existingRadius;
      if (
        newMinX < existingMaxX &&
        newMaxX > existingMinX &&
        newMinZ < existingMaxZ &&
        newMaxZ > existingMinZ
      ) {
        return true;
      }
    }
  }
  return false;
}
function getProtectionData(location, dimensionId) {
  const allClaimsData = getAllClaimsData();
  for (const owner in allClaimsData) {
    for (const claim of allClaimsData[owner]) {
      if (claim.dimensionId !== dimensionId) continue;
      const radius = claim.size / 2;
      const minX = claim.centerX - radius;
      const maxX = claim.centerX + radius;
      const minZ = claim.centerZ - radius;
      const maxZ = claim.centerZ + radius;
      if (
        location.x >= minX &&
        location.x < maxX &&
        location.z >= minZ &&
        location.z < maxZ
      ) {
        return { owner, claim };
      }
    }
  }
  return null;
}
export async function showLandClaimMainMenu(player) {
  const playerClaims = getPlayerClaims(player);
  const nguyenThach = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
  const form = new ActionFormData();
  form.title("§6§lBảo Hộ Lãnh Thổ");
  form.body(
    `§fBảo vệ tài sản của bạn khỏi người khác.\n` +
      `§7Bạn đang có: §b${nguyenThach} Nguyên thach\n` +
      `§7Số vùng đã bảo hộ: §e${playerClaims.length} / ${MAX_CLAIMS_PER_PLAYER}`
  );
  form.button(
    "§aTạo Vùng Bảo Hộ Mới\n§8Dùng Nguyên thạch để mua đất",
    "textures/items/map_filled"
  );
  form.button(
    "§eQuản Lý Vùng Đã Có\n§8Thêm bạn, thiết lập quyền, hoặc hủy bỏ",
    "textures/items/book_writable"
  );
  form.button("§cThoát", "textures/ui/cancel");
  const { selection, canceled } = await form.show(player);
  if (canceled) return;
  if (selection === 0) {
    showCreateClaimMenu(player);
  } else if (selection === 1) {
    showManageClaimsList(player);
  }
}
async function showCreateClaimMenu(player) {
  const playerClaims = getPlayerClaims(player);
  if (playerClaims.length >= MAX_CLAIMS_PER_PLAYER) {
    player.sendMessage(
      `§cBạn đã đạt giới hạn ${MAX_CLAIMS_PER_PLAYER} vùng bảo hộ!`
    );
    return;
  }
  const form = new ActionFormData();
  form.title("§a§lTạo Vùng Bảo Hộ Mới");
  form.body(
    "§fHãy đứng vào §etrung tâm§f của khu đất bạn muốn bảo hộ rồi chọn một gói bên dưới."
  );
  const options = Object.values(CLAIM_OPTIONS);
  options.forEach((opt) =>
    form.button(`${opt.name}\n§8Phí: §b${opt.cost} Nguyên thạch`)
  );
  const { selection, canceled } = await form.show(player);
  if (canceled) return;
  const selectedOption = options[selection];
  const nguyenThach = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
  if (nguyenThach < selectedOption.cost) {
    player.sendMessage(
      `§cBạn không đủ Nguyên thạch! Cần ${selectedOption.cost}, bạn có ${nguyenThach}.`
    );
    return;
  }
  const { x, z } = player.location;
  const dimensionId = player.dimension.id;
  if (isAreaOverlapping(x, z, selectedOption.size, dimensionId)) {
    player.sendMessage("§cKhu vực này chồng lấn với một vùng đã được bảo hộ!");
    return;
  }
  const allClaims = getAllClaimsData();
  if (!allClaims[player.nameTag]) {
    allClaims[player.nameTag] = [];
  }
  const newClaim = {
    id: Date.now(),
    centerX: Math.floor(x),
    centerZ: Math.floor(z),
    size: selectedOption.size,
    dimensionId: dimensionId,
    trusted: [],
    allowPvp: false,
    allowContainerAccess: false,
  };
  allClaims[player.nameTag].push(newClaim);
  saveAllClaimsData(allClaims);
  player.setDynamicProperty(
    "dhh:nguyen_thach",
    nguyenThach - selectedOption.cost
  );
  player.sendMessage(
    `§aBảo hộ thành công vùng đất ${selectedOption.name} tại [X: ${Math.floor(x)}, Z: ${Math.floor(z)}]!`
  );
  player.playSound("entity.player.levelup");
}
async function showManageClaimsList(player) {
  const playerClaims = getPlayerClaims(player);
  if (playerClaims.length === 0) {
    player.sendMessage("§cBạn chưa có vùng đất nào để quản lý.");
    return;
  }
  const form = new ActionFormData();
  form.title("§e§lQuản Lý Vùng Đất");
  form.body("§fChọn một vùng đất để xem chi tiết và quản lý.");
  playerClaims.forEach((claim, index) => {
    form.button(
      `Vùng #${index + 1} - ${claim.size}x${claim.size}\n` +
        `§8Tọa độ: [X: ${claim.centerX}, Z: ${claim.centerZ}]`
    );
  });
   form.button("§0Quay lại Menu Chính");
  const { selection, canceled } = await form.show(player);
  if (canceled) return;
  if (selection >= playerClaims.length) {
      return showLandClaimMainMenu(player);
  }
  showManageSpecificClaim(player, playerClaims[selection].id);
}
async function showManageSpecificClaim(player, claimId) {
    const allClaims = getAllClaimsData();
    const playerClaims = allClaims[player.nameTag] || [];
    const claimIndex = playerClaims.findIndex(c => c.id === claimId);
    if (claimIndex === -1) {
        player.sendMessage("§cKhông tìm thấy vùng đất này!");
        return showManageClaimsList(player);
    }
    const claim = playerClaims[claimIndex];
    const form = new ActionFormData();
    form.title(`§e§lQuản Lý Vùng #${claimIndex + 1}`);
    let body = `§fVùng đất ${claim.size}x${claim.size} tại [X: ${claim.centerX}, Z: ${claim.centerZ}]\n`;
    body += `§fChiều không gian: §7${claim.dimensionId.replace("minecraft:", "")}\n`;
    body += `§fBạn bè tin cậy: §a${claim.trusted.join(", ") || "Không có"}`;
    form.body(body);
    form.button("§bThêm/Xóa Bạn Bè Tin Cậy", "textures/items/emerald");
    form.button("§6Thiết Lập Quyền Hạn (Flags)", "textures/ui/gear");
    form.button("§bHiển Thị Ranh Giới\n§8Xem đường biên của vùng đất", "textures/items/spyglass"); 
    form.button("§c§lHủy Bỏ Giao Ước\n§r§8(Hành động không thể hoàn tác!)", "textures/blocks/barrier");
    form.button("§7Quay lại", "textures/ui/undo");
    const { selection, canceled } = await form.show(player);
    if (canceled) return;
    if (selection === 0) {
        showManageTrustedPlayersMenu(player, claimId);
    } else if (selection === 1) {
        showManageFlagsMenu(player, claimId); 
    } else if (selection === 2) {
        visualizeClaimBoundary(player, claim);
        showManageSpecificClaim(player, claimId);
    } else if (selection === 3) {
        playerClaims.splice(claimIndex, 1);
        allClaims[player.nameTag] = playerClaims;
        saveAllClaimsData(allClaims);
        player.sendMessage("§eĐã hủy bỏ thành công vùng bảo hộ.");
        player.playSound("entity.wither.break_block");
    } else if (selection === 4) {
        showManageClaimsList(player);
    }
}
async function showManageFlagsMenu(player, claimId) {
    const allClaims = getAllClaimsData();
    const playerClaims = allClaims[player.nameTag] || [];
    const claim = playerClaims.find(c => c.id === claimId);
    if (!claim) {
        player.sendMessage("§cKhông tìm thấy vùng đất này!");
        return showManageClaimsList(player);
    }
    const form = new ActionFormData();
    form.title("§6§lThiết Lập Quyền Hạn");
    form.body("§fChọn để bật/tắt các quyền cho vùng đất này.");
    const pvpState = claim.allowPvp ? "§aĐang Cho Phép §7(Bấm để Cấm)" : "§cĐang Cấm §7(Bấm để Cho phép)";
    form.button(`PvP (Người chơi đánh nhau)\n${pvpState}`);
    const containerState = claim.allowContainerAccess ? "§aĐang Cho Phép §7(Bấm để Cấm)" : "§cĐang Cấm §7(Bấm để Cho phép)";
    form.button(`Mở Rương/Cửa bởi người lạ\n${containerState}`);
    form.button("§0Quay lại");
    const { selection, canceled } = await form.show(player);
    if (canceled) return showManageSpecificClaim(player, claimId);
    const currentClaims = getAllClaimsData();
    const currentClaim = (currentClaims[player.nameTag] || []).find(c => c.id === claimId);
    if (!currentClaim) return;
    if (selection === 0) {
        currentClaim.allowPvp = !currentClaim.allowPvp;
    } else if (selection === 1) {
        currentClaim.allowContainerAccess = !currentClaim.allowContainerAccess;
    } else {
        return showManageSpecificClaim(player, claimId);
    }
    saveAllClaimsData(currentClaims);
    system.run(() => showManageFlagsMenu(player, claimId)); 
}
async function showManageTrustedPlayersMenu(player, claimId) {
    const allClaims = getAllClaimsData();
    const playerClaims = allClaims[player.nameTag] || [];
    const claim = playerClaims.find(c => c.id === claimId);
    if (!claim) {
        player.sendMessage("§cKhông tìm thấy vùng đất này!");
        return;
    }
    const form = new ActionFormData();
    form.title("§b§lQuản Lý Bạn Bè");
    const onlinePlayers = world.getAllPlayers();
    const actions = []; 
    let body = "§fChọn một người chơi để thêm hoặc xóa khỏi danh sách tin cậy.\n\n";
    body += "§e--- Đang Tin Cậy ---\n";
    let trustedCount = 0;
    claim.trusted.forEach(trustedName => {
        trustedCount++;
        form.button(`§c[Xóa] §f${trustedName}`);
        actions.push({ type: 'remove', name: trustedName });
    });
    if (trustedCount === 0) body += "§7Chưa có ai.\n";
    body += "\n§a--- Mời Thêm (Online) ---\n";
    let availableCount = 0;
    onlinePlayers.forEach(p => {
        if (p.nameTag !== player.nameTag && !claim.trusted.includes(p.nameTag)) {
            availableCount++;
            form.button(`§a[Thêm] §f${p.nameTag}`);
            actions.push({ type: 'add', name: p.nameTag });
        }
    });
    if (availableCount === 0) body += "§7Không có người chơi nào khác để thêm.\n";
    form.body(body);
    form.button("§0Quay lại");
    const { selection, canceled } = await form.show(player);
    if (canceled || selection >= actions.length) {
        return showManageSpecificClaim(player, claimId);
    }
    const action = actions[selection];
    const currentClaims = getAllClaimsData();
    const currentClaim = (currentClaims[player.nameTag] || []).find(c => c.id === claimId);
    if (!currentClaim) return;
    if (action.type === 'add') {
        currentClaim.trusted.push(action.name);
        player.sendMessage(`§aĐã thêm '${action.name}' vào danh sách tin cậy.`);
        const targetPlayer = world.getPlayers({ name: action.name })[0];
        if (targetPlayer) {
            targetPlayer.sendMessage(`§a[Bảo Hộ] Bạn đã được người chơi §f${player.nameTag} §athêm vào danh sách tin cậy của một vùng đất.`);
            targetPlayer.playSound("random.orb", { location: targetPlayer.location });
        }
    } else if (action.type === 'remove') {
        const indexToRemove = currentClaim.trusted.indexOf(action.name);
        if (indexToRemove > -1) {
            currentClaim.trusted.splice(indexToRemove, 1);
            player.sendMessage(`§eĐã xóa '${action.name}' khỏi danh sách tin cậy.`);
            const targetPlayer = world.getPlayers({ name: action.name })[0];
            if (targetPlayer) {
                targetPlayer.sendMessage(`§c[Bảo Hộ] Bạn đã bị người chơi §f${player.nameTag} §cxóa khỏi danh sách tin cậy của một vùng đất.`);
                targetPlayer.playSound("entity.villager.no", { location: targetPlayer.location });
            }
        }
    }
    saveAllClaimsData(currentClaims);
    system.run(() => showManageTrustedPlayersMenu(player, claimId));
}

export function initializeLandClaimSystem() {
  function isAllowed(player, claimData) {
      if (!claimData) return true;
      const { owner, claim } = claimData;
      return owner === player.nameTag || claim.trusted.includes(player.nameTag);
  }
  
  world.beforeEvents.playerBreakBlock.subscribe((eventData) => {
    const protection = getProtectionData(eventData.block.location, eventData.block.dimension.id);
    if (protection && !isAllowed(eventData.player, protection)) {
      eventData.cancel = true;
      eventData.player.sendMessage("§c§lVÙNG ĐẤT ĐÃ ĐƯỢC BẢO HỘ");
    }
  });

  world.beforeEvents.playerPlaceBlock.subscribe((eventData) => {
    const protection = getProtectionData(eventData.block.location, eventData.block.dimension.id);
    if (protection && !isAllowed(eventData.player, protection)) {
      eventData.cancel = true;
       eventData.player.sendMessage("§c§lVÙNG ĐẤT ĐÃ ĐƯỢỢC BẢO HỘ");
    }
  });

  world.beforeEvents.playerInteractWithBlock.subscribe((eventData) => {
      const protection = getProtectionData(eventData.block.location, eventData.block.dimension.id);
      if (!protection) return;
      const player = eventData.player;
      if (isAllowed(player, protection)) return;
      const blockId = eventData.block.typeId;
      if (INTERACTIVE_BLOCKS.includes(blockId)) {
          if (!protection.claim.allowContainerAccess) {
              eventData.cancel = true;
              player.sendMessage("§cBạn không có quyền sử dụng khối này ở đây.");
          }
      } else {
        eventData.cancel = true;
        player.sendMessage("§c§lVÙNG ĐẤT ĐÃ ĐƯỢỢC BẢO HỘ");
      }
  });

  if (world.beforeEvents.explosion) {
      world.beforeEvents.explosion.subscribe((eventData) => {
          try {
              const dimensionId = eventData.dimension.id;
              const originalImpactedBlocks = eventData.impactedBlocks; 
              if (!originalImpactedBlocks) return;
              
              const protectedBlocks = [];
              for (const block of originalImpactedBlocks) {
                  const protection = getProtectionData(block.location, dimensionId);
                  if (protection) {
                      protectedBlocks.push(block);
                  }
              }
              const finalImpactedBlocks = originalImpactedBlocks.filter(block => !protectedBlocks.includes(block));
              eventData.setImpactedBlocks(finalImpactedBlocks);
          } catch(e) {
              console.warn(`[Land Claim] Error in explosion handler: ${e}`);
          }
      });
  } else {
      console.warn("[dhh LandClaim] Warning: 'explosion' event not found. Explosion protection is disabled.");
  }

world.afterEvents.entityHurt.subscribe((eventData) => {
    try {
        const { hurtEntity, damageSource, damage } = eventData;
        const attacker = damageSource.damagingEntity;
        
        // --- CHỈ KIỂM TRA PVP ---
        // Thoát nếu người tấn công hoặc mục tiêu không phải người chơi
        if (!attacker || attacker.typeId !== 'minecraft:player' || hurtEntity.typeId !== 'minecraft:player' || !hurtEntity.isValid) return;

        const protection = getProtectionData(hurtEntity.location, hurtEntity.dimension.id);
        // Thoát nếu không có claim hoặc người tấn công được phép
        if (!protection || isAllowed(attacker, protection)) return;

        // Nếu người lạ tấn công người chơi khác trong vùng cấm PvP
        if (!protection.claim.allowPvp) {
            const health = hurtEntity.getComponent(EntityHealthComponent.componentId);
            if (health) {
               const newHealth = Math.min(health.currentValue + damage, health.effectiveMax);
               health.setCurrentValue(newHealth);
            }
            attacker.sendMessage("§cPvP đã bị tắt trong khu vực này.");
        }
    } catch(e) {
      console.warn(`[Land Claim] Error in entityHurt (PvP only) handler: ${e}`);
    }
});

  console.log("§a[dhh System] §2Land Claim System (Fully Patched) - §aInitialized!");
}