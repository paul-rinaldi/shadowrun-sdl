import React, {Component } from 'react';
import '../CSS_Files/KnowledgeSkills.css'
import { IShadowRunState } from "../redux/store";
import { setAttributes } from "../redux/actions/attributeAction";
import { connect } from "react-redux";
import { increaseKSkill, decreaseKSkill, addKSkill } from "../redux/actions/knowledgeSkillsActions";
import { adjustKarma } from '../redux/actions/karmaActions';
import { makeLog } from '../redux/actions/logActions';
import { updateKSkill } from '../redux/actions/knowledgeSkillsActions';

//Some useful 5e core rulebook pages about knowledge skills:
//  147-149 - General explanation of knowledge skills, specializations, types, and ratings
//  149 - Listing of some example knowledge skills. These are just examples, not a comprehensive list. Characters can
//        have knowledge skills about any and all subjects.
//  103-107 - Character advancement (how skills are upgraded)
//  44-48 - Explanation of tests, i.e., how the skill ratings are used in dice rolls

const mapStateToProps = (state: IShadowRunState) => ({
    character: state.player
})

const mapDispatchToProps = {
    increaseKSkill,
    decreaseKSkill,
    addKSkill,
    updateKSkill
}

type IKnowledgeSkillsProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;


type IState = {
    small : boolean
}

/**
 * @class Represents the Skills page. For every knowledge skill the character has the page displays the skill name, the
 * character's rating in the skill, the associated attribute and the character's rating in that attribute, and any
 * specializations the character has for the skill. The skills are divided into tables by their type (Street,
 * Professional, Academics, or Interests). There are also buttons for each skill that allow the player to increase or
 * decrease their rating in the skill as well as a button for each table to add new skills.
 */
class KnowledgeSkills extends Component<IKnowledgeSkillsProps, IState>{
    constructor(props: IKnowledgeSkillsProps){
        super(props);

        this.state = {
            small  : false //Controls whether to render one or two columns of tables
        };

        //Resize handler to determine if one or two columns of tables should be rendered
        window.onresize = () => {
            const resizeLimit = 1200;

            if(this.state.small){
                if(window.innerWidth > resizeLimit){
                    this.setState({
                        small: false
                    });
                }
            } else {
                if(window.innerWidth < resizeLimit){
                    this.setState({
                        small: true
                    });
                }
            }
        }
    }

    /**
     * Renders the KnowledgeSkills page, which contains tables containing various information about all the character's
     * knowledge skills.
     * @returns Tables of character knowledge skills or a message that no character is loaded.
     */
    render(){
        let page;

        //Handle if a character has not been loaded yet (or does not have knowledge skills)
        if(this.props.character === null || typeof this.props.character === 'undefined'){
            page = <p>Load a character file to see their knowledge skills</p>;

        }else if(typeof this.props.character.knowledgeSkills === 'undefined'){
            page = <p>No knowledge skills found, load a character or add knowledge skills to the character's file</p>;

        } else {
            //If character has knowledge skills, generate the page contents
            page = this.knowledgeSkillsPage();
        }

        return(<div>
            <h1 className={'KSkills'}>Knowledge Skills</h1>
            {page}
        </div>)
    }

    /**
     * Creates a div containing knowledge skill tables for every knowledge skill type.
     * @returns a div containing knowledge skill tables for every knowledge skill type.
     */
    knowledgeSkillsPage(){
        let layout;

        //Make layout a single column if the screen is small
        if(this.state.small){
            layout = <div>
                {this.skillTable('Street', 'Int')}
                {this.skillTable('Academic', 'Log')}
                {this.skillTable('Professional', 'Log')}
                {this.skillTable('Interests', 'Int')}
            </div>

        } else { //Make layout two columns if the screen is not small
            layout = <table>
                <tbody>
                <tr>
                    <td className={'KskillsLayout'}>
                        {this.skillTable('Street', 'Int')}
                        {this.skillTable('Academic', 'Log')}
                    </td>
                    <td className={'KskillsLayout'}>
                        {this.skillTable('Professional', 'Log')}
                        {this.skillTable('Interests', 'Int')}
                    </td>
                </tr>
                </tbody>
            </table>
        }

        return layout;
    }

    /**
     * Creates a table containing information about every knowledge skill of the provided type as well as a button under
     * the table for adding a knowledge skill of the table's type.
     * @param type The knowledge skill type to create a table for (i.e. street, academic, etc.)
     * @param att The attribute associated with the knowledge skill type.
     * @returns a table containing information about every knowledge skill of the provided type.
     */
    skillTable(type: string, att: string) {
        //A list of all knowledge skills of the provided type
        let skillList = this.getKnowledgeSkills;
        let skillRows = []; //The rows to be displayed, each containing info about a single knowledge skill

        for(let i = 0; i < skillList.length; i++){
            skillRows.push(this.skillRow(type.toLowerCase(), i));
        }

        return (
            <div className={'KSkills tableContainer'}>
                <h2 className={'KSkills'}>{type}</h2>
                <table className={'KSkills'}>
                    <tbody>
                    <tr className={'KSkills'}>
                        <th className={'KSkills'}/>
                        <th className={'KSkills'}>Skill</th>
                        <th className={'KSkills'}>Rtg.</th>
                        <th className={'KSkills'}>Attribute</th>
                        <th className={'KSkills'}>Specialization</th>
                    </tr>
                    {skillRows}
                    <tr><td colSpan={5}>
                        <button id={'addKnowledgeSkill'} onClick={() => this.addSkill(type, att)}>Add skill</button>
                    </td></tr>
                    </tbody>
                </table>
            </div>
        );
    }


    private getKnowledgeSkills = (type: string) => {
        const { character } = this.props;
        const { knowledgeSkills } = character;
        switch (type.toLowerCase()) {
            case 'street': return knowledgeSkills.street;
            case 'academic': return knowledgeSkills.academic;
            case 'professional': return knowledgeSkills.professional;
            case 'interests': return knowledgeSkills.interests;
            default: return [];
        }
    }

    addSkill(type: string, att: string){
        //New knowledge skills cost 1 karma
        const { character } = this.props;
        if (character.karma >= 1) {
            let skillName: string | null = '';

            //Prompt the user for the skill name
            do {
                skillName = prompt('Enter the name of the knowledge skill (-1 karma):');
                if (skillName !== null && skillName.trim() === '') {
                    alert('You must enter a name for the skill.');
                }
            } while (skillName !== null && skillName.trim() === '');

            if (skillName !== null) {
                skillName = skillName.trim();

                //Prompt the user for a specialization (or blank if there is no specialization
                const specialization = prompt('Enter a specialization (-7 karma) or leave blank if no specialization:');
                if (specialization !== null) {
                    if (specialization.trim() !== '') {
                        //Specializations cost 7 karma (plus the 1 for adding the skill)
                        if (character.karma >= 8) {
                            //Add the skill
                            //this.props.addSkill(type, att, skillName, specialization);
                            addKSkill(type, att, skillName, specialization);

                            makeLog(-1, `Added ${type} Knowledge Skill ${skillName}`,"Karma", new Date());
                            makeLog(-7, `Added ${specialization} specialization to the ${skillName} Knowledge Skill`,"Karma", new Date());
                            adjustKarma(-1);
                            adjustKarma(-7);
                        } else {
                            alert('You do not have enough karma to add a knowledge skill and specialization.');
                        }
                    } else {
                        //Add the skill
                        //this.props.addSkill(type, att, skillName, specialization); //addSkill comes from App
                        addKSkill(type, att, skillName, specialization);
                        makeLog(-1, `Added ${type} Knowledge Skill ${skillName}`, "Karma", new Date());
                        adjustKarma(-1);
                    }
                }
            }
        } else {
            alert('Adding knowledge skills costs 1 karma, you do not have enough to add a knowledge skill.');
        }
    }

    /**
     * Creates a row containing information about the knowledge skill of the provided type, at the provided index in
     * the type's list. The row contains the skill's name, rating, associated attribute, any specializations the
     * character has, and buttons to increase and decrease the rating.
     * @param type The type the skill belongs to.
     * @param index The index in the type list the skill is at.
     * @returns a table row containing information about the skill of the provided type, at the provided index in the
     * type's list.
     */
    skillRow(type: string, index: number){
        const { character } = this.props;
        let skill = this.getSkills(type)[index];
        //let skill = character.knowledgeSkills[type][index];
        let attrText;

        //A string of the associated attribute name and value
        attrText = skill.attribute.toUpperCase() + ': ' + character.attributes[skill.attribute.toUpperCase()];

        let plusButton = <button onClick={() => this.incrementSkill(type, index)}>+</button>;
        let minusButton = <button onClick={() => this.decrementSkill(type, index)}>-</button>;

        return <tr className={'KSkills'} key={skill.name}>
            <td className={'KSkills'}>{minusButton}{plusButton}</td>
            <td className={'KSkills'}>{skill.name}</td>
            <td className={'KSkills'}>{skill.rating}</td>
            <td className={'KSkills'}>{attrText}</td>
            <td className={'KSkills'}>{skill.specialization}</td>
        </tr>
    }

    private getSkills = (type: string) => {

        const { character } = this.props;
        const { knowledgeSkills } = character;

        switch (type.toLowerCase()) {
            case 'street': return knowledgeSkills.street;
            case 'academic': return knowledgeSkills.academic;
            case 'professional': return knowledgeSkills.professional;
            case 'interests': return knowledgeSkills.interests;
            default: return [];
        }
    }

    private getAttributes = (type: string) => {

        const { character } = this.props;
        const { attributes } = character;

        switch (type.toLowerCase()) {
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
            default: return [];
        }
    }

    /**
     * Prompts the player with the karma cost and time needed to increase the rating of the skill at the given index in
     * the list of the given type. It will increment the rating of the skill if the player agrees to the cost and they
     * have enough karma. Calculations for karma cost and time come from page 107 of the 5e core rulebook.
     * @param type The type the skill belongs to.
     * @param index The index of the skill in the type list.
     */
    incrementSkill(type: string, index: number){
        const skill = this.getSkills(type)[index];
        const newRating = skill.rating + 1;
        const cost = newRating;
        let time;
        //type: string, index: number, att: string, name: string, specialization: string

        //The max rating a skill can have is 13
        if(skill.rating < 13) {
            //Determine amount of training time for increase
            if (newRating <= 4) {
                time = `${newRating} days`;

            } else if (newRating <= 8) {
                time = `${newRating} weeks`;

            } else {
                time = `${newRating * 2} weeks`;
            }

            const costString = `Increasing ${skill.name} from ${skill.rating} to ${newRating} will cost ${cost} karma ` +
                `and take ${time} of research.`;

            //Check if player has enough karma for increase
            if (this.props.character.karma >= cost) {
                //Ask player if they want to do the increase
                const response = window.confirm(costString + `\n\nIs it OK to upgrade ${skill.name}?`);

                //If player confirms the upgrade
                if (response) {
                    //Adjust karma
                    makeLog(-cost, `Increased ${skill.name} knowledge skill from ${skill.rating} to ` +
                        `${newRating} (${time})`, "Karma", new Date());
                    adjustKarma(-cost);
                    updateKSkill(type, index, 1); //Increment the skill with the function from App
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
        const { character } = this.props;
        const skill = this.getSkills(type)[index];
        const newRating = skill.rating - 1;
        const refund = skill.rating;
        let time;

        if(skill.rating > 0) {
            //Determine amount of training time returned for decrease
            if (skill.rating <= 4) {
                time = `${skill.rating} days`;

            } else if (skill.rating <= 8) {
                time = `${skill.rating} weeks`;

            } else {
                time = `${skill.rating * 2} weeks`;
            }

            //Ask player if they want to revert the skill
            const response = window.confirm(`Decreasing ${skill.name} from ${skill.rating} to ${newRating} will ` +
                `refund ${refund} karma and return ${time} of research.` +
                `\n\nReverting skills is not allowed by game rules, it is only meant ` +
                `to be done if you accidentally increased a skill. Is it OK to revert ${skill.name}?`);

            //If player confirms the reversion
            if (response) {
                //Adjust karma
                makeLog(refund, `Decreased ${skill.name} knowledge skill from ${skill.rating} to ${newRating} ` +
                    `(returned ${time})`,"Karma", new Date());
                adjustKarma(refund);
                updateKSkill(type, index, -1); //Decrement the skill with the function from App
            }
        } else {
            alert(`${skill.name} is at its min rating.`);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KnowledgeSkills);