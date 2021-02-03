import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {media} from 'styles';
import { Modal } from 'antd';
import {relaceTextByLink} from 'utils.js';
import {FormattedMessage} from 'localization';

import {withData} from 'dataContext.js';

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  
`;
export const Description = styled.div`
  font-size: 10px;
  color: #777;
  margin-bottom: 8px;
  line-height: 1.5;
  overflow: hidden;
`;



class MyModal extends React.PureComponent {

    static propTypes={
     visible:PropTypes.bool,
     handleModal:PropTypes.func,
    
    
    };
    static defaultProps={
      visible:false,
        handleModal:()=>null
    };
  render(){
    const {data,lng}=this.props;
    const {disclaimers,contact}=data[lng];
    return(
    <Modal
          
          visible={this.props.visible}
          onOk={this.props.handleModal}
          onCancel={this.props.handleModal}
          footer={null}
        >
          <Title><FormattedMessage id={'topheader.disclaimer'}/></Title>
          <Description>{disclaimers}</Description>
          <Title><FormattedMessage id={'topheader.contact'}/></Title>
          <Description>{relaceTextByLink(contact)}</Description>
         
        </Modal>
 
)
  }
}

export default withData(MyModal)