import React from 'react';
import PropTypes from 'prop-types';
import { Menu as AntDMenu } from 'antd';
import hoistNonReactStatics from 'hoist-non-react-statics';

import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const { SubMenu,Divider,Item,ItemGroup } = AntDMenu;


class Menu extends React.PureComponent {
  static propTypes = {
    mode:PropTypes.oneOf(['inline', 'horizontal', 'vertical']),
    items:PropTypes.array,
    className:PropTypes.string,
    style:PropTypes.object,
    selectedKeys:PropTypes.array,
  }; 
  static defaultProps={
    mode:"inline",
    items:[
      { text:"Item1"},
      { type:"divider"},
      { text:"Item3",onClick:()=>console.warn("item3 clicked")},
      ],
    className:null,
    style:null,
    selectedKeys:null
    
  };
 
    
  render(){
    const {items,...other}=this.props;
    
    return (
      <AntDMenu className="customMenu" popupClassName="Julien" overflowedIndicator={<FontAwesomeIcon icon={faBars} />} {...other}>
        {items.map(getType)}
      </AntDMenu>
    );
  }
}

const types={
  'divider':(item,i)=><Divider key={i} />,
  'item':(item,i)=><Item icon={item.icon} key={i} onClick={item.onClick}>{item.url? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.text}</a>:item.text}</Item>,
  'submenu':(item,i)=><SubMenu key={i} icon={item.icon} title={item.text}>{item.items.map(getType)}</SubMenu>,
  'group':(item,i)=><ItemGroup title={item.text}>{item.items.map(getType)}</ItemGroup>
};

const getType=({type,...obj},i)=>{
  if(!type || !types[type])type="item";
  return types[type](obj,i);
};


const MenuStyled = styled(Menu)`
  html {
    --menu-sub-color:black;  
  }
  
  display:flex;
  justify-content:flex-end;
  border:0;
  line-height:31px !important;
  background:${props => props.theme.headerBackgroundColor};
  color:${props => props.theme.headerTextColor};
  &&& .ant-menu-item:hover,.ant-menu-submenu:hover,.ant-menu-submenu-open {
    border-bottom: 2px solid transparent !important;
    color:${props => props.theme.headerTextColorHover};
  }
  &&& .ant-menu-vertical.ant-menu-sub {
    background:black;
  }
  &&& .ant-menu-vertical.ant-menu-sub {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .ant-menu-item a {
    color:${props => props.theme.headerTextColor};
    &:hover {
      color:${props => props.theme.headerTextColorHover};
    }
  }
  
  
`;
;



// export default Menu;
export default MenuStyled;