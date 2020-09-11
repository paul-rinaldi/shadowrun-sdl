import React from 'react';
import '../CSS_Files/Attributes.css';

class Attributes extends React.Component {

    constructor(props) {
        super(props);
        this.updateAtt = this.props.updateAtt;
    }

    /**
     * finds the minimum and maximum attribute values based off of character metatype
     * metatypes are human, elf, dwarf, ork, and troll
     * metatype is pulled directly from JSON, capitalization does not matter
     */
    findMinMax() {
        let minMax;

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

        switch (this.props.character.metatype.toLowerCase()) {
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

        return minMax;
    }


    /**
     * This will calc if you can level up your desired ability
     * It changes depending on if it is any other attribute or ess, which increases in .1 increments
     */
    handleLevelUp(att) {
        const minMax = this.findMinMax();
        const min = minMax[`min${att}`];
        const max = minMax[`max${att}`];
        
        const rating = this.props.character.attributes[att];

        if(rating >= max){
            alert(`${att} is at its max rating.`);

        } else {
            if(att === 'ESS'){
                //Essence is updated by decimal places and does not cost karma or time
                this.props.updateAtt(att, 0.1, min, max);

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
                        this.props.updateAtt(att, 1, min, max);
                        this.props.adjKarm(-1 * karmaNeeded, `Increased ${att} attribute from ${rating} to ` +
                            `${newRating} (${time})`,"Karma");
                    }
                }
            }
        }
    }

    /**
     * This will calc if you can delevel up your desired ability
     * It changes depending on if it is any other attribute or ess, which increases in .1 increments
     */
    handleLevelDown(att) {
        const minMax = this.findMinMax();
        const min = minMax[`min${att}`];
        const max = minMax[`max${att}`];

        const rating = this.props.character.attributes[att];

        if(rating <= min){
            alert(`${att} is at its min rating.`);

        } else {
            if(att === 'ESS'){
                //Essence is updated by decimal places and does not refund karma or time
                this.props.updateAtt(att, -0.1, min, max);

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
                    this.props.updateAtt(att, -1, min, max);
                    this.props.adjKarm(karmaRefund, `Decreased ${att} attribute from ${rating} to ${newRating} ` +
                        `(returned ${time})`,"Karma");
                }
            }
        }
    }

    buttons(att) {
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
    limitCalculation(LSC, IBW, WRE) {
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

    // /**
    //  * Creates the table for the limits a character has
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
    limitRow(type) {
        const attributes = this.props.character.attributes;
        let att1;
        let att2;
        let att3;

        switch (type) {
            case 'Mental':
                att1 = 'LOG';
                att2 = 'INT';
                att3 = 'WIL';
                break;

            case 'Physical':
                att1 = 'STR';
                att2 = 'BOD';
                att3 = 'REA';
                break;

            case 'Social':
                att1 = 'CHA';
                att2 = 'WIL';
                att3 = 'ESS';
                break;

            default:
                console.log('ERROR: Unknown limit type row requested.');
                break;
        }

        const limit = this.limitCalculation(attributes[att1], attributes[att2], attributes[att3]);

        switch (type) {
            case 'Mental':
                this.mentalLimit = limit;
                break;

            case 'Physical':
                this.physicalLimit = limit;
                break;

            case 'Social':
                this.socialLimit = limit;
                break;

            default:
                console.log('ERROR: Unknown limit type row requested.');
                break;
        }

        const calcVars = ['[(', <b>{att1}</b>, 'x 2) +', <b>{att2}</b>, '+', <b>{att3}</b>, '] / 3 (round up)'];
        const calcVals = ['[(', <b>{attributes[att1]}</b>, 'x 2) +', <b>{attributes[att2]}</b>, '+', <b>{attributes[att3]}</b>, '] / 3 (round up)'];

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
    attRow(att, fullName) {
        return <tr className="att">
            {this.buttons(att)}
            <td className="att">{fullName}</td>
            <td className="att">{this.props.character.attributes[att]}</td>
        </tr>
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

export default Attributes;