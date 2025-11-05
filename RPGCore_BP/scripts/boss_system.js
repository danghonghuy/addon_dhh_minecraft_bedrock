import { world, system, GameMode, ItemStack } from "@minecraft/server";

function createProgressBar(
  current,
  max,
  length = 10,
  fullChar = "█",
  emptyChar = "░",
  fullColor = "§a",
  emptyColor = "§7"
) {
  if (max === 0) return `${fullColor}[${fullChar.repeat(length)}]`;
  const percentage = Math.max(0, Math.min(1, current / max));
  const fullCount = Math.round(percentage * length);
  const emptyCount = length - fullCount;
  return `${fullColor}${fullChar.repeat(
    fullCount
  )}${emptyColor}${emptyChar.repeat(emptyCount)}`;
}

// --- THAY ĐỔI CẤU HÌNH ---
const BOSS_SPAWN_CONFIG = {
  ENABLED: true,
  SPAWN_INTERVAL_TICKS: 12000, // 10 phút
  CHANCE_PER_INTERVAL: 0.25, // 25% cơ hội, trung bình 40 phút/lần thử
  MIN_PLAYER_DISTANCE: 30, // Tăng khoảng cách tối thiểu
  MAX_PLAYER_DISTANCE: 60, // Tăng khoảng cách tối đa
  MAX_BOSSES_WORLD: 3, // Giới hạn tối đa 3 boss trên toàn thế giới
  MIN_DISTANCE_BETWEEN_BOSSES: 500, // Boss mới phải cách boss cũ ít nhất 500 block
  BOSS_LIST: ["dhh:warden_matriarch_boss", "dhh:phantom_sharpshooter_boss"],
};
// --- KẾT THÚC THAY ĐỔI CẤU HÌNH ---

function findSafeBossSpawnLocation(player) {
  for (let i = 0; i < 15; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const distance =
      BOSS_SPAWN_CONFIG.MIN_PLAYER_DISTANCE +
      Math.random() *
        (BOSS_SPAWN_CONFIG.MAX_PLAYER_DISTANCE -
          BOSS_SPAWN_CONFIG.MIN_PLAYER_DISTANCE);

    const spawnX = Math.floor(player.location.x + Math.cos(angle) * distance);
    const spawnZ = Math.floor(player.location.z + Math.sin(angle) * distance);

    for (let y = player.location.y + 10; y > player.location.y - 10; y--) {
      const spawnLocation = { x: spawnX + 0.5, y: y, z: spawnZ + 0.5 };
      const blockBelow = player.dimension.getBlock({
        x: spawnX,
        y: y - 1,
        z: spawnZ,
      });
      const blockAt = player.dimension.getBlock({ x: spawnX, y: y, z: spawnZ });
      const blockAbove = player.dimension.getBlock({
        x: spawnX,
        y: y + 1,
        z: spawnZ,
      });

      if (blockBelow?.isSolid && !blockBelow.isLiquid && blockAt?.isAir && blockAbove?.isAir) {
        return spawnLocation;
      }
    }
  }
  return null;
}

// --- LOGIC SPAWN BOSS ĐÃ ĐƯỢC VIẾT LẠI HOÀN TOÀN ---
function handleBossSpawning() {
  try {
    const allPlayers = world
      .getAllPlayers()
      .filter((p) => p.getGameMode() !== GameMode.Spectator);
    if (allPlayers.length === 0) return;

    // KIỂM TRA 1: GIỚI HẠN BOSS TOÀN CỤC
    const existingBosses = world
      .getDimension("overworld")
      .getEntities({ families: ["boss"] });
    if (existingBosses.length >= BOSS_SPAWN_CONFIG.MAX_BOSSES_WORLD) {
      return; // Đã đạt giới hạn boss, không làm gì cả
    }

    if (Math.random() < BOSS_SPAWN_CONFIG.CHANCE_PER_INTERVAL) {
      const targetPlayer =
        allPlayers[Math.floor(Math.random() * allPlayers.length)];

      // KIỂM TRA 2: GIỚI HẠN KHOẢNG CÁCH GIỮA CÁC BOSS
      const isBossNearby = world
        .getDimension("overworld")
        .getEntities({
          families: ["boss"],
          location: targetPlayer.location,
          maxDistance: BOSS_SPAWN_CONFIG.MIN_DISTANCE_BETWEEN_BOSSES,
        });

      if (isBossNearby.length > 0) {
        return; // Có boss khác ở quá gần, hủy spawn
      }
      
      const spawnLocation = findSafeBossSpawnLocation(targetPlayer);

      if (spawnLocation) {
        const randomBossId =
          BOSS_SPAWN_CONFIG.BOSS_LIST[
            Math.floor(Math.random() * BOSS_SPAWN_CONFIG.BOSS_LIST.length)
          ];
        targetPlayer.dimension.spawnEntity(randomBossId, spawnLocation);
        
        const bossName = randomBossId
          .replace("dhh:", "")
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
        const x = Math.floor(spawnLocation.x);
        const y = Math.floor(spawnLocation.y);
        const z = Math.floor(spawnLocation.z);

        const message = `§c§l[BOSS] §eMột con ${bossName}§c vừa xuất hiện tại tọa độ §a${x}, ${y}, ${z}§c (gần người chơi §b${targetPlayer.nameTag}§c)!`;
        world.sendMessage(message);

        for (const player of world.getAllPlayers()) {
          player.onScreenDisplay.setTitle("§c§lThế Lực Hắc Ám Trỗi Dậy", {
            subtitle: "Một con boss hùng mạnh vừa xuất hiện trên thế giới!",
            fadeInDuration: 20,
            stayDuration: 100,
            fadeOutDuration: 40,
          });
          player.playSound("mob.wither.spawn", { location: player.location });
        }
      }
    }
  } catch (e) {
    console.error(`[Boss System Error] ${e}`);
  }
}
// --- KẾT THÚC PHẦN VIẾT LẠI ---

function updateBossHealthBars() {
  try {
    // Tối ưu: Chỉ query 1 lần
    const allBosses = world
      .getDimension("overworld")
      .getEntities({ families: ["boss"] });

    for (const boss of allBosses) {
      if (boss.isValid) {
        const health = boss.getComponent("health");
        if (health) {
          const currentHealth = Math.round(health.currentValue);
          const maxHealth = health.effectiveMax;
          // Tối ưu: Lấy tên từ nameTag nếu có, không thì mới từ typeId
          const baseName = boss.nameTag.split('\n')[0].replace(/§./g, '') || boss.typeId
            .replace("dhh:", "")
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

          const healthBar = createProgressBar(
            currentHealth,
            maxHealth,
            20,
            "█",
            "░",
            "§c",
            "§7"
          );

          const newNameTag = `§c§l${baseName}\n§r${healthBar}\n§e${currentHealth} §f/ §a${maxHealth}`;
          boss.nameTag = newNameTag;
        }
      }
    }
  } catch (e) {
    /* Bỏ qua lỗi */
  }
}


function handleBossDeath(deadEntity, damageSource) {
    const location = deadEntity.location;
    const dimension = deadEntity.dimension;
    const killer = damageSource.damagingEntity;

    const bossName = deadEntity.typeId.replace("dhh:", "").replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    const killerName =
      killer && killer.typeId === "minecraft:player"
        ? killer.nameTag
        : "Thế giới";
    world.sendMessage(
      `§c§l[BOSS] §e${bossName}§c đã bị tiêu diệt bởi §a${killerName}!`
    );

    switch (deadEntity.typeId) {
      case "dhh:warden_matriarch_boss":
      case "dhh:phantom_sharpshooter_boss": {
        const cursedBlade = new ItemStack("dhh:cursed_blade", 1);
        cursedBlade.nameTag = "§4§lMa Kiếm";
        cursedBlade.setLore([
          "§7Lưỡi kiếm rên rỉ linh hồn của những kẻ đã gục ngã.",
          "§c§oHút 5% sát thương gây ra thành Máu.",
        ]);
        try {
          const enchantments = cursedBlade.getComponent(
            "minecraft:enchantable"
          );

          if (enchantments) {
            enchantments.addEnchantment({ id: "sharpness", level: 5 });
            enchantments.addEnchantment({ id: "unbreaking", level: 3 });
            enchantments.addEnchantment({ id: "mending", level: 1 });
          }
        } catch (e) {
          console.warn("Không thể enchantment cho kiếm boss.");
        }
        dimension.spawnItem(cursedBlade, location);
        break;
      }
    }

    // Tăng lượng XP rơi ra
    for (let i = 0; i < 250; i++) { // Gấp ~4 lần
      dimension.spawnEntity("minecraft:xp_orb", location);
    }
}


export function initializeBossSystem() {
  system.runInterval(() => {
    if (BOSS_SPAWN_CONFIG.ENABLED) {
      handleBossSpawning();
    }
  }, BOSS_SPAWN_CONFIG.SPAWN_INTERVAL_TICKS);

  system.runInterval(() => {
    updateBossHealthBars();
  }, 20);

  world.afterEvents.projectileHitEntity.subscribe((event) => {
    const { source } = event;
    if (source?.typeId === "dhh:phantom_sharpshooter_boss") {
      try {
        event.hitEntity.dimension.spawnEntity(
          "minecraft:lightning_bolt",
          event.hitEntity.location
        );
      } catch (e) {
        /* Bỏ qua lỗi */
      }
    }
  });

  world.afterEvents.entityDie.subscribe((event) => {
    const { deadEntity, damageSource } = event;
    if (BOSS_SPAWN_CONFIG.BOSS_LIST.includes(deadEntity.typeId)) {
      handleBossDeath(deadEntity, damageSource);
    }
  });

  console.log("§a[dhh System] §eWorld Boss System (v2 - Intelligent Spawn) - §aLoaded!");
}