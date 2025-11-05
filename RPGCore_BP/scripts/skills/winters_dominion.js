// --- START OF FILE skills/winters_dominion.js ---

import { system, GameMode, EntityComponentTypes, MolangVariableMap,BlockPermutation } from "@minecraft/server"; // BƯỚC 1: Thêm MolangVariableMap
function imprisonInIce(victim) {
    if (!victim?.isValid) return;

    const slowDurationTicks = 200; // 10 giây
    const dimension = victim.dimension;

    dimension.playSound("block.glass.break", victim.location, { volume: 2 });
    victim.addEffect("slowness", slowDurationTicks, { amplifier: 255 });
    
    const ice = BlockPermutation.resolve("minecraft:ice");
    const air = BlockPermutation.resolve("minecraft:air");
    const loc = victim.location;
    const iceBlocksLocation = [];

    // Tạo một nhà tù băng 2x2x4 xung quanh nạn nhân
    for(let dx = -1; dx <= 1; dx++){ // Tùy chỉnh để tạo lồng vây quanh, không phải 1 góc
        for(let dz = -1; dz <= 1; dz++){
            if(dx === 0 && dz === 0) continue; // Bỏ qua block ở giữa
            for(let dy = 0; dy < 4; dy++){
                const blockLoc = { x: Math.floor(loc.x + dx), y: Math.floor(loc.y + dy), z: Math.floor(loc.z + dz) };
                try {
                    const block = dimension.getBlock(blockLoc);
                    if(block && (block.isAir || block.isLiquid)) { // Chỉ thay thế không khí hoặc chất lỏng
                        block.setPermutation(ice);
                        iceBlocksLocation.push(block.location);
                    }
                } catch(e) {}
            }
        }
    }
    
    // Hẹn giờ để băng tự tan
    system.runTimeout(() => {
         for (const iceLoc of iceBlocksLocation) {
             try {
                 const block = dimension.getBlock(iceLoc);
                 if (block && block.typeId === "minecraft:ice") block.setPermutation(air);
             } catch(e) {}
         }
         // Phát âm thanh ở vị trí cũ của nạn nhân nếu nó không còn hợp lệ
         const soundLoc = victim.isValid ? victim.location : loc;
         dimension.playSound("block.ice.break", soundLoc, {volume: 1});
    }, slowDurationTicks);
}
/**
 * Quản lý tất cả hiệu ứng của Lãnh Địa Mùa Đông khi đang hoạt động.
 * @param {import("@minecraft/server").Player} player Người chơi thi triển
 * @param {object} stats Chỉ số của người chơi
 * @param {number} durationInSeconds Thời gian hiệu lực của kỹ năng
 */
function manageWintersDominionAura(player, stats, durationInSeconds) {
    // --- CÁC THÔNG SỐ CỦA KỸ NĂNG ---
    const DURATION_TICKS = durationInSeconds * 20;
    const skillLevel = stats.skills.winters_dominion ?? 1;
    const RADIUS = 10 + (skillLevel - 1) * 2; // Bán kính hiệu lực (cũng sẽ là bán kính bão tuyết)
    const RUN_EVERY_X_TICKS = 20;
    const HEAL_AMOUNT_PER_SECOND = 1 + Math.floor((skillLevel - 1) / 2);

    // --- BIẾN TRẠNG THÁI ---
    let ticksLived = 0;
    const startLocation = player.getHeadLocation();
    
    const dominionInstanceId = Date.now();
    player.setDynamicProperty("dhh:dominion_instance", dominionInstanceId);

    // Bắt đầu vòng lặp chính của lãnh địa
    const auraInterval = system.runInterval(() => {
        const distanceMoved = Math.sqrt(
            Math.pow(player.location.x - startLocation.x, 2) +
            Math.pow(player.location.z - startLocation.z, 2)
        );

        if (
            !player.isValid ||
            player.getGameMode() === GameMode.Spectator ||
            player.getDynamicProperty("dhh:dominion_instance") !== dominionInstanceId ||
            distanceMoved > 1.8 ||
            ticksLived >= DURATION_TICKS
        ) {
            system.clearRun(auraInterval);
            if (player.isValid) {
                player.setDynamicProperty("dhh:dominion_instance", undefined);
                player.sendMessage("§bLãnh Địa Mùa Đông đã tan biến.");
                player.onScreenDisplay.setActionBar("");
            }
            return;
        }
        
        const playerLoc = player.location;
        
        if (ticksLived % 40 === 0) {
             player.dimension.spawnParticle("minecraft:sonic_explosion", playerLoc);
        }
       
        // BƯỚC 2: Xóa bỏ vòng lặp for cũ tạo 300 hạt tuyết.
        
        // BƯỚC 3: Thêm đoạn code mới để tạo hiệu ứng động
        try {
            // 1. Tạo một MolangVariableMap mới
            const molang = new MolangVariableMap();

            // 2. Đặt giá trị cho biến mà chúng ta đã định nghĩa trong file .json
            // Tên biến "variable.dominion_radius" phải khớp với file winter.particle.json
            molang.setFloat("variable.dominion_radius", RADIUS);

            // 3. Gửi molang map này kèm theo khi gọi hiệu ứng
            player.dimension.spawnParticle("snowstorm:snow", playerLoc, molang);

        } catch(e) {
            console.warn("Lỗi khi tạo hiệu ứng snowstorm:snow. Hãy chắc chắn tệp particle đã được thêm vào behavior pack.");
        }

        // ===================================================================
        // === LOGIC HỒI MÁU CHO ĐỒNG MINH VÀ BẢN THÂN (Giữ nguyên) =========
        // ===================================================================
        const allies = player.dimension.getPlayers({
            location: playerLoc,
            maxDistance: RADIUS,
        });

        for (const ally of allies) {
            try {
                const healthComp = ally.getComponent(EntityComponentTypes.Health);
                if (healthComp && healthComp.currentValue < healthComp.effectiveMax) {
                    healthComp.setCurrentValue(healthComp.currentValue + HEAL_AMOUNT_PER_SECOND);
                    ally.dimension.spawnParticle("minecraft:heart_particle", { x: ally.location.x, y: ally.location.y + 2.2, z: ally.location.z });
                }
            } catch (e) { /* Bỏ qua */ }
        }

        // ===================================================================
        // === LOGIC LÀM CHẬM KẺ ĐỊCH (Giữ nguyên) =========================
        // ===================================================================
        const targets = player.dimension.getEntities({ 
            location: playerLoc, 
            maxDistance: RADIUS, 
            families: ["monster"] 
        });

     const FREEZE_CHANCE = 0.50; // 50% cơ hội đóng băng kẻ địch mỗi giây

for (const target of targets) {
    // Luôn luôn làm chậm kẻ địch
    target.addEffect("slowness", 40, { amplifier: 225, showParticles: false }); // Giảm slowness xuống để hiệu ứng băng có ý nghĩa
    target.dimension.spawnParticle("minecraft:snowflake_particle", target.getHeadLocation());

    // Thêm điều kiện: Nếu kẻ địch chưa có tag 'frozen', thì có cơ hội đóng băng nó
    if (!target.hasTag("frozen") && Math.random() < FREEZE_CHANCE) {
        imprisonInIce(target); // Gọi hàm đóng băng
        target.addTag("frozen"); // Gắn tag để tránh bị đóng băng liên tục
        
        // Hẹn giờ xóa tag sau khi hiệu ứng kết thúc
        system.runTimeout(() => {
            target.removeTag("frozen");
        }, 200); // 200 ticks = 10 giây, khớp với thời gian tan băng
    }
}

        const remainingSeconds = Math.ceil((DURATION_TICKS - ticksLived) / 20);
        player.onScreenDisplay.setActionBar(
            `§b§lLãnh Địa: §f${remainingSeconds}s §a(Hồi phục) §r§c| Di chuyển để hủy`
        );
        
        ticksLived += RUN_EVERY_X_TICKS;
    }, RUN_EVERY_X_TICKS);
}


/**
 * Kích hoạt hoặc hủy bỏ kỹ năng Lãnh Địa Mùa Đông
 * @param {import("@minecraft/server").Player} player Người chơi thi triển
 * @param {object} stats Chỉ số của người chơi
 * @returns {number} Thời gian hiệu lực (giây) nếu thành công, 0 nếu thất bại.
 */
export function activateWintersDominion(player, stats) {
    try {
        const isActive = player.getDynamicProperty("dhh:dominion_instance");

        if (isActive) {
            player.setDynamicProperty("dhh:dominion_instance", undefined);
            return 1; 
        }

        const skillLevel = stats.skills.winters_dominion ?? 1;
        const durationInSeconds = 60 + (skillLevel - 1) * 30;

        player.sendMessage("§bBạn thi triển Lãnh Địa Mùa Đông!");
        player.playSound("block.beacon.power_select", { location: player.location, pitch: 0.8, volume: 1.5 });
        
        manageWintersDominionAura(player, stats, durationInSeconds);
        
        return durationInSeconds;

    } catch (e) {
        player.sendMessage("§cKhông thể thực hiện kỹ năng!");
        console.error("Winter's Dominion skill failed: ", e.stack);
        return 0;
    }
}