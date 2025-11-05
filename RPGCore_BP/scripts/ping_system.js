// --- START OF FILE ping_system.js --- (PHIÊN BẢN NÂNG CẤP)

import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";
import { showSocialMenu } from "./main.js"; // Để quay lại menu Xã hội

const PING_DATA_KEY = "dhh:location_pings";
const MAX_PINGS = 25; // Giới hạn tối đa 25 địa điểm để tránh quá tải
const TELEPORT_COST = 50; // Chi phí Nguyên Thạch cho mỗi lần dịch chuyển

/**
 * Lấy toàn bộ dữ liệu ping từ world dynamic property.
 * @returns {Array<object>}
 */
function getAllPings() {
    const dataString = world.getDynamicProperty(PING_DATA_KEY);
    return dataString ? JSON.parse(dataString) : [];
}

/**
 * Lưu lại toàn bộ dữ liệu ping.
 * @param {Array<object>} pingsData
 */
function saveAllPings(pingsData) {
    world.setDynamicProperty(PING_DATA_KEY, JSON.stringify(pingsData));
}

/**
 * Hiển thị menu chính của hệ thống Ping.
 * @param {import("@minecraft/server").Player} player
 */
export async function showPingMainMenu(player) {
    const form = new ActionFormData();
    form.title("§e§lHỆ THỐNG PING VỊ TRÍ");
    form.body("§fĐánh dấu và chia sẻ những địa điểm quan trọng với mọi người.");

    form.button("§aTạo Ping Mới\n§8Đánh dấu vị trí hiện tại của bạn", "textures/ui/icon_map_new");
    form.button("§bXem Danh Sách Ping\n§8Xem tất cả các địa điểm đã được đánh dấu", "textures/ui/icon_book_writable");
    form.button("§0Quay Lại", "textures/ui/undo");

    const { selection, canceled } = await form.show(player);

    if (canceled) return;

    if (selection === 0) {
        await showCreatePingMenu(player);
    } else if (selection === 1) {
        await showViewPingsMenu(player);
    } else if (selection === 2) {
        await showSocialMenu(player); // Quay lại menu Xã hội
    }
}

/**
 * Hiển thị form để tạo một Ping mới.
 * @param {import("@minecraft/server").Player} player
 */
async function showCreatePingMenu(player) {
    const allPings = getAllPings();
    if (allPings.length >= MAX_PINGS) {
        player.sendMessage(`§cĐã đạt giới hạn tối đa ${MAX_PINGS} địa điểm ping!`);
        return showPingMainMenu(player);
    }

    const form = new ModalFormData();
    form.title("§a§lTẠO PING MỚI");
    form.textField("§fTiêu đề (ngắn gọn, ví dụ: 'Hầm Mỏ Kim Cương')", "Nhập tiêu đề...");
    form.textField("§fMô tả (chi tiết hơn, ví dụ: 'Đi thẳng xuống Y=-58')", "Nhập mô tả...");

    const { formValues, canceled } = await form.show(player);

    if (canceled) {
        return showPingMainMenu(player);
    }

    const [title, description] = formValues;

    if (!title || title.trim().length === 0) {
        player.sendMessage("§cTiêu đề không được để trống!");
        return showCreatePingMenu(player);
    }

    const newPing = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim() || "Không có mô tả.",
        location: {
            x: Math.floor(player.location.x),
            y: Math.floor(player.location.y),
            z: Math.floor(player.location.z),
            dimensionId: player.dimension.id
        },
        pinger: player.nameTag
    };

    allPings.push(newPing);
    saveAllPings(allPings);

    player.sendMessage(`§aĐã tạo ping thành công: §e${title}`);
    world.sendMessage(`§e[Ping] §b${player.nameTag}§f vừa đánh dấu một địa điểm mới: §a${title}`);
    player.playSound("random.orb");

    await showViewPingsMenu(player);
}

/**
 * Hiển thị danh sách tất cả các Ping đã được tạo.
 * @param {import("@minecraft/server").Player} player
 */
async function showViewPingsMenu(player) {
    const allPings = getAllPings();
    const form = new ActionFormData();
    form.title("§b§lDANH SÁCH PING");

    if (allPings.length === 0) {
        form.body("§7Chưa có địa điểm nào được ping. Hãy là người đầu tiên!");
    } else {
        form.body(`§fHiện có ${allPings.length}/${MAX_PINGS} địa điểm đã được đánh dấu.`);
        allPings.forEach(ping => {
            const dimName = ping.location.dimensionId.replace("minecraft:", "");
            form.button(`§f${ping.title}\n§8Bởi: ${ping.pinger} | Tại: ${ping.location.x}, ${ping.location.y}, ${ping.location.z} (${dimName})`);
        });
    }

    form.button("§0Quay Lại");

    const { selection, canceled } = await form.show(player);

    if (canceled) return;
    if (selection < allPings.length) {
        // --- THAY ĐỔI LỚN 1: Chuyển sang menu tùy chọn thay vì chi tiết ---
        await showPingOptionsMenu(player, allPings[selection].id);
    } else {
        await showPingMainMenu(player);
    }
}

/**
 * --- HÀM MỚI ---
 * Hiển thị các tùy chọn cho một Ping cụ thể (Dịch chuyển, Xem, Xóa).
 * @param {import("@minecraft/server").Player} player
 * @param {number} pingId
 */
async function showPingOptionsMenu(player, pingId) {
    const allPings = getAllPings();
    const ping = allPings.find(p => p.id === pingId);

    if (!ping) {
        player.sendMessage("§cPing này không còn tồn tại.");
        return showViewPingsMenu(player);
    }

    const form = new ActionFormData();
    form.title(`§fTùy chọn cho: §b${ping.title}`);

    let body = `§eNgười Ping: §f${ping.pinger}\n`;
    body += `§eVị trí: §f${ping.location.x}, ${ping.location.y}, ${ping.location.z}\n`;
    body += `§eThế giới: §f${ping.location.dimensionId.replace("minecraft:", "")}`;
    form.body(body);

    const actions = [];

    // Nút Dịch Chuyển
    form.button(`§aDịch Chuyển Tới Đây\n§8(Phí: ${TELEPORT_COST} Nguyên Thạch)`, "textures/items/ender_pearl");
    actions.push({ type: 'teleport' });

    // Nút Xem Chi Tiết
    form.button("§bXem Chi Tiết Mô Tả", "textures/items/book_writable");
    actions.push({ type: 'details' });

    // Nút Xóa (chỉ cho chủ sở hữu)
    if (player.nameTag === ping.pinger) {
        form.button("§c§lXóa Ping Này", "textures/ui/trash_default");
        actions.push({ type: 'delete' });
    }

    // Nút Quay Lại
    form.button("§0Quay Lại Danh Sách", "textures/ui/undo");
    actions.push({ type: 'back' });

    const { selection, canceled } = await form.show(player);
    if (canceled) return;

    const selectedAction = actions[selection];
    if (!selectedAction) return;

    switch (selectedAction.type) {
        case 'teleport':
            await handleTeleportToPing(player, ping);
            break;
        case 'details':
            await showPingFullDetails(player, ping.id);
            break;
        case 'delete':
            await handleDeletePing(player, ping.id);
            break;
        case 'back':
            await showViewPingsMenu(player);
            break;
    }
}

/**
 * --- HÀM MỚI ---
 * Xử lý logic dịch chuyển đến vị trí Ping.
 * @param {import("@minecraft/server").Player} player
 * @param {object} ping
 */
async function handleTeleportToPing(player, ping) {
    const currentNguyenThach = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;

    if (currentNguyenThach < TELEPORT_COST) {
        player.sendMessage(`§cKhông đủ Nguyên Thạch! Cần §d${TELEPORT_COST}§c, bạn đang có §d${currentNguyenThach}§c.`);
        player.playSound("note.bass");
        return showPingOptionsMenu(player, ping.id);
    }

    player.setDynamicProperty("dhh:nguyen_thach", currentNguyenThach - TELEPORT_COST);
    
    try {
        await player.teleport(ping.location, {
            dimension: world.getDimension(ping.location.dimensionId)
        });
        player.sendMessage(`§aDịch chuyển thành công tới §e${ping.title}§a. Đã trừ §d${TELEPORT_COST} Nguyên Thạch.`);
        player.playSound("entity.enderman.teleport");
    } catch (e) {
        player.sendMessage("§cKhông thể dịch chuyển đến địa điểm này (có thể chiều không gian không tồn tại).");
        // Hoàn lại tiền nếu dịch chuyển thất bại
        player.setDynamicProperty("dhh:nguyen_thach", currentNguyenThach);
        await showPingOptionsMenu(player, ping.id);
    }
}

/**
 * --- HÀM MỚI ---
 * Hiển thị mô tả đầy đủ của một Ping.
 * @param {import("@minecraft/server").Player} player
 * @param {number} pingId
 */
async function showPingFullDetails(player, pingId) {
    const ping = getAllPings().find(p => p.id === pingId);
    if (!ping) {
        player.sendMessage("§cPing không tồn tại.");
        return showViewPingsMenu(player);
    }

    const form = new MessageFormData();
    form.title(`§b${ping.title}`);

    let body = `§eNgười Ping: §f${ping.pinger}\n`;
    body += `§eVị trí: §f${ping.location.x}, ${ping.location.y}, ${ping.location.z}\n`;
    body += `§eThế giới: §f${ping.location.dimensionId.replace("minecraft:", "")}\n\n`;
    body += `§6§lMô tả:\n§r§f${ping.description}`;
    form.body(body);
    
    form.button1("§0Đã hiểu");
    form.button2("§0Quay lại Tùy chọn");

    const { selection } = await form.show(player);
    // Dù bấm nút nào cũng quay lại menu tùy chọn
    await showPingOptionsMenu(player, pingId);
}

/**
 * --- HÀM MỚI ---
 * Xử lý logic xóa một Ping (có xác nhận).
 * @param {import("@minecraft/server").Player} player
 * @param {number} pingId
 */
async function handleDeletePing(player, pingId) {
    const ping = getAllPings().find(p => p.id === pingId);
    if (!ping) return showViewPingsMenu(player);
    
    if (player.nameTag !== ping.pinger) {
        player.sendMessage("§cBạn không có quyền xóa ping này.");
        return showPingOptionsMenu(player, pingId);
    }

    const confirmForm = new MessageFormData();
    confirmForm.title("§4§lXÁC NHẬN XÓA");
    confirmForm.body(`Bạn có chắc chắn muốn xóa vĩnh viễn ping §e"${ping.title}"§c không?`);
    confirmForm.button1("§aKhông, giữ lại");
    confirmForm.button2("§cĐồng ý xóa");

    const { selection } = await confirmForm.show(player);

    if (selection === 1) { // Người chơi chọn "Đồng ý xóa"
        const updatedPings = getAllPings().filter(p => p.id !== pingId);
        saveAllPings(updatedPings);
        player.sendMessage(`§eĐã xóa thành công ping: §f${ping.title}`);
        player.playSound("mob.villager.no");
        await showViewPingsMenu(player); // Quay về danh sách sau khi xóa
    } else {
        await showPingOptionsMenu(player, pingId); // Quay lại menu tùy chọn nếu hủy
    }
}