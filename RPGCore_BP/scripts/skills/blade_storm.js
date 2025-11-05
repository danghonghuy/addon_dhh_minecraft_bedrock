// --- START OF FILE: skills/blade_storm.js --- (PHIÊN BẢN THIÊN NHIÊN THỊNH NỘ)

import { world, system, MolangVariableMap, TimeOfDay } from "@minecraft/server"; // <-- THÊM TimeOfDay
import { CONFIG } from "../config.js";

// === CÁC THAM SỐ GỐC (DÀNH CHO CẤP 1) ===
const BASE_STORM_DURATION_SECONDS = 10;
const BASE_STORM_RADIUS = 10;
const BASE_DAMAGE_PER_TICK = 5;

// === CÁC THAM SỐ TĂNG MỖI CẤP ===
const DURATION_INCREASE_PER_LEVEL = 10;
const RADIUS_INCREASE_PER_LEVEL = 5;
const DAMAGE_INCREASE_PER_LEVEL = 3;

const DAMAGE_TICK_RATE = 20;
const MAX_DAMAGE_STACKS = 10;

const SOUND_LOOP_RATE_TICKS = 5;
const activeStorms = new Map();

// --- CÁC HÀM PHỤ ---

// THÊM MỚI: Hàm helper để chạy lệnh, giống hệt explosion.js
function runWorldCommand(command) {
  try {
    world.getDimension("overworld").runCommand(command);
  } catch (e) {
    console.warn(`Lệnh không thực thi được: ${command}. Lỗi: ${e}`);
  }
}

function cleanUpStorm(player) {
    if (!activeStorms.has(player.nameTag)) return;
    const stormState = activeStorms.get(player.nameTag);

    // Dọn dẹp các vòng lặp
    system.clearRun(stormState.intervalId);
    system.clearRun(stormState.lightningIntervalId); // <-- THÊM MỚI
    system.clearRun(stormState.soundLoopIntervalId);
    runWorldCommand("stopsound " + player.nameTag + " dhh.sword_sound");
    // THÊM MỚI: Khôi phục thời gian và thời tiết
    if (stormState.originalWorldTime !== undefined) {
        world.setTimeOfDay(stormState.originalWorldTime);
    }
    runWorldCommand("weather clear");

    activeStorms.delete(player.nameTag);
}

function applyAftermath(player, stats) {
    player.sendMessage("§eBão kiếm đã tan...");
    const debuffDuration = 20 * 20; 
    player.addEffect("weakness", debuffDuration, { amplifier: 1 });
    player.addEffect("mining_fatigue", debuffDuration, { amplifier: 1 });

    const cooldownSeconds = CONFIG.SKILL_COOLDOWNS.BLADE_STORM;
    player.setDynamicProperty(
        "dhh:cd_blade_storm",
        system.currentTick + cooldownSeconds * 20
    );
    player.sendMessage(
        `§cKỹ năng Blade Storm đang hồi... (${cooldownSeconds} giây)`
    );
    
    // Dọn dẹp state cuối cùng (hàm này giờ đã bao gồm cả việc khôi phục thời gian/thời tiết)
    cleanUpStorm(player);
}

// --- HÀM CHÍNH ---
function startStorm(player, stats) {
    player.sendMessage("§6Bạn triệu hồi một cơn bão kiếm!");
    player.sendMessage("§aĐồng minh trong bão sẽ nhận được nhiều hiệu ứng cường hóa!");
    player.playSound("armor.equip_diamond", { volume: 2.0, pitch: 0.5 });
    player.playSound("item.trident.riptide_3", { volume: 1.0, pitch: 1.2 });
runWorldCommand("playsound dhh.sword_sound @a[name=\"" + player.nameTag + "\"]");
    // THÊM MỚI: Thay đổi thời gian và thời tiết
    const originalTime = world.getTimeOfDay();
    world.setTimeOfDay(TimeOfDay.Midnight);
    runWorldCommand("weather thunder");

    const skillLevel = stats.skills.blade_storm ?? 1;
    const finalDuration = BASE_STORM_DURATION_SECONDS + (skillLevel - 1) * DURATION_INCREASE_PER_LEVEL;
    const finalRadius = BASE_STORM_RADIUS + (skillLevel - 1) * RADIUS_INCREASE_PER_LEVEL;
    const finalBaseDamage = BASE_DAMAGE_PER_TICK + (skillLevel - 1) * DAMAGE_INCREASE_PER_LEVEL;
    const finalDurationTicks = finalDuration * 20;

    const stormState = {
        startTime: system.currentTick,
        player,
        stats,
        intervalId: null,
        lightningIntervalId: null, // <-- THÊM MỚI
        soundLoopIntervalId: null,

        damageStacks: new Map(),
        originalWorldTime: originalTime, // <-- THÊM MỚI
    };

    // Vòng lặp chính của kỹ năng
    const intervalId = system.runInterval(() => {
        if (!player.isValid) {
            cleanUpStorm(player);
            return;
        }

        const elapsedTicks = system.currentTick - stormState.startTime;
        if (elapsedTicks >= finalDurationTicks) {
            applyAftermath(player, stats);
            return;
        }

        // ... (code hiệu ứng và sát thương không đổi)
        const dimension = player.dimension;
        const playerLocation = player.location;
   const groundCircleMolang = new MolangVariableMap();
groundCircleMolang.setFloat("variable.particle_lifetime", 0.6);
// SỬA THÀNH: Lấy kích thước động từ bán kính kỹ năng (lấy đường kính nên nhân 2)
groundCircleMolang.setFloat("variable.circle_size", finalRadius * 2); 
dimension.spawnParticle("dhh:knight_circle", playerLocation, groundCircleMolang);
        for (let i = 1; i <= 3; i++) {
            const headCircleLocation = { x: playerLocation.x, y: playerLocation.y + 1 + i * 1.5, z: playerLocation.z };
            const headCircleMolang = new MolangVariableMap();
            headCircleMolang.setFloat("variable.particle_lifetime", 0.6);
            headCircleMolang.setFloat("variable.circle_size", 3 - i * 0.5);
            dimension.spawnParticle("dhh:knight_circle", headCircleLocation, headCircleMolang);
        }
        const stormMolang = new MolangVariableMap();
        stormMolang.setFloat("variable.storm_radius", finalRadius);
        dimension.spawnParticle("dhh:blade_storm", playerLocation, stormMolang);
        const entitiesInStorm = dimension.getEntities({ location: playerLocation, maxDistance: finalRadius, families: ["monster"], excludeTags: ["player"] });
        const entitiesInStormSet = new Set(entitiesInStorm.map(e => e.id));
        for (const entity of entitiesInStorm) {
            const currentStacks = stormState.damageStacks.get(entity) || 0;
            const newStacks = Math.min(currentStacks + 1, MAX_DAMAGE_STACKS);
            stormState.damageStacks.set(entity, newStacks);
            const damage = (finalBaseDamage + stats.strength * 0.1) * newStacks;
            entity.addTag(`blade_storm_victim:${player.nameTag}`);
            entity.applyDamage(damage, { causingEntity: player, cause: "magic" });
            entity.addEffect("slowness", 25, { amplifier: 0 });
        }
        for (const entity of stormState.damageStacks.keys()) {
            if (!entity.isValid || !entitiesInStormSet.has(entity.id)) {
                stormState.damageStacks.delete(entity);
            }
        }
          // === MỚI: CƯỜNG HÓA 3 HIỆU ỨNG CHO ĐỒNG MINH ==============
        // ===================================================================
        const alliesInStorm = dimension.getPlayers({
            location: playerLocation,
            maxDistance: finalRadius,
            excludeNames: [player.nameTag] // Quan trọng: Không buff cho chính mình
        });

        // Sức mạnh của buff tăng theo cấp
        // Cấp 1-3: Strength/Resistance I (amplifier 0)
        // Cấp 4-6: Strength/Resistance II (amplifier 1)
        // Cấp 7-9: Strength/Resistance III (amplifier 2)
        const buffAmplifier = Math.floor((skillLevel - 1) / 3);
        const buffDuration = 40; // Kéo dài hơn 1 tick (20) để không bị ngắt quãng

        for (const ally of alliesInStorm) {
            // Gán hiệu ứng Sức mạnh (Strength)
            ally.addEffect("strength", buffDuration, { amplifier: buffAmplifier, showParticles: false });
            
            // Gán hiệu ứng Kháng sát thương (Resistance)
            ally.addEffect("resistance", buffDuration, { amplifier: buffAmplifier, showParticles: false });
            
            // Gán hiệu ứng Kháng lửa (Fire Resistance) - chỉ có 1 cấp
          ally.addEffect("fire_resistance", buffDuration, { amplifier: buffAmplifier, showParticles: false }); 
             ally.addEffect("regeneration", buffDuration, { amplifier: buffAmplifier, showParticles: false });
            // Thêm hiệu ứng và âm thanh để đồng đội biết họ được buff (chỉ cần 1 lần)
            ally.dimension.spawnParticle("minecraft:totem_particle", ally.location);
            ally.playSound("random.orb", { location: ally.location, pitch: 1.5 });
        }

    }, DAMAGE_TICK_RATE);

    // THÊM MỚI: Vòng lặp riêng cho sét
    const lightningIntervalId = system.runInterval(() => {
        if (!activeStorms.has(player.nameTag)) {
            system.clearRun(lightningIntervalId);
            return;
        }
        
        const dimension = player.dimension;
        const playerLocation = player.location;
        
        // Tạo 3 tia sét ngẫu nhiên trong phạm vi bão
        for (let i = 0; i < 3; i++) {
            const randomX = (Math.random() - 0.5) * 2 * finalRadius;
            const randomZ = (Math.random() - 0.5) * 2 * finalRadius;
            const strikeLocation = {
                x: playerLocation.x + randomX,
                y: playerLocation.y,
                z: playerLocation.z + randomZ,
            };
            dimension.spawnEntity("minecraft:lightning_bolt", strikeLocation);
        }
    }, 30); // Mỗi 1.5 giây (30 ticks) tạo 1 đợt sét
const soundLoopIntervalId = system.runInterval(() => {
    if (!activeStorms.has(player.nameTag)) {
        system.clearRun(soundLoopIntervalId);
        return;
    }
    runWorldCommand("playsound dhh.sword_sound @a[name=\"" + player.nameTag + "\"]");
}, SOUND_LOOP_RATE_TICKS);
    // Lưu lại ID của cả hai vòng lặp
    stormState.intervalId = intervalId;
    stormState.lightningIntervalId = lightningIntervalId;
  stormState.soundLoopIntervalId = soundLoopIntervalId;
    activeStorms.set(player.nameTag, stormState);
}


export function activateBladeStorm(player, stats) {
    // --- BẮT ĐẦU THAY ĐỔI ---
    // Kiểm tra xem có đang trong bão không ĐỂ HỦY
    if (activeStorms.has(player.nameTag)) {
        player.sendMessage("§eBạn đã chủ động giải trừ Bão Kiếm.");
        player.playSound("random.fizz", { volume: 1.5, pitch: 0.8 });
        
        // Gọi hàm dọn dẹp để dừng mọi hiệu ứng và trả lại thời tiết/thời gian
        cleanUpStorm(player);
        
        // Đặt một cooldown ngắn để tránh spam bật/tắt
        player.setDynamicProperty("dhh:cd_blade_storm", system.currentTick + 100); // 5 giây
        
        return false; // Trả về false để main.js không trừ mana hay đặt cooldown dài
    }
    // --- KẾT THÚC THAY ĐỔI ---

    const cooldownTick = player.getDynamicProperty("dhh:cd_blade_storm") ?? 0;
    if (system.currentTick < cooldownTick) {
        player.sendMessage(`§cBlade Storm chưa hồi! (${Math.ceil((cooldownTick - system.currentTick) / 20)}s)`);
        return false;
    }

    const manaCost = CONFIG.SKILL_MANA_COSTS.BLADE_STORM;
    if (stats.currentMana < manaCost) {
        player.sendMessage(`§cKhông đủ mana! Cần §b${manaCost}§c, bạn có §b${Math.floor(stats.currentMana)}§c.`);
        return false;
    }

    startStorm(player, stats);
    player.setDynamicProperty("dhh:mana", stats.currentMana - manaCost);
    return true;
}