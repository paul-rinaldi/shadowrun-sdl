import React from 'react';
import '../CSS_Files/Action.css';
import Select from 'react-select';

//Note: There are tons of actions in Shadowrun. The Action page focuses specifically on the actions that require dice
//rolls, like using skills or attacking with weapons.

//Some useful 5e core rulebook pages about actions:
//  163 (Action Phase) - Explanation of actions and types
//  44-49 - Explanation of tests, i.e., where dice are actually rolled to perform actions
//  163-168 - Listing of tons of combat actions, separated by type

/**
 * @class Represents the Action page. The page contains a listing of the character's inherent limits as well as
 * dropdowns from which the player can choose different actions to perform. When the player chooses an action, the site
 * will display the relevant variables and values used for the test associated with that action.
 */
class Action extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //These two arrays will be rendered in table rows so the variables and values line up
            testVariables: null, //An array of the variable equation to display. Ex: ['Skill', '+', 'Att']
            testValues: null,    //An array of the value equation to display. Ex: [7, '+', 3, '=', 10]
        };
    }

    //global vars
    mentalLimit;
    physicalLimit;
    socialLimit;

    /**
     * Calculates the mental/physical/social limit
     * @param {int} LSC Mental:LOG  Physical:STR  Social:CHA
     * @param {int} IBW Mental:INT  Physical:BOD  Social:WIL
     * @param {int} WRE Mental:WIS  Physical:REA  Social:ESS
     */
    limitCalculation(LSC, IBW, WRE) {
        return Math.ceil(((LSC * 2) + IBW + WRE) / 3);
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
     * Displays the skill test using the associated val object from the skills dropdown. The calculation is displayed as
     * two table rows, with the first containing the names of the skill, attribute, and limit used and the second
     * containing the associated values of each.
     * @param val The object from the skills dropdown containing the skill information.
     */
    showSkillTest(val) {
        const skill = val.skill;
        const attValue = this.props.character.attributes[skill.attribute.toUpperCase()];
        let result = skill.rating + attValue;
        let limitType = skill.limit;
        let limitVal;
        if (limitType === 'Physical') {
            limitVal = this.physicalLimit;
        } else if (limitType === 'Social') {
            limitVal = this.socialLimit;
        } else {
            limitVal = this.mentalLimit;
        }


        //Adjust the test display and result value if the used skill has a specialization
        if (val.specialization !== undefined) {
            result += 2; //Add specialization bonus

            //These arrays will be rendered in a table so the variables and values line up
            this.setState({
                testVariables: [skill.name, '+', `{${skill.specialization}}`, '+', <b>{skill.attribute}</b>, `[${limitType}]`],
                testValues: [skill.rating, '+', '{2}', '+', <b>{attValue}</b>, `[${limitVal}]`, '=', result]
            });
        } else {
            //These arrays will be rendered in a table so the variables and values line up
            this.setState({
                testVariables: [skill.name, '+', <b>{skill.attribute}</b>, `[${limitType}]`],
                testValues: [skill.rating, '+', <b>{attValue}</b>, `[${limitVal}]`, '=', result]
            });
        }
    }

    /**
     * Displays the weapon test using the associated val object from the weapons dropdown. The calculation is displayed
     * as two table rows, with the first containing the names of the skill, attribute, and limit used and the second
     * containing the associated values of each. IF the character does not possess the associated weapon skill, a ? will
     * be displayed for its value.
     * @param val The object from the weapons dropdown containing the weapon information.
     */
    showWeaponTest(val) {
        const weapon = val.weapon;
        const accValue = Number(weapon.acc);
        const foundSkills = this.props.character.skills.combat.filter((skill => skill.name.toLowerCase() === weapon.skill.toLowerCase()));
        let skill = undefined;
        let attribute = undefined;

        const testVariables = [];
        const testValues = [];

        //Check if the weapon accuracy is an inherent limit
        switch (weapon.acc) {
            case 'Physical':
                testVariables.push('[Physical]');
                testValues.push(`[${this.physicalLimit}]`);
                break;
            case 'Mental':
                testVariables.push('[Mental]');
                testValues.push(`[${this.mentalLimit}]`);
                break;
            case 'Social':
                testVariables.push('[Social]');
                testValues.push(`[${this.socialLimit}]`);
                break;
            default:
                testVariables.push('[Weapon Acc.]');
                if(!isNaN(accValue)){
                    testValues.push(`[${accValue}]`)
                } else {
                    testValues.push(`[${weapon.acc}]`)
                }
        }

        //Check if the character has the associated weapon skill
        if(foundSkills.length > 0){
            skill = foundSkills[0];
            attribute = this.props.character.attributes[skill.attribute.toUpperCase()];
        }

        //If the character has the skill, show the skill value and the attribute.
        if(skill !== undefined && attribute !== undefined){
            testVariables.unshift(skill.name, '+', <b>{skill.attribute}</b>);
            testValues.unshift(skill.rating, '+', <b>{attribute}</b>);
            testValues.push('=', skill.rating + attribute);
        } else {
            //If they don't have the skill, show a ?
            testVariables.unshift(weapon.skill);
            testValues.unshift('?')
        }

        this.setState({
            testVariables: testVariables,
            testValues: testValues
        });
    }

    /**
     * Displays the attribute-only tests, including Composure, Judge Intentions, Lifting/Carrying, and Memory.
     * @returns A div containing a table of the attribute only test calculations.
     */
    attributeOnlySection() {
        return <div>
            <h1 className={'Action'}>Attribute-Only Tests</h1>
            <table className={'Action'}>
                <tbody>
                <tr className={'Action'}>
                    <td className={'attrOnly'}><h5>Composure (<b>CHA</b> + <b>WIL</b>)<br/>{this.attrTest("CHA", "WIL")}
                    </h5></td>
                    <td className={'attrOnly'}><h5>Judge
                        Intention(<b>CHA</b> + <b>INT</b>)<br/>{this.attrTest("CHA", "INT")}</h5></td>
                </tr>
                <tr className={'Action'}>
                    <td className={'attrOnly'}><h5>Lifting/Carrying
                        (<b>BOD</b> + <b>STR</b>)<br/>{this.attrTest("BOD", "STR")}</h5></td>
                    <td className={'attrOnly'}><h5>Memory (<b>LOG</b> + <b>WIL</b>)<br/> {this.attrTest("LOG", "WIL")}
                    </h5></td>
                </tr>
                </tbody>
            </table>
        </div>
    }

    /**
     * Creates a div containing an attribute-only test calculation.
     * @param attr1 The first attribute in the calculation.
     * @param attr2 The second attribute in the calculation.
     * @returns A div showing the test calculation.
     */
    attrTest(attr1, attr2) {
        return (
            <div>
                <b>{this.props.character.attributes[attr1]}</b> + <b>{this.props.character.attributes[attr2]}</b> = {this.props.character.attributes[attr1] + this.props.character.attributes[attr2]}
            </div>
        );
    }

    /**
     * Displays the Skill header and dropdown.
     * @returns A div containing the Skill test header and skills dropdown
     */
    skillsSection() {
        return <div>
            <h1 className={'Action'}>Skill Tests</h1>
            {this.allSkillsDropdown()}
        </div>
    }

    /**
     * Displays the Combat section of the Action page.
     * @returns A div containing the headers and drop downs for the combat section.
     */
    combatSection() {
        return <div>
            <h1 className={'Action'}>Melee Weapons</h1>
            {this.meleeWeaponsDropdown()}
        </div>
    }

    /**
     * Creates a dropdown of all the character's active skills and displays the skill test when  one is chosen from the
     * dropdown.
     * @returns A dropdown of all the character's active skills.
     */
    allSkillsDropdown() {
        const options = [];

        for (const skillType in this.props.character.skills) {
            this.props.character.skills[skillType].forEach(skill => {
                options.push({
                    skill: skill,
                    label: `${skill.name} (${skill.rating})`,
                    limit: skill.limit
                });

                //Add another entry if the character has a specialization
                if (skill.specialization !== '') {
                    options.push({
                        specialization: skill.specialization,
                        skill: skill,
                        label: `${skill.name} {${skill.specialization}} (${skill.rating + 2})`,
                        limit: skill.limit
                    })
                }
            });
        }

        return <div className={'Action'} id={'allSkillsSelector'}><Select
            options={options}
            onChange={val => this.showSkillTest(val)}
        /></div>
    }

    /**
     * Creates a dropdown of all the character's melee weapons and displays the weapon test when one is chosen from the
     * dropdown.
     * @returns A dropdown of all the character's melee weapons.
     */
    meleeWeaponsDropdown(){
        const options = [];

        for (const weapon of this.props.character.gear.melee) {
            options.push({
                weapon: weapon,
                label: `${weapon.name} (Acc: ${weapon.acc}, DV: ${weapon.dam}, AP: ${weapon.ap})`,
            });
        }

        return <div className={'Action'} id={'meleeWeaponSelector'}><Select
            options={options}
            onChange={val => this.showWeaponTest(val)}
        /></div>
    }

    /**
     * If there are test variables and values in the state, this displays the test calculation. The variables and values
     * are displayed in two table rows so that they line up with eachother.
     * @returns A table of the test variables and values, displaying the test calculation.
     */
    testDisplay() {
        if (this.state.testVariables !== null && this.state.testValues !== null) {
            return <table className={'testResult'}>
                <tbody>
                <tr>
                    {this.state.testVariables.map((part, index) => <td key={index}>{part}</td>)}
                </tr>
                <tr>
                    {this.state.testValues.map((part, index) => <td key={index}>{part}</td>)}
                </tr>
                </tbody>
            </table>
        }
    }

    /**
     * Displays a table of the character's inherent limit calculations.
     * @returns A table of the character's inherent limit calculations.
     */
    limitsTables() {
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
     * Renders the Action page.
     * @returns A message saying the character is not loaded or the contents of the Action page if the character is
     * loaded.
     */
    render() {
        if (this.props.character === null || this.props.character.skills === undefined) {
            return <p>Needed properties missing from character file or no character loaded.</p>
        } else {
            return (
                <div>
                    {this.limitsTables()}
                    {this.attributeOnlySection()}
                    {this.skillsSection()}
                    {this.combatSection()}
                    {this.testDisplay()}
                </div>
            )
        }
    }
}

export default Action;