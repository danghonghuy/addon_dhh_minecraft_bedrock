// --- START OF FILE: skills/immortal_edict.js ---

import { world, system } from "@minecraft/server";
import { MolangVariableMap } from "@minecraft/server";
import { CONFIG } from "../config.js";

// Lưu trữ ID của các vòng lặp để quản lý
const activeEdicts = new Map();

// Các hiệu ứng mạnh mẽ sẽ được ban phát cho đồng đội
const ALLY_BUFFS = [
    { id: "resistance", amplifier: 4 },   // Kháng Sát Thương V
    { id: "strength", amplifier: 1 },     // Sức Mạnh II
    { id: "regeneration", amplifier: 1 }, // Hồi Máu II
    { id: "speed", amplifier: 1 },        // Tốc Độ II
];
const BUFF_DURATION_TICKS = 40; // 2 giây, đủ để không bị ngắt quãng

/**
 * Vòng lặp chính quản lý hào quang của kỹ năng
 */
function manageEdictAura(player, stats) {
    const skillLevel = stats.skills.immortal_edict ?? 1;

    // --- CÔNG THỨC SCALING ---
    // Bán kính: Bắt đầu từ 10, mỗi cấp tăng 2
    const radius = 8 + (skillLevel * 2); 
    // Máu mất mỗi giây: Bắt đầu từ 2 HP/s, mỗi cấp giảm 0.15
    const hpDrainPerSecond = Math.max(0.5, 2 - (skillLevel * 0.15)); 
    // -------------------------

    const intervalId = system.runInterval(() => {
        // --- ĐIỀU KIỆN HỦY KỸ NĂNG ---
        if (!player.isValid || !player.hasTag("immortal_edict_active")) {
            endImmortalEdict(player, null); // Hủy nếu người chơi thoát hoặc tag bị xóa
            return;
        }

        const startPos = {
            x: player.getDynamicProperty("edict:start_x"),
            y: player.getDynamicProperty("edict:start_y"),
            z: player.getDynamicProperty("edict:start_z"),
        };
        const currentPos = player.location;
        // Nếu người chơi di chuyển khỏi block ban đầu -> hủy chiêu
        if (Math.floor(currentPos.x) !== Math.floor(startPos.x) || Math.floor(currentPos.z) !== Math.floor(startPos.z)) {
            endImmortalEdict(player, "§eBạn đã di chuyển, Thánh Lệnh Bất Diệt bị hủy bỏ.");
            return;
        }
        
        // --- HIỆU ỨNG LÊN BẢN THÂN ---
        // Trừ máu người chơi (sát thương magic bỏ qua giáp)
        player.applyDamage(hpDrainPerSecond, { cause: 'magic' });

        // --- HIỆU ỨNG LÊN ĐỒNG ĐỘI ---
        const allies = player.dimension.getPlayers({
            location: player.location,
            maxDistance: radius,
            excludeNames: [player.nameTag] // Không tác dụng lên bản thân
        });

        for (const ally of allies) {
            for (const buff of ALLY_BUFFS) {
                ally.addEffect(buff.id, BUFF_DURATION_TICKS, { amplifier: buff.amplifier, showParticles: false });
            }
        }
        
        // --- HIỆU ỨNG HÌNH ẢNH ---
        // Giống chaos_trap, tạo vòng tròn hiệu ứng dưới chân
        const molang = new MolangVariableMap();
        molang.setFloat("variable.circle_size", radius);
        molang.setFloat("variable.particle_lifetime", 1.1); // Sống lâu hơn interval một chút
        // Tên particle này bạn sẽ cần tạo, tương tự dhh:magic_circle
       const particleLocation = {
    x: player.location.x,
    y: player.location.y + 0.3, // <-- THAY ĐỔI NẰM Ở ĐÂY
    z: player.location.z
};
// Spawn particle tại vị trí mới
player.dimension.spawnParticle("dhh:holy_circle", particleLocation, molang);
        
        player.onScreenDisplay.setActionBar(`§e§lTHÁNH LỆNH BẤT DIỆT§r - Bán kính: §a${radius}m`);

    }, 20); // Chạy mỗi giây (20 tick)

    activeEdicts.set(player.nameTag, intervalId);
}

/**
 * Bắt đầu kỹ năng
 */
function startImmortalEdict(player, stats) {
    player.addTag("immortal_edict_active");
    
    // Lưu vị trí ban đầu để kiểm tra di chuyển
    const loc = player.location;
    player.setDynamicProperty("edict:start_x", loc.x);
    player.setDynamicProperty("edict:start_y", loc.y);
    player.setDynamicProperty("edict:start_z", loc.z);

   
    
    player.sendMessage("§eBạn kích hoạt §lThánh Lệnh Bất Diệt§r§e, ban phước cho đồng minh và nhận lấy mọi gánh nặng!");
    player.playSound("block.beacon.activate", { volume: 2.0, pitch: 0.8 });
    
    manageEdictAura(player, stats);
    return true; // Kích hoạt thành công
}

/**
 * Kết thúc kỹ năng và kích hoạt hồi chiêu
 */
function endImmortalEdict(player, message) {
    if (!player.isValid) return;

    // Chỉ thực hiện nếu kỹ năng đang hoạt động
    if (activeEdicts.has(player.nameTag)) {
        system.clearRun(activeEdicts.get(player.nameTag));
        activeEdicts.delete(player.nameTag);

        player.removeTag("immortal_edict_active");
      

        if (message) {
            player.sendMessage(message);
        }
        player.playSound("block.beacon.deactivate", { volume: 2.0, pitch: 0.8 });

        // --- KÍCH HOẠT HỒI CHIÊU (SAU KHI KỸ NĂNG KẾT THÚC) ---
        const cooldownSeconds = CONFIG.SKILL_COOLDOWNS.IMMORTAL_EDICT;
        const cooldownTicks = cooldownSeconds * 20;
        player.setDynamicProperty("dhh:cd_immortal_edict", system.currentTick + cooldownTicks);
        player.sendMessage(`§cKỹ năng Thánh Lệnh Bất Diệt đang hồi... (${cooldownSeconds}s)`);
    }
}


/**
 * Hàm chính được gọi từ skill_handler.js
 */
export function activateImmortalEdict(player, stats) {
    try {
        if (player.hasTag("immortal_edict_active")) {
            // Nếu đang dùng mà bấm lại -> hủy chiêu
            endImmortalEdict(player, "§eBạn đã chủ động thu hồi Thánh Lệnh.");
            return false; // Trả về false để không bị trừ mana khi hủy
        } else {
            // Bắt đầu thi triển
            return startImmortalEdict(player, stats);
        }
    } catch (e) {
        console.error("Immortal Edict skill failed: ", e.stack);
        player.sendMessage("§cKhông thể thực hiện kỹ năng!");
        return false;
    }
}