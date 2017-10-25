import { observable, action } from 'mobx';

let appState = observable({
  allData: '这里没有数据',
  serverId: 0,
  antdOption: {
    collapsed: false
  },
})

/* 控制menu折叠 */
appState.handleCollapsed = action(() => {
  appState.antdOption.collapsed = !appState.antdOption.collapsed;
})

/* 控制服务器选择 */
appState.handleSelectServer = action(id => {
  appState.serverId = id;
})

export default appState