import React, { Component } from 'react';
import { observer } from "mobx-react";
import { serverName } from "../config/serverList"
import { TIME_OUT } from "../config/globalSetting"
import axios from "axios"
import { Icon } from 'antd';

@observer
export default class RankTable extends React.Component {
  render() {
    if(this.props.appState.isPending && this.props.appState.serverId) {
      console.log('=== fetch start ===')
      axios.get('http://124.65.37.154:12450/api/calrank', {
        params: {
          server: this.props.appState.serverId
        },
        timeout: TIME_OUT,
      })
        .then(response => {
          this.props.appState.handleDataPending('success');
          console.log(response.data)
          console.log('=== fetch success ===')
        })
        .catch(error => {
          this.props.appState.handleDataPending('error');
          console.log(error)
          console.log('=== fetch error ===')
        })
    }
    let status = ''
    switch(this.props.appState.serverState){
      case 'free':
        status = '空闲'
        break
      case 'pending':
        status = '请求中...'
        break
      case 'error':
        status = '请求失败'
        break
      case 'success':
        status = '请求成功'
        break
    }
    return(
      <div>
        <p>服务器状态：{this.props.appState.serverState === 'pending' ? <Icon type="loading" /> : ''}{status}</p>
        <p>{this.props.appState.serverId ? `您选择的是：${serverName[this.props.appState.serverId]}` : '请选择服务器'}</p>
      </div>
    )
  }
}