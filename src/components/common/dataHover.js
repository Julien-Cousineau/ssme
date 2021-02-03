import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Tooltip,Typography} from 'antd';

import _ from 'lodash';
const { Link } = Typography;

import {DataContext} from 'dataContext.js';

const TooltipStyle=styled.span`
    color:${props=>props.theme.linkColor};
`;

export const Bold = styled.p`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0px;
  line-height: 1.5;
  overflow: hidden;
`;
export const Description = styled.div`
  font-size: 10px;
  color: #777;
  margin-bottom: 8px;
  line-height: 1.5;
  overflow: hidden;
`;

export default class dataHover extends React.PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    placement:PropTypes.string,
  }; 
  static defaultProps={
   
  };
  render(){
    return(
      <DataContext.Consumer>
       {({data,lng}) =>{
            const {value,placement}=this.props;
            const definitions=data[lng].definitions;
            
            const reg=/\{.*?\}/g;
            if(!_.isString(value))return <span>{Number(value).toFixed(1)}</span>;
            
            const parts = this.props.value.split(reg);
            const placeholders=this.props.value.match(/[^{\}]+(?=})/g);
            if(!placeholders) return <span>{value}</span>;
            
            // const newvalues=placeholders.map(p=>{
            //   if(p.includes("hyperlink")){
            //     const [_text,_hyperlink]=p.split(",");
            //     const text=_text.split("=")[1];
            //     const hyperlink=_hyperlink.split("=")[1];
            //     parts[i]=<Link style={{fontSize:10,display: "inline-block"}} href={hyperlink} target="_blank">{text} </Link>
            //   } else {
                
            //   }
            //   if(!definitions[p])console.warn(p)
            //   return definitions[p]?definitions[p]:p
            // });
              
            for (var i = 1; i < parts.length; i += 1) {
            
              const p=placeholders[i-1];
              if(p.includes("hyperlink")){
               const [_text,_hyperlink]=p.split(",");
               const text=_text.split("=")[1];
               const hyperlink=_hyperlink.split("=")[1];
               parts[i]=<Link style={{fontSize:10,display: "inline-block"}} href={hyperlink} target="_blank">{text} </Link>;
                
              } else {
                if(!definitions[p])console.warn(p);
                const title=definitions[p]?definitions[p]:p;
                parts[i] = [<Tooltip key={i+"a"} title={title} placement={placement}><TooltipStyle>{placeholders[i-1]}</TooltipStyle> </Tooltip>,<span key={i+"b"}>{parts[i]}</span>];
              }
              
            }
            return <span>{parts}</span>;
           
       }} 
      </DataContext.Consumer>
      );
  }
}
