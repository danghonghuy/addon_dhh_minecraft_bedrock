import { EntityComponentTypes, system } from "@minecraft/server";

export function activateTargetedLightning(player, stats) {
    try {
        const skillLevel = stats.skills.targeted_lightning ?? 1;
        const searchRadius = 10 + skillLevel * 3;
        
        // Số đợt sét (volley) sẽ giáng xuống
        const strikesPerTarget = 5 + Math.floor(skillLevel / 2);

        // [THAY ĐỔI] Sát thương phép thêm cho mỗi tia sét, dựa trên chỉ số Trí Tuệ
        const magicDamagePerStrike = 3 + Math.floor(stats.intelligence / 4);

        const queryOptions = {
            location: player.location,
            maxDistance: searchRadius,
            excludeTypes: [
                'minecraft:player', 'minecraft:item', 'minecraft:armor_stand',
                'minecraft:item_frame', 'minecraft:painting', 'minecraft:boat',
                'minecraft:chest_boat', 'minecraft:minecart','minecraft:creeper', "minecraft:trident"
            ] 
        };

        const nearbyEntities = player.dimension.getEntities(queryOptions);
        
        if (nearbyEntities.length === 0) {
            player.sendMessage("§cKhông có mục tiêu nào trong phạm vi!");
            return false;
        }

        // Lọc mục tiêu - chỉ loại trừ thần thú đã được thuần hóa bởi người chơi khác
        const validTargets = nearbyEntities.filter(entity => {
            // Bỏ qua thần thú của người khác
            if (entity.hasTag("dhh_spirit_beast")) {
                return false;
            }
            return true;
        });
        
        if (validTargets.length === 0) {
            player.sendMessage("§cKhông có mục tiêu hợp lệ nào trong phạm vi!");
            return false;
        }

        // Không cần sắp xếp theo khoảng cách nữa vì đánh đồng loạt
        const targetsToHit = validTargets;
        
        // [THAY ĐỔI] Hiệu ứng thi triển kỹ năng nâng cao và thông báo mới
        player.sendMessage(`§b⚡ Lôi Vực§f giáng xuống ${targetsToHit.length} mục tiêu với ${strikesPerTarget} đợt sét! (ST phép thêm: ${magicDamagePerStrike} mỗi tia)`);
        player.playSound("ambient.weather.thunder", { volume: 1.5, pitch: 0.8 });
        
        let particleTicks = 0;
        const particleInterval = system.runInterval(() => {
            if (!player.isValid || particleTicks >= 20) {
                system.clearRun(particleInterval);
                return;
            }
            const radius = 2.5;
            for (let i = 0; i < 5; i++) { // Spawn nhiều hạt hơn mỗi tick
                const angle = (particleTicks / 10 * Math.PI * 2) + (i * Math.PI * 2 / 5);
                const particleLoc = {
                    x: player.location.x + Math.cos(angle) * radius,
                    y: player.location.y + 1,
                    z: player.location.z + Math.sin(angle) * radius
                };
                player.dimension.spawnParticle("minecraft:electric_spark_particle", particleLoc);
            }
            particleTicks++;
        }, 1);

        // [THAY ĐỔI] Tấn công theo từng đợt (volley) thay vì từng mục tiêu
        for (let strikeIndex = 0; strikeIndex < strikesPerTarget; strikeIndex++) {
            const delay = strikeIndex * 25; // 1.25 giây giữa mỗi đợt sét

            system.runTimeout(() => {
                if (!player.isValid) return;

                // Phát âm thanh cho mỗi đợt sét
                player.dimension.playSound("ambient.weather.thunder", player.location, { volume: 0.8, pitch: 1.2 });

                for (const target of targetsToHit) {
                    // Đặt các hành động cho từng mục tiêu trong cùng một đợt
                    // Thêm một chút ngẫu nhiên nhỏ để các tia sét không đánh trúng cùng 1 tick, trông tự nhiên hơn
                    system.runTimeout(() => {
                         if (!target.isValid) return;
                         
                         target.addTag(`lightning_victim:${player.nameTag}`);
                         target.dimension.spawnEntity("minecraft:lightning_bolt", target.location);
                         
                         // [MỚI] Gây sát thương phép trực tiếp
                         target.applyDamage(magicDamagePerStrike, {
                             causingEntity: player,
                             cause: 'magic'
                         });

                         // Áp dụng debuff như cũ
                         applyLightningDebuff(target, skillLevel, strikeIndex);
                    }, Math.floor(Math.random() * 8));
                }
            }, delay);
        }

        // [MỚI] Hiệu ứng kết thúc kỹ năng
        const totalDuration = (strikesPerTarget - 1) * 25;
        system.runTimeout(() => {
            if (!player.isValid) return;
            player.sendMessage("§b⚡ Lôi Vực§f đã kết thúc.");
            player.playSound("random.totem", { pitch: 0.8 });
            for (let i = 0; i < 20; i++) {
                const angle = (Math.PI * 2 / 20) * i;
                const r = 1.5;
                const particleLoc = {
                    x: player.location.x + Math.cos(angle) * r,
                    y: player.location.y + 1,
                    z: player.location.z + Math.sin(angle) * r
                };
                player.dimension.spawnParticle("minecraft:end_rod", particleLoc);
            }
        }, totalDuration + 30); // Chạy sau khi đợt sét cuối cùng hoàn tất một chút

        return true;

    } catch (e) {
        player.sendMessage("§cKhông thể thực hiện kỹ năng!");
        console.error("Focused Lightning skill failed: ", e);
        return false;
    }
}

function applyLightningDebuff(target, skillLevel, strikeIndex) {
    if (!target.isValid) return;
    
    // Debuff cơ bản cho mọi lightning
    const baseDebuffs = [
        { effect: "slowness", duration: 80 + skillLevel * 10, amplifier: 0 },
        { effect: "weakness", duration: 60 + skillLevel * 10, amplifier: 0 }
    ];
    
    // Áp dụng debuff cơ bản
    for (const debuff of baseDebuffs) {
        target.addEffect(debuff.effect, debuff.duration, { 
            amplifier: debuff.amplifier, 
            showParticles: false 
        });
    }
    
    // Debuff bổ sung dựa trên skill level và số lightning
    if (skillLevel >= 3) {
        // Poison từ lightning thứ 2 trở đi
        if (strikeIndex >= 1) {
            target.addEffect("poison", 40 + skillLevel * 5, { 
                amplifier: 0, 
                showParticles: false 
            });
        }
    }
    
    if (skillLevel >= 5) {
        // Wither từ lightning thứ 3 trở đi
        if (strikeIndex >= 2) {
            target.addEffect("wither", 30 + skillLevel * 5, { 
                amplifier: 0, 
                showParticles: false 
            });
        }
    }
    
    if (skillLevel >= 7) {
        // Nâng cấp: Thay Mining Fatigue bằng Weakness II (Giảm sát thương mạnh)
        if (strikeIndex >= 1) {
            target.addEffect("weakness", 60 + skillLevel * 10, {
                amplifier: 1, // Weakness II
                showParticles: false 
            });
        }
    }
    
    // Hiệu ứng đặc biệt cho lightning đầu tiên
    if (strikeIndex === 0) {
        target.addEffect("glowing", 100 + skillLevel * 20, { 
            amplifier: 0, 
            showParticles: true 
        });
        
        // Particles cảnh báo
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i;
            const particleLoc = {
                x: target.location.x + Math.cos(angle) * 1.5,
                y: target.location.y + 1,
                z: target.location.z + Math.sin(angle) * 1.5
            };
            target.dimension.spawnParticle("minecraft:critical_hit_emitter", particleLoc);
        }
    }
}