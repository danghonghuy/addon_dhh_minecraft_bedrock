// --- START OF FILE damage_indicator.js ---

import { world } from "@minecraft/server";
import { showTemporaryActionBar } from "./actionbar_manager.js";

/**
 * Tạo thanh máu visual từ phần trăm máu
 * @param {number} healthPercent - Phần trăm máu (0-1)
 * @param {number} barLength - Độ dài thanh máu (mặc định 10)
 * @returns {string} - Chuỗi thanh máu với màu sắc
 */
function createHealthBar(healthPercent, barLength = 10) {
    const filledBars = Math.round(healthPercent * barLength);
    const emptyBars = barLength - filledBars;
    
    // Chọn màu dựa trên phần trăm máu
    let barColor = "§a"; // Xanh lá (> 60%)
    if (healthPercent <= 0.6 && healthPercent > 0.25) {
        barColor = "§e"; // Vàng (25% - 60%)
    } else if (healthPercent <= 0.25) {
        barColor = "§c"; // Đỏ (≤ 25%)
    }
    
    // Tạo thanh máu với ký tự ▌ hoặc █
    const filled = barColor + "█".repeat(filledBars);
    const empty = "§8█".repeat(emptyBars); // Xám đen cho phần trống
    
    return `§7[${filled}${empty}§7]`;
}

/**
 * Hàm khởi tạo để đăng ký sự kiện sát thương và hiển thị thông tin chi tiết.
 */
export function initializeDamageHandler() {
    world.afterEvents.entityHurt.subscribe((event) => {
        const { hurtEntity, damageSource, damage } = event;
        const damager = damageSource.damagingEntity;

        // Chỉ hiển thị nếu người gây sát thương là Player, không phải tự đánh mình và có sát thương
        if (damager?.typeId === "minecraft:player" && damager.id !== hurtEntity.id && damage > 0) {
            
            try {
                // Lấy component máu của thực thể
                const healthComponent = hurtEntity.getComponent("health");
                const entityName = hurtEntity.typeId.replace('minecraft:', '').replace(/_/g, ' ');
                let damageText = "";

                // Kiểm tra xem thực thể có component máu hay không
                if (healthComponent) {
                    const currentHealth = healthComponent.currentValue;
                    const maxHealth = healthComponent.effectiveMax;
                    const displayHealth = Math.max(0, currentHealth);
                    const healthPercent = displayHealth / maxHealth;
                    
                    // Tạo thanh máu visual
                    const healthBar = createHealthBar(healthPercent);
                    
                    // Chọn màu cho số máu
                    let healthColor = "§a";
                    if (healthPercent <= 0.6 && healthPercent > 0.25) {
                        healthColor = "§e";
                    } else if (healthPercent <= 0.25) {
                        healthColor = "§c";
                    }
                    
                    // Tạo chuỗi hiển thị: Damage -> Tên mob -> Thanh máu -> Số máu
                    damageText = `§c-${damage.toFixed(1)} §f⇶ §e${entityName}\n${healthBar} ${healthColor}${Math.round(displayHealth)}§7/§a${Math.round(maxHealth)}`;

                } else {
                    // Fallback: Nếu không có máu (như minecart, item frame)
                    damageText = `§c-${damage.toFixed(1)} §f⇶ §e${entityName}`;
                }

                // Hiển thị trong 2 giây (40 ticks)
                showTemporaryActionBar(damager, damageText, 40);

            } catch (error) {
                console.error(`[Damage Indicator Error] Lỗi khi xử lý sát thương cho ${hurtEntity?.typeId}: ${error}`);
            }
        }
    });
}