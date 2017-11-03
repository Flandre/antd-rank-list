import { observable, action } from 'mobx';

let appState = observable({
  allData: '这里没有数据',
  serverId: 0,
  isPending: false,
  serverState: 'free',
  rankData :'',
  formatData : [],
  errMsg: '',
  ignoreZ: false,
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

/* 请求中阻止选择服务器 */
appState.handleDataPending = action(status => {
  appState.serverState = status
  switch(status){
    case 'free':
      appState.isPending = false
      break
    case 'pending':
      appState.isPending = true
      break
    case 'error':
      break
    case 'success':
      setTimeout(() => {
        appState.handleDataPending('free')
      }, 2000)
      break
  }
})

/* 显示错误信息 */
appState.setErrorMessage = action(errMsg => {
  appState.errMsg = errMsg
})

/* 保存请求数据 */
appState.setRankData = action(data => {
  appState.rankData = data
})
appState.setFormatData = action(data => {
  appState.formatData = data
})

/* 忽略z炮 */
appState.handleIgnoreZ = action(ignore => {
  appState.ignoreZ = ignore
})

export default appState