import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { action } from 'mobx'
import { observer } from "mobx-react";
import SenkaMenu from "./SenkaMenu"
const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

@observer
export default class MainLayout extends React.Component {
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.props.appState.handleCollapsed();
  }
  render() {
    console.log('update')
    console.log(this.props.appState)
    return (
      <Layout>
        <Header className="header" style={{ position: 'fixed', width: '100%' }}>
          <h2 style={{ color: '#fff' }}>测试测试</h2>
        </Header>
        <Layout style={{ paddingTop: 64 , height: '100vh'}}>
          <Sider
            collapsible
            collapsed={this.props.appState.antdOption.collapsed}
            onCollapse={this.onCollapse}
          >
            <SenkaMenu appState={this.props.appState}/>
          </Sider>
          <Layout>
            <Content>
              <div style={{ padding: 24, background: '#fff', minHeight: '360px' }}>
                shikong is baka.
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}