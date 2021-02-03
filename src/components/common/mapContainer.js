import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash'
import {withData} from 'dataContext.js';
import { Switch } from 'antd';
import { faWindowMaximize,faTable } from '@fortawesome/free-solid-svg-icons';
import {getProjectID,getProjectName,getLayers,getBoundary,getRoutes} from 'utils';

import {INITIALVIEWPORT} from 'constants.js';
import Map from './map';
import Split from './split';
import MapControl from './mapControl';
import Legend from './map.legend';
import Select from './select';
import Table from './table';  
import CardContainer from './cardContainer';
import Popups from './map.popup';

import GridLayout from './gridLayout';


const MAPCONTROL={
    orient:"left",
    position:{top:"5px",left:"5px"},
    items:[]
  };
const CONTROLS=[{
      orient:"top",
      position:{top:"5px",right:"5px"},
      direction:"row",
      items:[
        {icons:[{icon:faWindowMaximize,onClick:"toggleDashboard"}]},
        {icons:[{icon:faTable,onClick:"toggleRightPane"}]},
       
      ]
    }
  ]

const replaceOnClick=(array,funcs)=>{
  array.forEach(obj=>_.isObject(obj)&&
    Object.keys(obj).forEach(key=>{
      if(key=="onClick"){
        if(!funcs[obj[key]])console.warn(`${obj[key]} does not exist in funcs`)
        obj[key]=funcs[obj[key]]
      }
      if(Array.isArray(obj[key]))replaceOnClick(obj[key],funcs);    
    }));
  };

const MapDiv = styled.div`
   overflow:hidden;
   margin-top: 64px;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
`;

const GridDiv = styled.div`
position: absolute;
    top: 5px;
    bottom: 0;
    left: 160px;
    right: 210px;
`;
const StyledSwitchC = styled.div`
  
      position: relative;
  
`;
const StyledSwitch = styled.div`
  pointer-events:auto;
      position: absolute;
    right: 6px;
    top: 6px;
`;



class MapContainer extends React.PureComponent {
  static propTypes = {  
    onViewportChange:PropTypes.func,
    lng:PropTypes.string,

    heatmapValue:PropTypes.string,
    animationSpeed:PropTypes.number,
    currentTime:PropTypes.number,
    loopLength:PropTypes.number,
    initialPaneSizes:PropTypes.object,
    panes:PropTypes.object,
    handleHeatmapValue:PropTypes.func,
    
  }; 
  static defaultProps={
    onViewportChange:()=>null,
   
    animationSpeed:1,
    currentTime:0,
    loopLength:800,
    lng:'en',
    heatmapValue:'nox',
    handleHeatmapValue:()=>null,
    showAllRoutes:false,
    handleAllRoutes:()=>null
  
  
  };
  
  constructor(props) {
    super(props);
    this.split = React.createRef();
    this.map = React.createRef();
    this.state = {
      showDashboard:true,
      currentTime:this.props.currentTime,
      animation:{},
      mapControl:null,
      selectedProjects:[],
      showHeat:false,
      showHeatHover:false,
    
    };
    this.actions={
      "toggleDashboard":()=>{this.setState({showDashboard:!this.state.showDashboard})},
      "toggleTopPane":()=>this.split.current&&this.split.current.changePane('top'),
      "toggleRightPane":()=>{
         const right=this.split.current&&this.split.current.getPane('right')
        if(right=="0px")this.setState({showDashboard:false})
        
        this.split.current&&this.split.current.changePane('right')
        },
      "toggleBottomPane":()=>this.split.current&&this.split.current.changePane('bottom'),
      "toggleLeftPane":()=>this.split.current&&this.split.current.changePane('left')
    };
  }
  handleSplitUpdate=()=>{
    const right=this.split.current&&this.split.current.getPane('right')
    if(right!="0px" &&this.state.showDashboard)this.setState({showDashboard:false})
    
    
  }
  animate = () => {
    this.setState({currentTime: (this.state.currentTime + this.props.animationSpeed) % this.props.loopLength,animation:{id:window.requestAnimationFrame(this.animate)}});
    
  };
  
  componentDidMount=async()=>{
   
   
    const mapControl=this.map.current.getMapControl(MAPCONTROL);
    const controls=this.getControls(CONTROLS);
    this.props.handleData();
    this.setState({mapControl,controls,animation:{id: window.requestAnimationFrame(this.animate)}});
    
    // this.setState({mapControl,controls});
  ;

  }
  selectProjects=(selectedProjects)=>{
    // const right=this.split.current&&this.split.current.getPane('right')
    // const bottom=this.split.current&&this.split.current.getPane('bottom')

    if(selectedProjects.length==0){
      
      // if(right!="0px")this.split.current&&this.split.current.changePane('right')
      // if(bottom!="0px")this.split.current&&this.split.current.changePane('bottom')
      
    } else{
      
      
      // if(right=="0px")this.split.current&&this.split.current.changePane('right')
      // if(bottom=="0px")this.split.current&&this.split.current.changePane('bottom')
    }
    
    this.setState({selectedProjects})
  }
  onProjectClick=(o)=>{
    const {selectedProjects}=this.state;
    const projectID=getProjectID(o,this.props.lng);
    const i=selectedProjects.findIndex(p=>p==projectID);
    
    if(i==-1)this.selectProjects([...selectedProjects,projectID]);
    else this.selectProjects(selectedProjects.filter((a,j)=>i!=j));
    
  }
  
  onMeitClick=(o)=>{
    const {meitPopups,meitHandleClose,meitHandleAdd}=this.props;
    const {name}=o;
    if(meitPopups[name])return meitHandleClose(name);
    return meitHandleAdd(name,o);
  }
  
  handleSwitch=(check)=>{
    this.setState({showDashboard:check});
    this.split.current&&this.split.current.changePane('right');
  }
  
  getControls=(items)=>{
    
    replaceOnClick(items,this.actions);
    return items.map((item,i)=>{
      const {type="mapControl",...props}=item;
      return type=="mapControl"?<MapControl key={i} {...props}/>:
                                <MapControl key={i} {...props}/>;
    });
  }
  
  render (){
    const {loading,data,lng,boundary,routes,terminals,heatmapValue,handleHeatmapValue,showAllRoutes,handleAllRoutes,meitPopups,showExisting,handleShowExisting}=this.props;
    const {currentTime,selectedProjects,showHeat,showHeatHover}=this.state;
    const viewport=this.map.current?this.map.current.state.viewport:{};
    const layers=loading?[]:getLayers({showAllRoutes,showExisting,showHeat,showHeatHover,viewport,lng,data:data[lng].projects,boundary,routes,terminals,currentTime,selectedProjects,heatmapValue,meitPopups});
    
   
    return (
    
      <MapDiv>
        <Map 
          ref={this.map} 
          viewport={INITIALVIEWPORT} 
          layers={layers} 
          selectedProjects={this.state.selectedProjects}  
          onViewportChange={this.props.onViewportChange} 
          // popups={<Popups meitPopups={this.props.meitPopups} onClose={this.onProjectClick} />} 
          onMeitClick={this.onMeitClick} 
          onProjectClick={this.onProjectClick}
        />
        <Split 
          initialPaneSizes={this.props.initialPaneSizes}
          handleUpdate={this.handleSplitUpdate}
          panes={{
            right:<Table selectedProjects={selectedProjects} />,
            // bottom:<CardContainer  selectedProjects={selectedProjects} closeProject={this.onIconClick}/>
          }}
          ref={this.split}
        >
          <div>
            {this.state.mapControl && <MapControl {...this.state.mapControl}/>}
             <StyledSwitchC><StyledSwitch><Switch checked={this.state.showDashboard} onChange={this.handleSwitch} checkedChildren="dash" unCheckedChildren="table" defaultChecked /></StyledSwitch></StyledSwitchC>
            <Select selectProjects={this.selectProjects} selectedProjects={this.state.selectedProjects} />
         
            <GridDiv><GridLayout show={this.state.showDashboard}  selectedProjects={this.state.selectedProjects} closeProject={this.onProjectClick} /></GridDiv>
            
            <Legend x={6} y={108} 
              showAllRoutes={showAllRoutes} 
              handleAllRoutes={handleAllRoutes} 
              showHeat={this.state.showHeat} 
              handleHeat={()=>this.setState({showHeat:!this.state.showHeat})} 
              showHeatHover={this.state.showHeatHover} 
              handleHeatHover={()=>this.setState({showHeatHover:!this.state.showHeatHover})} 
              heatmapValue={heatmapValue} 
              handleChange={handleHeatmapValue} 
              showExisting={showExisting}
              handleShowExisting={handleShowExisting}
            />
          </div>
        </Split>
      </MapDiv>
    
      
    );
  }
}

export default withData(MapContainer)
// {this.state.controls}
// <GridDiv><GridLayout  selectedProjects={this.state.selectedProjects} closeProject={this.onIconClick} /></GridDiv>