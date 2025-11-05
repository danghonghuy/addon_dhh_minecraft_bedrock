// --- START OF FILE daily_reward_system.js ---

import { world, system, ItemStack } from "@minecraft/server";
import { DAILY_REWARD_CONFIG } from "./config.js";

const LAST_REWARD_DAY_KEY = "dhh:last_reward_day";

/**
 * Hàm chính để cấp phát quà cho người chơi.
 * Sẽ tự kiểm tra xem người chơi có đủ điều kiện nhận quà không.
 * @param {import("@minecraft/server").Player} player
 */
export function grantDailyReward(player) {
    if (!DAILY_REWARD_CONFIG.ENABLED) return;

    try {
        const totalDays = Math.floor(world.getAbsoluteTime() / 24000);
        const playerLastClaimDay = player.getDynamicProperty("dhh:last_claim_day") ?? -1;

        // Nếu ngày trong game > ngày nhận quà cuối cùng của người chơi, họ đủ điều kiện
        if (totalDays > playerLastClaimDay) {
            // 1. Tặng Nguyên Thạch
            const currentNguyenThach = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
            player.setDynamicProperty("dhh:nguyen_thach", currentNguyenThach + DAILY_REWARD_CONFIG.FIXED_NGUYEN_THACH);

            // 2. Chọn và tặng vật phẩm ngẫu nhiên
            const pool = DAILY_REWARD_CONFIG.ITEM_POOL;
            const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
            let random = Math.random() * totalWeight;
            let chosenItemData;

            for (const itemData of pool) {
                random -= itemData.weight;
                if (random <= 0) {
                    chosenItemData = itemData;
                    break;
                }
            }
            
            let itemToGive;
            if (chosenItemData) {
                const quantity = Array.isArray(chosenItemData.quantity) 
                    ? Math.floor(Math.random() * (chosenItemData.quantity[1] - chosenItemData.quantity[0] + 1)) + chosenItemData.quantity[0] 
                    : chosenItemData.quantity;

                itemToGive = new ItemStack(chosenItemData.id, quantity);
                
                const inventory = player.getComponent("inventory").container;
                const overflow = inventory.addItem(itemToGive);
                if (overflow) {
                    player.dimension.spawnItem(overflow, player.location);
                }
            }

            // 3. Gửi thông báo
            let rewardItemName = itemToGive ? (itemToGive.nameTag ?? itemToGive.typeId.replace("minecraft:", "").replace(/_/g, " ")) : "một món quà bí ẩn";
            player.onScreenDisplay.setTitle("§a§lQuà Đăng Nhập", {
                subtitle: `§fBạn nhận được §d${DAILY_REWARD_CONFIG.FIXED_NGUYEN_THACH} Nguyên Thạch§f và §e${itemToGive.amount} ${rewardItemName}§f!`,
                fadeInDuration: 20,
                stayDuration: 100,
                fadeOutDuration: 40,
            });
            player.playSound("random.levelup", { pitch: 1.2 });

            // 4. Cập nhật ngày đã nhận quà của người chơi
            player.setDynamicProperty("dhh:last_claim_day", totalDays);
        }
    } catch (e) {
        console.warn(`[Daily Reward] Lỗi khi phát quà cho ${player.name}: ${e}`);
    }
}

/**
 * Hàm kiểm tra thời gian trong game để kích hoạt phát quà cho toàn server.
 */
function checkForRewardTime() {
    const timeOfDay = world.getTimeOfDay();
    
    // Chỉ chạy logic vào khoảng 6h sáng (time of day = 0)
    if (timeOfDay >= DAILY_REWARD_CONFIG.REWARD_TIME_OF_DAY && timeOfDay < 500) {
        const totalDays = Math.floor(world.getAbsoluteTime() / 24000);
        const lastRewardDay = world.getDynamicProperty(LAST_REWARD_DAY_KEY) ?? -1;

        if (totalDays > lastRewardDay) {
            world.setDynamicProperty(LAST_REWARD_DAY_KEY, totalDays);
            
            // Gửi thông báo chung
            world.sendMessage("§e[Hệ Thống] §aĐã đến 6 giờ sáng! Phần quà hàng ngày đang được gửi đến những người chơi online.");

            // Phát quà cho tất cả người chơi đang online
            for (const player of world.getAllPlayers()) {
                grantDailyReward(player);
            }
        }
    }
}

/**
 * Khởi tạo hệ thống quà tặng hàng ngày.
 */
export function initializeDailyRewardSystem() {
    system.runInterval(checkForRewardTime, 100); // Kiểm tra mỗi 5 giây
    console.log("§a[dhh System] Daily Reward System - §aLoaded!");
}