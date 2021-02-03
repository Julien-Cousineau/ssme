import React from 'react';
import {Table,AppContext} from 'components/common';

export default {
  title: 'Components/Table',
  component: Table,
};

const Template = (args) => <AppContext><Table {...args}/></AppContext>;





export const Default = Template.bind({});
Default.args = {
    selectedProjects:['BC Vehicle Processing Centre','BURNCO Aggregate Mine '],
};





