import React, { Component } from 'react';
import axios from 'axios';

export default class SenkaRank extends Component {
  constructor(){
    super();
    this.state = {
      value: 0
    }
  }

  handleClick = e =>{
    console.log(e.currentTarget.value);
    // axios.get('http://124.65.37.154:12450/api/calrank?server=' + e.currentTarget.value)
    //   .then(res => {
    //     console.log('=== axios ===')
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

    fetch('http://124.65.37.154:12450/api/calrank?server=' + e.currentTarget.value)
      .then(res => {
        console.log('=== fetch ===')
        console.log(res);
        return res.text();
      })
      .then(res => {
        console.log('=== fetch res ===')
        console.log(res)
      })
  }

  render(){
    const serverList = [8, 16, 19];
    return(
      <div>
        {
          serverList.map((server, index) =>
            <button key={index} value={server} onClick={this.handleClick}>server: {server}</button>
          )
        }
        <br />
        {this.state.value}
      </div>
    )
  }
}