import React, { Component } from 'react';
import { observer } from "mobx-react";
import { serverName } from "../config/serverList"

@observer
export default class RankTable extends React.Component {
  render() {
    console.log(this.props.appState.serverId)
    return(
      <div>
        <p>shikong is baka.</p>
        <p>您选择的是：{serverName[this.props.appState.serverId]}</p>
      </div>
    )
  }
}