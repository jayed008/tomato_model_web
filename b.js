new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","a.js");// 在这里引入了a.js
document.body.appendChild(new_element);
 function b()  {
     var aa=a1(1,a(2));
	 var str1=JSON.stringify(aa)+'friends'
	 alert(str1);
 }