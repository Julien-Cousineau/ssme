import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {media} from 'styles';
import { Select } from 'antd';
import {withData} from 'dataContext.js';
import {getProjectID,getProjectName} from 'utils.js'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import {FormattedMessage} from 'localization';

const { Option } = Select;
const StyledDiv= styled.div`
position: relative;
`
const SelectContainer = styled.div`
    position: absolute;
    z-index: 1;
    pointer-events: auto;
    right: 6px;
    top: 42px;
    min-width: 200px;
    max-width: 200px;
    .ant-select-selector {
      padding-right: 24px;
    }
   
 
`;
const StyledFontAwesome = styled(FontAwesomeIcon)`
    left: -20px;
    position: relative;
    margin-right: -20px;
`;




export class MySelect extends React.PureComponent {

    static propTypes={
      projects:PropTypes.array,
      selectedProjects:PropTypes.array,
      selectProjects:PropTypes.func
    
    };
    static defaultProps={
      projects:[],
      selectedProjects:[],
      selectProjects:()=>null
    
    };
    
   
  render(){
    const {data,lng}=this.props;
    
    const projects=data[lng].projects;
    
    
    return(
      <StyledDiv>
      <SelectContainer>
        <Select
          mode="multiple"
          value={this.props.selectedProjects}
          style={{ width: '100%' }}
          placeholder={<FormattedMessage id={'select.placeholder'}/>}
          options={projects.map((p,i)=>({value:getProjectID(p,lng),label:getProjectName(p,lng)}))}
          optionFilterProp="label"
          onChange={this.props.selectProjects}
        />
        
      
        <StyledFontAwesome icon={faSearch}></StyledFontAwesome>
    </SelectContainer>
    </StyledDiv>

    )
  }
}
export default withData(MySelect)
