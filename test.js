window.onload = function (){
  let exList = [
    { id: 0, name: '1-5', senka: 75},
    { id: 1, name: '1-6', senka: 75},
    { id: 2, name: '2-5', senka: 100},
    { id: 3, name: '3-5', senka: 150},
    { id: 4, name: '4-5', senka: 180},
    { id: 5, name: '5-5', senka: 200},
    { id: 6, name: '6-5', senka: 250},
    { id: 7, name: 'z', senka: 350},
    { id: 8, name: 'z2', senka: 200},
  ], maxType = '', checkObjSuccess = false
  for(let i = 0; i < exList.length; i++){
    maxType += '1'
  }

  /* 遍历所有组合 */
  let groupObjs = []
  for(let i = 1; i <= parseInt(maxType, 2); i++){
    let str = i.toString(2)
    if(str.length < maxType.length){
      let tsl = str.length
      for(let j = 0; j < maxType.length - tsl; j++){
        str = '0' + str
      }
    }
    let sp = str.split(''), arr = []
    for(let k = 0; k < exList.length; k++){
      if(parseInt(sp[k])){
        arr.push(exList[k])
      }
    }
    let sum = arr.reduce((p, c) => p + c.senka, 0)
    groupObjs.push({
      sum: sum,
      arr: arr
    })
  }
  groupObjs.sort((a, b) => a.sum - b.sum)
  let checkObj = {}, sumArr = []
  // let dataX = [],dataY = []
  groupObjs.forEach(val => {
    if(!checkObj[val.sum]){
      // dataX.push(val.sub)
      sumArr.push(val.sum)
      checkObj[val.sum] = {
        groupArr: [val.arr]
      }
    } else {
      checkObj[val.sum].groupArr.push(val.arr)
    }
  })
  checkObjSuccess = true
  /*
  * checkObj = {
  *   sum : {
  *     groupArr: [
  *       [
  *         {
  *           id:
  *           name:
  *           senka:
  *         },
  *         ...
  *       ],
  *       [
  *
  *       ],
  *       ...
  *     ]
  *   }
  * }
  *
  *
  * */

  /* 检查函数 */
  const checkArr = arr => {
    if(checkObjSuccess){
      let fmtArr = initArr(arr)
      let arrSum = fmtArr.reduce((p, c) => p + c), sumGroupArr = getGroupArrForId(arrSum)
      console.log(checkObj[arrSum].groupArr)
      console.log(sumGroupArr)
    } else {
      console.log('wait check object')
      setTimeout(() => {
        checkArr(arr)
      }, 1000)
    }
  }
  const getGroupArrForId = sum => checkObj[sum].groupArr.map(group => group.map(g => g.id))
  const initArr = arr => {
    let newArr = []
    arr.forEach(val => {
      for(let i = 0; i < sumArr.length; i++){
        if(sumArr[i] > val){
          if(val < 75){
            newArr.push(75)
          } else {
            if(val == sumArr[i - 1]){
              newArr.push(sumArr[i - 1])
            } else {
              if((sumArr[i] - val) > (val - sumArr[i - 1])){
                newArr.push(sumArr[i - 1])
              } else {
                newArr.push(sumArr[i])
              }
            }
          }
          break;
        }
      }
    })
    return newArr
  }
  console.log(checkArr([101, 250, 76]))




  // for(v in checkObj){
  //   dataY.push(checkObj[v].groupArr.length)
  //   console.log(`${v}:${checkObj[v].groupArr.length}`)
  // }
  // console.log(JSON.stringify(dataX))
  // console.log(JSON.stringify(dataY))

}