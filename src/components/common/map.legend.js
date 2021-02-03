import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';


import IconList,{SVG,SVGEC,SSVG,Description,svgFile,SvgBoundary,ExistingProject,ProposedProject} from './iconList';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import DataHover from './dataHover';
import {FormattedMessage} from 'localization';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faCaretDown,faBullseye,faMousePointer} from '@fortawesome/free-solid-svg-icons';
import { Dropdown,Menu,Tooltip,Popover } from 'antd';






export const SvgBoundaryContainer = styled.div`
  width:30px;
  margin-right:5px;
`;


const SvgAnchorage=<svg viewBox="0 0 576 512"><path style={{fill:"rgb(165,0,38)"}} d="M12.971 352h32.394C67.172 454.735 181.944 512 288 512c106.229 0 220.853-57.38 242.635-160h32.394c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.029 67.029c-7.56 7.56-2.206 20.485 8.485 20.485h35.146c-20.29 54.317-84.963 86.588-144.117 94.015V256h52c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-52v-5.47c37.281-13.178 63.995-48.725 64-90.518C384.005 43.772 341.605.738 289.37.01 235.723-.739 192 42.525 192 96c0 41.798 26.716 77.35 64 90.53V192h-52c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h52v190.015c-58.936-7.399-123.82-39.679-144.117-94.015h35.146c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0L4.485 331.515C-3.074 339.074 2.28 352 12.971 352zM288 64c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32z"></path></svg>

const SvgAnchorageContainer = styled.div`
  width:12px;
  
  margin-right:5px;
`


const rowStyle=css`
  display:flex;
  align-items: center;
  direction: ltr;

`
export const Row = styled.div`
   ${rowStyle}`;

export const RowR=styled.div`
  ${rowStyle} 
  flex-direction: row-reverse;
`
const containerStyles = css`
  background: ${props => props.theme.hoverBackground || 'white'};
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const IconListContainer=styled.div`
  max-height:100px;
  overflow:auto;
  padding-right:6px;
  ::-webkit-scrollbar-track  {
  	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
  	border-radius: 5px;
  	background-color: #F5F5F5;
  }

  ::-webkit-scrollbar  {
  	width: 3px;
  	background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb  {
  	border-radius: 5px;
  	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);
  	background-color: #BABABA;
  }
`;

const HoverContainer = styled.div`
  ${containerStyles} 
  padding: ${props => props.theme.margins.small};
  position: absolute;
  z-index: 1;
  
  pointer-events: auto;
  left: ${props => props.x +"px"||0};
  top:  ${props => props.y +"px"||0};
  max-width: ${props => props.maxWidth?props.maxWidth+"px":"auto"};
 
`;
export const Bold = styled.p`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0px;
  line-height: 1.5;
  overflow: hidden;
`;

const Content = styled.div`
  max-height: calc(100vh - 240px);
  overflow: auto;
  direction: rtl;
  padding-left: 10px;
  margin-left: -10px;
   ::-webkit-scrollbar-track  {
  	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
  	border-radius: 10px;

  	
  }

  ::-webkit-scrollbar  {
  	width: 5px;

  	background-color: #F5F5F5;
  	
  }

  ::-webkit-scrollbar-thumb  {
  	border-radius: 10px;
  	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);
  	background-color: #BABABA;
  		
  
  	
  
  	
  }
  
  
`;

export const Description2 = styled.div`
  font-size: 10px;
  color: #777;
  margin-bottom: 0px;
  margin-left: 6px;
  line-height: 1.0;
  overflow: hidden;
  white-space: break-spaces;
  flex: 1;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const SubTitle = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin-top: 12px;
  margin-bottom: 0px;
  flex: 1;
  
`;

const SubTitle2 = styled.div`
  font-size: 12px;
  font-weight: 300;
  
  
  margin-bottom: 0px;
  flex: 1;
`;
const LineC = styled.div`
    width: 36px;
    padding: 0 6px;
`
const CircleC= styled.div`
    width: 36px;
    padding: 0 6px;
`
const GradientC = styled.div`
    display:flex;
    justify-content: space-between;
`
const Gradient = styled.div`
    height: 10px;
    width: 100%;
    background-image: linear-gradient(to right,#4575b4,#91bfdb,#e0f3f8,#fee090,#fc8d59,#d73027);
`
const Link =styled.a`
  color:#1890ff !important;
`
const Column=styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
`
const Column2=styled.div`
 padding-left:5px;
 width:30px;
`
export const Row2 = styled.div`
  display:flex;
  align-items: flex-start;
`;

const StyledFontAwesome = styled(FontAwesomeIcon)`
    color:${props=>props.show?'rgba(0,0,0,0.25)':'rgba(0,0,0,.85)'};
    margin-left:5px;
    cursor:pointer;
`;

const StyledGroupFontAwesome = styled.span`
    opacity:${props=>props.show?0.25:1.0};
    cursor:pointer;
`;



export const getHeat=(value)=>{
  if(value=='nox')return {title:"{NOx}",min:0.5,max:400,unit:'{t}'};
  if(value=='sox')return {title:"{SO2}",min:0.01,max:20,unit:'{t}'};
  if(value=='pm25')return {title:"{PM2.5}",min:0.01,max:10,unit:'{t}'};
  if(value=='co2e')return {title:"{CO2e}",min:30,max:3000,unit:'{t}'};
  return {min:0,max:1,unit:'t'};
}
const HoverCard = ({x,y,handleChange,heatmapValue='nox',handleHeat,handleHeatHover,showAllRoutes,handleAllRoutes,showHeat,showHeatHover,showExisting,handleShowExisting}) => {
  const heatmap=getHeat(heatmapValue)
  const meitLink=`https://www.canada.ca/en/environment-climate-change/services/managing-pollution/marine-emissions-inventory-tool.html`;
  
  
  return (
  <HoverContainer x={x} y={y} maxWidth={160}>
   <Title><FormattedMessage id={'legend.title'}/></Title>
   <Content>
      
      <Row>
        <SvgBoundaryContainer>{SvgBoundary}</SvgBoundaryContainer>
        <Description style={{marginTop:5,width:45}}><FormattedMessage id={'legend.sea'}/></Description>
      </Row>
      <Row>
      <SubTitle><FormattedMessage id={'legend.projectStatus'}/></SubTitle>
      </Row>
      <Row>
        <SVGEC>{ExistingProject}</SVGEC>
        <Description><FormattedMessage id={'legend.existing'}/></Description>
      </Row>
      <Row>
         <SVGEC>{ProposedProject}</SVGEC>
        <Description><FormattedMessage id={'legend.proposed'}/></Description>
      </Row>
      <Row>
        <SubTitle><FormattedMessage id={'legend.exportType'}/></SubTitle>
      </Row>
      <Row>
        <IconListContainer><IconList /></IconListContainer>
      </Row>
      <Row>
      <SubTitle2><FormattedMessage id={'legend.vesselRoutes'}/></SubTitle2>
       <Tooltip title=<FormattedMessage id={showAllRoutes?'tooltip.hideAllRoutes':'tooltip.showAllRoutes'}/>>
            <div>
              <StyledFontAwesome show={!showAllRoutes} icon={faEye} onClick={handleAllRoutes}/>
            </div>
          </Tooltip>
      
      </Row>
       <Row>
        <LineC><svg viewBox="0 0 10 4" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="20" y2="1" stroke="black"  /></svg></LineC>
        <Description><FormattedMessage id={'legend.notspecified'}/></Description>
        </Row>
        <Row>
        <LineC><svg viewBox="0 0 10 4" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="20" y2="1" stroke="black" strokeDasharray="5 1" /></svg></LineC>
        <Description><FormattedMessage id={'legend.inbound'}/></Description>
      </Row>       
       <Row>
        <LineC><svg viewBox="0 0 10 4" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="20" y2="1" stroke="black" strokeDasharray="2 2" /></svg></LineC>
        <Description><FormattedMessage id={'legend.outbound'}/></Description>
        </Row>
         <Row>
        <SubTitle><FormattedMessage id={'legend.existingterminals'}/></SubTitle>
        <Tooltip title=<FormattedMessage id={showExisting?'tooltip.hideExisting':'tooltip.showExisting'}/>>
            <div>
              <StyledFontAwesome show={!showExisting} icon={faEye} onClick={handleShowExisting}/>
            </div>
          </Tooltip>
        
         </Row>
         <Row>
         <div style={{display:"flex",width: 36,"justifyContent": "center"}}>
          <SvgAnchorageContainer>{svgFile('#000')}</SvgAnchorageContainer>
        </div>
       
        <Description2><FormattedMessage id={'legend.harbour'}/></Description2>
        </Row>
      <Row>
        <div style={{display:"flex",width: 36,"justifyContent": "center"}}>
          <SvgAnchorageContainer>{SvgAnchorage}</SvgAnchorageContainer>
        </div>
      
        <Description><FormattedMessage id={'legend.anchorage'}/></Description>
      </Row>   
        
        
        <Row> 
          <SubTitle2></SubTitle2>
          <Popover placement="right" 
      overlayStyle={{maxWidth:200}} 
      content={<div>
        <Bold><FormattedMessage id={'card.references'}/></Bold>
        <Link style={{fontSize:10,display: "inline-block"}} href={meitLink} target="_blank"> <FormattedMessage id={'table.link'}/> </Link>
      </div>}  
      trigger="click">
        <FormattedMessage id={'legend.emissions'}/> <StyledFontAwesome icon={faInfoCircle}/> 
    </Popover>
          
          
          <Tooltip title=<FormattedMessage id={showHeat?'tooltip.hideheatmap':'tooltip.showheatmap'}/>>
            <div>
              <StyledFontAwesome show={!showHeat} icon={faEye} onClick={handleHeat}/>
            </div>
          </Tooltip>
        
          <Tooltip title=<FormattedMessage id={showHeatHover?'tooltip.hidehoveremission':'tooltip.showhoveremission'}/>>
               <div>
              <StyledGroupFontAwesome show={!showHeatHover} className="fa-layers fa-fw" onClick={handleHeatHover}>
                <FontAwesomeIcon icon={faBullseye} color="rgba(0,0,0,0.5)"  />
                <FontAwesomeIcon icon={faMousePointer} transform="shrink-2 right-4 down-4"  />
              </StyledGroupFontAwesome>
              </div>
          </Tooltip>
          
        </Row>
        <Row> 
         
        </Row> 
        <RowR>
            <Dropdown  trigger={['click']} overlay=<Menu>
              <Menu.Item><a onClick={()=>handleChange("nox")}><DataHover value="{NOx}"/></a></Menu.Item>
              <Menu.Item><a onClick={()=>handleChange("sox")}><DataHover value="{SO2}"/></a></Menu.Item>
              <Menu.Item><a onClick={()=>handleChange("pm25")}><DataHover value="{PM2.5}"/></a></Menu.Item>
              <Menu.Item><a onClick={()=>handleChange("co2e")}><DataHover value="{CO2e}"/></a></Menu.Item>
             </Menu>>
              <Link className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <DataHover value={heatmap.title||"D"}/>
                  <FontAwesomeIcon icon={faCaretDown}/>
              </Link>
            </Dropdown>
       </RowR>
          <Row>
          <Column>
            <Gradient></Gradient>
            <GradientC><span>{heatmap.min ||0}</span><span>{heatmap.max||1} <DataHover value={heatmap.unit||"{t}"}/></span></GradientC>
          </Column>
        
         </Row>

       
    </Content>
  </HoverContainer>
  )
};



HoverCard.propTypes={
  title:PropTypes.string,
  properties:PropTypes.object,
  x:PropTypes.number,
  y:PropTypes.number,
  handleChange:PropTypes.func,
  handleHeat:PropTypes.func,
  showHeat:PropTypes.bool,
  
};
HoverCard.defaultProps={
  title:undefined,
  properties:{},
  x:0,
  y:0,
  handleChange:()=>null,
  handleHeat:()=>null,
  handleHeatHover:()=>null,
  showHeat:true,
  showHeatHover:false,
};


export default HoverCard;