element_s2=document.createElement("script");
element_s2.setAttribute("type","text/javascript");
element_s2.setAttribute("src","./functions.js");
document.body.appendChild(element_s2);
element_s2s=document.createElement("script");
element_s2s.setAttribute("type","text/javascript");
element_s2s.setAttribute("src","./step2/step2functions.js");
document.body.appendChild(element_s2s);


function main2step(){

	//const math = require('mathjs');
	var tp =0		// 实际生理时间
	var i = 1		//从苗期开始的天数，记录各部分重量和叶面积
	var j = 0		//j==总天数
	//weight=[yroot, ystem, yleaf, yfruit]
	var ratio=0.1;
	while(true){
		// one day
		// T = 25 # everage temperature
		// PGD(每天同化的CO2的量) = 10.3360 # g CO2 m-2 d-1
		
		var Tday=[26,26,26,26,26,26,26,26,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25,23,25,26,25,28,30,31,33,26,25];
		var Tmean=addNumToArray(Tday,-4);
		var etp = [0, 3, 35, 43, 89]; //expected time of period
		var PGD = multiplyNumTo2dArray(ones(1,Tday.length),15*ratio);	//PGD(每天同化的CO2的量)==array(1,days)，以数组的形式体现
		var [Rm, RG, Rp] = respiration(Tmean[j],Tday[j],PGD[0][j])						//Rm&RG==number
		var PND = PGD[0][j] - Rm - RG - Rp; 									    //PND(每天净同化量)==number     
		//console.log(PND);
		var[yt, t, area, weight, p, count]=growth(tp, etp, PND, i); 		   //输出：yt(各部分yield)==[yroot, ystem, yleaf, yfruit];
													//	   t（各部分实际生长的天数）==[count,count,count,count];
													//	   area（叶片面积）=number; weight(各部分重量)==[yroot, ystem, yleaf, yfruit];
													//     p(时期的标志)==string;count(进程的完成度)=number；
													//输入：tp（实际生理时间）==number; etp（预期生理时间）==[0, 3, 35, 43, 89];	
													//	   PND：由PND算出TDRW; i(从苗期开始的天数)==int;
		
		 
		
		if (p != 'p5'){
			var rte_1 = rte(Tday[j], p);
			tp += rte_1;
		}
		if (p != 'p1'){
			ratio = area[i][0];
			console.log(ratio)
			console.log(i)
			i += 1;
			
		}
		if (t[4] >= 50){
			console.log('complete');
			break;
		}

		j += 1;
			console.log('j='+j)
		//console.log(i);
	}
	return [t, area, weight];
}
