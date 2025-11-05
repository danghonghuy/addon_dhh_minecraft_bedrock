import {
  world,
  system,
  ItemStack,
  GameMode,
  EntityComponentTypes,
} from "@minecraft/server";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "@minecraft/server-ui";
import {
  initializeFlashSaleSystem,
  showFlashSaleMenu,
} from "./flash_sale_system.js";
import { showPingMainMenu } from "./ping_system.js";
import { showEncyclopediaMainMenu } from "./encyclopedia_system.js";
import { showHousingMainMenu } from "./convenience_housing.js";
import { showUpgradeSelectionMenu } from "./upgrade_system.js";
import { initializeBossSystem } from "./boss_system.js";
import { showSpiritSightActionMenu } from "./skills/spirit_sight.js";
import { endLifeLink } from "./skills/life_link.js";
import { getAllLinksData, destroyLink } from "./skills/spatial_link.js";
import {
  startWerewolfLobby,
  handleItemUse as handleWerewolfItemUse,
  handlePlayerLeave as handleWerewolfPlayerLeave,
  handleEntityHurt as handleWerewolfEntityHurt,
  handlePlayerInteractWithBlock as handleWerewolfBlockInteract,
  handleChatSend as handleWerewolfChatSend,
  activeWerewolfGames,
} from "./werewolf_game.js";
import { initializeSharedInventorySystem } from "./shared_inventory.js";
import { initializeCursedBladeLogic } from "./weapons/cursed_blade.js";
import { showTutorialMainMenu, checkTutorialProgress } from "./tutorial_quest_system.js";
import {
  initializeLandClaimSystem,
  showLandClaimMainMenu,
} from "./land_claim_system.js";
import { initializeDamageHandler } from "./damage_indicator.js";
import { initializeActionBarManager } from "./actionbar_manager.js";
import { CONFIG,CALENDAR_CONFIG } from "./config.js";
import {
  initializeDailyRewardSystem,
  grantDailyReward
} from "./daily_reward_system.js";
import { showStoryQuestLog, advanceStoryQuest, updateStoryQuestProgress,checkStepCompletion } from "./story_quest_system.js";

import {
  showGuildMainMenu,
  getPlayerGuildName,
  getAllGuildsData,
  getGuildPerkValue,
  grantXpToGuild,
  updateGuildQuestProgress,
  updateGuildTradeQuestProgress,
} from "./guild_system.js";
import { processAllSeeingEye } from "./almanac/eye_engine.js";
import {
  showTradeInviteMenu,
  activeTrades,
  handleTradeConfirmation,
} from "./trade_system.js";
import { showGachaMainMenu, checkAndRotateBanner } from "./gacha_system.js";
import { showMusicMenu } from "./music_system.js";
import {
  checkBlockBreakTriggers,
  checkPlayerPlaceBlockTriggers,
  checkItemUseTriggers,
  checkEntityDieTriggers,
  checkPlayerInteractTriggers,
  checkEntityHurtTriggers,
  checkEntitySpawnTriggers,
  runLightweightPeriodicChecks,
  triggerSarcasticTip,
} from "./sarcastic_oracle/oracle_engine.js";
import {
  showChallengeMainMenu,
  activeChallenges,
  endChallenge,
  endWaveAndProceed,
  handleChallengeMobDeath,
} from "./survival_challenge.js";
import {
  showQuestMenu,
  updateQuestOnKill,
  checkQuestExpiration,
  checkCollectQuestProgress,
  checkExploreQuestProgress,
  updateQuestOnBreed,
  updateQuestOnTrade,
} from "./quest_system.js";
import { SKILL_ACTIONS, LEARNABLE_SKILLS } from "./skills/skill_handler.js";
import { showAreaLightingMenu } from "./area_lighting_system.js";
import {
  showDungeonChallengeIntro,
  finishDungeon,
  activeDungeons,
} from "./dungeon_system.js";
import { ALL_CLASSES, CLASS_TRANSLATIONS } from "./classes/index.js";
import { ALL_SKILLS, COMMON_SKILLS } from "./skills/skill_definitions.js";
import "./AI_players/newb_namer.js";
import { handleAllSurvivalSystems, handlePlayerItemUse, handlePlayerItemConsume, handlePlayerInjury, checkAndApplySprain,EXERTION_CONFIG } from "./survival_system.js";

const teleportCooldowns = new Map();

/**
 * Quản lý việc bắt đầu và kết thúc sự kiện Trăng Máu theo chu kỳ ngày đêm.
 */
function handleBloodMoonCycle() {
    if (!CONFIG.BLOOD_MOON_CONFIG.ENABLED) return;

    const time = world.getTimeOfDay();
    const isNight = time >= 13000 && time < 23000;
    const cycleChecked = world.getDynamicProperty("dhh:night_cycle_checked") ?? false;
    const bloodMoonActive = world.getDynamicProperty("dhh:is_blood_moon_active") ?? false;

    if (isNight && !cycleChecked) {
        world.setDynamicProperty("dhh:night_cycle_checked", true);

        if (Math.random() < CONFIG.BLOOD_MOON_CONFIG.CHANCE) {
            // KÍCH HOẠT TRĂNG MÁU
            world.setDynamicProperty("dhh:is_blood_moon_active", true);

            for (const player of world.getAllPlayers()) {
                player.onScreenDisplay.setTitle("§4§lTRĂNG MÁU", {
                    subtitle: "§cMặt đất nhuốm máu... Hãy cẩn thận!",
                    fadeInDuration: 20, stayDuration: 120, fadeOutDuration: 40
                });
                player.playSound("mob.wither.spawn");
                
                try {
                  
                    player.sendMessage("§c[Trăng Máu] Bầu trời trở nên đặc quánh và đỏ rực!");
                } catch (e) {
                    console.warn(`[Blood Moon] Lỗi khi áp dụng sương mù cho ${player.name}: ${e}`);
                }
            }
        } else {
            world.setDynamicProperty("dhh:is_blood_moon_active", false);
        }
    } else if (!isNight && cycleChecked) {
        world.setDynamicProperty("dhh:night_cycle_checked", false);

        if (bloodMoonActive) {
            world.setDynamicProperty("dhh:is_blood_moon_active", false);
            world.sendMessage("§a[Hệ Thống] §fÁnh bình minh đã thanh tẩy lời nguyền Trăng Máu.");
            
        

            for (const entity of world.getDimension("overworld").getEntities({ tags: ["blood_moon_mob"] })) {
                if (entity.isValid) {
                     entity.kill();
                }
            }
        }
    }
}


function formatWorldDateAndTime() {
    const totalTicks = world.getAbsoluteTime();
    const timeOfDay = world.getTimeOfDay();
    
    // --- Tính toán Lịch ---
    const totalDays = Math.floor(totalTicks / 24000);
    let year = 1 + Math.floor(totalDays / 365);
    let dayOfYear = totalDays % 365;
    
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let month = 1;
    while (dayOfYear >= daysInMonth[month - 1]) {
        dayOfYear -= daysInMonth[month - 1];
        month++;
    }
    let day = dayOfYear + 1;

    // --- Tính toán Giờ ---
    const hourOffset = 6;
    let hours = Math.floor(timeOfDay / 1000) + hourOffset;
    const minutes = Math.floor(((timeOfDay % 1000) / 1000) * 60);
    hours %= 24;
    
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    const period = (timeOfDay >= 12500 && timeOfDay <= 23000) ? "🌙 Ban đêm" : "☀️ Ban ngày";

    // --- Kiểm tra Ngày Lễ ---
    const dateKey = `${day}/${month}`;
    const specialDay = CALENDAR_CONFIG.SPECIAL_DAYS[dateKey] || null;

    return {
        day,
        month,
        year,
        timeString,
        period,
        specialDay,
    };
}
const TEMP_ADMIN_PASSWORD = "meomeo";
async function showPasswordPrompt(player, onCorrectPassword) {
  const form = new ModalFormData();
  form.title("§c§lYÊU CẦU QUYỀN TRUY CẬP");
  form.textField(
    "§fTính năng này tạm thời bị khóa. Vui lòng nhập mật khẩu của Admin để tiếp tục.",
    "Nhập mật khẩu..."
  );

  const { canceled, formValues } = await form.show(player);

  if (canceled) {
    return;
  }

  const enteredPassword = formValues[0];

  if (enteredPassword === TEMP_ADMIN_PASSWORD) {
    onCorrectPassword(player);
  } else {
    player.sendMessage("§cSai mật khẩu! Không thể truy cập tính năng này.");
    player.playSound("note.bass");
  }
}
export const SKILL_TRANSLATIONS = {
  regeneration: "Tự Hồi Phục",
  ironSkin: "Da Sắt",
  radar: "Rada Thăm Dò",
  stealth: "Tàng Hình",
  heal: "Chữa Lành",
  dash: "Lướt Đi",
  targeted_lightning: "Lôi Vực",
  summon_wolf: "Triệu Hồi Linh Thú",
  shadow_swap: "Thiên Mệnh Thời Không",
  sprint: "Bứt Tốc",
  shadowbind: "Dây Trói Bóng Tối",
  golem_punch: "Cú Đấm Golem",
  winters_dominion: "Lãnh Địa Mùa Đông",
  ally_swap: "Thiên Can Hộ Mệnh",
  time_lock: "Giam Cầm Thời Gian",
  earthen_grave: "Mộ Phần Trói Buộc",
  hellfire_pit: "Vực Lửa Địa Ngục",
  reality_warp: "Vùng Hỗn Loạn",
  spirit_sight: "Thị Kiến Tâm Linh",
  chaos_trap: "Bẫy Hỗn Mang",
  immortal_edict: "Thánh Lệnh Bất Diệt",
  explosion: "Bộc Liệt Ma Pháp",
  blade_storm: "Bão Kiếm",
  primal_beast: "Hóa Thân Thần Thú",
  celestial_step: "Bước Chân Thiên Giới",
  void_step: "Vô Hạ Hạn",
  life_link: "Huyết Mạch Tương Liên",
  spatial_link: "Liên Kết Chiều Không",
};
const BONUS_PER_LEVEL = 2.5;
function getUpgradeLevel(item) {
  if (!item) return 0;
  const lore = item.getLore();
  for (const line of lore) {
    const match = line.match(/§7Cấp độ cường hóa: §e\+([0-9]+)/);
    if (match) return parseInt(match[1]);
  }
  return 0;
}
const lastPlayerToFeed = new Map();
const DEBUG_MODE = true;
const INFINITE_DURATION = 20000000;
const dhh_DATA_KEY = "dhh:player_data";
const Vector = {
  magnitude(vector) {
    return Math.sqrt(
      vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
    );
  },
  subtract(vector1, vector2) {
    return {
      x: vector1.x - vector2.x,
      y: vector1.y - vector2.y,
      z: vector1.z - vector2.z,
    };
  },
  // THÊM HÀM NÀY VÀO
  normalize(vector) {
    const mag = this.magnitude(vector);
    if (mag === 0) return { x: 0, y: 0, z: 0 };
    return { x: vector.x / mag, y: vector.y / mag, z: vector.z / mag };
  },
  // Thêm cả hàm multiply để tương thích với code của Du Hiệp
  multiply(vector, scalar) {
    return { x: vector.x * scalar, y: vector.y * scalar, z: vector.z * scalar };
  },
};
export function logError(context, player, error) {
  const playerName = player ? `Player: ${player.name}` : "No Player Context";
  console.error(
    `§c[dhh Error in ${context}] ${playerName} | Message: ${error} \nStack: ${error.stack}`
  );
}

function logDebug(message) {
  if (DEBUG_MODE) console.log(`§e[dhh Debug] ${message}`);
}

function loadAndCachePlayerData(player) {
  const worldDataString = world.getDynamicProperty(dhh_DATA_KEY);
  const allPlayersData = worldDataString ? JSON.parse(worldDataString) : {};
  let playerData = allPlayersData[player.nameTag];

  if (!playerData) {
    logDebug(`No persistent data for ${player.nameTag}. Creating new profile.`);
    playerData = {
      level: 1,
      xp: 0,
      skillPoints: 0,
      vitality: 0,
      strength: 0,
      agility: 0,
      intelligence: 0,
      class: "none",
      skills: {},
      survival: {},
      baseHealth: 0,
      baseMana: 0,
      baseDamage: 0,
      baseSpeed: 0,
      nguyen_thach: 0,
      pity_5star: 0,
      pity_4star: 0,
      is_guaranteed: false,
    };
  } else {
    logDebug(`Loaded persistent data for ${player.nameTag}.`);
  }

  player.setDynamicProperty("dhh:level", playerData.level ?? 1);
  const justDied = player.getDynamicProperty("dhh:just_died") ?? false;
  if (justDied) {
    player.setDynamicProperty("dhh:xp", 0);
    player.setDynamicProperty("dhh:just_died", false);
  } else {
    player.setDynamicProperty("dhh:xp", playerData.xp ?? 0);
  }
  player.setDynamicProperty("dhh:skill_points", playerData.skillPoints ?? 0);
  player.setDynamicProperty("dhh:vitality", playerData.vitality ?? 0);
  player.setDynamicProperty("dhh:strength", playerData.strength ?? 0);
  player.setDynamicProperty("dhh:agility", playerData.agility ?? 0);
  player.setDynamicProperty("dhh:intelligence", playerData.intelligence ?? 0);
  player.setDynamicProperty("dhh:class", playerData.class ?? "none");

  const skills = playerData.skills || {};
  player.setDynamicProperty("dhh:skill_regen", skills.regeneration ?? 0);
  player.setDynamicProperty("dhh:skill_iron", skills.ironSkin ?? 0);
  player.setDynamicProperty("dhh:skill_sprint", skills.sprint ?? 0);
  player.setDynamicProperty("dhh:skill_stealth", skills.stealth ?? 0);
  player.setDynamicProperty("dhh:skill_heal", skills.heal ?? 0);
  player.setDynamicProperty("dhh:skill_dash", skills.dash ?? 0);
  player.setDynamicProperty("dhh:skill_targeted_lightning", skills.targeted_lightning ?? 0);
  player.setDynamicProperty("dhh:skill_summon_wolf", skills.summon_wolf ?? 0);
  player.setDynamicProperty("dhh:skill_shadow_swap", skills.shadow_swap ?? 0);
  player.setDynamicProperty("dhh:skill_radar", skills.radar ?? 0);
  player.setDynamicProperty("dhh:skill_shadowbind", skills.shadowbind ?? 0);
  player.setDynamicProperty("dhh:skill_golem_punch", skills.golem_punch ?? 0);
  player.setDynamicProperty("dhh:skill_winters_dominion", skills.winters_dominion ?? 0);
  player.setDynamicProperty("dhh:skill_ally_swap", skills.ally_swap ?? 0);
  player.setDynamicProperty("dhh:skill_time_lock", skills.time_lock ?? 0);
  player.setDynamicProperty("dhh:skill_earthen_grave", skills.earthen_grave ?? 0);
  player.setDynamicProperty("dhh:skill_hellfire_pit", skills.hellfire_pit ?? 0);
  player.setDynamicProperty("dhh:skill_reality_warp", skills.reality_warp ?? 0);
  player.setDynamicProperty("dhh:skill_spirit_sight", skills.spirit_sight ?? 0);
  player.setDynamicProperty("dhh:skill_chaos_trap", skills.chaos_trap ?? 0);
  player.setDynamicProperty("dhh:skill_immortal_edict", skills.immortal_edict ?? 0);
  player.setDynamicProperty("dhh:skill_explosion", skills.explosion ?? 0);
  player.setDynamicProperty("dhh:skill_blade_storm", skills.blade_storm ?? 0);
  player.setDynamicProperty("dhh:skill_primal_beast", skills.primal_beast ?? 0);
  player.setDynamicProperty("dhh:skill_celestial_step", skills.celestial_step ?? 0);
  player.setDynamicProperty("dhh:skill_void_step", skills.void_step ?? 0);
  player.setDynamicProperty("dhh:skill_life_link", skills.life_link ?? 0);
  player.setDynamicProperty("dhh:skill_spatial_link", skills.spatial_link ?? 0);

  player.setDynamicProperty("dhh:base_health", playerData.baseHealth ?? 0);
  player.setDynamicProperty("dhh:base_mana", playerData.baseMana ?? 0);
  player.setDynamicProperty("dhh:base_damage", playerData.baseDamage ?? 0);
  player.setDynamicProperty("dhh:base_speed", playerData.baseSpeed ?? 0);

  player.setDynamicProperty("dhh:nguyen_thach", playerData.nguyen_thach ?? 0);
  player.setDynamicProperty("dhh:pity_5star", playerData.pity_5star ?? 0);
  player.setDynamicProperty("dhh:pity_4star", playerData.pity_4star ?? 0);
  player.setDynamicProperty("dhh:is_guaranteed", playerData.is_guaranteed ?? false);
  player.setDynamicProperty("dhh:quest_tier_unlocked", playerData.questTierUnlocked ?? 1);
  player.setDynamicProperty("dhh:easy_quests_completed", playerData.easyQuestsCompleted ?? 0);
  player.setDynamicProperty("dhh:normal_quests_completed", playerData.normalQuestsCompleted ?? 0);
    player.setDynamicProperty("dhh:story_quest_id", playerData.story_quest_id); // Không cần ?? vì nếu chưa có thì nó là undefined
  player.setDynamicProperty("dhh:story_quest_step", playerData.story_quest_step ?? 0);
 player.setDynamicProperty("dhh:story_progress_count", playerData.story_progress_count ?? 0); 

const survivalData = playerData.survival || {};

// ✅ SỬA LỖI: Kiểm tra chính xác giá trị undefined/null
player.setDynamicProperty("dhh:temperature", 
    (survivalData.temperature !== undefined && survivalData.temperature !== null) 
    ? survivalData.temperature 
    : CONFIG.SURVIVAL_CONFIG.TEMP_DEFAULT_TARGET
);

player.setDynamicProperty("dhh:thirst", 
    (survivalData.thirst !== undefined && survivalData.thirst !== null) 
    ? survivalData.thirst 
    : 100
);

player.setDynamicProperty("dhh:exertion_score", 
    (survivalData.exertion_score !== undefined && survivalData.exertion_score !== null) 
    ? survivalData.exertion_score 
    : 0
);

// ✅ THÊM: Load timestamps
player.setDynamicProperty("dhh:thirst_last_update", survivalData.timers?.thirst_last_update ?? Date.now());
player.setDynamicProperty("dhh:temp_last_update", survivalData.timers?.temp_last_update ?? Date.now());
player.setDynamicProperty("dhh:injury_last_update", survivalData.timers?.injury_last_update ?? Date.now());

  const allSurvivalTags = ['broken_leg', 'bleeding', 'burned', 'dazed', 'fever', 'cold', 
    'virus_stage1', 'virus_stage2', 'virus_stage3', 'virus_curing', 'virus_immune',
    'parasite', 'sprained_arm', 'sickness_immune'];
  allSurvivalTags.forEach(tag => player.removeTag(tag));
  
  if (survivalData.tags && Array.isArray(survivalData.tags)) {
      survivalData.tags.forEach(tag => player.addTag(tag));
  }
  
  if (survivalData.timers) {
      for (const timerKey in survivalData.timers) {
          const propertyKey = `dhh:${timerKey}`;
          const savedValue = survivalData.timers[timerKey];
          if (savedValue !== undefined && savedValue !== null) {
              player.setDynamicProperty(propertyKey, savedValue);
          } else {
              try { player.setDynamicProperty(propertyKey, undefined); } catch(e) {}
          }
      }
  }
}

function saveAllPlayerData(player) {
  try {
    const worldDataString = world.getDynamicProperty(dhh_DATA_KEY);
    const allPlayersData = worldDataString ? JSON.parse(worldDataString) : {};
    const currentStats = getPlayerStats(player);
     // === BẮT ĐẦU PHẦN THÊM MỚI (SINH TỒN) ===
    const survivalDataToSave = {
        temperature: player.getDynamicProperty("dhh:temperature") ?? CONFIG.SURVIVAL_CONFIG.TEMP_DEFAULT_TARGET,
        thirst: player.getDynamicProperty("dhh:thirst") ?? 100,
        exertion_score: player.getDynamicProperty("dhh:exertion_score") ?? 0,
        tags: player.getTags().filter(tag => [
            'broken_leg', 'bleeding', 'burned', 'dazed', 'fever', 'cold', 
            'virus_stage1', 'virus_stage2', 'virus_stage3', 'virus_curing', 'virus_immune',
            'parasite', 'sprained_arm', 'sickness_immune'
        ].includes(tag)),
        timers: {
            rest_timer: player.getDynamicProperty("dhh:rest_timer") ?? 0,
            broken_leg_self_heal_timer: player.getDynamicProperty("dhh:broken_leg_self_heal_timer"),
            bleeding_ticks_left: player.getDynamicProperty("dhh:bleeding_ticks_left"),
            on_fire_ticks: player.getDynamicProperty("dhh:on_fire_ticks"),
            burned_ticks_left: player.getDynamicProperty("dhh:burned_ticks_left"),
            water_cure_ticks: player.getDynamicProperty("dhh:water_cure_ticks"),
            dazed_ticks_left: player.getDynamicProperty("dhh:dazed_ticks_left"),
            temp_unstable_ticks: player.getDynamicProperty("dhh:temp_unstable_ticks"),
            sickness_stabilize_timer: player.getDynamicProperty("dhh:sickness_stabilize_timer"),
            sickness_self_heal_timer: player.getDynamicProperty("dhh:sickness_self_heal_timer"),
            sprained_arm_rest_timer: player.getDynamicProperty("dhh:sprained_arm_rest_timer"),
            sprained_arm_self_heal_timer: player.getDynamicProperty("dhh:sprained_arm_self_heal_timer"),
            parasite_ticks_left: player.getDynamicProperty("dhh:parasite_ticks_left"),
            virus_ticks: player.getDynamicProperty("dhh:virus_ticks"),
            virus_cure_ticks: player.getDynamicProperty("dhh:virus_cure_ticks"),

            //
            // ✅ THÊM CÁC TIMESTAMP QUAN TRỌNG
        thirst_last_update: player.getDynamicProperty("dhh:thirst_last_update") ?? Date.now(),
        temp_last_update: player.getDynamicProperty("dhh:temp_last_update") ?? Date.now(),
        injury_last_update: player.getDynamicProperty("dhh:injury_last_update") ?? Date.now()
        }
    };
    // === KẾT THÚC PHẦN THÊM MỚI (SINH TỒN) ===
    const playerDataToSave = {
      level: currentStats.level,
      xp: currentStats.xp,
      skillPoints: currentStats.skillPoints,
      vitality: currentStats.vitality,
      strength: currentStats.strength,
      agility: currentStats.agility,
      intelligence: currentStats.intelligence,
      class: currentStats.class,
      skills: {
        regeneration: currentStats.skills.regeneration,
        ironSkin: currentStats.skills.ironSkin,
        sprint: currentStats.skills.sprint,
        stealth: currentStats.skills.stealth,
        heal: currentStats.skills.heal,
        dash: currentStats.skills.dash,
        targeted_lightning: currentStats.skills.targeted_lightning,
        summon_wolf: currentStats.skills.summon_wolf,
        shadow_swap: currentStats.skills.shadow_swap,
        radar: currentStats.skills.radar,
        shadowbind: currentStats.skills.shadowbind,
        golem_punch: currentStats.skills.golem_punch,
        winters_dominion: currentStats.skills.winters_dominion,
        ally_swap: currentStats.skills.ally_swap,
        time_lock: currentStats.skills.time_lock,
        earthen_grave: currentStats.skills.earthen_grave,
        hellfire_pit: currentStats.skills.hellfire_pit,
        reality_warp: currentStats.skills.reality_warp,
        spirit_sight: currentStats.skills.spirit_sight,
        chaos_trap: currentStats.skills.chaos_trap,
        immortal_edict: currentStats.skills.immortal_edict,
        explosion: currentStats.skills.explosion,
        blade_storm: currentStats.skills.blade_storm,
        primal_beast: currentStats.skills.primal_beast,
        celestial_step: currentStats.skills.celestial_step,
        void_step: currentStats.skills.void_step,
        life_link: currentStats.skills.life_link,
        spatial_link: currentStats.skills.spatial_link, 
      },
      baseHealth: player.getDynamicProperty("dhh:base_health") ?? 0,
      baseMana: player.getDynamicProperty("dhh:base_mana") ?? 0,
      baseDamage: player.getDynamicProperty("dhh:base_damage") ?? 0,
      baseSpeed: player.getDynamicProperty("dhh:base_speed") ?? 0,
      nguyen_thach: player.getDynamicProperty("dhh:nguyen_thach") ?? 0,
      pity_5star: player.getDynamicProperty("dhh:pity_5star") ?? 0,
      pity_4star: player.getDynamicProperty("dhh:pity_4star") ?? 0,
      is_guaranteed: player.getDynamicProperty("dhh:is_guaranteed") ?? false,
      questTierUnlocked:
        player.getDynamicProperty("dhh:quest_tier_unlocked") ?? 1,
      easyQuestsCompleted:
        player.getDynamicProperty("dhh:easy_quests_completed") ?? 0,
      normalQuestsCompleted:
        player.getDynamicProperty("dhh:normal_quests_completed") ?? 0,
         story_quest_id: player.getDynamicProperty("dhh:story_quest_id"),
      story_quest_step: player.getDynamicProperty("dhh:story_quest_step") ?? 0,
     story_progress_count: player.getDynamicProperty("dhh:story_progress_count") ?? 0, 
         survival: survivalDataToSave 
    };
    allPlayersData[player.nameTag] = playerDataToSave;
    world.setDynamicProperty(dhh_DATA_KEY, JSON.stringify(allPlayersData));
    logDebug(`Saved persistent data for ${player.nameTag}`);
  } catch (e) {
    logError("saveAllPlayerData", player, e);
  }
}

export function getPlayerStats(player) {
  const stats = {
    level: player.getDynamicProperty("dhh:level") ?? 1,
    xp: player.getDynamicProperty("dhh:xp") ?? 0,
    skillPoints: player.getDynamicProperty("dhh:skill_points") ?? 0,
    vitality: player.getDynamicProperty("dhh:vitality") ?? 0,
    strength: player.getDynamicProperty("dhh:strength") ?? 0,
    agility: player.getDynamicProperty("dhh:agility") ?? 0,
    intelligence: player.getDynamicProperty("dhh:intelligence") ?? 0,
    class: player.getDynamicProperty("dhh:class") ?? "none",
    currentMana: player.getDynamicProperty("dhh:mana") ?? 0,
    skills: {
      regeneration: player.getDynamicProperty("dhh:skill_regen") ?? 0,
      ironSkin: player.getDynamicProperty("dhh:skill_iron") ?? 0,
      sprint: player.getDynamicProperty("dhh:skill_sprint") ?? 0,
      stealth: player.getDynamicProperty("dhh:skill_stealth") ?? 0,
      heal: player.getDynamicProperty("dhh:skill_heal") ?? 0,
      dash: player.getDynamicProperty("dhh:skill_dash") ?? 0,
      targeted_lightning:
        player.getDynamicProperty("dhh:skill_targeted_lightning") ?? 0,
      summon_wolf: player.getDynamicProperty("dhh:skill_summon_wolf") ?? 0,
      shadow_swap: player.getDynamicProperty("dhh:skill_shadow_swap") ?? 0,
      radar: player.getDynamicProperty("dhh:skill_radar") ?? 0,
      shadowbind: player.getDynamicProperty("dhh:skill_shadowbind") ?? 0,
      golem_punch: player.getDynamicProperty("dhh:skill_golem_punch") ?? 0,
      winters_dominion:
        player.getDynamicProperty("dhh:skill_winters_dominion") ?? 0,
      ally_swap: player.getDynamicProperty("dhh:skill_ally_swap") ?? 0,
      time_lock: player.getDynamicProperty("dhh:skill_time_lock") ?? 0,
      earthen_grave: player.getDynamicProperty("dhh:skill_earthen_grave") ?? 0,
      hellfire_pit: player.getDynamicProperty("dhh:skill_hellfire_pit") ?? 0,
      reality_warp: player.getDynamicProperty("dhh:skill_reality_warp") ?? 0,
      spirit_sight: player.getDynamicProperty("dhh:skill_spirit_sight") ?? 0,
      chaos_trap: player.getDynamicProperty("dhh:skill_chaos_trap") ?? 0,
      immortal_edict:
        player.getDynamicProperty("dhh:skill_immortal_edict") ?? 0,
      explosion: player.getDynamicProperty("dhh:skill_explosion") ?? 0,
      blade_storm: player.getDynamicProperty("dhh:skill_blade_storm") ?? 0,
      primal_beast: player.getDynamicProperty("dhh:skill_primal_beast") ?? 0,
      celestial_step:
        player.getDynamicProperty("dhh:skill_celestial_step") ?? 0,
      void_step: player.getDynamicProperty("dhh:skill_void_step") ?? 0,
       spatial_link: player.getDynamicProperty("dhh:skill_spatial_link") ?? 0,
      life_link: player.getDynamicProperty("dhh:skill_life_link") ?? 0,
    },
    baseHealth: player.getDynamicProperty("dhh:base_health") ?? 0,
    baseMana: player.getDynamicProperty("dhh:base_mana") ?? 0,
    baseDamage: player.getDynamicProperty("dhh:base_damage") ?? 0,
    baseSpeed: player.getDynamicProperty("dhh:base_speed") ?? 0,
  };
  stats.maxMana =
    30 +
    stats.intelligence * CONFIG.STAT_SCALING.INTELLIGENCE.mana_per_point +
    stats.baseMana;
  return stats;
}

async function showClassSelectionMenu(player) {
  const form = new ActionFormData();
  form.title("§l§1CHỌN NGHỀ NGHIỆP");

  const bodyDescription = [
    "§l§cĐây là lựa chọn quan trọng nhất và sẽ không thể thay đổi!§r",
    "\n§fHãy đọc kỹ vai trò và nội tại của mỗi nghề để đưa ra quyết định phù hợp.",
    "\n" + "─".repeat(20),

    // --- MÔ TẢ HỘ VỆ (CẬP NHẬT) ---
    "\n§c§lHỘ VỆ",
    "§8» Vai trò: Tuyến đầu, chống chịu sát thương và bảo vệ đồng đội.",
    "§8» Nội tại: §aKiên Cường§7 - Có tỷ lệ hồi phục khi nhận sát thương. Tiêu diệt địch sẽ " +
      "vĩnh viễn tôi luyện §cMáu tối đa§7, càng chiến đấu càng trở nên bất tử.",

    // --- MÔ TẢ PHÁP SƯ (CẬP NHẬT) ---
    "\n§d§lPHÁP SƯ",
    "§8» Vai trò: Bậc thầy ma pháp, gây sát thương diện rộng từ xa.",
    "§8» Nội tại: §bHấp Thụ Linh Hồn§7 - Hấp thụ linh hồn kẻ địch để hồi phục và " +
      "vĩnh viễn mở rộng giới hạn §bMana tối đa§7 của bản thân.",

    // --- MÔ TẢ DU HIỆP (CẬP NHẬT) ---
    "\n§a§lDU HIỆP",
    "§8» Vai trò: Xạ thủ cơ động, giữ khoảng cách và hạ gục mục tiêu.",
    "§8» Nội tại: §eBản Năng Thợ Săn§7 - Các đòn bắn chính xác liên tiếp sẽ kích hoạt tốc độ bùng nổ. " +
      "Kinh nghiệm săn bắn sẽ rèn giũa §eTốc Độ di chuyển§7 vĩnh viễn.",
  ];

  form.body(bodyDescription.join("\n"));

  form.button("§c§lChọn Hộ Vệ", "textures/items/diamond_chestplate");
  form.button("§d§lChọn Pháp Sư", "textures/items/book_enchanted");
  form.button("§a§lChọn Du Hiệp", "textures/items/bow_pulling_2");

  const { canceled, selection } = await form.show(player);

  if (canceled) {
    system.run(() => showClassSelectionMenu(player));
    return;
  }

  let chosenClass = "none";
  let className = "";
  if (selection === 0) {
    chosenClass = "guardian";
    className = "Hộ Vệ";
  } else if (selection === 1) {
    chosenClass = "mage";
    className = "Pháp Sư";
  } else if (selection === 2) {
    chosenClass = "ranger";
    className = "Du Hiệp";
  }

  player.setDynamicProperty("dhh:class", chosenClass);

  player.setDynamicProperty("dhh:skill_points", 0);

  player.onScreenDisplay.setTitle("§l§eLỰA CHỌN HOÀN TẤT!", {
    subtitle: `§fChào mừng đến với con đường của §b${className}!`,
    fadeInDuration: 10,
    stayDuration: 100,
    fadeOutDuration: 20,
  });
  player.playSound("random.levelup");
  player.sendMessage(`§aBạn đã chính thức trở thành một §l§b${className}§r§a!`);

  system.run(() => {
    applyAllBonuses(player);
    saveAllPlayerData(player);
    showStatsMenu(player);
  });
}

function createAllSeeingEyeItem() {
  const eyeItem = new ItemStack("dhh:all_seeing_eye", 1);
  eyeItem.nameTag = "§d§lCon Mắt Minh Triết";
  eyeItem.setLore([
    "§7Hãy nhìn vào thế giới và dùng ta...",
    "§8Tạo tác Cổ đại",
    "§§all_seeing_eye",
  ]);
  eyeItem.lockMode = "inventory";
  eyeItem.keepOnDeath = true;
  return eyeItem;
}
function getMissingdhhItems(player) {
  const missing = { book: true, scepter: true, eye: true };
  const inventory = player.getComponent("inventory")?.container;
  if (!inventory) return missing;

  for (let i = 0; i < inventory.size; i++) {
    const item = inventory.getItem(i);
    if (!item) continue;

    if (item.typeId === "dhh:menu_book") {
      missing.book = false;
    }
    if (
      item.typeId === "dhh:magic_staff" &&
      item.nameTag?.startsWith("§b§lQuyền Trượng")
    ) {
      missing.scepter = false;
    }
    if (item.typeId === "dhh:all_seeing_eye") {
      missing.eye = false;
    }
  }
  return missing;
}

function giveMissingdhhItems(player) {
  const missing = getMissingdhhItems(player);
  const inventory = player.getComponent("inventory")?.container;
  if (!inventory)
    return logError(
      "giveMissingdhhItems",
      player,
      new Error("Could not access inventory")
    );

  let gaveItem = false;
  if (missing.book) {
    const book = new ItemStack("dhh:menu_book", 1);
    book.lockMode = "inventory";
    book.keepOnDeath = true;
    inventory.addItem(book);
    gaveItem = true;
  }
  if (missing.scepter) {
    const scepter = new ItemStack("dhh:magic_staff", 1);
    scepter.nameTag = "§b§lQuyền Trượng";
    scepter.setLore([
      "§7Vật phẩm ma thuật để sử dụng Kỹ năng.",
      "§f- §aChuột Phải§f để §eChọn Kỹ năng§f.",
      "§f- §aCầm trên tay và Ngồi xuống§f để §cKích hoạt§f.",
      "§8Vật phẩm hệ thống, không thể vứt bỏ.",
    ]);
    scepter.lockMode = "inventory";
    scepter.keepOnDeath = true;
    inventory.addItem(scepter);
    gaveItem = true;
  }
  if (missing.eye) {
    const eyeItem = createAllSeeingEyeItem();
    inventory.addItem(eyeItem);
    gaveItem = true;
  }
  if (gaveItem) {
    player.sendMessage("§a[dhh] Các vật phẩm hệ thống đã được cấp lại!");
    player.playSound("random.orb");
  } else {
    player.sendMessage("§e[dhh] Bạn đã có đủ vật phẩm rồi!");
  }
  system.run(() => showStatsMenu(player));
}

function createProgressBar(
  current,
  max,
  length = 10,
  fullChar = "█",
  emptyChar = "░",
  fullColor = "§a",
  emptyColor = "§7"
) {
  if (max === 0) return `${fullColor}[${fullChar.repeat(length)}]`;
  const percentage = Math.max(0, Math.min(1, current / max));
  const fullCount = Math.round(percentage * length);
  const emptyCount = length - fullCount;
  return `${fullColor}${fullChar.repeat(
    fullCount
  )}${emptyColor}${emptyChar.repeat(emptyCount)}`;
}

export function xpForLevel(level) {
  if (level <= 1) return CONFIG.BASE_XP_TO_LEVEL;
  return Math.floor(
    CONFIG.BASE_XP_TO_LEVEL * Math.pow(CONFIG.XP_MULTIPLIER, level - 1)
  );
}

function revokeXp(player, xpLost, sourceText) {
  if (xpLost <= 0) return;
  let stats = getPlayerStats(player);
  stats.xp -= xpLost;
  if (stats.xp < 0) {
    stats.xp = 0;
  }
  player.setDynamicProperty("dhh:xp", stats.xp);
  player.sendMessage(`§c-${Number(xpLost.toFixed(2))} XP §7(${sourceText})`);
  saveAllPlayerData(player);
}

export function grantXpAndLevelUpCheck(player, xpGained, sourceText) {
  if (xpGained <= 0) return;
  // --- THÊM ĐOẠN NÀY VÀO ĐÂY ---
  const isBloodMoonActive = world.getDynamicProperty("dhh:is_blood_moon_active");
  if (isBloodMoonActive) {
    xpGained *= CONFIG.BLOOD_MOON_CONFIG.REWARD_MULTIPLIER;
    sourceText += " §c(Trăng Máu)";
  }
  // --- KẾT THÚC PHẦN THÊM ---
  const originalXpGained = xpGained;
  const guildName = getPlayerGuildName(player);

  if (guildName) {
    grantXpToGuild(guildName, originalXpGained);

    const guildData = getAllGuildsData()[guildName];
    const boost = getGuildPerkValue(guildData, "global_xp_boost", 0);
    xpGained *= 1 + boost;
  }

  let stats = getPlayerStats(player);
  stats.xp += xpGained;
  player.sendMessage(`§a+${Number(xpGained.toFixed(2))} XP §7(${sourceText})`);

  let leveledUp = false;
  let xpNeeded = xpForLevel(stats.level);
  while (stats.xp >= xpNeeded) {
    stats.level++;
    stats.xp -= xpNeeded;
    stats.skillPoints += CONFIG.SKILL_POINTS_PER_LEVEL;
    leveledUp = true;
    xpNeeded = xpForLevel(stats.level);

    let baseHealth = player.getDynamicProperty("dhh:base_health") ?? 0;
    let baseMana = player.getDynamicProperty("dhh:base_mana") ?? 0;
    let baseDamage = player.getDynamicProperty("dhh:base_damage") ?? 0;
    let baseSpeed = player.getDynamicProperty("dhh:base_speed") ?? 0;

    player.setDynamicProperty(
      "dhh:base_health",
      baseHealth + CONFIG.BASE_STATS_PER_LEVEL.health
    );
    player.setDynamicProperty(
      "dhh:base_mana",
      baseMana + CONFIG.BASE_STATS_PER_LEVEL.mana
    );
    player.setDynamicProperty(
      "dhh:base_damage",
      baseDamage + CONFIG.BASE_STATS_PER_LEVEL.damage_bonus
    );
    player.setDynamicProperty(
      "dhh:base_speed",
      baseSpeed + CONFIG.BASE_STATS_PER_LEVEL.speed_bonus
    );
  }

  if (leveledUp) {
    player.setDynamicProperty("dhh:level", stats.level);
    player.setDynamicProperty("dhh:skill_points", stats.skillPoints);
    player.onScreenDisplay.setTitle("§l§eLÊN CẤP!", {
      subtitle: `§fĐạt cấp độ §b${stats.level}§f! Bạn nhận được §d${CONFIG.SKILL_POINTS_PER_LEVEL}§f điểm kỹ năng.`,
      fadeInDuration: 10,
      stayDuration: 80,
      fadeOutDuration: 20,
    });
    player.playSound("random.levelup");
    system.run(() => applyAllBonuses(player));
  }

  player.setDynamicProperty("dhh:xp", stats.xp);
  saveAllPlayerData(player);
}

function shareXpWithNearbyGuildMembers(sourcePlayer, originalXp, sourceText) {
  if (!CONFIG.GUILD_XP_SHARE.ENABLED || originalXp <= 0) {
    return;
  }

  const sourceGuildName = getPlayerGuildName(sourcePlayer);
  if (!sourceGuildName) {
    return;
  }

  const guildData = getAllGuildsData()[sourceGuildName];

  const finalSharePercentage = getGuildPerkValue(
    guildData,
    "xp_share_boost",
    CONFIG.GUILD_XP_SHARE.PERCENTAGE
  );

  const sharedXpAmount = originalXp * finalSharePercentage;
  const shareRadius = CONFIG.GUILD_XP_SHARE.RADIUS;

  for (const member of world.getAllPlayers()) {
    if (member.nameTag === sourcePlayer.nameTag || !member.isValid) {
      continue;
    }

    if (
      getPlayerGuildName(member) === sourceGuildName &&
      member.dimension.id === sourcePlayer.dimension.id
    ) {
      const distance = Vector.magnitude(
        Vector.subtract(sourcePlayer.location, member.location)
      );
      if (distance <= shareRadius) {
        grantXpAndLevelUpCheck(
          member,
          sharedXpAmount,
          `chia sẻ từ ${sourcePlayer.nameTag}`
        );
      }
    }
  }
}

export function applyAllBonuses(player) {
  try {
    const stats = getPlayerStats(player);
    const managedEffects = ["health_boost", "speed", "strength"];
    const conflictingEffects = ["regeneration", "resistance"];

    const healthComp = player.getComponent("health");
    const movementComp = player.getComponent("minecraft:movement");

    let healthRatio = 1;
    let oldCurrentHealth = 20;
    if (healthComp) {
      oldCurrentHealth = healthComp.currentValue;
      const oldMaxHealth =
        healthComp.effectiveMax > 0 ? healthComp.effectiveMax : 20;
      healthRatio = oldCurrentHealth / oldMaxHealth;
    }

    [...managedEffects, ...conflictingEffects].forEach((effectId) => {
      try {
        player.removeEffect(effectId);
      } catch (e) {}
    });

    if (movementComp) {
      movementComp.resetToDefaultValue();
      const agilityBonusFromPoints =
        stats.agility * CONFIG.STAT_SCALING.AGILITY.speed_bonus_per_point;
      const totalAgilityBonus = agilityBonusFromPoints + stats.baseSpeed;
      movementComp.setCurrentValue(
        movementComp.defaultValue * (1 + totalAgilityBonus)
      );
    }
    if (stats.vitality > 0 || stats.baseHealth > 0) {
      const bonusHealthFromPoints =
        stats.vitality * CONFIG.STAT_SCALING.VITALITY.health_per_point;
      const totalBonusHealth = bonusHealthFromPoints + stats.baseHealth;
      const healthAmplifier = Math.floor(totalBonusHealth / 4);
      if (healthAmplifier >= 0)
        player.addEffect("health_boost", INFINITE_DURATION, {
          amplifier: healthAmplifier,
          showParticles: false,
        });
    }
    if (stats.strength > 0 || stats.baseDamage > 0) {
      const bonusFromPoints =
        stats.strength * CONFIG.STAT_SCALING.STRENGTH.damage_bonus_per_point;
      const totalBonusPercentage = bonusFromPoints + stats.baseDamage;

      const strengthAmplifier = Math.floor(totalBonusPercentage / 0.25);

      if (strengthAmplifier > 0) {
        player.addEffect("strength", INFINITE_DURATION, {
          amplifier: strengthAmplifier - 1,
          showParticles: false,
        });
      }
    }

    const effectSources = {
      regeneration: { skill: -1, guild: -1 },
      resistance: { skill: -1, guild: -1 },
    };

    if (stats.skills.regeneration > 0)
      effectSources.regeneration.skill = Math.floor(
        (stats.skills.regeneration - 1) / 2
      );
    if (stats.skills.ironSkin > 0)
      effectSources.resistance.skill = Math.min(
        3,
        Math.floor((stats.skills.ironSkin - 1) / 2)
      );

    const guildName = getPlayerGuildName(player);
    if (guildName) {
      const guildData = getAllGuildsData()[guildName];
      const passiveEffect = getGuildPerkValue(
        guildData,
        "passive_effect",
        null
      );
      if (passiveEffect && effectSources[passiveEffect.effectId]) {
        effectSources[passiveEffect.effectId].guild = passiveEffect.amplifier;
      }
    }

    for (const effectId in effectSources) {
      const sources = effectSources[effectId];
      const finalAmplifier = Math.max(sources.skill, sources.guild);
      if (finalAmplifier >= 0) {
        player.addEffect(effectId, INFINITE_DURATION, {
          amplifier: finalAmplifier,
          showParticles: false,
        });
      }
    }

    system.run(() => {
      if (healthComp?.isValid) {
        const newMaxHealth = healthComp.effectiveMax;
        const targetHealth = newMaxHealth * healthRatio;
        const desiredHealth = Math.max(oldCurrentHealth, targetHealth);
        const finalHealth = Math.min(newMaxHealth, desiredHealth);
        healthComp.setCurrentValue(finalHealth);
      }
    });
  } catch (error) {
    logError("applyAllBonuses", player, error);
  }
}

async function showUpgradeChoiceMenu(player) {
  const stats = getPlayerStats(player);
  if (stats.skillPoints <= 0) return await showStatsMenu(player);
  const form = new ActionFormData();
  form.title("§l§aNÂNG CẤP");
  form.body(
    `§fBạn đang có §d${stats.skillPoints} §fđiểm để phân phối.\n\n§7Hãy chọn một hạng mục để sử dụng điểm:`
  );
  form.button(
    "§eNâng cấp Thuộc tính\n§8(Sức mạnh, Sức bền...)",
    "textures/ui/strength_effect.png"
  );
  form.button(
    "§6Nâng cấp Kỹ năng\n§8(Bị động và Chủ động)",
    "textures/ui/regeneration_effect.png"
  );
  form.button("§0Quay lại Menu chính", "textures/ui/undo.png");
  const { canceled, selection } = await form.show(player);
  if (canceled) return;
  if (selection === 0) showStatUpgradeMenu(player);
  else if (selection === 1) showSkillUpgradeMenu(player);
  else if (selection === 2) showCharacterDetailsMenu(player);
}

async function showSpecificSkillTree(player, title, skillsToShow) {
  const form = new ActionFormData();
  const stats = getPlayerStats(player);

  if (stats.skillPoints <= 0) {
    player.sendMessage("§cBạn đã dùng hết điểm kỹ năng!");
    return showSkillUpgradeMenu(player);
  }

  form.title(title);
  form.body(
    `§fSử dụng điểm để học hoặc cải thiện kỹ năng.\n§fĐiểm còn lại: §d${stats.skillPoints}`
  );

  skillsToShow.forEach((skill) => {
    const currentLevel = stats.skills[skill.key] ?? 0;
    if (currentLevel >= skill.max) {
      form.button(`§m§7${skill.name}: ${currentLevel}/${skill.max} (Tối đa)`);
    } else {
      form.button(
        `§e${skill.name}: ${currentLevel}/${skill.max}\n§8${skill.desc}`
      );
    }
  });
  form.button("§0Quay lại");

  const { canceled, selection } = await form.show(player);
  if (canceled) return;
  if (selection === skillsToShow.length) {
    return showSkillUpgradeMenu(player);
  }

  const selectedSkill = skillsToShow[selection];
  const currentLevel = stats.skills[selectedSkill.key] ?? 0;
  if (currentLevel >= selectedSkill.max) {
    player.sendMessage(
      `§cKỹ năng §e${selectedSkill.name}§c đã đạt cấp tối đa!`
    );
  } else {
    player.setDynamicProperty(selectedSkill.prop, currentLevel + 1);
    player.setDynamicProperty("dhh:skill_points", stats.skillPoints - 1);
    player.sendMessage(
      `§aNâng cấp thành công: §e${selectedSkill.name}§a đã lên cấp §b${
        currentLevel + 1
      }§a!`
    );
    applyAllBonuses(player);
    saveAllPlayerData(player);
  }
  system.run(() => showSpecificSkillTree(player, title, skillsToShow));
}

async function showSkillUpgradeMenu(player) {
  const stats = getPlayerStats(player);
  const playerClass = stats.class;

  if (playerClass === "none") {
    player.sendMessage(
      "§cBạn phải chọn một nghề nghiệp trước khi nâng cấp kỹ năng!"
    );
    return system.run(() => showClassSelectionMenu(player));
  }

  if (stats.skillPoints <= 0) {
    player.sendMessage("§cBạn không có điểm kỹ năng nào để sử dụng!");
    return showUpgradeChoiceMenu(player);
  }

  const currentClassData = ALL_CLASSES[playerClass];
  if (!currentClassData) {
    logError(
      "showSkillUpgradeMenu",
      player,
      new Error(`Không tìm thấy dữ liệu cho class: ${playerClass}`)
    );
    return;
  }

  const playerClassSkills = currentClassData.skillTree.map(
    (skillKey) => ALL_SKILLS[skillKey]
  );
  const playerClassName = currentClassData.name;

  const form = new ActionFormData();
  form.title("§l§6CHỌN NHÁNH KỸ NĂNG");
  form.body(
    `§fNghề nghiệp: §b${playerClassName}\n§fĐiểm còn lại: §d${stats.skillPoints}`
  );

  form.button(
    `§aKỹ năng ${playerClassName}\n§8Kỹ năng chuyên biệt của nghề.`,
    "textures/items/diamond_sword"
  );
  form.button(
    "§eKỹ năng Chung\n§8Các kỹ năng mà nghề nào cũng học được.",
    "textures/ui/resistance_effect.png"
  );
  form.button("§0Quay lại", "textures/ui/undo.png");

  const { canceled, selection } = await form.show(player);
  if (canceled) return;

  switch (selection) {
    case 0:
      showSpecificSkillTree(
        player,
        `§l§aKỸ NĂNG ${playerClassName.toUpperCase()}`,
        playerClassSkills
      );
      break;
    case 1:
      const commonSkillData = COMMON_SKILLS.map(
        (skillKey) => ALL_SKILLS[skillKey]
      );
      showSpecificSkillTree(player, "§l§eKỸ NĂNG CHUNG", commonSkillData);
      break;
    case 2:
      showUpgradeChoiceMenu(player);
      break;
  }
}

async function showStatUpgradeMenu(player) {
  const form = new ActionFormData();
  const stats = getPlayerStats(player);
  if (stats.skillPoints <= 0) {
    player.sendMessage("§cBạn đã dùng hết điểm kỹ năng!");
    return await showCharacterDetailsMenu(player);
  }
  form.title("§l§eNÂNG CẤP THUỘC TÍNH");
  form.body(
    `§fSử dụng điểm để tăng các chỉ số cơ bản của bạn.\n§fĐiểm còn lại: §d${stats.skillPoints}`
  );
  form.button(`§cSức Bền: ${stats.vitality}\n§8Tăng Máu tối đa của bạn.`);
  form.button(
    `§4Sức Mạnh: ${stats.strength}\n§8+${(
      stats.strength *
      CONFIG.STAT_SCALING.STRENGTH.damage_bonus_per_point *
      100
    ).toFixed(0)} phần trăm sát thương cận chiến`
  );
  form.button(
    `§bNhanh Nhẹn: ${stats.agility}\n§8+${(
      stats.agility *
      CONFIG.STAT_SCALING.AGILITY.speed_bonus_per_point *
      100
    ).toFixed(1)}% Tốc độ di chuyển`
  );
  form.button(
    `§dTrí Tuệ: ${stats.intelligence}\n§8Tăng Mana tối đa để dùng kỹ năng.`
  );
  form.button("§0Quay lại");
  const { canceled, selection } = await form.show(player);
  if (canceled) return;
  if (selection === 4) return await showUpgradeChoiceMenu(player);
  const statsMap = ["vitality", "strength", "agility", "intelligence"];
  const statToUpgrade = statsMap[selection];
  if (statToUpgrade) {
    player.setDynamicProperty(
      `dhh:${statToUpgrade}`,
      (player.getDynamicProperty(`dhh:${statToUpgrade}`) ?? 0) + 1
    );
    player.setDynamicProperty("dhh:skill_points", stats.skillPoints - 1);
    player.sendMessage(
      `§aBạn đã cộng 1 điểm vào §e${
        statToUpgrade.charAt(0).toUpperCase() + statToUpgrade.slice(1)
      }§a.`
    );
    applyAllBonuses(player);
    saveAllPlayerData(player);
    system.run(() => showStatUpgradeMenu(player));
  }
}

async function showCharacterDetailsMenu(player) {
  try {
    const stats = getPlayerStats(player);
    const xpNeeded = xpForLevel(stats.level);
    const form = new ActionFormData();
    form.title("§l§eCHI TIẾT & NÂNG CẤP");

    // Dữ liệu mô tả kỹ năng (giữ nguyên)
    const skillInfo = {
      regeneration: { name: "Tự Hồi Phục", type: "passive" },
      ironSkin: { name: "Da Sắt", type: "passive" },
      radar: { name: "Rada Thăm Dò", type: "passive" },
      stealth: {
        name: "Tàng Hình",
        type: "active",
        manaKey: "STEALTH",
        cdKey: "STEALTH",
      },
      heal: {
        name: "Chữa Lành",
        type: "active",
        manaKey: "HEAL",
        cdKey: "HEAL",
      },
      dash: { name: "Lướt Đi", type: "active", manaKey: "DASH", cdKey: "DASH" },
      targeted_lightning: {
        name: "Lôi Vực",
        type: "active",
        manaKey: "TARGETED_LIGHTNING",
        cdKey: "TARGETED_LIGHTNING",
      },
      summon_wolf: {
        name: "Triệu Hồi Linh Thú",
        type: "active",
        manaKey: "SUMMON_WOLF",
        cdKey: "SUMMON_WOLF",
      },
      shadow_swap: {
        name: "Thiên Mệnh Thời Không",
        type: "active",
        manaKey: "SHADOW_SWAP",
        cdKey: "SHADOW_SWAP",
      },
      sprint: {
        name: "Bứt Tốc",
        type: "active",
        manaKey: "SPRINT",
        cdKey: "SPRINT",
      },
      shadowbind: {
        name: "Dây Trói Bóng Tối",
        type: "active",
        manaKey: "SHADOWBIND",
        cdKey: "SHADOWBIND",
      },
      golem_punch: {
        name: "Cú Đấm Golem",
        type: "active",
        manaKey: "GOLEM_PUNCH",
        cdKey: "GOLEM_PUNCH",
      },
      winters_dominion: {
        name: "Lãnh Địa Mùa Đông",
        type: "active",
        manaKey: "WINTERS_DOMINION",
        cdKey: "WINTERS_DOMINION",
      },
      ally_swap: {
        name: "Thiên Can Hộ Mệnh",
        type: "active",
        manaKey: "ALLY_SWAP",
        cdKey: "ALLY_SWAP",
      },
      time_lock: {
        name: "Giam Cầm Thời Gian",
        type: "active",
        manaKey: "TIME_LOCK",
        cdKey: "TIME_LOCK",
      },
      earthen_grave: {
        name: "Mộ Phần Trói Buộc",
        type: "active",
        manaKey: "EARTHEN_GRAVE",
        cdKey: "EARTHEN_GRAVE",
      },
      hellfire_pit: {
        name: "Vực Lửa Địa Ngục",
        type: "active",
        manaKey: "HELLFIRE_PIT",
        cdKey: "HELLFIRE_PIT",
      },
      reality_warp: {
        name: "Vùng Hỗn Loạn",
        type: "active",
        manaKey: "REALITY_WARP",
        cdKey: "REALITY_WARP",
      },
      spirit_sight: {
        name: "Thị Kiến Tâm Linh",
        type: "active",
        manaKey: "SPIRIT_SIGHT",
        cdKey: "SPIRIT_SIGHT",
      },
      chaos_trap: {
        name: "Bẫy Hỗn Mang",
        type: "active",
        manaKey: "CHAOS_TRAP",
        cdKey: "CHAOS_TRAP",
      },
      immortal_edict: {
        name: "Thánh Lệnh Bất Diệt",
        type: "active",
        manaKey: "IMMORTAL_EDICT",
        cdKey: "IMMORTAL_EDICT",
      },
      explosion: {
        name: "Bộc Liệt Ma Pháp",
        type: "active",
        manaKey: "EXPLOSION",
        cdKey: "EXPLOSION",
      },
      blade_storm: {
        name: "Bão Kiếm",
        type: "active",
        manaKey: "BLADE_STORM",
        cdKey: "BLADE_STORM",
      },
      primal_beast: {
        name: "Hóa Thân Thần Thú",
        type: "active",
        manaKey: "PRIMAL_BEAST",
        cdKey: "PRIMAL_BEAST",
      },
      celestial_step: {
        name: "Bước Chân Thiên Giới",
        type: "active",
        manaKey: "CELESTIAL_STEP",
        cdKey: "CELESTIAL_STEP",
      },
      void_step: {
        name: "Vô Hạ Hạn",
        type: "active",
        manaKey: "VOID_STEP",
        cdKey: "VOID_STEP",
      },
           spatial_link: {
        name: "Liên Kết Chiều Không",
        type: "active",
        manaKey: "SPATIAL_LINK",
        cdKey: "SPATIAL_LINK",
      },
    };

    // --- BẮT ĐẦU THAY ĐỔI: Thêm dữ liệu mô tả Nội Tại Class ---
    const classPassivesInfo = {
      guardian: [
        { level: 1, name: "§aLì Đòn", desc: "§7Có tỷ lệ hồi máu khi nhận ST." },
        {
          level: 5,
          name: "§aChấn Động Phục Hận",
          desc: "§7Kích hoạt Lì Đòn sẽ đẩy lùi kẻ địch.",
        },
        {
          level: 10,
          name: "§aGiáp Huyết Tinh",
          desc: "§7Nhận máu vàng khi thấp máu.",
        },
      ],
      mage: [
        {
          level: 1,
          name: "§bThấu Hiểu Ma Pháp",
          desc: "§7Tăng hồi mana & nhận thêm khi diệt địch.",
        },
        {
          level: 5,
          name: "§bBùng Nổ Ma Lực",
          desc: "§7Khi đầy máu, kỹ năng gây thêm ST.",
        },
        {
          level: 10,
          name: "§bQuá Tải Năng Lượng",
          desc: "§7Khi đầy mana, kỹ năng gây ST lan.",
        },
      ],
      ranger: [
        {
          level: 1,
          name: "§eThợ Săn",
          desc: "§7Bắn trúng liên tục tăng Tốc Độ.",
        },
        {
          level: 3,
          name: "§eThợ Săn (Nâng cấp)",
          desc: "§7Tăng thêm cả Nhảy Cao.",
        },
        {
          level: 5,
          name: "§eMũi Tên Độc",
          desc: "§7Đòn bắn có tỷ lệ gây độc.",
        },
        {
          level: 10,
          name: "§eGió Lướt",
          desc: "§7Có thể lướt nhẹ trên không.",
        },
        
      ],
    };
    // --- KẾT THÚC THAY ĐỔI ---

    let body = [];
    body.push(`§l§f${player.nameTag} §r- §bCấp ${stats.level}`);

    body.push(
      `§7Nghề nghiệp: §b${CLASS_TRANSLATIONS[stats.class] ?? "Chưa Chọn"}`
    );
    body.push(
      `§eXP: §f${stats.xp.toFixed(0)}/${xpNeeded} [${createProgressBar(
        stats.xp,
        xpNeeded,
        16,
        "█",
        "░",
        "§e",
        "§7"
      )}]`
    );
    body.push(
      `§bMP: §f${stats.currentMana.toFixed(0)}/${stats.maxMana.toFixed(
        0
      )} [${createProgressBar(
        stats.currentMana,
        stats.maxMana,
        16,
        "█",
        "░",
        "§b",
        "§8"
      )}]`
    );

    if (stats.skillPoints > 0)
      body.push(`\n§dBạn có: §f${stats.skillPoints} §dĐiểm Kỹ Năng chưa dùng.`);

    body.push("\n§7---------- §6THUỘC TÍNH §7----------");
    body.push(
      `§cSức Bền (VIT): §f${stats.vitality} §8(§a+${(
        stats.vitality * CONFIG.STAT_SCALING.VITALITY.health_per_point +
        stats.baseHealth
      ).toFixed(1)} HP§8)`
    );
    body.push(
      `§4Sức Mạnh (STR): §f${stats.strength} §8(§c+${(
        (stats.strength * CONFIG.STAT_SCALING.STRENGTH.damage_bonus_per_point +
          stats.baseDamage) *
        100
      ).toFixed(0)}% Sát thương§8)`
    );
    body.push(
      `§bNhanh Nhẹn (AGI): §f${stats.agility} §8(§b+${(
        (stats.agility * CONFIG.STAT_SCALING.AGILITY.speed_bonus_per_point +
          stats.baseSpeed) *
        100
      ).toFixed(1)}% Tốc độ§8)`
    );
    body.push(
      `§dTrí Tuệ (INT): §f${stats.intelligence} §8(§d+${(
        stats.intelligence * CONFIG.STAT_SCALING.INTELLIGENCE.mana_per_point +
        stats.baseMana
      ).toFixed(0)} Mana§8)`
    );

    // --- BẮT ĐẦU THAY ĐỔI: Hiển thị Nội Tại Class ---
    const playerPassives = classPassivesInfo[stats.class];
    if (playerPassives) {
      body.push("\n§7----- §bNỘI TẠI NGHỀ NGHIỆP §7-----");
      playerPassives.forEach((passive) => {
        // Chỉ hiển thị những nội tại người chơi đã đủ cấp độ để mở khóa
        if (stats.level >= passive.level) {
          body.push(
            `§b- ${passive.name} §7(Cấp ${passive.level}): ${passive.desc}`
          );
        }
      });
    }
    // --- KẾT THÚC THAY ĐỔI ---

    let passiveSkills = Object.keys(skillInfo).filter(
      (k) => skillInfo[k].type === "passive" && stats.skills[k] > 0
    );
    if (passiveSkills.length > 0) {
      body.push("\n§7------- §eKỸ NĂNG BỊ ĐỘNG §7-------");
      passiveSkills.forEach((key) =>
        body.push(
          `§e${skillInfo[key].name}: §f[${createProgressBar(
            stats.skills[key],
            9,
            9,
            "■",
            "□",
            "§6"
          )}] Cấp ${stats.skills[key]}/9`
        )
      );
    }

    let activeSkills = Object.keys(skillInfo).filter(
      (k) => skillInfo[k].type === "active" && stats.skills[k] > 0
    );
    if (activeSkills.length > 0) {
      body.push("\n§7------- §dKỸ NĂNG CHỦ ĐỘNG §7-------");
      activeSkills.forEach((key) => {
        body.push(
          `§d${skillInfo[key].name}: §f[${createProgressBar(
            stats.skills[key],
            9,
            9,
            "■",
            "□",
            "§d"
          )}] Cấp ${stats.skills[key]}/9`
        );
        body.push(
          `  §7Tiêu hao: §b${
            CONFIG.SKILL_MANA_COSTS[skillInfo[key].manaKey]
          } Mana §7| Hồi chiêu: §c${
            CONFIG.SKILL_COOLDOWNS[skillInfo[key].cdKey]
          }s`
        );
      });
    }

    form.body(body.join("\n"));

    const buttons = [];
    if (stats.skillPoints > 0)
      buttons.push({
        text: `§aNâng Cấp (${stats.skillPoints} điểm)`,
        action: () => showUpgradeChoiceMenu(player),
      });
    buttons.push({ text: "§0Quay lại", action: () => showStatsMenu(player) });
    buttons.forEach((button) => form.button(button.text));

    const { canceled, selection } = await form.show(player);
    if (canceled) return;
    buttons[selection]?.action();
  } catch (error) {
    logError("showCharacterDetailsMenu", player, error);
  }
}

async function showActivitiesMenu(player) {
  const form = new ActionFormData();
  form.title("§l§cHOẠT ĐỘNG & THỬ THÁCH");
  form.body("§fChọn một hoạt động bạn muốn tham gia.");

  const buttons = [];
  buttons.push({ text: "§bNhiệm Vụ", action: () => showQuestMenu(player) });

  if (activeDungeons.has(player.nameTag)) {
    buttons.push({
      text: "§c§lBỏ Cuộc (Hầm Ngục)",
      action: () => {
        player.sendMessage("§eBạn đã chọn bỏ cuộc. Đang đưa bạn trở về...");
        finishDungeon(player, false);
      },
    });
  } else {
    buttons.push({
      text: "§gThử Thách Hầm Ngục §c(Tạm khóa)",
      action: () => showPasswordPrompt(player, showDungeonChallengeIntro),
    });
  }

  const challengeState = [...activeChallenges.values()].find((c) =>
    c.party.includes(player.nameTag)
  );
  if (challengeState) {
    buttons.push({
      text: "§c§lBỏ Cuộc (Sinh Tồn)",
      action: () => {
        const hostName = [...activeChallenges.entries()].find(
          ([key, state]) => state === challengeState
        )[0];
        endChallenge(hostName, false);
        for (const memberName of challengeState.party) {
          const member = world.getPlayers({ name: memberName })[0];
          if (member && member.nameTag !== player.nameTag) {
            member.sendMessage(
              `§e[Thử Thách] Trận đấu đã bị hủy bởi §f${player.nameTag}.`
            );
          }
        }
        player.sendMessage("§eBạn đã hủy/rời khỏi Thử Thách Sinh Tồn.");
      },
    });
  } else {
    buttons.push({
      text: "§bThử Thách Sinh Tồn §c(Tạm khóa)",
      action: () => showPasswordPrompt(player, showChallengeMainMenu),
    });
  }

  buttons.push({ text: "§0Quay lại", action: () => showStatsMenu(player) });

  buttons.forEach((b) => form.button(b.text));
  const { canceled, selection } = await form.show(player);
  if (canceled) return;
  buttons[selection]?.action();
}

export async function showSocialMenu(player) {
  const form = new ActionFormData();
  form.title("§l§bXÃ HỘI & TƯƠNG TÁC");
  form.body("§fCác tính năng kết nối với người chơi khác.");

  const buttons = [];
  buttons.push({
    text: "§2Bang Hội",
    icon: "textures/items/emerald",
    action: () => showGuildMainMenu(player),
  });

  // --- THÊM KHỐI CODE NÀY VÀO ---
  buttons.push({
    text: "§ePing Vị Trí\n§8Đánh dấu địa điểm quan trọng",
    icon: "textures/items/map_filled",
    action: () => showPingMainMenu(player),
  });
  // --- KẾT THÚC PHẦN THÊM ---

  buttons.push({
    text: "§6Giao Dịch An Toàn",
    icon: "textures/ui/icon_deals",
    action: () => showTradeInviteMenu(player),
  });
  buttons.push({
    text: "§0Quay lại",
    icon: "textures/ui/undo",
    action: () => showStatsMenu(player),
  });

  // Sửa dòng này để hỗ trợ icon
  buttons.forEach((b) => form.button(b.text, b.icon));
  const { canceled, selection } = await form.show(player);
  if (canceled) return;
  buttons[selection]?.action();
}

export async function showUtilitiesMenu(player) {
  const form = new ActionFormData();
  form.title("§l§dCỬA HÀNG & TIỆN ÍCH");
  form.body("§fSử dụng các tính năng đặc biệt và tiện ích.");

  const buttons = [];
  buttons.push({
    text: "§dCầu Nguyện",
    con: "textures/items/nether_star",
    action: () => showGachaMainMenu(player),
  });
  buttons.push({
    text: "§6Chợ Trời Chớp Nhoáng\n§8Sự kiện mua bán ngẫu nhiên",
    icon: "textures/items/gold_ingot",
    action: () => showFlashSaleMenu(player),
  });
  buttons.push({ text: "§5Đổi Nhạc Nền",  icon: "textures/items/record_cat", action: () => showMusicMenu(player) });
buttons.push({
  text: "§6Mua Nhà Tiện Lợi\n§8Xây nhà và bảo hộ tự động",
  icon: "textures/items/bed_red",
  action: () => showHousingMainMenu(player),
});
     buttons.push({
        text: "§eThắp Sáng Vĩnh Viễn\n§8Ngăn quái vật spawn trong khu vực",
        icon: "textures/blocks/torch_on", // Dùng icon ngọn đuốc
        action: () => showAreaLightingMenu(player),
    });
  buttons.push({
    text: "§c§lKhởi Tạo Lại Nghề Nghiệp\n§8(Reset về Cấp 1)",
     icon: "textures/ui/refresh_light",
    action: () => showClassResetConfirmationMenu(player),
  });
  buttons.push({ text: "§0Quay lại", icon: "textures/ui/undo", action: () => showStatsMenu(player) });

     buttons.forEach((b) => form.button(b.text, b.icon));
  const { canceled, selection } = await form.show(player);
  if (canceled) return;
  buttons[selection]?.action();
}

async function showSystemMenu(player) {
  const form = new ActionFormData();
  form.title("§l§7HỆ THỐNG");
  form.body("§fCác chức năng liên quan đến hệ thống game.");

  const buttons = [];
  if (!world.getDynamicProperty("dhh:shared_inventory_active")) {
    buttons.push({
      text: "§c§lCHUNG TÚI ĐỒ §c(Tạm khóa)\n§8(§4KHÔNG THỂ HOÀN TÁC!§8)",
      action: () =>
        showPasswordPrompt(player, activateSharedInventoryChallenge),
    });
  }
  buttons.push({
    text: "§5§lMa Sói Làng Minecraft §c(Tạm khóa)\n§8Tổ chức một phiên chơi mới",
    icon: "textures/items/spyglass",
    action: () => showPasswordPrompt(player, startWerewolfLobby),
  });
  if (
    getMissingdhhItems(player).book ||
    getMissingdhhItems(player).scepter ||
    getMissingdhhItems(player).eye
  ) {
    buttons.push({
      text: "§eLấy lại Vật phẩm dhh",
      action: () => giveMissingdhhItems(player),
    });
  }
  buttons.push({ text: "§0Quay lại", action: () => showStatsMenu(player) });

  buttons.forEach((b) => form.button(b.text));
  const { canceled, selection } = await form.show(player);
  if (canceled) return;
  buttons[selection]?.action();
}
async function activateSharedInventoryChallenge(player) {
  const form = new MessageFormData()
    .title("§4§lXÁC NHẬN HÀNH ĐỘNG HỦY DIỆT")
    .body(
      "Bạn có thực sự chắc chắn muốn kích hoạt chế độ §e§lCHUNG TÚI ĐỒ§r cho TOÀN BỘ thế giới không?\n\n§cHành động này là VĨNH VIỄN và KHÔNG THỂ HOÀN TÁC.\nTất cả túi đồ của người chơi sẽ bị xóa và đồng bộ thành một."
    )
    .button1("§aKhông, tôi đã suy nghĩ lại")
    .button2("§cĐỒNG Ý, KÍCH HOẠT!");

  const { canceled, selection } = await form.show(player);

  if (canceled || selection === 0) {
    player.sendMessage("§aĐã hủy kích hoạt thử thách.");
    return;
  }

  if (selection === 1) {
    world.setDynamicProperty("dhh:shared_inventory_active", true);
    initializeSharedInventorySystem();
  }
}

/**
 * Trả về chuỗi trạng thái sức khỏe dựa trên phần trăm máu.
 * @param {number} currentHealth Máu hiện tại.
 * @param {number} maxHealth Máu tối đa.
 * @returns {string} Chuỗi trạng thái đã định dạng màu.
 */
function getHealthStatusText(currentHealth, maxHealth) {
    if (maxHealth <= 0) return "";
    const healthPercent = currentHealth / maxHealth;

    if (healthPercent < 0.25) return "§4§lNguy Kịch";
    if (healthPercent < 0.50) return "§cKhông ổn";
    if (healthPercent < 0.75) return "§eHơi yếu";
    return "§aTốt";
}

/**
 * Trả về icon nhiệt độ dựa trên giá trị.
 */
function getTemperatureIcon(temp) {
    if (temp >= 42) return "🔥";
    if (temp >= 38) return "☀️";
    if (temp <= 32) return "❄️";
    if (temp <= 36) return "🌡️";
    return "🌡️";
}

/**
 * Trả về màu cho chỉ số nhiệt độ.
 */
function getTemperatureColor(temp) {
    if (temp >= 42) return "§4";
    if (temp >= 38) return "§c";
    if (temp <= 32) return "§9";
    if (temp <= 36) return "§b";
    return "§a";
}

/**
 * Trả về chuỗi mô tả tất cả các bệnh tật/chấn thương của người chơi.
 */
function getPlayerAilmentString(player) {
    const activeAilments = [];
    
    // Kiểm tra Độ no
    const foodComp = player.getComponent("minecraft:food");
    if (foodComp) {
        if (foodComp.foodLevel <= 0) activeAilments.push("§4§lĐói Cực Độ");
        else if (foodComp.foodLevel < 6) activeAilments.push("§cRất Đói");
    }

    // Kiểm tra Độ khát
    const thirst = player.getDynamicProperty("dhh:thirst") ?? 100;
    if (thirst <= 0) activeAilments.push("§4§lKhát Cực Độ");
    else if (thirst < 10) activeAilments.push("§cRất Khát");
    
    // Kiểm tra Nhiệt độ
    const temp = player.getDynamicProperty("dhh:temperature") ?? 37;
    if (temp >= 45) activeAilments.push("§4§lQuá Nóng Nguy Hiểm");
    else if (temp >= 42) activeAilments.push("§cQuá Nóng");
    else if (temp <= 30) activeAilments.push("§9§lĐóng Băng");
    else if (temp <= 32) activeAilments.push("§bRất Lạnh");
    
    // Chấn thương & Bệnh tật
    if (player.hasTag('broken_leg')) activeAilments.push("§c§lGãy Chân");
    if (player.hasTag('bleeding')) activeAilments.push("§4Chảy Máu");
    if (player.hasTag('burned')) activeAilments.push("§6Bỏng");
    if (player.hasTag('sprained_arm')) activeAilments.push("§eBong Gân Tay");
    if (player.hasTag('fever')) activeAilments.push("§cSốt Cao");
    if (player.hasTag('cold')) activeAilments.push("§bCảm Lạnh");
    if (player.hasTag('parasite')) activeAilments.push("§7Giun Sán");
    if (player.hasTag('dazed')) activeAilments.push("§eChoáng Váng");
    
    // Virus
    if (player.hasTag('virus_stage3')) activeAilments.push("§4§lVIRUS GĐ 3");
    else if (player.hasTag('virus_stage2')) activeAilments.push("§cVirus GĐ 2");
    else if (player.hasTag('virus_stage1')) activeAilments.push("§2Nhiễm Virus");
    if (player.hasTag('virus_curing')) activeAilments.push("§dĐang Thanh Tẩy");
    
    return activeAilments.length > 0 ? activeAilments.join("§7, ") : "§a✓ Khỏe Mạnh";
}
function getSanityStatusText(sanity) {
    const sanityConfig = CONFIG.SURVIVAL_CONFIG.SANITY_CONFIG;
    if (sanity < sanityConfig.THRESHOLDS.INSANE) return "§4§lHóa Điên";
    if (sanity < sanityConfig.THRESHOLDS.PARANOID) return "§cHoang Tưởng";
    if (sanity < sanityConfig.THRESHOLDS.ANXIOUS) return "§eBất An";
    return "§aỔn Định";
}
/**
 * Menu chính với thiết kế chuyên nghiệp, gọn gàng và sử dụng icon Unicode an toàn.
 */
export async function showStatsMenu(player) {
    try {
        const stats = getPlayerStats(player);
        if (stats.class === "none") {
            return system.run(() => showClassSelectionMenu(player));
        }
        
        const xpNeeded = xpForLevel(stats.level);
        const form = new ActionFormData();
        form.title("§l§6 BẢNG ĐIỀU KHIỂN ");

        let body = [];
        
        // --- PHẦN 1: THÔNG TIN TỔNG QUAN ---
        body.push(`§l${player.nameTag} §r§7- §bCấp ${stats.level} (${CLASS_TRANSLATIONS[stats.class] ?? "Chưa Chọn"})`);
       const worldTime = formatWorldDateAndTime();
     let timeDisplay = `§e${worldTime.timeString} - ${worldTime.period} | Ngày ${worldTime.day}/${worldTime.month}/${worldTime.year}`;
if (worldTime.specialDay) {
    timeDisplay += ` §d§l(✨ ${worldTime.specialDay})`;
}
body.push(timeDisplay);
const nguyenThach = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
body.push(`§dNguyên Thạch: ${nguyenThach.toLocaleString()} ♦`);

        // --- PHẦN 2: CHỈ SỐ CỐT LÕI ---
        body.push("\n§7§m----------------§r§7 KỸ NĂNG §m---------------");
        const xpProgressBar = createProgressBar(stats.xp, xpNeeded, 18, "█", "░", "§e", "§8");
        // Sửa ở đây: Dùng ký tự Unicode an toàn ★
        body.push(`§e★ XP: [${xpProgressBar}] §f${stats.xp.toFixed(0)}/${xpNeeded}`);
        
        const manaProgressBar = createProgressBar(stats.currentMana, stats.maxMana, 18, "█", "░", "§b", "§8");
        // Sửa ở đây: Dùng ký tự Unicode an toàn ✦
        body.push(`§b✦ Mana: [${manaProgressBar}] §f${stats.currentMana.toFixed(0)}/${stats.maxMana.toFixed(0)}`);
        
        // --- PHẦN 3: SINH TỒN ---
        body.push("\n§7§m----------------§r§7 SINH TỒN §m---------------");
        
        const healthComp = player.getComponent("health");
        if (healthComp) {
            const currentHealth = healthComp.currentValue;
            const maxHealth = healthComp.effectiveMax;
            // Sửa ở đây: Dùng ký tự Unicode an toàn ❤
            body.push(`§c❤ Máu: §f${currentHealth.toFixed(1)}/${maxHealth.toFixed(1)} §7- ${getHealthStatusText(currentHealth, maxHealth)}`);
        }

        const foodComp = player.getComponent("minecraft:food");
        if (foodComp) {
            const currentFood = foodComp.foodLevel;
            let foodStatus = "§a✓ No";
            if (currentFood < 6) foodStatus = "§4⚠ Rất Đói"; else if (currentFood < 10) foodStatus = "§c⚠ Đói";
            // Sửa ở đây: Xóa emoji 🍖, dùng text
            body.push(`§6Độ no: §f${currentFood}/20 §7- ${foodStatus}`);
        }

        const thirst = player.getDynamicProperty("dhh:thirst") ?? 100;
        let thirstStatus = "§a✓ Đủ Nước";
        if (thirst <= 0) thirstStatus = "§4⚠ Cực Khát"; else if (thirst < 10) thirstStatus = "§c⚠ Rất Khát";
        // Sửa ở đây: Xóa emoji 💧, dùng text
        body.push(`§bĐộ khát: §f${Math.round(thirst)}/100 §7- ${thirstStatus}`);
           const sanity = player.getDynamicProperty("dhh:sanity") ?? 100;
    body.push(`§dTinh thần: §f${Math.round(sanity)}/100 §7- ${getSanityStatusText(sanity)}`);
        const temperature = player.getDynamicProperty("dhh:temperature") ?? 37;
       let tempStatus; // Bỏ giá trị mặc định ở đây

if (temperature >= 45) tempStatus = "§4§l⚠ NGUY HIỂM";
else if (temperature >= 42) tempStatus = "§c⚠ Quá Nóng";
else if (temperature >= 38) tempStatus = "§6⚠ Hơi Nóng"; // <-- ĐÃ SỬA: Trạng thái hợp lý hơn
else if (temperature > 37.5) tempStatus = "§eHơi Cao";   // <-- THÊM MỚI: Trạng thái cảnh báo nhẹ
else if (temperature <= 30) tempStatus = "§9§l⚠ ĐÓNG BĂNG";
else if (temperature <= 32) tempStatus = "§b⚠ Rất Lạnh";
else if (temperature <= 35) tempStatus = "§3⚠ Hơi Lạnh"; // <-- Sửa cho nhất quán
else if (temperature < 36.5) tempStatus = "§aHơi Thấp";    // <-- THÊM MỚI
else tempStatus = "§a✓ Bình Thường";                       // <-- Trạng thái mặc định cuối cùng
        
        // Sửa ở đây: Xóa emoji nhiệt độ, chỉ dùng màu
        body.push(`${getTemperatureColor(temperature)}Nhiệt độ: §f${temperature.toFixed(1)}°C §7- ${tempStatus}`);

        // --- PHẦN 4: TÌNH TRẠNG & CẢNH BÁO ---
        const ailmentString = getPlayerAilmentString(player);
        if (!ailmentString.includes("Khỏe Mạnh")) {
             body.push(`\n§c§lTình trạng: §r${ailmentString}`);
        }
        
        if (stats.skillPoints > 0) {
            // Sửa ở đây: Dùng ký tự Unicode an toàn ⚠
            body.push(`\n§d§l⚠ Bạn có §f${stats.skillPoints} §dđiểm kỹ năng chưa dùng!`);
        }

        // --- PHẦN 5: BANG HỘI ---
        const guildName = getPlayerGuildName(player);
        if (guildName) {
            const allGuilds = getAllGuildsData();
            const guildData = allGuilds[guildName];
            if (guildData) {
                const onlineMembers = [];
                for (const memberName in guildData.members) {
                    if (memberName === player.nameTag) continue;
                    const memberPlayer = world.getPlayers({ name: memberName })[0];
                    if (memberPlayer) onlineMembers.push(memberPlayer);
                }

                if (onlineMembers.length > 0) {
                    body.push(`\n§2§lBANG HỘI (${guildName}) - ONLINE:`);
                    onlineMembers.slice(0, 3).forEach(member => {
                         const memberHealthComp = member.getComponent("health");
                         const currentHealth = memberHealthComp ? Math.round(memberHealthComp.currentValue) : "?";
                         const maxHealth = memberHealthComp ? memberHealthComp.effectiveMax : "?";
                         const primaryAilment = getPlayerAilmentString(member).split(',')[0];
                         // Sửa ở đây: Dùng dấu • và ❤
                         body.push(` §a• §f${member.nameTag} §7(§c❤ ${currentHealth}/${maxHealth}§7) - ${primaryAilment}`);
                    });
                }
            }
        }

        form.body(body.join("\n"));
        
    const buttons = [
  { text: "§eChi Tiết & Nâng Cấp\n§8Chỉ số, điểm kỹ năng...", icon: "textures/items/book_writable", action: () => showCharacterDetailsMenu(player) },
  { text: "§6Cường Hóa Trang Bị\n§8Vũ khí, giáp...", icon: "textures/blocks/anvil_top_damaged_1", action: () => showUpgradeSelectionMenu(player) },
  { text: "§cHoạt Động\n§8Nhiệm vụ, Hầm ngục...", icon: "textures/items/diamond_sword", action: () => showActivitiesMenu(player) },
    { text: "§dCốt Truyện\n§8Theo dõi hành trình của bạn", icon: "textures/items/book_written", action: () => showStoryQuestLog(player) },
      { text: "§aSổ Tay Hướng Dẫn\n§8Học cách chế tạo, khám phá", icon: "textures/items/book_normal", action: () => showTutorialMainMenu(player) },
  { text: "§bXã Hội\n§8Bang hội, Giao dịch...", icon: "textures/items/emerald", action: () => showSocialMenu(player) },
  { text: "§dTiện Ích\n§8Gacha, Shop...", icon: "textures/items/nether_star", action: () => showUtilitiesMenu(player) },
  { text: "§6Bảo Hộ\n§8Lãnh thổ, Nhà cửa...", icon: "textures/blocks/beacon", action: () => showLandClaimMainMenu(player) },
  { text: "§6Hệ Thống", icon: "textures/blocks/command_block", action: () => showSystemMenu(player) },
  { text: "§4Đóng", icon: "textures/ui/cancel", action: () => {} },
];
        
        buttons.forEach((button) => form.button(button.text, button.icon));
        const { canceled, selection } = await form.show(player);
        if (canceled) return;
        buttons[selection]?.action();
    } catch (error) {
        logError("showStatsMenu", player, error);
    }
}

function giveInitialdhhItems(player) {
  try {
    const missing = getMissingdhhItems(player);
    const inventory = player.getComponent("inventory")?.container;
    if (!inventory) return;

    let gaveItem = false;
    if (missing.book) {
      const book = new ItemStack("dhh:menu_book", 1);
      book.lockMode = "inventory";
      book.keepOnDeath = true;
      inventory.addItem(book);
      gaveItem = true;
    }
    if (missing.scepter) {
      const scepter = new ItemStack("dhh:magic_staff", 1);
      scepter.nameTag = "§b§lQuyền Trượng";
      scepter.setLore([
        "§7Vật phẩm ma thuật để sử dụng Kỹ năng.",
        "§f- §aChuột Phải§f để §eChọn Kỹ năng§f.",
        "§f- §aCầm trên tay và Ngồi xuống§f để §cKích hoạt§f.",
        "§8Vật phẩm hệ thống, không thể vứt bỏ.",
      ]);
      scepter.lockMode = "inventory";
      scepter.keepOnDeath = true;
      inventory.addItem(scepter);
      gaveItem = true;
    }
    if (missing.eye) {
      const eyeItem = createAllSeeingEyeItem();
      inventory.addItem(eyeItem);
      gaveItem = true;
    }
    
    if (gaveItem) {
      logDebug(`Gave initial dhh items to new player ${player.name}`);
    }
  } catch (error) {
    logError("giveInitialdhhItems", player, error);
  }
}

function handleSkillActivation(player) {
  if (player.hasTag("spirit_sight_active")) {
    showSpiritSightActionMenu(player);
    return;
  }
  let activeSkillName = "unknown";
  try {
    const heldItem = player
      .getComponent("inventory")
      .container.getItem(player.selectedSlotIndex);
    if (
      !heldItem ||
      heldItem.typeId !== "dhh:magic_staff" ||
      !heldItem.nameTag?.startsWith("§b§lQuyền Trượng")
    )
      return;

    activeSkillName = player.getDynamicProperty("dhh:active_skill");
    if (!activeSkillName)
      return player.onScreenDisplay.setActionBar(
        "§eHãy dùng Quyền Trượng để chọn một kỹ năng!"
      );

    const isDeactivatingDominion =
      activeSkillName === "WINTERS_DOMINION" &&
      !!player.getDynamicProperty("dhh:dominion_instance");
    const stats = getPlayerStats(player);
    const skillAction = SKILL_ACTIONS[activeSkillName];
    const skillLevel = stats.skills[activeSkillName.toLowerCase()] ?? 0;
    if (!skillAction || skillLevel <= 0) return;

    if (
      activeSkillName === "SHADOW_SWAP" &&
      player.getDynamicProperty("dhh:shadow_location")
    ) {
      skillAction(player, stats);
      return;
    }

    const manaCost = CONFIG.SKILL_MANA_COSTS[activeSkillName];
    const cooldown = CONFIG.SKILL_COOLDOWNS[activeSkillName];
    const cdProp = `dhh:cd_${activeSkillName.toLowerCase()}`;
    const now = system.currentTick;
    const lastUsed = player.getDynamicProperty(cdProp) ?? 0;

    if (now < lastUsed) {
      const translatedName =
        SKILL_TRANSLATIONS[activeSkillName.toLowerCase()] || activeSkillName;
      return player.sendMessage(
        `§c[${translatedName}] chưa hồi! Chờ ${((lastUsed - now) / 20).toFixed(
          1
        )}s.`
      );
    }

    if (!isDeactivatingDominion) {
      if (
        activeSkillName === "SHADOWBIND" &&
        !player.hasTag("shadowbind_active")
      ) {
        if (stats.currentMana < manaCost)
          return player.sendMessage(
            `§cKhông đủ mana để kích hoạt! Cần §b${manaCost}§c.`
          );
      } else if (activeSkillName !== "SHADOWBIND") {
        if (stats.currentMana < manaCost)
          return player.sendMessage(
            `§cKhông đủ mana! Cần §b${manaCost}§c, bạn có §b${Math.floor(
              stats.currentMana
            )}§c.`
          );
      }
    }

    const success = skillAction(player, stats);
    if (activeSkillName === "DASH" && success) {
      return;
    }
    if (success) {
      if (!isDeactivatingDominion) {
        if (
          activeSkillName !== "SHADOWBIND" ||
          (activeSkillName === "SHADOWBIND" &&
            !player.hasTag("shadowbind_active"))
        ) {
          player.setDynamicProperty("dhh:mana", stats.currentMana - manaCost);
        }
      }

      let totalCooldownTicks = cooldown * 20;
      const guildName = getPlayerGuildName(player);
      if (guildName) {
        const guildData = getAllGuildsData()[guildName];
        const reduction = getGuildPerkValue(guildData, "cooldown_reduction", 0);
        totalCooldownTicks *= 1 - reduction;
      }

      if (
        [
          "SPRINT",
          "STEALTH",
          "WINTERS_DOMINION",
          "SHADOW_SWAP",
          "TIME_LOCK",
          "EARTHEN_GRAVE",
          "HELLFIRE_PIT",
          "REALITY_WARP",
        ].includes(activeSkillName)
      ) {
        let durationInSeconds = 0;
        if (activeSkillName === "SPRINT")
          durationInSeconds = 10 + skillLevel * 5;
        else if (activeSkillName === "STEALTH")
          durationInSeconds = 15 + skillLevel * 5 + stats.agility * 0.25;
        else if (
          activeSkillName === "WINTERS_DOMINION" &&
          !isDeactivatingDominion
        )
          durationInSeconds = 60 + (skillLevel - 1) * 30;
        else if (
          activeSkillName === "SHADOW_SWAP" &&
          !player.getDynamicProperty("dhh:shadow_location")
        )
          durationInSeconds = 30 + (skillLevel - 1) * 10;
        else if (activeSkillName === "TIME_LOCK")
          durationInSeconds = 10 + skillLevel * 5;
        else if (activeSkillName === "EARTHEN_GRAVE")
          durationInSeconds = 5 + skillLevel * 5;
        else if (activeSkillName === "HELLFIRE_PIT")
          durationInSeconds = 10 + skillLevel + 2;
        else if (activeSkillName === "REALITY_WARP") durationInSeconds = 15;
        totalCooldownTicks += Math.floor(durationInSeconds * 20);
      }

      player.setDynamicProperty(cdProp, now + totalCooldownTicks);
      if (cooldown > 0) {
        system.runTimeout(() => {
          if (player.isValid) {
            const translatedName =
              SKILL_TRANSLATIONS[activeSkillName.toLowerCase()] ||
              activeSkillName;
            if (
              system.currentTick >= (player.getDynamicProperty(cdProp) ?? 0)
            ) {
            }
          }
        }, totalCooldownTicks);
      }
    }
  } catch (error) {
    logError(`skill.${activeSkillName}`, player, error);
  }
}

async function showSkillSelectionMenu(player) {
  const stats = getPlayerStats(player);
  const playerClass = stats.class;

  const currentClassData = ALL_CLASSES[playerClass];
  if (!currentClassData) {
    return player.sendMessage(
      `§cBạn chưa học kỹ năng chủ động nào của nghề ${CLASS_TRANSLATIONS[playerClass]}!`
    );
  }
  const learnableSkillsForClass = currentClassData.skillTree;

  const learnedSkills = LEARNABLE_SKILLS.filter(
    (skill) =>
      stats.skills[skill.toLowerCase()] > 0 &&
      learnableSkillsForClass.includes(skill.toLowerCase())
  );

  if (learnedSkills.length === 0)
    return player.sendMessage(
      `§cBạn chưa học kỹ năng chủ động nào của nghề ${CLASS_TRANSLATIONS[playerClass]}!`
    );

  const form = new ActionFormData();
  form.title("§b§lCHỌN KỸ NĂNG");
  form.body("§fChọn một kỹ năng để trang bị cho Quyền Trượng.");
  learnedSkills.forEach((skillKey) => {
    const skillInternalName = skillKey.toLowerCase();
    const translatedName = SKILL_TRANSLATIONS[skillInternalName] || skillKey;
    form.button(translatedName);
  });

  const { canceled, selection } = await form.show(player);
  if (canceled) return;
  const selectedSkillKey = learnedSkills[selection];
  player.setDynamicProperty("dhh:active_skill", selectedSkillKey);

  const heldItem = player
    .getComponent("inventory")
    .container.getItem(player.selectedSlotIndex);
  const translatedName =
    SKILL_TRANSLATIONS[selectedSkillKey.toLowerCase()] || selectedSkillKey;

  if (
    heldItem?.typeId === "dhh:magic_staff" &&
    heldItem.nameTag.startsWith("§b§lQuyền Trượng")
  ) {
    heldItem.nameTag = `§b§lQuyền Trượng §r§7(Hiện tại: §e${translatedName}§7)`;
    player
      .getComponent("inventory")
      .container.setItem(player.selectedSlotIndex, heldItem);
  }

  player.sendMessage(`§aĐã trang bị kỹ năng: §e${translatedName}`);
  player.playSound("random.orb");
}

world.afterEvents.playerBreakBlock.subscribe((event) => {
  try {
    const { player, brokenBlockPermutation, block } = event;
    // --- BẮT ĐẦU PHẦN THÊM MỚI ---
// Tăng điểm hoạt động và kiểm tra bong gân
const currentExertion = player.getDynamicProperty("dhh:exertion_score") ?? 0;
player.setDynamicProperty("dhh:exertion_score", currentExertion + EXERTION_CONFIG.POINTS_PER_BLOCK_BREAK);
checkAndApplySprain(player);
// --- KẾT THÚC PHẦN THÊM MỚI ---
    checkBlockBreakTriggers(player, brokenBlockPermutation, block);
    updateGuildQuestProgress(
      player,
      "BREAK_BLOCK",
      brokenBlockPermutation.type.id
    );
    const heldItem = player
      .getComponent("inventory")
      ?.container.getItem(player.selectedSlotIndex);
    const hasSilkTouch = heldItem
      ?.getComponent("enchantments")
      ?.enchantments.some((e) => e.type.id === "silk_touch");
    if (hasSilkTouch) return;
    const blockId = brokenBlockPermutation.type.id;
    const xpGained = CONFIG.XP_SOURCES.BLOCK_BREAKS[blockId] ?? 0;
    if (xpGained > 0)
      grantXpAndLevelUpCheck(
        player,
        xpGained,
        `đào ${blockId.replace("minecraft:", "").replace(/_/g, " ")}`
      );
    shareXpWithNearbyGuildMembers(player, xpGained, "đào block");
  } catch (error) {
    logError("playerBreakBlock", event.player, error);
  }
  // --- LOGIC PHÁ CỔNG DỊCH CHUYỂN (CẢI TIẾN) ---
    try {
        const brokenBlockLocation = block.location;
        const allLinksData = getAllLinksData();
        let linkToDestroy = null;

        for (const owner in allLinksData) {
            for (const link of allLinksData[owner]) {
                const gateShape = [
                    { x: -1, y: 0, z: 0 }, { x: 1, y: 0, z: 0 },
                    { x: -1, y: 1, z: 0 }, { x: 1, y: 1, z: 0 },
                    { x: -1, y: 2, z: 0 }, { x: 1, y: 2, z: 0 },
                    { x: 0, y: 2, z: 0 }
                ];
                
                const checkGate = (gate) => {
                    if (!gate) return false;
                    const center = { x: Math.floor(gate.location.x), y: Math.floor(gate.location.y), z: Math.floor(gate.location.z) };
                    return gateShape.some(offset => 
                        Math.floor(brokenBlockLocation.x) === center.x + offset.x &&
                        Math.floor(brokenBlockLocation.y) === center.y + offset.y &&
                        Math.floor(brokenBlockLocation.z) === center.z + offset.z
                    );
                };

                if (checkGate(link.gateA) || checkGate(link.gateB)) {
                    linkToDestroy = link;
                    break;
                }
            }
            if (linkToDestroy) break;
        }

        if (linkToDestroy) {
            destroyLink(linkToDestroy.id);
            const ownerPlayer = world.getPlayers({ name: linkToDestroy.owner })[0];
            if(ownerPlayer) {
                ownerPlayer.sendMessage(`§c§l[Liên Kết Chiều Không] §rMột cặp cổng của bạn đã bị phá hủy!`);
                ownerPlayer.playSound("block.portal.trigger");
            }
            player.sendMessage(`§e§l[Cảnh Báo] §rBạn đã phá hủy một Cổng Dịch Chuyển!`);
        }
    } catch(e) {}
    // --- KẾT THÚC LOGIC PHÁ CỔNG ---
});

world.afterEvents.entityDie.subscribe((event) => {
  let player = undefined;
  const { deadEntity, damageSource } = event;
  if (!deadEntity?.isValid) return;
  if (deadEntity.typeId === "minecraft:player") {
    const deadPlayer = deadEntity;
    deadPlayer.setDynamicProperty("dhh:xp", 0);
    deadPlayer.setDynamicProperty("dhh:just_died", true);
    deadPlayer.sendMessage(
      "§c§lBạn đã gục ngã! Toàn bộ kinh nghiệm của cấp hiện tại đã bị xóa sạch!"
    );
    deadPlayer.playSound("entity.wither.hurt", { pitch: 0.8 });
    return;
  }
  if (deadEntity.getTags().some((tag) => tag.startsWith("challenge_mob_"))) {
    handleChallengeMobDeath(deadEntity);
  }
  try {
    if (deadEntity.hasTag("dhh_spirit_beast")) {
      const tags = deadEntity.getTags();
      const ownerTag = tags.find((tag) => tag.startsWith("owner:"));
      if (ownerTag) {
        const ownerName = ownerTag.substring(6);
        for (const owner of world.getAllPlayers()) {
          if (owner.nameTag === ownerName) {
            const cooldownSeconds = 60;
            owner.setDynamicProperty(
              "dhh:cd_summon_wolf",
              system.currentTick + cooldownSeconds * 20
            );
            if (
              owner.getDynamicProperty("dhh:active_pet_id") === deadEntity.id
            ) {
              owner.setDynamicProperty("dhh:active_pet_id", undefined);
            }
            owner.sendMessage(
              `§cLinh thú của bạn đã hy sinh! Bạn có thể triệu hồi lại sau ${cooldownSeconds} giây.`
            );
            owner.playSound("entity.wither.death");
            break;
          }
        }
      }
      return;
    }

    const killer = damageSource?.damagingEntity;
    if (killer?.typeId === "minecraft:player") {
      player = killer;
      checkEntityDieTriggers(player, deadEntity);
    } else if (killer?.hasTag("dhh_spirit_beast")) {
      const tags = killer.getTags();
      const ownerTag = tags.find((tag) => tag.startsWith("owner:"));
      if (ownerTag) {
        const ownerName = ownerTag.substring(6);
        for (const p of world.getAllPlayers()) {
          if (p.nameTag === ownerName) {
            player = p;
            break;
          }
        }
      }
    } else {
      const victimTags = deadEntity.getTags();
      const skillDamageTag = victimTags.find((tag) => tag.includes("_victim:"));
      if (skillDamageTag) {
        const parts = skillDamageTag.split(":");
        if (parts.length === 2) {
          const killerName = parts[1];
          for (const p of world.getAllPlayers()) {
            if (p.nameTag === killerName) {
              player = p;
              deadEntity.removeTag(skillDamageTag);
              break;
            }
          }
        }
      }
    }

    if (!player) return;
    try {
        updateStoryQuestProgress('KILL', player, deadEntity);
    } catch(e) { logError("StoryQuestKill", player, e); }

    // CÁC LOGIC CŨ ĐƯỢC ƯU TIÊN XỬ LÝ TRƯỚC
    updateQuestOnKill(player, deadEntity);
    updateGuildQuestProgress(player, "KILL", deadEntity.typeId);

    const entityId = deadEntity.typeId;
    const xpValue = CONFIG.XP_SOURCES.MOB_KILLS[entityId] ?? 0;

    if (xpValue > 0) {
      grantXpAndLevelUpCheck(
        player,
        xpValue,
        `giết ${entityId.replace("minecraft:", "").replace(/_/g, " ")}`
      );
      shareXpWithNearbyGuildMembers(player, xpValue, "giết mob");
    } else if (xpValue < 0) {
      revokeXp(
        player,
        -xpValue,
        `tấn công ${entityId.replace("minecraft:", "").replace(/_/g, " ")}`
      );
    }
    const rewardValue = CONFIG.MOB_KILL_REWARDS[deadEntity.typeId] ?? 0;
 // THAY THẾ KHỐI if (rewardValue !== 0) { ... } CŨ BẰNG KHỐI MỚI NÀY
let finalRewardValue = rewardValue;
const isBloodMoonActive = world.getDynamicProperty("dhh:is_blood_moon_active");
if (isBloodMoonActive && deadEntity.hasTag("blood_moon_mob")) { // Chỉ nhân đôi nếu là quái được buff
    finalRewardValue *= CONFIG.BLOOD_MOON_CONFIG.REWARD_MULTIPLIER;
}

if (finalRewardValue !== 0) {
    const currentNguyenThach = player.getDynamicProperty("dhh:nguyen_thach") ?? 0;
    player.setDynamicProperty("dhh:nguyen_thach", currentNguyenThach + finalRewardValue);
    if (finalRewardValue > 0) {
        player.sendMessage(`§d+${finalRewardValue} Nguyên Thạch ${isBloodMoonActive && deadEntity.hasTag("blood_moon_mob") ? "§c(Trăng Máu)" : ""}`);
    } else {
        player.sendMessage(`§c${finalRewardValue} Nguyên Thạch`);
    }
}
// KẾT THÚC PHẦN THAY THẾ
    // --- LOGIC NỘI TẠI CỦA PHÁP SƯ ĐƯỢC DI CHUYỂN XUỐNG ĐÂY ---
    const killerStats = getPlayerStats(player); // Lấy lại stats mới nhất sau khi có thể đã lên cấp
    if (killerStats.class === "mage") {
      const cfg = CONFIG.CLASS_PASSIVES.MAGE;
      const healthComp = player.getComponent("health");
      let healAmount = 0,
        manaAmount = 0;

      // Đổi điều kiện: Nâng cấp chỉ kích hoạt từ cấp 7 trở lên
      if (killerStats.level >= cfg.LEVEL_UNLOCKS.KILL_BONUS_UPGRADE) {
        healAmount = cfg.LVL3_KILL_HEAL;
        manaAmount = cfg.LVL3_KILL_MANA;
      } else {
        healAmount = cfg.LVL1_KILL_HEAL;
        manaAmount = cfg.LVL1_KILL_MANA;
      }

      if (healthComp) {
        healthComp.setCurrentValue(
          Math.min(
            healthComp.effectiveMax,
            healthComp.currentValue + healAmount
          )
        );
      }

      // Đọc trực tiếp mana hiện tại, cộng, rồi ghi lại
      const currentMana = player.getDynamicProperty("dhh:mana") ?? 0;
      player.setDynamicProperty(
        "dhh:mana",
        Math.min(killerStats.maxMana, currentMana + manaAmount)
      );
      const currentBaseMana = player.getDynamicProperty("dhh:base_mana") ?? 0;
      player.setDynamicProperty("dhh:base_mana", currentBaseMana + 0.5);
      player.dimension.spawnParticle("minecraft:end_rod", player.location);
    } else if (killerStats.class === "guardian") {
      const KILLS_PER_HEALTH = 20; // Số mob cần giết để tăng 1 máu
      const killCounterProp = "dhh:guardian_kill_counter";

      // Lấy số kill đã đếm được, nếu chưa có thì là 0
      let killCounter = player.getDynamicProperty(killCounterProp) ?? 0;
      killCounter++; // Tăng bộ đếm lên 1

      // Kiểm tra xem đã đủ 20 kill chưa
      if (killCounter >= KILLS_PER_HEALTH) {
        // Lấy máu cộng thêm hiện tại
        const currentBaseHealth =
          player.getDynamicProperty("dhh:base_health") ?? 0;
        // Cộng 1 máu tối đa vĩnh viễn
        player.setDynamicProperty("dhh:base_health", currentBaseHealth + 2);

        // Reset bộ đếm về 0
        killCounter = 0;

        // Thông báo cho người chơi
        player.sendMessage(
          "§c[Nội Tại Hộ Vệ] Sức chịu đựng của bạn đã được tôi luyện! §a(+2 Máu tối đa vĩnh viễn)"
        );
        player.playSound("random.levelup", { pitch: 0.8 });

        // Áp dụng lại buff ngay lập tức để thanh máu được cập nhật
        applyAllBonuses(player);
      }

      // Lưu lại bộ đếm mới
      player.setDynamicProperty(killCounterProp, killCounter);
    } else if (killerStats.class === "ranger") {
      // --- KHỐI CODE MỚI CỦA DU HIỆP NẰM Ở ĐÂY ---
      if (damageSource.cause === "projectile") {
        const KILLS_PER_SPEED_BOOST = 15;
        const SPEED_BONUS_PER_TRIGGER = 0.005;
        const killCounterProp = "dhh:ranger_kill_counter";

        let killCounter = player.getDynamicProperty(killCounterProp) ?? 0;
        killCounter++;

        if (killCounter >= KILLS_PER_SPEED_BOOST) {
          const currentBaseSpeed =
            player.getDynamicProperty("dhh:base_speed") ?? 0;
          player.setDynamicProperty(
            "dhh:base_speed",
            currentBaseSpeed + SPEED_BONUS_PER_TRIGGER
          );
          killCounter = 0;

          player.sendMessage(
            `§a[Nội Tại Du Hiệp] Kinh nghiệm săn bắn đã rèn luyện cho bạn sự nhanh nhẹn! §b(+0.5% Tốc độ vĩnh viễn)`
          );
          player.playSound("item.trident.riptide_1", {
            pitch: 2.0,
            volume: 0.7,
          });
          applyAllBonuses(player);
        }
        player.setDynamicProperty(killCounterProp, killCounter);
      }
    }
  } catch (error) {
    logError("entityDie", player, error);
  }
});

// THAY THẾ TOÀN BỘ HÀM NÀY
world.afterEvents.playerSpawn.subscribe((event) => {
  try {
    const { player, initialSpawn } = event;
    
    system.runTimeout(() => {
      // ✅ BƯỚC 1: Load dữ liệu trước (quan trọng nhất!)
      loadAndCachePlayerData(player);
      
      // ✅ BƯỚC 2: Khởi tạo mana SAU KHI LOAD
      const loadedStats = getPlayerStats(player);
      player.setDynamicProperty("dhh:mana", loadedStats.maxMana);
      
      // ✅ BƯỚC 3: Khởi tạo các biến hệ thống
      player.setDynamicProperty("dhh:wasSneaking", false);
      
      // 🆕 BƯỚC 4: ĐÁNH DẤU ĐÃ LOAD DATA XONG (QUAN TRỌNG!)
      player.setDynamicProperty("dhh:data_loaded", true);
      
      // 🆕 BƯỚC 5: RESET FLAG SURVIVAL để trigger validation lại
      player.setDynamicProperty("dhh:survival_initialized", false);
      
      // 🆕 BƯỚC 6: VALIDATE và FIX các giá trị survival nếu bị lỗi
      let temperature = player.getDynamicProperty("dhh:temperature");
      if (temperature === undefined || temperature === null || isNaN(temperature)) {
        console.warn(`[SURVIVAL FIX] ${player.nameTag} - Temperature invalid, resetting to ${CONFIG.SURVIVAL_CONFIG.TEMP_DEFAULT_TARGET}`);
        player.setDynamicProperty("dhh:temperature", CONFIG.SURVIVAL_CONFIG.TEMP_DEFAULT_TARGET);
      }
      
      let thirst = player.getDynamicProperty("dhh:thirst");
      if (thirst === undefined || thirst === null || isNaN(thirst)) {
        console.warn(`[SURVIVAL FIX] ${player.nameTag} - Thirst invalid, resetting to 100`);
        player.setDynamicProperty("dhh:thirst", 100);
      }
      
      let exertion = player.getDynamicProperty("dhh:exertion_score");
      if (exertion === undefined || exertion === null || isNaN(exertion)) {
        player.setDynamicProperty("dhh:exertion_score", 0);
      }
      
      // ✅ DEBUG: Kiểm tra giá trị sau khi load
      if (!initialSpawn) {
        console.warn(`[RESPAWN DEBUG] ${player.nameTag}:`);
        console.warn(`  - Level: ${loadedStats.level}`);
        console.warn(`  - Base Health: ${player.getDynamicProperty("dhh:base_health")}`);
        console.warn(`  - Temperature: ${player.getDynamicProperty("dhh:temperature")}`);
        console.warn(`  - Thirst: ${player.getDynamicProperty("dhh:thirst")}`);
        console.warn(`  - Data Loaded Flag: ${player.getDynamicProperty("dhh:data_loaded")}`);
        console.warn(`  - Survival Init Flag: ${player.getDynamicProperty("dhh:survival_initialized")}`);
        console.warn(`  - Survival Tags: ${player.getTags().filter(t => 
          ['broken_leg', 'bleeding', 'burned', 'fever', 'cold', 'parasite', 'virus_stage1', 'virus_stage2', 'virus_stage3'].includes(t)
        ).join(', ') || 'None'}`);
      }

      // ✅ BƯỚC 7: Kiểm tra class selection
      if ((player.getDynamicProperty("dhh:class") ?? "none") === "none") {
        showClassSelectionMenu(player);
      }
grantDailyReward(player);
      // ✅ BƯỚC 8: Xử lý first join
      if (initialSpawn) {

        logDebug(`Initializing dhh system for new player ${player.nameTag}`);
        saveAllPlayerData(player);
        player.sendMessage("§l§a=== Chào mừng đến với dhh System! ===");
        player.sendMessage("§eGiết quái vật để nhận XP và lên cấp.");
        player.sendMessage(
          "§dDùng Sổ Tay dhh hoặc lệnh §l/scriptevent dhh:menu §r§dđể xem thông tin."
        );
        system.runTimeout(() => giveInitialdhhItems(player), 60);
        checkAndRotateBanner();
             player.setDynamicProperty("dhh:story_quest_id", "CHAPTER_1_QUEST_1");
        player.setDynamicProperty("dhh:story_quest_step", 0);
        player.setDynamicProperty("dhh:story_kill_count", 0); // Khởi tạo biến đếm
        
        system.runTimeout(() => {
            if (player.isValid) {
                player.sendMessage("§d[Cốt Truyện] Một giọng nói bí ẩn vang lên trong đầu bạn... Hãy mở Sổ Tay Menu để lắng nghe.");
                player.playSound("ambient.cave", { pitch: 1.5 });
            }
        }, 20 * 300); // Gửi tin nhắn sau 15 giây
      }

      // ✅ BƯỚC 9: Áp dụng buff (PHẢI Ở CUỐI!)
      system.runTimeout(() => {
        if (player.isValid) {
          applyAllBonuses(player);
          
          const healthComp = player.getComponent("health");
          if (healthComp && !initialSpawn) {
            console.warn(`[BUFF DEBUG] ${player.nameTag} Max Health: ${healthComp.effectiveMax}`);
          }
        }
      }, 10);
      
      // ✅ BƯỚC 10: Tip cho người chơi respawn
      if (!initialSpawn) {
        system.runTimeout(() => {
          if (player.isValid) {
            triggerSarcasticTip(player, "GENERIC_FAILURE");
          }
        }, 40);
      }
      
    }, 20);
    
  } catch (error) {
    logError("playerSpawn", event.player, error);
  }
});
function giveAllSeeingEye(player) {
  const eyeItem = new ItemStack("minecraft:ender_eye", 1);
  eyeItem.nameTag = "§d§lCon Mắt Minh Triết";
  eyeItem.setLore([
    "§7Hãy nhìn vào thế giới và dùng ta...",
    "§8Tạo tác Cổ đại",
    "§§all_seeing_eye",
  ]);
  const inventory = player.getComponent("inventory")?.container;
  if (inventory) {
    inventory.addItem(eyeItem);
    player.sendMessage(
      "§d§l[Tạo Tác Cổ Đại] §r§7Một cuốn sách huyền bí vừa xuất hiện trong tay ngươi."
    );
    player.playSound("block.enchantment_table.use");
  }
}
system.afterEvents.scriptEventReceive.subscribe((event) => {
  const { id, sourceEntity: player } = event;
  if (player?.typeId !== "minecraft:player") return;

  if (id === "dhh:menu") {
    system.run(() => showStatsMenu(player));
  } else if (id === "dhh:get_eye") {
    giveAllSeeingEye(player);
  }
});

world.afterEvents.itemUse.subscribe((event) => {
  try {
    handlePlayerItemUse(event); 
    const { itemStack, source: player } = event;
    if (player.typeId !== "minecraft:player") return;

    checkItemUseTriggers(player, itemStack);

    const breedingItems = [
      "minecraft:wheat",
      "minecraft:carrot",
      "minecraft:potato",
      "minecraft:beetroot",
      "minecraft:wheat_seeds",
    ];
    if (breedingItems.includes(itemStack.typeId)) {
      const entityRaycast = player.getEntitiesFromViewDirection({
        maxDistance: 8,
      });
      if (entityRaycast.length > 0) {
        const entity = entityRaycast[0].entity;
        lastPlayerToFeed.set(entity.id, player.nameTag);
        system.runTimeout(() => {
          if (lastPlayerToFeed.get(entity.id) === player.nameTag) {
            lastPlayerToFeed.delete(entity.id);
          }
        }, 250);
      }
    }
    handleWerewolfItemUse(event);
  } catch (error) {
    logError("itemUse", event.source, error);
  }
});
world.afterEvents.itemCompleteUse.subscribe((event) => {
    handlePlayerItemConsume(event);
});
world.afterEvents.entitySpawn.subscribe((event) => {
  const { entity } = event;
   // --- THÊM ĐOẠN CODE NÀY VÀO ĐÂY ---
    try {
        const isBloodMoonActive = world.getDynamicProperty("dhh:is_blood_moon_active");
        if (isBloodMoonActive && entity.hasComponent('health') && !entity.hasComponent('player')) {
             const isMonster = entity.hasComponent("minecraft:is_monster");
             if (isMonster) {
                const effects = CONFIG.BLOOD_MOON_CONFIG.EFFECTS;
                entity.addTag("blood_moon_mob");
                if (effects.SPEED) entity.addEffect("speed", effects.SPEED.duration, { amplifier: effects.SPEED.amplifier, showParticles: false });
                if (effects.STRENGTH) entity.addEffect("strength", effects.STRENGTH.duration, { amplifier: effects.STRENGTH.amplifier, showParticles: false });
                if (effects.HEALTH_BOOST) {
    entity.addEffect("health_boost", effects.HEALTH_BOOST.duration, { amplifier: effects.HEALTH_BOOST.amplifier, showParticles: false });
}
             }
        }
    } catch (e) {
        console.warn(`[Blood Moon] Lỗi khi buff quái vật: ${e}`);
    }
    // --- KẾT THÚC PHẦN THÊM ---
  checkEntitySpawnTriggers(entity);
  try {
    if (entity.getComponent("minecraft:is_baby")) {
      const parentQuery = {
        location: entity.location,
        maxDistance: 5,
        type: entity.typeId,
      };
      const nearbyAdults = entity.dimension.getEntities(parentQuery);
      for (const adult of nearbyAdults) {
        if (lastPlayerToFeed.has(adult.id)) {
          const playerName = lastPlayerToFeed.get(adult.id);
          const player = world.getPlayers({ name: playerName })[0];
          if (player) {
            updateQuestOnBreed(player, entity);
            updateGuildQuestProgress(player, "BREED", entity.typeId);
            lastPlayerToFeed.delete(adult.id);
            return;
          }
        }
      }
    }
  } catch (e) {}
});
/**
 * Lắng nghe sự kiện sau khi một hiệu ứng được thêm vào thực thể.
 * Dùng để xử lý việc hồi đầy máu cho quái Trăng Máu một cách đáng tin cậy.
 */
world.afterEvents.effectAdd.subscribe((event) => {
    const { entity, effect } = event;
    
    // Chỉ xử lý khi hiệu ứng là 'health_boost' và thực thể là quái Trăng Máu
    if (effect.typeId === 'health_boost' && entity.hasTag('blood_moon_mob')) {
        try {
            if (entity.isValid) {
                // Bây giờ game đã chắc chắn cập nhật máu tối đa mới, ta có thể hồi đầy.
                const healthComponent = entity.getComponent('health');
                if (healthComponent) {
                    healthComponent.resetToMaxValue();
                }
            }
        } catch (e) {
            console.warn(`[Blood Moon] Lỗi khi hồi máu cho quái: ${e}`);
        }
    }
}, {
    // Tùy chọn này giúp tối ưu, để script chỉ lắng nghe hiệu ứng health_boost
    effectTypes: ["health_boost"]
});
world.afterEvents.entityHurt.subscribe((event) => {
  const { hurtEntity, damageSource, damage } = event;
  if (activeWerewolfGames.size > 0) {
    const game = Array.from(activeWerewolfGames.values())[0];
    if (
      hurtEntity.typeId === "minecraft:player" &&
      damageSource.damagingEntity?.typeId === "minecraft:player"
    ) {
      const attacker = damageSource.damagingEntity;
      const attackerInGame = game.players.has(attacker.nameTag);
      const victimInGame = game.players.has(hurtEntity.nameTag);

      if (attackerInGame && victimInGame) {
        if (game.gameType === "hunt") {
          const attackerData = game.players.get(attacker.nameTag);
          const victimData = game.players.get(hurtEntity.nameTag);
          if (
            !(
              attackerData?.role === "Sói Săn Mồi" &&
              victimData?.role === "Dân Sinh Tồn" &&
              game.isWolfTransformed
            )
          ) {
            const health = hurtEntity.getComponent("health");
            if (health) health.setCurrentValue(health.currentValue + damage);
          }
        } else {
          const health = hurtEntity.getComponent("health");
          if (health) health.setCurrentValue(health.currentValue + damage);
        }
      }
    }
  }
  handleWerewolfEntityHurt(event);
handlePlayerInjury(event);
  try {
    const { hurtEntity, damageSource, damage } = event;
    const attacker = damageSource.damagingEntity;

    // --- LOGIC CHO NGƯỜI BỊ TẤN CÔNG (HỘ VỆ) ---
    if (hurtEntity.typeId === "minecraft:player") {
      const player = hurtEntity;
      const playerStats = getPlayerStats(player);

      if (playerStats.class === "guardian") {
        const cfg = CONFIG.CLASS_PASSIVES.GUARDIAN;
        let chance = 0;
        if (playerStats.level >= 7) chance = cfg.LVL7_CHANCE;
        else if (playerStats.level >= 3) chance = cfg.LVL3_CHANCE;
        else if (playerStats.level >= 1) chance = cfg.LVL1_CHANCE;

        if (Math.random() < chance) {
          const healthComp = player.getComponent("health");
          if (healthComp) {
            // Hồi máu trực tiếp
            healthComp.setCurrentValue(
              Math.min(
                healthComp.effectiveMax,
                healthComp.currentValue + damage * cfg.HEAL_PERCENT
              )
            );

            player.onScreenDisplay.setActionBar(
              "§a§lNội tại [Lì Đòn] đã kích hoạt!"
            );
            player.playSound("random.orb", { pitch: 0.8 });

            // --- BẮT ĐẦU LOGIC NỘI TẠI CẤP 5: "CHẤN ĐỘNG PHỤC HẬN" ---
            if (playerStats.level >= 5) {
              // Chỉ kích hoạt từ cấp 5 trở lên
              const knockbackRadius = 4; // Bán kính đẩy lùi
              const knockbackStrength = 2; // Lực đẩy
              const playerLoc = player.location;
              const dimension = player.dimension;

              // Tìm tất cả kẻ địch trong phạm vi
              const nearbyMonsters = dimension.getEntities({
                location: playerLoc,
                maxDistance: knockbackRadius,
                families: ["monster"],
                excludeTypes: [player.typeId],
              });

              // Tạo hiệu ứng hình ảnh
              dimension.spawnParticle(
                "minecraft:knockback_roar_particle",
                playerLoc
              );
              player.playSound("mob.irongolem.throw", { pitch: 1.2 });

              // Áp dụng lực đẩy cho từng kẻ địch
              for (const monster of nearbyMonsters) {
                try {
                  const pushVector = Vector.subtract(
                    monster.location,
                    playerLoc
                  );
                  const normalized = Vector.normalize(pushVector);
                  monster.applyImpulse({
                    x: normalized.x * knockbackStrength,
                    y: 0.25, // Hất lên một chút
                    z: normalized.z * knockbackStrength,
                  });
                } catch (e) {
                  // Bỏ qua lỗi nếu không thể áp dụng lực lên thực thể
                }
              }
            }
          }
        }
      }
    }

    // --- LOGIC CHO NGƯỜI TẤN CÔNG (PHÁP SƯ & DU HIỆP) ---
    if (attacker && attacker.typeId === "minecraft:player") {
      // --- BẮT ĐẦU PHẦN THÊM MỚI ---
// Tăng điểm hoạt động và kiểm tra bong gân
const currentExertion = attacker.getDynamicProperty("dhh:exertion_score") ?? 0;
attacker.setDynamicProperty("dhh:exertion_score", currentExertion + EXERTION_CONFIG.POINTS_PER_ATTACK);
checkAndApplySprain(attacker);
// --- KẾT THÚC PHẦN THÊM MỚI ---
      const player = attacker;
      const playerStats = getPlayerStats(player);

      // --- NỘI TẠI DU HIỆP (TÍCH ĐIỂM) ---
      if (
        playerStats.class === "ranger" &&
        damageSource.cause === "projectile"
      ) {
        const cfg = CONFIG.CLASS_PASSIVES.RANGER;
        const maxStacks =
          playerStats.level >= cfg.LEVEL_UNLOCKS.STACK_UPGRADE
            ? cfg.MAX_STACKS_LVL7
            : cfg.MAX_STACKS_LVL1;
        let currentStacks =
          player.getDynamicProperty("dhh:ranger_buff_stacks") ?? 0;
        if (currentStacks < maxStacks) currentStacks++;
        player.setDynamicProperty("dhh:ranger_buff_stacks", currentStacks);
        player.setDynamicProperty(
          "dhh:ranger_buff_expire_tick",
          system.currentTick + cfg.BUFF_DURATION * 20
        );

        // Nội tại Mũi Tên Độc
        if (
          playerStats.level >= cfg.LEVEL_UNLOCKS.POISON_ARROW &&
          Math.random() < cfg.POISON_CHANCE
        ) {
          hurtEntity.addEffect("poison", cfg.POISON_DURATION * 20, {
            amplifier: cfg.POISON_AMPLIFIER,
          });
        }
      }

      // --- NỘI TẠI PHÁP SƯ (BÙNG NỔ & QUÁ TẢI) ---
      if (
        playerStats.class === "mage" &&
        (damageSource.cause === "magic" ||
          damageSource.cause === "entityAttack")
      ) {
        const cfg = CONFIG.CLASS_PASSIVES.MAGE;
        const healthComp = player.getComponent("health");

        // --- NỘI TẠI MỚI CẤP 3: MA LỰC CỘNG HƯỞNG ---
        if (
          playerStats.level >= cfg.LEVEL_UNLOCKS.MANA_ECHO &&
          !hurtEntity.hasTag("mana_echo_applied_this_tick")
        ) {
          hurtEntity.addTag("mana_echo_applied_this_tick");
hurtEntity.addTag(`passive_damage_victim:${player.nameTag}`); 
  
        const pvpMultiplier = hurtEntity.typeId === 'minecraft:player' ? 0.1 : 1.0;
const extraDamage = damage * (playerStats.maxMana/4/ 100) * pvpMultiplier; // ÁP DỤNG HỆ SỐ

          // Kích hoạt sau 0.5 giây (10 ticks)
          system.runTimeout(() => {
            if (player.isValid && hurtEntity.isValid) {
              hurtEntity.applyDamage(extraDamage, {
                causingEntity: player,
                cause: "magic",
              });

              // Hiệu ứng hình ảnh và âm thanh
              hurtEntity.dimension.spawnParticle(
                "minecraft:end_rod",
                hurtEntity.getHeadLocation()
              );
              player.playSound("random.orb", { pitch: 1.8, volume: 0.7 });
            }

            if (hurtEntity.isValid) {
              hurtEntity.removeTag("mana_echo_applied_this_tick");
             
            }
          }, 10);
        }

        const cooldownProp = "dhh:passive_burst_cooldown";
        const lastUsedTick = player.getDynamicProperty(cooldownProp) ?? 0;

        // Nội tại Bùng Nổ Ma Lực (Cấp 5)
        if (
          playerStats.level >= cfg.LEVEL_UNLOCKS.BONUS_DAMAGE &&
          healthComp &&
          healthComp.currentValue >= healthComp.effectiveMax &&
          system.currentTick > lastUsedTick &&
          !hurtEntity.hasTag("burst_applied_this_tick")
        ) {
          hurtEntity.addTag("burst_applied_this_tick");
          hurtEntity.addTag(`passive_damage_victim:${player.nameTag}`); 
        const pvpMultiplier = hurtEntity.typeId === 'minecraft:player' ? 0.1 : 1.0;
const extraDamage = playerStats.maxMana * cfg.BONUS_DAMAGE_MANA_RATIO * pvpMultiplier; // ÁP DỤNG HỆ SỐ
          system.runTimeout(() => {
            if (player.isValid && hurtEntity.isValid) {
              hurtEntity.applyDamage(extraDamage, {
                causingEntity: player,
                cause: "magic",
                bypassingArmor: true,
              });
              hurtEntity.dimension.spawnParticle(
                "minecraft:totem_particle",
                hurtEntity.getHeadLocation()
              );
              player.playSound("random.orb", { pitch: 1.5 });
            }
            if (hurtEntity.isValid)
              hurtEntity.removeTag("burst_applied_this_tick");
    
          }, 10); // Chờ 0.5 giây
          player.setDynamicProperty(
            cooldownProp,
            system.currentTick + cfg.BONUS_DAMAGE_COOLDOWN * 20
          );
        }

        // Nội tại Quá Tải Năng Lượng (Cấp 10)
        if (
          playerStats.level >= cfg.LEVEL_UNLOCKS.OVERLOAD &&
          playerStats.currentMana >= playerStats.maxMana &&
          !hurtEntity.hasTag("overload_applied_this_tick")
        ) {
          hurtEntity.addTag("overload_applied_this_tick");
          const aoeDamage = playerStats.maxMana * cfg.OVERLOAD_AOE_MANA_RATIO;
          const aoeRadius = 3;
          system.runTimeout(() => {
            if (hurtEntity.isValid) {
              hurtEntity.dimension.spawnParticle(
                "minecraft:sonic_explosion",
                hurtEntity.location
              );
              const nearbyEntities = hurtEntity.dimension.getEntities({
                location: hurtEntity.location,
                maxDistance: aoeRadius,
                excludeTypes: ["minecraft:player"],
              });
              for (const entity of nearbyEntities) {
                if (entity.id !== hurtEntity.id) {
                  entity.applyDamage(aoeDamage, {
                    causingEntity: player,
                    cause: "magic",
                  });
                }
              }
            }
            if (hurtEntity.isValid)
              hurtEntity.removeTag("overload_applied_this_tick");
          }, 1);
        }
      }
    }
  } catch (e) {
    logError("ClassPassives_EntityHurt", event.hurtEntity, e);
  }

  checkEntityHurtTriggers(event);
  try {
    const { hurtEntity, damageSource, damage } = event;

    if (
      hurtEntity.typeId === "minecraft:player" &&
      hurtEntity.hasTag("life_link_active")
    ) {
      const target = hurtEntity;
      const casterName = target.getDynamicProperty("dhh:life_link_caster");

      if (!casterName) return;

      const caster = world.getPlayers({ name: casterName })[0];

      if (!caster || !caster.isValid || !caster.hasTag("life_link_active")) {
        endLifeLink(
          caster,
          target,
          "§cLiên kết sinh mệnh bị ngắt do người bảo vệ đã rời đi."
        );
        return;
      }

      const healthCompCaster = caster.getComponent(EntityComponentTypes.Health);

      if (
        healthCompCaster.currentValue / healthCompCaster.effectiveMax <=
        0.2
      ) {
        endLifeLink(
          caster,
          target,
          "§cLiên kết tự động hủy do máu của bạn xuống dưới 20%!"
        );
        return;
      }

      const damageTransferPercent =
        caster.getDynamicProperty("dhh:life_link_transfer_percent") ?? 1.0;
      const damageToTransfer = damage * damageTransferPercent;

      const healthCompTarget = target.getComponent(EntityComponentTypes.Health);
      if (healthCompTarget) {
        healthCompTarget.setCurrentValue(
          healthCompTarget.currentValue + damage
        );
      }

      caster.applyDamage(damageToTransfer, {
        cause: "magic",
        damagingEntity: damageSource.damagingEntity,
      });

      caster.onScreenDisplay.setActionBar(
        `§cBạn đã nhận §l${damageToTransfer.toFixed(1)}§c ST thay cho §f${
          target.nameTag
        }`
      );
      caster.dimension.spawnParticle(
        "minecraft:damage_heart_particle",
        caster.getHeadLocation()
      );
      target.playSound("random.pop", { volume: 0.5, pitch: 1.5 });
    }
  } catch (e) {
    console.warn(`[Life Link Error] ${e}`);
  }
  // --- KẾT THÚC KHỐI CODE CẦN THÊM ---
  try {
    const { hurtEntity } = event;
    // Chỉ xử lý khi thực thể bị thương là một người chơi
    if (hurtEntity.typeId === "minecraft:player") {
      const hurtPlayer = hurtEntity;
      const guildName = getPlayerGuildName(hurtPlayer);

      // Nếu người chơi không có bang hội thì bỏ qua
      if (!guildName) return;

      const healthComp = hurtPlayer.getComponent("health");
      if (!healthComp) return;

      const healthPercent = healthComp.currentValue / healthComp.effectiveMax;
      const LOW_HEALTH_THRESHOLD = 0.4; // 40% máu
      const ALERT_COOLDOWN_SECONDS = 15;

      // Kiểm tra xem máu có dưới ngưỡng nguy hiểm không
      if (healthPercent < LOW_HEALTH_THRESHOLD) {
        const cooldownProp = "dhh:guild_alert_cooldown";
        const lastAlertTick = hurtPlayer.getDynamicProperty(cooldownProp) ?? 0;

        // Kiểm tra xem đã hết thời gian hồi chiêu chưa
        if (system.currentTick > lastAlertTick) {
          const allGuilds = getAllGuildsData();
          const guildData = allGuilds[guildName];
          if (!guildData) return;

          // Gửi cảnh báo đến TẤT CẢ thành viên khác trong bang
          for (const memberName in guildData.members) {
            // Bỏ qua chính người đang gặp nguy hiểm
            if (memberName === hurtPlayer.nameTag) continue;

            const member = world.getPlayers({ name: memberName })[0];
            if (member) {
              // Chỉ gửi cho người đang online
              member.onScreenDisplay.setTitle("§c§l[Báo Động Bang Hội]", {
                subtitle: `§e${hurtPlayer.nameTag}§c đang gặp nguy hiểm!`,
                fadeInDuration: 10,
                stayDuration: 60, // Hiển thị trong 3 giây
                fadeOutDuration: 20,
              });
              member.playSound("note.pling", { pitch: 0.5, volume: 1.0 });
            }
          }

          // Đặt lại thời gian hồi chiêu cho người chơi vừa kích hoạt cảnh báo
          hurtPlayer.setDynamicProperty(
            cooldownProp,
            system.currentTick + ALERT_COOLDOWN_SECONDS * 20
          );
        }
      }
    }
  } catch (e) {
    logError("GuildLowHealthAlert", event.hurtEntity, e);
  }
  const player = damageSource.damagingEntity;
  if (
    !player ||
    player.typeId !== "minecraft:player" ||
    damageSource.cause !== "entityAttack"
  ) {
    return;
  }

  try {
    const stats = getPlayerStats(player);
    if (player.getDynamicProperty("dhh:stealth_ready") === true) {
      player.setDynamicProperty("dhh:stealth_ready", false);
      player.removeEffect("invisibility");
      const skillLevel = stats.skills.stealth ?? 1;
      const bonusDamageMultiplier = 1 + skillLevel * 0.15;
      const bonusDamage = damage * bonusDamageMultiplier;

      hurtEntity.applyDamage(bonusDamage, {
        causingEntity: player,
        cause: "entityAttack",
      });

      const targetDimension = hurtEntity.dimension;
      const targetLocation = hurtEntity.location;

      const explosionRadius = 2 + skillLevel * 0.5;

      targetDimension.createExplosion(targetLocation, explosionRadius, {
        breaksBlocks: false,
        causesFire: true,
        source: player,
      });

      targetDimension.spawnParticle(
        "minecraft:huge_explosion_emitter",
        targetLocation
      );
      player.playSound("random.explode", { pitch: 1.2 });
      const victims = targetDimension.getEntities({
        location: targetLocation,
        maxDistance: explosionRadius,
      });

      for (const entity of victims) {
        if (entity.id === player.id) continue;

        try {
          entity.addEffect("slowness", 100, {
            amplifier: 225,
            showParticles: true,
          });
          entity.addEffect("blindness", 100, {
            amplifier: 0,
            showParticles: true,
          });
        } catch (e) {}
      }
      player.sendMessage("§c§lĐòn Nổ Bóng Tối!");
      player.addEffect("resistance", 40, {
        amplifier: 0,
        showParticles: false,
      });
      return;
    }
  } catch (error) {
    logError("entityHurt (Damage Calculation)", player, error);
  }
});

system.runInterval(() => {
  handleBloodMoonCycle();
  handleNightCycleEvents();
  
  world.getAllPlayers().forEach(player => {
      // 🆕 KIỂM TRA XEM PLAYER ĐÃ LOAD DATA CHƯA
      const dataLoaded = player.getDynamicProperty("dhh:data_loaded");
      
      if (!dataLoaded) {
          // Chưa load xong → SKIP frame này
          return;
      }
      
      // 🆕 CHỈ KHỞI TẠO 1 LẦN SAU KHI DATA LOADED
      if (!player.getDynamicProperty("dhh:survival_initialized")) {
          player.setDynamicProperty("dhh:survival_initialized", true);
          
          // Validate lại các giá trị survival (double-check)
          if (player.getDynamicProperty("dhh:temperature") === undefined || 
              player.getDynamicProperty("dhh:temperature") === null) {
              player.setDynamicProperty("dhh:temperature", CONFIG.SURVIVAL_CONFIG.TEMP_DEFAULT_TARGET);
              console.warn(`[RUNINTERVAL FIX] ${player.nameTag} - Temperature was undefined, reset to default`);
          }
          
          if (player.getDynamicProperty("dhh:thirst") === undefined || 
              player.getDynamicProperty("dhh:thirst") === null) {
              player.setDynamicProperty("dhh:thirst", 100);
              console.warn(`[RUNINTERVAL FIX] ${player.nameTag} - Thirst was undefined, reset to 100`);
          }
          
          if (player.getDynamicProperty("dhh:exertion_score") === undefined || 
              player.getDynamicProperty("dhh:exertion_score") === null) {
              player.setDynamicProperty("dhh:exertion_score", 0);
          }
          
          console.warn(`[SURVIVAL INIT] ${player.nameTag} - Survival system initialized in runInterval`);
      }
      
      handleAllSurvivalSystems(player);
         try {
            const questId = player.getDynamicProperty("dhh:story_quest_id");
            if (questId) {
                const questStep = player.getDynamicProperty("dhh:story_quest_step") ?? 0;
                const questData = CONFIG.STORY_QUESTS[questId];
                if (questData) {
                    const stepData = questData.steps[questStep];
                    if (stepData && (stepData.type === "EXPLORE" || stepData.type.includes("COLLECT"))) {
                         if (checkStepCompletion(player, stepData)) {
                            const notifiedKey = `dhh:story_notified_${questId}_${questStep}`;
                            if (!player.getDynamicProperty(notifiedKey)) {
                                 player.setDynamicProperty(notifiedKey, true);
                                 player.playSound("random.orb");
                                 player.sendMessage("§a[Cốt Truyện] Đã hoàn thành mục tiêu! Hãy vào menu để tiếp tục.");
                            }
                        }
                    }
                }
            }checkTutorialProgress(player);
        } catch (e) { logError("StoryQuestEngine", player, e); }
  });
 
  runLightweightPeriodicChecks();
  if (system.currentTick % 100 === 0) checkAndRotateBanner();

  world.getAllPlayers().forEach((player) => {
    try {
      if (player.getGameMode() === GameMode.Spectator) return;
      if ((player.getDynamicProperty("dhh:class") ?? "none") === "none") return;
      if (system.currentTick % 100 === 0) {
        checkAndRestoreEffects(player);
      }
      let stats = getPlayerStats(player);
      try {
        const playerClass = stats.class;

        // --- LOGIC NỘI TẠI HỘ VỆ (GIÁP HUYẾT TINH) ---
        if (
          playerClass === "guardian" &&
          stats.level >= CONFIG.CLASS_PASSIVES.GUARDIAN.LEVEL_UNLOCKS.ABSORPTION
        ) {
          const cfg = CONFIG.CLASS_PASSIVES.GUARDIAN;
          const healthComp = player.getComponent("health");
          const cooldownProp = "dhh:passive_absorb_cooldown";
          const lastUsedTick = player.getDynamicProperty(cooldownProp) ?? 0;

          if (
            healthComp &&
            healthComp.currentValue / healthComp.effectiveMax <
              cfg.LOW_HEALTH_THRESHOLD &&
            system.currentTick > lastUsedTick
          ) {
            player.addEffect("absorption", cfg.ABSORPTION_DURATION * 20, {
              amplifier: cfg.ABSORPTION_AMPLIFIER,
              showParticles: true,
            });
            player.playSound("item.trident.return");
            player.setDynamicProperty(
              cooldownProp,
              system.currentTick + cfg.ABSORPTION_COOLDOWN * 20
            );
          }
        }

        // --- LOGIC NỘI TẠI PHÁP SƯ (HỒI MANA) ---
        if (stats.currentMana < stats.maxMana && playerClass === "mage") {
          const cfg = CONFIG.CLASS_PASSIVES.MAGE;
          // Bỏ điều kiện nâng cấp ở cấp 7, chỉ dùng bonus cơ bản
          player.setDynamicProperty(
            "dhh:mana",
            Math.min(
              stats.maxMana,
              stats.currentMana +
                CONFIG.MANA_REGEN_RATE * cfg.LVL1_MANA_REGEN_BONUS
            )
          );
        } else if (stats.currentMana < stats.maxMana) {
          // Logic hồi mana gốc cho các class còn lại
          player.setDynamicProperty(
            "dhh:mana",
            Math.min(stats.currentMana + CONFIG.MANA_REGEN_RATE, stats.maxMana)
          );
        }

        // --- LOGIC NỘI TẠI DU HIỆP (QUẢN LÝ BUFF & GIÓ LƯỚT) ---
        if (playerClass === "ranger") {
          const cfg = CONFIG.CLASS_PASSIVES.RANGER;
          let currentStacks =
            player.getDynamicProperty("dhh:ranger_buff_stacks") ?? 0;
          const expireTick =
            player.getDynamicProperty("dhh:ranger_buff_expire_tick") ?? 0;

          if (currentStacks > 0 && system.currentTick > expireTick) {
            currentStacks = 0;
            player.setDynamicProperty("dhh:ranger_buff_stacks", 0);
            player.onScreenDisplay.setActionBar(
              "§7Nội tại [Thợ Săn] đã hết hạn."
            );
            player.playSound("random.fizz");
          }

          const passiveSpeedAmp = currentStacks > 0 ? currentStacks - 1 : -1;
          const passiveJumpAmp =
            stats.level >= cfg.LEVEL_UNLOCKS.JUMP_BOOST && currentStacks > 0
              ? currentStacks - 1
              : -1;

          const currentSpeedEffect = player.getEffect("speed");
          const currentSpeedAmp = currentSpeedEffect
            ? currentSpeedEffect.amplifier
            : -1;
          if (passiveSpeedAmp > currentSpeedAmp) {
            player.addEffect("speed", (cfg.BUFF_DURATION + 2) * 20, {
              amplifier: passiveSpeedAmp,
              showParticles: false,
            });
          } else if (
            passiveSpeedAmp === -1 &&
            currentSpeedEffect &&
            currentSpeedEffect.duration < (cfg.BUFF_DURATION + 5) * 20
          ) {
            player.removeEffect("speed");
          }

          const currentJumpEffect = player.getEffect("jump_boost");
          const currentJumpAmp = currentJumpEffect
            ? currentJumpEffect.amplifier
            : -1;
          if (passiveJumpAmp > currentJumpAmp) {
            player.addEffect("jump_boost", (cfg.BUFF_DURATION + 2) * 20, {
              amplifier: passiveJumpAmp,
              showParticles: false,
            });
          } else if (
            passiveJumpAmp === -1 &&
            currentJumpEffect &&
            currentJumpEffect.duration < (cfg.BUFF_DURATION + 5) * 20
          ) {
            player.removeEffect("jump_boost");
          }

          if (currentStacks > 0) {
            const maxStacks =
              stats.level >= cfg.LEVEL_UNLOCKS.STACK_UPGRADE
                ? cfg.MAX_STACKS_LVL7
                : cfg.MAX_STACKS_LVL1;
            player.onScreenDisplay.setActionBar(
              `§a§lNội tại [Thợ Săn]: §fTầng ${currentStacks}/${maxStacks}`
            );
          }

          // Gió Lướt
          if (
            stats.level >= cfg.LEVEL_UNLOCKS.WIND_DASH &&
            player.isJumping &&
            currentStacks > 0
          ) {
            if (!player.hasTag("wind_dash_on_cooldown")) {
              player.applyImpulse(
                Vector.multiply(
                  player.getViewDirection(),
                  cfg.WIND_DASH_IMPULSE
                )
              );
              player.playSound("item.trident.riptide_1", {
                volume: 0.5,
                pitch: 1.5,
              });
              player.addTag("wind_dash_on_cooldown");
              system.runTimeout(
                () => player.removeTag("wind_dash_on_cooldown"),
                20
              ); // Cooldown 1 giây
            }
          }
        }
      } catch (e) {
        logError("ClassPassives_RunInterval", player, e);
      }

      const dashSkillLevel = player.getDynamicProperty("dhh:skill_dash") ?? 0;
      if (dashSkillLevel > 0) {
        const maxCharges = 1 + Math.floor(dashSkillLevel / 3);
        let currentCharges = player.getDynamicProperty("dhh:dash_charges") ?? 0;

        if (player.getDynamicProperty("dhh:dash_charges") === undefined) {
          player.setDynamicProperty("dhh:dash_charges", maxCharges);
          currentCharges = maxCharges;
        }

        let rechargeTick =
          player.getDynamicProperty("dhh:dash_recharge_tick") ?? 0;

        if (currentCharges < maxCharges && rechargeTick === 0) {
          player.setDynamicProperty(
            "dhh:dash_recharge_tick",
            system.currentTick + CONFIG.SKILL_COOLDOWNS.DASH_CHARGE * 20
          );
          rechargeTick = player.getDynamicProperty("dhh:dash_recharge_tick");
        }

        if (
          rechargeTick > 0 &&
          currentCharges < maxCharges &&
          system.currentTick >= rechargeTick
        ) {
          currentCharges++;
          player.setDynamicProperty("dhh:dash_charges", currentCharges);
          player.playSound("random.orb", { pitch: 2.0, volume: 0.5 });

          if (currentCharges < maxCharges) {
            player.setDynamicProperty(
              "dhh:dash_recharge_tick",
              system.currentTick + CONFIG.SKILL_COOLDOWNS.DASH_CHARGE * 20
            );
          } else {
            player.setDynamicProperty("dhh:dash_recharge_tick", 0);
          }
        }
      }
      const isCurrentlySneaking = player.isSneaking;
      const wasPreviouslySneaking =
        player.getDynamicProperty("dhh:wasSneaking") ?? false;
      // if (isCurrentlySneaking && !wasPreviouslySneaking) {
      //   if (activeTrades.has(player.nameTag)) {
      //     handleTradeConfirmation(player);
      //   } else {
      //     handleSkillActivation(player);
      //   }
      // }
          if (isCurrentlySneaking && !wasPreviouslySneaking) {
        const heldItem = player.getComponent("inventory")?.container.getItem(player.selectedSlotIndex);

        if (heldItem?.typeId === 'dhh:all_seeing_eye') {
            // ----- TÍNH NĂNG MỚI: MỞ BÁCH KHOA TOÀN THƯ -----
            showEncyclopediaMainMenu(player);

        } else if (heldItem?.typeId === 'dhh:magic_staff' && heldItem.nameTag?.startsWith("§b§lQuyền Trượng")) {
            // ----- Logic cũ: Kích hoạt Kỹ năng -----
            handleSkillActivation(player);

        } else if (activeTrades.has(player.nameTag)) {
            // ----- Logic cũ: Xác nhận Giao dịch -----
            handleTradeConfirmation(player);
        }
      }
      player.setDynamicProperty("dhh:wasSneaking", isCurrentlySneaking);

      checkQuestExpiration(player);
      checkCollectQuestProgress(player);
      checkExploreQuestProgress(player);
      if (system.currentTick % 600 === 0) saveAllPlayerData(player);

      const activePetId = player.getDynamicProperty("dhh:active_pet_id");
      if (activePetId) {
        const pet = world.getEntity(activePetId);
        if (pet?.isValid) {
          const health = pet.getComponent("health");
          if (health) {
            const currentHealth = Math.round(health.currentValue);
            const maxHealth = health.effectiveMax;
            const baseName = pet.nameTag.split("\n")[0] ?? pet.typeId;
            const healthBar = createProgressBar(
              currentHealth,
              maxHealth,
              10,
              "█",
              "░",
              "§c",
              "§7"
            );
            const newNameTag = `${baseName}\n§c${currentHealth} §r/ §a${maxHealth} ${healthBar}`;
            pet.nameTag = newNameTag;
          }
        } else {
          player.setDynamicProperty("dhh:active_pet_id", undefined);
        }
      }
      if (system.currentTick % 40 === 0) {
        const radarLevel = player.getDynamicProperty("dhh:skill_radar") ?? 0;
        if (radarLevel > 0) {
          try {
            const baseRadius = 10,
              radiusPerLevel = 5,
              searchRadius = baseRadius + radarLevel * radiusPerLevel;
            const queryOptions = {
              location: player.location,
              maxDistance: searchRadius,
              families: ["monster"],
            };
            const allNearbyMonsters =
              player.dimension.getEntities(queryOptions);
            const relevantMonsters = allNearbyMonsters.filter(
              (monster) => Math.abs(player.location.y - monster.location.y) <= 2
            );
            if (relevantMonsters.length > 0) {
              for (const monster of relevantMonsters) {
                player.dimension.spawnParticle(
                  "minecraft:totem_particle",
                  monster.location
                );
              }
              const lastAlertTick =
                player.getDynamicProperty("dhh:radar_alert_cooldown") ?? 0;
              if (system.currentTick >= lastAlertTick) {
                const mobCounts = {};
                for (const monster of relevantMonsters) {
                  const mobName = monster.typeId
                    .replace("minecraft:", "")
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase());
                  mobCounts[mobName] = (mobCounts[mobName] || 0) + 1;
                }
                const messageParts = [];
                for (const name in mobCounts)
                  messageParts.push(`${mobCounts[name]} ${name}`);
                player.sendMessage(
                  `§eRada: §cPhát hiện [${messageParts.join(", ")}]!`
                );
                player.setDynamicProperty(
                  "dhh:radar_alert_cooldown",
                  system.currentTick + 100
                );
              }
            }
          } catch (e) {
            logError("Radar Skill", player, e);
          }
        }
      }
       handleRangerObserverPassive(player);
    } catch (error) {
      logError("Main Game Loop", player, error);
    }
  });
}, 20);
const sleepingPlayers = new Map();
const SLEEP_TROLL_MESSAGES = [
  "§c§l[Hệ Thống]§r §7Ối, anh hùng của chúng ta lại muốn đi ngủ à? Quái vật đang cười nhạo đấy.",
  "§c§l[Cảnh Báo]§r §7Ngủ à? Trong khi bạn bè đang chiến đấu? Thật là... chiến lược.",
  "§c§l[Thông Báo]§r §7Giường êm quá phải không? Nhưng EXP và loot thì không tự nhiên mà có đâu.",
  "§c§l[Lời Khuyên]§r §7Ngủ để hồi máu? Sao không thử uống thuốc và chiến đấu như người bình thường?",
  "§c§l[Sự Thật]§r §7Đêm là lúc kiếm EXP nhiều nhất. Nhưng mà ngủ cũng thoải mái thật...",
  "§c§l[Nhắc Nhở]§r §7Quái vật: 'Cảm ơn vì đã skip turn của chúng tôi ạ!'",
  "§c§l[Gợi Ý]§r §7Có bao giờ thấy người mạnh nào giàu lên bằng cách ngủ chưa?",
  "§c§l[Thống Kê]§r §7Số người giàu nhờ ngủ: 0. Số người giàu nhờ farm đêm: Tất cả.",
  "§c§l[Báo Cáo]§r §7Server ghi nhận: Một chiến binh đã chiến lược rút lui vào giường.",
  "§c§l[Phát Hiện]§r §7Giường > Chiến trường à? Lựa chọn thú vị đấy.",
];
system.runInterval(() => {
    try {
        const allLinksData = getAllLinksData();
        if (Object.keys(allLinksData).length === 0) return;

        for (const player of world.getAllPlayers()) {
            const playerCooldown = teleportCooldowns.get(player.nameTag);
            const playerPos = player.location;
            const playerDimId = player.dimension.id;

            // --- HIỂN THỊ COUNTDOWN KHI ĐỨNG GẦN CỔNG ---
            if (playerCooldown && system.currentTick < playerCooldown) {
                for (const owner in allLinksData) {
                    for (const link of allLinksData[owner]) {
                        if (!link.gateB) continue;

                        let nearGate = false;
                        
                        // Kiểm tra gần Cổng A
                        const distA = Vector.magnitude(Vector.subtract(playerPos, link.gateA.location));
                        if (distA < 3 && playerDimId === link.gateA.dimensionId) {
                            nearGate = true;
                        }
                        // Kiểm tra gần Cổng B
                        else {
                            const distB = Vector.magnitude(Vector.subtract(playerPos, link.gateB.location));
                            if (distB < 3 && playerDimId === link.gateB.dimensionId) {
                                nearGate = true;
                            }
                        }

                        if (nearGate) {
                            const remainingTicks = playerCooldown - system.currentTick;
                            const remainingSeconds = Math.ceil(remainingTicks / 20);
                            player.onScreenDisplay.setActionBar(
                                `§c§l[Cổng Dịch Chuyển] §eCooldown: §f${remainingSeconds}§es`
                            );
                            break;
                        }
                    }
                }
                continue; // Bỏ qua dịch chuyển nếu đang cooldown
            }

            // --- LOGIC DỊCH CHUYỂN ---
            for (const owner in allLinksData) {
                for (const link of allLinksData[owner]) {
                    if (!link.gateB) continue;

                    let targetLocation = null;
                    let targetDimension = null;

                    // Kiểm tra Cổng A
                    const distA = Vector.magnitude(Vector.subtract(playerPos, link.gateA.location));
                    if (distA < 2 && playerDimId === link.gateA.dimensionId) {
                        targetLocation = link.gateB.location;
                        targetDimension = world.getDimension(link.gateB.dimensionId);
                    }
                    // Kiểm tra Cổng B
                    else {
                        const distB = Vector.magnitude(Vector.subtract(playerPos, link.gateB.location));
                        if (distB < 2 && playerDimId === link.gateB.dimensionId) {
                            targetLocation = link.gateA.location;
                            targetDimension = world.getDimension(link.gateA.dimensionId);
                        }
                    }

                    if (targetLocation && targetDimension) {
                        player.teleport(targetLocation, { dimension: targetDimension });
                        player.playSound("entity.shulker.teleport");
                        
                        // Đặt cooldown 10 giây
                        teleportCooldowns.set(player.nameTag, system.currentTick + (10 * 20));

                        // Tự động xóa cooldown sau 10 giây
                        system.runTimeout(() => {
                            if (teleportCooldowns.get(player.nameTag) <= system.currentTick) {
                                teleportCooldowns.delete(player.nameTag);
                            }
                        }, 10 * 20);

                        break;
                    }
                }
                if (teleportCooldowns.has(player.nameTag)) break;
            }
        }
    } catch (e) {
        // Bỏ qua lỗi nhỏ
    }
}, 5); // Chạy 4 lần mỗi giây
// === HIỆU ỨNG HẠT ENDER CHO CÁC CỔNG DỊCH CHUYỂN ===
system.runInterval(() => {
    try {
        const allLinksData = getAllLinksData();
        if (Object.keys(allLinksData).length === 0) return;

        for (const owner in allLinksData) {
            for (const link of allLinksData[owner]) {
                // Spawn hạt cho Cổng A
                if (link.gateA) {
                    const dimA = world.getDimension(link.gateA.dimensionId);
                    const centerA = link.gateA.location;
                    
                    // Spawn 3-5 hạt ngẫu nhiên xung quanh cổng
                    const particleCount = 3 + Math.floor(Math.random() * 3);
                    for (let i = 0; i < particleCount; i++) {
                        const offsetX = (Math.random() - 0.5) * 3;
                        const offsetY = Math.random() * 3;
                        const offsetZ = (Math.random() - 0.5) * 3;
                        
                        dimA.spawnParticle(
                            "minecraft:portal_reverse_particle",
                            {
                                x: centerA.x + offsetX,
                                y: centerA.y + offsetY,
                                z: centerA.z + offsetZ
                            }
                        );
                    }
                }

                // Spawn hạt cho Cổng B (nếu đã hoàn thành)
                if (link.gateB) {
                    const dimB = world.getDimension(link.gateB.dimensionId);
                    const centerB = link.gateB.location;
                    
                    const particleCount = 3 + Math.floor(Math.random() * 3);
                    for (let i = 0; i < particleCount; i++) {
                        const offsetX = (Math.random() - 0.5) * 3;
                        const offsetY = Math.random() * 3;
                        const offsetZ = (Math.random() - 0.5) * 3;
                        
                        dimB.spawnParticle(
                            "minecraft:portal_reverse_particle",
                            {
                                x: centerB.x + offsetX,
                                y: centerB.y + offsetY,
                                z: centerB.z + offsetZ
                            }
                        );
                    }
                }
            }
        }
    } catch (e) {
        // Bỏ qua lỗi
    }
}, 10); // Chạy 2 lần mỗi giây (mượt mà nhưng không quá lag)
system.runInterval(() => {
  try {
    for (const player of world.getAllPlayers()) {
      if (player.isSleeping && !sleepingPlayers.has(player.nameTag)) {
        sleepingPlayers.set(player.nameTag, true);
        system.run(() => {
          const { x, y, z } = player.location;
          player.teleport({ x: x, y: y + 0.5, z: z });

          // Random message từ danh sách
          const randomMessage =
            SLEEP_TROLL_MESSAGES[
              Math.floor(Math.random() * SLEEP_TROLL_MESSAGES.length)
            ];
          player.sendMessage(randomMessage);

          player.playSound("mob.elderguardian.curse", {
            location: player.location,
            pitch: 0.8,
            volume: 1.0,
          });
          player.dimension.spawnParticle("minecraft:knockback_roar_particle", {
            x,
            y: y + 1,
            z,
          });
          player.addEffect("slowness", 200, {
            amplifier: 0,
            showParticles: true,
          });
          player.addEffect("weakness", 200, {
            amplifier: 0,
            showParticles: true,
          });
        });
      } else if (!player.isSleeping && sleepingPlayers.has(player.nameTag)) {
        sleepingPlayers.delete(player.nameTag);
      }
    }
  } catch (e) {
    console.error(`[Sleep Monitor Error] ${e}`);
  }
}, 1);
world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
  const { player, block } = event;
     try {
        updateStoryQuestProgress('INTERACT_BLOCK', player, block);
    } catch(e) { logError("StoryQuestInteract", player, e); }
  checkPlayerInteractTriggers(player, block);
});
world.afterEvents.playerInteractWithBlock.subscribe(
  handleWerewolfBlockInteract
);
world.afterEvents.playerPlaceBlock.subscribe((event) => {
  const { player, block } = event;
  checkPlayerPlaceBlockTriggers(player, block);
});
world.beforeEvents.itemUse.subscribe((event) => {
  try {
    const { source: player, itemStack } = event;
    if (
      player.typeId === "minecraft:player" &&
      itemStack.typeId === "dhh:all_seeing_eye"
    ) {
      event.cancel = true;
      system.run(() => {
        processAllSeeingEye(player);
      });
    }
    if (
      itemStack?.typeId === "minecraft:ender_eye" &&
      itemStack?.nameTag === "§5§lCon Mắt Tà Thuật"
    ) {
      event.cancel = true;
      system.run(() => {
        handleWerewolfItemUse(event);
      });
    }
    if (itemStack.typeId === "dhh:menu_book") {
      event.cancel = true;
      system.run(() => {
        showStatsMenu(player);
      });
    }

    if (itemStack.typeId === "dhh:magic_staff") {
      event.cancel = true;
      system.run(() => {
        showSkillSelectionMenu(player);
      });
    }
  if (itemStack.typeId === 'minecraft:totem_of_undying') {
            const health = player.getComponent('health');
            // Kiểm tra xem người chơi có bị virus VÀ sắp chết không
            if (health && health.currentValue <= 1 && (player.hasTag('virus_stage1') || player.hasTag('virus_stage2') || player.hasTag('virus_stage3'))) {
                event.cancel = true; // Hủy việc totem kích hoạt ngay lập tức
                system.run(() => {
                    // Xóa các tag virus
                    player.removeTag('virus_stage1');
                    player.removeTag('virus_stage2');
                    player.removeTag('virus_stage3');
                    
                    // Kích hoạt totem một cách thủ công để hồi sinh
                    player.applyDamage(2000, { cause: 'magic' }); 
                    
                    system.runTimeout(() => { // Chờ 1 tick sau khi totem hồi sinh
                       if(player.isValid) {
                            player.addTag('virus_immune'); // Thêm miễn nhiễm
                            player.sendMessage("§e§lVật Tổ Bất Tử đã bùng nổ, thanh tẩy virus và cứu bạn khỏi sự biến đổi!");
                            player.dimension.createExplosion(player.location, 2, { breaksBlocks: false });
                            system.runTimeout(() => player.removeTag('virus_immune'), 1200); // Miễn nhiễm trong 1 phút
                       }
                    }, 1);
                });
                return; // Dừng xử lý các logic khác
            }
        }
        // KẾT THÚC KHỐI MÃ THÊM
  } catch (e) {
    logError("allSeeingEye.itemUse", event.source, e);
  }
});
world.afterEvents.playerInteractWithEntity.subscribe((eventData) => {
  try {
    const { player, target } = eventData;
    if (player.typeId !== "minecraft:player") return;
    updateQuestOnTrade(player, target);
    updateGuildTradeQuestProgress(player, target);
  } catch (error) {
    logError("playerInteractWithEntity", player, error);
  }
});
world.afterEvents.playerLeave.subscribe((event) => {
  const { player } = event;
  try {
    saveAllPlayerData(player);
    handleWerewolfPlayerLeave(event);
    logDebug(`Saved data for leaving player: ${player.nameTag}`);
  } catch (e) {
    logError("playerLeave", player, e);
  }
});

function checkAndRestoreEffects(player) {
  try {
    const stats = getPlayerStats(player);
    const dhhEffects = {
      health_boost: -1,
      speed: -1,
      strength: -1,
      regeneration: -1,
      resistance: -1,
    };

    const totalBonusHealth =
      stats.vitality * CONFIG.STAT_SCALING.VITALITY.health_per_point +
      stats.baseHealth;
    dhhEffects.health_boost = Math.floor(totalBonusHealth / 4);

    const totalBonusPercentage =
      stats.strength * CONFIG.STAT_SCALING.STRENGTH.damage_bonus_per_point +
      stats.baseDamage;
    const calculatedStrengthAmp = Math.floor(totalBonusPercentage / 0.25) - 1;
    dhhEffects.strength = Math.min(calculatedStrengthAmp, 5);

    if (stats.skills.regeneration > 0)
      dhhEffects.regeneration = Math.floor((stats.skills.regeneration - 1) / 2);
    if (stats.skills.ironSkin > 0)
      dhhEffects.resistance = Math.min(
        3,
        Math.floor((stats.skills.ironSkin - 1) / 2)
      );

    for (const effectId in dhhEffects) {
      const requiredAmplifier = dhhEffects[effectId];
      const currentEffect = player.getEffect(effectId);

      if (requiredAmplifier >= 0) {
        if (!currentEffect) {
          player.addEffect(effectId, INFINITE_DURATION, {
            amplifier: requiredAmplifier,
            showParticles: false,
          });
        } else if (currentEffect.amplifier < requiredAmplifier) {
          player.addEffect(effectId, INFINITE_DURATION, {
            amplifier: requiredAmplifier,
            showParticles: false,
          });
        }
      } else {
        if (currentEffect) {
          if (currentEffect.duration > 1000000) {
            player.removeEffect(effectId);
          }
        }
      }
    }

    const movementComp = player.getComponent("minecraft:movement");
    if (movementComp) {
      const requiredSpeedBonus =
        stats.agility * CONFIG.STAT_SCALING.AGILITY.speed_bonus_per_point +
        stats.baseSpeed;
      const requiredSpeedValue =
        movementComp.defaultValue * (1 + requiredSpeedBonus);

      if (movementComp.currentValue < requiredSpeedValue) {
        movementComp.setCurrentValue(requiredSpeedValue);
      }
    }
  } catch (e) {
    logError("checkAndRestoreEffects", player, e);
  }
}

const NIGHT_WARNING_MESSAGES = [
  "Bóng tối đang lan. Hãy mang theo đuốc và vũ khí.",
  "Đêm đã đến. Tìm nơi trú ẩn hoặc chuẩn bị chiến đấu.",
  "Quái vật bắt đầu xuất hiện. Kiểm tra giáp và máu của bạn.",
  "Màn đêm buông xuống. Đừng đi một mình nếu chưa đủ mạnh.",
  "Nguy hiểm đang đến gần. Hãy thắp sáng khu vực xung quanh.",
  "Những sinh vật của đêm đã thức giấc. Ở gần ánh sáng để an toàn.",
  "Bầu trời tối đen. Nếu chưa sẵn sàng, hãy tìm nơi ẩn náu.",
  "Tiếng gầm vang lên từ xa. Chuẩn bị vũ khí và thức ăn.",
  "Đêm nay nguy hiểm hơn. Đi theo nhóm nếu có thể.",
  "Quái vật sẽ xuất hiện nhiều hơn. Đảm bảo bạn đã sẵn sàng.",
];

function handleNightCycleEvents() {
  try {
    const time = world.getTimeOfDay();
    const warningGiven =
      world.getDynamicProperty("dhh:night_warning_given") ?? false;

    if (time >= 12500 && !warningGiven) {
      world.setDynamicProperty("dhh:night_warning_given", true);

      const randomMessage =
        NIGHT_WARNING_MESSAGES[
          Math.floor(Math.random() * NIGHT_WARNING_MESSAGES.length)
        ];

      for (const player of world.getAllPlayers()) {
        player.onScreenDisplay.setTitle("§c§lBÓNG TỐI ĐÃ ĐẾN...", {
          subtitle: `§7${randomMessage}`,
          fadeInDuration: 20,
          stayDuration: 100,
          fadeOutDuration: 40,
        });
        player.playSound("ambient.cave", { pitch: 0.7, volume: 1.0 });
      }
    } else if (time < 12500 && warningGiven) {
      world.setDynamicProperty("dhh:night_warning_given", false);
    }
  } catch (e) {
    console.error(`[Night Warning Error] ${e}`);
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
const DAYTIME_ANIMAL_SPAWNING_CONFIG = {
    ENABLED: true,
    SPAWN_INTERVAL_TICKS: 1200, // Tần suất spawn: 60 giây (dài hơn để tránh quá tải)

    // ===================================================================
    // === BẬC 1: ĐỘNG VẬT PHỔ BIẾN (COMMON ANIMALS) ====================
    // ===================================================================
    // Các động vật nông trại cơ bản, thường đi theo nhóm.
    COMMON_SPAWN_CHANCE_PER_PLAYER: 0.7, // 70% cơ hội cho mỗi người chơi
    COMMON_SPAWN_GROUP_MIN: 2,
    COMMON_SPAWN_GROUP_MAX: 5,
    COMMON_MOB_LIST: [
        "minecraft:sheep",
        "minecraft:cow",
        "minecraft:pig",
        "minecraft:chicken",
    ],

    // ===================================================================
    // === BẬC 2: ĐỘNG VẬT KHÔNG PHỔ BIẾN (UNCOMMON ANIMALS) ===========
    // ===================================================================
    // Các động vật hoang dã, ít gặp hơn.
    UNCOMMON_SPAWN_CHANCE_GLOBAL: 0.3, // 30% cơ hội toàn cục
    UNCOMMON_MOB_LIST: [
        "minecraft:horse",
        "minecraft:wolf",
        "minecraft:fox",
        "minecraft:llama",
        "minecraft:rabbit",
        "minecraft:goat",
    ],

    // ===================================================================
    // === BẬC 3: ĐỘNG VẬT QUÝ HIẾM (RARE ANIMALS) ======================
    // ===================================================================
    // Rất hiếm và có thể yêu cầu quần xã sinh vật (biome) đặc biệt.
    RARE_SPAWN_CHANCE_GLOBAL: 0.05, // 5% cơ hội, rất hiếm
    RARE_MOB_LIST: [
        { id: "minecraft:panda", biome: ["bamboo_jungle"] },
        { id: "minecraft:parrot", biome: ["jungle"] },
        { id: "minecraft:mooshroom", biome: ["mushroom_fields"] },
        { id: "minecraft:axolotl", waterRequired: true }, // Cần spawn gần nước
        { id: "minecraft:sniffer", biome: ["cherry_grove", "flower_forest"] },
    ],

    // Cấu hình chung
    MIN_SPAWN_RADIUS: 20,
    MAX_SPAWN_RADIUS: 40,
};
// Đặt đoạn mã này vào file main.js, ngay bên dưới interval của Night Horrors

system.runInterval(() => {
    if (!DAYTIME_ANIMAL_SPAWNING_CONFIG.ENABLED) return;

    const time = world.getTimeOfDay();
    const isDay = time >= 0 && time < 12500; // Kiểm tra nếu là ban ngày

    if (!isDay) return;

    const targetablePlayers = world.getAllPlayers().filter((p) => p.getGameMode() !== GameMode.Spectator);
    if (targetablePlayers.length === 0) return;

    // --- 1. SPAWN ĐỘNG VẬT PHỔ BIẾN ---
    for (const player of targetablePlayers) {
        if (Math.random() < DAYTIME_ANIMAL_SPAWNING_CONFIG.COMMON_SPAWN_CHANCE_PER_PLAYER) {
            const groupSize = Math.floor(Math.random() * (DAYTIME_ANIMAL_SPAWNING_CONFIG.COMMON_SPAWN_GROUP_MAX - DAYTIME_ANIMAL_SPAWNING_CONFIG.COMMON_SPAWN_GROUP_MIN + 1)) + DAYTIME_ANIMAL_SPAWNING_CONFIG.COMMON_SPAWN_GROUP_MIN;
            for (let i = 0; i < groupSize; i++) {
                const randomMobId = DAYTIME_ANIMAL_SPAWNING_CONFIG.COMMON_MOB_LIST[Math.floor(Math.random() * DAYTIME_ANIMAL_SPAWNING_CONFIG.COMMON_MOB_LIST.length)];
                spawnMobNearPlayer(player, randomMobId, true); // Thêm cờ isAnimal=true để tìm vị trí trên cỏ
            }
        }
    }

    // --- 2. SPAWN ĐỘNG VẬT KHÔNG PHỔ BIẾN hoặc QUÝ HIẾM ---
    const randomValue = Math.random();
    const targetPlayer = targetablePlayers[Math.floor(Math.random() * targetablePlayers.length)];

    if (randomValue < DAYTIME_ANIMAL_SPAWNING_CONFIG.RARE_SPAWN_CHANCE_GLOBAL) {
        // --- 2A. Ưu tiên spawn ĐỘNG VẬT QUÝ HIẾM ---
        const playerBiome = targetPlayer.dimension.getBiome(targetPlayer.location).id.replace("minecraft:", "");
        const possibleRareMobs = DAYTIME_ANIMAL_SPAWNING_CONFIG.RARE_MOB_LIST.filter(mob => {
            if (mob.biome) {
                return mob.biome.includes(playerBiome);
            }
            return true; // Nếu không yêu cầu biome cụ thể
        });

        if (possibleRareMobs.length > 0) {
            const randomRareMob = possibleRareMobs[Math.floor(Math.random() * possibleRareMobs.length)];
            if (spawnMobNearPlayer(targetPlayer, randomRareMob.id, true, randomRareMob.waterRequired)) {
                targetPlayer.sendMessage("§aMột đàn động vật quý hiếm vừa xuất hiện gần đây!");
                targetPlayer.playSound("entity.villager.celebrate");
            }
        }

    } else if (randomValue < DAYTIME_ANIMAL_SPAWNING_CONFIG.UNCOMMON_SPAWN_CHANCE_GLOBAL) {
        // --- 2B. Nếu không, thử spawn ĐỘNG VẬT KHÔNG PHỔ BIẾN ---
        const randomUncommonMobId = DAYTIME_ANIMAL_SPAWNING_CONFIG.UNCOMMON_MOB_LIST[Math.floor(Math.random() * DAYTIME_ANIMAL_SPAWNING_CONFIG.UNCOMMON_MOB_LIST.length)];
        spawnMobNearPlayer(targetPlayer, randomUncommonMobId, true);
    }

}, DAYTIME_ANIMAL_SPAWNING_CONFIG.SPAWN_INTERVAL_TICKS);
const NIGHT_HORRORS_CONFIG = {
  ENABLED: true,
  SPAWN_INTERVAL_TICKS: 1000, // Tần suất spawn: 25 giây

  // ===================================================================
  // === BẬC 1: QUÁI THƯỜNG (COMMON MOBS) =============================
  // ===================================================================
  // Các mob cơ bản, thường đi theo nhóm nhỏ.
  COMMON_SPAWN_CHANCE_PER_PLAYER: 0.6, // 70% cơ hội
  COMMON_SPAWN_GROUP_MIN: 2,
  COMMON_SPAWN_GROUP_MAX: 4,
  COMMON_MOB_LIST: [
    "minecraft:zombie",
    "minecraft:skeleton",
    "minecraft:spider",
    "minecraft:husk",
    "minecraft:stray",
    "minecraft:drowned",
    "minecraft:zombie_pigman", 
  ],

  // ===================================================================
  // === BẬC 2: QUÁI MẠNH (STRONG MOBS) ===============================
  // ===================================================================
  // Nguy hiểm hơn, thường có kỹ năng đặc biệt hoặc sát thương/máu cao.
  STRONG_SPAWN_CHANCE_GLOBAL: 0.25, // 25% cơ hội
  STRONG_MOB_LIST: [
    // --- Các mob khó chịu ---
    "minecraft:creeper", // Mối nguy hiểm chiến thuật
    "minecraft:enderman", // Máu cao, sát thương lớn, khó đoán
    "minecraft:witch", // Kháng hiệu ứng, ném độc/làm chậm
    "minecraft:phantom", // Tấn công từ trên không
    "minecraft:cave_spider", // Gây độc
    "minecraft:pillager", // Tấn công tầm xa
    "minecraft:zoglin",
    // --- Các mob Nether/End mạnh ---
    "minecraft:blaze",
    "minecraft:wither_skeleton",
    "minecraft:hoglin",
    "minecraft:piglin", // Sẽ tấn công nếu không có vàng
    "minecraft:magma_cube",
    "minecraft:ghast", // Gây nổ từ xa
    "minecraft:ravager",
    // --- Mini-boss từ các cấu trúc ---
    "minecraft:vindicator", // Sát thương cận chiến cực cao
    "minecraft:guardian", // Tấn công laser dưới nước/gần nước
    "minecraft:shulker", // Gây hiệu ứng Levitation
    "minecraft:piglin_brute", // Máu trâu, sát thương cực lớn
    "minecraft:evoker", // Triệu hồi Vex, tấn công phép
  ],

  // ===================================================================
  // === BẬC 3: BOSS ==================================================
  // ===================================================================
  // Chỉ những thực thể thực sự là boss, cực hiếm và là một thảm họa.
  BOSS_SPAWN_CHANCE_GLOBAL: 0.005, // 0.5% cơ hội, rất hiếm
  BOSS_MOB_LIST: ["minecraft:wither"],

  // Cấu hình chung
  MIN_SPAWN_RADIUS: 15,
  MAX_SPAWN_RADIUS: 32,
};
function performClassReset(player) {
  try {
    player.setDynamicProperty("dhh:level", 1);
    player.setDynamicProperty("dhh:xp", 0);
    player.setDynamicProperty("dhh:skill_points", 0);
    player.setDynamicProperty("dhh:vitality", 0);
    player.setDynamicProperty("dhh:strength", 0);
    player.setDynamicProperty("dhh:agility", 0);
    player.setDynamicProperty("dhh:intelligence", 0);
    player.setDynamicProperty("dhh:class", "none");

    const allSkillKeys = Object.keys(SKILL_TRANSLATIONS);
    for (const skillKey of allSkillKeys) {
      try {
        player.setDynamicProperty(`dhh:skill_${skillKey}`, 0);
      } catch (e) {}
    }

    player.setDynamicProperty("dhh:base_health", 0);
    player.setDynamicProperty("dhh:base_mana", 0);
    player.setDynamicProperty("dhh:base_damage", 0);
    player.setDynamicProperty("dhh:base_speed", 0);

    applyAllBonuses(player);
    saveAllPlayerData(player);

    player.sendMessage(
      "§c§lBạn đã khởi tạo lại con đường của mình. Mọi ký ức và sức mạnh cũ đã tan biến..."
    );
    player.playSound("mob.wither.spawn");

    system.run(() => showStatsMenu(player));
  } catch (error) {
    logError("performClassReset", player, error);
    player.sendMessage("§cĐã có lỗi xảy ra trong quá trình khởi tạo lại.");
  }
}

async function showClassResetConfirmationMenu(player) {
  const form = new MessageFormData()
    .title("§4§lCẢNH BÁO HÀNH ĐỘNG HỦY DIỆT")
    .body(
      "Bạn có thực sự chắc chắn muốn §c§lKHỞI TẠO LẠI§r nghề nghiệp của mình không?\n\nHành động này §4KHÔNG THỂ HOÀN TÁC§r và sẽ khiến bạn:\n\n§e- Trở về Cấp độ 1, mất toàn bộ kinh nghiệm.\n§e- Mất tất cả điểm kỹ năng đã cộng.\n§e- Quên hết các kỹ năng đã học.\n§e- Mất tất cả các chỉ số cộng thêm (máu, mana...) từ cấp độ.\n\n§7Bạn sẽ được chọn lại nghề nghiệp từ đầu."
    )
    .button1("§aKhông, tôi đã suy nghĩ lại")
    .button2("§cĐỒNG Ý - TÔI CHẤP NHẬN RESET!");

  const { canceled, selection } = await form.show(player);

  if (canceled || selection === 0) {
    player.sendMessage("§aĐã hủy quá trình khởi tạo lại.");
    return;
  }

  if (selection === 1) {
    performClassReset(player);
  }
}
system.runInterval(() => {
  if (!NIGHT_HORRORS_CONFIG.ENABLED) return;

  const time = world.getTimeOfDay();
  const isNight = time >= 13000 && time <= 23000;

  if (!isNight) return;

  const targetablePlayers = world
    .getAllPlayers()
    .filter((p) => p.getGameMode() !== GameMode.Spectator);

  if (targetablePlayers.length === 0) return;

  // --- 1. SPAWN QUÁI THƯỜNG (Giữ nguyên) ---
  for (const player of targetablePlayers) {
    if (Math.random() < NIGHT_HORRORS_CONFIG.COMMON_SPAWN_CHANCE_PER_PLAYER) {
      const groupSize =
        Math.floor(
          Math.random() *
            (NIGHT_HORRORS_CONFIG.COMMON_SPAWN_GROUP_MAX -
              NIGHT_HORRORS_CONFIG.COMMON_SPAWN_GROUP_MIN +
              1)
        ) + NIGHT_HORRORS_CONFIG.COMMON_SPAWN_GROUP_MIN;

      for (let i = 0; i < groupSize; i++) {
        const randomMobId =
          NIGHT_HORRORS_CONFIG.COMMON_MOB_LIST[
            Math.floor(
              Math.random() * NIGHT_HORRORS_CONFIG.COMMON_MOB_LIST.length
            )
          ];
        spawnMobNearPlayer(player, randomMobId);
      }
    }
  }

  // --- 2. SPAWN QUÁI MẠNH HOẶC BOSS (Đã thay đổi) ---
  const randomValue = Math.random();
  const targetPlayer =
    targetablePlayers[Math.floor(Math.random() * targetablePlayers.length)];

  if (randomValue < NIGHT_HORRORS_CONFIG.BOSS_SPAWN_CHANCE_GLOBAL) {
    // --- 2A. Ưu tiên spawn BOSS nếu đủ may mắn ---
    const randomBossId =
      NIGHT_HORRORS_CONFIG.BOSS_MOB_LIST[
        Math.floor(Math.random() * NIGHT_HORRORS_CONFIG.BOSS_MOB_LIST.length)
      ];

    if (spawnMobNearPlayer(targetPlayer, randomBossId)) {
      // Thông báo đặc biệt cho Boss
      for (const p of world.getAllPlayers()) {
        p.onScreenDisplay.setTitle("§4§lĐẠI HỌA GIÁNG LÂM", {
          subtitle: "Một thực thể cổ đại vừa thức giấc...",
          stayDuration: 100,
        });
        p.playSound("mob.wither.spawn");
      }
    }
  } else if (randomValue < NIGHT_HORRORS_CONFIG.STRONG_SPAWN_CHANCE_GLOBAL) {
    // --- 2B. Nếu không spawn được Boss, thì thử spawn QUÁI MẠNH ---
    const randomStrongMobId =
      NIGHT_HORRORS_CONFIG.STRONG_MOB_LIST[
        Math.floor(Math.random() * NIGHT_HORRORS_CONFIG.STRONG_MOB_LIST.length)
      ];

    if (spawnMobNearPlayer(targetPlayer, randomStrongMobId)) {
      targetPlayer.sendMessage(
        "§cBạn cảm thấy một sự hiện diện đáng sợ ở gần đây..."
      );
      targetPlayer.playSound("mob.elderguardian.curse");
    }
  }
}, NIGHT_HORRORS_CONFIG.SPAWN_INTERVAL_TICKS);
function spawnMobNearPlayer(player, mobId, isAnimal = false, waterRequired = false) {
    for (let i = 0; i < 15; i++) { // Tăng số lần thử để có cơ hội tìm vị trí tốt hơn
        const angle = Math.random() * 2 * Math.PI;
        const config = isAnimal ? DAYTIME_ANIMAL_SPAWNING_CONFIG : NIGHT_HORRORS_CONFIG;
        const distance = config.MIN_SPAWN_RADIUS + Math.random() * (config.MAX_SPAWN_RADIUS - config.MIN_SPAWN_RADIUS);

        const spawnX = Math.floor(player.location.x + Math.cos(angle) * distance);
        const spawnZ = Math.floor(player.location.z + Math.sin(angle) * distance);

        for (let y = player.location.y + 5; y > player.location.y - 10; y--) {
            const spawnLocation = { x: spawnX + 0.5, y: y, z: spawnZ + 0.5 };
            const blockBelow = player.dimension.getBlock({ x: spawnX, y: y - 1, z: spawnZ });
            const blockAt = player.dimension.getBlock({ x: spawnX, y: y, z: spawnZ });
            const blockAbove = player.dimension.getBlock({ x: spawnX, y: y + 1, z: spawnZ });

            if (blockBelow?.isSolid && blockAt?.isAir && blockAbove?.isAir) {
                let canSpawn = false;

                if (isAnimal) {
                    // Ưu tiên spawn động vật trên cỏ, đất hoặc cát
                    const groundBlockId = blockBelow.typeId;
                    if (groundBlockId.includes("grass") || groundBlockId.includes("dirt") || groundBlockId.includes("sand") || groundBlockId.includes("stone")) {
                        canSpawn = true;
                    }
                    // Nếu yêu cầu nước, phải có khối nước ở vị trí spawn
                    if (waterRequired && blockAt.typeId !== "minecraft:water") {
                        canSpawn = false;
                    }
                } else {
                    // Logic cũ cho quái vật
                    canSpawn = true;
                }

                if (canSpawn) {
                    try {
                        player.dimension.spawnEntity(mobId, spawnLocation);
                        return true;
                    } catch (e) {
                        logError(`Animal/Mob Spawn (${mobId})`, player, e);
                        return false;
                    }
                }
            }
        }
    }
    return false;
}
/**
 * Xử lý nội tại "Giác Quan Thứ Sáu" của Du Hiệp, cảnh báo khi có thực thể đang hướng về phía người chơi.
 * @param {import("@minecraft/server").Player} player 
 */
function handleRangerObserverPassive(player) {
    if (player.getDynamicProperty("dhh:class") !== "ranger") {
        return;
    }

    const OBSERVER_COOLDOWN_PROP = "dhh:observer_passive_cd";
    const lastCheck = player.getDynamicProperty(OBSERVER_COOLDOWN_PROP) ?? 0;
    
    if (system.currentTick < lastCheck) {
        return;
    }
    player.setDynamicProperty(OBSERVER_COOLDOWN_PROP, system.currentTick + 60);

    const DETECTION_RADIUS = 30;
    const DETECTION_DEPTH = 16;
    const DETECTION_WIDTH = 5;
    
    const playerLocation = player.location;
    const observers = [];

    // ← SỬA DÒNG NÀY: Bỏ "minecraft:player" khỏi excludeTypes
    const nearbyEntities = player.dimension.getEntities({
        location: playerLocation,
        maxDistance: DETECTION_RADIUS,
        excludeTypes: ["minecraft:item", "minecraft:arrow", "minecraft:experience_orb"],
    });

    for (const entity of nearbyEntities) {
        try {
            // ← THÊM 3 DÒNG NÀY: Bỏ qua chính bản thân
            if (entity.typeId === "minecraft:player" && entity.nameTag === player.nameTag) {
                continue;
            }

            const viewDir = entity.getViewDirection();
            const forwardVector = { x: viewDir.x, z: viewDir.z };

            const magForward = Math.sqrt(forwardVector.x * forwardVector.x + forwardVector.z * forwardVector.z);
            if (magForward === 0) continue;
            forwardVector.x /= magForward;
            forwardVector.z /= magForward;
            
            const rightVector = { x: -forwardVector.z, z: forwardVector.x };

            const vectorToPlayer = { 
                x: playerLocation.x - entity.location.x, 
                z: playerLocation.z - entity.location.z 
            };
            
            const forwardDistance = vectorToPlayer.x * forwardVector.x + vectorToPlayer.z * forwardVector.z;
            const sideDistance = vectorToPlayer.x * rightVector.x + vectorToPlayer.z * rightVector.z;

            if (forwardDistance > 0 && forwardDistance < DETECTION_DEPTH && Math.abs(sideDistance) < DETECTION_WIDTH / 2) {
                // ← THÊM ĐOẠN NÀY: Phân biệt người chơi và mob
                let entityName;
                if (entity.typeId === "minecraft:player") {
                    entityName = `§e${entity.nameTag}§r (Người chơi)`;
                } else {
                    entityName = entity.typeId.replace("minecraft:", "").replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
                }
                observers.push(entityName);
            }
        } catch (e) {}
    }

    if (observers.length > 0) {
        const observerCounts = observers.reduce((acc, name) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {});
        
        const messageParts = Object.entries(observerCounts).map(([name, count]) => `${count > 1 ? count + ' ' : ''}${name}`);
        player.sendMessage(`§e[Giác Quan Thứ Sáu] §cBạn đang trong tầm nhận biết của: ${messageParts.join(', ')}.`);
        player.playSound("note.pling", { pitch: 0.5, volume: 0.8 });
    }
}
world.beforeEvents.chatSend.subscribe((event) => {
  handleWerewolfChatSend(event);
});
initializeActionBarManager();
initializeDamageHandler();
initializeCursedBladeLogic();
initializeLandClaimSystem();
system.run(() => {
  if (world.getDynamicProperty("dhh:shared_inventory_active")) {
    initializeSharedInventorySystem();
    console.log(
      "§6[dhh System] §eTính năng Thử Thách Chung Túi Đồ đang hoạt động!"
    );
  }
});
initializeBossSystem();
initializeFlashSaleSystem();
initializeDailyRewardSystem();
console.log(
  "§a[dhh System] §2Professional & Stable Version with Class System - §aLoaded!"
);
