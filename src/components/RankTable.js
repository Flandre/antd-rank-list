import React, { Component } from 'react';
import { observer } from "mobx-react";
import { serverName } from "../config/serverList"
import { TIME_OUT } from "../config/globalSetting"
import axios from "axios"
import { Icon, Alert } from 'antd';

@observer
export default class RankTable extends React.Component {
  onClose = e => {
    this.props.appState.setErrorMessage('')
    this.props.appState.handleDataPending('free')
  }
  render() {
    let status = ''
    if(this.props.appState.serverState === 'pending' && this.props.appState.serverId) {
      console.log('=== fetch start ===')
      axios.get('http://124.65.37.154:12450/api/calrank', {
        params: {
          server: this.props.appState.serverId
        },
        timeout: TIME_OUT,
        onDownloadProgress: function(e){
          console.log(e)
        }
      })
        .then(response => {
          console.log('=== fetch success ===')
          console.log(response.data)
          this.props.appState.handleDataPending('success');
        })
        .catch(error => {
          console.log('=== fetch error ===')
          console.log(error)
          this.props.appState.setErrorMessage(error.toString())
          this.props.appState.handleDataPending('error');
        })
    }
    switch(this.props.appState.serverState){
      case 'free':
        status = ''
        break
      case 'pending':
        status = <Alert message={<span>请求数据中<Icon type="loading" style={{marginLeft: '10px'}}/></span>} type="info" showIcon />
        break
      case 'error':
        status = <Alert
          message="请求失败"
          description={this.props.appState.errMsg}
          type="error"
          showIcon
          closable
          onClose={this.onClose}
        />
        break
      case 'success':
        status = <Alert message="请求成功" type="success" showIcon />
        break
    }
    return(
      <div>
        {status}
        <p>{this.props.appState.serverId ? `您选择的是：${serverName[this.props.appState.serverId]}` : '请选择服务器'}</p>
      </div>
    )
  }
}