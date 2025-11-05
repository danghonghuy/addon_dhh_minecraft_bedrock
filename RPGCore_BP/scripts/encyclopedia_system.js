// --- START OF FILE encyclopedia_system.js ---

import { ActionFormData } from "@minecraft/server-ui";
import { ENCYCLOPEDIA_DATABASE } from "./almanac/encyclopedia_database.js";

/**
 * Hiển thị menu chính của Bách Khoa Toàn Thư.
 * @param {import("@minecraft/server").Player} player 
 */
export async function showEncyclopediaMainMenu(player) {
    const form = new ActionFormData();
    form.title("§6§lBách Khoa Toàn Thư");
    form.body("§fKiến thức là sức mạnh. Hãy chọn một chủ đề để khám phá.");

    const categories = {
        structures: "§bCấu Trúc Đặc Biệt",
        guides: "§aMẹo Sinh Tồn & Chiến Đấu",
        mechanics: "§eCơ Chế Game Quan Trọng",
         potions: "§dHướng Dẫn Pha Thuốc"
    };

    const categoryKeys = Object.keys(categories);

    categoryKeys.forEach(key => form.button(categories[key]));
    form.button("§4Đóng");

    const { selection, canceled } = await form.show(player);

    if (canceled || selection === categoryKeys.length) {
        return;
    }

    const selectedKey = categoryKeys[selection];
    showCategoryMenu(player, selectedKey, categories[selectedKey]);
}

/**
 * Hiển thị danh sách các mục trong một chuyên mục.
 * @param {import("@minecraft/server").Player} player 
 * @param {string} categoryKey Key của chuyên mục (structures, guides, ...).
 * @param {string} categoryTitle Tên hiển thị của chuyên mục.
 */
async function showCategoryMenu(player, categoryKey, categoryTitle) {
    const categoryData = ENCYCLOPEDIA_DATABASE[categoryKey];
    if (!categoryData) {
        player.sendMessage("§cChuyên mục này không tồn tại.");
        return;
    }

    const itemKeys = Object.keys(categoryData);

    const form = new ActionFormData();
    form.title(categoryTitle);
    form.body(`§fChọn một mục để xem chi tiết.`);

    itemKeys.forEach(key => form.button(categoryData[key].title));
    form.button("§0Quay lại Menu chính");

    const { selection, canceled } = await form.show(player);

    if (canceled) return;
    if (selection === itemKeys.length) {
        showEncyclopediaMainMenu(player);
        return;
    }

    const selectedItemKey = itemKeys[selection];
    showDetailMenu(player, categoryKey, selectedItemKey, categoryTitle);
}

/**
 * Hiển thị nội dung chi tiết của một mục.
 * @param {import("@minecraft/server").Player} player 
 * @param {string} categoryKey 
 * @param {string} itemKey 
 * @param {string} parentCategoryTitle 
 */
async function showDetailMenu(player, categoryKey, itemKey, parentCategoryTitle) {
    const itemData = ENCYCLOPEDIA_DATABASE[categoryKey]?.[itemKey];
    if (!itemData) {
        player.sendMessage("§cMục này không có nội dung.");
        return;
    }
    
    const form = new ActionFormData();
    form.title(itemData.title);
    form.body(itemData.content);
    form.button("§0Quay lại");

    const { canceled } = await form.show(player);
    if (canceled) {
        showCategoryMenu(player, categoryKey, parentCategoryTitle); // Cho phép quay lại ngay cả khi nhấn 'X'
        return;
    };

    showCategoryMenu(player, categoryKey, parentCategoryTitle);
}