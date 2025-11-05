import { world, system, EntityDamageCause, EntityHealthComponent,  EntityEquippableComponent, EntityComponentTypes, ItemStack, EquipmentSlot, Player, Container, EntityInventoryComponent, EffectType } from "@minecraft/server";

const AI_ENTITY_TYPE_ID = "dhh:newb"; 
const COMBAT_TAG = "has_target"; 

const STRAFE_THINK_INTERVAL_MIN_SECONDS = 0.1;
const STRAFE_THINK_INTERVAL_MAX_SECONDS = 0.1;

const STRAFE_STEP_COUNT_MIN = 5;    
const STRAFE_STEP_COUNT_MAX = 8;     
const STRAFE_STEP_INTERVAL_TICKS = 3;  
const STRAFE_STEP_STRENGTH = 0.23;    


const strafeStates = new Map();

function performStrafeStep(ai, state, direction, stepsRemaining) {
    if (stepsRemaining <= 0 || !ai.isValid || !ai.hasTag(COMBAT_TAG)) {
        state.isStrafing = false; 
        return;
    }

    const impulse = {
        x: direction.x * STRAFE_STEP_STRENGTH,
        y: 0,
        z: direction.z * STRAFE_STEP_STRENGTH
    };

    ai.applyImpulse(impulse);

    system.runTimeout(() => {
        performStrafeStep(ai, state, direction, stepsRemaining - 1); 
    }, STRAFE_STEP_INTERVAL_TICKS);
}

function initiateStrafe(ai) {
    if (!strafeStates.has(ai.id)) {
        strafeStates.set(ai.id, { isStrafing: false });
    }
    const state = strafeStates.get(ai.id);

    if (state.isStrafing || !ai.isOnGround) {
        return;
    }

    state.isStrafing = true;  
    const thinkDelay = (STRAFE_THINK_INTERVAL_MIN_SECONDS + Math.random() * (STRAFE_THINK_INTERVAL_MAX_SECONDS - STRAFE_THINK_INTERVAL_MIN_SECONDS));

    system.runTimeout(() => {
        if (!ai.isValid || !ai.hasTag(COMBAT_TAG)) {
            state.isStrafing = false; 
            return;
        }
        
        const randomX = Math.random() * 2 - 1;
        const randomZ = Math.random() * 2 - 1;
        const direction = { x: randomX, z: randomZ };

        const totalSteps = STRAFE_STEP_COUNT_MIN + Math.floor(Math.random() * (STRAFE_STEP_COUNT_MAX - STRAFE_STEP_COUNT_MIN + 1));

        performStrafeStep(ai, state, direction, totalSteps);
        
    }, Math.floor(thinkDelay * 20));
}


export function initializeStrafingBehavior() {
    system.runInterval(() => {
let AIsInCombat = [];
const dimensionIdsToQuery = ["overworld", "nether", "the_end"];
for (const dimId of dimensionIdsToQuery) {
    try {
        const dimension = world.getDimension(dimId);
        const entitiesInDimension = dimension.getEntities({ 
            type: AI_ENTITY_TYPE_ID, 
            tags: [COMBAT_TAG] 
        });
        AIsInCombat.push(...entitiesInDimension);
    } catch (e) {
    }
}

        for (const ai of AIsInCombat) {
            initiateStrafe(ai);
        }

        const currentAiIds = new Set(AIsInCombat.map(ai => ai.id));
        for (const storedId of strafeStates.keys()) {
            if (!currentAiIds.has(storedId)) {
                strafeStates.delete(storedId);
            }
        }

    }, 20);

    console.log("[AI Strafe] Advanced behavior initialized.");
}