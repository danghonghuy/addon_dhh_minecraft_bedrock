// --- START OF FILE actionbar_manager.js ---

import { world, system } from "@minecraft/server";
import { getPlayerStats } from "./main.js"; // Giả sử các hàm này ở main.js
import { xpForLevel } from "./main.js";    // Hoặc bạn có thể chuyển chúng sang file utils

const playerDisplays = new Map(); // Key: player.id, Value: { defaultText: string, tempMessages: [{text, expireTick}] }

/**
 * Lấy hoặc tạo đối tượng quản lý hiển thị cho một người chơi.
 * @param {import("@minecraft/server").Player} player
 */
function getDisplayManager(player) {
    if (!playerDisplays.has(player.id)) {
        playerDisplays.set(player.id, {
            defaultText: "",       // Nội dung mặc định (Cấp/XP/Mana)
            tempMessages: []       // Các tin nhắn tạm thời (sát thương, cooldown...)
        });
    }
    return playerDisplays.get(player.id);
}

/**
 * Hàm công khai: Hiển thị một tin nhắn tạm thời, có độ ưu tiên cao.
 * Ví dụ: Chỉ số sát thương, thông báo cooldown, nhặt vật phẩm...
 * @param {import("@minecraft/server").Player} player
 * @param {string} text Nội dung tin nhắn
 * @param {number} durationTicks Thời gian hiển thị (tính bằng tick)
 */
export function showTemporaryActionBar(player, text, durationTicks = 40) {
    const display = getDisplayManager(player);
    const expireTick = system.currentTick + durationTicks;

    // Thêm tin nhắn mới vào đầu danh sách (ưu tiên cao nhất)
    display.tempMessages.unshift({ text, expireTick });

    // Để đảm bảo phản hồi ngay lập tức, gọi update ngay
    updatePlayerActionBar(player);
}

/**
 * Cập nhật nội dung mặc định (Cấp/XP/Mana).
 * @param {import("@minecraft/server").Player} player
 */
function updateDefaultActionBar(player) {
    if (!player.isValid || (player.getDynamicProperty("dhh:class") ?? "none") === "none") {
        return;
    }
    
    try {
        const stats = getPlayerStats(player);
        const xpNeeded = xpForLevel(stats.level);
        const xpPercent = xpNeeded > 0 ? ((stats.xp / xpNeeded) * 100).toFixed(0) : 100;

        const defaultText = `§bCấp: ${stats.level} §7| §eXP: ${xpPercent}% §7| §dMP: ${Math.floor(stats.currentMana)}§0/§5${stats.maxMana.toFixed(0)}`;
        
        getDisplayManager(player).defaultText = defaultText;
    } catch (e) {
        // Có thể xảy ra lỗi khi người chơi đang tải... Bỏ qua.
    }
}

/**
 * Hàm cốt lõi: Quyết định nội dung nào sẽ được hiển thị.
 * @param {import("@minecraft/server").Player} player
 */
function updatePlayerActionBar(player) {
    const display = getDisplayManager(player);
    const now = system.currentTick;

    // Loại bỏ các tin nhắn tạm thời đã hết hạn
    display.tempMessages = display.tempMessages.filter(msg => msg.expireTick > now);

    let textToShow = "";
    if (display.tempMessages.length > 0) {
        // Luôn hiển thị tin nhắn tạm thời mới nhất (ở đầu mảng)
        textToShow = display.tempMessages[0].text;
    } else {
        // Nếu không có tin nhắn tạm, hiển thị nội dung mặc định
        textToShow = display.defaultText;
    }

    // Gửi đến màn hình người chơi
    player.onScreenDisplay.setActionBar(textToShow);
}

/**
 * Hàm khởi tạo: Bắt đầu vòng lặp quản lý toàn cục.
 */
export function initializeActionBarManager() {
    system.runInterval(() => {
        for (const player of world.getAllPlayers()) {
            // Cập nhật nội dung mặc định mỗi giây
            updateDefaultActionBar(player);
            // Quyết định và hiển thị nội dung cuối cùng
            updatePlayerActionBar(player);
        }
    }, 20); // Chạy mỗi giây

    // Dọn dẹp dữ liệu người chơi đã thoát
    world.afterEvents.playerLeave.subscribe(event => {
        playerDisplays.delete(event.player.id);
    });
}