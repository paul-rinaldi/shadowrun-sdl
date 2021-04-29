import React from 'react';
import '../CSS_Files/Gear.css';
import armorJSON from '../Armor.json';
import meleeJSON from '../Melee.json';
import rangedJSON from '../Ranged.json';
import {Ranged, Armor, Melee, EquippedAttachments} from '../models/playerModels';
import {connect} from 'react-redux';
import {IShadowRunState} from '../redux/store';
import Select, {ValueType} from 'react-select';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {
    setGear,
    addArmor,
    addMelee,
    addRanged,
    remArmor,
    remMelee,
    remRanged,
    addAttachments,
    remAttachments,
    toggleEquip
} from '../redux/actions/gearAction';
import {adjustNuyen} from "../redux/actions/nuyenActions";
import {makeLog} from "../redux/actions/logActions";
import attachers from "../Attachments.json";
import {Table} from "react-bootstrap";

/*
Fix following prop callbakcs:

adjKarm={this.adjustKarma} =?
updateAddGear={this.updateAddGear}
updateRemGear={this.updateRemGear}
adjNuyen={this.adjustNuyen}
updateUnequipArmor={this.updateUnequipArmor}
*/

interface RangedOption {
    value: Ranged;
    label: string;
}

interface MeleeOption {
    value: Melee;
    label: string;
}

interface ArmorOption {
    value: Armor;
    label: string
}

interface AttachmentLabelOption {
    name: string;
    effect: number;
    type: string;
    cost: number;
    label: string;

}

type IGearProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: IShadowRunState) => ({
    character: state.player
});

interface IActionState {
    selectedAttachment: EquippedAttachments | null;
    isOpen: boolean;
}
const mapDispatchToProps = {
    setGear,
    adjustNuyen,
    makeLog,
    addRanged,
    addMelee,
    addArmor,
    remArmor,
    remMelee,
    remRanged,
    addAttachments,
    remAttachments,
    toggleEquip
};

/**
 * @class represents the gear page which manages the armor, melee, and ranged weapons.
 * Armor can be equipped and unequipped which then interacts with the header page to update appropriately,
 * then all gear can be added or removed. They can be added by either a custom item or from a list
 * from the Armor.json, Melee.json, or the Ranged.json.
 */
export class GearPage extends React.Component<IGearProps, IActionState> {
    constructor(props: IGearProps) {
        super(props);

        this.state = {
            selectedAttachment: null,
            isOpen: false
        };
    }


    /**
     * Renders the Gear page, which contains tables containing various information about all the character's
     * active gear.
     * @returns gear page or a message that no character is loaded.
     */
    render() {
        let page: JSX.Element;

        //Handle if a character has not been loaded yet (or does not have skills)
        if (this.props.character === null || typeof this.props.character === 'undefined') {
            page = <p>Load a character file to see their gear</p>;

        } else if (typeof this.props.character.gear === 'undefined') {
            page = <p>No gear found, load a character or add gear to the character's file</p>;

        } else {
            //If character has gear, generate the page contents
            page = this.gearPage();
        }

        return (<div>
            <h1 className={'Gear'}>Gear</h1>
            {page}
        </div>)
    }

    /**
     * Calls the tables which are to be created for the gear page.
     * @returns the entire page with the armor, melee, and ranged tables created.
     */
    gearPage() {
        let layout;

        layout =
            <div>
                {this.gearTableArmor()}
                {this.gearTableMelee()}
                {this.gearTableRanged()}
            </div>

        return layout;

    }

////////////////////////////Armor Section////////////////////////////

    /**
     * Starts the creation of the gear table which displays the armor.
     * Armor can be found starting on page 436 of the core rulebook.
     */
    gearTableArmor() {
        //A list of all gear of the armor type
        let gearList = this.props.character.gear.armor;
        let gearRows = [];
        const title = "Armor";

        for (let i = 0; i < gearList.length; i++) {
            gearRows.push(this.gearRowArmor(i));
        }

        let plusButton = <button className={'Gear'} onClick={() => this.addGearArmor()}>Add {title}</button>;

        let presetButton = this.allArmorDropdown();

        return (
            <div>
                <h2 className={'Gear'}>{title}</h2>
                <table className={'Gear'}>
                    <tbody>
                    <tr className={'Gear'}>
                        <th className={'Gear'}/>
                        <th className={'GearArmor'}>Equipped</th>
                        <th className={'GearArmor'}>Name</th>
                        <th className={'GearArmor'}>Rtg.</th>
                        <th className={'GearArmor'}>Capacity</th>
                        <th className={'GearArmor'}>Availability</th>
                        <th className={'GearArmor'}>Remove</th>
                    </tr>
                    {gearRows}
                    </tbody>
                </table>
                {presetButton}
                {plusButton}
            </div>


        );
    }

    /**
     * Generates the gear row by row by getting each of the current armor the player has.
     * @param {*} index is the current gear we are on.
     */
    gearRowArmor(index: number) {
        let gear = this.props.character.gear.armor[index];
        let minusButton = <button className={'Gear'} onClick={() => this.removeGear('armor', index)}><span role={'img'}
                                                                                                           aria-label={'wastebasket'}>🗑️</span>
        </button>;

        if (gear === null) {
            return null;
        } else {
            let eButton;
            let equiped;
            if (gear.equiped) {
                eButton = <button className={'Gear'} onClick={() => this.equip('armor', index)}>Unequip</button>;
                equiped = "✓";
            } else {
                eButton = <button className={'Gear'} onClick={() => this.equip('armor', index)}>Equip</button>;
                equiped = "";
            }
            return <tr className={'Gear'} key={index}>
                <td className={'Gear'}>{eButton}</td>
                <td className={'GearArmor'}>{equiped}</td>
                <td className={'GearArmor'}>{gear.name}</td>
                <td className={'GearArmor'}>{gear.rating}</td>
                <td className={'GearArmor'}>{gear.capacity}</td>
                <td className={'GearArmor'}>{gear.availability}</td>
                <td className={'GearArmor'}>{minusButton}</td>
            </tr>
        }
    }

    /**
     * Generates a dropdown which contains all of the armor from the JSON file armor.json.
     * Uses the react 'react-select'.
     * Returns the select menu with the values and calls the method to add the gear.
     */
    allArmorDropdown() {
        const options: ArmorOption[] = [];
        let armorTypes: Array<Armor> = armorJSON["armor"];

        armorTypes.forEach((armor) => {
            options.push({
                value: armor,
                label: `${armor.name}`
            });
        });

        return (
            <div className={'QualitiesDrop'}>
                <Select
                    options={options}
                    onChange={val => this.addPresetArmor(val)}
                />
            </div>
        );
    }

    /**
     * Adds the preset armor value from the allArmorDropdown() method.
     */
    addPresetArmor(val: ValueType<ArmorOption>) {
        const {makeLog, adjustNuyen, addArmor} = this.props;
        if (val === null || val === undefined) {
            return;
        }
        const armor = (val as ArmorOption).value;

        const response = window.confirm("This armor will cost " + armor.cost + " nuyen.");
        if (response) {
            makeLog(1 * armor.cost, "Buying " + armor.name + " Armor", "Nuyen", new Date());
            adjustNuyen(1 * armor.cost);
            addArmor(armor);
        }
    }

    /**
     * Creates popups which get the necessary information to create a new custom armor.
     * Takes away the amount of money the user has and expects a positive input.
     */
    addGearArmor() {
        const {makeLog, adjustNuyen, addArmor} = this.props;
        let aNameNew: string | number | null = prompt("Enter the name of the armor:", "Clothes");
        if (aNameNew === "") {
            alert("Canceled input");
        } else if (aNameNew !== null) {
            let rateCap: string | number | null = prompt("Enter the rating:", "0");
            if (rateCap === null || (typeof rateCap === 'number' && (isNaN(rateCap) || rateCap < 0))) {
                alert("Armor must have a rating greater than or equal to 0");
            } else {
                let capCap: string | number | null = prompt("Enter the capacity:", "0");
                if (capCap === null || (typeof capCap === 'number' && (isNaN(capCap) || capCap < 0))) {
                    alert("Armor must have a capacity greater than or equal to 0");
                } else {
                    let availability: string | number | null = prompt("Enter the availability:", "0");
                    if (availability !== null) {
                        let costOfArmor: string | number | null = prompt("Enter the cost of the armor", "0");
                        if (costOfArmor !== null) {
                            if (costOfArmor === null || (typeof costOfArmor === 'number' && (isNaN(costOfArmor) || costOfArmor < 0))) {
                                alert("Nuyen value must be greater than or equal to 0")
                            } else {
                                costOfArmor = parseInt(costOfArmor);
                                //Creating the new armor
                                const armor = {
                                    name: aNameNew,
                                    rating: rateCap,
                                    capacity: parseInt(capCap),
                                    availability: parseInt(availability),
                                    cost: costOfArmor,
                                    equiped: true
                                } as Armor;
                                makeLog(-1 * costOfArmor, "Buying " + aNameNew, "Nuyen", new Date());
                                adjustNuyen(-1 * costOfArmor);
                                addArmor(armor);
                            }
                        }
                    }
                }
            }
        }

    }

////////////////////////////Melee Section////////////////////////////

    /**
     * Starts the creation of the gear table which displays the melee items.
     * Melee weapons can be found starting on page 421 of the core rulebook.
     */
    gearTableMelee() {
        //A list of all gear of the melee type
        let gearList = this.props.character.gear.melee;
        let gearRows = [];
        const title = "Melee";

        for (let i = 0; i < gearList.length; i++) {
            gearRows.push(this.gearRowMelee(i));
        }

        let plusButton = <button className={'Gear'} onClick={() => this.addGearMelee()}>Add {title}</button>;

        let presetButton = this.allMeleeDropdown();

        return (
            <div>
                <h2 className={'Gear'}>{title}</h2>
                <table className={'Gear'}>
                    <tbody>
                    <tr className={'Gear'}>
                        <th className={'GearMelee'}>Name</th>
                        <th className={'GearMelee'}>Acc</th>
                        <th className={'GearMelee'}>Reach</th>
                        <th className={'GearMelee'}>Damage</th>
                        <th className={'GearMelee'}>AP</th>
                        <th className={'GearMelee'}>Availability</th>
                        <th className={'GearMelee'}>Remove</th>
                    </tr>
                    {gearRows}
                    </tbody>
                </table>
                {presetButton}
                {plusButton}
            </div>
        );
    }

    /**
     * Generates the gear row by row by getting each of the current melee items the player has.
     * @param {*} index is the current gear we are on.
     */
    gearRowMelee(index: number) {
        let gear = this.props.character.gear.melee[index];
        let minusButton = <button className={'Gear'} onClick={() => this.removeGear('melee', index)}><span role={'img'}
                                                                                                           aria-label={'wastebasket'}>🗑️</span>
        </button>;

        if (gear === null) {
            return null;
        } else {
            return <tr className={'Gear'} key={index}>
                <td className={'GearMelee'}>{gear.name}</td>
                <td className={'GearMelee'}>{gear.acc}</td>
                <td className={'GearMelee'}>{gear.reach}</td>
                <td className={'GearMelee'}>{gear.dam}</td>
                <td className={'GearMelee'}>{gear.ap}</td>
                <td className={'GearMelee'}>{gear.availability}</td>
                <td className={'GearMelee'}>{minusButton}</td>
            </tr>
        }
    }

    /**
     * Generates a dropdown which contains all of the melee weapons from the JSON file melee.json.
     * Uses the react 'react-select'.
     * Returns the select menu with the values and calls the method to add the gear.
     */
    allMeleeDropdown() {
        const options: MeleeOption[] = [];

        let meleeTypes: object = meleeJSON.melee;


        Object.entries(meleeTypes).forEach((values) => {
            let melees: Array<Melee> = values[1];

            melees.forEach(melee => {
                options.push({
                    value: melee,
                    label: melee.name
                });
            });
        });

        return (
            <div className={'QualitiesDrop'}>
                <Select
                    options={options}
                    onChange={val => this.addPresetMelee(val)}
                />
            </div>
        );
    }

    /**
     * Adds the preset melee value from the allMeleeDropdown() method.
     */
    addPresetMelee(val: ValueType<MeleeOption>) {
        const {makeLog, adjustNuyen, addMelee} = this.props;
        if (val === null || val === undefined) {
            return;
        }
        const weapon = (val as MeleeOption).value;
        const response = window.confirm("This weapon will cost " + weapon.cost + " nuyen.");
        if (response) {
            makeLog(weapon.cost, "Buying " + weapon.name, "Nuyen", new Date());
            adjustNuyen(weapon.cost);
            addMelee(weapon);
        }
    }

    /**
     * Creates popups which get the necessary information to create a new custom melee weapon.
     * Takes away the amount of money the user has and expects a positive input.
     */
    addGearMelee() {
        const {makeLog, adjustNuyen, addMelee} = this.props;
        let aNameNew = prompt("Enter the name of the melee weapon:", "Club");
        if (aNameNew === "") {
            alert("Canceled input");
        } else if (aNameNew !== null) {
            let skill = prompt('Enter the combat skill associated with the weapon:', 'Clubs');
            if (skill !== null) {
                let accNew: string | number | null = prompt("Enter the acc:", "0");
                if (accNew === null || (typeof accNew === 'number' && (isNaN(accNew) || accNew < 0))) {
                    alert("Melee weapons must have an acc greater than or equal to 0");
                } else if (accNew !== null) {
                    let reachNew: string | number | null = prompt("Enter the reach:", "0");
                    if (reachNew === null || (typeof reachNew === 'number' && (isNaN(reachNew) || reachNew < 0))) {
                        alert("Melee Weapons must have a reach greater than or equal to 0");
                    } else if (reachNew !== null) {
                        let damNew: string | number | null = prompt("Enter the damage value:", "0");
                        if (damNew !== null) {
                            let apNew: string | number | null = prompt("Enter the ap:", "0");
                            if (apNew === null || (typeof apNew === 'number' && isNaN(apNew))) {
                                alert("Melee weapons must have a numerical ap value");
                            } else if (damNew !== null) {
                                let availability = prompt("Enter the availability:", "0");
                                if (availability !== null) {
                                    let costOfMelee: string | number | null = prompt("Enter the cost of the weapon", "0");
                                    if (costOfMelee !== null) {
                                        if (costOfMelee === null || (typeof costOfMelee === 'number' && (isNaN(costOfMelee) || costOfMelee < 0))) {
                                            alert("Nuyen value must be greater than or equal to 0")
                                        } else {
                                            //Creating the new melee weapon
                                            const weapon = {
                                                name: aNameNew,
                                                acc: accNew,
                                                reach: parseInt(reachNew),
                                                dam: damNew,
                                                ap: parseInt(apNew),
                                                availability: availability,
                                                cost: parseInt(costOfMelee),
                                                skill: skill
                                            } as Melee;
                                            makeLog(-1 * parseInt(costOfMelee), "Buying " + weapon.name, "Nuyen", new Date());
                                            adjustNuyen(-1 * parseInt(costOfMelee));
                                            addMelee(weapon);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

////////////////////////////Ranged Section////////////////////////////

    /**
     * Starts the creation of the gear table which displays the ranged items.
     * Ranged weapons can be found starting on page 424 of the core rulebook.
     */
    gearTableRanged() {
        //A list of all gear of the ranged type
        let gearList = this.props.character.gear.ranged;
        let gearRows = [];
        const title = "Ranged";


        for (let i = 0; i < gearList.length; i++) {
            gearRows.push(this.gearRowRanged(i));

        }

        let plusButton = <button className={'Gear'} onClick={() => this.addGearRanged()}>Add {title}</button>;

        let presetButton = this.allRangedDropdown();

        return (
            <div>
                <h2 className={'Gear'}>{title}</h2>
                <table className={'Gear'}>
                    <tbody>
                    <tr className={'Gear'}>
                        <th className={'GearRanged'}>Name</th>
                        <th className={'GearRanged'}>Acc</th>
                        <th className={'GearRanged'}>Damage</th>
                        <th className={'GearRanged'}>AP</th>
                        <th className={'GearRanged'}>Mode</th>
                        <th className={'GearRanged'}>RC</th>
                        <th className={'GearRanged'}>Ammo</th>
                        <th className={'GearRanged'}>Availability</th>
                        <th className={'GearRanged'}>Top Mount</th>
                        <th className={'GearRanged'}>Under Mount</th>
                        <th className={'GearRanged'}>Barrel Mount</th>
                        <th className={'GearRanged'}>Remove</th>
                    </tr>
                    {gearRows}
                    </tbody>
                </table>
                {presetButton}
                {plusButton}
            </div>
        );
    }

    /**
     * Will go through the weapons mounting types and see if the weapon has certain mounting types. If the weapon has the specific mounting types, all the attachments in the mounting type are returned.
     * @param mountType: the mount type being checked on the weapon to if it has it.
     * @param weapon: the weapon being checked.
     */
    mountOptions(mountType: string, weapon: Ranged) {
        let attachmentType;
        const options: AttachmentLabelOption[] = [];

        if (mountType === "top" && weapon.mounting.includes(mountType)) {
            attachmentType = attachers.attachments.top;
        } else if (mountType === "under" && weapon.mounting.includes(mountType)) {
            attachmentType = attachers.attachments.under;
        } else if (mountType === "barrel" && weapon.mounting.includes(mountType)) {
            attachmentType = attachers.attachments.barrel;
        }
        if (attachmentType) {
            if (weapon.category === "shotgun" || weapon.category === "revolver") { // shotguns and revolvers cannot have specific types of attachments even though they can have the mount type
                attachmentType = attachmentType.filter((one) => !one.type.includes("-") && (one.type.includes(weapon.category) || one.type === "any"))
            } else {
                attachmentType = attachmentType.filter((one) => (one.type.includes(weapon.category) || one.type === "any" || one.type.includes("-")))
            }
            for (const attachment of attachmentType) {
                options.push({
                    name: attachment.name,
                    effect: attachment.effect,
                    type: mountType,
                    cost: attachment.cost,
                    label: `${attachment.name}`
                });
            }

            return options || null;
        }
    }


    /**
     * Generates the gear row by row by getting each of the current ranged items the player has.
     * @param {*} index is the current gear we are on.
     */
    gearRowRanged(index: number) {
        let gear = this.props.character.gear.ranged[index];
        let topOptions = this.mountOptions("top", gear); //if the weapon can have top mounts, gives all the top mounts available to the weapon
        let underOptions = this.mountOptions("under", gear); //if the weapon can have under mounts, gives all the under mounts available to the weapon
        let barrelOptions = this.mountOptions("barrel", gear); //if the weapon can have barrel mounts, gives all the barrel mounts available to the weapon
        let minusButton = <button className={'Gear'} onClick={() => this.removeGear('ranged', index)}><span role={'img'}
                                                                                                            aria-label={'wastebasket'}>🗑️</span>
        </button>;
        if (gear === null) {
            return null;
        } else {
            return <tr className={'Gear'} key={index}>
                <td className={'GearRanged'}>{gear.name}</td>
                <td className={'GearRanged'}>{gear.acc}</td>
                <td className={'GearRanged'}>{gear.dam}</td>
                <td className={'GearRanged'}>{gear.ap}</td>
                <td className={'GearRanged'}>{gear.mode}</td>
                <td className={'GearRanged'}>{gear.RC}</td>
                <td className={'GearRanged'}>{gear.ammo}</td>
                <td className={'GearRanged'}>{gear.availability}</td>

                {this.mountPopups("Top", topOptions, index)}

                {this.mountPopups("Under", underOptions, index)}

                {this.mountPopups("Barrel", barrelOptions, index)}

                <td className={'GearRanged'}>{minusButton}</td>
            </tr>
        }
    }

    /**
     * Generates a dropdown which contains all of the ranged weapons from the JSON file ranged.json.
     * Uses the react 'react-select'.
     * Returns the select menu with the values and calls the method to add the gear.
     */
    allRangedDropdown() {
        const options: RangedOption[] = [];

        let rangeTypes: object = rangedJSON.ranged;
        Object.entries(rangeTypes).forEach((values) => {
            let rangedTypes: Array<Ranged> = values[1];

            rangedTypes.forEach(ranged => {
                options.push({
                    value: ranged,
                    label: `${ranged.name}`
                });
            });
        });

        return (
            <div className={'QualitiesDrop'}>
                <Select
                    options={options}
                    onChange={val => this.addPresetRanged(val)}
                />
            </div>
        );
    }

    /**
     * Adds the preset ranged value from the allRangedDropdown() method.
     */
    addPresetRanged(val: ValueType<RangedOption>) {
        const {makeLog, adjustNuyen, addRanged} = this.props;
        if (val === undefined || val === null) {
            return;
        }
        let ranged = (val as RangedOption).value;

        const response = window.confirm("This weapon will cost " + ranged.cost + " nuyen.");
        if (response) {
            makeLog(ranged.cost, "Buying " + ranged.name, "Nuyen", new Date());
            adjustNuyen(ranged.cost);
            addRanged(ranged);
        }
    }

    /**
     * Creates popups which get the nessisary information to create a new custom ranged weapon.
     * Takes away the amount of money the user has and expects a positive input.
     */
    addGearRanged() {
        const {makeLog, adjustNuyen, addRanged} = this.props;
        let aNameNew = prompt("Enter the name of the ranged weapon:", "Shotgun");
        if (aNameNew === "") {
            alert("Canceled input");
        } else if (aNameNew !== null) {
            let accNew = prompt("Enter the acc:", "0");
            if (accNew !== null) {
                let damNew = prompt("Enter the damage value:", "0");
                if (damNew !== null) {
                    let apNew = prompt("Enter the ap:", "0");
                    if (apNew !== null) {
                        let modeNew = prompt("Enter the mode:", "SA");
                        if (modeNew !== null) {
                            let rcNew = prompt("Enter the RC:", "2");
                            if (rcNew !== null) {
                                let ammoNew = prompt("Enter the ammo type:", "12(m)");
                                if (ammoNew !== null) {
                                    let availability = prompt("Enter the availability:", "0");
                                    if (availability !== null) {
                                        let costString: string | null = prompt("Enter the cost of the weapon", "0");
                                        let costOfRanged: number;
                                        if (costString !== null) {
                                            costOfRanged = parseInt(costString);
                                            if (costOfRanged < 0 || isNaN(costOfRanged)) {
                                                alert("Nuyen value must be greater than or equal to 0")
                                            } else {
                                                //Creating the new ranged weapon
                                                const ranged = {
                                                    name: aNameNew,
                                                    acc: accNew,
                                                    dam: damNew,
                                                    ap: apNew,
                                                    mode: modeNew,
                                                    RC: parseInt(rcNew),
                                                    ammo: parseInt(ammoNew),
                                                    availability: availability,
                                                    cost: costOfRanged
                                                } as Ranged;
                                                makeLog(-1 * costOfRanged, "Buying " + aNameNew, "Nuyen", new Date());
                                                adjustNuyen(-1 * costOfRanged);
                                                addRanged(ranged);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Removes the gear by taking what type of gear it is and how much money is to be added or removed.
     * It also updates the nuyen value and puts into the log what was removed.
     * @param type: the type of gear.
     * @param index: the index of the gear.
     */
    removeGear(type: string, index: number) {
        const {makeLog, adjustNuyen} = this.props;
        let nuyenVal: string | number | null = prompt("If selling this item, enter the nuyen gained from the item:", "1000");
        if (nuyenVal !== null) {
            nuyenVal = parseInt(nuyenVal);
            if (nuyenVal > 0 || !isNaN(nuyenVal)) {
                //Removes the gear given depending on the type and what item it is.
                switch (type.toLowerCase()) {
                    case 'armor':
                        this.props.remArmor(index);
                        break;
                    case 'melee':
                        this.props.remMelee(index);
                        break;
                    case 'ranged':
                        this.props.remRanged(index);
                        break;
                }
                makeLog(1 * nuyenVal, "Selling " + type, "Nuyen", new Date());
                adjustNuyen(1 * nuyenVal);
            }
        }
    }

    /**
     * Sends the information back to app.js to unequip the gear (armor) by sending its name.
     * The index is used to go to the armor section in the characters gear.
     * 2020.10.25 - To date, the only @param type that is passed is 'armor'.
     * @param type - the type of gear (ex. armor, melee, ranged).
     * @param index - row index of the gear on the table for this type of gear (ex. row 1 (index 1) on the armor table).
     * ADD MELEE, RANGED, ETC
     */
    equip(type: string, index: number) {
        const {toggleEquip} = this.props;
        toggleEquip(index);
    }

    /**
     * Will add the attachment to the weapon and take away the cost of it.
     * @param attachment: the attachment to be added.
     * @param index: the index of the weapon that contains the mount.
     */
    addMount = (attachment: any, index: number) =>  {
        let attachmentInfo = {
            name: attachment.name,
            effect: attachment.effect,
            type: attachment.type,
            cost: attachment.cost,
        }
        this.props.addAttachments(index, attachmentInfo);
        this.attachmentMoney(attachment);
        this.setState({isOpen: false});
    }

    /**
     * This will remove the desired attachment from the weapon and take away the cost from it.
     * @param attachment: the attachment to be removed.
     * @param index: the index of the weapon that contains the mount.
     */
    removeMount(attachment: any, index: number) {
        this.props.remAttachments(index, attachment);
        this.attachmentMoney(attachment);
    }

    /**
     * Will change the state of the currently selected attachment.
     * @param attachment: the attachment that is being added.
     */
    selectAttachment(attachment: any) {
       this.setState({selectedAttachment: attachment});
    }

    /**
     * This method will make sure that the cost is taken away from adding/removing the attachment's cost.
     * @param attachment: the attachment that is being added/removed.
     */
    attachmentMoney(attachment: any) {
        let name = attachment.name;
        let cost = attachment.cost;
        this.props.makeLog(cost, "Buying " + name, "Nuyen", new Date());
        this.props.adjustNuyen(cost);
    }

    /**
     * Will change the state of the isOpen state variable. This is for the popup to determine if the window will be open or close.
     */
    handleOpen = () => {
        this.setState({isOpen: true});
    }

    /**
     * Will handle the buttons for adding or removing attachments from weapons and also will show and close the pop ups accordingly.
     * @param type: the type of mount to be altered (top, under, or barrel).
     * @param options: will contain all the different attachments that can be mounted in the specific fashion.
     * @param index: the index of the ranged array. This will give the current weapon to add/remove attachments from.
     */
    mountPopups(type: string, options: any, index: number) {
       let attachmentName: any; //name of the attachment being selected.
       let removeAttachment: any; //will be used to determine which attachment will be removed. This is only necessary for the remAttachment method.
       let choice: boolean; // will be used to determine if the specific attachment button should be disabled or not.
       choice = false;
       let attachment = this.props.character.gear.ranged[index].equippedMount; //will give all the attachments available.

        let buttonName: string;

       if(options) { //if there are no options to pick from, this means the weapon does not have that specific mount.
           choice = true;
       }

        if(type === "Top") {
            attachmentName = attachment.topAttachment?.name;
            removeAttachment = attachment.topAttachment;
        }
        else if(type === "Under") {
            attachmentName = attachment.underAttachment?.name;
            removeAttachment = attachment.underAttachment;
        }
        else{
            attachmentName = attachment.barrelAttachment?.name;
            removeAttachment = attachment.barrelAttachment;
        }

        if(attachmentName === undefined) {
            buttonName = `Add ${type} Attachment`
        }
        else{
            buttonName = `Remove ${type} Attachment`
        }
        return <td className={'GearRanged'}>
            <Popup trigger={<button disabled={!choice}> {buttonName} </button>} position="center center"
                   contentStyle={{maxWidth: '600px', width: '90%'}} modal nested>
                <div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Recoil Effect</th>
                            <th>Cost</th>
                        </tr>
                        </thead>
                        <tbody>
                        {options?.map((one: any) => {
                            return <tr>
                                <td>{one.name}</td>
                                <td>{one.effect}</td>
                                <td>{one.cost}</td>
                            </tr>
                        })}
                        </tbody>
                    </Table>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Popup trigger={<button disabled={attachmentName}>Add Attachment</button>}
                               position="center center" modal open={this.state.isOpen} onOpen={this.handleOpen}>
                            <Select placeholder={"Select a default"}
                                    options={options}
                                    value={attachmentName}
                                    onChange={(e: any) => {
                                        this.selectAttachment(e);
                                    }}>Select something</Select>
                            <button
                                onClick={() => this.addMount(this.state.selectedAttachment, index)}>Confirm
                                purchase
                            </button>
                        </Popup>
                        <button disabled={!attachmentName} onClick={()=> this.removeMount(removeAttachment, index)}>Remove Attachment</button>
                    </div>
                </div>
            </Popup>
        </td>
    }

}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GearPage);