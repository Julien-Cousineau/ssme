import React from 'react';

import styled from 'styled-components';
import { Typography,Popover} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import DataHover from './dataHover';
import {FormattedMessage} from 'localization';
import {DataContext} from 'dataContext.js';
import {getProjectName,getProjectID} from 'utils.js';


const { Link } = Typography;

export const Bold = styled.p`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0px;
  line-height: 1.5;
  overflow: hidden;
`;
export const Description = styled.div`
  font-size: 10px;
  color: #777;
  margin-bottom: 8px;
  line-height: 1.5;
  overflow: hidden;
`;
const StyledFontAwesome = styled(FontAwesomeIcon)`
    margin-left: 6px;
    cursor:pointer;
    color: #999;
    // font-size:10px;
`;

export default class DataInfo extends React.PureComponent {
  render(){
    return(
      <DataContext.Consumer>
       {({data,lng}) =>{
            
            const {projectID,value,header=false,showInfo=true}=this.props;
          
            
            const headerInfo=data[lng].infoHeaders[value];
              
            let content;
            if(!projectID){
            
             if(!headerInfo)return null;
             content=<Description><DataHover value={headerInfo}/></Description>;
            } else {     
           
           
               const ref=data[lng].references.find(r=>getProjectID(r,lng)==projectID);
              const link=data[lng].referenceLinks.find(r=>getProjectID(r,lng)==projectID);
              const reference=ref?ref[value]!=="N/A"?ref[value]:null:null;
              const referenceLink=link?link[value]:null;
              
              
              
              const _info=data[lng].infos.find(r=>getProjectID(r,lng)==projectID);
              const info=_info?_info[value]:null;
              
              
              if(!reference && !info && !headerInfo)return null;
              if(!showInfo && headerInfo && !reference && !info)return null;
              
              const refs=reference && reference.split(";");
              const refls=reference && referenceLink.split(";");
              content=<div>
                    {headerInfo && showInfo?<div>
                      <Description><DataHover value={headerInfo}/></Description>
                    </div>
                    :null}
                    {info?<div>
                      <Bold>Data Info</Bold>
                      <Description><DataHover value={info}/></Description>
                    </div>
                    :null}
                    {reference?<div>
                      <Bold><FormattedMessage id={'card.references'}/></Bold>
                      {refs.map((r,i)=><Link key={i} style={{fontSize:10,display: "inline-block"}} href={refls[i]} target="_blank">{r} </Link>)}
                    </div>
                    :null}
                    
                  </div>
            }
            
           
            
           
            
          return <Popover placement="right" overlayStyle={{maxWidth:200}} content={content}  trigger="click"><StyledFontAwesome icon={faInfoCircle}/> </Popover>;
       }} 
      </DataContext.Consumer>
      );
  }
  
}
