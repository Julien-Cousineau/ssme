import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {media} from 'styles';
import {withData} from 'dataContext.js';
import DataHover from './dataHover';
import DataText from './dataText'
import {FormattedMessage} from 'localization';
import {getHeat} from './map.legend';
import {Descriptions} from 'antd';
import {getProjects,getProjectID,getProjectName,getClientName,getDescription} from 'utils.js';
const containerStyles = css`
  background: ${props => props.theme.hoverBackground || 'white'};
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const HoverContainer = styled.div`
  ${containerStyles} 
  position: absolute;
  z-index: 1;
  
  // pointer-events: none;
  left: ${props => props.x +"px"||0};
  top:  ${props => props.y +"px"||0};
  max-width: ${props => props.maxWidth?props.maxWidth+"px":"auto"};
  max-height: 400px;
`;

const Content = styled.div`
  padding: ${props => props.theme.margins.small};
`;


const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  // margin-bottom: 4px;
`;
const SubTitle = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 12px;
`;

const Description = styled.div`
  font-size: 10px;
  color: #777;
  // margin-bottom: 8px;
  line-height: 1.5;
  overflow: hidden;
`;
const Bold = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0px;
  line-height: 1.5;
  overflow: hidden;
`;

const Link = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: black;
`;

class HoverCard extends React.PureComponent {

    static propTypes={
        data:PropTypes.object,
        lng:PropTypes.string,
        hoverInfo:PropTypes.array,
        
    };
    static defaultProps={
       data:{},
       lng:"en",
       hoverInfo:[],
    };
    
    
      
      
    getProjectContent=({lng,x,y,object:properties})=>(
    <HoverContainer x={x} y={y} maxWidth={300}>
      <Content>
        <Title><DataHover value={getProjectName(properties,lng)}/></Title>
        <SubTitle>{getClientName(properties,lng)}</SubTitle>
        {Object.keys(getDescription(properties,lng)).map((key,i)=><div key={i}><Bold><DataText value={key} getProjectID={getProjectID(properties,lng)} header={true}/></Bold><Description  size="small"><DataText value={properties[key]} projectID={getProjectID(properties,lng)}/></Description></div>)}
      </Content>
    </HoverContainer>
    )
    
    getRouteContent=({x,y,routes,projects})=>{
      const {lng}=this.props;
      return(
      <HoverContainer x={x} y={y} maxWidth={300}><Content>
        <Title><FormattedMessage id={'card.shippingroutes'}/></Title>
          {routes.map(({object:{ID,InboundOut,Distance}},i)=>(
            <div key={i}>
              <Bold>{<DataHover value={getProjectName(projects.find(p=>getProjectID(p,lng)==ID),lng)}/>}</Bold>
              <Description>Direction: {InboundOut}</Description>
              <Description>Distance: {parseFloat(Distance).toFixed(1)} km</Description>
            </div>
            ))}
        </Content>
      </HoverContainer>
        
      )}
    
    getTerminalContent=({x,y,object:properties})=>(
      <HoverContainer x={x} y={y} maxWidth={300}>
        <Content>
            <Title>{properties.name}</Title>
        </Content> 
     </HoverContainer>
     )
        
    getHeatContent=({heatmap,heatmapValue,x,y,object:properties})=>(
    <HoverContainer x={x} y={y} maxWidth={300}>
      <Content>
          <span><DataHover value={heatmap.title}/>:</span>
          <span>{parseFloat(properties[heatmapValue]/1E6).toFixed(2)}</span>
          <span> t</span>
      </Content> 
     </HoverContainer>
     )
    
    render(){
      const {data,lng,heatmapValue,selectedProjects=[],hoverInfo:o=[],showAllRoutes}=this.props;
      if(o.length==0)return null;
      
      const projects=o.filter(p=>p.layer.id==="icon-layer");
      if(projects.length>0) return this.getProjectContent({lng,...projects[0]});
      
      const terminals=o.filter(p=>p.layer.id==="terminals");
      if(terminals.length>0) return this.getTerminalContent({lng,...terminals[0]});
      
      let routes=o.filter(p=>p.layer.id==="routes-static");
     
      if(routes.length>0){
        if(!showAllRoutes){
          routes=routes.filter(p=>selectedProjects.includes(p.object['ID']));
          if(routes.length!=0)return this.getRouteContent({...routes[0],routes:routes,projects:getProjects({data,lng,selectedProjects})});
          
        } else{
          return this.getRouteContent({...routes[0],routes:routes,projects:data[lng].projects});
        }
      } 
      
      const heatnodes=o.filter(p=>p.layer.id==="heatmapp")
      if(heatnodes.length>0) return this.getHeatContent({...heatnodes[0],heatmap:getHeat(heatmapValue),heatmapValue});
      
      
      
      
      return null;
      
    }
}
    




export default withData(HoverCard);