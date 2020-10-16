type IncreaseSkillAction = { type: 'INC_SKILL_ACTION', payload: {type: string, index: number} }
type DecreaseSkillAction = { type: 'DEC_SKILL_ACTION', payload: {type: string, index: number} }

export type SkillAction = IncreaseSkillAction | DecreaseSkillAction;

export const increaseSkill = (type: string, index: number): SkillAction => ({
    type: 'INC_SKILL_ACTION',
    payload: {type, index}
});

export const decreaseSkill = (type: string, index: number): SkillAction => ({
    type: 'DEC_SKILL_ACTION',
    payload: {type, index}
});
