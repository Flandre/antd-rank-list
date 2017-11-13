import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Table } from "antd"
import _sortBy from "lodash/sortBy"

@observer
export default class RankForecast extends React.Component {
  render() {
    let forecastData = [], rankMap = [5, 20, 100, 500], source = this.props.appState.rankData, format = this.props.appState.formatData
    const monthOfDay=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if(source && format.length){
      rankMap.map(ele => {
        let dataObj = {}, days = monthOfDay[new Date().getMonth()],
          totalts = days * 86400000 - 3600000 * 4, dur = source.zexpto - source.zexpfrom, rate = totalts / dur
        dataObj.rank = ele
        dataObj.list = source.tail[ele]
        dataObj.now = _sortBy(format, 'senka').reverse()[ele - 1].senka
        dataObj.max = _sortBy(format, 'maxSenka').reverse()[ele - 1].maxSenka
        dataObj.furture = ((dataObj.max - source.front[ele] - 1380) * rate + source.front[ele] + 1380).toFixed(0)
        forecastData.push(dataObj)
      })
    }
    // console.log(forecastData)
    const columns = [
      {
        title: '排名',
        key: 'rank',
        render: (text, record, index) => (
          `${record.rank}位`
        ),
        width: 50
      },
      {
        title: '榜单',
        dataIndex: 'list',
        key: 'list',
        width: 100
      },
      {
        title: '当前',
        dataIndex: 'now',
        key: 'now',
        width: 100
      },
      {
        title: '当前（ex）',
        dataIndex: 'max',
        key: 'max',
        width: 100
      },
      {
        title: '月底',
        dataIndex: 'furture',
        key: 'furture',
        width: 100
      },
    ]
    return(
      <div>
        {
          source && format.length ?
            <Table
              columns={columns}
              dataSource={forecastData}
              pagination={false}
              size="middle"
              bordered
              rowKey="forecastTable"
            />
            :
            ''
        }
      </div>
    )
  }
}