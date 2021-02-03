import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {media} from 'styles';
import {withData} from 'dataContext.js';

import DataText from './dataText'


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
  margin-bottom: 8px;
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
        hoverInfo:PropTypes.object,
        
    };
    static defaultProps={
       data:{},
       lng:"en",
       hoverInfo:{},
    };
    render(){
      const {lng,hoverInfo:{routes=[],x=0,y=0}}=this.props;
      return (
      <HoverContainer x={x} y={y} maxWidth={300}>
        <Content>
        
          {routes.map((route,i)=><div key={i}><Description>{route}</Description></div>)}
        </Content>
      </HoverContainer>
  )
      
    }
}
    




export default withData(HoverCard);