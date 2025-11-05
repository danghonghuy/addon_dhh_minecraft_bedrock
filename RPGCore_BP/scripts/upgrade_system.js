import { world, system, ItemStack, EnchantmentTypes } from "@minecraft/server";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";

const ENCHANT_LISTS = {
    universal: ["minecraft:unbreaking", "minecraft:mending"],
    sword: ["minecraft:sharpness", "minecraft:smite", "minecraft:bane_of_arthropods", "minecraft:fire_aspect", "minecraft:looting", "minecraft:knockback"],
    axe: ["minecraft:sharpness", "minecraft:smite", "minecraft:bane_of_arthropods", "minecraft:efficiency", "minecraft:fortune", "minecraft:silk_touch"],
    pickaxe: ["minecraft:efficiency", "minecraft:fortune", "minecraft:silk_touch"],
    bow: ["minecraft:power", "minecraft:punch", "minecraft:flame", "minecraft:infinity"],
    crossbow: ["minecraft:quick_charge", "minecraft:multishot", "minecraft:piercing"],
    trident: ["minecraft:impaling", "minecraft:loyalty", "minecraft:riptide", "minecraft:channeling"],
    mace: ["minecraft:density", "minecraft:breach", "minecraft:wind_burst"],
    helmet: ["minecraft:protection", "minecraft:fire_protection", "minecraft:blast_protection", "minecraft:projectile_protection", "minecraft:respiration", "minecraft:aqua_affinity", "minecraft:thorns"],
    chestplate: ["minecraft:protection", "minecraft:fire_protection", "minecraft:blast_protection", "minecraft:projectile_protection", "minecraft:thorns"],
    leggings: ["minecraft:protection", "minecraft:fire_protection", "minecraft:blast_protection", "minecraft:projectile_protection", "minecraft:swift_sneak", "minecraft:thorns"],
    boots: ["minecraft:protection", "minecraft:fire_protection", "minecraft:blast_protection", "minecraft:projectile_protection", "minecraft:feather_falling", "minecraft:depth_strider", "minecraft:soul_speed", "minecraft:thorns"],
    shovel: ["minecraft:efficiency", "minecraft:fortune", "minecraft:silk_touch"],
    hoe: ["minecraft:efficiency", "minecraft:fortune", "minecraft:silk_touch"]
};

const ENCHANT_MAX_LEVELS = {
    "minecraft:sharpness": 5, "minecraft:smite": 5, "minecraft:bane_of_arthropods": 5,
    "minecraft:fire_aspect": 2, "minecraft:looting": 3, "minecraft:efficiency": 5,
    "minecraft:fortune": 3, "minecraft:silk_touch": 1, "minecraft:power": 5,
    "minecraft:punch": 2, "minecraft:flame": 1, "minecraft:infinity": 1,
    "minecraft:quick_charge": 3, "minecraft:multishot": 1, "minecraft:piercing": 4,
    "minecraft:impaling": 5, "minecraft:loyalty": 3, "minecraft:riptide": 3,
    "minecraft:channeling": 1, "minecraft:density": 5, "minecraft:breach": 4,
    "minecraft:wind_burst": 3, "minecraft:protection": 4, "minecraft:fire_protection": 4,
    "minecraft:blast_protection": 4, "minecraft:projectile_protection": 4,
    "minecraft:thorns": 3, "minecraft:respiration": 3, "minecraft:aqua_affinity": 1,
    "minecraft:swift_sneak": 3, "minecraft:feather_falling": 4, "minecraft:depth_strider": 3,
    "minecraft:soul_speed": 3, "minecraft:unbreaking": 3, "minecraft:mending": 1,
    "minecraft:knockback": 2,
};

const CONFLICTING_ENCHANTS = {
    "minecraft:fortune": ["minecraft:silk_touch"], 
    "minecraft:silk_touch": ["minecraft:fortune"],
    "minecraft:riptide": ["minecraft:loyalty", "minecraft:channeling"],
    "minecraft:loyalty": ["minecraft:riptide"], 
    "minecraft:channeling": ["minecraft:riptide"],
    "minecraft:multishot": ["minecraft:piercing"], 
    "minecraft:piercing": ["minecraft:multishot"],
    "minecraft:infinity": ["minecraft:mending"], 
    "minecraft:mending": ["minecraft:infinity"],
    "minecraft:protection": ["minecraft:fire_protection", "minecraft:blast_protection", "minecraft:projectile_protection"],
    "minecraft:fire_protection": ["minecraft:protection", "minecraft:blast_protection", "minecraft:projectile_protection"],
    "minecraft:blast_protection": ["minecraft:protection", "minecraft:fire_protection", "minecraft:projectile_protection"],
    "minecraft:projectile_protection": ["minecraft:protection", "minecraft:fire_protection", "minecraft:blast_protection"],
    "minecraft:depth_strider": ["minecraft:frost_walker"], 
    "minecraft:frost_walker": ["minecraft:depth_strider"],
    "minecraft:sharpness": ["minecraft:smite", "minecraft:bane_of_arthropods"],
    "minecraft:smite": ["minecraft:sharpness", "minecraft:bane_of_arthropods"],
    "minecraft:bane_of_arthropods": ["minecraft:sharpness", "minecraft:smite"]
};

const COST_CONFIG = {
    base_nt: 50,
    nt_per_level: 25,
    low_tier: {
        gold: { base: 1, per_level: 1 },
        iron: { base: 3, per_level: 2 },
        copper: { base: 5, per_level: 4 }
    },
    high_tier: {
        diamond: { base: 1, per_level: 1 }
    }
};

function getGearUpgradeLevel(item) {
    if (!item) return 0;
    const lore = item.getLore();
    for (const line of lore) {
        const match = line.match(/§7Cấp độ cường hóa: §e\+([0-9]+)/);
        if (match) return parseInt(match[1]);
    }
    return 0;
}

function getItemTypeKeyword(item) {
    const typeId = item.typeId;
    if (typeId.includes("sword")) return "sword";
    if (typeId.includes("axe")) return "axe";
    if (typeId.includes("pickaxe")) return "pickaxe";
    if (typeId.includes("shovel")) return "shovel";
    if (typeId.includes("hoe")) return "hoe";
    if (typeId.includes("bow")) return "bow";
    if (typeId.includes("crossbow")) return "crossbow";
    if (typeId.includes("trident")) return "trident";
    if (typeId.includes("mace")) return "mace";
    if (typeId.includes("helmet")) return "helmet";
    if (typeId.includes("chestplate")) return "chestplate";
    if (typeId.includes("leggings")) return "leggings";
    if (typeId.includes("boots")) return "boots";
    return "all";
}

// Normalize enchantment ID to always include minecraft: prefix
function normalizeEnchantId(enchantId) {
    if (!enchantId.includes(":")) {
        return "minecraft:" + enchantId;
    }
    return enchantId;
}

function getEnchantmentType(enchantId) {
    try {
        const normalizedId = normalizeEnchantId(enchantId);
        const enchantType = EnchantmentTypes.get(normalizedId);
        return enchantType || null;
    } catch (e) { 
        console.warn(`Failed to get enchantment type for ${enchantId}: ${e.message}`);
        return null; 
    }
}

function checkResources(player, costs) {
    if ((player.getDynamicProperty("dhh:nguyen_thach") ?? 0) < costs.nt) return false;
    const inventory = player.getComponent("inventory")?.container;
    if (!inventory) return false;
    const itemCounts = {};
    for (const itemId in costs.cost) itemCounts[itemId] = 0;
    for (let i = 0; i < inventory.size; i++) {
        const item = inventory.getItem(i);
        if (item && itemCounts.hasOwnProperty(item.typeId)) {
            itemCounts[item.typeId] += item.amount;
        }
    }
    for (const itemId in costs.cost) {
        if (itemCounts[itemId] < costs.cost[itemId]) return false;
    }
    return true;
}

function consumeResources(player, costs) {
    const currentNT = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
    player.setDynamicProperty("dhh:nguyen_thach", currentNT - costs.nt);
    const inventory = player.getComponent("inventory")?.container;
    if (!inventory) return;
    for (const itemId in costs.cost) {
        let amountLeft = costs.cost[itemId];
        for (let i = 0; i < inventory.size && amountLeft > 0; i++) {
            const item = inventory.getItem(i);
            if (item?.typeId === itemId) {
                if (item.amount <= amountLeft) {
                    amountLeft -= item.amount;
                    inventory.setItem(i, undefined);
                } else {
                    item.amount -= amountLeft;
                    inventory.setItem(i, item);
                    amountLeft = 0;
                }
            }
        }
    }
}

function getItemTier(item) {
    const typeId = item.typeId;
    const highTierKeywords = ["diamond", "netherite", "trident", "mace"];
    if (highTierKeywords.some(keyword => typeId.includes(keyword))) {
        return "high";
    }
    return "low";
}

function getUpgradeCosts(tier, nextLevel) {
    const costs = {
        nt: COST_CONFIG.base_nt + (nextLevel - 1) * COST_CONFIG.nt_per_level,
    };

    if (tier === "high") {
        costs.diamond = COST_CONFIG.high_tier.diamond.base + (nextLevel - 1) * COST_CONFIG.high_tier.diamond.per_level;
    } else {
        costs.gold = COST_CONFIG.low_tier.gold.base + (nextLevel - 1) * COST_CONFIG.low_tier.gold.per_level;
        costs.iron = COST_CONFIG.low_tier.iron.base + (nextLevel - 1) * COST_CONFIG.low_tier.iron.per_level;
        costs.copper = COST_CONFIG.low_tier.copper.base + (nextLevel - 1) * COST_CONFIG.low_tier.copper.per_level;
    }
    return costs;
}

function hasConflicts(enchantId, existingEnchantIds) {
    const normalizedEnchantId = normalizeEnchantId(enchantId);
    const conflicts = CONFLICTING_ENCHANTS[normalizedEnchantId] || [];
    
    return conflicts.some(conflictId => {
        const normalizedConflictId = normalizeEnchantId(conflictId);
        return existingEnchantIds.has(normalizedConflictId);
    });
}

// Lấy tất cả enchantment hiện có trên item
function getCurrentEnchantments(enchantableComp) {
    const currentEnchants = new Map();
    if (enchantableComp) {
        for (const enchant of enchantableComp.getEnchantments()) {
            const normalizedId = normalizeEnchantId(enchant.type.id);
            currentEnchants.set(normalizedId, enchant.level);
        }
    }
    return currentEnchants;
}

// Thêm enchantment mới ngẫu nhiên (1-3 enchantment)
function addRandomNewEnchants(currentEnchants, itemTypeKeyword) {
    const possibleEnchants = [...(ENCHANT_LISTS.universal || []), ...(ENCHANT_LISTS[itemTypeKeyword] || [])];
    const currentEnchantIds = new Set(currentEnchants.keys());
    
    // Lọc enchantment có thể thêm (không trùng và không xung đột)
    const availableNewEnchants = possibleEnchants.filter(enchantId => {
        const normalizedId = normalizeEnchantId(enchantId);
        return !currentEnchantIds.has(normalizedId) && !hasConflicts(normalizedId, currentEnchantIds);
    });

    console.warn(`[DEBUG] Possible enchants: ${possibleEnchants.join(", ")}`);
    console.warn(`[DEBUG] Current enchants: ${Array.from(currentEnchantIds).join(", ")}`);
    console.warn(`[DEBUG] Available new enchants: ${availableNewEnchants.join(", ")}`);

    if (availableNewEnchants.length === 0) {
        console.warn(`[DEBUG] No available enchantments to add`);
        return [];
    }

    // Random số lượng enchantment mới từ 1-3
    const maxNewEnchants = Math.min(3, availableNewEnchants.length);
    const numNewEnchants = Math.floor(Math.random() * maxNewEnchants) + 1;
    
    // Shuffle và chọn
    const shuffledEnchants = [...availableNewEnchants].sort(() => Math.random() - 0.5);
    const selectedEnchants = [];
    const tempCurrentIds = new Set(currentEnchantIds);
    
    for (let i = 0; i < numNewEnchants && i < shuffledEnchants.length; i++) {
        const enchantId = shuffledEnchants[i];
        const normalizedId = normalizeEnchantId(enchantId);
        
        // Double check conflicts với những enchant đã chọn
        if (!hasConflicts(normalizedId, tempCurrentIds)) {
            selectedEnchants.push(normalizedId);
            tempCurrentIds.add(normalizedId);
            console.warn(`[DEBUG] Selected new enchant: ${normalizedId}`);
        }
    }
    
    return selectedEnchants;
}

async function attemptGearUpgrade(player, item, slot, upgradeCost) {
    const inventory = player.getComponent("inventory")?.container;
    if (!inventory) return;

    if (!checkResources(player, upgradeCost)) {
        player.sendMessage("§cBạn không đủ tài nguyên!");
        return;
    }
    consumeResources(player, upgradeCost);

    const currentLevel = getGearUpgradeLevel(item);
    const nextLevel = currentLevel + 1;
    const calculatedSuccessRate = Math.max(15, 100 - nextLevel * 8);

    if (Math.random() * 100 < calculatedSuccessRate) {
        const newItem = item.clone();
        const enchantableComp = newItem.getComponent("minecraft:enchantable");
        const itemTypeKeyword = getItemTypeKeyword(newItem);

        // Lấy tất cả enchantment hiện có
        const currentEnchants = getCurrentEnchantments(enchantableComp);
        
        let addedNewEnchants = [];
        let upgradedEnchantName = "";
        
        const isUnlockLevel = [1, 4, 7, 10, 13, 16, 19, 22, 25].includes(nextLevel);
        
        if (isUnlockLevel) {
            // CẤP MỞ KHÓA: CHỈ thêm enchantment MỚI
            addedNewEnchants = addRandomNewEnchants(currentEnchants, itemTypeKeyword);
        } else {
            // CẤP NÂNG CẤP: CHỈ nâng 1 enchantment ngẫu nhiên
            const upgradableEnchants = [];
            for (const [enchantId, currentEnchantLevel] of currentEnchants.entries()) {
                const maxLevel = ENCHANT_MAX_LEVELS[enchantId] || currentEnchantLevel;
                if (currentEnchantLevel < maxLevel) {
                    upgradableEnchants.push(enchantId);
                }
            }
            
            if (upgradableEnchants.length > 0) {
                const randomIndex = Math.floor(Math.random() * upgradableEnchants.length);
                const selectedEnchant = upgradableEnchants[randomIndex];
                const oldLevel = currentEnchants.get(selectedEnchant);
                currentEnchants.set(selectedEnchant, oldLevel + 1);
                upgradedEnchantName = selectedEnchant.replace("minecraft:", "").replace(/_/g, " ");
                console.warn(`[DEBUG] Upgraded ${selectedEnchant} from ${oldLevel} to ${oldLevel + 1}`);
            }
        }

        // Áp dụng tất cả enchantment
        if (enchantableComp) {
            enchantableComp.removeAllEnchantments();
            
            // Áp dụng enchantment cũ (đã được nâng cấp nếu cần)
            for (const [enchantId, level] of currentEnchants.entries()) {
                const enchantType = getEnchantmentType(enchantId);
                if (enchantType) {
                    try {
                        enchantableComp.addEnchantment({ type: enchantType, level });
                        console.warn(`[DEBUG] Applied existing: ${enchantId} level ${level}`);
                    } catch (e) {
                        console.warn(`[ERROR] Failed to apply existing ${enchantId} level ${level}: ${e.message}`);
                    }
                }
            }
            
            // Áp dụng enchantment mới
            for (const enchantId of addedNewEnchants) {
                const enchantType = getEnchantmentType(enchantId);
                if (enchantType) {
                    try {
                        enchantableComp.addEnchantment({ type: enchantType, level: 1 });
                        console.warn(`[DEBUG] Applied new: ${enchantId} level 1`);
                    } catch (e) {
                        console.warn(`[ERROR] Failed to apply new ${enchantId} level 1: ${e.message}`);
                    }
                }
            }
        }

        newItem.setLore([`§7Cấp độ cường hóa: §e+${nextLevel}`]);
        inventory.setItem(slot, newItem);
        
        // Thông báo thành công
        let successMessage = `§aCường hóa lên cấp §e+${nextLevel} §aThành công!`;
        
        if (addedNewEnchants.length > 0) {
            successMessage += `\n§6Mở khóa §a${addedNewEnchants.length} §6enchantment mới cấp 1!`;
        } else if (upgradedEnchantName) {
            successMessage += `\n§bNâng cấp §e${upgradedEnchantName} §blên 1 cấp!`;
        } else {
            successMessage += `\n§7Tất cả enchantment đã đạt cấp tối đa!`;
        }
        
        player.sendMessage(successMessage);
        player.playSound("random.anvil_use");

    } else {
        player.sendMessage("§cCường hóa thất bại!");
        player.playSound("random.anvil_break");
    }
}

async function showResourceSelectionScreen(player, item, slot) {
    const currentLevel = getGearUpgradeLevel(item);
    const nextLevel = currentLevel + 1;
    const itemTier = getItemTier(item);
    const costs = getUpgradeCosts(itemTier, nextLevel);
    const successRate = Math.max(15, 100 - nextLevel * 8);
    
    const isUnlockLevel = [1, 4, 7, 10, 13, 16, 19, 22, 25].includes(nextLevel);
    const unlockText = isUnlockLevel ? "\n§6⭐ Cấp này sẽ mở khóa 1-3 enchantment mới!" : "\n§b⚡ Cấp này sẽ nâng 1 enchantment ngẫu nhiên!";

    if (itemTier === 'high') {
        const form = new MessageFormData()
            .title(`§lCường Hóa Lên +${nextLevel}`)
            .body(`Bạn có chắc muốn cường hóa vật phẩm này?\n\n§fYêu cầu:\n- §b${costs.diamond} x Kim Cương\n- §e${costs.nt} x Nguyên Thạch\n\n§6Tỷ lệ thành công: §a${successRate}%${unlockText}`)
            .button1("§a§lĐể sau")
            .button2("§7Xác nhận cường hóa");

        const { selection, canceled } = await form.show(player);
        if (canceled || selection === 0) return;
        if (selection === 1) {
            const upgradeCost = { nt: costs.nt, cost: { "minecraft:diamond": costs.diamond } };
            attemptGearUpgrade(player, item, slot, upgradeCost);
        }
    } else {
        const form = new ActionFormData()
            .title(`§lChọn Nguyên Liệu Cường Hóa +${nextLevel}`)
            .body(`Chọn một loại nguyên liệu để cường hóa. Tỷ lệ thành công là §a${successRate}%\n§fYêu cầu chung: §e${costs.nt} x Nguyên Thạch${unlockText}`);

        const options = [
            { id: "minecraft:gold_ingot", amount: costs.gold, name: "Thỏi Vàng" },
            { id: "minecraft:iron_ingot", amount: costs.iron, name: "Thỏi Sắt" },
            { id: "minecraft:copper_ingot", amount: costs.copper, name: "Thỏi Đồng" }
        ];

        form.button(`§6${costs.gold} x ${options[0].name}`);
        form.button(`§7${costs.iron} x ${options[1].name}`);
        form.button(`§f${costs.copper} x ${options[2].name}`);

        const { selection, canceled } = await form.show(player);
        if (canceled || selection === undefined) return;

        const chosenOption = options[selection];
        const upgradeCost = {
            nt: costs.nt,
            cost: { [chosenOption.id]: chosenOption.amount }
        };
        attemptGearUpgrade(player, item, slot, upgradeCost);
    }
}

export async function showUpgradeSelectionMenu(player) {
    const inventory = player.getComponent("inventory")?.container;
    if (!inventory) return;

    const itemsToUpgrade = [];
    const UPGRADEABLE_TYPES = [ "dhh:cursed_blade", "sword", "axe", "pickaxe", "shovel", "hoe", "helmet", "chestplate", "leggings", "boots", "bow", "crossbow", "trident", "mace"];

    for (let i = 0; i < inventory.size; i++) {
        const item = inventory.getItem(i);
        if (item && UPGRADEABLE_TYPES.some(type => item.typeId.includes(type)) && item.hasComponent("minecraft:enchantable")) {
            itemsToUpgrade.push({ item, slot: i });
        }
    }

    if (itemsToUpgrade.length === 0) {
        player.sendMessage("§cBạn không có trang bị nào để cường hóa.");
        return;
    }

    const form = new ActionFormData()
        .title("§l§6Lò Rèn Thần Bí")
        .body("Chọn vật phẩm bạn muốn đưa vào lò rèn.");

    itemsToUpgrade.forEach(({ item }) => {
        const currentLevel = getGearUpgradeLevel(item);
        const nextLevel = currentLevel + 1;
        const isUnlockLevel = [1, 4, 7, 10, 13, 16, 19, 22, 25].includes(nextLevel);
        const unlockIndicator = isUnlockLevel ? " §6⭐" : " §b⚡";
        
        form.button(`${item.nameTag || item.typeId.replace("minecraft:", "").replace(/_/g, " ")}\n§7Cấp hiện tại: +${currentLevel}${unlockIndicator}`);
    });

    const { selection, canceled } = await form.show(player);
    if (canceled || selection === undefined) return;

    const selected = itemsToUpgrade[selection];
    showResourceSelectionScreen(player, selected.item, selected.slot);
}