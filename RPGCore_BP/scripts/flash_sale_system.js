// --- START OF FILE flash_sale_system.js ---

import { world, system, ItemStack, EnchantmentType } from "@minecraft/server";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";
import { CONFIG } from "./config.js";
import { showUtilitiesMenu } from "./main.js";
import { ITEM_TRANSLATIONS } from "./item_translations.js"; 

const FLASH_SALE_DATA_KEY = "dhh:flash_sale_data";
const { EVENT_INTERVAL_MINUTES, SALE_DURATION_MINUTES, ITEMS_PER_SALE, ITEM_POOL, PRICE_MODIFIER } = CONFIG.FLASH_SALE_CONFIG;

/**
 * Lấy giá gốc của một vật phẩm từ config.
 * @param {string} itemId
 * @returns {number}
 */
function getBasePrice(itemId) {
    // Tận dụng lại logic từ gacha_system.js
    return CONFIG.SELLABLE_ITEMS[itemId] || CONFIG.DEFAULT_PRICES[itemId.replace("minecraft:", "")] || 100; // Giá mặc định nếu không tìm thấy
}

/**
 * Hàm chọn vật phẩm ngẫu nhiên có trọng số từ pool.
 * @returns {Array<object>}
 */
function selectItemsForSale() {
    const selectedItems = [];
    const pool = [...ITEM_POOL];
    const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);

    for (let i = 0; i < ITEMS_PER_SALE; i++) {
        if (pool.length === 0) break;
        let random = Math.random() * totalWeight;
        
        for (let j = 0; j < pool.length; j++) {
            const item = pool[j];
            random -= item.weight;
            if (random <= 0) {
                selectedItems.push(item);
                // Xóa vật phẩm đã chọn khỏi pool để không bị trùng
                pool.splice(j, 1); 
                break;
            }
        }
    }
    return selectedItems;
}

/**
 * Bắt đầu một phiên chợ trời mới.
 */
function startFlashSale() {
    // Kiểm tra xem có phiên chợ nào đang diễn ra không
    const currentSale = world.getDynamicProperty(FLASH_SALE_DATA_KEY);
    if (currentSale) {
        const saleData = JSON.parse(currentSale);
        if (system.currentTick < saleData.endTime) {
            return; // Vẫn còn phiên chợ, không tạo mới
        }
    }

    const itemsToSellRaw = selectItemsForSale();
    if (itemsToSellRaw.length === 0) return;

const saleItems = itemsToSellRaw.map((itemConfig, index) => {
    const basePrice = getBasePrice(itemConfig.id);
    const priceModifier = Math.random() * (PRICE_MODIFIER.MAX - PRICE_MODIFIER.MIN) + PRICE_MODIFIER.MIN;
    const pricePerItem = Math.round(basePrice * priceModifier); // Tính giá cho 1 món
    
    // Random số lượng trong khoảng cho phép
    const quantity = Math.floor(Math.random() * (itemConfig.quantity[1] - itemConfig.quantity[0] + 1)) + itemConfig.quantity[0];

    // SỬA Ở ĐÂY: Lấy giá mỗi món nhân với số lượng
    const finalPrice = pricePerItem * quantity;

    return {
        slot: index,
        itemConfig: { ...itemConfig, quantity }, 
        price: finalPrice, // Bây giờ đây là TỔNG giá cho cả chồng vật phẩm
        soldTo: null
    };
    });

    const saleData = {
        items: saleItems,
        endTime: system.currentTick + (SALE_DURATION_MINUTES * 60 * 20)
    };

    world.setDynamicProperty(FLASH_SALE_DATA_KEY, JSON.stringify(saleData));
    world.sendMessage(`§e[Chợ Trời] §aMột phiên chợ chớp nhoáng vừa mở cửa! Mở menu Tiện Ích để xem!`);
    for (const player of world.getAllPlayers()) {
        player.playSound("note.pling", { pitch: 1.5 });
    }
}

/**
 * Kết thúc phiên chợ trời.
 */
function endFlashSale() {
    world.setDynamicProperty(FLASH_SALE_DATA_KEY, undefined);
    world.sendMessage("§e[Chợ Trời] §cPhiên chợ chớp nhoáng đã kết thúc!");
}

/**
 * Hàm khởi tạo, sẽ được gọi từ main.js.
 */
export function initializeFlashSaleSystem() {
    system.runInterval(() => {
        const saleDataString = world.getDynamicProperty(FLASH_SALE_DATA_KEY);
        if (saleDataString) {
            const saleData = JSON.parse(saleDataString);
            if (system.currentTick >= saleData.endTime) {
                endFlashSale();
            }
        } else {
            // Logic bắt đầu phiên chợ mới được đặt trong một interval riêng để không bị trùng lặp
        }
    }, 20); // Kiểm tra mỗi giây để đóng chợ

    system.runInterval(() => {
        startFlashSale();
    }, EVENT_INTERVAL_MINUTES * 60 * 20); // Bắt đầu phiên chợ mới sau mỗi X phút
}

/**
 * Hiển thị giao diện chợ trời cho người chơi.
 * @param {import("@minecraft/server").Player} player
 */
export async function showFlashSaleMenu(player) {
    const saleDataString = world.getDynamicProperty(FLASH_SALE_DATA_KEY);
    if (!saleDataString) {
        const form = new MessageFormData();
        form.title("§6§lCHỢ TRỜI CHỚP NHOÁNG");
        form.body("§7Chợ trời hiện đang đóng cửa.\n§eHãy chờ thông báo về phiên chợ tiếp theo!");
        form.button1("§0Đã hiểu");
        form.button2("§7Quay lại Menu");
        const { selection } = await form.show(player);
        if (selection === 1) await showUtilitiesMenu(player);
        return;
    }

    const saleData = JSON.parse(saleDataString);
    const form = new ActionFormData();
    form.title("§6§lCHỢ TRỜI CHỚP NHOÁNG");

    const remainingTicks = saleData.endTime - system.currentTick;
    const remainingSeconds = Math.max(0, Math.ceil(remainingTicks / 20));
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const nguyenThach = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;

    form.body(`§fPhiên chợ kết thúc sau: §e${timeString}\n§fNguyên Thạch của bạn: §d${nguyenThach}`);

    saleData.items.forEach(saleItem => {
        const { itemConfig, price, soldTo } = saleItem;
      const itemName = itemConfig.nameTag || ITEM_TRANSLATIONS[itemConfig.id] || itemConfig.id.replace("minecraft:", "").replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

        if (soldTo) {
            form.button(`§m§7${itemName} (x${itemConfig.quantity})\n§8Đã bán cho ${soldTo}`);
        } else {
            form.button(`§f${itemName} (x${itemConfig.quantity})\n§8Giá: §d${price} Nguyên Thạch`);
        }
    });
    form.button("§0Quay lại Menu");

    const { selection, canceled } = await form.show(player);
    if (canceled) return;

    if (selection >= saleData.items.length) {
        return showUtilitiesMenu(player);
    }

    await handlePurchase(player, selection);
}

/**
 * Xử lý khi người chơi mua một vật phẩm.
 * @param {import("@minecraft/server").Player} player
 * @param {number} itemSlot
 */
async function handlePurchase(player, itemSlot) {
    // Lấy lại dữ liệu mới nhất để tránh race condition
    const saleDataString = world.getDynamicProperty(FLASH_SALE_DATA_KEY);
    if (!saleDataString) {
        player.sendMessage("§cRất tiếc, phiên chợ vừa kết thúc!");
        return;
    }

    const saleData = JSON.parse(saleDataString);
    const selectedItem = saleData.items.find(item => item.slot === itemSlot);

    if (!selectedItem) return; // Lỗi không mong muốn

    if (selectedItem.soldTo) {
        player.sendMessage("§cVật phẩm này đã được người khác mua nhanh hơn!");
        player.playSound("note.bass");
        return showFlashSaleMenu(player);
    }

    const currentNT = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
    if (currentNT < selectedItem.price) {
        player.sendMessage(`§cBạn không đủ Nguyên Thạch! Cần §d${selectedItem.price}§c.`);
        player.playSound("note.bass");
        return showFlashSaleMenu(player);
    }
    
    // Tạo ItemStack từ config
    const itemConfig = selectedItem.itemConfig;
    const itemStack = new ItemStack(itemConfig.id, itemConfig.quantity);
    if (itemConfig.nameTag) itemStack.nameTag = itemConfig.nameTag;
if (itemConfig.enchantments) {
    const enchantable = itemStack.getComponent("minecraft:enchantable");
    if (enchantable) {
        for (const enchantId in itemConfig.enchantments) {
            try {
                // Sửa logic chính ở dòng này
                enchantable.addEnchantment({ type: new EnchantmentType(enchantId), level: itemConfig.enchantments[enchantId] });
            } catch (e) {
                // Ghi lại lỗi nếu ID enchantment không hợp lệ, thay vì làm crash game
                console.warn(`[Flash Sale] Enchantment ID không hợp lệ: "${enchantId}".`);
            }
        }
    }
}

    // Trừ tiền và trao vật phẩm
    player.setDynamicProperty("dhh:nguyen_thach", currentNT - selectedItem.price);
    const overflow = player.getComponent("inventory").container.addItem(itemStack);
    if (overflow) {
        player.dimension.spawnItem(overflow, player.location);
    }

    // Cập nhật trạng thái đã bán
    selectedItem.soldTo = player.nameTag;
    world.setDynamicProperty(FLASH_SALE_DATA_KEY, JSON.stringify(saleData));

const itemName = itemStack.nameTag || ITEM_TRANSLATIONS[itemStack.typeId] || itemStack.typeId.replace("minecraft:", "").replace(/_/g, " ");
player.sendMessage(`§aBạn đã mua thành công §e${itemName}§a!`);
    player.playSound("random.orb");

    // Mở lại menu để người chơi thấy thay đổi
    await showFlashSaleMenu(player);
}