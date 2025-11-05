import { world, system, EntityDamageCause } from "@minecraft/server";

const AI_ENTITY_TYPE_ID = "dhh:newb"; 
const FALLING_TAG = "falling";
const CHECK_INTERVAL_TICKS = 5;

// Lưu vị trí nguy hiểm (nơi AI đã chết vì rơi)
const dangerousLocations = new Map(); // key: "dimensionId", value: Array of {x, y, z, radius}

// Track trạng thái rơi của mỗi AI
const fallingStates = new Map(); // key: aiId, value: {startY, hasChatted, startTime}

// ==================== CHAT MESSAGES KHI RƠI ====================

const FALLING_MESSAGES = {
    good: [
        "Ối dồi ôi!", "Trời ơi!", "Cứu với!", "Aaa!", "Nguy rồi!"
    ],
    bad: [
        "Đm.", "Wtf.", "Shit.", "Vãi.", "Chết."
    ],
    crazy: [
        "WEEEEE!", "HAHA!", "Bay nào!", "Ủa ủa!", "Yeahhh!", "YOLO!"
    ]
};

const SURVIVED_MESSAGES = {
    good: [
        "Phew, sống sót!", "May quá!", "Ôi suýt nữa!", "An toàn rồi!"
    ],
    bad: [
        "Hừ.", "Tao vẫn sống.", "Còn sống.", "Chưa chết."
    ],
    crazy: [
        "Haha vẫn sống!", "Chưa chết nha!", "Ez!", "Skill!"
    ]
};

// ==================== HELPER FUNCTIONS ====================

function getAIFaction(ai) {
    if (ai.hasTag("good")) return "good";
    if (ai.hasTag("bad")) return "bad";
    if (ai.hasTag("crazy")) return "crazy";
    return "good";
}

function getRandomElement(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

function isInDangerZone(location, dimensionId) {
    const zones = dangerousLocations.get(dimensionId) || [];
    
    for (const zone of zones) {
        const dx = location.x - zone.x;
        const dy = location.y - zone.y;
        const dz = location.z - zone.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < zone.radius) {
            return true;
        }
    }
    
    return false;
}

function addDangerZone(location, dimensionId) {
    if (!dangerousLocations.has(dimensionId)) {
        dangerousLocations.set(dimensionId, []);
    }
    
    const zones = dangerousLocations.get(dimensionId);
    
    // Kiểm tra xem đã có zone gần đó chưa (tránh trùng lặp)
    const existingZone = zones.find(zone => {
        const dx = location.x - zone.x;
        const dz = location.z - zone.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        return distance < 10;
    });
    
    if (!existingZone) {
        zones.push({
            x: Math.floor(location.x),
            y: Math.floor(location.y),
            z: Math.floor(location.z),
            radius: 8 // Bán kính vùng nguy hiểm
        });
        
        // Giới hạn tối đa 50 vùng nguy hiểm mỗi dimension
        if (zones.length > 50) {
            zones.shift(); // Xóa vùng cũ nhất
        }
        
        console.log(`[Fall Detector] Added danger zone at ${Math.floor(location.x)}, ${Math.floor(location.y)}, ${Math.floor(location.z)} in ${dimensionId}`);
    }
}

// ==================== MAIN LOGIC ====================

export function initializeFallDetectorBehavior() {
    // Loop chính: Check falling state
    system.runInterval(() => {
        let allAis = [];
        const dimensionIdsToQuery = ["overworld", "nether", "the_end"];
        for (const dimId of dimensionIdsToQuery) {
            try {
                const dimension = world.getDimension(dimId);
                const entitiesInDimension = dimension.getEntities({ type: AI_ENTITY_TYPE_ID });
                allAis.push(...entitiesInDimension);
            } catch (e) {}
        }

        for (const ai of allAis) {
            const isCurrentlyFalling = ai.isFalling;
            const hasTheTag = ai.hasTag(FALLING_TAG);

            // Bắt đầu rơi
            if (isCurrentlyFalling && !hasTheTag) {
                ai.addTag(FALLING_TAG);
                
                // Khởi tạo trạng thái rơi
                if (!fallingStates.has(ai.id)) {
                    fallingStates.set(ai.id, {
                        startY: ai.location.y,
                        hasChatted: false,
                        startTime: Date.now()
                    });
                }
                
                const state = fallingStates.get(ai.id);
                state.startY = ai.location.y;
                state.hasChatted = false;
                state.startTime = Date.now();
            } 
            // Đang rơi
            else if (isCurrentlyFalling && hasTheTag) {
                const state = fallingStates.get(ai.id);
                
                if (state && !state.hasChatted) {
                    const fallDistance = state.startY - ai.location.y;
                    
                    // Nếu rơi > 10 blocks thì chat
                    if (fallDistance > 10) {
                        const faction = getAIFaction(ai);
                        const messages = FALLING_MESSAGES[faction];
                        const message = getRandomElement(messages);
                        
                        if (message) {
                            const aiName = ai.nameTag || "AI Player";
                            world.sendMessage(`§f<${aiName}> ${message}`);
                            state.hasChatted = true;
                        }
                    }
                }
            }
            // Ngừng rơi
            else if (!isCurrentlyFalling && hasTheTag) {
                ai.removeTag(FALLING_TAG);
                
                const state = fallingStates.get(ai.id);
                
                if (state) {
                    const fallDistance = state.startY - ai.location.y;
                    
                    // Nếu rơi từ cao mà sống sót → chat
                    if (fallDistance > 15 && state.hasChatted) {
                        try {
                            const healthComp = ai.getComponent("minecraft:health");
                            if (healthComp && healthComp.currentValue > 0) {
                                const faction = getAIFaction(ai);
                                const messages = SURVIVED_MESSAGES[faction];
                                const message = getRandomElement(messages);
                                
                                if (message) {
                                    const aiName = ai.nameTag || "AI Player";
                                    world.sendMessage(`§f<${aiName}> ${message}`);
                                }
                            }
                        } catch (e) {}
                    }
                    
                    // Cleanup state
                    fallingStates.delete(ai.id);
                }
            }
        }
        
        // Cleanup states của AI không còn tồn tại
        const currentAiIds = new Set(allAis.map(ai => ai.id));
        for (const aiId of fallingStates.keys()) {
            if (!currentAiIds.has(aiId)) {
                fallingStates.delete(aiId);
            }
        }
        
    }, CHECK_INTERVAL_TICKS);
    
    // Hook vào entityDie để lưu vị trí nguy hiểm
    world.afterEvents.entityDie.subscribe(event => {
        const { deadEntity, damageSource } = event;
        
        if (deadEntity.typeId === AI_ENTITY_TYPE_ID) {
            const cause = damageSource?.cause;
            
            // Nếu chết vì fall damage
            if (cause === EntityDamageCause.fall) {
                const deathLocation = deadEntity.location;
                const dimensionId = deadEntity.dimension.id;
                
                // Lưu vị trí nguy hiểm
                addDangerZone(deathLocation, dimensionId);
                
                // Chat trước khi chết (nếu chưa chat)
                const aiName = deadEntity.nameTag || "AI Player";
                const faction = getAIFaction(deadEntity);
                
                const deathMessages = {
                    good: ["Aaa chết rồi!", "Nooo!", "Đau quá!"],
                    bad: ["Đm.", "Vãi.", "Chết."],
                    crazy: ["HAHA chết!", "Ối!", "Bye!"]
                };
                
                const messages = deathMessages[faction];
                const message = getRandomElement(messages);
                
                if (message) {
                    world.sendMessage(`§f<${aiName}> ${message}`);
                }
            }
        }
    });
    
    // Loop kiểm tra AI có đang ở vùng nguy hiểm không
    system.runInterval(() => {
        let allAis = [];
        const dimensionIdsToQuery = ["overworld", "nether", "the_end"];
        for (const dimId of dimensionIdsToQuery) {
            try {
                const dimension = world.getDimension(dimId);
                const entitiesInDimension = dimension.getEntities({ type: AI_ENTITY_TYPE_ID });
                allAis.push(...entitiesInDimension);
            } catch (e) {}
        }
        
        for (const ai of allAis) {
            if (!ai?.isValid) continue;
            
            // Không check khi đang combat
            if (ai.hasTag("has_target")) continue;
            
            const dimensionId = ai.dimension.id;
            
            if (isInDangerZone(ai.location, dimensionId)) {
                // Đánh dấu AI biết đây là vùng nguy hiểm
                ai.setDynamicProperty("dhh:in_danger_zone", true);
                
                // Random chat cảnh báo (5% mỗi lần check)
                if (Math.random() < 0.05) {
                    const faction = getAIFaction(ai);
                    const warningMessages = {
                        good: ["Chỗ này nguy hiểm...", "Cẩn thận nha", "Đừng lại gần đây"],
                        bad: ["Vùng chết.", "Nguy hiểm.", "Tránh ra."],
                        crazy: ["Ơ chỗ này!", "Nguy hiểm kìa!", "Chết ở đây rồi"]
                    };
                    
                    const messages = warningMessages[faction];
                    const message = getRandomElement(messages);
                    
                    if (message) {
                        const aiName = ai.nameTag || "AI Player";
                        world.sendMessage(`§f<${aiName}> ${message}`);
                    }
                }
                
                // TODO: Có thể thêm logic di chuyển ra khỏi vùng nguy hiểm
                // Nhưng cần pathfinding phức tạp
                
            } else {
                ai.setDynamicProperty("dhh:in_danger_zone", false);
            }
        }
        
    }, 100); // Check mỗi 5 giây
    
    console.log("[AI Fall Detector] Enhanced behavior with memory initialized.");
}