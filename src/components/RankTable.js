import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Table } from "antd"

@observer
export default class RankTable extends React.Component {
  formatDate = date => {
    const dateNow = new Date(date), addZero = num => num > 9? num: '0' + num
    return `${dateNow.getDate() + 1}日 ${dateNow.getHours()}:${addZero(dateNow.getMinutes())}`
  }
  render() {
    console.log('========format data ========')
    if(this.props.appState.rankData !== '')
      console.log(this.props.appState.rankData)
    const columns = [
      {
        title: '排名(当前/榜单)',
        key: 'index',
        render: (text, record, index) => (
          `${index + 1}位（${record.lno}位）`
        ),
        width: 100
      },
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
        width: 100
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
        width: 50,
        render: (text, record, index) => {
          if(record.maxSenka === record.minSenka){
            return{
              children: <span>{text}</span>,
              props: {
                colSpan: 2
              }
            }
          } else {
            return{
              children: <span>{text}</span>
            }
          }
        }
      },
      {
        title: '最小',
        dataIndex: 'minSenka',
        key: 'minSenka',
        sorter: (a, b) => a.minSenka - b.minSenka,
        width: 50,
        render: (text, record, index) => {
          if(record.maxSenka === record.minSenka){
            return {
              props: {
                colSpan: 0
              }
            }
          } else {
            return{
              children: <span>{text}</span>
            }
          }
        }
      },
      {
        title: '经验',
        key: 'subSenka',
        render: (text, record) => {
          if(record.expStartOffset && record.expNowOffset){
            return {
              children: <span>{record.subSenka}  （{this.formatDate(record.expStartOffset)} ~ {this.formatDate(record.expNowOffset)}）</span>
            }
          } else {
            return {
              children: <span>{record.subSenka}</span>
            }
          }
        },
        sorter: (a, b) => a.subSenka - b.subSenka,
        width: 200
      },
      {
        title: 'ex',
        dataIndex: 'extraSenka',
        key: 'extraSenka',
        render: (text, record) => {
          if(record.extraStartOffset && record.extraNowOffset){
            if(typeof record.zCompleteMonth === 'number'){
              return {
                children: <span>{record.extraSenka}  （{this.formatDate(record.extraStartOffset)} ~ {this.formatDate(record.extraNowOffset)} | {record.zCompleteMonth ? `${record.zCompleteMonth}月已完成Z作战` : '已完成Z作战'}）</span>
              }
            } else {
              return {
                children: <span>{record.extraSenka}  （{this.formatDate(record.extraStartOffset)} ~ {this.formatDate(record.extraNowOffset)}）</span>
              }
            }
          } else {
            if(typeof record.zCompleteMonth === 'number'){
              return {
                children: <span>{record.extraSenka}  （{record.zCompleteMonth ? `${record.zCompleteMonth}月已完成Z作战` : '已完成Z作战'}）</span>
              }
            } else {
              return {
                children: <span>{record.extraSenka}</span>
              }
            }
          }
        },
        width: 200
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
    console.log(`========${typeof this.props.appState.formatData.concat([])}=========`)
    return (
      <div>
        {
          this.props.appState.formatData.length ?
            <Table
              columns={columns}
              dataSource={this.props.appState.formatData.concat([])}
              pagination={false}
              scroll={{ y: 500 }}
              size="middle"
              bordered
              rowKey="mainTable"
            />
            :
            ''
        }
      </div>
    )
  }
}