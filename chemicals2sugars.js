
element_funs1=document.createElement("script");
element_funs1.setAttribute("type","text/javascript");
element_funs1.setAttribute("src","./functions.js");// 在这里引入了./functions.js
document.body.appendChild(element_funs1);

function main1step(){			//可加入环境控制参数，如日照时长、日照强度（p[0]）、
var tspan=new Array(0,24*3600);
var h=1;

var t=create1dArrayFT(0,tspan[1],h);
const ca=[4.5e-3,9e-3,1.34e-2,1.8e-2,2.25e-2,2.7e-2,3e-2,5e-2,6e-2];
const x0=[75e-4,112e-4,200e-6,1.34e-2,200e-6,200e-6,200e-6,0];
const p1=[1e8,2e-2,1e0,1e0,1e20,1.34e-2,75e-4,112e-4,1e-3];
const p2=[0  ,2e-3,1e0,1e0,1e20,1.34e-2,75e-4,112e-4,1e-3];

// var x=fun.zeros(t.length,x0.length);
// x[0]=x0;
var x=x0;
//选择第几个Ca候选值
var Ca=ca[7];
x[3]=Ca;

var jsonarr =new Array();
var n=0;

for(n;n<12*3600;n++){
	var p=p1; 
	p[5]=Ca;
	//p[1]= p[1]* Math.sin(2*3.14*(n/(3600*24)));
	var k1=bigfun(x,p);
	var k2=bigfun(add2Array(x,multiplyNumToArray(k1,h/2)),p);
	var k3=bigfun(add2Array(x,multiplyNumToArray(k2,h/2)),p);
	var k4=bigfun(add2Array(x,multiplyNumToArray(k3,h)),p);
	x=add2Array(x,multiplyNumToArray(add2Array(add2Array(k1,k4),multiplyNumToArray(add2Array(k2,k3),2)),h/6));	
	if(n%100==0){
		//fs.appendFile("xMatrix.json",'"'+JSON.stringify(n)+'":'+ JSON.stringify(x)+',\n',function(){});	
		jsonarr.push('"'+JSON.stringify(n)+'":'+ JSON.stringify(x)+',\n');
	}

}

for(n;n<24*3600;n++){
	var p=p2; 
	p[5]=Ca;
	var k1=bigfun(x,p);
	var k2=bigfun(add2Array(x,multiplyNumToArray(k1,h/2)),p);
	var k3=bigfun(add2Array(x,multiplyNumToArray(k2,h/2)),p);
	var k4=bigfun(add2Array(x,multiplyNumToArray(k3,h)),p);
	x=add2Array(x,multiplyNumToArray(add2Array(add2Array(k1,k4),multiplyNumToArray(add2Array(k2,k3),2)),h/6));	
	if(n%100==0&&jsonarr.length!=864){
		//fs.appendFile("xMatrix.json",'"'+JSON.stringify(n)+'":'+ JSON.stringify(x)+',\n',function(){});	
		jsonarr.push('"'+JSON.stringify(n)+'":'+ JSON.stringify(x)+',\n');		
	}
	if(jsonarr.length==864){
		jsonarr.push('"'+JSON.stringify(n)+'":'+ JSON.stringify(x)+'\n');
	}
}


//fs.appendFile("xMatrix.json",'}',function(){});	
console.log(jsonarr.length);
var jsonstr=jsonarr.join(""); 
var jsonstr='{'+jsonstr+'}';		//为json字符串对象

window.localStorage.setItem("xMatrix",jsonstr);
return x;
}

function bigfun(xx,pp){
var s =[];
	s[0]=2*Math.pow(xx[0],2)*Math.pow(xx[1],3)*-pp[0]+xx[5]*(pp[6]-xx[0])*pp[3];         //ADP
	s[1]=3*Math.pow(xx[0],2)*Math.pow(xx[1],3)*-pp[0]+xx[4]*(pp[7]-xx[1])*pp[2]+3*Math.pow(xx[6],5)*Math.pow(pp[7]-xx[1],3)*pp[4]; //NADP)+
	s[2]=xx[2]*xx[3]*-pp[1]*3e-4+3*Math.pow(xx[6],5)*Math.pow(pp[7]-xx[1],3)*pp[4];           //RUBP
	s[3]=xx[2]*xx[3]*-pp[1]+(pp[5]-xx[3])*pp[8];                                        //Ci
	s[4]=2*xx[2]*xx[3]*pp[1]+xx[4]*(pp[7]-xx[1])*-pp[2];                                 //PGA
	s[5]=xx[4]*(pp[7]-xx[1])*pp[2]+xx[5]*(pp[6]-xx[0])*-pp[3];                            //DPGA
	s[6]=xx[5]*(pp[6]-xx[0])*pp[3]+6*Math.pow(xx[6],5)*Math.pow(pp[7]-xx[1],3)*-pp[4];    //PGAld
	s[7]=Math.pow(xx[6],5)*Math.pow(pp[7]-xx[1],3)*pp[4]/4;		                       //Suagr
	
	// for(var j=0;j<8;j++){
		// s[j]=s[j].toPrecision(20);
		// s[j]=parseFloat(s[j]);
	// }
	//console.log(s);
return s;
}
