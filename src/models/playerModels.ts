import { ESMap } from "typescript";

export interface ConditionMonitor {
    stun: number;
    physical: number;
}

export interface IAttributes {
    BOD: number;
    AGI: number;
    REA: number;
    STR: number;
    WIL: number;
    LOG: number;
    INT: number;
    CHA: number;
    EDG: number;
    ESS: number;
    MAG: number;
    RES: number;
}

export interface Initiative {
    initDice: number;
}

export interface ISkill {
    name: string;
    rating: number;
    attribute: string;
    default: string;
    group: string;
    specialization?: string;
    limit: string;
}

export interface ISkills {
    combat: ISkill[];
    physical: ISkill[];
    social: ISkill[];
    magical: ISkill[];
    resonance: ISkill[];
    technical: ISkill[];
    vehicle: ISkill[];
}

export interface Street {
    name: string;
    rating: number;
    attribute: string;
    specialization: string;
}

export interface Academic {
    name: string;
    rating: number;
    attribute: string;
    specialization: string;
}

export interface Professional {
    name: string;
    rating: number;
    attribute: string;
    specialization: string;
}

export interface Interest {
    name: string;
    rating: number;
    attribute: string;
    specialization: string;
}

export interface KnowledgeSkills {
    street: Street[];
    academic: Academic[];
    professional: Professional[];
    interests: Interest[];
}

export interface IQuality {
    qName: string;
    karma: number;
    rating: number;
    max: number;
    notes: string;
}

export interface IQualities {
    positive: IQuality[];
    negative: IQuality[];
}

export interface Augmentation {
    aName: string;
    rating: any;
    notes: string;
    essence: number;
}

export interface RitPrepRitComplex {
    spells: string;
    complexForms: string;
    sprites: string;
}

export interface Program {
    pName: string;
    type: string;
}

export interface Cyberdeck {
    model: string;
    attack: number;
    sleaze: number;
    deviceRating: number;
    dataProcessing: string;
    firewall: number;
    programs: Program[];
    condition: number;
}

export interface Armor {
    name: string;
    rating: number | string;
    capacity: number | string;
    availability: number | string;
    cost: number;
    equiped: boolean;
}

export interface Melee {
    name: string;
    acc: number | string; // | string
    reach: number | string;
    dam: string;
    ap: number | string;
    availability: number | string;
    cost: number;
    skill: string;
}

export interface Ranged {
    name: string;
    acc: string;
    dam: string;
    ap: string;
    mode: string;
    RC: number;
    ammo: number;
    availability: string;
    cost: number;
    skill: string;
    ammoTypes: Array<string>;
    subAmmoTypes: Array<string>;
    currentLoadedAmmoType: string;
    range: Ranges;
    category: string;
    mounting: string;
    equippedMount: { topAttachment: EquippedAttachments | null, underAttachment: EquippedAttachments | null, barrelAttachment: EquippedAttachments | null };
}

export interface Ranges {
  default?: Range;
  slug?: Range;
  flechette?: Range;
}

export interface Range {
  short: Array<number>,
  medium: Array<number>,
  long: Array<number>,
  extreme: Array<number>,
}

export interface RangedAmmo {
  name: string;
  acc: string;
  damage: string;
  damage_modifier: string;
  ap: string;
  ap_modifier: string;
  avail: string;
  cost: number;
  amount: string;
}

export interface CharacterAmmo {
    name: string;
    amount: number;
    ammoType: string;
}

export interface WeaponModes {
    name: string;
    numOfRounds: number;
    RC?: number;
    DefenseMod: number;
}

export interface Gear {
    armor: Armor[];
    melee: Melee[];
    ranged: Ranged[];
}

export interface Ammo {
  throwing: CharacterAmmo[];
  arrows: CharacterAmmo[];
  bolts: CharacterAmmo[];
  darts: CharacterAmmo[];
  ballistic: CharacterAmmo[];
  grenades: CharacterAmmo[];
  rockets: CharacterAmmo[];
}

export interface ILog {
    adjustment: number;
    reason: string;
    reasonType: string;
    time: Date;
}

export interface ICharacter {
    name: string;
    metatype: string;
    money: number;
    karma: number;
    currentEdge: number;
    conditionMonitor: ConditionMonitor;
    personal: string;
    attributes: IAttributes;
    img: string;
    initiative: Initiative;
    armor: number;
    lifestyle: string;
    ID: string;
    skills: ISkills;
    knowledgeSkills: KnowledgeSkills;
    qualities: IQualities;
    augmentations: Augmentation[];
    RitPrepRitComplex: RitPrepRitComplex;
    cyberdeck: Cyberdeck;
    gear: Gear;
    ammo: Ammo;
    log: ILog[];
}

export interface Attachments {
    name: string;
    cost: number;
    mount: string;
    type: string;
    effect: number;
}

export interface EquippedAttachments {
    name: string;
    cost: number;
    type: string;
    effect: number;
}