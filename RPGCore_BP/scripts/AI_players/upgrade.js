import { world, system } from "@minecraft/server";

const AI_ENTITY_TYPE_ID = "dhh:newb";
const PROGRESSION_PROPERTY = "dhh:progression_points";
const UPGRADING_TAG = "is_upgrading";

const PROGRESSION_TIERS = [
    { threshold: 5000, tag: "diamond_pro", event: "dhh:event_upgrade_to_diamond_pro" },
    { threshold: 3000, tag: "diamond",     event: "dhh:event_upgrade_to_diamond" },
    { threshold: 1500, tag: "iron",        event: "dhh:event_upgrade_to_iron" },
    { threshold: 600,  tag: "copper",      event: "dhh:event_upgrade_to_copper" },
    { threshold: 120,  tag: "stone",       event: "dhh:event_upgrade_to_stone" },
    { threshold: 0,    tag: "wooden",      event: "dhh:event_upgrade_to_wooden" }
];

const UPGRADE_ANIMATION_DURATION_TICKS = 100;

function initiateUpgradeProcess(ai, oldTierTag, newTierObject) {
    ai.addTag(UPGRADING_TAG);

    const aiLoc = ai.location;
    const workbenchPos = { x: Math.floor(aiLoc.x) + 2, y: Math.floor(aiLoc.y), z: Math.floor(aiLoc.z) };
    ai.dimension.runCommand(`setblock ${workbenchPos.x} ${workbenchPos.y} ${workbenchPos.z} crafting_table`);

    ai.triggerEvent("dhh:event_go_crafting"); 

    system.runTimeout(() => {
        if (!ai?.isValid) return;
        ai.removeTag(oldTierTag);
        ai.addTag(newTierObject.tag);
        ai.triggerEvent(newTierObject.event);
        ai.dimension.runCommand(`setblock ${workbenchPos.x} ${workbenchPos.y} ${workbenchPos.z} air`);
        ai.triggerEvent("dhh:event_stop_crafting");
        ai.removeTag(UPGRADING_TAG);
        
        console.log(`AI ${ai.nameTag} has upgraded from ${oldTierTag} to ${newTierObject.tag}.`);
    }, UPGRADE_ANIMATION_DURATION_TICKS);
}

export function initializeProgressionSystem() {
    world.afterEvents.entitySpawn.subscribe(event => {
        if (event.entity.typeId === AI_ENTITY_TYPE_ID) {
            const ai = event.entity;
            const initialTier = PROGRESSION_TIERS.find(tier => ai.hasTag(tier.tag));
            const initialPoints = initialTier ? initialTier.threshold : 0;
            ai.setDynamicProperty(PROGRESSION_PROPERTY, initialPoints);
            if (!initialTier && !ai.getTags().some(tag => PROGRESSION_TIERS.find(t => t.tag === tag))) {
                ai.addTag(PROGRESSION_TIERS[PROGRESSION_TIERS.length - 1].tag);
            }
        }
    });

   system.runInterval(() => {
    let allAis = [];
    const dimensionIdsToQuery = ["overworld", "nether", "the_end"];

    for (const dimId of dimensionIdsToQuery) {
        try {
            const dimension = world.getDimension(dimId);
  
            const entitiesInDimension = dimension.getEntities({ type: AI_ENTITY_TYPE_ID });
           
            allAis.push(...entitiesInDimension);
        } catch (e) {
          
        }
    }
    
    
    for (const ai of allAis) {
        const currentPoints = ai.getDynamicProperty(PROGRESSION_PROPERTY) || 0;
        ai.setDynamicProperty(PROGRESSION_PROPERTY, currentPoints + 1);
    }
}, 20);


    
    world.afterEvents.entityDie.subscribe(event => {
        const { deadEntity, damageSource } = event;
        const killer = damageSource?.damagingProjectile?.owner ?? damageSource?.damagingEntity;

        if (deadEntity.typeId === AI_ENTITY_TYPE_ID && killer?.typeId === AI_ENTITY_TYPE_ID) {
            const victimPoints = deadEntity.getDynamicProperty(PROGRESSION_PROPERTY) || 0;
            const killerPoints = killer.getDynamicProperty(PROGRESSION_PROPERTY) || 0;
            killer.setDynamicProperty(PROGRESSION_PROPERTY, killerPoints + victimPoints);
            console.log(`AI ${killer.nameTag} absorbed ${victimPoints} points from ${deadEntity.nameTag}.`);
        }
    });

    
    system.runInterval(() => {
        let idleAis = [];
const dimensionIdsToQuery = ["overworld", "nether", "the_end"];

for (const dimId of dimensionIdsToQuery) {
    try {
        const dimension = world.getDimension(dimId);
        
        
        const entitiesInDimension = dimension.getEntities({ 
            type: AI_ENTITY_TYPE_ID, 
            excludeTags: ["has_target", UPGRADING_TAG] 
        });
        
       
        idleAis.push(...entitiesInDimension);
    } catch (e) {
       
    }
}


        for (const ai of idleAis) {
            const currentPoints = ai.getDynamicProperty(PROGRESSION_PROPERTY) || 0;
            const aiTags = ai.getTags();
            let currentTierTag;

            for (const tier of PROGRESSION_TIERS) {
                if (aiTags.includes(tier.tag)) {
                    currentTierTag = tier.tag;
                    break;
                }
            }

            if (!currentTierTag) continue;

            for (const targetTier of PROGRESSION_TIERS) {
                if (currentPoints >= targetTier.threshold) {
                    if (targetTier.tag !== currentTierTag) {
                        
                        initiateUpgradeProcess(ai, currentTierTag, targetTier);
                    }
                    break;
                }
            }
        }
    }, 100);
    
    console.log("[AI Progression] System initialized.");
}