export interface ICharacter {
    name: string;
    metatype: string;
    money: number;
    karma: number;
    currentEdge: number;
    conditionMonitor: IConditionMonitor;
    personal: string;
    attributes: IAttributeList
    img: string;
    initiative: IInitiative;
    armor: number;
    lifestyle: string;
    ID: string;
    coreCombat: {
        armor: IArmor;
        ranged: IRanged;
        mele: IMele;
    }
    skills: {
        combat: ISkill[];
        physical: ISkill[];
        social: ISkill[];
        magical: ISkill[];
        resonance: ISkill[];
        technical: ISkill[];  
        vehicle: ISkill[];
    }
    qualities: IQuality[];
    augmentations: IAugmentation[];
    RitPrepRitComplex: IRitPrepRitComplex;
    cyberdeck: ICyberDeck;
    gear: IGear;
    log: ILog[];
}

export interface IConditionMonitor {
    stun: number;
    physical: number;
}

export interface IAttributeList {
    BOD: number;
    AGI: number;
    REA: number;
    STR: number;
    WIL: number,
    LOG: number,
    INT: number,
    CHA: number,
    EDG: number,
    ESS: number,
    MAG: number,
    RES: number
}

export interface IInitiative {
    initDice: number;
}

export interface IGear {
    armor: IArmor[];
    mele: IMeleWeapon[];
    ranged: IRangedWeapon[];
}

export interface IArmor {
    name: string;
    rating: string;
}

export interface IRanged {
    name: string;
    dam: string;
    acc: number;
    AP: string;
    mode: string;
    RC: number;
    ammo: number;
}

export interface IMele {
    name: string;
    reach: number;
    dam: string;
    acc: number;
    ap: number;
}

export interface ISkill {
    name: string;
    rating: number;
    attribute: string;
    default: string;
    group: string;
    specialization: string;
}

export interface IQuality {
    qName: string;
    notes: string;
    type: string;
}

export interface IAugmentation {
    aName: string;
    rading: number;
    notes: string;
    essence: number;
}

export interface IRitPrepRitComplex {
    spells: string;
    complexForms: string;
    sprites: string;
}

export interface ICyberDeck {
    model: string;
    attack: number;
    sleaze: number;
    deviceRating: number;
    dataProcesing: number;
    firewall: number;
    programs: IProgram[];
    condition: number;
};

export interface IProgram {
    pName: string;
    type: string;
}

export interface IArmor {
    armor: IArmor[];
    mele: IMeleWeapon[];
    ranged: IRangedWeapon[];
}

export interface IArmor {
    name: string;
    capacity: number;
    availability: number;
    cost: number;
    equipped: boolean;
}

export interface IWeapon {
    name: string;
    acc: number;
    dam: string;
    ap: number;
    availability: string;
    cost: number;
}

export interface IMeleWeapon extends IWeapon {
    reach: number;
    skill: string;
}

export interface IRangedWeapon extends IWeapon {
    mode: string;
    RC: number;
    ammo: string;
}

export interface ILog {
    adjustment: number;
    reason: string;
    reasonType: string;
    time: string;
}
