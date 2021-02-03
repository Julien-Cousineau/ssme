import React from 'react';

import DeckGL, {GeoJsonLayer, ArcLayer,TripsLayer,PathLayer} from 'deck.gl';
import {PathStyleExtension} from '@deck.gl/extensions';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import {Map,AppContext} from 'components/common';
import * as d3 from "d3";
import {DATA,ROUTES,HEATMAP,INITIALVIEWPORT} from 'constants.js';
import {getLayers} from 'utils.js';
import {
  scaleLinear, scalePow, axisLeft, axisBottom, interpolateRdYlBu, interpolateTurbo,format as D3Format
} from 'd3';

export default {
  title: 'Components/Map',
  component: Map,
};
const Template = (args) => <AppContext><Map {...args}/></AppContext>;


const nox_scale = scalePow().exponent(0.25).domain([1E4,1E9]).range([0,1]);


const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson'; //eslint-disable-line
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const layers=[new GeoJsonLayer({
          id:"airports",
          data:AIR_PORTS,
          filled:true,
          pointRadiusMinPixels:2,
          pointRadiusScale:2000,
          getRadius:f => 11 - f.properties.scalerank,
          getFillColor:[200, 0, 80, 180],
          pickable:false,
          autoHighlight:true,
        }),
        new  ArcLayer({
          id:"arcs",
          data:AIR_PORTS,
          dataTransform:d => d.features.filter(f => f.properties.scalerank < 4),
          getSourcePosition:f => [-0.4531566, 51.4709959],
          getTargetPosition:f => f.geometry.coordinates,
          getSourceColor:[0, 128, 200],
          getTargetColor:[200, 0, 80],
          getWidth:1})
        ];
      
        
export const Default = Template.bind({});
Default.args = {
  layers,
};

export const SSME = Template.bind({});
SSME.args = {
  layers:getLayers({data:DATA.data.en.projects,boundary:DATA.boundary,currentTime:10}),
};

export const ROUTE = Template.bind({});
ROUTE.args = {
  layers:[new TripsLayer({
    id:"routes",
    data:d3.json(ROUTES).then(d=>{
      
      const a= d['features'].map(f=>({properties:f.properties,waypoints:f.geometry.coordinates.map((c,i)=>({coordinates:c, timestamp:i}))}));
      console.log(a)
      return a;
    }
    ),
    getPath: d => d.waypoints.map(p => p.coordinates),
    // deduct start timestamp from each data point to avoid overflow
    getTimestamps: d => d.waypoints.map(p => p.timestamp),
    getColor: d=>d.properties.Direction==="Inbound"?[255,0,0]:[0,255,0],
    opacity: 0.8,
    widthMinPixels: 5,
    rounded: true,
    trailLength: 10,
    currentTime: 10
        })]
};

export const Path = Template.bind({});
Path.args = {
  layers:[ new PathLayer({
    id: 'routes-static',
    data:DATA.trips['features'],//.map(f=>console.log(f)&&({...f.properties,waypoints:f.geometry.coordinates.map((c,i)=>({coordinates:c, timestamp:i*1000.0/f.properties.Length*1000}))})),
    // pickable: true,
    widthScale: 20,
    widthMinPixels: 2,
    getPath: d => d.geometry.coordinates,
    getColor: d => [255,0,0],
    // color: [255, 0, 0],
    getWidth: d => 5,
    getDashArray: [3, 2],
    dashJustified: true,
    extensions: [new PathStyleExtension({dash: true})],
   
  }),]
};


export const Heatmap = Template.bind({});
Heatmap.args = {
  viewport:INITIALVIEWPORT,
  layers:[ new HeatmapLayer({
    id: 'heatmap',
    data:HEATMAP,

    
    getPosition: d => {
     
      return [+d.lng,+d.lat]},
    getWeight: d => nox_scale(+d.nox),
    radiusPixels:50,
    threshold:0.1,
   
  }),]
};
