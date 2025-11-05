// file: tutorial_quest_system.js
import { world, system, ItemStack } from "@minecraft/server";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";
import { TUTORIAL_QUESTS, CONFIG } from "./config.js";
import { grantXpAndLevelUpCheck, showStatsMenu, logError } from './main.js';

// Hàm này có thể được copy từ story_quest_system.js vì chúng giống hệt nhau
function checkStepCompletion(player, stepData) {
    const inventory = player.getComponent("inventory")?.container;
    if (!inventory) return false;

    switch (stepData.type) {
        case "DIALOGUE": return true;
        case "KILL": return (player.getDynamicProperty("dhh:tutorial_progress_count") ?? 0) >= stepData.amount;
        case "COLLECT": {
            let count = 0;
            for (let i = 0; i < inventory.size; i++) {
                const item = inventory.getItem(i);
                // Xử lý riêng cho chai nước, vì nó được tính là Potion không có hiệu ứng
                if (stepData.targetId === "minecraft:potion" && item?.typeId === "minecraft:potion" && (!item.getComponent("minecraft:potion") || item.getComponent("minecraft:potion").potionId === "water")) {
                     count += item.amount;
                } else if (item?.typeId === stepData.targetId) {
                    count += item.amount;
                }
            }
            return count >= stepData.amount;
        }
        case "COLLECT_MULTIPLE": {
            for (const target of stepData.targets) {
                let count = 0;
                if (target.id) {
                     for (let i = 0; i < inventory.size; i++) {
                        const item = inventory.getItem(i);
                        if (item?.typeId === target.id) {
                            count += item.amount;
                        }
                    }
                }
                if (count < target.amount) return false;
            }
            return true;
        }
        default: return false;
    }
}

// Hàm này cũng có thể copy từ story_quest_system.js
function removeQuestItems(player, stepData) {
    if (!["COLLECT", "COLLECT_MULTIPLE"].includes(stepData.type)) return;
    const inventory = player.getComponent("inventory").container;

    const targets = stepData.targets || [{ id: stepData.targetId, amount: stepData.amount }];
    for (const target of targets) {
        let remaining = target.amount;
        for (let i = 0; i < inventory.size && remaining > 0; i++) {
            const item = inventory.getItem(i);
            if (item?.typeId === target.id) {
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
}

async function startTutorial(player, questId) {
    const questData = TUTORIAL_QUESTS[questId];
    if (!questData) return;

    player.setDynamicProperty("dhh:tutorial_quest_id", questId);
    player.setDynamicProperty("dhh:tutorial_quest_step", 0);
    player.setDynamicProperty("dhh:tutorial_progress_count", 0);

    const firstStep = questData.steps[0];
    player.sendMessage(`§a[Hướng Dẫn] Bắt đầu: §f${questData.title}`);
    player.sendMessage(`§e[Mục Tiêu] §f${firstStep.log}`);
    player.playSound("note.pling");
    system.run(() => showActiveTutorial(player));
}

async function cancelTutorial(player) {
    player.setDynamicProperty("dhh:tutorial_quest_id", undefined);
    player.setDynamicProperty("dhh:tutorial_quest_step", undefined);
    player.setDynamicProperty("dhh:tutorial_progress_count", undefined);
    player.sendMessage("§e[Hướng Dẫn] Đã hủy hướng dẫn hiện tại.");
    system.run(() => showTutorialMainMenu(player));
}

async function advanceTutorialStep(player) {
    const questId = player.getDynamicProperty("dhh:tutorial_quest_id");
    let questStep = player.getDynamicProperty("dhh:tutorial_quest_step") ?? 0;
    
    if (!questId) return;
    const questData = TUTORIAL_QUESTS[questId];
    if (!questData) return;
    
    const currentStepData = questData.steps[questStep];
    
    // // Xóa vật phẩm yêu cầu của bước hiện tại
    // removeQuestItems(player, currentStepData);
    player.setDynamicProperty("dhh:tutorial_progress_count", 0);

    // Trao phần thưởng (nếu có)
    if (currentStepData.rewards) {
        if(currentStepData.rewards.xp) grantXpAndLevelUpCheck(player, currentStepData.rewards.xp, `Hướng dẫn`);
    }

    // Kiểm tra xem đây có phải bước cuối cùng không
    if (currentStepData.isEndStep) {
        player.sendMessage(`§a§l[Hướng Dẫn] Hoàn thành: §f${questData.title}!`);
        player.playSound("random.levelup");
        player.setDynamicProperty("dhh:tutorial_quest_id", undefined);
        player.setDynamicProperty("dhh:tutorial_quest_step", undefined);
        system.run(() => showTutorialMainMenu(player));
        return;
    }

    // Chuyển sang bước tiếp theo
    questStep++;
    player.setDynamicProperty("dhh:tutorial_quest_step", questStep);
    const newStepData = questData.steps[questStep];
    player.sendMessage(`§e[Mục Tiêu Mới] §f${newStepData.log}`);
    player.playSound("random.orb");
    system.run(() => showActiveTutorial(player));
}

async function showActiveTutorial(player) {
    const questId = player.getDynamicProperty("dhh:tutorial_quest_id");
    if (!questId) return showTutorialMainMenu(player);

    const questData = TUTORIAL_QUESTS[questId];
    const questStep = player.getDynamicProperty("dhh:tutorial_quest_step") ?? 0;
    const stepData = questData.steps[questStep];

    const isCompleted = checkStepCompletion(player, stepData);

    const form = new ActionFormData();
    form.title("§l§aHƯỚNG DẪN HIỆN TẠI");
    
    let body = `§eChủ đề: §f${questData.title}\n\n`
             + `§6§lBước ${questStep + 1}/${questData.steps.length}:\n`
             + `§r${stepData.log}`;
    
    if(isCompleted) {
        body += "\n\n§a§lĐÃ HOÀN THÀNH BƯỚC NÀY!";
    }

    form.body(body);

    if (isCompleted) {
        if (stepData.type === "DIALOGUE") {
            form.button("§a[Xem Hội Thoại & Tiếp Tục]");
        } else {
            form.button("§a[Hoàn Thành Bước Này]");
        }
    }
    form.button("§cHủy Hướng Dẫn");
    form.button("§0Quay Lại Menu Chính");
    
    const { canceled, selection } = await form.show(player);
    if (canceled) return;

    if (isCompleted) {
        if (selection === 0) {
            if (stepData.type === "DIALOGUE") {
                const finished = await showDialogue(player, stepData.dialogue);
                if(finished) advanceTutorialStep(player);
            } else {
                advanceTutorialStep(player);
            }
        } else if (selection === 1) {
            cancelTutorial(player);
        } else {
            showStatsMenu(player);
        }
    } else {
        if (selection === 0) {
            cancelTutorial(player);
        } else {
            showStatsMenu(player);
        }
    }
}

// Hàm này là entry point, được gọi từ main.js
export async function showTutorialMainMenu(player) {
    const activeQuestId = player.getDynamicProperty("dhh:tutorial_quest_id");
    if (activeQuestId) {
        return showActiveTutorial(player);
    }

    const form = new ActionFormData();
    form.title("§l§a SỔ TAY HƯỚNG DẪN");
    form.body("Bạn muốn học về điều gì hôm nay?");

    const tutorialIds = Object.keys(TUTORIAL_QUESTS);

    tutorialIds.forEach(id => {
        const quest = TUTORIAL_QUESTS[id];
        form.button(`§f${quest.title}\n§8${quest.description}`);
    });
    form.button("§0Quay Lại");

    const { canceled, selection } = await form.show(player);
    if (canceled || selection === tutorialIds.length) {
        return showStatsMenu(player);
    }
    
    const selectedId = tutorialIds[selection];
    startTutorial(player, selectedId);
}

// Hàm này được gọi trong runInterval của main.js
export function checkTutorialProgress(player) {
    try {
        const questId = player.getDynamicProperty("dhh:tutorial_quest_id");
        if (!questId) return;

        const questData = TUTORIAL_QUESTS[questId];
        const questStep = player.getDynamicProperty("dhh:tutorial_quest_step") ?? 0;
        const stepData = questData.steps[questStep];

        if (stepData && !stepData.type.includes("DIALOGUE")) {
            if (checkStepCompletion(player, stepData)) {
                const notifiedKey = `dhh:tutorial_notified_${questId}_${questStep}`;
                if (!player.getDynamicProperty(notifiedKey)) {
                    player.setDynamicProperty(notifiedKey, true);
                    player.playSound("random.orb");
                    player.sendMessage("§a[Hướng Dẫn] Đã hoàn thành mục tiêu! Hãy vào Sổ Tay Hướng Dẫn để tiếp tục.");
                }
            }
        }
    } catch (e) { logError("TutorialQuestEngine", player, e); }
}

// Hàm này copy từ story_quest_system.js
async function showDialogue(player, dialogue) {
    for (const line of dialogue) {
        const form = new MessageFormData();
        form.title(`§e${line.speaker}`);
        form.body(`§f${line.text}`);
        form.button1("Tiếp tục...");
        form.button2("");
        
        const { canceled } = await form.show(player);
        if (canceled) return false;
    }
    return true;
}