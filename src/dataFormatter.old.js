// import React from 'react';

// import styled,{css} from 'styled-components';
// import { Tooltip,Popover} from 'antd';
// import { Typography} from 'antd';

// const { Text, Link } = Typography;

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import {DataContext} from 'dataContext.js';


// import {KEYS} from 'constants.js';

// const getColumns =(p,array)=>Object.keys(p).filter(key=>array.includes(key)).reduce((acc, curr) => {acc[curr] = p[curr];return acc;}, {});

// export const formatter=({type,data,lng,value})=>{
//   if(type==="projectName")return value[KEYS[lng].projectNameHeader].split('\n')[0];
//   if(type==="clientName")return value[KEYS[lng].projectNameHeader].split('\n')[1];
//   if(type==="description")return getColumns(value,KEYS[lng].groups.description);
//   if(type==="timeline")return getColumns(value,KEYS[lng].groups.timeline);
//   if(type==="vessel")return getColumns(value,KEYS[lng].groups.vessel);
 
// };

// const StyledFontAwesome = styled(FontAwesomeIcon)`
//     margin-left: 6px;
//     cursor:pointer;
// `;


// const TooltipStyle=styled.span`
//     color:${props=>props.theme.linkColor};
// `

// export const Bold = styled.p`
//   font-size: 12px;
//   font-weight: 600;
//   margin-bottom: 0px;
//   line-height: 1.5;
//   overflow: hidden;
// `;
// export const Description = styled.div`
//   font-size: 10px;
//   color: #777;
//   margin-bottom: 8px;
//   line-height: 1.5;
//   overflow: hidden;
// `;

// export default class DataFormatter extends React.PureComponent {
//   render(){
//     return(
//       <DataContext.Consumer>
//       {({data,lng}) =>{
//             const definitions=data[lng].definitions;
//             const info=data[lng].info;
//             const references=data[lng].references;
//             let {value}=this.props;
           
//             const reg=/\{.*?\}/g;
//             const parts = this.props.value.split(reg);
//             const placeholders=this.props.value.match(/[^{\}]+(?=})/g);
            
            
//             if(placeholders){
          
//             const newvalues=placeholders.map(p=>definitions[p]?definitions[p]:p);
             
             
//               for (var i = 1; i < parts.length; i += 1) {
              
//                 parts[i] = [<Tooltip title={newvalues[i-1]}><TooltipStyle>{placeholders[i-1]}</TooltipStyle> </Tooltip>,<span key={i}>{parts[i]}</span>];
//               }
//               return <span>{parts}</span>;
//             }
//             return <span>{value}</span>;
//       }} 
     
   
//       </DataContext.Consumer>
//       )
//   }
  
// }
