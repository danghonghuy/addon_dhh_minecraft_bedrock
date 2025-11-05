import { world, system, GameMode } from "@minecraft/server";
import { SARCASTIC_TIPS } from "./tips_database.js";

const GLOBAL_TIP_COOLDOWN_TICKS = 1200; 
const CATEGORY_COOLDOWN_TICKS = 6000; 
const CREEPER_CHECK_INTERVAL_TICKS = 400; 

const playerTipHistory = new Map();

function getPlayerHistory(player) {
    if (!playerTipHistory.has(player.nameTag)) {
        playerTipHistory.set(player.nameTag, {
            lastGlobalTipTick: 0,
            categoryCooldowns: new Map(),
        });
    }
    return playerTipHistory.get(player.nameTag);
}

// BỎ "export" vì nó chỉ dùng nội bộ, nhưng main.js lại cần dùng cho event playerSpawn. Thôi được, ta sẽ export nó.
export function triggerSarcasticTip(player, triggerCategory) {
    if (player.getGameMode() === GameMode.creative) return;

    const history = getPlayerHistory(player);
    const now = system.currentTick;

    if (now < history.lastGlobalTipTick + GLOBAL_TIP_COOLDOWN_TICKS && triggerCategory !== 'GENERIC_FAILURE') {
        return; 
    }

    const lastCategoryTriggerTick = history.categoryCooldowns.get(triggerCategory) ?? 0;
    if (now < lastCategoryTriggerTick + CATEGORY_COOLDOWN_TICKS) {
        return; 
    }
    
    const tipsForCategory = SARCASTIC_TIPS[triggerCategory];
    if (!tipsForCategory || tipsForCategory.length === 0) {
        return;
    }

    const tip = tipsForCategory[Math.floor(Math.random() * tipsForCategory.length)];

    system.run(() => {
        player.sendMessage(`§c§o${tip}`);
    });

    history.lastGlobalTipTick = now;
    history.categoryCooldowns.set(triggerCategory, now);
}

export function checkBlockBreakTriggers(player, brokenPermutation, brokenBlock) {
    const blockId = brokenPermutation.type.id;

    if (player.location.y < brokenBlock.location.y - 1.5) {
        const blockBelowPlayer = player.dimension.getBlock({ x: Math.floor(player.location.x), y: Math.floor(player.location.y) - 1, z: Math.floor(player.location.z) });
        if (blockBelowPlayer?.isAir) {
            triggerSarcasticTip(player, 'DIG_STRAIGHT_DOWN');
        }
    }
    
    if (blockId === 'minecraft:spawner') {
        triggerSarcasticTip(player, 'DESTROY_SPAWNER');
    }

    const heldItem = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
    if ((blockId === 'minecraft:diamond_ore' || blockId === 'minecraft:deepslate_diamond_ore') && heldItem?.typeId === 'minecraft:wooden_pickaxe') {
        triggerSarcasticTip(player, 'WRONG_TOOL_USAGE');
    }

    if (blockId.startsWith('minecraft:') && blockId.endsWith('_log') && !brokenPermutation.matches("minecraft:log*", {"stripped_bit": true})) {
        const blockAbove = player.dimension.getBlock({ x: brokenBlock.location.x, y: brokenBlock.location.y + 1, z: brokenBlock.location.z });
        if (blockAbove?.type.id.includes('log') || blockAbove?.type.id.includes('leaves')) {
            triggerSarcasticTip(player, 'LAZINESS_AND_PROCRASTINATION');
        }
    }
}

export function checkPlayerPlaceBlockTriggers(player, block) {
    const blockId = block.type.id;

    if (blockId.endsWith('_bed')) {
        if (block.light < 7) {
            const query = {};
            query.location = block.location;
            query.maxDistance = 16;
            query.families = ["monster"];
            if (player.dimension.getEntities(query).length > 0) {
                triggerSarcasticTip(player, 'POOR_LIGHTING');
            }
        }
    }
    
    if (blockId.endsWith('wool')) {
        const { x, y, z } = block.location;
        const dimension = player.dimension;
        if (
            dimension.getBlock({ x: x + 1, y, z })?.typeId === 'minecraft:lava' ||
            dimension.getBlock({ x: x - 1, y, z })?.typeId === 'minecraft:lava' ||
            dimension.getBlock({ x, y, z: z + 1 })?.typeId === 'minecraft:lava' ||
            dimension.getBlock({ x, y, z: z - 1 })?.typeId === 'minecraft:lava'
        ) {
            triggerSarcasticTip(player, 'BAD_BUILDING_CHOICES');
        }
    }

    if (blockId === 'minecraft:beacon') {
        triggerSarcasticTip(player, 'POINTLESS_FLEX');
    }

    const inventory = player.getComponent("inventory").container;
    let emptySlots = 0;
    for (let i = 0; i < inventory.size; i++) {
        if (!inventory.getItem(i)) emptySlots++;
    }
    if (emptySlots <= 2) {
        triggerSarcasticTip(player, 'HOARDING_ITEMS');
    }
}

export function checkItemUseTriggers(player, item) {
    const itemId = item.typeId;

    if (itemId === 'minecraft:compass' && player.dimension.id !== 'minecraft:overworld') {
        triggerSarcasticTip(player, 'USE_COMPASS_IN_NETHER_END');
    }

    if (itemId === 'minecraft:enchanted_golden_apple' || itemId === 'minecraft:golden_apple') {
        const health = player.getComponent('health');
        if (health && health.currentValue >= health.effectiveMax - 2) {
            triggerSarcasticTip(player, 'WASTEFUL_ACTIONS');
        }
    }
    
    if (itemId === 'minecraft:rotten_flesh') {
        const foodComp = player.getComponent("minecraft:food");
        if (foodComp && foodComp.value <= 6) {
             triggerSarcasticTip(player, 'LOW_HUNGER_WITH_FOOD');
        }
    }

    if (itemId === 'minecraft:firework_rocket' && player.isGliding) {
        const itemComp = item.getComponent('minecraft:item');
        const nbt = itemComp?.getNbt();
        if (nbt?.value?.Fireworks?.value?.Explosions?.value?.length > 0) {
            triggerSarcasticTip(player, 'USE_ELYTRA');
        }
    }
}

export function checkEntityDieTriggers(killer, deadEntity) {
    if (killer?.typeId !== 'minecraft:player') return;

    if (deadEntity.typeId === 'minecraft:sheep') {
        if (deadEntity.hasComponent('minecraft:color')) {
            const colorComponent = deadEntity.getComponent('minecraft:color');
            if (colorComponent.value === 6) {
                triggerSarcasticTip(killer, 'KILL_RARE_MOB');
            }
        }
    }

    if (deadEntity.typeId === 'minecraft:mooshroom') {
        if (deadEntity.hasComponent('minecraft:variant')) {
            const variantComponent = deadEntity.getComponent('minecraft:variant');
            if (variantComponent.value === 1) {
                triggerSarcasticTip(killer, 'KILL_RARE_MOB');
            }
        }
    }
}

export function checkPlayerInteractTriggers(player, block) {
    if (block.type.id.endsWith('_bed')) {
        if (player.dimension.id !== 'minecraft:overworld') {
            triggerSarcasticTip(player, 'SLEEP_IN_NETHER_END');
        } else {
            const query = {};
            query.location = player.location;
            query.maxDistance = 8;
            query.families = ["monster"];
            if (player.dimension.getEntities(query).length > 0) {
                triggerSarcasticTip(player, 'SLEEP_NEAR_MONSTERS');
            }
        }
    }
}

export function checkEntityHurtTriggers(event) {
    const { hurtEntity, damageSource } = event;

    if (hurtEntity.typeId === 'minecraft:player') {
        const victim = hurtEntity;
        if (damageSource.cause === 'drowning' || (damageSource.cause === 'contact' && damageSource.damagingEntity?.typeId === 'minecraft:pufferfish')) {
            triggerSarcasticTip(victim, 'DEATH_BY_STUPIDITY');
        }
        if (damageSource.cause === 'fall') {
            triggerSarcasticTip(victim, 'FALL_NEAR_EDGE');
        }
        if (damageSource.cause === 'flyIntoWall') {
            triggerSarcasticTip(victim, 'USE_ELYTRA');
        }
        if (damageSource.cause === 'starve') {
            const inventory = victim.getComponent("inventory").container;
            for (let i = 0; i < inventory.size; i++) {
                if (inventory.getItem(i)?.hasTag('minecraft:is_food')) {
                    triggerSarcasticTip(victim, 'LOW_HUNGER_WITH_FOOD');
                    break;
                }
            }
        }
    }

    if (damageSource.damagingEntity?.typeId === 'minecraft:player') {
        const attacker = damageSource.damagingEntity;
        if (hurtEntity.typeId === 'minecraft:enderman' && attacker.isLookingAtEntity(hurtEntity)) {
            triggerSarcasticTip(attacker, 'LOOK_AT_ENDERMAN');
        }
        
        if ((hurtEntity.typeId === 'minecraft:piglin' || hurtEntity.typeId === 'minecraft:piglin_brute') && attacker.dimension.id === 'minecraft:nether') {
            let hasGold = false;
            const equippable = attacker.getComponent('equippable');
            if(equippable) {
                for (let i = 0; i < 4; i++) {
                    if (equippable.getEquipmentSlot(i).item?.hasTag('minecraft:piglin_loved')) {
                        hasGold = true;
                        break;
                    }
                }
            }
            if (!hasGold) {
                triggerSarcasticTip(attacker, 'NO_GOLD_IN_NETHER');
            }
        }

        if (hurtEntity.hasComponent('minecraft:shield')) {
            const heldItem = attacker.getComponent("inventory").container.getItem(attacker.selectedSlotIndex);
            if (!heldItem?.typeId.endsWith('_axe')) {
                 triggerSarcasticTip(attacker, 'WRONG_TOOL_USAGE');
            }
        }
    }
}

export function checkEntitySpawnTriggers(spawnedEntity) {
    if (spawnedEntity.typeId === 'minecraft:phantom') {
        const query = {};
        query.location = spawnedEntity.location;
        query.maxDistance = 64;
        query.type = 'minecraft:player';

        for (const player of spawnedEntity.dimension.getEntities(query)) {
            try {
                if (player.getStatistic('time_since_rest') > 72000) { 
                    triggerSarcasticTip(player, 'PHANTOM_SPAWN');
                }
            } catch (e) { }
        }
    }
}

export function runLightweightPeriodicChecks() {
    for (const player of world.getAllPlayers()) {
        const hashCode = [...player.nameTag].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        if ((system.currentTick + hashCode) % CREEPER_CHECK_INTERVAL_TICKS === 0) {
            const query = {};
            query.location = player.location;
            query.maxDistance = 8;
            query.type = 'minecraft:creeper';
            if (player.dimension.getEntities(query).length > 0) {
                triggerSarcasticTip(player, 'IGNORE_CREEPER');
            }
        }
    }
}

function cleanupInactivePlayers() {
    const allPlayerNames = new Set(world.getAllPlayers().map(p => p.nameTag));
    for (const playerName of playerTipHistory.keys()) {
        if (!allPlayerNames.has(playerName)) {
            playerTipHistory.delete(playerName);
        }
    }
}

system.runInterval(cleanupInactivePlayers, 6000);