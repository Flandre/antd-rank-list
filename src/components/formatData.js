export default (data, ignore) => {
  console.log("ignore Z:"+ignore)
  let AllData = [], { zexfrom, zexto, zexpfrom, zexpto, minmap, front }, now = new Date(), month = now.getMonth()
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
  data.d.forEach((cur, index) => {

    /*
     * userObj:
     *
     * lno:                实际排名
     * extraSenka:         ex图战果
     * extraStartOffset:   ex图统计开始时间（timestamp，如果有）
     * extraNowOffset:     ex图统计结束时间（timestamp，如果有）
     * zCompleteMonth:     z图攻略时间（如果有）
     * subSenka:           根据本月经验算出的战果
     * expStartOffset:     经验值统计开始时间（timestamp，如果有）
     * expNowOffset:       经验值统计结束时间（timestamp，如果有）
     * maxSenka:           预测最大战果
     * minSenka:           预测最小战果
     *
     */

    let { lno, type, z, exfrom, exto, expfrom, expto, exlist, ex, max, basets, fsenkats, subsenka, fsenka, subbase, senkalist, may, /*senka*/} = cur,
      zcleared = 0, userObj = {}, zComplete = z, isSuccess = false

    userObj.lno = lno

    /* 处理z炮 */
    if(Math.floor((month + 1) / 3) === Math.floor((z + 1) / 3) && z >= 0){
      zcleared = 350
    }
    if(ignore || (now.getDate() === monthOfDay[now.getMonth()] && now.getHours() >= 14)){
      if(ex > 1025 && ex < 1035){
        zcleared = 350
        zComplete = -1
      }
      if(ex < 960 && ex > 950){
        zcleared = 350
        zComplete = -1
      }
      if (Math.abs(expfrom - zexfrom) < 1200000 && Math.abs(expto - zexto) < 1200000 && ex < 950) {
        zcleared = 350
        zComplete = -1
      }
      if(ex < 950){
        if(max){
          if(exlist){
            let zc = 0
            exlist.forEach(ele => {
              if(parseInt(ele) > 420){
                zc = 1
              }
            })
            let ruex = max - senka;
            let hiddenex = 1380 - ex - ruex
            if(hiddenex > 420){
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
        let ensure = 0;
        if (Math.abs(exfrom - zexfrom) < 1200000 && Math.abs(exto - zexto) < 1200000) {
          userObj.extraSenka = ex
          ensure = 1;
        } else {
          userObj.extraSenka = ex
          userObj.extraStartOffset = new Date(exfrom)
          userObj.extraNowOffset = new Date(exto)
        }
        if(zcleared>0){
          userObj.zCompleteMonth = zComplete + 1
        }
        if (fsenkats === 0 && Math.abs(expfrom - zexpfrom) < 1200000) {
          userObj.maxSenka = subsenka + fsenka + 1380 - zcleared
          userObj.minSenka = subsenka + fsenka + 1380 - zcleared
        } else if (fsenkats === 0 && getDateNo(expfrom) === 0 && new Date(basets).getMonth() < month){
          let minsenka = fsenka + subsenka + 1380 - zcleared
          let maxsenka = fsenka + subsenka + subbase + 1380 - zcleared
          let max2 = Math.floor(minsenka + (expfrom - zexfrom) * 0.00001)
          if(max2 < maxsenka){
            maxsenka = max2
          }
          let max3 = senka + 1380 - ex - zcleared;
          if(max3 < maxsenka){
            maxsenka=max3
          }
          userObj.maxSenka = maxsenka;
          userObj.minSenka = minsenka;
        } else if (ensure) {
          userObj.maxSenka = senka + 1380 - zcleared - ex
          userObj.minSenka = senka + 1380 - zcleared - ex
        } else {
          let firstExpDateNo = getDateNo(expfrom)
          userObj.minSenka = subsenka + 1380 - zcleared
          let maxsenkaArr = []
          maxsenkaArr.push(subsenka + minmap[firstExpDateNo] + 1380 - zcleared)
          maxsenkaArr.push(senka + 1380 - ex - zcleared)
          maxsenkaArr.push(subsenka + fsenka + 1380 - zcleared)
          if(new Date(basets).getMonth()<month){
            maxsenkaArr.push(subsenka + subbase + 1380 - zcleared)
          }
          if(fsenkats === 0){
            maxsenkaArr.push(Math.floor(fsenka + subsenka + (expfrom - zexfrom) * 0.00001 + 1380 - zcleared))
          }else{
            maxsenkaArr.push(Math.floor(minmap[firstExpDateNo] + subsenka + (expfrom - zexfrom) * 0.00001 + 1380 - zcleared))
          }
          userObj.maxSenka = Math.min(...maxsenkaArr)
        }
        isSuccess = true
        break
      case 2:
        let length = may.length;
        let senkas = senka;
        if(length === 2){
          let sub1 = may[0].subsenka;
          let from1 = may[0].expfrom;

          let sub2 = may[1].subsenka;
          let from2 = may[1].expfrom;

          let maxsub = may[0];
          let minsub = may[1];
          if(sub1<sub2){
            maxsub = may[1];
            minsub = may[0];
          }

          let ts2senka = {};
          for(let k=senkalist.length-1;k>=0;k--){
            let senkaD = senkalist[k];
            let sts = senkaD.ts;
            if(ts2senka[sts]){
              ts2senka[sts].push(senkaD);
            }else{
              ts2senka[sts]=[senkaD];
            }
          }
          let tskeys = Object.keys(ts2senka).sort(function(a,b){return parseInt(a)-parseInt(b)});
          let last = ts2senka[tskeys[tskeys.length-1]];
          let first = ts2senka[tskeys[0]];
          if(last.length==2){
            let last1 = last[0];
            let last2 = last[1];
            let first1 = first[0];
            let first2 = first[1];
            let maxf = first1;
            let minf = first2;
            if(first2){
              if(first.senka<first2.senka){
                maxf = first2;
                minf = first1;
              }
            }
            let max = last1;
            let min = last2;
            if(last1.senka<last2.senka){
              max = last2;
              min = last1;
            }
            if(senkas==max.senka){
              senka.expfrom = maxsub.expfrom;
              senka.expto = maxsub.expto;
              senka.subsenka = maxsub.subsenka;
              if(maxf.ts==0){
                let maxsenka = maxf.senka+maxsub.subsenka+1380-zcleared;
                senka.max=maxsenka;
                senka.min=maxsenka;
              }else{
                let maxsenka1 =maxf.senka+maxsub.subsenka+1380-zcleared;
                let firstExpDateNo = getDateNo(maxsub.expfrom);
                let maxsenka2 = minmap[firstExpDateNo]+maxsub.subsenka+1380-zcleared;
                let maxsenka = maxsenka1;
                if(maxsenka2<maxsenka){
                  maxsenka=maxsenka2;
                }
                let minsenka = maxsub.subsenka+1380-zcleared;
                senka.max = maxsenka;
                senka.min = minsenka;
              }
              let subrank = max.senka-maxf.senka;
              let ex = subrank-maxsub.subsenka;
              if (Math.abs(expfrom - zexfrom) < 1200000 && Math.abs(expto - zexto) < 1200000) {
                exstr = ex;
              } else {
                exstr = exstr + ex + '    (' + new Date(expfrom).toLocaleString() + '----' + new Date(expto).toLocaleString() + ')';
              }
              if(zcleared>0){
                exstr = exstr + '('+(z+1)+'月已完成Z作战)';
              }
            }else{
              senka.expfrom = minsub.expfrom;
              senka.expto = minsub.expto;
              senka.subsenka=minsub.subsenka;
              if(minf&&minf.ts==0){
                let expect = minf.senka+minsub.subsenka+1380-zcleared;
                senka.max = expect;
                senka.min = expect;
              }else{
                let firstExpDateNo = getDateNo(minsub.expfrom);
                let maxsenka = minmap[firstExpDateNo]+minsub.subsenka+1380-zcleared;
                let minsenka = minsub.subsenka+1380-zcleared;
                senka.max=maxsenka;
                senka.min=minsenka;
              }
              if(minf){
                let subrank = min.senka-minf.senka;
                let ex = subrank-minsub.subsenka;
                if (Math.abs(expfrom - zexfrom) < 1200000 && Math.abs(expto - zexto) < 1200000) {
                  exstr = ex;
                } else {
                  exstr = exstr + ex + '    (' + new Date(expfrom).toLocaleString() + '----' + new Date(expto).toLocaleString() + ')';
                }
                if(zcleared>0){
                  exstr = exstr + '('+(z+1)+'月已完成Z作战)';
                }
              }else{
                exstr = 'unknown2';
              }

            }
          }
        }
        break
      case 3:
        userObj.extraSenka = 'unknown';
        let firstExpDateNo = getDateNo(expfrom),
          maxsenkaArr = [
            subsenka + minmap[firstExpDateNo] + 1380 - zcleared,
            senka + 1380 - ex - zcleared,
            subsenka + fsenka + 1380 - zcleared,
            99999
          ]
        if(new Date(basets).getMonth() < month){
          maxsenkaArr.push(subsenka + subbase + 1380 - zcleared)
        }
        userObj.maxSenka = Math.min(...maxsenkaArr)
        userObj.minSenka = subsenka + 1380 - zcleared
        isSuccess = true
      break
    }
  })

}