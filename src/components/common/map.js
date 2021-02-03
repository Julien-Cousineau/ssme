import React from 'react';
import PropTypes from 'prop-types';
import DeckGL from '@deck.gl/react';
import styled from 'styled-components';
import {_MapContext as MapContext, StaticMap, NavigationControl} from 'react-map-gl';
import ReactMapGL, {ScaleControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'

import HoverCard from './map.hover';
// import HoverRouteCard from './map.hoverroutes';
// import HoverHeatCard from './map.hoverheat';
import MapControl from './mapControl';
import Popups from './map.popup';

import { faPlus,faMinus,faMap } from '@fortawesome/free-solid-svg-icons';
import {dark,light,satellitestreets,satellite,streets} from 'assets';


import {TOKEN} from 'constants.js';

const StyledScaleControl=styled(ScaleControl)`
  right:0;
`


export class Map extends React.PureComponent {
  static propTypes = {
    onViewportChange:PropTypes.func,
    viewport:PropTypes.object,
    layers:PropTypes.array,
    mapControl:PropTypes.oneOfType([PropTypes.bool,PropTypes.object]),
    onProjectClick:PropTypes.func,
    popups:PropTypes.node,
  }; 
  static defaultProps={
    viewport:Object({latitude: 0.0,longitude: 0.0,zoom: 0,bearing: 0, pitch: 0}),
    mapControl:false,
    onProjectClick:()=>null,
    mapStyle:"mapbox://styles/mapbox/light-v10",
    selectedProjects:[],
  };
  constructor(props) {
    super(props);
    this.state = {
      viewport:this.props.viewport,
      mapStyle:this.props.mapStyle,
      mapControl:this.props.mapControl?this.getMapControl(this.props.mapControl):false,
      hoverInfo:undefined,
    
    };
    
  }
    
  

  getMapControl=(mapControl)=>({...mapControl,items:[
    {icons:[{icon:faPlus,onClick:()=>this.setViewport({action:"zoomIn"})}]},
    {icons:[{icon:faMinus,onClick:()=>this.setViewport({action:"zoomOut"})}]},
    {
      // style:{marginTop:5},
      icons:[
        {icon:faMap,onClick:()=>null},
        {icons:[
          {img:streets,onClick:()=>this.setState({mapStyle:"mapbox://styles/mapbox/streets-v11"})},
          // {img:outdoor,onClick:()=>this.setState({mapStyle:"mapbox://styles/mapbox/outdoors-v11"})},
          {img:light,onClick:()=>this.setState({mapStyle:"mapbox://styles/mapbox/light-v10"})},
          {img:dark,onClick:()=>this.setState({mapStyle:"mapbox://styles/mapbox/dark-v10"})},
          {img:satellite,onClick:()=>this.setState({mapStyle:"mapbox://styles/mapbox/satellite-v9"})},
          {img:satellitestreets,onClick:()=>this.setState({mapStyle:"mapbox://styles/mapbox/satellite-streets-v11"})},
          ]}
      ]
    },...mapControl.items
  ]
    
  })
    

  mapInitialized=(ref)=>{
    this.map = ref && ref.getMap();
    console.log("COUSINEAU")
    this.map.addControl(new mapboxgl.ScaleControl({position: 'bottom-right'}));
    this.props.ref();
  }
  deckInitialized=(ref)=>{this.deckGL = ref}
  
  onViewStateChange=({viewState:viewport})=>this.setViewport({viewport})
  setViewport=({action,viewport})=>{
    if(action){
      let {viewport:{zoom}}=this.state;
      
      if (action=='zoomIn')  zoom=Math.min(18,zoom+1);
      if (action=='zoomOut') zoom=Math.max(0,zoom-1);
      
      viewport={...this.state.viewport,zoom};
    }
    this.props.onViewportChange && this.props.onViewportChange(viewport);
    this.setState({viewport});
  }
  
  onHover=(e)=>{
      const {deckGL} = this;
      // const {selectedProjects}=this.props;
      
      const o = deckGL.pickMultipleObjects({x:e.x, y:e.y, radius:5});
      return o.length==0?this.setState({hoverInfo:undefined}):this.setState({hoverInfo:o});
      
      
      
      // if(o.length==0)return this.setState({hoverRouteInfo:undefined,hoverInfo:undefined,hoverHeatInfo:undefined});
      
      // const hc=o.filter(p=>p.layer.id==="icon-layer");
      // if(hc.length>0) return this.setState({hoverHeatInfo:undefined,hoverRouteInfo:undefined,hoverInfo:{...hc[0],properties:hc[0].object}});
      
      // const ps=o.filter(p=>p.layer.id==="routes-static");
      // const activeps=ps.filter(p=>selectedProjects.includes(p.object['Project Name']));
      // if(ps.length>0 && activeps.length>0)return this.setState({hoverInfo:undefined,hoverHeatInfo:undefined,hoverRouteInfo:{...activeps[0],routes:activeps.map(name=>name.object['Project Name'])}});
      
      // const hlayers=o.filter(p=>p.layer.id==="heatmapp");
      // if(hlayers.length>0) return this.setState({hoverRouteInfo:undefined,hoverHeatInfo:{...hlayers[0],properties:hlayers[0].object}});
      
      
      // return this.setState({hoverRouteInfo:undefined,hoverHeatInfo:undefined,hoverInfo:undefined});


    }
    onClick=(e)=>{
      const {deckGL} = this;
      const o = deckGL.pickObject({x:e.x, y:e.y,radius:5});
      if(!o)return;
      if(o.layer.id==="icon-layer")return this.props.onProjectClick(o.object);
      
      if(o.layer.id==="terminals")return this.props.onMeitClick(o.object);
    }
  
  render (){
    
    const layers= this.props.layers;

    return (
      <DeckGL 
        ref={this.deckInitialized} 
        ContextProvider={MapContext.Provider}
        
        viewState={this.state.viewport} 
        onViewStateChange={this.onViewStateChange}
        getCursor= {({isDragging}) => (isDragging ? 'grabbing' : (typeof this.state.hoverInfo==='undefined' ? 'grab':'pointer'))}
        onHover={this.onHover}
        onClick={this.onClick}
        controller={true}
        layers={layers}
        style={{overflow: 'hidden'}}
        >
        {this.state.hoverInfo && <HoverCard selectedProjects={this.props.selectedProjects} hoverInfo={this.state.hoverInfo} />}
        
        {this.state.mapControl && <MapControl {...this.state.mapControl}/>}
         
        <StaticMap key="map" mapStyle={this.state.mapStyle} mapboxApiAccessToken={TOKEN}>
          <div style={{position: 'absolute', bottom: 20, right: 10}}>
          <ScaleControl maxWidth={100} unit={"metric"}/> 
          </div>
        </StaticMap>
      </DeckGL>
    );
  }
}


export default Map;

// {this.props.popups}