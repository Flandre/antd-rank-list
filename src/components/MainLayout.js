import React, { Component } from 'react';
import { Layout } from 'antd';
import { action } from 'mobx'
import { observer } from "mobx-react";
import SenkaMenu from "./SenkaMenu"
import RankContainer from "./RankContainer"
const { Header, Content, Sider } = Layout;

@observer
export default class MainLayout extends React.Component {
  onCollapse = (collapsed) => {
    this.props.appState.handleCollapsed();
  }
  render() {
    // console.log('update>>>>>>>>>>>>>')
    // console.log(this.props.appState)
    // console.log(this.props.appState.isPending)
    // console.log(this.props.appState.serverId)
    // console.log(this.props.appState.serverState)
    // console.log(this.props.appState.rankData)
    // console.log('<<<<<<<<<<<<<update')
    return (
      <Layout>
        <Header className="header" style={{ position: 'fixed', width: '100%' }}>
          <p style={{ color: '#fff' , fontSize: '24px'}}>战果查询</p>
        </Header>
        <Layout style={{ paddingTop: 64 , height: '100vh'}}>
          <Sider
            collapsible
            collapsed={this.props.appState.antdOption.collapsed}
            onCollapse={this.onCollapse}
            style={{ marginBottom: 48 }}
            breakpoint="md"
            collapsedWidth="64"
          >
            <SenkaMenu appState={this.props.appState}/>
          </Sider>
          <Layout style={{ background: '#fff' }}>
            <Content>
              <div style={{ padding: 24, background: '#fff', minHeight: '360px' }}>
                <RankContainer appState={this.props.appState}/>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}