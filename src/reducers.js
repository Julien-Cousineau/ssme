import { createReducer } from '@reduxjs/toolkit';
import {NAME,TEAM,LNG} from './constants';

export default createReducer({
  [NAME]:"First",
  [TEAM]:"MyTeam",
  [LNG]:'en',

}, {
  [NAME]: (state, { payload }) => {state[NAME] = payload},
  [TEAM]: (state, { payload }) => {state[TEAM] = payload},
  [LNG]: (state, { payload }) => {state[LNG] = payload},
});
