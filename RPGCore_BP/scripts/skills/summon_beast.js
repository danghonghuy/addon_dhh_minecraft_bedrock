// --- START OF FILE skills/summon_beast.js ---

import { world, system, EntityComponentTypes } from "@minecraft/server";

const SPIRIT_BEASTS_POOL = [
    { typeId: "minecraft:wolf", name: "§bSói Tinh Linh" },
     { typeId: "dhh:loyal_skeleton", name: "§fKhô Cốt Trung Thành" },
      { typeId: "dhh:warden_girl_pet", name: "§dWarden Hộ Vệ" },
{ typeId: "dhh:ty_pet", name: "§aSiêu Xạ Thủ TY" }

];
const UN_SUMMON_CONFIRM_DURATION_TICKS = 60;

function setupBeast(beast, player, beastInfo, skillLevel) {
    // Các thao tác đơn giản, an toàn
    beast.nameTag = `${beastInfo.name} §r§f(Cấp ${skillLevel})`;
    beast.addTag("dhh_spirit_beast");
    beast.addTag(`owner:${player.nameTag}`);

    // ===================================================================
    // === GIẢI PHÁP CUỐI CÙNG: DÙNG HEALTH_BOOST SAU KHI THUẦN HÓA =====
    // ===================================================================
    system.run(() => {
        if (!beast.isValid) return;

        try {
            // --- BƯỚC 1: THUẦN HÓA NGAY LẬP TỨC ĐỂ CÓ MÁU GỐC 20 HP ---
            const tameable = beast.getComponent(EntityComponentTypes.Tameable);
            if (tameable) {
                tameable.tame(player);
            }

            // --- BƯỚC 2: ÁP DỤNG HIỆU ỨNG HEALTH_BOOST ---
            // Amplifier = skillLevel + 1. Sẽ bị giới hạn bởi game ở tổng 40HP.
            const healthBoostAmplifier = skillLevel + 1;
            beast.addEffect('health_boost', 20000000, { amplifier: healthBoostAmplifier, showParticles: false });
            
            // --- BƯỚC 3: ÁP DỤNG CÁC HIỆU ỨNG KHÁC ---
            const duration = 20000000;
            const strength = -1 + Math.floor(skillLevel / 3);
            const resistance = -1 + Math.floor(skillLevel / 5);
            const speed = -1 + Math.floor(skillLevel / 4);
            const regeneration = 0;

            if (strength >= 0) beast.addEffect('strength', duration, { amplifier: strength, showParticles: false });
            if (resistance >= 0) beast.addEffect('resistance', duration, { amplifier: resistance, showParticles: false });
            if (speed >= 0) beast.addEffect('speed', duration, { amplifier: speed, showParticles: false });
            if (regeneration >= 0) beast.addEffect('regeneration', duration, { amplifier: regeneration, showParticles: false });
            
            // --- BƯỚC 4: HỒI ĐẦY MÁU LÊN MỨC TỐI ĐA MỚI ---
            const healthComponent = beast.getComponent(EntityComponentTypes.Health);
            if(healthComponent) {
                healthComponent.resetToMaxValue();
            }

        } catch (e) {
            console.error("Failed to setup beast with effects: ", e.stack);
            player.sendMessage("§cĐã xảy ra lỗi khi cường hóa linh thú.");
        }
    });
}

// Hàm activateSummonBeast không cần thay đổi
export function activateSummonBeast(player) {
    try {
        const activePetId = player.getDynamicProperty("dhh:active_pet_id");
        const wantsToUnSummonTime = player.getDynamicProperty("dhh:unsummon_confirm_tick") ?? 0;

        if (activePetId) {
            const existingPet = world.getEntity(activePetId);
            const now = system.currentTick;

            if (!existingPet?.isValid) {
                 player.setDynamicProperty("dhh:active_pet_id", undefined);
                 player.setDynamicProperty("dhh:unsummon_confirm_tick", 0);
                 player.sendMessage("§eLinh thú của bạn đã biến mất. Sẵn sàng triệu hồi mới.");
                 return false; 
            }
            
            if (wantsToUnSummonTime > 0 && now <= wantsToUnSummonTime) {
                existingPet.kill(); 
                player.sendMessage("§aĐã giải tán linh thú.");
                player.setDynamicProperty("dhh:unsummon_confirm_tick", 0);
                player.playSound("entity.item.pickup");
                return false; 
            } else {
                const newConfirmTime = now + UN_SUMMON_CONFIRM_DURATION_TICKS;
                player.setDynamicProperty("dhh:unsummon_confirm_tick", newConfirmTime);
                player.onScreenDisplay.setActionBar("§e§lKích hoạt kỹ năng lần nữa trong 3 giây để giải tán linh thú!");
                player.playSound("note.pling");
                return false;
            }
        }

        const currentSkillLevel = (player.getDynamicProperty("dhh:skill_summon_wolf") ?? 1);
        const beastInfo = SPIRIT_BEASTS_POOL[Math.floor(Math.random() * SPIRIT_BEASTS_POOL.length)];
        const newBeast = player.dimension.spawnEntity(beastInfo.typeId, player.location);

        if (!newBeast) {
            player.sendMessage("§cTriệu hồi thất bại!");
            return false;
        }

        setupBeast(newBeast, player, beastInfo, currentSkillLevel);
        player.setDynamicProperty("dhh:active_pet_id", newBeast.id);
        player.sendMessage(`§aBạn đã triệu hồi một ${newBeast.nameTag}§a!`);
        player.playSound("entity.evoker.prepare_summon");
        return true; 

    } catch (e) {
        player.sendMessage("§cKhông thể thực hiện kỹ năng!");
        console.error("Summon Beast skill failed: ", e.stack);
        return false;
    }
}