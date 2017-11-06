import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { observer } from "mobx-react";
import ServerList from "../config/serverList"
const SubMenu = Menu.SubMenu;

@observer
export default class SenkaMenu extends React.Component {
  selectServer = (e) => {
    this.props.appState.handleSelectServer(e.key);
    this.props.appState.handleDataPending('pending');
    this.props.appState.setRankData('');
  }
  render() {
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
          disabled={this.props.appState.isPending}
        >
          {ServerList.map(server => {
            return (
              <Menu.Item
                key={server.serverId}
                disabled={this.props.appState.isPending}
              >
                {server.serverName}
              </Menu.Item>
            )
          })}
        </SubMenu>
      </Menu>
    )
  }
}