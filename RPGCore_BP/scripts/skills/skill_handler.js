import { activateDash } from "./dash.js";
import { activateHeal } from "./heal.js";
import { activateShadowSwap } from "./shadow_swap.js";
import { activateSprint } from "./sprint.js";
import { activateStealth } from "./stealth.js";
import { activateSummonBeast } from "./summon_beast.js";
import { activateTargetedLightning } from "./targeted_lightning.js";
import { activateShadowbind } from "./shadowbind.js";
import { activateGolemPunch } from "./golem_punch.js";
import { activateWintersDominion } from "./winters_dominion.js";
import { activateAllySwap } from "./ally_swap.js";
import { activateTimeLock } from "./time_lock.js";
import { activateEarthenGrave } from "./earthen_grave.js";
import { activateHellfirePit } from "./hellfire_pit.js";
import { activateRealityWarp } from "./reality_warp.js";
import { SPIRIT_SIGHT } from "./spirit_sight.js";
import { activateChaosTrap } from "./chaos_trap.js";
import { activateImmortalEdict } from "./immortal_edict.js";
import { activateExplosion } from "./explosion.js";
import { activateBladeStorm } from "./blade_storm.js";
import { activatePrimalBeast } from "./primal_beast.js";
import { activateCelestialStep } from "./celestial_step.js";
 import { activateVoidStep } from "./void_step.js"; 
 import { activateLifeLink } from "./life_link.js";
 import { activateSpatialLink } from './spatial_link.js';
 
export const LEARNABLE_SKILLS = [
  "STEALTH",
  "HEAL",
  "DASH",
  "TARGETED_LIGHTNING",
  "SUMMON_WOLF",
  "SHADOW_SWAP",
  "SPRINT",
  "SHADOWBIND",
  "GOLEM_PUNCH",
  "WINTERS_DOMINION",
  "ALLY_SWAP",
  "TIME_LOCK",
  "EARTHEN_GRAVE",
  "HELLFIRE_PIT",
  "REALITY_WARP",
  "SPIRIT_SIGHT",
  "CHAOS_TRAP",
  "IMMORTAL_EDICT",
  "EXPLOSION",
  "BLADE_STORM",
  "PRIMAL_BEAST",
  "CELESTIAL_STEP",
  "VOID_STEP",
    "LIFE_LINK",
    "SPATIAL_LINK",
];

export const SKILL_ACTIONS = {
  STEALTH: activateStealth,
  HEAL: activateHeal,
  DASH: activateDash,
  TARGETED_LIGHTNING: activateTargetedLightning,
  SUMMON_WOLF: activateSummonBeast,
  SHADOW_SWAP: activateShadowSwap,
  SPRINT: activateSprint,
  SHADOWBIND: activateShadowbind,
  GOLEM_PUNCH: activateGolemPunch,
  WINTERS_DOMINION: activateWintersDominion,
  ALLY_SWAP: activateAllySwap,
  TIME_LOCK: activateTimeLock,
  EARTHEN_GRAVE: activateEarthenGrave,
  HELLFIRE_PIT: activateHellfirePit,
  REALITY_WARP: activateRealityWarp,
  SPIRIT_SIGHT: SPIRIT_SIGHT,
  CHAOS_TRAP: activateChaosTrap,
  IMMORTAL_EDICT: activateImmortalEdict,
  EXPLOSION: activateExplosion,
  BLADE_STORM: activateBladeStorm,
  PRIMAL_BEAST: activatePrimalBeast,
  CELESTIAL_STEP: activateCelestialStep,
   VOID_STEP: activateVoidStep,
     LIFE_LINK: activateLifeLink,
     SPATIAL_LINK: activateSpatialLink, 
};
