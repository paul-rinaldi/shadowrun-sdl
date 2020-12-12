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
    equippedRC?: number;
    ammo: number;
    availability: string;
    cost: number;
    skill: string;
}

export interface Gear {
    armor: Armor[];
    melee: Melee[];
    ranged: Ranged[];
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
    log: ILog[];
}
