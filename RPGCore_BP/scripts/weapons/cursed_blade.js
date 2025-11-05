import { world } from "@minecraft/server";
import { logError } from "../main.js"; // Import hàm logError từ file main

// --- CONFIG CHO HUYẾT KIẾM NGỀN RỦA ---
const CURSED_BLADE_CONFIG = {
  ITEM_ID: "dhh:cursed_blade",
  LIFESTEAL_PERCENTAGE: 0.15,
  MIN_HEAL: 0.5,
  MAX_HEAL: 4.0,
  PARTICLE_EFFECT: "minecraft:totem_particle",
  SOUND_EFFECT: "random.orb"
};

/**
 * Hàm này khởi tạo tất cả logic liên quan đến Huyết Kiếm.
 * Nó sẽ được gọi một lần từ file main.js.
 */
export function initializeCursedBladeLogic() {
  world.afterEvents.entityHurt.subscribe((event) => {
    const { hurtEntity, damageSource, damage } = event;

    const attacker = damageSource.damagingEntity;
    if (!attacker || attacker.typeId !== "minecraft:player") return;

    try {
      const player = attacker;
      const inventory = player.getComponent("inventory")?.container;
      if (!inventory) return;

      const heldItem = inventory.getItem(player.selectedSlotIndex);

      if (!heldItem || heldItem.typeId !== CURSED_BLADE_CONFIG.ITEM_ID) return;
      if (hurtEntity.typeId === "minecraft:player") return;

      let healthToHeal = damage * CURSED_BLADE_CONFIG.LIFESTEAL_PERCENTAGE;
      healthToHeal = Math.max(CURSED_BLADE_CONFIG.MIN_HEAL, healthToHeal);
      healthToHeal = Math.min(CURSED_BLADE_CONFIG.MAX_HEAL, healthToHeal);

      const healthComponent = player.getComponent("health");
      if (!healthComponent) return;

      const newHealth = Math.min(healthComponent.effectiveMax, healthComponent.currentValue + healthToHeal);
      healthComponent.setCurrentValue(newHealth);

      player.dimension.spawnParticle(CURSED_BLADE_CONFIG.PARTICLE_EFFECT, player.getHeadLocation());
      player.playSound(CURSED_BLADE_CONFIG.SOUND_EFFECT, { pitch: 1.5, volume: 0.5 });

    } catch (error) {
      logError("CursedBladeLifesteal", attacker, error);
    }
  });

  // console.log("§a[dhh System] Cursed Blade logic initialized!"); // Bỏ comment dòng này để test
}