import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table } from 'antd';
import DataHover from './dataHover';
import DataText from './dataText';
import {withData} from 'dataContext.js';

import {KEYS} from 'constants.js'
import {FormattedMessage} from 'localization';
import {getProjects,getProjectID,getProjectName,getIcon}from 'utils.js';

const StyledHeader=styled.div`
display:flex;
align-items: center;
`
const StyledSVG=styled.div`
min-width:24px;
`
const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  
`;

const Container = styled.div`
    overflow: auto;
    width: 100%;
    height: 100%;
    .grayColumn {
       background:#f3f3f3;
    }
    .evenColumn{
      // background:#fafafa;
      // background:#f3f3f3;
    }
        .oddColumn{
      // background:#fafafa;
       background:#f3f3f3;
    }
    .boldColumn {
      font-weight:600;
      font-size:12px;
    }
    .ant-table-thead > tr > th {
      background:#f3f3f3;
    }
   .ant-table-wrapper {
  height: 100%;

  .ant-spin-nested-loading {
    height: 100%;

    .ant-spin-container {
      height: 100%;
      display: flex;
      flex-flow: column nowrap;

      .ant-table {
        flex: auto;
        overflow: hidden;

        .ant-table-container {
          height: 100%;
          display: flex;
          flex-flow: column nowrap;

          .ant-table-header {
            flex: none;
          }

          .ant-table-body {
            flex: auto;
            overflow: scroll;
          }
        }
      }

      .ant-table-pagination {
        flex: none;
      }
    }
  }
}
`;


const tableProcess=(props)=>{
    const projects=getProjects(props);
    const {lng}=props;
    const headers=KEYS[lng].tableColumns;
  
    const dataSource=projects.length==0?[]:
        headers.map(name=>{
          const row={"name":name};
          projects.forEach(p=>row[getProjectID(p,lng)]=p[name]);
          return row;
        });
    
    const columns=projects.length==0?[]:
        [
          {
            title: '',
            dataIndex: 'name',
            key: 'name',
            className:'boldColumn grayColumn',
            filters:  headers.map(name=>({text:name,value:name})),
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            render: text => <div><DataText value={text} header={true}/></div>,
          },
          ...projects.map((p,i)=>({
                title:  ()=><StyledHeader><StyledSVG>{getIcon(p,lng)}</StyledSVG><Title>{getProjectName(p,lng)}</Title></StyledHeader>,
                dataIndex: getProjectID(p,lng),
                key: i,
                className:i%2==0?'evenColumn':'oddColumn',
                render: (text,r,index) => <DataText value={text} keyValue={headers[index]} showInfo={false} projectID={getProjectID(p,lng)}/>,
               
          }))
        ]
    
    return {dataSource,columns}
}

export class MyTable extends React.PureComponent {

    static propTypes={
      data:PropTypes.object,
      lng:PropTypes.string,
      selectedProjects:PropTypes.array,
    };
    static defaultProps={
     data:[],
     lng:'en',
     selectedProjects:[],
    };
    
   
  render(){
    return(
        <Container>
        <Table {...tableProcess(this.props)} 
          pagination={{ pageSize: 50 }} 
          scroll={{ y: "100vh" }} 
          size="small" 
          locale={{"emptyText":<FormattedMessage id={'table.nodata'}/>}} />
        </Container>

    )
  }
}
export default withData(MyTable)