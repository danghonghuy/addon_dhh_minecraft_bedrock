import { world, system, EntityDamageCause, EntityHealthComponent,  EntityEquippableComponent, EntityComponentTypes, ItemStack, EquipmentSlot, Player, Container, EntityInventoryComponent, EffectType } from "@minecraft/server";
import { initializeStrafingBehavior } from "./zouwei.js";
import { initializeFallDetectorBehavior } from "./ai_fall_detector.js";
import { initializePeacemakerBehavior } from "./ai_peacemaker.js";
import { initializeFollowerBehavior } from "./ai_follower.js";
import { initializeGreetingBehavior } from "./greeting.js";
import { initializeProgressionSystem } from "./upgrade.js";
import { initializeStrollSwitcherBehavior } from "./ai_stroll_switcher.js";
import { initializeAttackPermissionBehavior } from "./ai_attack_permission.js";
import { initializeAntiTrapBehavior } from "./ai_anti_trap.js";
import { initializeGroundItemClear } from "./server_utilities.js";

const YOUR_NAMESPACE = "zps";
const AI_ENTITY_TYPE_ID = `${YOUR_NAMESPACE}:newb`;
const COMPANION_WOLF_TYPE_ID = "minecraft:wolf"; 
const DOGS_PER_TIER = {
    "wooden": { min: 0, max: 1 },
    "stone":  { min: 0, max: 1 },
    "copper": { min: 0, max: 2 },
    "iron":   { min: 0, max: 2 },
    "diamond":   { min: 0, max: 3 },
    "diamond_pro":   { min: 0, max: 3 },
};
const WOLF_TELEPORT_FOLLOW_CHECK_INTERVAL_TICKS = 40; 
const WOLF_MAX_DISTANCE_BEFORE_TELEPORT = 8;       
const WOLF_TELEPORT_TARGET_RADIUS_MIN = 1.5;        
const WOLF_TELEPORT_TARGET_RADIUS_MAX = 2.5;        
const WOLF_DEFEND_MODE_DURATION_TICKS = 300;  
const DEFEND_TARGET_TAG = "zps_target_for_wolves_DEFEND";
const ASSIST_TARGET_TAG = "zps_target_for_wolves_ASSIST";
const WOLF_ASSIST_MODE_DURATION_TICKS = 300;

const GLOBAL_BUNNY_HOP_CHECK_INTERVAL_TICKS = 2;
const BUNNY_HOP_SPEED_THRESHOLD = 0.37;
const BUNNY_HOP_STRENGTH = 0.42; 
const FORWARD_HOP_STRENGTH = 0.2; 
const BUNNY_HOP_COOLDOWN_TICKS = 8;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const namePartA_Adjectives = [
    "ChienBinh", "PhapSu", "SatThu", "LangKhach", "ThoSan", "HiepSi", "LanhChua",
    "BongMa", "SuGia", "VeBinh", "DauSi", "NhaTienTri", "HoangDe", "AcQuy", "KeDuHanh",
    "ChienThan", "LongVuong", "KiemKhach", "XaThu", "DaoTac"
];

const namePartB_Conjunctions = [
    "VoDanh", "BatBai", "HuyenThoai", "CoXua", "BongToi", "RangRo", "CuongNo",
    "BangGia", "SamSet", "LangQuen", "ThucTinh", "CuoiCung", "VinhHang", "CoDoc",
    "MaQuai", "ThienSu", "DiaNguc", "SaMac", "BiAn", "BatDiet"
];

const namePartC_Nouns = [
    "CuaGio", "CuaLua", "CuaBao", "TuVucTham", "NganSao", "TrongDem", "BangThep",
    "TroTan", "HuKhong", "SuongMu", "NhuomMau", "GiaBang", "TrenCat", "RungSau",
    "DinhNui", "BienCa", "HoangDa", "CoDon", "ThoiGian", "SoPhan"
];

const presetNames = [
    "XinhGaiLesbian", "XauTraiHayIa", "NguSiDanDon", "HocDotChoiGame", "NhaNgheoVuonLen",
    "AnHaiLaChinh", "ThichGaySu", "BatCanDoi", "ChanDoiVoDoi", "MeGoiAnCom",
    "NhaBaoMang", "HetTienNapGame", "ChoiViDamMe", "GaMaThichRaGio", "1HitVeThanh",
    "TaoChapHet", "DungSoTao", "VoDichThienHa", "TrumCuoiDay", "SoVoNhatTheGioi",
    "YeuDonPhuong", "ThatTinhOnline", "BiBoViNgho", "CamSungChua", "BoHocDiNet",
    "AnMiGoiSongQuaNgay", "Ping999", "LagQuaMayOi", "AdminLaGay", "TaoLaGay",
    "GhetBonYeuNhau", "FAChinhHieu", "DangCay", "Ulatroi", "VipProNhatServer",
    "NguNhuCho", "ChoiGameNhuLon", "ThangMatDay", "ConBeDeThuong", "TraiThangThichGay",
    "CoiThuongSuDoi", "BatTu", "KhongSoChet", "ThichThiChieu", "DepTraiCoGiSai",
    "XauMaChanh", "MeTaoLaTrum", "BoTaoGiauNhat", "XinCardViettel", "LamGiCoTien",
    "OutTrinhChua", "ThanhNienNghiemTuc", "GenZBatOn", "ToiBenCongChua", "HayRaDeThoi",
    "CucSucGaming", "MetMoiQua", "TheGioiNayThatGiaDoi", "LeCay2","DuThienOffical","MaiHanDanDon","HanNguSi123",
    "FeedLienTuc", "ThanhAnHanh", "ChuyenGiaDoThua", "NaoCaVang", "DoiCanhCut",
    "VuaChuiThe", "KhongNgaiVaCham", "TaoLaBoMay", "XemChuaMayConGa", "MaiDinh",
    "QuaLaChan", "HeHeBoy", "Jztr", "FlexDenChet", "XuCaNa", "BanhMiKhong",
    "GoiJenTao", "ChienThanBatBai", "HuyDietTatCa", "1TyTieuVat", "DocCoCauBai",
    "CanHetCaMap", "DeNhatCaoThu", "NopTienHocPhi", "TronMeDiChoi", "CuoiThangHetTien",
    "ChoLanhLuong", "SinhVienNgheo", "ThatNghiepOnline", "NguQuenAnSang", "YeuSaiNguoi",
    "TimVoTrongGame", "CrushCoBoiRoi", "KhongThichLamThue", "ThoatNgheo", "DoiDoi",
    "LamBanVoiCoDon", "AnBamGiaDinh", "KhocTrongToiLet", "NhayCauTuTu", "NhinCaiGi",
    "DanhTaoDi", "BatNaoLenMaSong", "TaoNhanSacThoi", "DepTraiKhongGocChet", "YeuMaiKhongDo",
    "DoiVoDoiThu", "GiamDocTapVu", "ChuTichAnMay", "ThieuGiaRachRooi", "CongTuBot",
    "ThichBaoLuc", "DamPhatChetLuon", "CuDamThep", "TienLeLaVanDe", "KhongCoTienDungYeu",
    "YeuViTien", "DoReMon", "NobitaHauDau", "ChaienCaSi", "XekoMoVit", "XukaMeTrai",
    "ChayNgayDi", "LacTroi", "EmCuaNgayHomQua", "TramAnhTheFake", "HuanHoaHong",
    "KhaBanh", "TuanTienTi", "LongCa", "NgoBaKha", "DoMixi", "PewPew",
    "ThayGiaoBa", "Bomman", "MinaYoung", "LinhNgocDam", "MisThy", "Rip113",
    "ThayBaGiao", "QTV", "SofM", "Levi", "TheShy", "Faker", "NangLuongTichCuc",
    "DocThanQuyenRu", "EchNgoiDayGieng", "GaCungMotMe", "CoHocMoiCoAn", "LamThiMoiCoAn",
    "AnToiChua", "DiNguDi", "MaiDiHocRoi", "ChuaLamBaiTap", "ThuHaiMauDen",
    "Dream", "Herobrine", "Notch", "Technoblade", "IShowSpeed", "MrBeast", "xqc"
];

// ==================== CHAT SYSTEM MỚI - TỰ NHIÊN HƠN ====================

const casualChatMessages = [
    // Ngắn gọn, tự nhiên
    "ai có than k?", "cho xin sắt", "có gỗ k mn?", "cần than gấp",
    "ai dư sắt k", "xin đá", "cần vài đuốc", "có thức ăn k?",
    "đói vl", "đói vcl", "đói qá", "hết máu r", "cần thuốc",
    "sắp chết đói", "no r", "máu đầy",
    "đi mine thoi", "ai đi nether k", "vào hang nè",
    "farm đc ít sắt", "tìm đc kim cương:))", "vừa chết:(",
    "lag vl", "giật quá", "ping 999",
    "ê", "ơ", "ô", "j đó", "??", "bruh", "lol", "oke",
    "đc", "k", "hmmm", "ừ", "vl", "wtf", "à", "ừm",
    "đau vậy", "creeper đm", "zombie nhiều vl", "spider vcl",
    "đánh k lại", "chạy đi", "ơ kìa",
    "buồn ngủ vl", "chán thật", "nhàm quá", "vui ghê",
    "hay thật", "ez", "gg", "rip", "F", "skill issue",
    "về nhà thoi", "ở đâu nhỉ", "lạc r", "tìm đường về",
    "nhà tao đâu", "ai thấy base k",
    "tối r", "sáng r", "mưa à", "đêm r ngủ thôi",
    "lên lv r", "có áo giáp r", "kiếm đc kiếm", "xong nhà r",
];

const mobNames = [
    "Dơi", "Quỷ Lửa", "Ong", "Bogged", "Breeze", "Mèo", "Nhện Hang", "Gà", "Bò", "Sniffer",
    "Creeper", "Cá Heo", "Dê", "Gấu Trúc", "Lừa", "Thủy Quái", "Vệ Binh Cổ Đại", "Trứng", "Pha Lê End", "Rồng Ender",
    "Enderman", "Endermite", "Ngọc Ender", "Phù Thủy Triệu Hồi", "Cáo", "Cá Nóc", "Axolotl", "Ghast", "Heo Man Rợ", "Heo",
    "Heo Thây Ma", "Vệ Binh", "Hoglin", "Ngựa", "Xác Ướp", "Kẻ Tàn Phá", "Golem Sắt", "Người Tuyết", "Lạc Đà Không Bướu", "Khối Magma",
    "Mèo Rừng", "Bóng Ma", "Vẹt", "Chất Nhầy", "Lợn", "Bức Tranh", "Kẻ Cướp", "Gấu Bắc Cực", "Thỏ", "Cừu",
    "Vindicator", "Shulker", "Cá Bạc", "Bộ Xương", "Kẻ Lạc Lối", "Nhện", "Vex", "Phù Thủy", "Wither", "Bộ Xương Wither",
    "Sói", "Zoglin", "Dân Làng Thây Ma", "Thây Ma"
];

const environmentalDeathMessages = [
    "ngã từ trên cao xuống sml", "bơi trong dung nham", "bị đè bẹp", 
    "chết đói", "chết ngạt trong tường", "bị thủy quái xiên",
    "rớt khỏi thang", "bị măng đá xiên", "bị thạch nhũ rơi trúng",
    "chết cóng", "chết héo", "bị gai chích", "rơi ra khỏi thế giới",
    "cháy thành than", "bị trời đánh", "nổ banh xác", "bị phép thuật giết",
    "bị creeper ôm", "tự nổ", "chết đuối", "bị cái đe rơi vào đầu"
];

// Phân loại tính cách chat
const CHAT_PERSONALITIES = {
    QUIET: "quiet",      // 40% - Ít nói
    NORMAL: "normal",    // 40% - Bình thường  
    CHATTY: "chatty"     // 20% - Nhiều nói
};

const CHAT_DELAYS = {
    quiet: { min: 120, max: 300 },   // 2-5 phút
    normal: { min: 60, max: 180 },   // 1-3 phút
    chatty: { min: 45, max: 90 }     // 45s-90s
};

function initializeAIChatPersonality(ai) {
    if (!ai?.isValid) return;
    
    const rand = Math.random();
    let personality;
    
    if (rand < 0.4) {
        personality = CHAT_PERSONALITIES.QUIET;
    } else if (rand < 0.8) {
        personality = CHAT_PERSONALITIES.NORMAL;
    } else {
        personality = CHAT_PERSONALITIES.CHATTY;
    }
    
    ai.setDynamicProperty(`${YOUR_NAMESPACE}:chat_personality`, personality);
    ai.setDynamicProperty(`${YOUR_NAMESPACE}:last_chat_time`, Date.now());
}

function hasNearbyPlayers(ai, radius = 24) {
    if (!ai?.isValid) return false;
    
    try {
        const nearbyPlayers = ai.dimension.getPlayers({
            location: ai.location,
            maxDistance: radius
        });
        return nearbyPlayers.length > 0;
    } catch (e) {
        return false;
    }
}

function shouldChat(ai) {
    if (!ai?.isValid) return false;
    
    try {
        if (ai.hasTag("has_target")) return false;
        
        const personality = ai.getDynamicProperty(`${YOUR_NAMESPACE}:chat_personality`) || CHAT_PERSONALITIES.NORMAL;
        const lastChatTime = ai.getDynamicProperty(`${YOUR_NAMESPACE}:last_chat_time`) || 0;
        const currentTime = Date.now();
        const timeSinceLastChat = (currentTime - lastChatTime) / 1000;
        
        const delays = CHAT_DELAYS[personality];
        const minDelay = delays.min;
        
        if (timeSinceLastChat < minDelay) return false;
        
        const hasPlayers = hasNearbyPlayers(ai, 24);
        
        if (hasPlayers) {
            return Math.random() < 0.3; // 30% khi có người
        } else {
            return Math.random() < 0.05; // 5% khi không có ai
        }
        
    } catch (e) {
        return false;
    }
}

function aiSendMessage(ai) {
    if (!ai?.isValid) return;
    
    try {
        const aiName = ai.nameTag || "AI_Player";
        const message = getRandomElement(casualChatMessages);
        
        world.sendMessage(`§f<${aiName}> ${message}`);
        ai.setDynamicProperty(`${YOUR_NAMESPACE}:last_chat_time`, Date.now());
        
    } catch (e) {
        console.warn(`[Chat] AI ${ai.id} failed to send message: ${e}`);
    }
}

function startImprovedChatSystem() {
    system.runInterval(() => {
        let allAis = [];
        const dimensionIds = ["overworld", "nether", "the_end"];
        
        for (const dimId of dimensionIds) {
            try {
                const dimension = world.getDimension(dimId);
                const entities = dimension.getEntities({ type: AI_ENTITY_TYPE_ID });
                allAis.push(...entities);
            } catch (e) {}
        }
        
        allAis = shuffleArray(allAis);
        
        let chatCount = 0;
        const maxChatsPerCycle = 2; // Tối đa 2 AI chat mỗi lần
        
        for (const ai of allAis) {
            if (chatCount >= maxChatsPerCycle) break;
            
            if (shouldChat(ai)) {
                aiSendMessage(ai);
                chatCount++;
            }
        }
        
    }, 100); // Check mỗi 5 giây
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ==================== DEATH MESSAGES ====================

function generateRandomPlayerName() {
    if (Math.random() < 0.5) {
        const partA = getRandomElement(namePartA_Adjectives);
        const partB = getRandomElement(namePartB_Conjunctions);
        const partC = getRandomElement(namePartC_Nouns);
        const partD = getRandomTwoDigitNumber();
        
        if (partA && partB && partC) {
            return `${partA}${partB}${partC}${partD}`;
        }
    }
    
    return getRandomElement(presetNames) || "Gà_Công_Nghiệp";
}

function generateJoinLeaveMessage() {
    const name = generateRandomPlayerName();
    const action = Math.random() < 0.5 ? "đã vào hóng chuyện" : "đã té khỏi server";
    return `§e${name} ${action}`; 
}

function generateCombatDeathMessage() {
    const victim = generateRandomPlayerName();
    let killer = "";

    if (Math.random() < 0.5) {
        killer = getRandomElement(mobNames);
    } else {
        killer = generateRandomPlayerName();
        while (killer === victim) {
            killer = generateRandomPlayerName();
        }
    }
    return `§f${victim} đã bị ${killer} cho lên bảng`;
}

function generateEnvironmentalDeathMessage() {
    const victim = generateRandomPlayerName();
    const reason = getRandomElement(environmentalDeathMessages);
    return `§f${victim} ${reason}`;
}

// Schedule fake death/join messages - ÍT HƠN
function scheduleNextFakeMessage() {
    const randomDelayTicks = (45 + Math.random() * 75) * 20; // 45-120s

    system.runTimeout(() => {
        const messageTypeRoll = Math.random();
        let messageToSend = "";

        if (messageTypeRoll < 0.5) { 
            messageToSend = generateJoinLeaveMessage();
        } else if (messageTypeRoll < 0.8) {
            messageToSend = generateCombatDeathMessage(); 
        } else { 
            messageToSend = generateEnvironmentalDeathMessage();
        }

        try {
            if (messageToSend) world.sendMessage(messageToSend);
        } catch (e) {
             console.warn(`[ChatSim] Gửi tin nhắn thất bại: ${e}`);
        }
        
        scheduleNextFakeMessage();

    }, Math.floor(randomDelayTicks));
}

function getRandomElement(arr) {
    if (!arr || arr.length === 0) return ""; 
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomTwoDigitNumber() {
    return Math.floor(Math.random() * 90) + 10;
}

// ==================== WOLF SYSTEM ====================

system.runInterval(() => {
let allAiPlayers = [];
const dimensionIdsToQuery = ["overworld", "nether", "the_end"];
for (const dimId of dimensionIdsToQuery) {
    try {
        const dimension = world.getDimension(dimId);
        const entitiesInDimension = dimension.getEntities({ type: AI_ENTITY_TYPE_ID });
        for (const entity of entitiesInDimension) {
            allAiPlayers.push(entity);
        }
    } catch (e) {
    }
}
if (allAiPlayers.length === 0) {
    return;
}

    for (const aiPlayer of allAiPlayers) {
        if (!aiPlayer || !aiPlayer.isValid) continue;

        let companionWolves;
        try {
            companionWolves = aiPlayer.dimension.getEntities({
                type: COMPANION_WOLF_TYPE_ID,
                location: aiPlayer.location,
                maxDistance: WOLF_MAX_DISTANCE_BEFORE_TELEPORT + 15 
            });
        } catch (e) { continue; }

        for (const wolf of companionWolves) {
            if (!wolf || !wolf.isValid) continue;

            const masterId = wolf.getDynamicProperty(`${YOUR_NAMESPACE}:ai_master_id`);
            if (masterId === aiPlayer.id) { 
                const wolfIsInCombat = wolf.getDynamicProperty(`${YOUR_NAMESPACE}:is_in_combat`) || false;
                if (wolfIsInCombat) {
                    continue; 
                }

                const dx = wolf.location.x - aiPlayer.location.x;
                const dy = wolf.location.y - aiPlayer.location.y;
                const dz = wolf.location.z - aiPlayer.location.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance > WOLF_MAX_DISTANCE_BEFORE_TELEPORT) {
                    const angle = Math.random() * Math.PI * 2; 
                    const radius = getRandomInt(WOLF_TELEPORT_TARGET_RADIUS_MIN * 10, WOLF_TELEPORT_TARGET_RADIUS_MAX * 10) / 10; 
                    
                    const targetX = aiPlayer.location.x + Math.cos(angle) * radius;
                    const targetY = aiPlayer.location.y; 
                    const targetZ = aiPlayer.location.z + Math.sin(angle) * radius;

                    try {
                        wolf.teleport({ x: targetX, y: targetY, z: targetZ }, {
                            dimension: aiPlayer.dimension,
                            checkForBlocks: true,      
                            facingLocation: aiPlayer.location 
                        });
                    } catch (e_teleport) {
                    }
                }
            }
        }
    }
}, WOLF_TELEPORT_FOLLOW_CHECK_INTERVAL_TICKS);

// ==================== BUNNY HOP ====================

function maintainHopRotation(entityToLock) {
    if (!entityToLock || !entityToLock.isValid || !entityToLock.getDynamicProperty(`${YOUR_NAMESPACE}:is_hop_view_locking`)) {
        if (entityToLock && entityToLock.isValid) {
            entityToLock.setDynamicProperty(`${YOUR_NAMESPACE}:is_hop_view_locking`, false);
        }
        return;
    }

    if (entityToLock.isOnGround) {
        entityToLock.setDynamicProperty(`${YOUR_NAMESPACE}:is_hop_view_locking`, false);
        return;
    }

    const lockedYaw = entityToLock.getDynamicProperty(`${YOUR_NAMESPACE}:hop_target_yaw`);
    const lockedPitch = entityToLock.getDynamicProperty(`${YOUR_NAMESPACE}:hop_target_pitch`);

    if (typeof lockedYaw === 'number' && typeof lockedPitch === 'number') {
        try {
            entityToLock.setRotation({ x: lockedPitch, y: lockedYaw });
        } catch (e) {
            entityToLock.setDynamicProperty(`${YOUR_NAMESPACE}:is_hop_view_locking`, false);
            return;
        }
    } else {
        entityToLock.setDynamicProperty(`${YOUR_NAMESPACE}:is_hop_view_locking`, false);
        return;
    }

    system.run(() => maintainHopRotation(entityToLock));
}

system.runInterval(() => {
let allAiPlayers = [];
const dimensionIdsToQuery = ["overworld", "nether", "the_end"];
for (const dimId of dimensionIdsToQuery) {
    try {
        const dimension = world.getDimension(dimId);
        const entitiesInDimension = dimension.getEntities({ type: AI_ENTITY_TYPE_ID });
        allAiPlayers.push(...entitiesInDimension);
    } catch (e) {
    }
}
    for (const entity of allAiPlayers) {
        if (!entity || !entity.isValid || entity.getDynamicProperty(`${YOUR_NAMESPACE}:is_hop_view_locking`)) {
            continue;
        }

        const currentTick = system.currentTick;
        const lastHopTick = entity.getDynamicProperty(`${YOUR_NAMESPACE}:last_bunny_hop_tick`) || 0;

        if (currentTick < lastHopTick + BUNNY_HOP_COOLDOWN_TICKS) {
            continue;
        }

        if (entity.isOnGround) {
            try {
                const velocity = entity.getVelocity();
                const horizontalSpeed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);

                if (horizontalSpeed > BUNNY_HOP_SPEED_THRESHOLD) {
                    let impulseX = 0;
                    let impulseZ = 0;

                    if (horizontalSpeed > 0.01) {
                        const normalizedForwardX = velocity.x / horizontalSpeed;
                        const normalizedForwardZ = velocity.z / horizontalSpeed;
                        impulseX = normalizedForwardX * FORWARD_HOP_STRENGTH;
                        impulseZ = normalizedForwardZ * FORWARD_HOP_STRENGTH;
                    }

                    entity.applyImpulse({ x: impulseX, y: BUNNY_HOP_STRENGTH, z: impulseZ });
                    entity.setDynamicProperty(`${YOUR_NAMESPACE}:last_bunny_hop_tick`, currentTick);

                    if (horizontalSpeed > 0.01) {
                        const initialRotation = entity.getRotation();
                        const targetYaw = Math.atan2(-velocity.x, velocity.z) * (180 / Math.PI);
                        
                        entity.setDynamicProperty(`${YOUR_NAMESPACE}:hop_target_yaw`, targetYaw);
                        entity.setDynamicProperty(`${YOUR_NAMESPACE}:hop_target_pitch`, initialRotation.x); 
                        entity.setDynamicProperty(`${YOUR_NAMESPACE}:is_hop_view_locking`, true);
  
                        system.run(() => maintainHopRotation(entity)); 
                    }
                }
            } catch (e_vel) { }
        }
    }
}, GLOBAL_BUNNY_HOP_CHECK_INTERVAL_TICKS);

// ==================== ENTITY SPAWN ====================

world.afterEvents.entitySpawn.subscribe(event => {
    const { entity } = event;

    if (entity.typeId === AI_ENTITY_TYPE_ID) {
        let finalName = "Người_Chơi_AI";

        if (Math.random() < 0.5) {
            const partA = getRandomElement(namePartA_Adjectives);
            const partB = getRandomElement(namePartB_Conjunctions);
            const partC = getRandomElement(namePartC_Nouns);
            const partD = getRandomTwoDigitNumber();

            if (partA && partB && partC) {
                finalName = `${partA}${partB}${partC}${partD}`;
            } else {
                 console.warn(`[AI Đặt Tên] Đặt tên ghép thất bại do mảng trống.`);
            }
        } else {
            finalName = getRandomElement(presetNames);
            if (!finalName) {
                console.warn(`[AI Đặt Tên] Lấy tên có sẵn thất bại vì danh sách trống.`);
                finalName = "AI_Player_Tên_Dự_Phòng"; 
            }
        }

        try {
            entity.nameTag = finalName;
        } catch (e) {
            console.warn(`[AI Đặt Tên] Không đặt được nameTag cho thực thể ${entity.id}. Lỗi: ${e}`);
        }

        system.run(() => {
            try {
                if (!entity.isValid) return;
                
                // Khởi tạo chat personality
                initializeAIChatPersonality(entity);
                
                entity.setDynamicProperty(`${YOUR_NAMESPACE}:isInDanger`, false);
                entity.setDynamicProperty(`${YOUR_NAMESPACE}:lastHostileTick`, 0);
                entity.setDynamicProperty(`${YOUR_NAMESPACE}:lastPostCombatChatTick`, 0);
	
                let numDogs = 0;
                const tiers = Object.keys(DOGS_PER_TIER).reverse();
                for (const tier of tiers) {
                    if (entity.hasTag(tier)) {
                        const tierConfig = DOGS_PER_TIER[tier];
                        numDogs = getRandomInt(tierConfig.min, tierConfig.max);
                        break; 
                    }
                }
                if (numDogs > 0) {
                    system.runTimeout(() => {
                        if (!entity.isValid) return;

                        for (let i = 0; i < numDogs; i++) {
                            try {
                                const spawnLoc = entity.location;
                                const offsetSpawnLoc = {
                                    x: spawnLoc.x + (Math.random() * 1.6 - 0.8),
                                    y: spawnLoc.y,
                                    z: spawnLoc.z + (Math.random() * 1.6 - 0.8)
                                };
                                const wolf = entity.dimension.spawnEntity(COMPANION_WOLF_TYPE_ID, offsetSpawnLoc);

                                if (wolf && wolf.isValid) {
                                    wolf.setDynamicProperty(`${YOUR_NAMESPACE}:ai_master_id`, entity.id);

                                    const tameableComp = wolf.getComponent(EntityComponentTypes.Tameable);
                                    if (tameableComp && !tameableComp.isTamed) { 
                                        wolf.triggerEvent("minecraft:on_tame"); 
                                    }
                                }
                            } catch (e_dog) {
                                console.error(`[AI_CHÓ] Lỗi khi tạo/thiết lập chó cho AI ${entity.nameTag || entity.typeId}: ${e_dog}\nStack: ${e_dog.stack}`);
                            }
                        }
                    }, 5); 
                }
             
            } catch (error) {
                console.error(`[AI Đặt Tên] Lỗi khi khởi tạo ${entity.typeId}: ${error}`);
            }
        });
    }
});

// ==================== DEATH EVENTS ====================

world.afterEvents.entityDie.subscribe(event => {
    const { deadEntity, damageSource } = event;

    if (deadEntity.typeId === "zps:newb") {
        const newbName = deadEntity.nameTag || "Một Tay Gà";
        let deathMessage = `${newbName} đã ngủm`;

        let realAttacker;
        if (damageSource?.damagingProjectile?.owner) {
            realAttacker = damageSource.damagingProjectile.owner;
        } 
        else if (damageSource?.damagingEntity && damageSource.damagingEntity.typeId !== "zps:melee_strike_projectile") {
            realAttacker = damageSource.damagingEntity;
        }

        if (realAttacker && realAttacker.isValid) {
            const attackerName = realAttacker.nameTag || realAttacker.typeId.replace("zps:", "").replace("minecraft:", "");
 
            if (damageSource.damagingProjectile) {
                if (damageSource.damagingProjectile.typeId === "zps:melee_strike_projectile") {
                    deathMessage = `${newbName} đã bị ${attackerName} cho ăn đấm`;
                } else {
                    deathMessage = `${newbName} đã bị ${attackerName} bắn cho lủng sọ`;
                }
            } else {
                deathMessage = `${newbName} đã bị ${attackerName} tiễn về nơi chín suối`;
            }
        } else {
            const cause = damageSource?.cause;
            switch (cause) {
                case EntityDamageCause.fall:
                    deathMessage = `${newbName} ngã từ trên cao xuống sml`;
                    break;
                case EntityDamageCause.lava:
                    deathMessage = `${newbName} nghịch dại đi bơi trong dung nham`;
                    break;
                case EntityDamageCause.fire:
                case EntityDamageCause.fireTick:
                    deathMessage = `${newbName} bị nướng chín như heo quay`;
                    break;
                case EntityDamageCause.drowning:
                    deathMessage = `${newbName} chết đuối vì không biết bơi`;
                    break;
                case EntityDamageCause.suffocation:
                    deathMessage = `${newbName} chết ngạt trong tường`;
                    break;
                case EntityDamageCause.starve:
                    deathMessage = `${newbName} chết đói`;
                    break;
                case EntityDamageCause.void:
                    deathMessage = `${newbName} rơi ra khỏi thế giới`;
                    break;
                case EntityDamageCause.lightning:
                    deathMessage = `${newbName} bị trời đánh`;
                    break;
                case EntityDamageCause.blockExplosion:
                    deathMessage = `${newbName} nổ banh xác`;
                    break;
                case EntityDamageCause.magic:
                    deathMessage = `${newbName} bị giết bởi ma thuật`;
                    break;
                case EntityDamageCause.wither:
                    deathMessage = `${newbName} chết héo queo`;
                    break;
                case EntityDamageCause.freezing:
                    deathMessage = `${newbName} chết cóng`;
                    break;
                case undefined:
                case EntityDamageCause.none:
                    deathMessage = `${newbName} chết một cách bí ẩn`;
                    break;
            }
        }

        world.sendMessage(deathMessage);
    }
});

world.afterEvents.entityHurt.subscribe(event => {
    const { hurtEntity, damageSource } = event;

    if (hurtEntity.typeId === AI_ENTITY_TYPE_ID && damageSource.damagingEntity && damageSource.damagingEntity.isValid) {
        const aiPlayer = hurtEntity;
        const attacker = damageSource.damagingEntity;

        if (attacker.id === aiPlayer.id) return;

        attacker.addTag(DEFEND_TARGET_TAG); 

        const companionWolves = aiPlayer.dimension.getEntities({
            type: COMPANION_WOLF_TYPE_ID,
            location: aiPlayer.location,
            maxDistance: 30 
        });

        for (const wolf of companionWolves) {
            if (wolf.isValid && wolf.getDynamicProperty(`${YOUR_NAMESPACE}:ai_master_id`) === aiPlayer.id) {
                wolf.triggerEvent("app:event_wolf_enter_defend_mode");
                wolf.setDynamicProperty(`${YOUR_NAMESPACE}:is_in_combat`, true); 
            }
        }

        system.runTimeout(() => {
            if (attacker.isValid) {
                attacker.removeTag(DEFEND_TARGET_TAG);
            }
           
			if (!aiPlayer || !aiPlayer.isValid) {
                return; 
            }

            if (attacker && attacker.isValid) { 
                attacker.removeTag(DEFEND_TARGET_TAG);
            }
            const currentWolvesAfterDefend = aiPlayer.dimension.getEntities({
                type: COMPANION_WOLF_TYPE_ID,
                location: aiPlayer.location, 
                maxDistance: 30
            });
            for (const wolf of currentWolvesAfterDefend) {
                if (wolf.isValid && wolf.getDynamicProperty(`${YOUR_NAMESPACE}:ai_master_id`) === aiPlayer.id) {
                    wolf.triggerEvent("app:event_wolf_exit_defend_mode");
                    wolf.setDynamicProperty(`${YOUR_NAMESPACE}:is_in_combat`, false); 
                }
            }
        }, WOLF_DEFEND_MODE_DURATION_TICKS);
    }
});

world.afterEvents.projectileHitEntity.subscribe(event => {
    const projectile = event.projectile;
    const shooter = event.source;       
    const hitInfo = event.getEntityHit();

    if (!shooter || !shooter.isValid) {
        return;
    }
    if (shooter.typeId !== AI_ENTITY_TYPE_ID) {
        return;
    }
    if (!hitInfo) {
        return;
    }
    const entityHit = hitInfo.entity;
    if (!entityHit || !entityHit.isValid) {
        return;
    }
    if (projectile && projectile.isValid) {
        if (projectile.typeId !== "zps:melee_strike_projectile") {
            return; 
        }
    } else if (projectile) {
        if (projectile.typeId !== "zps:melee_strike_projectile"){
             return;
        }
    } else {
        return;
    }
  
    if (entityHit.id === shooter.id) {
        return;
    }
    const ownerName = shooter.nameTag || shooter.typeId;

    const companionWolves = shooter.dimension.getEntities({
        type: COMPANION_WOLF_TYPE_ID,
        location: shooter.location,
        maxDistance: 30 
    });

    for (const wolf of companionWolves) {
        if (wolf.isValid && wolf.getDynamicProperty(`${YOUR_NAMESPACE}:ai_master_id`) === shooter.id) {
            const isWolfDefending = wolf.getDynamicProperty(`${YOUR_NAMESPACE}:is_in_combat`) || false;
            
            if (isWolfDefending) {
                continue; 
            }

            try {
                entityHit.addTag(ASSIST_TARGET_TAG);
            } catch (e_tag_add) {
                 console.error(`[AI_CHÓ_HỖ_TRỢ] Lỗi khi thêm tag hỗ trợ cho ${entityHit.nameTag || entityHit.typeId}: ${e_tag_add}`);
                 continue;
            }

            wolf.triggerEvent("app:event_wolf_enter_assist_mode");
            system.runTimeout(() => {
                if (entityHit.isValid) { 
                    entityHit.removeTag(ASSIST_TARGET_TAG);
                }
                if (wolf.isValid) {
                    if (!wolf.getDynamicProperty(`${YOUR_NAMESPACE}:is_in_combat`)) {
                        wolf.triggerEvent("app:event_wolf_exit_assist_mode");
                    }
                }
            }, WOLF_ASSIST_MODE_DURATION_TICKS);
        }
    }
});

world.afterEvents.entityDie.subscribe(event => {
    const { deadEntity, damageSource } = event; 

    if (deadEntity.typeId === AI_ENTITY_TYPE_ID) {
        const deadAiPlayerId = deadEntity.id;
        const deadAiPlayerName = deadEntity.nameTag || deadEntity.typeId;

        let potentialOrphanedWolves;
        try {
            potentialOrphanedWolves = deadEntity.dimension.getEntities({
                type: COMPANION_WOLF_TYPE_ID,
            });
        } catch (e) {
            return;
        }

        for (const wolf of potentialOrphanedWolves) {
            if (wolf.isValid) {
                const masterId = wolf.getDynamicProperty(`${YOUR_NAMESPACE}:ai_master_id`);
                if (masterId === deadAiPlayerId) { 
                    wolf.setDynamicProperty(`${YOUR_NAMESPACE}:ai_master_id`, "mồ_côi_không_nơi_nương_tựa"); 
                    wolf.triggerEvent("app:event_wolf_exit_defend_mode"); 
                    wolf.setDynamicProperty(`${YOUR_NAMESPACE}:is_in_combat`, false); 
                    wolf.triggerEvent("zps:event_start_despawn_timer");
                }
            }
        }
    }
});

// ==================== INITIALIZE ALL SYSTEMS ====================

initializeStrafingBehavior();
initializeGreetingBehavior();
initializeAttackPermissionBehavior();
initializeStrollSwitcherBehavior();
initializeAntiTrapBehavior();
initializeFollowerBehavior();
initializeProgressionSystem();
initializeFallDetectorBehavior();
initializePeacemakerBehavior();
initializeGroundItemClear();

// Start chat system
startImprovedChatSystem();

// Start fake messages (ít hơn)
scheduleNextFakeMessage();

console.warn(`[${YOUR_NAMESPACE.toUpperCase()} Kịch Bản AI] Đã tải kịch bản chính với chat system cải tiến.`);