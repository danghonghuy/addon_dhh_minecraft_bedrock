// --- START OF FILE skills/shadow_swap.js (PHIÊN BẢN "THIÊN MỆNH THỜI KHÔNG" - CHỈ VỊ TRÍ & MÁU) ---

import { system, world, MolangVariableMap, EntityComponentTypes } from "@minecraft/server";

/**
 * Quản lý bộ đếm ngược trên Action Bar.
 * @param {import("@minecraft/server").Player} player
 * @param {number} durationInSeconds
 */
function startTimeAnchorTimer(player, durationInSeconds) {
    const oldIntervalId = player.getDynamicProperty("dhh:shadow_swap_interval");
    if (oldIntervalId) {
        system.clearRun(oldIntervalId);
    }

    const expirationTick = system.currentTick + durationInSeconds * 20;
    const anchorInstanceId = Date.now();
    player.setDynamicProperty("dhh:shadow_instance_id", anchorInstanceId);

    const intervalId = system.runInterval(() => {
        if (!player.isValid || player.getDynamicProperty("dhh:shadow_instance_id") !== anchorInstanceId) {
            system.clearRun(intervalId);
            return;
        }

        const timeLeft = Math.round((expirationTick - system.currentTick) / 20);

        if (timeLeft > 0) {
            player.onScreenDisplay.setActionBar(`§e§lThiên Mệnh Thời Không§r§f: ${timeLeft}s`);
        } else {
            // Hết giờ, dọn dẹp
            player.setDynamicProperty("dhh:shadow_location", undefined);
            player.setDynamicProperty("dhh:shadow_instance_id", undefined);
            player.setDynamicProperty("dhh:shadow_health", undefined);
            player.setDynamicProperty("dhh:shadow_dimension", undefined);
            
            player.sendMessage("§eDấu ấn Thiên Mệnh đã phai mờ.");
            player.playSound("random.fizz");
            system.clearRun(intervalId);
        }
    }, 20);

    player.setDynamicProperty("dhh:shadow_swap_interval", intervalId);
}

/**
 * Kích hoạt kỹ năng Thiên Mệnh Thời Không.
 * @param {import("@minecraft/server").Player} player
 * @param {object} stats
 */
export function activateShadowSwap(player, stats) {
    const timeAnchorLocation = player.getDynamicProperty("dhh:shadow_location");

    // --- TRƯỜNG HỢP 2: TÁI KÍCH HOẠT -> NGHỊCH CHUYỂN THỜI GIAN ---
    if (timeAnchorLocation) {
        const intervalId = player.getDynamicProperty("dhh:shadow_swap_interval");
        if (intervalId) system.clearRun(intervalId);
        player.setDynamicProperty("dhh:shadow_swap_interval", undefined);
        player.onScreenDisplay.setActionBar(""); 

        player.sendMessage("§e§lĐang nghịch chuyển dòng thời gian... Quay về sau 1 giây!");
        player.playSound("block.beacon.activate", { pitch: 1.5, volume: 1.0 });

        let tickCounter = 0;
        const swirlInterval = system.runInterval(() => {
            if (!player.isValid) {
                system.clearRun(swirlInterval);
                return;
            }

            for (let i = 0; i < 8; i++) {
                const angle = (tickCounter * 0.2) + (i * Math.PI / 4);
                const radius = 1.2;
                const loc = { x: player.location.x + Math.cos(angle) * radius, y: player.location.y + (i * 0.25), z: player.location.z + Math.sin(angle) * radius };
                player.dimension.spawnParticle("minecraft:end_rod_particle", loc);
                if (i % 2 == 0) player.dimension.spawnParticle("minecraft:totem_particle", loc);
            }
            tickCounter++;
        }, 4);

        system.runTimeout(() => {
            system.clearRun(swirlInterval);
            if (!player.isValid) return;

            const locationRaw = player.getDynamicProperty("dhh:shadow_location");
            if (!locationRaw) {
                 player.sendMessage("§cDấu ấn Thiên Mệnh đã bị nhiễu động. Nghịch chuyển thất bại.");
                 return;
            }

            // === SỬA LỖI & TINH CHỈNH LOGIC ===
            const dimensionId = player.getDynamicProperty("dhh:shadow_dimension");
            // Nếu không tìm thấy dimensionId (do dữ liệu cũ), mặc định quay về overworld để tránh crash.
            if (typeof dimensionId !== 'string') {
                 player.sendMessage("§cKhông tìm thấy dữ liệu không gian, quay về thế giới chính.");
                 dimensionId = "minecraft:overworld";
            }
            // ===================================
            
            const location = JSON.parse(locationRaw);
            const health = player.getDynamicProperty("dhh:shadow_health");
        
            const dimension = world.getDimension(dimensionId);
            player.teleport(location, { dimension: dimension });

            if (health !== undefined) player.getComponent(EntityComponentTypes.Health)?.setCurrentValue(health);
            
            player.sendMessage("§e§lThiên Mệnh đã nghịch chuyển thành công!");
        
            player.playSound("dhh.teleport", { pitch: 1.0, volume: 2 });
            for (let i = 0; i < 50; i++) {
                const offset = { x: (Math.random() - 0.5) * 3.5, y: 1 + (Math.random() - 0.5) * 2, z: (Math.random() - 0.5) * 3.5 };
                const particleLocation = { x: player.location.x + offset.x, y: player.location.y + offset.y, z: player.location.z + offset.z };
                player.dimension.spawnParticle("minecraft:end_rod_particle", particleLocation);
            }
            player.dimension.spawnParticle("minecraft:totem_particle", {x: player.location.x, y: player.location.y + 1, z: player.location.z});

            player.setDynamicProperty("dhh:shadow_location", undefined);
            player.setDynamicProperty("dhh:shadow_instance_id", undefined);
            player.setDynamicProperty("dhh:shadow_health", undefined);
            // Bỏ hunger
            player.setDynamicProperty("dhh:shadow_dimension", undefined);

        }, 20);
        
        return true; 
    } 
    // --- TRƯỜNG HỢP 1: KÍCH HOẠT LẦN ĐẦU -> ĐẶT DẤU ẤN THỜI GIAN ---
    else {
        const skillLevel = stats.skills.shadow_swap ?? 1;
        const reactivateTime = 30 + ((skillLevel - 1) * 10);
        
        // Ghi nhớ Vị trí, Máu và Không gian
        player.setDynamicProperty("dhh:shadow_location", JSON.stringify(player.location));
        player.setDynamicProperty("dhh:shadow_health", player.getComponent(EntityComponentTypes.Health).currentValue);
        player.setDynamicProperty("dhh:shadow_dimension", player.dimension.id);

        const molang = new MolangVariableMap();
        molang.setColorRGB("variable.color", { red: 1.0, green: 0.84, blue: 0.0 }); 
        player.dimension.spawnParticle("minecraft:colored_flame_particle", player.location, molang);
        player.playSound("particle.soul_escape", { pitch: 1.2 });

        player.sendMessage(`§eĐã đặt Dấu ấn Thiên Mệnh. Tái kích hoạt trong §f${reactivateTime} giây §eđể nghịch chuyển.`);
        
        startTimeAnchorTimer(player, reactivateTime);

        return true; 
    }
}