import { ItemStack } from "@minecraft/server"; // Thêm dòng này để dùng trong rewards

export const CONFIG = {
  DEBUG_MODE: false,
  XP_SOURCES: {
    BLOCK_BREAKS: {
      // ===================================================================
      // === ĐẤT, ĐÁ & CÁT CƠ BẢN (Giá trị gốc) ===
      // ===================================================================
      "minecraft:dirt": 0.1,
      "minecraft:grass_block": 0.1,
      "minecraft:podzol": 0.15,
      "minecraft:mycelium": 0.2,
      "minecraft:path": 0.1,
      "minecraft:farmland": 0.1,
      "minecraft:coarse_dirt": 0.1,
      "minecraft:rooted_dirt": 0.15,
      "minecraft:mud": 0.2,
      "minecraft:muddy_mangrove_roots": 0.25,
      "minecraft:sand": 0.1,
      "minecraft:red_sand": 0.15,
      "minecraft:suspicious_sand": 1.5,
      "minecraft:gravel": 0.1,
      "minecraft:suspicious_gravel": 1.5,
      "minecraft:clay": 0.5,
      "minecraft:terracotta": 0.1, // Chế tạo từ clay
      "minecraft:white_terracotta": 0.1,
      "minecraft:orange_terracotta": 0.1,
      "minecraft:magenta_terracotta": 0.1,
      "minecraft:light_blue_terracotta": 0.1,
      "minecraft:yellow_terracotta": 0.1,
      "minecraft:lime_terracotta": 0.1,
      "minecraft:pink_terracotta": 0.1,
      "minecraft:gray_terracotta": 0.1,
      "minecraft:light_gray_terracotta": 0.1,
      "minecraft:cyan_terracotta": 0.1,
      "minecraft:purple_terracotta": 0.1,
      "minecraft:blue_terracotta": 0.1,
      "minecraft:brown_terracotta": 0.1,
      "minecraft:green_terracotta": 0.1,
      "minecraft:red_terracotta": 0.1,
      "minecraft:black_terracotta": 0.1,
      "minecraft:stone": 0.2,
      "minecraft:cobblestone": 0.2,
      "minecraft:mossy_cobblestone": 0.25,
      "minecraft:andesite": 0.2,
      "minecraft:diorite": 0.2,
      "minecraft:granite": 0.2,
      "minecraft:deepslate": 0.3,
      "minecraft:cobbled_deepslate": 0.3,
      "minecraft:tuff": 0.25,
      "minecraft:calcite": 0.3,
      "minecraft:dripstone_block": 0.4,
      "minecraft:pointed_dripstone": 0.2,
      "minecraft:smooth_basalt": 0.1, // Chế tạo
      "minecraft:amethyst_block": 0.1, // Chế tạo
      "minecraft:budding_amethyst": 0,
      "minecraft:small_amethyst_bud": 2,
      "minecraft:medium_amethyst_bud": 4,
      "minecraft:large_amethyst_bud": 8,
      "minecraft:amethyst_cluster": 15,

      // CÂN BẰNG: TẤT CẢ KHỐI CHẾ TẠO TRANG TRÍ ĐỀU LÀ 0.1 XP
      "minecraft:polished_andesite": 0.1,
      "minecraft:polished_diorite": 0.1,
      "minecraft:polished_granite": 0.1,
      "minecraft:polished_deepslate": 0.1,
      "minecraft:deepslate_bricks": 0.1,
      "minecraft:cracked_deepslate_bricks": 0.1,
      "minecraft:deepslate_tiles": 0.1,
      "minecraft:cracked_deepslate_tiles": 0.1,
      "minecraft:chiseled_deepslate": 0.1,
      "minecraft:tuff_bricks": 0.1,
      "minecraft:chiseled_tuff": 0.1,
      "minecraft:polished_tuff": 0.1,
      "minecraft:tuff_slab": 0.1,
      "minecraft:tuff_stairs": 0.1,
      "minecraft:tuff_wall": 0.1,

      // ===================================================================
      // === GỖ & THỰC VẬT TỰ NHIÊN (Logs: 1, Stems: 1.2, Chế tạo: 0.1) ===
      // ===================================================================
      "minecraft:oak_log": 1,
      "minecraft:oak_wood": 0.1,
      "minecraft:stripped_oak_log": 0.1,
      "minecraft:stripped_oak_wood": 0.1,
      "minecraft:spruce_log": 1,
      "minecraft:spruce_wood": 0.1,
      "minecraft:stripped_spruce_log": 0.1,
      "minecraft:stripped_spruce_wood": 0.1,
      "minecraft:birch_log": 1,
      "minecraft:birch_wood": 0.1,
      "minecraft:stripped_birch_log": 0.1,
      "minecraft:stripped_birch_wood": 0.1,
      "minecraft:jungle_log": 1,
      "minecraft:jungle_wood": 0.1,
      "minecraft:stripped_jungle_log": 0.1,
      "minecraft:stripped_jungle_wood": 0.1,
      "minecraft:acacia_log": 1,
      "minecraft:acacia_wood": 0.1,
      "minecraft:stripped_acacia_log": 0.1,
      "minecraft:stripped_acacia_wood": 0.1,
      "minecraft:dark_oak_log": 1,
      "minecraft:dark_oak_wood": 0.1,
      "minecraft:stripped_dark_oak_log": 0.1,
      "minecraft:stripped_dark_oak_wood": 0.1,
      "minecraft:mangrove_log": 1,
      "minecraft:mangrove_wood": 0.1,
      "minecraft:stripped_mangrove_log": 0.1,
      "minecraft:stripped_mangrove_wood": 0.1,
      "minecraft:mangrove_roots": 0.4,
      "minecraft:cherry_log": 1,
      "minecraft:cherry_wood": 0.1,
      "minecraft:stripped_cherry_log": 0.1,
      "minecraft:stripped_cherry_wood": 0.1,
      "minecraft:crimson_stem": 1.2,
      "minecraft:crimson_hyphae": 0.1,
      "minecraft:stripped_crimson_stem": 0.1,
      "minecraft:stripped_crimson_hyphae": 0.1,
      "minecraft:warped_stem": 1.2,
      "minecraft:warped_hyphae": 0.1,
      "minecraft:stripped_warped_stem": 0.1,
      "minecraft:stripped_warped_hyphae": 0.1,

      // Các khối thực vật còn lại
      "minecraft:oak_leaves": 0.1,
      "minecraft:spruce_leaves": 0.1,
      "minecraft:birch_leaves": 0.1,
      "minecraft:jungle_leaves": 0.1,
      "minecraft:acacia_leaves": 0.1,
      "minecraft:dark_oak_leaves": 0.1,
      "minecraft:mangrove_leaves": 0.1,
      "minecraft:cherry_leaves": 0.1,
      "minecraft:azalea_leaves": 0.15,
      "minecraft:flowering_azalea_leaves": 0.2,
      "minecraft:brown_mushroom_block": 0.6,
      "minecraft:red_mushroom_block": 0.6,
      "minecraft:mushroom_stem": 0.5,
      "minecraft:shroomlight": 1.2,
      "minecraft:nether_wart_block": 0.1,
      "minecraft:warped_wart_block": 0.1,
      "minecraft:moss_block": 0.2,
      "minecraft:moss_carpet": 0.1,
      "minecraft:vine": 0.1,
      "minecraft:glow_lichen": 0.15,
      "minecraft:sculk_vein": 0.5,
      "minecraft:hanging_roots": 0.1,
      "minecraft:spore_blossom": 1.5,
      "minecraft:big_dripleaf": 0.4,
      "minecraft:small_dripleaf": 0.2,

      // ===================================================================
      // === CÂY TRỒNG & NÔNG SẢN (Thu hoạch: Tăng, Chế tạo: 0.1) ===
      // ===================================================================
      "minecraft:wheat": 1.5,
      "minecraft:carrots": 1.5,
      "minecraft:potatoes": 1.5,
      "minecraft:beetroots": 1.5,
      "minecraft:sweet_berries": 0.6,
      "minecraft:glow_berries": 0.8,
      "minecraft:bamboo": 0.3,
      "minecraft:sugar_cane": 0.5,
      "minecraft:cactus": 0.5,
      "minecraft:cocoa": 2,
      "minecraft:melon": 3,
      "minecraft:pumpkin": 3,
      "minecraft:carved_pumpkin": 0.1,
      "minecraft:jack_o_lantern": 0.1,
      "minecraft:hay_block": 0.1,
      "minecraft:dried_kelp_block": 0.1,
      "minecraft:kelp": 0.2,
      "minecraft:sea_pickle": 0.4,
      "minecraft:nether_wart": 2.5,
      "minecraft:pitcher_plant": 1.0,
      "minecraft:torchflower": 0.8,

      // ===================================================================
      // === KHOÁNG SẢN (Quặng: Tăng, Khối chế tạo: 0.1) ===
      // ===================================================================
      "minecraft:coal_ore": 3,
      "minecraft:deepslate_coal_ore": 4,
      "minecraft:copper_ore": 4,
      "minecraft:deepslate_copper_ore": 5,
      "minecraft:raw_copper_block": 0.1,
      "minecraft:copper_block": 0.1,
      "minecraft:exposed_copper": 0.1,
      "minecraft:weathered_copper": 0.1,
      "minecraft:oxidized_copper": 0.1,
      "minecraft:waxed_copper_block": 0.1,
      "minecraft:waxed_exposed_copper": 0.1,
      "minecraft:waxed_weathered_copper": 0.1,
      "minecraft:waxed_oxidized_copper": 0.1,
      "minecraft:cut_copper": 0.1,
      "minecraft:exposed_cut_copper": 0.1,
      "minecraft:weathered_cut_copper": 0.1,
      "minecraft:oxidized_cut_copper": 0.1,
      "minecraft:iron_ore": 6,
      "minecraft:deepslate_iron_ore": 8,
      "minecraft:raw_iron_block": 0.1,
      "minecraft:iron_block": 0.1,
      "minecraft:nether_quartz_ore": 5,
      "minecraft:nether_gold_ore": 7,
      "minecraft:gilded_blackstone": 8,
      "minecraft:lit_redstone_ore": 7,
      "minecraft:lit_deepslate_redstone_ore": 9,
      "minecraft:redstone_block": 0.1,
      "minecraft:lapis_ore": 8,
      "minecraft:deepslate_lapis_ore": 10,
      "minecraft:lapis_block": 0.1,
      "minecraft:gold_ore": 12,
      "minecraft:deepslate_gold_ore": 15,
      "minecraft:raw_gold_block": 0.1,
      "minecraft:gold_block": 0.1,
      "minecraft:diamond_ore": 25,
      "minecraft:deepslate_diamond_ore": 30,
      "minecraft:diamond_block": 0.1,
      "minecraft:emerald_ore": 35,
      "minecraft:deepslate_emerald_ore": 40,
      "minecraft:emerald_block": 0.1,
      "minecraft:ancient_debris": 100,
      "minecraft:netherite_block": 0.1,

      // ===================================================================
      // === CÁC KHỐI KHÁC ===
      // ===================================================================
      "minecraft:netherrack": 0.2,
      "minecraft:soul_sand": 0.5,
      "minecraft:soul_soil": 0.5,
      "minecraft:glowstone": 3,
      "minecraft:magma_block": 1,
      "minecraft:blackstone": 0.4,
      "minecraft:basalt": 0.4,
      "minecraft:bone_block": 0.1, // Chế tạo
      "minecraft:crying_obsidian": 12,
      "minecraft:respawn_anchor": 0.1, // Chế tạo
      "minecraft:lodestone": 0.1, // Chế tạo
      "minecraft:end_stone": 0.8,
      "minecraft:chorus_flower": 3,
      "minecraft:chorus_plant": 1.2,
      "minecraft:dragon_egg": 5000,
      "minecraft:prismarine": 4,
      "minecraft:dark_prismarine": 4,
      "minecraft:sea_lantern": 5,
      "minecraft:sponge": 20,
      "minecraft:wet_sponge": 20,
      "minecraft:obsidian": 8,
      "minecraft:sculk": 1,
      "minecraft:sculk_catalyst": 30,
      "minecraft:sculk_sensor": 20,
      "minecraft:calibrated_sculk_sensor": 0.1,
      "minecraft:sculk_shrieker": 40,
      "minecraft:spawner": 150,
      "minecraft:bee_nest": 15,
      "minecraft:beehive": 0.1,
      "minecraft:slime_block": 0.1,
      "minecraft:honey_block": 0.1,
      "minecraft:enchanting_table": 0.1,
      "minecraft:anvil": 0.1,
      "minecraft:chipped_anvil": 0.1,
      "minecraft:damaged_anvil": 0.1,
      "minecraft:beacon": 0.1,
      "minecraft:conduit": 0.1,

      // === CÁC KHỐI CÒN LẠI ===
      "minecraft:polished_blackstone": 0.1,
      "minecraft:polished_blackstone_bricks": 0.1,
      "minecraft:cracked_polished_blackstone_bricks": 0.1,
      "minecraft:chiseled_polished_blackstone": 0.1,
      "minecraft:polished_basalt": 0.1,
      "minecraft:nether_bricks": 0.1,
      "minecraft:cracked_nether_bricks": 0.1,
      "minecraft:chiseled_nether_bricks": 0.1,
      "minecraft:red_nether_bricks": 0.1,
      "minecraft:quartz_block": 0.1,
      "minecraft:quartz_pillar": 0.1,
      "minecraft:chiseled_quartz_block": 0.1,
      "minecraft:smooth_quartz": 0.1,
      "minecraft:end_stone_bricks": 0.1,
      "minecraft:purpur_block": 0.1,
      "minecraft:purpur_pillar": 0.1,

      "minecraft:brain_coral": 2,
      "minecraft:bubble_coral": 2,
      "minecraft:fire_coral": 2,
      "minecraft:horn_coral": 2,
      "minecraft:tube_coral": 2,
      "minecraft:brain_coral_block": 0.1,
      "minecraft:bubble_coral_block": 0.1,
      "minecraft:fire_coral_block": 0.1,
      "minecraft:horn_coral_block": 0.1,
      "minecraft:tube_coral_block": 0.1,
      "minecraft:dead_brain_coral": 1,
      "minecraft:dead_bubble_coral": 1,
      "minecraft:dead_fire_coral": 1,
      "minecraft:dead_horn_coral": 1,
      "minecraft:dead_tube_coral": 1,
      "minecraft:dead_brain_coral_block": 0.1,
      "minecraft:dead_bubble_coral_block": 0.1,
      "minecraft:dead_fire_coral_block": 0.1,
      "minecraft:dead_horn_coral_block": 0.1,
      "minecraft:dead_tube_coral_block": 0.1,

      "minecraft:tnt": 0.1,
      "minecraft:bookshelf": 0.1,
      "minecraft:chiseled_bookshelf": 0.1,
      "minecraft:enchanting_table": 0.1,
      "minecraft:anvil": 0.1,
      "minecraft:chipped_anvil": 0.1,
      "minecraft:damaged_anvil": 0.1,
      "minecraft:beacon": 0.1,
      "minecraft:conduit": 0.1,
      "minecraft:recovery_compass": 0.1,

      "minecraft:bricks": 0.1,
      "minecraft:stone_bricks": 0.1,
      "minecraft:mossy_stone_bricks": 0.1,
      "minecraft:cracked_stone_bricks": 0.1,
      "minecraft:chiseled_stone_bricks": 0.1,
      "minecraft:smooth_stone": 0.1,
      "minecraft:cobblestone_wall": 0.1,
      "minecraft:mossy_cobblestone_wall": 0.1,
      "minecraft:brick_wall": 0.1,
      "minecraft:stone_brick_wall": 0.1,
      "minecraft:mossy_stone_brick_wall": 0.1,
      "minecraft:granite_wall": 0.1,
      "minecraft:diorite_wall": 0.1,
      "minecraft:andesite_wall": 0.1,
      "minecraft:cobbled_deepslate_wall": 0.1,
      "minecraft:polished_deepslate_wall": 0.1,
      "minecraft:deepslate_brick_wall": 0.1,
      "minecraft:deepslate_tile_wall": 0.1,
      "minecraft:blackstone_wall": 0.1,
      "minecraft:polished_blackstone_wall": 0.1,
      "minecraft:polished_blackstone_brick_wall": 0.1,
      "minecraft:nether_brick_wall": 0.1,
      "minecraft:red_nether_brick_wall": 0.1,
      "minecraft:sandstone_wall": 0.1,
      "minecraft:red_sandstone_wall": 0.1,
      "minecraft:end_stone_brick_wall": 0.1,
      "minecraft:prismarine_wall": 0.1,
      "minecraft:sandstone": 0.1,
      "minecraft:chiseled_sandstone": 0.1,
      "minecraft:cut_sandstone": 0.1,
      "minecraft:smooth_sandstone": 0.1,
      "minecraft:red_sandstone": 0.1,
      "minecraft:chiseled_red_sandstone": 0.1,
      "minecraft:cut_red_sandstone": 0.1,
      "minecraft:smooth_red_sandstone": 0.1,

      "minecraft:white_wool": 0.1,
      "minecraft:orange_wool": 0.1,
      "minecraft:magenta_wool": 0.1,
      "minecraft:light_blue_wool": 0.1,
      "minecraft:yellow_wool": 0.1,
      "minecraft:lime_wool": 0.1,
      "minecraft:pink_wool": 0.1,
      "minecraft:gray_wool": 0.1,
      "minecraft:light_gray_wool": 0.1,
      "minecraft:cyan_wool": 0.1,
      "minecraft:purple_wool": 0.1,
      "minecraft:blue_wool": 0.1,
      "minecraft:brown_wool": 0.1,
      "minecraft:green_wool": 0.1,
      "minecraft:red_wool": 0.1,
      "minecraft:black_wool": 0.1,
      "minecraft:white_carpet": 0.1,
      "minecraft:orange_carpet": 0.1,
      "minecraft:magenta_carpet": 0.1,
      "minecraft:light_blue_carpet": 0.1,
      "minecraft:yellow_carpet": 0.1,
      "minecraft:lime_carpet": 0.1,
      "minecraft:pink_carpet": 0.1,
      "minecraft:gray_carpet": 0.1,
      "minecraft:light_gray_carpet": 0.1,
      "minecraft:cyan_carpet": 0.1,
      "minecraft:purple_carpet": 0.1,
      "minecraft:blue_carpet": 0.1,
      "minecraft:brown_carpet": 0.1,
      "minecraft:green_carpet": 0.1,
      "minecraft:red_carpet": 0.1,
      "minecraft:black_carpet": 0.1,
      "minecraft:white_concrete": 0.1,
      "minecraft:orange_concrete": 0.1,
      "minecraft:magenta_concrete": 0.1,
      "minecraft:light_blue_concrete": 0.1,
      "minecraft:yellow_concrete": 0.1,
      "minecraft:lime_concrete": 0.1,
      "minecraft:pink_concrete": 0.1,
      "minecraft:gray_concrete": 0.1,
      "minecraft:light_gray_concrete": 0.1,
      "minecraft:cyan_concrete": 0.1,
      "minecraft:purple_concrete": 0.1,
      "minecraft:blue_concrete": 0.1,
      "minecraft:brown_concrete": 0.1,
      "minecraft:green_concrete": 0.1,
      "minecraft:red_concrete": 0.1,
      "minecraft:black_concrete": 0.1,

      "minecraft:glass": 0.1,
      "minecraft:tinted_glass": 0.1,
      "minecraft:white_stained_glass": 0.1,
      "minecraft:orange_stained_glass": 0.1,
      "minecraft:magenta_stained_glass": 0.1,
      "minecraft:light_blue_stained_glass": 0.1,
      "minecraft:yellow_stained_glass": 0.1,
      "minecraft:lime_stained_glass": 0.1,
      "minecraft:pink_stained_glass": 0.1,
      "minecraft:gray_stained_glass": 0.1,
      "minecraft:light_gray_stained_glass": 0.1,
      "minecraft:cyan_stained_glass": 0.1,
      "minecraft:purple_stained_glass": 0.1,
      "minecraft:blue_stained_glass": 0.1,
      "minecraft:brown_stained_glass": 0.1,
      "minecraft:green_stained_glass": 0.1,
      "minecraft:red_stained_glass": 0.1,
      "minecraft:black_stained_glass": 0.1,

      "minecraft:heavy_core": 50000000,
      "minecraft:copper_bulb": 0.1,
      "minecraft:exposed_copper_bulb": 0.1,
      "minecraft:weathered_copper_bulb": 0.1,
      "minecraft:oxidized_copper_bulb": 0.1,
      "minecraft:waxed_copper_bulb": 0.1,
      "minecraft:waxed_exposed_copper_bulb": 0.1,
      "minecraft:waxed_weathered_copper_bulb": 0.1,
      "minecraft:waxed_oxidized_copper_bulb": 0.1,
      "minecraft:copper_grate": 0.1,
      "minecraft:exposed_copper_grate": 0.1,
      "minecraft:weathered_copper_grate": 0.1,
      "minecraft:oxidized_copper_grate": 0.1,
      "minecraft:waxed_copper_grate": 0.1,
      "minecraft:waxed_exposed_copper_grate": 0.1,
      "minecraft:waxed_weathered_copper_grate": 0.1,
      "minecraft:waxed_oxidized_copper_grate": 0.1,
      "minecraft:copper_door": 0.1,
      "minecraft:exposed_copper_door": 0.1,
      "minecraft:weathered_copper_door": 0.1,
      "minecraft:oxidized_copper_door": 0.1,
      "minecraft:waxed_copper_door": 0.1,
      "minecraft:waxed_exposed_copper_door": 0.1,
      "minecraft:waxed_weathered_copper_door": 0.1,
      "minecraft:waxed_oxidized_copper_door": 0.1,
      "minecraft:copper_trapdoor": 0.1,
      "minecraft:exposed_copper_trapdoor": 0.1,
      "minecraft:weathered_copper_trapdoor": 0.1,
      "minecraft:oxidized_copper_trapdoor": 0.1,
      "minecraft:waxed_copper_trapdoor": 0.1,
      "minecraft:waxed_exposed_copper_trapdoor": 0.1,
      "minecraft:waxed_weathered_copper_trapdoor": 0.1,
      "minecraft:waxed_oxidized_copper_trapdoor": 0.1,
      "minecraft:chiseled_copper": 0.1,
      "minecraft:exposed_chiseled_copper": 0.1,
      "minecraft:weathered_chiseled_copper": 0.1,
      "minecraft:oxidized_chiseled_copper": 0.1,
      "minecraft:waxed_chiseled_copper": 0.1,
      "minecraft:waxed_exposed_chiseled_copper": 0.1,
      "minecraft:waxed_weathered_chiseled_copper": 0.1,
      "minecraft:waxed_oxidized_chiseled_copper": 0.1,
      "minecraft:polished_tuff_slab": 0.1,
      "minecraft:polished_tuff_stairs": 0.1,
      "minecraft:polished_tuff_wall": 0.1,
      "minecraft:tuff_brick_slab": 0.1,
      "minecraft:tuff_brick_stairs": 0.1,
      "minecraft:tuff_brick_wall": 0.1,
      "minecraft:chiseled_tuff_bricks": 0.1,
      "minecraft:pale_oak_planks": 0.1,
      "minecraft:pale_oak_slab": 0.1,
      "minecraft:pale_oak_stairs": 0.1,
      "minecraft:pale_oak_fence": 0.1,
      "minecraft:pale_oak_fence_gate": 0.1,
      "minecraft:pale_oak_door": 0.1,
      "minecraft:pale_oak_trapdoor": 0.1,
      "minecraft:pale_oak_pressure_plate": 0.1,
      "minecraft:pale_oak_button": 0.1,
      "minecraft:pale_oak_sign": 0.1,
      "minecraft:pale_oak_hanging_sign": 0.1,

      "minecraft:resin_block": 0.1,
      "minecraft:resin_bricks": 0.1,
      "minecraft:chiseled_resin_bricks": 0.1,
      "minecraft:snow_block": 0.1,
      "minecraft:powder_snow": 1.2,

      "minecraft:redstone_lamp": 0.1,
      "minecraft:daylight_detector": 0.1,
      "minecraft:tripwire_hook": 0.1,
      "minecraft:piston": 0.1,
      "minecraft:sticky_piston": 0.1,
      "minecraft:observer": 0.1,
      "minecraft:dispenser": 0.1,
      "minecraft:dropper": 0.1,
      "minecraft:hopper": 0.1,
      "minecraft:shulker_box": 0.1,
      "minecraft:white_shulker_box": 0.1,
      "minecraft:orange_shulker_box": 0.1,
      "minecraft:magenta_shulker_box": 0.1,
      "minecraft:light_blue_shulker_box": 0.1,
      "minecraft:yellow_shulker_box": 0.1,
      "minecraft:lime_shulker_box": 0.1,
      "minecraft:pink_shulker_box": 0.1,
      "minecraft:gray_shulker_box": 0.1,
      "minecraft:light_gray_shulker_box": 0.1,
      "minecraft:cyan_shulker_box": 0.1,
      "minecraft:purple_shulker_box": 0.1,
      "minecraft:blue_shulker_box": 0.1,
      "minecraft:brown_shulker_box": 0.1,
      "minecraft:green_shulker_box": 0.1,
      "minecraft:red_shulker_box": 0.1,
      "minecraft:black_shulker_box": 0.1,
      "minecraft:barrel": 0.1,
      "minecraft:furnace": 0.1,
      "minecraft:blast_furnace": 0.1,
      "minecraft:smoker": 0.1,
      "minecraft:brewing_stand": 0.1,
      "minecraft:cauldron": 0.1,
      "minecraft:composter": 0.1,
      "minecraft:lectern": 0.1,
      "minecraft:cartography_table": 0.1,
      "minecraft:fletching_table": 0.1,
      "minecraft:smithing_table": 0.1,
      "minecraft:grindstone": 0.1,
      "minecraft:stonecutter": 0.1,
      "minecraft:loom": 0.1,
      "minecraft:note_block": 0.1,
      "minecraft:jukebox": 0.1,
      "minecraft:target": 0.1,
      "minecraft:lightning_rod": 0.1,
      "minecraft:chest": 0.1,
      "minecraft:trapped_chest": 0.1,
      "minecraft:ender_chest": 0.1,

      "minecraft:bed": 0.1,
      "minecraft:bell": 0.1,
      "minecraft:campfire": 0.1,
      "minecraft:soul_campfire": 0.1,
      "minecraft:lantern": 0.1,
      "minecraft:soul_lantern": 0.1,
      "minecraft:torch": 0.1,
      "minecraft:soul_torch": 0.1,
      "minecraft:redstone_torch": 0.1,
      "minecraft:end_rod": 0.1,
      "minecraft:chain": 0.1,
      "minecraft:ladder": 0.1,
      "minecraft:scaffolding": 0.1,

      "minecraft:flower_pot": 0.1,
      "minecraft:item_frame": 0,
      "minecraft:glow_item_frame": 0,
      "minecraft:painting": 0,
      "minecraft:armor_stand": 0,
      "minecraft:end_crystal": 0,

      "minecraft:wither_rose": 2.0,
      "minecraft:sunflower": 0.4,
      "minecraft:lilac": 0.4,
      "minecraft:rose_bush": 0.4,
      "minecraft:peony": 0.4,
      "minecraft:tall_grass": 0.1,
      "minecraft:large_fern": 0.15,
      "minecraft:dead_bush": 0.1,
      "minecraft:grass": 0.05,
      "minecraft:fern": 0.08,
      "minecraft:seagrass": 0.08,
      "minecraft:tall_seagrass": 0.12,
      "minecraft:lily_pad": 0.3,
      "minecraft:brown_mushroom": 0.4,
      "minecraft:red_mushroom": 0.4,
      "minecraft:crimson_fungus": 0.6,
      "minecraft:warped_fungus": 0.6,
      "minecraft:crimson_roots": 0.2,
      "minecraft:warped_roots": 0.2,
      "minecraft:nether_sprouts": 0.15,
      "minecraft:weeping_vines": 0.2,
      "minecraft:twisting_vines": 0.2,
      "minecraft:cave_vines": 0.3,
      "minecraft:pale_oak_log": 1,
      "minecraft:pale_oak_wood": 0.1,
      "minecraft:stripped_pale_oak_log": 0.1,
      "minecraft:stripped_pale_oak_wood": 0.1,
      "minecraft:pale_oak_leaves": 0.1,
      "minecraft:pale_oak_sapling": 0.1,
      "minecraft:pale_hanging_moss": 0.1,
      "minecraft:creaking_heart": 5, // block đặc biệt
      "minecraft:resin_clump": 0.5,
      "minecraft:resin_block": 0.1,
      "minecraft:resin_bricks": 0.1,
      "minecraft:chiseled_resin_bricks": 0.1,
      "minecraft:resin_brick_slab": 0.1,
      "minecraft:resin_brick_stairs": 0.1,
      "minecraft:resin_wall": 0.1,
    },

    MOB_KILLS: {
      // --- DRAGONS ---
      "dhh:night_fury": 30,
      "dhh:light_fury": 30,
      "dhh:night_light": 28,
      "dhh:skrill": 26,
      "dhh:whispering_death": 25,
      "dhh:snow_wraith": 24,
      "dhh:flamewhipper": 22,
      "dhh:sand_wraith": 22,
      "dhh:nadder": 20,
      "dhh:nightmare": 20,
      "dhh:rumblehorn": 20,
      "dhh:thunderdrum": 20,
      "dhh:timberjack": 20,
      "dhh:zippleback": 20,
      "dhh:gronckle": 18,
      "dhh:hobblegrunt": 18,

      // --- MOB KHÁC ---
      "dhh:dragon_hunter": 7.5,
      "dhh:loyal_skeleton": 4.0,
      "dhh:newb": 50,
      "dhh:warden_matriarch_boss": 5000,
      "dhh:phantom_sharpshooter_boss": 5000,
      "minecraft:breeze": 80,
      "minecraft:camel": 30,
      "minecraft:armadillo": 30,
      "minecraft:creaking": 100, // mob mới từ Pale Garden
      "minecraft:happy_ghast": 200, // biến thể mới ghast 2025
      "minecraft:dried_ghast": 150,
      "minecraft:ghastling": 120,

      "minecraft:trader_llama": 10,
      "minecraft:camel": 20,
      "minecraft:giant": 500, // nếu muốn hỗ trợ mob “giants”

      // Các mob jockey / compound
      "minecraft:chicken_jockey": 40,
      "minecraft:hoglin_jockey": 60,
      "minecraft:ravager_jockey": 100,
      "minecraft:skeleton_horseman": 90,
      "minecraft:spider_jockey": 50,
      "minecraft:zombie_horse": 80,
      "minecraft:horse_skeleton": 80,
      // ===================================================================
      // === CÂN BẰNG LẠI TOÀN BỘ GIÁ TRỊ ===
      // ===================================================================
      "minecraft:allay": 20,
      "minecraft:axolotl": 18,
      "minecraft:bat": 1,
      "minecraft:camel": 15,
      "minecraft:cat": 5,
      "minecraft:chicken": 4,
      "minecraft:cod": 3,
      "minecraft:cow": 5,
      "minecraft:donkey": 8,
      "minecraft:frog": 6,
      "minecraft:glow_squid": 10,
      "minecraft:horse": 8,
      "minecraft:mooshroom": 25,
      "minecraft:mule": 8,
      "minecraft:ocelot": 10,
      "minecraft:parrot": 10,
      "minecraft:pig": 5,
      "minecraft:pufferfish": 6,
      "minecraft:rabbit": 4,
      "minecraft:salmon": 3,
      "minecraft:sheep": 5,
      "minecraft:sniffer": 30,
      "minecraft:snow_golem": 3,
      "minecraft:squid": 3,
      "minecraft:strider": 12,
      "minecraft:tadpole": 1,
      "minecraft:tropical_fish": 3,
      "minecraft:turtle": 9,
      "minecraft:villager": -100,
      "minecraft:wandering_trader": 0,

      "minecraft:skeleton_horse": 100,
      "minecraft:zombie_horse": 100,

      "minecraft:bee": 6,
      "minecraft:cave_spider": 30,
      "minecraft:dolphin": 8,
      "minecraft:enderman": 45,
      "minecraft:fox": 10,
      "minecraft:goat": 8,
      "minecraft:iron_golem": 60,
      "minecraft:llama": 8,
      "minecraft:trader_llama": 8,
      "minecraft:panda": 25,
      "minecraft:piglin": 25,
      "minecraft:polar_bear": 25,
      "minecraft:spider": 22,
      "minecraft:wolf": 25,
      "minecraft:zombie_pigman": 25,

      "minecraft:creeper": 35,
      "minecraft:drowned": 22,
      "minecraft:husk": 22,
      "minecraft:phantom": 30,
      "minecraft:silverfish": 8,
      "minecraft:skeleton": 25,
      "minecraft:slime": 15,
      "minecraft:stray": 25,
      "minecraft:witch": 75,
      "minecraft:zombie": 22,
      "minecraft:zombie_villager": 25,
      "minecraft:endermite": 8,
      "minecraft:baby_zombie": 28,
      "minecraft:baby_zombie_villager": 28,
      "minecraft:baby_husk": 28,
      "minecraft:baby_drowned": 28,

      "minecraft:blaze": 45,
      "minecraft:ghast": 60,
      "minecraft:hoglin": 70,
      "minecraft:magma_cube": 18,
      "minecraft:piglin_brute": 180,
      "minecraft:wither_skeleton": 85,
      "minecraft:zoglin": 70,

      "minecraft:shulker": 50,

      "minecraft:pillager": 35,
      "minecraft:vex": 30,
      "minecraft:vindicator": 60,
      "minecraft:evoker": 90,
      "minecraft:ravager": 250,
      "minecraft:illusioner": 90,

      "minecraft:guardian": 45,
      "minecraft:elder_guardian": 500,

      "minecraft:wither": 2000,
      "minecraft:ender_dragon": 2500,
      "minecraft:warden": 3000,

      "minecraft:breeze": 70,
      "minecraft:bogged": 25,
      "minecraft:armadillo": 9,

      "minecraft:giant": 1500,
      "minecraft:killer_bunny": 150,

      // === UTILITY & SUMMONED MOBS ===
      // ===================================================================
      "minecraft:armor_stand": 0,
      "minecraft:boat": 0,
      "minecraft:chest_boat": 0,
      "minecraft:minecart": 0,
      "minecraft:chest_minecart": 0,
      "minecraft:furnace_minecart": 0,
      "minecraft:hopper_minecart": 0,
      "minecraft:tnt_minecart": 0,
      "minecraft:spawner_minecart": 0,
      "minecraft:command_block_minecart": 0,

      // ===================================================================
      // === PROJECTILES & EFFECTS (Vô tri, không cho XP) ===
      // ===================================================================
      "minecraft:item": 0,
      "minecraft:experience_orb": 0,
      "minecraft:area_effect_cloud": 0,
      "minecraft:lightning_bolt": 0,
      "minecraft:firework_rocket": 0,
      "minecraft:arrow": 0,
      "minecraft:spectral_arrow": 0,
      "minecraft:trident": 0,
      "minecraft:snowball": 0,
      "minecraft:egg": 0,
      "minecraft:ender_pearl": 0,
      "minecraft:eye_of_ender": 0,
      "minecraft:potion": 0,
      "minecraft:experience_bottle": 0,
      "minecraft:fireball": 0,
      "minecraft:small_fireball": 0,
      "minecraft:dragon_fireball": 0,
      "minecraft:wither_skull": 0,
      "minecraft:shulker_bullet": 0,
      "minecraft:llama_spit": 0,

      // ===================================================================
      // === TAMEABLE MOBS (Đã được cân bằng ở các mục trên) ===
      // ===================================================================
      // Ví dụ: Cat(5), Donkey(8), Horse(8), Llama(8), Mule(8), Parrot(10), Wolf(25)
      // Các giá trị đã được đồng bộ với danh sách phía trên.

      // ===================================================================
      // === SPECIAL EVENT MOBS ===
      // ===================================================================
      "minecraft:giant": 1500,
      "minecraft:killer_bunny": 150,
    },
  },
  BASE_XP_TO_LEVEL: 1200,
  XP_MULTIPLIER: 2.524,
  SKILL_POINTS_PER_LEVEL: 3,
  STAT_SCALING: {
    VITALITY: { health_per_point: 3 },
    INTELLIGENCE: { mana_per_point: 10 },
    STRENGTH: { points_per_effect_level: 5, damage_bonus_per_point: 0.1 },

    AGILITY: { points_per_effect_level: 3, speed_bonus_per_point: 0.1 },
  },
  MANA_REGEN_RATE: 1,
  SKILL_MANA_COSTS: {
    STEALTH: 8,
    HEAL: 8,
    DASH_CHARGE: 5,
    TARGETED_LIGHTNING: 10,
    SUMMON_WOLF: 20,
    SHADOW_SWAP: 12,
    SPRINT: 20,
    SHADOWBIND: 5,
    GOLEM_PUNCH: 10,
    WINTERS_DOMINION: 25,
    ALLY_SWAP: 20,
    TIME_LOCK: 30,
    EARTHEN_GRAVE: 15,
    HELLFIRE_PIT: 30,
    REALITY_WARP: 25,
    SPIRIT_SIGHT: 30,
    CHAOS_TRAP: 10,
    IMMORTAL_EDICT: 30,
    EXPLOSION: 30,
    BLADE_STORM: 30,
    CELESTIAL_STEP: 15,
    PRIMAL_BEAST: 30,
    VOID_STEP: 10,
    LIFE_LINK: 25,
    SPATIAL_LINK: 40,
  },
  SKILL_COOLDOWNS: {
    STEALTH: 10,
    HEAL: 10,
    DASH_CHARGE: 5,
    TARGETED_LIGHTNING: 30,
    SUMMON_WOLF: 10,
    SHADOW_SWAP: 15,
    SPRINT: 10,
    SHADOWBIND: 2,
    GOLEM_PUNCH: 8,
    WINTERS_DOMINION: 15,
    ALLY_SWAP: 15,
    TIME_LOCK: 15,
    EARTHEN_GRAVE: 15,
    HELLFIRE_PIT: 15,
    REALITY_WARP: 15,
    SPIRIT_SIGHT: 15,
    CHAOS_TRAP: 15,
    EXPLOSION: 300,
    BLADE_STORM: 180,
    PRIMAL_BEAST: 300,
    CELESTIAL_STEP: 15,
    IMMORTAL_EDICT: 30,
    VOID_STEP: 30,
    LIFE_LINK: 30,
    SPATIAL_LINK: 20,
  },
  BASE_STATS_PER_LEVEL: {
    health: 4,
    mana: 3.5,
    damage_bonus: 0.1,

    speed_bonus: 0.05,
  },

  ITEM_TAGS: {
    "#dragons": [
      "dhh:night_fury",
      "dhh:light_fury",
      "dhh:night_light",
      "dhh:skrill",
      "dhh:whispering_death",
      "dhh:snow_wraith",
      "dhh:flamewhipper",
      "dhh:sand_wraith",
      "dhh:nadder",
      "dhh:nightmare",
      "dhh:rumblehorn",
      "dhh:thunderdrum",
      "dhh:timberjack",
      "dhh:zippleback",
      "dhh:gronckle",
      "dhh:hobblegrunt",
    ],

    "#coal": ["minecraft:coal", "minecraft:charcoal"],

    "#farm_animals": [
      "minecraft:cow",
      "minecraft:sheep",
      "minecraft:pig",
      "minecraft:chicken",
      "minecraft:rabbit",
    ],
    "#breedable": [
      "minecraft:cow",
      "minecraft:sheep",
      "minecraft:pig",
      "minecraft:chicken",
      "minecraft:wolf",
      "minecraft:cat",
      "minecraft:ocelot",
      "minecraft:horse",
      "minecraft:donkey",
      "minecraft:mule",
      "minecraft:rabbit",
      "minecraft:llama",
      "minecraft:trader_llama",
      "minecraft:fox",
      "minecraft:panda",
      "minecraft:bee",
      "minecraft:strider",
      "minecraft:hoglin",
      "minecraft:turtle",
      "minecraft:axolotl",
      "minecraft:goat",
      "minecraft:camel", // Mob mới
      "minecraft:sniffer", // Mob mới
    ],
    "#farm_animals": [
      "minecraft:cow",
      "minecraft:pig",
      "minecraft:sheep",
      "minecraft:chicken",
    ],
    "#seeds_and_crops": [
      "minecraft:wheat_seeds",
      "minecraft:potato",
      "minecraft:carrot",
      "minecraft:beetroot_seeds",
      "minecraft:melon_seeds",
      "minecraft:pumpkin_seeds",
    ],
    "#monsters": [
      "minecraft:zombie",
      "minecraft:skeleton",
      "minecraft:creeper",
      "minecraft:spider",
      "minecraft:enderman",
      "minecraft:witch",
      "minecraft:drowned",
      "minecraft:husk",
      "minecraft:stray",
      "minecraft:phantom",
      "minecraft:silverfish",
      "minecraft:cave_spider",
      "minecraft:endermite",
      "minecraft:blaze",
      "minecraft:ghast",
      "minecraft:wither_skeleton",
      "minecraft:magma_cube",
      "minecraft:slime",
      "minecraft:piglin",
      "minecraft:zombie_pigman",
      "minecraft:hoglin",
      "minecraft:zoglin",
      "minecraft:piglin_brute",
      "minecraft:pillager",
      "minecraft:vindicator",
      "minecraft:evoker",
      "minecraft:vex",
      "minecraft:ravager",
      "minecraft:guardian",
      "minecraft:elder_guardian",
      "minecraft:shulker",
      "minecraft:warden",
      "minecraft:breeze",
      "minecraft:bogged",
    ],
    "#logs": [
      "minecraft:oak_log",
      "minecraft:spruce_log",
      "minecraft:birch_log",
      "minecraft:jungle_log",
      "minecraft:acacia_log",
      "minecraft:dark_oak_log",
      "minecraft:mangrove_log",
      "minecraft:cherry_log",
      "minecraft:pale_oak_log",
      "minecraft:crimson_stem",
      "minecraft:warped_stem",

      "minecraft:oak_wood",
      "minecraft:spruce_wood",
      "minecraft:birch_wood",
      "minecraft:jungle_wood",
      "minecraft:acacia_wood",
      "minecraft:dark_oak_wood",
      "minecraft:mangrove_wood",
      "minecraft:cherry_wood",
      "minecraft:pale_oak_wood",
      "minecraft:crimson_hyphae",
      "minecraft:warped_hyphae",

      "minecraft:stripped_oak_log",
      "minecraft:stripped_spruce_log",
      "minecraft:stripped_birch_log",
      "minecraft:stripped_jungle_log",
      "minecraft:stripped_acacia_log",
      "minecraft:stripped_dark_oak_log",
      "minecraft:stripped_mangrove_log",
      "minecraft:stripped_cherry_log",
      "minecraft:stripped_pale_oak_log",
      "minecraft:stripped_crimson_stem",
      "minecraft:stripped_warped_stem",

      "minecraft:stripped_oak_wood",
      "minecraft:stripped_spruce_wood",
      "minecraft:stripped_birch_wood",
      "minecraft:stripped_jungle_wood",
      "minecraft:stripped_acacia_wood",
      "minecraft:stripped_dark_oak_wood",
      "minecraft:stripped_mangrove_wood",
      "minecraft:stripped_cherry_wood",
      "minecraft:stripped_pale_oak_wood",
      "minecraft:stripped_crimson_hyphae",
      "minecraft:stripped_warped_hyphae",
    ],
    "#raw_meat": [
      "minecraft:beef",
      "minecraft:porkchop",
      "minecraft:mutton",
      "minecraft:chicken",
      "minecraft:rabbit",
      "minecraft:cod",
      "minecraft:salmon",
    ],
    "#cooked_meat": [
      "minecraft:cooked_beef",
      "minecraft:cooked_porkchop",
      "minecraft:cooked_mutton",
      "minecraft:cooked_chicken",
      "minecraft:cooked_rabbit",
      "minecraft:cooked_cod",
      "minecraft:cooked_salmon",
    ],
    "#planks": [
      "minecraft:oak_planks",
      "minecraft:spruce_planks",
      "minecraft:birch_planks",
      "minecraft:jungle_planks",
      "minecraft:acacia_planks",
      "minecraft:dark_oak_planks",
      "minecraft:mangrove_planks",
      "minecraft:cherry_planks",
      "minecraft:crimson_planks",
      "minecraft:warped_planks",
    ],
    "#wool": [
      "minecraft:white_wool",
      "minecraft:orange_wool",
      "minecraft:magenta_wool",
      "minecraft:light_blue_wool",
      "minecraft:yellow_wool",
      "minecraft:lime_wool",
      "minecraft:pink_wool",
      "minecraft:gray_wool",
      "minecraft:light_gray_wool",
      "minecraft:cyan_wool",
      "minecraft:purple_wool",
      "minecraft:blue_wool",
      "minecraft:brown_wool",
      "minecraft:green_wool",
      "minecraft:red_wool",
      "minecraft:black_wool",
    ],
    "#stone": [
      "minecraft:cobblestone",
      "minecraft:stone",
      "minecraft:deepslate",
      "minecraft:blackstone",
      "minecraft:diorite",
      "minecraft:andesite",
      "minecraft:granite",
    ],
    "#common_ores": [
      "minecraft:coal",
      "minecraft:raw_iron",
      "minecraft:raw_copper",
    ],
    "#rare_ores": [
      "minecraft:raw_gold",
      "minecraft:diamond",
      "minecraft:emerald",
    ],
    "#flowers": [
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
      "minecraft:sunflower",
      "minecraft:lilac",
      "minecraft:rose_bush",
      "minecraft:peony",
      "minecraft:wither_rose",
      "minecraft:flowering_azalea",
      "minecraft:spore_blossom",
      "minecraft:torchflower",
    ],
  },
  QUESTS: {
    // PHIÊN BẢN ĐÃ RÀ SOÁT & SỬA LỖI LOGIC/MÔ TẢ

    // ===================================================================
    // === CẤP DỄ (15 Nhiệm Vụ): "CHƯƠNG I - Kẻ Bị Bỏ Lại" ===============
    // ===================================================================
    EASY: [
      {
        id: "EASY_DRAGON_GRONCKLE",
        title: "Tảng Đá Biết Bay",
        description:
          "Người ta đồn về một sinh vật trông như một tảng đá cuội khổng lồ, sần sùi với đôi cánh nhỏ xíu. Đó là Gronckle. Hãy thử tìm nó ở những **vùng núi cao hoặc trong các hang động lớn** và hạ gục 1 con.",
        type: "KILL",
        target: "dhh:gronckle",
        amount: 1,
        rewards: {
          xp: 380,
          nguyen_thach: 125,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_DRAGON_NADDER",
        title: "Gai Độc Sắc Lẹm",
        description:
          "Hãy tìm một con rồng kiêu hãnh, lớp vảy sặc sỡ như vẹt và chiếc đuôi đầy gai nhọn chết người. Chúng yêu thích những **khu vực thoáng đãng như đồng bằng hoặc bìa rừng**. Tiêu diệt 1 con Nadder.",
        type: "KILL",
        target: "dhh:nadder",
        amount: 1,
        rewards: {
          xp: 400,
          nguyen_thach: 135,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_DRAGON_ZIPPLEBACK",
        title: "Mối Hiểm Họa Kép",
        description:
          "Một con rồng kỳ lạ với hai cái đầu trên một thân hình dài ngoằng. Một đầu phun ra khí ga, đầu còn lại tạo ra tia lửa. Chúng thường ẩn mình trong **các khu rừng rậm rạp hoặc đầm lầy u tối**. Hạ gục 1 con Zippleback.",
        type: "KILL",
        target: "dhh:zippleback",
        amount: 1,
        rewards: {
          xp: 420,
          nguyen_thach: 140,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_DRAGON_WHISPERING_DEATH",
        title: "Lời Thì Thầm Dưới Lòng Đất",
        description:
          "Một tiếng động lạ vang lên từ lòng đất! Đó là Whispering Death, một con rồng không chân, thân hình như rắn với những hàng răng xoay tròn để đào hầm. Hãy tìm nó ở **những vùng đồi núi đá** và tiêu diệt 1 con.",
        type: "KILL",
        target: "dhh:whispering_death",
        amount: 1,
        rewards: {
          xp: 430,
          nguyen_thach: 145,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_DRAGON_TIMBERJACK",
        title: "Lưỡi Cưa Bầu Trời",
        description:
          "Một con rồng khổng lồ, thân mảnh khảnh nhưng lại sở hữu đôi cánh cực lớn, sắc như dao cạo. **Hãy tìm những vệt cây bị đốn hạ bất thường trong các khu rừng Taiga rộng lớn**. Đó là dấu hiệu của 1 Timberjack.",
        type: "KILL",
        target: "dhh:timberjack",
        amount: 1,
        rewards: {
          xp: 410,
          nguyen_thach: 140,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_DRAGON_RUMBLEHORN",
        title: "Kẻ Đánh Hơi",
        description:
          "Với lớp giáp dày như bọ cánh cứng và chiếc sừng to khoẻ ở mũi, Rumblehorn là một kẻ truy lùng đáng gờm. Chúng thường đi lang thang trên **những vùng thảo nguyên hoặc savan rộng lớn**. Hãy hạ gục 1 con.",
        type: "KILL",
        target: "dhh:rumblehorn",
        amount: 1,
        rewards: {
          xp: 440,
          nguyen_thach: 150,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_DRAGON_SKRILL",
        title: "Hiện Thân Của Bão Tố",
        description:
          "Khi giông bão nổi lên, hãy leo lên những **đỉnh núi cao nhất**. Ở đó, ngươi có thể tìm thấy Skrill, một con rồng vảy đen với vương miện gai nhọn, có khả năng hấp thụ và phóng ra sấm sét. Tiêu diệt 1 con.",
        type: "KILL",
        target: "dhh:skrill",
        amount: 1,
        rewards: {
          xp: 490,
          nguyen_thach: 165,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_NEWB_CHALLENGE",
        title: "Thử Thách Từ Kẻ Lạ Mặt",
        description:
          "Một kẻ lạ mặt trông giống người chơi, di chuyển và chiến đấu cực kỳ thông minh đã xuất hiện. Hắn được gọi là 'Newb'. Hắn thường **lang thang ở những khu vực mà người chơi hay lui tới**. Hãy hạ gục 1 Newb.",
        type: "KILL",
        target: "dhh:newb",
        amount: 1,
        rewards: {
          xp: 480,
          nguyen_thach: 160,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_DRAGON_NIGHTMARE",
        title: "Cơn Ác Mộng Bùng Cháy",
        description:
          "Hãy cẩn thận với một con rồng đen tuyền, hung dữ, với khả năng tự bọc mình trong lửa. Nó thường xuất hiện vào ban đêm ở những **vùng đất khô cằn như savan hoặc badlands**. Hãy dập tắt 1 Cơn Ác Mộng (Nightmare) này.",
        type: "KILL",
        target: "dhh:nightmare",
        amount: 1,
        rewards: {
          xp: 460,
          nguyen_thach: 155,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_DRAGON_THUNDERDRUM",
        title: "Tiếng Gầm Sấm Sét",
        description:
          "Một tiếng gầm kinh hoàng có thể làm rung chuyển mặt nước! Đó là Thunderdrum, con rồng có cái miệng khổng lồ và thân hình tròn mập. Chúng sống ở **các vùng biển sâu hoặc hồ nước lớn**. Hãy tiêu diệt 1 con.",
        type: "KILL",
        target: "dhh:thunderdrum",
        amount: 1,
        rewards: {
          xp: 450,
          nguyen_thach: 150,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_DRAGON_SAND_WRAITH",
        title: "Bóng Ma Sa Mạc",
        description:
          "Một con rồng có lớp vảy màu cát, giúp nó ngụy trang hoàn hảo trên **sa mạc mênh mông**. Nó có khả năng lặn sâu xuống cát rồi bất ngờ trồi lên tấn công. Hãy săn lùng 1 Bóng Ma Sa Mạc (Sand Wraith).",
        type: "KILL",
        target: "dhh:sand_wraith",
        amount: 1,
        rewards: {
          xp: 450,
          nguyen_thach: 150,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_DRAGON_SNOW_WRAITH",
        title: "Bóng Ma Tuyết Trắng",
        description:
          "Một sinh vật săn mồi nguy hiểm với lớp vảy trắng muốt, gần như vô hình trong tuyết. Nó có khả năng cảm nhận nhiệt của con mồi. Hãy mạo hiểm đến những **đỉnh núi tuyết hoặc vùng lãnh nguyên băng giá** để tìm và hạ gục 1 Snow Wraith.",
        type: "KILL",
        target: "dhh:snow_wraith",
        amount: 1,
        rewards: {
          xp: 460,
          nguyen_thach: 155,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_DRAGON_HOBBLEGRUNT",
        title: "Rồng Tắc Kè Hoa",
        description:
          "Đây là một con rồng hiền lành, có khả năng đổi màu vảy tùy theo cảm xúc, giống như tắc kè hoa. Chúng thường đi lang thang trong **các khu rừng ôn đới hoặc đồng bằng hoa**. Tìm và hạ 1 con Hobblegrunt để nghiên cứu.",
        type: "KILL",
        target: "dhh:hobblegrunt",
        amount: 1,
        rewards: {
          xp: 400,
          nguyen_thach: 130,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_DRAGON_FLAMEWHIPPER",
        title: "Ngọn Roi Rực Lửa",
        description:
          "Một con rồng sặc sỡ, hung hăng với chiếc đuôi dài như ngọn roi bốc cháy. Chúng rất hiếu chiến và thường được tìm thấy ở những **khu vực nóng nực như rừng rậm hoặc gần các hồ dung nham trên mặt đất**. Hạ gục 1 con Flamewhipper.",
        type: "KILL",
        target: "dhh:flamewhipper",
        amount: 1,
        rewards: {
          xp: 470,
          nguyen_thach: 160,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      // --- Nhánh: Sinh Tồn Căn Bản ---
      {
        id: "EASY_SURVIVAL_1",
        title: "Lời Thì Thầm Của Rừng",
        description:
          "Khi ngươi mở mắt, khu rừng nhìn ngươi chằm chằm. Nó thì thầm về một đêm dài sắp tới. Lắng nghe và thu thập 16 khúc GỖ BẤT KỲ để chứng tỏ ngươi xứng đáng.",
        type: "COLLECT_TAG",
        target: "#logs",
        amount: 16,
        rewards: {
          xp: 150,
          nguyen_thach: 50,
          itemPool: "EASY_SURVIVAL_REWARDS",
        },
      },
      {
        id: "EASY_SURVIVAL_2",
        title: "Máu Của Đất Mẹ",
        description:
          "Người thợ rèn trong giấc mơ nói SẮT là máu của đất mẹ. Hãy chế tạo một CÚP ĐÁ và dùng nó để lấy về 8 viên SẮT THÔ.", // SỬA MÔ TẢ: "BỘ CÔNG CỤ ĐÁ" -> "CÚP ĐÁ"
        type: "COLLECT_MULTIPLE", // Đã đúng
        targets: [
          { id: "minecraft:stone_pickaxe", amount: 1 },
          { id: "minecraft:raw_iron", amount: 8 },
        ],
        amount: 9,
        rewards: {
          xp: 250,
          nguyen_thach: 80,
          itemPool: "NORMAL_MINING_REWARDS",
        },
      },
      {
        id: "EASY_SURVIVAL_3",
        title: "Giấc Ngủ An Lành",
        description:
          "Những cơn ác mộng đang chực chờ. Chỉ có một giấc ngủ yên bình mới có thể xua đuổi chúng. Thu thập 3 LEN BẤT KỲ để dệt nên một chiếc giường.",
        type: "COLLECT_TAG",
        target: "#wool",
        amount: 3,
        rewards: { xp: 120, nguyen_thach: 40, itemPool: "EASY_FOOD_REWARDS" },
      },

      // --- Nhánh: Bản Năng Thợ Săn ---
      {
        id: "EASY_HUNTER_1",
        title: "Luật Của Kẻ Săn Mồi",
        description:
          "Cái đói là một con thú hoang đang gầm gừ trong bụng ngươi. Hãy làm dịu nó bằng 8 miếng THỊT SỐNG BẤT KỲ.",
        type: "COLLECT_TAG",
        target: "#raw_meat",
        amount: 8,
        rewards: { xp: 110, nguyen_thach: 50, itemPool: "EASY_FOOD_REWARDS" },
      },
      {
        id: "EASY_HUNTER_2",
        title: "Vũ Khí Của Xạ Thủ",
        description:
          "Cung thủ không thể chiến đấu tay không. Lũ gà giữ lông vũ, lũ nhện giữ tơ. Thu thập 8 LÔNG GÀ và 8 DÂY.",
        type: "COLLECT_MULTIPLE", // Đã đúng
        targets: [
          { id: "minecraft:feather", amount: 8 },
          { id: "minecraft:string", amount: 8 },
        ],
        amount: 16,
        rewards: { xp: 280, nguyen_thach: 95, itemPool: "EASY_COMBAT_REWARDS" },
      },

      // --- Nhánh: Tiếng Gọi Của Lòng Đất ---
      {
        id: "EASY_MINER_1",
        title: "Đôi Mắt Của Hầm Ngầm",
        description:
          "Trong bóng tối vô tận, than đá chính là đôi mắt của người thợ mỏ. Hãy mang ánh sáng đến những nơi tăm tối nhất bằng cách khai thác 24 viên THAN.",
        type: "COLLECT_TAG",
        target: "#coal",
        amount: 24,
        rewards: {
          xp: 200,
          nguyen_thach: 70,
          itemPool: "EASY_SURVIVAL_REWARDS",
        },
      },
      {
        id: "EASY_MINER_2",
        title: "Hơi Ấm Từ Kim Loại ĐỎ Nâu",
        description:
          "Một loại khoáng sản màu cam lấp lánh như hoàng hôn. Người ta nói nó dẫn nhiệt rất tốt. Khai thác và mang về 16 ĐỒNG THÔ.",
        type: "COLLECT",
        target: "minecraft:raw_copper",
        amount: 16,
        rewards: {
          xp: 200,
          nguyen_thach: 40,
          itemPool: "NORMAL_MINING_REWARDS",
        },
      },

      // --- Nhánh: Gươm Sáng Trong Đêm ---
      {
        id: "EASY_WARRIOR_1",
        title: "Bài Ca Của Xương",
        description:
          "Tiếng lách cách của xương khô là bản nhạc của cái chết. Hãy bắt chúng im lặng vĩnh viễn. TIÊU DIỆT 10 SKELETON.",
        type: "KILL",
        target: "minecraft:skeleton",
        amount: 10,
        rewards: {
          xp: 300,
          nguyen_thach: 100,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_WARRIOR_2",
        title: "Lời Thì Thầm Bùng Nổ",
        description:
          "Nó đến trong im lặng, chỉ mang theo một tiếng rít. Hãy cẩn thận và thu thập 8 THUỐC SÚNG từ những bóng ma xanh này.",
        type: "COLLECT",
        target: "minecraft:gunpowder",
        amount: 8,
        rewards: {
          xp: 350,
          nguyen_thach: 120,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },

      // --- Nhánh: Người Gây Dựng Nền Móng ---
      {
        id: "EASY_ARTISAN_1",
        title: "Trật Tự Từ Hỗn Mang",
        description:
          "Để sống sót, ngươi cần tổ chức. Hãy CHẾ TẠO và SỞ HỮU một chiếc RƯƠNG để cất giữ, một LÒ NUNG để tinh luyện, và một BÀN CHẾ TẠO để sáng tạo.", // SỬA MÔ TẢ
        type: "COLLECT_MULTIPLE", // SỬA LOGIC: Chuyển từ "CRAFT_MULTIPLE" (không tồn tại) sang "COLLECT_MULTIPLE"
        targets: [
          { id: "minecraft:chest", amount: 1 },
          { id: "minecraft:furnace", amount: 1 },
          { id: "minecraft:crafting_table", amount: 1 },
        ],
        amount: 3,
        rewards: {
          xp: 120,
          nguyen_thach: 30,
          itemPool: "EASY_SURVIVAL_REWARDS",
        },
      },

      // --- Nhánh: Dấu Chân Trên Đất Lạ ---
      {
        id: "EASY_EXPLORER_1",
        title: "Sắc Màu Của Sự Sống",
        description:
          "Thế giới này không chỉ có một màu. Hãy đi và mang về 10 BÔNG HOA BẤT KỲ để chứng minh vẻ đẹp của nó.",
        type: "COLLECT_TAG",
        target: "#flowers",
        amount: 10,
        rewards: {
          xp: 160,
          nguyen_thach: 50,
          itemPool: "EASY_SURVIVAL_REWARDS",
        },
      },
      {
        id: "EASY_EXPLORER_2",
        title: "Bão Cát Vĩnh Hằng",
        description:
          "Người ta nói sa mạc là vùng đất chết, nhưng sự sống luôn tìm ra cách. Vượt bão cát và mang về 32 KHỐI CÁT.",
        type: "COLLECT",
        target: "minecraft:sand",
        amount: 32,
        rewards: {
          xp: 169,
          nguyen_thach: 45,
          itemPool: "EASY_SURVIVAL_REWARDS",
        },
      },

      // --- Nhánh: Bàn Tay Của Thần Nông ---
      {
        id: "EASY_FARMER_1",
        title: "Mầm Sống",
        description:
          "Một nền văn minh bắt đầu khi con người gieo trồng. Tìm kiếm 16 HẠT GIỐNG hoặc CỦ GIỐNG bất kỳ (lúa mì, cà rốt, khoai tây...).",
        type: "COLLECT_TAG",
        target: "#seeds_and_crops",
        amount: 16,
        rewards: { xp: 200, nguyen_thach: 45, itemPool: "EASY_FOOD_REWARDS" },
      },
      // ---- THÊM 2 NHIỆM VỤ ĐỂ ĐỦ 15 ----
      {
        id: "EASY_KILL_ZOMBIE",
        title: "Xác Sống Lang Thang",
        description:
          "Màn đêm buông xuống là lúc những kẻ không hồn trỗi dậy. Dọn dẹp mối nguy trước mắt, TIÊU DIỆT 12 ZOMBIE.",
        type: "KILL",
        target: "minecraft:zombie",
        amount: 12,
        rewards: { xp: 320, nguyen_thach: 95, itemPool: "EASY_COMBAT_REWARDS" },
      },
      {
        id: "EASY_EXPLORE_CAVE",
        title: "Tiếng Vọng Từ Lòng Đất",
        description:
          "Có những bí mật chỉ được tiết lộ trong bóng tối. Hãy dũng cảm tiến vào một hang động, đi xuống DƯỚI ĐỘ CAO Y=50.",
        type: "EXPLORE", // Nhiệm vụ EXPLORE cần config QUEST_CAVE_Y_LEVEL = 50
        target: "minecraft:cave", // Target chỉ là định danh
        amount: 1, // Hoàn thành ngay khi đạt điều kiện
        rewards: {
          xp: 160,
          nguyen_thach: 50,
          itemPool: "NORMAL_MINING_REWARDS",
        },
      },
      ////////////////////
      {
        id: "EASY_COLLECT_COBBLESTONE",
        title: "Nền Tảng Của Thợ Mỏ",
        description:
          "Trước khi tìm thấy kim cương, mọi thợ mỏ đều bắt đầu với Đá Cuội. Hãy thu thập 64 khối để chứng minh sự kiên trì của ngươi.",
        type: "COLLECT",
        target: "minecraft:cobblestone",
        amount: 64,
        rewards: {
          xp: 110,
          nguyen_thach: 35,
          itemPool: "EASY_SURVIVAL_REWARDS",
        },
      },
      {
        id: "EASY_KILL_SPIDER",
        title: "Mối Đe Dọa Tám Chân",
        description:
          "Những con nhện ẩn nấp trong bóng tối và rình rập kẻ yếu. Hãy săn lùng và tiêu diệt 12 con.",
        type: "KILL",
        target: "minecraft:spider",
        amount: 12,
        rewards: {
          xp: 280,
          nguyen_thach: 95,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_COLLECT_LEATHER",
        title: "Thợ May Bất Đắc Dĩ",
        description:
          "Da thú có thể bảo vệ ngươi khỏi những vết cào xước. Săn Bò để thu thập 10 tấm Da.",
        type: "COLLECT",
        target: "minecraft:leather",
        amount: 10,
        rewards: {
          xp: 180,
          nguyen_thach: 60,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_BUTCHER_PIGS",
        title: "Nguồn Cung Thịt Heo",
        description:
          "Để sống sót, ngươi cần thức ăn. Hãy đi săn 10 con Lợn để dự trữ thịt.",
        type: "KILL",
        target: "minecraft:pig",
        amount: 10,
        rewards: {
          xp: 200,
          nguyen_thach: 65,
          itemPool: "EASY_FOOD_REWARDS",
        },
      },
      {
        id: "EASY_COLLECT_BONES",
        title: "Tàn Tích Của Kẻ Đã Khuất",
        description:
          "Xương của những bộ xương khô là một nguyên liệu quý giá có thể dùng làm bột xương. Thu thập 32 khúc Xương từ chúng.",
        type: "COLLECT",
        target: "minecraft:bone",
        amount: 32,
        rewards: {
          xp: 400,
          nguyen_thach: 85,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_COLLECT_EGGS",
        title: "Món Quà Từ Lũ Gà",
        description:
          "Lũ gà không chỉ cho thịt và lông. Hãy kiên nhẫn và thu thập 16 quả Trứng mà chúng để lại.",
        type: "COLLECT",
        target: "minecraft:egg",
        amount: 16,
        rewards: {
          xp: 250,
          nguyen_thach: 70,
          itemPool: "EASY_FOOD_REWARDS",
        },
      },
      {
        id: "EASY_KILL_DROWNED",
        title: "Linh Hồn Đắm Chìm",
        description:
          "Những kẻ chết đuối trỗi dậy từ đáy sông hồ để kéo những kẻ sống sót xuống cùng chúng. Hãy thanh tẩy vùng nước bằng cách tiêu diệt 10 tên.",
        type: "KILL",
        target: "minecraft:drowned",
        amount: 10,
        rewards: {
          xp: 310,
          nguyen_thach: 105,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "EASY_COLLECT_ROTTEN_FLESH",
        title: "Thực Phẩm Của Kẻ Tuyệt Vọng",
        description:
          "Khi không còn gì khác, ngay cả thịt thối cũng là một nguồn sống hoặc dùng để trao đổi với tu sĩ. Tích trữ 32 miếng Thịt Thối.",
        type: "COLLECT",
        target: "minecraft:rotten_flesh",
        amount: 32,
        rewards: {
          xp: 220,
          nguyen_thach: 75,
          itemPool: "EASY_SURVIVAL_REWARDS",
        },
      },
      {
        id: "EASY_BUTCHER_SHEEP",
        title: "Đồ Tể Chăn Cừu",
        description:
          "Giường của ngươi đã xong, nhưng một trang trại tự cung tự cấp cần được quản lý. Hãy ra tay với 12 con Cừu.",
        type: "KILL",
        target: "minecraft:sheep",
        amount: 12,
        rewards: {
          xp: 200,
          nguyen_thach: 70,
          itemPool: "EASY_FOOD_REWARDS",
        },
      },
      {
        id: "EASY_COLLECT_SUGAR_CANE",
        title: "Vị Ngọt Ven Sông",
        description:
          "Dọc các bờ sông, một loại cây mọc cao và mang vị ngọt, dùng để làm giấy hoặc đường. Tìm và thu thập 16 cây Mía.",
        type: "COLLECT",
        target: "minecraft:sugar_cane",
        amount: 16,
        rewards: {
          xp: 175,
          nguyen_thach: 45,
          itemPool: "EASY_FOOD_REWARDS",
        },
      },
      {
        id: "EASY_COLLECT_CLAY",
        title: "Đất Sét Mềm",
        description:
          "Dưới lòng sông và hồ, đất sét là vật liệu hữu ích để tạo ra gạch. Thu thập 32 viên Đất Sét.",
        type: "COLLECT",
        target: "minecraft:clay_ball",
        amount: 32,
        rewards: {
          xp: 220,
          nguyen_thach: 70,
          itemPool: "EASY_SURVIVAL_REWARDS",
        },
      },
      {
        id: "EASY_COLLECT_FLINT",
        title: "Lưỡi Đá Sắc Bén",
        description:
          "Đá lửa là chìa khóa để tạo ra những mũi tên đầu tiên và nhóm lên ngọn lửa. Sàng lọc Sỏi và tìm 10 viên Đá Lửa.",
        type: "COLLECT",
        target: "minecraft:flint",
        amount: 10,
        rewards: {
          xp: 200,
          nguyen_thach: 50,
          itemPool: "EASY_SURVIVAL_REWARDS",
        },
      },
      {
        id: "EASY_KILL_COD",
        title: "Ngư Dân Vùng Nước Nông",
        description:
          "Hãy bắt đầu sự nghiệp ngư dân của bạn bằng cách săn những con cá dễ dàng nhất. Tiêu diệt 5 con Cá Tuyết.",
        type: "KILL",
        target: "minecraft:cod",
        amount: 5,
        rewards: {
          xp: 190,
          nguyen_thach: 70,
          itemPool: "EASY_FOOD_REWARDS",
        },
      },
      {
        id: "EASY_COLLECT_INK_SAC",
        title: "Mực Đen Từ Biển Cả",
        description:
          "Trong lòng đại dương, những con mực phun ra túi mực đen kịt để trốn thoát. Lặn xuống và thu thập 8 Túi Mực.",
        type: "COLLECT",
        target: "minecraft:ink_sac",
        amount: 8,
        rewards: {
          xp: 220,
          nguyen_thach: 55,
          itemPool: "EASY_SURVIVAL_REWARDS",
        },
      },
      {
        id: "EASY_COLLECT_DIRT",
        title: "Bàn Tay Nông Dân",
        description:
          "Đất là cội nguồn của mọi sự sống. Hãy tôn trọng nó bằng cách tự tay thu thập 64 khối Đất.",
        type: "COLLECT",
        target: "minecraft:dirt",
        amount: 64,
        rewards: {
          xp: 100,
          nguyen_thach: 30,
          itemPool: "EASY_SURVIVAL_REWARDS",
        },
      },
    ],

    // ===================================================================
    // === CẤP THƯỜNG (16 Nhiệm Vụ): "CHƯƠNG II - Vang Danh Anh Hùng" ========
    // ===================================================================
    NORMAL: [
      {
        id: "NORMAL_COLLECT_OBSIDIAN",
        title: "Cánh Cổng Hắc Thạch",
        description:
          "Để bước chân vào Nether, ngươi cần loại đá cứng nhất có thể khai thác. Hãy dùng cúp kim cương và cẩn thận thu thập 14 khối Hắc Diện Thạch.",
        type: "COLLECT",
        target: "minecraft:obsidian",
        amount: 14,
        rewards: {
          xp: 480,
          nguyen_thach: 140,
          itemPool: "NORMAL_DIAMOND_REWARDS",
        },
      },
      {
        id: "NORMAL_KILL_zombie_pigmanS",
        title: "Kẻ Gác Cổng Vô Cảm",
        description:
          "Lũ Heo Thây Ma lang thang khắp Nether. Chúng sẽ không làm phiền ngươi nếu không bị khiêu khích. Hãy thử thách sự dũng cảm của mình bằng cách hạ gục 20 tên.",
        type: "KILL",
        target: "minecraft:zombie_pigman",
        amount: 20,
        rewards: {
          xp: 650,
          nguyen_thach: 220,
          itemPool: "NORMAL_COMBAT_REWARDS",
        },
      },
      {
        id: "NORMAL_COLLECT_GOLD_INGOTS",
        title: "Sức Hút Của Hoàng Kim",
        description:
          "Vàng không phải kim loại mạnh nhất, nhưng lại là chìa khóa để sinh tồn và trao đổi ở Nether. Nung chảy và thu về 32 Thỏi Vàng.",
        type: "COLLECT",
        target: "minecraft:gold_ingot",
        amount: 32,
        rewards: {
          xp: 500,
          nguyen_thach: 170,
          itemPool: "NORMAL_MINING_REWARDS",
        },
      },
      {
        id: "NORMAL_KILL_SLIMES",
        title: "Những Khối Nhầy Nhụa",
        description:
          "Sâu trong lòng đất hoặc giữa những đầm lầy, các khối Slime nhảy tưng tưng. Hãy săn lùng chúng để thu thập nguyên liệu làm piston dính, tiêu diệt 15 con.",
        type: "KILL",
        target: "minecraft:slime",
        amount: 15,
        rewards: {
          xp: 550,
          nguyen_thach: 190,
          itemPool: "NORMAL_MINING_REWARDS",
        },
      },
      {
        id: "NORMAL_COLLECT_PHANTOM_MEMBRANE",
        title: "Nỗi Khiếp Sợ Từ Bầu Trời",
        description:
          "Khi ngươi thức quá lâu, bầu trời đêm sẽ cử đến những con quái vật. Hãy đối mặt với chúng và thu thập 8 Màng Phantom để sửa chữa Elytra hoặc chế thuốc.",
        type: "COLLECT",
        target: "minecraft:phantom_membrane",
        amount: 8,
        rewards: {
          xp: 680,
          nguyen_thach: 250,
          itemPool: "HARD_END_REWARDS",
        },
      },
      {
        id: "NORMAL_KILL_STRAYS",
        title: "Cung Thủ Băng Giá",
        description:
          "Tại những vùng đất băng tuyết, những bộ xương lang thang đã bị giá lạnh hóa thành Stray, bắn ra những mũi tên làm chậm. Tìm và tiêu diệt 15 tên.",
        type: "KILL",
        target: "minecraft:stray",
        amount: 15,
        rewards: {
          xp: 700,
          nguyen_thach: 260,
          itemPool: "NORMAL_COMBAT_REWARDS",
        },
      },
      {
        id: "NORMAL_COLLECT_EMERALDS",
        title: "Đồng Tiền Của Dân Làng",
        description:
          "Ngọc Lục Bảo là đơn vị tiền tệ chính khi giao dịch với dân làng. Hãy khai thác hoặc trao đổi để có được 16 viên.",
        type: "COLLECT",
        target: "minecraft:emerald",
        amount: 16,
        rewards: {
          xp: 600,
          nguyen_thach: 200,
          itemPool: "NORMAL_DIAMOND_REWARDS",
        },
      },
      {
        id: "NORMAL_KILL_HUSKS",
        title: "Xác Khô Sa Mạc",
        description:
          "Dưới cái nắng thiêu đốt của sa mạc, zombie biến thành những cái xác khô có thể gây hiệu ứng đói. Tiêu diệt 25 tên để bảo vệ người đi đường.",
        type: "KILL",
        target: "minecraft:husk",
        amount: 25,
        rewards: {
          xp: 660,
          nguyen_thach: 230,
          itemPool: "NORMAL_COMBAT_REWARDS",
        },
      },
      {
        id: "NORMAL_COLLECT_NETHERRACK",
        title: "Bước Chân Đầu Tiên",
        description:
          "Để chứng tỏ ngươi đã thực sự đặt chân đến Nether, hãy mang về bằng chứng. Thu thập 128 khối Netherrack.",
        type: "COLLECT",
        target: "minecraft:netherrack",
        amount: 128,
        rewards: {
          xp: 350,
          nguyen_thach: 120,
          itemPool: "NORMAL_MINING_REWARDS",
        },
      },
      {
        id: "NORMAL_COLLECT_IRON_BLOCKS",
        title: "Tích Trữ Sắt Thép",
        description:
          "Thỏi sắt rất hữu ích, nhưng một đế chế được xây bằng những khối sắt. Hãy chứng tỏ sự giàu có của mình bằng cách thu thập 9 Khối Sắt.",
        type: "COLLECT",
        target: "minecraft:iron_block",
        amount: 9,
        rewards: {
          xp: 700,
          nguyen_thach: 250,
          itemPool: "NORMAL_DIAMOND_REWARDS",
        },
      },
      {
        id: "NORMAL_COLLECT_SPIDER_EYES",
        title: "Nguyên Liệu Độc Dược",
        description:
          "Mắt nhện là thành phần không thể thiếu cho các loại thuốc có hiệu ứng xấu. Hãy săn nhện và thu thập 24 con mắt.",
        type: "COLLECT",
        target: "minecraft:spider_eye",
        amount: 24,
        rewards: {
          xp: 400,
          nguyen_thach: 135,
          itemPool: "NORMAL_COMBAT_REWARDS",
        },
      },
      {
        id: "NORMAL_KILL_VINDICATOR",
        title: "Kẻ Bổ Rìu",
        description:
          "Vindicator là những kẻ Illager hung hãn với chiếc rìu sắt. Chúng xuất hiện trong các cuộc đột kích hoặc dinh thự. Hạ gục 5 tên.",
        type: "KILL",
        target: "minecraft:vindicator",
        amount: 5,
        rewards: {
          xp: 880,
          nguyen_thach: 350,
          itemPool: "NORMAL_COMBAT_REWARDS",
        },
      },
      {
        id: "NORMAL_COLLECT_HONEYCOMB",
        title: "Tổ Ong Ngọt Ngào",
        description:
          "Hãy cẩn thận tiếp cận một tổ ong và dùng kéo để thu hoạch. Thu thập 12 miếng Sáp Ong mà không làm lũ ong nổi giận.",
        type: "COLLECT",
        target: "minecraft:honeycomb",
        amount: 12,
        rewards: {
          xp: 420,
          nguyen_thach: 145,
          itemPool: "EASY_FOOD_REWARDS",
        },
      },
      {
        id: "NORMAL_KILL_POLAR_BEAR",
        title: "Chúa Tể Vùng Băng Giá",
        description:
          "Gấu Bắc Cực thường hiền lành trừ khi bị khiêu khích hoặc đi cùng con. Hãy chứng tỏ bản lĩnh thợ săn của ngươi bằng cách hạ gục 5 con.",
        type: "KILL",
        target: "minecraft:polar_bear",
        amount: 5,
        rewards: {
          xp: 750,
          nguyen_thach: 290,
          itemPool: "EASY_FOOD_REWARDS",
        },
      },
      {
        id: "NORMAL_COLLECT_GUNPOWDER_STACK",
        title: "Chuyên Gia Chất Nổ",
        description:
          "Thuốc súng rất hữu ích để chế tạo TNT hoặc pháo hoa. Hãy săn Creeper một cách có hệ thống và thu thập đủ 32 thuốc súng.",
        type: "COLLECT",
        target: "minecraft:gunpowder",
        amount: 32,
        rewards: {
          xp: 650,
          nguyen_thach: 240,
          itemPool: "EASY_COMBAT_REWARDS",
        },
      },
      {
        id: "NORMAL_DIAMOND_FEVER",
        title: "Cơn Sốt Dưới Lòng Đất",
        description:
          "Kim Cương, nước mắt kết tinh của các vị thần. Hãy thách thức bóng tối, bất chấp nguy hiểm để mang về 5 viên.",
        type: "COLLECT",
        target: "minecraft:diamond",
        amount: 5,
        rewards: {
          xp: 600,
          nguyen_thach: 200,
          itemPool: "NORMAL_DIAMOND_REWARDS",
        },
      },
      {
        id: "NORMAL_NETHER_RITUAL",
        title: "Nghi Lễ Vượt Cổng",
        description:
          "Một học giả cần 10 HẮC DIỆN THẠCH và một DỤNG CỤ ĐÁNH LỬA để mở cánh cổng dẫn đến thế giới khác.",
        type: "COLLECT_MULTIPLE", // Đã đúng
        targets: [
          { id: "minecraft:obsidian", amount: 10 },
          { id: "minecraft:flint_and_steel", amount: 1 },
        ],
        amount: 11,
        rewards: {
          xp: 500,
          nguyen_thach: 145,
          itemPool: "NORMAL_DIAMOND_REWARDS",
        },
      },
      {
        id: "NORMAL_BLAZE_HUNT",
        title: "Điệu Nhảy Của Lửa",
        description:
          "Trong các Pháo Đài Nether, những linh hồn lửa nhảy múa không ngừng. Lấy đi vũ khí của chúng: 8 QUE QUỶ LỬA.",
        type: "COLLECT",
        target: "minecraft:blaze_rod",
        amount: 8,
        rewards: {
          xp: 750,
          nguyen_thach: 290,
          itemPool: "HARD_NETHER_REWARDS",
        },
      },
      {
        id: "NORMAL_POTION_MASTER",
        title: "Nước Mắt Kẻ Ruồng Bỏ",
        description:
          "Bậc thầy độc dược trả giá cao cho 2 NƯỚC MẮT GHAST. Bà ta nói rằng nỗi đau của chúng là nguyên liệu hoàn hảo.",
        type: "COLLECT",
        target: "minecraft:ghast_tear",
        amount: 2,
        rewards: {
          xp: 800,
          nguyen_thach: 300,
          itemPool: "HARD_NETHER_REWARDS",
        },
      },
      {
        id: "NORMAL_IRON_WILL",
        title: "Ý Chí Sắt Đá",
        description:
          "Để đối mặt với những thử thách lớn hơn, thân thể ngươi phải được bọc trong sắt. SỞ HỮU MỘT BỘ GIÁP SẮT hoàn chỉnh.", // SỬA MÔ TẢ: "Chế tạo" -> "Sở hữu" cho logic COLLECT
        type: "COLLECT_MULTIPLE", // SỬA LOGIC: "CRAFT_MULTIPLE" -> "COLLECT_MULTIPLE"
        targets: [
          { id: "minecraft:iron_helmet", amount: 1 },
          { id: "minecraft:iron_chestplate", amount: 1 },
          { id: "minecraft:iron_leggings", amount: 1 },
          { id: "minecraft:iron_boots", amount: 1 },
        ],
        amount: 4,
        rewards: {
          xp: 600,
          nguyen_thach: 280,
          itemPool: "NORMAL_COMBAT_REWARDS",
        },
      },
      {
        id: "NORMAL_ENCHANTER",
        title: "Đánh Thức Ma Thuật",
        description:
          "Sức mạnh thực sự nằm trong những từ ngữ cổ. SỞ HỮU một BÀN PHÙ PHÉP, và 15 KỆ SÁCH để khuếch đại sức mạnh.", // SỬA MÔ TẢ
        type: "COLLECT_MULTIPLE", // Đã đúng
        targets: [
          { id: "minecraft:enchanting_table", amount: 1 },
          { id: "minecraft:bookshelf", amount: 15 },
        ],
        amount: 16,
        rewards: {
          xp: 900,
          nguyen_thach: 400,
          itemPool: "NORMAL_DIAMOND_REWARDS",
        },
      },
      {
        id: "NORMAL_DEEP_DIVE",
        title: "Canh Gác Cổ Đại",
        description:
          "Đền thờ dưới đáy biển được canh giữ bởi những Guardian. Hãy chứng tỏ ngươi không phải kẻ xâm phạm. TIÊU DIỆT 8 GUARDIAN.",
        type: "KILL",
        target: "minecraft:guardian",
        amount: 8,
        rewards: {
          xp: 950,
          nguyen_thach: 420,
          itemPool: "HARD_NETHER_REWARDS",
        },
      },
      {
        id: "NORMAL_RAID_LEADER",
        title: "Kẻ Tiên Phong",
        description:
          "Những kẻ cướp bóc (Illager) đang do thám vùng đất này. Hãy tìm và tiêu diệt một tên THỦ LĨNH CƯỚP BÓC.", // SỬA MÔ TẢ
        type: "KILL", // SỬA LOGIC: Nhiệm vụ này yêu cầu giết một mob cụ thể
        target: "minecraft:pillager", // Target vẫn là pillager, logic giết đội trưởng cần script riêng, hiện tại chấp nhận giết pillager thường
        amount: 1, // Chỉ cần 1 tên
        rewards: {
          xp: 900,
          nguyen_thach: 300,
          itemPool: "NORMAL_COMBAT_REWARDS",
        },
      },
      {
        id: "NORMAL_ENDER_PEARLS",
        title: "Con Mắt Của Hư Không",
        description:
          "Chúng nắm giữ bí mật của dịch chuyển. Săn lùng những bóng ma cao lêu nghêu và thu thập 16 NGỌC ENDER.",
        type: "COLLECT",
        target: "minecraft:ender_pearl",
        amount: 16,
        rewards: { xp: 900, nguyen_thach: 280, itemPool: "HARD_END_REWARDS" },
      },
      {
        id: "NORMAL_BREEDER",
        title: "Nhân Giống",
        description:
          "Nhân rộng đàn gia súc là chìa khóa cho sự thịnh vượng. Nuôi và nhân giống thành công 3 con VẬT NUÔI.", // SỬA MÔ TẢ cho khớp logic đếm mob
        type: "BREED",
        target: "#breedable", // Target là tag mob có thể nhân giống
        amount: 3,
        rewards: { xp: 300, nguyen_thach: 150, itemPool: "EASY_FOOD_REWARDS" },
      },
      {
        id: "NORMAL_GOLD_RUSH",
        title: "Ám Ảnh Hoàng Kim",
        description:
          "Bọn Piglin trong Nether chỉ tôn thờ vàng. Nung chảy 64 THỎI VÀNG để chuẩn bị cho một cuộc trao đổi lớn.",
        type: "COLLECT",
        target: "minecraft:gold_ingot",
        amount: 64,
        rewards: {
          xp: 800,
          nguyen_thach: 400,
          itemPool: "NORMAL_MINING_REWARDS",
        },
      },
      // ---- THÊM 5 NHIỆM VỤ ĐỂ ĐỦ 16 ----
      {
        id: "NORMAL_BREW_POTION",
        title: "Nghệ Thuật Giả Kim",
        description:
          "Sức mạnh thực sự đến từ sự pha trộn. Chế tạo 3 BÌNH THUỐC SỨC MẠNH bất kỳ cấp độ nào.",
        type: "COLLECT", // Logic là thu thập
        target: "minecraft:potion",
        potion_type: "strength", // Thuộc tính đặc biệt để kiểm tra loại thuốc
        amount: 3,
        rewards: {
          xp: 550,
          nguyen_thach: 285,
          itemPool: "HARD_NETHER_REWARDS",
        },
      },
      {
        id: "NORMAL_WITHER_SKELETON_HUNT",
        title: "Bóng Ma Của Pháo Đài",
        description:
          "Trong những hành lang tăm tối của Nether, những bộ xương đen kịt lang thang. TIÊU DIỆT 15 WITHER SKELETON.",
        type: "KILL",
        target: "minecraft:wither_skeleton",
        amount: 15,
        rewards: {
          xp: 1200,
          nguyen_thach: 550,
          itemPool: "HARD_NETHER_REWARDS",
        },
      },
      {
        id: "NORMAL_EXPLORE_OCEAN_RUIN",
        title: "Di Tích Lặng Lẽ",
        description:
          "Dưới lòng đại dương, những tàn tích của một nền văn minh cổ đại đang chờ đợi được khám phá. TÌM KIẾM một di tích dưới nước.",
        type: "EXPLORE",
        target: "minecraft:ocean_ruin", // Cần logic check biome/structure
        amount: 1,
        rewards: {
          xp: 600,
          nguyen_thach: 90,
          itemPool: "NORMAL_COMBAT_REWARDS",
        },
      },
      {
        id: "NORMAL_TRADE_VILLAGER",
        title: "Thuận Mua Vừa Bán",
        description:
          "Dân làng là những thương nhân khôn ngoan. Hãy chứng tỏ khả năng giao thương của ngươi bằng cách TRAO ĐỔI với dân làng 5 lần.",
        type: "TRADE", // Cần một sự kiện lắng nghe giao dịch
        target: "minecraft:villager",
        amount: 5,
        rewards: {
          xp: 450,
          nguyen_thach: 75,
          itemPool: "NORMAL_DIAMOND_REWARDS",
        },
      },
      {
        id: "NORMAL_FISHING",
        title: "Sự Kiên Nhẫn Của Ngư Ông",
        description:
          "Đại dương ẩn giấu nhiều bí mật. Hãy kiên nhẫn và câu lên 5 CON CÁ BẤT KỲ.",
        type: "COLLECT_TAG",
        target: "#fishes",
        amount: 5,
        rewards: { xp: 350, nguyen_thach: 150, itemPool: "EASY_FOOD_REWARDS" },
      },
    ],

    // ===================================================================
    // === CẤP KHÓ (15 Nhiệm Vụ): "CHƯƠNG III - Chạm Tới Các Vì Sao" =========
    // ===================================================================
    HARD: [
      {
        id: "HARD_WITHER_RITUAL",
        title: "Nghi Lễ Của Kẻ Phản Bội",
        description:
          "Một nghi lễ hắc ám có thể ban cho sức mạnh vô song, nhưng đòi hỏi 3 ĐẦU LÂU WITHER SKELETON.", // SỬA MÔ TẢ
        type: "COLLECT",
        target: "minecraft:wither_skeleton_skull",
        amount: 3,
        rewards: { xp: 2500, nguyen_thach: 250, itemPool: "HARD_BOSS_REWARDS" },
      },
      {
        id: "HARD_SLAY_WITHER",
        title: "Khiêu Vũ Với Thần Chết",
        description:
          "Nghi lễ đã thành công, con quái vật ba đầu đang gầm thét. Đây là thử thách tối thượng. HẠ GỤC WITHER.",
        type: "KILL",
        target: "minecraft:wither",
        amount: 1,
        rewards: { xp: 5000, nguyen_thach: 350, itemPool: "HARD_BOSS_REWARDS" },
      },
      {
        id: "HARD_END_GATEWAY",
        title: "Con Đường Một Chiều",
        description:
          "Để đến tận cùng thế giới, ngươi cần những con mắt nhìn xuyên qua thực tại. CHẾ TẠO và SỞ HỮU 12 MẮT ENDER để kích hoạt cổng.", // SỬA MÔ TẢ
        type: "COLLECT", // SỬA LOGIC: Chuyển sang COLLECT để dễ kiểm tra
        target: "minecraft:eye_of_ender",
        amount: 12,
        rewards: { xp: 2000, nguyen_thach: 200, itemPool: "HARD_END_REWARDS" },
      },
      {
        id: "HARD_SLAY_DRAGON",
        title: "Nữ Hoàng Trong Xiềng Xích",
        description:
          "Rồng Ender bị giam cầm bởi những tinh thể năng lượng. Hãy phá vỡ chúng và giải thoát cho nó bằng một trận chiến vinh quang. HẠ GỤC RỒNG ENDER.",
        type: "KILL",
        target: "minecraft:ender_dragon",
        amount: 1,
        rewards: { xp: 8000, nguyen_thach: 500, itemPool: "HARD_END_REWARDS" },
      },
      {
        id: "HARD_TECH_1",
        title: "Thắp Sáng Bầu Trời",
        description:
          "Ngôi sao rơi ra từ Wither là một nguồn năng lượng vĩnh cửu. CHẾ TẠO và SỞ HỮU một ngọn HẢI ĐĂNG (BEACON).", // SỬA MÔ TẢ
        type: "COLLECT", // SỬA LOGIC: Chuyển sang COLLECT
        target: "minecraft:beacon",
        amount: 1,
        rewards: { xp: 6000, nguyen_thach: 500, itemPool: "HARD_BOSS_REWARDS" },
      },
      {
        id: "HARD_TECH_2",
        title: "Kho Báu Di Động",
        description:
          "Những thành phố trên trời được canh giữ bởi các Shulker. Vỏ của chúng là bí mật của một không gian lưu trữ vô tận. CHẾ TẠO và SỞ HỮU 2 RƯƠNG SHULKER.", // SỬA MÔ TẢ
        type: "COLLECT", // SỬA LOGIC: Chuyển sang COLLECT
        target: "minecraft:shulker_box",
        amount: 2,
        rewards: { xp: 3000, nguyen_thach: 200, itemPool: "HARD_END_REWARDS" },
      },
      {
        id: "HARD_EXPLORER_1",
        title: "Đôi Cánh Của Kẻ Sa Ngã",
        description:
          "Trong những con thuyền bay lơ lửng, một báu vật vô giá đang chờ đợi. Lấy lại đôi cánh ELYTRA đã mất.",
        type: "COLLECT",
        target: "minecraft:elytra",
        amount: 1,
        rewards: { xp: 4000, nguyen_thach: 400, itemPool: "HARD_END_REWARDS" },
      },
      {
        id: "HARD_EXPLORER_2",
        title: "Bảo Vật Bất Tử",
        description:
          "Các pháp sư Illager nắm giữ một ma thuật có thể đánh lừa tử thần. Hãy đối mặt với chúng trong một trận đột kích hoặc tìm đến tận sào huyệt để giành lấy một VẬT TỔ BẤT TỬ.",
        type: "COLLECT",
        target: "minecraft:totem_of_undying",
        amount: 1,
        rewards: { xp: 3500, nguyen_thach: 300, itemPool: "HARD_BOSS_REWARDS" },
      },
      {
        id: "HARD_MINING_1",
        title: "Di Sản Bị Lãng Quên",
        description:
          "Loại kim loại mạnh nhất không thể được khai thác, mà phải được rèn lại từ MẢNH VỠ CỔ ĐẠI để có 1 THỎI NETHERITE.", // SỬA MÔ TẢ
        type: "COLLECT", // SỬA LOGIC
        target: "minecraft:netherite_ingot",
        amount: 1,
        rewards: { xp: 4500, nguyen_thach: 450, itemPool: "HARD_BOSS_REWARDS" },
      },
      {
        id: "HARD_WARRIOR_1",
        title: "Cơn Thịnh Nộ Của Bastion",
        description:
          "Vệ binh trung thành nhất của Piglin, những Piglin Brute không biết sợ hãi. CHINH PHỤC một phế tích và hạ gục 3 tên trong số chúng.",
        type: "KILL",
        target: "minecraft:piglin_brute",
        amount: 3,
        rewards: {
          xp: 2800,
          nguyen_thach: 280,
          itemPool: "HARD_NETHER_REWARDS",
        },
      },
      {
        id: "HARD_BOSS_3",
        title: "Kẻ Gác Đền Già Nua",
        description:
          "Ba anh em Elder Guardian đã canh giữ Đài Tưởng Niệm Đại Dương hàng ngàn năm. Hãy cho chúng được yên nghỉ. HẠ GỤC cả 3 con.",
        type: "KILL",
        target: "minecraft:elder_guardian",
        amount: 3,
        rewards: { xp: 4500, nguyen_thach: 450, itemPool: "HARD_END_REWARDS" },
      },
      {
        id: "HARD_GEAR_UP",
        title: "Chiến Binh Bất Bại",
        description:
          "Netherite là đỉnh cao của sự phòng thủ. SỞ HỮU một bộ GIÁP NETHERITE hoàn chỉnh để trở thành bất khả chiến bại.", // SỬA MÔ TẢ
        type: "COLLECT_MULTIPLE", // SỬA LOGIC
        targets: [
          { id: "minecraft:netherite_helmet", amount: 1 },
          { id: "minecraft:netherite_chestplate", amount: 1 },
          { id: "minecraft:netherite_leggings", amount: 1 },
          { id: "minecraft:netherite_boots", amount: 1 },
        ],
        amount: 4,
        rewards: { xp: 7000, nguyen_thach: 500, itemPool: "HARD_BOSS_REWARDS" },
      },
      {
        id: "HARD_DEEP_DARK",
        title: "Thì Thầm Từ Vực Sâu",
        description:
          "Nơi sâu nhất của thế giới, một sinh vật mù lòa đang lắng nghe. Đánh thức và HẠ GỤC WARDEN nếu ngươi dám.",
        type: "KILL",
        target: "minecraft:warden",
        amount: 1,
        rewards: { xp: 9000, nguyen_thach: 700, itemPool: "HARD_END_REWARDS" },
      },
      // ---- THÊM 2 NHIỆM VỤ ĐỂ ĐỦ 15 ----
      {
        id: "HARD_PHANTOM_MENACE",
        title: "Cơn Ác Mộng Từ Bầu Trời",
        description:
          "Khi ngươi quên đi giấc ngủ, bầu trời sẽ cử đến những con quái vật trừng phạt. Thu thập 64 MÀNG PHANTOM.",
        type: "COLLECT",
        target: "minecraft:phantom_membrane",
        amount: 64,
        rewards: { xp: 3200, nguyen_thach: 250, itemPool: "HARD_END_REWARDS" },
      },
      {
        id: "HARD_DRAGON_BREATH",
        title: "Hơi Thở Của Rồng",
        description:
          "Hơi thở của Ender Dragon là một loại ma thuật mạnh mẽ. Hãy dũng cảm đối mặt với nó và thu thập 5 LỌ HƠI THỞ CỦA RỒNG.",
        type: "COLLECT",
        target: "minecraft:dragon_breath",
        amount: 5,
        rewards: { xp: 4800, nguyen_thach: 400, itemPool: "HARD_END_REWARDS" },
      },
    ],
  },

  REWARD_POOLS: {
    // === CẬP NHẬT LẦN 3: "PHIÊN BẢN ỔN ĐỊNH & LIỀU LĨNH" ===
    // Mục tiêu: Áp dụng cú pháp "data value" chính xác cho tất cả các loại thuốc.
    // Thay thế tất cả các phần thưởng không chắc chắn (sách enchant, trứng mob...) bằng
    // các tài nguyên giá trị (Sắt, Vàng, Kim Cương) để đảm bảo hệ thống hoạt động 100%.

    // =================== CẤP DỄ: "Dụng Cụ Của Kẻ Sống Sót" ===================
    EASY_SURVIVAL_REWARDS: [
      // --- 14 Lựa chọn An toàn ---
      () => new ItemStack("minecraft:iron_ingot", 5),
      () => new ItemStack("minecraft:torch", 24),
      () => new ItemStack("minecraft:string", 8),
      () => new ItemStack("minecraft:book", 2),
      () => new ItemStack("minecraft:charcoal", 8),
      () => new ItemStack("minecraft:oak_boat", 1),
      () => new ItemStack("minecraft:glass", 10),
      () => new ItemStack("minecraft:ladder", 16),
      () => new ItemStack("minecraft:flint_and_steel", 1),
      () => new ItemStack("minecraft:lead", 2),
      () => new ItemStack("minecraft:stone_bricks", 32),
      () => new ItemStack("minecraft:scaffolding", 16),
      () => new ItemStack("minecraft:copper_ingot", 10), // Thay thế bundle (dễ lỗi)
      () => new ItemStack("minecraft:spyglass", 1),
      // --- ★★★ PHẦN THƯỞNG VIP ★★★ ---
      () => new ItemStack("minecraft:lava_bucket", 1), // [VIP] Nguồn nhiên liệu vô tận & nguyên liệu obsidian cực giá trị.
      () => new ItemStack("minecraft:iron_pickaxe", 1), // [VIP] Bước nhảy vọt về công cụ, tiết kiệm sắt và thời gian.
    ],

    EASY_FOOD_REWARDS: [
      // --- 14 Lựa chọn An toàn ---
      () => new ItemStack("minecraft:cooked_beef", 8),
      () => new ItemStack("minecraft:bone_meal", 12),
      () => new ItemStack("minecraft:bucket", 1),
      () => new ItemStack("minecraft:golden_carrot", 3),
      () => new ItemStack("minecraft:iron_hoe", 1),
      () => new ItemStack("minecraft:wheat", 24),
      () => new ItemStack("minecraft:baked_potato", 10),
      () => new ItemStack("minecraft:fishing_rod", 1),
      () => new ItemStack("minecraft:cake", 1),
      () => new ItemStack("minecraft:pumpkin_pie", 8),
      () => new ItemStack("minecraft:sweet_berries", 16),
      () => new ItemStack("minecraft:hay_block", 4),
      () => new ItemStack("minecraft:composter", 1),
      () => new ItemStack("minecraft:bee_nest", 1),
      // --- ★★★ PHẦN THƯỞNG VIP ★★★ ---
      () => new ItemStack("minecraft:axolotl_bucket", 1), // [VIP] Một người bạn đồng hành mạnh mẽ dưới nước.
      () => new ItemStack("minecraft:golden_apple", 2), // [VIP] "Phao cứu sinh" không bao giờ là thừa.
    ],

    EASY_COMBAT_REWARDS: [
      // --- 8 Lựa chọn An toàn & Sửa lỗi Thuốc ---
      () => new ItemStack("minecraft:iron_sword", 1),
      () => new ItemStack("minecraft:arrow", 16),
      () => new ItemStack("minecraft:shield", 1),
      () => new ItemStack("minecraft:bow", 1),
      () => new ItemStack("minecraft:iron_chestplate", 1),
      () => new ItemStack("minecraft:iron_axe", 1),
      () => new ItemStack("minecraft:potion", 1, 21), // SỬA LỖI: Potion of Healing (Hồi máu)
      () => new ItemStack("minecraft:splash_potion", 1, 32), // SỬA LỖI: Splash Potion of Harming (Sát thương)
      // --- 6 Lựa chọn An toàn Mới Thêm ---
      () => new ItemStack("minecraft:chainmail_boots", 1),
      () => new ItemStack("minecraft:crossbow", 1),
      () => new ItemStack("minecraft:fire_charge", 3),
      () => new ItemStack("minecraft:iron_helmet", 1),
      () => new ItemStack("minecraft:iron_leggings", 1),
      () => new ItemStack("minecraft:gold_ingot", 8),
      // --- ★★★ PHẦN THƯỞNG VIP ★★★ ---
      () => new ItemStack("minecraft:diamond", 1), // [VIP] Phần thưởng quý giá, mở ra một kỷ nguyên mới.
      () => new ItemStack("minecraft:diamond_sword", 1), // [VIP][THAY THẾ] Thay Sách Enchant bằng một thanh kiếm kim cương xịn.
    ],

    // =================== CẤP THƯỜNG: "Trang Bị Của Kẻ Khai Phá" ===================
    NORMAL_MINING_REWARDS: [
      // --- 7 Lựa chọn An toàn & Sửa lỗi Thuốc ---
      () => new ItemStack("minecraft:diamond", 2),
      () => new ItemStack("minecraft:lapis_lazuli", 24),
      () => new ItemStack("minecraft:gold_ingot", 10),
      () => new ItemStack("minecraft:tnt", 5),
      () => new ItemStack("minecraft:redstone", 48),
      () => new ItemStack("minecraft:potion", 1, 13), // SỬA LỖI: Potion of Fire Resistance (Kháng lửa)
      () => new ItemStack("minecraft:amethyst_shard", 8),
      () => new ItemStack("minecraft:observer", 2),
      // --- 6 Lựa chọn An toàn Mới Thêm ---
      () => new ItemStack("minecraft:sticky_piston", 2),
      () => new ItemStack("minecraft:slime_block", 2),
      () => new ItemStack("minecraft:copper_block", 8),
      () => new ItemStack("minecraft:glow_ink_sac", 8),
      () => new ItemStack("minecraft:minecart", 1),
      () => new ItemStack("minecraft:rail", 32),
      // --- ★★★ PHẦN THƯỞNG VIP ★★★ ---
      () => new ItemStack("minecraft:ancient_debris", 1), // [VIP] Cả một gia tài! Mở khóa Netherite.
      () => new ItemStack("minecraft:diamond_pickaxe", 1), // [VIP][THAY THẾ] Thay Sách Enchant bằng Cúp Kim Cương.
    ],

    NORMAL_COMBAT_REWARDS: [
      // --- 7 Lựa chọn An toàn & Sửa lỗi Thuốc ---
      () => new ItemStack("minecraft:diamond", 3),
      () => new ItemStack("minecraft:golden_apple", 3),
      () => new ItemStack("minecraft:obsidian", 6),
      () => new ItemStack("minecraft:ender_pearl", 5),
      () => new ItemStack("minecraft:potion", 1, 5), // SỬA LỖI: Potion of Strength (Sức mạnh)
      () => new ItemStack("minecraft:diamond_sword", 1),
      () => new ItemStack("minecraft:potion", 1, 2), // SỬA LỖI: Potion of Swiftness (8:00) (Tốc độ)
      () => new ItemStack("minecraft:bell", 1),
      // --- 6 Lựa chọn An toàn Mới Thêm ---
      () => new ItemStack("minecraft:iron_block", 4), // THAY THẾ Mũi tên tẩm độc
      () => new ItemStack("minecraft:cobweb", 16),
      () => new ItemStack("minecraft:crying_obsidian", 2),
      () => new ItemStack("minecraft:diamond_chestplate", 1), // THAY THẾ Sách Enchant Protection
      () => new ItemStack("minecraft:gold_block", 2), // THAY THẾ Sách Enchant Power
      () => new ItemStack("minecraft:experience_bottle", 32),
      // --- ★★★ PHẦN THƯỞNG VIP ★★★ ---
      () => new ItemStack("minecraft:trident", 1), // [VIP] Một vũ khí cực hiếm và mạnh mẽ.
      () => new ItemStack("minecraft:totem_of_undying", 1), // [VIP] Mạng sống thứ hai, vô giá!
    ],

    NORMAL_DIAMOND_REWARDS: [
      // --- 14 Lựa chọn An toàn ---
      () => new ItemStack("minecraft:book", 10),
      () => new ItemStack("minecraft:anvil", 1),
      () => new ItemStack("minecraft:name_tag", 2),
      () => new ItemStack("minecraft:saddle", 1),
      () => new ItemStack("minecraft:diamond_horse_armor", 1),
      () => new ItemStack("minecraft:brewing_stand", 1),
      () => new ItemStack("minecraft:experience_bottle", 24),
      () => new ItemStack("minecraft:map", 1),
      () => new ItemStack("minecraft:jukebox", 1),
      () => new ItemStack("minecraft:music_disc_pigstep", 1),
      () => new ItemStack("minecraft:hopper", 2),
      () => new ItemStack("minecraft:emerald_block", 2), // THAY THẾ Trứng dân làng
      () => new ItemStack("minecraft:leather_horse_armor", 1),
      () => new ItemStack("minecraft:item_frame", 4),
      // --- ★★★ PHẦN THƯỞNG VIP ★★★ ---
      () => new ItemStack("minecraft:heart_of_the_sea", 1), // [VIP] Chìa khóa để chế tạo Conduit, cực hiếm.
      () => new ItemStack("minecraft:netherite_upgrade_smithing_template", 1), // [VIP] Vật phẩm không thể thiếu cho kỷ nguyên Netherite.
    ],

    HARD_NETHER_REWARDS: [
      // --- 14 Lựa chọn An toàn ---
      () => new ItemStack("minecraft:netherite_scrap", 2),
      () => new ItemStack("minecraft:wither_skeleton_skull", 1),
      () => new ItemStack("minecraft:diamond_block", 2), // THAY THẾ Sách Enchant Fire Protection
      () => new ItemStack("minecraft:crying_obsidian", 6),
      () => new ItemStack("minecraft:blaze_rod", 8),
      () => new ItemStack("minecraft:ghast_tear", 3),
      () => new ItemStack("minecraft:ancient_debris", 2),
      () => new ItemStack("minecraft:respawn_anchor", 1),
      () => new ItemStack("minecraft:magma_block", 32),
      () => new ItemStack("minecraft:quartz_block", 32),
      () => new ItemStack("minecraft:gold_block", 8), // THAY THẾ Sách Soul Speed
      () => new ItemStack("minecraft:gilded_blackstone", 8),
      () => new ItemStack("minecraft:warped_fungus_on_a_stick", 1),
      () => new ItemStack("minecraft:nether_wart_block", 16),
      // --- ★★★ PHẦN THƯỞNG VIP ★★★ ---
      () => new ItemStack("minecraft:netherite_ingot", 1), // [VIP] Vẫn là phần thưởng giá trị nhất.
      () => new ItemStack("minecraft:piglin_banner_pattern", 1), // [VIP] Cực hiếm, thể hiện đẳng cấp.
    ],

    HARD_BOSS_REWARDS: [
      // --- 14 Lựa chọn An toàn & Sửa lỗi Thuốc ---
      () => new ItemStack("minecraft:totem_of_undying", 2),
      () => new ItemStack("minecraft:enchanted_golden_apple", 1),
      () => new ItemStack("minecraft:beacon", 1),
      () => new ItemStack("minecraft:nether_star", 1),
      () => new ItemStack("minecraft:diamond_block", 8),
      () => new ItemStack("minecraft:netherite_scrap", 4), // THAY THẾ Sách Mending
      () => new ItemStack("minecraft:conduit", 1),
      () => new ItemStack("minecraft:sponge", 8),
      () => new ItemStack("minecraft:diamond_block", 10), // THAY THẾ Trident enchant
      () => new ItemStack("minecraft:wither_rose", 3),
      () => new ItemStack("minecraft:gold_block", 16),
      () => new ItemStack("minecraft:emerald_block", 8),
      () => new ItemStack("minecraft:nautilus_shell", 8), // THAY THẾ thuốc Turtle Master
      () => new ItemStack("minecraft:netherite_chestplate", 1),
      // --- ★★★ PHẦN THƯỞNG VIP ★★★ ---
      () => new ItemStack("minecraft:netherite_block", 1), // [VIP] Biểu tượng của sự giàu có và quyền lực.
      () => new ItemStack("minecraft:netherite_axe", 1), // [VIP][THAY THẾ] Thay Command Block bằng Rìu Netherite.
    ],

    HARD_END_REWARDS: [
      // --- 14 Lựa chọn An toàn & Sửa lỗi Thuốc ---
      () => new ItemStack("minecraft:shulker_box", 2),
      () => new ItemStack("minecraft:dragon_egg", 1),
      () => new ItemStack("minecraft:end_crystal", 4),
      () => new ItemStack("minecraft:dragon_head", 1),
      () => new ItemStack("minecraft:chorus_fruit", 32),
      () => new ItemStack("minecraft:purpur_block", 64),
      () => new ItemStack("minecraft:phantom_membrane", 48),
      () => new ItemStack("minecraft:dragon_breath", 8),
      () => new ItemStack("minecraft:end_rod", 32),
      () => new ItemStack("minecraft:popped_chorus_fruit", 32),
      () => new ItemStack("minecraft:obsidian", 64),
      () => new ItemStack("minecraft:shulker_shell", 2),
      () => new ItemStack("minecraft:lingering_potion", 1, 23), // SỬA LỖI: Lingering Potion of Healing
      () => new ItemStack("minecraft:end_stone_bricks", 64),
      // --- ★★★ PHẦN THƯỞNG VIP ★★★ ---
      () => new ItemStack("minecraft:elytra", 1), // [VIP] Luôn là phần thưởng đáng mong chờ nhất.
      () => new ItemStack("minecraft:diamond_block", 16), // [VIP][THAY THẾ] Thay Sách Enchant tối thượng bằng một lượng kim cương khổng lồ.
    ],
  },
  SELLABLE_ITEMS: {
    // CÂN BẰNG: Toàn bộ giá được giảm mạnh, dựa trên giá trị nguyên liệu thô. Logic nhất quán, chống lạm phát.
    "minecraft:dirt": 1,
    "minecraft:copper_helmet": 35,
    "minecraft:copper_chestplate": 50,
    "minecraft:copper_leggings": 45,
    "minecraft:copper_boots": 35,
    "minecraft:copper_sword": 25,
    "minecraft:copper_pickaxe": 30,
    "minecraft:copper_axe": 30,
    "minecraft:copper_shovel": 20,
    "minecraft:copper_hoe": 20,

    // ===================================================================
    // === 1. NỀN TẢNG: NGUYÊN LIỆU THÔ CƠ BẢN ============================
    // ===================================================================
    "minecraft:cobblestone": 1,
    "minecraft:stick": 1,
    "minecraft:coal": 3,
    "minecraft:raw_iron": 4,
    "minecraft:iron_ingot": 6,
    "minecraft:raw_gold": 8,
    "minecraft:gold_ingot": 12,
    "minecraft:raw_copper": 3,
    "minecraft:copper_ingot": 4,
    "minecraft:flint": 2,
    "minecraft:redstone": 5,
    "minecraft:lapis_lazuli": 15,
    "minecraft:quartz": 7,
    "minecraft:glowstone_dust": 8,
    "minecraft:diamond": 100,
    "minecraft:emerald": 80,
    "minecraft:amethyst_shard": 20,
    "minecraft:ancient_debris": 150,
    "minecraft:netherite_scrap": 180,
    "minecraft:netherite_ingot": 750,
    "minecraft:breeze_rod": 120,
    "minecraft:heavy_core": 800,
    "minecraft:echo_shard": 200,

    // ===================================================================
    // === 2. KHỐI TÀI NGUYÊN & XÂY DỰNG CAO CẤP =========================
    // ===================================================================
    "minecraft:iron_block": 54,
    "minecraft:gold_block": 108,
    "minecraft:diamond_block": 900,
    "minecraft:emerald_block": 720,
    "minecraft:netherite_block": 6750,
    "minecraft:lapis_block": 135,
    "minecraft:redstone_block": 45,
    "minecraft:coal_block": 27,
    "minecraft:copper_block": 36,
    "minecraft:obsidian": 10,
    "minecraft:crying_obsidian": 40,
    "minecraft:glowstone": 32,
    "minecraft:sea_lantern": 50,
    "minecraft:sponge": 400,
    "minecraft:wet_sponge": 300,
    "minecraft:reinforced_deepslate": 0,
    "minecraft:prismarine_shard": 10,
    "minecraft:prismarine_crystals": 12,
    "minecraft:prismarine": 45,
    "minecraft:prismarine_bricks": 100,
    "minecraft:dark_prismarine": 95,
    "minecraft:end_stone": 2,
    "minecraft:end_stone_bricks": 8,
    "minecraft:chorus_plant": 3,
    "minecraft:chorus_flower": 5,
    "minecraft:purpur_block": 15,
    "minecraft:purpur_pillar": 15,
    "minecraft:purpur_stairs": 12,
    "minecraft:purpur_slab": 8,
    "minecraft:waxed_copper_block": 40,
    "minecraft:exposed_copper": 34,
    "minecraft:weathered_copper": 32,
    "minecraft:oxidized_copper": 30,
    "minecraft:cut_copper": 38,
    "minecraft:cut_copper_stairs": 28,
    "minecraft:cut_copper_slab": 19,
    "minecraft:lightning_rod": 15,
    "minecraft:copper_bulb": 18,
    "minecraft:waxed_copper_bulb": 22,
    "minecraft:chiseled_copper": 10,
    "minecraft:copper_grate": 10,
    "minecraft:copper_door": 12,
    "minecraft:copper_trapdoor": 10,
    "minecraft:tuff": 2,
    "minecraft:chiseled_tuff": 5,
    "minecraft:polished_tuff": 4,
    "minecraft:tuff_bricks": 8,
    "minecraft:chiseled_tuff_bricks": 12,
    "minecraft:trial_spawner": 0,
    "minecraft:vault": 0,
    "minecraft:ominous_trial_key": 500,
    "minecraft:trial_key": 250,

    // ===================================================================
    // === 3. KHỐI XÂY DỰNG CƠ BẢN ========================================
    // ===================================================================
    "minecraft:oak_log": 5,
    "minecraft:spruce_log": 5,
    "minecraft:birch_log": 5,
    "minecraft:jungle_log": 6,
    "minecraft:acacia_log": 5,
    "minecraft:dark_oak_log": 7,
    "minecraft:mangrove_log": 8,
    "minecraft:cherry_log": 10,
    "minecraft:bamboo_block": 20,
    "minecraft:oak_planks": 2,
    "minecraft:spruce_planks": 2,
    "minecraft:birch_planks": 2,
    "minecraft:jungle_planks": 2,
    "minecraft:acacia_planks": 2,
    "minecraft:dark_oak_planks": 2,
    "minecraft:mangrove_planks": 3,
    "minecraft:cherry_planks": 3,
    "minecraft:bamboo_planks": 5,
    "minecraft:stone": 2,
    "minecraft:mossy_cobblestone": 5,
    "minecraft:stone_bricks": 3,
    "minecraft:mossy_stone_bricks": 8,
    "minecraft:cracked_stone_bricks": 3,
    "minecraft:chiseled_stone_bricks": 4,
    "minecraft:smooth_stone": 3,
    "minecraft:granite": 2,
    "minecraft:diorite": 2,
    "minecraft:andesite": 2,
    "minecraft:polished_granite": 3,
    "minecraft:polished_diorite": 3,
    "minecraft:polished_andesite": 3,
    "minecraft:deepslate": 3,
    "minecraft:cobbled_deepslate": 2,
    "minecraft:polished_deepslate": 4,
    "minecraft:deepslate_bricks": 6,
    "minecraft:deepslate_tiles": 7,
    "minecraft:chiseled_deepslate": 8,
    "minecraft:blackstone": 4,
    "minecraft:polished_blackstone": 6,
    "minecraft:polished_blackstone_bricks": 8,
    "minecraft:chiseled_polished_blackstone": 10,
    "minecraft:cracked_polished_blackstone_bricks": 8,
    "minecraft:gilded_blackstone": 20,
    "minecraft:sand": 1,
    "minecraft:red_sand": 2,
    "minecraft:gravel": 1,
    "minecraft:clay": 3,
    "minecraft:terracotta": 4,
    "minecraft:white_terracotta": 5,
    "minecraft:orange_terracotta": 5,
    "minecraft:magenta_terracotta": 5,
    "minecraft:light_blue_terracotta": 5,
    "minecraft:yellow_terracotta": 5,
    "minecraft:lime_terracotta": 5,
    "minecraft:pink_terracotta": 5,
    "minecraft:gray_terracotta": 5,
    "minecraft:light_gray_terracotta": 5,
    "minecraft:cyan_terracotta": 5,
    "minecraft:purple_terracotta": 5,
    "minecraft:blue_terracotta": 5,
    "minecraft:brown_terracotta": 5,
    "minecraft:green_terracotta": 5,
    "minecraft:red_terracotta": 5,
    "minecraft:black_terracotta": 5,
    "minecraft:glass": 2,
    "minecraft:white_stained_glass": 3,
    "minecraft:orange_stained_glass": 3,
    "minecraft:magenta_stained_glass": 3,
    "minecraft:light_blue_stained_glass": 3,
    "minecraft:yellow_stained_glass": 3,
    "minecraft:lime_stained_glass": 3,
    "minecraft:pink_stained_glass": 3,
    "minecraft:gray_stained_glass": 3,
    "minecraft:light_gray_stained_glass": 3,
    "minecraft:cyan_stained_glass": 3,
    "minecraft:purple_stained_glass": 3,
    "minecraft:blue_stained_glass": 3,
    "minecraft:brown_stained_glass": 3,
    "minecraft:green_stained_glass": 3,
    "minecraft:red_stained_glass": 3,
    "minecraft:black_stained_glass": 3,
    "minecraft:tinted_glass": 25,

    // ===================================================================
    // === 4. TÀI NGUYÊN TỪ MOB ===========================================
    // ===================================================================
    "minecraft:rotten_flesh": 1,
    "minecraft:string": 2,
    "minecraft:spider_eye": 3,
    "minecraft:bone": 2,
    "minecraft:gunpowder": 5,
    "minecraft:arrow": 1,
    "minecraft:phantom_membrane": 40,
    "minecraft:slime_ball": 10,
    "minecraft:magma_cream": 12,
    "minecraft:ender_pearl": 30,
    "minecraft:blaze_rod": 50,
    "minecraft:ghast_tear": 100,
    "minecraft:shulker_shell": 300,
    "minecraft:nautilus_shell": 120,
    "minecraft:scute": 80,
    "minecraft:rabbit_foot": 150,
    "minecraft:rabbit_hide": 5,
    "minecraft:wither_skeleton_skull": 500,
    "minecraft:nether_star": 950,
    "minecraft:heart_of_the_sea": 400,
    "minecraft:totem_of_undying": 750,
    "minecraft:dragon_breath": 150,
    "minecraft:elytra": 900,
    "minecraft:dragon_egg": 999,
    "minecraft:dragon_head": 850,
    "minecraft:frogspawn": 20,
    "minecraft:tadpole_bucket": 40,
    "minecraft:goat_horn": 300,
    "minecraft:disc_fragment_5": 500,
    "minecraft:sculk": 10,
    "minecraft:sculk_catalyst": 500,
    "minecraft:sculk_sensor": 300,
    "minecraft:sculk_shrieker": 700,
    "minecraft:sculk_vein": 3,
    "minecraft:wind_charge": 15,
    "minecraft:ominous_bottle": 250,
    "minecraft:flow_banner_pattern": 600,
    "minecraft:guster_banner_pattern": 600,

    // ===================================================================
    // === 5. NÔNG SẢN & THỰC VẬT =========================================
    // ===================================================================
    "minecraft:wheat": 2,
    "minecraft:carrot": 2,
    "minecraft:potato": 2,
    "minecraft:beetroot": 2,
    "minecraft:sweet_berries": 2,
    "minecraft:glow_berries": 5,
    "minecraft:pumpkin": 8,
    "minecraft:carved_pumpkin": 10,
    "minecraft:jack_o_lantern": 15,
    "minecraft:melon": 9,
    "minecraft:melon_slice": 1,
    "minecraft:sugar_cane": 2,
    "minecraft:cocoa_beans": 4,
    "minecraft:nether_wart": 7,
    "minecraft:chorus_fruit": 10,
    "minecraft:popped_chorus_fruit": 12,
    "minecraft:wheat_seeds": 1,
    "minecraft:pumpkin_seeds": 2,
    "minecraft:melon_seeds": 1,
    "minecraft:beetroot_seeds": 1,
    "minecraft:torchflower_seeds": 40,
    "minecraft:pitcher_pod": 40,
    "minecraft:dandelion": 2,
    "minecraft:poppy": 2,
    "minecraft:blue_orchid": 3,
    "minecraft:allium": 3,
    "minecraft:azure_bluet": 3,
    "minecraft:red_tulip": 3,
    "minecraft:orange_tulip": 3,
    "minecraft:white_tulip": 3,
    "minecraft:pink_tulip": 3,
    "minecraft:oxeye_daisy": 3,
    "minecraft:cornflower": 4,
    "minecraft:lily_of_the_valley": 4,
    "minecraft:wither_rose": 50,
    "minecraft:sunflower": 5,
    "minecraft:lilac": 5,
    "minecraft:rose_bush": 5,
    "minecraft:peony": 5,
    "minecraft:tall_grass": 1,
    "minecraft:large_fern": 2,
    "minecraft:dead_bush": 1,
    "minecraft:sea_pickle": 5,
    "minecraft:kelp": 1,
    "minecraft:dried_kelp": 2,
    "minecraft:seagrass": 1,
    "minecraft:lily_pad": 3,
    "minecraft:vine": 2,
    "minecraft:weeping_vines": 4,
    "minecraft:twisting_vines": 4,
    "minecraft:glow_lichen": 6,
    "minecraft:moss_block": 8,
    "minecraft:moss_carpet": 2,
    "minecraft:azalea": 15,
    "minecraft:flowering_azalea": 20,
    "minecraft:azalea_leaves": 3,
    "minecraft:flowering_azalea_leaves": 4,
    "minecraft:big_dripleaf": 10,
    "minecraft:small_dripleaf": 5,
    "minecraft:spore_blossom": 150,
    "minecraft:hanging_roots": 3,
    "minecraft:rooted_dirt": 4,
    "minecraft:cave_vines": 4,
    "minecraft:mangrove_roots": 3,
    "minecraft:muddy_mangrove_roots": 4,
    "minecraft:mangrove_propagule": 25,
    "minecraft:cherry_leaves": 3,
    "minecraft:pink_petals": 1,
    "minecraft:torchflower": 80,
    "minecraft:pitcher_plant": 80,
    "minecraft:brown_mushroom": 4,
    "minecraft:red_mushroom": 4,
    "minecraft:crimson_fungus": 8,
    "minecraft:warped_fungus": 8,
    "minecraft:brown_mushroom_block": 20,
    "minecraft:red_mushroom_block": 20,
    "minecraft:mushroom_stem": 12,
    "minecraft:crimson_stem": 12,
    "minecraft:warped_stem": 12,
    "minecraft:crimson_hyphae": 10,
    "minecraft:warped_hyphae": 10,
    "minecraft:nether_wart_block": 63,
    "minecraft:warped_wart_block": 40,
    "minecraft:shroomlight": 30,
    "minecraft:leather": 8,
    "minecraft:feather": 3,
    "minecraft:chicken": 4,
    "minecraft:cooked_chicken": 6,
    "minecraft:beef": 5,
    "minecraft:cooked_beef": 7,
    "minecraft:porkchop": 5,
    "minecraft:cooked_porkchop": 7,
    "minecraft:mutton": 5,
    "minecraft:cooked_mutton": 7,
    "minecraft:rabbit": 4,
    "minecraft:cooked_rabbit": 6,
    "minecraft:cod": 3,
    "minecraft:cooked_cod": 5,
    "minecraft:salmon": 4,
    "minecraft:cooked_salmon": 6,
    "minecraft:tropical_fish": 20,
    "minecraft:pufferfish": 30,
    "minecraft:egg": 3,
    "minecraft:milk_bucket": 15,
    "minecraft:ink_sac": 4,
    "minecraft:glow_ink_sac": 15,
    "minecraft:honeycomb": 10,
    "minecraft:honey_bottle": 8,
    "minecraft:honey_block": 40,
    "minecraft:honeycomb_block": 32,
    "minecraft:white_wool": 5,
    "minecraft:orange_wool": 5,
    "minecraft:magenta_wool": 5,
    "minecraft:light_blue_wool": 5,
    "minecraft:yellow_wool": 5,
    "minecraft:lime_wool": 5,
    "minecraft:pink_wool": 5,
    "minecraft:gray_wool": 5,
    "minecraft:light_gray_wool": 5,
    "minecraft:cyan_wool": 5,
    "minecraft:purple_wool": 5,
    "minecraft:blue_wool": 5,
    "minecraft:brown_wool": 5,
    "minecraft:green_wool": 5,
    "minecraft:red_wool": 5,
    "minecraft:black_wool": 5,

    // ===================================================================
    // === 6. VẬT PHẨM CHẾ TẠO & ĐẶC BIỆT ==================================
    // ===================================================================
    "minecraft:bread": 7,
    "minecraft:cookie": 4,
    "minecraft:cake": 25,
    "minecraft:pumpkin_pie": 15,
    "minecraft:golden_carrot": 20,
    "minecraft:golden_apple": 100,
    "minecraft:enchanted_golden_apple": 900,
    "minecraft:mushroom_stew": 10,
    "minecraft:rabbit_stew": 15,
    "minecraft:beetroot_soup": 15,
    "minecraft:suspicious_stew": 30,

    "minecraft:wooden_sword": 6,
    "minecraft:wooden_pickaxe": 9,
    "minecraft:wooden_axe": 9,
    "minecraft:wooden_shovel": 4,
    "minecraft:wooden_hoe": 6,
    "minecraft:stone_sword": 6,
    "minecraft:stone_pickaxe": 7,
    "minecraft:stone_axe": 7,
    "minecraft:stone_shovel": 4,
    "minecraft:stone_hoe": 6,
    "minecraft:iron_sword": 16,
    "minecraft:iron_pickaxe": 22,
    "minecraft:iron_axe": 22,
    "minecraft:iron_shovel": 9,
    "minecraft:iron_hoe": 16,
    "minecraft:golden_sword": 28,
    "minecraft:golden_pickaxe": 40,
    "minecraft:golden_axe": 40,
    "minecraft:golden_shovel": 15,
    "minecraft:golden_hoe": 28,
    "minecraft:diamond_sword": 220,
    "minecraft:diamond_pickaxe": 330,
    "minecraft:diamond_axe": 330,
    "minecraft:diamond_shovel": 115,
    "minecraft:diamond_hoe": 220,
    "minecraft:netherite_sword": 990,
    "minecraft:netherite_pickaxe": 900,
    "minecraft:netherite_axe": 900,
    "minecraft:netherite_shovel": 800,
    "minecraft:netherite_hoe": 850,

    "minecraft:leather_helmet": 45,
    "minecraft:leather_chestplate": 70,
    "minecraft:leather_leggings": 60,
    "minecraft:leather_boots": 35,
    "minecraft:chainmail_helmet": 40,
    "minecraft:chainmail_chestplate": 60,
    "minecraft:chainmail_leggings": 50,
    "minecraft:chainmail_boots": 30,
    "minecraft:iron_helmet": 35,
    "minecraft:iron_chestplate": 55,
    "minecraft:iron_leggings": 50,
    "minecraft:iron_boots": 28,
    "minecraft:golden_helmet": 65,
    "minecraft:golden_chestplate": 105,
    "minecraft:golden_leggings": 90,
    "minecraft:golden_boots": 55,
    "minecraft:diamond_helmet": 550,
    "minecraft:diamond_chestplate": 880,
    "minecraft:diamond_leggings": 770,
    "minecraft:diamond_boots": 440,
    "minecraft:netherite_helmet": 950,
    "minecraft:netherite_chestplate": 990,
    "minecraft:netherite_leggings": 980,
    "minecraft:netherite_boots": 920,
    "minecraft:turtle_helmet": 420,

    "minecraft:bow": 10,
    "minecraft:crossbow": 15,
    "minecraft:trident": 700,
    "minecraft:shield": 10,
    "minecraft:mace": 950,

    "minecraft:experience_bottle": 20,
    "minecraft:book": 10,
    "minecraft:writable_book": 15,
    "minecraft:written_book": 15,
    "minecraft:enchanting_table": 280,
    "minecraft:bookshelf": 35,
    "minecraft:chiseled_bookshelf": 25,
    "minecraft:lectern": 20,
    "minecraft:anvil": 190,
    "minecraft:chipped_anvil": 120,
    "minecraft:damaged_anvil": 60,
    "minecraft:grindstone": 8,
    "minecraft:enchanted_book": 50,
    "minecraft:glass_bottle": 1,
    "minecraft:potion": 10,
    "minecraft:splash_potion": 12,
    "minecraft:lingering_potion": 15,
    "minecraft:brewing_stand": 55,
    "minecraft:cauldron": 42,

    "minecraft:paper": 1,
    "minecraft:map": 35,
    "minecraft:compass": 30,
    "minecraft:clock": 55,
    "minecraft:spyglass": 45,
    "minecraft:bundle": 20,
    "minecraft:shears": 12,
    "minecraft:flint_and_steel": 8,
    "minecraft:fire_charge": 10,
    "minecraft:lead": 12,
    "minecraft:name_tag": 200,
    "minecraft:saddle": 300,
    "minecraft:horse_armor_leather": 60,
    "minecraft:horse_armor_iron": 150,
    "minecraft:horse_armor_golden": 250,
    "minecraft:horse_armor_diamond": 800,

    "minecraft:bucket": 22,
    "minecraft:water_bucket": 23,
    "minecraft:lava_bucket": 25,
    "minecraft:powder_snow_bucket": 25,
    "minecraft:cod_bucket": 28,
    "minecraft:salmon_bucket": 29,
    "minecraft:tropical_fish_bucket": 45,
    "minecraft:pufferfish_bucket": 55,
    "minecraft:axolotl_bucket": 100,
    "minecraft:chest": 20,
    "minecraft:trapped_chest": 25,
    "minecraft:ender_chest": 120,
    "minecraft:shulker_box": 610,
    "minecraft:white_shulker_box": 615,
    "minecraft:orange_shulker_box": 615,
    "minecraft:magenta_shulker_box": 615,
    "minecraft:light_blue_shulker_box": 615,
    "minecraft:yellow_shulker_box": 615,
    "minecraft:lime_shulker_box": 615,
    "minecraft:pink_shulker_box": 615,
    "minecraft:gray_shulker_box": 615,
    "minecraft:light_gray_shulker_box": 615,
    "minecraft:cyan_shulker_box": 615,
    "minecraft:purple_shulker_box": 615,
    "minecraft:blue_shulker_box": 615,
    "minecraft:brown_shulker_box": 615,
    "minecraft:green_shulker_box": 615,
    "minecraft:red_shulker_box": 615,
    "minecraft:black_shulker_box": 615,
    "minecraft:barrel": 15,

    "minecraft:redstone_torch": 6,
    "minecraft:lever": 3,
    "minecraft:stone_button": 2,
    "minecraft:oak_button": 2,
    "minecraft:stone_pressure_plate": 4,
    "minecraft:oak_pressure_plate": 4,
    "minecraft:heavy_weighted_pressure_plate": 15,
    "minecraft:light_weighted_pressure_plate": 25,
    "minecraft:tripwire_hook": 10,
    "minecraft:repeater": 20,
    "minecraft:comparator": 25,
    "minecraft:observer": 20,
    "minecraft:piston": 15,
    "minecraft:sticky_piston": 25,
    "minecraft:dispenser": 15,
    "minecraft:dropper": 10,
    "minecraft:hopper": 50,
    "minecraft:redstone_lamp": 25,
    "minecraft:daylight_detector": 20,
    "minecraft:note_block": 15,
    "minecraft:jukebox": 115,
    "minecraft:target": 10,
    "minecraft:calibrated_sculk_sensor": 350,

    "minecraft:music_disc_13": 300,
    "minecraft:music_disc_cat": 300,
    "minecraft:music_disc_blocks": 300,
    "minecraft:music_disc_chirp": 300,
    "minecraft:music_disc_far": 300,
    "minecraft:music_disc_mall": 300,
    "minecraft:music_disc_mellohi": 300,
    "minecraft:music_disc_stal": 300,
    "minecraft:music_disc_strad": 300,
    "minecraft:music_disc_ward": 300,
    "minecraft:music_disc_11": 300,
    "minecraft:music_disc_wait": 300,
    "minecraft:music_disc_otherside": 400,
    "minecraft:music_disc_5": 500,
    "minecraft:music_disc_pigstep": 500,
    "minecraft:music_disc_relic": 500,
    "minecraft:music_disc_creator": 500,
    "minecraft:music_disc_creator_music_box": 500,
    "minecraft:music_disc_precipice": 500,

    "minecraft:white_banner": 15,
    "minecraft:orange_banner": 15,
    "minecraft:magenta_banner": 15,
    "minecraft:light_blue_banner": 15,
    "minecraft:yellow_banner": 15,
    "minecraft:lime_banner": 15,
    "minecraft:pink_banner": 15,
    "minecraft:gray_banner": 15,
    "minecraft:light_gray_banner": 15,
    "minecraft:cyan_banner": 15,
    "minecraft:purple_banner": 15,
    "minecraft:blue_banner": 15,
    "minecraft:brown_banner": 15,
    "minecraft:green_banner": 15,
    "minecraft:red_banner": 15,
    "minecraft:black_banner": 15,

    "minecraft:white_dye": 4,
    "minecraft:orange_dye": 4,
    "minecraft:magenta_dye": 4,
    "minecraft:light_blue_dye": 4,
    "minecraft:yellow_dye": 4,
    "minecraft:lime_dye": 4,
    "minecraft:pink_dye": 4,
    "minecraft:gray_dye": 4,
    "minecraft:light_gray_dye": 4,
    "minecraft:cyan_dye": 4,
    "minecraft:purple_dye": 4,
    "minecraft:blue_dye": 4,
    "minecraft:brown_dye": 4,
    "minecraft:green_dye": 4,
    "minecraft:red_dye": 4,
    "minecraft:black_dye": 4,
    "minecraft:bone_meal": 1,

    "minecraft:creeper_banner_pattern": 300,
    "minecraft:skull_banner_pattern": 300,
    "minecraft:flower_banner_pattern": 250,
    "minecraft:mojang_banner_pattern": 500,
    "minecraft:globe_banner_pattern": 450,
    "minecraft:piglin_banner_pattern": 400,
    "minecraft:guster_banner_pattern": 450,

    "minecraft:oak_stairs": 4,
    "minecraft:spruce_stairs": 4,
    "minecraft:birch_stairs": 4,
    "minecraft:jungle_stairs": 5,
    "minecraft:acacia_stairs": 4,
    "minecraft:dark_oak_stairs": 5,
    "minecraft:mangrove_stairs": 6,
    "minecraft:cherry_stairs": 7,
    "minecraft:bamboo_stairs": 9,
    "minecraft:stone_stairs": 3,
    "minecraft:cobblestone_stairs": 2,
    "minecraft:stone_brick_stairs": 5,
    "minecraft:mossy_stone_brick_stairs": 12,
    "minecraft:granite_stairs": 4,
    "minecraft:diorite_stairs": 4,
    "minecraft:andesite_stairs": 4,
    "minecraft:polished_granite_stairs": 5,
    "minecraft:polished_diorite_stairs": 5,
    "minecraft:polished_andesite_stairs": 5,
    "minecraft:deepslate_brick_stairs": 9,
    "minecraft:deepslate_tile_stairs": 11,
    "minecraft:polished_deepslate_stairs": 6,
    "minecraft:cobbled_deepslate_stairs": 4,
    "minecraft:blackstone_stairs": 6,
    "minecraft:polished_blackstone_stairs": 9,
    "minecraft:polished_blackstone_brick_stairs": 12,
    "minecraft:brick_stairs": 9,
    "minecraft:nether_brick_stairs": 8,
    "minecraft:red_nether_brick_stairs": 10,
    "minecraft:sandstone_stairs": 5,
    "minecraft:smooth_sandstone_stairs": 6,
    "minecraft:red_sandstone_stairs": 6,
    "minecraft:smooth_red_sandstone_stairs": 7,
    "minecraft:quartz_stairs": 20,
    "minecraft:smooth_quartz_stairs": 22,
    "minecraft:prismarine_stairs": 20,
    "minecraft:prismarine_brick_stairs": 25,
    "minecraft:dark_prismarine_stairs": 30,
    "minecraft:end_stone_brick_stairs": 12,
    "minecraft:mud_brick_stairs": 6,
    "minecraft:waxed_cut_copper_stairs": 8,

    "minecraft:oak_slab": 2,
    "minecraft:spruce_slab": 2,
    "minecraft:birch_slab": 2,
    "minecraft:jungle_slab": 2,
    "minecraft:acacia_slab": 2,
    "minecraft:dark_oak_slab": 2,
    "minecraft:mangrove_slab": 2,
    "minecraft:cherry_slab": 3,
    "minecraft:bamboo_slab": 3,
    "minecraft:stone_slab": 1,
    "minecraft:cobblestone_slab": 1,
    "minecraft:stone_brick_slab": 2,
    "minecraft:mossy_stone_brick_slab": 5,
    "minecraft:granite_slab": 1,
    "minecraft:diorite_slab": 1,
    "minecraft:andesite_slab": 1,
    "minecraft:polished_granite_slab": 2,
    "minecraft:polished_diorite_slab": 2,
    "minecraft:polished_andesite_slab": 2,
    "minecraft:deepslate_brick_slab": 3,
    "minecraft:deepslate_tile_slab": 4,
    "minecraft:polished_deepslate_slab": 2,
    "minecraft:cobbled_deepslate_slab": 1,
    "minecraft:blackstone_slab": 2,
    "minecraft:polished_blackstone_slab": 3,
    "minecraft:polished_blackstone_brick_slab": 4,
    "minecraft:brick_slab": 3,
    "minecraft:nether_brick_slab": 3,
    "minecraft:red_nether_brick_slab": 4,
    "minecraft:sandstone_slab": 2,
    "minecraft:smooth_sandstone_slab": 2,
    "minecraft:red_sandstone_slab": 2,
    "minecraft:smooth_red_sandstone_slab": 3,
    "minecraft:quartz_slab": 7,
    "minecraft:smooth_quartz_slab": 8,
    "minecraft:prismarine_slab": 8,
    "minecraft:prismarine_brick_slab": 12,
    "minecraft:dark_prismarine_slab": 14,
    "minecraft:end_stone_brick_slab": 4,
    "minecraft:cut_copper_slab": 2,
    "minecraft:waxed_cut_copper_slab": 3,
    "minecraft:mud_brick_slab": 2,

    "minecraft:cobblestone_wall": 2,
    "minecraft:mossy_cobblestone_wall": 6,
    "minecraft:stone_brick_wall": 4,
    "minecraft:mossy_stone_brick_wall": 9,
    "minecraft:granite_wall": 3,
    "minecraft:diorite_wall": 3,
    "minecraft:andesite_wall": 3,
    "minecraft:deepslate_brick_wall": 7,
    "minecraft:deepslate_tile_wall": 8,
    "minecraft:polished_deepslate_wall": 5,
    "minecraft:cobbled_deepslate_wall": 3,
    "minecraft:blackstone_wall": 5,
    "minecraft:polished_blackstone_wall": 7,
    "minecraft:polished_blackstone_brick_wall": 9,
    "minecraft:brick_wall": 6,
    "minecraft:nether_brick_wall": 6,
    "minecraft:red_nether_brick_wall": 8,
    "minecraft:sandstone_wall": 3,
    "minecraft:red_sandstone_wall": 4,
    "minecraft:end_stone_brick_wall": 9,
    "minecraft:prismarine_wall": 16,
    "minecraft:mud_brick_wall": 4,

    "minecraft:oak_fence": 4,
    "minecraft:spruce_fence": 4,
    "minecraft:birch_fence": 4,
    "minecraft:jungle_fence": 4,
    "minecraft:acacia_fence": 4,
    "minecraft:dark_oak_fence": 4,
    "minecraft:mangrove_fence": 5,
    "minecraft:cherry_fence": 5,
    "minecraft:bamboo_fence": 6,
    "minecraft:nether_brick_fence": 6,
    "minecraft:crimson_fence": 7,
    "minecraft:warped_fence": 7,

    "minecraft:oak_fence_gate": 8,
    "minecraft:spruce_fence_gate": 8,
    "minecraft:birch_fence_gate": 8,
    "minecraft:jungle_fence_gate": 8,
    "minecraft:acacia_fence_gate": 8,
    "minecraft:dark_oak_fence_gate": 8,
    "minecraft:mangrove_fence_gate": 10,
    "minecraft:cherry_fence_gate": 10,
    "minecraft:bamboo_fence_gate": 14,
    "minecraft:crimson_fence_gate": 15,
    "minecraft:warped_fence_gate": 15,

    "minecraft:oak_door": 4,
    "minecraft:spruce_door": 4,
    "minecraft:birch_door": 4,
    "minecraft:jungle_door": 4,
    "minecraft:acacia_door": 4,
    "minecraft:dark_oak_door": 4,
    "minecraft:mangrove_door": 6,
    "minecraft:cherry_door": 6,
    "minecraft:bamboo_door": 10,
    "minecraft:crimson_door": 8,
    "minecraft:warped_door": 8,
    "minecraft:iron_door": 38,
    "minecraft:waxed_copper_door": 32,
    "minecraft:exposed_copper_door": 30,
    "minecraft:weathered_copper_door": 29,
    "minecraft:oxidized_copper_door": 28,

    "minecraft:oak_trapdoor": 6,
    "minecraft:spruce_trapdoor": 6,
    "minecraft:birch_trapdoor": 6,
    "minecraft:jungle_trapdoor": 6,
    "minecraft:acacia_trapdoor": 6,
    "minecraft:dark_oak_trapdoor": 6,
    "minecraft:mangrove_trapdoor": 9,
    "minecraft:cherry_trapdoor": 9,
    "minecraft:bamboo_trapdoor": 15,
    "minecraft:crimson_trapdoor": 12,
    "minecraft:warped_trapdoor": 12,
    "minecraft:iron_trapdoor": 28,
    "minecraft:waxed_copper_trapdoor": 22,
    "minecraft:exposed_copper_trapdoor": 20,
    "minecraft:weathered_copper_trapdoor": 19,
    "minecraft:oxidized_copper_trapdoor": 18,

    "minecraft:oak_sign": 5,
    "minecraft:spruce_sign": 5,
    "minecraft:birch_sign": 5,
    "minecraft:jungle_sign": 5,
    "minecraft:acacia_sign": 5,
    "minecraft:dark_oak_sign": 5,
    "minecraft:mangrove_sign": 7,
    "minecraft:cherry_sign": 7,
    "minecraft:bamboo_sign": 11,
    "minecraft:crimson_sign": 8,
    "minecraft:warped_sign": 8,
    "minecraft:oak_hanging_sign": 7,
    "minecraft:spruce_hanging_sign": 7,
    "minecraft:birch_hanging_sign": 7,
    "minecraft:jungle_hanging_sign": 7,
    "minecraft:acacia_hanging_sign": 7,
    "minecraft:dark_oak_hanging_sign": 7,
    "minecraft:mangrove_hanging_sign": 9,
    "minecraft:cherry_hanging_sign": 9,
    "minecraft:bamboo_hanging_sign": 12,
    "minecraft:crimson_hanging_sign": 9,
    "minecraft:warped_hanging_sign": 9,

    "minecraft:netherrack": 1,
    "minecraft:nether_bricks": 4,
    "minecraft:chiseled_nether_bricks": 6,
    "minecraft:cracked_nether_bricks": 4,
    "minecraft:crimson_nylium": 5,
    "minecraft:warped_nylium": 5,
    "minecraft:crimson_roots": 2,
    "minecraft:warped_roots": 2,
    "minecraft:nether_sprouts": 2,
    "minecraft:soul_sand": 3,
    "minecraft:soul_soil": 3,
    "minecraft:basalt": 3,
    "minecraft:polished_basalt": 6,
    "minecraft:soul_torch": 5,
    "minecraft:soul_lantern": 18,

    "minecraft:white_concrete": 8,
    "minecraft:orange_concrete": 8,
    "minecraft:magenta_concrete": 8,
    "minecraft:light_blue_concrete": 8,
    "minecraft:yellow_concrete": 8,
    "minecraft:lime_concrete": 8,
    "minecraft:pink_concrete": 8,
    "minecraft:gray_concrete": 8,
    "minecraft:light_gray_concrete": 8,
    "minecraft:cyan_concrete": 8,
    "minecraft:purple_concrete": 8,
    "minecraft:blue_concrete": 8,
    "minecraft:brown_concrete": 8,
    "minecraft:green_concrete": 8,
    "minecraft:red_concrete": 8,
    "minecraft:black_concrete": 8,
    "minecraft:white_concrete_powder": 6,
    "minecraft:orange_concrete_powder": 6,
    "minecraft:magenta_concrete_powder": 6,
    "minecraft:light_blue_concrete_powder": 6,
    "minecraft:yellow_concrete_powder": 6,
    "minecraft:lime_concrete_powder": 6,
    "minecraft:pink_concrete_powder": 6,
    "minecraft:gray_concrete_powder": 6,
    "minecraft:light_gray_concrete_powder": 6,
    "minecraft:cyan_concrete_powder": 6,
    "minecraft:purple_concrete_powder": 6,
    "minecraft:blue_concrete_powder": 6,
    "minecraft:brown_concrete_powder": 6,
    "minecraft:green_concrete_powder": 6,
    "minecraft:red_concrete_powder": 6,
    "minecraft:black_concrete_powder": 6,

    "minecraft:white_glazed_terracotta": 6,
    "minecraft:orange_glazed_terracotta": 6,
    "minecraft:magenta_glazed_terracotta": 6,
    "minecraft:light_blue_glazed_terracotta": 6,
    "minecraft:yellow_glazed_terracotta": 6,
    "minecraft:lime_glazed_terracotta": 6,
    "minecraft:pink_glazed_terracotta": 6,
    "minecraft:gray_glazed_terracotta": 6,
    "minecraft:light_gray_glazed_terracotta": 6,
    "minecraft:cyan_glazed_terracotta": 6,
    "minecraft:purple_glazed_terracotta": 6,
    "minecraft:blue_glazed_terracotta": 6,
    "minecraft:brown_glazed_terracotta": 6,
    "minecraft:green_glazed_terracotta": 6,
    "minecraft:red_glazed_terracotta": 6,
    "minecraft:black_glazed_terracotta": 6,

    "minecraft:white_carpet": 2,
    "minecraft:orange_carpet": 2,
    "minecraft:magenta_carpet": 2,
    "minecraft:light_blue_carpet": 2,
    "minecraft:yellow_carpet": 2,
    "minecraft:lime_carpet": 2,
    "minecraft:pink_carpet": 2,
    "minecraft:gray_carpet": 2,
    "minecraft:light_gray_carpet": 2,
    "minecraft:cyan_carpet": 2,
    "minecraft:purple_carpet": 2,
    "minecraft:blue_carpet": 2,
    "minecraft:brown_carpet": 2,
    "minecraft:green_carpet": 2,
    "minecraft:red_carpet": 2,
    "minecraft:black_carpet": 2,

    "minecraft:glass_pane": 1,
    "minecraft:white_stained_glass_pane": 1,
    "minecraft:orange_stained_glass_pane": 1,
    "minecraft:magenta_stained_glass_pane": 1,
    "minecraft:light_blue_stained_glass_pane": 1,
    "minecraft:yellow_stained_glass_pane": 1,
    "minecraft:lime_stained_glass_pane": 1,
    "minecraft:pink_stained_glass_pane": 1,
    "minecraft:gray_stained_glass_pane": 1,
    "minecraft:light_gray_stained_glass_pane": 1,
    "minecraft:cyan_stained_glass_pane": 1,
    "minecraft:purple_stained_glass_pane": 1,
    "minecraft:blue_stained_glass_pane": 1,
    "minecraft:brown_stained_glass_pane": 1,
    "minecraft:green_stained_glass_pane": 1,
    "minecraft:red_stained_glass_pane": 1,
    "minecraft:black_stained_glass_pane": 1,

    "minecraft:ice": 5,
    "minecraft:packed_ice": 15,
    "minecraft:blue_ice": 135,
    "minecraft:frosted_ice": 0,
    "minecraft:snow": 1,
    "minecraft:snow_block": 4,
    "minecraft:powder_snow": 6,

    "minecraft:dirt": 0,
    "minecraft:grass_block": 1,
    "minecraft:dirt_path": 1,
    "minecraft:farmland": 1,
    "minecraft:podzol": 2,
    "minecraft:mycelium": 3,
    "minecraft:coarse_dirt": 1,
    "minecraft:oak_leaves": 1,
    "minecraft:spruce_leaves": 1,
    "minecraft:birch_leaves": 1,
    "minecraft:jungle_leaves": 1,
    "minecraft:acacia_leaves": 1,
    "minecraft:dark_oak_leaves": 1,
    "minecraft:mangrove_leaves": 1,

    "minecraft:stripped_crimson_stem": 10,
    "minecraft:stripped_warped_stem": 10,
    "minecraft:stripped_crimson_hyphae": 9,
    "minecraft:stripped_warped_hyphae": 9,
    "minecraft:crimson_planks": 3,
    "minecraft:warped_planks": 3,

    "minecraft:stripped_oak_log": 4,
    "minecraft:stripped_spruce_log": 4,
    "minecraft:stripped_birch_log": 4,
    "minecraft:stripped_jungle_log": 5,
    "minecraft:stripped_acacia_log": 4,
    "minecraft:stripped_dark_oak_log": 6,
    "minecraft:stripped_mangrove_log": 7,
    "minecraft:stripped_cherry_log": 8,
    "minecraft:stripped_bamboo_block": 15,

    "minecraft:oak_wood": 20,
    "minecraft:spruce_wood": 20,
    "minecraft:birch_wood": 20,
    "minecraft:jungle_wood": 24,
    "minecraft:acacia_wood": 20,
    "minecraft:dark_oak_wood": 28,
    "minecraft:mangrove_wood": 32,
    "minecraft:cherry_wood": 40,
    "minecraft:stripped_oak_wood": 18,
    "minecraft:stripped_spruce_wood": 18,
    "minecraft:stripped_birch_wood": 18,
    "minecraft:stripped_jungle_wood": 22,
    "minecraft:stripped_acacia_wood": 18,
    "minecraft:stripped_dark_oak_wood": 26,
    "minecraft:stripped_mangrove_wood": 30,
    "minecraft:stripped_cherry_wood": 38,

    "minecraft:bricks": 14,
    "minecraft:cracked_deepslate_bricks": 5,
    "minecraft:cracked_deepslate_tiles": 6,

    "minecraft:spruce_pressure_plate": 4,
    "minecraft:birch_pressure_plate": 4,
    "minecraft:jungle_pressure_plate": 4,
    "minecraft:acacia_pressure_plate": 4,
    "minecraft:dark_oak_pressure_plate": 4,
    "minecraft:mangrove_pressure_plate": 6,
    "minecraft:cherry_pressure_plate": 6,
    "minecraft:bamboo_pressure_plate": 10,
    "minecraft:crimson_pressure_plate": 6,
    "minecraft:warped_pressure_plate": 6,
    "minecraft:polished_blackstone_pressure_plate": 12,
    "minecraft:spruce_button": 2,
    "minecraft:birch_button": 2,
    "minecraft:jungle_button": 2,
    "minecraft:acacia_button": 2,
    "minecraft:dark_oak_button": 2,
    "minecraft:mangrove_button": 3,
    "minecraft:cherry_button": 3,
    "minecraft:bamboo_button": 5,
    "minecraft:crimson_button": 4,
    "minecraft:warped_button": 4,
    "minecraft:polished_blackstone_button": 6,

    "minecraft:waxed_exposed_copper": 38,
    "minecraft:waxed_weathered_copper": 36,
    "minecraft:waxed_oxidized_copper": 34,
    "minecraft:exposed_cut_copper": 36,
    "minecraft:weathered_cut_copper": 34,
    "minecraft:oxidized_cut_copper": 32,
    "minecraft:waxed_cut_copper": 40,
    "minecraft:waxed_exposed_cut_copper": 38,
    "minecraft:waxed_weathered_cut_copper": 36,
    "minecraft:waxed_oxidized_cut_copper": 34,

    "minecraft:amethyst_block": 80,
    "minecraft:budding_amethyst": 0,
    "minecraft:small_amethyst_bud": 10,
    "minecraft:medium_amethyst_bud": 15,
    "minecraft:large_amethyst_bud": 20,
    "minecraft:amethyst_cluster": 25,
    "minecraft:calcite": 5,
    "minecraft:dripstone_block": 4,
    "minecraft:pointed_dripstone": 3,
    "minecraft:ochre_froglight": 150,
    "minecraft:verdant_froglight": 150,
    "minecraft:pearlescent_froglight": 150,

    "minecraft:allay_spawn_egg": 800,
    "minecraft:warden_spawn_egg": 900,
    "minecraft:bamboo_mosaic": 8,
    "minecraft:bamboo_mosaic_stairs": 12,
    "minecraft:bamboo_mosaic_slab": 4,
    "minecraft:cherry_sapling": 30,
    "minecraft:suspicious_sand": 20,
    "minecraft:suspicious_gravel": 20,
    "minecraft:sniffer_spawn_egg": 750,
    "minecraft:sniffer_egg": 500,
    "minecraft:camel_spawn_egg": 600,
    "minecraft:decorated_pot": 20,
    "minecraft:brush": 10,
    "minecraft:pottery_shard": 50,
    "minecraft:breeze_spawn_egg": 500,
    "minecraft:bogged_spawn_egg": 300,
    "minecraft:exposed_copper_bulb": 17,
    "minecraft:weathered_copper_bulb": 16,
    "minecraft:oxidized_copper_bulb": 15,
    "minecraft:waxed_exposed_copper_bulb": 21,
    "minecraft:waxed_weathered_copper_bulb": 20,
    "minecraft:waxed_oxidized_copper_bulb": 19,
    "minecraft:exposed_copper_grate": 9,
    "minecraft:weathered_copper_grate": 8,
    "minecraft:oxidized_copper_grate": 7,
    "minecraft:waxed_copper_grate": 13,
    "minecraft:waxed_exposed_copper_grate": 12,
    "minecraft:waxed_weathered_copper_grate": 11,
    "minecraft:waxed_oxidized_copper_grate": 10,
    "minecraft:exposed_chiseled_copper": 9,
    "minecraft:weathered_chiseled_copper": 8,
    "minecraft:oxidized_chiseled_copper": 7,
    "minecraft:waxed_chiseled_copper": 14,
    "minecraft:waxed_exposed_chiseled_copper": 13,
    "minecraft:waxed_weathered_chiseled_copper": 12,
    "minecraft:waxed_oxidized_chiseled_copper": 11,

    "minecraft:knowledge_book": 900,
    "minecraft:debug_stick": 0,
    "minecraft:structure_block": 0,
    "minecraft:structure_void": 0,
    "minecraft:jigsaw": 0,
    "minecraft:command_block": 0,
    "minecraft:repeating_command_block": 0,
    "minecraft:chain_command_block": 0,
    "minecraft:command_block_minecart": 0,
    "minecraft:barrier": 0,
    "minecraft:light": 0,
    "minecraft:allow": 0,
    "minecraft:deny": 0,
    "minecraft:border_block": 0,
    "minecraft:magma_block": 25,
    "minecraft:bone_block": 18,
    "minecraft:end_rod": 15,
    "minecraft:end_crystal": 180,

    "minecraft:crafting_table": 8,
    "minecraft:furnace": 9,
    "minecraft:blast_furnace": 30,
    "minecraft:smoker": 30,
    "minecraft:campfire": 10,
    "minecraft:soul_campfire": 15,
    "minecraft:stonecutter": 8,
    "minecraft:cartography_table": 5,
    "minecraft:fletching_table": 6,
    "minecraft:smithing_table": 15,
    "minecraft:loom": 5,
    "minecraft:composter": 10,

    "minecraft:bell": 500,
    "minecraft:beacon": 999,
    "minecraft:conduit": 850,
    "minecraft:white_bed": 20,
    "minecraft:orange_bed": 20,
    "minecraft:magenta_bed": 20,
    "minecraft:light_blue_bed": 20,
    "minecraft:yellow_bed": 20,
    "minecraft:lime_bed": 20,
    "minecraft:pink_bed": 20,
    "minecraft:gray_bed": 20,
    "minecraft:light_gray_bed": 20,
    "minecraft:cyan_bed": 20,
    "minecraft:purple_bed": 20,
    "minecraft:blue_bed": 20,
    "minecraft:brown_bed": 20,
    "minecraft:green_bed": 20,
    "minecraft:red_bed": 20,
    "minecraft:black_bed": 20,

    "minecraft:rail": 3,
    "minecraft:powered_rail": 25,
    "minecraft:detector_rail": 8,
    "minecraft:activator_rail": 8,
    "minecraft:minecart": 35,
    "minecraft:chest_minecart": 55,
    "minecraft:furnace_minecart": 45,
    "minecraft:tnt_minecart": 40,
    "minecraft:hopper_minecart": 85,
    "minecraft:boat": 12,
    "minecraft:oak_boat": 12,
    "minecraft:spruce_boat": 12,
    "minecraft:birch_boat": 12,
    "minecraft:jungle_boat": 15,
    "minecraft:acacia_boat": 12,
    "minecraft:dark_oak_boat": 18,
    "minecraft:mangrove_boat": 20,
    "minecraft:cherry_boat": 25,
    "minecraft:bamboo_raft": 12,
    "minecraft:oak_chest_boat": 32,
    "minecraft:spruce_chest_boat": 32,
    "minecraft:birch_chest_boat": 32,
    "minecraft:jungle_chest_boat": 35,
    "minecraft:acacia_chest_boat": 32,
    "minecraft:dark_oak_chest_boat": 38,
    "minecraft:mangrove_chest_boat": 40,
    "minecraft:cherry_chest_boat": 45,
    "minecraft:bamboo_chest_raft": 32,

    "minecraft:tnt": 30,
    "minecraft:respawn_anchor": 160,
    "minecraft:pig_spawn_egg": 100,
    "minecraft:cow_spawn_egg": 100,
    "minecraft:chicken_spawn_egg": 80,
    "minecraft:sheep_spawn_egg": 100,
    "minecraft:horse_spawn_egg": 200,
    "minecraft:villager_spawn_egg": 500,
    "minecraft:zombie_spawn_egg": 200,
    "minecraft:skeleton_spawn_egg": 200,
    "minecraft:creeper_spawn_egg": 250,
    "minecraft:enderman_spawn_egg": 300,
    "minecraft:wither_skeleton_spawn_egg": 800,
    "minecraft:blaze_spawn_egg": 400,
    "minecraft:ghast_spawn_egg": 500,
    "minecraft:shulker_spawn_egg": 700,
    "minecraft:ender_dragon_spawn_egg": 0,

    "minecraft:angler_pottery_sherd": 50,
    "minecraft:archer_pottery_sherd": 50,
    "minecraft:arms_up_pottery_sherd": 50,
    "minecraft:blade_pottery_sherd": 50,
    "minecraft:brewer_pottery_sherd": 50,
    "minecraft:burn_pottery_sherd": 50,
    "minecraft:danger_pottery_sherd": 50,
    "minecraft:explorer_pottery_sherd": 50,
    "minecraft:friend_pottery_sherd": 50,
    "minecraft:heart_pottery_sherd": 50,
    "minecraft:heartbreak_pottery_sherd": 50,
    "minecraft:howl_pottery_sherd": 50,
    "minecraft:miner_pottery_sherd": 50,
    "minecraft:mourner_pottery_sherd": 50,
    "minecraft:plenty_pottery_sherd": 50,
    "minecraft:prize_pottery_sherd": 50,
    "minecraft:sheaf_pottery_sherd": 50,
    "minecraft:shelter_pottery_sherd": 50,
    "minecraft:skull_pottery_sherd": 50,
    "minecraft:snort_pottery_sherd": 50,
    "minecraft:flow_pottery_sherd": 80,
    "minecraft:guster_pottery_sherd": 80,
    "minecraft:scrape_pottery_sherd": 80,

    "minecraft:ward_armor_trim_smithing_template": 250,
    "minecraft:spire_armor_trim_smithing_template": 250,
    "minecraft:coast_armor_trim_smithing_template": 250,
    "minecraft:eye_armor_trim_smithing_template": 250,
    "minecraft:dune_armor_trim_smithing_template": 250,
    "minecraft:wild_armor_trim_smithing_template": 250,
    "minecraft:rib_armor_trim_smithing_template": 250,
    "minecraft:tide_armor_trim_smithing_template": 250,
    "minecraft:sentry_armor_trim_smithing_template": 250,
    "minecraft:vex_armor_trim_smithing_template": 250,
    "minecraft:snout_armor_trim_smithing_template": 250,
    "minecraft:wayfinder_armor_trim_smithing_template": 250,
    "minecraft:shaper_armor_trim_smithing_template": 250,
    "minecraft:silence_armor_trim_smithing_template": 400,
    "minecraft:raiser_armor_trim_smithing_template": 250,
    "minecraft:host_armor_trim_smithing_template": 250,
    "minecraft:flow_armor_trim_smithing_template": 350,
    "minecraft:bolt_armor_trim_smithing_template": 350,
    "minecraft:netherite_upgrade_smithing_template": 400,

    "minecraft:compound": 0,
    "minecraft:element": 0,
    "minecraft:lab_table": 0,
    "minecraft:material_reducer": 0,
    "minecraft:chemistry_table": 0,
    "minecraft:underwater_torch": 0,
    "minecraft:colored_torch_red": 0,
    "minecraft:colored_torch_green": 0,
    "minecraft:colored_torch_blue": 0,
    "minecraft:colored_torch_purple": 0,
    "minecraft:camera": 0,
    "minecraft:portfolio": 0,
    "minecraft:glow_stick": 0,
    "minecraft:sparkler": 0,
    "minecraft:medicine": 0,
    "minecraft:balloon": 0,
    "minecraft:ice_bomb": 0,
    "minecraft:super_fertilizer": 0,

    "minecraft:candle": 8,
    "minecraft:white_candle": 9,
    "minecraft:orange_candle": 9,
    "minecraft:magenta_candle": 9,
    "minecraft:light_blue_candle": 9,
    "minecraft:yellow_candle": 9,
    "minecraft:lime_candle": 9,
    "minecraft:pink_candle": 9,
    "minecraft:gray_candle": 9,
    "minecraft:light_gray_candle": 9,
    "minecraft:cyan_candle": 9,
    "minecraft:purple_candle": 9,
    "minecraft:blue_candle": 9,
    "minecraft:brown_candle": 9,
    "minecraft:green_candle": 9,
    "minecraft:red_candle": 9,
    "minecraft:black_candle": 9,
    "minecraft:cactus": 4,
    "minecraft:bamboo": 3,
    "minecraft:sweet_berry_bush": 6,

    "minecraft:tube_coral": 8,
    "minecraft:brain_coral": 8,
    "minecraft:bubble_coral": 8,
    "minecraft:fire_coral": 8,
    "minecraft:horn_coral": 8,
    "minecraft:tube_coral_block": 32,
    "minecraft:brain_coral_block": 32,
    "minecraft:bubble_coral_block": 32,
    "minecraft:fire_coral_block": 32,
    "minecraft:horn_coral_block": 32,
    "minecraft:dead_tube_coral": 2,
    "minecraft:dead_brain_coral": 2,
    "minecraft:dead_bubble_coral": 2,
    "minecraft:dead_fire_coral": 2,
    "minecraft:dead_horn_coral": 2,
    "minecraft:dead_tube_coral_block": 8,
    "minecraft:dead_brain_coral_block": 8,
    "minecraft:dead_bubble_coral_block": 8,
    "minecraft:dead_fire_coral_block": 8,
    "minecraft:dead_horn_coral_block": 8,
    "minecraft:coral_fan": 6,
    "minecraft:dead_coral_fan": 1,

    "minecraft:flower_pot": 10,
    "minecraft:item_frame": 12,
    "minecraft:glow_item_frame": 30,
    "minecraft:painting": 15,
    "minecraft:armor_stand": 8,
    "minecraft:end_portal_frame": 0,
    "minecraft:player_head": 800,
    "minecraft:zombie_head": 400,
    "minecraft:skeleton_skull": 400,
    "minecraft:creeper_head": 800,
    "minecraft:piglin_head": 600,

    "minecraft:sandstone": 4,
    "minecraft:chiseled_sandstone": 6,
    "minecraft:cut_sandstone": 5,
    "minecraft:smooth_sandstone": 5,
    "minecraft:red_sandstone": 6,
    "minecraft:chiseled_red_sandstone": 8,
    "minecraft:cut_red_sandstone": 7,
    "minecraft:smooth_red_sandstone": 7,
    "minecraft:quartz_block": 28,
    "minecraft:chiseled_quartz_block": 30,
    "minecraft:quartz_pillar": 30,
    "minecraft:smooth_quartz": 30,
    "minecraft:quartz_bricks": 28,

    "minecraft:mud": 3,
    "minecraft:packed_mud": 4,
    "minecraft:mud_bricks": 6,

    "minecraft:apple": 5,
    "minecraft:baked_potato": 4,
    "minecraft:poisonous_potato": 1,
    "minecraft:fermented_spider_eye": 10,
    "minecraft:blaze_powder": 25,
    "minecraft:glistering_melon_slice": 40,
    "minecraft:bowl": 2,
    "minecraft:fishing_rod": 8,
    "minecraft:carrot_on_a_stick": 20,
    "minecraft:warped_fungus_on_a_stick": 20,
    "minecraft:torch": 4,
    "minecraft:lantern": 15,
    "minecraft:dried_kelp_block": 18,
    "minecraft:hay_block": 27,
    "minecraft:recovery_compass": 400,

    // Spawn Eggs thiếu
    "minecraft:axolotl_spawn_egg": 150,
    "minecraft:bat_spawn_egg": 50,
    "minecraft:bee_spawn_egg": 120,
    "minecraft:cat_spawn_egg": 150,
    "minecraft:cave_spider_spawn_egg": 180,
    "minecraft:dolphin_spawn_egg": 200,
    "minecraft:donkey_spawn_egg": 180,
    "minecraft:drowned_spawn_egg": 220,
    "minecraft:elder_guardian_spawn_egg": 600,
    "minecraft:fox_spawn_egg": 180,
    "minecraft:frog_spawn_egg": 100,
    "minecraft:glow_squid_spawn_egg": 120,
    "minecraft:goat_spawn_egg": 150,
    "minecraft:guardian_spawn_egg": 400,
    "minecraft:hoglin_spawn_egg": 300,
    "minecraft:husk_spawn_egg": 220,
    "minecraft:iron_golem_spawn_egg": 400,
    "minecraft:llama_spawn_egg": 180,
    "minecraft:magma_cube_spawn_egg": 250,
    "minecraft:mooshroom_spawn_egg": 200,
    "minecraft:mule_spawn_egg": 180,
    "minecraft:ocelot_spawn_egg": 150,
    "minecraft:panda_spawn_egg": 200,
    "minecraft:parrot_spawn_egg": 120,
    "minecraft:phantom_spawn_egg": 280,
    "minecraft:piglin_spawn_egg": 250,
    "minecraft:piglin_brute_spawn_egg": 400,
    "minecraft:pillager_spawn_egg": 300,
    "minecraft:polar_bear_spawn_egg": 200,
    "minecraft:pufferfish_spawn_egg": 100,
    "minecraft:rabbit_spawn_egg": 80,
    "minecraft:ravager_spawn_egg": 500,
    "minecraft:salmon_spawn_egg": 80,
    "minecraft:silverfish_spawn_egg": 150,
    "minecraft:slime_spawn_egg": 200,
    "minecraft:snow_golem_spawn_egg": 150,
    "minecraft:spider_spawn_egg": 180,
    "minecraft:squid_spawn_egg": 80,
    "minecraft:stray_spawn_egg": 220,
    "minecraft:strider_spawn_egg": 200,
    "minecraft:tadpole_spawn_egg": 80,
    "minecraft:trader_llama_spawn_egg": 300,
    "minecraft:tropical_fish_spawn_egg": 100,
    "minecraft:turtle_spawn_egg": 150,
    "minecraft:vex_spawn_egg": 350,
    "minecraft:vindicator_spawn_egg": 300,
    "minecraft:wandering_trader_spawn_egg": 400,
    "minecraft:witch_spawn_egg": 250,
    "minecraft:wither_spawn_egg": 950,
    "minecraft:wolf_spawn_egg": 120,
    "minecraft:zoglin_spawn_egg": 350,
    "minecraft:zombie_villager_spawn_egg": 250,
    "minecraft:zombified_piglin_spawn_egg": 220,

    "minecraft:lodestone": 200,
  },

  QUEST_UNLOCKS: {
    NORMAL: {
      required_difficulty: "EASY",
      required_count: 10,
    },
    HARD: {
      required_difficulty: "NORMAL",
      required_count: 10,
    },
  },
  QUESTS_PER_BOARD: 4,
  QUEST_REROLL_COOLDOWN_SECONDS: 300,
  QUEST_DURATIONS_MINUTES: {
    EASY: 30,
    NORMAL: 60,
    HARD: 120,
  },
  QUEST_CAVE_Y_LEVEL: 50,
  GACHA_CONFIG: {
    COST_PER_ROLL: 160,
    PITY_5_STAR: 80,
    RATE_5_STAR: 0.6,
    RATE_4_STAR: 5.1,
  },

  BANNER_POOL: [
    {
      id: "sword_banner_1",
      name: "§l§cThần Kiếm Liệt Hỏa",
      duration_minutes: 5,
      banner_image: "textures/items/netherite_sword",
      featured_5_star: {
        id: "minecraft:netherite_sword",
        name: "§l§cThần Kiếm Liệt Hỏa",
        enchantments: {
          sharpness: 5,
          fire_aspect: 2,
          unbreaking: 3,
          mending: 1,
          looting: 3,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_pickaxe",
          name: "§l§eCúp Mỏ Thần Tốc",
          enchantments: {
            efficiency: 5,
            fortune: 3,
            unbreaking: 3,
            mending: 1,
          },
        },
        {
          id: "minecraft:netherite_chestplate",
          name: "§l§8Giáp Vệ Thần Bất Hoại",
          enchantments: { protection: 4, unbreaking: 3, mending: 1 },
        },
        {
          id: "minecraft:trident",
          name: "§l§9Đinh Ba Hải Thần",
          enchantments: {
            loyalty: 3,
            impaling: 5,
            channeling: 1,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:elytra",
          name: "§l§bĐôi Cánh Tự Do",
          enchantments: { unbreaking: 3, mending: 1 },
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_sword",
          name: "§dKiếm Sắt Bão Tố",
          enchantments: { sharpness: 4, looting: 2, unbreaking: 3 },
        },
        {
          id: "minecraft:golden_chestplate",
          name: "§dGiáp Vàng Vệ Sĩ",
          enchantments: { protection: 4, unbreaking: 3 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:iron_pickaxe",
          name: "§bCúp Sắt Thợ Mỏ",
          enchantments: { efficiency: 4, fortune: 2, unbreaking: 2 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Sửa Chữa",
          enchantments: { mending: 1 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Sắc Bén IV",
          enchantments: { sharpness: 4 },
        },
        {
          id: "minecraft:golden_helmet",
          name: "§eMũ Vàng Bất Hoại",
          enchantments: { protection: 4, unbreaking: 2 },
        },
        {
          id: "minecraft:bow",
          name: "§fCung Gỗ Tinh Xảo",
          enchantments: { power: 3, punch: 1 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:golden_apple", amount: 1, name: "§eTáo Vàng" },
        { id: "minecraft:gold_ingot", amount: 1, name: "§eThỏi Vàng" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:ender_pearl", amount: 2, name: "§5Ngọc Ender" },
        { id: "minecraft:iron_ingot", amount: 2, name: "§7Thỏi Sắt" },
      ],
    },
    {
      id: "bow_banner_2",
      name: "§l§aCung Thần Vô Tận",
      duration_minutes: 5,
      banner_image: "textures/items/bow",
      featured_5_star: {
        id: "minecraft:bow",
        name: "§l§aVĩnh Hằng Tiễn",
        enchantments: {
          power: 5,
          infinity: 1,
          unbreaking: 3,
          punch: 2,
          flame: 1,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_axe",
          name: "§l§6Rìu Chiến Binh",
          enchantments: {
            sharpness: 5,
            efficiency: 5,
            unbreaking: 3,
            mending: 1,
          },
        },
        {
          id: "minecraft:netherite_leggings",
          name: "§l§2Quần Giáp Lén Lút",
          enchantments: {
            protection: 4,
            swift_sneak: 3,
            unbreaking: 3,
            mending: 1,
          },
        },
        {
          id: "minecraft:crossbow",
          name: "§l§6Nỏ Xuyên Giáp",
          enchantments: {
            quick_charge: 3,
            multishot: 1,
            piercing: 4,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:elytra",
          name: "§l§bĐôi Cánh Tự Do",
          enchantments: { unbreaking: 3, mending: 1 },
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:bow",
          name: "§dCung Sắt Thiện Xạ",
          enchantments: { power: 4, punch: 1, unbreaking: 2 },
        },
        {
          id: "minecraft:iron_helmet",
          name: "§dMũ Sắt Kháng Tiễn",
          enchantments: { projectile_protection: 4, unbreaking: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Vô Hạn",
          enchantments: { infinity: 1 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Sức Mạnh IV",
          enchantments: { power: 4 },
        },
        {
          id: "minecraft:crossbow",
          name: "§6Nỏ Sắt Tinh Nhuệ",
          enchantments: { quick_charge: 2, unbreaking: 2 },
        },
        {
          id: "minecraft:golden_boots",
          name: "§eGiày Vàng Nhanh Nhẹn",
          enchantments: { feather_falling: 4, unbreaking: 3 },
        },
        {
          id: "minecraft:iron_sword",
          name: "§7Kiếm Sắt Du Kích",
          enchantments: { sharpness: 3, knockback: 2 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:golden_carrot", amount: 2, name: "§6Cà Rốt Vàng" },
        { id: "minecraft:iron_ingot", amount: 1, name: "§7Thỏi Sắt" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:gold_ingot", amount: 2, name: "§eThỏi Vàng" },
        { id: "minecraft:arrow", amount: 2, name: "§7Mũi Tên" },
      ],
    },
    {
      id: "pickaxe_banner_3",
      name: "§l§eCuốc Chim Thần Sầu",
      duration_minutes: 5,
      banner_image: "textures/items/netherite_pickaxe",
      featured_5_star: {
        id: "minecraft:netherite_pickaxe",
        name: "§l§eCái Cuốc Tận Thế",
        enchantments: { efficiency: 5, fortune: 3, unbreaking: 3, mending: 1 },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_sword",
          name: "§l§cKiếm Cổ Đại",
          enchantments: { sharpness: 5, looting: 3, unbreaking: 3, mending: 1 },
        },
        {
          id: "minecraft:netherite_boots",
          name: "§l§fGiày Lãng Khách",
          enchantments: {
            protection: 4,
            feather_falling: 4,
            soul_speed: 3,
            unbreaking: 3,
            mending: 1,
          },
        },
        { id: "minecraft:shulker_box", name: "§l§dRương Shulker" },
        {
          id: "minecraft:netherite_shovel",
          name: "§l§7Xẻng San Bằng",
          enchantments: {
            efficiency: 5,
            silk_touch: 1,
            unbreaking: 3,
            mending: 1,
          },
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_pickaxe",
          name: "§dCúp Sắt May Mắn",
          enchantments: { efficiency: 4, unbreaking: 3, fortune: 2 },
        },
        {
          id: "minecraft:iron_chestplate",
          name: "§dGiáp Sắt Chống Nổ",
          enchantments: { blast_protection: 4, unbreaking: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Hiệu Suất IV",
          enchantments: { efficiency: 4 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Gia Tài III",
          enchantments: { fortune: 3 },
        },
        {
          id: "minecraft:golden_pickaxe",
          name: "§eCúp Vàng Khai Mở",
          enchantments: { efficiency: 5, unbreaking: 3 },
        },
        {
          id: "minecraft:iron_helmet",
          name: "§7Mũ Sắt Hầm Mỏ",
          enchantments: { protection: 3, unbreaking: 2 },
        },
        {
          id: "minecraft:iron_shovel",
          name: "§7Xẻng Sắt Bền Bỉ",
          enchantments: { efficiency: 4, unbreaking: 3 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:cooked_beef", amount: 2, name: "§6Bít Tết" },
        { id: "minecraft:copper_ingot", amount: 1, name: "§cThỏi Đồng" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:iron_ingot", amount: 2, name: "§7Thỏi Sắt" },
        { id: "minecraft:coal", amount: 2, name: "§8Than" },
      ],
    },
    {
      id: "chestplate_banner_4",
      name: "§l§8Thần Giáp Bất Diệt",
      duration_minutes: 5,
      banner_image: "textures/items/netherite_chestplate",
      featured_5_star: {
        id: "minecraft:netherite_chestplate",
        name: "§l§8Thần Giáp Bất Diệt",
        enchantments: { protection: 4, unbreaking: 3, mending: 1 },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_sword",
          name: "§l§cKiếm Diệt Vong",
          enchantments: {
            sharpness: 5,
            unbreaking: 3,
            fire_aspect: 2,
            mending: 1,
          },
        },
        {
          id: "minecraft:netherite_helmet",
          name: "§l§dVương Miện Bất Khuất",
          enchantments: {
            protection: 4,
            respiration: 3,
            aqua_affinity: 1,
            mending: 1,
          },
        },
        {
          id: "minecraft:totem_of_undying",
          amount: 2,
          name: "§l§eSong Trọng Bất Tử",
        },
        {
          id: "minecraft:enchanted_golden_apple",
          amount: 3,
          name: "§l§6Táo Thần",
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_chestplate",
          name: "§dGiáp Sắt Kiên Cố",
          enchantments: { protection: 4, unbreaking: 3 },
        },
        {
          id: "minecraft:shield",
          name: "§dKhiên Hộ Vệ",
          enchantments: { unbreaking: 3, mending: 1 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Bảo Vệ IV",
          enchantments: { protection: 4 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Không Gãy III",
          enchantments: { unbreaking: 3 },
        },
        {
          id: "minecraft:golden_chestplate",
          name: "§eGiáp Vàng Cường Hóa",
          enchantments: { protection: 4, thorns: 2, unbreaking: 2 },
        },
        {
          id: "minecraft:iron_leggings",
          name: "§7Quần Sắt Bền Chắc",
          enchantments: { protection: 3, unbreaking: 3 },
        },
        {
          id: "minecraft:iron_boots",
          name: "§7Giày Sắt Chịu Lửa",
          enchantments: { fire_protection: 4, unbreaking: 2 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:golden_apple", amount: 1, name: "§eTáo Vàng" },
        { id: "minecraft:gold_ingot", amount: 1, name: "§eThỏi Vàng" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:gold_ingot", amount: 2, name: "§eThỏi Vàng" },
        { id: "minecraft:lapis_lazuli", amount: 2, name: "§1Ngọc Lưu Ly" },
      ],
    },
    {
      id: "axe_banner_5",
      name: "§l§6Rìu Chiến Thần",
      duration_minutes: 5,
      banner_image: "textures/items/netherite_axe",
      featured_5_star: {
        id: "minecraft:netherite_axe",
        name: "§l§6Rìu Cổ Đại",
        enchantments: {
          sharpness: 5,
          efficiency: 5,
          unbreaking: 3,
          mending: 1,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_sword",
          name: "§l§cKiếm Càn Quét",
          enchantments: { sharpness: 5, looting: 3, unbreaking: 3, mending: 1 },
        },
        {
          id: "minecraft:netherite_chestplate",
          name: "§l§8Giáp Gai",
          enchantments: { protection: 4, thorns: 3, mending: 1, unbreaking: 3 },
        },
        {
          id: "minecraft:bow",
          name: "§l§aCung Sét",
          enchantments: { power: 5, punch: 2, flame: 1, unbreaking: 3 },
        },
        {
          id: "minecraft:trident",
          name: "§l§9Đinh Ba Sóng Thần",
          enchantments: { riptide: 3, impaling: 5, unbreaking: 3 },
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_axe",
          name: "§dRìu Sắt Chiến Binh",
          enchantments: { sharpness: 4, efficiency: 3, unbreaking: 3 },
        },
        {
          id: "minecraft:iron_boots",
          name: "§dGiày Sắt Xung Trận",
          enchantments: { protection: 3, feather_falling: 3, unbreaking: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Sắc Bén IV",
          enchantments: { sharpness: 4 },
        },
        {
          id: "minecraft:golden_axe",
          name: "§eRìu Vàng Thần Tốc",
          enchantments: { efficiency: 5, unbreaking: 3, sharpness: 3 },
        },
        {
          id: "minecraft:iron_chestplate",
          name: "§7Giáp Sắt Vững Chắc",
          enchantments: { protection: 3, unbreaking: 2 },
        },
        {
          id: "minecraft:iron_sword",
          name: "§7Kiếm Sắt Đả Kích",
          enchantments: { sharpness: 3, knockback: 2 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Chặt Cây",
          enchantments: { efficiency: 5 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:cooked_beef", amount: 2, name: "§6Bít Tết" },
        { id: "minecraft:iron_ingot", amount: 1, name: "§7Thỏi Sắt" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:iron_ingot", amount: 2, name: "§7Thỏi Sắt" },
        { id: "minecraft:book", amount: 1, name: "§fSách" },
      ],
    },
    {
      id: "helmet_banner_6",
      name: "§l§dVương Miện Trí Giả",
      duration_minutes: 5,
      banner_image: "textures/items/netherite_helmet",
      featured_5_star: {
        id: "minecraft:netherite_helmet",
        name: "§l§dVương Miện Trí Giả",
        enchantments: {
          protection: 4,
          respiration: 3,
          aqua_affinity: 1,
          unbreaking: 3,
          mending: 1,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_pickaxe",
          name: "§l§eCúp Tơ Lụa",
          enchantments: {
            efficiency: 5,
            silk_touch: 1,
            unbreaking: 3,
            mending: 1,
          },
        },
        {
          id: "minecraft:netherite_boots",
          name: "§l§fGiày Lướt Sóng",
          enchantments: {
            protection: 4,
            depth_strider: 3,
            feather_falling: 4,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:elytra",
          name: "§l§bĐôi Cánh Bền Bỉ",
          enchantments: { unbreaking: 3, mending: 1 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§l§dĐại Cổ Thư (Mending)",
          enchantments: { mending: 1 },
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_helmet",
          name: "§dMũ Sắt Biển Sâu",
          enchantments: { respiration: 3, aqua_affinity: 1, protection: 3 },
        },
        {
          id: "minecraft:golden_leggings",
          name: "§dQuần Vàng Chịu Lửa",
          enchantments: { fire_protection: 4, unbreaking: 3 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Hô Hấp III",
          enchantments: { respiration: 3 },
        },
        {
          id: "minecraft:iron_boots",
          name: "§bGiày Sắt Thủy Động",
          enchantments: { depth_strider: 3, protection: 2 },
        },
        {
          id: "minecraft:iron_sword",
          name: "§bKiếm Sắt Thủy Quái",
          enchantments: { sharpness: 4, unbreaking: 2 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Lụa",
          enchantments: { silk_touch: 1 },
        },
        {
          id: "minecraft:fishing_rod",
          name: "§bCần Câu Sắt",
          enchantments: { luck_of_the_sea: 2, lure: 2, unbreaking: 2 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:cooked_salmon", amount: 2, name: "§cCá Hồi Nướng" },
        { id: "minecraft:copper_ingot", amount: 1, name: "§cThỏi Đồng" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:gold_ingot", amount: 2, name: "§eThỏi Vàng" },
        { id: "minecraft:lapis_lazuli", amount: 2, name: "§1Ngọc Lưu Ly" },
      ],
    },
    {
      id: "leggings_banner_7",
      name: "§l§2Quần Giáp Cổ Thụ",
      duration_minutes: 5,
      banner_image: "textures/items/netherite_leggings",
      featured_5_star: {
        id: "minecraft:netherite_leggings",
        name: "§l§2Quần Giáp Cổ Thụ",
        enchantments: {
          protection: 4,
          swift_sneak: 3,
          unbreaking: 3,
          mending: 1,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_axe",
          name: "§l§6Rìu Bách Chiến",
          enchantments: {
            sharpness: 5,
            efficiency: 5,
            unbreaking: 3,
            mending: 1,
          },
        },
        {
          id: "minecraft:netherite_boots",
          name: "§l§fGiày Băng Giá",
          enchantments: {
            protection: 4,
            feather_falling: 4,
            frost_walker: 2,
            mending: 1,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:crossbow",
          name: "§l§6Nỏ Bách Phát",
          enchantments: {
            quick_charge: 3,
            multishot: 1,
            unbreaking: 3,
            mending: 1,
          },
        },
        { id: "minecraft:nether_star", amount: 1, name: "§l§eSao Nether" },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_leggings",
          name: "§dQuần Sắt Bền Bỉ",
          enchantments: { protection: 3, unbreaking: 3 },
        },
        {
          id: "minecraft:bow",
          name: "§dCung Gỗ Đẩy Lùi",
          enchantments: { punch: 2, power: 3, unbreaking: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Nhanh Nhẹn Lén Lút III",
          enchantments: { swift_sneak: 3 },
        },
        {
          id: "minecraft:golden_chestplate",
          name: "§eGiáp Vàng Của Rừng",
          enchantments: { protection: 3, projectile_protection: 4 },
        },
        {
          id: "minecraft:iron_sword",
          name: "§7Kiếm Sắt Của Kẻ Săn Mồi",
          enchantments: { sharpness: 4, unbreaking: 2 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Chống Sét III",
          enchantments: { blast_protection: 4 },
        },
        {
          id: "minecraft:iron_axe",
          name: "§7Rìu Sắt Dũng Sĩ",
          enchantments: { sharpness: 4, efficiency: 2 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:bread", amount: 2, name: "§eBánh Mì" },
        { id: "minecraft:gold_ingot", amount: 1, name: "§eThỏi Vàng" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:iron_ingot", amount: 2, name: "§7Thỏi Sắt" },
        { id: "minecraft:redstone", amount: 2, name: "§cĐá Đỏ" },
      ],
    },
    {
      id: "boots_banner_8",
      name: "§l§fGiày Du Hành",
      duration_minutes: 5,
      banner_image: "textures/items/netherite_boots",
      featured_5_star: {
        id: "minecraft:netherite_boots",
        name: "§l§fGiày Du Hành Vạn Dặm",
        enchantments: {
          protection: 4,
          feather_falling: 4,
          depth_strider: 3,
          soul_speed: 3,
          unbreaking: 3,
          mending: 1,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_sword",
          name: "§l§cKiếm Du Hiệp",
          enchantments: { sharpness: 5, unbreaking: 3, mending: 1, looting: 3 },
        },
        {
          id: "minecraft:netherite_helmet",
          name: "§l§dVương Miện Biển Cả",
          enchantments: {
            protection: 4,
            respiration: 3,
            aqua_affinity: 1,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:trident",
          name: "§l§9Đinh Ba Trung Thành",
          enchantments: { loyalty: 3, impaling: 5, mending: 1, unbreaking: 3 },
        },
        {
          id: "minecraft:elytra",
          name: "§l§bĐôi Cánh Thần Tốc",
          enchantments: { unbreaking: 3, mending: 1 },
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_boots",
          name: "§dGiày Sắt Lướt Nhanh",
          enchantments: { feather_falling: 4, depth_strider: 3, protection: 2 },
        },
        {
          id: "minecraft:golden_sword",
          name: "§dKiếm Vàng Phi Thân",
          enchantments: { sharpness: 4, unbreaking: 3 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Rơi Nhẹ IV",
          enchantments: { feather_falling: 4 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Tốc Độ Linh Hồn III",
          enchantments: { soul_speed: 3 },
        },
        {
          id: "minecraft:iron_leggings",
          name: "§7Quần Sắt Du Hành",
          enchantments: { protection: 3, unbreaking: 2 },
        },
        {
          id: "minecraft:iron_chestplate",
          name: "§7Giáp Sắt Du Hành",
          enchantments: { protection: 3, projectile_protection: 3 },
        },
        {
          id: "minecraft:bow",
          name: "§fCung Gỗ Du Mục",
          enchantments: { power: 3 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:cooked_rabbit", amount: 2, name: "§fThịt Thỏ Nướng" },
        { id: "minecraft:iron_ingot", amount: 1, name: "§7Thỏi Sắt" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:gold_ingot", amount: 2, name: "§eThỏi Vàng" },
        { id: "minecraft:book", amount: 1, name: "§fSách" },
      ],
    },
    {
      id: "trident_banner_9",
      name: "§l§9Hải Vương Phẫn Nộ",
      duration_minutes: 5,
      banner_image: "textures/items/trident",
      featured_5_star: {
        id: "minecraft:trident",
        name: "§l§9Hải Vương Thương",
        enchantments: {
          loyalty: 3,
          channeling: 1,
          impaling: 5,
          mending: 1,
          unbreaking: 3,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_helmet",
          name: "§l§dVương Miện Hải Vương",
          enchantments: {
            protection: 4,
            respiration: 3,
            aqua_affinity: 1,
            mending: 1,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:netherite_boots",
          name: "§l§fGiày Lướt Sóng",
          enchantments: {
            protection: 4,
            depth_strider: 3,
            unbreaking: 3,
            mending: 1,
          },
        },
        {
          id: "minecraft:bow",
          name: "§l§aCung Săn Bắn",
          enchantments: { power: 5, infinity: 1, unbreaking: 3 },
        },
        {
          id: "minecraft:heart_of_the_sea",
          amount: 1,
          name: "§l§bTrái Tim Của Biển",
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_sword",
          name: "§dKiếm Sắt Thủy Thần",
          enchantments: { sharpness: 4, unbreaking: 3, looting: 1 },
        },
        {
          id: "minecraft:iron_helmet",
          name: "§dMũ Sắt Thợ Lặn",
          enchantments: { respiration: 3, aqua_affinity: 1, protection: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Đâm Vọt V",
          enchantments: { impaling: 5 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Trung Thành III",
          enchantments: { loyalty: 3 },
        },
        {
          id: "minecraft:golden_chestplate",
          name: "§eGiáp Vàng Hải Vương",
          enchantments: { protection: 4, unbreaking: 2 },
        },
        {
          id: "minecraft:iron_boots",
          name: "§7Giày Sắt Lướt Sóng",
          enchantments: { depth_strider: 3, unbreaking: 2 },
        },
        {
          id: "minecraft:fishing_rod",
          name: "§fCần Câu Ma Thuật",
          enchantments: { luck_of_the_sea: 3, lure: 2, unbreaking: 2 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:cooked_salmon", amount: 2, name: "§cCá Hồi Nướng" },
        { id: "minecraft:copper_ingot", amount: 1, name: "§cThỏi Đồng" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:iron_ingot", amount: 2, name: "§7Thỏi Sắt" },
        { id: "minecraft:bone", amount: 2, name: "§fXương" },
      ],
    },
    {
      id: "elytra_banner_10",
      name: "§l§bKhát Vọng Bầu Trời",
      duration_minutes: 5,
      banner_image: "textures/items/elytra",
      featured_5_star: {
        id: "minecraft:elytra",
        name: "§l§bĐôi Cánh Thiên Sứ",
        enchantments: { unbreaking: 3, mending: 1 },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_boots",
          name: "§l§fGiày Lông Vũ",
          enchantments: {
            protection: 4,
            feather_falling: 4,
            mending: 1,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:bow",
          name: "§l§aCung Bão Tố",
          enchantments: { power: 5, punch: 2, infinity: 1, unbreaking: 3 },
        },
        {
          id: "minecraft:shulker_box",
          amount: 2,
          name: "§l§dCặp Rương Shulker",
        },
        {
          id: "minecraft:firework_rocket",
          amount: 64,
          name: "§l§cTên Lửa Thần Tốc (Bền 3)",
          lore: ["Flight Duration: 3"],
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:bow",
          name: "§dCung Sắt Bầu Trời",
          enchantments: { power: 4, unbreaking: 2, infinity: 1 },
        },
        {
          id: "minecraft:iron_boots",
          name: "§dGiày Sắt Tiếp Đất",
          enchantments: { feather_falling: 4, protection: 3, unbreaking: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Lực Bật II",
          enchantments: { punch: 2 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Mending",
          enchantments: { mending: 1 },
        },
        {
          id: "minecraft:crossbow",
          name: "§6Nỏ Sắt Tên Lửa",
          enchantments: { quick_charge: 2, multishot: 1 },
        },
        {
          id: "minecraft:golden_chestplate",
          name: "§eGiáp Vàng Phi Công",
          enchantments: { projectile_protection: 4, unbreaking: 3 },
        },
        {
          id: "minecraft:iron_sword",
          name: "§7Kiếm Sắt Gió Lốc",
          enchantments: { sharpness: 3, unbreaking: 2 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:golden_apple", amount: 1, name: "§eTáo Vàng" },
        { id: "minecraft:gold_ingot", amount: 1, name: "§eThỏi Vàng" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:gunpowder", amount: 2, name: "§8Thuốc Súng" },
        { id: "minecraft:phantom_membrane", amount: 1, name: "§fMàng Phantom" },
      ],
    },
    {
      id: "shovel_banner_11",
      name: "§l§8Xẻng Địa Chấn",
      duration_minutes: 5,
      banner_image: "textures/items/netherite_shovel",
      featured_5_star: {
        id: "minecraft:netherite_shovel",
        name: "§l§8Xẻng Địa Chấn",
        enchantments: {
          efficiency: 5,
          unbreaking: 3,
          mending: 1,
          silk_touch: 1,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_pickaxe",
          name: "§l§eCúp Mỏ Thần Tài",
          enchantments: {
            efficiency: 5,
            fortune: 3,
            mending: 1,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:netherite_axe",
          name: "§l§6Rìu Đốn Ngã",
          enchantments: { efficiency: 5, unbreaking: 3, mending: 1 },
        },
        { id: "minecraft:lodestone", amount: 1, name: "§l§dĐá Từ Tính" },
        {
          id: "minecraft:netherite_hoe",
          name: "§l§aLưỡi Hái Thần Nông",
          enchantments: {
            efficiency: 5,
            fortune: 3,
            unbreaking: 3,
            mending: 1,
          },
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_shovel",
          name: "§dXẻng Sắt Tơ Lụa",
          enchantments: { efficiency: 4, unbreaking: 3, silk_touch: 1 },
        },
        {
          id: "minecraft:iron_chestplate",
          name: "§dGiáp Sắt Thám Hiểm",
          enchantments: { protection: 4, unbreaking: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Lụa",
          enchantments: { silk_touch: 1 },
        },
        {
          id: "minecraft:iron_pickaxe",
          name: "§7Cúp Sắt Chuyên Dụng",
          enchantments: { efficiency: 5, unbreaking: 2 },
        },
        {
          id: "minecraft:iron_axe",
          name: "§7Rìu Sắt Chuyên Dụng",
          enchantments: { efficiency: 5, unbreaking: 2 },
        },
        {
          id: "minecraft:golden_shovel",
          name: "§eXẻng Vàng Siêu Tốc",
          enchantments: { efficiency: 5, unbreaking: 3 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Không Gãy III",
          enchantments: { unbreaking: 3 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:bread", amount: 2, name: "§eBánh Mì" },
        { id: "minecraft:iron_ingot", amount: 1, name: "§7Thỏi Sắt" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:iron_ingot", amount: 2, name: "§7Thỏi Sắt" },
        { id: "minecraft:flint", amount: 2, name: "§8Đá Lửa" },
      ],
    },
    {
      id: "mace_banner_12",
      name: "§l§7Chùy Phán Quyết",
      duration_minutes: 5,
      banner_image: "textures/items/mace",
      featured_5_star: {
        id: "minecraft:mace",
        name: "§l§7Chùy Phán Quyết",
        enchantments: { density: 5, breach: 4, wind_burst: 3, unbreaking: 3 },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_axe",
          name: "§l§6Rìu Đao Phủ",
          enchantments: {
            sharpness: 5,
            unbreaking: 3,
            mending: 1,
            efficiency: 5,
          },
        },
        {
          id: "minecraft:netherite_chestplate",
          name: "§l§8Giáp Phản Kích",
          enchantments: { protection: 4, thorns: 3, mending: 1, unbreaking: 3 },
        },
        { id: "minecraft:heavy_core", amount: 1, name: "§l§8Lõi Nặng" },
        {
          id: "minecraft:netherite_sword",
          name: "§l§cKiếm Đẩy Lùi",
          enchantments: {
            sharpness: 5,
            knockback: 2,
            unbreaking: 3,
            mending: 1,
          },
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_axe",
          name: "§dBúa Sắt Nặng Nề",
          enchantments: { sharpness: 5, efficiency: 1, unbreaking: 2 },
        },
        {
          id: "minecraft:shield",
          name: "§dKhiên Sắt Cổ Thụ",
          enchantments: { unbreaking: 3, mending: 1 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Xuyên Giáp IV",
          enchantments: { breach: 4 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Bùng Nổ III",
          enchantments: { wind_burst: 3 },
        },
        {
          id: "minecraft:golden_sword",
          name: "§eKiếm Vàng Trọng Kích",
          enchantments: { sharpness: 5, knockback: 2 },
        },
        {
          id: "minecraft:iron_chestplate",
          name: "§7Giáp Sắt Của Đấu Sĩ",
          enchantments: { protection: 3, blast_protection: 3 },
        },
        {
          id: "minecraft:iron_boots",
          name: "§7Giày Sắt Hạ Cánh",
          enchantments: { feather_falling: 4, protection: 2 },
        },
      ],
      pool_3_stars: [
        {
          id: "minecraft:cooked_porkchop",
          amount: 2,
          name: "§cThịt Heo Nướng",
        },
        { id: "minecraft:copper_ingot", amount: 1, name: "§cThỏi Đồng" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:iron_ingot", amount: 2, name: "§7Thỏi Sắt" },
        { id: "minecraft:bone", amount: 2, name: "§fXương" },
      ],
    },
    {
      id: "hoe_banner_13",
      name: "§l§aLưỡi Hái Mùa Màng",
      duration_minutes: 5,
      banner_image: "textures/items/netherite_hoe",
      featured_5_star: {
        id: "minecraft:netherite_hoe",
        name: "§l§aLưỡi Hái Thần Nông",
        enchantments: { efficiency: 5, fortune: 3, unbreaking: 3, mending: 1 },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_pickaxe",
          name: "§l§eCúp Kho Báu",
          enchantments: {
            efficiency: 5,
            fortune: 3,
            mending: 1,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:netherite_axe",
          name: "§l§6Rìu Tơ Lụa",
          enchantments: {
            efficiency: 5,
            silk_touch: 1,
            mending: 1,
            unbreaking: 3,
          },
        },
        { id: "minecraft:moss_block", amount: 16, name: "§l§aThảm Rêu Cổ Đại" },
        {
          id: "minecraft:bone_meal",
          amount: 32,
          name: "§l§fBột Xương Thần Kỳ",
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_hoe",
          name: "§dCuốc Sắt Mùa Màng",
          enchantments: { efficiency: 4, unbreaking: 3, fortune: 2 },
        },
        {
          id: "minecraft:golden_helmet",
          name: "§dMũ Vàng Người Nuôi Ong",
          enchantments: {
            protection: 3,
            projectile_protection: 3,
            unbreaking: 2,
          },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Gia Tài III",
          enchantments: { fortune: 3 },
        },
        {
          id: "minecraft:iron_axe",
          name: "§7Rìu Sắt Của Nông Dân",
          enchantments: { efficiency: 4, unbreaking: 2 },
        },
        {
          id: "minecraft:iron_chestplate",
          name: "§7Giáp Sắt Nông Dân",
          enchantments: { protection: 3, unbreaking: 2 },
        },
        {
          id: "minecraft:shears",
          name: "§fKéo Tỉa Vàng",
          enchantments: { efficiency: 3, unbreaking: 3 },
        },
        {
          id: "minecraft:bow",
          name: "§fCung Gỗ Của Người Giữ Vườn",
          enchantments: { power: 3, unbreaking: 1 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:wheat", amount: 2, name: "§eLúa Mì" },
        { id: "minecraft:bone_meal", amount: 2, name: "§fBột Xương" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:carrot", amount: 2, name: "§6Cà Rốt" },
        { id: "minecraft:potato", amount: 2, name: "§eKhoai Tây" },
      ],
    },
    {
      id: "shield_banner_14",
      name: "§l§7Khiên Thần Bất Hoại",
      duration_minutes: 5,
      banner_image: "textures/items/shield",
      featured_5_star: {
        id: "minecraft:shield",
        name: "§l§7Khiên Thần Bất Hoại",
        enchantments: { unbreaking: 3, mending: 1 },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_chestplate",
          name: "§l§8Giáp Vệ Binh",
          enchantments: { protection: 4, unbreaking: 3, mending: 1 },
        },
        {
          id: "minecraft:netherite_axe",
          name: "§l§6Rìu Phá Khiên",
          enchantments: {
            sharpness: 5,
            efficiency: 5,
            unbreaking: 3,
            mending: 1,
          },
        },
        {
          id: "minecraft:totem_of_undying",
          amount: 2,
          name: "§l§eVật Tổ Vĩnh Cửu",
        },
        {
          id: "minecraft:enchanted_golden_apple",
          amount: 3,
          name: "§l§6Táo Bất Tử",
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:shield",
          name: "§dKhiên Sắt Kiên Cố",
          enchantments: { unbreaking: 3 },
        },
        {
          id: "minecraft:iron_chestplate",
          name: "§dGiáp Vệ Binh",
          enchantments: { protection: 4, unbreaking: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Không Gãy III",
          enchantments: { unbreaking: 3 },
        },
        {
          id: "minecraft:golden_sword",
          name: "§eKiếm Vàng Hộ Vệ",
          enchantments: { sharpness: 5, fire_aspect: 1 },
        },
        {
          id: "minecraft:iron_helmet",
          name: "§7Mũ Sắt Vệ Binh",
          enchantments: { protection: 4 },
        },
        {
          id: "minecraft:iron_axe",
          name: "§7Rìu Sắt Vệ Binh",
          enchantments: { sharpness: 4, unbreaking: 2 },
        },
        {
          id: "minecraft:iron_leggings",
          name: "§7Quần Sắt Vệ Binh",
          enchantments: { protection: 3, blast_protection: 3 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:golden_apple", amount: 1, name: "§eTáo Vàng" },
        { id: "minecraft:gold_ingot", amount: 1, name: "§eThỏi Vàng" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:iron_ingot", amount: 2, name: "§7Thỏi Sắt" },
        { id: "minecraft:book", amount: 1, name: "§fSách" },
      ],
    },
    {
      id: "crossbow_banner_15",
      name: "§l§6Nỏ Thần Xuyên Phá",
      duration_minutes: 5,
      banner_image: "textures/items/crossbow_standby",
      featured_5_star: {
        id: "minecraft:crossbow",
        name: "§l§6Nỏ Thần Xuyên Phá",
        enchantments: {
          quick_charge: 3,
          multishot: 1,
          piercing: 4,
          unbreaking: 3,
          mending: 1,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:bow",
          name: "§l§aCung Vô Hạn",
          enchantments: { power: 5, infinity: 1, unbreaking: 3, flame: 1 },
        },
        {
          id: "minecraft:netherite_leggings",
          name: "§l§2Quần Giáp Xạ Thủ",
          enchantments: {
            protection: 4,
            projectile_protection: 4,
            swift_sneak: 3,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:firework_rocket",
          amount: 64,
          name: "§l§eTên Lửa Gắn Nỏ",
        },
        {
          id: "minecraft:netherite_sword",
          name: "§l§cKiếm Ám Sát",
          enchantments: {
            sharpness: 5,
            fire_aspect: 2,
            unbreaking: 3,
            mending: 1,
          },
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:crossbow",
          name: "§dNỏ Tinh Xảo",
          enchantments: { quick_charge: 3, multishot: 1, unbreaking: 1 },
        },
        {
          id: "minecraft:iron_helmet",
          name: "§cMũ Sắt Xạ Thủ",
          enchantments: { projectile_protection: 4, protection: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Bắn Nhiều II",
          enchantments: { multishot: 1 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Xuyên Thấu IV",
          enchantments: { piercing: 4 },
        },
        {
          id: "minecraft:golden_chestplate",
          name: "§eGiáp Vàng Của Xạ Thủ",
          enchantments: { projectile_protection: 4, unbreaking: 3 },
        },
        {
          id: "minecraft:bow",
          name: "§fCung Gỗ Nhanh Nhẹn",
          enchantments: { power: 3, unbreaking: 2 },
        },
        {
          id: "minecraft:iron_sword",
          name: "§7Dao Găm Của Xạ Thủ",
          enchantments: { sharpness: 3 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:cooked_chicken", amount: 2, name: "§fGà Nướng" },
        { id: "minecraft:iron_ingot", amount: 1, name: "§7Thỏi Sắt" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:arrow", amount: 2, name: "§7Mũi Tên" },
        { id: "minecraft:string", amount: 2, name: "§fTơ Nhện" },
      ],
    },
    {
      id: "ice_sword_banner_16",
      name: "§l§bKiếm Thuật Băng Hà",
      duration_minutes: 5,
      banner_image: "textures/items/diamond_sword",
      featured_5_star: {
        id: "minecraft:netherite_sword",
        name: "§l§bKiếm Băng Hà Vĩnh Cửu",
        enchantments: {
          sharpness: 5,
          knockback: 2,
          unbreaking: 3,
          mending: 1,
          looting: 3,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_boots",
          name: "§l§fGiày Lướt Băng",
          enchantments: {
            protection: 4,
            feather_falling: 4,
            frost_walker: 2,
            mending: 1,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:netherite_chestplate",
          name: "§l§8Giáp Băng Giá",
          enchantments: { protection: 4, thorns: 3, unbreaking: 3, mending: 1 },
        },
        {
          id: "minecraft:bow",
          name: "§l§aCung Băng Tuyết",
          enchantments: { power: 5, punch: 2, infinity: 1, unbreaking: 3 },
        },
        { id: "minecraft:blue_ice", amount: 5, name: "§l§bĐá Băng Xanh" },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_sword",
          name: "§dDao Găm Băng Giá",
          enchantments: { sharpness: 4, knockback: 1, unbreaking: 2 },
        },
        {
          id: "minecraft:iron_boots",
          name: "§dGiày Sắt Lướt Băng",
          enchantments: { frost_walker: 2, protection: 2, unbreaking: 1 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Bước Đi Băng Giá II",
          enchantments: { frost_walker: 2 },
        },
        {
          id: "minecraft:golden_sword",
          name: "§eKiếm Vàng Băng Giá",
          enchantments: { sharpness: 5, unbreaking: 2 },
        },
        {
          id: "minecraft:bow",
          name: "§bCung Băng Tuyết",
          enchantments: { power: 4, punch: 1 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Bảo Vệ Khỏi Lửa IV",
          enchantments: { fire_protection: 4 },
        },
        {
          id: "minecraft:iron_chestplate",
          name: "§7Giáp Sắt Phương Bắc",
          enchantments: { protection: 3, unbreaking: 2 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:cooked_cod", amount: 2, name: "§bCá Tuyết Nướng" },
        { id: "minecraft:copper_ingot", amount: 1, name: "§cThỏi Đồng" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:iron_ingot", amount: 2, name: "§7Thỏi Sắt" },
        { id: "minecraft:snowball", amount: 2, name: "§fBóng Tuyết" },
      ],
    },
    {
      id: "fishing_rod_banner_17",
      name: "§l§9Kho Báu Đại Dương",
      duration_minutes: 5,
      banner_image: "textures/items/fishing_rod",
      featured_5_star: {
        id: "minecraft:fishing_rod",
        name: "§l§9Cần Câu Thủy Thần",
        enchantments: {
          luck_of_the_sea: 3,
          lure: 3,
          unbreaking: 3,
          mending: 1,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:trident",
          name: "§l§9Đinh Ba Đại Dương",
          enchantments: {
            impaling: 5,
            loyalty: 3,
            channeling: 1,
            unbreaking: 3,
            mending: 1,
          },
        },
        {
          id: "minecraft:netherite_helmet",
          name: "§l§dVương Miện Biển Sâu",
          enchantments: {
            protection: 4,
            respiration: 3,
            aqua_affinity: 1,
            mending: 1,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§l§dCổ Thư Mending",
          enchantments: { mending: 1 },
        },
        {
          id: "minecraft:heart_of_the_sea",
          amount: 1,
          name: "§l§bTrái Tim Của Biển",
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:fishing_rod",
          name: "§dCần Câu May Mắn",
          enchantments: { luck_of_the_sea: 3, lure: 2, unbreaking: 2 },
        },
        {
          id: "minecraft:iron_helmet",
          name: "§dMũ Sắt Thuyền Trưởng",
          enchantments: { respiration: 3, protection: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: May Mắn Biển Cả III",
          enchantments: { luck_of_the_sea: 3 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Nhử III",
          enchantments: { lure: 3 },
        },
        {
          id: "minecraft:golden_chestplate",
          name: "§eGiáp Vàng Thủy Thủ",
          enchantments: { protection: 3, unbreaking: 3 },
        },
        {
          id: "minecraft:iron_boots",
          name: "§7Ủng Sắt Chống Nước",
          enchantments: { depth_strider: 3, unbreaking: 2 },
        },
        {
          id: "minecraft:bow",
          name: "§fCung Của Người Đánh Cá",
          enchantments: { power: 3 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:cooked_salmon", amount: 2, name: "§cCá Hồi Nướng" },
        { id: "minecraft:gold_ingot", amount: 1, name: "§eThỏi Vàng" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:string", amount: 2, name: "§fTơ Nhện" },
        { id: "minecraft:pufferfish", amount: 1, name: "§eCá Nóc" },
      ],
    },
    {
      id: "golden_armor_banner_18",
      name: "§l§eDi Sản Hoàng Đế",
      duration_minutes: 5,
      banner_image: "textures/items/diamond_chestplate",
      featured_5_star: {
        id: "minecraft:diamond_chestplate",
        name: "§l§bGiáp Hoàng Đế Kim Cương",
        enchantments: {
          protection: 4,
          unbreaking: 3,
          mending: 1,
          fire_protection: 4,
          thorns: 3,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:diamond_sword",
          name: "§l§bThánh Kiếm Kim Cương",
          enchantments: {
            sharpness: 5,
            looting: 3,
            unbreaking: 3,
            fire_aspect: 2,
            mending: 1,
          },
        },
        {
          id: "minecraft:golden_apple",
          amount: 5,
          name: "§l§eTáo Vàng Hoàng Gia",
        },
        {
          id: "minecraft:enchanted_golden_apple",
          amount: 2,
          name: "§l§6Táo Thần Bất Tử",
        },
        { id: "minecraft:bell", amount: 1, name: "§l§eChuông Vàng" },
      ],
      featured_4_stars: [
        {
          id: "minecraft:golden_sword",
          name: "§dGươm Vàng Hoàng Gia",
          enchantments: { sharpness: 5, unbreaking: 3, looting: 2 },
        },
        {
          id: "minecraft:golden_chestplate",
          name: "§dGiáp Vàng Vệ Sĩ",
          enchantments: { protection: 4, unbreaking: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:golden_helmet",
          name: "§eMũ Vàng Hoàng Gia",
          enchantments: { protection: 4, unbreaking: 2 },
        },
        {
          id: "minecraft:golden_leggings",
          name: "§eQuần Vàng Hoàng Gia",
          enchantments: { fire_protection: 4, unbreaking: 2 },
        },
        {
          id: "minecraft:golden_boots",
          name: "§eGiày Vàng Hoàng Gia",
          enchantments: { feather_falling: 4, unbreaking: 2 },
        },
        {
          id: "minecraft:golden_axe",
          name: "§eRìu Vàng Hoàng Gia",
          enchantments: { sharpness: 5, efficiency: 5 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Phản Gai III",
          enchantments: { thorns: 3 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:golden_apple", amount: 1, name: "§eTáo Vàng" },
        { id: "minecraft:iron_ingot", amount: 1, name: "§7Thỏi Sắt" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:gold_ingot", amount: 2, name: "§eThỏi Vàng" },
        { id: "minecraft:apple", amount: 2, name: "§cTáo" },
      ],
    },
    {
      id: "hellfire_axe_banner_19",
      name: "§l§cRìu Hỏa Ngục",
      duration_minutes: 5,
      banner_image: "textures/items/netherite_axe",
      featured_5_star: {
        id: "minecraft:netherite_axe",
        name: "§l§cRìu Hỏa Ngục",
        enchantments: {
          sharpness: 5,
          fire_aspect: 2,
          efficiency: 5,
          unbreaking: 3,
          mending: 1,
        },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_sword",
          name: "§l§cKiếm Magma",
          enchantments: {
            sharpness: 5,
            fire_aspect: 2,
            looting: 3,
            mending: 1,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:netherite_chestplate",
          name: "§l§8Giáp Kháng Lửa",
          enchantments: {
            protection: 4,
            fire_protection: 4,
            unbreaking: 3,
            mending: 1,
          },
        },
        {
          id: "minecraft:bow",
          name: "§l§aCung Lửa",
          enchantments: { power: 5, flame: 1, infinity: 1, unbreaking: 3 },
        },
        {
          id: "minecraft:netherite_scrap",
          amount: 2,
          name: "§l§8Mảnh Netherite Cổ Đại",
        },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_axe",
          name: "§dRìu Sắt Hỏa Ngục",
          enchantments: {
            sharpness: 4,
            fire_aspect: 1,
            efficiency: 2,
            unbreaking: 3,
          },
        },
        {
          id: "minecraft:iron_chestplate",
          name: "§dGiáp Sắt Kháng Hỏa",
          enchantments: { fire_protection: 4, unbreaking: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:golden_sword",
          name: "§eKiếm Vàng Rực Lửa",
          enchantments: { sharpness: 5, fire_aspect: 2, unbreaking: 2 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Lửa II",
          enchantments: { fire_aspect: 2 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Ngọn Lửa",
          enchantments: { flame: 1 },
        },
        {
          id: "minecraft:iron_leggings",
          name: "§7Quần Sắt Nether",
          enchantments: { protection: 3, fire_protection: 3 },
        },
        {
          id: "minecraft:bow",
          name: "§fCung Gỗ Nóng Chảy",
          enchantments: { power: 3, flame: 1 },
        },
      ],
      pool_3_stars: [
        {
          id: "minecraft:cooked_porkchop",
          amount: 2,
          name: "§cThịt Heo Nướng",
        },
        { id: "minecraft:copper_ingot", amount: 1, name: "§cThỏi Đồng" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:gold_ingot", amount: 2, name: "§eThỏi Vàng" },
        { id: "minecraft:netherrack", amount: 2, name: "§cĐá Nether" },
      ],
    },
    {
      id: "ender_conqueror_banner_20",
      name: "§l§5Chinh Phục The End",
      duration_minutes: 5,
      banner_image: "textures/items/ender_eye",
      featured_5_star: {
        id: "minecraft:elytra",
        name: "§l§bCánh Rồng Ender",
        enchantments: { unbreaking: 3, mending: 1 },
      },
      standard_5_stars: [
        {
          id: "minecraft:netherite_sword",
          name: "§l§5Kiếm Diệt Rồng",
          enchantments: { sharpness: 5, unbreaking: 3, mending: 1, looting: 3 },
        },
        { id: "minecraft:dragon_head", amount: 1, name: "§l§5Đầu Rồng Ender" },
        {
          id: "minecraft:shulker_box",
          amount: 2,
          name: "§l§dCặp Rương Shulker",
        },
        { id: "minecraft:dragon_egg", amount: 1, name: "§l§dTrứng Rồng" },
      ],
      featured_4_stars: [
        {
          id: "minecraft:iron_sword",
          name: "§dKiếm Diệt Enderman",
          enchantments: { sharpness: 5, unbreaking: 2, looting: 2 },
        },
        {
          id: "minecraft:iron_boots",
          name: "§dGiày Hư Không",
          enchantments: { feather_falling: 4, protection: 3, unbreaking: 2 },
        },
      ],
      pool_4_stars: [
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Sắc Bén V",
          enchantments: { sharpness: 5 },
        },
        {
          id: "minecraft:bow",
          name: "§bCung Hư Không",
          enchantments: { power: 4, punch: 1, infinity: 1 },
        },
        {
          id: "minecraft:enchanted_book",
          name: "§bSách Phù Phép: Rơi Nhẹ IV",
          enchantments: { feather_falling: 4 },
        },
        {
          id: "minecraft:iron_chestplate",
          name: "§7Giáp Chinh Phục",
          enchantments: { protection: 3, projectile_protection: 3 },
        },
        {
          id: "minecraft:golden_pickaxe",
          name: "§eCúp Vàng Khám Phá End",
          enchantments: { efficiency: 5, unbreaking: 3 },
        },
      ],
      pool_3_stars: [
        { id: "minecraft:chorus_fruit", amount: 2, name: "§5Quả Đồng Thanh" },
        { id: "minecraft:ender_pearl", amount: 2, name: "§5Ngọc Ender" },
        {
          id: "minecraft:experience_bottle",
          amount: 2,
          name: "§aChai Kinh Nghiệm",
        },
        { id: "minecraft:obsidian", amount: 2, name: "§5Hắc Diện Thạch" },
        { id: "minecraft:glass_bottle", amount: 1, name: "§fChai Thủy Tinh" },
      ],
    },
  ],

  DUNGEON_CONFIG: {
    // === DUNGEON 1: HẦM MỘ ZOMBIE - Cấp 1, 3, 5 ===
    zombie_crypt: {
      name: "§2Hầm Mộ Xác Sống",
      num_rooms: 15,
      materials: {
        plank: "minecraft:mossy_cobblestone",
        log: "minecraft:mossy_stone_bricks",
        stone: "minecraft:cobblestone",
        carpet: "minecraft:green_carpet",
      },
      mobs: {
        normal: "minecraft:zombie",
        boss: {
          type: "minecraft:zombie",
          name: "§2§lLãnh Chúa Mục Rữa",
          scale: 2.0,
          health: 300,
        },
      },
      treasure_loot_table: [
        { id: "minecraft:iron_nugget", min: 9, max: 18 },
        { id: "minecraft:rotten_flesh", min: 5, max: 10 },
        { id: "minecraft:bread", min: 1, max: 3 },
      ],
      difficulties: {
        very_easy: {
          name: "§aRất Dễ",
          level_req: 1,
          rewards: [
            { id: "minecraft:rotten_flesh", amount: 16 },
            { id: "minecraft:leather", amount: 8 },
          ],
        },
        easy: {
          name: "§eDễ",
          level_req: 3,
          rewards: [
            { id: "minecraft:iron_ingot", amount: 8 },
            { id: "minecraft:coal", amount: 16 },
          ],
        },
        normal: {
          name: "§6Thường",
          level_req: 5,
          rewards: [
            { id: "minecraft:iron_ingot", amount: 16 },
            { id: "minecraft:emerald", amount: 3 },
          ],
        },
      },
    },

    // === DUNGEON 2: HANG NHỆN - Cấp 7, 9 ===
    spider_lair: {
      name: "§8Hang Nhện Độc",
      num_rooms: 18,
      materials: {
        plank: "minecraft:spruce_planks",
        log: "minecraft:stripped_spruce_log",
        stone: "minecraft:stone",
        carpet: "minecraft:white_carpet",
      },
      mobs: {
        normal: "minecraft:spider",
        boss: {
          type: "minecraft:cave_spider",
          name: "§8§lNữ Chúa Tơ Độc",
          scale: 2.5,
          health: 450,
        },
      },
      treasure_loot_table: [
        { id: "minecraft:string", min: 8, max: 16 },
        { id: "minecraft:coal", min: 10, max: 20 },
        { id: "minecraft:arrow", min: 16, max: 32 },
      ],
      difficulties: {
        easy: {
          name: "§aDễ",
          level_req: 7,
          rewards: [
            { id: "minecraft:string", amount: 32 },
            { id: "minecraft:coal_block", amount: 1 },
          ],
        },
        normal: {
          name: "§eThường",
          level_req: 9,
          rewards: [
            { id: "minecraft:string", amount: 64 },
            { id: "minecraft:iron_block", amount: 2 },
          ],
        },
      },
    },

    // === DUNGEON 3: PHÁO ĐÀI BỘ XƯƠNG - Cấp 11, 13, 15 ===
    skeleton_fortress: {
      name: "§7Pháo Đài Bộ Xương",
      num_rooms: 20,
      materials: {
        plank: "minecraft:stone_bricks",
        log: "minecraft:chiseled_stone_bricks",
        stone: "minecraft:deepslate_bricks",
        carpet: "minecraft:gray_carpet",
      },
      mobs: {
        normal: "minecraft:skeleton",
        boss: {
          type: "minecraft:stray",
          name: "§7§lVua Xương Băng Giá",
          scale: 2.0,
          health: 600,
        },
      },
      treasure_loot_table: [
        { id: "minecraft:bone", min: 10, max: 25 },
        { id: "minecraft:gold_ingot", min: 3, max: 8 },
        { id: "minecraft:diamond", min: 1, max: 2 },
      ],
      difficulties: {
        easy: {
          name: "§aDễ",
          level_req: 11,
          rewards: [
            { id: "minecraft:bone_block", amount: 5 },
            { id: "minecraft:gold_ingot", amount: 8 },
          ],
        },
        normal: {
          name: "§eThường",
          level_req: 13,
          rewards: [
            { id: "minecraft:gold_ingot", amount: 16 },
            { id: "minecraft:diamond", amount: 3 },
          ],
        },
        hard: {
          name: "§cKhó",
          level_req: 15,
          rewards: [
            { id: "minecraft:gold_block", amount: 2 },
            { id: "minecraft:diamond", amount: 8 },
          ],
        },
      },
    },

    // === DUNGEON 4: THÀNH TRÌ BẤT TỬ - Cấp 17, 19 ===
    undead_citadel: {
      name: "§4Thành Trì Bất Tử",
      num_rooms: 22,
      materials: {
        plank: "minecraft:nether_bricks",
        log: "minecraft:red_nether_bricks",
        stone: "minecraft:blackstone",
        carpet: "minecraft:red_carpet",
      },
      mobs: {
        normal: "minecraft:wither_skeleton", // Bắt đầu khó hơn
        boss: {
          type: "minecraft:vindicator",
          name: "§4§lVệ Binh Cai Ngục",
          scale: 1.8,
          health: 800,
        },
      },
      treasure_loot_table: [
        { id: "minecraft:nether_wart", min: 5, max: 10 },
        { id: "minecraft:blaze_powder", min: 6, max: 12 },
        { id: "minecraft:ghast_tear", min: 1, max: 2 },
      ],
      difficulties: {
        normal: {
          name: "§eThường",
          level_req: 17,
          rewards: [
            { id: "minecraft:nether_brick", amount: 32 },
            { id: "minecraft:diamond", amount: 6 },
          ],
        },
        hard: {
          name: "§cKhó",
          level_req: 19,
          rewards: [
            { id: "minecraft:diamond", amount: 16 },
            { id: "minecraft:experience_bottle", amount: 32 },
          ],
        },
      },
    },

    // === DUNGEON 5: THÁNH ĐIỆN END - Cấp 20+ (Thử thách thực sự) ===
    end_sanctum: {
      name: "§5Thánh Điện End",
      num_rooms: 25,
      materials: {
        plank: "minecraft:end_stone_bricks",
        log: "minecraft:purpur_pillar",
        stone: "minecraft:purpur_block",
        carpet: "minecraft:magenta_carpet",
      },
      mobs: {
        normal: "minecraft:enderman",
        boss: {
          type: "minecraft:shulker",
          name: "§5§lKẺ CANH GIỮ CỔ VẬT",
          scale: 4.0,
          health: 1000,
        },
      },
      treasure_loot_table: [
        { id: "minecraft:ender_pearl", min: 4, max: 12 },
        { id: "minecraft:chorus_fruit", min: 8, max: 20 },
        { id: "minecraft:elytra", min: 1, max: 1 },
      ],
      difficulties: {
        heroic: {
          name: "§dAnh Hùng",
          level_req: 20,
          rewards: [
            { id: "minecraft:diamond_block", amount: 1 },
            { id: "minecraft:netherite_scrap", amount: 1 },
          ],
        },
        legendary: {
          name: "§5Huyền Thoại",
          level_req: 25,
          rewards: [
            { id: "minecraft:netherite_ingot", amount: 1 },
            { id: "minecraft:shulker_box", amount: 1 },
          ],
        },
      },
    },
  },

  SURVIVAL_CHALLENGE: {
    ARENA_SIZE: 20,
    ARENA_HEIGHT: 10,
    ARENA_WALL_BLOCK: "minecraft:iron_bars",
    ARENA_FLOOR_BLOCK: "minecraft:deepslate_bricks",
    WAVE_DURATION_SECONDS: 60,
    REST_TIME_SECONDS: 5,
    INVITE_RADIUS: 100,
    LOBBY_WAIT_SECONDS: 15,
    PLAYER_SCALING_FACTOR: 0.75,
    DIFFICULTIES: [
      {
        name: "§aTập Sự",
        // Phần thưởng được cân bằng lại: tập trung vào Nguyên Thạch và vật phẩm khởi đầu.
        rewards: {
          milestone_3: [
            { id: "minecraft:iron_ingot", amount: 8 },
            { nguyen_thach: 20 },
          ],
          milestone_6: [
            { id: "minecraft:golden_apple", amount: 3 },
            { nguyen_thach: 40 },
          ],
          milestone_9: [
            { id: "minecraft:diamond", amount: 2 },
            { nguyen_thach: 60 },
          ],
          final: [
            { id: "minecraft:enchanted_book", enchantments: { sharpness: 3 } },
            { nguyen_thach: 100 },
          ], // Tổng thưởng: 220 NT
        },
        // Các wave được thiết kế lại theo chủ đề, hợp lý hơn.
        waves: [
          { count: 8, mobs: ["minecraft:zombie"] }, // Wave 1: Bầy Đàn Zombie
          { count: 10, mobs: ["minecraft:zombie", "minecraft:spider"] }, // Wave 2: Hỗn Loạn
          { count: 6, mobs: ["minecraft:skeleton", "minecraft:stray"] }, // Wave 3: Mưa Tên
          { count: 4, mobs: ["minecraft:creeper"] }, // Wave 4: Cẩn Thận Bước Chân!
          { count: 12, mobs: ["minecraft:husk", "minecraft:drowned"] }, // Wave 5: Bọn Xác Khô
          { count: 5, mobs: ["minecraft:pillager"] }, // Wave 6: Xạ Thủ Illager
          { count: 4, mobs: ["minecraft:witch"] }, // Wave 7: Độc Dược Chết Người
          { count: 8, mobs: ["minecraft:vindicator"] }, // Wave 8: Lưỡi Rìu Sát Thủ
          {
            count: 15,
            mobs: [
              "minecraft:zombie",
              "minecraft:skeleton",
              "minecraft:creeper",
            ],
          }, // Wave 9: Tất Cả Dồn Vào!
          {
            count: 1,
            mobs: ["minecraft:ravager"],
            name: "§cQuái Vật Hung Tợn",
          }, // WAVE 10: MINI-BOSS
        ],
      },
      {
        name: "§6Chiến Binh",
        rewards: {
          milestone_3: [
            { id: "minecraft:diamond", amount: 5 },
            { nguyen_thach: 50 },
          ],
          milestone_6: [
            { id: "minecraft:totem_of_undying", amount: 1 },
            { nguyen_thach: 100 },
          ],
          milestone_9: [
            { id: "minecraft:netherite_scrap", amount: 1 },
            { nguyen_thach: 150 },
          ],
          final: [
            { id: "minecraft:enchanted_book", enchantments: { protection: 4 } },
            { nguyen_thach: 250 },
          ], // Tổng thưởng: 550 NT
        },
        waves: [
          { count: 10, mobs: ["minecraft:piglin", "minecraft:hoglin"] }, // Wave 1: Nether Hoang Dã
          { count: 8, mobs: ["minecraft:blaze"] }, // Wave 2: Cầu Lửa
          {
            count: 15,
            mobs: ["minecraft:wither_skeleton", "minecraft:skeleton"],
          }, // Wave 3: Cái Chết Đen
          { count: 5, mobs: ["minecraft:evoker"] }, // Wave 4: Bầy Vex Phiền Toái
          {
            count: 10,
            mobs: [
              "minecraft:pillager",
              "minecraft:vindicator",
              "minecraft:witch",
            ],
          }, // Wave 5: Đội Quân Illager
          {
            count: 1,
            mobs: ["minecraft:iron_golem"],
            name: "§7Người Sắt Nổi Giận",
          }, // Wave 6: Sai Lầm Chế Tạo
          {
            count: 12,
            mobs: ["minecraft:creeper", "minecraft:creeper", "minecraft:witch"],
          }, // Wave 7: Rủi Ro Nhân Ba
          { count: 8, mobs: ["minecraft:piglin_brute"] }, // Wave 8: Vệ Binh Bastion
          { count: 2, mobs: ["minecraft:ravager"] }, // Wave 9: Cặp Đôi Hủy Diệt
          {
            count: 1,
            mobs: ["minecraft:elder_guardian"],
            name: "§3Cai Ngục Cổ Đại",
          }, // WAVE 10: BOSS
        ],
      },
      {
        name: "§5Anh Hùng",
        rewards: {
          milestone_3: [
            { id: "minecraft:netherite_scrap", amount: 2 },
            { nguyen_thach: 150 },
          ],
          milestone_6: [
            { id: "minecraft:shulker_box", amount: 1 },
            { nguyen_thach: 300 },
          ],
          milestone_9: [
            { id: "minecraft:enchanted_golden_apple", amount: 3 },
            { nguyen_thach: 450 },
          ],
          final: [
            { id: "minecraft:nether_star", amount: 1 },
            { nguyen_thach: 600 },
          ], // Tổng thưởng: 1500 NT
        },
        waves: [
          { count: 12, mobs: ["minecraft:piglin_brute"] },
          { count: 15, mobs: ["minecraft:blaze", "minecraft:wither_skeleton"] },
          { count: 2, mobs: ["minecraft:ravager", "minecraft:evoker"] },
          { count: 20, mobs: ["minecraft:vex"] },
          { count: 25, mobs: ["minecraft:hoglin", "minecraft:zoglin"] },
          { count: 10, mobs: ["minecraft:guardian", "minecraft:drowned"] }, // Wave 6: Thủy Triều Trỗi Dậy
          { count: 20, mobs: ["minecraft:enderman"] }, // Wave 7: Cơn Thịnh Nộ Của Hư Không
          { count: 40, mobs: ["minecraft:silverfish", "minecraft:endermite"] }, // Wave 8: Bầy Côn Trùng
          {
            count: 2,
            mobs: ["minecraft:iron_golem"],
            name: "§7§lĐỘI QUÂN GOLEM",
          }, // Wave 9: Mini-boss Bầy
          {
            count: 1,
            mobs: ["minecraft:wither"],
            name: "§8Hiện Thân Của Sự Tàn Lụi",
          }, // WAVE 10: BOSS
        ],
      },
      {
        name: "§cĐịa Ngục",
        rewards: {
          milestone_3: [
            { id: "minecraft:netherite_ingot", amount: 1 },
            { nguyen_thach: 400 },
          ],
          milestone_6: [
            { id: "minecraft:beacon", amount: 1 },
            { nguyen_thach: 800 },
          ],
          milestone_9: [
            { id: "minecraft:elytra", name: "§bCánh Dũng Sĩ" },
            { nguyen_thach: 1200 },
          ],
          final: [
            { id: "minecraft:netherite_block", amount: 1 },
            { nguyen_thach: 2000 },
          ], // Tổng thưởng: 4400 NT
        },
        waves: [
          {
            count: 10,
            mobs: ["minecraft:piglin_brute", "minecraft:wither_skeleton"],
          },
          { count: 3, mobs: ["minecraft:ravager", "minecraft:evoker"] },
          { count: 20, mobs: ["minecraft:blaze", "minecraft:ghast"] },
          { count: 40, mobs: ["minecraft:vex"] },
          {
            count: 5,
            mobs: ["minecraft:warden"],
            name: "§4Tiếng Vọng Từ Lòng Đất",
          }, // Wave 5: BOSS PHỤ
          { count: 30, mobs: ["minecraft:pillager", "minecraft:vindicator"] },
          { count: 20, mobs: ["minecraft:shulker", "minecraft:enderman"] },
          { count: 4, mobs: ["minecraft:iron_golem"] },
          { count: 2, mobs: ["minecraft:wither"], name: "§8CẶP ĐÔI HỦY DIỆT" }, // Wave 9: BOSS PHỤ x2
          {
            count: 1,
            mobs: ["minecraft:ender_dragon"],
            name: "§5CHÚA TỂ CỦA HƯ KHÔNG",
          }, // WAVE 10: BOSS CUỐI
        ],
      },
    ],
  },

  GUILD_XP_SHARE: {
    ENABLED: true, // Bật/tắt tính năng
    RADIUS: 50, // Bán kính chia sẻ (block)
    PERCENTAGE: 0.15, // Tỷ lệ chia sẻ (15%)
  },

  GUILD_LEVELING: {
    BASE_XP_TO_LEVEL: 10000,
    XP_MULTIPLIER: 1.65,
    PERKS: {
      // --- Cấp 1: Nền tảng ---
      1: {
        description:
          "Mở khóa tính năng chia sẻ 15 phần trăm XP\n§fcho các thành viên ở gần.",
      },

      // --- Cấp 2: Dịch Chuyển Tức Thời --- (Đã chuyển lên từ cấp 7)
      2: {
        description:
          "Mở khóa 'Điểm Dịch Chuyển Bang Hội'.\n§fChủ bang có thể đặt điểm dịch chuyển cho cả bang.",
        key: "guild_home",
        value: true,
      },

      // --- Cấp 3: Hợp Tác & Mở Rộng --- (Gộp buff & tăng)
      3: {
        description:
          "Tăng XP chia sẻ lên 25 phần trăm.\n§fMở khóa hàng thứ 4 trong Kho Bang Hội (36 ô).",
        keys: [
          { key: "xp_share_boost", value: 0.25 },
          { key: "bank_rows", value: 4 },
        ],
      },

      // --- Cấp 4: Tăng Trưởng Toàn Diện --- (Tăng buff & đưa lên sớm hơn)
      4: {
        description:
          "Tất cả thành viên nhận thêm 15 phần trăm XP\n§ftừ mọi nguồn.",
        key: "global_xp_boost",
        value: 0.15,
      },

      // --- Cấp 5: Sức Mạnh Đồng Đội --- (Tăng mạnh buff)
      5: {
        description: "Tăng lượng XP chia sẻ trong bang\n§flên 35 phần trăm.",
        key: "xp_share_boost",
        value: 0.35,
      },

      // --- Cấp 6: Kho Báu Vô Tận --- (Đưa lên sớm hơn)
      6: {
        description: "Mở khóa hàng thứ 5 trong Kho Bang Hội (45 ô).",
        key: "bank_rows",
        value: 5,
      },

      // --- Cấp 7: Bậc Thầy Cày Cuốc --- (Tăng mạnh buff)
      7: {
        description:
          "Tất cả thành viên nhận thêm 25 phần trăm XP\n§ftừ mọi nguồn.",
        key: "global_xp_boost",
        value: 0.25,
      },

      // --- Cấp 8: Liên Minh Bất Bại --- (Tăng mạnh buff)
      8: {
        description:
          "Tăng lượng XP chia sẻ trong bang\n§flên đến 50 phần trăm.",
        key: "xp_share_boost",
        value: 0.5,
      },

      // --- Cấp 9: Vinh Quang Tối Thượng --- (Buff cuối mạnh mẽ)
      9: {
        description:
          "Tăng XP toàn cục lên 35 phần trăm.\n§fMở khóa hàng cuối cùng trong Kho Bang Hội (54 ô).",
        keys: [
          { key: "global_xp_boost", value: 0.35 },
          { key: "bank_rows", value: 6 },
        ],
      },
    },
  },
  GUILD_QUESTS: {
    QUEST_POOL: [
      // === Cân Bằng Cho Chu Kỳ 2 Ngày - Bang 3 người ===

      // --- NHÓM OVERWORLD CƠ BẢN ---
      {
        id: "GQ_BREAK_LOGS",
        title: "Chuẩn Bị Gỗ",
        description: "Cả bang cùng nhau khai thác 960 khúc GỖ BẤT KỲ.",
        type: "BREAK_BLOCK",
        target: "#logs",
        amount: 960,
        rewardXp: 1000,
      },
      {
        id: "GQ_BREAK_COAL",
        title: "Nhiên Liệu Khởi Động",
        description: "Cả bang khai thác 768 quặng Than.",
        type: "BREAK_BLOCK",
        target: "minecraft:coal_ore",
        amount: 768,
        rewardXp: 800,
      },
      {
        id: "GQ_BREAK_IRON_QUICK",
        title: "Rèn Giáp Sắt",
        description: "Cả bang khai thác 480 quặng Sắt.",
        type: "BREAK_BLOCK",
        target: "minecraft:iron_ore",
        amount: 480,
        rewardXp: 1500,
      },
      {
        id: "GQ_BREAK_GOLD_QUICK",
        title: "Cơn Sốt Vàng",
        description: "Cả bang khai thác 384 quặng Vàng.",
        type: "BREAK_BLOCK",
        target: "minecraft:gold_ore",
        amount: 384,
        rewardXp: 1800,
      },
      {
        id: "GQ_BREAK_DIAMOND_RUSH",
        title: "Cuộc Đua Kim Cương",
        description: "Cả bang tìm và khai thác 64 quặng Kim Cương.",
        type: "BREAK_BLOCK",
        target: "minecraft:diamond_ore",
        amount: 64,
        rewardXp: 5000,
      },

      {
        id: "GQ_KILL_ZOMBIE",
        title: "Dọn Dẹp Đêm Tối",
        description: "Cả bang tiêu diệt 150 Zombie.",
        type: "KILL",
        target: "minecraft:zombie",
        amount: 150,
        rewardXp: 500,
      },
      {
        id: "GQ_KILL_SKELETON",
        title: "Mưa Tên",
        description: "Cả bang tiêu diệt 120 Skeleton.",
        type: "KILL",
        target: "minecraft:skeleton",
        amount: 120,
        rewardXp: 600,
      },
      {
        id: "GQ_KILL_CREEPER",
        title: "Hiểm Họa Xanh",
        description: "Cả bang tiêu diệt 60 Creeper.",
        type: "KILL",
        target: "minecraft:creeper",
        amount: 60,
        rewardXp: 1200,
      },
      {
        id: "GQ_KILL_ENDERMAN",
        title: "Săn Lùng Bóng Đêm",
        description: "Cả bang tiêu diệt 30 Enderman.",
        type: "KILL",
        target: "minecraft:enderman",
        amount: 30,
        rewardXp: 2000,
      },

      // --- NHÓM CHINH PHỤC NETHER ---
      {
        id: "GQ_KILL_BLAZE",
        title: "Lõi Lửa",
        description:
          "Chinh phục pháo đài Nether, tiêu diệt 45 Quỷ Lửa (Blaze).",
        type: "KILL",
        target: "minecraft:blaze",
        amount: 45,
        rewardXp: 2500,
      },
      {
        id: "GQ_KILL_GHAST",
        title: "Nước Mắt Nether",
        description: "Cả bang bắn hạ 15 Ghast.",
        type: "KILL",
        target: "minecraft:ghast",
        amount: 15,
        rewardXp: 3000,
      },
      {
        id: "GQ_KILL_WITHER_SKELETON",
        title: "Săn Đầu Lâu",
        description: "Cả bang tiêu diệt 30 Wither Skeleton.",
        type: "KILL",
        target: "minecraft:wither_skeleton",
        amount: 30,
        rewardXp: 3500,
      },
      {
        id: "GQ_BREAK_QUARTZ",
        title: "Thạch Anh Nether",
        description: "Cả bang khai thác 512 quặng Thạch Anh.",
        type: "BREAK_BLOCK",
        target: "minecraft:nether_quartz_ore",
        amount: 512,
        rewardXp: 1000,
      },
      {
        id: "GQ_BREAK_ANCIENT_DEBRIS",
        title: "Tru Tìm Cổ Vật",
        description: "Cả bang tìm và khai thác 12 Mảnh Vỡ Cổ Đại.",
        type: "BREAK_BLOCK",
        target: "minecraft:ancient_debris",
        amount: 12,
        rewardXp: 6000,
      },

      // --- NHÓM THỬ THÁCH CAO CẤP ---
      {
        id: "GQ_KILL_ELDER_GUARDIAN",
        title: "Chinh Phục Đại Dương",
        description: "Chinh phục Đài Tưởng Niệm và hạ gục 3 Elder Guardian.",
        type: "KILL",
        target: "minecraft:elder_guardian",
        amount: 3,
        rewardXp: 8000,
      },
      {
        id: "GQ_KILL_WARDEN",
        title: "Đối Mặt Nỗi Sợ",
        description:
          "Cả bang chứng tỏ lòng dũng cảm bằng cách hạ gục 1 Warden.",
        type: "KILL",
        target: "minecraft:warden",
        amount: 1,
        rewardXp: 10000,
      },
      {
        id: "GQ_KILL_SHULKER",
        title: "Thám Hiểm End City",
        description: "Khám phá End City và tiêu diệt 30 Shulker.",
        type: "KILL",
        target: "minecraft:shulker",
        amount: 30,
        rewardXp: 4000,
      },

      // --- NHÓM HOẠT ĐỘNG KHÁC (AN TOÀN) ---
      {
        id: "GQ_BREED_ANIMALS",
        title: "Phát Triển Nông Trại",
        description: "Cả bang cùng nhau nhân giống 60 động vật.",
        type: "BREED",
        target: "#farm_animals",
        amount: 60,
        rewardXp: 800,
      },
      {
        id: "GQ_VILLAGER_TRADE",
        title: "Thương Nhân Làng Mạc",
        description: "Cả bang giao dịch với dân làng tổng cộng 15 lần.",
        type: "TRADE",
        target: "minecraft:villager",
        amount: 15,
        rewardXp: 900,
      },
    ],
    QUESTS_PER_WEEK: 5, // Số lượng nhiệm vụ mỗi tuần
    RESET_INTERVAL_HOURS: 48, // 2 ngày
  },

  DEFAULT_PRICES: {
    raw_: 4, // Bao gồm raw_iron, raw_copper, raw_gold
    ingot: 5, // Sắt, Vàng, Đồng, Netherite
    diamond: 60,
    emerald: 50,
    lapis_lazuli: 5,
    redstone: 5,
    coal: 4,
    _log: 3, // Tất cả các loại gỗ
    _planks: 1, // Tất cả các loại ván gỗ
    cobblestone: 1,
  },
  UPGRADE_SYSTEM: {
    // Bạn chỉ cần dòng này để mã nguồn biết cấp tối đa là bao nhiêu
    MAX_GEAR_UPGRADE_LEVEL: 10,
  },
  CLASS_PASSIVES: {
    GUARDIAN: {
      // Lì Đòn (Tỷ lệ kích hoạt)
      LVL1_CHANCE: 0.2,
      LVL3_CHANCE: 0.35, // <-- Tôi đã trả lại giá trị hợp lý hơn
      LVL7_CHANCE: 0.5, // <-- Tôi đã trả lại giá trị hợp lý hơn
      HEAL_PERCENT: 0.8, // <-- Tôi đã trả lại giá trị hợp lý hơn

      // Chấn Động Phục Hận (Nội tại cấp 5)
      KNOCKBACK_RADIUS: 4,
      KNOCKBACK_STRENGTH: 0.5,

      // Giáp Huyết Tinh (Nội tại cấp 10)
      LOW_HEALTH_THRESHOLD: 0.4,
      ABSORPTION_AMPLIFIER: 3,
      ABSORPTION_DURATION: 10,
      ABSORPTION_COOLDOWN: 90,

      // Cấp độ mở khóa các nội tại đặc biệt
      LEVEL_UNLOCKS: {
        KNOCKBACK: 5, // <-- Thay REFLECT bằng KNOCKBACK
        ABSORPTION: 10,
      },
    },
    MAGE: {
      // Hằng số cho nội tại cơ bản và nâng cấp
      LVL1_MANA_REGEN_BONUS: 1.3,
      LVL1_KILL_HEAL: 12,
      LVL1_KILL_MANA: 15,
      LVL3_KILL_HEAL: 24, // Sẽ dùng cho nội tại cấp 7
      LVL3_KILL_MANA: 25, // Sẽ dùng cho nội tại cấp 7

      // Hằng số cho nội tại cấp 5 và 10 (giữ nguyên)
      BONUS_DAMAGE_MANA_RATIO: 0.2,
      BONUS_DAMAGE_COOLDOWN: 5,
      OVERLOAD_AOE_MANA_RATIO: 0.25,

      // Cấu trúc cấp độ mở khóa ĐÃ ĐƯỢC CẬP NHẬT
      LEVEL_UNLOCKS: {
        MANA_ECHO: 3, // Nội tại mới: Sát thương cộng hưởng
        BONUS_DAMAGE: 5, // Giữ nguyên: Bùng nổ ma lực
        KILL_BONUS_UPGRADE: 7, // Nội tại mới: Hấp thụ nâng cao
        OVERLOAD: 10, // Giữ nguyên: Quá tải năng lượng
      },
    },
    RANGER: {
      MAX_STACKS_LVL1: 5,
      MAX_STACKS_LVL7: 7,
      BUFF_DURATION: 30,
      POISON_CHANCE: 0.4,
      POISON_DURATION: 4,
      POISON_AMPLIFIER: 0,
      WIND_DASH_IMPULSE: 0.2,
      LEVEL_UNLOCKS: {
        JUMP_BOOST: 3,
        POISON_ARROW: 5,
        STACK_UPGRADE: 7,
        WIND_DASH: 10,
      },
    },
  },
  MOB_KILL_REWARDS: {
    // --- BẬC 1: MOB BỊ ĐỘNG & YẾU (1-3 Nguyên Thạch) ---
    "minecraft:chicken": 1,
    "minecraft:cod": 1,
    "minecraft:salmon": 1,
    "minecraft:rabbit": 1,
    "minecraft:bat": 1,
    "minecraft:squid": 2,
    "minecraft:glow_squid": 3,
    "minecraft:sheep": 2,
    "minecraft:cow": 2,
    "minecraft:pig": 2,
    "minecraft:horse": 3,
    "minecraft:donkey": 3,
    "minecraft:llama": 3,
    "minecraft:cat": 2,
    "minecraft:ocelot": 2,
    "minecraft:parrot": 2,
    "minecraft:fox": 2,
    "minecraft:wolf": 3,
    "minecraft:polar_bear": 3,
    "minecraft:mule": 3,
    "minecraft:mooshroom": 3,
    "minecraft:panda": 3,
    "minecraft:goat": 3,
    "minecraft:axolotl": 3,
    "minecraft:turtle": 2,
    "minecraft:dolphin": 3,
    "minecraft:bee": 2,
    "minecraft:tropical_fish": 1,
    "minecraft:pufferfish": 1,
    "minecraft:strider": 3,
    "minecraft:sniffer": 3,
    "minecraft:copper_golem": 3, // mob mới sự kiện
    "minecraft:nautilus": 1, // mob biển mới

    // --- BẬC 2: MOB THÙ ĐỊCH CƠ BẢN (5-10 Nguyên Thạch) ---
    "minecraft:zombie": 5,
    "minecraft:skeleton": 5,
    "minecraft:spider": 5,
    "minecraft:husk": 6,
    "minecraft:stray": 6,
    "minecraft:drowned": 6,
    "minecraft:creeper": 8,
    "minecraft:slime": 4, // Dễ farm
    "minecraft:silverfish": 3,
    "minecraft:zombie_villager": 6,
    "minecraft:endermite": 6,
    "minecraft:vex": 8, // mob nhỏ bay

    // --- BẬC 3: MOB KHÓ CHỊU & NGUY HIỂM (10-25 Nguyên Thạch) ---
    "minecraft:enderman": 15,
    "minecraft:witch": 18,
    "minecraft:phantom": 12,
    "minecraft:pillager": 10,
    "minecraft:cave_spider": 12,
    "minecraft:blaze": 15,
    "minecraft:ghast": 20,
    "minecraft:magma_cube": 5, // Dễ farm
    "minecraft:guardian": 20,
    "minecraft:illusioner": 18, // mob chưa chính thức nhưng có trong Bedrock

    // --- BẬC 4: MOB RẤT MẠNH / MINI-BOSS (30-100 Nguyên Thạch) ---
    "minecraft:wither_skeleton": 30,
    "minecraft:hoglin": 25,
    "minecraft:zoglin": 25,
    "minecraft:vindicator": 35,
    "minecraft:evoker": 50,
    "minecraft:piglin_brute": 60,
    "minecraft:shulker": 25,
    "minecraft:ravager": 80,
    "minecraft:iron_golem": 0, // người chơi tạo

    // --- BẬC 5: BOSS (Phần thưởng lớn) ---
    "minecraft:elder_guardian": 200,
    "minecraft:wither": 500,
    "minecraft:ender_dragon": 1000,
    "minecraft:warden": 1200,

    // --- MOB TRUNG LẬP & KHÁC ---
    "minecraft:zombie_pigman": 3, // Bị động nhưng có thể farm số lượng lớn
    "minecraft:piglin": 4,
    "minecraft:villager": -200, // Trừ tiền nếu giết dân làng
    "minecraft:wandering_trader": 0,
    "minecraft:trader_llama": 0,
    "minecraft:snow_golem": 0, // người chơi tạo
    "minecraft:allay": 0, // mob hỗ trợ
  },
  FLASH_SALE_CONFIG: {
    EVENT_INTERVAL_MINUTES: 10,
    SALE_DURATION_MINUTES: 3,
    ITEMS_PER_SALE: 5,
    PRICE_MODIFIER: {
      MIN: 0.5,
      MAX: 1,
    },
    ITEM_POOL: [
      // === GIÁP DA ===
      { id: "minecraft:leather_helmet", quantity: [1, 1], weight: 10 },
      { id: "minecraft:leather_chestplate", quantity: [1, 1], weight: 10 },
      { id: "minecraft:leather_leggings", quantity: [1, 1], weight: 10 },
      { id: "minecraft:leather_boots", quantity: [1, 1], weight: 10 },

      // === GIÁP LƯỚI (CHAINMAIL) ===
      { id: "minecraft:chainmail_helmet", quantity: [1, 1], weight: 7 },
      { id: "minecraft:chainmail_chestplate", quantity: [1, 1], weight: 7 },
      { id: "minecraft:chainmail_leggings", quantity: [1, 1], weight: 7 },
      { id: "minecraft:chainmail_boots", quantity: [1, 1], weight: 7 },

      // === CÔNG CỤ & VŨ KHÍ SẮT ===
      { id: "minecraft:iron_sword", quantity: [1, 1], weight: 8 },
      { id: "minecraft:iron_pickaxe", quantity: [1, 1], weight: 8 },
      { id: "minecraft:iron_axe", quantity: [1, 1], weight: 8 },
      { id: "minecraft:iron_shovel", quantity: [1, 1], weight: 9 },
      { id: "minecraft:iron_hoe", quantity: [1, 1], weight: 9 },

      // === GIÁP SẮT ===
      { id: "minecraft:iron_helmet", quantity: [1, 1], weight: 7 },
      { id: "minecraft:iron_chestplate", quantity: [1, 1], weight: 7 },
      { id: "minecraft:iron_leggings", quantity: [1, 1], weight: 7 },
      { id: "minecraft:iron_boots", quantity: [1, 1], weight: 7 },

      // === CÔNG CỤ & VŨ KHÍ VÀNG ===
      { id: "minecraft:golden_sword", quantity: [1, 1], weight: 7 },
      { id: "minecraft:golden_pickaxe", quantity: [1, 1], weight: 7 },
      { id: "minecraft:golden_axe", quantity: [1, 1], weight: 7 },
      { id: "minecraft:golden_shovel", quantity: [1, 1], weight: 8 },
      { id: "minecraft:golden_hoe", quantity: [1, 1], weight: 8 },

      // === GIÁP VÀNG ===
      { id: "minecraft:golden_helmet", quantity: [1, 1], weight: 6 },
      { id: "minecraft:golden_chestplate", quantity: [1, 1], weight: 6 },
      { id: "minecraft:golden_leggings", quantity: [1, 1], weight: 6 },
      { id: "minecraft:golden_boots", quantity: [1, 1], weight: 6 },

      { id: "minecraft:copper_sword", quantity: [1, 1], weight: 8 },
      { id: "minecraft:copper_pickaxe", quantity: [1, 1], weight: 8 },
      { id: "minecraft:copper_axe", quantity: [1, 1], weight: 8 },
      { id: "minecraft:copper_shovel", quantity: [1, 1], weight: 9 },
      { id: "minecraft:copper_hoe", quantity: [1, 1], weight: 9 },

      // === GIÁP COPPER ===
      { id: "minecraft:copper_helmet", quantity: [1, 1], weight: 7 },
      { id: "minecraft:copper_chestplate", quantity: [1, 1], weight: 7 },
      { id: "minecraft:copper_leggings", quantity: [1, 1], weight: 7 },
      { id: "minecraft:copper_boots", quantity: [1, 1], weight: 7 },
      // === KHỐI VẬT LIỆU CƠ BẢN ===
      { id: "minecraft:stone", quantity: [64, 128], weight: 20 },
      { id: "minecraft:cobblestone", quantity: [64, 128], weight: 20 },
      { id: "minecraft:oak_planks", quantity: [64, 128], weight: 18 },
      { id: "minecraft:oak_log", quantity: [32, 64], weight: 18 },
      { id: "minecraft:dirt", quantity: [64, 128], weight: 22 },
      { id: "minecraft:sand", quantity: [64, 128], weight: 18 },
      { id: "minecraft:gravel", quantity: [64, 128], weight: 18 },
      { id: "minecraft:glass", quantity: [32, 64], weight: 15 },

      // === KHOÁNG SẢN QUẶNG ===
      { id: "minecraft:coal", quantity: [16, 32], weight: 18 },
      { id: "minecraft:iron_ingot", quantity: [8, 16], weight: 15 },
      { id: "minecraft:iron_block", quantity: [2, 8], weight: 15 },
      { id: "minecraft:gold_ingot", quantity: [4, 12], weight: 12 },
      { id: "minecraft:gold_block", quantity: [1, 4], weight: 10 },
      { id: "minecraft:diamond", quantity: [1, 5], weight: 10 },
      { id: "minecraft:diamond_block", quantity: [1, 2], weight: 6 },
      { id: "minecraft:emerald", quantity: [2, 8], weight: 10 },
      { id: "minecraft:emerald_block", quantity: [1, 3], weight: 7 },
      { id: "minecraft:lapis_lazuli", quantity: [16, 32], weight: 14 },
      { id: "minecraft:lapis_block", quantity: [5, 10], weight: 12 },
      { id: "minecraft:redstone", quantity: [32, 64], weight: 15 },
      { id: "minecraft:redstone_block", quantity: [8, 16], weight: 12 },
      { id: "minecraft:quartz", quantity: [16, 32], weight: 13 },

      // === NETHERITE & NETHER ===
      { id: "minecraft:netherite_scrap", quantity: [1, 2], weight: 4 },
      { id: "minecraft:netherite_ingot", quantity: [1, 1], weight: 2 },
      { id: "minecraft:ancient_debris", quantity: [1, 3], weight: 3 },
      { id: "minecraft:netherrack", quantity: [64, 128], weight: 16 },
      { id: "minecraft:soul_sand", quantity: [32, 64], weight: 14 },
      { id: "minecraft:nether_wart", quantity: [16, 32], weight: 12 },
      { id: "minecraft:blaze_rod", quantity: [4, 8], weight: 8 },
      { id: "minecraft:magma_cream", quantity: [8, 16], weight: 10 },
      { id: "minecraft:ghast_tear", quantity: [4, 8], weight: 7 },
      { id: "minecraft:nether_star", quantity: [1, 1], weight: 0.5 },

      // === THỨC ĂN ===
      { id: "minecraft:cooked_beef", quantity: [32, 64], weight: 15 },
      { id: "minecraft:cooked_porkchop", quantity: [32, 64], weight: 15 },
      { id: "minecraft:cooked_chicken", quantity: [32, 64], weight: 15 },
      { id: "minecraft:cooked_salmon", quantity: [24, 48], weight: 13 },
      { id: "minecraft:bread", quantity: [32, 64], weight: 16 },
      { id: "minecraft:baked_potato", quantity: [32, 64], weight: 16 },
      { id: "minecraft:golden_carrot", quantity: [16, 32], weight: 10 },
      { id: "minecraft:golden_apple", quantity: [1, 3], weight: 8 },
      { id: "minecraft:enchanted_golden_apple", quantity: [1, 1], weight: 1 },
      { id: "minecraft:cake", quantity: [2, 5], weight: 10 },
      { id: "minecraft:cookie", quantity: [32, 64], weight: 14 },
      { id: "minecraft:melon_slice", quantity: [32, 64], weight: 14 },
      { id: "minecraft:sweet_berries", quantity: [32, 64], weight: 13 },

      // === THUỐC & BREWING ===
      { id: "minecraft:experience_bottle", quantity: [16, 32], weight: 10 },
      { id: "minecraft:dragon_breath", quantity: [8, 16], weight: 5 },
      { id: "minecraft:phantom_membrane", quantity: [5, 10], weight: 7 },
      { id: "minecraft:fermented_spider_eye", quantity: [8, 16], weight: 9 },
      { id: "minecraft:glistering_melon_slice", quantity: [8, 16], weight: 9 },
      { id: "minecraft:blaze_powder", quantity: [16, 32], weight: 10 },

      // === CÔNG CỤ & VŨ KHÍ DIAMOND ===
      { id: "minecraft:diamond_sword", quantity: [1, 1], weight: 6 },
      { id: "minecraft:diamond_pickaxe", quantity: [1, 1], weight: 6 },
      { id: "minecraft:diamond_axe", quantity: [1, 1], weight: 6 },
      { id: "minecraft:diamond_shovel", quantity: [1, 1], weight: 6 },
      { id: "minecraft:diamond_hoe", quantity: [1, 1], weight: 5 },

      // === GIÁP DIAMOND ===
      { id: "minecraft:diamond_helmet", quantity: [1, 1], weight: 5 },
      { id: "minecraft:diamond_chestplate", quantity: [1, 1], weight: 5 },
      { id: "minecraft:diamond_leggings", quantity: [1, 1], weight: 5 },
      { id: "minecraft:diamond_boots", quantity: [1, 1], weight: 5 },

      // === CÔNG CỤ & VŨ KHÍ NETHERITE ===
      { id: "minecraft:netherite_sword", quantity: [1, 1], weight: 2 },
      { id: "minecraft:netherite_pickaxe", quantity: [1, 1], weight: 2 },
      { id: "minecraft:netherite_axe", quantity: [1, 1], weight: 2 },
      { id: "minecraft:netherite_shovel", quantity: [1, 1], weight: 2 },
      { id: "minecraft:netherite_hoe", quantity: [1, 1], weight: 1.5 },

      // === GIÁP NETHERITE ===
      { id: "minecraft:netherite_helmet", quantity: [1, 1], weight: 1.5 },
      { id: "minecraft:netherite_chestplate", quantity: [1, 1], weight: 1.5 },
      { id: "minecraft:netherite_leggings", quantity: [1, 1], weight: 1.5 },
      { id: "minecraft:netherite_boots", quantity: [1, 1], weight: 1.5 },

      // === ITEM ĐẶC BIỆT ===
      { id: "minecraft:elytra", quantity: [1, 1], weight: 0.3 },
      { id: "minecraft:trident", quantity: [1, 1], weight: 1.5 },
      { id: "minecraft:totem_of_undying", quantity: [1, 1], weight: 3 },
      { id: "minecraft:heart_of_the_sea", quantity: [1, 1], weight: 2 },
      { id: "minecraft:nautilus_shell", quantity: [2, 4], weight: 5 },
      { id: "minecraft:dragon_egg", quantity: [1, 1], weight: 0.1 },
      { id: "minecraft:dragon_head", quantity: [1, 1], weight: 1 },
      { id: "minecraft:wither_skeleton_skull", quantity: [1, 1], weight: 2.5 },
      { id: "minecraft:skeleton_skull", quantity: [1, 2], weight: 4 },
      { id: "minecraft:zombie_head", quantity: [1, 2], weight: 4 },
      { id: "minecraft:creeper_head", quantity: [1, 2], weight: 3 },

      // === SHULKER & END ===
      { id: "minecraft:shulker_shell", quantity: [1, 2], weight: 3.5 },
      { id: "minecraft:shulker_box", quantity: [1, 1], weight: 4 },
      { id: "minecraft:ender_pearl", quantity: [8, 16], weight: 9 },
      { id: "minecraft:ender_eye", quantity: [4, 8], weight: 7 },
      { id: "minecraft:chorus_fruit", quantity: [16, 32], weight: 10 },
      { id: "minecraft:end_crystal", quantity: [2, 4], weight: 5 },
      { id: "minecraft:end_rod", quantity: [8, 16], weight: 8 },

      // === KHỐI ĐẶC BIỆT ===
      { id: "minecraft:obsidian", quantity: [16, 32], weight: 12 },
      { id: "minecraft:crying_obsidian", quantity: [8, 16], weight: 8 },
      { id: "minecraft:glowstone", quantity: [32, 64], weight: 13 },
      { id: "minecraft:sea_lantern", quantity: [16, 32], weight: 11 },
      { id: "minecraft:prismarine_shard", quantity: [16, 32], weight: 10 },
      { id: "minecraft:prismarine_crystals", quantity: [16, 32], weight: 10 },
      { id: "minecraft:sponge", quantity: [4, 8], weight: 6 },
      { id: "minecraft:ice", quantity: [32, 64], weight: 14 },
      { id: "minecraft:packed_ice", quantity: [16, 32], weight: 12 },
      { id: "minecraft:blue_ice", quantity: [8, 16], weight: 9 },

      // === AMETHYST ===
      { id: "minecraft:amethyst_shard", quantity: [16, 32], weight: 10 },
      { id: "minecraft:amethyst_block", quantity: [8, 16], weight: 8 },
      { id: "minecraft:budding_amethyst", quantity: [1, 2], weight: 4 },

      // === COPPER ===
      { id: "minecraft:copper_ingot", quantity: [16, 32], weight: 14 },
      { id: "minecraft:copper_block", quantity: [8, 16], weight: 12 },

      // === UTILITY ITEMS ===
      { id: "minecraft:name_tag", quantity: [2, 5], weight: 5 },
      { id: "minecraft:saddle", quantity: [1, 2], weight: 6 },
      { id: "minecraft:lead", quantity: [4, 8], weight: 8 },
      { id: "minecraft:book", quantity: [16, 32], weight: 12 },
      { id: "minecraft:bookshelf", quantity: [8, 16], weight: 10 },
      { id: "minecraft:compass", quantity: [2, 4], weight: 8 },
      { id: "minecraft:clock", quantity: [2, 4], weight: 8 },
      { id: "minecraft:spyglass", quantity: [1, 2], weight: 6 },
      { id: "minecraft:recovery_compass", quantity: [1, 1], weight: 3 },

      // === REDSTONE ===
      { id: "minecraft:piston", quantity: [8, 16], weight: 10 },
      { id: "minecraft:sticky_piston", quantity: [8, 16], weight: 9 },
      { id: "minecraft:observer", quantity: [8, 16], weight: 9 },
      { id: "minecraft:hopper", quantity: [4, 8], weight: 8 },
      { id: "minecraft:dropper", quantity: [8, 16], weight: 10 },
      { id: "minecraft:dispenser", quantity: [8, 16], weight: 10 },
      { id: "minecraft:repeater", quantity: [16, 32], weight: 12 },
      { id: "minecraft:comparator", quantity: [8, 16], weight: 10 },

      // === BEACON & CONDUIT ===
      { id: "minecraft:beacon", quantity: [1, 1], weight: 1 },
      { id: "minecraft:conduit", quantity: [1, 1], weight: 2 },

      // === MUSIC DISCS ===
      { id: "minecraft:music_disc_13", quantity: [1, 1], weight: 2 },
      { id: "minecraft:music_disc_cat", quantity: [1, 1], weight: 2 },
      { id: "minecraft:music_disc_blocks", quantity: [1, 1], weight: 2 },
      { id: "minecraft:music_disc_chirp", quantity: [1, 1], weight: 2 },
      { id: "minecraft:music_disc_far", quantity: [1, 1], weight: 2 },
      { id: "minecraft:music_disc_mall", quantity: [1, 1], weight: 2 },
      { id: "minecraft:music_disc_mellohi", quantity: [1, 1], weight: 2 },
      { id: "minecraft:music_disc_stal", quantity: [1, 1], weight: 2 },
      { id: "minecraft:music_disc_strad", quantity: [1, 1], weight: 2 },
      { id: "minecraft:music_disc_ward", quantity: [1, 1], weight: 2 },
      { id: "minecraft:music_disc_11", quantity: [1, 1], weight: 1.5 },
      { id: "minecraft:music_disc_wait", quantity: [1, 1], weight: 2 },
      { id: "minecraft:music_disc_otherside", quantity: [1, 1], weight: 1.5 },
      { id: "minecraft:music_disc_5", quantity: [1, 1], weight: 1 },
      { id: "minecraft:music_disc_pigstep", quantity: [1, 1], weight: 1 },

      // === SPAWN EGGS (một số quan trọng) ===
      { id: "minecraft:cow_spawn_egg", quantity: [2, 4], weight: 8 },
      { id: "minecraft:pig_spawn_egg", quantity: [2, 4], weight: 8 },
      { id: "minecraft:sheep_spawn_egg", quantity: [2, 4], weight: 8 },
      { id: "minecraft:chicken_spawn_egg", quantity: [2, 4], weight: 8 },
      { id: "minecraft:horse_spawn_egg", quantity: [1, 2], weight: 6 },
      { id: "minecraft:wolf_spawn_egg", quantity: [1, 2], weight: 6 },
      { id: "minecraft:cat_spawn_egg", quantity: [1, 2], weight: 6 },
      { id: "minecraft:villager_spawn_egg", quantity: [1, 2], weight: 5 },
      { id: "minecraft:iron_golem_spawn_egg", quantity: [1, 1], weight: 3 },

      // === SÁCH PHÙ PHÉP (Enchanted Books) ===
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Sửa Chữa",
        enchantments: { "minecraft:mending": 1 },
        quantity: [1, 1],
        weight: 0.7,
      },
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Sắc Bén V",
        enchantments: { "minecraft:sharpness": 5 },
        quantity: [1, 1],
        weight: 0.8,
      },
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Bảo Vệ IV",
        enchantments: { "minecraft:protection": 4 },
        quantity: [1, 1],
        weight: 1,
      },
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Hiệu Quả V",
        enchantments: { "minecraft:efficiency": 5 },
        quantity: [1, 1],
        weight: 1,
      },
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Vận May III",
        enchantments: { "minecraft:fortune": 3 },
        quantity: [1, 1],
        weight: 0.9,
      },
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Chạm Tơ",
        enchantments: { "minecraft:silk_touch": 1 },
        quantity: [1, 1],
        weight: 1,
      },
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Bất Diệt III",
        enchantments: { "minecraft:unbreaking": 3 },
        quantity: [1, 1],
        weight: 1.2,
      },
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Sức Mạnh V",
        enchantments: { "minecraft:power": 5 },
        quantity: [1, 1],
        weight: 0.9,
      },
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Vô Hạn",
        enchantments: { "minecraft:infinity": 1 },
        quantity: [1, 1],
        weight: 0.6,
      },
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Săn Cá III",
        enchantments: { "minecraft:lure": 3 },
        quantity: [1, 1],
        weight: 1,
      },
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Hô Hấp III",
        enchantments: { "minecraft:respiration": 3 },
        quantity: [1, 1],
        weight: 1,
      },
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Đi Nước Sâu III",
        enchantments: { "minecraft:depth_strider": 3 },
        quantity: [1, 1],
        weight: 0.9,
      },
      {
        id: "minecraft:enchanted_book",
        nameTag: "§bSách: Băng Đá III",
        enchantments: { "minecraft:frost_walker": 2 },
        quantity: [1, 1],
        weight: 0.7,
      },
    ],
  },

  HOUSING_CONFIG: {
    starter_house: {
      id: "starter_house",
      name: "§aCottage Gỗ Sồi (9x11)",
      price: 350,
      size: 13,
      description:
        "Ngôi nhà gỗ sồi 1 tầng ấm cúng. Trần nhà cao 4 block thoáng đãng, có gác xép nhỏ để đồ và mái ngói đỏ che chắn hoàn toàn.",
      blueprint: {
        size: { x: 9, y: 8, z: 11 },
        layers: [
          [
            " ccccccc ",
            "cWWWWWWWWc",
            "cWPPPPPPWc",
            "cWPPPPPPWc",
            "cWPPPPPPWc",
            "cWPPPPPPWc",
            "cWPPPPPPWc",
            "cWPPPPPPWc",
            "cWPPPPPPWc",
            "cWWWWWWWWc",
            " ccccccc ",
          ],
          [
            "         ",
            " L     L ",
            " L Bb$ L ",
            " L     L ",
            " LLLMDLL ",
            " L T   L ",
            " L  F  L ",
            " L  C  L ",
            " L  f  L ",
            "         ",
            "         ",
          ],
          [
            "         ",
            " L     L ",
            " L     L ",
            " L     L ",
            " L     L ",
            " L     L ",
            " L     L ",
            " L     L ",
            " L     L ",
            "         ",
            "         ",
          ],
          [
            "         ",
            " LGGGGGL ",
            " L     L ",
            " L     L ",
            "       L ",
            " L     L ",
            " L     L ",
            " L     L ",
            " L     L ",
            " LGGGGGL ",
            "         ",
          ],
          [
            " sssssss ",
            "sLLLLLLLLLs",
            "sL     Ls",
            "sL     Ls",
            "sL     Ls",
            "sL     Ls",
            "sL     Ls",
            "sL     Ls",
            "sL     Ls",
            "sLLLLLLLLLs",
            " sssssss ",
          ],
          [
            "  rrrrr  ",
            " rrrrrrr ",
            " rL   Lrs",
            " rL   Lrs",
            " rL   Lrs",
            " rL   Lrs",
            " rL   Lrs",
            " rL   Lrs",
            " rL   Lrs",
            " rrrrrrr ",
            "  rrrrr  ",
          ],
          [
            "   RRR   ",
            "  RRRRR  ",
            "  R   R  ",
            "  R   R  ",
            "  R   R  ",
            "  R   R  ",
            "  R   R  ",
            "  R   R  ",
            "  R   R  ",
            "  RRRRR  ",
            "   RRR   ",
          ],
          [
            "         ",
            "         ",
            "   RRR   ",
            "   RRR   ",
            "   RRR   ",
            "   RRR   ",
            "   RRR   ",
            "   RRR   ",
            "   RRR   ",
            "         ",
            "         ",
          ],
        ],
        palette: {
          c: { id: "minecraft:cobblestone" },
          W: { id: "minecraft:oak_log" },
          P: { id: "minecraft:oak_planks" },
          L: { id: "minecraft:stripped_oak_log" },
          G: { id: "minecraft:glass_pane" },
          M: {
            id: "minecraft:oak_door",
            properties: { direction: 0, upper_block_bit: false },
          },
          D: {
            id: "minecraft:oak_trapdoor",
            properties: { direction: 2, open_bit: false },
          },
          B: {
            id: "minecraft:red_bed",
            properties: { direction: 1, head_piece_bit: true },
          },
          b: {
            id: "minecraft:red_bed",
            properties: { direction: 1, head_piece_bit: false },
          },
          $: { id: "minecraft:torch" },
          T: { id: "minecraft:crafting_table" },
          F: { id: "minecraft:furnace" },
          C: { id: "minecraft:chest" },
          f: { id: "minecraft:flower_pot" },
          s: { id: "minecraft:oak_slab", properties: { top_slot_bit: false } },
          r: {
            id: "minecraft:brick_stairs",
            properties: { upside_down_bit: false, weirdo_direction: 0 },
          },
          R: { id: "minecraft:bricks" },
        },
      },
    },

    stone_house: {
      id: "stone_house",
      name: "§7Townhouse Đá (11x13)",
      price: 1200,
      size: 19,
      description:
        "Nhà phố 2 tầng vững chãi. Mỗi tầng cao 4 block. Tầng 1: phòng khách và bếp. Tầng 2: phòng ngủ master và ban công. Mái nhà có lan can an toàn.",
      blueprint: {
        size: { x: 11, y: 12, z: 13 },
        layers: [
          [
            "SSSSSSSSSSS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SSSSSSSSSSS",
          ],
          [
            "SWWWWWWWWWS",
            "W   p P   W",
            "W    $    W",
            "W  aaaaa  W",
            "W  a   a  W",
            "D  a   a  W",
            "W  aaaaa  W",
            "W    ^    W",
            "W    A    W",
            "W  HfC U  W",
            "W         W",
            "W         W",
            "SWWWWWWWWWS",
          ],
          [
            "SWWWWWWWWWS",
            "W         W",
            "W         W",
            "W         W",
            "W         W",
            "          W",
            "W         W",
            "W    ^    W",
            "W         W",
            "W         W",
            "W         W",
            "W         W",
            "SWWWWWWWWWS",
          ],
          [
            "SWWWWWWWWWS",
            "W         W",
            "W         W",
            "W         W",
            "W         W",
            "          W",
            "W         W",
            "W    ^    W",
            "W         W",
            "W         W",
            "W         W",
            "W         W",
            "SWWWWWWWWWS",
          ],
          [
            "SWWWWWWWWWS",
            "WG       GW",
            "WG       GW",
            "WG       GW",
            "WG       GW",
            " G       GW",
            "WG       GW",
            "WG   ^   GW",
            "WG       GW",
            "WG       GW",
            "WG       GW",
            "WG       GW",
            "SWWWWWWWWWS",
          ],
          [
            "SSSSSSSSSSS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPPPPPPPPPS",
            "SPzzzzzz___",
            "SSSSSSSSSSS",
          ],
          [
            "SWWWWWWWWWS",
            "P         P",
            "P  BbK    P",
            "P   $     P",
            "P         P",
            "P         P",
            "P   L     P",
            "P    v    P",
            "P         P",
            "P         P",
            "P         P",
            " z         z",
            "SWWWWWWWWWS",
          ],
          [
            "SWWWWWWWWWS",
            "P         P",
            "P         P",
            "P         P",
            "P         P",
            "P         P",
            "P         P",
            "P    v    P",
            "P         P",
            "P         P",
            "P         P",
            " z         z",
            "SWWWWWWWWWS",
          ],
          [
            "SWWWWWWWWWS",
            "P         P",
            "P         P",
            "P         P",
            "P         P",
            "P         P",
            "P         P",
            "P    v    P",
            "P         P",
            "P         P",
            "P         P",
            " z         z",
            "SWWWWWWWWWS",
          ],
          [
            "SWWWWWWWWWS",
            "PGGGGGGGGP",
            "PGGGGGGGGP",
            "PGGGGGGGGP",
            "PGGGGGGGGP",
            "PGGGGGGGGP",
            "PGGGGGGGGP",
            "PGGGGGGGGP",
            "PGGGGGGGGP",
            "PGGGGGGGGP",
            "PGGGGGGGGP",
            " zGGGGGGGz ",
            "SWWWWWWWWWS",
          ],
          [
            " ccccccccc ",
            "cSSSSSSSSSc",
            "cSSSSSSSSSc",
            "cSSSSSSSSSc",
            "cSSSSSSSSSc",
            "cSSSSSSSSSc",
            "cSSSSSSSSSc",
            "cSSSSSSSSSc",
            "cSSSSSSSSSc",
            "cSSSSSSSSSc",
            "cSSSSSSSSSc",
            "cSz      zSc",
            " ccccccccc ",
          ],
          [
            " SSSSSSSSS ",
            "SsssssssssS",
            "SsssssssssS",
            "SsssssssssS",
            "SsssssssssS",
            "SsssssssssS",
            "SsssssssssS",
            "SsssssssssS",
            "SsssssssssS",
            "SsssssssssS",
            "SsssssssssS",
            "S z      z S",
            " SSSSSSSSS ",
          ],
        ],
        palette: {
          S: { id: "minecraft:stone_bricks" },
          W: { id: "minecraft:stripped_dark_oak_log" },
          P: { id: "minecraft:spruce_planks" },
          G: { id: "minecraft:glass" },
          D: {
            id: "minecraft:spruce_door",
            properties: { direction: 0, upper_block_bit: false },
          },
          "^": {
            id: "minecraft:spruce_stairs",
            properties: { upside_down_bit: false, weirdo_direction: 0 },
          },
          v: {
            id: "minecraft:spruce_stairs",
            properties: { upside_down_bit: true, weirdo_direction: 0 },
          },
          a: { id: "minecraft:dark_oak_fence" },
          $: { id: "minecraft:lantern", properties: { hanging: false } },
          p: { id: "minecraft:potted_poppy" },
          A: { id: "minecraft:anvil" },
          U: {
            id: "minecraft:blast_furnace",
            properties: { facing_direction: 2 },
          },
          H: { id: "minecraft:smoker", properties: { facing_direction: 3 } },
          f: { id: "minecraft:composter" },
          C: { id: "minecraft:chest", properties: { facing_direction: 2 } },
          B: {
            id: "minecraft:lime_bed",
            properties: { direction: 1, head_piece_bit: true },
          },
          b: {
            id: "minecraft:lime_bed",
            properties: { direction: 1, head_piece_bit: false },
          },
          K: { id: "minecraft:bookshelf" },
          L: { id: "minecraft:lectern", properties: { direction: 2 } },
          z: { id: "minecraft:spruce_fence" },
          _: {
            id: "minecraft:spruce_fence_gate",
            properties: { direction: 0 },
          },
          s: {
            id: "minecraft:smooth_stone_slab",
            properties: { top_slot_bit: false },
          },
          c: { id: "minecraft:stone_brick_wall" },
        },
      },
    },

    farm_house: {
      id: "farm_house",
      name: "§eHomestead Nông Trại (17x19)",
      price: 1800,
      size: 25,
      description:
        "Trang trại rộng rãi với nhà chính 2 tầng kiên cố. Tầng 1: Bếp, kho. Tầng 2: Phòng ngủ. Xung quanh là vườn, chuồng gia súc và ao cá.",
      blueprint: {
        size: { x: 17, y: 11, z: 19 },
        layers: [
          [
            "                 ",
            " zzzzzzzzzzzzzzz ",
            " zgggggggggggggz ",
            " zgg11111gggwwgz ",
            " zgg11111gggwwgz ",
            " zgg11111gggwwgz ",
            " zgg11111g______ ",
            " zgggggggggRRRRRz",
            " zgggggggggR   Rz",
            " zgggggggggR   Rz",
            " zgggggggggD   Rz",
            " zgggggggggR   Rz",
            " zgggggggggRRMRRz",
            " zgggggggggggggz ",
            " zgggggggggggggz ",
            " zgggggggggggggz ",
            " zgggggggggggggz ",
            " zzzzzzzzzzzzzzz ",
            "                 ",
          ],
          [
            "                 ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f          P  v Pf ",
            " f          P    Pf ",
            " f          P    Pf ",
            " f               Pf ",
            " f          P    Pf ",
            " f          P  v Pf ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            "                 ",
          ],
          [
            "                 ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f          P    Pf ",
            " f          P    Pf ",
            " f          P    Pf ",
            " f               Pf ",
            " f          P    Pf ",
            " f          P    Pf ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            "                 ",
          ],
          [
            "                 ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f          PGGGPf ",
            " f          PGGGPf ",
            " f          PGGGPf ",
            "  GGGGGGGGG PGGGPf ",
            " f          PGGGPf ",
            " f          PGGGPf ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            "                 ",
          ],
          [
            "                 ",
            " fccccccccccccf ",
            " fcCCCCCCCCCCcf ",
            " fcCCCCCCCCCCcf ",
            " fcCCCCCCCCCCcf ",
            " fcCCCCCCCCCCcf ",
            " fcCCCCCCCCCCcf ",
            " fcCCCCCCCCCcpppf ",
            " fcC T A CCCp  pf ",
            " fcC  H  CCCp  pf ",
            " fcC  F CCC     pf ",
            " fcC U C CCCp  pf ",
            " fcCCCCCCCCCpM pf ",
            " fcCCCCCCCCCCcf ",
            " fcCCCCCCCCCCcf ",
            " fcCCCCCCCCCCcf ",
            " fcCCCCCCCCCCcf ",
            " fccccccccccccf ",
            "                 ",
          ],
          [
            "                 ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f          p  v pf ",
            " f  BbK    p    pf ",
            " f    $     p    pf ",
            " f   L           pf ",
            " f          p    pf ",
            " f          p  v pf ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            "                 ",
          ],
          [
            "                 ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f          p    pf ",
            " f          p    pf ",
            " f          p    pf ",
            " f               pf ",
            " f          p    pf ",
            " f          p    pf ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            "                 ",
          ],
          [
            "                 ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f          pGGGp_ ",
            " f          pGGGp_ ",
            " f          pGGGp_ ",
            " fGGGGGGGGGGpGGGp_ ",
            " f          pGGGp_ ",
            " f          pGGGp_ ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            " f             f ",
            "                 ",
          ],
          [
            "  ooooooooooooo  ",
            " ooooooooooooooo ",
            " o    C    ooooo ",
            " o    C    ooooo ",
            " o    C    ooooo ",
            " o    C    ooooo ",
            " o    C    ooooo ",
            " ooooCoooooooooo ",
            " ooooCoooooooooo ",
            " ooooCoooooooooo ",
            " ooooCoooooooooo ",
            " ooooCoooooooooo ",
            " ooooCoooooooooo ",
            " ooooooooooooooo ",
            " ooooooooooooooo ",
            " ooooooooooooooo ",
            " ooooooooooooooo ",
            "  ooooooooooooo  ",
            "                 ",
          ],
          [
            "   SSSSSSSSS     ",
            "  SSSSSSSSSSS    ",
            "  S    S    S    ",
            "  S    S    S    ",
            "  S    S    S    ",
            "  S    S    S    ",
            "  S    S    S    ",
            "  SSSSSSSSSSS    ",
            "  SSSSSSSSSSS    ",
            "  SSSSSSSSSSS    ",
            "  SSSSSSSSSSS    ",
            "  SSSSSSSSSSS    ",
            "  SSSSSSSSSSS    ",
            "  SSSSSSSSSSS    ",
            "  SSSSSSSSSSS    ",
            "  SSSSSSSSSSS    ",
            "  SSSSSSSSSSS    ",
            "   SSSSSSSSS     ",
            "                 ",
          ],
          [
            "                 ",
            "    SSSSSSS      ",
            "     SSSSS       ",
            "     SSSSS       ",
            "     SSSSS       ",
            "     SSSSS       ",
            "     SSSSS       ",
            "      SSS        ",
            "      SSS        ",
            "      SSS        ",
            "      SSS        ",
            "      SSS        ",
            "      SSS        ",
            "     SSSSS       ",
            "     SSSSS       ",
            "     SSSSS       ",
            "     SSSSS       ",
            "    SSSSSSS      ",
            "                 ",
          ],
        ],
        palette: {
          z: { id: "minecraft:oak_fence" },
          g: { id: "minecraft:grass" },
          1: { id: "minecraft:farmland" },
          w: { id: "minecraft:water" },
          f: { id: "minecraft:oak_leaves" },
          _: {
            id: "minecraft:oak_fence_gate",
            properties: { direction: 0, open_bit: false },
          },
          R: { id: "minecraft:cobblestone" },
          P: { id: "minecraft:oak_planks" },
          C: { id: "minecraft:spruce_planks" },
          c: { id: "minecraft:spruce_log" },
          p: { id: "minecraft:stripped_spruce_log" },
          D: {
            id: "minecraft:oak_door",
            properties: { direction: 2, upper_block_bit: false },
          },
          M: {
            id: "minecraft:spruce_door",
            properties: { direction: 1, upper_block_bit: false },
          },
          G: { id: "minecraft:glass_pane" },
          v: {
            id: "minecraft:spruce_stairs",
            properties: { upside_down_bit: true, weirdo_direction: 2 },
          },
          T: { id: "minecraft:crafting_table" },
          A: { id: "minecraft:anvil" },
          H: { id: "minecraft:cartography_table" },
          F: { id: "minecraft:furnace" },
          U: { id: "minecraft:smoker" },
          B: {
            id: "minecraft:yellow_bed",
            properties: { direction: 2, head_piece_bit: true },
          },
          b: {
            id: "minecraft:yellow_bed",
            properties: { direction: 2, head_piece_bit: false },
          },
          K: { id: "minecraft:bookshelf" },
          L: { id: "minecraft:lantern", properties: { hanging: true } },
          $: { id: "minecraft:torch" },
          o: {
            id: "minecraft:oak_stairs",
            properties: { upside_down_bit: false, weirdo_direction: 0 },
          },
          S: { id: "minecraft:oak_slab" },
        },
      },
    },

    modern_villa: {
      id: "modern_villa",
      name: "§fVilla Thạch Anh (17x15)",
      price: 3800,
      size: 29,
      description:
        "Biệt thự 2 tầng cao cấp, trần cao 5 block. Tầng 1: Hồ bơi, phòng khách, bếp. Tầng 2: Phòng ngủ, phòng tắm, ban công. Tường kính và thạch anh vững chắc.",
      blueprint: {
        size: { x: 17, y: 13, z: 15 },
        layers: [
          [
            "QQQQQQQQQQQQQQQQQ",
            "QSSSSSSSSSSSSSSSQ",
            "QSSSSSSSSSSSSSSSQ",
            "QSSSSSSSSSSSSSSSQ",
            "QSSSSSSSSSSSSSSSQ",
            "QSSSSSSSSSSSSSSSQ",
            "QSSSSSSSSSSSSSSSQ",
            "QSSSSSSSSSSSSSSSQ",
            "QSSSSSSSSSSSSSSSQ",
            "QSSSSSSSSSSSSSSSQ",
            "QSSSSSSSSSSSSSSSQ",
            "QSSSSSSSSSSSSSSSQ",
            "QSSSSSSSSSSSSSSSQ",
            "QSSSSSSSSSSSSSSSQ",
            "QQQQQQQQQQQQQQQQQ",
          ],
          [
            "QGGGGGGGGwwwwwwww",
            "Gwwwwwwwwwwwwwwww",
            "Gwwwwwwwwwwwwwwww",
            "Gwwwwwwwwwwwwwwww",
            "Gwwwwwwwwwwwwwwww",
            "Gwwwwwwwwwwwwwwww",
            "GQQQQQQQQQQQQQQQQ",
            "Q P     P P      Q",
            "Q P  $  P P aaaaaQ",
            "Q P     P P a   aQ",
            "Q P T   P P a   aQ",
            "Q P U C P P aaaaaQ",
            "Q P  f  P P      Q",
            "Q PPPPPPP P      Q",
            "QHHHHHHHHQQQQQQQQ",
          ],
          [
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q               Q",
          ],
          [
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q               Q",
          ],
          [
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q               Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q               Q",
          ],
          [
            "QGGGGGGGGGGGGGGGG",
            "G               G",
            "G               G",
            "G               G",
            "G               G",
            "G               G",
            "GQQQQQQQQQQQQQQQQ",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "Q P     P P      Q",
            "QGGGGGGGGGGGGGGGG",
          ],
          [
            "QQQQQQQQQQQQQQQQQ",
            "QPPPPPPPPPPPPPP_Q",
            "QPPPPPPPPPPPPP__Q",
            "QP             __Q",
            "QP             __Q",
            "QP             __Q",
            "QP               Q",
            "QP               Q",
            "QP   v           Q",
            "QP               Q",
            "QP               Q",
            "QP   L           Q",
            "QP               Q",
            "QPPPPPPPPPPPPPP_Q",
            "QQQQQQQQQQQQQQQQQ",
          ],
          [
            "QGGGGGGGGGGGGGGGG",
            "QG   BbK      zzG",
            "QG    $       zzG",
            "QG            zzG",
            "QG            zzG",
            "QG            zzG",
            "QGMMMMMMMMMMMMMMG",
            "QG               G",
            "QG   v           G",
            "QG               G",
            "QG  W            G",
            "QG               G",
            "QG               G",
            "QGGGGGGGGGGGGGGGG",
            "QQQQQQQQQQQQQQQQQ",
          ],
          [
            "Q               Q",
            "QG            zzG",
            "QG            zzG",
            "QG            zzG",
            "QG            zzG",
            "QG            zzG",
            "QG               G",
            "QG               G",
            "QG   v           G",
            "QG               G",
            "QG               G",
            "QG               G",
            "QG               G",
            "QG               G",
            "Q               Q",
          ],
          [
            "Q               Q",
            "QG            zzG",
            "QG            zzG",
            "QG            zzG",
            "QG            zzG",
            "QG            zzG",
            "QG               G",
            "QG               G",
            "QG   v           G",
            "QG               G",
            "QG               G",
            "QG               G",
            "QG               G",
            "QG               G",
            "Q               Q",
          ],
          [
            "Q               Q",
            "QG            zzG",
            "QG            zzG",
            "QG            zzG",
            "QG            zzG",
            "QG            zzG",
            "QG               G",
            "QG               G",
            "QG   v           G",
            "QG               G",
            "QG               G",
            "QG               G",
            "QG               G",
            "QG               G",
            "Q               Q",
          ],
          [
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
            "QGGGGGGGGGGGGGGGG",
          ],
          [
            " sssssssssssssss ",
            "sssssssssssssssss",
            "sssssssssssssssss",
            "sssssssssssssssss",
            "sssssssssssssssss",
            "sssssssssssssssss",
            "sssssssssssssssss",
            "sssssssssssssssss",
            "sssssssssssssssss",
            "sssssssssssssssss",
            "sssssssssssssssss",
            "sssssssssssssssss",
            "sssssssssssssssss",
            "sssssssssssssssss",
            " sssssssssssssss ",
          ],
        ],
        palette: {
          Q: { id: "minecraft:quartz_block" },
          S: { id: "minecraft:smooth_stone" },
          G: { id: "minecraft:tinted_glass" },
          w: { id: "minecraft:water" },
          P: { id: "minecraft:polished_diorite" },
          H: {
            id: "minecraft:dark_oak_door",
            properties: { direction: 1, upper_block_bit: false },
          },
          v: {
            id: "minecraft:quartz_stairs",
            properties: { upside_down_bit: false, weirdo_direction: 0 },
          },
          a: { id: "minecraft:dark_oak_fence" },
          $: { id: "minecraft:sea_lantern" },
          T: { id: "minecraft:smithing_table" },
          U: {
            id: "minecraft:blast_furnace",
            properties: { facing_direction: 2 },
          },
          C: { id: "minecraft:barrel", properties: { facing_direction: 1 } },
          f: { id: "minecraft:chest", properties: { facing_direction: 2 } },
          _: {
            id: "minecraft:iron_trapdoor",
            properties: { direction: 0, open_bit: false },
          },
          z: { id: "minecraft:iron_bars" },
          B: {
            id: "minecraft:white_bed",
            properties: { direction: 1, head_piece_bit: true },
          },
          b: {
            id: "minecraft:white_bed",
            properties: { direction: 1, head_piece_bit: false },
          },
          K: { id: "minecraft:bookshelf" },
          L: { id: "minecraft:lectern", properties: { direction: 2 } },
          M: { id: "minecraft:light_gray_concrete" },
          W: { id: "minecraft:cauldron", properties: { fill_level: 6 } },
          s: {
            id: "minecraft:quartz_slab",
            properties: { top_slot_bit: false },
          },
        },
      },
    },

    wizard_tower: {
      id: "wizard_tower",
      name: "§5Tháp Huyền Bí (13x13x20)",
      price: 6500,
      size: 21,
      description:
        "Tháp 5 tầng ma thuật rộng rãi (13x13). Mỗi tầng cao 4-5 block với cầu thang xoắn ốc. Tầng 3 là thư viện và bàn cường hóa đầy đủ.",
      blueprint: {
        size: { x: 13, y: 20, z: 13 },
        layers: [
          [
            "  OOOOOOOOO  ",
            " OBBBBBBBBBO ",
            "OBBBBBBBBBBBO",
            "OBBBBBBBBBBBO",
            "OBBBBBBBBBBBO",
            "OBBBBBBBBBBBO",
            "OBBBBDDDDDDBO",
            "OBBBBBBBBBBBO",
            "OBBBBBBBBBBBO",
            "OBBBBBBBBBBBO",
            "OBBBBBBBBBBBO",
            " OBBBBBBBBBO ",
            "  OOOOOOOOO  ",
          ],
          [
            "             ",
            "   BBBBBBB   ",
            "  B       B  ",
            " B   $   B ",
            " B         B ",
            " B    ^    B ",
            " B         B ",
            " B    p    B ",
            " B   M N   B ",
            " B         B ",
            "  B       B  ",
            "   BBBBBBB   ",
            "             ",
          ],
          [
            "             ",
            "   BBBBBBB   ",
            "  B       B  ",
            " B         B ",
            " B         B ",
            " B    ^    B ",
            " B         B ",
            " B         B ",
            " B         B ",
            " B         B ",
            "  B       B  ",
            "   BBBBBBB   ",
            "             ",
          ],
          [
            "             ",
            "   BBBBBBB   ",
            "  B       B  ",
            " B         B ",
            " B         B ",
            " B    ^    B ",
            " B         B ",
            " B         B ",
            " B         B ",
            " B         B ",
            "  B       B  ",
            "   BBBBBBB   ",
            "             ",
          ],
          [
            "  BBBBBBBBB  ",
            " BBBBBBBBBBB ",
            "BBBBBBBBBBBBB",
            "BBBBBBBBBBBBB",
            "BBBBBBBBBBBBB",
            "BBBB   ^   BBBB",
            "BBBBBBBBBBBBB",
            "BBBBBBBBBBBBB",
            "BBBBBBBBBBBBB",
            "BBBBBBBBBBBBB",
            "BBBBBBBBBBBBB",
            " BBBBBBBBBBB ",
            "  BBBBBBBBB  ",
          ],
          [
            "             ",
            "   KKKKKKK   ",
            "  K       K  ",
            " K C     K ",
            " K C       K ",
            " K    ^    K ",
            " K       C K ",
            " K       C K ",
            " K         K ",
            " K   $     K ",
            "  K       K  ",
            "   KKKKKKK   ",
            "             ",
          ],
          [
            "             ",
            "   KKKKKKK   ",
            "  K       K  ",
            " K         K ",
            " K         K ",
            " K    ^    K ",
            " K         K ",
            " K         K ",
            " K         K ",
            " K         K ",
            "  K       K  ",
            "   KKKKKKK   ",
            "             ",
          ],
          [
            "             ",
            "   KKKKKKK   ",
            "  K       K  ",
            " K         K ",
            " K         K ",
            " K    ^    K ",
            " K         K ",
            " K         K ",
            " K         K ",
            " K         K ",
            "  K       K  ",
            "   KKKKKKK   ",
            "             ",
          ],
          [
            "  KKKKKKKKK  ",
            " KKKKKKKKKKK ",
            "KKKKKKKKKKKKK",
            "KKKKK   KKKKK",
            "KKKKK E KKKKK",
            "KKKKK   KKKKK",
            "KKKK   ^   KKKK",
            "KKKKKKKKKKKKK",
            "KKKKKKKKKKKKK",
            "KKKKKKKKKKKKK",
            "KKKKKKKKKKKKK",
            " KKKKKKKKKKK ",
            "  KKKKKKKKK  ",
          ],
          [
            "             ",
            "   BBBBBBB   ",
            "  B       B  ",
            " B         B ",
            " B   9b    B ",
            " B   L$    B ",
            " B    ^    B ",
            " B         B ",
            " B         B ",
            " B         B ",
            "  B       B  ",
            "   BBBBBBB   ",
            "             ",
          ],
          [
            "             ",
            "   BBBBBBB   ",
            "  B       B  ",
            " B         B ",
            " B         B ",
            " B         B ",
            " B    ^    B ",
            " B         B ",
            " B         B ",
            " B         B ",
            "  B       B  ",
            "   BBBBBBB   ",
            "             ",
          ],
          [
            "             ",
            "   BBBBBBB   ",
            "  B       B  ",
            " B         B ",
            " B         B ",
            " B         B ",
            " B    ^    B ",
            " B         B ",
            " B         B ",
            " B         B ",
            "  B       B  ",
            "   BBBBBBB   ",
            "             ",
          ],
          [
            "  AAAAAAAAA  ",
            " AAAAAAAAAAA ",
            "AAAAAAAAAAAAA",
            "AAAAA   AAAAA",
            "AAAAA   AAAAA",
            "AAAAA   AAAAA",
            "AAAAA  ^  AAAAA",
            "AAAAA   AAAAA",
            "AAAAA   AAAAA",
            "AAAAA   AAAAA",
            "AAAAAAAAAAAAA",
            " AAAAAAAAAAA ",
            "  AAAAAAAAA  ",
          ],
          [
            "  AGGGGGGGGA  ",
            " AGGGGGGGGGA ",
            "AGGGGGGGGGGGGA",
            "GGGG   GGGGG",
            "GGGG   GGGGG",
            "GGGG   GGGGG",
            "GGGG   ^  GGGG",
            "GGGG   GGGGG",
            "GGGG   GGGGG",
            "GGGG   GGGGG",
            "AGGGGGGGGGGGGA",
            " AGGGGGGGGGA ",
            "  AGGGGGGGGA  ",
          ],
          [
            "  AGGGGGGGGA  ",
            " AGGGGGGGGGA ",
            "AGGGGGGGGGGGGA",
            "GGGG   GGGGG",
            "GGGG   GGGGG",
            "GGGG   GGGGG",
            "GGGG      GGGG",
            "GGGG   GGGGG",
            "GGGG   GGGGG",
            "GGGG   GGGGG",
            "AGGGGGGGGGGGGA",
            " AGGGGGGGGGA ",
            "  AGGGGGGGGA  ",
          ],
          [
            "    PPPPPPP    ",
            "   PPPPPPPPP   ",
            "  PPPPPPPPPPP  ",
            " PPPPPPPPPPPPP ",
            "PPPPPPPPPPPPPPP",
            "PPPPPPPPPPPPPPP",
            "PPPPPPPPPPPPPPP",
            "PPPPPPPPPPPPPPP",
            "PPPPPPPPPPPPPPP",
            "PPPPPPPPPPPPPPP",
            "  PPPPPPPPPPP  ",
            "   PPPPPPPPP   ",
            "    PPPPPPP    ",
          ],
          [
            "     PPPPP     ",
            "    PPPPPPP    ",
            "   PPPPPPPPP   ",
            "  PPPPPPPPPPP  ",
            " PPPPP   PPPPP ",
            " PPPPP X PPPPP ",
            " PPPPP   PPPPP ",
            "  PPPPPPPPPPP  ",
            "   PPPPPPPPP   ",
            "    PPPPPPP    ",
            "     PPPPP     ",
            "             ",
            "             ",
          ],
          [
            "      PPP      ",
            "     PPPPP     ",
            "    PPPPPPP    ",
            "   PPPPPPPPP   ",
            "  PPPPP   PPPPP  ",
            "  PPPPP   PPPPP  ",
            "  PPPPP   PPPPP  ",
            "   PPPPPPPPP   ",
            "    PPPPPPP    ",
            "     PPPPP     ",
            "      PPP      ",
            "             ",
            "             ",
          ],
          [
            "       P       ",
            "      PPP      ",
            "     PPPPP     ",
            "    PPPPPPP    ",
            "   PPPPP   PPPPP   ",
            "   PPPPP   PPPPP   ",
            "   PPPPP   PPPPP   ",
            "    PPPPPPP    ",
            "     PPPPP     ",
            "      PPP      ",
            "       P       ",
            "             ",
            "             ",
          ],
          [
            "               ",
            "       P       ",
            "      PPP      ",
            "     PPPPP     ",
            "    PPPP     PPPP    ",
            "    PPPP  X  PPPP    ",
            "    PPPP     PPPP    ",
            "     PPPPP     ",
            "      PPP      ",
            "       P       ",
            "               ",
            "             ",
            "             ",
          ],
        ],
        palette: {
          O: { id: "minecraft:crying_obsidian" },
          B: { id: "minecraft:polished_blackstone_bricks" },
          A: { id: "minecraft:amethyst_block" },
          K: { id: "minecraft:bookshelf" },
          P: { id: "minecraft:purpur_block" },
          G: { id: "minecraft:tinted_glass" },
          D: {
            id: "minecraft:warped_door",
            properties: { direction: 1, upper_block_bit: false },
          },
          "^": {
            id: "minecraft:warped_stairs",
            properties: { upside_down_bit: false, weirdo_direction: 2 },
          },
          p: { id: "minecraft:brewing_stand" },
          M: { id: "minecraft:cauldron", properties: { fill_level: 6 } },
          N: {
            id: "minecraft:soul_campfire",
            properties: { extinguished: false },
          },
          E: { id: "minecraft:enchanting_table" },
          C: { id: "minecraft:barrel", properties: { facing_direction: 1 } },
          9: {
            id: "minecraft:purple_bed",
            properties: { direction: 1, head_piece_bit: true },
          },
          b: {
            id: "minecraft:purple_bed",
            properties: { direction: 1, head_piece_bit: false },
          },
          L: { id: "minecraft:lectern", properties: { direction: 2 } },
          $: { id: "minecraft:soul_lantern", properties: { hanging: false } },
          X: { id: "minecraft:beacon" },
        },
      },
    },
  },
  BLOOD_MOON_CONFIG: {
    ENABLED: true,
    CHANCE: 0.25, // 25% cơ hội kích hoạt mỗi đêm
    REWARD_MULTIPLIER: 2, // Nhân 2 XP và Nguyên Thạch
    EFFECTS: {
      SPEED: { amplifier: 1, duration: 20000000 }, // Speed II (Tăng 40%)
      STRENGTH: { amplifier: 1, duration: 20000000 }, // Strength II (Tăng 260% Sát thương)
      HEALTH_BOOST: { amplifier: 4, duration: 20000000 }, // Health Boost V (Thêm 20 Máu)
    },
  },

  SURVIVAL_CONFIG: {
    // === THÂN NHIỆT (GIỮ NGUYÊN) ===
    TEMP_ENABLED: true,
    TEMP_UPDATE_INTERVAL: 200, // 5 giây
    TEMP_DEFAULT_TARGET: 37.0,
    TEMP_CHANGE_PER_TICK: 0.05,
    TEMP_BIOME_COLD_FACTOR: 2.0,
    TEMP_BIOME_HOT_FACTOR: 1.5,
    TEMP_IN_WATER_FACTOR: 2.0,
    TEMP_NEAR_FIRE_FACTOR: 1.5,
    TEMP_NIGHT_FACTOR: 1.5,
    TEMP_LEATHER_ARMOR_MODIFIER: 0.5,
    TEMP_METAL_ARMOR_MODIFIER: 1.25,
    TEMP_HOT_THRESHOLD: 38.0, // Ngưỡng bắt đầu có thể bị Sốt
    TEMP_CRITICAL_HOT_THRESHOLD: 42.0,
    TEMP_COLD_THRESHOLD: 36.0, // Ngưỡng bắt đầu có thể bị Cảm
    TEMP_CRITICAL_COLD_THRESHOLD: 32.0,

    // === NƯỚC UỐNG (GIỮ NGUYÊN) ===
    THIRST_ENABLED: true,
    THIRST_UPDATE_INTERVAL: 200, // 5 giây
    THIRST_DROP_RATE: 0.5,
    THIRST_SPRINT_MULTIPLIER: 2.0,
    THIRST_HOT_BIOME_MULTIPLIER: 1.5,
    THIRST_DRINK_AMOUNT: 30,
    THIRST_DIRTY_WATER_CHANCE: 0.3,

    // === CHẤN THƯƠNG & BỆNH TẬT (PHẦN MỚI & CẬP NHẬT) ===
    INJURY_ENABLED: true,
    BROKEN_LEG: {
      FALL_DAMAGE_THRESHOLD: 2.0,
      CHANCE: 0.8,
      REST_DURATION_TICKS: 60 * 20, // 60 giây đứng yên
      SELF_HEAL_DURATION_TICKS: 180 * 20, // 3 phút tự khỏi nếu di chuyển
    },
    BLEEDING: {
      CHANCE_FROM_STRONG_MOB: 0.25, // 25%
      DURATION_TICKS: 60 * 20, // 60 giây
      DAMAGE_INTERVAL_TICKS: 8 * 20, // 8 giây
      DAMAGE_AMOUNT: 1, // 0.5 tim
    },
    BURNS: {
      ON_FIRE_THRESHOLD_TICKS: 0.1 * 20, // 2 giây
      DURATION_TICKS: 45 * 20, // 45 giây
      WATER_CURE_DURATION_TICKS: 10 * 20, // 10 giây trong nước
    },
    DAZED: {
      CHANCE_FROM_EXPLOSION: 0.8, // 80%
      DURATION_TICKS: 20 * 20, // 20 giây
    },
    SICKNESS: {
      // Sốt & Cảm lạnh
      UNSTABLE_TEMP_THRESHOLD_TICKS: 45 * 20, // 45 giây nhiệt độ bất thường
      CHANCE: 1, // 100% tỉ lệ mắc bệnh
      STABILIZE_TEMP_CURE_TICKS: 90 * 20, // 90 giây nhiệt độ ổn định để khỏi
      SELF_HEAL_DURATION_TICKS: 300 * 20, // 5 phút tự khỏi
      THIRST_MULTIPLIER: 1.8,
    },
    ZOMBIE_VIRUS: {
      // INFECTION_CHANCE: 0.05, // 5% tỉ lệ cơ bản //comment tạm để test xem chạy được hết k
      INFECTION_CHANCE: 0.05, // 5% tỉ lệ cơ bản
      LOW_HEALTH_MULTIPLIER: 3, // Tăng gấp 3 lần tỉ lệ khi máu dưới 50%
      STAGE_1_DURATION_TICKS: 600 * 20, // 5 phút
      STAGE_2_DURATION_TICKS: 300 * 20, // 3 phút
      STAGE_3_DURATION_TICKS: 120 * 20, // 2 phút
      CURE_DURATION_TICKS: 30 * 20, // 30 giây để hoàn thành nghi thức
      //   INFECTION_CHANCE: 0.9, // 5% tỉ lệ cơ bản
      // LOW_HEALTH_MULTIPLIER: 3, // Tăng gấp 3 lần tỉ lệ khi máu dưới 50%
      // STAGE_1_DURATION_TICKS: 60 * 20, // 5 phút
      // STAGE_2_DURATION_TICKS: 30 * 20, // 3 phút
      // STAGE_3_DURATION_TICKS: 30 * 20, // 2 phút
      // CURE_DURATION_TICKS: 30 * 20, // 30 giây để hoàn thành nghi thức
    },
    // === GIUN SÁN (MỚI) ===
    // === THÊM ĐOẠN NÀY VÀO ===
    PARASITE: {
      DURATION_TICKS: 120 * 20,
      DAMAGE_AMOUNT: 0.5,
      DAMAGE_INTERVAL_TICKS: 10 * 20,
      THIRST_MULTIPLIER: 3,
      WATER_REDUCE_DURATION: 30 * 20,
      INFECTION_CHANCE_RAW_FOOD: 0.8,
      INFECTION_CHANCE_DIRTY_WATER: 0.7,
    },

    SPRAINED_ARM: {
      REST_DURATION_TICKS: 30 * 20, // 30s
      SELF_HEAL_DURATION_TICKS: 180 * 20, // 3 phút
    },
    // ===================================================================
    // === HỆ THỐNG TINH THẦN (SANITY) - PHIÊN BẢN HOÀN CHỈNH ============
    // ===================================================================
    SANITY_CONFIG: {
      ENABLED: true,
      UPDATE_INTERVAL_TICKS: 200, // Cập nhật mỗi 5 giây

      THRESHOLDS: {
        ANXIOUS: 75, // Bất an
        PARANOID: 40, // Hoang tưởng
        INSANE: 15, // Hóa điên
      },

      LOSS_FACTORS: {
        IN_DARKNESS: 1.5,
        LOW_HEALTH: 1.0,
        LOW_HUNGER_THIRST: 0.8,
        INJURY_STRESS: 1.2,
        NETHER_AMBIENCE: 0.7,
        END_AMBIENCE: 1.0,
        LONELINESS: 1.0, // Tinh thần mất đi khi cô độc quá lâu
      },

      GAIN_FACTORS: {
        NEAR_LIGHT_SOURCE: 2.0,
        IN_DAYLIGHT: 1,
        SOCIAL_COMFORT: 4, // Hồi phục khi ở gần người/vật khác
      },

      EVENT_CHANGES: {
        PLAYER_HURT: -0.5,
        EAT_ROTTEN_FLESH: -5.0,
        SLEEP_IN_BED: 25.0,
        EAT_GOOD_FOOD: 5.0,
        LISTEN_MUSIC_DISC: 15.0,
      },

      LONELINESS_CONFIG: {
        ENABLED: true,
        THRESHOLD_SECONDS: 300, // 5 phút
        CHECK_RADIUS: 150,
      },

      EFFECTS: {
        ANXIOUS_WEAKNESS_AMPLIFIER: 0,
        PARANOID_SLOWNESS_AMPLIFIER: 0,
        PARANOID_MINING_FATIGUE_AMPLIFIER: 0,
        INSANE_SLOWNESS_AMPLIFIER: 1,
        INSANE_MINING_FATIGUE_AMPLIFIER: 1,
        SANITY_DRAIN_DAMAGE: 1,
      },
    },
  },

  // === HỆ THỐNG NHIỆM VỤ CỐT TRUYỆN =================================
  // ===================================================================
  // TRONG FILE config.js, THAY THẾ TOÀN BỘ KHỐI STORY_QUESTS BẰNG KHỐI NÀY

  STORY_QUESTS: {
    // ═══════════════════════════════════════════════════════════════════
    // ═══ HỒI I: TIẾNG VỌNG THỨC TỈNH (THE AWAKENING ECHOES) ════════════
    // ═══════════════════════════════════════════════════════════════════

    // ─────────────────────────────────────────────────────────────────
    // ACT 1: THỨC TỈNH (Quest 1-5) - Làm quen với thế giới
    // ─────────────────────────────────────────────────────────────────

    CHAPTER_1_QUEST_1: {
      chapterTitle: "Hồi I: Tiếng Vọng Thức Tỉnh",
      title: "Người Lạ Không Tên",
      unlocks: null,
      steps: [
        {
          // Bước 0: Thức tỉnh đầy mê hoặc
          type: "DIALOGUE",
          log: "Mở mắt trong một thế giới xa lạ... Steve, đó có phải tên tôi?",
          dialogue: [
            {
              speaker: "Steve",
              text: "...Ugh... đầu... đầu tôi đau như búa bổ...",
            },
            {
              speaker: "Steve",
              text: "*Từ từ mở mắt* Ánh sáng... chói quá... Đây là... đâu?",
            },
            {
              speaker: "Steve",
              text: "*Nhìn quanh* Rừng cây... Mùi đất ẩm... Tiếng chim hót... Nhưng sao... sao lại có cảm giác lạnh lẽo thế này?",
            },
            {
              speaker: "Steve",
              text: "*Cố gắng đứng dậy, run rẩy* Chân tôi... tay tôi... còn nguyên. Vậy thì... tôi còn sống?",
            },
            {
              speaker: "Steve",
              text: "*Chạm vào trán* Steve... phải rồi... tên tôi là Steve. Nhưng... Steve là ai? Tôi đến từ đâu? Tại sao... tôi không nhớ gì cả?",
            },
            {
              speaker: "Steve",
              text: "*Nhìn xuống bàn tay* Những vết chai... dấu hiệu của người lao động. Vậy tôi đã từng sống... từng làm việc... nhưng tôi không nhớ mình đã làm gì...",
            },
            { speaker: "???", text: "...giúp... tôi..." },
            {
              speaker: "Steve",
              text: "*Giật mình* Ai đó... đang nói? Hay chỉ là gió?",
            },
            { speaker: "???", text: "...Steve... ngươi... là... hy vọng..." },
            {
              speaker: "Steve",
              text: "*Hoảng sợ nhìn quanh* Không có ai cả... nhưng giọng nói... nó vang vọng... trong đầu tôi...?",
            },
            {
              speaker: "Lumin (?)",
              text: "...ta... không còn... thời gian... Steve... hãy... sống sót...",
            },
          ],
        },
        {
          // Bước 1: Sinh tồn ban đầu
          type: "COLLECT_MULTIPLE",
          log: "Giọng nói bí ẩn nói tôi phải sống sót. Đầu tiên... tôi cần công cụ. Thu thập 16 khối Gỗ và chế tạo 1 Bàn Chế Tạo.",
          targets: [
            { tag: "#logs", amount: 16 },
            { id: "minecraft:crafting_table", amount: 1 },
          ],
        },
        {
          // Bước 2: Tạo công cụ cơ bản
          type: "COLLECT_MULTIPLE",
          log: "Với bàn chế tạo, tôi có thể làm được nhiều thứ hơn. Tạo 1 Cuốc Gỗ, 1 Rìu Gỗ và 1 Kiếm Gỗ.",
          targets: [
            { id: "minecraft:wooden_pickaxe", amount: 1 },
            { id: "minecraft:wooden_axe", amount: 1 },
            { id: "minecraft:wooden_sword", amount: 1 },
          ],
          rewards: { xp: 50, nguyen_thach: 5 },
        },
        {
          // Bước 3: Dialogue - Đêm đang đến
          type: "DIALOGUE",
          log: "Mặt trời đang lặn... tôi cảm thấy một điều gì đó không ổn.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Nhìn bầu trời* Trời đang tối... Mặt trời lặn nhanh thế?",
            },
            {
              speaker: "Steve",
              text: "*Một cơn lạnh chạy dọc sống lưng* Cảm giác này... như có gì đó đang... quan sát tôi.",
            },
            {
              speaker: "Lumin (?)",
              text: "...đêm... nguy hiểm... ánh sáng... là sự sống...",
            },
            { speaker: "Steve", text: "Ánh sáng...? Ý cô ấy là... đuốc?" },
          ],
        },
        {
          // Bước 4: Chuẩn bị cho đêm đầu tiên
          type: "COLLECT_MULTIPLE",
          log: "Đêm sắp đến. Tôi cần ánh sáng để bảo vệ mình. Chế tạo 8 Đuốc và xây 1 Lò Nung.",
          targets: [
            { id: "minecraft:torch", amount: 8 },
            { id: "minecraft:furnace", amount: 1 },
          ],
          rewards: { xp: 75, nguyen_thach: 10 },
        },
        {
          // Bước 5: Đêm đầu tiên
          type: "DIALOGUE",
          log: "Đêm đã xuống. Và cùng với nó... là những âm thanh đáng sợ.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Đốt đuốc run rẩy* Ánh lửa... ấm áp thật...",
            },
            { speaker: "Zombie (xa xa)", text: "Groooan... Uuuuugh..." },
            {
              speaker: "Steve",
              text: "*Giật mình* Cái gì... cái gì vậy?! Tiếng rên... tiếng... người?!",
            },
            {
              speaker: "Skeleton (xa xa)",
              text: "*Tiếng xương va vào nhau* Clack... clack...",
            },
            {
              speaker: "Steve",
              text: "*Ôm chặt thanh kiếm gỗ* Chúng đến từ khắp nơi... Tôi... tôi sẽ chết ở đây sao?",
            },
            {
              speaker: "Lumin (?)",
              text: "...đừng sợ... Steve... ta... sẽ giúp ngươi...",
            },
            {
              speaker: "Steve",
              text: "Cô... cô là ai? Tại sao tôi nghe thấy giọng cô?",
            },
            {
              speaker: "Lumin (?)",
              text: "...ký ức... của ta... tan rã... nhưng ta biết... ngươi đặc biệt... ngươi là... 'Vật Mang Tiếng Vọng'...",
            },
            {
              speaker: "Steve",
              text: "Vật Mang... Tiếng Vọng? Tôi không hiểu...!",
            },
            {
              speaker: "Lumin (?)",
              text: "...sống... sót... qua đêm nay... rồi ta... sẽ nói... cho ngươi biết...",
            },
          ],
          isEndStep: true,
          rewards: {
            xp: 200,
            nguyen_thach: 20,
            items: [
              { id: "minecraft:bread", amount: 8 },
              { id: "minecraft:leather_chestplate", amount: 1 },
            ],
          },
        },
      ],
    },

    CHAPTER_1_QUEST_2: {
      chapterTitle: "Hồi I: Tiếng Vọng Thức Tỉnh",
      title: "Bình Minh Đầu Tiên",
      unlocks: "CHAPTER_1_QUEST_1",
      steps: [
        {
          // 0: Sống sót qua đêm
          type: "DIALOGUE",
          log: "Mặt trời mọc. Tôi... vẫn còn sống. Nhưng giọng nói kia... giờ đã im lặng.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Thở phào nhẹ nhõm* Bình minh... cuối cùng cũng đến...",
            },
            {
              speaker: "Steve",
              text: "*Nhìn xung quanh* Những con quái vật... chúng đang bốc khói và cháy. Ánh sáng mặt trời... giết chúng?",
            },
            {
              speaker: "Steve",
              text: "*Ngồi xuống mệt mỏi* Đêm qua... dài như cả một đời. Tôi sợ... sợ đến mức run lẩy bẩy.",
            },
            {
              speaker: "Steve",
              text: "Giọng nói kia... cô ấy đã giúp tôi. Cô nói tôi là... 'Vật Mang Tiếng Vọng'? Nhưng giờ... cô im lặng rồi.",
            },
            { speaker: "Lumin", text: "...Steve... ngươi làm tốt lắm..." },
            {
              speaker: "Steve",
              text: "*Ngẩng đầu* Cô đây rồi! Cô... cô ổn chứ?",
            },
            {
              speaker: "Lumin",
              text: "Ta... vẫn yếu. Nhưng ban đêm, khi ngươi đối mặt với nỗi sợ hãi, ta cảm nhận được ý chí của ngươi. Nó... nuôi dưỡng ta.",
            },
            { speaker: "Steve", text: "Nuôi dưỡng...? Ý chí của tôi?" },
            {
              speaker: "Lumin",
              text: "Phải. Ta là một... mảnh ký ức sống. Và ngươi, Steve, là người duy nhất có thể nghe thấy ta. Đó là lý do ngươi là 'Vật Mang Tiếng Vọng'.",
            },
            {
              speaker: "Steve",
              text: "Ký ức... sống? Nghe kỳ quặc thật. Nhưng... cô biết gì về tôi không? Tại sao tôi ở đây?",
            },
            {
              speaker: "Lumin",
              text: "...Ta không biết. Ký ức của ta bị vỡ vụn. Nhưng ta biết rằng... thế giới này đang chết dần. Và ngươi... là hy vọng duy nhất.",
            },
          ],
        },
        {
          // 1: Nâng cấp công cụ
          type: "COLLECT_MULTIPLE",
          log: "Lumin nói tôi cần mạnh hơn để sinh tồn. Khai thác 16 Đá Cuội (Cobblestone) và chế tạo Cuốc Đá, Rìu Đá, Kiếm Đá.",
          targets: [
            { id: "minecraft:cobblestone", amount: 16 },
            { id: "minecraft:stone_pickaxe", amount: 1 },
            { id: "minecraft:stone_axe", amount: 1 },
            { id: "minecraft:stone_sword", amount: 1 },
          ],
          rewards: { xp: 15, nguyen_thach: 15 },
        },
        {
          // 2: Dialogue - Khám phá
          type: "DIALOGUE",
          log: "Với công cụ mới, tôi có thể đi xa hơn. Lumin khuyên tôi nên tìm kiếm dấu vết của văn minh.",
          dialogue: [
            {
              speaker: "Lumin",
              text: "Steve, ngươi đã mạnh hơn rồi. Nhưng sống một mình trong rừng... không phải giải pháp lâu dài.",
            },
            { speaker: "Steve", text: "Vậy cô muốn tôi làm gì?" },
            {
              speaker: "Lumin",
              text: "Ta cảm nhận được... một nơi. Một nơi từng có nhiều người sinh sống. Giờ thì... chỉ còn im lặng.",
            },
            {
              speaker: "Steve",
              text: "Người khác...? Có người khác còn sống à?",
            },
            {
              speaker: "Lumin",
              text: "Ta không chắc. Nhưng nếu có... họ có thể biết điều gì đó về 'Sự Im Lặng' - thứ đã biến thế giới này thành... cái này.",
            },
            {
              speaker: "Steve",
              text: "'Sự Im Lặng'... tên nghe rùng rợn thật. Được rồi, tôi sẽ đi tìm.",
            },
          ],
        },
        {
          // Bước 3: Thu thập lương thực - SỬA LẠI
          type: "COLLECT_ANY", // <-- Sửa từ COLLECT_MULTIPLE
          log: "Trước khi đi xa, tôi cần lương thực. Săn động vật để nấu chín 10 miếng thịt bất kỳ.",
          targetIds: [
            // <-- Sửa từ targets
            "minecraft:cooked_beef",
            "minecraft:cooked_porkchop",
            "minecraft:cooked_mutton",
            "minecraft:cooked_chicken",
            "minecraft:cooked_rabbit",
          ],
          amount: 10,
          // Không cần rewards ở bước trung gian này, dời xuống isEndStep cho mạch lạc hơn
        },
        {
          // 4: Tương tác với động vật
          type: "DIALOGUE",
          log: "Khi săn động vật, tôi chợt nhận ra... chúng cũng đang sợ hãi.",
          isEndStep: true,
          dialogue: [
            {
              speaker: "Steve",
              text: "*Nhìn đàn bò đang gặm cỏ* Chúng... trông bình thường. Không giống như lũ quái vật đêm qua.",
            },
            {
              speaker: "Lumin",
              text: "Steve, ngươi có trái tim tốt. Nhưng đừng quên, đó là quy luật của tự nhiên. Săn để sống, nhưng đừng giết không cần thiết.",
            },
            {
              speaker: "Steve",
              text: "Tôi hiểu... *Nhanh chóng kết liễu con bò* Xin lỗi.",
            },
          ],
          rewards: {
            xp: 30,
            nguyen_thach: 30,
            items: [
              { id: "minecraft:leather_helmet", amount: 1 },
              { id: "minecraft:leather_leggings", amount: 1 },
            ],
          },
        },
      ],
    },

    CHAPTER_1_QUEST_3: {
      chapterTitle: "Hồi I: Tiếng Vọng Thức Tỉnh",
      title: "Ngôi Làng Bị Lãng Quên",
      unlocks: "CHAPTER_1_QUEST_2",
      steps: [
        {
          // 0: Khám phá ngôi làng
          type: "EXPLORE",
          target: "village", // ID của biome làng
          log: "Lumin cảm nhận được một nơi từng có người ở gần đây. Hãy đi tìm nó.",
        },
        {
          // 1: Dialogue
          type: "DIALOGUE",
          log: "Sau hàng giờ đi bộ, tôi tìm thấy nó... Một ngôi làng. Nhưng... không có tiếng người.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Dừng lại trước cổng làng* Đây rồi... ngôi làng.",
            },
            {
              speaker: "Steve",
              text: "...Sao lại im lặng thế này? Không có tiếng người, không có tiếng động vật, thậm chí không có gió.",
            },
            {
              speaker: "Lumin",
              text: "...Ta cảm nhận được nỗi buồn... nỗi đau... ở đây. Nơi này... đã từng đầy tiếng cười.",
            },
            {
              speaker: "Villager Zombie (xa xa)",
              text: "Huuuurgh... uuuugh...",
            },
            {
              speaker: "Steve",
              text: "*Giật mình* Tiếng gì vậy?! Nghe như... tiếng người... nhưng lại sai sai?",
            },
            {
              speaker: "Lumin",
              text: "Steve... đó là họ. Những người dân làng. Họ đã bị... biến đổi.",
            },
          ],
        },
        {
          // 2: Tìm kiếm người sống sót và gặp Andre
          type: "DIALOGUE",
          log: "Tìm kiếm manh mối hoặc bất kỳ ai còn sống trong làng. Có lẽ trong một căn nhà nào đó...",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Đẩy cửa một căn nhà có vẻ kiên cố* Có ai trong này không?",
            },
            {
              speaker: "Andre",
              text: "*Giật mình, cầm dao run rẩy* Đ-đừng lại đó! Tôi sẽ... tôi sẽ đâm đấy!",
            },
            {
              speaker: "Steve",
              text: "*Giơ tay* Tôi là người! Tôi không phải quái vật!",
            },
            {
              speaker: "Andre",
              text: "*Nhìn chằm chằm* Ng-người...? Người thật sao? Hay... hay là ảo giác...?",
            },
            {
              speaker: "Steve",
              text: "*Từ từ bước đến* Tôi thật đấy ông. Tên tôi là Steve. Ông... ông ổn chứ?",
            },
            {
              speaker: "Andre",
              text: "*Bỏ dao xuống, rơi nước mắt* Steve... Người... Lần đầu tiên sau bao nhiêu ngày... tôi gặp người...",
            },
            {
              speaker: "Steve",
              text: "*Ngồi xuống bên ông* Chuyện gì đã xảy ra ở đây? Dân làng đâu rồi?",
            },
            {
              speaker: "Andre",
              text: "*Run rẩy* Họ... họ đã biến thành... quái vật. 'Sự Im Lặng' đến vào một đêm trăng máu...",
            },
            {
              speaker: "Andre",
              text: "Trước hết... chỉ là những tiếng thì thầm. Rồi... người ta bắt đầu quên. Quên tên nhau... quên cách nói chuyện...",
            },
            {
              speaker: "Andre",
              text: "Rồi... họ bắt đầu tấn công. Mắt đỏ ngầu... miệng rên rỉ... Tôi... tôi chỉ kịp trốn vào đây.",
            },
          ],
          rewards: { xp: 15, nguyen_thach: 15 },
        },
        {
          // 3: Củng cố nhà cửa
          type: "COLLECT_TAG",
          log: "Andre quá yếu. Giúp ông ấy củng cố lại nơi trú ẩn bằng cách chặn các cửa sổ với 20 Ván Gỗ.",
          target: "#planks", // Chấp nhận các loại ván gỗ khác
          amount: 20,
          rewards: { xp: 15, nguyen_thach: 15 },
        },
        {
          // 4: Đêm bên lò sưởi
          type: "DIALOGUE",
          log: "Sau khi gia cố ngôi nhà, Andre mời tôi ngồi lại bên lò sưởi. Ông có nhiều câu chuyện để kể.",
          dialogue: [
            {
              speaker: "Andre",
              text: "*Đốt lửa* Ấm hơn rồi... Cảm ơn cậu, Steve. Cậu đã làm cho ngôi nhà này... có vẻ là nhà trở lại.",
            },
            {
              speaker: "Steve",
              text: "Ông nói 'Sự Im Lặng' đến vào đêm trăng máu. Nó... là gì?",
            },
            {
              speaker: "Andre",
              text: "*Nhìn vào lửa* Không ai biết. Nó không có hình dạng... không có tiếng động. Nó chỉ... xuất hiện.",
            },
            {
              speaker: "Andre",
              text: "Người ta nói... nó đến từ 'Đền Thờ Cổ' ở phía Tây. Một nơi bị bỏ hoang từ thời cổ đại.",
            },
            {
              speaker: "Steve",
              text: "Đền thờ...? Ông có biết cách đến đó không?",
            },
            {
              speaker: "Andre",
              text: "*Lo lắng* Tại sao cậu muốn đến đó? Nơi đó nguy hiểm lắm!",
            },
            {
              speaker: "Steve",
              text: "Vì... tôi cần tìm câu trả lời. Về 'Sự Im Lặng', về lý do tôi ở đây.",
            },
            {
              speaker: "Lumin",
              text: "Steve đúng rồi. Ta cũng cảm nhận được... nguồn gốc ở đâu đó về phía Tây.",
            },
          ],
          isEndStep: true,
          rewards: {
            xp: 40,
            nguyen_thach: 40,
            items: [
              { id: "minecraft:shield", amount: 1 },
              {
                id: "minecraft:iron_sword",
                amount: 1,
                nameTag: "§fKiếm của Người Dân Làng",
              },
            ],
          },
        },
      ],
    },

    CHAPTER_1_QUEST_4: {
      chapterTitle: "Hồi I: Tiếng Vọng Thức Tỉnh",
      title: "Đêm Của Những Linh Hồn Lạc",
      unlocks: "CHAPTER_1_QUEST_3",
      steps: [
        {
          // 0: Nhiệm vụ đau lòng
          type: "DIALOGUE",
          log: "Andre nhờ bạn một việc... một việc rất đau lòng. Hãy nói chuyện với ông ấy.",
          dialogue: [
            {
              speaker: "Andre",
              text: "*Nhìn ra cửa sổ* Chúng đến rồi... Cứ mỗi đêm... chúng lại lang thang quanh làng.",
            },
            {
              speaker: "Steve",
              text: "*Cầm kiếm* Chúng... chúng là dân làng ông đúng không?",
            },
            {
              speaker: "Andre",
              text: "*Gật đầu, nước mắt chảy* Người đàn ông kia... tên ông ấy là Marcus. Ông ấy là thợ rèn tốt nhất làng...",
            },
            { speaker: "Steve", text: "Tôi xin lỗi..." },
            {
              speaker: "Andre",
              text: "*Khóc* Đừng xin lỗi... Hãy giải thoát họ. Đó là lòng thương xót cuối cùng mà ta có thể dành cho họ.",
            },
            {
              speaker: "Lumin",
              text: "Steve... ta biết điều này đau lòng. Nhưng... họ đã không còn là con người nữa. Giải thoát họ... là cứu rỗi linh hồn họ.",
            },
          ],
        },
        {
          // 1: Giải thoát
          type: "KILL",
          targetId: "minecraft:zombie_villager",
          amount: 10,
          log: "Giải thoát 10 Dân Làng Zombie. Mỗi cái chết là một lời cầu nguyện cho linh hồn họ.",
          rewards: { xp: 20, nguyen_thach: 25 },
          triggerEvent: { name: "ambush", type: "minecraft:zombie", amount: 3 },
        },
        {
          // 2: Gặp người phụ nữ đặc biệt
          type: "DIALOGUE",
          log: "Giữa những dân làng đã biến chất, có một người phụ nữ vẫn còn sót lại chút ký ức.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Nhìn thấy một zombie villager không tấn công, chỉ đứng khóc*",
            },
            {
              speaker: "Anna (Zombie)",
              text: "Huuuurgh... An...dre... An...dre...",
            },
            {
              speaker: "Steve",
              text: "*Sửng sốt* Bà ấy... bà ấy đang gọi tên ông Andre?!",
            },
            {
              speaker: "Lumin",
              text: "Linh hồn của bà vẫn còn ở đó... bị giam giữ trong thân xác biến dạng. Steve... bà đang đau đớn.",
            },
            {
              speaker: "Anna (Zombie)",
              text: "*Quay sang Steve, nước mắt máu chảy* Giết... tôi... xin... cậu...",
            },
            { speaker: "Steve", text: "*Run rẩy* Bà... bà vẫn còn ý thức?!" },
            {
              speaker: "Anna (Zombie)",
              text: "Đau... quá... đau... Andre... xin lỗi... anh...",
            },
            {
              speaker: "Steve",
              text: "*Nước mắt chảy, giơ kiếm* Tôi xin lỗi... Tôi sẽ giải thoát bà.",
            },
          ],
          rewards: { xp: 25, nguyen_thach: 30 },
        },
        {
          // 3: Trở về gặp Andre
          type: "DIALOGUE",
          log: "Bình minh lên. Quay trở lại gặp Andre.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Mở cửa* Ông Andre... tôi... đã làm xong.",
            },
            {
              speaker: "Andre",
              text: "*Nhìn Steve* ...Cảm ơn cậu. Làng... giờ đã yên nghỉ.",
            },
            {
              speaker: "Steve",
              text: "*Kể về Anna* Có một người phụ nữ... bà ấy gọi tên ông. Bà ấy nói... bà xin lỗi và yêu ông.",
            },
            {
              speaker: "Andre",
              text: "*Sững sờ rồi bật khóc* Anna... Anna của tôi... Em... Em đã tự do rồi...",
            },
            {
              speaker: "Andre",
              text: "*Lau nước mắt* Cảm ơn cậu, Steve. Cậu đã cho bà ấy sự bình yên. Giờ, để tôi giúp cậu.",
            },
          ],
          isEndStep: true,
          rewards: {
            xp: 50,
            nguyen_thach: 50,
            items: [
              {
                id: "minecraft:iron_pickaxe",
                amount: 1,
                nameTag: "§fCuốc của Thợ Rèn Marcus",
              },
              { id: "minecraft:iron_chestplate", amount: 1 },
              { id: "minecraft:cooked_beef", amount: 16 },
            ],
          },
        },
      ],
    },

    CHAPTER_1_QUEST_5: {
      chapterTitle: "Hồi I: Tiếng Vọng Thức Tỉnh",
      title: "Lời Tạm Biệt",
      unlocks: "CHAPTER_1_QUEST_4",
      steps: [
        {
          // 0: Sáng hôm sau
          type: "DIALOGUE",
          log: "Andre đã chuẩn bị xong. Nói chuyện với ông ấy trước khi lên đường đến Đền Thờ.",
          dialogue: [
            {
              speaker: "Andre",
              text: "*Trao cho Steve một chiếc ba lô* Này, mang theo. Có đồ ăn và băng bó.",
            },
            {
              speaker: "Steve",
              text: "Cảm ơn ông. Ông... ông không đi cùng tôi sao?",
            },
            {
              speaker: "Andre",
              text: "*Lắc đầu* Tôi già rồi. Tôi muốn ở lại đây. Bên cạnh ký ức về Anna, về ngôi làng này.",
            },
            { speaker: "Steve", text: "Nhưng ông một mình... nguy hiểm lắm." },
            {
              speaker: "Andre",
              text: "*Mỉm cười buồn* Không sao đâu. Và có lẽ... một ngày nào đó, tôi sẽ được gặp lại Anna.",
            },
            { speaker: "Steve", text: "*Ôm Andre* Cảm ơn ông. Vì tất cả." },
            {
              speaker: "Andre",
              text: "*Vỗ vai Steve* Hãy ngăn chặn 'Sự Im Lặng'... vì những người như Anna. Đi về phía Tây. Qua cánh rừng Sồi, đến sa mạc. Đền Thờ nằm dưới cát.",
            },
          ],
        },
        {
          // 1: Đến sa mạc
          type: "EXPLORE",
          target: "desert",
          log: "Rời khỏi làng, đi về phía Tây, băng qua các vùng đất để đến sa mạc rộng lớn.",
          rewards: { xp: 20, nguyen_thach: 20 },
        },
        {
          // 2: Tìm nhật ký
          type: "DIALOGUE",
          log: "Trên đường đi, Lumin cảm nhận được một ký ức còn sót lại. Có vẻ như ai đó đã bỏ lại một cuốn sách.",
          dialogue: [
            {
              speaker: "Lumin",
              text: "Steve, dừng lại... Ta cảm thấy gì đó... Một nỗi tuyệt vọng... gần đây.",
            },
          ],
          triggerEvent: { name: "spawn_lectern" }, // Event sẽ spawn một cái giá sách với cuốn nhật ký
        },
        {
          // 3: Đọc nhật ký
          type: "INTERACT_BLOCK",
          targetId: "minecraft:lectern",
          amount: 1,
          log: "Lumin cảm nhận được một vật thể lạ gần đây. Tìm và đọc nó.",
          rewards: { xp: 15, nguyen_thach: 20 },
        },
        {
          // 4: Đền Thờ
          type: "DIALOGUE",
          log: "Cuốn nhật ký nhắc đến một 'kim tự tháp' dưới cát. Đó phải là Đền Thờ.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Gấp sách lại* 'Sự Im Lặng' đã nuốt chửng cả một đoàn lữ hành... họ đang trên đường đến 'nơi trú ẩn dưới kim tự tháp'.",
            },
            {
              speaker: "Lumin",
              text: "Kim tự tháp... Steve, đó chính là nó! Đền Thờ Cổ! Nó ở gần đây, ta cảm nhận được!",
            },
          ],
          isEndStep: true,
          rewards: {
            xp: 60,
            nguyen_thach: 60,
            items: [
              { id: "minecraft:golden_apple", amount: 2 },
              { id: "minecraft:diamond", amount: 2 },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    // ACT 2: BÍ MẬT ĐỀN THỜ (Quest 6-8) - Khám phá nguồn gốc
    // ─────────────────────────────────────────────────────────────────

    CHAPTER_1_QUEST_6: {
      chapterTitle: "Hồi I: Tiếng Vọng Thức Tỉnh",
      title: "Dưới Cát Nóng",
      unlocks: "CHAPTER_1_QUEST_5",
      steps: [
        {
          // 0: Tìm Kim tự tháp
          type: "EXPLORE",
          target: "desert_pyramid",
          log: "Tìm kiếm Đền Thờ Sa Mạc (Kim tự tháp) trong sa mạc. Đó chính là lối vào.",
        },
        {
          // 1: Vào Đền Thờ
          type: "DIALOGUE",
          log: "Đã tìm thấy Đền Thờ. Nhưng không khí ở đây... ngột ngạt và đầy ác cảm.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Đứng trước cửa Đền* Đây rồi... Đền Thờ Cổ...",
            },
            {
              speaker: "Lumin",
              text: "Steve... cẩn thận. Ta cảm nhận được sự hiện diện của... thứ gì đó bên trong. Một nguồn năng lượng hắc ám cực mạnh.",
            },
            {
              speaker: "Steve",
              text: "*Nuốt nước bọt* Nghe đáng sợ thật. Nhưng tôi đã đến đây rồi. Phải vào trong.",
            },
          ],
        },
        {
          // 2: Vượt qua cạm bẫy
          type: "INTERACT_BLOCK",
          targetId: "minecraft:chest", // Tương tác với rương dưới hầm bẫy
          amount: 4,
          log: "Khám phá bên trong Kim tự tháp và tìm căn phòng bí mật. Hãy cẩn thận với những cái bẫy chết người.",
          rewards: {
            xp: 80,
            nguyen_thach: 80,
            items: [
              { id: "minecraft:diamond", amount: 5 },
              {
                id: "minecraft:enchanted_book",
                amount: 1,
                enchantments: { protection: 2 },
              },
              {
                id: "minecraft:golden_apple",
                amount: 1,
                nameTag: "§6Táo Vàng Phù Phép",
              },
            ],
          },
        },
        {
          // 3: Ký Ức Ảo Ảnh
          type: "DIALOGUE",
          log: "Khi mở chiếc rương cuối cùng, một ảo ảnh xuất hiện...",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Chạm vào viên pha lê trong rương* Cái này... là gì?",
            },
            {
              speaker: "Lumin",
              text: "Steve... cẩn thận! Năng lượng từ nó... mạnh quá!",
            },
            {
              speaker: "Steve",
              text: "*Chợt cảm thấy choáng váng* Đầu tôi... Ah!!",
            },
            { speaker: "???", text: "...Elara... con gái của cha..." },
            {
              speaker: "Steve",
              text: "*Nhìn thấy ảo ảnh* Cái gì... Tôi đang thấy gì vậy?!",
            },
            {
              speaker: "Aric (Ảo Ảnh)",
              text: "Con phải sống. Cha sẽ bảo vệ con... dù phải đánh đổi tất cả... Cha sẽ phong ấn ký ức của con vào 'Tiếng Vọng'...",
            },
            {
              speaker: "Elara (Ảo Ảnh)",
              text: "Cha... con sợ... Con... con không muốn quên cha...",
            },
            {
              speaker: "Aric (Ảo Ảnh)",
              text: "*Ôm cô gái* Con sẽ không quên đâu... Ký ức của con sẽ tồn tại... Cho đến khi 'Vật Mang Tiếng Vọng' đến...",
            },
            { speaker: "Steve", text: "*Ngã quỵ* Ahhhh!!" },
            { speaker: "Lumin", text: "STEVE!!" },
          ],
          isEndStep: true,
        },
      ],
    },

    CHAPTER_1_QUEST_7: {
      chapterTitle: "Hồi I: Tiếng Vọng Thức Tỉnh",
      title: "Ta Là Elara",
      unlocks: "CHAPTER_1_QUEST_6",
      steps: [
        {
          // 0: Hồi tỉnh
          type: "DIALOGUE",
          log: "Steve tỉnh dậy. Lumin đang vô cùng bối rối và xúc động...",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Từ từ mở mắt* ...Ugh... Chuyện gì vừa xảy ra?",
            },
            {
              speaker: "Lumin",
              text: "*Khóc* Ta... ta nhớ ra rồi... Tên ta... Tên thật của ta là Elara... Và người đó là cha ta, Aric!",
            },
            {
              speaker: "Steve",
              text: "Elara...? Aric...? Nhà giả kim trong cuốn nhật ký?",
            },
            {
              speaker: "Elara",
              text: "Phải... Cha ta nghiên cứu về 'Ký Ức Tồn Tại' - khả năng bảo vệ ký ức khỏi 'Sự Im Lặng'...",
            },
            {
              speaker: "Elara",
              text: "Ông... ông đã biến ta thành một 'Ký Ức Sống'. Để ta không bao giờ bị quên... nhưng cũng không bao giờ... được sống thật sự...",
            },
            { speaker: "Steve", text: "Thật... thật khủng khiếp..." },
            {
              speaker: "Elara",
              text: "Nhưng Steve... Ký ức vẫn chưa hoàn chỉnh. Ta cần tìm thêm những mảnh vỡ khác. Cha ta... ta cảm nhận được ông vẫn còn đâu đó. Không phải ở đây, mà là ở... một nơi khác.",
            },
          ],
        },
        {
          // 1: Cánh cổng tới Địa ngục
          type: "DIALOGUE",
          log: "Elara nói rằng cha cô ấy đã nghiên cứu về các chiều không gian khác.",
          dialogue: [
            { speaker: "Steve", text: "Một nơi khác...? Ý cô là gì?" },
            {
              speaker: "Elara",
              text: "Một chiều không gian khác, Steve! Nether... Thế giới địa ngục! Trong các ghi chép rời rạc của ông, cha đã nói rằng ông tìm thấy nguồn năng lượng để chống lại 'Sự Im Lặng' ở đó!",
            },
            { speaker: "Steve", text: "Nether...?" },
            {
              speaker: "Elara",
              text: "Chúng ta phải đến đó. Ta cần cậu tìm những khối đá màu tím đen, cứng như kim cương, gọi là Hắc Diện Thạch (Obsidian). Hãy xây một cánh cổng.",
            },
          ],
        },
        {
          // 2: Xây Cổng Địa Ngục
          type: "COLLECT",
          targetId: "minecraft:obsidian",
          amount: 10,
          log: "Để đến Nether, bạn cần xây một cánh cổng. Khai thác 10 khối Hắc Diện Thạch (Obsidian).",
        },
        {
          // 3: Thắp Lửa
          type: "COLLECT",
          targetId: "minecraft:flint_and_steel",
          amount: 1,
          log: "Cánh cổng sẽ không tự mở. Bạn cần thứ gì đó để kích hoạt nó. Chế tạo một cái Bật Lửa (Flint and Steel).",
          isEndStep: true,
          rewards: {
            xp: 100,
            nguyen_thach: 100,
            items: [
              {
                id: "minecraft:diamond_pickaxe",
                amount: 1,
                enchantments: { efficiency: 1 },
              },
              {
                id: "minecraft:potion",
                amount: 4,
                nameTag: "§bThuốc Kháng Lửa",
              },
            ],
          },
        },
      ],
    },

    CHAPTER_1_QUEST_8: {
      chapterTitle: "Hồi I: Tiếng Vọng Thức Tỉnh",
      title: "Bước Vào Lửa",
      unlocks: "CHAPTER_1_QUEST_7",
      steps: [
        {
          // 0: Kích hoạt cổng
          type: "INTERACT_BLOCK",
          targetId: "minecraft:obsidian", // Người chơi sẽ dùng bật lửa vào obsidian
          amount: 1,
          log: "Đã có đủ vật liệu. Hãy xây cánh cổng và kích hoạt nó để mở đường đến Nether.",
        },
        {
          // 1: Lời cuối trước khi đi
          type: "DIALOGUE",
          log: "Cổng đã mở. Elara có đôi lời muốn nói.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Nhìn vào cánh cổng xoáy tím* Thật không thể tin được... Một thế giới khác...",
            },
            {
              speaker: "Elara",
              text: "*Giọng run* Ta sợ, Steve. Nhưng... ta cũng có hy vọng. Có lẽ... câu trả lời cho tất cả mọi thứ... nằm ở phía bên kia.",
            },
            {
              speaker: "Steve",
              text: "Đừng lo. Chúng ta sẽ cùng nhau đối mặt với nó. Vì cha cô... và vì cả thế giới này.",
            },
          ],
        },
        {
          // 2: Khám phá Nether
          type: "EXPLORE",
          target: "nether",
          log: "Dũng cảm bước qua cánh cổng. Khám phá chiều không gian Nether đầy nguy hiểm.",
          isEndStep: true,
          rewards: {
            xp: 150,
            nguyen_thach: 150,
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // ═══ HỒI II: TRO TÀN CỦA KÝ ỨC (ASHES OF MEMORY) ═════════════════════
    // ═══════════════════════════════════════════════════════════════════

    CHAPTER_2_QUEST_9: {
      chapterTitle: "Hồi II: Tro Tàn Của Ký Ức",
      title: "Hơi Thở Của Lửa",
      unlocks: "CHAPTER_1_QUEST_8",
      steps: [
        {
          // 0: Đặt chân đến Nether
          type: "DIALOGUE",
          log: "Cảm nhận sức nóng và sự thù địch của Nether. Không khí nơi đây dường như đang muốn thiêu đốt bạn.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Bước ra từ cổng, luồng khí nóng ập vào mặt* Hự... Nóng quá! Cứ như bước vào một cái lò nung khổng lồ vậy.",
            },
            {
              speaker: "Steve",
              text: "*Ho sặc sụa* Không khí... đặc quánh và cay nồng mùi lưu huỳnh. Khó thở quá...",
            },
            {
              speaker: "Elara",
              text: "Năng lượng ở đây... Steve, nó thật kinh khủng. Nó không chỉ hỗn loạn, nó còn... đói khát. Ta có thể cảm nhận được hàng ngàn linh hồn bị giam cầm, gào thét trong câm lặng.",
            },
            {
              speaker: "Steve",
              text: "*Nhìn quanh, mắt nheo lại vì không khí mờ ảo* Vực thẳm vô tận... biển lửa bên dưới... và những tiếng kêu ghê rợn vẳng lại từ xa. Cha cô... ông ấy đã thực sự đến một nơi như thế này sao?",
            },
            {
              speaker: "Elara",
              text: "Ta không biết... Ta không thể tưởng tượng được. Nhưng... ta cảm nhận được ông ấy. Rất yếu ớt, như một ngọn nến sắp tàn trong gió. Ký ức của ông bị xé nát bởi nơi này.",
            },
            {
              speaker: "Steve",
              text: "Chúng ta phải tìm một chỗ trú ẩn. Nhanh lên. Đứng ở đây quá nguy hiểm. Cái cổng này là con đường duy nhất của chúng ta để trở về.",
            },
            {
              speaker: "Elara",
              text: "Hãy cẩn thận. Mọi thứ ở đây đều muốn giết chúng ta. Đừng tin vào bất cứ thứ gì.",
            },
          ],
        },
        {
          // 1: Xây dựng nơi trú ẩn đầu tiên
          type: "COLLECT",
          targetId: "minecraft:cobblestone",
          amount: 32,
          log: "Vùng đất này quá nguy hiểm để đi lang thang. Dùng đá cuội mang theo hoặc khai thác xung quanh để xây một phòng tuyến nhỏ bao quanh cổng Nether.",
          rewards: { xp: 80, nguyen_thach: 40 },
        },
        {
          // 2: Cuộc chạm trán với Ghast
          type: "DIALOGUE",
          log: "Khi bạn đang củng cố nơi trú ẩn, một tiếng khóc ai oán vang lên từ trên cao.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Đặt khối đá cuối cùng* Tạm ổn... Ít nhất chúng ta có một bức tường che chắn.",
            },
            { speaker: "Ghast (Từ xa)", text: "*Tiếng kêu a..i o..án...*" },
            {
              speaker: "Steve",
              text: "*Ngẩng lên, hoảng hốt* Cái... cái quái gì kia?! Một con ma khổng lồ biết bay?!",
            },
            {
              speaker: "Elara",
              text: "Ghast! Ta đã thấy nó trong những mảnh ký ức rời rạc của cha! Cẩn thận, nó phun lửa đấy!",
            },
            {
              speaker: "Steve",
              text: "Nó đang nhìn chúng ta! Chết tiệt, mình không có cung tên...!",
            },
            {
              speaker: "Elara",
              text: "Dùng kiếm của cậu! Đánh trả quả cầu lửa của nó! Đó là cách duy nhất!",
            },
          ],
          triggerEvent: { name: "ambush", type: "minecraft:ghast", amount: 1 },
        },
        {
          // 3: Sống sót và nhận ra sự thật
          type: "KILL",
          targetId: "minecraft:ghast",
          amount: 1,
          log: "Con quái vật bay (Ghast) đang tấn công! Hãy dùng kiếm đánh trả quả cầu lửa của nó để tự vệ!",
          rewards: { xp: 150, nguyen_thach: 75 },
        },
        {
          // 4: Một khám phá nhỏ
          type: "DIALOGUE",
          log: "Sau khi hạ được con Ghast, một vật phẩm kỳ lạ rơi ra. Nó dường như chứa đựng nỗi buồn.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Thở dốc, nhặt 'Nước Mắt Ghast'* Nó... nó khóc sao?",
            },
            {
              speaker: "Elara",
              text: "Thứ này... nó chứa đầy sự đau khổ. Steve, ta nghĩ những sinh vật ở đây không hoàn toàn là quái vật. Chúng là những linh hồn bị mắc kẹt, bị biến chất bởi chính nơi này.",
            },
            { speaker: "Steve", text: "Giống như những người dân làng..." },
            {
              speaker: "Elara",
              text: "Đúng vậy. Cha ta... có lẽ ông không đến đây để tìm sức mạnh, mà là để tìm một phương thuốc chữa trị. Ta cảm nhận được một tín hiệu khác... mạnh hơn một chút. Nó không ở đây, nó ở sâu hơn, trong một cấu trúc nhân tạo.",
            },
            {
              speaker: "Steve",
              text: "Chúng ta sẽ đi. Nhưng lần này, chúng ta cần chuẩn bị tốt hơn. Tôi cần vàng.",
            },
            { speaker: "Elara", text: "Vàng? Để làm gì?" },
            {
              speaker: "Steve",
              text: "Tôi thấy những sinh vật hình người lợn lúc nãy. Chúng có vẻ thích vàng. Có lẽ... chúng ta có thể thương lượng thay vì chiến đấu.",
            },
          ],
          isEndStep: true,
          rewards: {
            xp: 120,
            nguyen_thach: 60,
            items: [
              { id: "minecraft:bow", amount: 1 },
              { id: "minecraft:arrow", amount: 32 },
              { id: "minecraft:ghast_tear", amount: 1 },
            ],
          },
        },
      ],
    },

    CHAPTER_2_QUEST_10: {
      chapterTitle: "Hồi II: Tro Tàn Của Ký Ức",
      title: "Pháo Đài Đen",
      unlocks: "CHAPTER_2_QUEST_9",
      steps: [
        {
          // 0: Tìm Pháo Đài Nether
          type: "EXPLORE",
          target: "fortress",
          log: "Lần theo cảm nhận của Elara, tìm kiếm một Pháo Đài Nether được xây bằng gạch đen kịt.",
        },
        {
          // 1: Bên trong Pháo Đài
          type: "DIALOGUE",
          log: "Bạn đã vào được Pháo Đài. Nơi này được canh giữ bởi những linh hồn rực lửa và những bộ xương khô héo.",
          dialogue: [
            {
              speaker: "Steve",
              text: "Nơi này... thật đáng sợ. Những hành lang tối tăm và những cây cầu lơ lửng trên biển lửa.",
            },
            {
              speaker: "Elara",
              text: "Cha ta đã ở đây. Ta cảm nhận rất rõ. Năng lượng của ông ấy vẫn còn vương lại trên những viên gạch này. Ông đã ở đây rất lâu.",
            },
            {
              speaker: "Steve",
              text: "Ông ấy đã làm gì ở một nơi như thế này? *Nhìn thấy một bộ xương đen kịt từ xa* Và... những bộ xương đó... chúng to lớn và đáng sợ hơn những bộ xương bình thường.",
            },
            {
              speaker: "Elara",
              text: "Ta cũng cảm thấy một sự thù hận mãnh liệt từ chúng. Hãy cẩn thận, Steve. Chúng không giống những gì chúng ta đã đối mặt.",
            },
          ],
        },
        {
          // 2: Thu thập nguyên liệu giả kim
          type: "COLLECT_MULTIPLE",
          log: "Elara tin rằng cha cô đã tìm kiếm nguyên liệu ở đây. Thu thập 5 Que Quỷ Lửa (Blaze Rod) và 8 Bướu Nether (Nether Wart).",
          targets: [
            { id: "minecraft:blaze_rod", amount: 5 },
            { id: "minecraft:nether_wart", amount: 8 },
          ],
          rewards: { xp: 250, nguyen_thach: 120 },
        },
        {
          // 3: Tìm thấy phòng thí nghiệm tạm bợ
          type: "DIALOGUE",
          log: "Sau khi thu thập đủ nguyên liệu, Elara phát hiện một căn phòng bí mật, nơi Aric từng làm việc.",
          dialogue: [
            {
              speaker: "Elara",
              text: "Nhanh lên, Steve! Ở đây! Có một cơ chế ẩn sau bức tường này! Ta cảm nhận được nó!",
            },
            {
              speaker: "Steve",
              text: "*Đẩy viên gạch lỏng* Một căn phòng nhỏ... có một Giàn Pha Chế, một cái rương, và... một cuốn nhật ký!",
            },
          ],
          triggerEvent: { name: "spawn_fortress_chest" },
        },
        {
          // 4: Mở rương và đọc sách
          type: "INTERACT_BLOCK",
          targetId: "minecraft:chest",
          amount: 1,
          log: "Mở chiếc rương bí mật và đọc những ghi chép Aric để lại.",
        },
        {
          // 5: Sự thật về Wither Skeleton
          type: "DIALOGUE",
          log: "Cuốn nhật ký tiết lộ một phần thí nghiệm đáng sợ của Aric.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Đọc to* 'Ngày 47 trong địa ngục. Ta đã tìm ra. 'Sự Im Lặng' là một dạng hư không, nó xóa bỏ ký ức, xóa bỏ sự tồn tại. Nhưng nó sợ hãi... sự sống mãnh liệt.'",
            },
            { speaker: "Elara", text: "Sợ hãi sự sống...?" },
            {
              speaker: "Steve",
              text: "'Những bộ xương đen kịt này... Wither Skeleton. Linh hồn của chúng bị mắc kẹt, cháy bỏng với sự căm hận. Sự căm hận đó... là một dạng năng lượng sống cực đoan. 'Sự Im Lặng' không thể chạm tới chúng.'",
            },
            { speaker: "Elara", text: "Trời ơi... Cha định làm gì vậy?" },
            {
              speaker: "Steve",
              text: "'Ta tin rằng... bằng cách kết hợp ba hộp sọ của chúng, ta có thể triệu hồi được hiện thân của sự căm hận đó. Một thực thể có thể chống lại 'Sự Im Lặng'. Nhưng... ta không dám. Rủi ro quá lớn. Ta cần một nơi an toàn hơn.'",
            },
            {
              speaker: "Elara",
              text: "Triệu hồi một con quái vật... để chống lại một con quái vật khác? Cha ơi... cha đã nghĩ gì vậy?",
            },
            {
              speaker: "Steve",
              text: "'Lũ Piglin có một pháo đài được xây bằng hắc thạch kiên cố... một Bastion. Ta đã thỏa thuận với chúng. Vàng đổi lấy một góc yên tĩnh. Đó sẽ là phòng thí nghiệm cuối cùng của ta.'",
            },
            {
              speaker: "Elara",
              text: "Pháo đài của Piglin... Bastion Remnant! Đó là nơi chúng ta phải đến tiếp theo!",
            },
          ],
          isEndStep: true,
          rewards: {
            xp: 350,
            nguyen_thach: 180,
            items: [
              {
                id: "minecraft:diamond_sword",
                amount: 1,
                enchantments: { smite: 3 },
              },
              {
                id: "minecraft:potion",
                amount: 4,
                nameTag: "§bThuốc Kháng Lửa (8:00)",
              },
            ],
          },
        },
      ],
    },

    CHAPTER_2_QUEST_11: {
      chapterTitle: "Hồi II: Tro Tàn Của Ký Ức",
      title: "Giao Ước Với Hắc Thạch",
      unlocks: "CHAPTER_2_QUEST_10",
      steps: [
        {
          // 0: Tìm Bastion Remnant
          type: "EXPLORE",
          target: "bastion_remnant",
          log: "Tìm kiếm pháo đài của Piglin - một Bastion Remnant - nơi Aric đã thiết lập phòng thí nghiệm cuối cùng của mình.",
        },
        {
          // 1: Vệ Binh Hung Dữ
          type: "KILL",
          targetId: "minecraft:piglin_brute",
          amount: 2,
          log: "Nơi này được canh gác bởi những Vệ Binh Piglin cực kỳ hung dữ. Chúng không thể bị mua chuộc bằng vàng. Hãy hạ gục 2 tên để vào sâu bên trong.",
          rewards: { xp: 300, nguyen_thach: 150 },
        },
        {
          // 2: Phòng thí nghiệm bị lãng quên
          type: "DIALOGUE",
          log: "Bên trong Bastion, Elara cảm nhận được nguồn năng lượng mạnh nhất từ trước đến nay, và cả... nỗi tuyệt vọng.",
          dialogue: [
            {
              speaker: "Elara",
              text: "Nó ở đây! Steve! Phòng thí nghiệm của cha... ta cảm nhận được nó ở ngay gần đây! Nhưng... năng lượng... nó lạnh lẽo và trống rỗng. Có chuyện gì đó rất tồi tệ đã xảy ra.",
            },
          ],
          triggerEvent: { name: "spawn_aric_lab" },
        },
        {
          // 3: Nhật ký cuối cùng
          type: "INTERACT_BLOCK",
          targetId: "minecraft:lectern",
          amount: 1,
          log: "Tìm và đọc cuốn nhật ký cuối cùng của Aric để biết toàn bộ sự thật.",
        },
        {
          // 4: Sự thật kinh hoàng và hậu quả
          type: "DIALOGUE",
          log: "Sự thật không như bạn nghĩ. Thí nghiệm của Aric đã tạo ra một thứ gì đó khủng khiếp hơn cả 'Sự Im Lặng'.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Đọc với giọng run rẩy* 'Ta đã sai... Hoàn toàn sai... Triệu hồi Wither không phải là câu trả lời. Nó chỉ mang đến sự hủy diệt. Ta đã từ bỏ ý định đó.'",
            },
            { speaker: "Elara", text: "Vậy... vậy thì sao?" },
            {
              speaker: "Steve",
              text: "'Ta đã tìm ra một cách khác. Không phải chống lại 'Sự Im Lặng', mà là... chứa đựng nó. Ta đã cố tạo ra một Golem từ Ký Ức thuần khiết, từ chính những mảnh ký ức của ta về Elara... một thực thể có thể hấp thụ 'Sự Im Lặng' vào bản thân nó.'",
            },
            { speaker: "Elara", text: "*Thở gấp* Ký ức... về ta?" },
            {
              speaker: "Steve",
              text: "'Nhưng năng lượng hỗn loạn của Nether đã làm hỏng nó. Nó... nó không hấp thụ 'Sự Im Lặng'... mà nó hấp thụ KÝ ỨC! Nó đã trở thành một 'Bóng Ma Ký Ức', một con quái vật đói khát những gì làm nên con người. Nó đã tấn công ta, lấy đi gần hết ký ức của ta về con gái mình...'",
            },
            {
              speaker: "Steve",
              text: "'Ta... ta chỉ còn nhớ tên con, Elara... Ta đã dùng chút sức lực cuối cùng để phong ấn nó ở đây... Nhưng ta biết, một ngày nào đó... nó sẽ bị thu hút bởi ký ức sống của con...'",
            },
            {
              speaker: "Steve",
              text: "*Mặt đất rung chuyển dữ dội* Elara, cái gì vậy?!",
            },
            {
              speaker: "Elara",
              text: "*Khuỵu xuống, ôm đầu* Nó... nó cảm nhận được ta! Ký ức của ta! Nó đang phá vỡ phong ấn! Aaaaahhh!!!",
            },
            {
              speaker: "Bóng Ma Ký Ức",
              text: "*Một giọng nói méo mó, đa âm vang vọng* KÝ... ỨC... CỦA... ELARA... NGON... NGỌT...",
            },
          ],
        },
        {
          // 5: Đối mặt với sai lầm
          type: "KILL",
          targetId: "dhh:memory_wraith", // ID của boss tùy chỉnh
          amount: 1,
          log: "Thí nghiệm thất bại của Aric đã thoát ra! Đánh bại Bóng Ma Ký Ức để bảo vệ Elara khỏi bị chính ký ức của cha cô nuốt chửng!",
          triggerEvent: { name: "spawn_memory_wraith" },
        },
        {
          // 6: Tro tàn và hy vọng mới
          type: "DIALOGUE",
          log: "Sau khi đánh bại Bóng Ma, một vật phẩm kỳ lạ rơi ra - Lõi Ký Ức Hư Không. Elara đã kiệt sức.",
          dialogue: [
            {
              speaker: "Steve",
              text: "*Thở dốc, nhặt vật phẩm* Cái này... là trái tim của nó sao?",
            },
            {
              speaker: "Elara",
              text: "*Yếu ớt* Lõi Ký Ức... nhưng nó đã bị hư không hóa. Năng lượng của nó... thật kỳ lạ. Nó không thuộc về thế giới này, cũng không thuộc về Nether.",
            },
            {
              speaker: "Elara",
              text: "Nó... nó đang cộng hưởng với một nơi khác. Một nơi... trống rỗng, lạnh lẽo và vô tận. Một... 'Kết Thúc'. Nơi mà cha ta đã phong ấn 'Sự Im Lặng' nguyên bản.",
            },
            {
              speaker: "Steve",
              text: "The End... Vậy là... hành trình vẫn chưa kết thúc. Chúng ta phải đến đó để kết thúc mọi chuyện.",
            },
            {
              speaker: "Elara",
              text: "Ta... ta cần nghỉ ngơi, Steve. Ký ức của ta... nó bị tổn thương sau cuộc tấn công. Hãy đưa ta về... thế giới bình thường. Ta cần thời gian...",
            },
          ],
          isEndStep: true,
          rewards: {
            xp: 1500, // Phần thưởng lớn nhưng hợp lý cho việc đánh boss
            nguyen_thach: 500,
            items: [
              { id: "minecraft:netherite_scrap", amount: 2 },
              { id: "minecraft:enchanted_golden_apple", amount: 1 },
              {
                id: "dhh:void_memory_core",
                amount: 1,
                nameTag: "§5Lõi Ký Ức Hư Không",
              }, // Vật phẩm cốt truyện
            ],
          },
        },
      ],
    },
     // ═══ HỒI III: HƯ VÔ VĨNH CỬU (THE ETERNAL VOID) ═══════════════════════
    // ═══════════════════════════════════════════════════════════════════
    // Mục tiêu: Lần theo sự dẫn dắt của Lõi Ký Ức, tìm kiếm Pháo Đài Cổ Xưa (Stronghold),
    // mở cánh cổng đến The End và đối mặt với nguồn gốc thực sự của "Sự Im Lặng".

    CHAPTER_3_QUEST_12: {
        chapterTitle: "Hồi III: Hư Vô Vĩnh Cửu",
        title: "Con Đường Đến Hư Vô",
        unlocks: "CHAPTER_2_QUEST_11", // Mở khóa sau khi hoàn thành Hồi II
        steps: [
            { // 0: Trở về từ Nether
                type: "DIALOGUE",
                log: "Sau khi trở về từ Nether, Elara cần thời gian để hồi phục. Hãy nói chuyện với cô ấy.",
                dialogue: [
                    { speaker: "Steve", text: "*Bước ra khỏi cổng, hít một hơi thật sâu không khí trong lành* Cuối cùng... cũng thoát khỏi nơi đó." },
                    { speaker: "Elara", text: "*Giọng yếu ớt* Ta... ta xin lỗi, Steve. Ta đã quá yếu... Cuộc tấn công của Bóng Ma... nó đã làm tổn thương bản chất ký ức của ta." },
                    { speaker: "Steve", text: "Không sao đâu. Cô đã làm rất tốt. Giờ chúng ta đã an toàn. Hãy nghỉ ngơi đi." },
                    { speaker: "Elara", text: "Không được... Ta không thể nghỉ ngơi khi 'Sự Im Lặng' vẫn còn đó. Cái Lõi Ký Ức Hư Không này... nó đang chỉ cho ta thấy con đường." },
                    { speaker: "Steve", text: "Con đường đến The End?" },
                    { speaker: "Elara", text: "Đúng vậy. Nhưng chúng ta không thể cứ thế mà đi được. Cần phải có một chiếc chìa khóa. Một 'Con Mắt' có thể nhìn xuyên qua các chiều không gian." },
                    { speaker: "Steve", text: "Một con mắt... làm sao để có nó?" },
                    { speaker: "Elara", text: "Ký ức của cha ta cho thấy... nó được tạo ra từ hai thứ: Bột Quỷ Lửa từ những linh hồn rực lửa ở Nether, và... một viên ngọc trai từ những sinh vật đến từ chính The End." },
                    { speaker: "Steve", text: "Enderman... Những sinh vật cao lớn, màu đen. Tôi đã thấy chúng. Vậy là... chúng ta phải săn lùng chúng." }
                ]
            },
            { // 1: Chuẩn bị cho nghi thức
                type: "COLLECT_MULTIPLE",
                log: "Để tạo ra 'Mắt Ender', bạn cần 12 Ngọc Ender từ Enderman và 6 Bột Quỷ Lửa (Blaze Powder).",
                targets: [
                    { id: "minecraft:ender_pearl", amount: 12 },
                    { id: "minecraft:blaze_powder", amount: 6 }
                ],
                rewards: { xp: 500, nguyen_thach: 250 }
            },
            { // 2: Chế tạo Mắt Ender
                type: "COLLECT",
                targetId: "minecraft:end_eye", // Sửa lại thành eye_of_ender nếu API của bạn dùng tên đó
                amount: 12,
                log: "Bạn đã có đủ nguyên liệu. Hãy kết hợp chúng để tạo ra 12 Mắt Ender."
            },
            { // 3: Lời dẫn đường
                type: "DIALOGUE",
                log: "Những con mắt này sẽ dẫn đường đến một nơi cổ xưa, nơi cất giữ cánh cổng cuối cùng.",
                dialogue: [
                    { speaker: "Steve", text: "*Cầm Mắt Ender trên tay* Nó... nó đang rung nhẹ. Dường như nó muốn bay về một hướng." },
                    { speaker: "Elara", text: "Nó đang gọi... Steve. Nó đang gọi chúng ta đến Pháo Đài Cổ Xưa, nơi cánh cổng đến The End được giấu kín. Hãy đi theo nó." },
                    { speaker: "Steve", text: "Đây sẽ là chặng đường cuối cùng, phải không?" },
                    { speaker: "Elara", text: "Phải. Dù kết quả có ra sao, mọi thứ sẽ kết thúc ở đó. Hãy sẵn sàng, Steve. Ta tin ở cậu." }
                ],
                isEndStep: true,
                rewards: { 
                    xp: 200, 
                    nguyen_thach: 100,
                    items: [
                        { id: "minecraft:potion", amount: 4, nameTag: "§bThuốc Rơi Chậm (4:00)" },
                        { id: "minecraft:diamond_pickaxe", amount: 1, enchantments: { "efficiency": 3, "unbreaking": 2 } }
                    ]
                }
            }
        ]
    },
    
    CHAPTER_3_QUEST_12: {
        chapterTitle: "Hồi III: Hư Vô Vĩnh Cửu",
        title: "Pháo Đài Cổ Xưa",
        unlocks: "CHAPTER_3_QUEST_12", // Đây có thể là lỗi đánh máy, tôi sẽ giả định nó mở khóa từ quest 11 hoặc 12, nhưng bạn nên kiểm tra lại ID này
        steps: [
            { // 0: Tìm Stronghold
                type: "EXPLORE",
                target: "stronghold",
                log: "Đi theo sự dẫn dắt của Mắt Ender để tìm ra Pháo Đài Cổ Xưa (Stronghold) nằm sâu dưới lòng đất."
            },
            { // 1: Kích hoạt cổng
                type: "INTERACT_BLOCK",
                targetId: "minecraft:end_portal_frame",
                amount: 12,
                log: "Bạn đã tìm thấy phòng cổng! Hãy đặt 12 Mắt Ender vào các khung để kích hoạt cánh cổng cuối cùng."
            },
            { // 2: Trước ngưỡng cửa hư vô
                type: "DIALOGUE",
                log: "Cánh cổng đã mở, dẫn đến một khoảng không đen kịt đầy sao. Đây là điểm không thể quay đầu.",
                dialogue: [
                    { speaker: "Steve", text: "*Nhìn vào cánh cổng* Trông như một bầu trời đêm... bị giam cầm trong một cái khung." },
                    { speaker: "Elara", text: "Ta có thể cảm nhận nó... 'Sự Im Lặng'. Nó ở ngay phía bên kia. Lạnh lẽo, trống rỗng, và vô cùng mạnh mẽ." },
                    { speaker: "Steve", text: "Cô có sợ không?" },
                    { speaker: "Elara", text: "Có chứ. Ta sợ rằng ký ức về cha ta sẽ tan biến hoàn toàn. Ta sợ rằng chúng ta sẽ thất bại. Nhưng... nỗi sợ lớn nhất của ta là để thế giới này chết chìm trong lãng quên." },
                    { speaker: "Elara", text: "Cậu đã đi cùng ta đến tận đây, Steve. Cậu đã cho ta hy vọng. Dù có chuyện gì xảy ra, hãy biết rằng... cậu không còn là một 'Người Lạ Không Tên' nữa. Cậu là một anh hùng." },
                    { speaker: "Steve", text: "*Nắm chặt kiếm* Chúng ta sẽ kết thúc chuyện này. Cùng nhau." }
                ],
                isEndStep: true,
                rewards: { 
                    xp: 1000, 
                    nguyen_thach: 400,
                    items: [
                        { id: "minecraft:enchanted_golden_apple", amount: 2 },
                        { id: "minecraft:totem_of_undying", amount: 1 },
                        { id: "minecraft:arrow", amount: 64 }
                    ]
                }
            }
        ]
    },

    CHAPTER_3_QUEST_13: {
        chapterTitle: "Hồi III: Hư Vô Vĩnh Cửu",
        title: "Trái Tim Của Sự Im Lặng",
        unlocks: "CHAPTER_3_QUEST_12",
        steps: [
            { // 0: Bước vào The End
                type: "EXPLORE",
                target: "the_end",
                log: "Dũng cảm bước qua cánh cổng và đối mặt với định mệnh của bạn."
            },
            { // 1: Đối mặt với con rồng
                type: "DIALOGUE",
                log: "Bạn đã đến The End. Một con rồng khổng lồ đang bay lượn, được kết nối với những cột tháp pha lê.",
                dialogue: [
                    { speaker: "Steve", text: "*Che mắt* Nơi này... thật trống rỗng. Chỉ có hòn đảo lơ lửng này và... một con rồng?!" },
                    { speaker: "Elara", text: "Đó không chỉ là một con rồng, Steve! Nhìn đi! Năng lượng từ những cột tháp đó... nó đang nuôi dưỡng con rồng, nhưng đồng thời cũng giam cầm nó!" },
                    { speaker: "Elara", text: "Con rồng... nó chính là 'Trái Tim' của 'Sự Im Lặng'. Nó không phải kẻ xấu, nó là một nạn nhân! Nó là vật chủ, là nguồn năng lượng duy trì lời nguyền lãng quên này!" },
                    { speaker: "Steve", text: "Vậy nếu chúng ta giết nó...?" },
                    { speaker: "Elara", text: "Lời nguyền sẽ bị phá vỡ! Steve, cậu phải phá hủy những viên pha lê trên đỉnh các cột tháp trước! Chúng là nguồn sống của 'Sự Im Lặng'. Hãy giải thoát cho con rồng... bằng cách cho nó sự yên nghỉ cuối cùng!" }
                ]
            },
            { // 2: Trận chiến cuối cùng
                type: "KILL",
                targetId: "minecraft:ender_dragon",
                amount: 1,
                log: "Phá hủy các Tinh Thể End trên đỉnh cột tháp, sau đó đánh bại Rồng Ender để phá vỡ lời nguyền 'Sự Im Lặng' một lần và mãi mãi!"
            },
            { // 3: Hồi kết
                type: "DIALOGUE",
                log: "Con rồng đã gục ngã. 'Sự Im Lặng' tan biến. Nhưng cái giá của chiến thắng là gì?",
                dialogue: [
                    { speaker: "Steve", text: "*Nhìn con rồng tan biến thành ánh sáng* Chúng ta... chúng ta đã làm được." },
                    { speaker: "Elara", text: "*Giọng cô bắt đầu mờ dần, trong suốt* Phải... chúng ta đã làm được... Ánh sáng... đang quay trở lại..." },
                    { speaker: "Steve", text: "*Quay lại, hoảng hốt* Elara! Cô sao vậy?! Trông cô... mờ đi!" },
                    { speaker: "Elara", text: "Ta là một 'Tiếng Vọng Ký Ức', Steve. Ta được sinh ra từ nỗi sợ hãi về 'Sự Im Lặng'. Giờ đây... khi nó không còn nữa... mục đích tồn tại của ta... cũng đã kết thúc." },
                    { speaker: "Steve", text: "Không! Đừng đi! Phải có cách khác chứ!" },
                    { speaker: "Elara", text: "*Mỉm cười, nước mắt ánh sáng lăn dài* Đừng buồn. Đây là sự giải thoát. Ta sẽ được gặp lại cha. Ký ức của chúng ta sẽ không còn bị giam cầm nữa... Cảm ơn cậu, Steve... Cảm ơn vì đã cho ta... được nhớ lại." },
                    { speaker: "Steve", text: "Elara...!" },
                    { speaker: "Elara", text: "*Tan biến thành những hạt ánh sáng* Hãy sống... và hãy... nhớ lấy..." },
                    { speaker: "Steve", text: "*Đứng một mình giữa hư vô, nhìn quả trứng rồng xuất hiện* Tôi sẽ... Tôi hứa... Tôi sẽ nhớ." }
                ],
                isEndStep: true,
                rewards: { 
                    xp: 20000, 
                    nguyen_thach: 2500,
                    items: [
                        { id: "minecraft:dragon_egg", amount: 1 },
                        { id: "dhh:elara_memento", amount: 1, nameTag: "§bKỷ Vật Của Elara", lore: ["§7Một mảnh pha lê ấm áp, dường như vẫn còn vương lại một tiếng vọng xa xăm..."] }
                    ]
                }
            }
        ]
    }
  },
};

export function getUpgradeSystemConfig() {
  return CONFIG.UPGRADE_SYSTEM;
}

export const CALENDAR_CONFIG = {
  // Danh sách các ngày lễ đặc biệt.
  // Thêm bao nhiêu ngày tùy thích!
  SPECIAL_DAYS: {
    // ==== THÁNG 1 ====
    "1/1": "🎉 Chúc Mừng Năm Mới Toàn Thế Giới! Hạnh phúc và bình an nhé!",
    "4/1": "📚 Ngày Đọc Sách Thế Giới – Hôm nay đọc vài trang nhé!",
    "6/1": "🌟 Lễ Hiển Linh (Epiphany) – Ngày truyền thống của Kitô giáo.",
    "11/1": "🕊️ Ngày Cảm Ơn Quốc Tế – Đừng quên nói lời cảm ơn!",
    "14/1": "💌 Ngày Gửi Thiệp Quốc Tế – Một tấm thiệp nhỏ, tình cảm lớn!",
    "21/1": "🤗 Ngày Ôm Thế Giới – Gửi ôm ảo cho người thân yêu!",
    "26/1": "🇦🇺 Ngày Quốc Khánh Úc!",
    "27/1": "🎭 Ngày Tưởng niệm Nạn nhân Holocaust – Vì hòa bình và nhân đạo!",

    // ==== THÁNG 2 ====
    "2/2": "🦫 Ngày Chuột Chũi (Groundhog Day) – Dự đoán mùa xuân đến chưa?",
    "4/2": "💖 Ngày Ung Thư Thế Giới – Cùng lan tỏa yêu thương!",
    "9/2": "🍕 Ngày Pizza Thế Giới – Đã đến lúc ăn pizza thôi!",
    "11/2": "👩‍🔬 Ngày Phụ Nữ và Bé Gái trong Khoa học!",
    "12/2": "🐒 Sinh nhật Charles Darwin – Ngày Tiến Hóa!",
    "13/2": "🎶 Ngày Radio Thế Giới!",
    "14/2": "💘 Valentine – Ngày Lễ Tình Nhân Toàn Cầu!",
    "20/2": "🕊️ Ngày Công Lý Xã Hội Thế Giới!",
    "21/2": "🗣️ Ngày Tiếng Mẹ Đẻ Quốc Tế!",
    "29/2": "🌍 Ngày Đặc Biệt – chỉ 4 năm mới có một lần, tận hưởng nhé!",

    // ==== THÁNG 3 ====
    "1/3": "🌸 Ngày Quốc Tế Lễ Hội Mùa Xuân!",
    "3/3": "🐻 Ngày Bảo Vệ Động Vật Hoang Dã Thế Giới!",
    "8/3": "🌷 Ngày Quốc Tế Phụ Nữ – Tôn vinh một nửa thế giới!",
    "14/3": "🥧 Ngày Pi Quốc Tế (3.14) – Toán học và bánh ngọt!",
    "17/3": "☘️ Lễ Thánh Patrick – Ngày Xanh của Ireland!",
    "20/3": "😊 Ngày Quốc Tế Hạnh Phúc!",
    "21/3": "🌳 Ngày Quốc Tế Rừng – Hãy trồng cây hôm nay!",
    "22/3": "💧 Ngày Nước Thế Giới!",
    "23/3": "🌦️ Ngày Khí Tượng Thế Giới!",
    "25/3": "👩‍🚀 Ngày Phụ Nữ trong Không gian!",
    "27/3": "🎭 Ngày Sân Khấu Thế Giới!",
    "31/3": "🏳️‍⚧️ Ngày Hiển thị Nhận dạng Giới – Tôn trọng mọi người!",

    // ==== THÁNG 4 ====
    "1/4": "😂 Ngày Cá Tháng Tư – Đừng tin ai hôm nay nhé!",
    "7/4": "⚕️ Ngày Sức Khỏe Thế Giới!",
    "12/4": "🚀 Ngày Du Hành Vũ Trụ – Yuri Gagarin bay vào không gian!",
    "13/4": "💦 Tết Songkran – Lễ hội té nước Thái Lan!",
    "22/4": "🌎 Ngày Trái Đất – Cùng bảo vệ hành tinh xanh!",
    "23/4": "📖 Ngày Sách và Bản quyền Thế Giới!",
    "30/4": "🇻🇳 Ngày Giải phóng Miền Nam Việt Nam!",

    // ==== THÁNG 5 ====
    "1/5": "💪 Ngày Quốc Tế Lao Động!",
    "4/5": "🌌 Star Wars Day – May the 4th be with you!",
    "5/5": "🪁 Lễ hội Trẻ em Nhật (Kodomo no Hi)!",
    "8/5": "🌺 Ngày Chữ Thập Đỏ Quốc Tế!",
    "9/5": "✌️ Ngày Chiến thắng Phát xít (Victory Day)!",
    "12/5": "👩‍⚕️ Ngày Quốc Tế Y Tá!",
    "15/5": "🏠 Ngày Gia Đình Quốc Tế!",
    "20/5": "🐝 Ngày Ong Thế Giới – Hãy bảo vệ loài nhỏ bé này!",
    "21/5": "🎶 Ngày Đa dạng Văn hóa Thế Giới!",
    "22/5": "🦋 Ngày Đa dạng Sinh học!",
    "31/5": "🚭 Ngày Không Thuốc Lá Thế Giới!",

    // ==== THÁNG 6 ====
    "1/6": "🎈 Ngày Quốc Tế Thiếu Nhi!",
    "5/6": "🌍 Ngày Môi Trường Thế Giới!",
    "8/6": "🐠 Ngày Đại Dương Thế Giới!",
    "14/6": "🩸 Ngày Hiến Máu Thế Giới!",
    "18/6": "👨‍👧 Ngày Của Cha!",
    "20/6": "🕊️ Ngày Người Tị Nạn Thế Giới!",
    "21/6": "🧘 Ngày Yoga Quốc Tế!",
    "24/6": "🔥 Lễ Thánh John (mùa Hè Châu Âu)",
    "26/6": "⚖️ Ngày Chống Ma túy Toàn Cầu!",

    // ==== THÁNG 7 ====
    "4/7": "🎆 Ngày Quốc Khánh Hoa Kỳ – Independence Day!",
    "7/7": "💞 Ngày Tình Yêu Tanabata (Nhật Bản)!",
    "11/7": "👨‍👩‍👧 Ngày Dân số Thế Giới!",
    "17/7": "📱 Ngày Emoji Thế Giới 😎",
    "20/7": "🌕 Ngày Con Người Đặt Chân Lên Mặt Trăng!",
    "27/7": "🎖️ Ngày Thương binh Liệt sĩ Việt Nam!",
    "30/7": "🤝 Ngày Hữu nghị Quốc Tế!",

    // ==== THÁNG 8 ====
    "8/8": "🐱 Ngày Mèo Quốc Tế!",
    "9/8": "🌍 Ngày Người Bản Địa Thế Giới!",
    "12/8": "🧒 Ngày Thanh Thiếu Niên Quốc Tế!",
    "15/8": "🌕 Lễ Đức Mẹ Lên Trời (Assumption)!",
    "19/8": "📷 Ngày Nhiếp Ảnh Thế Giới!",
    "20/8": "🎮 Ngày Game Thế Giới!",
    "26/8": "👩 Ngày Bình đẳng Phụ nữ Quốc tế!",
    "30/8": "☮️ Ngày Nạn nhân mất tích do xung đột!",

    // ==== THÁNG 9 ====
    "2/9": "🇻🇳 Quốc khánh Việt Nam!",
    "8/9": "📖 Ngày Xóa mù chữ Thế Giới!",
    "10/9": "🥮 Tết Trung Thu – Ngắm trăng và ăn bánh nhé!",
    "15/9": "💻 Ngày Lập trình viên Quốc tế!",
    "21/9": "🕊️ Ngày Hòa bình Thế Giới!",
    "27/9": "🌍 Ngày Du lịch Thế Giới!",

    // ==== THÁNG 10 ====
    "1/10": "👵 Ngày Người Cao Tuổi Thế Giới!",
    "4/10": "🐾 Ngày Động vật Thế Giới!",
    "5/10": "📚 Ngày Nhà Giáo Thế Giới!",
    "10/10": "🧠 Ngày Sức Khỏe Tâm Thần Thế Giới!",
    "13/10": "💼 Ngày Doanh nhân Việt Nam!",
    "16/10": "🍞 Ngày Lương Thực Thế Giới!",
    "24/10": "🇺🇳 Ngày Liên Hiệp Quốc!",
    "31/10": "🎃 Halloween – Hóa trang và kẹo ngọt thôi nào!",

    // ==== THÁNG 11 ====
    "1/11": "🕯️ Lễ Các Thánh – All Saints’ Day!",
    "11/11": "🕊️ Ngày Kết thúc Chiến tranh Thế giới Thứ nhất!",
    "13/11": "🤗 Ngày Tốt Bụng Thế Giới!",
    "19/11": "🚹 Ngày Quốc Tế Nam Giới!",
    "20/11": "📖 Ngày Nhà Giáo Việt Nam!",
    "21/11": "🍽️ Ngày Chống Đói Nghèo!",
    "25/11": "🚫 Ngày Chống Bạo lực Phụ nữ!",
    "30/11": "💻 Ngày An ninh mạng Quốc tế!",

    // ==== THÁNG 12 ====
    "1/12": "🎗️ Ngày Thế Giới Phòng chống AIDS!",
    "3/12": "♿ Ngày Người Khuyết Tật Thế Giới!",
    "5/12": "👑 Ngày Tình nguyện Quốc tế!",
    "10/12": "🕊️ Ngày Nhân quyền Thế Giới!",
    "21/12": "❄️ Đông chí – Ngày ngắn nhất năm!",
    "24/12": "🎄 Đêm Giáng Sinh An Lành!",
    "25/12": "🎅 Giáng Sinh Vui Vẻ – Merry Christmas!",
    "31/12": "🎆 Đêm Giao Thừa – Chuẩn bị đón năm mới!",
  },
};

// ===================================================================
// === HỆ THỐNG QUÀ TẶNG HÀNG NGÀY ==================================
// ===================================================================
export const DAILY_REWARD_CONFIG = {
  ENABLED: true,
  REWARD_TIME_OF_DAY: 0, // Thời điểm phát quà (0 = 6:00 sáng)
  FIXED_NGUYEN_THACH: 50,

  // Bể vật phẩm ngẫu nhiên. `weight` càng cao, tỷ lệ ra càng lớn.
  ITEM_POOL: [
    // Thức ăn & Nước uống (Tỷ lệ cao)
    { id: "minecraft:cooked_beef", quantity: [2, 4], weight: 15 },
    { id: "minecraft:golden_carrot", quantity: [1, 3], weight: 10 },
    { id: "dhh:boiled_water_bottle", quantity: [1, 2], weight: 20 },
    { id: "minecraft:cake", quantity: [1, 1], weight: 5 },
    { id: "minecraft:pumpkin_pie", quantity: [1, 2], weight: 10 },

    // Block trang trí (Tỷ lệ trung bình)
    // === KHỐI TRANG TRÍ & THẨM MỸ (BEDROCK) ===
    { id: "minecraft:cherry_log", quantity: [4, 8], weight: 8 },
    { id: "minecraft:mangrove_log", quantity: [4, 8], weight: 8 },
    { id: "minecraft:amethyst_block", quantity: [1, 2], weight: 5 },
    { id: "minecraft:calcite", quantity: [8, 16], weight: 7 },
    {
      id: "minecraft:polished_blackstone_bricks",
      quantity: [8, 16],
      weight: 6,
    },
    { id: "minecraft:sea_lantern", quantity: [2, 4], weight: 4 },
    { id: "minecraft:shroomlight", quantity: [1, 3], weight: 4 },
    { id: "minecraft:ochre_froglight", quantity: [1, 2], weight: 3 },
    { id: "minecraft:verdant_froglight", quantity: [1, 2], weight: 3 },
    { id: "minecraft:pearlescent_froglight", quantity: [1, 2], weight: 3 },
    { id: "minecraft:quartz_block", quantity: [4, 8], weight: 7 },
    { id: "minecraft:smooth_quartz", quantity: [4, 8], weight: 7 },
    { id: "minecraft:chiseled_quartz_block", quantity: [2, 4], weight: 5 },
    { id: "minecraft:deepslate_tiles", quantity: [8, 16], weight: 6 },
    { id: "minecraft:polished_deepslate", quantity: [8, 16], weight: 6 },
    { id: "minecraft:chiseled_deepslate", quantity: [2, 4], weight: 5 },
    { id: "minecraft:stone_bricks", quantity: [8, 16], weight: 8 },
    { id: "minecraft:mossy_stone_bricks", quantity: [4, 8], weight: 7 },
    { id: "minecraft:polished_andesite", quantity: [8, 16], weight: 7 },
    { id: "minecraft:polished_diorite", quantity: [8, 16], weight: 7 },
    { id: "minecraft:polished_granite", quantity: [8, 16], weight: 7 },
    { id: "minecraft:smooth_stone", quantity: [8, 16], weight: 6 },
    { id: "minecraft:terracotta", quantity: [8, 16], weight: 8 },
    { id: "minecraft:white_terracotta", quantity: [8, 16], weight: 6 },
    { id: "minecraft:black_terracotta", quantity: [8, 16], weight: 6 },
    { id: "minecraft:glazed_terracotta", quantity: [2, 4], weight: 4 },
    { id: "minecraft:white_glazed_terracotta", quantity: [2, 4], weight: 4 },
    { id: "minecraft:blue_glazed_terracotta", quantity: [2, 4], weight: 4 },
    { id: "minecraft:cyan_glazed_terracotta", quantity: [2, 4], weight: 4 },
    { id: "minecraft:magenta_glazed_terracotta", quantity: [2, 4], weight: 4 },
    { id: "minecraft:red_glazed_terracotta", quantity: [2, 4], weight: 4 },
    { id: "minecraft:green_glazed_terracotta", quantity: [2, 4], weight: 4 },
    { id: "minecraft:yellow_glazed_terracotta", quantity: [2, 4], weight: 4 },
    { id: "minecraft:purple_glazed_terracotta", quantity: [2, 4], weight: 4 },
    {
      id: "minecraft:light_blue_glazed_terracotta",
      quantity: [2, 4],
      weight: 4,
    },
    { id: "minecraft:orange_glazed_terracotta", quantity: [2, 4], weight: 4 },
    { id: "minecraft:brown_glazed_terracotta", quantity: [2, 4], weight: 4 },
    { id: "minecraft:lime_glazed_terracotta", quantity: [2, 4], weight: 4 },
    { id: "minecraft:pink_glazed_terracotta", quantity: [2, 4], weight: 4 },
    { id: "minecraft:white_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:black_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:red_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:blue_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:light_blue_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:green_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:yellow_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:pink_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:magenta_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:lime_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:orange_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:cyan_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:gray_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:light_gray_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:purple_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:brown_concrete", quantity: [8, 16], weight: 6 },
    { id: "minecraft:white_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:black_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:red_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:blue_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:cyan_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:light_blue_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:lime_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:magenta_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:pink_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:orange_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:yellow_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:purple_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:brown_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:gray_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:light_gray_stained_glass", quantity: [8, 16], weight: 5 },
    { id: "minecraft:lantern", quantity: [2, 4], weight: 5 },
    { id: "minecraft:soul_lantern", quantity: [1, 3], weight: 4 },
    { id: "minecraft:candle", quantity: [2, 6], weight: 5 },
    { id: "minecraft:white_candle", quantity: [2, 6], weight: 5 },
    { id: "minecraft:flower_pot", quantity: [2, 4], weight: 6 },
    { id: "minecraft:painting", quantity: [1, 2], weight: 3 },
    { id: "minecraft:item_frame", quantity: [1, 2], weight: 3 },
    { id: "minecraft:armor_stand", quantity: [1, 2], weight: 3 },
    { id: "minecraft:bookshelf", quantity: [4, 8], weight: 6 },
    { id: "minecraft:lectern", quantity: [1, 2], weight: 4 },
    { id: "minecraft:bell", quantity: [1, 1], weight: 2 },
    { id: "minecraft:end_rod", quantity: [2, 4], weight: 4 },
    { id: "minecraft:glow_lichen", quantity: [4, 8], weight: 5 },
    { id: "minecraft:vine", quantity: [4, 8], weight: 5 },
    { id: "minecraft:flowering_azalea_leaves", quantity: [4, 8], weight: 5 },
    { id: "minecraft:azalea_leaves", quantity: [4, 8], weight: 5 },
    { id: "minecraft:moss_block", quantity: [4, 8], weight: 6 },
    { id: "minecraft:flowering_azalea", quantity: [1, 3], weight: 5 },
    { id: "minecraft:azalea", quantity: [1, 3], weight: 5 },
    { id: "minecraft:chiseled_bookshelf", quantity: [1, 2], weight: 4 },
    { id: "minecraft:bamboo_mosaic", quantity: [4, 8], weight: 6 },
    { id: "minecraft:bamboo_planks", quantity: [8, 16], weight: 8 },
    { id: "minecraft:bamboo_block", quantity: [4, 8], weight: 6 },
    { id: "minecraft:bamboo_door", quantity: [2, 4], weight: 5 },
    { id: "minecraft:bamboo_trapdoor", quantity: [2, 4], weight: 5 },
    { id: "minecraft:bamboo_fence", quantity: [4, 8], weight: 5 },
    { id: "minecraft:bamboo_fence_gate", quantity: [1, 2], weight: 4 },
    { id: "minecraft:bamboo_stairs", quantity: [4, 8], weight: 5 },
    { id: "minecraft:bamboo_slab", quantity: [4, 8], weight: 5 },
    { id: "minecraft:glowstone", quantity: [4, 8], weight: 5 },
    { id: "minecraft:campfire", quantity: [1, 2], weight: 4 },
    { id: "minecraft:soul_campfire", quantity: [1, 2], weight: 4 },
    { id: "minecraft:sculk", quantity: [2, 4], weight: 4 },
    { id: "minecraft:sculk_vein", quantity: [2, 4], weight: 4 },
    { id: "minecraft:nether_bricks", quantity: [8, 16], weight: 6 },
    { id: "minecraft:red_nether_bricks", quantity: [4, 8], weight: 5 },
    { id: "minecraft:basalt", quantity: [4, 8], weight: 5 },
    { id: "minecraft:polished_basalt", quantity: [4, 8], weight: 5 },
    { id: "minecraft:crying_obsidian", quantity: [1, 2], weight: 3 },
    { id: "minecraft:obsidian", quantity: [2, 4], weight: 4 },

    // Vật phẩm hiếm (Tỷ lệ thấp)
    { id: "minecraft:diamond", quantity: [1, 1], weight: 1 },
    { id: "minecraft:emerald", quantity: [1, 2], weight: 2 },
    { id: "minecraft:name_tag", quantity: [1, 1], weight: 1.5 },
  ],
};
export const TUTORIAL_QUESTS = {
    // ═══════════════════════════════════════════════════════════════════
    // ═══ DANH MỤC: SINH TỒN CƠ BẢN ════════════════════════════════════
    // ═══════════════════════════════════════════════════════════════════

    TUTORIAL_BASIC_TOOLS: {
        id: "TUTORIAL_BASIC_TOOLS",
        title: "Hướng Dẫn: Bộ Công Cụ Đầu Tiên",
        description: "Học cách chế tạo những công cụ cơ bản nhất để bắt đầu sinh tồn.",
        steps: [
            {
                type: "COLLECT_MULTIPLE",
                log: "Đầu tiên, hãy đấm cây để thu thập 5 Gỗ Sồi (Oak Log). Sau đó, chế tạo chúng thành Ván Gỗ (Planks) và dùng ván gỗ để tạo Bàn Chế Tạo (Crafting Table).",
                targets: [ { id: "minecraft:oak_log", amount: 5 }, { id: "minecraft:crafting_table", amount: 1 } ],
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT_MULTIPLE",
                log: "Bây giờ, hãy dùng Bàn Chế Tạo để làm 1 Cúp Gỗ, 1 Rìu Gỗ và 1 Kiếm Gỗ từ Ván Gỗ và Que (Sticks).",
                targets: [ { id: "minecraft:wooden_pickaxe", amount: 1 }, { id: "minecraft:wooden_axe", amount: 1 }, { id: "minecraft:wooden_sword", amount: 1 } ],
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Tuyệt vời! Bạn đã có những công cụ cơ bản. Rìu dùng để chặt gỗ nhanh hơn, Cúp dùng để đào đá, và Kiếm để tự vệ. Hãy sẵn sàng cho những thử thách tiếp theo!",
                dialogue: [ { speaker: "Sổ Tay Hướng Dẫn", text: "Mỗi công cụ có một công dụng riêng. Sử dụng đúng công cụ cho đúng loại khối sẽ giúp bạn tiết kiệm thời gian và độ bền của vật phẩm." } ],
                isEndStep: true
            }
        ]
    },

    TUTORIAL_MAKING_A_BED: {
        id: "TUTORIAL_MAKING_A_BED",
        title: "Hướng Dẫn: Giấc Ngủ An Lành",
        description: "Học cách tạo một chiếc giường để bỏ qua ban đêm và đặt điểm hồi sinh.",
        steps: [
            {
                type: "COLLECT_TAG",
                log: "Để làm giường, bạn cần 3 Len (Wool). Hãy tìm những con cừu và xén lông chúng bằng Kéo (Shears) hoặc giết chúng.",
                target: "#wool",
                amount: 3,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT_TAG",
                log: "Tiếp theo, bạn cần 3 Ván Gỗ (Planks) bất kỳ để làm khung giường. Hãy chặt một ít gỗ và chế tạo chúng.",
                target: "#planks",
                amount: 3,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Bây giờ, hãy kết hợp 3 Len và 3 Ván Gỗ trên Bàn Chế Tạo để tạo ra một chiếc Giường (Bed).",
                targetId: "minecraft:bed",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Bạn đã có giường! Đặt nó xuống và ngủ vào ban đêm để trời sáng ngay lập tức. Ngủ trên giường cũng sẽ lưu điểm hồi sinh của bạn tại vị trí đó.",
                dialogue: [ { speaker: "Sổ Tay Hướng Dẫn", text: "Lưu ý: Bạn không thể ngủ nếu có quái vật ở gần. Hãy đảm bảo khu vực xung quanh an toàn và được thắp sáng!" } ],
                isEndStep: true
            }
        ]
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // ═══ DANH MỤC: KHAI KHOÁNG & LUYỆN KIM ══════════════════════════════
    // ═══════════════════════════════════════════════════════════════════

    TUTORIAL_FURNACE: {
        id: "TUTORIAL_FURNACE",
        title: "Hướng Dẫn: Lò Nung Đầu Tiên",
        description: "Học cách chế tạo và sử dụng Lò Nung để nấu chảy quặng và nấu chín thức ăn.",
        steps: [
            {
                type: "COLLECT",
                log: "Hãy dùng Cúp Gỗ để đào 8 Đá Cuội (Cobblestone).",
                targetId: "minecraft:cobblestone",
                amount: 8,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Sử dụng 8 Đá Cuội trên Bàn Chế Tạo để làm một cái Lò Nung (Furnace).",
                targetId: "minecraft:furnace",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT_MULTIPLE",
                log: "Bây giờ, hãy thử nung chảy quặng. Thu thập 1 Quặng Sắt (Raw Iron) và 1 Than (Coal) để làm nhiên liệu.",
                targets: [ { id: "minecraft:raw_iron", amount: 1 }, { id: "minecraft:coal", amount: 1 } ],
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Đặt Lò Nung xuống. Mở giao diện lò, đặt Quặng Sắt vào ô trên cùng, Than vào ô dưới cùng và chờ đợi. Bạn sẽ nhận được Thỏi Sắt (Iron Ingot)!",
                dialogue: [ { speaker: "Sổ Tay Hướng Dẫn", text: "Bạn có thể dùng Gỗ, Ván Gỗ, hoặc Xô Dung Nham làm nhiên liệu thay thế cho Than. Lò Nung cũng có thể dùng để nấu chín thức ăn sống." } ],
                isEndStep: true
            }
        ]
    },

    TUTORIAL_FINDING_DIAMONDS: {
        id: "TUTORIAL_FINDING_DIAMONDS",
        title: "Hướng Dẫn: Săn Tìm Kim Cương",
        description: "Tìm hiểu về độ sâu lý tưởng và công cụ cần thiết để tìm thấy những viên kim cương quý giá.",
        steps: [
            {
                type: "COLLECT",
                log: "Kim Cương chỉ có thể được khai thác bằng Cúp Sắt hoặc tốt hơn. Hãy chế tạo một chiếc Cúp Sắt (Iron Pickaxe).",
                targetId: "minecraft:iron_pickaxe",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Kim Cương xuất hiện nhiều nhất ở các lớp đá sâu. Hãy đào xuống độ sâu khoảng Y = -58. Bạn có thể xem tọa độ của mình bằng cách bật tùy chọn trong cài đặt game.",
                dialogue: [ { speaker: "Sổ Tay Hướng Dẫn", text: "Hãy đào theo kiểu bậc thang hoặc đào một đường hầm 2x1 để tránh rơi xuống dung nham hoặc hang động cao. Luôn mang theo Đuốc, thức ăn và vũ khí!" } ]
            },
            {
                type: "COLLECT",
                log: "Bây giờ, hãy kiên nhẫn đào ở độ sâu Y=-58 và tìm kiếm Quặng Kim Cương (Diamond Ore). Chỉ cần tìm được 1 viên là thành công!",
                targetId: "minecraft:diamond",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Chúc mừng! Bạn đã tìm thấy viên kim cương đầu tiên! Kim Cương là vật liệu cực kỳ giá trị để chế tạo công cụ, vũ khí và giáp mạnh nhất.",
                dialogue: [ { speaker: "Sổ Tay Hướng Dẫn", text: "Kim Cương thường xuất hiện theo mạch nhỏ. Nếu bạn tìm thấy một viên, hãy đào xung quanh nó để tìm thêm!" } ],
                isEndStep: true
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // ═══ DANH MỤC: NÔNG NGHIỆP & CHĂN NUÔI ══════════════════════════════
    // ═══════════════════════════════════════════════════════════════════

    TUTORIAL_WHEAT_FARM: {
        id: "TUTORIAL_WHEAT_FARM",
        title: "Hướng Dẫn: Ruộng Lúa Mì Đầu Tiên",
        description: "Học cách tạo một nông trại lúa mì để có nguồn cung cấp Bánh Mì vô tận.",
        steps: [
            {
                type: "COLLECT",
                log: "Để làm ruộng, bạn cần một cái Cuốc (Hoe). Hãy chế tạo một cái Cuốc Đá (Stone Hoe).",
                targetId: "minecraft:stone_hoe",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Bạn cần hạt giống để gieo trồng. Hãy phá những bụi cỏ cao để tìm 5 Hạt Giống Lúa Mì (Wheat Seeds).",
                targetId: "minecraft:wheat_seeds",
                amount: 5,
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Tìm một khu vực đất gần nguồn nước. Dùng Cuốc tác động lên đất để tạo ra Đất Nông Nghiệp (Farmland). Sau đó, gieo Hạt Giống lên đó.",
                dialogue: [ { speaker: "Sổ Tay Hướng Dẫn", text: "Đất nông nghiệp cần được tưới nước để không bị khô và giúp cây lớn nhanh hơn. Một khối nước có thể tưới cho đất trong vòng 4 khối theo mọi hướng." } ]
            },
            {
                type: "COLLECT",
                log: "Chờ cho lúa mì lớn lên (chuyển sang màu vàng nâu) rồi thu hoạch. Hãy thu hoạch 5 Lúa Mì (Wheat). Bạn có thể dùng Bột Xương (Bonemeal) để cây lớn nhanh hơn.",
                targetId: "minecraft:wheat",
                amount: 5,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Cuối cùng, dùng 3 Lúa Mì để chế tạo ra 1 Bánh Mì (Bread).",
                targetId: "minecraft:bread",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Thành công! Bạn đã tự tạo ra nguồn lương thực bền vững. Bạn có thể áp dụng kỹ thuật này cho Cà Rốt, Khoai Tây và các loại cây trồng khác.",
                dialogue: [ { speaker: "Sổ Tay Hướng Dẫn", text: "Khi thu hoạch lúa mì, bạn cũng sẽ nhận lại hạt giống để có thể tiếp tục gieo trồng cho vụ mùa tiếp theo." } ],
                isEndStep: true
            }
        ]
    },

    TUTORIAL_ANIMAL_BREEDING: {
        id: "TUTORIAL_ANIMAL_BREEDING",
        title: "Hướng Dẫn: Nhân Giống Vật Nuôi",
        description: "Học cách cho các loài động vật ăn để chúng sinh sản, tạo ra một trang trại chăn nuôi.",
        steps: [
            {
                type: "COLLECT",
                log: "Các loài động vật khác nhau thích các loại thức ăn khác nhau. Hãy bắt đầu với Bò. Chúng thích Lúa Mì. Hãy thu thập 10 Lúa Mì.",
                targetId: "minecraft:wheat",
                amount: 10,
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Tìm ít nhất hai con Bò trưởng thành. Cầm Lúa Mì trên tay và cho mỗi con ăn một ít.",
                dialogue: [
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Khi bạn cầm đúng loại thức ăn, các con vật sẽ đi theo bạn. Bạn có thể dụ chúng về trang trại của mình bằng cách này." },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Sau khi cho hai con vật cùng loài ăn, chúng sẽ xuất hiện trái tim và sinh ra một con non. Bạn phải đợi một lúc trước khi có thể cho chúng ăn lại." }
                ]
            },
            {
                type: "DIALOGUE",
                log: "Hãy thử nghiệm với các loài khác! Lợn thích Cà Rốt, Cừu thích Lúa Mì, và Gà thích Hạt Giống.",
                dialogue: [ { speaker: "Sổ Tay Hướng Dẫn", text: "Nhân giống vật nuôi là cách tuyệt vời để có nguồn cung cấp len, da, lông và thịt ổn định." } ],
                isEndStep: true
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // ═══ DANH MỤC: KHÁM PHÁ & PHIÊU LƯU ═════════════════════════════════
    // ═══════════════════════════════════════════════════════════════════

    TUTORIAL_NETHER_PORTAL: {
        id: "TUTORIAL_NETHER_PORTAL",
        title: "Hướng Dẫn: Đường Tới Địa Ngục",
        description: "Học cách xây dựng và kích hoạt Cổng Nether để khám phá một chiều không gian mới.",
        steps: [
            {
                type: "COLLECT",
                log: "Đầu tiên, bạn cần loại đá cứng nhất. Hãy tìm dung nham và nước để tạo ra và khai thác 10 khối Hắc Diện Thạch (Obsidian). Bạn sẽ cần một chiếc Cúp Kim Cương.",
                targetId: "minecraft:obsidian",
                amount: 10,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Tiếp theo, bạn cần thứ gì đó để thắp lửa. Hãy tìm một viên Đá Lửa (Flint) từ Sỏi (Gravel) và một Thỏi Sắt (Iron Ingot) để chế tạo Bật Lửa.",
                targetId: "minecraft:flint_and_steel",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Tuyệt vời! Bây giờ hãy xây một khung hình chữ nhật đứng từ Hắc Diện Thạch (tối thiểu 4x5 khối, có thể bỏ các góc) và dùng Bật Lửa để thắp sáng bên trong khung.",
                dialogue: [
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Bạn đã có đủ mọi thứ cần thiết. Hãy tìm một không gian trống và xây một khung cổng bằng Hắc Diện Thạch." },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Khung cổng phải có chiều cao ít nhất 5 khối và chiều rộng 4 khối. Bạn có thể bỏ trống 4 khối ở các góc để tiết kiệm Obsidian." },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Sau khi xây xong khung, hãy cầm Bật Lửa và nhấp chuột phải vào mặt trong của một trong các khối Obsidian ở đáy cổng. Cánh cổng sẽ được kích hoạt!" },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Hãy chuẩn bị kỹ càng trước khi bước vào. Nether là một nơi cực kỳ nguy hiểm!" }
                ],
                isEndStep: true
            }
        ]
    },

    TUTORIAL_STRONGHOLD: {
        id: "TUTORIAL_STRONGHOLD",
        title: "Hướng Dẫn: Tìm Kiếm Pháo Đài Cổ",
        description: "Học cách chế tạo Mắt Ender và sử dụng chúng để định vị Stronghold, nơi chứa Cổng End.",
        steps: [
            {
                type: "COLLECT",
                log: "Để tìm Stronghold, bạn cần Mắt Ender. Nguyên liệu đầu tiên là Bột Quỷ Lửa (Blaze Powder). Hãy đến Nether, tìm Pháo Đài và hạ gục Quỷ Lửa (Blaze) để lấy Que Quỷ Lửa, sau đó chế tạo thành bột. Thu thập 6 Bột Quỷ Lửa.",
                targetId: "minecraft:blaze_powder",
                amount: 6,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Nguyên liệu thứ hai là Ngọc Ender (Ender Pearl). Hãy săn lùng những Enderman cao lớn màu đen vào ban đêm hoặc trong các hang động để thu thập 12 Ngọc Ender.",
                targetId: "minecraft:ender_pearl",
                amount: 12,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Giờ hãy kết hợp Bột Quỷ Lửa và Ngọc Ender để tạo ra 12 Mắt Ender (Eye of Ender).",
                targetId: "minecraft:end_eye",
                amount: 12,
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Xuất sắc! Bây giờ hãy cầm Mắt Ender trên tay và ném nó lên trời (chuột phải). Nó sẽ bay theo hướng của Stronghold. Đi theo nó và lặp lại cho đến khi nó bay thẳng xuống lòng đất. Chúc may mắn!",
                dialogue: [
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Bạn đã có Mắt Ender, công cụ định vị tối thượng. Hãy cầm nó trên tay và sử dụng (chuột phải)." },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Con mắt sẽ bay lên và đi một đoạn ngắn theo hướng của Stronghold gần nhất trước khi rơi xuống. Hãy đi theo hướng đó một khoảng xa rồi ném lại." },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Lưu ý: Có một tỷ lệ nhỏ Mắt Ender sẽ bị vỡ sau mỗi lần ném, đó là lý do bạn cần nhiều hơn một cái." },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Khi bạn ném mà con mắt bay thẳng xuống lòng đất, điều đó có nghĩa là Stronghold nằm ngay bên dưới chân bạn. Hãy bắt đầu đào xuống!" }
                ],
                isEndStep: true
            }
        ]
    },
    
    TUTORIAL_MAKING_MAP: {
        id: "TUTORIAL_MAKING_MAP",
        title: "Hướng Dẫn: Vẽ Bản Đồ",
        description: "Học cách tạo ra bản đồ để ghi lại và khám phá thế giới xung quanh.",
        steps: [
            {
                type: "COLLECT",
                log: "Để làm bản đồ, bạn cần Giấy (Paper). Giấy được làm từ Mía (Sugar Cane). Hãy tìm Mía mọc gần bờ sông, hồ và thu hoạch 9 cây.",
                targetId: "minecraft:sugar_cane",
                amount: 9,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Dùng 9 cây Mía để chế tạo 9 tờ Giấy.",
                targetId: "minecraft:paper",
                amount: 9,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Tiếp theo, bạn cần một chiếc La Bàn (Compass). Chế tạo nó từ 4 Thỏi Sắt và 1 Bụi Đá Đỏ (Redstone Dust).",
                targetId: "minecraft:compass",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Bây giờ, hãy bao quanh La Bàn bằng 8 tờ Giấy trên Bàn Chế Tạo để tạo ra một Bản Đồ Trống (Empty Map).",
                targetId: "minecraft:map",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Tuyệt vời! Cầm Bản Đồ Trống trên tay và sử dụng nó (chuột phải) để bắt đầu vẽ lại khu vực bạn đang đứng. Khi bạn di chuyển, bản đồ sẽ được lấp đầy.",
                dialogue: [ { speaker: "Sổ Tay Hướng Dẫn", text: "Bạn có thể tạo một bản đồ lớn hơn bằng cách kết hợp bản đồ đã vẽ với Giấy trong Bàn Chế Tạo. Bạn cũng có thể sao chép bản đồ bằng cách kết hợp nó với một Bản Đồ Trống." } ],
                isEndStep: true
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // ═══ DANH MỤC: NÂNG CAO ═════════════════════════════════════════════
    // ═══════════════════════════════════════════════════════════════════

    TUTORIAL_POTION_STRENGTH: {
        id: "TUTORIAL_POTION_STRENGTH",
        title: "Hướng Dẫn: Thuốc Sức Mạnh",
        description: "Học những bước cơ bản của thuật giả kim để pha chế một bình Thuốc Sức Mạnh.",
        steps: [
            {
                type: "COLLECT",
                log: "Nền tảng của mọi loại thuốc là Giàn Pha Chế (Brewing Stand). Bạn cần 1 Que Quỷ Lửa và 3 Đá Cuội (Cobblestone) để chế tạo nó.",
                targetId: "minecraft:brewing_stand",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Tiếp theo, bạn cần nhiên liệu cho giàn pha chế: Bột Quỷ Lửa. Hãy chế tạo 1 Bột Quỷ Lửa từ Que Quỷ Lửa.",
                targetId: "minecraft:blaze_powder",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT_MULTIPLE",
                log: "Bây giờ là nguyên liệu chính. Bạn cần 3 Chai Nước (Water Bottle) và 1 Bướu Nether (Nether Wart) để tạo ra Thuốc Vụng Về (Awkward Potion) - nền tảng của hầu hết các loại thuốc có hiệu ứng tốt.",
                targets: [ { id: "minecraft:potion", amount: 3 }, { id: "minecraft:nether_wart", amount: 1 } ],
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Hoàn hảo! Giờ hãy đặt 3 Chai Nước vào giàn, Bướu Nether vào ô nguyên liệu trên cùng, và Bột Quỷ Lửa vào ô nhiên liệu bên trái để pha chế. Sau khi có Thuốc Vụng Về, hãy giữ nguyên các chai thuốc và thay Bướu Nether bằng Bột Quỷ Lửa để tạo ra Thuốc Sức Mạnh!",
                dialogue: [
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Quy trình pha chế gồm 2 bước chính:" },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Bước 1: Tạo Thuốc Nền. Đặt 3 Chai Nước vào 3 ô dưới cùng của Giàn Pha Chế. Đặt Bướu Nether vào ô nguyên liệu phía trên. Đặt Bột Quỷ Lửa vào ô nhiên liệu bên trái. Chờ cho quá trình hoàn tất, bạn sẽ có 3 bình Thuốc Vụng Về." },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Bước 2: Tạo Hiệu Ứng. Giữ nguyên 3 bình Thuốc Vụng Về, lấy Bướu Nether ra và đặt nguyên liệu tạo hiệu ứng vào. Để tạo Thuốc Sức Mạnh, nguyên liệu chính là Bột Quỷ Lửa." },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Chúc mừng! Bạn đã trở thành một nhà giả kim. Hãy thử nghiệm với các nguyên liệu khác như Đường, Nước Mắt Ghast, hoặc Kem Magma để khám phá thêm nhiều loại thuốc mới!" }
                ],
                isEndStep: true
            }
        ]
    },

    TUTORIAL_ENCHANTING: {
        id: "TUTORIAL_ENCHANTING",
        title: "Hướng Dẫn: Phù Phép Cơ Bản",
        description: "Học cách xây dựng Bàn Phù Phép và sử dụng Ngọc Lưu Ly để cường hóa trang bị.",
        steps: [
            {
                type: "COLLECT_MULTIPLE",
                log: "Để chế tạo Bàn Phù Phép (Enchanting Table), bạn cần 2 Kim Cương, 4 Hắc Diện Thạch và 1 Cuốn Sách.",
                targets: [ { id: "minecraft:diamond", amount: 2 }, { id: "minecraft:obsidian", amount: 4 }, { id: "minecraft:book", amount: 1 } ],
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Chế tạo Bàn Phù Phép.",
                targetId: "minecraft:enchanting_table",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Để phù phép, bạn cần Ngọc Lưu Ly (Lapis Lazuli). Hãy khai thác ít nhất 3 viên từ dưới lòng đất.",
                targetId: "minecraft:lapis_lazuli",
                amount: 3,
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Đặt Bàn Phù Phép xuống. Mở giao diện, đặt vật phẩm muốn phù phép vào ô bên trái, và 1-3 viên Ngọc Lưu Ly vào ô bên phải. Bạn sẽ thấy 3 lựa chọn phù phép hiện ra.",
                dialogue: [
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Mỗi lựa chọn yêu cầu một lượng Kinh nghiệm (Level) và Ngọc Lưu Ly nhất định. Để có những phù phép mạnh hơn, hãy đặt các Kệ Sách (Bookshelf) xung quanh Bàn Phù Phép, cách nó đúng 1 khối." },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Bạn cần tối đa 15 Kệ Sách để đạt được sức mạnh phù phép tối đa (cấp 30)." }
                ],
                isEndStep: true
            }
        ]
    },

    TUTORIAL_ANVIL: {
        id: "TUTORIAL_ANVIL",
        title: "Hướng Dẫn: Sửa Chữa & Kết Hợp",
        description: "Học cách sử dụng Đe (Anvil) để sửa chữa, đổi tên và kết hợp các phù phép.",
        steps: [
            {
                type: "COLLECT_MULTIPLE",
                log: "Để làm một cái Đe, bạn cần rất nhiều sắt. Hãy thu thập 3 Khối Sắt (Block of Iron) và 4 Thỏi Sắt (Iron Ingot).",
                targets: [ { id: "minecraft:iron_block", amount: 3 }, { id: "minecraft:iron_ingot", amount: 4 } ],
                rewards: { xp: 1 }
            },
            {
                type: "COLLECT",
                log: "Bạn đã có đủ Sắt. Bây giờ, hãy chế tạo một cái Đe (Anvil).",
                targetId: "minecraft:anvil",
                amount: 1,
                rewards: { xp: 1 }
            },
            {
                type: "DIALOGUE",
                log: "Tuyệt vời! Đe có 3 công dụng chính: Sửa chữa, Kết hợp Phù phép, và Đổi tên.",
                dialogue: [
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Sửa Chữa: Đặt vật phẩm hỏng vào ô đầu tiên và vật liệu tương ứng (ví dụ: Kim Cương cho đồ kim cương) vào ô thứ hai. Việc này tốn kinh nghiệm." },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Kết Hợp Phù Phép: Đặt một vật phẩm vào ô đầu, và một vật phẩm khác (cùng loại) hoặc một Sách Phù Phép vào ô thứ hai để gộp các enchantment lại. Việc này tốn rất nhiều kinh nghiệm." },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Đổi Tên: Đặt vật phẩm vào ô đầu tiên và gõ tên mới vào ô phía trên. Việc này chỉ tốn một ít kinh nghiệm." },
                    { speaker: "Sổ Tay Hướng Dẫn", text: "Lưu ý: Đe sẽ bị hư hỏng và vỡ sau nhiều lần sử dụng." }
                ],
                isEndStep: true
            }
        ]
    }
};