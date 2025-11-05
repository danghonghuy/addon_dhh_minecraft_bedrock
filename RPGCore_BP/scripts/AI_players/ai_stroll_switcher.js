import { world, system } from "@minecraft/server";

const AI_ENTITY_TYPE_ID = "dhh:newb"; 
const EVENT_NAME_TO_TRIGGER = "stroll_switch";

const MIN_INTERVAL_SECONDS = 10; 
const MAX_INTERVAL_SECONDS = 60; 
const POPULATION_CHECK_INTERVAL_TICKS = 100; 


const trackedAis = new Set();


function scheduleNextStrollSwitch(ai) {

    if (!ai.isValid) {
        trackedAis.delete(ai.id);
        return;
    }
  
    const randomDelayTicks = Math.floor((MIN_INTERVAL_SECONDS + Math.random() * (MAX_INTERVAL_SECONDS - MIN_INTERVAL_SECONDS)) * 20);

    system.runTimeout(() => {
 
        if (!ai.isValid) {
            trackedAis.delete(ai.id);
            return;
        }

        ai.triggerEvent(EVENT_NAME_TO_TRIGGER);

        scheduleNextStrollSwitch(ai);

    }, randomDelayTicks);
}


export function initializeStrollSwitcherBehavior() {

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
       
            if (!trackedAis.has(ai.id)) {
                
                trackedAis.add(ai.id);
                
                scheduleNextStrollSwitch(ai);
            }
        }
    }, POPULATION_CHECK_INTERVAL_TICKS);

    console.log("[AI Stroll Switcher] Behavior initialized.");
}