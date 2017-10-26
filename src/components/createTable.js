export default (data,sorttype,ignore) =>{
  console.log("ignore:"+ignore)
  var monthOfDay=[31,28,31,30,31,30,31,31,30,31,30,31];
  const getDateNo = function(now){
    now = new Date(new Date(now).getTime()+(new Date().getTimezoneOffset()+480)*60000)
    var date = now.getDate()
    var hour = now.getHours()
    if(hour<1){
      date = date -1
      hour = hour + 24
    }
    const no = (date-1)*2+((hour>=13)?1:0)
    return no
  }

  const getRankDateNo = function(now){
    now = new Date(new Date(now).getTime()+(new Date().getTimezoneOffset()+480)*60000)
    var date = now.getDate()
    var hour = now.getHours()
    if(hour<2){
      date = date -1
      hour = hour + 24
    }
    const no = (date-1)*2+((hour>=14)?1:0)
    return no
  }
  var result = data.r;
  if(true) {
    var zexfrom = data.exfrom;
    var zexto = data.exto;
    var zexpfrom = data.expfrom;
    var zexpto = data.expto;
    var minmap = data.min;
    var frontmap = data.front;
    var now = new Date();
    var month = now.getMonth();
    var h = '统计时间：' + new Date(data.ts).toLocaleString();
    h = h + '<table class="table table-bordered table-striped table-hover">';
    h = h + '<thead><td class="sort-disable">排名(当前/榜单)</td><td class="sort-disable"></td>';
    h = h + '<td class="sort-sub"><div onclick="sortby(0);">当前'+(sorttype==0?'↓':'')+'</div></td>';
    h = h + '<td class="sort-sub"><div onclick="sortby(3);">最大'+(sorttype==3?'↓':'')+'</div></td>';
    h = h + '<td class="sort-sub"><div onclick="sortby(4);">最小'+(sorttype==4?'↓':'')+'</div></td>';
    h = h + '<td class="sort-sub"><div onclick="sortby(1);"> 经验  (' + new Date(zexpfrom).toLocaleString() + '----' + new Date(zexpto).toLocaleString() + ')'+(sorttype==1?'↓':'')+'</div></td>';
    h = h + '<td class="sort-disable"><div>ex  (' + new Date(zexfrom).toLocaleString() + '----' + new Date(zexto).toLocaleString() + ')</div></td>';
    h = h + '<td class="sort-disable"><div>未完成ex</div></td>';
    h = h + '</thead>';
    for (var i = 0; i < data.d.length; i++) {
      var type = data.d[i].type;
      var senka = data.d[i];
      var z = data.d[i].z;
      var zcleared=0;
      var expfrom = senka.expfrom;
      var expto = senka.expto;
      var exlist = senka.exlist;
      if(Math.floor((month+1)/3)==Math.floor((z+1)/3)){
        if(z>=0){
          zcleared=350;
        }
      }
      if(ignore||(now.getDate()==monthOfDay[now.getMonth()]&&now.getHours()>=14)){
        if(senka.ex>1025&&senka.ex<1035){
          zcleared=350;
          z=-1;
        }
        if(senka.ex<960&&senka.ex>950){
          zcleared=350;
          z=-1;
        }
        if (Math.abs(expfrom - zexfrom) < 1200000 && Math.abs(expto - zexto) < 1200000 &&senka.ex<950) {
          zcleared=350;
          z=-1;
        }
        if(senka.ex<950){
          if(senka.max){
            if(exlist){
              var zc = 0;
              for(var w=0;w<exlist.length;w++){
                var xex = parseInt(exlist[w]);
                if(xex>420){
                  zc=1;
                }
              }
              var ruex = senka.max-senka.senka;
              var hiddenex = 1380-senka.ex-ruex;
              if(hiddenex>420){
                zc=1;
              }
              if(zc==0){
                zcleared=350;
                z=-1;
              }
            }
          }
        }
      }
      h = h + '<tr>';
      if (i == 5 || i == 20 || i == 100 || i == 500) {
        h = h + '<td colspan="3"> </td></tr><tr>';
      }

      h = h + '<td>' + (i + 1) + '位(' + senka.lno + '位)</td>';
      h = h + '<td>' + senka.name + '</td>';
      h = h + '<td>' + senka.senka + '</td>';

      var subsenkastr = senka.subsenka;

      var basets = senka.basets;

      if (Math.abs(expfrom - zexpfrom) > 1200000 || Math.abs(expto - zexpto) > 1200000) {
        subsenkastr = subsenkastr + '    (' + new Date(expfrom).toLocaleString() + '----' + new Date(expto).toLocaleString() + ')';
      }

      var nowsenkastr = senka.senka;
      var exstr = '';

      if (type == 1) {
        var exfrom = senka.exfrom;
        var exto = senka.exto;
        var ensure = 0;
        if (Math.abs(exfrom - zexfrom) < 1200000 && Math.abs(exto - zexto) < 1200000) {
          exstr = exstr + senka.ex;
          ensure = 1;
        } else {
          exstr = exstr + senka.ex + '    (' + new Date(exfrom).toLocaleString() + '----' + new Date(exto).toLocaleString() + ')';
        }
        if(zcleared>0){
          exstr = exstr + '('+(z+1)+'月已完成Z作战)';
        }

        if (senka.fsenkats == 0 && Math.abs(expfrom - zexpfrom) < 1200000) {
          data.d[i].except=senka.subsenka + senka.fsenka + 1380 - zcleared;
          data.d[i].max=data.d[i].except;
          data.d[i].min=data.d[i].except;
        }else if(senka.fsenkats == 0 && getDateNo(expfrom)==0 && new Date(basets).getMonth()<month){
          var minsenka = senka.fsenka+senka.subsenka+1380-zcleared;
          var maxsenka = senka.fsenka+senka.subsenka+senka.subbase+1380-zcleared;
          var max2 = Math.floor(minsenka + (expfrom-zexfrom)*0.00001);
          if(max2<maxsenka){
            maxsenka=max2;
          }
          var max3 = senka.senka + 1380 - senka.ex-zcleared;
          if(max3<maxsenka){
            maxsenka=max3;
          }
          data.d[i].max=maxsenka;
          data.d[i].min=minsenka;
        }  else if (ensure) {
          data.d[i].except=senka.senka + 1380 - zcleared - senka.ex;
          data.d[i].max=data.d[i].except;
          data.d[i].min=data.d[i].except;
        } else {
          var firstExpDateNo = getDateNo(expfrom);
          var maxsenka1 = senka.subsenka+minmap[firstExpDateNo]+1380-zcleared;
          var minsenka = senka.subsenka+1380-zcleared;
          var maxsenka2 = senka.senka + 1380 - senka.ex-zcleared;
          var maxsenka3 = senka.subsenka + senka.fsenka + 1380-zcleared;
          var maxsenka = 99999;
          if(maxsenka1<maxsenka){
            maxsenka=maxsenka1;
          }
          if(maxsenka2<maxsenka){
            maxsenka=maxsenka2;
          }
          if(maxsenka3<maxsenka){
            maxsenka=maxsenka3;
          }
          var maxsenka4 = -1;
          var maxsenka5 = -1;
          if(new Date(basets).getMonth()<month){
            maxsenka4 = senka.subsenka+senka.subbase+1380-zcleared;
            if(maxsenka4<maxsenka){
              maxsenka=maxsenka4;
            }
          }
          if(senka.fsenkats==0){
            var max6 = Math.floor(senka.fsenka+senka.subsenka+(expfrom-zexfrom)*0.00001+1380-zcleared);
            if(max6<maxsenka){
              maxsenka=max6;
            }
          }else{
            var max7 = Math.floor(minmap[firstExpDateNo]+senka.subsenka+(expfrom-zexfrom)*0.00001+1380-zcleared);
            if(max7<maxsenka){
              maxsenka=max7;
            }
          }

          data.d[i].max=maxsenka;
          data.d[i].min=minsenka;
        }

      } else if (type == 3) {
        exstr = 'unknown';
        var firstExpDateNo = getDateNo(expfrom);
        var maxsenka1 = senka.subsenka+minmap[firstExpDateNo]+1380-zcleared;
        var minsenka = senka.subsenka+1380-zcleared;
        var maxsenka2 = senka.senka + 1380 - senka.ex-zcleared;
        var maxsenka3 = senka.subsenka + senka.fsenka + 1380-zcleared;
        var maxsenka = 99999;

        if(maxsenka1<maxsenka){
          maxsenka=maxsenka1;
        }
        if(maxsenka2<maxsenka){
          maxsenka=maxsenka2;
        }
        if(maxsenka3<maxsenka){
          maxsenka=maxsenka3;
        }
        if(new Date(basets).getMonth()<month){
          var maxsenka4 = senka.subsenka+senka.subbase+1380-zcleared;
          if(maxsenka4<maxsenka){
            maxsenka=maxsenka4;
          }
        }

        data.d[i].max=maxsenka;
        data.d[i].min=minsenka;
      } else if (type == 2) {
        var senkalist = senka.senkalist;
        var maylist = senka.may;
        var length = maylist.length;
        var senkas = senka.senka;
        if(length==2){
          var sub1 = maylist[0].subsenka;
          var from1 = maylist[0].expfrom;

          var sub2 = maylist[1].subsenka;
          var from2 = maylist[1].expfrom;

          var maxsub = maylist[0];
          var minsub = maylist[1];
          if(sub1<sub2){
            maxsub = maylist[1];
            minsub = maylist[0];
          }

          var ts2senka = {};
          for(var k=senkalist.length-1;k>=0;k--){
            var senkaD = senkalist[k];
            var sts = senkaD.ts;
            if(ts2senka[sts]){
              ts2senka[sts].push(senkaD);
            }else{
              ts2senka[sts]=[senkaD];
            }
          }
          var tskeys = Object.keys(ts2senka).sort(function(a,b){return parseInt(a)-parseInt(b)});
          var last = ts2senka[tskeys[tskeys.length-1]];
          var first = ts2senka[tskeys[0]];
          if(last.length==2){
            var last1 = last[0];
            var last2 = last[1];
            var first1 = first[0];
            var first2 = first[1];
            var maxf = first1;
            var minf = first2;
            if(first2){
              if(first.senka<first2.senka){
                maxf = first2;
                minf = first1;
              }
            }
            var max = last1;
            var min = last2;
            if(last1.senka<last2.senka){
              max = last2;
              min = last1;
            }
            if(senkas==max.senka){
              senka.expfrom = maxsub.expfrom;
              senka.expto = maxsub.expto;
              senka.subsenka = maxsub.subsenka;
              if(maxf.ts==0){
                var maxsenka = maxf.senka+maxsub.subsenka+1380-zcleared;
                senka.max=maxsenka;
                senka.min=maxsenka;
              }else{
                var maxsenka1 =maxf.senka+maxsub.subsenka+1380-zcleared;
                var firstExpDateNo = getDateNo(maxsub.expfrom);
                var maxsenka2 = minmap[firstExpDateNo]+maxsub.subsenka+1380-zcleared;
                var maxsenka = maxsenka1;
                if(maxsenka2<maxsenka){
                  maxsenka=maxsenka2;
                }
                var minsenka = maxsub.subsenka+1380-zcleared;
                senka.max = maxsenka;
                senka.min = minsenka;
              }
              var subrank = max.senka-maxf.senka;
              var ex = subrank-maxsub.subsenka;
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
                var expect = minf.senka+minsub.subsenka+1380-zcleared;
                senka.max = expect;
                senka.min = expect;
              }else{
                var firstExpDateNo = getDateNo(minsub.expfrom);
                var maxsenka = minmap[firstExpDateNo]+minsub.subsenka+1380-zcleared;
                var minsenka = minsub.subsenka+1380-zcleared;
                senka.max=maxsenka;
                senka.min=minsenka;
              }
              if(minf){
                var subrank = min.senka-minf.senka;
                var ex = subrank-minsub.subsenka;
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
      }
      if(senka.max<senka.senka){
        senka.max=senka.senka;
        senka.min=senka.senka;
      }
      var max = senka.max;
      var min = senka.min;
      if(max==min){
        h=h+'<td colspan="2">'+max+'</td>';
      }else{
        h=h+'<td>'+max+'</td>';
        h=h+'<td>'+min+'</td>';
      }
      h=h+'<td>'+subsenkastr+'</td>';
      h=h+'<td>'+exstr+'</td>';
      h=h+'<td>'+(senka.max-senka.senka)+'</td>';



      h = h + '</tr>';
    }
    h = h + '</table>';
    return h
  }
}