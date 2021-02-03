import React from 'react';

import {MapContainer,AppContext}  from 'components/common';

import {DATA} from 'constants.js';



export default {
  title: 'Components/MapContainer',
  component: MapContainer,
};

const Template = (args) => <AppContext><MapContainer {...args}/></AppContext>;

        
export const Default = Template.bind({});
Default.args = {
 
  // mapControl:{
  //   orient:"left",
  //   position:{top:"5px",left:"5px"},
  //   items:[]
  // },
  // controls:[{
  //     orient:"top",
  //     position:{top:"5px",right:"5px"},
  //     direction:"row",
  //     items:[
  //       {icons:[{icon:faTachometerAlt,onClick:"toggleRightPane"}]},
  //       {icons:[{icon:faLayerGroup,onClick:"toggleBottomPane"}]},
  //       {icons:[{icon:faLayerGroup,onClick:"toggleBottomPane"}]},
  //     ]
  //   }
  // ]
};

