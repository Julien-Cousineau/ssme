import { connect } from 'react-redux';

import actions from './actions';


export const getStoreProps = (store,_class, array) => {
  const obj = {};
  const name=_class.name;
  const defs=_class.defaultProps;
  if(!defs){console.warn(`Class ${name} needs defaultProps`);return obj;}
  
  array.forEach(([key,prop]) => {
    
    if(typeof defs[prop]==='undefined')return console.warn(`Prop=${prop} does not exist`);
   
    
    if(!store[key])return console.warn(`constant=${key} does not exist in store`);
    obj[prop]=store[key];
  });
  return obj;
};

export const getDispatchProps = (dispatch,_class, array) => {
  const obj = {};
  const name=_class.name;
  const defs=_class.defaultProps;
  if(!defs){console.warn(`Class ${name} needs defaultProps`);return obj;}
   
  array.forEach(([key,prop]) => {
    if(!defs[prop])return console.warn(`Prop=${prop} does not exist in ${name}`);
    const _f = actions[key];
    
    if(!_f)return console.warn(`actionId=${key} does not exist`);
    obj[prop] = (obj) => dispatch(_f(obj));
  });
  
  return obj;
};

export const mergeProps = (stateProps, dispatchProps, ownProps) => ({ ...ownProps,...stateProps,...dispatchProps  });


export default (Component,Props,Actions)=>(connect(
  store => getStoreProps(store,Component,Props),
    dispatch => getDispatchProps(dispatch,Component,Actions),
    mergeProps,
  )(Component)
);