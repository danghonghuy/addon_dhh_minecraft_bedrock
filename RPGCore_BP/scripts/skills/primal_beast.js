// --- START OF FILE: skills/primal_beast.js --- (PHIÊN BẢN CÓ HIỆU ỨNG NIỆM CHÚ)

import { world, system, MolangVariableMap, TimeOfDay } from "@minecraft/server"; // <-- ĐẢM BẢO CÓ TimeOfDay
import { CONFIG } from "../config.js";
import { applyAllBonuses } from "../main.js";
// === CÁC THAM SỐ ===
const CHANT_DURATION_SECONDS = 19;
const BASE_TRANSFORM_DURATION_SECONDS = 60;
const DURATION_INCREASE_PER_LEVEL = 60;
const PRIMAL_FORM_TAG = "dhh:primal_form";
const activeChants = new Map();

const SKY_CIRCLES_DEF = [
  { y_offset: 10, size: 5, appear_time: 2 },
  { y_offset: 20, size: 30, appear_time: 6 },
  { y_offset: 30, size: 10, appear_time: 10 },
];

// --- CÁC HÀM PHỤ ---

function runWorldCommand(command) {
    try { world.getDimension("overworld").runCommand(command); } catch (e) {}
}

// Hủy bỏ niệm chú
function cancelChant(player, message) {
    if (!activeChants.has(player.nameTag)) return;
    const chantState = activeChants.get(player.nameTag);
    system.clearRun(chantState.intervalId);
    
    // <-- THÊM MỚI: Khôi phục khi hủy
    if (chantState.originalWorldTime !== undefined) {
        world.setTimeOfDay(chantState.originalWorldTime);
    }
    runWorldCommand("weather clear");
    
    activeChants.delete(player.nameTag);

    runWorldCommand("stopsound " + player.nameTag + " dhh.godzilla_sound");
    player.sendMessage(message || "§cNiệm chú hóa thân thất bại!");
    player.playSound("random.fizz", { volume: 2.0 });
}

// Dọn dẹp sau khi hết biến hình
function cleanUpForm(player) {
    player.triggerEvent("dhh:deactivate_primal_form");
    player.removeTag(PRIMAL_FORM_TAG);

    // Thay vì xóa từng hiệu ứng một, hãy gọi hàm tổng để áp dụng lại tất cả buff
    // Điều này sẽ tự động ghi đè và tính toán lại các hiệu ứng dựa trên chỉ số gốc
    system.run(() => {
        if (player.isValid) {
            applyAllBonuses(player);
        }
    });
}

// Áp dụng trạng thái biến hình
function applyTransformation(player, stats, originalWorldTime) { // <-- CHỈNH SỬA: Nhận thêm originalWorldTime
    // <-- THÊM MỚI: Khôi phục ngay khi biến hình thành công
    if (originalWorldTime !== undefined) {
        world.setTimeOfDay(originalWorldTime);
    }
    runWorldCommand("weather clear");

    const skillLevel = stats.skills.primal_beast ?? 1;
    const finalDuration = BASE_TRANSFORM_DURATION_SECONDS + (skillLevel - 1) * DURATION_INCREASE_PER_LEVEL;
    const finalDurationTicks = finalDuration * 20;

    player.sendMessage("§6Bạn đã hóa thân thành công!");
  player.triggerEvent("dhh:deactivate_primal_form");
    player.triggerEvent("dhh:activate_primal_form");
  player.addTag(PRIMAL_FORM_TAG); 
    // Áp dụng buff
    player.addEffect("health_boost", finalDurationTicks, { amplifier: 4 + skillLevel, showParticles: false });
    player.addEffect("resistance", finalDurationTicks, { amplifier: 1 + Math.floor(skillLevel / 3), showParticles: false });
    player.addEffect("speed", finalDurationTicks, { amplifier: 1 + Math.floor(skillLevel / 4), showParticles: false });
    player.addEffect("regeneration", finalDurationTicks, { amplifier: Math.floor(skillLevel / 2), showParticles: false });
    player.addEffect("jump_boost", finalDurationTicks, { amplifier: 1 + Math.floor(skillLevel / 2), showParticles: false }); // <-- THÊM SỨC NHẢY
player.addEffect("strength", finalDurationTicks, { amplifier: 1 + skillLevel, showParticles: false }); // <-- THÊM SÁT THƯƠNG
 player.addEffect("slow_falling", finalDurationTicks, { amplifier: 0, showParticles: false });
  player.addEffect("regeneration", finalDurationTicks, { amplifier: 0 + Math.floor(skillLevel / 3), showParticles: false });
    
    // Kháng Lửa (Fire Resistance)
    // Hiệu ứng này chỉ có 1 cấp (cấp I), miễn nhiễm hoàn toàn với lửa
    player.addEffect("fire_resistance", finalDurationTicks, { amplifier: 0, showParticles: false });
    
    // Kháng Sát Thương (Resistance)
    // Ví dụ: Bắt đầu từ cấp I, cứ mỗi 4 cấp kỹ năng thì tăng 1 cấp kháng
    player.addEffect("resistance", finalDurationTicks, { amplifier: 0 + Math.floor(skillLevel / 4), showParticles: false });
    system.runTimeout(() => {
        if (player.isValid) {
            cleanUpForm(player);
            player.sendMessage("§eBạn trở lại hình dạng con người...");
              const cooldownSeconds = CONFIG.SKILL_COOLDOWNS.PRIMAL_BEAST;
            player.setDynamicProperty("dhh:cd_primal_beast", system.currentTick + cooldownSeconds * 20);
            player.sendMessage(`§cKỹ năng Hóa Thân Thần Thú đang hồi... (${cooldownSeconds} giây)`);
        }
    }, finalDurationTicks);
}

// --- HÀM CHÍNH ---
function startChant(player, stats) {
    player.sendMessage("§eBạn bắt đầu gầm lên, tập trung năng lượng nguyên thủy...");
    runWorldCommand("playsound dhh.godzilla_sound @a[name=\"" + player.nameTag + "\"]");
    
    // <-- THÊM MỚI: Bắt đầu thay đổi thời gian & thời tiết
    const originalTime = world.getTimeOfDay();
    world.setTimeOfDay(TimeOfDay.Midnight);
    runWorldCommand("weather thunder");

    const startLocation = { ...player.location };

    const chantState = {
        startTime: system.currentTick,
        startLocation: startLocation,
        player,
        stats,
        intervalId: null,
        originalWorldTime: originalTime, // <-- THÊM MỚI: Lưu thời gian gốc
    };

    const intervalId = system.runInterval(() => {
        const distanceMoved = Math.sqrt(
            Math.pow(player.location.x - chantState.startLocation.x, 2) +
            Math.pow(player.location.z - chantState.startLocation.z, 2)
        );

        if (!player.isValid || !player.isSneaking || distanceMoved > 0.5) {
            cancelChant(player, distanceMoved > 0.5 ? "§cNiệm chú bị hủy do di chuyển!" : null);
            return;
        }

        const elapsedSeconds = (system.currentTick - chantState.startTime) / 20;
        const dimension = player.dimension;
        const groundCircleMolang = new MolangVariableMap();
        groundCircleMolang.setFloat("variable.particle_lifetime", 0.3);
        groundCircleMolang.setFloat("variable.circle_size", 4 + elapsedSeconds * 0.5);
        dimension.spawnParticle("dhh:primal_circle", player.location, groundCircleMolang);
        for (const circleDef of SKY_CIRCLES_DEF) {
            if (elapsedSeconds >= circleDef.appear_time) {
                const circleLocation = { x: player.location.x, y: player.location.y + circleDef.y_offset, z: player.location.z };
                const skyCircleMolang = new MolangVariableMap();
                skyCircleMolang.setFloat("variable.particle_lifetime", 0.3);
                skyCircleMolang.setFloat("variable.circle_size", circleDef.size);
                dimension.spawnParticle("dhh:primal_circle", circleLocation, skyCircleMolang);
            }
        }
        
        if (elapsedSeconds >= CHANT_DURATION_SECONDS) {
            system.clearRun(intervalId);
            const originalWorldTime = chantState.originalWorldTime; // <-- THÊM MỚI
            activeChants.delete(player.nameTag);
            applyTransformation(player, stats, originalWorldTime); // <-- CHỈNH SỬA
        }
    }, 5);

    chantState.intervalId = intervalId;
    activeChants.set(player.nameTag, chantState);
}

// --- HÀM KÍCH HOẠT CHÍNH --- (PHIÊN BẢN CẬP NHẬT)
export function activatePrimalBeast(player, stats) {
    // --- BẮT ĐẦU THAY ĐỔI ---
    // KIỂM TRA XEM NGƯỜI CHƠI CÓ ĐANG BIẾN HÌNH KHÔNG
    if (player.hasTag(PRIMAL_FORM_TAG)) {
        // Nếu có, thực hiện việc hủy biến hình
        cleanUpForm(player); // Gọi hàm dọn dẹp có sẵn
        player.sendMessage("§eBạn trở lại hình dạng con người...");
        player.playSound("entity.zombie_villager.converted", { volume: 1.0, pitch: 0.8 });

        // BẮT ĐẦU TÍNH THỜI GIAN HỒI CHIÊU NGAY LẬP TỨC
        const cooldownSeconds = CONFIG.SKILL_COOLDOWNS.PRIMAL_BEAST;
        player.setDynamicProperty("dhh:cd_primal_beast", system.currentTick + cooldownSeconds * 20);
        player.sendMessage(`§cKỹ năng Hóa Thân Thần Thú đang hồi... (${cooldownSeconds} giây)`);
        
        // Hủy bỏ bất kỳ quá trình niệm chú nào đang diễn ra (phòng trường hợp lỗi)
        if (activeChants.has(player.nameTag)) {
            cancelChant(player, "§cĐã hủy hóa thân.");
        }

        return true; // Trả về true để báo hiệu hành động thành công
    }
    // --- KẾT THÚC THAY ĐỔI ---

    // Các đoạn code kiểm tra niệm chú, mana, cooldown cũ vẫn giữ nguyên
    if (activeChants.has(player.nameTag)) {
        player.sendMessage("§cBạn đã đang trong quá trình niệm chú!");
        return false;
    }

    // GHI CHÚ: Dòng kiểm tra "dhh:is_transformed" này có thể bị xóa đi vì chúng ta đã dùng hasTag ở trên,
    // nhưng cứ để lại cũng không sao.
    if (player.getProperty("dhh:is_transformed")) {
        player.sendMessage("§cBạn đã đang trong dạng Thần Thú!");
        return false;
    }

    if (!player.isSneaking) {
        player.sendMessage("§cBạn phải ngồi xuống (sneak) để bắt đầu niệm chú!");
        return false;
    }

    const cooldownTick = player.getDynamicProperty("dhh:cd_primal_beast") ?? 0;
    if (system.currentTick < cooldownTick) {
        player.sendMessage(`§cKỹ năng chưa hồi! (${Math.ceil((cooldownTick - system.currentTick) / 20)}s)`);
        return false;
    }

    const manaCost = CONFIG.SKILL_MANA_COSTS.PRIMAL_BEAST;
    if (stats.currentMana < manaCost) {
        player.sendMessage(`§cKhông đủ mana! Cần §b${manaCost}§c, bạn có §b${Math.floor(stats.currentMana)}§c.`);
        return false;
    }
    
    player.setDynamicProperty("dhh:mana", stats.currentMana - manaCost);
 
    startChant(player, stats);
    return true;
}

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        if (player.getProperty("dhh:is_transformed")) {
            const auraMolang = new MolangVariableMap();
            auraMolang.setFloat("variable.spawn_rate", 80);
            auraMolang.setFloat("variable.radius", 1.2);
            player.dimension.spawnParticle("dhh:beast_aura", player.location, auraMolang);
            const groundCircleLocation = { 
    x: player.location.x, 
    y: player.location.y + 0.5, // <-- THAY ĐỔI NẰM Ở ĐÂY
    z: player.location.z 
};
const groundCircleMolang = new MolangVariableMap();
groundCircleMolang.setFloat("variable.particle_lifetime", 0.6);
groundCircleMolang.setFloat("variable.circle_size", 2.5);
player.dimension.spawnParticle("dhh:primal_circle", groundCircleLocation, groundCircleMolang);
        }
    }
}, 10);

world.afterEvents.entityHurt.subscribe(event => {
    const { hurtEntity, damageSource, damage } = event;
    const attacker = damageSource.damagingEntity;

    // --- SỬA TỪ ĐÂY ---

    // Điều kiện 1: Phải là người chơi tấn công và đang trong dạng Thần Thú
    // Điều kiện 2: Mục tiêu KHÔNG có tag tạm thời (nghĩa là cú đánh này chưa được xử lý)
    if (attacker?.typeId === "minecraft:player" && 
        attacker.hasTag(PRIMAL_FORM_TAG) && 
        !hurtEntity.hasTag("dhh:bonus_damage_applied")) {
        
        // 1. Đánh dấu ngay lập tức là đã xử lý
        hurtEntity.addTag("dhh:bonus_damage_applied");

        const stats = { skills: { primal_beast: attacker.getDynamicProperty("dhh:skill_primal_beast") ?? 1 } };
        const skillLevel = stats.skills.primal_beast;
        const extraDamage = damage * (0.5 + skillLevel * 0.1);

        hurtEntity.applyDamage(extraDamage, { cause: "entityAttack", causingEntity: attacker });
 try {
            const healthToHeal = 1; // Cố định hồi 1 máu mỗi đòn đánh
            const healthComponent = attacker.getComponent("health");

            if (healthComponent) {
                // Tính toán lượng máu mới, không vượt quá máu tối đa
                const newHealth = Math.min(healthComponent.effectiveMax, healthComponent.currentValue + healthToHeal);
                healthComponent.setCurrentValue(newHealth);

                // Thêm hiệu ứng hạt trái tim để người chơi nhận biết
                attacker.dimension.spawnParticle("minecraft:heart_particle", attacker.getHeadLocation(), new MolangVariableMap());
            }
        } catch (error) {
            console.warn(`[Primal Beast Lifesteal] Lỗi khi hồi máu: ${error}`);
        }
        // --- HIỆU ỨNG & ÂM THANH ---
        runWorldCommand("playsound dhh.hit @a[name=\"" + attacker.nameTag + "\"]");
        attacker.dimension.spawnParticle("dhh:claw_slash", hurtEntity.getHeadLocation());

        // 2. Lên lịch xóa tag ngay sau đó để cú đánh tiếp theo có thể được xử lý
        system.run(() => {
            if (hurtEntity.isValid) { // Kiểm tra mục tiêu còn sống không
                hurtEntity.removeTag("dhh:bonus_damage_applied");
            }
        });
    }
    // --- SỬA TỚI ĐÂY ---
});