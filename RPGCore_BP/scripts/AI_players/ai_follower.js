import { world, system } from "@minecraft/server";

const AI_ENTITY_TYPE_ID = "dhh:newb";
const COMBAT_TAG = "has_target";

// Keywords để bắt đầu follow
const FOLLOW_KEYWORDS = [
    "đi theo tôi", "theo tôi", "đi với tôi", "đi cùng tôi",
    "follow me", "di voi toi", "di k?", "di theo"
];

// Keywords để dừng follow
const STOP_KEYWORDS = [
    "dừng lại", "stop", "về đi", "thôi", "đủ rồi",
    "không cần nữa", "ngừng", "stop following"
];

const SEARCH_RADIUS = 10;
const COOLDOWN_SECONDS = 60;
const MAX_FOLLOW_DISTANCE = 50; // Quá xa thì mất dạng

const PLAYER_FOLLOW_TAG = "can_followed";
const AI_FOLLOW_TAG = "follow_player";

// ==================== CHAT MESSAGES ====================

const FOLLOW_AGREE_MESSAGES = {
    good: [
        "Được thôi người anh em!", "Đi nào!", "Okay, đi thôi!",
        "Được, tôi sẽ đi cùng!", "Tất nhiên rồi!", "Đi thôi!"
    ],
    bad: [
        "Hừ, được.", "Đi đi.", "Okay.", "Thôi được.",
    ],
    crazy: [
        "Hehe đi nào!", "YEAH!", "Đi đi!", "Ủa đi!", "YOLO!"
    ]
};

const FOLLOW_REFUSE_MESSAGES = {
    good: [
        "Xin lỗi, tôi đang bận.", "Lúc khác nhé.", "Không được rồi.",
        "Tôi đang mệt.", "Để lúc khác."
    ],
    bad: [
        "Không.", "Tất nhiên là không.", "Không, cậu là ai chứ?",
        "Tại sao tôi phải theo cậu?", "Có con cặc", "Thôi."
    ],
    crazy: [
        "Hông!", "Không thích!", "Láo!", "Hehe không!",
        "Ngại!", "Mệt rồi!"
    ]
};

const FOLLOW_LEAVE_MESSAGES = {
    good: [
        "Ok đủ rồi, tạm biệt nhé.", "Tạm biệt.", "Gặp lại sau.",
        "Tôi phải đi đây.", "Cảm ơn, tôi đi nhé!", "Về thôi."
    ],
    bad: [
        "Đủ rồi.", "Tao đi đây.", "Về.", "Thôi.", "Hết."
    ],
    crazy: [
        "Bye bye!", "Hehe tạm biệt!", "Đi đây!", "See ya!", "Lụi!"
    ]
};

const PROTECT_MESSAGES = {
    good: [
        "Có quái gần kìa!", "Để tôi lo!", "Cẩn thận!", "Tôi bảo vệ bạn!"
    ],
    bad: [
        "Có quái.", "Cẩn thận.", "Đánh đi.", "Để tao."
    ],
    crazy: [
        "QUÁI KÌA!", "Hehe đánh nhau!", "FIGHT!", "Để tao!"
    ]
};

const LOST_PLAYER_MESSAGES = {
    good: [
        "Ê đợi tôi với!", "Mất dạng rồi!", "Đi đâu rồi?", "Đứng yên đi!"
    ],
    bad: [
        "Mất rồi.", "Đi đâu?", "Ê.", "Chờ."
    ],
    crazy: [
        "Ủa đâu rồi?", "Mất mẹ rồi!", "Ê ê!", "Đâu rồi???"
    ]
};

// ==================== STATE MANAGEMENT ====================

const followCooldowns = new Map();
const activeFollowers = new Map(); // key: aiId, value: {playerId, lastProtectTime}

function getAIFaction(ai) {
    if (ai.hasTag("good")) return "good";
    if (ai.hasTag("bad")) return "bad";
    if (ai.hasTag("crazy")) return "crazy";
    return "good";
}

function getRandomElement(arr) {
    if (!arr || arr.length === 0) return "";
    return arr[Math.floor(Math.random() * arr.length)];
}

function triggerFactionalEvent(ai, baseEventName) {
    if (!ai?.isValid) return;

    if (ai.hasTag("good")) {
        ai.triggerEvent(`dhh:good_${baseEventName}`);
    } else if (ai.hasTag("bad")) {
        ai.triggerEvent(`dhh:bad_${baseEventName}`);
    } else if (ai.hasTag("crazy")) {
        ai.triggerEvent(`dhh:crazy_${baseEventName}`);
    } else {
        ai.triggerEvent(`dhh:${baseEventName}`);
    }
}

function shouldAgreeToFollow(ai) {
    if (!ai?.isValid) return false;
    
    try {
        // Đang combat → từ chối
        if (ai.hasTag(COMBAT_TAG)) return false;
        
        // Check máu
        const healthComp = ai.getComponent("minecraft:health");
        if (healthComp) {
            const healthPercent = healthComp.currentValue / healthComp.defaultValue;
            
            // Máu < 50% → từ chối
            if (healthPercent < 0.5) return false;
        }
        
        // Xác suất theo faction
        const faction = getAIFaction(ai);
        const chances = {
            good: 0.8,   // 80%
            bad: 0.3,    // 30%
            crazy: 0.5   // 50%
        };
        
        return Math.random() < (chances[faction] || 0.5);
        
    } catch (e) {
        return false;
    }
}

function getRefuseReason(ai) {
    if (!ai?.isValid) return null;
    
    try {
        if (ai.hasTag(COMBAT_TAG)) {
            return "Đang bận đánh nhau.";
        }
        
        const healthComp = ai.getComponent("minecraft:health");
        if (healthComp) {
            const healthPercent = healthComp.currentValue / healthComp.defaultValue;
            if (healthPercent < 0.5) {
                return "Đang bị thương.";
            }
        }
        
        return null;
    } catch (e) {
        return null;
    }
}

// ==================== FOLLOW LOGIC ====================

export function initializeFollowerBehavior() {
    
    // Listen for follow request
    world.afterEvents.chatSend.subscribe(event => {
        const { message, sender: player } = event;
        const lowerCaseMessage = message.toLowerCase();

        // Check follow keywords
        const foundFollowKeyword = FOLLOW_KEYWORDS.some(keyword => lowerCaseMessage.includes(keyword));
        if (foundFollowKeyword) {
            handleFollowRequest(player);
            return;
        }
        
        // Check stop keywords
        const foundStopKeyword = STOP_KEYWORDS.some(keyword => lowerCaseMessage.includes(keyword));
        if (foundStopKeyword) {
            handleStopRequest(player);
            return;
        }
    });
    
    // Protection loop - check if player being attacked
    system.runInterval(() => {
        for (const [aiId, followData] of activeFollowers.entries()) {
            const ai = world.getEntity(aiId);
            if (!ai?.isValid) {
                activeFollowers.delete(aiId);
                continue;
            }
            
            const player = world.getEntity(followData.playerId);
            if (!player?.isValid) {
                stopFollowing(ai);
                continue;
            }
            
            // Check distance
            const dx = player.location.x - ai.location.x;
            const dy = player.location.y - ai.location.y;
            const dz = player.location.z - ai.location.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            // Quá xa → mất dạng
            if (distance > MAX_FOLLOW_DISTANCE) {
                const faction = getAIFaction(ai);
                const messages = LOST_PLAYER_MESSAGES[faction];
                const message = getRandomElement(messages);
                
                if (message) {
                    const aiName = ai.nameTag || "AI Player";
                    world.sendMessage(`§f<${aiName}> ${message}`);
                }
                
                stopFollowing(ai);
                continue;
            }
            
            // Check for monsters near player
            protectPlayer(ai, player, followData);
        }
    }, 40); // Check mỗi 2s
    
    console.log("[AI Follower] Enhanced behavior with protection initialized.");
}

function handleFollowRequest(player) {
    const nearbyAis = player.dimension.getEntities({
        location: player.location,
        maxDistance: SEARCH_RADIUS,
        type: AI_ENTITY_TYPE_ID
    });

    let chosenAI = undefined;
    for (const ai of nearbyAis) {
        const isOnCooldown = followCooldowns.has(ai.id) && system.currentTick < followCooldowns.get(ai.id);
        if (!ai.hasTag(COMBAT_TAG) && !isOnCooldown && !ai.hasTag(AI_FOLLOW_TAG)) {
            chosenAI = ai;
            break;
        }
    }

    if (!chosenAI) return;

    const responseDelayTicks = Math.floor((2 + Math.random() * 2) * 20); // 2-4s

    if (shouldAgreeToFollow(chosenAI)) {
        // Đồng ý
        player.addTag(PLAYER_FOLLOW_TAG);
        chosenAI.addTag(AI_FOLLOW_TAG);
        triggerFactionalEvent(chosenAI, "follow");
        
        // Lưu vào active followers (không có timeout!)
        activeFollowers.set(chosenAI.id, {
            playerId: player.id,
            lastProtectTime: 0
        });
        
        system.runTimeout(() => {
            if (!chosenAI?.isValid) return;
            const faction = getAIFaction(chosenAI);
            const messages = FOLLOW_AGREE_MESSAGES[faction];
            const aiName = chosenAI.nameTag || "AI Player";
            const response = getRandomElement(messages);
            world.sendMessage(`§f<${aiName}> ${response}`);
        }, responseDelayTicks);

    } else {
        // Từ chối
        const cooldownUntilTick = system.currentTick + (COOLDOWN_SECONDS * 20);
        followCooldowns.set(chosenAI.id, cooldownUntilTick);
        
        system.runTimeout(() => {
            if (!chosenAI?.isValid) return;
            const faction = getAIFaction(chosenAI);
            const messages = FOLLOW_REFUSE_MESSAGES[faction];
            const aiName = chosenAI.nameTag || "AI Player";
            
            // Thêm lý do nếu có
            const reason = getRefuseReason(chosenAI);
            let response = getRandomElement(messages);
            if (reason) {
                response += ` ${reason}`;
            }
            
            world.sendMessage(`§f<${aiName}> ${response}`);
        }, responseDelayTicks);
    }
}

function handleStopRequest(player) {
    // Tìm AI đang follow player này
    for (const [aiId, followData] of activeFollowers.entries()) {
        if (followData.playerId === player.id) {
            const ai = world.getEntity(aiId);
            if (ai?.isValid) {
                const faction = getAIFaction(ai);
                const messages = FOLLOW_LEAVE_MESSAGES[faction];
                const aiName = ai.nameTag || "AI Player";
                const response = getRandomElement(messages);
                world.sendMessage(`§f<${aiName}> ${response}`);
                
                stopFollowing(ai);
            }
        }
    }
}

function stopFollowing(ai) {
    if (!ai?.isValid) return;
    
    activeFollowers.delete(ai.id);
    
    const followingPlayerId = ai.getDynamicProperty("dhh:following_player_id");
    if (followingPlayerId) {
        const player = world.getEntity(followingPlayerId);
        if (player?.isValid) {
            player.removeTag(PLAYER_FOLLOW_TAG);
        }
        ai.setDynamicProperty("dhh:following_player_id", undefined);
    }
    
    ai.removeTag(AI_FOLLOW_TAG);
    triggerFactionalEvent(ai, "no_follow");
}

function protectPlayer(ai, player, followData) {
    if (!ai?.isValid || !player?.isValid) return;
    
    try {
        // Tìm monsters gần player
        const nearbyMonsters = player.dimension.getEntities({
            location: player.location,
            maxDistance: 12,
            families: ["monster"]
        });
        
        // Lọc monsters đang target player hoặc rất gần
        const threats = nearbyMonsters.filter(monster => {
            if (!monster?.isValid) return false;
            
            // Check if monster targeting player
            if (monster.target?.id === player.id) return true;
            
            // Check distance
            const dx = monster.location.x - player.location.x;
            const dz = monster.location.z - player.location.z;
            const dist = Math.sqrt(dx * dx + dz * dz);
            
            return dist < 5; // Rất gần player
        });
        
        if (threats.length > 0) {
            const currentTime = Date.now();
            
            // Chỉ chat cảnh báo mỗi 10s để tránh spam
            if (currentTime - followData.lastProtectTime > 10000) {
                const faction = getAIFaction(ai);
                const messages = PROTECT_MESSAGES[faction];
                const message = getRandomElement(messages);
                
                if (message) {
                    const aiName = ai.nameTag || "AI Player";
                    world.sendMessage(`§f<${aiName}> ${message}`);
                }
                
                followData.lastProtectTime = currentTime;
            }
            
            // Target monster gần nhất
            const closestThreat = threats[0];
            
            // Force AI target monster này
            // Dùng damage trick để force target
            try {
                ai.runCommand(`damage @e[c=1,name="${closestThreat.nameTag || closestThreat.typeId}"] 0 entity_attack entity @s`);
            } catch (e) {
                // Fallback: try different method
                try {
                    closestThreat.runCommand(`damage @s 0 entity_attack entity @e[c=1,name="${ai.nameTag}"]`);
                } catch (e2) {}
            }
        }
        
    } catch (e) {
        console.warn(`[Follower] Protection failed: ${e}`);
    }
}