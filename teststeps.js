
element_m1=document.createElement("script");
element_m1.setAttribute("type","text/javascript");
element_m1.setAttribute("src","./chemicals2sugars.js");// 在这里引入了./ctions.js
document.body.appendChild(element_m1);

element_m2=document.createElement("script");
element_m2.setAttribute("type","text/javascript");
element_m2.setAttribute("src","./sugars2weight.js");// 在这里引入了./step2/step2ctions.js
document.body.appendChild(element_m2);

//////////////////////
//测试第一步的x返回值//
//////////////////////
function m1(){
var x=main1step();	
alert(x[7]*12*48);	//每天被同化的CO2的重量（g）
}
//////////////////////
//测试第二步的x返回值//
//////////////////////
function m2(){
var [a,b,c]=main2step();	
alert(c[142]);	  //各部分累计的干重
alert(b[142][0]); //增加的总叶面积
}



