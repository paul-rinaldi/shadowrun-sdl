export type EdgeAction = { type: 'SET_EDGE_ACTION', payload: number};

export const setEdge = (newEdge: number): EdgeAction => ({
    type: 'SET_EDGE_ACTION',
    payload: newEdge
});
