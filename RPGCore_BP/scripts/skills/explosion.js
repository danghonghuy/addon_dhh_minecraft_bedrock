// --- START OF FILE: skills/explosion.js --- (PHIÊN BẢN SỬA LỖI CUỐI CÙNG)

import {
  world,
  system,
  BlockPermutation,
  MolangVariableMap,
  TimeOfDay,
} from "@minecraft/server";
import { CONFIG } from "../config.js";
import { Vector } from "./vector.js";

// === CÁC THAM SỐ ===
const CHANT_DURATION_SECONDS = 17;
const CHANT_DURATION_TICKS = CHANT_DURATION_SECONDS * 20;
const EXPLOSION_RADIUS = 30;

const activeChants = new Map();

const CHANT_LINES = [
  { time: 0, text: "§cHỡi sắc đen sâu thẳm hơn cả bóng tối..." },
  { time: 3, text: "§cHỡi sắc đỏ rực rỡ hơn cả máu tươi..." },
  { time: 6, text: "§cChìm đắm trong dòng chảy thời gian..." },
  { time: 9, text: "§cTa xin hiến tên mình cho ngươi..." },
  { time: 12, text: "§4§lTa là thiên tài pháp thuật vĩ đại - {playerName}!" },
  { time: 14, text: "§4§lKẻ thù run sợ trước sức mạnh tuyệt đối của ta!" },
  { time: 15.5, text: "§4§l§kAAA§r§4§lEXPLOSION!!!§k§4AAA" },
];

const SKY_CIRCLES_DEF = [
  // GIẢM CÒN 10 VÒNG SÁNG ĐỂ TỐI ƯU HIỆU NĂNG
  { y_offset: 0,  size: 30, appear_time: 0 },    // 1. Vòng mặt đất (quan trọng)
  { y_offset: 13, size: 20, appear_time: 1.5 },  // 2.
  { y_offset: 16, size: 8,  appear_time: 3 },    // 3.
  { y_offset: 22, size: 15, appear_time: 4.5 },  // 4.
  { y_offset: 25, size: 25, appear_time: 6 },    // 5. (Nửa chặng đường)
  { y_offset: 31, size: 22, appear_time: 7.5 },  // 6.
  { y_offset: 34, size: 14, appear_time: 9 },    // 7.
  { y_offset: 40, size: 16, appear_time: 10.5 }, // 8.
  { y_offset: 43, size: 24, appear_time: 12 },   // 9.
  { y_offset: 49, size: 35, appear_time: 14 },   // 10. Vòng cao nhất, cuối cùng (quan trọng)
];

// --- CÁC HÀM PHỤ ---

/**
 * Helper function để chạy command từ server, giống hệt music_system.js
 * Cần thiết cho các âm thanh tùy chỉnh dạng stream.
 */
function runWorldCommand(command) {
  try {
    world.getDimension("overworld").runCommand(command);
  } catch (e) {
    console.warn(`Lệnh không thực thi được: ${command}. Lỗi: ${e}`);
  }
}

function cancelChant(player, message) {
  if (!activeChants.has(player.nameTag)) return;
  const chantState = activeChants.get(player.nameTag);
  system.clearRun(chantState.intervalId);
  system.clearRun(chantState.lightningIntervalId);
  if (chantState.skyThunderIntervalId) {
  system.clearRun(chantState.skyThunderIntervalId);
}

  if (chantState.originalWorldTime !== undefined) {
    world.setTimeOfDay(chantState.originalWorldTime);
  }
  runWorldCommand("weather clear");
  activeChants.delete(player.nameTag);

  // Dừng âm thanh niệm chú nếu đang phát
  runWorldCommand("stopsound @a dhh.explosion.chant");

  // Dòng setTitle đã được xóa khỏi đây
  player.sendMessage(message || "§cNiệm chú thất bại!");
  player.playSound("random.fizz", { volume: 2.0 });
  player.setDynamicProperty("dhh:cd_explosion", system.currentTick + 200);
}

function applyAftermath(player, stats, originalWorldTime)  { // <--- THÊM `stats` VÀO ĐÂY
    if (originalWorldTime !== undefined) {
    world.setTimeOfDay(originalWorldTime);
  }
  runWorldCommand("weather clear");
  player.sendMessage("§4§lBạn đã gục ngã vì sử dụng quá nhiều năng lượng...");

  // --- BẮT ĐẦU CHỈNH SỬA ---
  const skillLevel = stats.skills.explosion ?? 1; // Lấy level skill
  const baseDurationTicks = 300 * 20; // 300 giây
  const reductionPerLevel = 0.05; // Giảm 5% mỗi cấp
  const maxReduction = 0.75; // Giảm tối đa 75%

  // Tính toán mức giảm
  let totalReduction = (skillLevel - 1) * reductionPerLevel;
  // Giới hạn mức giảm tối đa
  if (totalReduction > maxReduction) {
    totalReduction = maxReduction;
  }
  
  // Áp dụng mức giảm vào thời gian gốc
  const debuffDuration = baseDurationTicks * (1 - totalReduction);
  player.addEffect("darkness", debuffDuration, { amplifier: 0 })
  player.addEffect("weakness", debuffDuration, { amplifier: 255 });
  player.addEffect("mining_fatigue", debuffDuration, { amplifier: 255 });

  const cooldownSeconds = CONFIG.SKILL_COOLDOWNS.EXPLOSION;
  player.setDynamicProperty(
    "dhh:cd_explosion",
    system.currentTick + cooldownSeconds * 20
  );
  player.sendMessage(
    `§cKỹ năng Explosion đang hồi... (${Math.floor(cooldownSeconds / 60)} phút)`
  );
}

function executeExplosion(player, stats, explosionCenter, originalWorldTime) {
  const dimension = player.dimension;
   const skillLevel = stats.skills.explosion ?? 1; // Lấy level skill, mặc định là 1
  const baseRadius = 20;
const radiusBonusPerLevel = 5; // Tăng 2 block bán kính mỗi cấp

const radius = baseRadius + (skillLevel - 1) * radiusBonusPerLevel;
  
  const baseDamage = 1182;
  const damageBonusPerLevel = 0.48; // Tăng 48% sát thương GỐC mỗi cấp
 const damageBeforeMana = 
    (baseDamage * (1 + (skillLevel - 1) * damageBonusPerLevel)) + 
    (stats.intelligence * 10);

  // Bước 2: Tính toán hệ số nhân sát thương từ Mana tối đa
  // Tỷ lệ: Cứ 2 điểm Mana tối đa = 1% bonus.
  // Ví dụ: 100 Mana -> 50% bonus -> hệ số nhân là 0.5
  const manaDamageMultiplier = stats.maxMana / 200;

  // Bước 3: Áp dụng hệ số nhân từ Mana vào sát thương cơ bản
  const damage = damageBeforeMana * (1 + manaDamageMultiplier);

  // CORRECT: Dùng runWorldCommand để phát âm thanh nổ cho tất cả mọi người
  runWorldCommand("playsound dhh.explosion.boom @a");
  for (const p of world.getAllPlayers()) {
if (p.dimension.id === dimension.id) {
  p.camera.fade({
    fadeColor: { red: 1, green: 0.8, blue: 0.8 }, // Màu hồng nhạt (trắng đỏ)
    fadeTime: { fadeInTime: 0.05, holdTime: 2.0, fadeOutTime: 3.0 },
  });
}
}
  const finalExplosionMolang = new MolangVariableMap();
  finalExplosionMolang.setFloat("variable.emitter_radius", radius * 1.5);
  dimension.spawnParticle(
    "dhh:final_explosion_fill",
    explosionCenter,
    finalExplosionMolang
  );
  for (const p of world.getAllPlayers()) {
    if (
      p.dimension.id === dimension.id &&
      Vector.magnitude(Vector.subtract(p.location, explosionCenter)) <
        radius * 1.5
    ) {
      p.camera.fade({
        fadeColor: { red: 1, green: 1, blue: 1 },
        fadeTime: { fadeInTime: 0.1, holdTime: 0.5, fadeOutTime: 1.0 },
      });
    }
  }
  system.runTimeout(() => {
    let smokeCount = 0;
    const smokeInterval = system.runInterval(() => {
      if (smokeCount >= 10) {
        system.clearRun(smokeInterval);
        return;
      }
      for (let i = 0; i < 20; i++) {
        const randomOffsetX = (Math.random() - 0.5) * 2 * radius;
        const randomOffsetZ = (Math.random() - 0.5) * 2 * radius;
        const randomOffsetY = Math.random() * 10;
        const smokeLocation = {
          x: explosionCenter.x + randomOffsetX,
          y: explosionCenter.y + randomOffsetY,
          z: explosionCenter.z + randomOffsetZ,
        };
        dimension.spawnParticle(
          "minecraft:large_smoke_particle",
          smokeLocation
        );
      }
      smokeCount++;
    }, 10);
  }, 20);
  for (let i = 0; i < 5; i++) {
    dimension.spawnParticle(
      "minecraft:huge_explosion_emitter",
      explosionCenter
    );
  }
  let aftershockCount = 0;
  const aftershockInterval = system.runInterval(() => {
    if (aftershockCount >= 40) {
     
      system.clearRun(aftershockInterval);
      return;
    }

    // Tạo một vị trí ngẫu nhiên bên trong bán kính vụ nổ
    const randomOffsetX = (Math.random() - 0.5) * 2 * radius;
    const randomOffsetZ = (Math.random() - 0.5) * 2 * radius;
    const randomLocation = {
      x: explosionCenter.x + randomOffsetX,
      y: explosionCenter.y,
      z: explosionCenter.z + randomOffsetZ,
    };

    // Tạo hiệu ứng nổ nhỏ tại vị trí ngẫu nhiên
    dimension.spawnParticle("minecraft:huge_explosion_emitter", randomLocation);

    // Phát âm thanh nổ nhỏ tại vị trí đó (giống Golem Punch)
    dimension.playSound("random.explode", randomLocation, {
      volume: 5.0, // Âm lượng nhỏ hơn vụ nổ chính
      pitch: 0.8 + Math.random() * 0.4, // Âm thanh trầm bổng ngẫu nhiên
    });

    aftershockCount++;
  }, 10); // Mỗi nửa giây (10 ticks) tạo một dư chấn
const entities = dimension.getEntities({
  location: explosionCenter,
  maxDistance: radius,
  excludeTypes: ['minecraft:player'],     // <--- DÒNG QUAN TRỌNG: Loại trừ TẤT CẢ người chơi
  excludeFamilies: ['inanimate', 'item']  // Vẫn giữ để bảo vệ vật phẩm, item frame...
});
  let hitCount = 0; 
for (const entity of entities) {
  try {
    if (!entity.isValid) continue;
    const distance = Vector.magnitude(
      Vector.subtract(entity.location, explosionCenter)
    );
    const damageMultiplier = Math.max(0, 1 - distance / radius);
     entity.addTag(`explosion_victim:${player.nameTag}`); 
    entity.applyDamage(damage * damageMultiplier, {
      causingEntity: player,
      cause: "magic",
    });
    hitCount++; // Tăng số lượng kẻ địch bị đánh trúng
  } catch (e) {}
}

// Thông báo số kẻ địch bị tiêu diệt
if (hitCount > 0) {
  world.sendMessage(`§4§l[EXPLOSION] §e${player.nameTag} §cđã hủy diệt §4${hitCount} §ckẻ địch!`);
} else {
  world.sendMessage(`§4§l[EXPLOSION] §e${player.nameTag} §ckhông trúng mục tiêu nào...`);
}

  const air = BlockPermutation.resolve("minecraft:air");
  let currentLayer = 1;
  const phasedDestruction = system.runInterval(() => {
    if (currentLayer > radius) {
      system.clearRun(phasedDestruction);
      return;
    }
    const layerRadiusSq = currentLayer * currentLayer;
    const innerLayerRadiusSq =
      currentLayer > 1 ? (currentLayer - 1) * (currentLayer - 1) : 0;
    for (let x = -currentLayer; x <= currentLayer; x++) {
      for (let y = -currentLayer; y <= currentLayer; y++) {
        for (let z = -currentLayer; z <= currentLayer; z++) {
          const distSq = x * x + y * y + z * z;
          if (distSq <= layerRadiusSq && distSq > innerLayerRadiusSq) {
            const blockLoc = {
              x: Math.floor(explosionCenter.x + x),
              y: Math.floor(explosionCenter.y + y),
              z: Math.floor(explosionCenter.z + z),
            };
            try {
              const block = dimension.getBlock(blockLoc);
              if (block && !block.isAir) {
                dimension.spawnParticle(
                  `minecraft:block_destruct?${block.typeId}`,
                  block.location
                );
                block.setPermutation(air);
              }
            } catch (e) {}
          }
        }
      }
    }
    currentLayer++;
  }, 6);

  applyAftermath(player, stats, originalWorldTime); 
}

// --- HÀM CHÍNH ---
function startChant(player, stats) {
  player.sendMessage("§cBạn bắt đầu triển khai ma pháp hủy diệt...");

  runWorldCommand("playsound dhh.explosion.chant @a");
 runWorldCommand("weather rain"); 

  const originalTime = world.getTimeOfDay(); // Lưu lại thời gian hiện tại của thế giới
  world.setTimeOfDay(TimeOfDay.Midnight); // Chuyển sang ban đêm (nửa đêm)
  const dimension = player.dimension;
  dimension.spawnParticle("dhh:megumin_star", player.location);

const MAX_DISTANCE = 300;
let explosionCenter;

try {
    // Bắn tia (Raycast) và lưu kết quả vào biến 'blockHit'
    // Kết quả có thể là một object (BlockRaycastHit) hoặc là 'undefined'
    const blockHit = player.getBlockFromViewDirection({ maxDistance: MAX_DISTANCE });

    // Kiểm tra xem tia có trúng khối nào không
    if (blockHit) {
        // TRƯỜNG HỢP 1: Bắn trúng!
        const blockLocation = blockHit.block.location;
        explosionCenter = {
            x: blockLocation.x + 0.5,
            y: blockLocation.y + 0.5, // Dịch chuyển tâm vụ nổ lên giữa khối
            z: blockLocation.z + 0.5
        };

    } else {
        // TRƯỜNG HỢP 2: Bắn trượt (nhìn ra khoảng không)
        // Đặt tâm vụ nổ ở khoảng cách tối đa
        explosionCenter = Vector.add(
            player.getHeadLocation(),
            Vector.multiply(player.getViewDirection(), MAX_DISTANCE/10)
        );
    }
} catch (error) {
    // TRƯỜNG HỢP LỖI: Nếu có lỗi xảy ra (ví dụ người chơi không hợp lệ)
    // Quay về phương án an toàn là đặt vụ nổ ngay trước mặt
    console.warn(`[Explosion Skill] Lỗi khi raycasting: ${error}. Sử dụng vị trí dự phòng.`);
    explosionCenter = Vector.add(
        player.getHeadLocation(),
        Vector.multiply(player.getViewDirection(), 20) // Khoảng cách an toàn
    );
}
  const startLocation = { ...player.location };

  const chantState = {
    startTime: system.currentTick,
    startLocation: startLocation,
    player,
    stats,
    intervalId: null,
    lightningIntervalId: null, // <<< THÊM MỚI: Để lưu ID vòng lặp sét
    explosionCenter: explosionCenter,
    nextChantLineIndex: 0,
     originalWorldTime: originalTime,
  };

  // Vòng lặp chính cho hiệu ứng và lời thoại (chạy 4 lần/giây)
  const intervalId = system.runInterval(() => {

    const distanceMoved = Math.sqrt(
      Math.pow(player.location.x - chantState.startLocation.x, 2) +
        Math.pow(player.location.z - chantState.startLocation.z, 2)
    );

    if (!player.isValid || !player.isSneaking || distanceMoved > 0.5) {
      const reason =
        distanceMoved > 0.5 ? "§cNiệm chú bị hủy do di chuyển!" : null;
      cancelChant(player, reason);
      return;
    }

    const elapsedSeconds = (system.currentTick - chantState.startTime) / 20;

    if (chantState.nextChantLineIndex < CHANT_LINES.length) {
      const nextLine = CHANT_LINES[chantState.nextChantLineIndex];
     if (elapsedSeconds >= nextLine.time) {
  let displayText = nextLine.text;
  // Thay thế placeholder cho tên người chơi
  if (displayText.includes("{playerName}")) {
    displayText = displayText.replace("{playerName}", player.nameTag);
  }
  world.sendMessage(`§e[${player.nameTag}]§r ${displayText}`);
  chantState.nextChantLineIndex++;
}
    }

    for (let i = 0; i < 5; i++) {
      dimension.spawnParticle("minecraft:end_rod", player.location);
    }
     try {
        // 1. Lấy vị trí và hướng nhìn hiện tại của người chơi
        const playerHeadLocation = player.getHeadLocation();
        const playerViewDirection = player.getViewDirection();

        // 2. Tính toán vị trí quả cầu năng lượng (cách mặt 2 block)
        const sphereLocation = {
            x: playerHeadLocation.x + playerViewDirection.x * 2,
            y: playerHeadLocation.y + playerViewDirection.y * 2,
            z: playerHeadLocation.z + playerViewDirection.z * 2
        };

        // 3. Phát hiệu ứng tại vị trí đó
        // Lưu ý: Tên định danh phải chính xác như trong tệp .json
        dimension.spawnParticle("dhh_white_sphere_core", sphereLocation);

    } catch(e) {
        // Bỏ qua lỗi nếu có để không làm gián đoạn kỹ năng
    }
 // Tạo vòng tròn ma thuật nhỏ dưới chân người chơi
 const playerCircleLocation = { 
    x: player.location.x, 
    y: player.location.y + 0.3, // <-- THAY ĐỔI
    z: player.location.z 
};
const playerCircleMolang = new MolangVariableMap();
playerCircleMolang.setFloat("variable.particle_lifetime", 0.3);
playerCircleMolang.setFloat("variable.circle_size", 2);
dimension.spawnParticle(
  "dhh:magic_circle",
  playerCircleLocation, // <-- THAY ĐỔI
  playerCircleMolang
);
    const molang = new MolangVariableMap();
    molang.setFloat("variable.particle_lifetime", 0.3);
    molang.setFloat("variable.circle_size", 2 + elapsedSeconds * 0.5);
    dimension.spawnParticle(
      "dhh:magic_circle_explosion",
      explosionCenter,
      molang
    );

    for (const circleDef of SKY_CIRCLES_DEF) {
      const index = SKY_CIRCLES_DEF.indexOf(circleDef);
      if (elapsedSeconds >= circleDef.appear_time) {
        const circleLocation = {
          x: explosionCenter.x,
          y: explosionCenter.y + circleDef.y_offset,
          z: explosionCenter.z,
        };
        const particleId =
          index % 2 === 0 ? "dhh:magic_circle" : "dhh:holy_circle";

        const circleMolang = new MolangVariableMap();
        circleMolang.setFloat("variable.particle_lifetime", 0.3);
        circleMolang.setFloat("variable.circle_size", circleDef.size);
        dimension.spawnParticle(particleId, circleLocation, circleMolang);
      }
    }

    if (elapsedSeconds >= CHANT_DURATION_SECONDS) {
      system.clearRun(intervalId);
      system.clearRun(chantState.lightningIntervalId); 
      system.clearRun(chantState.skyThunderIntervalId);
      activeChants.delete(player.nameTag);
     executeExplosion(player, stats, chantState.explosionCenter, chantState.originalWorldTime);
    }
  }, 5);

  // =================================================================
  // === VÒNG LẶP MỚI: TRIỆU HỒI SÉT NGẪU NHIÊN (chạy 1 lần/giây) ===
  // =================================================================
  const lightningIntervalId = system.runInterval(() => {
    // Kiểm tra xem người chơi còn niệm chú không, nếu không thì tự hủy
    if (!activeChants.has(player.nameTag)) {
      system.clearRun(lightningIntervalId);
      return;
    }

   

    // Triệu hồi sét
for (let i = 0; i < 5; i++) { // Tạo 3 tia sét cùng lúc
  const randomX = (Math.random() - 0.5) * 2 * EXPLOSION_RADIUS;
  const randomZ = (Math.random() - 0.5) * 2 * EXPLOSION_RADIUS;
  const multiStrikeLocation = {
    x: explosionCenter.x + randomX,
    y: explosionCenter.y,
    z: explosionCenter.z + randomZ,
  };
  dimension.spawnEntity("minecraft:lightning_bolt", multiStrikeLocation);
}
  }, 15); // 20 ticks = 1 giây

 const skyThunderIntervalId = system.runInterval(() => {
  // Kiểm tra xem người chơi còn niệm chú không
  if (!activeChants.has(player.nameTag)) {
    system.clearRun(skyThunderIntervalId);
    return;
  }

  // Tạo hiệu ứng sét tại trung tâm các vòng sáng trên trời
  for (const circleDef of SKY_CIRCLES_DEF) {
    const elapsedSeconds = (system.currentTick - chantState.startTime) / 20;
    if (elapsedSeconds >= circleDef.appear_time) {
      const thunderLocation = {
        x: explosionCenter.x,
        y: explosionCenter.y + circleDef.y_offset,
        z: explosionCenter.z,
      };
      dimension.spawnParticle("dhh:ichi_thunder_mid", thunderLocation);
    }
  }
}, 10); // 10 ticks = 0.5 giây

// Lưu lại ID của cả 3 vòng lặp
chantState.intervalId = intervalId;
chantState.lightningIntervalId = lightningIntervalId;
chantState.skyThunderIntervalId = skyThunderIntervalId;
activeChants.set(player.nameTag, chantState);
}

export function activateExplosion(player, stats) {
  if (activeChants.has(player.nameTag)) {
    player.sendMessage("§cBạn đang trong quá trình niệm chú rồi!");
    return false;
  }

  const skillLevel = stats.skills.explosion ?? 1;
  const baseManaCost = CONFIG.SKILL_MANA_COSTS.EXPLOSION;
  const manaReductionPerLevel = 0.05;
  const finalManaCost =
    baseManaCost * (1 - (skillLevel - 1) * manaReductionPerLevel);

  if (stats.currentMana < finalManaCost) {
    player.sendMessage(
      `§cKhông đủ mana! Cần §b${Math.floor(
        finalManaCost
      )}§c, bạn có §b${Math.floor(stats.currentMana)}§c.`
    );
    return false;
  }

  if (!player.isSneaking) {
    player.sendMessage("§cBạn phải ngồi xuống (sneak) để bắt đầu niệm chú!");
    return false;
  }

  startChant(player, stats);
  player.setDynamicProperty("dhh:mana", stats.currentMana - finalManaCost);
  return true;
}
