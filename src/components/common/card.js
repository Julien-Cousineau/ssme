import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {media} from 'styles';
import { Tabs,Divider,Descriptions } from 'antd';
import DataHover from './dataHover';
import {FormattedMessage} from 'localization';
import DataText from './dataText'

import {SVGEC,SSVG} from './iconList';

const { TabPane } = Tabs;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const containerStyles = css`
  background: white;
  box-shadow: 0px 0px 6px rgba(0,0,0,0.2);
  margin: 0px 5px 5px 5px;
  border-radius: 4px;
  overflow: hidden;
  pointer-events: auto;
  :hover .mycontainer {
  background: red;
}
  
  
  
  padding: ${props => props.theme.margins.small};
`;
const Line=styled.div`
    border-top: 3px solid rgba(0,0,0,0.1);
`
const VerticalContainer = styled.div`
  ${containerStyles} width: 300px;

  max-height: 400px;
  overflow: auto;
  // height: 400px;
  ${media.palm`
    width: 100%;
    height: auto;
  `};
`;

const Content = styled.div`
  // padding: ${props => props.theme.margins.small};
  // ${media.palm`
  //   padding: ${props => props.theme.margins.small};
  // `};
  height: 100%;
  flex-direction: column;
  display: flex;
  .ant-descriptions-item-label {
        font-size: 12px;
  }
  .ant-divider-horizontal {
    margin: 4px 0 0 0;
  }
  .ant-tabs-tab {
    margin: 0 8px 0 0;
    padding: 4px 0 !important;
    font-size: 12px !important;
  }
  .ant-tabs-content-holder {
    overflow: auto;
  }
  .ant-descriptions-item-content {
    word-break: normal  !important;
    max-width: 150px;
  }
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
  text-align: center;
`;
const SubTitle = styled.div`
  font-size: 10px;
  font-weight: 300;
  margin-bottom: 4px;
  text-align: center;
`;

export const Description = styled.div`
  white-space: break-spaces;
  font-size: ${props=>props.txtSize||12}px;
  font-weight:${props=>props.weight||300};
  
  color: :${props=>props.color||"#777"};;
  margin-bottom: 8px;
  line-height: 1.5;
  overflow: hidden;
`;

const Link = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: black;
`;

const DesContainer = styled.div`
  display: flex;
  justify-content:space-between;
`;
const DesContentLeft = styled.div`
   flex:${props=>props.flex|| "1 1 0"};
   padding-right:${props => props.theme.margins.small};
  // padding: ${props => props.theme.margins.small};
  
`;
const DesContent = styled.div`
   flex:${props=>props.flex|| "1 1 0"};
  
  
`;
export const Bold = styled.div`
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 0px;
  line-height: 1.5;
  overflow: hidden;
`;
const BoldRight = styled.p`
  font-size: 10px;
  font-weight: 600;
  margin-bottom: 0px;
  line-height: 1.0;
  overflow: hidden;
`;

const StyledFontAwesome = styled(FontAwesomeIcon)`
    
    // position:absolute;
    // right:0;
    cursor:pointer;
    // font-size:10px;
`;
const DragHandle = styled.div`
// background:red;
width: 100%;
    cursor: move;
`
const StyledIconContainer=styled.div`
  display: flex;
  justify-content: flex-end;
  // position:relative;
`
// const StyledIconContainer2=styled.div`
//   position:relative;
//   right:0;
// `

const StyledHeader=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
`
const HeaderCol=styled.div`
  margin-right: ${props=>props.right||0}px;
  // justify-content: flex-end;
  // position:relative;
`

export default class Card extends React.PureComponent {

static propTypes={
  title:PropTypes.string,
  subtitle:PropTypes.string,
  description:PropTypes.object,
  timeline:PropTypes.object,
  vessel:PropTypes.object,
  icon:PropTypes.node,
  closeProject:PropTypes.func


};
static defaultProps={
  title:"default",
  subtitle:"default",
  description:{},
  timeline:{},
  vessel:{},
  closeProject:()=>null,
  
 

};
  render(){
    const {projectID,icon,title,subtitle,description,timeline,vessel,emissions={}}=this.props;
    
    const getContent=(array,txtSize=11,weight,color)=>Object.keys(array).map((key,i)=>(
    <div key={i}>
      <Bold><DataText value={key} projectID={projectID} header={true}/></Bold>
      <Description txtSize={txtSize} weight={weight} color={color} size="small"><DataText value={array[key]} projectID={projectID} /></Description>
    </div>
    ))
      {/*<VerticalContainer>*/}
      
    const getEmissions=(array)=>(
       <Descriptions
          bordered
          // title="Custom Size"
          column={1}
          size={"small"}
        >
          {Object.keys(array).map((key,i)=><Descriptions.Item key={i} label=<DataText value={key} projectID={projectID} header={true}/>><DataText value={array[key]} projectName={projectID} /></Descriptions.Item>)}
          
        </Descriptions>
          )
    
    
    return(
  

    <Content>
      <StyledIconContainer>
        <DragHandle className="drag-handle" />
        <StyledFontAwesome icon={faTimes} onClick={()=>this.props.closeProject()}/>
      </StyledIconContainer>
      {/*<StyledIconContainer2><StyledFontAwesome icon={faTimes} onClick={()=>this.props.closeProject()}/></StyledIconContainer2>*/}
      <StyledHeader>
        <HeaderCol right={15}>{icon}</HeaderCol>
        <HeaderCol>
          <Title><DataHover value={title}/></Title>
          <SubTitle>{subtitle}</SubTitle>
        </HeaderCol>
      </StyledHeader>
      <Divider />
       <Tabs size="small" >
        <TabPane tab=<FormattedMessage id={'card.info'}/> key="1">
          {getContent(description)}
        </TabPane>
        <TabPane tab=<FormattedMessage id={'card.timeline'}/> key="2">
          {getContent(timeline)}
        </TabPane>
        <TabPane tab=<FormattedMessage id={'card.vessel'}/> key="3">
          {getContent(vessel)}
        </TabPane>
        <TabPane tab=<FormattedMessage id={'card.emissions'}/> key="4">
          {getEmissions(emissions)}
        </TabPane>        
      </Tabs>
      
      
     
    </Content>
 
 
 
)
  }
}

// {getContent(emissions,12,600,"rgba(0, 0, 0, 0.85)")}
 {/*</VerticalContainer>*/}

// <DesContainer>
//         <DesContentLeft flex="2 1 0">
//           {getContent(description)}
//         </DesContentLeft>
//         <DesContent flex="1 1 0">
//         {getContent(timeline)}
          
//         </DesContent>
//         <DesContent flex="1 1 0">
//           {getContent(vessel)}
//         </DesContent>        
//       </DesContainer>