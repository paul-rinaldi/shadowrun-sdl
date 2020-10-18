import React from 'react';
import { connect } from 'react-redux';
import '../CSS_Files/Skills.css'
import { adjustKarma } from '../redux/actions/karmaActions';
import { increaseSkill, decreaseSkill } from '../redux/actions/skillActions';
import { IShadowRunState } from '../redux/store';

//Some useful 5e core rulebook pages about skills:
//  128-130 - General explanation of skills, skill groups, skill ratings, defaulting, specializations, etc.
//  130-147 - Listing of active skills, divided by types.
//  103-107 - Character advancement (how skills are upgraded)
//  44-48 - Explanation of tests, i.e., how the skill ratings are used in dice rolls

type ISkillProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: IShadowRunState) => ({
    character: state.player
});
const mapDispatchToProps = {
    adjustKarma,
    increaseSkill,
    decreaseSkill
};
interface ISkillState {
    small: boolean;
};
interface IActionState {
    testVariables: any[] | null;
    testValues: any[] | null;
    mentalLimit: number | null;
    physicalLimit: number | null;
    socialLimit: number | null;
}


/**
 * @class Represents the Skills page. For every active skill the character has the page displays the skill name, the
 * character's rating in the skill, the associated attribute and the character's rating in that attribute,
 * whether the skill can be defaulted, the skill's group, and any specializations the character has for the skill. The
 * skills are divided into tables by their type (Physical, Combat, etc.). There are also buttons for each skill that
 * allow the player to increase or decrease their rating in the skill.
 */
class Skills extends React.Component <ISkillProps, ISkillState>{
    constructor(props: ISkillProps){
        super(props);

        this.state = {
            small: false //Controls whether to render one or two columns of tables
        };

        //Resize handler to determine if one or two columns of tables should be rendered
        window.onresize = () => {
            const resizeLimit = 1200;

            if(this.state.small){
                if(window.innerWidth > resizeLimit){
                    this.state = { small: false };
                }
            } else {
                if(window.innerWidth < resizeLimit){
                    this.state = { small: true }
                }
            }
        }
    }

    /**
     * Renders the Skills page, which contains tables containing various information about all the character's active
     * skills.
     * @returns Tables of character skills or a message that no character is loaded.
     */
    render = () => {
        let page;

        //Handle if a character has not been loaded yet (or does not have skills)
        if(this.props.character === null || typeof this.props.character === 'undefined' ){
            page = <p>Load a character file to see their skills</p>;

        }else if(typeof this.props.character.skills === 'undefined'){
            page = <p>No skills found, load a character or add skills to the character's file</p>;

        } else {
            //If character has skills, generate the page contents
            page = this.skillsPage();
        }

        return(<div>
            <h1 className={'Skills'}>Skills</h1>
            {page}
        </div>)
    }

    /**
     * Creates a div containing skill tables for every active skill type.
     * @returns a div containing skill tables for every active skill type.
     */
    skillsPage(){
        let layout;

        //Make layout a single column if the screen is small
        if(this.state.small){
            layout = <div>
                        {this.skillTable('Physical')}
                        {this.skillTable('Combat')}
                        {this.skillTable('Technical')}
                        {this.skillTable('Social')}
                        {this.skillTable('Magical')}
                        {this.skillTable('Resonance')}
                        {this.skillTable('Vehicle')}
            </div>

        } else { //Make layout two columns if the screen is not small
            layout = <table>
                <tbody>
                    <tr>
                        <td className={'skillsLayout'}>
                            {this.skillTable('Physical')}
                            {this.skillTable('Combat')}
                            {this.skillTable('Technical')}
                        </td>
                        <td className={'skillsLayout'}>
                            {this.skillTable('Social')}
                            {this.skillTable('Magical')}
                            {this.skillTable('Resonance')}
                            {this.skillTable('Vehicle')}
                        </td>
                    </tr>
                </tbody>
            </table>
        }

        return layout;
    }

    /**
     * Creates a table containing information about every skill of the provided type.
     * @param type The skill type to create a table for (i.e. physical, combat, etc.).
     * @returns a table containing information about every skill of the provided type.
     */
    skillTable(type: string) {
        //A list of all skills of the provided type
        let skillList = this.getSkills(type);
        let skillRows = []; //The rows to be displayed, each containing info about a single skill

        for(let i = 0; i < skillList.length; i++){
            skillRows.push(this.skillRow(type.toLowerCase(), i));
        }

        return (
            <div className={'Skills tableContainer'}>
                <h2 className={'Skills'}>{type}</h2>
                <table className={'Skills'}>
                    <tbody>
                    <tr className={'Skills'}>
                        <th className={'Skills'}/>
                        <th className={'Skills'}>Skill</th>
                        <th className={'Skills'}>Rtg.</th>
                        <th className={'Skills'}>Attribute</th>
                        <th className={'Skills'}>Default?</th>
                        <th className={'Skills'}>Group</th>
                        <th className={'Skills'}>Specialization</th>
                    </tr>

                    {skillRows}

                    </tbody>
                </table>
            </div>
        );
    }

    private getSkills = (type: string) => {
        const { character } = this.props;
        const { skills } = character;

        switch (type.toLowerCase()) {
            case 'combat': return skills.combat;
            case 'physical': return skills.physical;
            case 'social': return skills.social;
            case 'magical': return skills.magical;
            case 'resonance': return skills.resonance;
            case 'technical': return skills.technical;
            case 'vehicle': return skills.vehicle;
            default: return [];
        }
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
     * Creates a row containing information about the skill of the provided type, at the provided index in the type's
     * list. The row contains the skill's name, rating, associated attribute, group, whether it can be defaulted on, any
     * specializations the character has, and buttons to increase and decrease the rating.
     * @param type The type the skill belongs to.
     * @param index The index of the skill in the type list.
     * @returns a table row containing information about the skill at the provided index in the list of the provided
     * type.
     */
    skillRow(type: string, index: number){
        const skill = this.getSkills(type)[index];
        const attribute = this.getAttribute(skill.attribute);
        // let skill = character.skills[type][index];
        let attrText;

        //A string of the associated attribute name and value
        attrText = skill.attribute.toUpperCase() + ': ' + attribute;

        const plusButton = <button onClick={() => this.incrementSkill(type, index)}>+</button>;
        const minusButton = <button onClick={() => this.decrementSkill(type, index)}>-</button>;

        return <tr className={'Skills'} key={skill.name + skill.rating}>
            <td className={'Skills'}>{minusButton}{plusButton}</td>
            <td className={'Skills'}>{skill.name}</td>
            <td className={'Skills'}>{skill.rating}</td>
            <td className={'Skills'}>{attrText}</td>
            <td className={'Skills'}>{skill.default}</td>
            <td className={'Skills'}>{skill.group}</td>
            <td className={'Skills'}>{skill.specialization}</td>
        </tr>
    }

    /**
     * Prompts the player with the karma cost and time needed to increase the rating of the skill at the given index in
     * the list of the given type. It will increment the rating of the skill if the player agrees to the cost and they
     * have enough karma. Calculations for karma cost and time come from page 107 of the 5e core rulebook.
     * @param type The type the skill belongs to.
     * @param index The index of the skill in the type list.
     */
    incrementSkill(type: string, index: number){
        const { character, adjustKarma, increaseSkill } = this.props;
        const skill = this.getSkills(type)[index];
        const newRating = skill.rating + 1;
        const cost = newRating * 2;
        let time;

        //The max rating a skill can have is 13
        if(skill.rating < 13) {
            //Determine amount of training time for increase (calculations from page 107 of the 5e core rulebook)
            if (newRating <= 4) {
                time = `${newRating} days`;

            } else if (newRating <= 8) {
                time = `${newRating} weeks`;

            } else {
                time = `${newRating * 2} weeks`;
            }

            const costString = `Increasing ${skill.name} from ${skill.rating} to ${newRating} will cost ${cost} karma ` +
                `and take ${time} of training.`;
            
            //Check if player has enough karma for increase
            if (character.karma >= cost) {
                //Ask player if they want to do the increase
                const response = window.confirm(costString + `\n\nIs it OK to upgrade ${skill.name}?`);

                //If player confirms the upgrade
                if (response) {
                    //Adjust karma
                    adjustKarma(-cost, `Increased ${skill.name} skill from ${skill.rating} to ${newRating} ` +
                        `(${time})`,"Karma");
                    increaseSkill(type, index); //Increment the skill with the function from App
                }
            } else {
                //Tell the player what the cost would be and that they don't have enough
                alert(costString + `\n\nYou do not have enough karma to upgrade this skill.`)
            }
        } else {
            alert(`${skill.name} is at its max rating.`);
        }
    }

    /**
     * Prompts the player with the karma and time refund for decreasing the rating of the skill at the given index in
     * the list of the given type. Note that decrementing a rating is not usually allowed by the game rules. This
     * option is only provided in case a player accidentally incremented a rating. It will decrement the rating of the
     * skill if the player agrees to the refund. Calculations for karma and time refund come from page 107 of the 5e
     * core rulebook.
     * @param type The type the skill belongs to.
     * @param index The index of the skill in the type list.
     */
    decrementSkill(type: string, index: number){
        const { adjustKarma, decreaseSkill } = this.props;
        const skill = this.getSkills(type)[index];
        const newRating = skill.rating - 1;
        const refund = skill.rating * 2;
        let time;

        //Skill ratings cannot be below 0
        if(skill.rating > 0) {
            //Determine amount of training time returned for decrease (calculations from page 107 of the 5e core rulebook)
            if (skill.rating <= 4) {
                time = `${skill.rating} days`;

            } else if (skill.rating <= 8) {
                time = `${skill.rating} weeks`;

            } else {
                time = `${skill.rating * 2} weeks`;
            }

            //Ask player if they want to revert the skill
            const response = window.confirm(`Decreasing ${skill.name} from ${skill.rating} to ${newRating} will ` +
                `refund ${refund} karma and return ${time} of training.` +
                `\n\nReverting skills is not allowed by game rules, it is only meant ` +
                `to be done if you accidentally increased a skill. Is it OK to revert ${skill.name}?`);

            //If player confirms the reversion
            if (response) {
                //Adjust karma
                adjustKarma(refund, `Decreased ${skill.name} skill from ${skill.rating} to ${newRating} ` +
                    `(returned ${time})`,"Karma");
                decreaseSkill(type, index); //Decrement the skill
            }
        } else {
            alert(`${skill.name} is at its min rating.`);
        }
    }
}

export default connect(
mapStateToProps,
mapDispatchToProps
)(Skills);