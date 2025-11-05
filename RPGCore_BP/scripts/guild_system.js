// --- START OF FILE guild_system.js --- (PHIÊN BẢN HOÀN CHỈNH)

import { world, system, ItemStack } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { showStatsMenu, getPlayerStats,logError } from './main.js'; // Dòng này chỉ lấy hàm từ main.js
import { CONFIG } from './config.js';  
import { ALL_CLASSES, CLASS_TRANSLATIONS } from "./classes/index.js";
const ROLE_TRANSLATIONS = {
    owner: "Chủ Bang",
    officer: "Sĩ Quan",
    member: "Thành Viên"
};
// --- CẤU HÌNH ---
const GUILD_DATA_KEY = "dhh:guild_data";
const MAX_GUILD_MEMBERS = 10; // Giới hạn thành viên ban đầu
const GUILD_CHAT_PREFIX = "!";
const GUILD_INVITE_RADIUS = 2000;

// --- TIỆN ÍCH VECTOR ---
const Vector = {
    magnitude(vector) { return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z); },
    subtract(v1, v2) { return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z }; }
};

// ===================================================================
// === QUẢN LÝ DỮ LIỆU & CÁC HÀM TIỆN ÍCH CỐT LÕI =====================
// ===================================================================

export function getAllGuildsData() {
    const dataString = world.getDynamicProperty(GUILD_DATA_KEY);
    return dataString ? JSON.parse(dataString) : {};
}

function saveAllGuildsData(allGuildsData) {
    world.setDynamicProperty(GUILD_DATA_KEY, JSON.stringify(allGuildsData));
}

export function getPlayerGuildName(player) {
    const allGuilds = getAllGuildsData();
    for (const guildName in allGuilds) {
        if (allGuilds[guildName].members[player.nameTag]) return guildName;
    }
    return null;
}

function serializeItem(item) {
    if (!item) return null;
    return { typeId: item.typeId, amount: item.amount, nameTag: item.nameTag, lore: item.getLore() };
}

function deserializeItem(itemData) {
    if (!itemData) return null;
    const item = new ItemStack(itemData.typeId, itemData.amount);
    item.nameTag = itemData.nameTag;
    if (itemData.lore && itemData.lore.length > 0) item.setLore(itemData.lore);
    return item;
}

// ===================================================================
// === CẤP ĐỘ BANG HỘI & LỢI ÍCH (PERKS) =============================
// ===================================================================
/**
 * Tự động kiểm tra và gán nhiệm vụ mới cho bang hội nếu đã đến lúc.
 */
function checkAndAssignGuildQuests(guildName, guildData, forceReset = false) {
    const resetIntervalTicks = CONFIG.GUILD_QUESTS.RESET_INTERVAL_HOURS * 3600 * 20;
    const lastReset = guildData.questResetTick || 0;
    const needsReset = forceReset || !guildData.currentQuests || guildData.currentQuests.length === 0 || system.currentTick > lastReset + resetIntervalTicks;

    // BƯỚC 1: Nếu không cần reset, thoát ra ngay lập tức.
    if (!needsReset) {
        return false;
    }

    // BƯỚC 2: Nếu cần reset, thực hiện tất cả các hành động reset ở đây.
    const questPool = [...CONFIG.GUILD_QUESTS.QUEST_POOL];
    const newQuests = []; // Tạo một mảng mới hoàn toàn, an toàn hơn là sửa mảng cũ.
    
    for (let i = 0; i < CONFIG.GUILD_QUESTS.QUESTS_PER_WEEK; i++) {
        if (questPool.length === 0) break;
        const randomIndex = Math.floor(Math.random() * questPool.length);
        const selectedQuest = questPool.splice(randomIndex, 1)[0];
        if (selectedQuest) { // Thêm kiểm tra an toàn
            newQuests.push({
                id: selectedQuest.id,
                progress: 0,
                completed: false,
            });
        }
    }

    // BƯỚC 3: Gán mảng mới vào dữ liệu bang hội.
    // Thao tác này đảm bảo danh sách cũ bị xóa hoàn toàn.
    guildData.currentQuests = newQuests;
    guildData.questResetTick = system.currentTick;
    
    // BƯỚ-C 4: Thông báo cho người chơi nếu reset là do người dùng yêu cầu
    if (forceReset) {
        for (const memberName in guildData.members) {
            const member = world.getPlayers({ name: memberName })[0];
            if (member) member.sendMessage("§a[Bang Hội] Nhiệm vụ hàng tuần đã được làm mới bởi một Sĩ quan!");
        }
    }

    return true; // Có cập nhật
}

// Thêm hàm này
/**
 * Cập nhật tiến độ cho một nhiệm vụ bang hội. Được gọi từ main.js.
 */
export function updateGuildQuestProgress(player, questType, targetId, amount = 1) {
    const guildName = getPlayerGuildName(player);
    if (!guildName) return;

    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData || !guildData.currentQuests) return;

    for (const activeQuest of guildData.currentQuests) {
        if (activeQuest.completed) continue;

        const questInfo = CONFIG.GUILD_QUESTS.QUEST_POOL.find(q => q.id === activeQuest.id);
        if (questInfo && questInfo.type === questType) {
            
            let isMatch = false;
            // KIỂM TRA XEM MỤC TIÊU LÀ TAG HAY ID CỤ THỂ
            if (questInfo.target.startsWith('#')) {
                // Nếu là tag, tìm trong danh sách tag của config.js
                const tagList = CONFIG.ITEM_TAGS[questInfo.target] || [];
                if (tagList.includes(targetId)) {
                    isMatch = true;
                }
            } else {
                // Nếu là ID, so sánh trực tiếp
                if (questInfo.target === targetId) {
                    isMatch = true;
                }
            }

            if (isMatch) {
                activeQuest.progress += amount;
                if (activeQuest.progress >= questInfo.amount) {
                    activeQuest.completed = true;
                    grantXpToGuild(guildName, questInfo.rewardXp);

                    const message = `§a[Bang Hội] §b${player.nameTag}§a đã giúp hoàn thành nhiệm vụ: §e${questInfo.title}!`;
                    for (const memberName in guildData.members) {
                        const member = world.getPlayers({ name: memberName })[0];
                        if (member) member.sendMessage(message);
                    }
                }
                saveAllGuildsData(allGuilds);
                break; // Dừng lại sau khi cập nhật một nhiệm vụ
            }
        }
    }
}
function xpForGuildLevel(level) {
    if (level < 1) return CONFIG.GUILD_LEVELING.BASE_XP_TO_LEVEL;
    if (level === 1) return 10000; // XP cần cho cấp 1 -> 2
    return Math.floor(10000 * Math.pow(CONFIG.GUILD_LEVELING.XP_MULTIPLIER, level - 1));
}

export function grantXpToGuild(guildName, xpAmount) {
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData || guildData.level >= 9) return; // Không cộng XP nếu đã max cấp

    guildData.xp += xpAmount;
    let xpNeeded = xpForGuildLevel(guildData.level);
    let leveledUp = false;

    while (guildData.xp >= xpNeeded && guildData.level < 9) {
        guildData.level++;
        guildData.xp -= xpNeeded;
        leveledUp = true;
        xpNeeded = xpForGuildLevel(guildData.level);
    }

    if (leveledUp) {
        const message = `§a[Bang Hội] Bang hội của bạn đã đạt §l§eCấp ${guildData.level}§r§a!`;
        for (const memberName in guildData.members) {
            const member = world.getPlayers({ name: memberName })[0];
            if (member) {
                member.sendMessage(message);
                member.playSound("random.levelup");
            }
        }
    }
    saveAllGuildsData(allGuilds);
}

export function getGuildPerkValue(guildData, perkKey, defaultValue) {
    if (!guildData) return defaultValue;
    
    // Nếu là perk cộng dồn, giá trị ban đầu phải là 0
    // Nếu không, nó sẽ là giá trị mặc định
    let value = defaultValue;

    for (let level = 1; level <= guildData.level; level++) {
        const perk = CONFIG.GUILD_LEVELING.PERKS[level];
        if (!perk) continue;

        const processPerk = (p) => {
            if (p.key === perkKey) {
                // KIỂM TRA CỜ "CUMULATIVE"
                if (p.cumulative) {
                    // Nếu là perk cộng dồn lần đầu tiên, đặt lại `value` về 0
                    if(value === defaultValue) value = 0;
                    value += p.value; // CỘNG DỒN
                } else {
                    value = p.value; // GHI ĐÈ
                }
            }
        };

        if (perk.key) processPerk(perk);
        if (perk.keys) perk.keys.forEach(processPerk);
    }
    return value;
}
 function getMaxMembersForGuild(guildData) {
    return getGuildPerkValue(guildData, 'max_members', MAX_GUILD_MEMBERS);
}

export function getBankSlotsForGuild(guildData) {
    const rows = getGuildPerkValue(guildData, 'bank_rows', 3);
    return rows * 9;
}

// ===================================================================
// === GIAO DIỆN CHÍNH & LUỒNG TƯƠNG TÁC =============================
// ===================================================================

export async function showGuildMainMenu(player) {
    const guildName = getPlayerGuildName(player);
    if (guildName) await showGuildDashboard(player, guildName);
    else await showNoGuildMenu(player);
}

async function showNoGuildMenu(player) {
    const form = new ActionFormData();
    form.title("§l§2BANG HỘI");
    form.body("§fBạn chưa có bang hội. Hãy tạo mới hoặc xin gia nhập một bang hội có sẵn!");
    form.button("§aTạo Bang Hội Mới", "textures/ui/icon_recipe_item.png");
    form.button("§bXem & Xin Gia Nhập Bang", "textures/ui/icon_multiplayer.png");
    form.button("§0Quay Lại", "textures/ui/undo.png");

    const { selection, canceled } = await form.show(player);
    if (canceled) return showStatsMenu(player);
    if (selection === 0) await showCreateGuildForm(player);
    if (selection === 1) await showGuildList(player);
    if (selection === 2) return showStatsMenu(player);
}

async function showGuildDashboard(player, guildName) {
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData) {
        player.sendMessage("§cLỗi: Dữ liệu bang hội của bạn không tồn tại.");
        return showGuildMainMenu(player);
    }

    const playerRole = guildData.members[player.nameTag];
    const isOwner = playerRole === 'owner';
    const isOfficer = playerRole === 'officer';
    const xpNeeded = xpForGuildLevel(guildData.level);
    const maxMembers = getMaxMembersForGuild(guildData);
    
    const form = new ActionFormData();
    form.title(`§l§2BANG HỘI: ${guildName}`);
    
    let body = `§eCấp Bang: §f${guildData.level}\n`;
    body += `§dXP Bang: §f${guildData.xp.toFixed(0)}/${xpNeeded}\n\n`;
    if (guildData.motd) body += `§6Thông Báo: §f${guildData.motd}\n\n`;
  body += `§7Vai trò của bạn: §e${ROLE_TRANSLATIONS[playerRole] || playerRole}\n`;
    body += `§7Thành viên: §a${Object.keys(guildData.members).length} / ${maxMembers}`;
    form.body(body);

    // --- SẮP XẾP LẠI CẢ NÚT VÀ HÀNH ĐỘNG CHO ĐỒNG BỘ ---
    const buttons = [];

    // Nút 0
    buttons.push({ text: "§6Nhiệm Vụ & Lợi Ích Bang", icon: "textures/items/book_enchanted.png", action: () => showGuildPerksMenu(player, guildName) });
    // Nút 1
    buttons.push({ text: "§aXem Danh Sách Thành Viên", icon: "textures/ui/icon_multiplayer.png", action: () => showMemberList(player, guildName) });
    // Nút 2
    buttons.push({ text: "§eKho Bang Hội", icon: "textures/items/chest.png", action: () => showGuildBankMenu(player, guildName) });
    
    if (isOwner || isOfficer) {
        buttons.push({ text: "§bMời Thành Viên Mới", icon: "textures/ui/invite_icon.png", action: () => showInviteMenu(player, guildName) });
        buttons.push({ text: "§dXem Yêu Cầu Gia Nhập", icon: "textures/ui/solicitation_icon.png", action: () => showJoinRequestsMenu(player, guildName) });
    }
    if (isOwner) {
        buttons.push({ text: "§cQuản Lý Bang Hội", icon: "textures/ui/hammer_icon.png", action: () => showGuildManagementMenu(player, guildName) });
    }
    
    const hasGuildHomePerk = getGuildPerkValue(guildData, 'guild_home', false);
    if (hasGuildHomePerk && guildData.homeLocation) {
        buttons.push({ text: "§bDịch chuyển về Bang Hội", icon: "textures/items/ender_pearl.png", action: () => teleportToGuildHome(player, guildName) });
    }

    buttons.push({ text: "§cRời Bang Hội", icon: "textures/ui/icon_exit.png", action: () => showLeaveGuildConfirm(player, guildName) });
    buttons.push({ text: "§0Quay Lại Menu Chính", icon: "textures/ui/undo.png", action: () => showStatsMenu(player) });

    // Hiển thị nút
    buttons.forEach(b => form.button(b.text, b.icon));

    const { selection, canceled } = await form.show(player);
    if (canceled) return;
    
    // Gọi hành động tương ứng với nút đã bấm
    buttons[selection]?.action();
}

// ===================================================================
// === TẠO, XIN GIA NHẬP, VÀ MỜI VÀO BANG ============================
// ===================================================================

async function showCreateGuildForm(player) {
    const form = new ModalFormData();
    form.title("§l§aTẠO BANG HỘI");
    form.textField("§fTên Bang Hội (3-15 ký tự, không dấu)", "Tên bang hội của bạn");

    const { formValues, canceled } = await form.show(player);
    if (canceled) return showGuildMainMenu(player);

    const guildName = formValues[0];
    if (!guildName || guildName.length < 3 || guildName.length > 15 || !/^[a-zA-Z0-9 ]+$/.test(guildName)) {
        player.sendMessage("§cTên bang hội không hợp lệ (3-15 ký tự, không ký tự đặc biệt).");
        return system.run(() => showCreateGuildForm(player));
    }
    const allGuilds = getAllGuildsData();
    if (allGuilds[guildName]) {
        player.sendMessage(`§cTên bang hội "${guildName}" đã tồn tại.`);
        return system.run(() => showCreateGuildForm(player));
    }

    allGuilds[guildName] = {
        owner: player.nameTag,
        members: { [player.nameTag]: 'owner' },
        bank: Array(getBankSlotsForGuild({ level: 1 })).fill(null),
        level: 1, xp: 0,
        motd: "Chào mừng đến với bang hội!",
        joinRequests: [],
        log: [`${player.nameTag} đã thành lập bang hội.`]
    };
    saveAllGuildsData(allGuilds);
    world.sendMessage(`§a[Bang Hội] §b${player.nameTag}§a đã thành lập bang hội mới: §e${guildName}!`);
    await showGuildDashboard(player, guildName);
}

async function showGuildList(player) {
    const allGuilds = getAllGuildsData();
    const guildNames = Object.keys(allGuilds);
    const form = new ActionFormData();
    form.title("§l§bDANH SÁCH BANG HỘI");

    if (guildNames.length === 0) {
        form.body("§7Hiện chưa có bang hội nào.");
        form.button("§0Quay lại");
    } else {
        form.body("§fChọn một bang hội để xem thông tin hoặc xin gia nhập.");
        guildNames.forEach(name => {
            const guild = allGuilds[name];
            const memberCount = Object.keys(guild.members).length;
            const maxMembers = getMaxMembersForGuild(guild);
            form.button(`§f${name}\n§7Chủ bang: ${guild.owner} §8|§7 TV: ${memberCount}/${maxMembers}`);
        });
    }

    const { selection, canceled } = await form.show(player);
    if (canceled || (guildNames.length === 0 && selection === 0)) return showNoGuildMenu(player);
    if (guildNames.length > 0) await showGuildPublicInfo(player, guildNames[selection]);
}

async function showGuildPublicInfo(player, guildName) {
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData) {
        player.sendMessage("§cBang hội này không còn tồn tại.");
        return showGuildList(player);
    }
    const maxMembers = getMaxMembersForGuild(guildData);

    const form = new ActionFormData();
    form.title(`§l§2BANG HỘI: ${guildName}`);
    let body = `§eChủ bang: §f${guildData.owner}\n`;
    body += `§aThành viên: §f${Object.keys(guildData.members).length}/${maxMembers}\n\n`;
    body += `§6Thông báo:\n§f${guildData.motd || "Bang hội này chưa có thông báo."}`;
    form.body(body);

    form.button("§a§lGửi Yêu Cầu Gia Nhập");
    form.button("§0Quay lại danh sách");

    const { selection } = await form.show(player);
    if (selection === 1) return showGuildList(player);

    if (selection === 0) {
        if (guildData.joinRequests?.includes(player.nameTag)) return player.sendMessage("§eBạn đã gửi yêu cầu tới bang hội này rồi.");
        if (!guildData.joinRequests) guildData.joinRequests = [];
        
        guildData.joinRequests.push(player.nameTag);
        saveAllGuildsData(allGuilds);
        player.sendMessage(`§aĐã gửi yêu cầu gia nhập tới bang hội §e${guildName}§a.`);
        
        for (const memberName in guildData.members) {
            const role = guildData.members[memberName];
            if (role === 'owner' || role === 'officer') {
                const member = world.getPlayers({ name: memberName })[0];
                if (member) member.sendMessage(`§e[Bang Hội] Người chơi §b${player.nameTag}§e vừa gửi yêu cầu xin gia nhập!`);
            }
        }
    }
}

async function showInviteMenu(player, guildName) {
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    const maxMembers = getMaxMembersForGuild(guildData);

    if (!guildData) return player.sendMessage("§cKhông tìm thấy bang hội.");
    if (Object.keys(guildData.members).length >= maxMembers) return player.sendMessage("§cBang hội đã đủ thành viên.");

    const nearbyPlayers = world.getPlayers().filter(p => {
        if (p.nameTag === player.nameTag || getPlayerGuildName(p) || p.dimension.id !== player.dimension.id) return false;
        const distance = Vector.magnitude(Vector.subtract(player.location, p.location));
        return distance <= GUILD_INVITE_RADIUS;
    });

    if (nearbyPlayers.length === 0) return player.sendMessage("§cKhông có người chơi nào (chưa có bang) ở gần để mời.");

    const form = new ActionFormData();
    form.title("§l§bMỜI THÀNH VIÊN");
    form.body("§fChọn người chơi để gửi lời mời trực tiếp.");
    nearbyPlayers.forEach(p => form.button(`§f${p.nameTag}`));
    
    const { selection, canceled } = await form.show(player);
    if (canceled) return showGuildDashboard(player, guildName);

    const targetPlayer = nearbyPlayers[selection];
    if (!targetPlayer?.isValid) return player.sendMessage("§cNgười chơi này không còn online.");

    player.sendMessage(`§aĐang gửi lời mời tới §b${targetPlayer.nameTag}§a...`);
    const inviteForm = new MessageFormData();
    inviteForm.title("§l§2LỜI MỜI VÀO BANG HỘI");
    inviteForm.body(`§fNgười chơi §b${player.nameTag}§f mời bạn gia nhập bang hội\n§l§e${guildName}§r\n\nBạn có muốn tham gia không?`);
    inviteForm.button1("§a§lĐồng ý");
    inviteForm.button2("§cTừ chối");

    const { selection: inviteSelection, canceled: inviteCanceled } = await inviteForm.show(targetPlayer);
    const currentGuilds = getAllGuildsData();
    const currentGuildData = currentGuilds[guildName];

    if (!currentGuildData) {
        player.sendMessage("§cBang hội đã bị giải tán trong lúc bạn mời.");
        return targetPlayer.sendMessage("§cBang hội bạn được mời đã bị giải tán.");
    }

    if (inviteCanceled || inviteSelection === 1) {
        return player.sendMessage(`§c${targetPlayer.nameTag} đã từ chối lời mời của bạn.`);
    }

    const currentMaxMembers = getMaxMembersForGuild(currentGuildData);
    if (Object.keys(currentGuildData.members).length >= currentMaxMembers) {
        player.sendMessage(`§cBang hội §e${guildName}§c đã đủ thành viên.`);
        return targetPlayer.sendMessage(`§cRất tiếc, bang hội §e${guildName}§c đã đủ thành viên.`);
    }

    currentGuildData.members[targetPlayer.nameTag] = 'member';
    saveAllGuildsData(currentGuilds);
    for (const memberName in currentGuildData.members) {
        const member = world.getPlayers({ name: memberName })[0];
        if (member) member.sendMessage(`§a[Bang Hội] §b${targetPlayer.nameTag}§a vừa gia nhập bang!`);
    }
}

// ===================================================================
// === QUẢN LÝ BANG HỘI & THÀNH VIÊN =================================
// ===================================================================

export async function showMemberList(player, guildName) {
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData) return showGuildMainMenu(player);

    const playerRole = guildData.members[player.nameTag];
    const isOwner = playerRole === 'owner';
    const maxMembers = getMaxMembersForGuild(guildData);

    const form = new ActionFormData();
    form.title("§l§2THÀNH VIÊN BANG HỘI");
    const memberNames = Object.keys(guildData.members);
    form.body(`§fDanh sách thành viên (${memberNames.length}/${maxMembers})`);

    memberNames.sort((a, b) => {
        const roles = { owner: 0, officer: 1, member: 2 };
        return (roles[guildData.members[a]] || 3) - (roles[guildData.members[b]] || 3);
    });

    // --- BẮT ĐẦU THAY ĐỔI LỚN ---
    for (const name of memberNames) {
        const role = guildData.members[name];
        const translatedRole = ROLE_TRANSLATIONS[role] || role;
        
        const memberPlayer = world.getPlayers({ name: name })[0]; // Thử tìm người chơi online

        let buttonText = `§f${name} §7- §e${translatedRole}\n`;

        if (memberPlayer) {
            // Nếu người chơi đang online
            const healthComp = memberPlayer.getComponent("health");
            const currentHealth = Math.round(healthComp.currentValue);
            const maxHealth = healthComp.effectiveMax;
            
            const stats = getPlayerStats(memberPlayer); // Lấy stats từ main.js
            const level = stats.level;
            const playerClass = CLASS_TRANSLATIONS[stats.class] || "Chưa chọn";
            
            buttonText += `§a● Online §8| §bCấp ${level} ${playerClass} §8| §c♥ ${currentHealth}/${maxHealth}`;
        } else {
            // Nếu người chơi offline
            buttonText += `§c● Offline`;
        }
        form.button(buttonText);
    }
    // --- KẾT THÚC THAY ĐỔI LỚN ---

    const { selection, canceled } = await form.show(player);
    if (canceled) return showGuildDashboard(player, guildName);

    const selectedMemberName = memberNames[selection];
    if (isOwner && selectedMemberName !== player.nameTag) {
        await showMemberManagementMenu(player, guildName, selectedMemberName);
    }
}

async function showMemberManagementMenu(player, guildName, memberName) {
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData || !guildData.members[memberName]) {
         player.sendMessage("§cNgười chơi này không còn trong bang hội.");
         return showMemberList(player, guildName);
    }
    const memberRole = guildData.members[memberName];

    const form = new ActionFormData();
    form.title(`§l§cQUẢN LÝ: ${memberName}`);
  form.body(`§fVai trò hiện tại: §e${ROLE_TRANSLATIONS[memberRole] || memberRole}`); // Dòng mới

    if (memberRole === 'member') form.button("§aThăng chức lên Sĩ Quan (Officer)");
    else if (memberRole === 'officer') form.button("§cGiáng chức xuống Thành Viên (Member)");
    
    form.button("§4Kích Khỏi Bang");
    form.button("§0Quay lại");

    const { selection, canceled } = await form.show(player);
    if (canceled) return showMemberList(player, guildName);

    const currentGuilds = getAllGuildsData();
    if (!currentGuilds[guildName]) return showGuildMainMenu(player);

    if (selection === 0) {
        const newRole = memberRole === 'member' ? 'officer' : 'member';
        currentGuilds[guildName].members[memberName] = newRole;
        player.sendMessage(`§aĐã ${newRole === 'officer' ? 'thăng chức' : 'giáng chức'} §b${memberName}§a.`);
        const targetPlayer = world.getPlayers({ name: memberName })[0];
        if (targetPlayer) targetPlayer.sendMessage(`§e[Bang Hội] Bạn đã được ${newRole === 'officer' ? 'thăng chức' : 'giáng chức'}.`);
    } else if (selection === 1) {
        delete currentGuilds[guildName].members[memberName];
        player.sendMessage(`§eBạn đã kích §b${memberName}§e khỏi bang hội.`);
        const kickedPlayer = world.getPlayers({ name: memberName })[0];
        if (kickedPlayer) kickedPlayer.sendMessage(`§cBạn đã bị chủ bang kích khỏi bang hội ${guildName}.`);
    } else {
        return showMemberList(player, guildName);
    }
    
    saveAllGuildsData(currentGuilds);
    await showMemberList(player, guildName);
}

async function showGuildManagementMenu(player, guildName) {
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    const form = new ActionFormData();
    form.title("§l§cQUẢN LÝ BANG HỘI");
    form.body("§fCác hành động này có thể ảnh hưởng lớn đến bang hội.");

    form.button("§dChỉnh sửa Thông Báo", "textures/ui/edit_box.png");
    const hasGuildHomePerk = getGuildPerkValue(guildData, 'guild_home', false);
    if (hasGuildHomePerk) form.button("§bQuản lý Điểm Dịch Chuyển", "textures/blocks/lodestone_top.png");
    
    form.button("§eChuyển Quyền Chủ Bang", "textures/ui/crown_item.png");
    form.button("§4§lGIẢI TÁN BANG HỘI", "textures/ui/realms_red_x.png");
    form.button("§0Quay Lại", "textures/ui/undo.png");

    const { selection, canceled } = await form.show(player);
    if (canceled) return showGuildDashboard(player, guildName);

    let actionIndex = 0;
    if (selection === actionIndex++) await showEditMotdMenu(player, guildName);
    else if (hasGuildHomePerk && selection === actionIndex++) await showGuildHomeManagement(player, guildName);
    else if (selection === actionIndex++) await showTransferOwnershipMenu(player, guildName);
    else if (selection === actionIndex++) await showDisbandConfirmMenu(player, guildName);
    else return showGuildDashboard(player, guildName);
}

async function showTransferOwnershipMenu(player, guildName) {
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData) return showGuildMainMenu(player);

    const members = Object.keys(guildData.members).filter(name => name !== player.nameTag);
    if (members.length === 0) {
        player.sendMessage("§cKhông có thành viên nào khác để chuyển quyền.");
        return showGuildManagementMenu(player, guildName);
    }

    const form = new ActionFormData();
    form.title("§l§eCHUYỂN QUYỀN CHỦ BANG");
    form.body("§cCHÚ Ý:§f Hành động này không thể hoàn tác. Bạn sẽ trở thành Sĩ Quan.");
    members.forEach(name => form.button(`§f${name}`));
    
    const { selection, canceled } = await form.show(player);
    if (canceled) return showGuildManagementMenu(player, guildName);
    
    const newOwnerName = members[selection];
    const currentGuilds = getAllGuildsData();
    if (!currentGuilds[guildName]) return showGuildMainMenu(player);

    currentGuilds[guildName].owner = newOwnerName;
    currentGuilds[guildName].members[newOwnerName] = 'owner';
    currentGuilds[guildName].members[player.nameTag] = 'officer';
    saveAllGuildsData(currentGuilds);
    world.sendMessage(`§e[Bang Hội] §b${player.nameTag}§e đã chuyển quyền chủ bang §b${guildName}§e cho §b${newOwnerName}§e.`);
    await showGuildDashboard(player, guildName);
}

async function showDisbandConfirmMenu(player, guildName) {
    const form = new MessageFormData();
    form.title("§l§4GIẢI TÁN BANG HỘI");
    form.body("§4§lCẢNH BÁO!!!§r\nBạn có thực sự muốn giải tán bang hội không? Mọi thành viên sẽ bị kích, kho đồ sẽ bị xóa vĩnh viễn. HÀNH ĐỘNG NÀY KHÔNG THỂ HOÀN TÁC.");
    form.button1("§aKhông, tôi đã suy nghĩ lại");
    form.button2("§4§lĐồng ý Giải Tán");

    const { selection } = await form.show(player);
    if (selection === 1) {
        const allGuilds = getAllGuildsData();
        const guildData = allGuilds[guildName];
        if (guildData) {
            for (const memberName in guildData.members) {
                const member = world.getPlayers({ name: memberName })[0];
                if (member && member.nameTag !== player.nameTag) {
                    member.sendMessage(`§cBang hội của bạn, ${guildName}, đã bị chủ bang giải tán!`);
                }
            }
        }
        delete allGuilds[guildName];
        saveAllGuildsData(allGuilds);
        world.sendMessage(`§c[Bang Hội] Bang hội §e${guildName}§c đã bị giải tán bởi chủ bang.`);
        await showGuildMainMenu(player);
    } else {
        await showGuildManagementMenu(player, guildName);
    }
}

async function showLeaveGuildConfirm(player, guildName) {
    const form = new MessageFormData();
    form.title("§l§cRỜI BANG HỘI");
    form.body(`Bạn có chắc chắn muốn rời khỏi bang hội §e${guildName}§c?`);
    form.button1("§aỞ lại");
    form.button2("§4Đồng ý rời");

    const { selection } = await form.show(player);
    if (selection === 1) {
        const allGuilds = getAllGuildsData();
        const guildData = allGuilds[guildName];
        if (!guildData) return showGuildMainMenu(player);

        if (guildData.owner === player.nameTag) {
            if (Object.keys(guildData.members).length > 1) {
                const potentialNewOwner = Object.keys(guildData.members).filter(name => name !== player.nameTag)
                    .sort((a, b) => ({ officer: 0, member: 1 }[guildData.members[a]] || 2) - ({ officer: 0, member: 1 }[guildData.members[b]] || 2))[0];
                
                if (potentialNewOwner) {
                    guildData.owner = potentialNewOwner;
                    guildData.members[potentialNewOwner] = 'owner';
                    delete guildData.members[player.nameTag];
                    saveAllGuildsData(allGuilds);
                    world.sendMessage(`§e[Bang Hội] Chủ bang §b${player.nameTag}§e đã rời đi, quyền lực được chuyển giao cho §b${potentialNewOwner}§e.`);
                    player.sendMessage(`§eBạn đã rời khỏi bang hội ${guildName} và quyền chủ bang đã được tự động chuyển giao.`);
                    await showGuildMainMenu(player);
                    return;
                }
            }
            delete allGuilds[guildName];
            world.sendMessage(`§e[Bang Hội] Bang hội §c${guildName}§e đã bị giải tán do thành viên cuối cùng đã rời đi.`);
        } else {
            delete guildData.members[player.nameTag];
            for (const name in guildData.members) {
                 const member = world.getPlayers({ name: name })[0];
                 if (member) member.sendMessage(`§e[Bang Hội] §b${player.nameTag}§e đã rời khỏi bang.`);
            }
        }
        saveAllGuildsData(allGuilds);
        player.sendMessage(`§eBạn đã rời khỏi bang hội ${guildName}.`);
        await showGuildMainMenu(player);
    } else {
        await showGuildDashboard(player, guildName);
    }
}

// ===================================================================
// === CÁC TÍNH NĂNG MỚI (Perks, Requests, MOTD, Home) ================
// ===================================================================

// Thay thế toàn bộ hàm cũ bằng hàm này

async function showGuildPerksMenu(player, guildName) {
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData) return showGuildMainMenu(player);

    const playerRole = guildData.members[player.nameTag];

    // ----- SỬA LỖI LOGIC -----
    // 1. CHÚNG TA KHÔNG TỰ ĐỘNG RESET NỮA. CHỈ KIỂM TRA NẾU CHƯA CÓ NHIỆM VỤ THÔI
    let didUpdate = false;
    if (!guildData.currentQuests || guildData.currentQuests.length === 0) {
        // Chỉ gán nhiệm vụ mới khi danh sách đang trống
        didUpdate = checkAndAssignGuildQuests(guildName, guildData); 
    }
    if (didUpdate) saveAllGuildsData(allGuilds); // Lưu lại nếu có gán nhiệm vụ mới

    const form = new ActionFormData();
    form.title("§l§6LỢI ÍCH & NHIỆM VỤ");

    let body = `§eCấp Bang Hội: §f${guildData.level}\n\n`;
    body += "§6§lNhiệm Vụ Tuần Này:\n";
    
    // Phần hiển thị nhiệm vụ không đổi, vẫn rất tốt
    if (!guildData.currentQuests || guildData.currentQuests.length === 0) {
        body += "§7Chưa có nhiệm vụ nào. Chủ bang hoặc Sĩ quan cần bắt đầu.\n";
    } else {
        guildData.currentQuests.forEach(activeQuest => {
            const questInfo = CONFIG.GUILD_QUESTS.QUEST_POOL.find(q => q.id === activeQuest.id);
            if (questInfo) {
                const progress = Math.min(activeQuest.progress, questInfo.amount);
                const progressBar = createProgressBar(progress, questInfo.amount, 10, "█", "░", "§a", "§7");
                const status = activeQuest.completed ? "§a§l(Hoàn thành)" : `§e(${progress}/${questInfo.amount})`;
                body += `§f- ${questInfo.title} ${status}\n`;
                body += `  §7§o${questInfo.description}\n`;
                body += `  ${progressBar} §d(XP: ${questInfo.rewardXp})\n\n`;
            }
        });
        
        const resetIntervalTicks = CONFIG.GUILD_QUESTS.RESET_INTERVAL_HOURS * 3600 * 20;
        const lastReset = guildData.questResetTick || 0;
        const nextResetTicks = (lastReset + resetIntervalTicks) - system.currentTick;
        if (nextResetTicks > 0) {
            const hours = Math.floor(nextResetTicks / (3600 * 20));
            const minutes = Math.floor((nextResetTicks % (3600 * 20)) / (60*20));
            body += `§8(Có thể làm mới sau ${hours} giờ ${minutes} phút)\n`;
        }
    }
    // ... Phần hiển thị lợi ích và lợi ích tiếp theo vẫn giữ nguyên, code đã tốt ...
    // Phần này tôi sẽ copy y hệt từ file của bạn để đảm bảo tính đầy đủ
    body += "\n§a§lCác Lợi Ích Đã Mở Khóa:\n";
    let hasPerks = false;
    for (let i = 1; i <= guildData.level; i++) {
        const perk = CONFIG.GUILD_LEVELING.PERKS[i];
        if (perk) {
            hasPerks = true;
            body += `§f- [Cấp ${i}] ${perk.description}\n`;
        }
    }
    if (!hasPerks) body += "§7Chưa có lợi ích nào.\n";

    const nextLevel = guildData.level + 1;
    const nextPerk = CONFIG.GUILD_LEVELING.PERKS[nextLevel];
    if (nextPerk) {
        body += `\n§b§lLợi ích tiếp theo (Cấp ${nextLevel}):\n`;
        body += `§f- ${nextPerk.description}`;
    }

    form.body(body);

    if (playerRole === 'owner' || playerRole === 'officer') {
        form.button("§e§lBắt đầu/Làm mới Nhiệm vụ Tuần");
    }
    form.button("§0Quay lại Dashboard");

    const { selection, canceled } = await form.show(player);
    if (canceled) return showGuildDashboard(player, guildName);

    if ((playerRole === 'owner' || playerRole === 'officer') && selection === 0) {
        // 2. LOGIC BẤM NÚT LÀM MỚI (PHẦN NÀY ĐÃ ĐÚNG)
        const currentGuilds = getAllGuildsData();
        const currentGuildData = currentGuilds[guildName];
        
        const resetIntervalTicks = CONFIG.GUILD_QUESTS.RESET_INTERVAL_HOURS * 3600 * 20;
        const lastReset = currentGuildData.questResetTick || 0;

        if (system.currentTick < lastReset + resetIntervalTicks && currentGuildData.currentQuests && currentGuildData.currentQuests.length > 0) {
            const remainingTicks = (lastReset + resetIntervalTicks) - system.currentTick;
            const hours = Math.floor(remainingTicks / (3600 * 20));
            const minutes = Math.floor((remainingTicks % (3600 * 20)) / (60*20));
            player.sendMessage(`§cBạn cần đợi thêm §e${hours} giờ ${minutes} phút§c nữa để làm mới nhiệm vụ.`);
            return showGuildPerksMenu(player, guildName);
        }

        // Chỉ khi thời gian đã hết, HOẶC khi danh sách nhiệm vụ trống, mới cho phép làm mới
        const refreshed = checkAndAssignGuildQuests(guildName, currentGuildData, true); // Dùng forceReset = true
        saveAllGuildsData(currentGuilds);
        
        if (refreshed) {
            for (const memberName in currentGuildData.members) {
                const member = world.getPlayers({ name: memberName })[0];
                if(member) member.sendMessage("§a[Bang Hội] Nhiệm vụ hàng tuần đã được làm mới!");
            }
        }
        
        return showGuildPerksMenu(player, guildName);
    } else {
        return showGuildDashboard(player, guildName);
    }
}

// Thêm hàm createProgressBar vào file này để sử dụng
function createProgressBar(current, max, length = 10, fullChar = "█", emptyChar = "░", fullColor = "§a", emptyColor = "§7") {
    if (max === 0) return `${fullColor}[${fullChar.repeat(length)}]`;
    const percentage = Math.max(0, Math.min(1, current / max));
    const fullCount = Math.round(percentage * length);
    const emptyCount = length - fullCount;
    return `${fullColor}${fullChar.repeat(fullCount)}${emptyColor}${emptyChar.repeat(emptyCount)}`;
}

async function showJoinRequestsMenu(player, guildName) {
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    const requests = guildData.joinRequests || [];
    const maxMembers = getMaxMembersForGuild(guildData);

    const form = new ActionFormData();
    form.title("§l§dYÊU CẦU GIA NHẬP");
    if (requests.length === 0) form.body("§7Không có yêu cầu nào.");
    else {
        form.body("§fChọn một người chơi để xét duyệt.");
        requests.forEach(playerName => form.button(`§f${playerName}`));
    }
    form.button("§0Quay lại");

    const { selection, canceled } = await form.show(player);
    if (canceled || selection === requests.length) return showGuildDashboard(player, guildName);

    const targetName = requests[selection];
    const decisionForm = new MessageFormData();
    decisionForm.title(`§lXÉT DUYỆT: ${targetName}`);
    decisionForm.body(`Bạn muốn chấp nhận hay từ chối yêu cầu của §b${targetName}§f?`);
    decisionForm.button1("§aChấp Nhận");
    decisionForm.button2("§cTừ Chối");
    
    const { selection: decision } = await decisionForm.show(player);
    const currentGuilds = getAllGuildsData();
    const currentGuildData = currentGuilds[guildName];
    currentGuildData.joinRequests = (currentGuildData.joinRequests || []).filter(name => name !== targetName);

    if (decision === 0) { // Chấp nhận
        if (Object.keys(currentGuildData.members).length >= maxMembers) {
            return player.sendMessage("§cKhông thể chấp nhận, bang hội đã đủ thành viên.");
        }
        currentGuildData.members[targetName] = 'member';
        for (const memberName in currentGuildData.members) {
            const member = world.getPlayers({ name: memberName })[0];
            if (member) member.sendMessage(`§a[Bang Hội] §b${targetName}§a vừa được chấp nhận vào bang!`);
        }
        const targetPlayer = world.getPlayers({ name: targetName })[0];
        if(targetPlayer) targetPlayer.sendMessage(`§aYêu cầu của bạn đã được chấp nhận! Chào mừng đến với bang §e${guildName}§a.`);
    } else {
        player.sendMessage(`§eĐã từ chối yêu cầu của §b${targetName}§e.`);
    }
    saveAllGuildsData(currentGuilds);
    await showJoinRequestsMenu(player, guildName);
}

async function showEditMotdMenu(player, guildName) {
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    const form = new ModalFormData();
    form.title("§l§dCHỈNH SỬA THÔNG BÁO");
    
    // DÒNG BỊ LỖI
    // form.textField("§fNhập thông báo mới (tối đa 100 ký tự)", "Thông báo...", guildData.motd || "");

    // SỬA THÀNH DÒNG NÀY (dùng 2 tham số)
    form.textField("§fNhập thông báo mới (tối đa 100 ký tự)", guildData.motd || "Thông báo...");

    const { formValues, canceled } = await form.show(player);
    if(canceled) return showGuildManagementMenu(player, guildName);

    const newMotd = formValues[0].substring(0, 100);
    guildData.motd = newMotd;
    saveAllGuildsData(allGuilds);
    player.sendMessage("§aĐã cập nhật thông báo bang hội.");
    await showGuildDashboard(player, guildName);
}

async function showGuildHomeManagement(player, guildName) {
    const form = new ActionFormData();
    form.title("§l§bĐIỂM DỊCH CHUYỂN");
    form.body("§fQuản lý điểm dịch chuyển chung cho cả bang hội.");
    form.button("§aĐặt Điểm Dịch Chuyển tại đây");
    form.button("§cXóa Điểm Dịch Chuyển");
    const { selection } = await form.show(player);

    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData) return;

    if (selection === 0) {
        guildData.homeLocation = { x: player.location.x, y: player.location.y, z: player.location.z, dimensionId: player.dimension.id };
        saveAllGuildsData(allGuilds);
        player.sendMessage("§aĐã đặt thành công điểm dịch chuyển bang hội tại vị trí của bạn!");
    } else if (selection === 1) {
        delete guildData.homeLocation;
        saveAllGuildsData(allGuilds);
        player.sendMessage("§eĐã xóa điểm dịch chuyển của bang hội.");
    }
}

function teleportToGuildHome(player, guildName) {
    const guildData = getAllGuildsData()[guildName];
    if (guildData?.homeLocation) {
        const { x, y, z, dimensionId } = guildData.homeLocation;
        player.teleport({ x, y, z }, { dimension: world.getDimension(dimensionId) });
        player.playSound("entity.enderman.teleport");
    } else {
        player.sendMessage("§cBang hội chưa có điểm dịch chuyển.");
    }
}

// ===================================================================
// === KHO BANG HỘI & CHAT ===========================================
// ===================================================================

async function showGuildBankMenu(player, guildName) {
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData) return showGuildMainMenu(player);

    const bankItems = (guildData.bank || []).map(itemData => deserializeItem(itemData));
    const totalSlots = getBankSlotsForGuild(guildData);
    
    const form = new ActionFormData();
    form.title("§l§6KHO BANG HỘI");
    let body = `§fKho chứa đồ chung của bang hội (${bankItems.filter(i => i).length}/${totalSlots} ô).\n\n`;
    if (bankItems.filter(i => i).length === 0) body += "§7Kho bang hội hiện đang trống.";
    form.body(body);
    
    form.button("§aGửi Vật Phẩm", "textures/ui/move_icon.png");
    form.button("§cRút Vật Phẩm", "textures/ui/grab_icon.png");
    form.button("§0Quay Lại", "textures/ui/undo.png");

    const { selection, canceled } = await form.show(player);
    if (canceled) return showGuildDashboard(player, guildName);
    if (selection === 0) await showDepositMenu(player, guildName);
    if (selection === 1) await showWithdrawMenu(player, guildName);
    if (selection === 2) return showGuildDashboard(player, guildName);
}

async function showDepositMenu(player, guildName) {
    const inventory = player.getComponent("inventory").container;
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData) return showGuildMainMenu(player);
    
    const totalSlots = getBankSlotsForGuild(guildData);
    const usedSlots = (guildData.bank || []).filter(i => i).length;

    if (usedSlots >= totalSlots) {
        player.sendMessage("§cKho bang hội đã đầy!");
        return showGuildBankMenu(player, guildName);
    }
    
    const form = new ActionFormData();
    form.title("§l§aGỬI VẬT PHẨM");
    form.body("§fChọn vật phẩm từ túi đồ của bạn để gửi vào kho.");

    const itemMap = new Map();
    for (let i = 0; i < inventory.size; i++) {
        const item = inventory.getItem(i);
        if (item) {
            form.button(`§f${item.nameTag ?? item.typeId.replace('minecraft:', '')} §7(x${item.amount})\n§8Slot: ${i}`);
            itemMap.set(itemMap.size, i);
        }
    }

    if (itemMap.size === 0) {
        player.sendMessage("§cTúi đồ của bạn trống!");
        return;
    }

    const { selection, canceled } = await form.show(player);
    if (canceled) return showGuildBankMenu(player, guildName);

    const inventorySlot = itemMap.get(selection);
    const itemToDeposit = inventory.getItem(inventorySlot);
    
    const currentGuilds = getAllGuildsData();
    const currentGuildData = currentGuilds[guildName];
    if (!currentGuildData) return;

    // --- LOGIC GỬI ĐỒ ĐƯỢC ĐƠN GIẢN HÓA ---
    if (!currentGuildData.bank) currentGuildData.bank = [];
    
    // Tìm một ô trống trong mảng
    let emptySlotIndex = currentGuildData.bank.findIndex(slot => slot === null);
    
    // Nếu không có ô trống nào trong phạm vi đã có, nhưng vẫn còn chỗ, thì push vào cuối
    if (emptySlotIndex === -1 && currentGuildData.bank.length < totalSlots) {
        emptySlotIndex = currentGuildData.bank.length;
    }

    if (emptySlotIndex !== -1) {
        currentGuildData.bank[emptySlotIndex] = serializeItem(itemToDeposit);
        inventory.setItem(inventorySlot, undefined); // Xóa vật phẩm khỏi túi đồ
        saveAllGuildsData(currentGuilds);
        player.sendMessage(`§aĐã gửi §e${itemToDeposit.nameTag ?? itemToDeposit.typeId} (x${itemToDeposit.amount})§a vào kho.`);
    } else {
        player.sendMessage("§cKho bang hội đã đầy!");
    }
    
    await showGuildBankMenu(player, guildName);
}

async function showWithdrawMenu(player, guildName) {
    const form = new ActionFormData();
    form.title("§l§cRÚT VẬT PHẨM");
    form.body("§fChọn vật phẩm để rút từ kho về túi đồ của bạn.");

    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData) return showGuildMainMenu(player);
    const bankItems = (guildData.bank || []).map(itemData => deserializeItem(itemData));
    
    const slotMap = new Map();
    bankItems.forEach((item, index) => {
        if (item) {
            form.button(`§f${item.nameTag ?? item.typeId.replace('minecraft:', '')} §7(x${item.amount})\n§8Slot Kho: ${index + 1}`);
            slotMap.set(slotMap.size, index);
        }
    });
    
    if (slotMap.size === 0) return player.sendMessage("§cKho bang hội trống!");

    const { selection, canceled } = await form.show(player);
    if (canceled) return showGuildBankMenu(player, guildName);
    
    const bankSlotIndex = slotMap.get(selection);
    const itemToWithdraw = bankItems[bankSlotIndex];
    const inventory = player.getComponent("inventory").container;
    const leftover = inventory.addItem(itemToWithdraw);

    if (!leftover) {
        const currentGuilds = getAllGuildsData();
        if (currentGuilds[guildName]) {
            currentGuilds[guildName].bank[bankSlotIndex] = null;
            saveAllGuildsData(currentGuilds);
            player.sendMessage(`§aĐã rút §e${itemToWithdraw.nameTag ?? itemToWithdraw.typeId} (x${itemToWithdraw.amount})§a.`);
        }
    } else {
        player.sendMessage("§cTúi đồ của bạn đã đầy!");
    }
    await showGuildBankMenu(player, guildName);
}

/**
 * Cập nhật tiến độ cho nhiệm vụ giao dịch của Bang hội.
 * @param {import("@minecraft/server").Player} player Người chơi thực hiện giao dịch.
 * @param {import("@minecraft/server").Entity} targetEntity Dân làng mà người chơi giao dịch.
 */
export function updateGuildTradeQuestProgress(player, targetEntity) {
    const guildName = getPlayerGuildName(player);
    if (!guildName) return;

    // Chỉ thực hiện khi giao dịch với villager
    if (targetEntity.typeId !== "minecraft:villager") return;
    
    const allGuilds = getAllGuildsData();
    const guildData = allGuilds[guildName];
    if (!guildData || !guildData.currentQuests) return;

    // Tìm xem có nhiệm vụ giao dịch nào đang hoạt động không
    for (const activeQuest of guildData.currentQuests) {
        if (activeQuest.completed) continue;

        const questInfo = CONFIG.GUILD_QUESTS.QUEST_POOL.find(q => q.id === activeQuest.id);
        
        // Nếu đúng là nhiệm vụ TRADE thì cập nhật tiến độ
        if (questInfo && questInfo.type === "TRADE") {
            activeQuest.progress += 1; // Mỗi lần tương tác (mở giao diện) là +1 tiến độ
            
            // Thông báo cho người chơi trên action bar
            const playerMember = world.getPlayers({ name: player.nameTag })[0];
            if(playerMember) playerMember.onScreenDisplay.setActionBar(`§2[NV Bang] ${questInfo.title}: ${activeQuest.progress}/${questInfo.amount}`);

            // Kiểm tra xem đã hoàn thành chưa
            if (activeQuest.progress >= questInfo.amount) {
                activeQuest.completed = true;
                grantXpToGuild(guildName, questInfo.rewardXp);

                const message = `§a[Bang Hội] §b${player.nameTag}§a đã giúp hoàn thành nhiệm vụ giao dịch: §e${questInfo.title}!`;
                for (const memberName in guildData.members) {
                    const member = world.getPlayers({ name: memberName })[0];
                    if (member) member.sendMessage(message);
                }
            }
            saveAllGuildsData(allGuilds);
            break; // Dừng lại sau khi cập nhật
        }
    }
}