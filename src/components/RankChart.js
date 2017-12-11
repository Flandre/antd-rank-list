import React, { Component } from 'react'
import { observer } from "mobx-react"
import echarts from "echarts"
let myChart, rank5arr = [], rank20arr = [], rank100arr = [], rank500arr = []

@observer
export default class RankChart extends React.Component {
  state = {
    rank5data: [],
    rank20data: [],
    rank100data: [],
    rank500data: [],
  }
  componentDidMount() {
    console.log('=== init charts ===')
    myChart = echarts.init(document.getElementById('main'))
    myChart.setOption({
      tooltip: {},
      xAxis: {
        data: []
      },
      yAxis: {},
      series: [
        {
          name: '5位',
          type: 'line',
          data: []
        },
        {
          name: '20位',
          type: 'line',
          data: []
        },
        {
          name: '100位',
          type: 'line',
          data: []
        },
        {
          name: '500位',
          type: 'line',
          data: []
        },
      ]
    })
  }
  componentDidUpdate() {
    console.log('=== update charts ===')
    console.log(this.state.rank5data)
    console.log(this.state.rank20data)
    console.log(this.state.rank100data)
    console.log(this.state.rank500data)
    myChart.setOption({
      xAxis: {
        data: []
      },
      series: [
        {
          name: '5位',
          data: rank5arr
        },
        {
          name: '20位',
          data: rank20arr
        },
        {
          name: '100位',
          data: rank100arr
        },
        {
          name: '500位',
          data: rank500arr
        },
      ]
    })
    console.log('=== before resize ===')
    myChart.resize()
  }
  resizeDom = () => {
    console.log('=== before resize ===')
    if(myChart)
      myChart.resize()
  }
  render() {
    console.log('=== render charts ===')
    let keymap = this.props.appState.rankData.keymap,
      rank5obj = {}, rank20obj = {}, rank100obj = {}, rank500obj = {},
      flag = false
    if(keymap){
      rank5obj = keymap['5'] || {}
      rank20obj = keymap['20'] || {}
      rank100obj = keymap['100'] || {}
      rank500obj = keymap['500'] || {}
    }
    console.log('===get data===')
    console.log(rank5obj)
    console.log(rank20obj)
    console.log(rank100obj)
    console.log(rank500obj)
    ~[rank5obj, rank20obj, rank100obj, rank500obj].forEach((obj, idx) => {
      Object.keys(obj).forEach((ele) => {
        [rank5arr, rank20arr, rank100arr, rank500arr][idx].push(obj[ele])
      })
    })
    console.log('===create arr===')
    console.log(rank5arr)
    console.log(rank20arr)
    console.log(rank100arr)
    console.log(rank500arr)
    ~[rank5arr, rank20arr, rank100arr, rank500arr].map(ele => ele.filter(v => v? v : null))
    return (
      <div id="main" style={{ width: '100%', height: '100%'}} onresize={this.resizeDom}></div>
    );
  }
}