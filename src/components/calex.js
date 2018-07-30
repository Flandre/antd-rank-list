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
]

function getEx(exlist){
  var m=1;
  r1 = [];
  for(var i=0;i<exlist.length;i++){
    var ra = getcombineEx(exlist[i]);
    m = m * ra.length;
    r1.push(ra);
  }
  var r=[];
  for(var i=0;i<m;i++){
    var k = i;
    var r2 = [];
    for(var j=0;j<r1.length;j++){
      var n = k%(r1[j].length);
      r2.push(r1[j][n]);
      k=Math.floor(k/r1[j].length);
    }
    //console.log(r2);
    var r3 = [].concat(...r2);
    var u = 0;
    var can = true;
    for(var j=0;j<r3.length;j++){
      var id = r3[j].id;
      if((u&(1<<id))==0){
        u = u + (1<<id);
      }else{
        can = false;
        break;
      }
    }
    if(can){
      var can2 = true;
      var ed = -1;
      for(var j=0;j<r3.length;j++){
        if(r3[j].id==0){
          if(ed==1){
            can2 = false;
            break;
          }
          ed = 0;
        }
        if(r3[j].id==1){
          ed = 1;
        }
      }
      if(can2){
        //console.log(r3);
        r.push(r3);
      }
    }

  }
  return r;
}

function getcombineEx(ex){
  var cex = getSingleEx(ex);
  var r = [];
  for(var i=0;i<(1<<exList.length);i++){
    var arr= [];
    var sum=0;
    for(var j=0;j<exList.length;j++){
      if(((1<<j)&i)>0){
        arr.push(exList[j]);
        sum = sum + exList[j].senka;
        if(sum>cex){
          break;
        }
      }
    }
    if(sum==cex){
      r.push(arr);
    }
  }
  return r;
}

function getSingleEx(ex,add){
  if(!add){
    add=0;
  }
  var cex = ex + add;
  var a1 = cex/5;
  var a11= Math.floor(a1);
  var a2 = a1 - a11;
  var a3 = a2>0.5?(a11+1):a11;
  var a4 = a3*5;
  var a5 = a4 - 180;
  if(a4%25==0||(a5>=75&&(a5%25==0))){
    return a4;
  }else{
    if(add==0&&a2>0.5){
      return getSingleEx(ex,-5)
    }else if(add==0&&a2<0.5){
      return getSingleEx(ex,5);
    }else{
      console.log('error:'+ex+':'+add);
    }
  }
}


module.exports={
  getEx
}