import React, { Component } from 'react'
import { observer } from "mobx-react"
import Chart from "frappe-charts/dist/frappe-charts.min.esm"
let chart, rank5arr = [], rank20arr = [], rank100arr = [], rank500arr = [], labelarr = []

@observer
export default class RankChart extends React.Component {
  componentDidMount() {
    let data = {
      labels: labelarr,
      datasets: [
        {
          title: "Rank 5",
          values: rank5arr
        },
        {
          title: "Rank 20",
          values: rank20arr
        },
        {
          title: "Rank 100",
          values: rank100arr
        },
        {
          title: "Rank 500",
          values: rank500arr
        }
      ]
    };

    chart = new Chart({
      parent: "#chart",
      data: data,
      type: 'line',
      height: 190,

      colors: ['#7cd6fd', 'violet', 'blue', 'dark-grey'],
      show_dots: 0,
      x_axis_mode: 'tick',
      y_axis_mode: 'span',

      format_tooltip_x: d => new Date().getMonth() + 1 + '-' + d,
      format_tooltip_y: d => d
    });
  }
  componentDidUpdate() {
    chart.update_values(
      [
        {values: rank5arr},
        {values: rank20arr},
        {values: rank100arr},
        {values: rank500arr}
      ],
      labelarr
    );
  }
  render() {
    let keymap = this.props.appState.rankData.keymap,
      rank5obj = {}, rank20obj = {}, rank100obj = {}, rank500obj = {}
    if(keymap){
      rank5obj = keymap['5'] || {}
      rank20obj = keymap['20'] || {}
      rank100obj = keymap['100'] || {}
      rank500obj = keymap['500'] || {}
    }
    ~[rank5obj, rank20obj, rank100obj, rank500obj].forEach((obj, idx) => {
      Object.keys(obj).forEach((ele) => {
        [rank5arr, rank20arr, rank100arr, rank500arr][idx].push(obj[ele])
      })
    })
    ~[rank5arr, rank20arr, rank100arr, rank500arr].map(ele => ele.filter(v => v? v : null))
    labelarr = Object.keys(rank5obj).map(ele => `${~~(ele/2) + 1}-${ele % 2 ? 'p': 'a'}m`)
    return (
      <div id="chart" ></div>
    );
  }
}