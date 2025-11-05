import { world, system, BlockPermutation } from "@minecraft/server";
import { MessageFormData } from "@minecraft/server-ui";
import { showUtilitiesMenu } from "./main.js";

const LIGHTING_COST = 30;
const AREA_SIZE = 20;
const LIGHT_GRID_SPACING = 4;
const LIGHT_LEVEL = 15;

export async function showAreaLightingMenu(player) {
    const form = new MessageFormData();
    form.title("§e§lThắp Sáng Vĩnh Viễn");
    form.body(
        `Bạn có muốn thắp sáng vĩnh viễn một khu vực §f${AREA_SIZE}x${AREA_SIZE}§r xung quanh vị trí hiện tại của bạn không?\n\n` +
        `§7Thao tác này sẽ đặt các nguồn sáng vô hình dưới lòng đất để ngăn quái vật spawn.\n\n` +
        `§cHành động này không thể hoàn tác!`
    );

    form.button1(`§cHủy bỏ`);
    form.button2(`§aĐồng ý (Trừ §d${LIGHTING_COST} Nguyên Thạch§a)`);

    const { selection, canceled } = await form.show(player);

    if (canceled || selection === 0) {
        return showUtilitiesMenu(player);
    }

    if (selection === 1) {
        lightUpArea(player);
    }
}

function lightUpArea(player) {
    const currentNguyenThach = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;

    if (currentNguyenThach < LIGHTING_COST) {
        player.sendMessage(`§cBạn không đủ Nguyên Thạch! Cần §d${LIGHTING_COST}§c.`);
        player.playSound("note.bass");
        return;
    }

    player.setDynamicProperty("dhh:nguyen_thach", currentNguyenThach - LIGHTING_COST);
    player.sendMessage(`§aĐã trừ §d${LIGHTING_COST} Nguyên Thạch§a. Bắt đầu quá trình thắp sáng...`);
    player.playSound("random.orb");

    const dimension = player.dimension;
    const center = player.location;
    const radius = AREA_SIZE / 2;
    const lightPermutation = BlockPermutation.resolve("minecraft:light_block", {
        "block_light_level": LIGHT_LEVEL
    });

    let currentX = -radius;
    let currentZ = -radius;
    const totalSteps = AREA_SIZE * AREA_SIZE;

    const lightingTask = system.runInterval(() => {
        try {
            for (let i = 0; i < 20; i++) {
                if (currentX > radius) {
                    player.sendMessage("§a§lHoàn tất!§r §aKhu vực đã được thắp sáng vĩnh viễn.");
                    player.playSound("entity.player.levelup");
                    player.onScreenDisplay.setActionBar("§aThắp sáng hoàn tất!");
                    system.clearRun(lightingTask);
                    return;
                }

                if (currentX % LIGHT_GRID_SPACING === 0 && currentZ % LIGHT_GRID_SPACING === 0) {
                    const checkX = Math.floor(center.x + currentX);
                    const checkZ = Math.floor(center.z + currentZ);

                    for (let y = Math.floor(center.y) + 5; y > dimension.heightRange.min; y--) {
                        const blockBelow = dimension.getBlock({ x: checkX, y: y - 1, z: checkZ });
                        const blockAt = dimension.getBlock({ x: checkX, y: y, z: checkZ });

                        if (blockBelow && blockBelow.isSolid && blockAt && blockAt.isAir) {
                            dimension.setBlockPermutation({ x: checkX, y: y, z: checkZ }, lightPermutation);
                            break;
                        }
                    }
                }

                currentZ++;
                if (currentZ > radius) {
                    currentZ = -radius;
                    currentX++;
                    const completedSteps = (currentX + radius) * AREA_SIZE;
                    const percent = Math.floor((completedSteps / totalSteps) * 100);
                    player.onScreenDisplay.setActionBar(`§eĐang thắp sáng... (${percent}%)`);
                }
            }
        } catch (e) {
            console.warn(`[Area Lighting] Lỗi trong quá trình quét, đã dừng: ${e}`);
            player.sendMessage("§cQuá trình thắp sáng đã bị gián đoạn do lỗi tải chunk.");
            system.clearRun(lightingTask);
        }
    }, 1);
}