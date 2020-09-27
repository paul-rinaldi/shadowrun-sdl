import { combineReducers, createStore } from 'redux';
import { playerReducer } from './PlayerReducer';

const reducer = combineReducers(playerReducer);

export const store = createStore(reducer);