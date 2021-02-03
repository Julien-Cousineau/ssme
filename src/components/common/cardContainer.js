import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './card';
import {withData} from 'dataContext.js';
import {getProjects,getProjectName,getProjectID,getClientName,getDescription,getTimeline,getVessel,getEmissions}from 'utils.js';



const CardContainerStyled = styled.div`
//   overflow: auto;
//   width: 100%;
  display:flex;
  padding:0 5px 5px 5px;
  flex-wrap: wrap;
  overflow: auto;
 pointer-events: auto;
  
 
  justify-content: flex-end;
  ::-webkit-scrollbar {
      width: 10px;
      pointer-events: visible;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
       pointer-events: visible;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
       pointer-events: auto;
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
       pointer-events: auto;
    }
  
`;




class CardContainer extends React.PureComponent {

    static propTypes={
        data:PropTypes.object,
        lng:PropTypes.string,
        
        selectedProjects:PropTypes.array,
        closeProject:PropTypes.func,
    };
    static defaultProps={
       data:{},
       lng:"en",
       selectedProjects:[],
       closeProject:()=>null
    };
  render(){
      const {lng}=this.props;
    return(
        <CardContainerStyled>{getProjects(this.props).map((p,i)=><Card 
        key={i} 
        
        projectID={getProjectID(p,lng)}
        title={getProjectName(p,lng)}
        subtitle={getClientName(p,lng)}
        description={getDescription(p,lng)}
        timeline={getTimeline(p,lng)}
        vessel={getVessel(p,lng)}
        emissions={getEmissions(p,lng)}
        closeProject={()=>this.props.closeProject(p)}
        
        />)}</CardContainerStyled>
    );
  }
}

export default withData(CardContainer);