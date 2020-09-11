import React from 'react';
import '../CSS_Files/Gear.css'
import armorJSON from '../Armor.json'
import meleeJSON from '../Melee.json'
import rangedJSON from '../Ranged.json'
// import Popup from './Popup.js'; commented out from lack of full implementation
import Select from 'react-select';


/**
 * @class represents the gear page which manages the armor, melee, and ranged weapons
 * Armor can be equipped and unequiped which then interacts with the header page to update appropriately,
 * then all gear can be added or removed. They can be added by either a custom item or from a list
 * from the Armor.json, Melee.json, or the Ranged.json
 */
class Gear extends React.Component{

    constructor(props){  
        super(props);  
        //Generator for the popup
        this.state = { showPopup: false };  
    }

    /**
     * Renders the Gear page, which contains tables containing various information about all the character's 
     * active gear.
     * @returns gear page or a message that no character is loaded.
     */
    render(){
        let page;

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
     * Unimplemented leftovers from Popup.js
     */
    togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup  
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
            {this.gearTableArmor('Armor')}
            {this.gearTableMelee('Melee')}
            {this.gearTableRanged('Ranged')}
        </div>

        return layout;

    }

////////////////////////////Armor Section////////////////////////////

    /**
     * Starts the creation of the gear table which displays the armor
     * Armor can be found starting on page 436 of the core rulebook
     * @param type The type the gear that is currently being created
     */
    gearTableArmor(type){
        //A list of all gear of the armor type
        let gearList = this.props.character.gear[type.toLowerCase()];
        let gearRows = [];

        for (let i = 0; i < gearList.length; i++) {
            gearRows.push(this.gearRowArmor(type.toLowerCase(), i));
        }
        
        let plusButton = <button className={'Gear'} onClick={() => this.addGearArmor()}>Add {type}</button>;

        let presetButton = this.allArmorDropdown();

        //Popup button test
        //let test = <button onClick={this.togglePopup.bind(this)}> Click To Launch Popup</button>;

        return(
            <div>
                <h2 className={'Gear'}>{type}</h2>
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

                
                {/* Leftover from popip {test}
                {this.state.showPopup ?  
                    <Popup  
                        text='Click "Close Button" to hide popup'  
                        closePopup={this.togglePopup.bind(this)}
                        send={}  
                    />  
                    : null  
                }    */}


            </div>

            
        );
    }

    /**
     * Generates the gear row by row by getting each of the current armor the player has
     * @param {*} type is the armor gear
     * @param {*} index is the current gear we are on
     */
    gearRowArmor(type, index) {
        let gear = this.props.character.gear[type][index];
        let minusButton = <button className={'Gear'} onClick={() => this.removeGear(type, index)}><span role={'img'} aria-label={'wastebasket'}>🗑️</span></button>;

        if (gear === null || gear === "") {
            return null;
        } else {
            let eButton;
            let equiped;
            if (gear.equiped) {
                eButton = <button className={'Gear'} onClick={() => this.equip(type, index)}>Unequip</button>;
                equiped = "✓";
            } else {
                eButton = <button className={'Gear'} onClick={() => this.equip(type, index)}>Equip</button>;
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
    addPresetArmor(armor) {
        const response = window.confirm("This armor will cost " + armor.cost + " nuyen.");
        if (response) {
            this.props.adjNuyen(1 * armor.cost, "Buying " + armor.name + " Armor", "Nuyen");
            this.props.updateAddGear("armor", armor);
        }
    }

    /**
     * Creates popups which get the nessisary information to create a new custom armor
     * Takes away the ammount of money the user has and expects a positive input
     */
    addGearArmor(){
        let aNameNew = prompt("Enter the name of the armor:", "Clothes");
        if (aNameNew === "") {
            alert("Canceled input");
        } else if (aNameNew !== null) {
            let rateCap = prompt("Enter the rating:", "0");
            if (rateCap < 0 || isNaN(rateCap)) {
                alert("Armor must have a rating greater than or equal to 0");
            } else if (rateCap !== null) {
                let capCap = prompt("Enter the capacity:", "0");
                if (capCap < 0 || isNaN(capCap)) {
                    alert("Armor must have a capacity greater than or equal to 0");
                } else if (capCap !== null) {
                    let availability = prompt("Enter the availability:", "0");
                    if (availability !== null) {
                        let costOfArmor = prompt("Enter the cost of the armor", "0");
                        if(costOfArmor !== null) {
                            if (costOfArmor < 0 || isNaN(costOfArmor)) {
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
    gearTableMelee(type){
        //A list of all gear of the melee type
        let gearList = this.props.character.gear[type.toLowerCase()];
        let gearRows = [];

        for(let i = 0; i < gearList.length; i++){
            gearRows.push(this.gearRowMelee(type.toLowerCase(), i));
        }
        
        let plusButton = <button className={'Gear'} onClick={() => this.addGearMelee()}>Add {type}</button>;

        let presetButton = this.allMeleeDropdown();

        return(
            <div>
            <h2 className={'Gear'}>{type}</h2>
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
    gearRowMelee(type, index){
        let gear = this.props.character.gear[type][index];
        let minusButton = <button className={'Gear'}onClick={() => this.removeGear(type, index)}><span role={'img'} aria-label={'wastebasket'}>🗑️</span></button>;

        if(gear === null || gear === ""){
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
        const options = [];
        var x;
        for(x in meleeJSON["melee"]){
            meleeJSON["melee"][x].forEach(melee => {
                options.push({
                    value: melee,
                    label: `${melee.name}`
                });
            });
        }

        return <div className={'QualitiesDrop'}><Select
            options={options}
            onChange={val => this.addPresetMelee(val.value)}
        /></div>
    }
    
    /**
     * Adds the preset melee value from the allMeleeDropdown() method
     */
    addPresetMelee(weapon){
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
                let accNew = prompt("Enter the acc:", "0");
                if (accNew < 0 || isNaN(accNew)) {
                    alert("Melee weapons must have an acc greater than or equal to 0");
                } else if (accNew !== null) {
                    let reachNew = prompt("Enter the reach:", "0");
                    if (reachNew < 0) {
                        alert("Melee Weapons must have a reach greater than or equal to 0");
                    } else if (reachNew !== null) {
                        let damNew = prompt("Enter the damage value:", "0");
                        if (damNew !== null) {
                            let apNew = prompt("Enter the ap:", "0");
                            if (isNaN(apNew)) {
                                alert("Melee weapons must have a numerical ap value");
                            } else if (damNew !== null) {
                                let availability = prompt("Enter the availability:", "0");
                                if (availability !== null) {
                                    let costOfMelee = prompt("Enter the cost of the weapon", "0");
                                    if(costOfMelee !== null) {
                                        if (costOfMelee < 0 || isNaN(costOfMelee)) {
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
    gearTableRanged(type){
        //A list of all gear of the ranged type
        let gearList = this.props.character.gear[type.toLowerCase()];
        let gearRows = [];

        for(let i = 0; i < gearList.length; i++){
            gearRows.push(this.gearRowRanged(type.toLowerCase(), i));
        }
        
        let plusButton = <button className={'Gear'} onClick={() => this.addGearRanged()}>Add {type}</button>;

        let presetButton = this.allRangedDropdown();

        return(
            <div>
            <h2 className={'Gear'}>{type}</h2>
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
    gearRowRanged(type, index){
        let gear = this.props.character.gear[type][index];
        let minusButton = <button className={'Gear'}onClick={() => this.removeGear(type, index)}><span role={'img'} aria-label={'wastebasket'}>🗑️</span></button>;

        if(gear === null || gear === ""){
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
        const options = [];
        var x;
        for(x in rangedJSON["ranged"]){
            rangedJSON["ranged"][x].forEach(ranged => {
                options.push({
                    value: ranged,
                    label: `${ranged.name}`
                });
            });
        }

        return <div className={'QualitiesDrop'}><Select
            options={options}
            onChange={val => this.addPresetRanged(val.value)}
        /></div>
    }

    /**
     * Adds the preset ranged value from the allRangedDropdown() method
     */
    addPresetRanged(ranged){
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
                                        let costOfRanged = prompt("Enter the cost of the weapon", "0");
                                        if(costOfRanged !== null) {
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
                                                this.props.adjNuyen(-1 * parseInt(costOfRanged), "Buying " + aNameNew, "Nuyen");
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
    removeGear(type, index){
        const nuyenVal = prompt("If selling this item, enter the nuyen gained from the item:", "1000");
        if (nuyenVal !== null) {
            //Removes the gear given depending on the type and what item it is
            this.props.updateRemGear(index, type);
            this.props.adjNuyen(1 * nuyenVal, "Selling" + type, "Nuyen");
        }
    }

    //Sends the information back to app.js to unequip the gear (armor) by sending its name, if it is currently equiped, its rating, capacity, avaliability, cost. 
    //The index is used to go to the armor section in the characters gear
    equip(type, index){
        this.props.updateUnequipArmor(this.props.character.gear[type][index].name, this.props.character.gear[type][index].equiped, this.props.character.gear[type][index].rating, this.props.character.gear[type][index].capacity, this.props.character.gear[type][index].availability, this.props.character.gear[type][index].cost, index);
    }


}

export default Gear;