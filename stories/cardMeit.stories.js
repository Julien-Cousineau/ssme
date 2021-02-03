import React from 'react';
import {CardMeit,AppContext} from 'components/common';
import {getIcon} from 'utils.js';
export default {
  title: 'Components/CardMeit',
  component: CardMeit,
};

const Template = (args) =><AppContext><CardMeit {...args}/></AppContext>;


export const Default = Template.bind({});
Default.args = {
  
  name:"Delta Grinding Facility",
  type:"anchorage",
  vessels:{
    inbound:{
      container:0.0,
      tug:0.0,
      a:0.0
    },
    outbound:{
      container:0.0,
      tug:0.0,
      b:0.0
    }
  },
  emissions:{
    "nox":0.0,
    "sox":0.0,
  },
  
};