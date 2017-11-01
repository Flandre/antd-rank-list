import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Table, Tooltip } from "antd"
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
        title: '排名(当前/榜单)',
        key: 'index',
        render: (text, record, index) => (
          `${index + 1}位(${record.lno}位)`
        ),
        width: 100
      },
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
        width: 200
      },
      {
        title: '当前',
        dataIndex: 'senka',
        key: 'senka',
        sorter: (a, b) => a.senka - b.senka,
        width: 100
      },
      {
        title: '最大',
        dataIndex: 'maxSenka',
        key: 'maxSenka',
        sorter: (a, b) => a.maxSenka - b.maxSenka,
        width: 50
      },
      {
        title: '最小',
        dataIndex: 'minSenka',
        key: 'minSenka',
        sorter: (a, b) => a.minSenka - b.minSenka,
        width: 50
      },
      {
        title: '经验',
        key: 'subSenka',
        render: (text, record) => (
          <div>
            {record.subSenka}
          </div>
        ),
        sorter: (a, b) => a.subSenka - b.subSenka,
        width: 50
      },
      {
        title: 'ex',
        dataIndex: 'extraSenka',
        key: 'extraSenka',
        width: 50
      },
      {
        title: '未完成ex',
        key: 'unfinishedExtra',
        render: (text, record) => (
          record.maxSenka - record.senka
        ),
        width: 50
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
              size="small"
              bordered
            />
            :
            ''}
      </div>
    )
  }
}