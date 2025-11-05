// --- START OF FILE eye_engine.js --- (ĐÃ ĐỒNG BỘ THÔNG TIN NGHỀ NGHIỆP)

import { ActionFormData } from "@minecraft/server-ui";
import { world } from "@minecraft/server";
import { getPlayerStats, SKILL_TRANSLATIONS, xpForLevel } from "../main.js";
import { getPlayerGuildName } from "../guild_system.js";
import { LORE_DATABASE } from "./lore_database.js";
import { CONFIG } from "../config.js";
import { CLASS_TRANSLATIONS } from '../classes/index.js';
function formatTypeId(typeId) {
    if (!typeId) return "Không rõ";
    return typeId.split(':')[1]
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


export async function processAllSeeingEye(player) {
    const form = new ActionFormData();
    
    const entityRay = player.getEntitiesFromViewDirection({ maxDistance: 12 })[0];
    const blockRay = player.getBlockFromViewDirection({ maxDistance: 10 });
    
    if (entityRay?.entity && entityRay.entity.id !== player.id) {
        buildEntityUI(form, entityRay.entity);
    } else if (blockRay?.block) {
        buildBlockUI(form, blockRay.block);
    } else {
        buildPlayerSelfUI(form, player);
    }

    form.show(player).then(() => {
        // Có thể thêm hành động sau khi form đóng nếu cần
    });
    player.playSound("block.enchantment_table.use");
}


function buildEntityUI(form, entity) {
    if (!entity.isValid) {
        form.title("§cThực thể không hợp lệ");
        form.body("Thực thể này đã biến mất khỏi thực tại.");
        form.button("§4Đóng");
        return;
    }

    if (entity.typeId === 'minecraft:player') {
        buildPlayerTargetUI(form, entity);
        return;
    }

    const loreData = LORE_DATABASE.entities[entity.typeId];
    form.title(loreData?.displayName || entity.nameTag || formatTypeId(entity.typeId));

    let bodyText = [];

    if (loreData?.description) {
        bodyText.push(`§7§o${loreData.description}\n`);
    } else {
        bodyText.push("§7Không có thông tin đặc biệt về thực thể này.\n");
    }

    bodyText.push("§6§lThông số:");
    const health = entity.getComponent('health');
    if (health) bodyText.push(` §cHP: §f${health.currentValue.toFixed(0)} / ${health.effectiveMax}`);
    
    const movement = entity.getComponent('movement');
    if (movement) bodyText.push(` §bTốc độ: §f${movement.currentValue.toFixed(2)}`);
    
    if (entity.hasComponent('minecraft:attack')) {
        const attack = entity.getComponent('minecraft:attack');
        if (attack) bodyText.push(` §4Sát thương: §f${attack.damage}`);
    }

    if (loreData?.properties && loreData.properties.length > 0) {
        bodyText.push("\n§a§lThuộc tính:");
        loreData.properties.forEach(prop => {
            bodyText.push(` §f- ${prop.name}: §e${prop.value}`);
        });
    }
    
    const effects = entity.getEffects();
    if (effects.length > 0) {
        bodyText.push("\n§d§lHiệu ứng:");
        effects.forEach(e => bodyText.push(` §f- ${e.displayName} ${e.amplifier + 1}`));
    }
    
    if (loreData?.lore) {
        bodyText.push(`\n§5§lBí Văn:\n§7§o${loreData.lore}`);
    }
    
    form.body(bodyText.join('\n'));
    form.button("§4Đóng");
}


function buildBlockUI(form, block) {
    const loreData = LORE_DATABASE.blocks[block.typeId];
    form.title(loreData?.displayName || formatTypeId(block.typeId));
    
    let bodyText = [];
    if (loreData?.description) {
        bodyText.push(`§7§o${loreData.description}\n`);
    } else {
        bodyText.push("§7Không có thông tin đặc biệt về khối này.\n");
    }

    if (loreData?.properties && loreData.properties.length > 0) {
        bodyText.push("§a§lThuộc tính:");
        loreData.properties.forEach(p => bodyText.push(` §f- ${p.name}: §e${p.value}`));
    }

    if (loreData?.lore) {
        bodyText.push(`\n§5§lBí Văn:\n§7§o${loreData.lore}`);
    }

    form.body(bodyText.join('\n'));
    form.button("§4Đóng");
}


function buildPlayerSelfUI(form, player) {
    // Sửa đổi hàm này để dùng getPlayerStats thay vì getDynamicProperty lẻ tẻ
    const stats = getPlayerStats(player);
    const health = player.getComponent('health');

    form.title("§ePhân Tích Bản Thân");
    
    let bodyText = [];
    bodyText.push(`§l§f${player.nameTag}`);
    // === DÒNG MỚI ĐÃ SỬA ===
    bodyText.push(`§7Nghề nghiệp: §b${CLASS_TRANSLATIONS[stats.class] || 'Chưa Chọn'}`); 
    // ========================
    bodyText.push(`§bCấp: ${stats.level} §7(XP: ${stats.xp.toFixed(0)}/${xpForLevel(stats.level)})`);
    bodyText.push(`§cHP: ${health.currentValue.toFixed(0)}/${health.effectiveMax}`);
    bodyText.push(`§dMP: ${stats.currentMana.toFixed(0)}/${stats.maxMana.toFixed(0)}`);
    bodyText.push("\n§6Thuộc tính đã cộng:");
    bodyText.push(`§cVIT: ${stats.vitality} | §4STR: ${stats.strength} | §bAGI: ${stats.agility} | §dINT: ${stats.intelligence}`);

    const learnedSkills = Object.keys(stats.skills).filter(k => stats.skills[k] > 0);
    if (learnedSkills.length > 0) {
        bodyText.push("\n§aKỹ năng đã học:");
        learnedSkills.forEach(k => bodyText.push(` §f- ${SKILL_TRANSLATIONS[k] || k} [Cấp ${stats.skills[k]}]`));
    }
    
    form.body(bodyText.join('\n'));
    form.button("§4Đóng");
}

function buildPlayerTargetUI(form, targetPlayer) {
    if(!targetPlayer.isValid) {
        form.title("§cMục tiêu không hợp lệ");
        form.body("Người chơi này không còn trong tầm mắt.");
        form.button("§4Đóng");
        return;
    }

    const stats = getPlayerStats(targetPlayer);
    const health = targetPlayer.getComponent('health');
    
    form.title(`§bPhân Tích: ${targetPlayer.nameTag}`);

    let bodyText = [];
    // === DÒNG MỚI ĐÃ SỬA ===
    bodyText.push(`§7Nghề nghiệp: §b${CLASS_TRANSLATIONS[stats.class] || 'Chưa Chọn'}`);
    // ========================
    bodyText.push(`§eCấp dhh: §f${stats.level}`);
    bodyText.push(`§cHP Hiện tại: §f${health.currentValue.toFixed(0)} / ${health.effectiveMax}`);
    bodyText.push(`§aBang hội: §f${getPlayerGuildName(targetPlayer) || 'Không có'}`);

    const equippable = targetPlayer.getComponent('equippable');
    if (equippable) {
        bodyText.push("\n§7Trang bị:");
        const head = formatTypeId(equippable.getEquipment('Head')?.typeId);
        const chest = formatTypeId(equippable.getEquipment('Chest')?.typeId);
        const legs = formatTypeId(equippable.getEquipment('Legs')?.typeId);
        const feet = formatTypeId(equippable.getEquipment('Feet')?.typeId);
        const mainhand = formatTypeId(targetPlayer.getComponent('inventory').container.getItem(targetPlayer.selectedSlotIndex)?.typeId);

        bodyText.push(` §f- Mũ: §e${head || 'Không'}`);
        bodyText.push(` §f- Giáp: §e${chest || 'Không'}`);
        bodyText.push(` §f- Quần: §e${legs || 'Không'}`);
        bodyText.push(` §f- Giày: §e${feet || 'Không'}`);
        bodyText.push(` §f- Vũ khí chính: §e${mainhand || 'Không'}`);
    }

    const effects = targetPlayer.getEffects();
    if (effects.length > 0) {
        bodyText.push("\n§dHiệu ứng:");
        effects.forEach(e => {
            if (e.duration > 0 && e.isVisible) {
                const durationSeconds = Math.round(e.duration / 20);
                bodyText.push(` §f- ${e.displayName} ${e.amplifier + 1} §7(${durationSeconds}s)`);
            }
        });
    }

    form.body(bodyText.join('\n'));
    form.button("§4Đóng");
}