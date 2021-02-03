import React from 'react';
import {KEYS,CLOUDFRONT,ROUTES,DATA,HEATMAP,TERMINALS} from 'constants.js';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import DeckGL, {GeoJsonLayer, IconLayer,PathLayer,ScatterplotLayer} from 'deck.gl';
import {PathStyleExtension} from '@deck.gl/extensions';
import * as d3 from "d3";
import _ from 'lodash';
import { Typography } from 'antd';
import { scalePow } from 'd3';

const {  Link } = Typography;

export const hexToRgbA=(hex)=>{
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255];
    }
    throw new Error('Bad Hex');
}

// const getColumns =(p,array)=>Object.keys(p).filter(key=>array.includes(key)).reduce((acc, curr) => {acc[curr] = p[curr];return acc;}, {});
const getColumns =(p,array)=>array.filter(key=>Object.keys(p).includes(key)).reduce((acc, curr) => {acc[curr] = p[curr];return acc;}, {});

export const getIcon=(project,lng,width,height)=>project['Project Status']==="Existing"?svgFileExisting({color:getColor(project,lng),width:width||16,height:height||90}):svgFileProposed({color:getColor(project,lng),width:width||24});
export const getColor=(project,lng)=>KEYS[lng].iconColors[project[KEYS[lng].terminalType]];
export const getProjectID=(project,lng)=>project[KEYS[lng].projectID];
export const getProjectName=(project,lng)=>project[KEYS[lng].projectNameHeader].split('\n')[0];
export const getClientName=(project,lng)=>project[KEYS[lng].projectNameHeader].split('\n')[1];
export const getDescription=(project,lng)=>getColumns(project,KEYS[lng].groups.description);
export const getProjectStatus=(project,lng)=>project[KEYS[lng].projectStatus];
export const getTimeline=(project,lng)=>getColumns(project,KEYS[lng].groups.timeline);
export const getVessel=(project,lng)=>getColumns(project,KEYS[lng].groups.vessel);
export const getEmissions=(project,lng)=>getColumns(project,KEYS[lng].groups.emissions);

export const getProjects=({data,lng,selectedProjects})=>data[lng].projects.filter(p=>selectedProjects.includes(getProjectID(p,lng)));

export const getBoundary=async ()=>DATA.boundary;
export const getRoutes=()=>d3.json(ROUTES).then(d=>d['features'].map(f=>({...f.properties,coordinates:f.geometry.coordinates})));
export const getTerminals=()=>d3.json(TERMINALS);


const scales={
  nox:scalePow().exponent(0.25).domain([5E5,5E8]).range([0.1,1]),
  sox:scalePow().exponent(0.25).domain([1E4,1E7]).range([0.1,1]),
  pm25:scalePow().exponent(0.25).domain([1E4,1E7]).range([0.1,1]),
  co2e:scalePow().exponent(0.25).domain([3E7,2E10]).range([0.1,1]),
}
const radius_scale =scalePow().exponent(4).domain([12,4]).range([150,1]);


const ICON_MAPPING = {
  anchorage: {x: 0, y: 0, width: 86, height: 86, mask: true},
  circle: {x: 86, y: 0, width: 64, height: 64, mask: true},
  existing2: {x: 151, y: 0, width: 56, height: 64, mask: true},
  existing: {x: 150, y: 0, width: 56, height: 84, mask: true},
  proposed: {x: 206, y: 0, width: 82, height: 82, mask: true},
  triangle: {x: 288, y: 0, width: 64, height: 64, mask: true},
  
};

const ICON_MAPPING2 = {
  anchorage: {x: 129, y: 0, width: 75, height: 67, mask: true},
  circle: {x: 0, y: 0, width: 64, height: 64, mask: true},
  existing: {x: 150, y: 0, width: 56, height: 84, mask: true},
  proposed: {x: 206, y: 0, width: 82, height: 82, mask: true},
  triangle: {x: 64, y: 0, width: 64, height: 64, mask: true},
  berth: {x: 138, y: 67, width: 69, height: 98, mask: true},
  
};

export const getLayers=({showAllRoutes,showExisting,showHeat,showHeatHover,viewport={},lng,data,boundary,routes,terminals,currentTime,selectedProjects=[],heatmapValue,meitPopups})=>{
  
  return ([
  

   new HeatmapLayer({
    id: 'heatmap',
    data:HEATMAP,
    visible:showHeat,
    colorRange:[[69,117,180],[145,191,219],[224,243,248],[254,224,144],[252,141,89],[215,48,39]],
    getPosition: d => [+d.lng,+d.lat],
    getWeight: d => scales[heatmapValue](+d[heatmapValue]),
    radiusPixels:radius_scale(viewport.zoom||10),
    updateTriggers: {
      getWeight: heatmapValue,
    },
   
  }),
  new ScatterplotLayer({
    id: 'heatmapp',
     data:HEATMAP,
    pickable: showHeatHover,
    visible:showHeat,
    opacity: 0.0,
    
    radiusScale: 15,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: d => [+d.lng,+d.lat],
    getRadius: d => 10,
    getFillColor: d => [255, 140, 0],
    // getLineColor: d => [0, 0, 0]
  }),
  // new ScatterplotLayer({
  //   id: 'terminals',
  //   data:TERMINALS,
  //   pickable: true,
  //   // visible:showHeat,
  //   opacity: 1.0,
    
  //   radiusScale: 10,
  //   radiusMinPixels: 2,
  //   radiusMaxPixels: 100,
  //   lineWidthMinPixels: 1,
  //   getPosition: d => [+d.lng,+d.lat],
  //   getRadius: d => d.type==="harbour"?10:5,
  //   getFillColor: d => d.type==="harbour"?[0, 0, 0]:[0, 0, 175],
  //   // getLineColor: d => [0, 0, 0]
  // }),
    new IconLayer({
    id: 'terminals', 
    visible:showExisting,
    data:Object.keys(terminals).map(k=>({name:terminals[k].name,lng:terminals[k].lng,lat:terminals[k].lat,type:terminals[k].type})),  
    iconAtlas: `${CLOUDFRONT}/assets/texture.png`,
    iconMapping: ICON_MAPPING,
    getIcon: d => d.type!=="anchorage"?"existing2":"anchorage",
    pickable:true,
    // sizeMinPixels:40,
    sizeUnits: "pixels",
    // sizeScale: d=>2 ** (15 - viewport.zoom),
    getColor:d=>d.type!=="anchorage"?[0, 0, 0,200]:[165,0,38,200],
    getPosition: d => [+d.lng,+d.lat],
    sizeScale: 1,
    getAngle:d=>{
      if(Object.keys(meitPopups).length===0) return 0;
      return meitPopups[d.name]?(currentTime%200)/200*360:0;
    },
    getSize:d=>d.type=="anchorage"?16:16,
    updateTriggers: {
      // getColor: selectedProjects,
      getAngle: {meitPopups,currentTime}
    }
    // ...options
  }),

  new GeoJsonLayer({
    id: 'geojson-layer',
    data:boundary,
    // pickable: true,
    
    stroked: true,
    filled: false,
    // extruded: true,
    lineWidthScale: 30,
    lineWidthMinPixels: 2,
    getLineColor: [0, 0, 0],
  
    // getRadius: 100,
    getLineWidth: 1,
    // getElevation: 30
  }),  
  // new TripsLayer({
  //   id:"routes",
  //   // data:d3.json(ROUTES).then(d=>d['features'].map(f=>({properties:f.properties,waypoints:f.geometry.coordinates.map((c,i)=>({coordinates:c, timestamp:i}))}))),
  //   data:DATA.trips['features'].map(f=>({...f.properties,waypoints:f.geometry.coordinates.map((c,i)=>({coordinates:c, timestamp:i*1000.0/f.properties.Length*1000}))})),
  //   // pickable:true,
  //   getPath: d => d.waypoints.map(p => p.coordinates),
  //   // deduct start timestamp from each data point to avoid overflow
  //   getTimestamps: d => d.waypoints.map(p => p.timestamp),
  //   getColor: d=>{
  //     const rgb=d["Project Name"]==="Inbound"?[0,255,0]:[255,0,0];
      
  //     return [...rgb,255];
  //     // return [...rgb,selectedProjects.includes(d["Project Name"])?200:0];
  //   },
    
  //   widthMinPixels: 5,
  //   rounded: true,
  //   trailLength: 200,
  //   currentTime,
  //   updateTriggers: {
  //     getColor: selectedProjects
  //   },
  //       }),
   new PathLayer({
    id: 'routes-static',
    // data:DATA.trips['features'].map(f=>({...f.properties,coordinates:f.geometry.coordinates})),
    data:routes,
    pickable: true,
    widthScale: 20,
    widthMinPixels: 1,
    getPath: d => d.coordinates,
    getColor: d => {
      // if (!selectedProjects.includes(d["Project Name"]))return [0,0,0,0];
      
      // const rgb=d["Route"]==="Inbound"?[0,255,0]:[255,0,0];
      // return [...rgb,220];
      
      if(!selectedProjects.includes(d["ID"]) && !showAllRoutes)return [0,0,0,0];
      const project=data.find(p=>getProjectID(p,lng)===d["ID"]);
    
      if(!project)return [0,0,0,255];
      
      
      // const lng=project[KEYS.en.keyForIconColor]?'en':project[KEYS.fr.keyForIconColor]?'fr':'other';
      // if(lng==='other')return [0,0,0,255];
      
      const colors=KEYS[lng].iconColors;
      const att=project[KEYS[lng].keyForIconColor];
      return colors[att]?[...hexToRgbA(colors[att]),255]:[0,0,0,255];
   
      
    },
    getWidth: d => showAllRoutes?5:selectedProjects.includes(d["ID"])?5:0,
    getDashArray: d=>d.InboundOut==="Inbound"?[6, 3]:d.InboundOut==="Outbound"?[3, 3]:[100, 1],
    dashJustified: true,
    extensions: [new PathStyleExtension({dash: true})],
    updateTriggers: {
      getColor: [selectedProjects,showAllRoutes],
      getWidth: [selectedProjects,showAllRoutes]
    },
  }),
  new IconLayer({
    id: 'icon-layer',   
    data,   
    // getIcon: d => ({
    //   url: getProjectStatus(d,lng)=="Existing"||getProjectStatus(d,lng)=="Existant"?`${CLOUDFRONT}/assets/existing.svg`:`${CLOUDFRONT}/assets/proposed.svg`,
    //   width: getProjectStatus(d,lng)=="Existing"||getProjectStatus(d,lng)=="Existant"?57:80,
    //   height: getProjectStatus(d,lng)=="Existing"||getProjectStatus(d,lng)=="Existant"?85:80,
    //   anchorY: 40,
    //   mask:true,
    // }),
    iconAtlas: `${CLOUDFRONT}/assets/texture.png`,
    iconMapping: ICON_MAPPING,
    getIcon: d => getProjectStatus(d,lng)=="Existing"||getProjectStatus(d,lng)=="Existant"?"existing":"proposed",
    pickable:true,
    sizeMinPixels:40,
    sizeUnits: "pixels",
    // sizeScale: d=>2 ** (15 - viewport.zoom),
    getAngle:d=>{
      if(selectedProjects.length===0) return 0;
      return selectedProjects.includes(getProjectID(d,lng))?(currentTime%200)/200*360:0;
    },
    getColor:d=>{
      const colors=KEYS[lng].iconColors;
      const att=d[KEYS[lng].keyForIconColor];
      const rgb=colors[att]?hexToRgbA(colors[att]):[0,0,0];
      return [...rgb,255];
    },
    getPosition: d => [Number(d.Longitude), Number(d.Latitude)],
    opacity: 1,
    updateTriggers: {
      // getColor: selectedProjects,
       getAngle: {selectedProjects,currentTime}
    }
    // ...options
  })
 
  ])};

export const relaceTextByLink=(value)=>{
     const reg=/\{.*?\}/g;
    if(!_.isString(value))return <span>{value}</span>;
    
    const parts = value.split(reg);
    const placeholders=value.match(/[^{\}]+(?=})/g);
    if(!placeholders) return <span>{value}</span>;
    
   
      
    for (var i = 1; i < parts.length; i += 1) {
      parts[i] = [<Link key={i} href={`mailto:${placeholders[i-1]}`} target="_blank"> {placeholders[i-1]}</Link>,<span key={i+1}>{parts[i]}</span>];
    }
    return <span>{parts}</span>;
    
    
   

}

export const svgFileExisting=({color="#000000",width=16,height=60})=><svg  width={`${width}px`} viewBox={`0 0 56.879997 ${height}`} version="1.2">
<defs>
<clipPath id="clip1">
  <path d="M 0.0234375 64 L 56.738281 64 L 56.738281 74.890625 L 0.0234375 74.890625 Z M 0.0234375 64 "/>
</clipPath>
<clipPath id="clip2">
  <path d="M 20 12.824219 L 37 12.824219 L 37 26 L 20 26 Z M 20 12.824219 "/>
</clipPath>
</defs>
<g id="surface1">
<path style={{stroke:'none',fillRule:"nonzero",fill:color,fillOpacity:1}} d="M 10.34375 35.269531 L 10.34375 45.949219 L 19.117188 40.894531 L 17.382812 40.894531 C 17.132812 40.894531 16.898438 40.847656 16.667969 40.753906 C 16.441406 40.660156 16.238281 40.523438 16.0625 40.347656 C 15.890625 40.175781 15.753906 39.972656 15.660156 39.746094 C 15.566406 39.515625 15.519531 39.28125 15.519531 39.03125 L 15.519531 37.960938 C 15.519531 37.710938 15.566406 37.476562 15.660156 37.246094 C 15.753906 37.019531 15.890625 36.816406 16.0625 36.644531 C 16.238281 36.46875 16.441406 36.332031 16.667969 36.238281 C 16.898438 36.144531 17.132812 36.097656 17.382812 36.097656 L 39.535156 36.097656 C 39.78125 36.097656 40.019531 36.144531 40.246094 36.238281 C 40.476562 36.332031 40.675781 36.46875 40.851562 36.644531 C 41.027344 36.816406 41.160156 37.019531 41.253906 37.246094 C 41.351562 37.476562 41.398438 37.710938 41.398438 37.960938 L 41.398438 39.03125 C 41.398438 39.28125 41.351562 39.515625 41.253906 39.746094 C 41.160156 39.972656 41.027344 40.175781 40.851562 40.347656 C 40.675781 40.523438 40.476562 40.660156 40.246094 40.753906 C 40.019531 40.847656 39.78125 40.894531 39.535156 40.894531 L 37.800781 40.894531 L 46.574219 45.949219 L 46.574219 35.269531 C 46.574219 34.816406 46.527344 34.363281 46.441406 33.917969 C 46.351562 33.472656 46.21875 33.039062 46.046875 32.617188 C 45.871094 32.195312 45.65625 31.796875 45.40625 31.417969 C 45.152344 31.039062 44.863281 30.691406 44.542969 30.367188 C 44.21875 30.046875 43.871094 29.761719 43.492188 29.507812 C 43.113281 29.253906 42.710938 29.039062 42.292969 28.867188 C 41.871094 28.691406 41.4375 28.5625 40.992188 28.472656 C 40.542969 28.382812 40.09375 28.339844 39.636719 28.339844 L 17.277344 28.339844 C 16.824219 28.339844 16.371094 28.382812 15.925781 28.472656 C 15.476562 28.5625 15.042969 28.691406 14.625 28.867188 C 14.203125 29.039062 13.804688 29.253906 13.425781 29.507812 C 13.046875 29.761719 12.695312 30.046875 12.375 30.367188 C 12.050781 30.691406 11.765625 31.039062 11.511719 31.417969 C 11.257812 31.796875 11.042969 32.195312 10.871094 32.617188 C 10.695312 33.039062 10.566406 33.472656 10.476562 33.917969 C 10.386719 34.363281 10.34375 34.816406 10.34375 35.269531 Z M 10.34375 35.269531 "/>
<path style={{stroke:'none',fillRule:"nonzero",fill:color,fillOpacity:1}} d="M 6.886719 50.929688 C 6.660156 51.058594 6.460938 51.222656 6.285156 51.417969 C 6.113281 51.617188 5.972656 51.835938 5.871094 52.078125 C 5.769531 52.320312 5.710938 52.570312 5.691406 52.832031 C 5.671875 53.09375 5.695312 53.351562 5.761719 53.605469 L 7.960938 62.164062 C 8.804688 62.304688 9.601562 62.574219 10.355469 62.980469 C 11.488281 63.542969 12.6875 63.8125 13.953125 63.78125 C 15.21875 63.8125 16.417969 63.542969 17.550781 62.980469 C 18.109375 62.675781 18.699219 62.445312 19.316406 62.285156 C 19.933594 62.128906 20.5625 62.050781 21.199219 62.050781 C 21.835938 62.050781 22.464844 62.128906 23.082031 62.285156 C 23.699219 62.445312 24.289062 62.675781 24.847656 62.980469 C 25.984375 63.519531 27.183594 63.789062 28.445312 63.789062 C 29.703125 63.789062 30.902344 63.519531 32.042969 62.980469 C 32.601562 62.675781 33.191406 62.445312 33.808594 62.285156 C 34.425781 62.128906 35.054688 62.050781 35.691406 62.050781 C 36.328125 62.050781 36.957031 62.128906 37.574219 62.285156 C 38.191406 62.445312 38.78125 62.675781 39.339844 62.980469 C 40.476562 63.519531 41.675781 63.789062 42.9375 63.789062 C 44.195312 63.789062 45.394531 63.519531 46.535156 62.980469 C 47.285156 62.574219 48.085938 62.304688 48.929688 62.164062 L 51.128906 53.605469 C 51.195312 53.351562 51.21875 53.09375 51.199219 52.832031 C 51.179688 52.570312 51.121094 52.320312 51.019531 52.078125 C 50.917969 51.835938 50.777344 51.617188 50.605469 51.417969 C 50.429688 51.222656 50.230469 51.058594 50.003906 50.929688 L 46.574219 48.9375 L 32.625 40.894531 L 29.660156 39.1875 C 29.292969 38.972656 28.890625 38.867188 28.464844 38.867188 C 28.035156 38.867188 27.636719 38.972656 27.265625 39.1875 L 24.304688 40.894531 L 10.34375 48.9375 Z M 6.886719 50.929688 "/>
<g clipPath="url(#clip1)" clipRule="nonzero">
<path style={{stroke:'none',fillRule:"nonzero",fill:color,fillOpacity:1}} d="M 64.574219 65.089844 C 64.527344 65 64.472656 64.925781 64.402344 64.855469 C 64.320312 64.777344 64.222656 64.71875 64.121094 64.675781 L 63.679688 64.675781 L 63.394531 64.542969 L 63.292969 64.542969 C 63.183594 64.582031 63.085938 64.632812 62.992188 64.699219 C 61.300781 65.824219 59.4375 66.359375 57.402344 66.304688 C 56.53125 66.304688 55.667969 66.203125 54.816406 66.007812 C 54.046875 65.828125 53.3125 65.550781 52.617188 65.179688 C 51.9375 64.804688 51.207031 64.601562 50.433594 64.566406 C 49.65625 64.53125 48.914062 64.671875 48.203125 64.984375 L 47.789062 65.179688 C 46.269531 65.957031 44.65625 66.332031 42.949219 66.304688 C 42.078125 66.304688 41.214844 66.203125 40.363281 66.007812 C 39.59375 65.828125 38.859375 65.550781 38.164062 65.179688 C 37.410156 64.769531 36.605469 64.5625 35.75 64.5625 C 34.890625 64.5625 34.089844 64.769531 33.335938 65.179688 C 32.585938 65.546875 31.800781 65.828125 30.984375 66.015625 C 30.167969 66.207031 29.339844 66.300781 28.503906 66.300781 C 27.664062 66.300781 26.839844 66.207031 26.023438 66.015625 C 25.207031 65.828125 24.421875 65.546875 23.671875 65.179688 C 22.917969 64.769531 22.113281 64.5625 21.257812 64.5625 C 20.398438 64.5625 19.597656 64.769531 18.84375 65.179688 C 18.148438 65.550781 17.414062 65.828125 16.644531 66.007812 C 15.792969 66.203125 14.929688 66.304688 14.054688 66.304688 C 12.347656 66.332031 10.734375 65.957031 9.21875 65.179688 L 8.800781 64.984375 C 8.089844 64.675781 7.347656 64.539062 6.574219 64.574219 C 5.800781 64.609375 5.070312 64.808594 4.390625 65.179688 C 3.695312 65.550781 2.960938 65.828125 2.191406 66.007812 C 1.339844 66.203125 0.476562 66.304688 -0.398438 66.304688 C -2.429688 66.359375 -4.292969 65.824219 -5.988281 64.699219 C -6.117188 64.617188 -6.261719 64.566406 -6.414062 64.542969 L -7.164062 64.542969 C -7.269531 64.589844 -7.363281 64.648438 -7.449219 64.726562 C -7.515625 64.796875 -7.574219 64.871094 -7.617188 64.957031 L -7.617188 65.050781 C -7.667969 65.167969 -7.695312 65.292969 -7.695312 65.425781 L -7.695312 71.539062 C -7.710938 71.972656 -7.644531 72.390625 -7.496094 72.792969 C -7.34375 73.199219 -7.121094 73.558594 -6.824219 73.875 C -6.53125 74.1875 -6.183594 74.433594 -5.789062 74.609375 C -5.394531 74.785156 -4.984375 74.878906 -4.550781 74.890625 L 61.441406 74.890625 C 61.871094 74.894531 62.285156 74.8125 62.683594 74.652344 C 63.078125 74.488281 63.429688 74.257812 63.734375 73.957031 C 64.039062 73.652344 64.277344 73.304688 64.441406 72.90625 C 64.605469 72.511719 64.6875 72.097656 64.6875 71.667969 L 64.6875 65.539062 C 64.6875 65.410156 64.660156 65.285156 64.609375 65.164062 Z M 64.574219 65.089844 "/>
</g>
<g clipPath="url(#clip2)" clipRule="nonzero">
<path style={{stroke:'none',fillRule:"nonzero",fill:color,fillOpacity:1}} d="M 35.289062 25.753906 C 35.546875 25.753906 35.765625 25.660156 35.949219 25.480469 C 36.128906 25.296875 36.222656 25.078125 36.222656 24.820312 L 36.222656 18.523438 C 36.222656 18.148438 36.183594 17.78125 36.113281 17.414062 C 36.039062 17.046875 35.929688 16.6875 35.789062 16.34375 C 35.644531 15.996094 35.46875 15.667969 35.261719 15.355469 C 35.050781 15.046875 34.816406 14.757812 34.550781 14.492188 C 34.285156 14.226562 33.996094 13.992188 33.6875 13.785156 C 33.375 13.574219 33.046875 13.398438 32.699219 13.257812 C 32.351562 13.113281 31.996094 13.003906 31.628906 12.933594 C 31.261719 12.859375 30.890625 12.824219 30.515625 12.824219 L 26.402344 12.824219 C 26.027344 12.824219 25.65625 12.859375 25.289062 12.933594 C 24.917969 13.003906 24.5625 13.113281 24.21875 13.257812 C 23.871094 13.398438 23.542969 13.574219 23.230469 13.785156 C 22.917969 13.992188 22.628906 14.226562 22.367188 14.492188 C 22.101562 14.757812 21.863281 15.046875 21.65625 15.355469 C 21.449219 15.667969 21.273438 15.996094 21.128906 16.34375 C 20.984375 16.6875 20.878906 17.046875 20.804688 17.414062 C 20.730469 17.78125 20.695312 18.148438 20.695312 18.523438 L 20.695312 24.820312 C 20.695312 25.078125 20.785156 25.296875 20.96875 25.480469 C 21.148438 25.660156 21.367188 25.753906 21.625 25.753906 Z M 35.289062 25.753906 "/>
</g>
</g>
</svg>;

export const svgFileProposed=({color="#000000",width=16,height=60})=><svg  width={`${width}px`} viewBox="0 0 82 82" version="1.2">
  <g transform="translate(2.6933263,3.5)">
   
    <path
       style={{"fill":color,"fillOpacity":1,"fillRule":"nonzero","stroke":"none"}}
       d="m 19.94375,24.919531 c 0,3.559896 0,7.119792 0,10.679688 2.924479,-1.684896 5.848959,-3.369792 8.773438,-5.054688 -2.604949,0.739752 -4.768966,-2.007566 -3.054688,-4.25 1.885868,-1.032194 4.218758,-0.349839 6.316346,-0.546875 5.71877,0 11.43754,0 17.15631,0 3.354876,0.509775 1.865214,5.876944 -1.303313,4.796875 -0.597211,0.20792 2.049031,1.283335 2.76861,1.843444 1.857922,1.070415 3.715844,2.140829 5.573766,3.211244 -0.07395,-4.008555 0.156992,-8.035804 -0.132813,-12.03125 -0.641088,-3.859608 -4.651161,-6.055342 -8.325219,-5.578125 -7.172268,0.02127 -14.346595,-0.0429 -21.517554,0.03271 -3.469925,0.282954 -6.315988,3.412188 -6.254883,6.896972 z"
       />
    <path
       style={{"fill":color,"fillOpacity":1,"fillRule":"nonzero","stroke":"none"}}
       d="m 16.486719,40.579688 c -2.282087,1.605718 -0.460958,4.331215 -0.151913,6.462696 0.408711,1.59056 0.817421,3.181119 1.226132,4.771678 2.900064,1.012832 6.099918,2.506042 9.161926,1.013596 2.635693,-1.634853 5.97261,-1.342311 8.58905,0.15657 2.920044,1.229002 5.839128,-0.198723 8.561707,-1.151611 3.552591,-0.935265 6.488016,2.438176 10.054199,1.492737 2.091111,-0.777509 5.180912,-0.820386 5.142472,-3.615134 0.549278,-2.414066 1.379407,-4.779608 1.728924,-7.228189 -0.540909,-2.329144 -3.266548,-2.832464 -5.001355,-4.111535 -5.71581,-3.234978 -11.337519,-6.659639 -17.113388,-9.773719 -2.238993,-0.160511 -3.953025,1.71609 -5.909096,2.598356 -5.429543,3.1282 -10.859496,6.255691 -16.288658,9.384555 z"
 />
    <g transform="translate(9.6,-10.35)">
      <path
         style={{"fill":color,"fillOpacity":1,"fillRule":"nonzero","stroke":"none"}}
         d="m 64.574219,65.089844 c -2.460244,-1.522904 -5.427548,2.629413 -8.472168,1.139648 -3.147677,-0.685261 -6.408362,-2.807592 -9.470215,-0.542236 -3.927277,1.904985 -7.723018,-0.760724 -11.515564,-1.085999 -3.575592,1.503715 -7.788103,2.59545 -11.444397,0.578431 -3.854059,-2.034163 -7.441906,2.390883 -11.497841,0.986021 -3.0622841,-1.142486 -6.3904909,-2.500576 -9.4121321,-0.310912 -3.53503052,1.724439 -7.0517146,-1.017439 -10.2111209,-1.128235 -0.5438951,1.995657 -0.1037406,4.250271 -0.246093,6.34915 -0.4479483,2.840971 2.4773028,4.239422 4.8829712,3.814913 21.4179158,0 42.8358308,0 64.2537468,0 3.080037,0.05376 3.47981,-3.270872 3.246094,-5.613011 -0.07102,-1.387168 0.145389,-2.828998 -0.113281,-4.18777 z"
       
       />
    </g>
      <g transform="translate(9.6,-10.35)">
      <path
         style={{"fill":color,"fillOpacity":1,"fillRule":"nonzero","stroke":"none"}}
         d="m 35.289062,25.753906 c 1.666764,-0.553067 0.655992,-2.829927 0.933594,-4.193169 0.07471,-2.78063 0.216157,-6.136592 -2.535156,-7.775581 -2.516135,-1.500239 -5.610349,-0.884041 -8.398438,-0.851562 -3.312306,0.538607 -5.017446,4.01519 -4.59375,7.110979 0.147361,1.796236 -0.315847,3.7528 0.273438,5.435896 1.899241,0.596315 4.075982,0.121165 6.088876,0.273437 2.743812,0 5.487624,0 8.231436,0 z"
     />
    </g>
    <path
       d="M 77.214656,38.599287 C 78.178779,63.994241 50.437749,84.405248 26.488021,76.010189 1.9613916,69.421841 -9.3813177,36.897328 5.7428782,16.487936 19.284739,-5.0074438 53.702444,-6.2264246 68.730731,14.257088 c 5.465663,6.852949 8.505268,15.577419 8.483925,24.342199 z"
       style={{"fill":"none","fillRule":"evenodd","stroke":color,"strokeWidth":6,"strokeLinecap":"butt","strokeLinejoin":"miter","strokeMiterlimit":4,"strokeDasharray":"none","strokeOpacity":1}}
       />

  </g>
</svg>;
