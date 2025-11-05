// --- START OF FILE skills/heal.js ---

export function activateHeal(player, stats) {
    try {
        const skillLevel = stats.skills.heal ?? 1;
   
        
     

        // ===================================================================
        // === BƯỚC 1: HỒI MÁU CHO NGƯỜI THI TRIỂN ==========================
        // ===================================================================
        const healthComp = player.getComponent("health");
        if (!healthComp) return false;
  const maxHealth = healthComp.effectiveMax;

        // ===================================================================
        // === CÔNG THỨC HỒI MÁU MỚI (Dựa trên % HP tối đa) =================
        // ===================================================================
        // Hồi 15% HP tối đa ở cấp 1, mỗi cấp cộng thêm 2%
        const baseHealPercentage = 0.3;
        const bonusPercentagePerLevel = 0.08;
        const totalHealAmount = Math.floor(maxHealth * (baseHealPercentage + (skillLevel - 1) * bonusPercentagePerLevel));
           // Lượng máu hồi cho đồng đội (bằng 80% của người cast để cân bằng)
        const allyHealAmount = Math.floor(totalHealAmount * 0.8);
        
        // Bán kính của vùng hồi máu (tăng theo cấp kỹ năng)
        const radius = 10 + skillLevel; // Cấp 1: 4 khối, Cấp 9: 12 khối
        const actualHealed = Math.min(totalHealAmount, healthComp.effectiveMax - healthComp.currentValue);
        healthComp.setCurrentValue(healthComp.currentValue + actualHealed);
        
        // Thêm hiệu ứng Absorption (tim vàng) trong 10 giây
        const absorptionLevel = skillLevel - 1; 
        player.addEffect("absorption", 200, { amplifier: absorptionLevel, showParticles: false });
        
        player.sendMessage(`§aÁnh Sáng Thánh đã hồi cho bạn §e${Math.round(actualHealed)}§a máu!`);

        // ===================================================================
        // === BƯỚC 2: TẠO HIỆU ỨNG BÙNG NỔ TẠI VỊ TRÍ NGƯỜI CHƠI ========
        // ===================================================================
        // Tạo một cột sáng từ chân người chơi
        for(let i=0; i<15; i++) {
             player.dimension.spawnParticle("minecraft:totem_particle", { x: player.location.x, y: player.location.y + i*0.2, z: player.location.z });
        }
        // Âm thanh của Beacon nghe rất "thánh thiện"
        player.playSound("block.beacon.activate", { volume: 1.5, pitch: 1.2 });
        
        // ===================================================================
        // === BƯỚC 3: TÌM VÀ HỒI MÁU CHO ĐỒNG ĐỘI XUNG QUANH ===============
        // ===================================================================
        const nearbyAllies = player.dimension.getPlayers({
            location: player.location,
            maxDistance: radius,
            excludeNames: [player.nameTag] // Quan trọng: Loại trừ chính mình để không hồi máu 2 lần
        });
        
        let healedAlliesCount = 0;
        if (nearbyAllies.length > 0) {
            for (const ally of nearbyAllies) {
                const allyHealthComp = ally.getComponent("health");
                if (allyHealthComp) {
                    const allyActualHealed = Math.min(allyHealAmount, allyHealthComp.effectiveMax - allyHealthComp.currentValue);
                    allyHealthComp.setCurrentValue(allyHealthComp.currentValue + allyActualHealed);

                    // Hiệu ứng và âm thanh cho đồng đội biết họ được hồi máu
                    ally.dimension.spawnParticle("minecraft:heart_particle", ally.getHeadLocation());
                    ally.playSound("random.orb", { pitch: 1.5 });
                    
                    // Gửi tin nhắn cho họ
                    ally.sendMessage(`§aBạn được chữa lành bởi §e${player.nameTag}§a, hồi §e${Math.round(allyActualHealed)}§a máu!`);
                    healedAlliesCount++;
                }
            }
        }
        
        if (healedAlliesCount > 0) {
            player.sendMessage(`§aBạn cũng đã chữa lành cho §e${healedAlliesCount}§a đồng đội!`);
        }

        return true;
    } catch (e) {
        player.sendMessage("§cKhông thể thực hiện kỹ năng!");
        console.error("Heal skill failed: ", e.stack);
        return false;
    }
}