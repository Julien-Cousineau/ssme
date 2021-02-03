import React from 'react';
import Site from 'components/main.js';


export default {
  title: 'Components/demo',
  component: Site,
};

const Template = (args) => <Site {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  
};


