import React, {Component} from 'react';
import '../CSS_Files/Attributes.css';
import {connect} from "react-redux";
import {IShadowRunState} from "../redux/store";
import {setAttribute, setAttributes, setESS} from "../redux/actions/attributeAction";
import {adjustKarma} from "../redux/actions/karmaActions";
import {makeLog} from "../redux/actions/logActions";

type IAttributesProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

//state = the passed in state from the react-redux store (can be seen on index.tsx line 10)
const mapStateToProps = (state: IShadowRunState) => ({
    character: state.player
});

//These are the actions of the Attributes actions
const mapDispatchToProps = {
    setAttributes,
    setESS,
    setAttribute,
    adjustKarma,
    makeLog
}

class Attributes extends Component <IAttributesProps> {

    constructor(props: IAttributesProps) {
        super(props);
    }

    /**
     * finds the minimum and maximum attribute values based off of character metatype
     * metatypes are human, elf, dwarf, ork, and troll
     * metatype is pulled directly from JSON, capitalization does not matter
     */
    findMinMax = (attr: string): {min: number, max: number} => {
        let minMax;
        const attribute = attr.toUpperCase();

        const human = {
            maxBOD: 6,
            maxAGI: 6,
            maxREA: 6,
            maxSTR: 6,
            maxWIL: 6,
            maxLOG: 6,
            maxINT: 6,
            maxCHA: 6,
            maxEDG: 7,
            maxESS: 6,
            maxMAG: 6,
            maxRES: 6,
            minBOD: 1,
            minAGI: 1,
            minREA: 1,
            minSTR: 1,
            minWIL: 1,
            minLOG: 1,
            minINT: 1,
            minCHA: 1,
            minEDG: 2,
            minESS: 0,
            minMAG: 0,
            minRES: 0
        };

        const elf = {
            maxBOD: 6,
            maxAGI: 7,
            maxREA: 6,
            maxSTR: 6,
            maxWIL: 6,
            maxLOG: 6,
            maxINT: 6,
            maxCHA: 8,
            maxEDG: 6,
            maxESS: 6,
            maxMAG: 6,
            maxRES: 6,
            minBOD: 1,
            minAGI: 2,
            minREA: 1,
            minSTR: 1,
            minWIL: 1,
            minLOG: 1,
            minINT: 1,
            minCHA: 3,
            minEDG: 1,
            minESS: 0,
            minMAG: 0,
            minRES: 0
        };

        const dwarf = {
            maxBOD: 8,
            maxAGI: 6,
            maxREA: 5,
            maxSTR: 8,
            maxWIL: 7,
            maxLOG: 6,
            maxINT: 6,
            maxCHA: 6,
            maxEDG: 6,
            maxESS: 6,
            maxMAG: 6,
            maxRES: 6,
            minBOD: 3,
            minAGI: 1,
            minREA: 1,
            minSTR: 3,
            minWIL: 2,
            minLOG: 1,
            minINT: 1,
            minCHA: 1,
            minEDG: 1,
            minESS: 0,
            minMAG: 0,
            minRES: 0
        };

        const ork = {
            maxBOD: 9,
            maxAGI: 6,
            maxREA: 6,
            maxSTR: 8,
            maxWIL: 6,
            maxLOG: 5,
            maxINT: 6,
            maxCHA: 5,
            maxEDG: 6,
            maxESS: 6,
            maxMAG: 6,
            maxRES: 6,
            minBOD: 4,
            minAGI: 1,
            minREA: 1,
            minSTR: 3,
            minWIL: 1,
            minLOG: 1,
            minINT: 1,
            minCHA: 1,
            minEDG: 1,
            minESS: 0,
            minMAG: 0,
            minRES: 0
        };

        const troll = {
            maxBOD: 10,
            maxAGI: 5,
            maxREA: 6,
            maxSTR: 10,
            maxWIL: 6,
            maxLOG: 5,
            maxINT: 5,
            maxCHA: 4,
            maxEDG: 6,
            maxESS: 6,
            maxMAG: 6,
            maxRES: 6,
            minBOD: 5,
            minAGI: 1,
            minREA: 1,
            minSTR: 5,
            minWIL: 1,
            minLOG: 1,
            minINT: 1,
            minCHA: 1,
            minEDG: 1,
            minESS: 0,
            minMAG: 0,
            minRES: 0
        };

        const { character } = this.props; //decomposer to not have to constantly use this.props.? instead can just say character
        switch (character.metatype.toLowerCase()) {
            case "human":
                minMax = human;
                break;
            case "elf":
                minMax = elf;
                break;
            case "dwarf":
                minMax = dwarf;
                break;
            case "ork":
                minMax = ork;
                break;
            case "troll":
                minMax = troll;
                break;
            default:
                window.alert("Not a recognised metatype. Using human min/max");
                minMax = human;
                break;
        }

        switch (attribute) {
            case 'BOD': return {min: minMax.minBOD, max: minMax.maxBOD};
            case 'AGI': return {min: minMax.minAGI, max: minMax.maxAGI};
            case 'REA': return {min: minMax.minREA, max: minMax.maxREA};
            case 'STR': return {min: minMax.minSTR, max: minMax.maxSTR};
            case 'WIL': return {min: minMax.minWIL, max: minMax.maxWIL};
            case 'LOG': return {min: minMax.minLOG, max: minMax.maxLOG};
            case 'INT': return {min: minMax.minINT, max: minMax.maxINT};
            case 'CHA': return {min: minMax.minCHA, max: minMax.maxCHA};
            case 'EDG': return {min: minMax.minEDG, max: minMax.maxEDG};
            case 'ESS': return {min: minMax.minESS, max: minMax.maxESS};
            case 'MAG': return {min: minMax.minMAG, max: minMax.maxMAG};
            case 'RES': return {min: minMax.minRES, max: minMax.maxRES};
            default: return {min: 0, max: 0};
        }
    }


    /**
     * This will calc if you can level up your desired ability
     * It changes depending on if it is any other attribute or ess, which increases in .1 increments
     */
    handleLevelUp(att: string) {
        const minMax = this.findMinMax(att); //get min and max attributes based off of player meta type
        const min = minMax.min;
        const max = minMax.max;
        const rating = this.getAttribute(att);

        if(rating >= max){
            alert(`${att} is at its max rating.`);
        } else {
            if(att === 'ESS'){
                //Essence is updated by decimal places and does not cost karma or time
                setESS(0.1, min, max);
            } else {
                const newRating = rating + 1;
                const karmaNeeded = newRating * 5;
                let time;
                let timeString;

                //Edge doesn't take any training to upgrade because it is like a character's luck
                if(att === 'EDG'){
                    time = `no time`;
                    timeString = time;
                } else {
                    time = `${newRating} weeks`;
                    timeString = time + ` of training`;
                }

                const costString = `Increasing ${att} from ${rating} to ${newRating} will cost ${karmaNeeded} karma ` +
                    `and take ${timeString}.`;

                if (this.props.character.karma < karmaNeeded) {
                    alert(costString + "\n\nYou do not have enough karma for this upgrade.");

                } else {
                    const response = window.confirm(costString + `\n\nIs it OK to upgrade ${att}?`);
                    if (response) {
                        setAttribute(att, 1, min, max); //sets the selected attribute to specified min and maxa
                        adjustKarma(-1 * karmaNeeded); //adjust the karma
                        makeLog(-1 * karmaNeeded, `Increased ${att} attribute from ${rating} to ` +
                            `${newRating} (${time})`,"Karma", new Date()); //log the update that was completed
                    }
                }
            }
        }
    }

    /**
     * This will calc if you can delevel up your desired ability
     * It changes depending on if it is any other attribute or ess, which increases in .1 increments
     */
    handleLevelDown(att: string) {
        const minMax = this.findMinMax(att);
        const min = minMax.min;
        const max = minMax.max;

        const rating = this.getAttribute(att);

        if(rating <= min){
            alert(`${att} is at its min rating.`);

        } else {
            if(att === 'ESS'){
                //Essence is updated by decimal places and does not refund karma or time
                setESS(-0.1, min, max);

            } else {
                const newRating = rating - 1;
                const karmaRefund = rating * 5;
                let time;
                let timeString;

                //Edge doesn't take any training to downgrade because it is like a character's luck
                if(att === 'EDG'){
                    time = `no time`;
                    timeString = time;
                } else {
                    time = `${rating} weeks`;
                    timeString = time + ` weeks of training`
                }

                const response = window.confirm(`Decreasing ${att} from ${rating} to ${newRating} will refund ` +
                    `${karmaRefund} karma and return ${timeString}.` +
                    `\n\nReverting attributes is not allowed by game rules, it is only meant ` +
                    `to be done if you accidentally increased an attribute. Is it OK to revert ${att}?`);

                if (response) {
                   setAttribute(att, -1, min, max);
                   makeLog(karmaRefund, `Decreased ${att} attribute from ${rating} to ${newRating} ` +
                        `(returned ${time})`,"Karma", new Date());
                }
            }
        }
    }

    buttons(att: string) {
        return (
            <td className='att'>
                <button onClick={() => this.handleLevelDown(att)}>-</button>
                <button onClick={() => this.handleLevelUp(att)}>+</button>
            </td>)

    }


    /**
     * calculates the mental/physical/social limit
     * @param {int} LSC Mental:LOG  Physical:STR  Social:CHA
     * @param {int} IBW Mental:INT  Physical:BOD  Social:WIL
     * @param {int} WRE Mental:WIS  Physical:REA  Social:ESS
     */
    limitCalculation(LSC: number, IBW: number, WRE: number) {
        return Math.ceil(((LSC * 2) + IBW + WRE) / 3);
    }

    physicalAttributesTable() {
        return (
            <table className="att">
                <tbody>
                <tr className="att">
                    <th/>
                    <th className="att">Physical</th>
                    <th className="att">Rtg.</th>
                </tr>
                {this.attRow('BOD', 'Body')}
                {this.attRow('AGI', 'Agility')}
                {this.attRow('REA', 'Reaction')}
                {this.attRow('STR', 'Strength')}
                </tbody>
            </table>
        );
    }

    /**
     * Creates the table for the mental typed attributes
     */
    MentalAttributesTable() {
        return (
            <table className="att">
                <tbody>
                <tr className="att">
                    <th/>
                    <th className="att">Mental</th>
                    <th className="att">Rtg.</th>
                </tr>
                {this.attRow('WIL', 'Willpower')}
                {this.attRow('LOG', 'Logic')}
                {this.attRow('INT', 'Intuition')}
                {this.attRow('CHA', 'Charisma')}
                </tbody>
            </table>
        );
    }

    /**
     * Creates the table for the special typed attributes
     */
    specialAttributesTable() {
        return (
            <table className="att">
                <tbody>
                <tr className="att">
                    <th/>
                    <th className="att">Special</th>
                    <th className="att">Rtg.</th>
                </tr>
                {this.attRow('EDG', 'Edge')}
                {this.attRow('MAG', 'Magic')}
                {this.attRow('RES', 'Resonance')}
                {this.attRow('ESS', 'Essence')}
                </tbody>
            </table>
        );
    }


    /**
     * Displays a table of the character's inherent limit calculations.
     * @returns A table of the character's inherent limit calculations.
     */
    limitsTable() {
        return <div>
            <h1 className={'Action'}>Inherent Limits</h1>
            <table className={'actLim'}>
                <tbody className={'actLim'}>
                <tr className={'actLim'}>
                    <th className={'actLim'}>Type</th>
                    <th className={'actLim'}>Calculation</th>
                    <th className={'actLim'}>Value</th>
                </tr>
                {this.limitRow('Mental')}
                {this.limitRow('Physical')}
                {this.limitRow('Social')}

                </tbody>
            </table>
        </div>
    }

    /**
     * Creates a row for the inherent limits table for the specified type (Physical, Mental, or Social). The row displays
     * the calculation and value for the limit.
     * @param type A string of the limit type to create a row for (Physical, Mental, or Social).
     * @returns A table row containing the limit name, the calculation for the limit, and the limit value.
     */
    limitRow(type : string) {
            const { character: { attributes } } = this.props; //will get the attributes of the character. variable name is 'attributes'
            let limit;
            let attrStrings, attrValStrings;
            switch (type) {
                case 'Mental':
                    attrStrings = ['LOG', 'INT', 'WIL'];
                    attrValStrings = [attributes.LOG, attributes.INT, attributes.WIL];
                    limit = this.limitCalculation(attributes.LOG, attributes.INT, attributes.WIL);
                    this.setState({mentalLimit: limit});
                    break;
                case 'Physical':
                    attrStrings = ['STR', 'BOD', 'REA'];
                    attrValStrings = [attributes.STR, attributes.BOD, attributes.REA];
                    limit = this.limitCalculation(attributes.STR, attributes.BOD, attributes.REA);
                    this.setState({physicalLimit: limit});
                    break;
                case 'Social':
                    attrStrings = ['CHA', 'WIL', 'ESS'];
                    attrValStrings = [attributes.CHA, attributes.WIL, attributes.ESS];
                    limit = this.limitCalculation(attributes.CHA, attributes.WIL, attributes.ESS);
                    this.setState({socialLimit: limit});
                    break;
                default:
                    attrStrings = ['Uknown', 'Uknown', 'Uknown'];
                    attrValStrings = ['Uknown', 'Uknown', 'Uknown'];
                    console.log('ERROR: Unknown limit type row requested.');
                    break;
            }

        const calcVars = ['[(', <b>{attrStrings[0]}</b>, 'x 2) +', <b>{attrStrings[1]}</b>, '+', <b>{attrStrings[2]}</b>, '] / 3 (round up)'];
        const calcVals = ['[(', <b>{attrValStrings[0]}</b>, 'x 2) +', <b>{attrValStrings[1]}</b>, '+', <b>{attrValStrings[2]}</b>, '] / 3 (round up)'];

        const calcTable = <table>
            <tbody>
            <tr>{calcVars.map((entry, index) => <td key={index}>{entry}</td>)}</tr>
            <tr>{calcVals.map((entry, index) => <td key={index}>{entry}</td>)}</tr>
            </tbody>
        </table>;

        return <tr className={'actLim'}>
            <td className={'actLim'}>{type}</td>
            <td className={'actLim'}>
                {calcTable}
            </td>
            <td className={'actLim'}>
                {limit}
            </td>
        </tr>
    }

    /**
     * 
     * @param {} att is the given attirbute shortened
     * @param {*} fullName is the attributes full name
     */
    attRow(att: string, fullName: string) {
        return <tr className="att">
            {this.buttons(att)}
            <td className="att">{fullName}</td>
            <td className="att">{this.getAttribute(att)}</td>
        </tr>
    }

    private getAttribute = (attribute: string) => {
        const { character } = this.props;
        const { attributes } = character;
        attribute = attribute.toUpperCase();
        switch (attribute) {
            case 'BOD': return attributes.BOD;
            case 'AGI': return attributes.AGI;
            case 'REA': return attributes.REA;
            case 'STR': return attributes.STR;
            case 'WIL': return attributes.WIL;
            case 'LOG': return attributes.LOG;
            case 'INT': return attributes.INT;
            case 'CHA': return attributes.CHA;
            case 'EDG': return attributes.EDG;
            case 'ESS': return attributes.ESS;
            case 'MAG': return attributes.MAG;
            case 'RES': return attributes.RES;
            default: return 0;
        }
    }

    /**
     * Creates the attribute page
     */
    attPage() {
        return <div>
            {this.physicalAttributesTable()}
            {this.MentalAttributesTable()}
            {this.specialAttributesTable()}
            {this.limitsTable()}
        </div>
    }

    /**
     * page will not render with tables unless attributes are set
     */
    render() {
        let page;
        if(this.props.character === null) {
            page = <p>Load a character file to see their attributes</p>;
        } else{
            page = this.attPage();
        }
        return (<div>
            <h1 className="att">Attributes</h1>
            {page}
        </div>)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Attributes);


/**

// /**
//  * Creates the table for the limits a character has
    *dont need rn but put back if its needed ever. Was commented out before SDL 2020 fall team inherited the project
//  */
// limitsTable() {
//     return (
//         <table className="lim">
//             <tbody>
//             <tr className="att">
//                 <th className="att">Type</th>
//                 <th className="lim">Rtg.</th>
//                 <th className="att">Inherent Limits</th>
//             </tr>
//             <tr className="lim">
//                 <td className="lim">Physical Limit</td>
//                 <td className="lim">{this.limitCalculation(this.props.character.attributes
//                     .STR, this.props.character.attributes
//                     .BOD, this.props.character.attributes
//                     .REA)}</td>
//                 <td className="lim">[(Strength x 2) + Body + Reaction]/3 Rounded Up</td>
//             </tr>
//             <tr className="lim">
//                 <td className="lim">Mental Limit</td>
//                 <td className="lim">{this.limitCalculation(this.props.character.attributes
//                     .LOG, this.props.character.attributes
//                     .INT, this.props.character.attributes
//                     .WIL)}</td>
//                 <td className="lim">[(Logic x 2) + Intuition + Willpower]/3 Rounded Up</td>
//             </tr>
//             <tr className="lim">
//                 <td className="lim">Social Limit</td>
//                 <td className="lim">{this.limitCalculation(this.props.character.attributes
//                     .CHA, this.props.character.attributes
//                     .WIL, this.props.character.attributes
//                     .ESS)}</td>
//                 <td className="lim">[(Charisma x 2) + Willpower + Essence]/3 Rounded Up</td>
//             </tr>
//             </tbody>
//         </table>
//     );
// }
