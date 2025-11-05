import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { showStatsMenu } from "./main.js";

const MUSIC_TRACKS = [
    { id: "music.menu1", displayName: "§a [ Vietsub + Pinyin ] Khiêm Nhường / 谦让 - Vương Tĩnh Văn" },
    { id: "music.menu2", displayName: "§c [Vietsub + Pinyin] Bất Công - Trần Tử Tình | 偏向 - 陈子晴 " },
    { id: "music.menu3", displayName: "§e AOV × SAO - (Collaboration Arena Of Valor & Sword Art Online )" },
    { id: "music.menu4", displayName: "§b Tales From the Snow Mountain: [Genshin Impact] OST" },
    // --- BÀI HÁT MỚI ĐỂ TEST ---
   
];

// ==========================================================
// === THAY ĐỔI 1: Nâng cấp biến trạng thái ==================
// ==========================================================
// Thay vì chỉ lưu ID, giờ chúng ta lưu một object chứa thông tin chi tiết
// null nghĩa là không có nhạc nào đang phát.
let currentMusicState = null; 
// Ví dụ khi có nhạc: 
// currentMusicState = { 
//   id: "music.menu1", 
//   displayName: "§a...", 
//   requester: "PlayerName" 
// };


function runWorldCommand(command) {
    try {
        const overworld = world.getDimension("overworld");
        overworld.runCommand(command);
    } catch (e) {
        console.warn(`Lệnh không thực thi được: ${command}. Lỗi: ${e}`);
    }
}


// ==========================================================
// === THAY ĐỔI 2: Cập nhật các hàm điều khiển nhạc ==========
// ==========================================================

function playMusicForAll(player, musicTrack) {
    // 1. Dừng nhạc cũ trước (nếu có).
    stopMusicForAll();
    
    // 2. Cập nhật trạng thái mới với đầy đủ thông tin.
    currentMusicState = {
        id: musicTrack.id,
        displayName: musicTrack.displayName,
        requester: player.nameTag // Lưu tên người chơi đã chọn bài hát
    };

    // 3. Phát nhạc mới cho tất cả người chơi.
    runWorldCommand(`playsound ${currentMusicState.id} @a`);
    
    // 4. Gửi thông báo cho toàn server!
    world.sendMessage(`§d[Máy Phát Nhạc] §fĐang phát: ${currentMusicState.displayName} §f(Yêu cầu bởi §e${currentMusicState.requester}§f)`);
}

function stopMusicForAll() {
    // Kiểm tra xem có bài hát nào đang phát không.
    if (currentMusicState) {
        // Dừng chính xác bài hát đó bằng ID của nó.
        runWorldCommand(`stopsound @a ${currentMusicState.id}`);
    }
    
    // Luôn đặt lại trạng thái về null.
    currentMusicState = null;
}

// ==========================================================
// === THAY ĐỔI 3: Cập nhật logic cho người chơi mới =========
// ==========================================================

world.afterEvents.playerSpawn.subscribe((event) => {
    const { player } = event;
    // Kiểm tra xem có nhạc đang phát không bằng object trạng thái.
    if (currentMusicState) {
        try {
            // Phát lại bài hát đang chạy cho người chơi mới.
            runWorldCommand(`playsound ${currentMusicState.id} "${player.nameTag}"`);
        } catch (e) {
            console.warn(`Không phát được nhạc cho người chơi mới ${player.name}: ${e}`);
        }
    }
});


// ==========================================================
// === THAY ĐỔI 4: Cập nhật giao diện Menu ===================
// ==========================================================

export async function showMusicMenu(player) {
    const form = new ActionFormData();
    form.title("§d§lMÁY PHÁT NHẠC");

    // Thay đổi nội dung của menu tùy thuộc vào việc có nhạc đang phát hay không.
    if (currentMusicState) {
        form.body(
            `§fHiện đang phát:\n${currentMusicState.displayName}\n§7(Yêu cầu bởi §f${currentMusicState.requester}§7)\n\nChọn một bài khác để thay đổi.`
        );
    } else {
        form.body("§fChọn một bản nhạc nền để phát cho cả server.");
    }


    MUSIC_TRACKS.forEach(track => {
        form.button(track.displayName);
    });

    form.button("§c§lDừng Nhạc Hiện Tại"); // Đổi màu cho dễ thấy
    form.button("§8Quay Lại");

    const { selection, canceled } = await form.show(player);
    if (canceled) return;

    if (selection < MUSIC_TRACKS.length) {
        const selectedTrack = MUSIC_TRACKS[selection];
        // Truyền cả đối tượng player và track vào hàm
        playMusicForAll(player, selectedTrack); 
        
        // Không cần sendMessage ở đây nữa vì playMusicForAll đã làm
    } 
    else if (selection === MUSIC_TRACKS.length) {
        if(currentMusicState) { // Chỉ gửi tin nhắn nếu thực sự có nhạc để dừng
            world.sendMessage(`§d[Máy Phát Nhạc] §7Nhạc đã được dừng bởi §e${player.nameTag}§7.`);
        }
        stopMusicForAll();
    }
    else {
        showStatsMenu(player);
    }
}