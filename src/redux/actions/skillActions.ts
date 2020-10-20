import { ISkills } from '../../models/playerModels';

type IncreaseSkillAction = { type: 'INC_SKILL_ACTION', payload: { type: string, index: number } }
type DecreaseSkillAction = { type: 'DEC_SKILL_ACTION', payload: { type: string, index: number } }
type SetSkillsAction = { type: 'SET_SKILLS_ACTION', payload: ISkills}

export type SkillAction = IncreaseSkillAction | DecreaseSkillAction | SetSkillsAction;

export const increaseSkill = (type: string, index: number): SkillAction => ({
    type: 'INC_SKILL_ACTION',
    payload: {type, index}
});

export const decreaseSkill = (type: string, index: number): SkillAction => ({
    type: 'DEC_SKILL_ACTION',
    payload: {type, index}
});

export const setSkills = (skills: ISkills): SkillAction => ({
    type: 'SET_SKILLS_ACTION',
    payload: skills
});
