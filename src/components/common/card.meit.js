import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {media} from 'styles';
import { Tabs,Divider,Descriptions,Table,Popover,Typography } from 'antd';
import {FormattedMessage} from 'localization';
import DataHover from './dataHover'

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import {SVGEC,SSVG} from './iconList';

const { TabPane } = Tabs;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

const containerStyles = css`
  // background: ${props => props.background||"white"};
  box-shadow: 0px 0px 6px rgba(0,0,0,0.2);
  margin: 0px 5px 5px 5px;
  border-radius: 4px;
  overflow: hidden;
  pointer-events: auto;
  :hover .mycontainer {
  // background: red;
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
  // background:${props => props.background||"white"};
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
    white-space: break-spaces;
    font-size: 10px;
  }
  .ant-table-tbody > tr > td {
    padding: 2px 2px;
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

const { Link } = Typography;

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
export const Bold = styled.p`
  font-size: 12px;
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

// const StyledFontAwesome = styled(FontAwesomeIcon)`
    
//     // position:absolute;
//     // right:0;
//     cursor:pointer;
//     // font-size:10px;
// `;
const DragHandle = styled.div`
// background:red;
width: 100%;
    cursor: move;
`
const StyledFontAwesome = styled(FontAwesomeIcon)`
    margin-left: 6px;
    cursor:pointer;
    color: #999;
    // font-size:10px;
`;
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

const printValue=(value)=>{
    if(!_.isObject(value))return value
    return Object.keys(value).map(key=>`${key}:${value[key]}`).join('\n')
}

export default class Card extends React.PureComponent {



static propTypes={
  name:PropTypes.string,
  type:PropTypes.string,
  vessels:PropTypes.object,
  emissions:PropTypes.object,
};
static defaultProps={
  name:"default",
  type:"anchorage",
  vessels:{inbound:{},outbound:{}},
  emissions:{},
};
  render(){
    const {name,type,vessels,emissions}=this.props;
    
    
    const inbound=vessels.inbound;
    const outbound=vessels.outbound;
    
    const _vessels=[];
    
    Object.keys(inbound).forEach((_class,i)=>{
      const v=_vessels.find(v=>v.class==_class)
      if(!v) return _vessels.push({"class":_class,movement:inbound[_class]})
      v.movement+=inbound[_class];
      
    })
    Object.keys(outbound).forEach((_class,i)=>{
      const v=_vessels.find(v=>v.class==_class)
      if(!v) return _vessels.push({"class":_class,movement:outbound[_class]})
      v.movement+=outbound[_class];
      
    })
    
   
 
      const columnsMovement = [
  {
     title: <FormattedMessage id={`table.vesselclass`}/>,
    dataIndex: 'class',
    key: 'class',
    render:(text)=><FormattedMessage id={`sclass.${text}`}/>
  },
  {
    title: <FormattedMessage id={`table.movement`}/>,
    dataIndex: 'movement',
    key: 'movement',
  },
];
  
  
  const meitLink=`https://www.canada.ca/en/environment-climate-change/services/managing-pollution/marine-emissions-inventory-tool.html`;
  // const dataSource=[
  // {key:"nox",title:"NOx"},
  // {key:"sox",title:"SOx"},
  // {key:"co",title:"CO"},
  // {key:"voc",title:"VOC"},
  // {key:"pm25",title:"PM2.5"},
  // {key:"pm10",title:"PM10"},
  // {key:"co2e",title:"GHGs"}].map(({key,title})=>({key,emission: <DataHover value={`{${title}}`}/>,value: emissions[key]}));
  
  

  
      
//     const columns = [
//   {
//     title: 'Pollutant',
//     dataIndex: 'emission',
//     key: 'emission',
    
//   },
//   {
//     title: <Popover placement="right" 
//       overlayStyle={{maxWidth:200}} 
//       content={<div>
//         <Bold><FormattedMessage id={'card.references'}/></Bold>
//         <Link style={{fontSize:10,display: "inline-block"}} href={meitLink} target="_blank"> Data based on MEIT 2018</Link>
//       </div>}  
//       trigger="click">
//         <DataHover value="Emission ({t/yr})"/> <StyledFontAwesome icon={faInfoCircle}/> 
//     </Popover>,
//     dataIndex: 'value',
//     key: 'value',
//     render:(text)=>parseFloat(text).toFixed(1)
//   },
// ];
    
    return(
  

    <Content>
      <StyledIconContainer>
        <DragHandle className="drag-handle" />
        <StyledFontAwesome icon={faTimes} onClick={()=>this.props.meitHandleClose(name)}/>
      </StyledIconContainer>
      <StyledHeader>
        <HeaderCol>
          <Title>{name}</Title>
        </HeaderCol>
      </StyledHeader>
      <Divider />
      <Tabs size="small" >
       <TabPane tab=<FormattedMessage id={'card.vessel'}/> key="1">
        <Table pagination={false} dataSource={_vessels} columns={columnsMovement} />
       </TabPane>  
       {/*<TabPane tab=<FormattedMessage id={'card.emissions'}/> key="2">
        <Table pagination={false} dataSource={dataSource} columns={columns} />
       </TabPane>  */}
      </Tabs>
      <Link style={{fontSize:10,display: "inline-block"}} href={meitLink} target="_blank"><FormattedMessage id={'table.link'}/></Link>
      
     
    </Content>
 
 
 
)
  }
}

// const vesselCountbyClass=<Descriptions
//           bordered
//           // title="Custom Size"
//           column={1}
//           size={"small"}
//         >
//           {Object.keys(_vessels).map((key,i)=><Descriptions.Item key={i} label=<DataHover value={key}/>>{printValue(_vessels[key])}</Descriptions.Item>)}
          
//         </Descriptions>
    

//     const vesselCount=<Descriptions
//           bordered
//           // title="Custom Size"
//           column={1}
//           size={"small"}
//         >
//         <Descriptions.Item label="Inbound">{Object.keys(vessels.inbound).reduce((a,b)=>a+vessels.inbound[b],0)}</Descriptions.Item>
//         <Descriptions.Item label="Outbound">{Object.keys(vessels.outbound).reduce((a,b)=>a+vessels.outbound[b],0)}</Descriptions.Item>
//         </Descriptions> 
        
// <Table dataSource={dataSource} columns={columns} />;
     

  // <Tabs size="small" >
  //       <TabPane tab=<FormattedMessage id={'card.vessel'}/> key="3">
  //         {mode==="Anchored"?vesselCountbyClass:vesselCount}
  //       </TabPane>
  //       <TabPane tab=<FormattedMessage id={'card.emissions'}/> key="4">
  //                 <Descriptions
  //         bordered
  //         // title="Custom Size"
  //         column={2}
  //         size={"small"}
  //       >
  //         {Object.keys(emissions).map((key,i)=><Descriptions.Item key={i} label=<DataHover value={key}/>>{(+emissions[key]).toFixed(0)}</Descriptions.Item>)}
  //       </Descriptions>
  //       </TabPane>  
  //       </Tabs>