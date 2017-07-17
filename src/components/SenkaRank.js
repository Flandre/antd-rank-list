import React, { Component } from 'react';
import axios from 'axios';

const fetchAsync = async (uri) => {
  const res = await fetch(uri)
  return res.text()
}

export default class SenkaRank extends Component {
  constructor(){
    super();
    this.state = {
      value: 0
    }
  }

  handleClick = async (e) =>{
    console.log(e.currentTarget.value);
    // axios.get('http://124.65.37.154:12450/api/calrank?server=' + e.currentTarget.value)
    //   .then(res => {
    //     console.log('=== axios ===')
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    const res = await fetchAsync('http://124.65.37.154:12450/api/calrank?server=' + e.currentTarget.value)
    console.log(res)
    this.setState({value: res})
    // fetch('http://124.65.37.154:12450/api/calrank?server=' + e.currentTarget.value)
    //   .then(res => {
    //     console.log('=== fetch ===')
    //     console.log(res);
    //     return res.text();
    //   })
    //   .then(res => {
    //     console.log('=== fetch res ===')
    //     console.log(res)
    //     this.setState({value: res})
    //   })
  }

  render(){
    const serverList = [8, 16, 19]
    const serverName = {
      1: '横须贺镇守府',
      2: '吴镇守府',
      3: '佐世保镇守府',
      4: '舞鹤镇守府',
      5: '大凑警备府',
      6: '特鲁克泊地',
      7: '林加泊地',
      8: '拉包尔基地',
      9: '肖特兰泊地',
      10: '布因基地',
      11: '塔威塔威泊地',
      12: '伯劳泊地',
      13: '文莱泊地',
      14: '单冠湾泊地',
      15: '幌筵泊地',
      16: '宿毛湾泊地',
      17: '鹿屋基地',
      18: '岩川基地',
      19: '佐伯湾泊地',
      20: '柱岛泊地',
    }
    const data = JSON.parse(this.state.value)
    console.log(data)
    return(
      <div>
        {
          serverList.map((server, key) =>
            <button key={key} value={server} onClick={this.handleClick}>{serverName[server]}</button>
          )
        }
        <br />
        {this.state.value}
      </div>
    )
  }
}