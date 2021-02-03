import {NAME,NAME2,LNG,CLICK_BUTTON,CLICK_BUTTON2,SETLNG} from './constants';

const clickButton = (payload) => (async (dispatch, getState) => {
  
  dispatch({ type: NAME, payload:"Last" });
});
const clickButton2 = (payload) => (async (dispatch, getState) => {
  
  dispatch({ type: NAME2, payload:"Middle" });
});

const setLng = (payload) => (async (dispatch, getState) => {
  dispatch({ type: LNG, payload:getState()[LNG]=='en'?'fr':'en'});
});


export default {
  [CLICK_BUTTON]:clickButton,
  [CLICK_BUTTON2]:clickButton2,
  [SETLNG]:setLng,
};