import React from 'react';
import {GridLayout,AppContext} from 'components/common';

export default {
  title: 'Components/GridLayout',
  component: GridLayout,
};

const Template = (args) =><AppContext><GridLayout {...args}/></AppContext>;


export const Default = Template.bind({});
Default.args = {
   selectedProjects:[1,2]
  
};