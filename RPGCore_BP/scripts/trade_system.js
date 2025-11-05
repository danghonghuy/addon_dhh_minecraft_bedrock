// --- START OF FILE trade_system.js --- (PHIÊN BẢN SỬA LỖI TOÀN DIỆN)

import { world, system, ItemStack, BlockPermutation } from "@minecraft/server";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";
import { logError } from './main.js';

// --- CẤU HÌNH ---
const TRADE_SELECT_RANGE = 30;
const TRADE_MAX_DISTANCE = 10;
const TRADE_REQUEST_TIMEOUT_SECONDS = 30;

// --- TIỆN ÍCH VECTOR ---
const Vector = {
    magnitude(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    },
    subtract(vector1, vector2) {
        return { x: vector1.x - vector2.x, y: vector1.y - vector2.y, z: vector1.z - vector2.z };
    },
    lerp(vector1, vector2, t) {
        return { x: vector1.x + (vector2.x - vector1.x) * t, y: vector1.y + (vector2.y - vector1.y) * t, z: vector1.z + (vector2.z - vector1.z) * t };
    }
};

// --- QUẢN LÝ TRẠNG THÁI GIAO DỊCH ---
export const activeTrades = new Map();

// --- CÁC HÀM TIỆN ÍCH MỚI ---
/** Gửi tin nhắn đến cả hai người chơi trong phiên giao dịch */
function broadcastToTrade(tradeState, message) {
    const p1 = world.getPlayers({ name: tradeState.player1 })[0];
    const p2 = world.getPlayers({ name: tradeState.player2 })[0];
    if (p1?.isValid) p1.sendMessage(message);
    if (p2?.isValid) p2.sendMessage(message);
}

// ===================================================================
// === CÁC HÀM ĐÃ ĐƯỢC VIẾT LẠI HOẶC SỬA ĐỔI ==========================
// ===================================================================

export async function showTradeInviteMenu(player) {
    if (activeTrades.has(player.nameTag)) {
        player.sendMessage("§cBạn đang trong một phiên giao dịch, không thể mời người khác.");
        return;
    }
    const allPlayers = world.getAllPlayers();
    const nearbyPlayers = [];
    for (const otherPlayer of allPlayers) {
        if (otherPlayer.nameTag === player.nameTag || otherPlayer.dimension.id !== player.dimension.id) continue;
        const distance = Vector.magnitude(Vector.subtract(player.location, otherPlayer.location));
        if (distance <= TRADE_SELECT_RANGE) {
            nearbyPlayers.push(otherPlayer);
        }
    }
    if (nearbyPlayers.length === 0) {
        player.sendMessage("§cKhông có người chơi nào ở gần để giao dịch.");
        player.playSound("note.bass");
        return;
    }
    const form = new ActionFormData();
    form.title("§l§6MỜI GIAO DỊCH");
    form.body("§fChọn một người chơi để gửi lời mời giao dịch.");
    nearbyPlayers.sort((a, b) => Vector.magnitude(Vector.subtract(player.location, a.location)) - Vector.magnitude(Vector.subtract(player.location, b.location)));
    nearbyPlayers.forEach(p => {
        const distance = Math.floor(Vector.magnitude(Vector.subtract(player.location, p.location)));
        form.button(`§f${p.nameTag}\n§7Khoảng cách: ${distance}m`);
    });
    const { canceled, selection } = await form.show(player);
    if (canceled) return;
    const targetPlayer = nearbyPlayers[selection];
    await startTradeRequest(player, targetPlayer);
}

async function startTradeRequest(player1, player2) {
    if (!player2 || !player2.isValid) {
        return player1.sendMessage("§cNgười chơi này không còn online.");
    }
    const distance = Vector.magnitude(Vector.subtract(player1.location, player2.location));
    if (distance > TRADE_MAX_DISTANCE) {
        return player1.sendMessage(`§cNgười chơi §e${player2.nameTag}§c đã di chuyển ra quá xa.`);
    }
    if (activeTrades.has(player2.nameTag)) {
        return player1.sendMessage(`§c${player2.nameTag} hiện đang bận.`);
    }
    player1.sendMessage(`§eĐã gửi lời mời giao dịch tới §b${player2.nameTag}§e.`);
    const form = new MessageFormData();
    form.title("§l§6LỜI MỜI GIAO DỊCH");
    form.body(`§fNgười chơi §b${player1.nameTag}§f muốn giao dịch với bạn.`);
    // FIX 3: Sắp xếp lại nút cho đúng logic
    form.button1("§cTừ Chối"); // Trả về selection = 1
    form.button2("§aĐồng Ý"); // Trả về selection = 0
    const uiPromise = form.show(player2);
    const timeoutPromise = new Promise(resolve => system.runTimeout(() => resolve({ canceled: true }), TRADE_REQUEST_TIMEOUT_SECONDS * 20));
    const result = await Promise.race([uiPromise, timeoutPromise]);
    if (result.selection === 1) {
        beginTradeSession(player1, player2);
    } else {
        if (player1.isValid) {
            player1.sendMessage(`§c§l${player2.nameTag}§c đã từ chối hoặc không trả lời lời mời giao dịch.`);
        }
        if (player2.isValid && !result.canceled) {
            player2.sendMessage("§eBạn đã từ chối lời mời giao dịch.");
        }
    }
}

function beginTradeSession(player1, player2) {
    try {
        const p1Name = player1.nameTag;
        const p2Name = player2.nameTag;
        const centerPos = Vector.lerp(player1.location, player2.location, 0.5);
        const tradeZoneCenter = { x: Math.floor(centerPos.x), y: Math.floor(centerPos.y), z: Math.floor(centerPos.z) };
        const dimension = player1.dimension;
        const zone = {
            p1DropLoc: { x: tradeZoneCenter.x, y: tradeZoneCenter.y + 1, z: tradeZoneCenter.z - 1 },
            p2DropLoc: { x: tradeZoneCenter.x, y: tradeZoneCenter.y + 1, z: tradeZoneCenter.z + 1 },
            backup: [],
            center: tradeZoneCenter
        };
        const from = { x: tradeZoneCenter.x - 2, y: tradeZoneCenter.y, z: tradeZoneCenter.z - 3 };
        const to = { x: tradeZoneCenter.x + 2, y: tradeZoneCenter.y + 3, z: tradeZoneCenter.z + 3 };
        for (let x = from.x; x <= to.x; x++) {
            for (let y = from.y; y <= to.y; y++) {
                for (let z = from.z; z <= to.z; z++) {
                    const isWall = (x === from.x || x === to.x || y === from.y || y === to.y || z === from.z || z === to.z);
                    if (isWall) {
                        const block = dimension.getBlock({ x, y, z });
                        zone.backup.push({ location: { x, y, z }, permutation: block.permutation });
                        block.setPermutation(BlockPermutation.resolve("minecraft:barrier"));
                    }
                }
            }
        }
        dimension.getBlock(zone.p1DropLoc).setPermutation(BlockPermutation.resolve("minecraft:glass"));
        dimension.getBlock(zone.p2DropLoc).setPermutation(BlockPermutation.resolve("minecraft:glass"));
        const tradeState = {
            player1: p1Name,
            player2: p2Name,
            p1Items: [],
            p2Items: [],
            p1Confirmed: false,
            p2Confirmed: false,
            zone: zone,
            tickInterval: null
        };
        activeTrades.set(p1Name, tradeState);
        activeTrades.set(p2Name, tradeState);
        player1.teleport({ x: tradeZoneCenter.x + 0.5, y: tradeZoneCenter.y + 1, z: tradeZoneCenter.z - 2.5 }, { facingLocation: zone.p1DropLoc });
        player2.teleport({ x: tradeZoneCenter.x + 0.5, y: tradeZoneCenter.y + 1, z: tradeZoneCenter.z + 2.5 }, { facingLocation: zone.p2DropLoc });
        broadcastToTrade(tradeState, "§aGiao dịch bắt đầu! §fThả vật phẩm vào khối kính. Ngồi xuống để xác nhận.");
        tradeState.tickInterval = system.runInterval(() => tradeTick(p1Name), 5);
    } catch (e) {
        logError("beginTradeSession", player1, e);
        endTradeSession(player1.nameTag, "Lỗi hệ thống.");
    }
}

function tradeTick(tradeKey) {
    const tradeState = activeTrades.get(tradeKey);
    if (!tradeState) return;
    const player1 = world.getPlayers({ name: tradeState.player1 })[0];
    const player2 = world.getPlayers({ name: tradeState.player2 })[0];
    if (!player1 || !player2 || Vector.magnitude(Vector.subtract(player1.location, tradeState.zone.center)) > TRADE_MAX_DISTANCE + 3) {
        return endTradeSession(tradeKey, "Một người chơi đã rời khỏi khu vực giao dịch.");
    }

    const dimension = player1.dimension;
    const p1Entities = dimension.getEntities({ location: tradeState.zone.p1DropLoc, maxDistance: 1.5, type: "minecraft:item" });
    const p2Entities = dimension.getEntities({ location: tradeState.zone.p2DropLoc, maxDistance: 1.5, type: "minecraft:item" });
    let stateChanged = false;
    
    // Hàm nội bộ để xử lý vật phẩm, tránh lặp code
    const processItems = (entities, itemList, playerName) => {
        for (const itemEntity of entities) {
            const item = itemEntity.getComponent('item').itemStack;
            itemList.push(item);
            broadcastToTrade(tradeState, `§e[Giao Dịch] §b${playerName}§e đã thêm §f${item.nameTag ?? item.typeId.split(':')[1]} (x${item.amount})§e.`);
            itemEntity.kill();
            stateChanged = true;
        }
    };

    processItems(p1Entities, tradeState.p1Items, tradeState.player1);
    processItems(p2Entities, tradeState.p2Items, tradeState.player2);

    if (stateChanged) {
        tradeState.p1Confirmed = false;
        tradeState.p2Confirmed = false;
        broadcastToTrade(tradeState, "§e[Giao Dịch] §cVật phẩm đã thay đổi, tất cả xác nhận đã được hủy!");
    }
    
    // FIX 1: Luôn luôn cập nhật ActionBar để nó không bị mất
    if (player1?.isValid) updateTradeActionBar(player1, player2, tradeState);
    if (player2?.isValid) updateTradeActionBar(player2, player1, tradeState);
}

// Hàm này không đổi, vẫn dùng để hiển thị thông tin
export function updateTradeActionBar(player, otherPlayer, tradeState) {
    let p1ItemText = tradeState.p1Items.map(item => `§e- ${item.nameTag ?? item.typeId.split(':')[1]} x${item.amount}`).join('\n');
    let p2ItemText = tradeState.p2Items.map(item => `§e- ${item.nameTag ?? item.typeId.split(':')[1]} x${item.amount}`).join('\n');
    if (!p1ItemText) p1ItemText = "§7(Trống)";
    if (!p2ItemText) p2ItemText = "§7(Trống)";
    const myItems = player.nameTag === tradeState.player1 ? p1ItemText : p2ItemText;
    const theirItems = player.nameTag === tradeState.player1 ? p2ItemText : p1ItemText;
    const myConfirmStatus = player.nameTag === tradeState.player1 ? (tradeState.p1Confirmed ? "§a§lĐÃ XÁC NHẬN" : "§cChưa xác nhận") : (tradeState.p2Confirmed ? "§a§lĐÃ XÁC NHẬN" : "§cChưa xác nhận");
    const theirConfirmStatus = player.nameTag === tradeState.player1 ? (tradeState.p2Confirmed ? "§a§lĐÃ XÁC NHẬN" : "§cChưa xác nhận") : (tradeState.p1Confirmed ? "§a§lĐÃ XÁC NHẬN" : "§cChưa xác nhận");
    let actionBar = `§bVật phẩm của bạn: ${myConfirmStatus}\n${myItems}\n`;
    actionBar += `§6Vật phẩm của ${otherPlayer.nameTag}: ${theirConfirmStatus}\n${theirItems}\n`;
    actionBar += `§fNgồi xuống (Sneak) để Xác nhận/Hủy bỏ.`;
    player.onScreenDisplay.setActionBar(actionBar);
}

export function endTradeSession(tradeKey, reason) {
    const tradeState = activeTrades.get(tradeKey);
    if (!tradeState) return;
    system.clearRun(tradeState.tickInterval);
    const player1 = world.getPlayers({ name: tradeState.player1 })[0];
    const player2 = world.getPlayers({ name: tradeState.player2 })[0];
    const dimension = player1?.dimension ?? player2?.dimension ?? world.getDimension("overworld");

    if (reason) { // Chỉ trả lại đồ khi giao dịch bị HỦY
        broadcastToTrade(tradeState, `§cGiao dịch đã bị hủy! §7(${reason})`);
        if (player1?.isValid) {
            tradeState.p1Items.forEach(item => dimension.spawnItem(item, player1.location));
        }
        if (player2?.isValid) {
            tradeState.p2Items.forEach(item => dimension.spawnItem(item, player2.location));
        }
    }

    if (player1?.isValid) player1.onScreenDisplay.setActionBar("");
    if (player2?.isValid) player2.onScreenDisplay.setActionBar("");

    for (const backup of tradeState.zone.backup) {
        try { dimension.getBlock(backup.location).setPermutation(backup.permutation); } catch (e) { }
    }
    activeTrades.delete(tradeState.player1);
    activeTrades.delete(tradeState.player2);
}

export function handleTradeConfirmation(player) {
    const tradeState = activeTrades.get(player.nameTag);
    if (!tradeState) return;
    const isPlayer1 = player.nameTag === tradeState.player1;
    let newStatus;
    if (isPlayer1) {
        tradeState.p1Confirmed = !tradeState.p1Confirmed;
        newStatus = tradeState.p1Confirmed;
    } else {
        tradeState.p2Confirmed = !tradeState.p2Confirmed;
        newStatus = tradeState.p2Confirmed;
    }
    
    // FIX 1: Thêm thông báo chat
    if (newStatus) {
        broadcastToTrade(tradeState, `§e[Giao Dịch] §b${player.nameTag}§a đã khóa giao dịch.`);
    } else {
        broadcastToTrade(tradeState, `§e[Giao Dịch] §b${player.nameTag}§c đã hủy khóa.`);
    }

    if (tradeState.p1Confirmed && tradeState.p2Confirmed) {
        finishTrade(player.nameTag);
    }
}

function finishTrade(tradeKey) {
    const tradeState = activeTrades.get(tradeKey);
    if (!tradeState) return;
    const player1 = world.getPlayers({ name: tradeState.player1 })[0];
    const player2 = world.getPlayers({ name: tradeState.player2 })[0];
    
    // FIX 2: Sửa lỗi nhân bản vật phẩm
    if (player1?.isValid && player2?.isValid) {
        broadcastToTrade(tradeState, "§a§lGiao dịch thành công!");

        const p1Inv = player1.getComponent('inventory').container;
        const p2Inv = player2.getComponent('inventory').container;

        // Player 1 nhận đồ của Player 2
        tradeState.p2Items.forEach(item => {
            const leftover = p1Inv.addItem(item);
            if (leftover) player1.dimension.spawnItem(leftover, player1.location);
        });

        // Player 2 nhận đồ của Player 1
        tradeState.p1Items.forEach(item => {
            const leftover = p2Inv.addItem(item);
            if (leftover) player2.dimension.spawnItem(leftover, player2.location);
        });

        player1.playSound("random.orb");
        player2.playSound("random.orb");

    } else {
        // Nếu một trong hai người chơi thoát ra đúng lúc này, hủy giao dịch
        logError("finishTrade", null, new Error("Một người chơi không hợp lệ khi hoàn tất giao dịch."));
        tradeState.player1 = player1?.nameTag; // Cập nhật lại để endTradeSession có thể trả đồ
        tradeState.player2 = player2?.nameTag;
        return endTradeSession(tradeKey, "Một người chơi đã thoát.");
    }

    endTradeSession(tradeKey, null); // Dọn dẹp mà không gửi tin nhắn hủy và không trả đồ
}