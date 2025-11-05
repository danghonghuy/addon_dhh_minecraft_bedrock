// --- START OF FILE skills/golem_punch.js ---

import { system, EntityDamageCause, BlockPermutation } from "@minecraft/server";
import { Vector } from "./vector.js";

// --- CẤP 1+: Các khối yếu nhất ---
const TIER_1_BLOCKS = [
  "minecraft:dirt",
  "minecraft:grass_block",
  "minecraft:sand",
  "minecraft:red_sand",
  "minecraft:gravel",
  "minecraft:clay",
  "minecraft:snow",
  "minecraft:snow_layer",
  "minecraft:farmland",
  "minecraft:mycelium",
  "minecraft:podzol",
  "minecraft:coarse_dirt",
  "minecraft:rooted_dirt",
  "minecraft:mud",
  "minecraft:soul_sand",
  "minecraft:soul_soil",
  "minecraft:oak_leaves",
  "minecraft:spruce_leaves",
  "minecraft:birch_leaves",
  "minecraft:jungle_leaves",
  "minecraft:acacia_leaves",
  "minecraft:dark_oak_leaves",
  "minecraft:mangrove_leaves",
  "minecraft:cherry_leaves",
  "minecraft:azalea_leaves",
  "minecraft:flowering_azalea_leaves",
  "minecraft:moss_block",
  "minecraft:moss_carpet",
  "minecraft:vine",
  "minecraft:hanging_roots",
  "minecraft:big_dripleaf",
  "minecraft:small_dripleaf",
  "minecraft:red_mushroom_block",
  "minecraft:brown_mushroom_block",
  "minecraft:mushroom_stem",
  "minecraft:hay_block",
  "minecraft:dried_kelp_block",
  "minecraft:sugar_cane",
  "minecraft:grass",
  "minecraft:tall_grass",
  "minecraft:fern",
  "minecraft:large_fern",
  "minecraft:dead_bush",
  "minecraft:dandelion",
  "minecraft:poppy",
  "minecraft:blue_orchid",
  "minecraft:allium",
  "minecraft:azure_bluet",
  "minecraft:red_tulip",
  "minecraft:orange_tulip",
  "minecraft:white_tulip",
  "minecraft:pink_tulip",
  "minecraft:oxeye_daisy",
  "minecraft:cornflower",
  "minecraft:lily_of_the_valley",
  "minecraft:wither_rose",
  "minecraft:sunflower",
  "minecraft:lilac",
  "minecraft:rose_bush",
  "minecraft:peony",
  "minecraft:glass",
  "minecraft:glass_pane",
  "minecraft:tinted_glass",
  "minecraft:white_stained_glass",
  "minecraft:orange_stained_glass",
  "minecraft:magenta_stained_glass",
  "minecraft:light_blue_stained_glass",
  "minecraft:yellow_stained_glass",
  "minecraft:lime_stained_glass",
  "minecraft:pink_stained_glass",
  "minecraft:gray_stained_glass",
  "minecraft:light_gray_stained_glass",
  "minecraft:cyan_stained_glass",
  "minecraft:purple_stained_glass",
  "minecraft:blue_stained_glass",
  "minecraft:brown_stained_glass",
  "minecraft:green_stained_glass",
  "minecraft:red_stained_glass",
  "minecraft:black_stained_glass",
  "minecraft:white_stained_glass_pane",
  "minecraft:orange_stained_glass_pane",
  "minecraft:magenta_stained_glass_pane",
  "minecraft:light_blue_stained_glass_pane",
  "minecraft:yellow_stained_glass_pane",
  "minecraft:lime_stained_glass_pane",
  "minecraft:pink_stained_glass_pane",
  "minecraft:gray_stained_glass_pane",
  "minecraft:light_gray_stained_glass_pane",
  "minecraft:cyan_stained_glass_pane",
  "minecraft:purple_stained_glass_pane",
  "minecraft:blue_stained_glass_pane",
  "minecraft:brown_stained_glass_pane",
  "minecraft:green_stained_glass_pane",
  "minecraft:red_stained_glass_pane",
  "minecraft:black_stained_glass_pane",
  "minecraft:ice",
  "minecraft:frosted_ice",
  "minecraft:white_concrete_powder",
  "minecraft:orange_concrete_powder",
  "minecraft:magenta_concrete_powder",
  "minecraft:light_blue_concrete_powder",
  "minecraft:yellow_concrete_powder",
  "minecraft:lime_concrete_powder",
  "minecraft:pink_concrete_powder",
  "minecraft:gray_concrete_powder",
  "minecraft:light_gray_concrete_powder",
  "minecraft:cyan_concrete_powder",
  "minecraft:purple_concrete_powder",
  "minecraft:blue_concrete_powder",
  "minecraft:brown_concrete_powder",
  "minecraft:green_concrete_powder",
  "minecraft:red_concrete_powder",
  "minecraft:black_concrete_powder",
  "minecraft:pumpkin",
  "minecraft:carved_pumpkin",
  "minecraft:jack_o_lantern",
  "minecraft:melon",
  "minecraft:cocoa",
  "minecraft:wheat",
  "minecraft:carrots",
  "minecraft:potatoes",
  "minecraft:beetroots",
  "minecraft:cobweb",
  "minecraft:slime_block",
  "minecraft:honey_block",
  "minecraft:scaffolding",
];
const TIER_2_BLOCKS = [
  "minecraft:stone",
  "minecraft:cobblestone",
  "minecraft:mossy_cobblestone",
  "minecraft:diorite",
  "minecraft:andesite",
  "minecraft:granite",
  "minecraft:deepslate",
  "minecraft:cobbled_deepslate",
  "minecraft:tuff",
  "minecraft:sandstone",
  "minecraft:netherrack",
  "minecraft:blackstone",
  "minecraft:basalt",
];
const TIER_3_BLOCKS = [
  "minecraft:coal_ore",
  "minecraft:iron_ore",
  "minecraft:copper_ore",
  "minecraft:deepslate_coal_ore",
  "minecraft:deepslate_iron_ore",
  "minecraft:deepslate_copper_ore",
  "minecraft:nether_quartz_ore",
];
const TIER_4_BLOCKS = [
  "minecraft:gold_ore",
  "minecraft:lapis_ore",
  "minecraft:redstone_ore",
  "minecraft:deepslate_gold_ore",
  "minecraft:deepslate_lapis_ore",
  "minecraft:deepslate_redstone_ore",
  "minecraft:nether_gold_ore",
  "minecraft:end_stone",
  "minecraft:gilded_blackstone",
];
const TIER_5_BLOCKS = [
  "minecraft:diamond_ore",
  "minecraft:emerald_ore",
  "minecraft:deepslate_diamond_ore",
  "minecraft:deepslate_emerald_ore",
  "minecraft:obsidian",
  "minecraft:crying_obsidian",
  "minecraft:ancient_debris",
];

export function activateGolemPunch(player, stats) {
  try {
    const skillLevel = stats.skills.golem_punch ?? 1;

    player.addEffect("slowness", 6, { amplifier: 7, showParticles: false });
    player.playSound("mob.irongolem.repair");
    for (let i = 0; i < 25; i++) {
      const offsetX = Math.random() * 2 - 1;
      const offsetZ = Math.random() * 2 - 1;
      const particleLoc = {
        x: player.location.x + offsetX,
        y: player.location.y,
        z: player.location.z + offsetZ,
      };
      player.dimension.spawnParticle(
        "minecraft:basic_smoke_particle",
        particleLoc
      );
    }

    system.runTimeout(() => {
      if (!player.isValid) return;

      const dashDistance = 4 + skillLevel * 1.5;
      const viewDirection = player.getViewDirection();
      let powerMultiplier = 1.0;
      if (Math.abs(viewDirection.y) > 0.5) {
        // Tương đương > 30 độ
        powerMultiplier = 0.5;
      }
      const impulse = Vector.multiply(
        viewDirection,
        dashDistance * 0.8 * powerMultiplier
      );
      player.applyImpulse(impulse);
      player.playSound("mob.irongolem.throw");

      player.addEffect("slow_falling", 300 + skillLevel * 100, {
        amplifier: 0,
        showParticles: false,
      });

      system.runTimeout(() => {
        if (!player.isValid) return;

        const impactLocation = player.location;
        const damage = 10 + skillLevel * 9;
        const radius = 5 + skillLevel*2;
        const knockbackStrength = 1.5 + skillLevel * 1;
        const verticalStrength = 1;

        // --- TẠO HIỆU ỨNG HÌNH ẢNH & ÂM THANH NÂNG CAO ---
        // Số lượng hạt nổ tăng theo cấp
        const particleCount = 3 + Math.floor(skillLevel / 2); // Cấp 1 có 3 hạt, cấp 9 có 7 hạt
        for (let i = 0; i < particleCount; i++) {
          player.dimension.spawnParticle(
            "minecraft:huge_explosion_emitter",
            impactLocation
          );
        }

        // Dùng dimension.playSound để mọi người cùng nghe thấy, với âm thanh trầm và to hơn
        player.dimension.playSound("random.explode", impactLocation, {
          volume: 1.5,
          pitch: 0.7,
        });

        const targetsInRadius = player.dimension.getEntities({
          location: impactLocation,
          maxDistance: radius,
          excludeFamilies: ["player"],
          excludeTags: ["dhh_spirit_beast"],
        });
        let hitCount = 0;
        if (targetsInRadius.length > 0) {
          for (const target of targetsInRadius) {
            let knockbackVector = Vector.subtract(
              target.location,
              impactLocation
            );
            knockbackVector = Vector.normalize(knockbackVector);
            knockbackVector = Vector.multiply(
              knockbackVector,
              knockbackStrength
            );
            knockbackVector.y += verticalStrength;

            target.applyImpulse(knockbackVector);
            target.addTag(`golem_punch_victim:${player.nameTag}`);
            target.applyDamage(damage, {
              causingEntity: player,
              cause: EntityDamageCause.entityAttack,
            });
            target.addEffect("slowness", 80, {
              amplifier: 2,
              showParticles: false,
            });
            player.dimension.spawnParticle(
              "minecraft:critical_hit_emitter",
              target.getHeadLocation()
            );
            hitCount++;
          }
          if (hitCount > 0) {
            player.sendMessage(
              `§c§lCÚ ĐẤM GOLEM§r§f đã nghiền nát §e${hitCount}§f mục tiêu!`
            );
          }
        }

        let breakableBlocks = [...TIER_1_BLOCKS];
        if (skillLevel >= 3)
          breakableBlocks = breakableBlocks.concat(TIER_2_BLOCKS);
        if (skillLevel >= 5)
          breakableBlocks = breakableBlocks.concat(TIER_3_BLOCKS);
        if (skillLevel >= 7)
          breakableBlocks = breakableBlocks.concat(TIER_4_BLOCKS);
        if (skillLevel >= 9)
          breakableBlocks = breakableBlocks.concat(TIER_5_BLOCKS);

        const airPermutation = BlockPermutation.resolve("minecraft:air");
        const blockRadius = Math.floor(radius / 2);
        for (let x = -blockRadius; x <= blockRadius; x++) {
          for (let y = -blockRadius; y <= blockRadius; y++) {
            for (let z = -blockRadius; z <= blockRadius; z++) {
              if (x * x + y * y + z * z > blockRadius * blockRadius) continue;
              const blockLocation = {
                x: Math.floor(impactLocation.x + x),
                y: Math.floor(impactLocation.y + y),
                z: Math.floor(impactLocation.z + z),
              };
              const block = player.dimension.getBlock(blockLocation);
              if (block && breakableBlocks.includes(block.typeId)) {
                player.dimension.setBlockPermutation(
                  blockLocation,
                  airPermutation
                );
                player.dimension.spawnParticle(
                  `minecraft:block_destruct?${block.typeId}`,
                  blockLocation
                );
              }
            }
          }
        }
      }, 4);
    }, 6);

    return true;
  } catch (e) {
    player.sendMessage("§cKhông thể thực hiện kỹ năng!");
    console.error("Golem Punch skill failed: ", e.stack);
    return false;
  }
}
