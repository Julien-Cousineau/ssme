import React from 'react';
import {HoverCard,AppContext} from 'components/common';

import {DATA} from 'constants.js';
export default {
  title: 'Components/HoverCard',
  component: HoverCard,
};

const Template = (args) => <AppContext><HoverCard {...args}/></AppContext>;

export const Default = Template.bind({});
Default.args = {
  hoverInfo:{
    x:10,
    y:10,
    properties:DATA.data.en.projects[0]
  }
  
};