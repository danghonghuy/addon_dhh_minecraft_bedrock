import { GuardianClass } from "./guardian.js";
import { MageClass } from "./mage.js";
import { RangerClass } from "./ranger.js";

export const ALL_CLASSES = {
  [GuardianClass.id]: GuardianClass,
  [MageClass.id]: MageClass,
  [RangerClass.id]: RangerClass,
};

export const CLASS_TRANSLATIONS = {
  [GuardianClass.id]: GuardianClass.name,
  [MageClass.id]: MageClass.name,
  [RangerClass.id]: RangerClass.name,
};