
function receive(itemId){
var str2 =window.localStorage.getItem(itemId);
console.log(str2);
var xMatrixStr=window.JSON.parse(str2);  //将字符串转化为json
return xMatrixStr;		//json对象

}

