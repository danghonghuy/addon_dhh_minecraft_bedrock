// --- START OF FILE convenience_housing.js --- (PHIÊN BẢN SAO CHÉP TỪ FILE MẪU)

import { world, system, BlockPermutation } from "@minecraft/server";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";
import { CONFIG } from "./config.js";
import { showUtilitiesMenu } from "./main.js";
import { isAreaOverlapping, getAllClaimsData, saveAllClaimsData } from "./land_claim_system.js";

const HOUSING_CONFIG = CONFIG.HOUSING_CONFIG;
const MAX_CLAIMS_PER_PLAYER = 3; 

// --- CÁC HÀM GIAO DIỆN (KHÔNG THAY ĐỔI) ---
export async function showHousingMainMenu(player) {
    const form = new ActionFormData();
    form.title("§6§lDỊCH VỤ NHÀ Ở TIỆN LỢI");
    const currentBalance = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
    form.body(`§fChọn một ngôi nhà để xây dựng ngay lập tức tại vị trí của bạn.\n§7(Nhà sẽ được tự động bảo hộ!)\n\n§fSố dư của bạn: §d${currentBalance} Nguyên Thạch`);
    const availableHouses = Object.keys(HOUSING_CONFIG);
    availableHouses.forEach(houseKey => {
        const house = HOUSING_CONFIG[houseKey];
        const canAfford = currentBalance >= house.price;
        form.button(
            `${canAfford ? "§a" : "§m§7"}${house.name}\n` +
            `§8Giá: ${house.price} NT | Kích thước: ${house.size}x${house.size}`
        );
    });
    form.button("§0Quay Lại");
    const { selection, canceled } = await form.show(player);
    if (canceled || selection >= availableHouses.length) {
        return showUtilitiesMenu(player);
    }
    const selectedHouseKey = availableHouses[selection];
    await showPurchaseConfirmation(player, HOUSING_CONFIG[selectedHouseKey]);
}

async function showPurchaseConfirmation(player, houseConfig) {
    const form = new MessageFormData();
    form.title("§2Xác Nhận Mua Nhà");
    form.body(
        `§l${houseConfig.name}\n\n` +
        `§f${houseConfig.description}\n\n` +
        `§eGiá: §d${houseConfig.price} Nguyên Thạch\n` +
        `§eKích thước bảo hộ: §f${houseConfig.size}x${houseConfig.size}\n\n` +
        `§cLƯU Ý:§r Ngôi nhà sẽ được xây dựng tại vị trí bạn đang đứng. Hãy đảm bảo khu vực đủ rộng và bằng phẳng.`
    );
    form.button1("§aĐồng ý mua");
    form.button2("§cHủy bỏ");
    const { selection, canceled } = await form.show(player);
    if (canceled || selection === 1) {
        return showHousingMainMenu(player);
    }
    await purchaseAndBuildHouse(player, houseConfig);
}

// --- HÀM XỬ LÝ CHÍNH (KHÔNG THAY ĐỔI) ---
async function purchaseAndBuildHouse(player, houseConfig) {
    const allClaims = getAllClaimsData();
    const playerClaims = allClaims[player.nameTag] || [];
    if (playerClaims.length >= MAX_CLAIMS_PER_PLAYER) {
        player.sendMessage(`§cBạn đã đạt giới hạn tối đa ${MAX_CLAIMS_PER_PLAYER} vùng bảo hộ/nhà ở!`);
        return;
    }
    const currentBalance = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
    if (currentBalance < houseConfig.price) {
        player.sendMessage("§cBạn không đủ Nguyên Thạch!");
        player.playSound("note.bass");
        return;
    }
    const { x, z } = player.location;
    const dimensionId = player.dimension.id;
    if (isAreaOverlapping(x, z, houseConfig.size, dimensionId)) {
        player.sendMessage("§cKhu vực này đã chồng lấn với một vùng đất được bảo hộ khác!");
        return;
    }

    player.sendMessage("§eĐang tiến hành xây dựng và đăng ký bảo hộ...");
    player.playSound("note.pling");

    player.setDynamicProperty("dhh:nguyen_thach", currentBalance - houseConfig.price);
    const buildLocation = { x: Math.floor(x), y: Math.floor(player.location.y), z: Math.floor(z) };
    const dimension = player.dimension;

    try {
        await buildHouseProgrammatically(dimension, buildLocation, houseConfig.blueprint);
        
        // Đặt thêm các block phụ (cửa trên, giường chân)
        await placeSecondaryBlocks(dimension, buildLocation, houseConfig.blueprint);

        if (!allClaims[player.nameTag]) allClaims[player.nameTag] = [];
        const newClaim = {
            id: Date.now(),
            centerX: buildLocation.x,
            centerZ: buildLocation.z,
            size: houseConfig.size,
            dimensionId: dimensionId,
            trusted: [],
            allowPvp: false,
            allowContainerAccess: false,
        };
        allClaims[player.nameTag].push(newClaim);
        saveAllClaimsData(allClaims);

        player.sendMessage(`§a§lXây dựng hoàn tất!§r §aNgôi nhà "${houseConfig.name}" và vùng bảo hộ ${houseConfig.size}x${houseConfig.size} đã được tạo.`);
        player.playSound("entity.player.levelup");
        
    } catch (error) {
        console.warn(`[Convenience Housing] Lỗi khi xây dựng nhà: ${error}\n${error.stack}`);
        player.sendMessage("§cĐã xảy ra lỗi khi xây dựng! Đã hoàn lại Nguyên Thạch.");
        player.setDynamicProperty("dhh:nguyen_thach", currentBalance);
    }
}


/**
 * HÀM XÂY DỰNG - SAO CHÉP Y CHANG PHƯƠNG PHÁP CỦA survival_challenge.js
 */
async function buildHouseProgrammatically(dimension, baseLocation, blueprint) {
    const offsetX = Math.floor(blueprint.size.x / 2);
    const offsetZ = Math.floor(blueprint.size.z / 2);

    const startCorner = { 
        x: baseLocation.x - offsetX, 
        y: baseLocation.y, 
        z: baseLocation.z - offsetZ 
    };
    
    // Dọn dẹp không gian
    const clearEndCorner = {
        x: startCorner.x + blueprint.size.x,
        y: startCorner.y + blueprint.size.y + 3,
        z: startCorner.z + blueprint.size.z
    };
    const airPermutation = BlockPermutation.resolve("minecraft:air");
    for (let y = startCorner.y; y <= clearEndCorner.y; y++) {
         for (let x = startCorner.x; x <= clearEndCorner.x; x++) {
              for (let z = startCorner.z; z <= clearEndCorner.z; z++) {
                  try { dimension.getBlock({x,y,z}).setPermutation(airPermutation); } catch(e){}
              }
         }
    }
    await system.waitTicks(5);

    // Xây dựng
    for (let y = 0; y < blueprint.layers.length; y++) {
        const layer = blueprint.layers[y];
        for (let z = 0; z < layer.length; z++) {
            const row = layer[z];
            for (let x = 0; x < row.length; x++) {
                const char = row[x];
                if (char === ' ' || char === undefined) continue;

                const blockData = blueprint.palette[char];
                if (!blockData) continue;

                const blockLocation = {
                    x: startCorner.x + x,
                    y: startCorner.y + y,
                    z: startCorner.z + z,
                };

                try {
                    const block = dimension.getBlock(blockLocation);
                    const permutation = BlockPermutation.resolve(blockData.id, blockData.properties || {});
                    block.setPermutation(permutation);
                } catch (e) {
                     console.warn(`Lỗi khi đặt block '${char}' tại ${JSON.stringify(blockLocation)}: ${e}`);
                }
            }
        }
        await system.waitTicks(2);
    }
}

/**
 * HÀM MỚI: Đặt các block phụ như phần trên của cửa, phần chân của giường
 */
async function placeSecondaryBlocks(dimension, baseLocation, blueprint) {
    const offsetX = Math.floor(blueprint.size.x / 2);
    const offsetZ = Math.floor(blueprint.size.z / 2);
    const startCorner = { x: baseLocation.x - offsetX, y: baseLocation.y, z: baseLocation.z - offsetZ };

    for (let y = 0; y < blueprint.layers.length; y++) {
        for (let z = 0; z < blueprint.layers[y].length; z++) {
            const row = blueprint.layers[y][z];
            for (let x = 0; x < row.length; x++) {
                const char = row[x];
                if (char === ' ' || char === undefined) continue;
                
                const blockData = blueprint.palette[char];
                if (!blockData || !blockData.id) continue;

                const blockLocation = { x: startCorner.x + x, y: startCorner.y + y, z: startCorner.z + z };

                // Đặt phần trên của cửa
                if (blockData.id.includes("_door")) {
                    const upperBlock = dimension.getBlock({ x: blockLocation.x, y: blockLocation.y + 1, z: blockLocation.z });
                    const upperPermutation = BlockPermutation.resolve(blockData.id, { ...blockData.properties, "upper_block_bit": true });
                    upperBlock.setPermutation(upperPermutation);
                }
            }
        }
    }
}