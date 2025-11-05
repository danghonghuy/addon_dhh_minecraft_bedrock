import { world, system } from "@minecraft/server";

const CLEAR_INTERVAL_SECONDS = 120; 
const WARN_BEFORE_CLEAR_SECONDS = 30;  

const WARNING_MESSAGE = "§7§o[Server] Các item rơi trên đất sắp bị xóa khỏi thế giới sau 30s.";


function scheduleNextClearCycle() {
    
    const warnDelayTicks = (CLEAR_INTERVAL_SECONDS - WARN_BEFORE_CLEAR_SECONDS) * 20;

    
    system.runTimeout(() => {
        world.sendMessage(WARNING_MESSAGE);

        
        system.runTimeout(() => {
            
            try {
                world.getDimension("overworld").runCommand("kill @e[type=item]");
                world.getDimension("nether").runCommand("kill @e[type=item]");
                world.getDimension("the_end").runCommand("kill @e[type=item]");
                console.log("[Server Utilities] Cleared all ground items.");
            } catch (error) {
                console.warn(`[Server Utilities] Failed to clear items: ${error}`);
            }

            
            scheduleNextClearCycle();

        }, WARN_BEFORE_CLEAR_SECONDS * 20);

    }, warnDelayTicks);
}

export function initializeGroundItemClear() {
  
    scheduleNextClearCycle();
    console.log("[Server Utilities] Ground item clear behavior initialized.");
}