import React from 'react';
import '../CSS_Files/Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
    }

    /**
     * Will not render the header if there is not a character to prevent 
     * the usage of a state in app.js
     */
    render() {
        let page;

        if(this.props.character === null || typeof this.props.character === 'undefined'){
            page = this.unfilledHeader();
        } else if(typeof this.props.character.gear === 'undefined'){
            page = this.unfilledHeader();
        } else {
            page = this.header();
        }
        return(<div>
            {page}
        </div>)
    }

    /**
     * Creates a blank header to show when there is not a character uploaded
     */
    unfilledHeader(){
        return (
            <div className="headerdiv">
                <table className="headertable">
                    <tbody>
                        <tr className="headertr">
                            <td>Header not fully loaded, please load character</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );

    }

    /**
     * Generates the header and all of the needed information
     */
    header(){
        let armor = this.getArmorVal();
        return (
            <div className="headerdiv">
                <table className="headertable">
                    <tbody>
                    <tr className="headertr">
                        <td className="headertdatt" colSpan = "12">
                            {this.props.character.name} the {this.props.character.metatype}
                        </td>
                        <td className="headertd" colSpan="2">
                            Condition:
                        </td>
                        <td className="headertd">
                            Init: {this.props.character.attributes.REA + this.props.character.attributes.INT}+{this.props.character.initiative.initDice}d6
                        </td>
                        <td className="headertd">
                            Karma: {this.props.character.karma}
                        </td>
                    </tr>
                    <tr className="headertr">
                        <td className="headertdatt">
                            BOD:{this.props.character.attributes.BOD}
                        </td>
                        <td className="headertdatt">
                            AGI:{this.props.character.attributes.AGI}
                        </td>
                        <td className="headertdatt">
                            REA:{this.props.character.attributes.REA}
                        </td>
                        <td className="headertdatt">
                            STR:{this.props.character.attributes.STR}
                        </td>
                        <td className="headertdatt">
                            WIL:{this.props.character.attributes.WIL}
                        </td>
                        <td className="headertdatt">
                           LOG:{this.props.character.attributes.LOG}
                        </td>
                        <td className="headertdatt">
                            INT:{this.props.character.attributes.INT}
                        </td>
                        <td className="headertdatt">
                            CHA:{this.props.character.attributes.CHA}
                        </td>
                        <td className="headertdatt">
                            MAG:{this.props.character.attributes.MAG}
                        </td>
                        <td className="headertdatt">
                            RES:{this.props.character.attributes.RES}
                        </td>
                        <td className="headertdatt">
                            EDG:{this.props.character.currentEdge}/{this.props.character.attributes.EDG}
                        </td>
                        <td className="headertdatt">
                            ESS:{this.props.character.attributes.ESS}
                        </td>
                        <td className="headertd">
                            Physical: 0/12({this.props.character.conditionMonitor.physical})
                        </td>
                        <td className="headertd">
                            Stun: 0/8({this.props.character.conditionMonitor.stun})
                        </td>
                        <td className="headertd">
                            Armor: {armor}
                        </td>
                        <td className="headertd">
                            ¥: {this.props.character.money}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        );
    }

    /**
     * Updates the armor value as it is changed by gear.js as this is the
     * only location where the current armor value is shown
     */
    getArmorVal(){
        let armor = this.props.character.armor;
        let gearListArmor = this.props.character.gear.armor;
        for(let i = 0; i < gearListArmor.length; i++){
            if(gearListArmor[i].equiped){
                let rating = gearListArmor[i].rating;
                if(typeof rating == "string"){
                    if(rating.includes('+')){
                        armor = armor + parseInt(rating);
                    } else if(rating > armor){
                        armor = parseInt(rating);
                    }
                } else if(rating > armor){
                    armor = rating;
                }
            }
        }

        return armor;
    }

}

export default Header