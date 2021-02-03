import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row } from 'antd';
import styled from 'styled-components';

import Logo from './canadaLogo';
import {media} from 'styles';
import Button from './button';
import Menu from './menu.js';




const LogoFont = styled.p`
  white-space: pre-line;
  color:${props => props.theme.logoTextColor};
  font-family:helvetica;
  font-weight: bold;
  line-height: 1.4;
  font-size: 0.8em;
  padding:0;
  margin:0;
   
`;


class Header extends React.PureComponent {
  static propTypes = {
    className:PropTypes.string,
    title:PropTypes.oneOfType([PropTypes.string,PropTypes.node]),
    sTitle:PropTypes.oneOfType([PropTypes.string,PropTypes.node]),
    
    departments:PropTypes.array,
    items:PropTypes.array,
    lng:PropTypes.string,
    label:PropTypes.oneOfType([PropTypes.string,PropTypes.node]),
    setLng:PropTypes.func,
  }; 
  static defaultProps={
    className:"",
    departments:[
      {en:"Government of Canada",fr:"Gouvernment du Canada",width:"70px",marginRight:"10px",marginLeft:"0px"},
      // {en:"Environment and \nClimate Change Canada",fr:"Environnement et \nChangement climatique Canada",width:"120px",widthfr:"160px",marginRight:"0px",marginLeft:"0px"},
      // {en:"National Reseach Council Canada",fr:"Conseil national de recherches Canada",width:"100px",marginRight:"0px",marginLeft:"0px"},
      
      
      ],
    title:"{title}",
    sTitle:"{sTitle}",
    label:"en",
    lng:"en",
    items:[
      {url:"#",text:"Item1",onClick:()=>console.warn("itemClick")}
      ],
    setLng:()=>null
  };
 
    
  render(){
    const {className,title,sTitle,departments,lng,label,items}=this.props;
    
    
    
    const menus=items.filter(item=>!item.type || item.type!="dropdown");
    
    const desktop={xxl:24,xl:24,lg:24,md:0,sm:0,xs:0};
    const mobile={xxl:0,xl:0,lg:0,md:24,sm:24,xs:24};
    
    
    
    return (
        <HeaderContainer>
          <HeaderStyled>
            <Row align="middle" style={{flexWrap:"nowrap",overflow:"hidden"}}>
              <Col >
                <Logo lng={lng} flagOnly={true}/>
              </Col>
              <Col flex="auto" style={{minWidth: 0 }}>
              <Row style={{flexWrap:"nowrap",overflow:"hidden"}}>
                {departments.map((d,i)=>lng=="en"?
                  [<Col key={i+"a"}  flex={d.width} style={{marginRight:d.marginRight,marginLeft:"30px"}}><LogoFont>{d['en']}</LogoFont></Col>,<Col key={i+"c"}  flex={d.widthfr || d.width } style={{marginRight:d.marginRight,marginLeft:d.marginLeft}}><LogoFont>{d['fr']}</LogoFont></Col>]:
                  [<Col key={i+"b"}  flex={d.widthfr || d.width} style={{marginRight:d.marginRight,marginLeft:"30px"}}><LogoFont>{d['fr']}</LogoFont></Col>,<Col key={i+"d"} flex={d.width} style={{marginRight:d.marginRight,marginLeft:d.marginLeft}}><LogoFont>{d['en']}</LogoFont></Col>]
                  )}
                  </Row>
              </Col>
              <Col >
                  <Button type="link" link onClick={this.props.setLng}>{this.props.label}</Button>
              </Col>
            </Row>
            
            <Row align="middle" style={{flexWrap:"nowrap"}}>
              <Col {...desktop} flex="auto" style={{minWidth: 0}}><TypographyStyled>{title}</TypographyStyled></Col>
              <Col {...mobile} flex="auto" style={{minWidth: 0}}><TypographyStyled>{sTitle}</TypographyStyled></Col>
              <ColStyled><Menu mode="horizontal" items={menus}/></ColStyled>
             </Row>
          </HeaderStyled>
        </HeaderContainer>
        );
  }
}
const ColStyled=styled.div`
  position: relative;
  max-width: 100%;
  min-height: 1px;
  ${media.palm`
    max-width: 40px;
  `};
`

const HeaderContainer = styled.div`
  position:'relative';
`;
const HeaderStyled = styled.div`
  background:${props => props.theme.headerBackgroundColor};
  position:${props => props.theme.headerPosition};
  height: auto;
  z-index: 1;
  padding: 0 50px;
  
`;
const TypographyStyled= styled.h4`
  margin:0;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.4;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  color:${props => props.theme.headerTextColor};
  flex: 0 0 auto;
  
`;

export default Header;