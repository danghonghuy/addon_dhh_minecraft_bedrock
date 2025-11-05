import { world, BlockPermutation } from "@minecraft/server";
import { Vector } from "./vector.js";

// === DỮ LIỆU CỐT LÕI ===
const LINK_DATA_KEY = "dhh:spatial_links"; // Nơi lưu trữ tất cả các cổng
const PENDING_GATE_PROP = "dhh:pending_gate_id"; // Lưu ID cổng đang chờ kết nối
const MAX_PAIRS_PER_PLAYER = 3;
const GATE_BLOCK_TYPE = "minecraft:crying_obsidian"; // Block để xây cổng

// === CÁC HÀM QUẢN LÝ DỮ LIỆU ===

export function getAllLinksData() {
    const dataString = world.getDynamicProperty(LINK_DATA_KEY);
    return dataString ? JSON.parse(dataString) : {};
}

function saveAllLinksData(data) {
    world.setDynamicProperty(LINK_DATA_KEY, JSON.stringify(data));
}

// === CÁC HÀM XÂY DỰNG & PHÁ HỦY ===

/**
 * Xây dựng một cấu trúc cổng tại vị trí chỉ định.
 * @param {import("@minecraft/server").Dimension} dimension
 * @param {{x: number, y: number, z: number}} location
 */
function buildGate(dimension, location) {
    const gatePermutation = BlockPermutation.resolve(GATE_BLOCK_TYPE);
    const center = { x: Math.floor(location.x), y: Math.floor(location.y), z: Math.floor(location.z) };

    const gateShape = [
        { x: -1, y: 0, z: 0 }, { x: 1, y: 0, z: 0 },
        { x: -1, y: 1, z: 0 }, { x: 1, y: 1, z: 0 },
        { x: -1, y: 2, z: 0 }, { x: 1, y: 2, z: 0 },
        { x: 0, y: 2, z: 0 }
    ];

    gateShape.forEach(offset => {
        const blockLoc = { x: center.x + offset.x, y: center.y + offset.y, z: center.z + offset.z };
        dimension.getBlock(blockLoc).setPermutation(gatePermutation);
    });

    // Hiệu ứng hạt
    for (let i = 0; i < 20; i++) {
        const particleLoc = {
            x: center.x + (Math.random() - 0.5) * 3,
            y: center.y + 1 + (Math.random() - 0.5) * 2,
            z: center.z + (Math.random() - 0.5) * 3,
        };
        dimension.spawnParticle("minecraft:enderman_teleport_particle", particleLoc);
    }
    dimension.playSound("entity.enderman.teleport", center);
}

/**
 * Phá hủy một cặp cổng dựa trên linkId.
 * @param {string} linkId ID của cặp cổng cần phá.
 */
export function destroyLink(linkId) {
    const allLinks = getAllLinksData();
    let linkOwner = null;
    let linkIndex = -1;

    // Tìm chủ sở hữu và vị trí của link trong mảng
    for (const owner in allLinks) {
        const index = allLinks[owner].findIndex(link => link.id === linkId);
        if (index !== -1) {
            linkOwner = owner;
            linkIndex = index;
            break;
        }
    }

    if (!linkOwner) return;

    const link = allLinks[linkOwner][linkIndex];
    const air = BlockPermutation.resolve("minecraft:air");

    // Phá hủy cổng A
    if (link.gateA) {
        const dimA = world.getDimension(link.gateA.dimensionId);
        buildGate(dimA, link.gateA.location).getBlocks().forEach(b => b.setPermutation(air));
        dimA.playSound("entity.shulker.close", link.gateA.location);
    }

    // Phá hủy cổng B
    if (link.gateB) {
        const dimB = world.getDimension(link.gateB.dimensionId);
        buildGate(dimB, link.gateB.location).getBlocks().forEach(b => b.setPermutation(air));
        dimB.playSound("entity.shulker.close", link.gateB.location);
    }

    // Xóa link khỏi dữ liệu
    allLinks[linkOwner].splice(linkIndex, 1);
    saveAllLinksData(allLinks);
}


// === HÀM KÍCH HOẠT CHÍNH ===

export function activateSpatialLink(player, stats) {
    try {
        const pendingLinkId = player.getDynamicProperty(PENDING_GATE_PROP);

        // --- GIAI ĐOẠN 2: ĐẶT CỔNG B VÀ HOÀN THÀNH LIÊN KẾT ---
        if (pendingLinkId) {
            const allLinks = getAllLinksData();
            const playerLinks = allLinks[player.nameTag] || [];
            const link = playerLinks.find(l => l.id === pendingLinkId);

            if (!link) {
                player.sendMessage("§cĐã xảy ra lỗi, không tìm thấy cổng đang chờ. Vui lòng thử lại.");
                player.setDynamicProperty(PENDING_GATE_PROP, undefined);
                return false;
            }

            const gateBLocation = player.location;
            const gateBDimensionId = player.dimension.id;

            buildGate(player.dimension, gateBLocation);
            link.gateB = { location: gateBLocation, dimensionId: gateBDimensionId };
            
            saveAllLinksData(allLinks);
            player.setDynamicProperty(PENDING_GATE_PROP, undefined);

            player.sendMessage("§a§lLiên Kết Chiều Không đã được thiết lập!");
            player.playSound("block.end_portal.spawn");

            return true;
        }

        // --- GIAI ĐOẠN 1: ĐẶT CỔNG A VÀ CHỜ KẾT NỐI ---
        else {
            const allLinks = getAllLinksData();
            let playerLinks = allLinks[player.nameTag] || [];

            // Nếu đã đủ 3 cặp, phá hủy cặp cũ nhất
            if (playerLinks.length >= MAX_PAIRS_PER_PLAYER) {
                // Sắp xếp các link theo thời gian tạo cũ nhất
                playerLinks.sort((a, b) => a.creationTime - b.creationTime);
                const oldestLink = playerLinks[0];
                destroyLink(oldestLink.id);
                player.sendMessage("§eGiới hạn cổng đã đạt. Cặp cổng cũ nhất đã bị phá hủy.");
                // Cập nhật lại danh sách sau khi xóa
                playerLinks = (getAllLinksData())[player.nameTag] || [];
            }

            const gateALocation = player.location;
            const gateADimensionId = player.dimension.id;
            
            buildGate(player.dimension, gateALocation);
            
            const newLinkId = `${player.nameTag}_${Date.now()}`;
            const newLink = {
                id: newLinkId,
                owner: player.nameTag,
                creationTime: Date.now(),
                gateA: { location: gateALocation, dimensionId: gateADimensionId },
                gateB: null, // Chờ kết nối
            };

            playerLinks.push(newLink);
            allLinks[player.nameTag] = playerLinks;
            saveAllLinksData(allLinks);
            player.setDynamicProperty(PENDING_GATE_PROP, newLinkId);

            player.sendMessage("§aĐã thiết lập Cổng 1. Hãy đến vị trí khác và dùng kỹ năng lần nữa để tạo Liên kết.");
            
            // Trả về true để hệ thống trừ mana và đặt cooldown
            return true;
        }

    } catch (e) {
        player.sendMessage("§cKhông thể thực hiện kỹ năng Liên Kết Chiều Không!");
        console.error("Spatial Link skill failed: ", e);
        return false;
    }
}