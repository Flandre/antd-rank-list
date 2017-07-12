import React, { Component } from 'react';

export default class SenkaRank extends Component {
  constructor(){
    super();
    this.state = {
      value: 0
    }
  }

  handleClick = e =>{
    this.setState({
      value: this.state.value + 2
    }, () => {
      console.log('click: ' + this.state.value)
    })
  }

  render(){
    return(
      <div>
        <button onClick={this.handleClick}>get</button>
      </div>
    )
  }
}