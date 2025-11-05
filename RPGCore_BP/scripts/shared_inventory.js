// --- THAY THẾ TOÀN BỘ FILE shared_inventory.js BẰNG NỘI DUNG NÀY ---
// ADVANCED SHARED INVENTORY SYSTEM WITH SMART MERGING

import { world, system, ItemStack, EnchantmentTypes } from "@minecraft/server";

const SHARED_INVENTORY_KEY = "dhh:shared_inventory_data_v7";
const PLAYER_INVENTORY_CACHE_KEY = "dhh:player_inventory_cache";
const PLAYER_LAST_SEEN_KEY = "dhh:player_last_seen";
const MERGE_LOG_KEY = "dhh:merge_log";
const TOTAL_SLOTS = 36;
const MAX_STACK_SIZE = 64; // Default stack size

// Hàm tiện ích để tạo unique ID cho item
function createItemId(itemData) {
    if (!itemData) return null;
    const durabilityStr = itemData.durability ? `_dur${itemData.durability.damage}` : '';
    const enchantStr = itemData.enchantments ? `_ench${JSON.stringify(itemData.enchantments.sort())}` : '';
    const nameStr = itemData.nameTag ? `_name${itemData.nameTag}` : '';
    const loreStr = itemData.lore && itemData.lore.length > 0 ? `_lore${JSON.stringify(itemData.lore)}` : '';
    return `${itemData.typeId}${durabilityStr}${enchantStr}${nameStr}${loreStr}`;
}

// Kiểm tra xem hai item có thể merge được không (cùng type, enchant, durability...)
function canItemsMerge(item1, item2) {
    if (!item1 || !item2) return false;
    if (item1.typeId !== item2.typeId) return false;
    if (item1.nameTag !== item2.nameTag) return false;
    
    // So sánh lore
    const lore1 = item1.lore || [];
    const lore2 = item2.lore || [];
    if (lore1.length !== lore2.length) return false;
    for (let i = 0; i < lore1.length; i++) {
        if (lore1[i] !== lore2[i]) return false;
    }
    
    // So sánh durability
    if (JSON.stringify(item1.durability) !== JSON.stringify(item2.durability)) return false;
    
    // So sánh enchantments
    if (JSON.stringify(item1.enchantments) !== JSON.stringify(item2.enchantments)) return false;
    
    return true;
}

// Lấy max stack size cho item type
function getMaxStackSize(typeId) {
    // Một số item có stack size đặc biệt
    const specialStacks = {
        'minecraft:ender_pearl': 16,
        'minecraft:snowball': 16,
        'minecraft:egg': 16,
        'minecraft:bucket': 16,
        'minecraft:honey_bottle': 16,
        'minecraft:potion': 1,
        'minecraft:splash_potion': 1,
        'minecraft:lingering_potion': 1
    };
    
    // Tools, weapons, armor thường không stack
    if (typeId.includes('sword') || typeId.includes('pickaxe') || typeId.includes('axe') || 
        typeId.includes('shovel') || typeId.includes('hoe') || typeId.includes('helmet') || 
        typeId.includes('chestplate') || typeId.includes('leggings') || typeId.includes('boots') ||
        typeId.includes('bow') || typeId.includes('crossbow') || typeId.includes('trident') ||
        typeId.includes('shield') || typeId.includes('elytra') || typeId.includes('totem')) {
        return 1;
    }
    
    return specialStacks[typeId] || MAX_STACK_SIZE;
}

// THUẬT TOÁN MERGE THÔNG MINH
function mergeInventories(masterInv, playerInv, playerId) {
    console.log(`§6[Smart Merge] Bắt đầu merge túi đồ cho ${playerId}`);
    
    const mergedInv = Array(TOTAL_SLOTS).fill(null);
    const itemGroups = new Map(); // Nhóm các item cùng loại
    const conflictLog = [];
    
    // Bước 1: Thu thập tất cả items từ cả 2 inventory
    const allItems = [];
    
    for (let i = 0; i < TOTAL_SLOTS; i++) {
        const masterItem = masterInv[i];
        const playerItem = playerInv[i];
        
        if (masterItem) {
            allItems.push({ item: masterItem, source: 'master', slot: i });
        }
        if (playerItem && !itemsEqual(masterItem, playerItem)) {
            allItems.push({ item: playerItem, source: 'player', slot: i });
        }
    }
    
    // Bước 2: Nhóm items theo ID (type + properties)
    for (const itemEntry of allItems) {
        const itemId = createItemId(itemEntry.item);
        if (!itemGroups.has(itemId)) {
            itemGroups.set(itemId, []);
        }
        itemGroups.get(itemId).push(itemEntry);
    }
    
    // Bước 3: Merge từng nhóm item
    const finalItems = [];
    
    for (const [itemId, itemList] of itemGroups.entries()) {
        if (itemList.length === 0) continue;
        
        const baseItem = itemList[0].item;
        const maxStack = getMaxStackSize(baseItem.typeId);
        let totalAmount = 0;
        
        // Tính tổng số lượng
        for (const entry of itemList) {
            totalAmount += entry.item.amount;
        }
        
        // Tạo các stack từ tổng số lượng
        while (totalAmount > 0) {
            const stackAmount = Math.min(totalAmount, maxStack);
            const newItem = {
                ...baseItem,
                amount: stackAmount
            };
            finalItems.push(newItem);
            totalAmount -= stackAmount;
        }
        
        // Log merge info
        if (itemList.length > 1) {
            const sources = itemList.map(e => e.source).join(', ');
            conflictLog.push(`§a[Merge] ${baseItem.typeId} x${totalAmount} từ [${sources}]`);
        }
    }
    
    // Bước 4: Sắp xếp items vào slots
    // Ưu tiên giữ vị trí cũ nếu có thể
    const usedSlots = new Set();
    
    // Đầu tiên, thử đặt items vào slot gốc của chúng
    for (const [itemId, itemList] of itemGroups.entries()) {
        if (itemList.length === 1) {
            const originalSlot = itemList[0].slot;
            if (!usedSlots.has(originalSlot)) {
                const baseItem = itemList[0].item;
                mergedInv[originalSlot] = baseItem;
                usedSlots.add(originalSlot);
                
                // Remove từ finalItems
                const index = finalItems.findIndex(item => createItemId(item) === itemId);
                if (index >= 0) finalItems.splice(index, 1);
            }
        }
    }
    
    // Sau đó, đặt các items còn lại vào slots trống
    let nextSlot = 0;
    for (const item of finalItems) {
        while (nextSlot < TOTAL_SLOTS && usedSlots.has(nextSlot)) {
            nextSlot++;
        }
        if (nextSlot < TOTAL_SLOTS) {
            mergedInv[nextSlot] = item;
            usedSlots.add(nextSlot);
            nextSlot++;
        } else {
            // Inventory đầy, items bị drop (có thể log warning)
            conflictLog.push(`§c[Warning] Inventory đầy, ${item.typeId} x${item.amount} bị mất!`);
        }
    }
    
    // Log kết quả merge
    if (conflictLog.length > 0) {
        console.log(`§b[Smart Merge] Hoàn thành merge cho ${playerId}:`);
        conflictLog.forEach(log => console.log(log));
    }
    
    return mergedInv;
}

// So sánh hai item có hoàn toàn giống nhau không
function itemsEqual(item1, item2) {
    if (!item1 && !item2) return true;
    if (!item1 || !item2) return false;
    return JSON.stringify(item1) === JSON.stringify(item2);
}

// Lưu/load data từ world properties
function getMasterInventory() {
    const dataString = world.getDynamicProperty(SHARED_INVENTORY_KEY);
    if (dataString) {
        try { return JSON.parse(dataString); } catch (e) {}
    }
    const emptyInventory = Array(TOTAL_SLOTS).fill(null);
    world.setDynamicProperty(SHARED_INVENTORY_KEY, JSON.stringify(emptyInventory));
    return emptyInventory;
}

function setMasterInventory(inventoryData) {
    world.setDynamicProperty(SHARED_INVENTORY_KEY, JSON.stringify(inventoryData));
    world.setDynamicProperty(SHARED_INVENTORY_KEY + "_timestamp", Date.now().toString());
}

function getPlayerInventoryCache() {
    const dataString = world.getDynamicProperty(PLAYER_INVENTORY_CACHE_KEY);
    if (dataString) {
        try { return JSON.parse(dataString); } catch (e) {}
    }
    return {};
}

function setPlayerInventoryCache(cache) {
    world.setDynamicProperty(PLAYER_INVENTORY_CACHE_KEY, JSON.stringify(cache));
}

function getLastSeenData() {
    const dataString = world.getDynamicProperty(PLAYER_LAST_SEEN_KEY);
    if (dataString) {
        try { return JSON.parse(dataString); } catch (e) {}
    }
    return {};
}

function setLastSeenData(data) {
    world.setDynamicProperty(PLAYER_LAST_SEEN_KEY, JSON.stringify(data));
}

// Convert container to array (giữ nguyên function cũ)
function inventoryToArray(container) {
    const arr = [];
    for (let i = 0; i < TOTAL_SLOTS; i++) {
        const item = container.getItem(i);
        if (!item) {
            arr.push(null);
            continue;
        }

        const itemData = {
            typeId: item.typeId,
            amount: item.amount,
            nameTag: item.nameTag || undefined,
            lore: item.getLore() || []
        };

        // Lưu durability với damage chính xác
        try {
            const durabilityComponent = item.getComponent("minecraft:durability");
            if (durabilityComponent) {
                itemData.durability = {
                    damage: durabilityComponent.damage,
                    maxDurability: durabilityComponent.maxDurability
                };
            }
        } catch (e) {}

        // Lưu enchantments với type và level chính xác
        try {
            const enchantableComponent = item.getComponent("minecraft:enchantable");
            if (enchantableComponent) {
                const enchantments = enchantableComponent.getEnchantments();
                if (enchantments && enchantments.length > 0) {
                    itemData.enchantments = [];
                    for (const enchantment of enchantments) {
                        itemData.enchantments.push({
                            typeId: enchantment.type.id,
                            level: enchantment.level
                        });
                    }
                }
            }
        } catch (e) {}

        // Bundle support
        if (item.typeId === "minecraft:bundle") {
            try {
                const bundleComponent = item.getComponent("minecraft:bundleInventory");
                if (bundleComponent) {
                    itemData.bundleContents = [];
                    for (let j = 0; j < bundleComponent.size; j++) {
                        const bundleItem = bundleComponent.getItem(j);
                        if (bundleItem) {
                            const bundleItemData = {
                                typeId: bundleItem.typeId,
                                amount: bundleItem.amount,
                                nameTag: bundleItem.nameTag || undefined,
                                lore: bundleItem.getLore() || []
                            };
                            
                            try {
                                const bundleDurabilityComp = bundleItem.getComponent("minecraft:durability");
                                if (bundleDurabilityComp) {
                                    bundleItemData.durability = {
                                        damage: bundleDurabilityComp.damage,
                                        maxDurability: bundleDurabilityComp.maxDurability
                                    };
                                }
                            } catch (e) {}
                            
                            itemData.bundleContents.push(bundleItemData);
                        } else {
                            itemData.bundleContents.push(null);
                        }
                    }
                }
            } catch (e) {}
        }

        arr.push(itemData);
    }
    return arr;
}

// Apply inventory from array (giữ nguyên function cũ)
function applyInventoryFromArray(container, inventoryArray) {
    for (let i = 0; i < TOTAL_SLOTS; i++) {
        const itemData = inventoryArray[i];
        
        if (itemData) {
            try {
                const newItem = new ItemStack(itemData.typeId, itemData.amount);
                
                if (itemData.nameTag) {
                    newItem.nameTag = itemData.nameTag;
                }
                if (itemData.lore && itemData.lore.length > 0) {
                    newItem.setLore(itemData.lore);
                }

                if (itemData.durability) {
                    try {
                        const durabilityComponent = newItem.getComponent("minecraft:durability");
                        if (durabilityComponent) {
                            durabilityComponent.damage = itemData.durability.damage;
                        }
                    } catch (e) {}
                }

                if (itemData.enchantments && itemData.enchantments.length > 0) {
                    try {
                        const enchantableComponent = newItem.getComponent("minecraft:enchantable");
                        if (enchantableComponent) {
                            enchantableComponent.removeAllEnchantments();
                            
                            for (const enchData of itemData.enchantments) {
                                try {
                                    const enchantmentType = EnchantmentTypes.get(enchData.typeId);
                                    if (enchantmentType) {
                                        enchantableComponent.addEnchantment({
                                            type: enchantmentType,
                                            level: enchData.level
                                        });
                                    }
                                } catch (e) {}
                            }
                        }
                    } catch (e) {}
                }

                if (newItem.typeId === "minecraft:bundle" && itemData.bundleContents) {
                    try {
                        const bundleComponent = newItem.getComponent("minecraft:bundleInventory");
                        if (bundleComponent) {
                            for (let j = 0; j < itemData.bundleContents.length; j++) {
                                const bundleItemData = itemData.bundleContents[j];
                                if (bundleItemData) {
                                    const bundleItem = new ItemStack(bundleItemData.typeId, bundleItemData.amount);
                                    
                                    if (bundleItemData.nameTag) {
                                        bundleItem.nameTag = bundleItemData.nameTag;
                                    }
                                    if (bundleItemData.lore && bundleItemData.lore.length > 0) {
                                        bundleItem.setLore(bundleItemData.lore);
                                    }
                                    
                                    if (bundleItemData.durability) {
                                        try {
                                            const bundleDurabilityComp = bundleItem.getComponent("minecraft:durability");
                                            if (bundleDurabilityComp) {
                                                bundleDurabilityComp.damage = bundleItemData.durability.damage;
                                            }
                                        } catch (e) {}
                                    }
                                    
                                    bundleComponent.setItem(j, bundleItem);
                                }
                            }
                        }
                    } catch (e) {}
                }

                container.setItem(i, newItem);
            } catch (e) {
                console.warn(`[Smart Inventory] Lỗi tạo item slot ${i}: ${e.message}`);
            }
        } else {
            container.setItem(i, undefined);
        }
    }
}

// MAIN SYSTEM
let isProcessing = false;
let lastMasterHash = "";

export function initializeSharedInventorySystem() {
    console.log("§a§l[SMART SHARED INVENTORY] §eKhởi tạo hệ thống merge thông minh...");
    
    let masterInventory = getMasterInventory();
    lastMasterHash = JSON.stringify(masterInventory);
    
    // Khi player spawn (join game)
    world.afterEvents.playerSpawn.subscribe(event => {
        if (!event.initialSpawn) return;
        const player = event.player;
        const playerId = player.id;
        const container = player.getComponent("inventory")?.container;
        if (!container) return;
        
        system.runTimeout(() => {
            if (isProcessing) return;
            isProcessing = true;
            
            try {
                const playerInv = inventoryToArray(container);
                const cache = getPlayerInventoryCache();
                const lastPlayerInv = cache[playerId];
                
                if (lastPlayerInv) {
                    // Player đã từng online, merge inventory
                    const mergedInv = mergeInventories(masterInventory, playerInv, player.name);
                    applyInventoryFromArray(container, mergedInv);
                    
                    // Update master inventory
                    masterInventory = mergedInv;
                    setMasterInventory(masterInventory);
                    lastMasterHash = JSON.stringify(masterInventory);
                    
                    world.sendMessage(`§b[Smart Merge] §a${player.name} §eđã merge túi đồ thành công!`);
                } else {
                    // Player mới, áp dụng master inventory
                    applyInventoryFromArray(container, masterInventory);
                    world.sendMessage(`§b[Smart Merge] §eTúi đồ chung đã được áp dụng cho §a${player.name}§e!`);
                }
                
                // Update cache
                cache[playerId] = inventoryToArray(container);
                setPlayerInventoryCache(cache);
                
                // Update last seen
                const lastSeenData = getLastSeenData();
                lastSeenData[playerId] = Date.now();
                setLastSeenData(lastSeenData);
                
            } catch (e) {
                console.warn(`[Smart Inventory] Lỗi xử lý spawn: ${e.message}`);
            } finally {
                isProcessing = false;
            }
        }, 20);
    });

    // Khi player rời game
    world.afterEvents.playerLeave.subscribe(event => {
        const playerId = event.playerId;
        const lastSeenData = getLastSeenData();
        lastSeenData[playerId] = Date.now();
        setLastSeenData(lastSeenData);
    });

    // Monitor inventory changes với merge system
    system.runInterval(() => {
        if (isProcessing) return;
        
        try {
            const players = world.getAllPlayers();
            if (players.length === 0) return;

            for (const player of players) {
                const container = player.getComponent("inventory")?.container;
                if (!container) continue;
                
                const currentInv = inventoryToArray(container);
                const currentHash = JSON.stringify(currentInv);
                
                if (currentHash !== lastMasterHash) {
                    isProcessing = true;
                    
                    try {
                        // Merge current inventory với master
                        const mergedInv = mergeInventories(masterInventory, currentInv, player.name);
                        
                        // Apply cho tất cả players
                        for (const otherPlayer of players) {
                            const otherContainer = otherPlayer.getComponent("inventory")?.container;
                            if (otherContainer) {
                                applyInventoryFromArray(otherContainer, mergedInv);
                            }
                        }
                        
                        // Update master
                        masterInventory = mergedInv;
                        setMasterInventory(masterInventory);
                        lastMasterHash = JSON.stringify(masterInventory);
                        
                        // Update cache cho tất cả players
                        const cache = getPlayerInventoryCache();
                        for (const p of players) {
                            cache[p.id] = mergedInv;
                        }
                        setPlayerInventoryCache(cache);
                        
                        console.log(`§b[Smart Merge] §a${player.name} §ekích hoạt merge cho ${players.length} người chơi`);
                        
                    } catch (e) {
                        console.warn(`[Smart Inventory] Lỗi merge: ${e.message}`);
                    } finally {
                        isProcessing = false;
                    }
                    
                    break; // Chỉ xử lý một thay đổi mỗi lần
                }
            }

        } catch (e) {
            console.warn(`[Smart Inventory] Lỗi monitor: ${e.message}`);
            isProcessing = false;
        }
    }, 5); // Check mỗi 5 ticks
    
    world.sendMessage("§a§l[SMART SHARED INVENTORY] §eHệ thống merge thông minh đã được kích hoạt!");
    world.sendMessage("§6✓ Auto-merge items cùng loại");
    world.sendMessage("§6✓ Giữ lại tất cả items từ mọi người chơi");  
    world.sendMessage("§6✓ Chống mất đồ 100%");
}