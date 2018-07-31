const {getEx} = require('./calex')

export default (data, ignore) => {
  // console.log("ignore Z:"+ignore)
  let AllData = [], { zexfrom, zexto, zexpfrom, zexpto, minmap, front } = data, now = new Date(), month = now.getMonth(), fixcount = 0
  let year=now.getYear();
  const monthOfDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const getDateNo = function(now){
    now = new Date(new Date(now).getTime()+(new Date().getTimezoneOffset()+480)*60000)
    let date = now.getDate()
    let hour = now.getHours()
    if(hour < 1){
      date = date - 1
      hour = hour + 24
    }
   return (date - 1) * 2 + (hour >= 13 ? 1 : 0)
  }
  for(let _i = 0; _i < 2; _i++){
    data.d.forEach((cur, index) => {

      /*
       * userObj:
       *
       * lno:                实际排名
       * name:               昵称
       * senka:              当前战果
       * extraSenka:         ex图战果
       * extraStartOffset:   ex图统计开始时间（timestamp，如果有）
       * extraNowOffset:     ex图统计结束时间（timestamp，如果有）
       * zCompleteMonth:     z图攻略时间（如果有）
       * z2CompleteMonth:    新三川攻略时间（如果有）
       * subSenka:           根据本月经验算出的战果
       * expStartOffset:     经验值统计开始时间（timestamp，如果有）
       * expNowOffset:       经验值统计结束时间（timestamp，如果有）
       * maxSenka:           预测最大战果
       * minSenka:           预测最小战果
       * frontex:            预测战果
       *
       */

      let { lno, type, z, exfrom, exto, expfrom, expto, exlist, ex, basets, fsenkats, subsenka, fsenka, subbase, senkalist, may, senka, name, frontex} = cur,
        zcleared = 0, userObj = {}, zComplete = z, isSuccess = false, max = _i ? AllData[index - fixcount].maxSenka : 0

      let z2cleared = 0;
      let z2Complete = -1;

      userObj.lno = lno
      userObj.name = name
      userObj.senka = senka

      frontex = frontex > 10 && frontex < 75 ? 75 : frontex

      /* 处理z炮 */
      if((Math.floor((month + 1) / 3)%4) === (Math.floor((z + 1) / 3)%4) && z >= 0){
        zcleared = 350
      }
      if (ignore || (now.getDate() === monthOfDay[now.getMonth()] && now.getHours() >= 14)){
        if(ex > 1025 && ex < 1035 && !frontex){
          zcleared = 350
          zComplete = -1
          z2cleared = 200
          z2Complete = -1
        }
        if(ex < 960 && ex > 950 && !frontex){
          zcleared = 350
          zComplete = -1
          z2cleared = 200
          z2Complete = -1
        }
        if (Math.abs(expfrom - zexfrom) < 1200000 && Math.abs(expto - zexto) < 1200000 && ex < 190) {
          zcleared = 350
          zComplete = -1
          z2cleared = 200
          z2Complete = -1
        }
        if(ex + frontex < 950){
          if(max){
            if(exlist){
              var z1c=0;
              var z2c=0;
              var z3c=0;
              var mayex = getEx(exlist);
              for(var n1=0;n1<mayex.length;n1++){
                var mayd = mayex[n1];
                for(var n2=0;n2<mayd.length;n2++){
                  var dex = mayd[n2];
                  var id = dex.id;
                  if(id==7){
                    z1c=1;
                  }
                  if(id==8){
                    z2c=1;
                  }
                }
              }
              if(z1c==0){
                zcleared = 350
                zComplete = -1
              }
              if(z2c==0){
                z2cleared = 200
                z2Complete = -1
              }


              exlist.push(frontex);
              let zc = 0
              exlist.forEach(ele => {
                var aex=parseInt(ele);
                if(aex>345&&aex<355){
                  zc = 1
                }
                if(aex>420&&aex<430){
                  zc = 1
                }
                if(aex>445&&aex<455){
                  zc = 1
                }
                if(aex>495&&aex<505){
                  zc = 1
                }
                if(aex>510){
                  zc = 1
                }
              })
              let ruex = max - senka
              let hiddenex = 1580 - ex - ruex
              if((hiddenex>345&&hiddenex<355)||hiddenex > 420){
                zc = 1
              }
              if(zc === 0){
                zcleared = 350
                zComplete = -1
              }
            }
          }
        }
      }
      /* 处理经验值 */
      userObj.subSenka = subsenka
      if (Math.abs(expfrom - zexpfrom) > 1200000 || Math.abs(expto - zexpto) > 1200000) {
        userObj.expStartOffset = new Date(expfrom)
        userObj.expNowOffset = new Date(expto)
      }

      switch (type){
        case 1:
          let ensure = 0
          if (Math.abs(exfrom - zexfrom) < 1200000 && Math.abs(exto - zexto) < 1200000) {
            userObj.extraSenka = ex
            ensure = 1
          } else {
            userObj.extraSenka = ex
            userObj.extraStartOffset = new Date(exfrom)
            userObj.extraNowOffset = new Date(exto)
          }
          if(zcleared > 0){
            userObj.zCompleteMonth = zComplete + 1
          }
          if (fsenkats === 0 && Math.abs(expfrom - zexpfrom) < 1200000) {
            userObj.maxSenka = subsenka + fsenka + 1580 - zcleared - z2cleared
            userObj.minSenka = subsenka + fsenka + 1580 - zcleared - z2cleared
          } else if (fsenkats === 0 && getDateNo(expfrom) === 0 && new Date(basets).getYear()*12+new Date(basets).getMonth() < month+year*12){
            let minsenka = fsenka + subsenka + 1580 - zcleared - z2cleared
            let maxsenka = fsenka + subsenka + subbase + 1580 - zcleared - z2cleared
            let max2 = Math.floor(minsenka + (expfrom - zexfrom) * 0.00001)
            if(max2 < maxsenka){
              maxsenka = max2
            }
            let max3 = senka + 1580 - ex - zcleared - z2cleared
            if(max3 < maxsenka){
              maxsenka=max3
            }
            userObj.maxSenka = maxsenka
            userObj.minSenka = minsenka
          } else if (ensure) {
            userObj.maxSenka = senka + 1580 - zcleared - z2cleared - ex
            userObj.minSenka = senka + 1580 - zcleared - z2cleared - ex
          } else {
            let firstExpDateNo = getDateNo(expfrom)
            userObj.minSenka = subsenka + 1580 - zcleared - z2cleared
            let maxsenkaArr = []
            maxsenkaArr.push(subsenka + minmap[firstExpDateNo] + 1580 - zcleared - z2cleared)
            maxsenkaArr.push(senka + 1580 - ex - zcleared - z2cleared)
            maxsenkaArr.push(subsenka + fsenka + 1580 - zcleared - z2cleared)
            if(new Date(basets).getMonth() + new Date(basets).getYear()*12< month+year*12){
              maxsenkaArr.push(subsenka + subbase + minmap[0] + 1580 - zcleared - z2cleared)
            }
            if(fsenkats === 0){
              maxsenkaArr.push(Math.floor(fsenka + subsenka + (expfrom - zexfrom) * 0.00001 + 1580 - zcleared - z2cleared))
            }else{
              maxsenkaArr.push(Math.floor(minmap[firstExpDateNo] + subsenka + (expfrom - zexfrom) * 0.00001 + 1580 - zcleared - z2cleared))
            }
            userObj.maxSenka = Math.max(Math.min(...maxsenkaArr),senka)
          }
          isSuccess = true
          break
        case 2:
          let length = may.length
          let senkas = senka
          if(length === 2){
            let sub1 = may[0].subsenka
            let from1 = may[0].expfrom

            let sub2 = may[1].subsenka
            let from2 = may[1].expfrom

            let maxsub = may[0]
            let minsub = may[1]
            if(sub1<sub2){
              maxsub = may[1]
              minsub = may[0]
            }

            let ts2senka = {}
            for(let k=senkalist.length-1;k>=0;k--){
              let senkaD = senkalist[k]
              let sts = senkaD.ts
              if(ts2senka[sts]){
                ts2senka[sts].push(senkaD)
              }else{
                ts2senka[sts]=[senkaD]
              }
            }
            let tskeys = Object.keys(ts2senka).sort(function(a,b){return parseInt(a)-parseInt(b)});
            let last = ts2senka[tskeys[tskeys.length-1]];
            let first = ts2senka[tskeys[0]]
            if(last.length === 2){
              let last1 = last[0]
              let last2 = last[1]
              let first1 = first[0]
              let first2 = first[1]
              let maxf = first1
              let minf = first2
              if(first2){
                if(first.senka<first2.senka){
                  maxf = first2
                  minf = first1
                }
              }
              let max = last1
              let min = last2
              if(last1.senka<last2.senka){
                max = last2
                min = last1
              }
              if(senkas === max.senka){
                userObj.subSenka = maxsub.subsenka
                if(maxf.ts === 0){
                  let maxsenka = maxf.senka + maxsub.subsenka + 1580 - zcleared - z2cleared
                  userObj.maxSenka = maxsenka
                  userObj.minSenka = maxsenka
                }else{
                  let maxsenka1 =maxf.senka+maxsub.subsenka+1580-zcleared - z2cleared
                  let firstExpDateNo = getDateNo(maxsub.expfrom)
                  let maxsenka2 = minmap[firstExpDateNo]+maxsub.subsenka+1580-zcleared - z2cleared
                  let maxsenka = maxsenka1
                  if(maxsenka2<maxsenka){
                    maxsenka=maxsenka2
                  }
                  let minsenka = maxsub.subsenka+1580-zcleared - z2cleared
                  userObj.maxSenka = maxsenka
                  userObj.minSenka = minsenka
                }
                let subrank = max.senka-maxf.senka
                let ex = subrank- maxsub.subsenka
                if (Math.abs(maxsub.expfrom - zexfrom) < 1200000 && Math.abs(maxsub.expto - zexto) < 1200000) {
                  userObj.extraSenka = ex
                } else {
                  userObj.extraSenka = ex
                  userObj.extraStartOffset = new Date(maxsub.expfrom)
                  userObj.extraNowOffset = new Date(maxsub.expto)
                }
                if(zcleared > 0){
                  userObj.zCompleteMonth = zComplete + 1
                }
                if(z2cleared > 0){
                  userObj.z2CompleteMonth = z2Complete + 1
                }
              }else{
                userObj.subSenka = minsub.subsenka
                if(minf && minf.ts === 0){
                  let expect = minf.senka + minsub.subsenka + 1580 - zcleared - z2cleared
                  userObj.maxSenka = expect
                  userObj.minSenka = expect
                }else{
                  let firstExpDateNo = getDateNo(minsub.expfrom)
                  let maxsenka = minmap[firstExpDateNo] + minsub.subsenka + 1580 - zcleared - z2cleared
                  let minsenka = minsub.subsenka + 1580 - zcleared - z2cleared
                  userObj.maxSenka=maxsenka
                  userObj.minSenka=minsenka
                }
                if(minf){
                  let subrank = min.senka-minf.senka
                  let ex = subrank-minsub.subsenka
                  if (Math.abs(minsub.expfrom - zexfrom) < 1200000 && Math.abs(minsub.expto - zexto) < 1200000) {
                    userObj.extraSenka = ex
                  } else {
                    userObj.extraSenka = ex
                    userObj.extraStartOffset = new Date(minsub.expfrom)
                    userObj.extraNowOffset = new Date(minsub.expto)
                  }
                  if(zcleared>0){
                    userObj.zCompleteMonth = zComplete + 1
                  }
                  if(z2cleared>0){
                    userObj.z2CompleteMonth = z2Complete + 1
                  }
                }else{
                  userObj.extraSenka = 'unknown2'
                }
              }
              isSuccess = true
            }
          }
          break
        case 3:
          userObj.extraSenka = 'unknown'
          let firstExpDateNo = getDateNo(expfrom),
            maxsenkaArr = [
              subsenka + minmap[firstExpDateNo] + 1580 - zcleared - z2cleared,
              senka + 1580 - ex - zcleared - z2cleared || 99999,
              subsenka + fsenka + 1580 - zcleared - z2cleared,
              99999
            ]
          if(new Date(basets).getMonth() + new Date(basets).getYear()*12< month+year*12){
            maxsenkaArr.push(subsenka + subbase + 1580 - zcleared - z2cleared)
          }
          userObj.maxSenka = Math.min(...maxsenkaArr)
          userObj.minSenka = subsenka + 1580 - zcleared - z2cleared
          isSuccess = true
          break
      }
      if(frontex){
        userObj.maxSenka -= frontex
        userObj.minSenka -= frontex
        userObj.frontex = frontex
      }
      /* todo: 可能会导致不一致 fix*/
      if(_i){
        if(isSuccess){
          AllData[index - fixcount] = userObj
        } else {
          fixcount ++
        }
      } else {
        if(isSuccess){
          AllData.push(userObj)
        }
      }
      // if(isSuccess){
      //   if(_i){
      //     AllData[index] = userObj
      //   } else {
      //   }
      // }
    })
  }

  return AllData
}