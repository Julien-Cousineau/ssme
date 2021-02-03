import React from 'react';
import PropTypes from 'prop-types';
import DataHover from './dataHover';
import DataInfo from './dataInfo';

export default class DataText extends React.PureComponent {
    static propTypes={
      value:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
      projectID:PropTypes.number,
      header:PropTypes.bool,
    };
    static defaultProps={
        header:false
    };
            
    render(){
        const {value,projectID,header,keyValue,showInfo}=this.props;
      
        return <div><DataHover value={value}/><DataInfo projectID={projectID} value={keyValue||value} header={header} showInfo={showInfo}/></div>;
    }
    
}