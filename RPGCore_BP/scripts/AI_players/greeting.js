import { world, system } from "@minecraft/server";

const AI_ENTITY_TYPE_ID = "dhh:newb";
const COMBAT_TAG = "has_target";
const YOUR_NAMESPACE = "dhh";

const AUTO_GREETING_CHECK_INTERVAL_TICKS = 40; 
const AUTO_GREETING_SEARCH_RADIUS = 8;      

const INTERACTIVE_GREETING_CHECK_INTERVAL_TICKS = 4; 
const INTERACTIVE_GREETING_RADIUS = 12;      
const GREETING_SNEAK_COUNT = 3;           
const GREETING_SNEAK_WINDOW_SECONDS = 3;   

const AI_GREETING_COOLDOWN_SECONDS = 2;   
const GREETING_ANIMATION_TAG = "is_greeting_sneaking";
const GREETING_DURATION_SECONDS = 2;    

// ==================== CHAT MESSAGES THEO FACTION ====================

const GREETING_MESSAGES = {
    good: [
        "Chào bạn!", "Hế lô!", "Ê chào!", "Chào người anh em!",
        "Chào cậu:))", "Hi!", "Xin chào!", "Ê!"
    ],
    bad: [
        "Hừ.", "Gì đó.", "Ừ.", "...", "Sao?", "Gì?", "Hả?"
    ],
    crazy: [
        "HAHA!", "Ủa!", "???", "ÁÁÁÁÁ!", "Hehe!", "Ơ kìa!", 
        "WTF", "Bruh", "Lmao", "Hê hê"
    ]
};

// ==================== QUÀ TẶNG THEO FACTION ====================

const GIFT_ITEMS = {
    good: [
        { item: "minecraft:apple", amount: 2 },
        { item: "minecraft:bread", amount: 3 },
        { item: "minecraft:cooked_beef", amount: 2 },
        { item: "minecraft:oak_log", amount: 4 },
        { item: "minecraft:coal", amount: 5 },
        { item: "minecraft:torch", amount: 8 }
    ],
    bad: [
        { item: "minecraft:stick", amount: 2 },
        { item: "minecraft:cobblestone", amount: 5 },
        { item: "minecraft:dirt", amount: 8 },
        { item: "minecraft:gravel", amount: 4 }
    ],
    crazy: [
        { item: "minecraft:apple", amount: 1 },
        { item: "minecraft:rotten_flesh", amount: 3 },
        { item: "minecraft:bone", amount: 4 },
        { item: "minecraft:arrow", amount: 6 },
        { item: "minecraft:tnt", amount: 1 },
        { item: "minecraft:diamond", amount: 1 }, // Hiếm!
        { item: "minecraft:dirt", amount: 16 },
        { item: "minecraft:cobweb", amount: 2 }
    ]
};

// Xác suất tặng quà theo faction
const GIFT_CHANCE = {
    good: 0.7,    // 70%
    bad: 0.3,     // 30%
    crazy: 0.5    // 50%
};

const aiStates = new Map();
const playerSneakTracker = new Map(); 
const aiGreetingCooldown = new Set(); 

// ==================== HELPER FUNCTIONS ====================

function getAIFaction(ai) {
    if (ai.hasTag("good")) return "good";
    if (ai.hasTag("bad")) return "bad";
    if (ai.hasTag("crazy")) return "crazy";
    return "good"; // Mặc định
}

function getRandomElement(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

function sendGreetingMessage(ai, targetPlayer) {
    if (!ai?.isValid || !targetPlayer?.isValid) return;
    
    try {
        const faction = getAIFaction(ai);
        const messages = GREETING_MESSAGES[faction] || GREETING_MESSAGES.good;
        const message = getRandomElement(messages);
        
        const aiName = ai.nameTag || "AI Player";
        world.sendMessage(`§f<${aiName}> ${message}`);
        
    } catch (e) {
        console.warn(`[Greeting] Failed to send message: ${e}`);
    }
}

function giveGiftToPlayer(ai, targetPlayer) {
    if (!ai?.isValid || !targetPlayer?.isValid) return;
    
    try {
        const faction = getAIFaction(ai);
        const giftChance = GIFT_CHANCE[faction];
        
        // Kiểm tra xác suất
        if (Math.random() > giftChance) {
            return; // Không tặng
        }
        
        const possibleGifts = GIFT_ITEMS[faction] || GIFT_ITEMS.good;
        const gift = getRandomElement(possibleGifts);
        
        if (!gift) return;
        
        // Spawn item tại vị trí AI
        const spawnLoc = {
            x: ai.location.x,
            y: ai.location.y + 1.5, // Spawn ở tầm ngực
            z: ai.location.z
        };
        
        ai.dimension.spawnItem(
            new world.ItemStack(gift.item, gift.amount),
            spawnLoc
        );
        
        // Chat thông báo tặng quà
        const aiName = ai.nameTag || "AI Player";
        const giftMessages = {
            good: ["Tặng bạn đây!", "Của bạn đấy!", "Lấy đi nè!"],
            bad: ["Cầm lấy.", "Đưa cho.", "Lấy đi."],
            crazy: ["Hehe quà!", "Lấy nè!", "Của bạn!", "Nhận đi!"]
        };
        
        const messages = giftMessages[faction] || giftMessages.good;
        const giftMsg = getRandomElement(messages);
        
        system.runTimeout(() => {
            if (ai?.isValid) {
                world.sendMessage(`§f<${aiName}> ${giftMsg}`);
            }
        }, 30); // Delay 1.5s sau khi chào
        
    } catch (e) {
        console.warn(`[Greeting] Failed to give gift: ${e}`);
    }
}

// ==================== MAIN GREETING LOGIC ====================

export function initializeGreetingBehavior() {
    startAutoGreetingLoop();
    startInteractiveGreetingLoop();
    console.log("[AI Greeting] Proactive and Interactive behaviors with gifts initialized.");
}

function startAutoGreetingLoop() {
    system.runInterval(() => {
        let allAis = [];
        const dimensionIdsToQuery = ["overworld", "nether", "the_end"];
        for (const dimId of dimensionIdsToQuery) {
            try {
                const dimension = world.getDimension(dimId);
                const entitiesInDimension = dimension.getEntities({ type: AI_ENTITY_TYPE_ID });
                for (const entity of entitiesInDimension) {
                    allAis.push(entity);
                }
            } catch (e) {}
        }

        const idleAis = allAis.filter(ai => !ai.hasTag(COMBAT_TAG));

        for (const ai of idleAis) {
            if (!aiStates.has(ai.id)) {
                aiStates.set(ai.id, { isGreeting: false, greetingTargetId: undefined, viewLockIntervalId: undefined });
            }
            const state = aiStates.get(ai.id);
            
            if (!state.isGreeting && !ai.hasTag(COMBAT_TAG) && !aiGreetingCooldown.has(ai.id)) {
                const metPlayerIds = JSON.parse(ai.getDynamicProperty(`${YOUR_NAMESPACE}:met_players`) || "[]");
                const nearbyPlayers = ai.dimension.getPlayers({ location: ai.location, maxDistance: AUTO_GREETING_SEARCH_RADIUS });

                for (const player of nearbyPlayers) {
                    if (!metPlayerIds.includes(player.id)) {
                        aiGreetingCooldown.add(ai.id);
                        system.runTimeout(() => { aiGreetingCooldown.delete(ai.id); }, AI_GREETING_COOLDOWN_SECONDS * 20);

                        performGreeting(ai, player, state, metPlayerIds);
                        break; 
                    }
                }
            }
        }
    }, AUTO_GREETING_CHECK_INTERVAL_TICKS);
}

function startInteractiveGreetingLoop() {
    system.runInterval(() => {
        for (const player of world.getPlayers()) {
            if (!playerSneakTracker.has(player.id)) {
                playerSneakTracker.set(player.id, { sneakCount: 0, lastSneakTime: 0, isCurrentlySneaking: false });
            }
            const tracker = playerSneakTracker.get(player.id);
            const currentTime = Date.now();

            if (player.isSneaking && !tracker.isCurrentlySneaking) {
                if (currentTime - tracker.lastSneakTime > GREETING_SNEAK_WINDOW_SECONDS * 1000) {
                    tracker.sneakCount = 1;
                } else {
                    tracker.sneakCount++;
                }
                tracker.lastSneakTime = currentTime;

                if (tracker.sneakCount >= GREETING_SNEAK_COUNT) {
                    tracker.sneakCount = 0;
                    findNearbyIdleAIToGreetBack(player);
                }
            }
            tracker.isCurrentlySneaking = player.isSneaking;
        }
    }, INTERACTIVE_GREETING_CHECK_INTERVAL_TICKS);
}

function findNearbyIdleAIToGreetBack(playerToDoGreeting) {
    const nearbyAis = playerToDoGreeting.dimension.getEntities({
        location: playerToDoGreeting.location,
        maxDistance: INTERACTIVE_GREETING_RADIUS,
        type: AI_ENTITY_TYPE_ID
    });

    for (const ai of nearbyAis) {
        if (!ai.hasTag(COMBAT_TAG) && !aiGreetingCooldown.has(ai.id)) {
            aiGreetingCooldown.add(ai.id);
            system.runTimeout(() => {
                aiGreetingCooldown.delete(ai.id);
            }, AI_GREETING_COOLDOWN_SECONDS * 20);

            const state = aiStates.get(ai.id) || { isGreeting: false };
            const metPlayerIds = JSON.parse(ai.getDynamicProperty(`${YOUR_NAMESPACE}:met_players`) || "[]");
            performGreeting(ai, playerToDoGreeting, state, metPlayerIds);

            break; 
        }
    }
}

function performGreeting(ai, targetPlayer, state, metPlayerIds) {
    if (state.isGreeting) return; 

    state.isGreeting = true;
    state.greetingTargetId = targetPlayer.id;
    ai.triggerEvent("lock_movement");

    state.viewLockIntervalId = system.runInterval(() => {
        const currentTarget = world.getEntity(state.greetingTargetId);
        if (ai.isValid && currentTarget?.isValid) {
            ai.runCommand(`teleport @s[tag=!has_target] ~ ~ ~ facing @e[c=1,name="${currentTarget.name}"]`);
        } else {
            cleanupGreeting(ai, state);
        }
    }, 1);

    if (!metPlayerIds.includes(targetPlayer.id)) {
        metPlayerIds.push(targetPlayer.id);
        ai.setDynamicProperty(`${YOUR_NAMESPACE}:met_players`, JSON.stringify(metPlayerIds));
    }

    // Animation sneaking 3 lần (giữ nguyên)
    system.runTimeout(() => { if (ai.isValid && state.isGreeting) ai.addTag(GREETING_ANIMATION_TAG); }, 5);
    system.runTimeout(() => { if (ai.isValid && state.isGreeting) ai.removeTag(GREETING_ANIMATION_TAG); }, 6);
    system.runTimeout(() => { if (ai.isValid && state.isGreeting) ai.addTag(GREETING_ANIMATION_TAG); }, 15);
    system.runTimeout(() => { if (ai.isValid && state.isGreeting) ai.removeTag(GREETING_ANIMATION_TAG); }, 16);
    system.runTimeout(() => { if (ai.isValid && state.isGreeting) ai.addTag(GREETING_ANIMATION_TAG); }, 25);
    system.runTimeout(() => { if (ai.isValid && state.isGreeting) ai.removeTag(GREETING_ANIMATION_TAG); }, 26);
    
    // Chat chào (sau animation)
    system.runTimeout(() => {
        if (ai?.isValid && targetPlayer?.isValid) {
            sendGreetingMessage(ai, targetPlayer);
        }
    }, 30); // 1.5s sau khi bắt đầu chào
    
    // Tặng quà (sau chat một chút)
    system.runTimeout(() => {
        if (ai?.isValid && targetPlayer?.isValid) {
            giveGiftToPlayer(ai, targetPlayer);
        }
    }, 35); // 1.75s
    
    system.runTimeout(() => {
        cleanupGreeting(ai, state);
    }, GREETING_DURATION_SECONDS * 20);
}

function cleanupGreeting(ai, state) {
    if (!state || !state.isGreeting) return;

    if (ai.isValid) {
        ai.removeTag(GREETING_ANIMATION_TAG);
        ai.triggerEvent("unlock_movement");
    }
    
    system.clearRun(state.viewLockIntervalId);

    state.isGreeting = false;
    state.greetingTargetId = undefined;
    state.viewLockIntervalId = undefined;
}