import React from 'react';
import '../CSS_Files/Gear.css';
import armorJSON from '../Armor.json';
import meleeJSON from '../Melee.json';
import rangedJSON from '../Ranged.json';
import { Ranged, Gear, Armor, Melee } from '../models/playerModels';
import { connect } from 'react-redux';
import { IShadowRunState } from '../redux/store';
import Select, { ValueType } from 'react-select';
// import { gearReducer } from '../redux/reducers/gearReducer';
import { setGear } from '../redux/actions/gearAction';

interface RangedOption { value: Ranged; label: string; }
interface MeleeOptions { value: Melee; label: string; }

type IGearProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: IShadowRunState) => ({
    character: state.player
});
const mapDispatchToProps = {
    // fx to pass in
};

/**
 * @class represents the gear page which manages the armor, melee, and ranged weapons
 * Armor can be equipped and unequiped which then interacts with the header page to update appropriately,
 * then all gear can be added or removed. They can be added by either a custom item or from a list
 * from the Armor.json, Melee.json, or the Ranged.json
 */
class GearPage extends React.Component<IGearProps>{
    /**
     * Renders the Gear page, which contains tables containing various information about all the character's 
     * active gear.
     * @returns gear page or a message that no character is loaded.
     */
    render(){
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
     * Adds in gear to is appropriate place in the players list of gear
     * @param {*} typeGear is what kind of gear category it belongs to
     * @param {*} gear is the full json object of the new gear
     */
    updateAddGear(typeGear: string, gear: Gear){
        let gearCopy = JSON.parse(JSON.stringify(this.state.gear));
        gearCopy[typeGear].push(gear);

        this.setState({
            gear: gearCopy
        });
    }

    /**
     * Calls the tables which are to be created for the gear page
     * @returns the entire page with the armor, melee, and ranged tables created
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
     * Starts the creation of the gear table which displays the armor
     * Armor can be found starting on page 436 of the core rulebook
     * @param type The type the gear that is currently being created
     */
    gearTableArmor(){
        //A list of all gear of the armor type
        let gearList = this.props.character.gear.armor;
        let gearRows = [];
        const title = "Armor";

        for (let i = 0; i < gearList.length; i++) {
            gearRows.push(this.gearRowArmor(i));
        }
        
        let plusButton = <button className={'Gear'} onClick={() => this.addGearArmor()}>Add {title}</button>;

        let presetButton = this.allArmorDropdown();

        return(
            <div>
                <h2 className={'Gear'}>{title}</h2>
                <table className={'Gear'}>
                    <tbody>
                    <tr className={'Gear'}>
                        <th className={'Gear'}></th>
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
     * Generates the gear row by row by getting each of the current armor the player has
     * @param {*} type is the armor gear
     * @param {*} index is the current gear we are on
     */
    gearRowArmor(index: number) {
        let gear = this.props.character.gear.armor[index];
        let minusButton = <button className={'Gear'} onClick={() => this.removeGear('armor', index)}><span role={'img'} aria-label={'wastebasket'}>🗑️</span></button>;

        if (gear === null) { // || gear === ""
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
     * Generates a dropdown which contains all of the armor from the JSON file armor.json
     * Uses the react 'react-select'
     * Returns the select menu with the values and calls the method to add the gear
     */
    allArmorDropdown() {
        const options = [];

        armorJSON["armor"].forEach(armor => {
            options.push({
                value: armor,
                label: `${armor.name}`
            });
        });

        return <div className={'QualitiesDrop'}><Select
            options={options}
            onChange={val => this.addPresetArmor(val.value)}
        /></div>
    }
    
    /**
     * Adds the preset armor value from the allArmorDropdown() method
     */
    addPresetArmor(armor: Armor) {
        if (armor === null || armor === undefined) {
            return;
        }
        const response = window.confirm("This armor will cost " + armor.cost + " nuyen.");
        if (response) {
            this.props.adjNuyen(1 * armor.cost, "Buying " + armor.name + " Armor", "Nuyen");
            gearReducer("SET_ARMOR_ACTION", armor);
        }
    }

    /**
     * Creates popups which get the nessisary information to create a new custom armor
     * Takes away the ammount of money the user has and expects a positive input
     */
    addGearArmor(){
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
                        if(costOfArmor !== null) {
                            if (costOfArmor === null || (typeof costOfArmor === 'number' && (isNaN(costOfArmor) || costOfArmor < 0))) {
                                alert("Nuyen value must be greater than or equal to 0")
                            } else {
                                //Creating the new armor
                                const armor = {
                                    name: aNameNew,
                                    rating: rateCap,
                                    capacity: capCap,
                                    availability: availability,
                                    cost: costOfArmor,
                                    equiped: true
                                };
                                this.props.adjNuyen(-1 * costOfArmor, "Buying " + aNameNew, "Nuyen");
                                this.props.updateAddGear("armor", armor);
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
     * Melee weapons can be found starting on page 421 of the core rulebook
     * @param type The type the gear that is currently being created
     */
    gearTableMelee(){
        //A list of all gear of the melee type
        let gearList = this.props.character.gear.melee;
        let gearRows = [];
        const title = "Melee";

        for(let i = 0; i < gearList.length; i++){
            gearRows.push(this.gearRowMelee(i));
        }
        
        let plusButton = <button className={'Gear'} onClick={() => this.addGearMelee()}>Add {title}</button>;

        let presetButton = this.allMeleeDropdown();

        return(
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
     * Generates the gear row by row by getting each of the current melee items the player has
     * @param {*} type is the melee gear
     * @param {*} index is the current gear we are on
     */
    gearRowMelee(index: number){
        let gear = this.props.character.gear.melee[index];
        let minusButton = <button className={'Gear'}onClick={() => this.removeGear('melee', index)}><span role={'img'} aria-label={'wastebasket'}>🗑️</span></button>;

        if(gear === null) { //  || gear === ""
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
     * Generates a dropdown which contains all of the melee weapons from the JSON file melee.json
     * Uses the react 'react-select'
     * Returns the select menu with the values and calls the method to add the gear
     */
    allMeleeDropdown(){
        const options: MeleeOptions[] = [];
        // var x;

        // for(x in meleeJSON["melee"]){
        //     meleeJSON["melee"][x].forEach(melee => {
        //         options.push({
        //             value: melee,
        //             label: `${melee.name}`
        //         });
        //     });
        // }

        let meleeTypes: object = meleeJSON["melee"];
        Object.entries(meleeTypes).forEach((meleeType) => {
            meleeType.forEach(melee => {
                options.push({
                    value: melee,
                    label: `${melee.name}`
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
     * Adds the preset melee value from the allMeleeDropdown() method
     */
    addPresetMelee(weapon: Melee){
        if (weapon === null || weapon === undefined) {
            return;
        }
        const response = window.confirm("This weapon will cost " + weapon.cost + " nuyen.");
        if(response){
            this.props.adjNuyen(weapon.cost, "Buying " + weapon.name, "Nuyen");
            this.props.updateAddGear("melee", weapon);
        }
    }

    /**
     * Creates popups which get the nessisary information to create a new custom melee weapon
     * Takes away the ammount of money the user has and expects a positive input
     */
    addGearMelee(){
        let aNameNew = prompt("Enter the name of the melee weapon:", "Club");
        if (aNameNew === "") {
            alert("Canceled input");
        } else if(aNameNew !== null) {
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
                                    if(costOfMelee !== null) {
                                        if (costOfMelee === null || (typeof costOfMelee === 'number' && (isNaN(costOfMelee) || costOfMelee < 0))) {
                                            alert("Nuyen value must be greater than or equal to 0")
                                        } else {
                                            //Creating the new melee weapon
                                            const weapon = {
                                                name: aNameNew,
                                                acc: accNew,
                                                reach: reachNew,
                                                dam: damNew,
                                                ap: apNew,
                                                availability: availability,
                                                cost: costOfMelee,
                                                skill: skill
                                            };
                                            this.props.adjNuyen(-1 * parseInt(costOfMelee), "Buying " + weapon.name, "Nuyen");
                                            
                                            this.props.updateAddGear("melee", weapon);
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
     * Starts the creation of the gear table which displays the ranged items
     * Ranged weapons can be found starting on page 424 of the core rulebook
     * @param type The type the gear that is currently being created
     */
    gearTableRanged(){
        //A list of all gear of the ranged type
        let gearList = this.props.character.gear.ranged;
        let gearRows = [];
        const title = "Ranged";

        for(let i = 0; i < gearList.length; i++){
            gearRows.push(this.gearRowRanged(i));
        }
        
        let plusButton = <button className={'Gear'} onClick={() => this.addGearRanged()}>Add {title}</button>;

        let presetButton = this.allRangedDropdown();

        return(
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
     * Generates the gear row by row by getting each of the current ranged items the player has
     * @param {*} type is the ranged gear
     * @param {*} index is the current gear we are on
     */
    gearRowRanged(index: number){
        let gear = this.props.character.gear.ranged[index];
        let minusButton = <button className={'Gear'}onClick={() => this.removeGear('ranged', index)}><span role={'img'} aria-label={'wastebasket'}>🗑️</span></button>;

        if(gear === null) { //  || gear === ""
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
                <td className={'GearRanged'}>{minusButton}</td>
            </tr>
        }
    }

    /**
     * Generates a dropdown which contains all of the ranged weapons from the JSON file ranged.json
     * Uses the react 'react-select'
     * Returns the select menu with the values and calls the method to add the gear
     */
    allRangedDropdown(){
        const options: RangedOption[] = [];
        // old javascript
        // var x;
        // for(x in rangedJSON["ranged"]){
        //     rangedJSON["ranged"][x].forEach(ranged => {
        //         options.push({
        //             value: ranged,
        //             label: `${ranged.name}`
        //         });
        //     });
        // }

        let rangeTypes: object = rangedJSON["ranged"];
        Object.entries(rangeTypes).forEach((rangeType) => {
            rangeType.forEach(ranged => {
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
     * Adds the preset ranged value from the allRangedDropdown() method
     */
    addPresetRanged(ranged: ValueType<Range>){
        if (ranged === undefined || ranged === null) {
            return;
        }
        const response = window.confirm("This weapon will cost " + ranged.cost + " nuyen.");
        if(response){
            this.props.adjNuyen(parseInt(ranged.cost), "Buying " + ranged.name, "Nuyen");
            this.props.updateAddGear("ranged", ranged);
        }
    }

    /**
     * Creates popups which get the nessisary information to create a new custom ranged weapon
     * Takes away the ammount of money the user has and expects a positive input
     */
    addGearRanged(){
    let aNameNew = prompt("Enter the name of the ranged weapon:", "Shotgun");
        if (aNameNew === "") {
            alert("Canceled input");
        } else if(aNameNew !== null){
            let accNew = prompt("Enter the acc:", "0");
            if(accNew !== null){
                let damNew = prompt("Enter the damage value:", "0");
                if(damNew !== null){
                    let apNew = prompt("Enter the ap:", "0");
                    if(apNew !== null){
                        let modeNew = prompt("Enter the mode:", "SA");
                        if(modeNew !== null){
                            let rcNew = prompt("Enter the RC:", "2");
                            if(rcNew !== null){
                                let ammoNew = prompt("Enter the ammo type:", "12(m)");
                                if(ammoNew !== null){
                                    let availability = prompt("Enter the availability:", "0");
                                    if(availability !== null){
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
                                                    RC: rcNew,
                                                    ammo: ammoNew,
                                                    availability: availability,
                                                    cost: costOfRanged
                                                }
                                                this.props.adjNuyen(-1 * costOfRanged, "Buying " + aNameNew, "Nuyen");
                                                this.props.updateAddGear("ranged", ranged);
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

    //Removes the gear by taking what type of gear it is and how much money is to be added or removed.
    // It also updates the nuyen value and puts into the log what was removed
    removeGear(type: string, index: number){
        const nuyenVal = prompt("If selling this item, enter the nuyen gained from the item:", "1000");
        if (nuyenVal !== null) {
            //Removes the gear given depending on the type and what item it is
            this.props.updateRemGear(index, type);
            this.props.adjNuyen(1 * nuyenVal, "Selling" + type, "Nuyen");
        }
    }

    //Sends the information back to app.js to unequip the gear (armor) by sending its name, if it is currently equiped, its rating, capacity, avaliability, cost. 
    //The index is used to go to the armor section in the characters gear
    equip(type: string, index: number){
        this.props.updateUnequipArmor(
            this.props.character.gear[type][index].name,
            this.props.character.gear[type][index].equiped,
            this.props.character.gear[type][index].rating,
            this.props.character.gear[type][index].capacity,
            this.props.character.gear[type][index].availability,
            this.props.character.gear[type][index].cost, index);
    }


}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GearPage);