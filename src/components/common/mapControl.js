import React from 'react';
import PropTypes from 'prop-types';

import styled,{css} from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import {media} from 'styles';

const RelativeContainer=styled.div`
  position:relative;
  height:100%;
  width:100%;
  };
`

const AbsoluteContainer=styled.div`
  position:absolute;
  left:${({position={}})=>position.left||'auto'};
  right:${({position={}})=>position.right||'auto'};
  top:${({position={}})=>position.top||'auto'};
  bottom:${({position={}})=>position.bottom||'auto'};
  display:flex;
  flex-direction:${({direction})=>direction||"column"};
  };
`
const IconContainer=styled.div`
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  font-weight: 500;
  font-family: ff-clan-web-pro, "Helvetica Neue", Helvetica, sans-serif;
  -webkit-box-pack: center;
  justify-content: center;
  letter-spacing: 0.3px;
  line-height: 14px;
  outline: 0px;
  text-align: center;
  transition: all 0.4s ease 0s;
  vertical-align: middle;
  opacity: 1;
  pointer-events: all;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 6px 12px 0px;
  
  
  padding: 0px;
  border-radius: 0px;
  background-color: rgb(41, 50, 60);
  color: rgb(106, 116, 133);
  border: 0px;
  
  width:0px;
  height: 0px;
  font-size:1px;
  
`;

const IconsContainer=styled.div`
  position:relative;
  display:flex;
  flex-direction:${({orient})=>!orient||orient=="left"?'row':
                                orient=="right"?'row-reverse':
                                orient=="top"?'column':'column-reverse'};                                
  &> div:first-child{
    width:32px;
    height:32px;
    font-size:11px;
  }
  &> div:not(:first-child):not(.iconsSub){
    width:${({orient})=>!orient||orient=="top"?"32px":
                                orient=="bottom"?"32px":'0px'};
    height:${({orient})=>!orient||orient=="left"?"32px":
                                orient=="right"?"32px":'0px'};                           
  }
  &:hover > div:not(:first-child):not(.iconsSub) {
    margin:${({orient})=>!orient||orient=="left"?"0 0 0 5px":
                                orient=="right"?"0 5px 0 0":
                                orient=="top"?"5px 0 0 0":"0 0 5px 0"};
    width:32px;
    height:32px;
    font-size:11px;
  }
  &:hover > .iconsSub > div,&:hover > .iconsSub > img {
    opacity: 1;
    width:50px;
    height:50px;
    font-size:11px;
  }
  
  &:hover > .iconsSub {
    // opacity: 1;
    // width: 150px;  
    // height:100px;
    
  }
`

const IconsSubContainer=styled.div.attrs({
  className: 'iconsSub'
})`
  display:flex;
  flex-direction:${({orient})=>!orient||orient=="left"?'row':
                                orient=="right"?'row-reverse':
                                orient=="top"?'column':
                                orient=="bottom"?'column-reverse':
                                'row'}; 
  transition: all 0.4s ease 0.4s;
  position: absolute;
  ${({orient="left"})=>orient=="left"?"left:36px;":
    orient=="top"?"top:36px":
    orient=="right"?"right:36px;":
    orient=="bottom"?"bottom:36px;":
    null}; 
  ${({sticky=null})=>sticky}
  
  
  
`;

const ImgStyle=styled.img`

  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  
  -webkit-box-pack: center;
  justify-content: center;
  
  
  outline: 0px;
  
  transition: all 0.4s ease 0s;
  vertical-align: middle;
  opacity: 1;
  pointer-events: all;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 6px 12px 0px;
  
  
  padding: 0px;
  border-radius: 0px;
  background-color: rgb(41, 50, 60);
  color: rgb(106, 116, 133);
  border: 0px;
  
  width:${({orient='left'})=>orient=='left'||orient=='right'?"0px":"50px"};
  height:${({orient='left'})=>orient=='left'||orient=='right'?"50px":"0px"};
  
`





export default class MapControl extends React.PureComponent {
  static propTypes = {
    orient:PropTypes.string,
    direction:PropTypes.string,
    position:PropTypes.object,
    items:PropTypes.array,
  }; 
  static defaultProps={
    orient:"left",
    direction:"column",
    items:[],

  };
    
  render(){
    const getIcons=(items)=>items.map((item,i)=>item.icons?
                <IconsSubContainer key={i} orient={this.props.orient} sticky={item.sticky}>{item.icons&&getIcons(item.icons)}</IconsSubContainer>:
                getIcon(item,i))

    const getIcon=(item,i)=>(
        item.icon?<IconContainer key={i} onClick={item.onClick}><FontAwesomeIcon icon={item.icon}/></IconContainer>:
        item.img?<ImgStyle  key={i} orient={this.props.orient}  src={item.img}  onClick={item.onClick}/>:null
    );
   
    return (
      <RelativeContainer>
        <AbsoluteContainer {...this.props}>
          {this.props.items&&this.props.items.map((item,i)=>(
            <IconsContainer key={i} orient={this.props.orient} style={item.style}>
              {getIcons(item.icons)}
            </IconsContainer>)
          )}
        </AbsoluteContainer>
        </RelativeContainer>
    )
  }
}
