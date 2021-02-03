import React from 'react';
import {Card,AppContext} from 'components/common';
import {getIcon} from 'utils.js';
export default {
  title: 'Components/Card',
  component: Card,
};

const Template = (args) =><AppContext><Card {...args}/></AppContext>;


export const Default = Template.bind({});
Default.args = {
  icon:getIcon({"Project Status":"Existing","Terminal Type":"Oil"},'en'),
  title:"Delta Grinding Facility",
  subtitle:"Lehigh Hanson Materials Ltd.",
  description:{
    "Project Description":"Proposal to construct, operate and decommission a grinding facility adjacent to the marine terminal of the existing cement plant facility.",
    "Key Project Notes":"Still in {EA} process and will not have more information until process continues with this project.",
    "Export/Terminal Type":"Cement",
    "Project Status":"New/Proposed/{EA}",
    
  },
  timeline:{
    "Construction Timeline":"Construction complete as of April 2019",
    "Project Operational Duration":"Not specified",
    "Total Existing Vessel Movements (movements/yr)":"48: {RoRo}\n*First year of project",
    "Total Proposed Vessel Movements After Project (movements/yr)":"200: {RoRo}\n*Future years of project",
    
  },
  vessel:{
        "Tug Information":"{N/A}",
    "Vessel Type":"{RoRo}",
    "Vessel Capacity":"{N/A}",
    "Engine Power (kW)":"{N/A}",
    "Berthing Time (Hours/Call)":"{N/A}"
    
  }
  
};
export const Proposed2 = Template.bind({});
Proposed2.args = {
  icon:getIcon({"Project Status":"Proposed","Terminal Type":"Oil"},'en'),
  title:"Delta Grinding Facility",
  subtitle:"Lehigh Hanson Materials Ltd.",
  description:{
    "Project Description":"Proposal to construct, operate and decommission a grinding facility adjacent to the marine terminal of the existing cement plant facility.",
    "Key Project Notes":"Still in {EA} process and will not have more information until process continues with this project.",
    "Export/Terminal Type":"Cement",
    "Project Status":"New/Proposed/{EA}",
    
  },
  timeline:{
    "Construction Timeline":"Construction complete as of April 2019",
    "Project Operational Duration":"Not specified",
    "Total Existing Vessel Movements (movements/yr)":"48: {RoRo}\n*First year of project",
    "Total Proposed Vessel Movements After Project (movements/yr)":"200: {RoRo}\n*Future years of project",
    
  },
  vessel:{
        "Tug Information":"{N/A}",
    "Vessel Type":"{RoRo}",
    "Vessel Capacity":"{N/A}",
    "Engine Power (kW)":"{N/A}",
    "Berthing Time (Hours/Call)":"{N/A}"
    
  }
  
};