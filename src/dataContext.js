import React,{createContext} from 'react';
import {getBoundary,getRoutes,getTerminals} from 'utils';
import _ from 'lodash';

export const defaultData = {
  data:{
    en: {
      projects:[],
      references:[],
      referenceLinks:[],
      definitions:{},
      infos:[],
      infoHeaders:{},
    },
    fr: {
      projects:[],
      references:[],
      referenceLinks:[],
      definitions:{},
      infos:[],
      infoHeaders:{},      
    },
  },
  loading:true,
  lng:'en',
  heatmapValue:'nox',
  boundary:{},
  routes:[],
  terminals:{},
  showExisting:true,
  showAllRoutes:false,
  
};


export const DataContext = createContext(defaultData);

export class DataProvider extends React.PureComponent {
  state={
    heatmapValue:'nox',
    boundary:this.props.boundary,
    routes:this.props.routes,
    terminals:this.props.terminals,
    showAllRoutes:this.props.showAllRoutes,
    showExisting:true,
    loading:true,
    meitPopups:{},
  }
  getData=async()=>{
    const boundary=await getBoundary();
    const routes=await getRoutes();
    const terminals=await getTerminals();
    
    this.setState({loading:false,boundary,routes,terminals});
  }
  render(){
    const {heatmapValue,boundary,routes,terminals,showExisting,loading,meitPopups,showAllRoutes}=this.state;
    return(
      <DataContext.Provider value={{
        data:this.props.data,
        lng:this.props.lng,
        loading,
        boundary,
        routes,
        terminals,
        heatmapValue,
        showExisting,
        handleShowExisting:()=>this.setState({showExisting:!this.state.showExisting}),
        showAllRoutes,
        handleAllRoutes:()=>this.setState({showAllRoutes:!this.state.showAllRoutes}),
        handleHeatmapValue:(heatmapValue)=>this.setState({heatmapValue}),
        handleData:()=>this.getData(),
        meitPopups,
        meitHandleClose:(key)=>this.setState({meitPopups:_.omit(this.state.meitPopups, [key])}),
        meitHandleAdd:(key,object)=>this.setState({meitPopups:_.clone(_.assign(this.state.meitPopups, {[key]:object}))}),
      }}>
        {this.props.children}
      </DataContext.Provider>
      );
  }
}


export const withData = Component => {
  class DataComponent extends React.PureComponent {
    render() {
      return (
        <DataContext.Consumer>
          {/*({data,lng,boundary,routes,heatmapValue,handleHeatmapValue}) => <Component {...this.props} data={data} lng={lng} boundary={boundary} routes={routes} heatmapValue={heatmapValue} handleHeatmapValue={handleHeatmapValue}/>*/}
          {(context) => <Component {...this.props} {...context}/>}
        </DataContext.Consumer>
      );
    }
  }

  return DataComponent;
};