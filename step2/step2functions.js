

element_funs2f=document.createElement("script");
element_funs2f.setAttribute("type","text/javascript");
element_funs2f.setAttribute("src","./functions.js");// 在这里引入了./functions.js
document.body.appendChild(element_funs2f);

var t=[0,0,0,0,0];
var partdis=[[0.084, 0.251, 0.665, 0], [0.063, 0.204, 0.654, 0.079],[0.034, 0.15, 0.409, 0.407], [0.01, 0.089, 0.305, 0.596]];
var yt=[0,0,0,0];
var area =zeros(200,1);
area[0][0] = 0.05;
var weight2area=[31.3, 32.2, 34.5, 35.7];
var weight=zeros(200, 4);
weight[0]=[1, 1, 2, 0];
var count=0;
var p = '';
var tempyield=0;
var plantarea=1;

function growth(tp, Tp, PND, i){
	
	
	if(tp >= Tp[0] && tp < Tp[1]){ 		// 发芽期
		p = 'p1';
		t[0] += 1;
		count = 3;
	}
	if(tp >= Tp[1] && tp < Tp[2]){  // 苗期
		p = 'p2';
		tempyield=TDRW(PND, p);		//每天增加的干重
		console.log(tempyield)
		yt=multiplyNumToArray(partdis[0] , tempyield);
		weight[i]=add2Array(multiplyNumToArray(yt,plantarea), weight[i-1]);
		
		//console.log(yt)
		//console.log(weight[i])
		area[i][0]=weight[i][2]/weight2area[0];
		t[1]+=1;
		count=35;
	}
	
	if(tp >= Tp[2] && tp < Tp[3]){  // 开花坐果期
		p = 'p3';
		tempyield=TDRW(PND, p);
		yt=multiplyNumToArray(partdis[1] , tempyield);
		weight[i]=add2Array(multiplyNumToArray(yt,plantarea), weight[i-1]);
		area[i][0]=weight[i][2]/weight2area[1];
		t[2]+=1;
		count=43;
	}
	
	if(tp >= Tp[3] && tp < Tp[4]){  // 结果期
		p = 'p4';
		tempyield=TDRW(PND, p);
		yt=multiplyNumToArray(partdis[2] , tempyield)
		weight[i]=add2Array(multiplyNumToArray(yt,plantarea), weight[i-1]);
		area[i][0]=weight[i][2]/weight2area[2];
		t[3]+=1;
		count=89;
	}
	
	if(tp >= Tp[4]){  // 采收期
		p = 'p5';
		tempyield=TDRW(PND, p);
		yt=multiplyNumToArray(partdis[3] , tempyield)
		weight[i]=add2Array(multiplyNumToArray(yt,plantarea), weight[i-1]);
		area[i][0]=weight[i][2]/weight2area[3];
		t[4]+=1;
		count=100;
	}
	return[yt, t, area, weight, p, count];
}

function respiration(Tmean,Tday,PGD){
    var RmTo = 0.015;
	var RpTo = 0.33;
    var Q10 = 2;
    var To = 25;
    var Rg = 0.39;
    var Rm = PGD*RmTo*Math.pow(Q10,((Tmean-To)/10));
    var RG = PGD*Rg;
	var Rp = PGD*RpTo*Math.pow(Q10,((Tday-To)/10));
	var arr = [Rm, RG, Rp];
    return arr;
}

function rte(T, period){
	var p1 = [15, 29, 35];
	var p2 = [10, 25, 35];
	var p3 = [15, 25, 35];
	var p4 = [15, 25, 35];
	var [Tb, To, Tm] = [0,0,0];
	var p = 2;
	var rte = 0;
	switch(period){
		case 'p1' :
			[Tb, To, Tm] = p1;
			break;
		case 'p2':
			[Tb, To, Tm] = p2;
			break;
		case 'p3':
			[Tb, To, Tm] = p3;
			break;
		case 'p4':
			[Tb, To, Tm] = p4;
			break;
	}
	
	if(T > Tb && T <= To){
		rte = Math.pow((T - Tb)/(To - Tb),p*Math.pow((T-To)/Tb,2));
	}
	else if(T > To && T < Tm){
		rte = Math.pow((Tm - T)/(Tm - To),p*Math.pow((T-To)/Tb,2));
	}
	else{
		rte = 0
	}
	return rte		
}

function TDRW(PND, period){

    var delta = 0.682;
	var [cf, pdm]=[];
	switch(period){
    case 'p2':
        [cf, pdm] = [[0.45, 0.45, 0.75], [0.1, 0.17, 0.73]];
		break;
    case 'p3':
        [cf, pdm] = [[0.45, 0.45, 0.75, 0.75], [0.04, 0.31, 0.62, 0.03]];
		break;
    case 'p4':
        [cf, pdm] = [[0.45, 0.45, 0.75, 0.75], [0.03, 0.33, 0.44, 0.20]];
		break;
    case 'p5':
        [cf, pdm] = [[0.45, 0.45, 0.75, 0.75], [0.02, 0.31, 0.41, 0.26]];
		break;
	}
    var ccf = dot(cf,pdm)
    
    var tdrw = delta * ccf * PND / (1-0.05);
    return tdrw;
}

