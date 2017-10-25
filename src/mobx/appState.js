import { observable, action } from 'mobx';

let appState = observable({
  allData: '这里没有数据',
  serverId: 0,
  antdOption: {
    collapsed: false
  },
})

appState.handleCollapsed = action(() => {
  appState.antdOption.collapsed = !appState.antdOption.collapsed;
})

export default appState