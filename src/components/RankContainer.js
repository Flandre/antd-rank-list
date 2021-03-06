import React, { Component } from 'react'
import { observer } from "mobx-react"
import RankTable from "./RankTable"
import RankForecast from "./RankForecast"
import RankChart from "./RankChart"
import RankFeature from "./RankFeature"
import { serverName } from "../config/serverList"
import { TIME_OUT } from "../config/globalSetting"
import axios from "axios"
import { Row, Col, Icon, Alert, Switch } from 'antd'
import formatData from "./formatData"
import img from './img/eg.png'

@observer
export default class RankContainer extends React.Component {
  onClose = e => {
    this.props.appState.setErrorMessage('')
    this.props.appState.handleDataPending('free')
  }
  onChange = checked => {
    // console.log(`:::::::::::::switch : ${checked}`)
    this.props.appState.handleIgnoreZ(checked)
    if(this.props.appState.rankData !== ''){
      this.props.appState.setFormatData(formatData(this.props.appState.rankData, checked))
    }
  }
  render() {
    let status = ''
    if(this.props.appState.serverState === 'pending' && this.props.appState.serverId) {
      // console.log('=== fetch start ===')
      axios.get('http://124.65.37.154:12450/api/calrank', {
        params: {
          server: this.props.appState.serverId
        },
        timeout: TIME_OUT,
      })
        .then(response => {
          if(response.data === 'error'){
            throw new Error('时空炸了')
          } else {
            // console.log('=== fetch success ===')
            this.props.appState.handleDataPending('success');
            // console.log(response.data)
            this.props.appState.setRankData(response.data)
            this.props.appState.setFormatData(formatData(response.data, this.props.appState.ignoreZ))
          }
        })
        .catch(error => {
          // console.log('=== fetch error ===')
          // console.log(error)
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
          description={
            <div>
              ${this.props.appState.errMsg}<br/>
              如果请求失败，请检查浏览器是否拦截不安全内容，如下图(以chrome为例):<br/>
              <img src={img}/>
            </div>}
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
        <p>
          <span style={{ fontSize: '24px' }}>{this.props.appState.serverId ? `${serverName[this.props.appState.serverId]}` : '请选择服务器'}</span>
          <span>{this.props.appState.rankData ? `  (统计时间: ${new Date(this.props.appState.rankData.ts).toLocaleString()})` : ''}</span>
        </p>
        <p style={{ marginBottom: '10px' }}>忽略未完成的Z作战 <Switch
          defaultChecked={this.props.appState.ignoreZ}
          onChange={this.onChange}
          size="small"
        /></p>
        <Row type="flex" gutter={16} style={{ marginBottom: '10px', alignItems: 'stretch'}}>
          <Col span={12} className="gutter-row">
            <RankForecast appState={this.props.appState}/>
          </Col>
          <Col span={12} className="gutter-row">
            <RankChart appState={this.props.appState}/>
          </Col>
        </Row>
        <RankTable appState={this.props.appState}/>
      </div>
    )
  }
}