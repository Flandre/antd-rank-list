import React, { Component } from 'react'
import { observer } from "mobx-react"
import RankTable from "./RankTable"
import { serverName } from "../config/serverList"
import { TIME_OUT } from "../config/globalSetting"
import axios from "axios"
import { Icon, Alert, Switch } from 'antd'
import formatData from "./formatData"

@observer
export default class RankContainer extends React.Component {
  onClose = e => {
    this.props.appState.setErrorMessage('')
    this.props.appState.handleDataPending('free')
  }
  onChange = checked => {
    console.log(`:::::::::::::switch : ${checked}`)
    this.props.appState.handleIgnoreZ(checked)
    if(this.props.appState.rankData !== ''){
      this.props.appState.setFormatData(formatData(this.props.appState.rankData, checked))
    }
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
      })
        .then(response => {
          console.log('=== fetch success ===')
          this.props.appState.handleDataPending('success');
          console.log(response.data)
          this.props.appState.setRankData(response.data)
          this.props.appState.setFormatData(formatData(response.data, this.props.appState.ignoreZ))
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
        <p style={{ textAlign: 'left' }}>{this.props.appState.serverId ? `您选择的是：${serverName[this.props.appState.serverId]}` : '请选择服务器'}</p>
        <p>忽略未完成的Z <Switch
          defaultChecked={this.props.appState.ignoreZ}
          onChange={this.onChange}
          size="small"
        /></p>
        <RankTable appState={this.props.appState}/>
      </div>
    )
  }
}