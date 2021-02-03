import React from 'react';
import {CardContainer,AppContext} from 'components/common';

export default {
  title: 'Components/CardContainer',
  component: CardContainer,
};

const Template = (args) =><AppContext><CardContainer {...args}/></AppContext>;

export const Default = Template.bind({});
Default.args = {
  selectedProjects:[1]
};