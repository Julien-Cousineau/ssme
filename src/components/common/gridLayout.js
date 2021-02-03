import React from "react";
import _ from "lodash";
import styled from 'styled-components';

import RGL,{ WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Card from './card';
import {withData} from 'dataContext.js';
import {getProjects,getProjectID,getProjectName,getClientName,getDescription,getTimeline,getVessel,getEmissions,getIcon}from 'utils.js';

import {KEYS} from 'constants.js';
import {SVGEC,SSVG} from './iconList';
import CardMeit from './card.meit'



const ReactGridLayout = WidthProvider(RGL);


// const ResponsiveReactGridLayout = WidthProvider(Responsive);

const StyledReactGridLayout = styled(ReactGridLayout)`
  display:${props=>props.show?"block":"none"};
  .react-grid-item {
      background:${prop=>prop.background||"white"};
    box-shadow: 0px 0px 6px rgba(0,0,0,0.2);
    margin: 5px;
    border-radius: 4px;
  
  
    
    overflow: hidden;
    pointer-events: auto;
    padding: 5px 10px 10px 10px;
  }
`;

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
class AddRemoveLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    show:true,
    // cols: Object({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }),
    // rowHeight: 100,
    onLayoutChange:()=>null
  };

  constructor(props) {
    super(props);

    // this.state = {
    //   cols:this.props.cols,
    //   items: [0, 1, 2, 3, 4].map(function(i, key, list) {
    //     return {
    //       i: i.toString(),
    //       x: i * 2,
    //       y: 0,
    //       w: 2,
    //       h: 2,
    //       add: i === (list.length - 1)
    //     };
    //   }),
    //   newCounter: 0
    // };

  
  }

//   createElement(el) {
//     const removeStyle = {
//       position: "absolute",
//       right: "2px",
//       top: 0,
//       cursor: "pointer"
//     };
//     const i = el.add ? "+" : el.i;
//     return (
//       <div key={i} data-grid={el}>
//         {el.add ? (
//           <span
//             className="add text"
//             onClick={this.onAddItem}
//             title="You can add an item by clicking here, too."
//           >
//             Add +
//           </span>
//         ) : (
//           <span className="text">{i}</span>
//         )}
//         <span
//           className="remove"
//           style={removeStyle}
//           onClick={this.onRemoveItem.bind(this, i)}
//         >
//           x
//         </span>
//       </div>
//     );
//   }

  // createElement(el) {
  //   const removeStyle = {
  //     position: "absolute",
  //     right: "2px",
  //     top: 0,
  //     cursor: "pointer"
  //   };
  //   const i = el.add ? "+" : el.i;
  //   return (
  //     <div key={i} data-grid={el}>
  //       {el.add ? (
  //         <span
  //           className="add text"
  //           onClick={this.onAddItem}
  //           title="You can add an item by clicking here, too."
  //         >
  //           Add +
  //         </span>
  //       ) : (
  //         <span className="text">{i}</span>
  //       )}
  //       <span
  //         className="remove"
  //         style={removeStyle}
  //         onClick={this.onRemoveItem.bind(this, i)}
  //       >
  //         x
  //       </span>
  //     </div>
  //   );
  // }



  onLayoutChange=(layout)=> {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem=(i)=> {
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
      const {lng,meitPopups,terminals}=this.props;
      const selectedProjects=getProjects(this.props);
      
    return (
      <StyledReactGridLayout
        rowHeight={350}
        show={this.props.show}
          
           draggableHandle=".drag-handle"
        //   onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {selectedProjects.map((p,i)=>
           <div style={{background:"white"}}
           key={getProjectID(p,lng)} 
           data-grid={{
            i:  String(getProjectID(p,lng)),
            x: ((selectedProjects.length+Object.keys(meitPopups).length-1) * 3) % (12),
            
            y: Infinity, // puts it at the bottom
            w: 3,
            h: 1,
            // static: true,
            
            }}>
          <Card 
            
            icon={getIcon(p,lng)}
            projectID={getProjectID(p,lng)}
            title={getProjectName(p,lng)}
            subtitle={getClientName(p,lng)}
            description={getDescription(p,lng)}
            timeline={getTimeline(p,lng)}
            vessel={getVessel(p,lng)}
            emissions={getEmissions(p,lng)}
            closeProject={()=>this.props.closeProject(p)}
            
            />
            </div>
        )}
      {Object.keys(meitPopups).map((key,i)=>
           <div style={{background:terminals[key].type=="anchorage"?"#fff5f5":"#eaf1f8"}} 
           key={key} 
           data-grid={{
            i:  key,
            x: ((selectedProjects.length+Object.keys(meitPopups).length-1) * 3) % (12),
            
            y: Infinity, // puts it at the bottom
            w: 3,
            h: 1,
            // static: true,
            
            }}>
        <CardMeit 
            // key={i}
            
            // projectID={getProjectID(p,lng)}
            name={key}
            type={terminals[key].type}
            vessels={terminals[key].vessels}
            emissions={terminals[key].emissions}
            meitHandleClose={this.props.meitHandleClose}
            
            />
            </div>
        )}
        </StyledReactGridLayout>
      
    );
  }
}

export default withData(AddRemoveLayout);