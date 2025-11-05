import { world, system, ItemStack, EnchantmentType } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";
import { CONFIG } from "./config.js";
import { showStatsMenu } from "./main.js";
import { ITEM_TRANSLATIONS } from "./item_translations.js";
function formatTicksToTime(ticks) {
    if (ticks <= 0) {
        return "§cĐã kết thúc!";
    }
    const totalSeconds = Math.floor(ticks / 20);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const paddedSeconds = seconds.toString().padStart(2, '0');
    return `§e${minutes} phút ${paddedSeconds} giây`;
}

function getCurrentBanner() {
    const currentBannerId = world.getDynamicProperty("gacha:current_banner_id");
    if (!currentBannerId) return null;
    return CONFIG.BANNER_POOL.find(banner => banner.id === currentBannerId);
}

export function checkAndRotateBanner() {
    const endTime = world.getDynamicProperty("gacha:banner_end_tick") ?? 0;
    const currentId = world.getDynamicProperty("gacha:current_banner_id");
    if (!currentId || system.currentTick > endTime) {
        const bannerPool = CONFIG.BANNER_POOL;
        if (!bannerPool || bannerPool.length === 0) {
            console.warn("[dhh Gacha] BANNER_POOL trống!");
            return;
        }
        let newBanner;
        do {
            newBanner = bannerPool[Math.floor(Math.random() * bannerPool.length)];
        } while (bannerPool.length > 1 && newBanner.id === currentId);
        world.setDynamicProperty("gacha:current_banner_id", newBanner.id);
        const newEndTime = system.currentTick + (newBanner.duration_minutes * 60 * 20);
        world.setDynamicProperty("gacha:banner_end_tick", newEndTime);
        world.sendMessage(`§e[Cầu Nguyện] §fBanner sự kiện mới: ${newBanner.name}`);
    }
}

export async function showGachaMainMenu(player) {
    checkAndRotateBanner();
    const banner = getCurrentBanner();
    if (!banner) {
        player.sendMessage("§cHiện tại không có banner sự kiện nào.");
        return;
    }
    const form = new ActionFormData();
    form.title("§l§5HỆ THỐNG CẦU NGUYỆN");
    const nguyenThach = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
    const pity5 = player.getDynamicProperty("dhh:pity_5star") ?? 0;
    const isGuaranteed = player.getDynamicProperty("dhh:is_guaranteed") ?? false;
    const endTime = world.getDynamicProperty("gacha:banner_end_tick") ?? 0;
    const remainingTicks = endTime - system.currentTick;
    const formattedTime = formatTicksToTime(remainingTicks);
    let body = `§7Nguyên Thạch: §d${nguyenThach}\n`;
    body += `§7Số lần cầu nguyện (5★): §e${pity5}/${CONFIG.GACHA_CONFIG.PITY_5_STAR}\n`;
    body += `§7Bảo hiểm 5★: ${isGuaranteed ? '§a§lCÓ' : '§cKHÔNG'}\n\n`;
    body += `§7Banner hiện tại kết thúc sau:\n${formattedTime}`;
    form.body(body);
    form.button("§bCửa Hàng Đổi Nguyên Thạch\n§8Bán vật phẩm để nhận Nguyên Thạch", "textures/items/emerald");
    form.button(`§c${banner.name}\n§8Banner sự kiện giới hạn`, banner.banner_image);
    form.button("§0Quay lại Menu Chính", "textures/ui/undo");
    const { selection, canceled } = await form.show(player);
    if (canceled) return;
    if (selection === 0) showSellMenu(player);
    else if (selection === 1) showEventBannerMenu(player);
    else if (selection === 2) showStatsMenu(player);
}

// === SỬA LỖI 1: Hệ thống giá linh hoạt ===
function getItemSellPrice(item) {
    if (!item) return 0;
    const id = item.typeId;

    // Ưu tiên 1: Giá trị được định nghĩa sẵn
    if (CONFIG.SELLABLE_ITEMS[id]) {
        return CONFIG.SELLABLE_ITEMS[id];
    }
    
    // Ưu tiên 2: Bảng giá chung cho các vật phẩm mới
    const defaults = CONFIG.DEFAULT_PRICES || {};
    for (const category in defaults) {
        if (id.includes(category)) {
            return defaults[category];
        }
    }

    return 0; // Không bán được
}

async function showSellMenu(player) {
    const form = new ModalFormData();
    form.title("§l§bCỬA HÀNG NGUYÊN THẠCH");
    const inventory = player.getComponent("inventory").container;
    const playerSellableItems = new Map();

    for (let i = 0; i < inventory.size; i++) {
        const item = inventory.getItem(i);
        if (!item) continue;
        const price = getItemSellPrice(item);
        const hasEnchants = item.getComponent("enchantable")?.getEnchantments().length > 0;
        
        if (price > 0 && !item.nameTag && !hasEnchants) {
            if (playerSellableItems.has(item.typeId)) {
                playerSellableItems.get(item.typeId).amount += item.amount;
            } else {
                playerSellableItems.set(item.typeId, { amount: item.amount, price: price });
            }
        }
    }
    
    const sellableIds = Array.from(playerSellableItems.keys());
    if (sellableIds.length === 0) {
        player.sendMessage("§cBạn không có vật phẩm thô nào trong túi đồ có thể bán!");
        return showGachaMainMenu(player); // Sửa lỗi 4: Quay lại menu chính
    }

    const itemDisplayOptions = sellableIds.map(id => {
        const itemInfo = playerSellableItems.get(id); // Lấy thông tin vật phẩm
         let name = ITEM_TRANSLATIONS[id]; 

        // Nếu không tìm thấy tên tiếng Việt, quay về cách cũ để tạo tên tiếng Anh (tránh lỗi)
        if (!name) {
            name = id.replace("minecraft:", "").replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
        }
        // Thêm `(Sở hữu: ${itemInfo.amount})` vào cuối chuỗi
        return `§f${name} §e- ${itemInfo.price} NT/cái §8(Sở hữu: ${itemInfo.amount})`;
    });
    
    form.dropdown("Chọn vật phẩm bạn có để bán:", itemDisplayOptions, { defaultValueIndex: 0 });
    form.slider("Số lượng:", 1, 2304, { valueStep: 1, defaultValue: 1 }); // Tăng max
    form.toggle("§eBán tất cả?", { defaultValue: false });

    const { formValues, canceled } = await form.show(player);
    
    // === SỬA LỖI 4: Luôn quay lại menu chính sau khi xử lý ===
    if (canceled) {
        return showGachaMainMenu(player);
    }
    
    const [itemIndex, quantity, sellAll] = formValues;
    const selectedItemId = sellableIds[itemIndex];
    const itemData = playerSellableItems.get(selectedItemId);
    const totalAmountToSell = sellAll ? itemData.amount : quantity;
    
    if (itemData.amount < totalAmountToSell) {
        player.sendMessage(`§cBạn chỉ có ${itemData.amount} ${selectedItemId.replace("minecraft:","")} hợp lệ, không đủ!`);
        return showGachaMainMenu(player); // Sửa lỗi 4
    }

    let amountLeftToRemove = totalAmountToSell;
    for (let i = 0; i < inventory.size && amountLeftToRemove > 0; i++) {
        const item = inventory.getItem(i);
        if (item?.typeId === selectedItemId) {
             const hasEnchants = item.getComponent("enchantable")?.getEnchantments().length > 0;
             if (!item.nameTag && !hasEnchants) {
                if (item.amount <= amountLeftToRemove) {
                    amountLeftToRemove -= item.amount;
                    inventory.setItem(i, undefined);
                } else {
                    item.amount -= amountLeftToRemove;
                    inventory.setItem(i, item);
                    amountLeftToRemove = 0;
                }
             }
        }
    }
    
    const earned = totalAmountToSell * itemData.price;
    const currentNT = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
    player.setDynamicProperty("dhh:nguyen_thach", currentNT + earned);
    player.sendMessage(`§aBạn đã bán ${totalAmountToSell} ${selectedItemId.replace("minecraft:","")} và nhận §d${earned} Nguyên Thạch!`);
    player.playSound("random.orb");
    system.run(() => showGachaMainMenu(player)); // Sửa lỗi 4
}


async function showEventBannerMenu(player) {
    checkAndRotateBanner();
    const banner = getCurrentBanner();
    if (!banner) {
        player.sendMessage("§cKhông thể tải thông tin banner.");
        return;
    }
    const form = new ActionFormData();
    form.title(`§l${banner.name}`);
    const nguyenThach = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
    const pity5 = player.getDynamicProperty("dhh:pity_5star") ?? 0;
    const isGuaranteed = player.getDynamicProperty("dhh:is_guaranteed") ?? false;
    const endTime = world.getDynamicProperty("gacha:banner_end_tick") ?? 0;
    const remainingTicks = endTime - system.currentTick;
    const formattedTime = formatTicksToTime(remainingTicks);
    let body = `§7Kết thúc sau: ${formattedTime}\n\n`;
    body += `§7Nguyên Thạch: §d${nguyenThach}\n`;
    body += `§7Số lần cầu nguyện (5★): §e${pity5}/${CONFIG.GACHA_CONFIG.PITY_5_STAR}\n`;
    body += `§7Bảo hiểm 5★: ${isGuaranteed ? '§a§lCÓ' : '§cKHÔNG'}\n\n`;
    body += `§6Vật phẩm 5★ nổi bật:\n${banner.featured_5_star.name}`;
    form.body(body);
    form.button(`§bCầu Nguyện x1\n§8(160 Nguyên Thạch)`, "textures/ui/Friend1");
    form.button(`§dCầu Nguyện x10\n§8(1600 Nguyên Thạch)`, "textures/items/diamond");
    form.button("§0Xem chi tiết Banner", "textures/items/book_written");
    form.button("§0Quay lại", "textures/ui/undo");
    const { selection, canceled } = await form.show(player);
    if (canceled) return;
    if (selection === 0) performRoll(player, 1);
    else if (selection === 1) performRoll(player, 10);
    else if (selection === 2) showBannerDetails(player);
    else if (selection === 3) showGachaMainMenu(player);
}

async function performRoll(player, times) {
    const banner = getCurrentBanner();
    if (!banner) {
        player.sendMessage("§cBanner đã hết hạn!");
        return;
    }
    const cost = CONFIG.GACHA_CONFIG.COST_PER_ROLL * times;
    const currentNT = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
    if (currentNT < cost) {
        player.sendMessage(`§cKhông đủ Nguyên Thạch! Cần thêm §d${cost - currentNT}§c.`);
        return;
    }
    player.setDynamicProperty("dhh:nguyen_thach", currentNT - cost);
    player.sendMessage(`§7Đã sử dụng §d${cost}§7 Nguyên Thạch...`);
    player.playSound("block.portal.travel");
    let results = [];
    
    let pity5 = player.getDynamicProperty("dhh:pity_5star") ?? 0;
    let pity4 = player.getDynamicProperty("dhh:pity_4star") ?? 0;
    let isGuaranteed = player.getDynamicProperty("dhh:is_guaranteed") ?? false;

    for (let i = 0; i < times; i++) {
        pity5++; pity4++;
        let is5Star = false, is4Star = false;
        let rate5 = CONFIG.GACHA_CONFIG.RATE_5_STAR;
        if (pity5 > 73) rate5 += (pity5 - 73) * 6;
        const random = Math.random() * 100;
        if (pity5 >= CONFIG.GACHA_CONFIG.PITY_5_STAR || random < rate5) is5Star = true;
        else if (pity4 >= 10 || random < rate5 + CONFIG.GACHA_CONFIG.RATE_4_STAR) is4Star = true;
        let reward;
        if (is5Star) {
            if (isGuaranteed || Math.random() < 0.5) {
                reward = { ...banner.featured_5_star, rarity: 5 };
                isGuaranteed = false;
            } else {
                const standardPool = banner.standard_5_stars;
                reward = { ...standardPool[Math.floor(Math.random() * standardPool.length)], rarity: 5 };
                isGuaranteed = true;
            }
            pity5 = 0; pity4 = 0;
            world.sendMessage(`§e[Cầu Nguyện] §fNgười chơi §b${player.name}§f vừa nhận 5★: ${reward.name}§r§e!`);
        } else if (is4Star) {
            const pool = [...banner.featured_4_stars, ...banner.pool_4_stars];
            reward = { ...pool[Math.floor(Math.random() * pool.length)], rarity: 4 };
            pity4 = 0;
        } else {
            const pool = banner.pool_3_stars;
            reward = { ...pool[Math.floor(Math.random() * pool.length)], rarity: 3 };
        }
        results.push(reward);
    }
    
    player.setDynamicProperty("dhh:pity_5star", pity5);
    player.setDynamicProperty("dhh:pity_4star", pity4);
    player.setDynamicProperty("dhh:is_guaranteed", isGuaranteed);
    
    system.runTimeout(() => showRollResult(player, results), 40);
}

async function showRollResult(player, results) {
    const form = new MessageFormData();
    form.title("§l§eKẾT QUẢ CẦU NGUYỆN");
    results.sort((a, b) => b.rarity - a.rarity);
    let body = "§0Bạn đã nhận được:\n\n";
    results.forEach(reward => {
        body += `- ${reward.name}\n`;
        giveItemToPlayer(player, reward);
    });
    form.body(body);
    form.button1("§aTiếp tục Cầu nguyện");
    form.button2("§0Quay lại Menu chính");
    player.playSound("random.levelup");
    const response = await form.show(player);
    if (response.canceled) return;
    
    // === SỬA LỖI 2: Đảo ngược logic nút bấm ===
    if (response.selection === 1) { // Nút trái/trên ("Tiếp tục")
        showEventBannerMenu(player);
    } else { // Nút phải/dưới ("Quay lại")
        showGachaMainMenu(player);
    }
}

async function showBannerDetails(player) {
    const banner = getCurrentBanner();
    if (!banner) return;
    const form = new MessageFormData();
    form.title("§l§6CHI TIẾT BANNER");
    let body = `§l§6Vật phẩm 5★ nổi bật (50%):\n`;
    body += `§r- ${banner.featured_5_star.name}\n\n`;
    body += `§l§6Vật phẩm 5★ Tiêu chuẩn (Lệch rate 50%):\n`;
    banner.standard_5_stars.forEach(item => body += `§r- ${item.name}\n`);
    body += `\n§l§dCác vật phẩm 4★:\n`;
    [...banner.featured_4_stars, ...banner.pool_4_stars].forEach(item => body += `§r- ${item.name}\n`);
    form.body(body);
    form.button1("§0Đã hiểu");
    form.button2("§0Quay lại Banner");
    const { canceled } = await form.show(player);
    if (canceled) return;
    showEventBannerMenu(player);
}

function giveItemToPlayer(player, itemData) {
    const item = new ItemStack(itemData.id, itemData.amount ?? 1);
    item.nameTag = itemData.name;
    item.setLore(itemData.lore ?? []);
    if (itemData.enchantments) {
        const enchantComp = item.getComponent("enchantable");
        if (enchantComp) {
            for (const enchantId in itemData.enchantments) {
                try {
                    enchantComp.addEnchantment({ type: new EnchantmentType(enchantId), level: itemData.enchantments[enchantId] });
                } catch (e) {
                    console.warn(`[dhh Gacha] Enchantment ID không hợp lệ: "${enchantId}".`);
                }
            }
        }
    }
    const inventory = player.getComponent("inventory").container;
    const overflow = inventory.addItem(item);
    if (overflow) {
        player.dimension.spawnItem(overflow, player.location);
    }
}