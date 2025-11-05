// file: quest_system.js - PHIÊN BẢN HOÀN CHỈNH CUỐI CÙNG

import { world, system, ItemStack } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { CONFIG } from "./config.js";
import { grantXpAndLevelUpCheck, showStatsMenu, logError } from './main.js';

const QUEST_COOLDOWN_TICKS = 5 * 60 * 20; // 15 phút

// === CÁC HÀM NỘI BỘ ===

/**
 * Đếm tiến độ nhiệm vụ dựa trên loại nhiệm vụ. (ĐÃ SỬA LỖI)
 * @param {import("@minecraft/server").Player} player
 * @param {object} quest
 * @returns {number}
 */
function countTargetProgress(player, quest) {
    const inventory = player.getComponent("inventory")?.container;
    if (!inventory) return 0;

    let count = 0;

    switch (quest.type) {
        case "CRAFT":
        case "COLLECT": {
            for (let i = 0; i < inventory.size; i++) {
                const item = inventory.getItem(i);
                if (item?.typeId === quest.target) {
                    if (quest.potion_type) {
                        const potion = item.getComponent("minecraft:potion");
                        if (potion?.potionId.includes(quest.potion_type)) {
                            count += item.amount;
                        }
                    } else {
                        count += item.amount;
                    }
                }
            }
            break;
        }

        case "COLLECT_TAG": {
            const validItemIds = CONFIG.ITEM_TAGS[quest.target] || [];
            for (let i = 0; i < inventory.size; i++) {
                const item = inventory.getItem(i);
                if (item && validItemIds.includes(item.typeId)) {
                    count += item.amount;
                }
            }
            break;
        }
        
        // ================== SỬA ĐỔI CHÍNH NẰM Ở ĐÂY ==================
        case "COLLECT_MULTIPLE": { // Sửa tên từ "CRAFT_MULTIPLE"
            let currentProgress = 0;
            // Lặp qua từng mục tiêu trong nhiệm vụ (ví dụ: cúp đá, sắt thô)
            for (const target of quest.targets) {
                // Đếm xem người chơi có bao nhiêu vật phẩm của mục tiêu đó
                const itemCount = countItemInInventory(player, target.id);
                // Cộng dồn vào tiến độ, nhưng không vượt quá số lượng yêu cầu
                // Ví dụ: cần 8 sắt, có 10 sắt -> chỉ tính là 8
                currentProgress += Math.min(itemCount, target.amount);
            }
            return currentProgress; // Trả về tiến độ chính xác
        }
        // =============================================================

        case "EXPLORE":
        case "KILL":
        case "KILL_TAG":
        case "BREED": // Thêm BREED vào đây để dùng logic của progress property
            return player.getDynamicProperty("dhh:questProgress") ?? 0;
    }

    return count;
}

/** Đếm một item cụ thể trong túi đồ */
function countItemInInventory(player, itemId) {
    const inventory = player.getComponent("inventory")?.container;
    if (!inventory) return 0;
    let total = 0;
    for (let i = 0; i < inventory.size; i++) {
        const item = inventory.getItem(i);
        if (item?.typeId === itemId) {
            total += item.amount;
        }
    }
    return total;
}

function getQuestFromId(questId) {
    for (const difficulty in CONFIG.QUESTS) {
        const foundQuest = CONFIG.QUESTS[difficulty].find(q => q.id === questId);
        if (foundQuest) return { ...foundQuest, difficulty };
    }
    return null;
}

function resetPlayerQuest(player, setCooldown = false) {
    player.setDynamicProperty("dhh:questId", undefined);
    player.setDynamicProperty("dhh:questProgress", undefined);
    player.setDynamicProperty("dhh:questCompletedNotified", undefined);
    player.setDynamicProperty("dhh:questExpireTime", undefined);

    if (setCooldown && !CONFIG.DEBUG_MODE) {
        const cooldownEndTime = system.currentTick + QUEST_COOLDOWN_TICKS;
        player.setDynamicProperty("dhh:questCooldownEnd", cooldownEndTime);
    }
}

/**
 * Trừ vật phẩm khi trả nhiệm vụ (ĐÃ SỬA LỖI)
 * @param {*} player 
 * @param {*} quest 
 * @returns {boolean}
 */
function removeItems(player, quest) {
    const inventory = player.getComponent("inventory")?.container;
    if (!inventory) return false;

    // Logic cho COLLECT và CRAFT không đổi
    if (quest.type === "COLLECT" || quest.type === "CRAFT") {
        let remaining = quest.amount;
        for (let i = 0; i < inventory.size && remaining > 0; i++) {
            const item = inventory.getItem(i);
            if (item?.typeId === quest.target) {
                let isMatch = true;
                if (quest.potion_type) {
                    const potion = item.getComponent("minecraft:potion");
                    if (!potion || !potion.potionId.includes(quest.potion_type)) {
                        isMatch = false;
                    }
                }
                if (isMatch) {
                    if (item.amount <= remaining) {
                        remaining -= item.amount;
                        inventory.setItem(i, undefined);
                    } else {
                        item.amount -= remaining;
                        inventory.setItem(i, item);
                        remaining = 0;
                    }
                }
            }
        }
        return remaining === 0;
    }
    
    // Logic cho COLLECT_TAG không đổi
    if (quest.type === "COLLECT_TAG") {
        const validItemIds = CONFIG.ITEM_TAGS[quest.target] || [];
        let remaining = quest.amount;
        for (let i = 0; i < inventory.size && remaining > 0; i++) {
            const item = inventory.getItem(i);
            if (item && validItemIds.includes(item.typeId)) {
                 if (item.amount <= remaining) {
                    remaining -= item.amount;
                    inventory.setItem(i, undefined);
                } else {
                    item.amount -= remaining;
                    inventory.setItem(i, item);
                    remaining = 0;
                }
            }
        }
        return remaining === 0;
    }
    
    // ================== SỬA ĐỔI CHÍNH NẰM Ở ĐÂY ==================
    if (quest.type === "COLLECT_MULTIPLE") { // Sửa tên từ "CRAFT_MULTIPLE"
        // Lặp qua từng mục tiêu để trừ đi
        for (const targetItem of quest.targets) {
            let remaining = targetItem.amount; // Số lượng cần trừ
             for (let i = 0; i < inventory.size && remaining > 0; i++) {
                const item = inventory.getItem(i);
                if (item?.typeId === targetItem.id) {
                    if (item.amount <= remaining) {
                        remaining -= item.amount;
                        inventory.setItem(i, undefined);
                    } else {
                        item.amount -= remaining;
                        inventory.setItem(i, item);
                        remaining = 0;
                    }
                }
            }
            // Nếu sau khi lặp hết túi đồ mà vẫn chưa trừ đủ một loại vật phẩm nào đó -> thất bại
            if (remaining > 0) return false;
        }
        // Nếu đã trừ đủ tất cả các loại -> thành công
        return true;
    }
    // =============================================================

    // Đối với các loại không cần trừ vật phẩm
    return true; 
}
function checkAndUnlockTier(player, completedDifficulty) {
    const tierUnlocked = player.getDynamicProperty("dhh:quest_tier_unlocked");

    if (completedDifficulty === 'EASY' && tierUnlocked < 2) {
        const easyCompleted = (player.getDynamicProperty("dhh:easy_quests_completed") ?? 0) + 1;
        player.setDynamicProperty("dhh:easy_quests_completed", easyCompleted);
        if (easyCompleted >= CONFIG.QUEST_UNLOCKS.NORMAL.required_count) {
            player.setDynamicProperty("dhh:quest_tier_unlocked", 2);
            player.sendMessage("§a§l[Thăng Hạng] §fBạn đã chứng tỏ được thực lực và mở khóa §eNhiệm Vụ Thường§f!");
            player.playSound("random.toast");
        }
    } else if (completedDifficulty === 'NORMAL' && tierUnlocked < 3) {
        const normalCompleted = (player.getDynamicProperty("dhh:normal_quests_completed") ?? 0) + 1;
        player.setDynamicProperty("dhh:normal_quests_completed", normalCompleted);
        if (normalCompleted >= CONFIG.QUEST_UNLOCKS.HARD.required_count) {
            player.setDynamicProperty("dhh:quest_tier_unlocked", 3);
            player.sendMessage("§a§l[Thăng Hạng] §fSức mạnh của bạn đã được công nhận! Mở khóa §cNhiệm Vụ Khó§f!");
            player.playSound("entity.wither.spawn");
        }
    }
}


function claimQuestRewards(player, quest) {
    if (!quest) return;
    
    const success = removeItems(player, quest);
    if (!success) {
        player.sendMessage("§cLỗi: Không đủ vật phẩm để trả nhiệm vụ!");
        return;
    }
    
    grantXpAndLevelUpCheck(player, quest.rewards.xp, `hoàn thành NV ${quest.title}`);

    if (quest.rewards.nguyen_thach > 0) {
    const currentNT = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
    const earnedNT = quest.rewards.nguyen_thach;
    player.setDynamicProperty("dhh:nguyen_thach", currentNT + earnedNT);
    player.sendMessage(`§d+${earnedNT} Nguyên Thạch`);
}

    const rewardPool = CONFIG.REWARD_POOLS[quest.rewards.itemPool];
    if (rewardPool && rewardPool.length > 0) {
        const randomIndex = Math.floor(Math.random() * rewardPool.length);
        const rewardItemFunction = rewardPool[randomIndex];
        const itemStack = rewardItemFunction();
        player.getComponent("inventory").container.addItem(itemStack);
        player.sendMessage(`§aBạn nhận được phần thưởng đặc biệt: §e${itemStack.nameTag ?? itemStack.type.id.replace('minecraft:', '')}!`);
    }
    
    checkAndUnlockTier(player, quest.difficulty);

    resetPlayerQuest(player, true); 
    player.playSound("random.toast");
    player.sendMessage("§a§lHoàn thành nhiệm vụ! §fHãy quay lại sau để nhận nhiệm vụ mới.");
}

async function showQuestBoard(player) {
    const rerollCooldownEnd = player.getDynamicProperty("dhh:quest_reroll_cooldown_end") ?? 0;
    const canReroll = system.currentTick >= rerollCooldownEnd;

    const form = new ActionFormData();
    form.title("§l§bBẢNG NHIỆM VỤ");

    const tierUnlocked = player.getDynamicProperty("dhh:quest_tier_unlocked") ?? 1;
    let availableQuestsPool = [];
    if (tierUnlocked >= 1) availableQuestsPool.push(...CONFIG.QUESTS.EASY);
    if (tierUnlocked >= 2) availableQuestsPool.push(...CONFIG.QUESTS.NORMAL);
    if (tierUnlocked >= 3) availableQuestsPool.push(...CONFIG.QUESTS.HARD);

    const cachedQuestsString = player.getDynamicProperty("dhh:quest_board_cache");
    let displayedQuests = cachedQuestsString ? JSON.parse(cachedQuestsString) : undefined;

    if (!displayedQuests || !Array.isArray(displayedQuests) || displayedQuests.length === 0) {
        const shuffled = availableQuestsPool.sort(() => 0.5 - Math.random());
        displayedQuests = shuffled.slice(0, CONFIG.QUESTS_PER_BOARD);
        
        player.setDynamicProperty("dhh:quest_board_cache", JSON.stringify(displayedQuests));
    }
    
    let body = "§fChọn một nhiệm vụ để bắt đầu cuộc phiêu lưu của bạn!\n\n";
    if (tierUnlocked === 1) {
        const easyCompleted = player.getDynamicProperty("dhh:easy_quests_completed") ?? 0;
        body += `§7Hoàn thành §e${CONFIG.QUEST_UNLOCKS.NORMAL.required_count - easyCompleted}§7 NV Dễ nữa để mở khóa NV Thường.\n`;
    } else if (tierUnlocked === 2) {
        const normalCompleted = player.getDynamicProperty("dhh:normal_quests_completed") ?? 0;
        body += `§7Hoàn thành §e${CONFIG.QUEST_UNLOCKS.HARD.required_count - normalCompleted}§7 NV Thường nữa để mở khóa NV Khó.\n`;
    }
    form.body(body);
    
    displayedQuests.forEach(quest => {
        const questFullData = getQuestFromId(quest.id);
        const difficulty = questFullData.difficulty;
        const duration = CONFIG.QUEST_DURATIONS_MINUTES[difficulty];
        form.button(`§l${quest.title}\n§r§8(XP: ${quest.rewards.xp} | Thời gian: ${duration} phút)`);
    });

    if (canReroll) {
        form.button("§eLàm mới danh sách\n§8(Miễn phí)");
    } else {
        const remainingSeconds = Math.ceil((rerollCooldownEnd - system.currentTick) / 20);
        form.button(`§m§7Làm mới danh sách\n§8(Chờ ${remainingSeconds}s)`);
    }
    form.button("§7Quay lại");

    const response = await form.show(player);
    if (response.canceled) return showStatsMenu(player);

    const selection = response.selection;
    if (selection < displayedQuests.length) {
        const selectedQuest = displayedQuests[selection];
        const fullQuestData = getQuestFromId(selectedQuest.id);
        
        player.setDynamicProperty("dhh:questId", selectedQuest.id);
        player.setDynamicProperty("dhh:questProgress", 0);
        if(selectedQuest.type !== 'KILL' && selectedQuest.type !== 'KILL_TAG') {
            player.setDynamicProperty("dhh:questCompletedNotified", false);
        }

        if (!CONFIG.DEBUG_MODE) {
            const durationInMinutes = CONFIG.QUEST_DURATIONS_MINUTES[fullQuestData.difficulty];
            const expireTime = system.currentTick + (durationInMinutes * 60 * 20);
            player.setDynamicProperty("dhh:questExpireTime", expireTime);
        }

        player.setDynamicProperty("dhh:quest_board_cache", undefined);
        player.sendMessage(`§aĐã nhận nhiệm vụ mới: §f[${selectedQuest.title}]`);
        player.sendMessage(`§eMục tiêu: §f${selectedQuest.description}`);
        player.playSound("note.pling");
    } else if (selection === displayedQuests.length) {
        if (canReroll) {
            player.setDynamicProperty("dhh:quest_board_cache", undefined);
            const newCooldown = system.currentTick + (CONFIG.QUEST_REROLL_COOLDOWN_SECONDS * 20);
            player.setDynamicProperty("dhh:quest_reroll_cooldown_end", newCooldown);
            player.playSound("random.pop");
            system.run(() => showQuestBoard(player));
        } else {
            player.sendMessage("§cBạn cần chờ một chút trước khi làm mới danh sách!");
            player.playSound("note.bass");
            system.run(() => showQuestBoard(player));
        }
    } else {
        showStatsMenu(player);
    }
}

async function showCurrentQuestMenu(player) {
    const questId = player.getDynamicProperty("dhh:questId");
    const quest = getQuestFromId(questId);
    if (!quest) {
        logError("showCurrentQuestMenu", player, new Error(`Invalid questId: ${questId}`));
        resetPlayerQuest(player);
        return;
    }

    const progress = countTargetProgress(player, quest);
    const isCompleted = progress >= quest.amount;

    const form = new ActionFormData();
    form.title("§l§eNHIỆM VỤ HIỆN TẠI");
    
    let bodyText = `§fNhiệm vụ: §b${quest.title}\n`
        + `§7${quest.description}\n\n`
        + `§eTiến độ: §f${progress} / ${quest.amount}`;
        
    if (!CONFIG.DEBUG_MODE) {
        const expireTime = player.getDynamicProperty("dhh:questExpireTime") ?? 0;
        const remainingTicks = expireTime - system.currentTick;
        if (remainingTicks > 0) {
            const remainingSeconds = Math.ceil(remainingTicks / 20);
            const hours = Math.floor(remainingSeconds / 3600);
            const minutes = Math.floor((remainingSeconds % 3600) / 60);
            const seconds = remainingSeconds % 60;
            
            let timeString = "";
            if(hours > 0) timeString += `${hours} giờ `;
            if(minutes > 0 || hours > 0) timeString += `${minutes} phút `;
            timeString += `${seconds} giây`;

            bodyText += `\n§eThời gian còn lại: §f${timeString}`;
        } else {
            bodyText += `\n§c§lNHIỆM VỤ ĐÃ HẾT HẠN!`;
        }
    }
        
    if (isCompleted) {
         bodyText += `\n\n§a§lĐÃ HOÀN THÀNH!§r§a Hãy trả nhiệm vụ để nhận thưởng.`;
    }
        
    form.body(bodyText);

    if (isCompleted) form.button("§a§lTRẢ NHIỆM VỤ");
    form.button("§cHủy Nhiệm Vụ");
    form.button("§7Quay lại Menu Chính");
    
    const response = await form.show(player);
    if (response.canceled) return;

    let selection = response.selection;

    if (isCompleted) {
        if (selection === 0) return claimQuestRewards(player, quest);
        if (selection === 1) {
            resetPlayerQuest(player, true);
            player.sendMessage("§cĐã hủy nhiệm vụ hiện tại. Bạn có thể nhận lại sau.");
        } else showStatsMenu(player);
    } else {
        if (selection === 0) { 
            resetPlayerQuest(player, true);
            player.sendMessage("§cĐã hủy nhiệm vụ hiện tại. Bạn có thể nhận lại sau.");
        } else showStatsMenu(player);
    }
}

export async function showQuestMenu(player) {
    const questId = player.getDynamicProperty("dhh:questId");

    if (!questId) {
        if (!CONFIG.DEBUG_MODE) {
            const cooldownEnd = player.getDynamicProperty("dhh:questCooldownEnd") ?? 0;
            if (system.currentTick < cooldownEnd) {
                const remainingTicks = cooldownEnd - system.currentTick;
                const remainingSeconds = Math.ceil(remainingTicks / 20);
                const minutes = Math.floor(remainingSeconds / 60);
                const seconds = remainingSeconds % 60;
                player.sendMessage(`§cBạn cần đợi §e${minutes} phút ${seconds} giây§c nữa để nhận nhiệm vụ mới.`);
                return;
            }
        }
        await showQuestBoard(player);
    } else {
        await showCurrentQuestMenu(player);
    }
}

export function updateQuestOnKill(player, deadEntity) {
    const questId = player.getDynamicProperty("dhh:questId");
    if(!questId) return;

    const quest = getQuestFromId(questId);
    if (!quest) return;
    
    let isTarget = false;
    if ((quest.type === 'KILL' || quest.type === 'CRAFT') && quest.target === deadEntity.typeId) {
         isTarget = true;
    } else if (quest.type === 'KILL_TAG') {
        const validTargets = CONFIG.ITEM_TAGS[quest.target] || [];
        if (validTargets.includes(deadEntity.typeId)) {
            isTarget = true;
        }
    }

    if (isTarget) {
        let progress = player.getDynamicProperty("dhh:questProgress") ?? 0;
        if (progress < quest.amount) {
            progress++;
            player.setDynamicProperty("dhh:questProgress", progress);
            player.onScreenDisplay.setActionBar(`§b[${quest.title}]§f: ${progress}/${quest.amount}`);
            
            if (progress >= quest.amount) {
                player.playSound("random.orb");
                player.sendMessage(`§a§lHOÀN THÀNH NHIỆM VỤ!§r §eHãy mở menu để trả nhiệm vụ.`);
            }
        }
    }
}

export function checkCollectQuestProgress(player) {
    const questId = player.getDynamicProperty("dhh:questId");
    if (!questId) return;

    const quest = getQuestFromId(questId);
    if (!quest || quest.type === 'KILL' || quest.type === 'KILL_TAG') return;
    
    const wasNotified = player.getDynamicProperty("dhh:questCompletedNotified") ?? false;
    if (wasNotified) return;

    const currentProgress = countTargetProgress(player, quest);
    
    if (currentProgress >= quest.amount) {
        player.playSound("random.orb");
        player.sendMessage(`§a§lHOÀN THÀNH NHIỆM VỤ!§r §eMở menu để trả nhiệm vụ.`);
        player.setDynamicProperty("dhh:questCompletedNotified", true);
    }
}
/**
 * Kiểm tra tiến độ cho các nhiệm vụ loại EXPLORE.
 * @param {import("@minecraft/server").Player} player
 */
export function checkExploreQuestProgress(player) {
  try {
    const questId = player.getDynamicProperty("dhh:questId");
    if (!questId) return;

    const quest = getQuestFromId(questId);
    // Chỉ xử lý nhiệm vụ EXPLORE và chưa được thông báo hoàn thành
    if (!quest || quest.type !== 'EXPLORE' || player.getDynamicProperty("dhh:questCompletedNotified")) {
      return;
    }

    // Điều kiện 1: Người chơi phải ở dưới độ cao Y đã định
    const isInCaveYLevel = player.location.y < CONFIG.QUEST_CAVE_Y_LEVEL;

    if (isInCaveYLevel) {
      // Điều kiện 2: Phía trên đầu người chơi phải có khối, chứng tỏ không ở ngoài trời
      const blockAbove = player.dimension.getBlockFromRay(player.getHeadLocation(), { x: 0, y: 1, z: 0 }, { maxDistance: 320 });

      if (blockAbove) {
        // Tất cả điều kiện đã thỏa mãn, hoàn thành nhiệm vụ
        player.setDynamicProperty("dhh:questProgress", quest.amount);
        player.setDynamicProperty("dhh:questCompletedNotified", true);
        
        player.playSound("random.orb");
        player.sendMessage(`§a§lHOÀN THÀNH NHIỆM VỤ!§r §eMở menu để trả nhiệm vụ.`);
      }
    }
  } catch (e) {
    logError("checkExploreQuestProgress", player, e);
  }
}
export function checkQuestExpiration(player) {
    if (CONFIG.DEBUG_MODE) return;

    const questId = player.getDynamicProperty("dhh:questId");
    if (!questId) return;

    const expireTime = player.getDynamicProperty("dhh:questExpireTime") ?? 0;
    if (expireTime > 0 && system.currentTick > expireTime) {
        const quest = getQuestFromId(questId);
        player.sendMessage(`§c Nhiệm vụ "${quest?.title ?? 'hiện tại'}" đã hết hạn và tự động bị hủy.`);
        player.playSound("note.bass");
        resetPlayerQuest(player, true);
    }
}
export function getPlayerActiveQuests(player) {
    const questId = player.getDynamicProperty("dhh:questId");
    if (!questId) return []; // Trả về mảng rỗng nếu không có NV
    
    const quest = getQuestFromId(questId);
    if (!quest) return [];

    const progress = countTargetProgress(player, quest);
    return [{
        title: quest.title,
        progress: progress,
        target: quest.amount
    }];
}

/**
 * Cập nhật tiến độ nhiệm vụ nhân giống khi có mob được sinh ra.
 * @param {import("@minecraft/server").Player} player Người chơi đã cho 2 mob ăn để nhân giống.
 * @param {import("@minecraft/server").Entity} newbornEntity Mob con vừa được sinh ra.
 */
export function updateQuestOnBreed(player, newbornEntity) {
    const questId = player.getDynamicProperty("dhh:questId");
    if (!questId) return;

    const quest = getQuestFromId(questId);
    if (!quest || quest.type !== 'BREED') return;

    const validTargets = CONFIG.ITEM_TAGS[quest.target] || [];
    if (validTargets.includes(newbornEntity.typeId)) {
        let progress = player.getDynamicProperty("dhh:questProgress") ?? 0;
        if (progress < quest.amount) {
            progress++;
            player.setDynamicProperty("dhh:questProgress", progress);
            player.onScreenDisplay.setActionBar(`§b[${quest.title}]§f: ${progress}/${quest.amount}`);
            
            if (progress >= quest.amount) {
                player.playSound("random.orb");
                player.sendMessage(`§a§lHOÀN THÀNH NHIỆM VỤ!§r §eHãy mở menu để trả nhiệm vụ.`);
            }
        }
    }
}

/**
 * Cập nhật tiến độ nhiệm vụ Giao Dịch.
 * @param {import("@minecraft/server").Player} player
 * @param {import("@minecraft/server").Entity} targetEntity
 */
export function updateQuestOnTrade(player, targetEntity) {
    const questId = player.getDynamicProperty("dhh:questId");
    if(!questId) return;

    const quest = getQuestFromId(questId);
    if (!quest || quest.type !== 'TRADE') return;
    
    // Kiểm tra xem có phải dân làng hoặc thương nhân lang thang không
    const validTargets = ["minecraft:villager", "minecraft:wandering_trader"];
    if (validTargets.includes(targetEntity.typeId)) {
        let progress = player.getDynamicProperty("dhh:questProgress") ?? 0;
        if (progress < quest.amount) {
            progress++;
            player.setDynamicProperty("dhh:questProgress", progress);
            player.onScreenDisplay.setActionBar(`§b[${quest.title}]§f: ${progress}/${quest.amount}`);
            
            if (progress >= quest.amount) {
                player.playSound("random.orb");
                player.sendMessage(`§a§lHOÀN THÀNH NHIỆM VỤ!§r §eHãy mở menu để trả nhiệm vụ.`);
            }
        }
    }
}