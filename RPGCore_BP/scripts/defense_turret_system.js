// defense_turret_system.js
import { world, system, BlockPermutation } from "@minecraft/server";

const TURRET_CONFIG = {
    // Cấu hình pattern xây dựng
    PATTERN: {
        HEAD_BLOCKS: ["minecraft:lantern", "minecraft:soul_lantern"], // Đèn lồng thường hoặc soul
        REQUIRED_HEIGHT: 3 // Chiều cao 3 khối
    },
    
    // Cấu hình từng cấp độ turret (theo vật liệu)
    TIERS: {
        "minecraft:copper_block": {
            name: "§6Trụ Đồng",
            range: 15,
            cooldown: 80, // 4 giây
            projectile: "minecraft:small_fireball",
            damage: 3,
            particle: "minecraft:lava_particle"
        },
        "minecraft:iron_block": {
            name: "§7Trụ Sắt",
            range: 20,
            cooldown: 60, // 3 giây
            projectile: "minecraft:small_fireball",
            damage: 5,
            particle: "minecraft:critical_hit_emitter"
        },
        "minecraft:gold_block": {
            name: "§eŨ Vàng",
            range: 25,
            cooldown: 40, // 2 giây
            projectile: "minecraft:fireball",
            damage: 8,
            particle: "minecraft:totem_particle"
        },
        "minecraft:diamond_block": {
            name: "§bTrụ Kim Cương",
            range: 30,
            cooldown: 30, // 1.5 giây
            projectile: "minecraft:fireball",
            damage: 12,
            particle: "minecraft:dragon_breath_particle"
        },
        "minecraft:netherite_block": {
            name: "§4Trụ Netherite",
            range: 35,
            cooldown: 20, // 1 giây
            projectile: "minecraft:dragon_fireball",
            damage: 20,
            particle: "minecraft:soul_particle"
        }
    },
    
    // Cấu hình tấn công mặc định (nếu không match tier nào)
    ATTACK: {
        SCAN_INTERVAL: 40 // Quét mob mỗi 2 giây (40 ticks)
    },
    
    // Cấu hình hiển thị
    VISUAL: {
        IDLE_PARTICLE: "minecraft:end_rod", // Hạt khi không hoạt động
        FIRING_PARTICLE: "minecraft:critical_hit_emitter", // Hạt khi bắn
        SCANNING_SOUND: "beacon.ambient", // Âm thanh quét
        FIRING_SOUND: "firework.blast" // Âm thanh bắn
    },
    
    // Cấu hình bền vững
    DURABILITY: {
        ENABLED: false, // Tạm tắt độ bền để test
        MAX_HEALTH: 100,
        DAMAGE_PER_HIT: 10
    }
};

// Lưu trữ tất cả turret đang hoạt động
const activeTurrets = new Map(); // Key: "x,y,z,dim", Value: turretData

/**
 * Kiểm tra xem một vị trí có phải là pattern hợp lệ của turret không
 * @param {import("@minecraft/server").Block} topBlock - Block đầu tiên được đặt (đèn)
 * @returns {{valid: boolean, tier: string|null, tierConfig: Object|null}}
 */
function isValidTurretPattern(topBlock) {
    const { x, y, z } = topBlock.location;
    const dimension = topBlock.dimension;
    
    // Kiểm tra đầu (đèn lồng)
    if (!TURRET_CONFIG.PATTERN.HEAD_BLOCKS.includes(topBlock.typeId)) {
        return { valid: false, tier: null, tierConfig: null };
    }
    
    // Kiểm tra 3 khối bên dưới phải cùng loại
    let firstBlockType = null;
    for (let i = 1; i <= TURRET_CONFIG.PATTERN.REQUIRED_HEIGHT; i++) {
        const block = dimension.getBlock({ x, y: y - i, z });
        if (!block) {
            return { valid: false, tier: null, tierConfig: null };
        }
        
        // Lưu loại block đầu tiên
        if (i === 1) {
            firstBlockType = block.typeId;
            // Kiểm tra xem có phải là một trong các tier không
            if (!TURRET_CONFIG.TIERS[firstBlockType]) {
                return { valid: false, tier: null, tierConfig: null };
            }
        } else {
            // Các block sau phải cùng loại với block đầu
            if (block.typeId !== firstBlockType) {
                return { valid: false, tier: null, tierConfig: null };
            }
        }
    }
    
    return { 
        valid: true, 
        tier: firstBlockType,
        tierConfig: TURRET_CONFIG.TIERS[firstBlockType]
    };
}

/**
 * Tạo một turret mới tại vị trí đã cho
 * @param {import("@minecraft/server").Block} headBlock - Block đầu (đèn)
 * @param {string} ownerName - Tên người tạo
 * @param {string} tier - Loại vật liệu
 * @param {Object} tierConfig - Config của tier đó
 */
function createTurret(headBlock, ownerName, tier, tierConfig) {
    const { x, y, z } = headBlock.location;
    const dimension = headBlock.dimension;
    const key = `${x},${y},${z},${dimension.id}`;
    
    // Kiểm tra xem đã tồn tại turret tại vị trí này chưa
    if (activeTurrets.has(key)) {
        return false;
    }
    
    const turretData = {
        location: { x, y, z },
        dimensionId: dimension.id,
        owner: ownerName,
        tier: tier,
        tierConfig: tierConfig,
        lastScanTick: 0,
        lastFireTick: 0,
        health: TURRET_CONFIG.DURABILITY.MAX_HEALTH,
        currentTarget: null
    };
    
    activeTurrets.set(key, turretData);
    
    // Hiệu ứng tạo thành công (dùng particle của tier)
    dimension.spawnParticle(tierConfig.particle, { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
    dimension.playSound("random.levelup", { x, y, z });
    
    // Thông báo cho người tạo
    const player = world.getPlayers({ name: ownerName })[0];
    if (player) {
        player.sendMessage(`§a§l[Trụ Phòng Thủ] §r${tierConfig.name} §fđã được kích hoạt!`);
        player.sendMessage(`§7- Tầm bắn: §e${tierConfig.range} blocks`);
        player.sendMessage(`§7- Tốc độ: §e${(tierConfig.cooldown / 20).toFixed(1)}s/phát`);
        player.sendMessage(`§7- Sát thương: §c${tierConfig.damage} HP`);
    }
    
    return true;
}

/**
 * Hủy một turret
 * @param {string} key - Key của turret trong Map
 * @param {boolean} dropItems - Có rơi vật phẩm không
 */
function destroyTurret(key, dropItems = true) {
    const turretData = activeTurrets.get(key);
    if (!turretData) return;
    
    const dimension = world.getDimension(turretData.dimensionId);
    const { x, y, z } = turretData.location;
    
    // Hiệu ứng phá hủy
    dimension.spawnParticle("minecraft:huge_explosion_emitter", { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
    dimension.playSound("random.explode", { x, y, z });
    
    // Phá các block (nếu muốn)
    if (dropItems) {
        // Phá đèn
        dimension.getBlock({ x, y, z })?.setType("minecraft:air");
        // Phá 3 khối sắt
        for (let i = 1; i <= 3; i++) {
            dimension.getBlock({ x, y: y - i, z })?.setType("minecraft:air");
        }
    }
    
    activeTurrets.delete(key);
}

/**
 * Tìm mob gần nhất trong tầm bắn
 * @param {Object} turretData 
 * @returns {import("@minecraft/server").Entity|null}
 */
function findNearestMob(turretData) {
    const dimension = world.getDimension(turretData.dimensionId);
    const { x, y, z } = turretData.location;
    const range = turretData.tierConfig.range;
    
    const mobs = dimension.getEntities({
        location: { x: x + 0.5, y: y + 0.5, z: z + 0.5 },
        maxDistance: range,
        families: ["monster"] // Chỉ nhắm mob
    });
    
    if (mobs.length === 0) return null;
    
    // Tìm mob gần nhất
    let nearestMob = null;
    let minDistance = Infinity;
    
    for (const mob of mobs) {
        const dx = mob.location.x - (x + 0.5);
        const dy = mob.location.y - (y + 0.5);
        const dz = mob.location.z - (z + 0.5);
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestMob = mob;
        }
    }
    
    return nearestMob;
}

/**
 * Bắn đạn về phía mục tiêu
 * @param {Object} turretData 
 * @param {import("@minecraft/server").Entity} target 
 */
function fireTurret(turretData, target) {
    const dimension = world.getDimension(turretData.dimensionId);
    const { x, y, z } = turretData.location;
    const tierConfig = turretData.tierConfig;
    
    try {
        // Tính vector hướng từ turret đến target
        const dx = target.location.x - (x + 0.5);
        const dy = target.location.y - (y + 0.5);
        const dz = target.location.z - (z + 0.5);
        
        // Normalize vector
        const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const dirX = dx / length;
        const dirY = dy / length;
        const dirZ = dz / length;
        
        // Spawn projectile
        const projectile = dimension.spawnEntity(
            tierConfig.projectile,
            { x: x + 0.5, y: y + 0.5, z: z + 0.5 }
        );
        
        // Set velocity (tốc độ bay) - tốc độ tăng theo tier
        const speed = 1.0 + (tierConfig.damage / 10);
        projectile.applyImpulse({
            x: dirX * speed,
            y: dirY * speed,
            z: dirZ * speed
        });
        
        // Tag để nhận biết đạn từ turret
        projectile.addTag(`turret_shot:${turretData.owner}`);
        projectile.addTag(`turret_damage:${tierConfig.damage}`);
        
        // Hiệu ứng bắn (dùng particle của tier)
        dimension.spawnParticle(
            tierConfig.particle,
            { x: x + 0.5, y: y + 0.5, z: z + 0.5 }
        );
        dimension.playSound(TURRET_CONFIG.VISUAL.FIRING_SOUND, { x, y, z }, { pitch: 1.2 });
        
        // Cập nhật thời gian bắn cuối
        turretData.lastFireTick = system.currentTick;
        
    } catch (e) {
        console.warn(`[Defense Turret] Lỗi khi bắn: ${e}`);
    }
}

/**
 * Cập nhật tất cả turret (chạy mỗi tick)
 */
function updateAllTurrets() {
    const currentTick = system.currentTick;
    
    for (const [key, turretData] of activeTurrets.entries()) {
        try {
            const dimension = world.getDimension(turretData.dimensionId);
            const { x, y, z } = turretData.location;
            const tierConfig = turretData.tierConfig;
            
            // Kiểm tra xem turret còn tồn tại không (block còn đúng pattern không)
            const headBlock = dimension.getBlock({ x, y, z });
            const patternCheck = isValidTurretPattern(headBlock);
            if (!patternCheck.valid || patternCheck.tier !== turretData.tier) {
                destroyTurret(key, false); // Không drop items vì đã bị phá thủ công
                continue;
            }
            
            // Hiển thị particle idle (dùng particle của tier)
            if (currentTick % 20 === 0) {
                dimension.spawnParticle(
                    tierConfig.particle,
                    { x: x + 0.5, y: y + 1, z: z + 0.5 }
                );
            }
            
            // Quét tìm mục tiêu
            if (currentTick - turretData.lastScanTick >= TURRET_CONFIG.ATTACK.SCAN_INTERVAL) {
                turretData.currentTarget = findNearestMob(turretData);
                turretData.lastScanTick = currentTick;
                
                // Âm thanh quét
                if (turretData.currentTarget) {
                    dimension.playSound(TURRET_CONFIG.VISUAL.SCANNING_SOUND, { x, y, z }, { pitch: 1.5, volume: 0.5 });
                }
            }
            
            // Bắn nếu có mục tiêu và đã hết cooldown (dùng cooldown của tier)
            if (turretData.currentTarget && 
                turretData.currentTarget.isValid && 
                currentTick - turretData.lastFireTick >= tierConfig.cooldown) {
                fireTurret(turretData, turretData.currentTarget);
            }
            
        } catch (e) {
            console.warn(`[Defense Turret] Lỗi khi cập nhật turret: ${e}`);
        }
    }
}

/**
 * Lắng nghe sự kiện đặt block để phát hiện pattern
 */
world.afterEvents.playerPlaceBlock.subscribe((event) => {
    try {
        const { player, block } = event;
        
        // Kiểm tra xem block vừa đặt có phải là đèn lồng không
        if (TURRET_CONFIG.PATTERN.HEAD_BLOCKS.includes(block.typeId)) {
            // Kiểm tra pattern
            const patternCheck = isValidTurretPattern(block);
            if (patternCheck.valid) {
                createTurret(block, player.nameTag, patternCheck.tier, patternCheck.tierConfig);
            }
        }
    } catch (e) {
        console.warn(`[Defense Turret] Lỗi khi xử lý playerPlaceBlock: ${e}`);
    }
});

/**
 * Khởi tạo hệ thống
 */
export function initializeDefenseTurretSystem() {
    // Chạy update loop
    system.runInterval(() => {
        updateAllTurrets();
    }, 1); // Chạy mỗi tick
    
    console.log("§a[Defense Turret System] §2Đã khởi tạo thành công!");
}

/**
 * Lấy số lượng turret hiện tại của một người chơi
 */
export function getPlayerTurretCount(playerName) {
    let count = 0;
    for (const turretData of activeTurrets.values()) {
        if (turretData.owner === playerName) {
            count++;
        }
    }
    return count;
}

/**
 * Debug: Hiển thị tất cả turret
 */
export function debugShowAllTurrets(player) {
    if (activeTurrets.size === 0) {
        player.sendMessage("§eKhông có turret nào đang hoạt động.");
        return;
    }
    
    player.sendMessage(`§a§l[Debug] Danh sách turret (${activeTurrets.size}):`);
    for (const [key, data] of activeTurrets.entries()) {
        player.sendMessage(`§7- ${key} | Owner: §f${data.owner} §7| Health: §c${data.health}`);
    }
}