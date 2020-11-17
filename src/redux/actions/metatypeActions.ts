
type SetMetaTypeAction = { type: 'SET_METATYPE_ACTION', payload: string };
export type MetaTypeAction = SetMetaTypeAction;

export const setMetaType = (newMetaType: string): SetMetaTypeAction => ({
    type: 'SET_METATYPE_ACTION',
    payload: newMetaType
});