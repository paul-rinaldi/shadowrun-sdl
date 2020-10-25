import { makeLog } from './logActions';

type AdjustKarmaAction = { type: "ADJUST_KARMA_ACTION", payload: number };
type SetKarmaAction = { type: 'SET_KARMA_ACTION', payload: number};

export type KarmaAction = AdjustKarmaAction | SetKarmaAction;

export const adjustKarma = (adjustment: number): KarmaAction => {
    return ({
        type: "ADJUST_KARMA_ACTION",
        payload: adjustment
    });
}

export const setKarma = (value: number): KarmaAction => ({
    type: 'SET_KARMA_ACTION',
    payload: value
});

// TODO: adjustKarma should have extra arguments, and the current adjustKarma action does not 
// include that functionality. setState should probably not be used in here.
// export const adjustKarmaReason =(adjustment: number, reason: string, reasonType: string) =>{
//     if(this.state.karma + adjustment >= 0){
//         this.setState(currentState => {
//             const now = new Date(); //New Date() with no params gets current time
//             const logCopy = JSON.parse(JSON.stringify(currentState.log));
//             logCopy.unshift({
//                 adjustment: adjustment,
//                 reason: reason,
//                 reasonType: reasonType,
//                 time: now
//             });

//             return {
//                 karma: currentState.karma + adjustment,
//                 log: logCopy
//             };
//         });
//         return true;
//     } else {
//         return false;
//     }
// }
