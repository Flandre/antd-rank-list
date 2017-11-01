import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Table } from "antd"
import createTable from "./createTable"
import formatData from "./formatData"

@observer
export default class RankTable extends React.Component {
  render() {
    // if(this.props.appState.rankData !== ''){
    //   console.log(createTable(this.props.appState.rankData, 0, false))
    // }
    console.log('========format data ========')
    if(this.props.appState.rankData !== '')
      console.log(formatData(this.props.appState.rankData))
    const columns = [
      {
        title: 'lno',
        dataIndex: 'lno',
        width: 100
      },
      {
        title: 'Name',
        dataIndex: 'name',
        width: 100
      },
      {
        title: 'Senka',
        dataIndex: 'senka',
        width: 100
      },
      {
        title: 'max',
        dataIndex: 'maxSenka',
        width: 50
      },
      {
        title: 'min',
        dataIndex: 'minSenka',
        width: 50
      },
      {
        title: 'Subsenka',
        dataIndex: 'subSenka',
        width: 100
      },
    ]
    return (
      <div>
        {
          this.props.appState.rankData !== '' ?
            <Table
              columns={columns}
              dataSource={formatData(this.props.appState.rankData)}
              pagination={false}
              scroll={{ y: 500 }}
              bordered
            />
            :
            ''}
      </div>
    )
  }
}