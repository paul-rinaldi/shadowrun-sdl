export interface ConditionMonitor {
    stun: number;
    physical: number;
}

export interface Attributes {
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

export interface Combat {
    name: string;
    rating: number;
    attribute: string;
    default: string;
    group: string;
    specialization: string;
    limit: string;
}

export interface Physical {
    name: string;
    rating: number;
    attribute: string;
    default: string;
    group: string;
    specialization: string;
    limit: string;
}

export interface Social {
    name: string;
    rating: number;
    attribute: string;
    default: string;
    group: string;
    specialization: string;
    limit: string;
}

export interface Magical {
    name: string;
    rating: number;
    attribute: string;
    default: string;
    group: string;
    specialization: string;
    limit: string;
}

export interface Resonance {
    name: string;
    rating: number;
    attribute: string;
    default: string;
    group: string;
    specialization: string;
    limit: string;
}

export interface Technical {
    name: string;
    rating: number;
    attribute: string;
    default: string;
    group: string;
    specialization: string;
    limit: string;
}

export interface Vehicle {
    name: string;
    rating: number;
    attribute: string;
    default: string;
    group: string;
    specialization: string;
    limit: string;
}

export interface Skills {
    combat: Combat[];
    physical: Physical[];
    social: Social[];
    magical: Magical[];
    resonance: Resonance[];
    technical: Technical[];
    vehicle: Vehicle[];
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

export interface Positive {
    qName: string;
    karma: number;
    rating: number;
    max: number;
    notes: string;
}

export interface Negative {
    qName: string;
    karma: number;
    rating: number;
    max: number;
    notes: string;
}

export interface Qualities {
    positive: Positive[];
    negative: Negative[];
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
    capacity: number;
    availability: number;
    cost: number;
    equiped: boolean;
}

export interface Melee {
    name: string;
    acc: number;
    reach: number;
    dam: string;
    ap: number;
    availability: string;
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
    ammo: string;
    availability: string;
    cost: number;
}

export interface Gear {
    armor: Armor[];
    melee: Melee[];
    ranged: Ranged[];
}

export interface Log {
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
    attributes: Attributes;
    img: string;
    initiative: Initiative;
    armor: number;
    lifestyle: string;
    ID: string;
    skills: Skills;
    knowledgeSkills: KnowledgeSkills;
    qualities: Qualities;
    augmentations: Augmentation[];
    RitPrepRitComplex: RitPrepRitComplex;
    cyberdeck: Cyberdeck;
    gear: Gear;
    log: Log[];
}
