// --- START OF FILE: skills/chaos_trap.js ---

import { world, system, BlockPermutation, MolangVariableMap } from "@minecraft/server";
import { Vector } from "./vector.js";

const TRAP_DURATION_SECONDS = 300; // Bẫy tồn tại 5 phút
const CHAOS_TRAPS = new Map(); // Dùng Map để quản lý nhiều bẫy

// ======================================================
// === THƯ VIỆN CÁC HIỆU ỨNG HỖN LOẠN (Linh hồn kỹ năng) ===
// ======================================================

const CHAOS_EFFECTS = [
    // 1. Sét Đánh Liên Hoàn
    (trap, victim) => {
        trap.dimension.playSound("ambient.weather.thunder", victim.location, { volume: 2 });
        let strikes = 5 + Math.floor(Math.random() * 3);
        for (let i = 0; i < strikes; i++) {
            system.runTimeout(() => {
                if (victim.isValid) victim.dimension.spawnEntity("minecraft:lightning_bolt", victim.location);
            }, i * 15);
        }
        trap.dimension.spawnParticle("dhh:chaos_explode_shockwave", trap.location);
    },
    // 2. Dịch Chuyển Hư Không (Tầm xa 50-100 block)
    (trap, victim) => {
        trap.dimension.playSound("mob.endermen.portal", victim.location, { volume: 1.5 });
        const randomAngle = Math.random() * 2 * Math.PI;
        const randomDist = 50 + Math.random() * 50;
        const newPos = {
            x: victim.location.x + Math.cos(randomAngle) * randomDist,
            y: victim.location.y,
            z: victim.location.z + Math.sin(randomAngle) * randomDist
        };
        victim.teleport(newPos, { checkForBlocks: true });
        victim.dimension.spawnParticle("minecraft:portal_reverse_particle", victim.location);
    },
    // 3. Nổ Năng Lượng
    (trap, victim) => {
        trap.dimension.playSound("random.explode", victim.location, { volume: 2, pitch: 1.2 });
        trap.dimension.createExplosion(victim.location, trap.size + 1, { breaksBlocks: false, causesFire: true });
        trap.dimension.spawnParticle("minecraft:huge_explosion_emitter", victim.location);
    },
    // 4. Hố Sâu Vực Thẳm (Hoàn trả sau 5 giây)
    (trap, victim) => {
        trap.dimension.playSound("block.rooted_dirt.break", victim.location, { pitch: 0.5, volume: 2 });
        const pitSize = Math.floor(trap.size / 2) + 1;
        const pitDepth = 5;
        const center = victim.location;
        const air = BlockPermutation.resolve("minecraft:air");
        
        const blocksToRestore = [];

        system.runTimeout(() => {
            if (!victim.isValid) return; 
            const dimension = trap.dimension; 

            for(let x = -pitSize; x <= pitSize; x++) {
                for(let z = -pitSize; z <= pitSize; z++) {
                    for(let y = 0; y >= -pitDepth; y--) {
                        const blockLoc = { x: Math.floor(center.x + x), y: Math.floor(center.y + y -1), z: Math.floor(center.z + z) };
                        const block = dimension.getBlock(blockLoc);
                        if(block && !block.isAir) {
                           blocksToRestore.push({ location: block.location, originalPermutation: block.permutation });
                           block.setPermutation(air);
                           dimension.spawnParticle(`minecraft:block_destruct?${block.typeId}`, block.location);
                        }
                    }
                }
            }

            system.runTimeout(() => {
                dimension.playSound("block.rooted_dirt.place", center, { volume: 2, pitch: 0.8 });
                for (const restoreData of blocksToRestore) {
                    try {
                        const block = dimension.getBlock(restoreData.location);
                        if (block && block.isAir) block.setPermutation(restoreData.originalPermutation);
                    } catch(e) {}
                }
            }, 100);

        }, 10);
    },
    // 5. Giam Cầm Băng Giá (Cột 2x2x4, tự tan)
    (trap, victim) => {
        const slowDurationTicks = 200; // 10 giây
        trap.dimension.playSound("block.glass.break", victim.location, { volume: 2 });
        victim.addEffect("slowness", slowDurationTicks, { amplifier: 255 });
        
        const ice = BlockPermutation.resolve("minecraft:ice");
        const air = BlockPermutation.resolve("minecraft:air");
        const loc = victim.location;
        const dimension = victim.dimension;
        const iceBlocksLocation = [];

        for(let dx = 0; dx < 2; dx++){
            for(let dz = 0; dz < 2; dz++){
                for(let dy = 0; dy < 4; dy++){
                    const blockLoc = { x: Math.floor(loc.x + dx), y: Math.floor(loc.y + dy), z: Math.floor(loc.z + dz) };
                    const block = dimension.getBlock(blockLoc);
                    if(block && block.isAir) {
                        block.setPermutation(ice);
                        iceBlocksLocation.push(block.location);
                    }
                }
            }
        }
        
        system.runTimeout(() => {
             for (const iceLoc of iceBlocksLocation) {
                 try {
                     const block = dimension.getBlock(iceLoc);
                     if (block && block.typeId === "minecraft:ice") block.setPermutation(air);
                 } catch(e) {}
             }
             const soundLoc = victim.isValid ? victim.location : loc;
             dimension.playSound("block.ice.break", soundLoc, {volume: 1});
        }, slowDurationTicks);
    },
     // 6. Lời Nguyền Gà Con
    (trap, victim) => {
        if (!victim.isValid) return;
        trap.dimension.playSound("mob.chicken.plop", victim.location, { volume: 2, pitch: 0.8 });
        
        const originalLocation = { ...victim.location };
        const originalHealth = victim.getComponent("health").currentValue;

        victim.addEffect("invisibility", 120, { showParticles: false });
        victim.teleport({ x: originalLocation.x, y: -64, z: originalLocation.z });
        
        const chickenSubstitute = trap.dimension.spawnEntity("minecraft:chicken", originalLocation);
        chickenSubstitute.nameTag = "§c???";
        
        system.runTimeout(() => {
            if (chickenSubstitute.isValid) {
                chickenSubstitute.triggerEvent("minecraft:ageable_grow_up");
                chickenSubstitute.kill();
                trap.dimension.spawnParticle("minecraft:egg_destroy_emitter", originalLocation);
            }
            if (victim.isValid) {
                victim.teleport(originalLocation);
                victim.getComponent("health")?.setCurrentValue(originalHealth);
                trap.dimension.playSound("mob.chicken.plop", originalLocation, { pitch: 1.5 });
            }
        }, 100);
    }
];


// ===============================
// === LOGIC VẬN HÀNH BẪY =========
// ===============================
function manageTraps() {
    for (const [trapId, trap] of CHAOS_TRAPS.entries()) {
        const now = Date.now();
        
        // 1. Kiểm tra hết hạn
        if (now >= trap.expirationTime) {
            trap.dimension.playSound("random.fizz", trap.location, { pitch: 1.5 });
            CHAOS_TRAPS.delete(trapId);
            continue; 
        }

        // 2. Kiểm tra kích hoạt TRƯỚC KHI VẼ
        const victims = trap.dimension.getEntities({ location: trap.location, maxDistance: trap.size * 0.75, families: ["monster"], excludeTags: ["dhh_spirit_beast"] });

        if (victims.length > 0) {
            const victim = victims[0];
            
            trap.dimension.playSound("block.sculk_shrieker.shriek", trap.location, {volume: 2, pitch: 0.8});
            trap.dimension.spawnParticle("minecraft:sonic_explosion", trap.location);

            const randomEffect = CHAOS_EFFECTS[Math.floor(Math.random() * CHAOS_EFFECTS.length)];
            system.runTimeout(() => { 
                 if (victim.isValid) randomEffect(trap, victim);
            }, 10);

            CHAOS_TRAPS.delete(trapId); 
            continue; // Rất quan trọng: Không vẽ particle cho bẫy vừa bị xóa
        }

        // 3. Nếu bẫy vẫn còn và không bị kích hoạt -> Vẽ hiệu ứng
        // Không cần truyền "variable.particle_lifetime" nữa vì đã set cứng trong JSON
        const molang = new MolangVariableMap();
        molang.setFloat("variable.circle_size", trap.size);
        const particleLocation = {
    x: trap.location.x,
    y: trap.location.y + 0.3, // <-- THAY ĐỔI NẰM Ở ĐÂY
    z: trap.location.z
};
// Spawn particle tại vị trí mới
trap.dimension.spawnParticle("dhh:magic_circle", particleLocation, molang);
    }
}

// Hàm chính được gọi từ skill_handler.js
export function activateChaosTrap(player, stats) {
    try {
        const skillLevel = stats.skills.chaos_trap ?? 1;

        player.playSound("block.enchantment_table.use", {volume: 1.5, pitch: 1.5});
        const molang = new MolangVariableMap();
        molang.setColorRGB("variable.color", { red: 0.8, green: 0, blue: 1.0 });
        for(let i=0; i<200; i++){
            player.dimension.spawnParticle("minecraft:colored_flame_particle", player.location, molang);
        }
        
        const trapId = `${player.nameTag}_${Date.now()}`;
        const newTrap = {
            id: trapId,
            ownerName: player.nameTag,
            location: player.location,
            dimension: player.dimension,
            size: 1 + skillLevel, 
            expirationTime: Date.now() + TRAP_DURATION_SECONDS * 1000,
        };

       

        CHAOS_TRAPS.set(trapId, newTrap);
        player.sendMessage("§dMột ấn ký hỗn mang đã được gieo rắc.");
        return true;
        
    } catch (e) {
        player.sendMessage("§cKhông thể đặt bẫy!");
        console.error("Chaos Trap skill failed:", e);
        return false;
    }
}

system.runInterval(() => {
    manageTraps();
}, 5);
// --- END OF FILE: skills/chaos_trap.js ---