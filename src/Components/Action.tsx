import React, {EventHandler} from 'react';
import '../CSS_Files/Action.css';
import Select, {ValueType} from 'react-select';
import {IShadowRunState} from '../redux/store';
import {Melee, Ranged} from '../models/playerModels';
import {ISkill} from "../models/playerModels";
import {connect} from 'react-redux';
import {elementType} from 'prop-types';

type IActionProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: IShadowRunState) => ({
    character: state.player
});
const mapDispatchToProps = {};
let option: string;
interface IActionState {
    testVariables: any[] | null;
    testValues: any[] | null;
    firingModes: any[] | null;
    mentalLimit: number | null;
    physicalLimit: number | null;
    socialLimit: number | null;
}

interface WeaponLabelOptionMelee {
    weapon: Melee;
    label: string
};

interface WeaponLabelOptionRanged {
    weapon: Ranged;
    label: string
};

interface SelectSkill {
    skill: ISkill;
    label: string;
    limit: string;
    specialization?: string;
}

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
class Action extends React.Component<IActionProps, IActionState> {
    constructor(props: IActionProps) {
        super(props);

        this.state = {
            //These two arrays will be rendered in table rows so the variables and values line up
            testVariables: null, //An array of the variable equation to display. Ex: ['Skill', '+', 'Att']
            testValues: null,    //An array of the value equation to display. Ex: [7, '+', 3, '=', 10]
            firingModes: null, //An array of firing modes to select from
            mentalLimit: null,
            physicalLimit: null,
            socialLimit: null
        };
    }

    /**
     * Calculates the mental/physical/social limit
     * @param {int} LSC Mental:LOG  Physical:STR  Social:CHA
     * @param {int} IBW Mental:INT  Physical:BOD  Social:WIL
     * @param {int} WRE Mental:WIS  Physical:REA  Social:ESS
     */
    limitCalculation(LSC: number, IBW: number, WRE: number) {
        return Math.ceil(((LSC * 2) + IBW + WRE) / 3);
    }

    /**
     * Creates a row for the inherent limits table for the specified type (Physical, Mental, or Social). The row displays
     * the calculation and value for the limit.
     * @param type A string of the limit type to create a row for (Physical, Mental, or Social).
     * @returns A table row containing the limit name, the calculation for the limit, and the limit value.
     */
    limitRow(type: string) {
        const {character: {attributes}} = this.props;
        let limit;
        let attrStrings, attrValStrings;
        switch (type) {
            case 'Mental':
                attrStrings = ['LOG', 'INT', 'WIL'];
                attrValStrings = [attributes.LOG, attributes.INT, attributes.WIL];
                limit = this.limitCalculation(attributes.LOG, attributes.INT, attributes.WIL);
                if (this.state.mentalLimit !== limit)
                    this.setState({mentalLimit: limit});
                break;
            case 'Physical':
                attrStrings = ['STR', 'BOD', 'REA'];
                attrValStrings = [attributes.STR, attributes.BOD, attributes.REA];
                limit = this.limitCalculation(attributes.STR, attributes.BOD, attributes.REA);
                if (this.state.physicalLimit !== limit)
                    this.setState({physicalLimit: limit});
                break;
            case 'Social':
                attrStrings = ['CHA', 'WIL', 'ESS'];
                attrValStrings = [attributes.CHA, attributes.WIL, attributes.ESS];
                limit = this.limitCalculation(attributes.CHA, attributes.WIL, attributes.ESS);
                if (this.state.socialLimit !== limit)
                    this.setState({socialLimit: limit});
                break;
            default:
                attrStrings = ['Uknown', 'Uknown', 'Uknown'];
                attrValStrings = ['Uknown', 'Uknown', 'Uknown'];
                console.log('ERROR: Unknown limit type row requested.');
                break;
        }

        const calcVars = ['[(', <b>{attrStrings[0]}</b>, 'x 2) +', <b>{attrStrings[1]}</b>, '+',
            <b>{attrStrings[2]}</b>, '] / 3 (round up)'];
        const calcVals = ['[(', <b>{attrValStrings[0]}</b>, 'x 2) +', <b>{attrValStrings[1]}</b>, '+',
            <b>{attrValStrings[2]}</b>, '] / 3 (round up)'];

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
    showSkillTest(val: ValueType<SelectSkill>) {
        if (val === undefined || val === null)
            return;
        const {physicalLimit, socialLimit, mentalLimit} = this.state;
        const skill = (val as SelectSkill).skill;
        const attValue = this.getCharacterAttribute(skill.attribute.toUpperCase());
        let result = skill.rating + attValue;
        let limitType = skill.limit;
        let limitVal;
        if (limitType === 'Physical') {
            limitVal = physicalLimit;
        } else if (limitType === 'Social') {
            limitVal = socialLimit;
        } else {
            limitVal = mentalLimit;
        }


        //Adjust the test display and result value if the used skill has a specialization
        if ((val as SelectSkill).specialization) {
            result += 2; //Add specialization bonus

            //These arrays will be rendered in a table so the variables and values line up
            this.setState({
                testVariables: [skill.name, '+', `{${skill.specialization}}`, '+',
                    <b>{skill.attribute}</b>, `[${limitType}]`],
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
    showMeleeWeaponTest = (val: ValueType<WeaponLabelOptionMelee>) => {
        option = "melee";
        if (val === undefined || val === null)
            return;
        const weapon = (val as WeaponLabelOptionMelee).weapon;
        // If melee do everything below
        const accValue = Number(weapon.acc);
        const foundSkills = this.props.character.skills.combat.filter((skill => skill.name.toLowerCase() === weapon.skill.toLowerCase()));
        let skill = undefined;
        let attribute = undefined;

        const testVariables = [];
        const testValues = [];

        const {physicalLimit, mentalLimit, socialLimit} = this.state;

        //Check if the weapon accuracy is an inherent limit
        switch (weapon.acc) {
            case 'Physical':
                testVariables.push('[Physical]');
                testValues.push(`[${physicalLimit}]`);
                break;
            case 'Mental':
                testVariables.push('[Mental]');
                testValues.push(`[${mentalLimit}]`);
                break;
            case 'Social':
                testVariables.push('[Social]');
                testValues.push(`[${socialLimit}]`);
                break;
            default:
                testVariables.push('[Weapon Acc.]');
                if (!isNaN(accValue)) {
                    testValues.push(`[${accValue}]`)
                } else {
                    testValues.push(`[${weapon.acc}]`)
                }
        }

        //Check if the character has the associated weapon skill
        if (foundSkills.length > 0) {
            skill = foundSkills[0];
            attribute = this.getCharacterAttribute(skill.attribute.toUpperCase());
        }

        //If the character has the skill, show the skill value and the attribute.
        if (skill !== undefined && attribute !== undefined) {
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
     * Displays the weapon test using the associated val object from the weapons dropdown. The calculation is displayed
     * as two table rows, with the first containing the names of the skill, attribute, and limit used and the second
     * containing the associated values of each. IF the character does not possess the associated weapon skill, a ? will
     * be displayed for its value.
     * @param val The object from the weapons dropdown containing the weapon information.
     */
    showRangedWeaponTest = (val: ValueType<WeaponLabelOptionRanged>) => {
        option = "ranged"; // for the
        if (val === undefined || val === null)
            return;
        const weapon = (val as WeaponLabelOptionRanged).weapon;
        const accValue = Number(weapon.acc);
        const foundSkills = this.props.character.skills.combat.filter((skill => skill.name.toLowerCase() === weapon.skill.toLowerCase()));
        let skill = undefined;
        let attribute = undefined;

        const testVariables = [];
        const testValues = [];
        const firingModes = [];

        const {physicalLimit, mentalLimit, socialLimit} = this.state;

        //Check if the weapon accuracy is an inherent limit
        switch (weapon.acc) {
            case 'Physical':
                testVariables.push('[Physical]');
                testValues.push(`[${physicalLimit}]`);
                break;
            case 'Mental':
                testVariables.push('[Mental]');
                testValues.push(`[${mentalLimit}]`);
                break;
            case 'Social':
                testVariables.push('[Social]');
                testValues.push(`[${socialLimit}]`);
                break;
            default:
                testVariables.push('[Weapon Acc.]');
                if (!isNaN(accValue)) {
                    testValues.push(`[${accValue}]`)
                } else {
                    testValues.push(`[${weapon.acc}]`)
                }
        }

        //Check if the character has the associated weapon skill
        if (foundSkills.length > 0) {
            skill = foundSkills[0];
            attribute = this.getCharacterAttribute(skill.attribute.toUpperCase());
        }

        //If the character has the skill, show the skill value and the attribute.
        if (skill !== undefined && attribute !== undefined) {
            testVariables.unshift(skill.name, '+', <b>{skill.attribute}</b>);
            testValues.unshift(skill.rating, '+', <b>{attribute}</b>);
            testValues.push('=', skill.rating + attribute);
            firingModes.push(weapon.mode);
        } else {
            //If they don't have the skill, show a ?
            testVariables.unshift(weapon.skill);
            testValues.unshift('?')
        }

        this.setState({
            testVariables: testVariables,
            testValues: testValues,
            firingModes: firingModes
        });
    }

    getCharacterAttribute = (capitalizedName: string) => {
        const {character: {attributes}} = this.props;
        switch (capitalizedName) {
            case "AGI":
                return attributes.AGI;
            case "BOD":
                return attributes.BOD;
            case "CHA":
                return attributes.CHA;
            case "EDG":
                return attributes.EDG;
            case "ESS":
                return attributes.ESS;
            case "INT":
                return attributes.INT;
            case "LOG":
                return attributes.LOG;
            case "MAG":
                return attributes.MAG;
            case "REA":
                return attributes.REA;
            case "RES":
                return attributes.RES;
            case "STR":
                return attributes.STR;
            case "WIL":
                return attributes.WIL;
            default:
                return 0;
        }
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
                    <td className={'attrOnly'}>
                        <h5>
                            Composure (<b>CHA</b> + <b>WIL</b>)<br/>{this.attrTest("CHA", "WIL")}
                        </h5>
                    </td>
                    <td className={'attrOnly'}>
                        <h5>Judge
                            Intention(<b>CHA</b> + <b>INT</b>)<br/>{this.attrTest("CHA", "INT")}
                        </h5>
                    </td>
                </tr>
                <tr className={'Action'}>
                    <td className={'attrOnly'}>
                        <h5>
                            Lifting/Carrying (<b>BOD</b> + <b>STR</b>)<br/>{this.attrTest("BOD", "STR")}
                        </h5>
                    </td>
                    <td className={'attrOnly'}>
                        <h5>
                            Memory (<b>LOG</b> + <b>WIL</b>)<br/> {this.attrTest("LOG", "WIL")}
                        </h5>
                    </td>
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
    attrTest(attr1: string, attr2: string) {
        const attr1String = attr1.toUpperCase();
        const attr2String = attr2.toUpperCase();
        const charAttr1 = this.getCharacterAttribute(attr1String);
        const charAttr2 = this.getCharacterAttribute(attr2String);
        const sum = charAttr1 + charAttr2;
        return (
            <div>
                <b>{charAttr1}</b> + <b>{charAttr2}</b> = {sum}
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
            <h1 className={'Action'}>Ranged Weapons</h1>
            {this.rangedWeaponsDropdown()}
        </div>
    }

    /**
     * Creates a dropdown of all the character's active skills and displays the skill test when  one is chosen from the
     * dropdown.
     * @returns A dropdown of all the character's active skills.
     */
    allSkillsDropdown() {
        const options: SelectSkill[] = [];
        const {skills} = this.props.character;

        const {combat, physical, social, magical, resonance, technical, vehicle} = skills;
        this.pushSkilOptions(combat, options);
        this.pushSkilOptions(physical, options);
        this.pushSkilOptions(social, options);
        this.pushSkilOptions(magical, options);
        this.pushSkilOptions(resonance, options);
        this.pushSkilOptions(technical, options);
        this.pushSkilOptions(vehicle, options);

        return <div className={'Action'} id={'allSkillsSelector'}><Select
            options={options}
            onChange={val => this.showSkillTest(val)}
        /></div>
    }

    private pushSkilOptions(skillCategory: ISkill[], options: SelectSkill[]): void {
        skillCategory.forEach(skillValue => {
            options.push({
                skill: skillValue,
                label: `${skillValue.name} (${skillValue.rating})`,
                limit: skillValue.limit
            });
            if (skillValue.specialization) {
                options.push({
                    skill: skillValue,
                    label: `${skillValue.name} {${skillValue.specialization}} (${skillValue.rating + 2})`,
                    limit: skillValue.limit,
                    specialization: skillValue.specialization
                });
            }
        });
    }

    /**
     * Creates a dropdown of all the character's melee weapons and displays the weapon test when one is chosen from the
     * dropdown.
     * @returns A dropdown of all the character's melee weapons.
     */
    meleeWeaponsDropdown() {
        const {character} = this.props;
        const options: WeaponLabelOptionMelee[] = [];
        for (const weapon of character.gear.melee) {
            options.push({
                weapon: weapon,
                label: `${weapon.name} (Acc: ${weapon.acc}, DV: ${weapon.dam}, AP: ${weapon.ap})`,
            });
        }

        return <div className={'Action'} id={'meleeWeaponSelector'}><Select
            options={options}
            onChange={this.showMeleeWeaponTest}
        /></div>
    }

    /**
     * Creates a dropdown of all the character's ranged weapons and displays the weapon test when one is chosen from the
     * dropdown.
     * @returns A dropdown of all the character's ranged weapons.
     */
    rangedWeaponsDropdown() {
        const {character} = this.props;
        const options: WeaponLabelOptionRanged[] = [];
        for (const weapon of character.gear.ranged) {
            options.push({
                weapon: weapon,
                label: `${weapon.name} (Acc: ${weapon.acc}, DV: ${weapon.dam}, AP: ${weapon.ap})`,
            });
        }

        return <div className={'Action'} id={'rangedWeaponSelector'}>
            <Select options={options}
                    onChange={this.showRangedWeaponTest}
            /></div>
    }

    /**
     * If there are test variables and values in the state, this displays the test calculation. The variables and values
     * are displayed in two table rows so that they line up with eachother.
     * @returns A table of the test variables and values, displaying the test calculation.
     */
    testDisplay() {
        if(option === "ranged") {
            return <div onClick={this.rangedWeaponsDropdown}>{this.firingModesTable()}</div>
        }
        else {
            return <div onClick={this.meleeWeaponsDropdown}>{this.meleeModesTable()}</div>
        }
    }


    /**
     * This is the calculation table to display for melees.
     * Will be used in testDisplay() method.
     * @returns a table of the calculations for melees.
     */
    meleeModesTable() {
        let {testValues, testVariables} = this.state;
        if (testVariables !== null && testValues !== null) {
            return <table className={'testResult'}>
                <tbody>
                <tr>
                    {testVariables.map((part, index) => <td key={index}>{part}</td>)}
                </tr>
                <tr>
                    {testValues.map((part, index) => <td key={index}>{part}</td>)}
                </tr>
                </tbody>
            </table>
        }
    }

    /**
     *This is the calculation table to display for ranged weapons.
     * Will be used in testDisplay() method.
     * @returns a table of the calculations for ranged weapons.
     */
    firingModesTable() {
        const {firingModes} = this.state;
        let modes = [];
        if (firingModes !== null) {
            if (firingModes[0].indexOf('/') > -1) {
                modes = firingModes[0].split("/")
            }
            return <div>
                {this.meleeModesTable()}
                <table className={'testResult'}>
                <tbody>
                <tr style={{padding: "20px"}}>
                    <td></td>
                    <td>Firing Modes:</td>
                </tr>
                {modes.map((part: string) => <tr>
                    <td></td>
                    <td><label htmlFor={part}><input type="radio" id={part} name="Firing Mode" value={part}/>{part}
                    </label></td>
                </tr>)}
                </tbody>
            </table>
                </div>
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
        const {character} = this.props;
        if (character === null || character.skills === undefined) {
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

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(Action);