import { world, system, ItemStack, BlockPermutation } from "@minecraft/server";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";
import { CONFIG } from "./config.js";
const { STORY_QUESTS } = CONFIG;
import { grantXpAndLevelUpCheck, showStatsMenu, logError } from "./main.js";

// Dán và thay thế hàm cũ
export function checkStepCompletion(player, stepData) {
    const inventory = player.getComponent("inventory")?.container;
    if (!inventory) return false;

    switch (stepData.type) {
        case "DIALOGUE": return true;
        
        case "KILL":
            return (player.getDynamicProperty("dhh:story_progress_count") ?? 0) >= stepData.amount;
        
        case "COLLECT": {
            let count = 0;
            for (let i = 0; i < inventory.size; i++) {
                const item = inventory.getItem(i);
                if (item?.typeId === stepData.targetId) {
                    count += item.amount;
                }
            }
            return count >= stepData.amount;
        }

        // === LOGIC MỚI CHO THU THẬP VẬT PHẨM BẤT KỲ ===
        case "COLLECT_ANY": {
            if (!stepData.targetIds || !Array.isArray(stepData.targetIds)) return false;
            let count = 0;
            for (let i = 0; i < inventory.size; i++) {
                const item = inventory.getItem(i);
                if (item && stepData.targetIds.includes(item.typeId)) {
                    count += item.amount;
                }
            }
            return count >= stepData.amount;
        }
  case "COLLECT_TAG": {
            const tagItems = CONFIG.ITEM_TAGS[stepData.target];
            if (!tagItems) return false; // Tag không hợp lệ

            let count = 0;
            for (let i = 0; i < inventory.size; i++) {
                const item = inventory.getItem(i);
                if (item && tagItems.includes(item.typeId)) {
                    count += item.amount;
                }
            }
            return count >= stepData.amount;
        }
  case "COLLECT_MULTIPLE": {
            for (const target of stepData.targets) {
                let count = 0;
                // Nếu mục tiêu có tag
                if (target.tag) {
                    const tagItems = CONFIG.ITEM_TAGS[target.tag];
                    if (!tagItems) return false; // Tag không tồn tại

                    for (let i = 0; i < inventory.size; i++) {
                        const item = inventory.getItem(i);
                        if (item && tagItems.includes(item.typeId)) {
                            count += item.amount;
                        }
                    }
                } 
                // Nếu mục tiêu có id
                else if (target.id) {
                    for (let i = 0; i < inventory.size; i++) {
                        const item = inventory.getItem(i);
                        if (item?.typeId === target.id) {
                            count += item.amount;
                        }
                    }
                }
                // Nếu không đủ số lượng, trả về false ngay lập tức
                if (count < target.amount) return false;
            }
            // Nếu tất cả mục tiêu đều đủ, trả về true
            return true;
        }


        // === LOGIC NÂNG CẤP CHO KHÁM PHÁ ===
        case "EXPLORE": {
            try {
                // Ưu tiên kiểm tra dimension trước
                if (stepData.target === "nether" && player.dimension.id === "minecraft:the_nether") {
                    return true;
                }
                if (stepData.target === "overworld" && player.dimension.id === "minecraft:overworld") {
                    return true;
                }
                if (stepData.target === "the_end" && player.dimension.id === "minecraft:the_end") {
                    return true;
                }
                
                // Sau đó mới kiểm tra biome (và cấu trúc được game coi là biome)
                const playerBiomeOrStructure = player.dimension.getBiome(player.location).id.replace("minecraft:", "");
                // Một số structure như kim tự tháp, làng mạc... được API coi là 'biome'
                return playerBiomeOrStructure.includes(stepData.target);

            } catch(e) { 
                console.warn(`[Story Addon] Lỗi khi kiểm tra EXPLORE: ${e}`);
                return false; 
            }
        }

        case "INTERACT_BLOCK": {
            return (player.getDynamicProperty("dhh:story_progress_count") ?? 0) >= stepData.amount;
        }
        
        default: return false;
    }
}

// Dán và thay thế hàm cũ
function removeQuestItems(player, stepData) {
    // Sửa lại điều kiện if để bao gồm cả type mới
    if (!["COLLECT", "COLLECT_MULTIPLE", "COLLECT_ANY", "COLLECT_TAG"].includes(stepData.type)) return;
    
    const inventory = player.getComponent("inventory").container;

    // THÊM LOGIC XỬ LÝ CHO COLLECT_TAG
    if (stepData.type === "COLLECT_TAG") {
        const tagItems = CONFIG.ITEM_TAGS[stepData.target];
        if (!tagItems) return;

        let remaining = stepData.amount;
        for (let i = 0; i < inventory.size && remaining > 0; i++) {
            const item = inventory.getItem(i);
            if (item && tagItems.includes(item.typeId)) {
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

    // Xử lý cho COLLECT_MULTIPLE và COLLECT
   if (stepData.type === "COLLECT" || stepData.type === "COLLECT_MULTIPLE") {
        const targets = stepData.targets || [{ id: stepData.targetId, amount: stepData.amount }];
        
        for (const target of targets) {
            let remaining = target.amount;

            // Xử lý xóa theo TAG
            if (target.tag) {
                const tagItems = CONFIG.ITEM_TAGS[target.tag];
                if (!tagItems) continue;

                for (let i = 0; i < inventory.size && remaining > 0; i++) {
                    const item = inventory.getItem(i);
                    if (item && tagItems.includes(item.typeId)) {
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
            // Xử lý xóa theo ID (như cũ)
            else if (target.id) {
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
    }

    // Xử lý cho COLLECT_ANY
    if (stepData.type === "COLLECT_ANY") {
        let remaining = stepData.amount;
        for (let i = 0; i < inventory.size && remaining > 0; i++) {
            const item = inventory.getItem(i);
            if (item && stepData.targetIds.includes(item.typeId)) {
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

export function advanceStoryQuest(player) {
    const questId = player.getDynamicProperty("dhh:story_quest_id");
    let questStep = player.getDynamicProperty("dhh:story_quest_step") ?? 0;
    
    if (!questId) return;
    const questData = STORY_QUESTS[questId];
    if (!questData) return logError("advanceStoryQuest", player, new Error(`Invalid questId ${questId}`));
    
    const currentStepData = questData.steps[questStep];

    if (currentStepData.rewards && !currentStepData.isEndStep) {
        const { xp, nguyen_thach, items } = currentStepData.rewards;
        if(xp) grantXpAndLevelUpCheck(player, xp, `NV Cốt Truyện (bước)`);
        if (nguyen_thach) {
            const currentNT = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
            player.setDynamicProperty("dhh:nguyen_thach", currentNT + nguyen_thach);
        }
        if (items) {
             const inventory = player.getComponent("inventory").container;
             items.forEach(itemInfo => inventory.addItem(new ItemStack(itemInfo.id, itemInfo.amount || 1)));
        }
    }

    removeQuestItems(player, currentStepData);
    player.setDynamicProperty("dhh:story_progress_count", 0); 
    
    if (currentStepData.triggerEvent) {
        handleStoryEvent(player, currentStepData.triggerEvent);
    }
    
    if (currentStepData.isEndStep) {
        player.sendMessage(`§a§l[Cốt Truyện] Hoàn thành nhiệm vụ: §e${questData.title}!`);
        player.playSound("random.levelup", { pitch: 1.2 });

        if (currentStepData.rewards) {
            const { xp, nguyen_thach, items } = currentStepData.rewards;
            if (xp) grantXpAndLevelUpCheck(player, xp, `NV Cốt Truyện`);
            if (nguyen_thach) {
                 const currentNT = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
                player.setDynamicProperty("dhh:nguyen_thach", currentNT + nguyen_thach);
            }
            if(items) {
                const inventory = player.getComponent("inventory").container;
                items.forEach(itemInfo => {
                    const newItem = new ItemStack(itemInfo.id, itemInfo.amount || 1);
                    if (itemInfo.nameTag) newItem.nameTag = itemInfo.nameTag;
                    if(itemInfo.enchantments) {
                        const enchantable = newItem.getComponent("enchantable");
                        for (const enchant in itemInfo.enchantments) {
                           try {
                                enchantable.addEnchantment({typeId: enchant, level: itemInfo.enchantments[enchant]});
                           } catch(e) { logError("advanceStoryQuest.rewards", player, e); }
                        }
                    }
                    inventory.addItem(newItem);
                });
            }
        }

        const nextQuestId = Object.keys(STORY_QUESTS).find(key => STORY_QUESTS[key].unlocks === questId);
        if (nextQuestId) {
            player.setDynamicProperty("dhh:story_quest_id", nextQuestId);
            player.setDynamicProperty("dhh:story_quest_step", 0);
            player.sendMessage(`§d[Cốt Truyện Mới] §f${STORY_QUESTS[nextQuestId].title}`);
        } else {
            player.setDynamicProperty("dhh:story_quest_id", undefined);
            player.setDynamicProperty("dhh:story_quest_step", undefined);
            player.sendMessage("§d[Cốt Truyện] Bạn đã hoàn thành chương hiện tại!");
        }
        return;
    }

    questStep++;
    player.setDynamicProperty("dhh:story_quest_step", questStep);
    const newStepData = questData.steps[questStep];
    if (newStepData.log) {
         player.sendMessage(`§6[Mục Tiêu Mới] §f${newStepData.log}`);
    }
    if (newStepData.triggerEvent) {
        handleStoryEvent(player, newStepData.triggerEvent);
    }
}

export async function showStoryQuestLog(player) {
    try {
        const questId = player.getDynamicProperty("dhh:story_quest_id");
        if (!questId) {
            const form = new MessageFormData().title("§d§lCốt Truyện").body("Hành trình của bạn đã kết thúc... cho đến bây giờ.").button1("§0Đóng");
            await form.show(player);
            return;
        }

        const questStep = player.getDynamicProperty("dhh:story_quest_step") ?? 0;
        const questData = STORY_QUESTS[questId];
        const stepData = questData.steps[questStep];
        
        if (!questData || !stepData) {
            logError("showStoryQuestLog", player, new Error(`Invalid story data for ${questId}, step ${questStep}`));
            player.setDynamicProperty("dhh:story_quest_id", undefined); // Resetting to avoid loop
            return;
        }
        
        const form = new ActionFormData();
        form.title(`§d§l${questData.chapterTitle}`);
        let body = `§eNhiệm vụ: §f${questData.title}\n\n§6§lMục tiêu hiện tại:\n§r${stepData.log}`;
        form.body(body);
        form.button("§a[Tiếp Tục Câu Chuyện]");
        form.button("§0Quay Lại Menu Chính");

        const { canceled, selection } = await form.show(player);
        if (canceled || selection === 1) return;

        if (selection === 0) {
            if (checkStepCompletion(player, stepData)) {
                if (stepData.type === "DIALOGUE") {
                    const dialogueFinished = await showDialogue(player, stepData.dialogue);
                    if (dialogueFinished) advanceStoryQuest(player);
                } else {
                    player.sendMessage("§aĐã hoàn thành mục tiêu! Đang tiếp tục câu chuyện...");
                    advanceStoryQuest(player);
                }
                system.run(() => showStoryQuestLog(player));
            } else {
                player.sendMessage("§cMục tiêu chưa hoàn thành! Hãy kiểm tra lại nhật ký.");
                player.playSound("note.bass");
            }
        }
    } catch (e) { logError("showStoryQuestLog", player, e); }
}

function handleStoryEvent(player, eventData) {
    try {
        switch (eventData.name) {
            case "ambush": {
                player.sendMessage("§c§lCẨN THẬN! BẠN BỊ PHỤC KÍCH!");
                player.playSound("entity.wither.spawn", { volume: 0.5, pitch: 1.5 });
                for (let i = 0; i < eventData.amount; i++) {
                    system.runTimeout(() => {
                        try {
                            const angle = Math.random() * 2 * Math.PI;
                            const radius = 5 + Math.random() * 3;
                            const spawnX = player.location.x + Math.cos(angle) * radius;
                            const spawnZ = player.location.z + Math.sin(angle) * radius;
                            const mob = player.dimension.spawnEntity(eventData.type, { x: spawnX, y: player.location.y, z: spawnZ });
                            if (eventData.buff === "strength") {
                                mob.addEffect("strength", 999999, { amplifier: 0, showParticles: false });
                            }
                            mob.addTag("story_mob");
                        } catch(e) { logError("StoryAmbushSpawn", player, e); }
                    }, i * 5);
                }
                break;
            }
            case "spawn_lectern": {
                const playerLoc = player.location;
                let spawnSuccess = false;
                for (let i = 0; i < 10; i++) {
                    const radius = 5 + Math.random() * 10;
                    const angle = Math.random() * 2 * Math.PI;
                    const checkX = Math.floor(playerLoc.x + Math.cos(angle) * radius);
                    const checkZ = Math.floor(playerLoc.z + Math.sin(angle) * radius);
                    for (let y = Math.floor(playerLoc.y) + 5; y > Math.floor(playerLoc.y) - 5; y--) {
                        const block = player.dimension.getBlock({x: checkX, y, z: checkZ});
                        const blockBelow = player.dimension.getBlock({x: checkX, y: y-1, z: checkZ});
                        if(block.isAir && blockBelow.isSolid) {
                            const book = new ItemStack("minecraft:writable_book", 1);
                            book.nameTag = "§7Cuốn Nhật Ký Bám Bụi";
                            book.setLore([
                                "§oNgày 10. 'Sự Im Lặng' đã đến. Mọi người bắt đầu quên...",
                                "§o...quên tên nhau, quên cả cách cười.",
                                "§oNgày 15. Lũ quái vật không còn chỉ xuất hiện ban đêm. Mắt chúng đỏ ngầu...",
                                "§o...chúng săn lùng ký ức.",
                                "§oNgày 21. Elara... con gái tôi... nó bị cắn. Tôi đã khóa nó dưới hầm... tôi không thể...",
                                "§m(Trang cuối bị xé rách và dính máu.)"
                            ]);
                            block.setPermutation(BlockPermutation.resolve("minecraft:lectern"));
                            const blockEntity = block.getBlockEntity();
                            if (blockEntity && blockEntity.getComponent("inventory")) {
                                blockEntity.getComponent("inventory").container.setItem(0, book);
                                player.sendMessage("§e[Lumin] Ta cảm nhận được nó... cuốn sách ở gần đây!");
                                spawnSuccess = true;
                                break;
                            }
                        }
                    }
                    if (spawnSuccess) break;
                }
                if (!spawnSuccess) player.sendMessage("§c[Hệ thống] Không thể tìm thấy vị trí để đặt vật phẩm nhiệm vụ!");
                break;
            }
        }
    } catch(e) { logError("handleStoryEvent", player, e); }
}

export function updateStoryQuestProgress(eventType, player, eventData) {
    try {
        const questId = player.getDynamicProperty("dhh:story_quest_id");
        if (!questId) return;

        const questStep = player.getDynamicProperty("dhh:story_quest_step") ?? 0;
        const questData = STORY_QUESTS[questId];
        if(!questData) return;
        const stepData = questData.steps[questStep];
        if (!stepData) return;

        let targetId = null;
        if(eventType === 'KILL') targetId = eventData.typeId;
        if(eventType === 'INTERACT_BLOCK') targetId = eventData.typeId;
        
        if (stepData.type === eventType && stepData.targetId === targetId) {
             let progress = player.getDynamicProperty("dhh:story_progress_count") ?? 0;
             if (progress < stepData.amount) {
                progress++;
                player.setDynamicProperty("dhh:story_progress_count", progress);
                if (stepData.type !== 'INTERACT_BLOCK') {
                     player.onScreenDisplay.setActionBar(`§d[Cốt Truyện] §fTiến độ: ${progress}/${stepData.amount}`);
                }
                if (progress >= stepData.amount) {
                     player.playSound("random.orb");
                     player.sendMessage("§a[Cốt Truyện] Đã hoàn thành mục tiêu! Hãy vào menu để tiếp tục.");
                }
             }
        }
    } catch(e) {
        logError("updateStoryQuestProgress", player, e);
    }
}