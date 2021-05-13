import React from 'react';
import { connect } from 'react-redux';
import '../CSS_Files/Overview.css';
import { IShadowRunState } from '../redux/store';


type IOverviewProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: IShadowRunState) => ({
    character: state.player
});
const mapDispatchToProps = {

};

/**
 * @class represents a page which gives a general overview of the character for stats and information
 * about the character which would not go anywhere else and unimplemented information which would
 * eventually be on its own page. It is a static page until the damage table can be implemented
 * 
 * The basis of the page was to show information as the first page that was implemented.
 * It is formated after the character sheet found on page 108-109 in the player handbook
 */
class Overview extends React.Component<IOverviewProps> {
    render(){
        if(this.props.character === null || typeof this.props.character.name === 'undefined'){
            return (<p>Overview Page is not loaded, please load a character</p>);
        } else {
            return (this.overviewPage());
        }
    }
    /**
     * Generates the different tables in pieces, allows the types to be removed and moved easily
     */
    overviewPage(){
        return(
            <table className={'Special'}>
                <tbody>
                    <tr>
                        <td className={'overviewLayout'}>
                        {this.titleTable()}

                        {this.attributeTable()}

                        {this.DamageTable()}
                        </td>
                        <td className={'overviewLayout'}>
                        {this.personalTable()}

                        {this.IDTable()}

                        {this.CyberdeckTable()}

                        {this.AugmentTable()}

                        {this.RitPrepCompTable()}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    /**
     * Returns the character image and the characters name and race
     */
    titleTable(){
        return(
            <div className={'Overview'}>
                <table className="Overview">
                    <tbody>
                    <tr>
                        <td><img className="Overview" alt="" src={this.props.character.img}/></td>
                        <td><h1 className="Overview">{this.props.character.name} the {this.props.character.metatype}</h1></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    /**
     * Generates a table for custom information about the character
     */
    personalTable(){
        return(
            <div className={'Overview'}>
                <table className="Overview" id="Personal">
                    <tbody>
                        <tr className="Overview" >
                            <td className="Overview">Personal Data</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview"> {this.props.character.personal}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    /**
     * Creates a more detailed attribute table than the one currently shown on the header
     */
    attributeTable(){
        return(
            <div className={'Overview'}>
                <table  className="Overview" id="Attributes">
                    <tbody>
                        <tr className="Overview" >
                            <td className="Overview" colSpan={3}>Attributes</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview" id="BOD">BOD: {this.props.character.attributes.BOD}</td>
                            <td className="Overview" id="ESSENCE">Essence: {this.props.character.attributes.ESS}</td>
                        </tr>
                        <tr className="Overview">
                            <td className="Overview" id="WIL">WIL: {this.props.character.attributes.WIL}</td>
                            <td className="Overview" id="Mag">Magic/Resonance: {this.props.character.attributes.MAG}/{this.props.character.attributes.RES}</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview" id="AGI">AGI: {this.props.character.attributes.AGI}</td>
                            <td className="Overview" id="INIT">Initiative: {this.props.character.attributes.REA + this.props.character.attributes.INT}+{this.props.character.initiative.initDice}d6</td>
                        </tr>
                        <tr>
                            <td className="Overview" id="LOG">LOG: {this.props.character.attributes.LOG}</td>
                            <td className="Overview" id="MatrixINIT">Matrix Initiative: {this.props.character.attributes.INT}+3d6 C / {this.props.character.attributes.INT}+4d6 H</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview" id="REA">REA: {this.props.character.attributes.REA}</td>
                            <td className="Overview" id="astralINIT">Astral Initiative: {this.props.character.attributes.INT * 2}+2d6</td>
                        </tr>
                        <tr>
                            <td className="Overview" id="INT">INT: {this.props.character.attributes.INT}</td>
                            <td className="Overview" id="Comp">Composure: {this.props.character.attributes.CHA + this.props.character.attributes.WIL}</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview" id="STR">STR: {this.props.character.attributes.STR}</td>
                            <td className="Overview" id="Judge">Judge Intentions: {this.props.character.attributes.CHA + this.props.character.attributes.INT}</td>
                        </tr>
                        <tr>
                            <td className="Overview" id="CHA">CHA: {this.props.character.attributes.CHA}</td>
                            <td className="Overview" id="Memory">Memory: {this.props.character.attributes.LOG + this.props.character.attributes.WIL}</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview" id="Edge">EDG: {this.props.character.attributes.EDG}</td>
                            <td className="Overview" id="LiftCarry">Lift/Carry: {this.props.character.attributes.STR * 15} lbs.</td>
                        </tr>
                        <tr>
                            <td className="Overview" id="MaxEdge">Edge Points: {this.props.character.currentEdge}</td>
                            <td className="Overview" id="Movement">Movement: {this.props.character.attributes.AGI * 2}/{this.props.character.attributes.AGI * 4} feet</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    /**
     * Shows the type of lifestyle the character lives and details about it
     */
    IDTable(){
        return(
            <div className={'Overview'}>
                <table  className="Overview" id="ID">
                    <tbody>
                        <tr className="Overview" >
                            <td  className="Overview" colSpan={3}>ID/Lifestyle/Currency</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview" >ID's: {this.props.character.ID}</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview" >Lifestyle: {this.props.character.lifestyle}</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview" >Nuyen: {this.props.character.money}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }


    /**
     * Displays the current cyberdeck amd the first two programs on it
     */
    CyberdeckTable(){
        return(
            <div className={'Overview'}>
                <table className="Overview" id="Cyberdeck">
                    <tbody>
                        <tr className="Overview" >
                            <td className="Overview" colSpan={3}>Cyberdeck</td>
                        </tr>
                    <tr className="Overview" >
                            <td className="Overview">Model: {this.props.character.cyberdeck.model}</td>
                            <td className="Overview">Attack:  {this.props.character.cyberdeck.attack}</td>
                            <td className="Overview">Sleaze:  {this.props.character.cyberdeck.sleaze}</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview">Device Rating:  {this.props.character.cyberdeck.deviceRating}</td>
                            <td className="Overview">Data Processing:  {this.props.character.cyberdeck.dataProcessing}</td>
                            <td className="Overview">Firewall:  {this.props.character.cyberdeck.firewall}</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview" colSpan={3}>Matrix Condition Monitor:  {this.props.character.cyberdeck.condition}</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview" colSpan={3}>
                                Program Name: {this.props.character.cyberdeck.programs[0].pName} Type: {this.props.character.cyberdeck.programs[0].type}
                                <br/>
                                Program Name: {this.props.character.cyberdeck.programs[1].pName} Type: {this.props.character.cyberdeck.programs[1].type}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }


    /**
     * Displays the first two augments the player has
     */
    AugmentTable(){
        return(
            <div className={'Overview'}>
                <table className="Overview" id="Augmentations">
                    <tbody>
                        <tr className="OverviewAug" >
                            <td className="OverviewAug">Augmentation</td>
                            <td className="OverviewAug">Rating</td>
                            <td className="OverviewAug">Notes</td>
                            <td className="OverviewAug">Essence</td>
                        </tr>
                        <tr className="OverviewAug" >
                            <td className="OverviewAug">{this.props.character.augmentations[0].aName}</td>
                            <td className="OverviewAug">{this.props.character.augmentations[0].rating}</td>
                            <td className="OverviewAug">{this.props.character.augmentations[0].notes}</td>
                            <td className="OverviewAug">{this.props.character.augmentations[0].essence}</td>
                        </tr>
                        <tr className="OverviewAug" >
                            <td className="OverviewAug">{this.props.character.augmentations[1].aName}</td>
                            <td className="OverviewAug">{this.props.character.augmentations[1].rating}</td>
                            <td className="OverviewAug">{this.props.character.augmentations[1].notes}</td>
                            <td className="OverviewAug">{this.props.character.augmentations[1].essence}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    /**
     * Displays the damage tables that a character has
     */
    DamageTable(){
        return(
            <div className={'Overview'}>
                <table className="Overview" id="DamageTrackers">
                    <tbody>
                    <tr><td>
                        <table className="Overview" id="Stun">
                            <tbody>
                                <tr className="Overview" >
                                    <td  className="Overview" colSpan={3}>Stun Damage Tracker</td>
                                </tr>
                                <tr className="Overview" >
                                    <td className="Overview" />
                                    <td className="Overview" />
                                    <td className="Overview" > -1</td>
                                </tr>
                                <tr className="Overview" >
                                    <td className="Overview" />
                                    <td className="Overview" />
                                    <td className="Overview" > -2</td>
                                </tr>
                                <tr className="Overview" >
                                    <td className="Overview" />
                                    <td className="Overview" />
                                    <td className="Overview" > -3</td>
                                </tr>
                                <tr className="Overview" >
                                    <td className="Overview" />
                                    <td className="Overview" />
                                    <td className="Overview" > -4</td>
                                </tr>
                            </tbody>
                        </table>
                        </td>
                        
                        <td>
                        <table className="Overview" id="Physical">
                            <tbody>
                                <tr className="Overview" >
                                    <td  className="Overview" colSpan={3}>Physical Damage Tracker</td>
                                </tr>
                                <tr className="Overview" >
                                    <td className="Overview" />
                                    <td className="Overview" />
                                    <td className="Overview" > -1</td>
                                </tr>
                                <tr className="Overview" >
                                    <td className="Overview" />
                                    <td className="Overview" />
                                    <td className="Overview" > -2</td>
                                </tr>
                                <tr className="Overview" >
                                    <td className="Overview" />
                                    <td className="Overview" />
                                    <td className="Overview" > -3</td>
                                </tr>
                                <tr className="Overview" >
                                    <td className="Overview" />
                                    <td className="Overview" />
                                    <td className="Overview" > -4</td>
                                </tr>
                                <tr className="Overview" >
                                    <td className="Overview" />
                                    <td className="Overview" />
                                    <td className="Overview" > -5</td>
                                </tr>
                                <tr className="Overview" >
                                    <td className="Overview" />
                                    <td className="Overview" />
                                    <td className="Overview" > -6</td>
                                </tr>
                            </tbody>
                        </table>
                        </td></tr>
                        </tbody>
                </table>
            </div>
        );
    }

    /**
     * Displays the spells, preparations, rituals, and complex forms that the character would have
     */
    RitPrepCompTable(){
        return(
            <div className={'Overview'}>
                <table className="Overview" id="RitPrepRitComplex">
                    <tbody>
                        <tr className="Overview" >
                            <td className="Overview" colSpan={2}>Spells/Preparations/Rituals/Complex Forms</td>
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview">Spells: {this.props.character.RitPrepRitComplex.spells}</td>
                            
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview">Complex Forms: {this.props.character.RitPrepRitComplex.complexForms}</td>
                            
                        </tr>
                        <tr className="Overview" >
                            <td className="Overview">Sprites: {this.props.character.RitPrepRitComplex.sprites}</td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Overview);