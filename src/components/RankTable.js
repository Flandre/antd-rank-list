import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Table, Icon } from "antd"

@observer
export default class RankTable extends React.Component {
  state = {
    sortedInfo: {
      columnKey: 'maxSenka',
      order: 'descend'
    }
  }
  handleChange = (pagenation, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    })
  }
  formatDate = date => {
    const dateNow = new Date(date), addZero = num => num > 9? num: '0' + num
    return `${dateNow.getDate()}日 ${dateNow.getHours()}:${addZero(dateNow.getMinutes())}`
  }
  sortTable = e => {
    let sortBy = e.currentTarget.getAttribute('value'),
      sorter = sortBy === this.state.sortedInfo.columnKey ? {} : {
        columnKey: sortBy,
        order: 'descend'
      }
    this.setState({
      sortedInfo: sorter,
    })
  }
  rowStyle = index => {
    if(index < 5)
      return 'rank5'
    else if(index < 20)
      return 'rank20'
    else if(index < 100)
      return 'rank100'
    else if(index < 500)
      return 'rank500'
  }
  render() {
    // console.log('========format data ========')
    // if(this.props.appState.rankData !== ''){
    //   console.log(this.props.appState.rankData)
    // }
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: <div>排名(当前/榜单)</div>,
        key: 'index',
        render: (text, record, index) => (
          <div className={this.rowStyle(index)}>{index + 1}位（{record.lno}位）</div>
        ),
        width: 100
      },
      {
        title: <div>昵称</div>,
        key: 'name',
        render: (text, record, index) => (
          <div className={this.rowStyle(index)}>{record.name}</div>
        ),
        width: 100
      },
      {
        title:
          <div onClick={this.sortTable} value='senka'>
            当前
            {sortedInfo.columnKey === 'senka'? <Icon style={{ float: 'right', lineHeight: '18px' }} type="download" /> : ''}
          </div>,
        key: 'senka',
        render: (text, record, index) => (
          <div className={this.rowStyle(index)}>{record.senka}</div>
        ),
        sorter: (a, b) => a.senka - b.senka,
        sortOrder: sortedInfo.columnKey === 'senka' && sortedInfo.order,
        width: 100,
      },
      {
        title:
          <div onClick={this.sortTable} value='maxSenka'>
            最大
            {sortedInfo.columnKey === 'maxSenka'? <Icon style={{ float: 'right', lineHeight: '18px' }} type="download" /> : ''}
          </div>,
        dataIndex: 'maxSenka',
        key: 'maxSenka',
        sorter: (a, b) => a.maxSenka - b.maxSenka,
        sortOrder: sortedInfo.columnKey === 'maxSenka' && sortedInfo.order,
        width: 50,
        render: (text, record, index) => {
          if(record.maxSenka === record.minSenka){
            return{
              children: <div className={this.rowStyle(index)}>{text}</div>,
              props: {
                colSpan: 2
              }
            }
          } else {
            return{
              children: <div className={this.rowStyle(index)}>{text}</div>
            }
          }
        }
      },
      {
        title:
          <div onClick={this.sortTable} value="minSenka">
            最小
            {sortedInfo.columnKey === 'minSenka'? <Icon style={{ float: 'right', lineHeight: '18px' }} type="download" /> : ''}
          </div>,
        dataIndex: 'minSenka',
        key: 'minSenka',
        sorter: (a, b) => a.minSenka - b.minSenka,
        sortOrder: sortedInfo.columnKey === 'minSenka' && sortedInfo.order,
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
              children: <div className={this.rowStyle(index)}>{text}</div>
            }
          }
        }
      },
      {
        title:
          <div onClick={this.sortTable} value='subSenka'>
            经验
            {sortedInfo.columnKey === 'subSenka'? <Icon style={{ float: 'right', lineHeight: '18px' }} type="download" /> : ''}
          </div>,
        key: 'subSenka',
        render: (text, record, index) => {
          if(record.expStartOffset && record.expNowOffset){
            return {
              children: <div className={this.rowStyle(index)}>{record.subSenka}  （{this.formatDate(record.expStartOffset)} ~ {this.formatDate(record.expNowOffset)}）</div>
            }
          } else {
            return {
              children: <div className={this.rowStyle(index)}>{record.subSenka}</div>
            }
          }
        },
        sorter: (a, b) => a.subSenka - b.subSenka,
        sortOrder: sortedInfo.columnKey === 'subSenka' && sortedInfo.order,
        width: 200
      },
      {
        title: <div>ex</div>,
        dataIndex: 'extraSenka',
        key: 'extraSenka',
        render: (text, record, index) => {
          if(record.extraStartOffset && record.extraNowOffset){
            if(typeof record.zCompleteMonth === 'number'){
              return {
                children: <div className={this.rowStyle(index)}>{record.extraSenka}<sup>{record.frontex ? `+${record.frontex}` : ''}</sup>  （{this.formatDate(record.extraStartOffset)} ~ {this.formatDate(record.extraNowOffset)} | {record.zCompleteMonth ? `${record.zCompleteMonth}月已完成Z作战` : '已完成Z作战'}）</div>
              }
            } else {
              return {
                children: <div className={this.rowStyle(index)}>{record.extraSenka}<sup>{record.frontex ? `+${record.frontex}` : ''}</sup>  （{this.formatDate(record.extraStartOffset)} ~ {this.formatDate(record.extraNowOffset)}）</div>
              }
            }
          } else {
            if(typeof record.zCompleteMonth === 'number'){
              return {
                children: <div className={this.rowStyle(index)}>{record.extraSenka}<sup>{record.frontex ? `+${record.frontex}` : ''}</sup>  （{record.zCompleteMonth ? `${record.zCompleteMonth}月已完成Z作战` : '已完成Z作战'}）</div>
              }
            } else {
              return {
                children: <div className={this.rowStyle(index)}>{record.extraSenka}<sup>{record.frontex ? `+${record.frontex}` : ''}</sup></div>
              }
            }
          }
        },
        width: 200
      },
      {
        title: <div>未完成ex</div>,
        key: 'unfinishedExtra',
        render: (text, record, index) => (
          <div className={this.rowStyle(index)}>{record.maxSenka - record.senka}</div>
        ),
        width: 50
      },
    ]
    // console.log(`========${typeof this.props.appState.formatData.concat([])}=========`)
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
              onChange={this.handleChange}
              className="rank-table"
            />
            :
            ''
        }
      </div>
    )
  }
}