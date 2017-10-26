import React, { Component } from 'react';
import { observer } from "mobx-react";
import createTable from "./createTable"

@observer
export default class RankTable extends React.Component {
  render() {
    // if(this.props.appState.rankData !== ''){
    //   console.log(createTable(this.props.appState.rankData, 0, false))
    // }
    return (
      <div>
        {
          this.props.appState.rankData !== '' ?
            <div dangerouslySetInnerHTML={{__html: createTable(this.props.appState.rankData, 0, false)}}></div>
            :
            ''}
      </div>
    )
  }
}