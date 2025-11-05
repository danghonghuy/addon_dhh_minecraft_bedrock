import { world, system } from "@minecraft/server";

const AI_ENTITY_TYPE_ID = "dhh:newb"; 
const ATTACK_TAG = "allow_attack";

const MIN_INTERVAL_SECONDS = 20;
const MAX_INTERVAL_SECONDS = 60;
const TAG_DURATION_TICKS = 40;

const trackedAis = new Set();

function giveAndRemoveTag(ai) {
    if (!ai.isValid) {
        return;
    }
    
    ai.addTag(ATTACK_TAG);

    system.runTimeout(() => {
        if (ai.isValid) {
            ai.removeTag(ATTACK_TAG);
        }
    }, TAG_DURATION_TICKS);
}

function scheduleAllowAttackTag(ai) {
    if (!ai.isValid) {
        trackedAis.delete(ai.id);
        return;
    }
    
    const randomDelay = (MIN_INTERVAL_SECONDS + Math.random() * (MAX_INTERVAL_SECONDS - MIN_INTERVAL_SECONDS));

    system.runTimeout(() => {
        giveAndRemoveTag(ai);
        scheduleAllowAttackTag(ai);
    }, Math.floor(randomDelay * 20));
}


export function initializeAttackPermissionBehavior() {
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
                scheduleAllowAttackTag(ai);
                console.log(`[Attack Permission] Started timer loop for new AI: ${ai.id}`);
            }
        }
    }, 100);

    console.log("[Attack Permission] Behavior initialized.");
}