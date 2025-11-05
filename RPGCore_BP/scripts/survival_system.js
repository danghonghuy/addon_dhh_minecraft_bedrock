// --- START OF FILE survival_system.js (EXPANDED VERSION) ---

import { world, system, ItemStack, EffectTypes } from "@minecraft/server";
import { CONFIG } from "./config.js";

const survivalConfig = CONFIG.SURVIVAL_CONFIG;

// === UTILITY FUNCTIONS ===

function hasEffect(player, effectId) {
    try {
        const effect = player.getEffect(effectId);
        return effect !== undefined && effect !== null;
    } catch (e) {
        return false;
    }
}

function getPlayerBiome(player) {
    try {
        const block = player.dimension.getBlock({
            x: Math.floor(player.location.x),
            y: Math.floor(player.location.y) - 1,
            z: Math.floor(player.location.z)
        });
        return block ? block.typeId.toLowerCase() : "";
    } catch (e) {
        return "";
    }
}

function isStandingOnHotBlock(player) {
    try {
        // Kiểm tra block ngay tại chân người chơi
        const blockAtFeet = player.dimension.getBlock(player.location);
        // Kiểm tra block ngay bên dưới chân người chơi
        const blockBelow = player.dimension.getBlock({ 
            x: Math.floor(player.location.x), 
            y: Math.floor(player.location.y) - 1, 
            z: Math.floor(player.location.z) 
        });

        const hotBlockIds = ['minecraft:campfire', 'minecraft:soul_campfire', 'minecraft:magma_block'];
        
        // Trả về true nếu một trong hai block là block nóng
        return (blockAtFeet && hotBlockIds.includes(blockAtFeet.typeId)) || 
               (blockBelow && hotBlockIds.includes(blockBelow.typeId));
    } catch (e) {
        return false;
    }
}

function isNearHeatSource(player) {
    try {
        const playerPos = player.location;
        const checkRadius = 1;
        
        for (let x = -checkRadius; x <= checkRadius; x++) {
            for (let y = -checkRadius; y <= checkRadius; y++) {
                for (let z = -checkRadius; z <= checkRadius; z++) {
                    const block = player.dimension.getBlock({
                        x: Math.floor(playerPos.x) + x,
                        y: Math.floor(playerPos.y) + y,
                        z: Math.floor(playerPos.z) + z
                    });
                    
                    if (block) {
                        const blockId = block.typeId;
                        if (blockId.includes('fire') || 
                            blockId.includes('lava') || 
                            blockId.includes('furnace') ||
                            blockId.includes('campfire') ||
                            blockId.includes('torch')) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}

function getArmorModifier(player) {
    try {
        const equippable = player.getComponent("equippable");
        if (!equippable) return { isWearingArmor: false, isLeather: false, armorCount: 0 };

        let armorCount = 0;
        let isLeather = true;
        
        const slots = ["Head", "Chest", "Legs", "Feet"];
        for (const slot of slots) {
            const item = equippable.getEquipment(slot);
            if (item) {
                armorCount++;
                if (!item.typeId.includes("leather")) {
                    isLeather = false;
                }
            }
        }
        
        return { 
            isWearingArmor: armorCount > 0, 
            isLeather: isLeather && armorCount > 0, 
            armorCount 
        };
    } catch (e) {
        return { isWearingArmor: false, isLeather: false, armorCount: 0 };
    }
}

// === MAIN HANDLER FUNCTIONS ===

function handleTemperatureAndSickness(player) {
    if (!survivalConfig.TEMP_ENABLED) return;
    
    // ✅ SỬA LỖI: Dùng timestamp
    const now = Date.now();
    const lastUpdate = player.getDynamicProperty("dhh:temp_last_update") ?? now;
    const timeSinceLastUpdate = now - lastUpdate;

    if (timeSinceLastUpdate < (survivalConfig.TEMP_UPDATE_INTERVAL / 20) * 1000) {
        return;
    }

    try {
        player.setDynamicProperty("dhh:temp_last_update", now);
        let currentTemp = player.getDynamicProperty("dhh:temperature");
        
        // ⚠️ SỬA LỖI: Khởi tạo nhiệt độ nếu chưa có
        if (currentTemp === undefined || currentTemp === null) {
            currentTemp = survivalConfig.TEMP_DEFAULT_TARGET;
            player.setDynamicProperty("dhh:temperature", currentTemp);
        }
        
        let targetTemp = survivalConfig.TEMP_DEFAULT_TARGET;
        let changeFactor = 1.0;

        const dimensionId = player.dimension.id;
        const playerBiome = getPlayerBiome(player);
        
        if (dimensionId.includes("nether")) {
            targetTemp = 45.0;
            changeFactor *= survivalConfig.TEMP_BIOME_HOT_FACTOR;
        } else if (dimensionId.includes("end")) {
            targetTemp = 30.0;
        } else {
            if (playerBiome.includes("snow") || playerBiome.includes("ice") || playerBiome.includes("frozen")) {
                targetTemp = 25.0;
                changeFactor *= survivalConfig.TEMP_BIOME_COLD_FACTOR;
            } else if (playerBiome.includes("desert") || playerBiome.includes("badlands") || playerBiome.includes("savanna")) {
                targetTemp = 45.0;
                changeFactor *= survivalConfig.TEMP_BIOME_HOT_FACTOR;
            } else if (playerBiome.includes("jungle")) {
                targetTemp = 40.0;
                changeFactor *= 1.2;
            }
        }

        const worldTime = world.getTimeOfDay();
        if (worldTime >= 13000 && worldTime <= 23000) {
            changeFactor *= survivalConfig.TEMP_NIGHT_FACTOR;
        }

        if (player.isInWater) {
            targetTemp = 20.0;
            changeFactor *= survivalConfig.TEMP_IN_WATER_FACTOR;
        }

        if (isNearHeatSource(player)) {
            targetTemp = 40.0;
            changeFactor *= survivalConfig.TEMP_NEAR_FIRE_FACTOR;
        }

        const armorInfo = getArmorModifier(player);
        if (armorInfo.isWearingArmor) {
            if (armorInfo.isLeather) {
                changeFactor /= (1 + survivalConfig.TEMP_LEATHER_ARMOR_MODIFIER * armorInfo.armorCount / 4);
            } else {
                changeFactor *= (1 + survivalConfig.TEMP_METAL_ARMOR_MODIFIER * armorInfo.armorCount / 4);
            }
        }

      const timeMultiplier = timeSinceLastUpdate / ((survivalConfig.TEMP_UPDATE_INTERVAL / 20) * 1000);

const tempDifference = targetTemp - currentTemp;
const changeAmount = Math.sign(tempDifference) * 
                     Math.min(Math.abs(tempDifference), survivalConfig.TEMP_CHANGE_PER_TICK * changeFactor * timeMultiplier);

currentTemp = Math.max(0, Math.min(50, currentTemp + changeAmount));
player.setDynamicProperty("dhh:temperature", currentTemp);

        // ⚠️ SỬA LỖI: Áp dụng hiệu ứng nhiệt độ
        if (currentTemp <= survivalConfig.TEMP_CRITICAL_COLD_THRESHOLD) {
            player.applyDamage(1, { cause: 'freezing' });
            if (system.currentTick % 40 === 0) {
                player.dimension.spawnParticle("minecraft:freezing_effect_particle", player.location);
            }
        } else if (currentTemp <= survivalConfig.TEMP_COLD_THRESHOLD) {
            player.addEffect(EffectTypes.get("slowness"), 
                           survivalConfig.TEMP_UPDATE_INTERVAL + 20, 
                           { amplifier: 0, showParticles: false });
        } else if (currentTemp >= survivalConfig.TEMP_CRITICAL_HOT_THRESHOLD) {
            player.applyDamage(1, { cause: 'fire' });
            if (system.currentTick % 40 === 0) {
                player.dimension.spawnParticle("minecraft:lava_particle", player.location);
            }
        } else if (currentTemp >= survivalConfig.TEMP_HOT_THRESHOLD) {
            player.addEffect(EffectTypes.get("hunger"), 
                           survivalConfig.TEMP_UPDATE_INTERVAL + 20, 
                           { amplifier: 0, showParticles: false });
        }

        // === XỬ LÝ BỆNH TẬT ===
        if (player.hasTag('sickness_immune')) {
            return;
        }

        const isUnstable = currentTemp <= survivalConfig.TEMP_COLD_THRESHOLD || 
                          currentTemp >= survivalConfig.TEMP_HOT_THRESHOLD;
        
        let unstableTicks = player.getDynamicProperty("dhh:temp_unstable_ticks") ?? 0;

        if (isUnstable) {
            unstableTicks += survivalConfig.TEMP_UPDATE_INTERVAL;
            
            if (unstableTicks >= survivalConfig.SICKNESS.UNSTABLE_TEMP_THRESHOLD_TICKS) {
                if (!player.hasTag('fever') && !player.hasTag('cold')) {
                    if (Math.random() < survivalConfig.SICKNESS.CHANCE) {
                        if (currentTemp <= survivalConfig.TEMP_COLD_THRESHOLD) {
                            player.addTag('cold');
                            player.setDynamicProperty("dhh:sickness_self_heal_timer", 
                                                     survivalConfig.SICKNESS.SELF_HEAL_DURATION_TICKS);
                            player.sendMessage("§9❄ §bBạn bắt đầu run rẩy và hắt hơi... Có vẻ bạn đã bị cảm lạnh.");
                            player.playSound("random.sneeze");
                        } else {
                            player.addTag('fever');
                            player.setDynamicProperty("dhh:sickness_self_heal_timer", 
                                                     survivalConfig.SICKNESS.SELF_HEAL_DURATION_TICKS);
                            player.sendMessage("§6🔥 §eĐầu bạn nóng ran và choáng váng... Bạn bị sốt rồi.");
                            player.playSound("mob.villager.no");
                        }
                    }
                }
                unstableTicks = 0;
            }
        } else {
            unstableTicks = 0;
        }
        
        player.setDynamicProperty("dhh:temp_unstable_ticks", unstableTicks);

        // === XỬ LÝ HIỆU ỨNG BỆNH ===
        if (player.hasTag('fever') || player.hasTag('cold')) {
            player.addEffect(EffectTypes.get("weakness"), 
                           survivalConfig.TEMP_UPDATE_INTERVAL + 20, 
                           { amplifier: 0, showParticles: false });
            player.addEffect(EffectTypes.get("mining_fatigue"), 
                           survivalConfig.TEMP_UPDATE_INTERVAL + 20, 
                           { amplifier: 0, showParticles: false });
            player.addEffect(EffectTypes.get("hunger"), 
                           survivalConfig.TEMP_UPDATE_INTERVAL + 20, 
                           { amplifier: 0, showParticles: false });
            
            if (Math.random() < 0.05) {
                player.playSound(player.hasTag('cold') ? "random.sneeze" : "mob.villager.no");
            }

            let stabilizeTicks = player.getDynamicProperty("dhh:sickness_stabilize_timer") ?? 0;
            
            if (!isUnstable) {
                stabilizeTicks += survivalConfig.TEMP_UPDATE_INTERVAL;
                
                if (stabilizeTicks >= survivalConfig.SICKNESS.STABILIZE_TEMP_CURE_TICKS) {
                    player.removeTag('fever');
                    player.removeTag('cold');
                    player.addTag('sickness_immune');
                    player.sendMessage("§a✓ Sau khi giữ ấm/làm mát cơ thể, bạn đã cảm thấy khỏe hơn.");
                    player.playSound("random.levelup");
                    
                    system.runTimeout(() => {
                        if (player.isValid) {
                            player.removeTag('sickness_immune');
                        }
                    }, 120 * 20);
                    
                    stabilizeTicks = 0;
                }
            } else {
                stabilizeTicks = 0;
            }
            
            player.setDynamicProperty("dhh:sickness_stabilize_timer", stabilizeTicks);

            let selfHealTimer = player.getDynamicProperty("dhh:sickness_self_heal_timer");
            
            // ⚠️ SỬA LỖI: Khởi tạo timer nếu chưa có
            if (selfHealTimer === undefined || selfHealTimer === null) {
                selfHealTimer = survivalConfig.SICKNESS.SELF_HEAL_DURATION_TICKS;
                player.setDynamicProperty("dhh:sickness_self_heal_timer", selfHealTimer);
            }
            
            selfHealTimer -= survivalConfig.TEMP_UPDATE_INTERVAL;
            
            if (selfHealTimer <= 0) {
                player.removeTag('fever');
                player.removeTag('cold');
                player.addTag('sickness_immune');
                player.sendMessage("§a✓ Sau một thời gian dài, cuối cùng bệnh của bạn cũng đã tự khỏi.");
                player.playSound("random.levelup");
                
                system.runTimeout(() => {
                    if (player.isValid) {
                        player.removeTag('sickness_immune');
                    }
                }, 120 * 20);
                
                selfHealTimer = 0;
            }
            
            player.setDynamicProperty("dhh:sickness_self_heal_timer", selfHealTimer);
        }

    } catch (error) {
        console.warn(`[Survival System] Temperature error for ${player.name}: ${error.message}`);
    }
}

function handleThirst(player) {
    console.error(`[THIRST FLOW] ----------------- Running handleThirst for ${player.name} at tick ${system.currentTick} -----------------`);

    if (!survivalConfig.THIRST_ENABLED) {
        console.error("[THIRST FLOW] Exited because THIRST_ENABLED is false.");
        return;
    }

    // ✅ SỬA LỖI: Dùng timestamp riêng thay vì dựa vào system.currentTick
    const now = Date.now();
    const lastUpdate = player.getDynamicProperty("dhh:thirst_last_update") ?? now;
    const timeSinceLastUpdate = now - lastUpdate;

    // Chỉ cập nhật khi đã qua đủ thời gian (10 giây = 10000ms)
    if (timeSinceLastUpdate < (survivalConfig.THIRST_UPDATE_INTERVAL / 20) * 1000) {
        console.error(`[THIRST FLOW] Not enough time passed. Last update: ${lastUpdate}, Now: ${now}`);
        return;
    }

    try {
        // Cập nhật timestamp
        player.setDynamicProperty("dhh:thirst_last_update", now);

        // Bước 1: Lấy giá trị gốc
        let currentThirst = player.getDynamicProperty("dhh:thirst");
        console.error(`[THIRST VALUE] 1. Value from getDynamicProperty: ${currentThirst} | Type: ${typeof currentThirst}`);

        // Bước 2: Kiểm tra và khởi tạo nếu cần
        if (currentThirst === undefined || currentThirst === null || isNaN(currentThirst)) {
            console.error(`[THIRST FIX] Value was invalid. Resetting to 100.`);
            currentThirst = 100;
        }
        
        // Bước 3: Tính toán lượng mất nước (điều chỉnh theo thời gian thực tế)
        const timeMultiplier = timeSinceLastUpdate / ((survivalConfig.THIRST_UPDATE_INTERVAL / 20) * 1000);
        let dropAmount = survivalConfig.THIRST_DROP_RATE * timeMultiplier;
        
        if (player.isSprinting) {
            dropAmount *= survivalConfig.THIRST_SPRINT_MULTIPLIER;
        }
        console.error(`[THIRST CALC] 2. Calculated dropAmount: ${dropAmount} (time multiplier: ${timeMultiplier})`);

        // Bước 4: Thực hiện phép trừ
        currentThirst = Math.max(0, currentThirst - dropAmount);
        console.error(`[THIRST VALUE] 3. Value AFTER calculation: ${currentThirst}`);

        // Bước 5: Lưu giá trị mới
        player.setDynamicProperty("dhh:thirst", currentThirst);
        console.error(`[THIRST VALUE] 4. Value has been set back to dynamic property.`);

        // Bước 6: Kiểm tra điều kiện và áp dụng hiệu ứng
        console.error(`[THIRST CONDITION] 5. Checking conditions now...`);
        if (currentThirst <= 0) {
            console.error(`[THIRST ACTION] APPLYING DAMAGE! Thirst is ${currentThirst}`);
            player.applyDamage(1, { cause: 'magic' });
            if (system.currentTick % 40 === 0) {
                player.sendMessage("§c💧 Bạn đang mất nước nghiêm trọng!");
            }
        } else if (currentThirst <= 20) {
            console.error(`[THIRST ACTION] APPLYING WEAKNESS! Thirst is ${currentThirst}`);
            player.addEffect(EffectTypes.get("weakness"), 
                           survivalConfig.THIRST_UPDATE_INTERVAL + 20, 
                           { amplifier: 0, showParticles: false });
            player.addEffect(EffectTypes.get("mining_fatigue"), 
                           survivalConfig.THIRST_UPDATE_INTERVAL + 20, 
                           { amplifier: 0, showParticles: false });
        } else {
             console.error(`[THIRST CONDITION] No conditions met. Thirst level is fine.`);
        }
        console.error(`[THIRST FLOW] ----------------- Finished handleThirst -----------------`);

    } catch (error) {
        console.warn(`[Survival System] Thirst error for ${player.name}: ${error.message}`);
    }
}


function handleInjuryAndVirusEffects(player) {
    // ✅ SỬA LỖI: Dùng timestamp
    const now = Date.now();
    const lastUpdate = player.getDynamicProperty("dhh:injury_last_update") ?? now;
    const timeSinceLastUpdate = now - lastUpdate;

    if (timeSinceLastUpdate < 1000) { // Chạy mỗi 1 giây
        return;
    }

    try {
        player.setDynamicProperty("dhh:injury_last_update", now);
        // === 1. GÃY CHÂN ===
        if (player.hasTag('broken_leg')) {
            player.addEffect(EffectTypes.get("slowness"), 40, 
                           { amplifier: 2, showParticles: false });
            
            let restTimer = player.getDynamicProperty("dhh:rest_timer") ?? 0;
            
            const velocity = player.getVelocity();
            const isStanding = Math.abs(velocity.x) < 0.01 && 
                              Math.abs(velocity.z) < 0.01 && 
                              !player.isJumping;
            
            if (isStanding) {
                restTimer += 20;
                
                if (restTimer % (5 * 20) === 0) {
                    const progress = Math.floor((restTimer / survivalConfig.BROKEN_LEG.REST_DURATION_TICKS) * 100);
                    player.onScreenDisplay.setActionBar(`§e🦴 Đang hồi phục: ${progress}%`);
                }
                
                if (restTimer >= survivalConfig.BROKEN_LEG.REST_DURATION_TICKS) {
                    player.removeTag('broken_leg');
                    player.sendMessage("§a✓ Chân bạn đã lành sau khi nghỉ ngơi.");
                    player.playSound("random.levelup");
                    restTimer = 0;
                }
            } else {
                restTimer = 0;
            }
            
            player.setDynamicProperty("dhh:rest_timer", restTimer);

            let selfHealTimer = player.getDynamicProperty("dhh:broken_leg_self_heal_timer");
            
            // ⚠️ SỬA LỖI: Nếu timer chưa được set, khởi tạo nó
            if (selfHealTimer === undefined || selfHealTimer === null) {
                selfHealTimer = survivalConfig.BROKEN_LEG.SELF_HEAL_DURATION_TICKS;
                player.setDynamicProperty("dhh:broken_leg_self_heal_timer", selfHealTimer);
            }
            
            selfHealTimer -= 20;
            
            if (selfHealTimer <= 0) {
                player.removeTag('broken_leg');
                player.sendMessage("§e⚠ Sau một thời gian dài, chân bạn đã tự lành (nhưng không hoàn hảo).");
                player.playSound("random.break");
                selfHealTimer = 0; // Reset về 0 thay vì undefined
            }
            
            player.setDynamicProperty("dhh:broken_leg_self_heal_timer", selfHealTimer);
        }

        // === 2. CHẢY MÁU ===
        if (player.hasTag('bleeding')) {
            let ticksLeft = player.getDynamicProperty("dhh:bleeding_ticks_left");
            
            // ⚠️ SỬA LỖI: Khởi tạo nếu chưa có
            if (ticksLeft === undefined || ticksLeft === null) {
                ticksLeft = survivalConfig.BLEEDING.DURATION_TICKS;
                player.setDynamicProperty("dhh:bleeding_ticks_left", ticksLeft);
            }
            
            if (ticksLeft % survivalConfig.BLEEDING.DAMAGE_INTERVAL_TICKS === 0) {
                player.applyDamage(survivalConfig.BLEEDING.DAMAGE_AMOUNT, { cause: 'magic' });
                player.dimension.spawnParticle("minecraft:redstone_dust_particle", player.location);
            }
            
            ticksLeft -= 20;
            
            if (ticksLeft <= 0) {
                player.removeTag('bleeding');
                player.sendMessage("§a✓ Vết thương đã tự cầm máu.");
                player.playSound("random.levelup");
                ticksLeft = 0;
            }
            
            player.setDynamicProperty("dhh:bleeding_ticks_left", ticksLeft);
        }

     // === 3. BỎNG (ĐÃ SỬA ĐỔI) ===
// THÊM MỚI: Sử dụng hàm trợ giúp vừa tạo
const onHotBlock = isStandingOnHotBlock(player);

if (player.isOnFire) {
    // Logic cũ khi bị bốc cháy (giữ nguyên)
    let fireTicks = (player.getDynamicProperty("dhh:on_fire_ticks") ?? 0) + 20;
    
    if (fireTicks >= survivalConfig.BURNS.ON_FIRE_THRESHOLD_TICKS && !player.hasTag('burned')) {
        player.addTag('burned');
        player.setDynamicProperty("dhh:burned_ticks_left", survivalConfig.BURNS.DURATION_TICKS);
        player.sendMessage("§6🔥 Bạn bị bỏng nặng do lửa! Khả năng chiến đấu bị giảm.");
        player.playSound("mob.ghast.scream");
    }
    
    player.setDynamicProperty("dhh:on_fire_ticks", fireTicks);
    // Reset bộ đếm của block nóng để tránh tính trùng
    player.setDynamicProperty("dhh:contact_burn_ticks", 0);

} else if (onHotBlock) {
    // THÊM MỚI: Logic khi đứng trên block nóng
    let contactTicks = (player.getDynamicProperty("dhh:contact_burn_ticks") ?? 0) + 20;

    if (contactTicks >= survivalConfig.BURNS.ON_FIRE_THRESHOLD_TICKS && !player.hasTag('burned')) {
        player.addTag('burned');
        player.setDynamicProperty("dhh:burned_ticks_left", survivalConfig.BURNS.DURATION_TICKS);
        player.sendMessage("§6🔥 Bạn bị bỏng nặng do tiếp xúc! Khả năng chiến đấu bị giảm.");
        player.playSound("mob.ghast.scream");
    }

    player.setDynamicProperty("dhh:contact_burn_ticks", contactTicks);
    // Reset bộ đếm của lửa cháy
    player.setDynamicProperty("dhh:on_fire_ticks", 0);

} else {
    // SỬA ĐỔI: Nếu không còn bị cháy và cũng không đứng trên block nóng, reset cả hai bộ đếm
    player.setDynamicProperty("dhh:on_fire_ticks", 0);
    player.setDynamicProperty("dhh:contact_burn_ticks", 0);
}

        if (player.hasTag('burned')) {
            player.addEffect(EffectTypes.get("weakness"), 40, 
                           { amplifier: 1, showParticles: false });
            player.addEffect(EffectTypes.get("mining_fatigue"), 40, 
                           { amplifier: 0, showParticles: false });
            
            if (player.isInWater) {
                let waterTicks = (player.getDynamicProperty("dhh:water_cure_ticks") ?? 0) + 20;
                
                if (waterTicks % (2 * 20) === 0) {
                    player.onScreenDisplay.setActionBar(`§b💧 Đang chữa bỏng: ${Math.floor((waterTicks / survivalConfig.BURNS.WATER_CURE_DURATION_TICKS) * 100)}%`);
                }
                
                if (waterTicks >= survivalConfig.BURNS.WATER_CURE_DURATION_TICKS) {
                    player.removeTag('burned');
                    player.sendMessage("§b✓ Nước mát đã làm dịu vết bỏng của bạn.");
                    player.playSound("random.levelup");
                    waterTicks = 0;
                }
                
                player.setDynamicProperty("dhh:water_cure_ticks", waterTicks);
            } else {
                player.setDynamicProperty("dhh:water_cure_ticks", 0);
                
                let ticksLeft = player.getDynamicProperty("dhh:burned_ticks_left");
                
                // ⚠️ SỬA LỖI
                if (ticksLeft === undefined || ticksLeft === null) {
                    ticksLeft = survivalConfig.BURNS.DURATION_TICKS;
                    player.setDynamicProperty("dhh:burned_ticks_left", ticksLeft);
                }
                
                ticksLeft -= 20;
                
                if (ticksLeft <= 0) {
                    player.removeTag('burned');
                    player.sendMessage("§a✓ Vết bỏng của bạn đã tự lành theo thời gian.");
                    player.playSound("random.levelup");
                    ticksLeft = 0;
                }
                
                player.setDynamicProperty("dhh:burned_ticks_left", ticksLeft);
            }
        }

        // === 4. CHOÁNG VÁNG ===
        if (player.hasTag('dazed')) {
            player.addEffect(EffectTypes.get("nausea"), 120, 
                           { amplifier: 0, showParticles: false });
            player.addEffect(EffectTypes.get("slowness"), 40, 
                           { amplifier: 0, showParticles: false });
            
            let ticksLeft = player.getDynamicProperty("dhh:dazed_ticks_left");
            
            // ⚠️ SỬA LỖI
            if (ticksLeft === undefined || ticksLeft === null) {
                ticksLeft = survivalConfig.DAZED.DURATION_TICKS;
                player.setDynamicProperty("dhh:dazed_ticks_left", ticksLeft);
            }
            
            ticksLeft -= 20;
            
            if (ticksLeft <= 0) {
                player.removeTag('dazed');
                player.sendMessage("§a✓ Đầu bạn đã bớt choáng.");
                player.playSound("random.levelup");
                ticksLeft = 0;
            }
            
            player.setDynamicProperty("dhh:dazed_ticks_left", ticksLeft);
        }

        // === 5. BONG GÂN TAY ===
        if (player.hasTag('sprained_arm')) {
            player.addEffect(EffectTypes.get("mining_fatigue"), 40, 
                           { amplifier: 2, showParticles: false });
            player.addEffect(EffectTypes.get("weakness"), 40, 
                           { amplifier: 1, showParticles: false });
            
            let restTimer = player.getDynamicProperty("dhh:sprained_arm_rest_timer") ?? 0;
            
            const velocity = player.getVelocity();
            const isResting = Math.abs(velocity.x) < 0.5 && 
                             Math.abs(velocity.z) < 0.5 && 
                             !player.isJumping;
            
            if (isResting) {
                restTimer += 20;
                
                if (restTimer % (5 * 20) === 0) {
                    const progress = Math.floor((restTimer / survivalConfig.SPRAINED_ARM.REST_DURATION_TICKS) * 100);
                    player.onScreenDisplay.setActionBar(`§e💪 Tay đang hồi phục: ${progress}%`);
                }
                
                if (restTimer >= survivalConfig.SPRAINED_ARM.REST_DURATION_TICKS) {
                    player.removeTag('sprained_arm');
                    player.sendMessage("§a✓ Tay bạn đã bớt đau sau khi nghỉ ngơi.");
                    player.playSound("random.levelup");
                    restTimer = 0;
                }
            } else {
                restTimer = Math.max(0, restTimer - 10);
            }
            
            player.setDynamicProperty("dhh:sprained_arm_rest_timer", restTimer);

            let selfHealTimer = player.getDynamicProperty("dhh:sprained_arm_self_heal_timer");
            
            // ⚠️ SỬA LỖI
            if (selfHealTimer === undefined || selfHealTimer === null) {
                selfHealTimer = survivalConfig.SPRAINED_ARM.SELF_HEAL_DURATION_TICKS;
                player.setDynamicProperty("dhh:sprained_arm_self_heal_timer", selfHealTimer);
            }
            
            selfHealTimer -= 20;
            
            if (selfHealTimer <= 0) {
                player.removeTag('sprained_arm');
                player.sendMessage("§e⚠ Sau một thời gian dài, tay bạn đã tự lành.");
                player.playSound("random.levelup");
                selfHealTimer = 0;
            }
            
            player.setDynamicProperty("dhh:sprained_arm_self_heal_timer", selfHealTimer);
        }

        // === 6. GIUN SÁN ===
        if (player.hasTag('parasite')) {
            player.addEffect(EffectTypes.get("hunger"), 40, 
                           { amplifier: 1, showParticles: false });
            player.addEffect(EffectTypes.get("weakness"), 40, 
                           { amplifier: 0, showParticles: false });
            
            let ticksLeft = player.getDynamicProperty("dhh:parasite_ticks_left");
            
            // ⚠️ SỬA LỖI
            if (ticksLeft === undefined || ticksLeft === null) {
                ticksLeft = survivalConfig.PARASITE.DURATION_TICKS;
                player.setDynamicProperty("dhh:parasite_ticks_left", ticksLeft);
            }
            
            if (ticksLeft % survivalConfig.PARASITE.DAMAGE_INTERVAL_TICKS === 0) {
                player.applyDamage(survivalConfig.PARASITE.DAMAGE_AMOUNT, { cause: 'magic' });
                player.sendMessage("§7🐛 Bạn cảm thấy bụng quặn thắt...");
            }
            
            if (Math.random() < 0.1) {
                player.dimension.spawnParticle("minecraft:villager_angry", {
                    x: player.location.x,
                    y: player.location.y + 1,
                    z: player.location.z
                });
            }
            
            if (ticksLeft % (10 * 20) === 0) {
                const timeLeft = Math.floor(ticksLeft / 20);
                player.onScreenDisplay.setActionBar(`§7🐛 Giun sán: còn ${timeLeft}s (uống nước để giảm)`);
            }
            
            ticksLeft -= 20;
            
            if (ticksLeft <= 0) {
                player.removeTag('parasite');
                player.sendMessage("§a✓ Giun sán đã tự chết sau một thời gian.");
                player.playSound("random.levelup");
                ticksLeft = 0;
            }
            
            player.setDynamicProperty("dhh:parasite_ticks_left", ticksLeft);
        }

        // === 7. VIRUS ZOMBIE ===
        if (player.hasTag('virus_stage1') || player.hasTag('virus_stage2') || player.hasTag('virus_stage3')) {
            let virusTicks = player.getDynamicProperty("dhh:virus_ticks");
            
            // ⚠️ SỬA LỖI QUAN TRỌNG
            if (virusTicks === undefined || virusTicks === null) {
                // Khởi tạo timer dựa trên stage hiện tại
                if (player.hasTag('virus_stage3')) {
                    virusTicks = survivalConfig.ZOMBIE_VIRUS.STAGE_3_DURATION_TICKS;
                } else if (player.hasTag('virus_stage2')) {
                    virusTicks = survivalConfig.ZOMBIE_VIRUS.STAGE_2_DURATION_TICKS;
                } else {
                    virusTicks = survivalConfig.ZOMBIE_VIRUS.STAGE_1_DURATION_TICKS;
                }
                player.setDynamicProperty("dhh:virus_ticks", virusTicks);
            }
            
            virusTicks -= 20;

            if (virusTicks % (10 * 20) === 0 && virusTicks > 0) {
                const stage = player.hasTag('virus_stage3') ? 3 : (player.hasTag('virus_stage2') ? 2 : 1);
                const timeLeft = Math.floor(virusTicks / 20);
                player.onScreenDisplay.setActionBar(`§4☣ Virus Giai đoạn ${stage} - Còn ${timeLeft}s`);
            }

            if (virusTicks <= 0) {
                if (player.hasTag('virus_stage1')) {
                    player.removeTag('virus_stage1');
                    player.addTag('virus_stage2');
                    virusTicks = survivalConfig.ZOMBIE_VIRUS.STAGE_2_DURATION_TICKS;
                    player.sendMessage("§c⚠ Bạn cảm thấy cơ thể mình yếu đi... Cơn đói cồn cào đang gặm nhấm bạn.");
                    player.addEffect(EffectTypes.get("weakness"), 999999, { amplifier: 0 });
                    player.addEffect(EffectTypes.get("hunger"), 999999, { amplifier: 1 });
                    
                } else if (player.hasTag('virus_stage2')) {
                    player.removeTag('virus_stage2');
                    player.addTag('virus_stage3');
                    virusTicks = survivalConfig.ZOMBIE_VIRUS.STAGE_3_DURATION_TICKS;
                    player.sendMessage("§4§l☣ NGUY HIỂM! Thịt của bạn đang thối rữa... Tâm trí phai mờ... HÃY TÌM CÁCH CHỮA GẤP!");
                    player.addEffect(EffectTypes.get("weakness"), 999999, { amplifier: 1 });
                    player.addEffect(EffectTypes.get("slowness"), 999999, { amplifier: 1 });
                    player.addEffect(EffectTypes.get("hunger"), 999999, { amplifier: 2 });
                    player.addEffect(EffectTypes.get("nausea"), 999999, { amplifier: 0 });
                    
                } else if (player.hasTag('virus_stage3')) {
                    const location = player.location;
                    const dimension = player.dimension;
                    
                    const equippable = player.getComponent("equippable");
                    const helmet = equippable?.getEquipment("Head");
                    const chestplate = equippable?.getEquipment("Chest");
                    const leggings = equippable?.getEquipment("Legs");
                    const boots = equippable?.getEquipment("Feet");
                    const mainHand = equippable?.getEquipment("Mainhand");
                    
                    player.removeTag('virus_stage1');
                    player.removeTag('virus_stage2');
                    player.removeTag('virus_stage3');
                    player.setDynamicProperty("dhh:virus_ticks", undefined);

                    player.kill();
                    
                    system.runTimeout(() => {
                        try {
                            const zombie = dimension.spawnEntity("minecraft:zombie", location);
                            zombie.nameTag = `§4☣ ${player.nameTag} §r§7(Zombie)`;
                            
                            const zombieEquippable = zombie.getComponent("equippable");
                            if (zombieEquippable) {
                                if (helmet) zombieEquippable.setEquipment("Head", helmet);
                                if (chestplate) zombieEquippable.setEquipment("Chest", chestplate);
                                if (leggings) zombieEquippable.setEquipment("Legs", leggings);
                                if (boots) zombieEquippable.setEquipment("Feet", boots);
                                if (mainHand) zombieEquippable.setEquipment("Mainhand", mainHand);
                            }
                            
                            zombie.addEffect(EffectTypes.get("strength"), 999999, { amplifier: 1 });
                            zombie.addEffect(EffectTypes.get("speed"), 999999, { amplifier: 0 });
                            zombie.addEffect(EffectTypes.get("resistance"), 999999, { amplifier: 0 });
                            
                            dimension.spawnParticle("minecraft:large_explosion", location);
                            world.playSound("mob.zombie.death", location, { volume: 1.0 });
                        } catch (e) {
                            console.warn(`[Survival System] Failed to spawn zombie: ${e.message}`);
                        }
                    }, 1);
                    
                    return;
                }
            }
            
            player.setDynamicProperty("dhh:virus_ticks", virusTicks);
        }

        // === 8. QUÁ TRÌNH CHỮA VIRUS ===
        if (player.hasTag('virus_curing')) {
            let cureTicks = player.getDynamicProperty("dhh:virus_cure_ticks");
            
            // ⚠️ SỬA LỖI
            if (cureTicks === undefined || cureTicks === null) {
                cureTicks = survivalConfig.ZOMBIE_VIRUS.CURE_DURATION_TICKS;
                player.setDynamicProperty("dhh:virus_cure_ticks", cureTicks);
            }
            
            cureTicks -= 20;
            
            if (cureTicks % 20 === 0) {
                player.dimension.spawnParticle("minecraft:totem_particle", {
                    x: player.location.x,
                    y: player.location.y + 1,
                    z: player.location.z
                });
                
                const progress = Math.floor((1 - cureTicks / survivalConfig.ZOMBIE_VIRUS.CURE_DURATION_TICKS) * 100);
                player.onScreenDisplay.setActionBar(`§d✨ Đang thanh tẩy virus: ${progress}%`);
            }
            
            if (cureTicks <= 0) {
                const virusEffects = ["weakness", "slowness", "hunger", "nausea"];
                for (const effectId of virusEffects) {
                    try {
                        player.removeEffect(effectId);
                    } catch (e) {}
                }

                player.removeTag('virus_curing');
                player.addTag('virus_immune');
                player.sendMessage("§a§l✓ VIRUS ĐÃ BỊ THANH TẨY HOÀN TOÀN!");
                player.playSound("random.levelup");
                
                system.runTimeout(() => {
                    if (player.isValid) {
                        player.removeTag('virus_immune');
                        player.sendMessage("§e⚠ Miễn dịch virus đã hết hiệu lực.");
                    }
                }, 60 * 20);
                
                cureTicks = 0;
            }
            
            player.setDynamicProperty("dhh:virus_cure_ticks", cureTicks);
        }

    } catch (error) {
        console.warn(`[Survival System] Injury/Virus error for ${player.name}: ${error.message}`);
    }
}

// === EXPORT FUNCTIONS ===

export function handleAllSurvivalSystems(player) {
    if (!player || !player.isValid) return;
    
    // Bọc mỗi hệ thống trong một khối try...catch riêng biệt để biết chính xác hệ thống nào gây lỗi
    try {
        handleTemperatureAndSickness(player);
    } catch (error) {
        console.error(`§c§l[CRITICAL SURVIVAL ERROR] Lỗi nghiêm trọng trong handleTemperatureAndSickness cho người chơi ${player.name}.`);
        console.error(`§cMessage: ${error.message}`);
        console.error(`§cStack Trace: ${error.stack}`);
    }

    try {
        handleThirst(player);
    } catch (error) {
        console.error(`§c§l[CRITICAL SURVIVAL ERROR] Lỗi nghiêm trọng trong handleThirst cho người chơi ${player.name}.`);
        console.error(`§cMessage: ${error.message}`);
        console.error(`§cStack Trace: ${error.stack}`);
    }

    try {
        handleInjuryAndVirusEffects(player);
    } catch (error) {
        console.error(`§c§l[CRITICAL SURVIVAL ERROR] Lỗi nghiêm trọng trong handleInjuryAndVirusEffects cho người chơi ${player.name}.`);
        console.error(`§cMessage: ${error.message}`);
        console.error(`§cStack Trace: ${error.stack}`);
    }

       try {
        handleSanity(player);
    } catch (error) {
        console.error(`§c§l[CRITICAL SURVIVAL ERROR] Lỗi trong handleSanity cho ${player.name}: ${error.message}`);
    }
}

export function handlePlayerItemUse(event) {
    if (!survivalConfig.INJURY_ENABLED && !survivalConfig.THIRST_ENABLED) return;
    
    const { itemStack, source: player } = event;
    if (!player || !player.isValid || !itemStack) return;

    // === UỐNG NƯỚC ===
    if (itemStack.typeId === 'minecraft:potion') {
        try {
            const lore = itemStack.getLore();
            const itemName = itemStack.nameTag ?? "";
            
            if (lore.length === 0 || itemName.toLowerCase().includes('water') || itemName.includes('Nước')) {
                const currentThirst = player.getDynamicProperty("dhh:thirst") ?? 100;
                const newThirst = Math.min(100, currentThirst + survivalConfig.THIRST_DRINK_AMOUNT);
                
                player.setDynamicProperty("dhh:thirst", newThirst);
                player.playSound("entity.generic.drink");
                player.sendMessage(`§b💧 +${survivalConfig.THIRST_DRINK_AMOUNT} Độ khát (${Math.round(newThirst)}%)`);
                
                // === GIẢM THỜI GIAN GIUN SÁN KHI UỐNG NƯỚC ===
                if (player.hasTag('parasite')) {
                    let parasiteTicks = player.getDynamicProperty("dhh:parasite_ticks_left") ?? 
                                       survivalConfig.PARASITE.DURATION_TICKS;
                    parasiteTicks = Math.max(0, parasiteTicks - survivalConfig.PARASITE.WATER_REDUCE_DURATION);
                    player.setDynamicProperty("dhh:parasite_ticks_left", parasiteTicks);
                    
                    const timeLeft = Math.floor(parasiteTicks / 20);
                    player.sendMessage(`§a✓ Nước giúp giảm thời gian giun sán! (Còn ${timeLeft}s)`);
                    
                    if (parasiteTicks <= 0) {
                        player.removeTag('parasite');
                        player.sendMessage("§a✓ Uống đủ nước đã giúp bạn loại bỏ giun sán!");
                        player.playSound("random.levelup");
                    }
                }
                
                const isBoiled = lore.some(line => line.includes("§bĐã Đun Sôi") || line.includes("Boiled"));
                
                if (!isBoiled && Math.random() < survivalConfig.THIRST_DIRTY_WATER_CHANCE) {
                    player.addEffect(EffectTypes.get("hunger"), 200, { amplifier: 0 });
                    player.addEffect(EffectTypes.get("nausea"), 100, { amplifier: 0 });
                    player.sendMessage("§c⚠ Bạn cảm thấy đau bụng sau khi uống nước bẩn...");
                    player.playSound("mob.villager.no");
                    
                    // === NHIỄM GIUN SÁN TỪ NƯỚC BẨN ===
                    if (Math.random() < survivalConfig.PARASITE.INFECTION_CHANCE_DIRTY_WATER && !player.hasTag('parasite')) {
                        player.addTag('parasite');
                        player.setDynamicProperty("dhh:parasite_ticks_left", 
                                                 survivalConfig.PARASITE.DURATION_TICKS);
                        player.sendMessage("§7🐛 Có gì đó không ổn với nước này...");
                        player.playSound("mob.silverfish.say");
                        
                        system.runTimeout(() => {
                            if (player.isValid && player.hasTag('parasite')) {
                                player.sendMessage("§c⚠ Bụng bạn bắt đầu đau nhói... Có vẻ bạn bị nhiễm giun sán!");
                            }
                        }, 60 * 20);
                    }
                }
            }
        } catch (error) {
            console.warn(`[Survival System] Potion use error: ${error.message}`);
        }
    }

    // === ĂN THỊT SỐNG - NHIỄM GIUN SÁN ===
    const rawFoods = ['minecraft:beef', 'minecraft:porkchop', 'minecraft:chicken', 
                     'minecraft:mutton', 'minecraft:rabbit', 'minecraft:cod', 
                     'minecraft:salmon', 'minecraft:tropical_fish'];
    
    if (rawFoods.includes(itemStack.typeId)) {
        if (Math.random() < survivalConfig.PARASITE.INFECTION_CHANCE_RAW_FOOD && !player.hasTag('parasite')) {
            player.addTag('parasite');
            player.setDynamicProperty("dhh:parasite_ticks_left", 
                                     survivalConfig.PARASITE.DURATION_TICKS);
            player.sendMessage("§7🐛 Thịt sống này có mùi lạ...");
            player.playSound("mob.silverfish.say");
            
            system.runTimeout(() => {
                if (player.isValid && player.hasTag('parasite')) {
                    player.sendMessage("§c⚠ Bạn bắt đầu cảm thấy bụng đau và mệt mỏi... Có vẻ bạn bị nhiễm giun sán!");
                }
            }, 90 * 20);
        }
    }
}

// === HÀM MỚI: XỬ LÝ KHI ĂN/UỐNG XONG ===
export function handlePlayerItemConsume(event) {
    const { itemStack, source: player } = event;
    if (!player || !player.isValid || !itemStack) return;
  try {
        const sanityConfig = survivalConfig.SANITY_CONFIG;
        if (sanityConfig.ENABLED) {
            let sanityChange = 0;
            const goodFoods = ['minecraft:cake', 'minecraft:golden_apple', 'minecraft:golden_carrot','minecraft:enchanted_golden_apple', 'minecraft:pumpkin_pie', 'minecraft:cookie'];
            if (itemStack.typeId === 'minecraft:rotten_flesh') {
                sanityChange = sanityConfig.EVENT_CHANGES.EAT_ROTTEN_FLESH;
            } else if (goodFoods.includes(itemStack.typeId)) {
                sanityChange = sanityConfig.EVENT_CHANGES.EAT_GOOD_FOOD;
            }
            if (sanityChange !== 0) {
                let currentSanity = player.getDynamicProperty("dhh:sanity") ?? 100;
                currentSanity = Math.min(100, currentSanity + sanityChange);
                player.setDynamicProperty("dhh:sanity", currentSanity);
                if (sanityChange > 0) player.onScreenDisplay.setActionBar("§aBạn cảm thấy tinh thần tốt hơn.");
            }
        }
    } catch(e) {}
    try {
        const isNormalWater = itemStack.typeId === 'minecraft:potion' && (itemStack.getLore() ?? []).length === 0;
        const isBoiledWater = itemStack.typeId === 'dhh:boiled_water_bottle';

        // XỬ LÝ VIỆC GIẢI KHÁT (ÁP DỤNG CHO CẢ 2 LOẠI NƯỚC)
        if (isNormalWater || isBoiledWater) {
            const currentThirst = player.getDynamicProperty("dhh:thirst") ?? 100;
            const newThirst = Math.min(100, currentThirst + survivalConfig.THIRST_DRINK_AMOUNT);

            player.setDynamicProperty("dhh:thirst", newThirst);
            player.playSound("entity.generic.drink");
            player.sendMessage(`§b💧 +${survivalConfig.THIRST_DRINK_AMOUNT} Độ khát (${Math.round(newThirst)}%)`);

            if (player.hasTag('parasite')) {
                let parasiteTicks = player.getDynamicProperty("dhh:parasite_ticks_left") ?? survivalConfig.PARASITE.DURATION_TICKS;
                parasiteTicks = Math.max(0, parasiteTicks - survivalConfig.PARASITE.WATER_REDUCE_DURATION);
                player.setDynamicProperty("dhh:parasite_ticks_left", parasiteTicks);
                
                const timeLeft = Math.floor(parasiteTicks / 20);
                player.sendMessage(`§a✓ Nước giúp giảm thời gian giun sán! (Còn ${timeLeft}s)`);

                if (parasiteTicks <= 0) {
                    player.removeTag('parasite');
                    player.sendMessage("§a✓ Uống đủ nước đã giúp bạn loại bỏ giun sán!");
                    player.playSound("random.levelup");
                }
            }
            
            // XỬ LÝ TÁC DỤNG PHỤ CỦA NƯỚC BẨN (CHỈ ÁP DỤNG CHO NƯỚC THƯỜNG)
            if (isNormalWater) {
                if (Math.random() < survivalConfig.THIRST_DIRTY_WATER_CHANCE) {
                    player.addEffect(EffectTypes.get("hunger"), 200, { amplifier: 0 });
                    player.addEffect(EffectTypes.get("nausea"), 100, { amplifier: 0 });
                    player.sendMessage("§c⚠ Bạn cảm thấy đau bụng sau khi uống nước bẩn...");
                    player.playSound("mob.villager.no");
                    
                    if (Math.random() < survivalConfig.PARASITE.INFECTION_CHANCE_DIRTY_WATER && !player.hasTag('parasite')) {
                        player.addTag('parasite');
                        player.setDynamicProperty("dhh:parasite_ticks_left", survivalConfig.PARASITE.DURATION_TICKS);
                        player.sendMessage("§7🐛 Có gì đó không ổn với nước này...");
                        player.playSound("mob.silverfish.say");
                        
                        system.runTimeout(() => {
                            if (player.isValid && player.hasTag('parasite')) {
                                player.sendMessage("§c⚠ Bụng bạn bắt đầu đau nhói... Có vẻ bạn bị nhiễm giun sán!");
                            }
                        }, 60 * 20);
                    }
                }
            }
        }
        
        // CÁC LOGIC CŨ CHO TÁO VÀNG, SỮA... VẪN GIỮ NGUYÊN
        if (itemStack.typeId === 'minecraft:milk_bucket') {
            let curedSomething = false;
            if (player.hasTag('dazed')) { player.removeTag('dazed'); curedSomething = true; }
            if (player.hasTag('burned')) { player.removeTag('burned'); curedSomething = true; }
            if (player.hasTag('fever')) { player.removeTag('fever'); curedSomething = true; }
            if (player.hasTag('cold')) { player.removeTag('cold'); curedSomething = true; }
            if (player.hasTag('parasite')) {
                let parasiteTicks = player.getDynamicProperty("dhh:parasite_ticks_left") ?? survivalConfig.PARASITE.DURATION_TICKS;
                parasiteTicks = Math.floor(parasiteTicks / 2);
                player.setDynamicProperty("dhh:parasite_ticks_left", parasiteTicks);
                player.sendMessage(`§e⚠ Sữa giúp giảm 50% thời gian giun sán! (Còn ${Math.floor(parasiteTicks / 20)}s)`);
                curedSomething = true;
            }
            if (player.hasTag('virus_stage3')) {
                player.removeTag('virus_stage3'); player.addTag('virus_stage2');
                player.setDynamicProperty("dhh:virus_ticks", survivalConfig.ZOMBIE_VIRUS.STAGE_2_DURATION_TICKS);
                player.sendMessage("§e⚠ Bạn cảm thấy tỉnh táo hơn, nhưng virus vẫn còn đó.");
                curedSomething = true;
            } else if (player.hasTag('virus_stage2')) {
                player.removeTag('virus_stage2'); player.addTag('virus_stage1');
                player.setDynamicProperty("dhh:virus_ticks", survivalConfig.ZOMBIE_VIRUS.STAGE_1_DURATION_TICKS);
                player.sendMessage("§a✓ Các triệu chứng đã thuyên giảm.");
                curedSomething = true;
            }
            if (curedSomething) {
                player.sendMessage("§a✓ Sữa đã giúp bạn cảm thấy tốt hơn.");
                player.playSound("random.levelup");
            }
        }

        if (itemStack.typeId === 'minecraft:golden_apple') {
            let curedSomething = false;
            if (player.hasTag('broken_leg')) { player.removeTag('broken_leg'); player.sendMessage("§e✓ Chân bạn đã được chữa lành!"); curedSomething = true; }
            if (player.hasTag('bleeding')) { player.removeTag('bleeding'); player.sendMessage("§c✓ Vết thương đã ngừng chảy máu!"); curedSomething = true; }
            if (player.hasTag('fever')) { player.removeTag('fever'); curedSomething = true; }
            if (player.hasTag('cold')) { player.removeTag('cold'); curedSomething = true; }
            if (player.hasTag('sprained_arm')) { player.removeTag('sprained_arm'); player.sendMessage("§e✓ Tay bạn đã được chữa lành!"); curedSomething = true; }
            if (curedSomething) {
                player.sendMessage("§6✓ Táo Vàng đã chữa lành các chấn thương!");
                player.playSound("random.levelup");
            }

            if (hasEffect(player, "weakness") && (player.hasTag('virus_stage1') || player.hasTag('virus_stage2') || player.hasTag('virus_stage3'))) {
                player.removeTag('virus_stage1');
                player.removeTag('virus_stage2');
                player.removeTag('virus_stage3');
                player.addTag('virus_curing');
                player.setDynamicProperty("dhh:virus_cure_ticks", survivalConfig.ZOMBIE_VIRUS.CURE_DURATION_TICKS);
                player.sendMessage("§d§l✨ MỘT PHẢN ỨNG KỲ LẠ XẢY RA...");
                player.sendMessage("§dBạn cảm thấy virus đang bị thanh tẩy!");
                player.playSound("entity.zombie_villager.cure");
                for (let i = 0; i < 10; i++) {
                    system.runTimeout(() => {
                        if (player.isValid) player.dimension.spawnParticle("minecraft:totem_particle", player.location);
                    }, i * 10);
                }
            }
        }

        if (itemStack.typeId === 'minecraft:potion' || itemStack.typeId === 'minecraft:splash_potion') {
            system.runTimeout(() => {
                if (player.isValid && (hasEffect(player, "regeneration") || hasEffect(player, "instant_health"))) {
                    if (player.hasTag('bleeding')) {
                        player.removeTag('bleeding');
                        player.sendMessage("§a✓ Thuốc đã giúp cầm máu vết thương.");
                        player.playSound("random.levelup");
                    }
                }
            }, 5);
        }
    } catch (error) {
        console.warn(`[Survival System] Item consume error: ${error.message}`);
    }
}

export function handlePlayerInjury(event) {
    if (!survivalConfig.INJURY_ENABLED) return;
    
    const { hurtEntity, damageSource, damage } = event;
    
    if (hurtEntity.typeId !== 'minecraft:player') return;
    const player = hurtEntity;
    try {
        const sanityConfig = survivalConfig.SANITY_CONFIG;
        if (sanityConfig.ENABLED) {
            let currentSanity = player.getDynamicProperty("dhh:sanity") ?? 100;
            currentSanity = Math.max(0, currentSanity + sanityConfig.EVENT_CHANGES.PLAYER_HURT);
            player.setDynamicProperty("dhh:sanity", currentSanity);
        }
    } catch(e) {}
    try {
        // === 1. GÃY CHÂN ===
        if (damageSource.cause === 'fall' && damage >= survivalConfig.BROKEN_LEG.FALL_DAMAGE_THRESHOLD) {
            if (Math.random() < survivalConfig.BROKEN_LEG.CHANCE && !player.hasTag('broken_leg')) {
                player.addTag('broken_leg');
                player.setDynamicProperty("dhh:broken_leg_self_heal_timer", 
                                         survivalConfig.BROKEN_LEG.SELF_HEAL_DURATION_TICKS);
                player.setDynamicProperty("dhh:rest_timer", 0);
                
                player.sendMessage("§c💀 *RẮC!* Một tiếng động kinh hoàng từ chân bạn...");
                player.sendMessage("§eChân bạn đã bị gãy! Hãy đứng yên để hồi phục hoặc dùng Táo Vàng.");
                player.playSound("entity.skeleton.hurt");
                
                for (let i = 0; i < 5; i++) {
                    system.runTimeout(() => {
                        if (player.isValid) {
                            player.dimension.spawnParticle("minecraft:critical_hit_emitter", player.location);
                        }
                    }, i * 5);
                }
            }
        }

        const attacker = damageSource.damagingEntity;
        
        // === 2. CHẢY MÁU ===
        if (attacker && ['minecraft:vindicator', 'minecraft:wither_skeleton', 'minecraft:piglin_brute', 'minecraft:ravager'].includes(attacker.typeId)) {
            if (Math.random() < survivalConfig.BLEEDING.CHANCE_FROM_STRONG_MOB && !player.hasTag('bleeding')) {
                player.addTag('bleeding');
                player.setDynamicProperty("dhh:bleeding_ticks_left", survivalConfig.BLEEDING.DURATION_TICKS);
                
                player.sendMessage("§4💉 Bạn bị một vết thương sâu và đang chảy máu!");
                player.sendMessage("§eDùng thuốc hồi máu (Regeneration/Healing) hoặc Táo Vàng để cầm máu.");
                player.playSound("random.break");
            }
        }

        // === 3. CHOÁNG VÁNG ===
        if (damageSource.cause === 'entityExplosion' || 
            (attacker && ['minecraft:iron_golem', 'minecraft:warden', 'minecraft:ravager'].includes(attacker.typeId))) {
            
            if (Math.random() < survivalConfig.DAZED.CHANCE_FROM_EXPLOSION && !player.hasTag('dazed')) {
                player.addTag('dazed');
                player.setDynamicProperty("dhh:dazed_ticks_left", survivalConfig.DAZED.DURATION_TICKS);
                
                player.sendMessage("§e🌀 Đầu bạn ong ong... Mọi thứ quay cuồng!");
                player.playSound("mob.villager.no");
            }
        }

        // === 4. VIRUS ZOMBIE ===
        if (attacker && attacker.typeId.includes('zombie') && !player.hasTag('virus_immune')) {
            if (player.hasTag('virus_stage1') || player.hasTag('virus_stage2') || player.hasTag('virus_stage3')) {
                return;
            }

            let infectionChance = survivalConfig.ZOMBIE_VIRUS.INFECTION_CHANCE;
            
            const health = player.getComponent('health');
            if (health) {
                const healthPercent = health.currentValue / health.effectiveMax;
                if (healthPercent < 0.5) {
                    infectionChance *= survivalConfig.ZOMBIE_VIRUS.LOW_HEALTH_MULTIPLIER;
                }
            }
            
            if (Math.random() < infectionChance) {
                player.addTag('virus_stage1');
                player.setDynamicProperty("dhh:virus_ticks", survivalConfig.ZOMBIE_VIRUS.STAGE_1_DURATION_TICKS);
                
                player.sendMessage("§2🦠 Bạn cảm thấy một vết cào nhói lên...");
                player.sendMessage("§7Chắc là không sao đâu nhỉ?");
                player.playSound("mob.zombie.say");
                
                system.runTimeout(() => {
                    if (player.isValid && player.hasTag('virus_stage1')) {
                        player.sendMessage("§e⚠ Bạn bắt đầu cảm thấy không khỏe...");
                    }
                }, 30 * 20);
            }
        }

    } catch (error) {
        console.warn(`[Survival System] Injury handling error: ${error.message}`);
    }
}

// === HỆ THỐNG HOẠT ĐỘNG QUÁ SỨC GÂY BONG GÂN ===

export const EXERTION_CONFIG = {
    POINTS_PER_BLOCK_BREAK: 1,
    POINTS_PER_ATTACK: 2,
    MIN_SCORE_FOR_RISK: 150,
    CHANCE_DIVISOR: 2000
};

export function checkAndApplySprain(player) {
    if (!survivalConfig.INJURY_ENABLED || player.hasTag('sprained_arm')) {
        return;
    }

    const exertionScore = player.getDynamicProperty("dhh:exertion_score") ?? 0;

    if (exertionScore < EXERTION_CONFIG.MIN_SCORE_FOR_RISK) {
        return;
    }

    const chance = (exertionScore - EXERTION_CONFIG.MIN_SCORE_FOR_RISK) / EXERTION_CONFIG.CHANCE_DIVISOR;

    if (Math.random() < chance) {
        player.addTag('sprained_arm');
        player.setDynamicProperty("dhh:sprained_arm_self_heal_timer", 
                                 survivalConfig.SPRAINED_ARM.SELF_HEAL_DURATION_TICKS);
        player.setDynamicProperty("dhh:sprained_arm_rest_timer", 0);

        player.sendMessage("§e💪 *CÁCH!* Bạn đã hoạt động quá sức và bị bong gân tay!");
        player.sendMessage("§eĐánh và đào sẽ chậm hơn nhiều. Hãy nghỉ ngơi hoặc dùng Táo Vàng.");
        player.playSound("entity.skeleton.hurt");

        player.setDynamicProperty("dhh:exertion_score", 0);
    }
}

// ====================================================== Phần tinh thần==================================
// Dán toàn bộ khối code này vào survival_system.js

const LIGHT_EMITTING_BLOCKS = [
    'minecraft:torch', 'minecraft:soul_torch', 'minecraft:lantern', 'minecraft:soul_lantern',
    'minecraft:glowstone', 'minecraft:sea_lantern', 'minecraft:shroomlight',
    'minecraft:lit_furnace', 'minecraft:lit_smoker', 'minecraft:lit_blast_furnace',
    'minecraft:campfire', 'minecraft:soul_campfire', 'minecraft:end_rod',
    'minecraft:beacon', 'minecraft:conduit', 'minecraft:lava', 'minecraft:light_block'
];

function getLightLevel(player) {
    try {
        const playerLoc = player.location;
        const dimension = player.dimension;

        for (let x = -5; x <= 5; x++) {
            for (let y = -5; y <= 5; y++) {
                for (let z = -5; z <= 5; z++) {
                    const block = dimension.getBlock({ x: playerLoc.x + x, y: playerLoc.y + y, z: playerLoc.z + z });
                    if (block && LIGHT_EMITTING_BLOCKS.includes(block.typeId)) {
                        return 15;
                    }
                }
            }
        }

        const ray = dimension.getBlockFromRay(player.getHeadLocation(), { x: 0, y: 1, z: 0 }, { maxDistance: 256 });
        const hasSkyAccess = !ray;

        const time = world.getTimeOfDay();
        const isDay = time >= 0 && time < 13000;

        if (hasSkyAccess) {
            return isDay ? 15 : 0;
        } else {
            return 0;
        }
    } catch (e) {
        return 0;
    }
}

function handleSanity(player) {
    const sanityConfig = survivalConfig.SANITY_CONFIG;
    if (!sanityConfig.ENABLED) return;

    let currentSanity = player.getDynamicProperty("dhh:sanity") ?? 100;
    let sanityChange = 0;
    const updateRateFactor = sanityConfig.UPDATE_INTERVAL_TICKS / 20;

    // --- PHẦN 1: XỬ LÝ CÔ ĐỘC ---
    if (sanityConfig.LONELINESS_CONFIG.ENABLED) {
        const lonelinessConfig = sanityConfig.LONELINESS_CONFIG;
        const nearbyEntities = player.dimension.getEntities({
            location: player.location,
            maxDistance: lonelinessConfig.CHECK_RADIUS,
            // SỬA LỖI Ở ĐÂY: Loại trừ theo tên thay vì loại thực thể
            excludeNames: [player.nameTag] 
        });

        let foundComfort = false;
        for (const entity of nearbyEntities) {
            if (entity.typeId === 'minecraft:player' || 
                entity.typeId === 'minecraft:villager_v2' ||
                entity.typeId === 'minecraft:villager' ||
                (entity.typeId === 'minecraft:wolf' && entity.isTamed()) ||
                 (entity.typeId === 'minecraft:parrot' && entity.isTamed()) ||
                (entity.typeId === 'minecraft:cat' && entity.isTamed())) 
            {
                foundComfort = true;
                break;
            }
        }

        let lonelinessTimer = player.getDynamicProperty("dhh:loneliness_timer") ?? 0;

        if (foundComfort) {
            if (lonelinessTimer > 0) {
                player.onScreenDisplay.setActionBar("§aBạn cảm thấy an tâm hơn khi có người ở gần.");
            }
            lonelinessTimer = 0;
            sanityChange += sanityConfig.GAIN_FACTORS.SOCIAL_COMFORT;
        } else {
            lonelinessTimer += sanityConfig.UPDATE_INTERVAL_TICKS;
          if (lonelinessTimer > lonelinessConfig.THRESHOLD_SECONDS * 20) {
    sanityChange -= sanityConfig.LOSS_FACTORS.LONELINESS;

    // SỬA LỖI: Chỉ thông báo MỘT LẦN khi timer VỪA VƯỢT NGƯỠNG
    const thresholdTicks = lonelinessConfig.THRESHOLD_SECONDS * 20;
    const previousTimer = lonelinessTimer - sanityConfig.UPDATE_INTERVAL_TICKS;
    if (lonelinessTimer > thresholdTicks && previousTimer <= thresholdTicks) {
        player.sendMessage("§cSự cô độc bắt đầu gặm nhấm tinh thần bạn...");
    }
}
        }
        player.setDynamicProperty("dhh:loneliness_timer", lonelinessTimer);
    }

    // --- PHẦN 2: CÁC YẾU TỐ VẬT LÝ ---
   const lightLevel = getLightLevel(player);
    if (lightLevel <= 2) {
        // Nếu ở trong bóng tối, trừ điểm
        sanityChange -= sanityConfig.LOSS_FACTORS.IN_DARKNESS;
    } else {
        // Nếu ở nơi có ánh sáng, cộng điểm để chống lại các yếu tố tiêu cực
        sanityChange += sanityConfig.GAIN_FACTORS.NEAR_LIGHT_SOURCE;
    }
    
    const health = player.getComponent('health');
    if (health && (health.currentValue / health.effectiveMax) < 0.3) {
        sanityChange -= sanityConfig.LOSS_FACTORS.LOW_HEALTH;
    }

    if (player.hasTag('bleeding') || player.hasTag('broken_leg') || player.hasTag('fever') || player.hasTag('virus_stage1')) {
        sanityChange -= sanityConfig.LOSS_FACTORS.INJURY_STRESS;
    }
    
    // --- PHẦN 3: ÁP DỤNG & KÍCH HOẠT ---
    currentSanity = Math.max(0, Math.min(100, currentSanity + (sanityChange / (20 * 5) * updateRateFactor)));
    player.setDynamicProperty("dhh:sanity", currentSanity);

    const effectDuration = sanityConfig.UPDATE_INTERVAL_TICKS + 40;
    if (currentSanity < sanityConfig.THRESHOLDS.INSANE) {
        player.addEffect(EffectTypes.get("darkness"), effectDuration, { showParticles: false });
        player.addEffect(EffectTypes.get("slowness"), effectDuration, { amplifier: sanityConfig.EFFECTS.INSANE_SLOWNESS_AMPLIFIER, showParticles: false });
        if (Math.random() < 0.1) player.playSound("mob.warden.heartbeat", { volume: 1.0 });
          if (currentSanity <= 0) {
        // Áp dụng các hiệu ứng suy nhược nặng
        player.addEffect(EffectTypes.get("weakness"), effectDuration, { amplifier: 3, showParticles: false }); // Yếu Cấp IV
        player.addEffect(EffectTypes.get("mining_fatigue"), effectDuration, { amplifier: 3, showParticles: false }); // Đào chậm Cấp IV
        player.addEffect(EffectTypes.get("slowness"), effectDuration, { amplifier: 2, showParticles: false }); // Chậm chạp Cấp III

        // Gây ảo giác âm thanh (20% cơ hội mỗi 5 giây)
        if (Math.random() < 0.2) {
            const scarySounds = [
                "mob.creeper.say",
                "mob.endermen.stare",
                "mob.ghast.scream",
                "mob.wither.spawn",
                "mob.warden.angry"
            ];
            const randomSound = scarySounds[Math.floor(Math.random() * scarySounds.length)];
            player.playSound(randomSound, { location: player.location, pitch: Math.random() * 0.4 + 0.8, volume: 0.7 });
            player.onScreenDisplay.setActionBar("§4Bạn nghe thấy gì đó...");
        }

        // Tùy chọn nâng cao: Gây ảo giác hình ảnh (5% cơ hội mỗi 5 giây)
        if (Math.random() < 0.05) {
             try {
                // Tìm một vị trí ngẫu nhiên trong tầm nhìn của người chơi
                const viewDirection = player.getViewDirection();
                const spawnLocation = {
                    x: player.location.x + viewDirection.x * (5 + Math.random() * 5),
                    y: player.location.y + 1,
                    z: player.location.z + viewDirection.z * (5 + Math.random() * 5)
                };
                
                // Spawn một con Vex làm bóng ma
                const phantom = player.dimension.spawnEntity("minecraft:vex", spawnLocation);
                phantom.addEffect(EffectTypes.get("invisibility"), 40, { showParticles: false });
                phantom.addTag("hallucination_mob"); // Đánh dấu để không tính XP/loot
                
                // Cho nó biến mất sau 1-2 giây
                system.runTimeout(() => {
                    if (phantom.isValid) {
                        phantom.teleport({ x: 0, y: -100, z: 0 }); // Di chuyển ra xa trước khi kill
                        phantom.kill();
                    }
                }, Math.random() * 20 + 20);

             } catch(e) { /* Bỏ qua lỗi nếu không spawn được */ }
        }

    }
    } else if (currentSanity < sanityConfig.THRESHOLDS.PARANOID) {
        player.addEffect(EffectTypes.get("slowness"), effectDuration, { amplifier: sanityConfig.EFFECTS.PARANOID_SLOWNESS_AMPLIFIER, showParticles: false });
        if (Math.random() < 0.2) player.playSound("ambient.cave", { pitch: 1.5, volume: 0.5 });
    } else if (currentSanity < sanityConfig.THRESHOLDS.ANXIOUS) {
        player.addEffect(EffectTypes.get("weakness"), effectDuration, { amplifier: sanityConfig.EFFECTS.ANXIOUS_WEAKNESS_AMPLIFIER, showParticles: false });
        if (Math.random() < 0.1) player.playSound("mob.endermen.stare", { volume: 0.3, pitch: 0.7 });
    }
}

// === END OF FILE ===