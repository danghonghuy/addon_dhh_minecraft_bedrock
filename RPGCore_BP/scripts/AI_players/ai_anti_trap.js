import { world, system } from "@minecraft/server";

const AI_ENTITY_TYPE_ID = "dhh:newb";
const ANTI_TRAP_INTERVAL_TICKS = 60; 
const ANTI_TRAP_RADIUS = 3;       
const TRAP_VEHICLE_TYPES = [         
    "minecraft:minecart",
    "minecraft:boat",
    "minecraft:chest_boat"
];


export function initializeAntiTrapBehavior() {
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
            const nearbyEntities = ai.dimension.getEntities({
                location: ai.location,
                maxDistance: ANTI_TRAP_RADIUS,
                excludeFamilies: [ "player", "monster", "animal" ] 
            });

            for (const entity of nearbyEntities) {

                if (TRAP_VEHICLE_TYPES.includes(entity.typeId)) {
                    
                    entity.kill();
                }
            }
        }
    }, ANTI_TRAP_INTERVAL_TICKS);

    console.log("[AI Anti-Trap] Behavior initialized.");
}