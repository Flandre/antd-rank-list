export const serverName = {
  1: '横须贺镇守府',
  2: '吴镇守府',
  3: '佐世保镇守府',
  4: '舞鹤镇守府',
  5: '大凑警备府',
  6: '特鲁克泊地',
  7: '林加泊地',
  8: '拉包尔基地',
  9: '肖特兰泊地',
  10: '布因基地',
  11: '塔威塔威泊地',
  12: '伯劳泊地',
  13: '文莱泊地',
  14: '单冠湾泊地',
  15: '幌筵泊地',
  16: '宿毛湾泊地',
  17: '鹿屋基地',
  18: '岩川基地',
  19: '佐伯湾泊地',
  20: '柱岛泊地',
}
let availableServer = [8, 16, 15, 18, 19]
let serverMap = {}
availableServer.forEach(ele => {
  serverMap[ele] = serverName[ele]
})
export default availableServer.map((serverId => { return {
  "serverId": serverId,
  "serverName": serverName[serverId]
}}))