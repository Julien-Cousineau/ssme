import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SplitPane,{Pane} from './split/index.js';
import {media} from 'styles';

import {Button} from 'antd';

// export const StyledContainer = styled.div`
//   background: ${props =>props.background};
// `;


const SplitPaneStyled = styled.div`
    background: ${props =>props.background};
    position:absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
    pointer-events:none;
    background:transparent;
  .Resizer:hover > div {
    background:red;
  }
`

class Split extends PureComponent {
  static propTypes = {
    initialPaneSizes:PropTypes.object,
    panes:PropTypes.object,
    handleUpdate:PropTypes.func
  };

  static defaultProps = {
    initialPaneSizes:{top:"0px",right:"0px",bottom:"0px",left:"0px"},
    panes:{},
    handleUpdate:()=>null
  };
  
  state={
    lr:{
      sizes:[this.props.initialPaneSizes.left || "0px","1",this.props.initialPaneSizes.right || "0px"],
      oldSizes:["100px","1","300px"],
    },
    tb:{
      sizes:[this.props.initialPaneSizes.top || "0px","1",this.props.initialPaneSizes.bottom || "0px"],
      oldSizes:["100px","1","400px"],
    }
  }
  // closePane = (pane)=>(
  //   pane=="left"?this.changeSizes("lr",0,"0px"):
  //   pane=="right"?this.changeSizes("lr",2,"0px"):
  //   pane=="top"?this.changeSizes("tb",0,"0px"):
  //   pane=="bottom"?this.changeSizes("tb",2,"0px"):
  //   null)
  // openPane = (pane)=>{
  //   return pane=="left"?this.changeSizes("lr",null,true):
  //   pane=="right"?this.changeSizes("lr",2,null,true):
  //   pane=="top"?this.changeSizes("tb",0,null,true):
  //   pane=="bottom"?this.changeSizes("tb",2,null,true):
  //   null
  // }
  getPane= (pane)=>(
    pane=="left"?this.state["lr"].sizes[0]:
    pane=="right"?this.state["lr"].sizes[2]:
    pane=="top"?this.state["tb"].sizes[0]:
    pane=="bottom"?this.state["tb"].sizes[2]:
    null
    )
  onChange=(sizes,dir)=>{
    this.setState({[dir]:{...this.state[dir],sizes}})
    this.props.handleUpdate && this.props.handleUpdate();
  }  
  changePane = (pane)=>(
    pane=="left"?this.changeSizes("lr",0):
    pane=="right"?this.changeSizes("lr",2):
    pane=="top"?this.changeSizes("tb",0):
    pane=="bottom"?this.changeSizes("tb",2):
    null)
  
  changeSizes=(split,index)=>{
    const a=this.state[split];
    const newSize=a.sizes[index]=="0px"?a.oldSizes[index]:"0px";
    const sizes=index==0?[newSize,a.sizes[1],a.sizes[2]]:[a.sizes[0],a.sizes[1],newSize];
    const oldSizes=index==0?[a.sizes[0],a.sizes[1],a.oldSizes[2]]:[a.oldSizes[0],a.sizes[1],a.sizes[2]];
    this.setState({[split]:{oldSizes,sizes}});
    this.props.handleUpdate && this.props.handleUpdate();
    
  }

  render() {
    return (
    <SplitPaneStyled>
      <SplitPane style={{pointerEvents:"none",background:"transparent"}}  split="vertical" onChange={(sizes)=>this.onChange(sizes,'lr')}>
        <Pane maxSize={"0px"} size={this.state.lr.sizes[0]}>{this.props.panes['left']||null}</Pane>
        <SplitPane style={{pointerEvents:"none",background:"transparent"}} split="horizontal"  onChange={(sizes)=>this.onChange(sizes,'tb')}>
          <Pane maxSize={"0px"} size={this.state.tb.sizes[0]} >{this.props.panes['top']||null}</Pane>
          <Pane style={{pointerEvents:"none",background:"transparent",display:"block"}}>{
            this.props.children||
            <div style={{pointerEvents:"auto"}}>
              <Button onClick={()=>this.changeSizes("lr",0)}>Click</Button>
              <Button onClick={()=>this.changeSizes("lr",2)}>Click</Button>
              <Button onClick={()=>this.changeSizes("tb",0)}>Click</Button>
              <Button onClick={()=>this.changeSizes("tb",2)}>Click</Button>
            </div>
          }
          </Pane>
          <Pane  style={{}} size={this.state.tb.sizes[2]}>{this.props.panes['bottom']||null}</Pane>
        </SplitPane>
        <Pane style={{pointerEvents:"auto",background:"white"}} size={this.state.lr.sizes[2]}>{this.props.panes['right']||null}</Pane>
      </SplitPane>
    </SplitPaneStyled>

    );
  }
}

export default Split;