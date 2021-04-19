import React from "react";
import "../CSS_Files/Action.css";
import Select, { ValueType } from "react-select";
import { IShadowRunState } from "../redux/store";
import {
    Attachments,
    CharacterAmmo,
    ICharacter,
    Melee,
    Ranged,
    WeaponModes,
} from "../models/playerModels";
import { ISkill } from "../models/playerModels";
import { connect } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {Button, Table} from "react-bootstrap";
import { remAmmo } from "../redux/actions/ammoAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AmmoDropdown from "./Inputs/AmmoDropdown";
import ReactDice from "react-dice-complete"
import 'react-dice-complete/dist/react-dice-complete.css';
import Popup from "reactjs-popup";


type IActionProps = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps;
const mapStateToProps = (state: IShadowRunState) => ({
  character: state.player,
});
const mapDispatchToProps = {
  remAmmo,
};
let option: string;
let recoilComp = 0;
//Val = 0;
let reactDice: any;
let selectRef: any;
let isProgressive: boolean; //will control if the recoil compensation is progressive or not
interface IActionState {
    testVariables: any[] | null;
    testValues: any[] | null;
    mentalLimit: number | null;
    physicalLimit: number | null;
    socialLimit: number | null;
    rangedWeaponSelected: Ranged | null;
    mounted: string;
    firingType: number;
    modeSelected: WeaponModes | null;
    currentWeapon: string | null;
    previousWeapon: string | null;
    selectedMode: modeLabelOption | null;
    ammoSelected: CharacterAmmo | null;
    attachmentSelected: AttachmentLabelOption | null;
    initiativeValue: number;
}

interface WeaponLabelOptionMelee {
    weapon: Melee;
    label: string;
}

interface WeaponLabelOptionRanged {
    weapon: Ranged;
    label: string;
}

interface modeLabelOption {
    name: string;
    numAmmoToShoot: number;
    defenseModifier: number;
    label: string;
}
interface AttachmentLabelOption {
    name: string;
    effect: number;
    label: string;

}

interface SelectSkill {
    skill: ISkill;
    label: string;
    limit: string;
    specialization?: string;
}

// Page 178 textbook

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
        isProgressive = false;
        this.rollDoneCallback = this.rollDoneCallback.bind(this);
        this.assignRef = this.assignRef.bind(this);
        this.rollAll = this.rollAll.bind(this);

        this.state = {
            //These two arrays will be rendered in table rows so the variables and values line up
            testVariables: null, //An array of the variable equation to display. Ex: ['Skill', '+', 'Att']
            testValues: null, //An array of the value equation to display. Ex: [7, '+', 3, '=', 10]
            mentalLimit: null,
            physicalLimit: null,
            socialLimit: null,
            rangedWeaponSelected: null,
            mounted: "Unmounted",
            firingType: 0,
            modeSelected: null,
            currentWeapon: null,
            previousWeapon: null,
            selectedMode: null,
            ammoSelected: null,
            attachmentSelected: null,
            initiativeValue: 0
        };

    }

    handleAmmoSelect(ammo: CharacterAmmo) {
        this.setState({ammoSelected: ammo});
    }

  /**
   * Calculates the mental/physical/social limit
   * @param {int} LSC Mental:LOG  Physical:STR  Social:CHA
   * @param {int} IBW Mental:INT  Physical:BOD  Social:WIL
   * @param {int} WRE Mental:WIS  Physical:REA  Social:ESS
   */
  limitCalculation(LSC: number, IBW: number, WRE: number) {
    return Math.ceil((LSC * 2 + IBW + WRE) / 3);
  }

    /**
     * Creates a row for the inherent limits table for the specified type (Physical, Mental, or Social). The row displays
     * the calculation and value for the limit.
     * @param type A string of the limit type to create a row for (Physical, Mental, or Social).
     * @returns A table row containing the limit name, the calculation for the limit, and the limit value.
     */
    limitRow(type: string) {
        const {
            character: {attributes},
        } = this.props;
        let limit;
        let attrStrings, attrValStrings;
        switch (type) {
            case "Mental":
                attrStrings = ["LOG", "INT", "WIL"];
                attrValStrings = [attributes.LOG, attributes.INT, attributes.WIL];
                limit = this.limitCalculation(
                    attributes.LOG,
                    attributes.INT,
                    attributes.WIL
                );
                if (this.state.mentalLimit !== limit)
                    this.setState({mentalLimit: limit});
                break;
            case "Physical":
                attrStrings = ["STR", "BOD", "REA"];
                attrValStrings = [attributes.STR, attributes.BOD, attributes.REA];
                limit = this.limitCalculation(
                    attributes.STR,
                    attributes.BOD,
                    attributes.REA
                );
                if (this.state.physicalLimit !== limit)
                    this.setState({physicalLimit: limit});
                break;
            case "Social":
                attrStrings = ["CHA", "WIL", "ESS"];
                attrValStrings = [attributes.CHA, attributes.WIL, attributes.ESS];
                limit = this.limitCalculation(
                    attributes.CHA,
                    attributes.WIL,
                    attributes.ESS
                );
                if (this.state.socialLimit !== limit)
                    this.setState({socialLimit: limit});
                break;
            default:
                attrStrings = ["Uknown", "Uknown", "Uknown"];
                attrValStrings = ["Uknown", "Uknown", "Uknown"];
                console.log("ERROR: Unknown limit type row requested.");
                break;
        }

        const calcVars = [
            "[(",
            <b>{attrStrings[0]}</b>,
            "x 2) +",
            <b>{attrStrings[1]}</b>,
            "+",
            <b>{attrStrings[2]}</b>,
            "] / 3 (round up)",
        ];
        const calcVals = [
            "[(",
            <b>{attrValStrings[0]}</b>,
            "x 2) +",
            <b>{attrValStrings[1]}</b>,
            "+",
            <b>{attrValStrings[2]}</b>,
            "] / 3 (round up)",
        ];

        const calcTable = (
            <table>
                <tbody>
                <tr>
                    {calcVars.map((entry, index) => (
                        <td key={index}>{entry}</td>
                    ))}
                </tr>
                <tr>
                    {calcVals.map((entry, index) => (
                        <td key={index}>{entry}</td>
                    ))}
                </tr>
                </tbody>
            </table>
        );

        return (
            <tr className={"actLim"}>
                <td className={"actLim"}>{type}</td>
                <td className={"actLim"}>{calcTable}</td>
                <td className={"actLim"}>{limit}</td>
            </tr>
        );
    }

    /**
     * Displays the skill test using the associated val object from the skills dropdown. The calculation is displayed as
     * two table rows, with the first containing the names of the skill, attribute, and limit used and the second
     * containing the associated values of each.
     * @param val The object from the skills dropdown containing the skill information.
     */
    showSkillTest(val: ValueType<SelectSkill>) {
        if (val === undefined || val === null) return;
        const {physicalLimit, socialLimit, mentalLimit} = this.state;
        const skill = (val as SelectSkill).skill;
        const attValue = this.getCharacterAttribute(skill.attribute.toUpperCase());
        let result = skill.rating + attValue;
        let limitType = skill.limit;
        let limitVal;
        if (limitType === "Physical") {
            limitVal = physicalLimit;
        } else if (limitType === "Social") {
            limitVal = socialLimit;
        } else {
            limitVal = mentalLimit;
        }

        //Adjust the test display and result value if the used skill has a specialization
        if ((val as SelectSkill).specialization) {
            result += 2; //Add specialization bonus

            //These arrays will be rendered in a table so the variables and values line up
            this.setState({
                testVariables: [
                    skill.name,
                    "+",
                    `{${skill.specialization}}`,
                    "+",
                    <b>{skill.attribute}</b>,
                    `[${limitType}]`,
                ],
                testValues: [
                    skill.rating,
                    "+",
                    "{2}",
                    "+",
                    <b>{attValue}</b>,
                    `[${limitVal}]`,
                    "=",
                    result,
                ],
            });
        } else {
            //These arrays will be rendered in a table so the variables and values line up
            this.setState({
                testVariables: [
                    skill.name,
                    "+",
                    <b>{skill.attribute}</b>,
                    `[${limitType}]`,
                ],
                testValues: [
                    skill.rating,
                    "+",
                    <b>{attValue}</b>,
                    `[${limitVal}]`,
                    "=",
                    result,
                ],
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
        if (val === undefined || val === null) return;
        const weapon = (val as WeaponLabelOptionMelee).weapon;
        // If melee do everything below
        const accValue = Number(weapon.acc);
        const foundSkills = this.props.character.skills.combat.filter(
            (skill) => skill.name.toLowerCase() === weapon.skill.toLowerCase()
        );
        let skill = undefined;
        let attribute = undefined;
        let actualSkill = foundSkills[0];

        const testVariables = [];
        const testValues = [];

        const {physicalLimit, mentalLimit, socialLimit} = this.state;

        //Check if the weapon accuracy is an inherent limit
        switch (weapon.acc) {
            case "Physical":
                testVariables.push("[Physical]");
                testValues.push(`[${physicalLimit}]`);
                break;
            case "Mental":
                testVariables.push("[Mental]");
                testValues.push(`[${mentalLimit}]`);
                break;
            case "Social":
                testVariables.push("[Social]");
                testValues.push(`[${socialLimit}]`);
                break;
            default:
                testVariables.push("[Weapon Acc.]");
                if (!isNaN(accValue)) {
                    testValues.push(`[${accValue}]`);
                } else {
                    testValues.push(`[${weapon.acc}]`);
                }
        }

        //Check if the character has the associated weapon skill
        if (foundSkills.length > 0) {
            skill = foundSkills[0];
            attribute = this.getCharacterAttribute(skill.attribute.toUpperCase());
        }

        //If the character has the skill, show the skill value and the attribute.
        if (skill !== undefined && attribute !== undefined) {
            foundSkills.filter((aSK) => {
                // will filter through all skills and return the array of the skill associated with the weapon
                if (aSK.name === weapon.skill) {
                    actualSkill = aSK;
                }
                return actualSkill;
            });

            testVariables.unshift(
                actualSkill.name,
                "+",
                <b>{actualSkill.attribute}</b>,
                "+",
                <span style={{color: "#00802b", fontWeight: 495}}>
          {actualSkill.specialization ? "Specialization" : null}
        </span>
            );
            testValues.unshift(
                actualSkill.rating,
                "+",
                <b>{attribute}</b>,
                "+",
                <span style={{color: "#00802b", fontWeight: 495}}>
          {actualSkill.specialization ? "(2)" : null}
        </span>
            );
            testValues.push(
                "=",
                actualSkill.rating + attribute + (actualSkill.specialization ? 2 : 0)
            );
        } else {
            //If they don't have the skill, show a ?
            testVariables.unshift(weapon.skill);
            testValues.unshift("?");
        }

        this.setState({
            testVariables: testVariables,
            testValues: testValues,
        });
    };

    modeSelection = (mode: any) => {
        let weapon = this.state.rangedWeaponSelected
            ? this.state.rangedWeaponSelected
            : null;

        if (
            this.state.modeSelected !== null &&
            mode.name !== this.state.modeSelected &&
            weapon
        ) {
            recoilComp = weapon.RC;
            let strength = this.props.character.attributes.STR;
            recoilComp += Math.ceil(strength / 3) + 1;
            isProgressive = false;
        }
        if (weapon) {
            this.setState(
                {
                    modeSelected: mode.name,
                    firingType: mode.numAmmoToShoot,
                    selectedMode: mode,
                },
                () => this.showRangedWeaponTest(weapon)
            );
        }
    };

    defaultVal = () => {
        if (this.state.currentWeapon !== this.state.previousWeapon) {
            this.setState({
                previousWeapon: this.state.currentWeapon,
                selectedMode: null,
                modeSelected: null,
            });
        } else {
            this.setState({
                selectedMode: selectRef,
            });
        }
    };

    /**
     * Converts a dropdown value to a ranged weapon type value
     * @param val The object from the weapons dropdown containing the weapon information.
     */
    selectionToWeapon(val: ValueType<WeaponLabelOptionRanged>) {
        if (val === undefined || val === null) {
            return;
        }
        return (val as WeaponLabelOptionRanged).weapon;
    }

    //
    /**
     * Displays the weapon test using the associated val object from the weapons dropdown. The calculation is displayed
     * as two table rows, with the first containing the names of the skill, attribute, and limit used and the second
     * containing the associated values of each. IF the character does not possess the associated weapon skill, a ? will
     * be displayed for its value.
     * @param weapon A ranged weapon
     */
    showRangedWeaponTest = (weapon: Ranged | undefined | null) => {
        if (weapon === undefined || weapon === null) {
            return;
        }

        const prevWeapon = this.state.currentWeapon;
        let mode = this.state.modeSelected;
        let selectAttach = this.state.attachmentSelected?.effect;
        const character = this.props.character;
        const accValue = Number(weapon.acc);
        const foundSkills = this.props.character.skills.combat.filter(
            (skill) =>
                skill.name &&
                (skill.name.toLowerCase() === weapon.skill.toLowerCase() ||
                    skill.default === "✓")
        );

        let skill = undefined;
        let attribute = undefined;

        const testVariables = [];
        const testValues = [];
        let actualSkill = foundSkills[0];

        if (weapon.name !== prevWeapon) {
            mode = null;
            recoilComp = weapon.RC + (selectAttach ? selectAttach : 0);
            isProgressive = false;
            let strength = character.attributes.STR;
            recoilComp += Math.ceil(strength / 3) + 1;
        }
        const {physicalLimit, mentalLimit, socialLimit} = this.state;

        //Check if the weapon accuracy is an inherent limit
        switch (weapon.acc) {
            case "Physical":
                testVariables.push("[Physical]");
                testValues.push(`[${physicalLimit}]`);
                break;
            case "Mental":
                testVariables.push("[Mental]");
                testValues.push(`[${mentalLimit}]`);
                break;
            case "Social":
                testVariables.push("[Social]");
                testValues.push(`[${socialLimit}]`);
                break;
            default:
                testVariables.push("[Weapon Acc.]");
                if (!isNaN(accValue)) {
                    testValues.push(`[${accValue}]`);
                } else {
                    testValues.push(`[${weapon.acc}]`);
                }
        }

        //Check if the character has the associated weapon skill
        if (foundSkills.length > 0) {
            skill = foundSkills[0];
            attribute = this.getCharacterAttribute(skill.attribute.toUpperCase());
        }

        let bowDicePoolModifier: number = 0;
        if (weapon.name.substring(0, 3) === "Bow") {
            const rating: number = parseInt(
                weapon.name.substring(weapon.name.search(/\d/), weapon.name.length - 1)
            );
            const strength: number = this.props.character.attributes.STR;
            if (strength < rating) {
                bowDicePoolModifier = (rating - strength) * 3;
            }
        }

        //If the character has the skill, show the skill value and the attribute.
        if (skill !== undefined && attribute !== undefined) {
            foundSkills.filter((aSK) => {
                // will filter through all skills and return the array of the skill associated with the weapon
                if (aSK.name === weapon.skill) {
                    actualSkill = aSK;
                }
                return actualSkill;
            });

            // First row in table, displays the skill name and attribute
            if (weapon.name.substring(0, 3) === "Bow") {
                testVariables.unshift(
                    skill.name,
                    "+",
                    <b>{skill.attribute}</b>,
                    "-",
                    "Rating Modifier"
                );
                testValues.unshift(
                    skill.rating,
                    "+",
                    <b>{attribute}</b>,
                    "-",
                    bowDicePoolModifier
                );
                testValues.push("=", skill.rating + attribute - bowDicePoolModifier);
            } else {
                if (this.state.mounted !== "Unmounted") {
                    let heavyWeaponsSkill: ISkill[] = this.props.character.skills.combat.filter(
                        (skill) => skill.name && skill.name === "Heavy Weapons"
                    );
                    let gunnerySkill: ISkill[] = this.props.character.skills.vehicle.filter(
                        (skill) => skill.name && skill.name === "Gunnery"
                    );
                    if (this.state.mounted === "MountedNV") {
                        if (heavyWeaponsSkill.length > 0) {
                            testVariables.unshift(
                                heavyWeaponsSkill[0].name,
                                "+",
                                <b>{skill.attribute}</b>
                            );
                            testValues.unshift(
                                heavyWeaponsSkill[0].rating,
                                "+",
                                <b>{attribute}</b>
                            );
                            testValues.push("=", heavyWeaponsSkill[0].rating + attribute);
                        } else {
                            testVariables.unshift(skill.name, "+", <b>{skill.attribute}</b>);
                            testValues.unshift(skill.rating, "+", <b>{attribute}</b>);
                            testValues.push("=", skill.rating + attribute);
                        }
                    } else if (this.state.mounted === "MountedV") {
                        if (gunnerySkill.length > 0) {
                            testVariables.unshift(
                                gunnerySkill[0].name,
                                "+",
                                <b>{skill.attribute}</b>
                            );
                            testValues.unshift(
                                gunnerySkill[0].rating,
                                "+",
                                <b>{attribute}</b>
                            );
                            testValues.push("=", gunnerySkill[0].rating + attribute);
                        } else {
                            testVariables.unshift(skill.name, "+", <b>{skill.attribute}</b>);
                            testValues.unshift(skill.rating, "+", <b>{attribute}</b>);
                            testValues.push("=", skill.rating + attribute);
                        }
                    }
                } else {
                    testVariables.unshift(
                        actualSkill.name,
                        "+",
                        <b>{actualSkill.attribute}</b>,
                        actualSkill.specialization ? "+" : "",
                        <span style={{color: "#00802b", fontWeight: 495}}>
              {actualSkill.specialization ? actualSkill.specialization + " Spec" : ""}
            </span>,
                        mode && (weapon.RC + (selectAttach ? selectAttach : 0)) > 0 ? "+" : "",
                        mode && (weapon.RC + (selectAttach ? selectAttach : 0)) > 0 ? "Recoil Compensation" : "");
                    testValues.unshift(
                        actualSkill.rating,
                        "+",
                        <b>{attribute}</b>,
                        actualSkill.specialization ? "+" : "",
                        <b style={{color: "#00802b", fontWeight: 495}}>
                            {actualSkill.specialization ? "(2)" : ""}
                        </b>,
                        mode && (weapon.RC) > 0 ? "+" : "",
                        mode && (weapon.RC) > 0 ? " " + (recoilComp) : ""
                    );
                    testValues.push(
                        "=",
                        actualSkill.rating +
                        attribute +
                        (actualSkill.specialization ? 2 : 0) +
                        (recoilComp < 0 ? recoilComp : 0)
                    );
                }
            }
        } else {
            //If they don't have the skill, show a ?
            testVariables.unshift(weapon.skill);
            testValues.unshift("?");
        }

        this.setState(
            {
                testVariables: testVariables,
                testValues: testValues,
                rangedWeaponSelected: weapon,
                currentWeapon: weapon.name,
                previousWeapon: prevWeapon,
            },
            this.defaultVal
        );
        option = "ranged"; // for showing the firing modes vs not showing it.
    };

    getCharacterAttribute = (capitalizedName: string) => {
        const {
            character: {attributes},
        } = this.props;
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
    };

    /**
     * Displays the attribute-only tests, including Composure, Judge Intentions, Lifting/Carrying, and Memory.
     * @returns A div containing a table of the attribute only test calculations.
     */
    attributeOnlySection() {
        return (
            <div>
                <h1 className={"Action"}>Attribute-Only Tests</h1>
                <table className={"Action"}>
                    <tbody>
                    <tr className={"Action"}>
                        <td className={"attrOnly"}>
                            <h5>
                                Composure (<b>CHA</b> + <b>WIL</b>)<br/>
                                {this.attrTest("CHA", "WIL")}
                            </h5>
                        </td>
                        <td className={"attrOnly"}>
                            <h5>
                                Judge Intention(<b>CHA</b> + <b>INT</b>)<br/>
                                {this.attrTest("CHA", "INT")}
                            </h5>
                        </td>
                    </tr>
                    <tr className={"Action"}>
                        <td className={"attrOnly"}>
                            <h5>
                                Lifting/Carrying (<b>BOD</b> + <b>STR</b>)<br/>
                                {this.attrTest("BOD", "STR")}
                            </h5>
                        </td>
                        <td className={"attrOnly"}>
                            <h5>
                                Memory (<b>LOG</b> + <b>WIL</b>)<br/>{" "}
                                {this.attrTest("LOG", "WIL")}
                            </h5>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
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
        return (
            <div>
                <h1 className={"Action"}>Skill Tests</h1>
                {this.allSkillsDropdown()}
            </div>
        );
    }

    /**
     * Displays the Combat section of the Action page.
     * @returns A div containing the headers and drop downs for the combat section.
     */
    combatSection() {
        return (
            <div style={{paddingBottom: "50px"}}>
                <h1 className={"Action"}> Initiative Roll</h1>
                {this.diceShow()}
                <h1 className={"Action"}>Melee Weapons</h1>
                {this.meleeWeaponsDropdown()}
                <h1 className={"Action"}>Ranged Weapons</h1>
                {this.rangedWeaponsDropdown()}
            </div>
        );
    }

    /**
     * Creates a dropdown of all the character's active skills and displays the skill test when  one is chosen from the
     * dropdown.
     * @returns A dropdown of all the character's active skills.
     */
    allSkillsDropdown() {
        const options: SelectSkill[] = [];
        const {skills} = this.props.character;

        const {
            combat,
            physical,
            social,
            magical,
            resonance,
            technical,
            vehicle,
        } = skills;
        this.pushSkillOptions(combat, options);
        this.pushSkillOptions(physical, options);
        this.pushSkillOptions(social, options);
        this.pushSkillOptions(magical, options);
        this.pushSkillOptions(resonance, options);
        this.pushSkillOptions(technical, options);
        this.pushSkillOptions(vehicle, options);

        return (
            <div className={"Action"} id={"allSkillsSelector"}>
                <Select options={options} onChange={(val) => this.showSkillTest(val)}/>
            </div>
        );
    }

    private pushSkillOptions(
        skillCategory: ISkill[],
        options: SelectSkill[]
    ): void {
        skillCategory.forEach((skillValue) => {
            options.push({
                skill: skillValue,
                label: `${skillValue.name} (${skillValue.rating})`,
                limit: skillValue.limit,
            });
            if (skillValue.specialization) {
                options.push({
                    skill: skillValue,
                    label: `${skillValue.name} {${skillValue.specialization}} (${
                        skillValue.rating + 2
                    })`,
                    limit: skillValue.limit,
                    specialization: skillValue.specialization,
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

        return (
            <div className={"Action"} id={"meleeWeaponSelector"}>
                <Select options={options} onChange={this.showMeleeWeaponTest}/>
            </div>
        );
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

        return (
            <div className={"Action"} id={"rangedWeaponSelector"}>
                <Select
                    options={options}
                    onChange={(weaponSelectedValue) =>
                        this.showRangedWeaponTest(
                            this.selectionToWeapon(weaponSelectedValue)
                        )
                    }
                />
                {
                    <div style={{display: "inline-flex", width: "100%", textAlign: "center"}}>
                        {
                            <div style={{paddingTop: "30px", width: "25%", margin: "auto"}}>
                                <h3
                                    style={{display: this.state.rangedWeaponSelected ? "block" : "none"}}
                                >
                                    Mode selection
                                </h3>


                                {this.fireModesDropdown(this.state.rangedWeaponSelected)}
                            </div>
                        }

                        {
                            <div style={{paddingTop: "30px", width: "25%", margin: "auto"}}>

                                {
                                    this.state.rangedWeaponSelected !== undefined && this.state.rangedWeaponSelected !== null ? (

                                        <AmmoDropdown
                                            ammoTypes={this.state.rangedWeaponSelected.ammoTypes}
                                            subAmmoTypes={this.state.rangedWeaponSelected.subAmmoTypes}
                                            ammo={character.ammo}
                                            setAmmoSelected={(ammo: CharacterAmmo) =>
                                                this.handleAmmoSelect(ammo)
                                            }
                                        />
                                    ) : (
                                        <React.Fragment/>
                                    )
                                }

                            </div>
                        }
                    </div>
                }
            </div>
        );
    }

    firingTypeToAmmo(fType: string) {
        let modeSelection = {
            name: "",
            numAmmoToShoot: 0,
            defenseModifier: 0,
        };

        switch (fType) {
            case "SS": // single shot
                modeSelection = {
                    name: "SS",
                    numAmmoToShoot: 1,
                    defenseModifier: 0,
                };
                break;

            case "SA": // semi automatic
                modeSelection = {
                    name: "SA",
                    numAmmoToShoot: 1,
                    defenseModifier: 0,
                };
                break;

            case "SB": // semi automatic burst
                modeSelection = {
                    name: "SB",
                    numAmmoToShoot: 3,
                    defenseModifier: -2,
                };
                break;

            case "BF": // burst fire
                modeSelection = {
                    name: "BF",
                    numAmmoToShoot: 3,
                    defenseModifier: -2,
                };
                break;

            case "LB": // long burst
                modeSelection = {
                    name: "LB",
                    numAmmoToShoot: 6,
                    defenseModifier: -5,
                };
                break;

            case "FAS": // full auto simple
                modeSelection = {
                    name: "FAS",
                    numAmmoToShoot: 6,
                    defenseModifier: -5,
                };
                break;

            case "FAC": //full auto complex
                modeSelection = {
                    name: "FAC",
                    numAmmoToShoot: 10,
                    defenseModifier: -9,
                };
                break;

            default:
                break;
        }
        return modeSelection;
    }

    /**
     * This is for the firing modes dropdown
     */
    fireModesDropdown(weapon: Ranged | null) {
        if (weapon === null || weapon === undefined) {
            return;
        }
        let modes = [];
        const options: modeLabelOption[] = [];
        if (weapon) {
            let split = weapon.mode.split("/");
            if (weapon.mode.indexOf("/") > -1) {
                for (const s of split) {
                    if (s !== "FA") {
                        modes.push(this.firingTypeToAmmo(s));
                    } else {
                        modes.push(this.firingTypeToAmmo("FAS"));
                        modes.push(this.firingTypeToAmmo("FAC"));
                    }
                }
            } else {
                let s = weapon.mode;
                modes.push(this.firingTypeToAmmo(s));
            }

            for (const mode of modes) {
                options.push({
                    name: mode.name,
                    numAmmoToShoot: mode.numAmmoToShoot,
                    defenseModifier: mode.defenseModifier,
                    label: `${mode.name} (Defense Modifier: ${mode.defenseModifier} |  Number of Rounds Used: ${mode.numAmmoToShoot} |  Recoil: ${weapon.RC})`,
                });
            }

            return (
                <div>
                    <Select
                        placeholder={"Select a default"}
                        options={options}
                        value={this.state.selectedMode}
                        onChange={(e: any) => {
                            this.modeSelection(e);
                            selectRef = e;
                        }}
                    />
                </div>
            );
        }
    }

    /**
     * If there are test variables and values in the state, this displays the test calculation. The variables and values
     * are displayed in two table rows so that they line up with eachother.
     * @returns A table of the test variables and values, displaying the test calculation.
     */
    testDisplay(character: ICharacter) {
        const {rangedWeaponSelected, firingType} = this.state;
        if (option === "ranged" && firingType !== 0) {
            return (
                <div>
                    {/* Will show the calculations for the weapon tests*/}
                    {this.calculationTable()}

                    {this.mountedTypeSelect()}

                    {rangedWeaponSelected && (
                        <Button
                            onClick={() => {
                                const foundWeaponArray = character.gear.ranged.filter(
                                    (item) =>
                                        rangedWeaponSelected !== null &&
                                        rangedWeaponSelected.name === item.name
                                );
                                const foundWeapon = foundWeaponArray[0];
                                console.log("firingType", firingType);

                                this.adjustAmmo(
                                    foundWeapon,
                                    this.state.ammoSelected,
                                    firingType
                                );
                            }}
                        >
                            Fire Weapon
                        </Button>
                    )}
                </div>
            );
        } else {
            return <div>{this.calculationTable()}</div>;
        }
    }

    /**
     * This is the calculation table to display for melees and ranged weapons
     * Will be used in testDisplay() method.
     * @returns a table of the calculations for all weapons (melee or ranged).
     */
    calculationTable() {
        let {testValues, testVariables} = this.state;
        if (testVariables !== null && testValues !== null) {
            return (
                <table className={"testResult"}>
                    <tbody>
                    <tr>
                        {testVariables.map((part, index) => (
                            <td key={index}>{part}</td>
                        ))}
                    </tr>
                    <tr>
                        {testValues.map((part, index) => (
                            <td key={index}>{part}</td>
                        ))}
                    </tr>
                    </tbody>
                </table>
            );
        }
    }

    /**
     * Will display the option to adjust ammo left in gun after it fires. This method also controls recoil compensation calculations.
     * @return a dropdown of new ammo to take away from gun.
     */

    /*
     * still need the weapon parameter for calculations with recoil
     * Also need weapon because it's coupled with showing the ranged weapons test :(
     *
     */
    adjustAmmo(
        weapon: Ranged | null,
        ammoToBeUsed: CharacterAmmo | null,
        ammoAmountToBeUsed: number
    ) {
        if (weapon !== null && weapon !== undefined) {
            const {remAmmo} = this.props;
            const {ammo} = this.props.character;

      if (ammoToBeUsed) {
        switch (ammoToBeUsed.ammoType) {
          case "arrows":
            ammoToBeUsed = ammo.arrows.filter(
              (characterReduxAmmo) =>
                characterReduxAmmo.name === ammoToBeUsed?.name
            )[0];
            break;
          case "throwing":
            ammoToBeUsed = ammo.throwing.filter(
              (characterReduxAmmo) =>
                characterReduxAmmo.name === ammoToBeUsed?.name
            )[0];
            break;
          case "bolts":
            ammoToBeUsed = ammo.bolts.filter(
              (characterReduxAmmo) =>
                characterReduxAmmo.name === ammoToBeUsed?.name
            )[0];
            break;
          case "darts":
            ammoToBeUsed = ammo.darts.filter(
              (characterReduxAmmo) =>
                characterReduxAmmo.name === ammoToBeUsed?.name
            )[0];
            break;
          case "ballistic":
            ammoToBeUsed = ammo.ballistic.filter(
              (characterReduxAmmo) =>
                characterReduxAmmo.name === ammoToBeUsed?.name
            )[0];
            break;
          case "grenades":
            ammoToBeUsed = ammo.grenades.filter(
              (characterReduxAmmo) =>
                characterReduxAmmo.name === ammoToBeUsed?.name
            )[0];
            break;
          case "rockets":
            ammoToBeUsed = ammo.rockets.filter(
              (characterReduxAmmo) =>
                characterReduxAmmo.name === ammoToBeUsed?.name
            )[0];
            break;
          default:
            ammoToBeUsed = ammo.throwing.filter(
              (characterReduxAmmo) =>
                characterReduxAmmo.name === ammoToBeUsed?.name
            )[0];
            break;
        }

                if (ammoToBeUsed.amount - ammoAmountToBeUsed >= 0) {
                    recoilComp = recoilComp - ammoAmountToBeUsed;
                    const newAmmo = ammoToBeUsed.amount - ammoAmountToBeUsed;

                    remAmmo(ammoToBeUsed, ammoToBeUsed.ammoType, newAmmo);
                    isProgressive = true;

                    //if ammo is 0, reset the recoil as this is a rule in the rule book (look at Recoil page in rule book)
                    if ((weapon.ammo = 0)) {
                        isProgressive = false;
                        recoilComp = weapon.RC; // rangedWeaponSelected.RC;
                    }

                    toast.error("Fired the " + weapon.name + ".", {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    this.setState(
                        {
                            rangedWeaponSelected: weapon,
                            ammoSelected: {
                                name: ammoToBeUsed.name,
                                amount: newAmmo,
                                ammoType: ammoToBeUsed.ammoType,
                            } as CharacterAmmo,
                        },
                        () => this.showRangedWeaponTest(weapon)
                    );
                } else {
                    // We are here if the ammo is 0
                    //if ammo is 0, reset the recoil as this is a rule in the rule book (look at Recoil page in rule book)
                    if (weapon) {
                        recoilComp = weapon.RC;
                    }
                    isProgressive = false;
                    alert("You do not have enough ammo to shoot in this firing mode!");
                }
            }
        }
    }

    changeWeaponMount = async (e: React.FormEvent<HTMLInputElement>) => {
        this.setState(
            {
                mounted: e.currentTarget.value,
            },
            () => this.showRangedWeaponTest(this.state.rangedWeaponSelected)
        );
    };

    /**
     * This displays a radio select for ways to mount a ranged weapon for firing.
     * @returns a radio select with handlers
     */
    mountedTypeSelect() {
        return (
            <div className="testResult1" style={{textAlign: "center"}}>
                <input
                    type="radio"
                    id="Unmounted"
                    name="Mounted Type"
                    value="Unmounted"
                    onChange={this.changeWeaponMount}
                    defaultChecked={true}
                />
                <label style={{marginRight: "2.5%"}}>Unmounted</label>
                <input
                    type="radio"
                    id="MountedNV"
                    name="Mounted Type"
                    value="MountedNV"
                    onChange={this.changeWeaponMount}
                />
                <label style={{marginRight: "2.5%"}}>Mounted (Non-Vehicle)</label>
                <input
                    type="radio"
                    id="MountedV"
                    name="Mounted Type"
                    value="MountedV"
                    onChange={this.changeWeaponMount}
                />
                <label style={{marginRight: "2.5%"}}>Mounted (Vehicle)</label>
            </div>
        );
    }

    diceShow() {
        let rating = 0;
        let {character} = this.props;
        let {initiativeValue} = this.state;
        let dice = character.initiative.initDice;
        let initRating = character.attributes.INT + character.attributes.REA;

        character.augmentations.map((one: any)=>{
            if(one.rating !== "")
            rating += one.rating
        });

        let diceRoll = dice + rating;

        return (
            <div>
                <ReactDice
                    numDice={diceRoll}
                    rollTime={0.25}
                    defaultRoll={4}
                    rollDone={this.rollDoneCallback}
                    disableIndividual={true}
                    rolling={true}
                    ref={this.assignRef}
                />
                <h3>Initiative Score: {initiativeValue === 0? 0: initiativeValue + initRating}</h3>
                <button onClick={this.rollAll}>{initiativeValue === 0? "Roll Dice": "Roll Again"}</button>
                <Popup trigger={<button disabled={initiativeValue === 0}> Initiative Calculation Info </button>} position="center center"
                       contentStyle={{maxWidth: '600px', width: '90%'}} modal nested>
                    <div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>Initiative Dice</th>
                                <th>Augmentation Effect</th>
                                <th>Initiative Intuition</th>
                                <th>Initiative Reaction</th>
                                <th>Dice Roll Value</th>
                                <th>Initiative Score (dice roll + initiative reaction + initiative intuition)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{dice}</td>
                                <td>{rating}</td>
                                <td>{character.attributes.INT}</td>
                                <td>{character.attributes.REA}</td>
                                <td>{initiativeValue}</td>
                                <td>{initiativeValue + initRating}</td>
                            </tr>
                            </tbody>
                        </Table>

                    </div>
                </Popup>
            </div>
        );


    }

    rollDoneCallback(num:any) {
        console.log(`You rolled a ${num}`);

        // sets the state of the initiative value to be the rolled dice total
        this.setState({initiativeValue: num});
    }

    rollAll() {
        if (reactDice !== undefined) {
            reactDice.rollAll()
        }
    }


    assignRef(ref:any) {
        reactDice = ref;
    }




    /**
     * Displays a table of the character's inherent limit calculations.
     * @returns A table of the character's inherent limit calculations.
     */
    limitsTables() {
        return (
            <div>
                <h1 className={"Action"}>Inherent Limits</h1>
                <table className={"actLim"}>
                    <tbody className={"actLim"}>
                    <tr className={"actLim"}>
                        <th className={"actLim"}>Type</th>
                        <th className={"actLim"}>Calculation</th>
                        <th className={"actLim"}>Value</th>
                    </tr>
                    {this.limitRow("Mental")}
                    {this.limitRow("Physical")}
                    {this.limitRow("Social")}
                    </tbody>
                </table>
            </div>
        );
    }

    sprintActionSection = () => {
        const {
            character: {
                attributes: {AGI, STR},
                skills: {physical},
                metatype,
            },
        } = this.props;
        const runningResult = physical.find(
            (iSkill) => iSkill.name.toLowerCase() === "running"
        );
        const runningRating =
            runningResult?.rating === undefined ? 0 : runningResult.rating;
        let metaSprintIncrease = this.getMetaTypeSprintIncrease(metatype);
        if (metaSprintIncrease === null) {
            alert(`Metatype: ${metatype} is invalid`);
            metaSprintIncrease = 1;
        }

        return (
            <>
                <h1 className="Action">Sprint:</h1>
                <h2 className="Action">Complex Action</h2>
                <table className="actLim">
                    <tbody>
                    <tr>
                        <td>
                            <h5>
                                Distance = <b>Run Rate</b> + (<b>Hits</b> *{" "}
                                <b>Sprint Increase</b>)
                            </h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>
                                Distance = <b>{AGI * 4}</b> + (<b>Hits</b> *{" "}
                                {metaSprintIncrease})
                            </h5>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className={"actLim"}>
                    <tbody>
                    <tr className={"actLim"}>
                        <th>METATYPE</th>
                        <th>RUN RATE</th>
                        <th>SPRINT INCREASE</th>
                        <th>HITS</th>
                    </tr>
                    <tr className={"actLim"}>
                        <td className={"actLim"}>Dwarf, Troll</td>
                        <td className={"actLim"}>
                            <b>AGI</b> * 4
                            <br/>
                            <b>{AGI}</b> * 4 = {AGI * 4}
                        </td>
                        <td className={"actLim"}>+1 m/hit</td>
                        <td className={"actLim"}>
                            Running + <b>STR</b> [<b>Physical</b>]
                            <br/>
                            {`${runningRating} + ${STR} [${this.state.physicalLimit}] = ${
                                runningRating + STR
                            }`}
                        </td>
                    </tr>
                    <tr className={"actLim"}>
                        <td className={"actLim"}>Elf, Human, Ork</td>
                        <td className={"actLim"}>
                            <b>AGI</b> * 4
                            <br/>
                            <b>{AGI}</b> * 4 = {AGI * 4}
                        </td>
                        <td className={"actLim"}>+2 m/hit</td>
                        <td className={"actLim"}>
                            Running + <b>STR</b> [<b>Physical</b>]
                            <br/>
                            {`${runningRating} + ${STR} [${this.state.physicalLimit}] = ${
                                runningRating + STR
                            }`}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </>
        );
    };


    getMetaTypeSprintIncrease(metatype: string) {
        metatype = metatype.toLowerCase();
        switch (metatype) {
            case "dwarf":
            case "troll":
                return 1;
            case "elf":
            case "human":
            case "ork":
                return 2;
            default:
                return null;
        }
    }

    /**
     * Renders the Action page.
     * @returns A message saying the character is not loaded or the contents of the Action page if the character is
     * loaded.
     */
    render() {
        const {character} = this.props;
        if (character === null || character.skills === undefined) {
            return (
                <p>
                    Needed properties missing from character file or no character loaded.
                </p>
            );
        } else {
            return (
                <div>
                    <Tabs id="defaultActionsTabs" defaultActiveKey="misc">
                        <Tab eventKey="misc" title="Misc">
                            {this.limitsTables()}
                            {this.attributeOnlySection()}
                            {this.skillsSection()}
                        </Tab>
                        <Tab eventKey="combat" title="Combat">
                            {this.combatSection()}
                            {this.testDisplay(character)}
                        </Tab>
                        <Tab eventKey="running" title="Running">
                            {this.sprintActionSection()}
                        </Tab>
                    </Tabs>
                    <ToastContainer/>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Action);
