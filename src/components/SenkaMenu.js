import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { observer } from "mobx-react";
import ServerList from "../config/serverList"
const SubMenu = Menu.SubMenu;

@observer
export default class SenkaMenu extends React.Component {
  selectServer = (e) => {
    console.log(e)
    this.props.appState.handleSelectServer(e.key);
  }
  render() {
    console.log('update for menu')
    console.log(this.props.appState)
    return (
      <Menu
        theme="dark"
        mode="inline"
        inlineCollapsed={this.props.appState.antdOption.collapsed}
        defaultOpenKeys={['sub1']}
        onClick={this.selectServer}
      >
        <SubMenu
          key="sub1"
          title={<span><Icon type="appstore" /><span>选择服务器</span></span>}
        >
          {ServerList.map(server => {
            return (
              <Menu.Item key={server.serverId}>{server.serverName}</Menu.Item>
            )
          })}
        </SubMenu>
      </Menu>
    )
  }
}