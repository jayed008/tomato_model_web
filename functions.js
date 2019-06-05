//array操作集合 

function zeros(column,row){
	var arr = new Array();         
	for(var i=0;i<column;i++){          
			  arr[i]=new Array(i);    
			  for(var j=0;j<row;j++){   
				 arr[i][j]=0;
				}
	}
	return arr;
}

function zeros1d(n){
	var arr = new Array();             
		for(var j=0;j<n;j++){   
		 arr[j]=0;
		}
	return arr;
}


function ones(column,row){
	var arr = new Array();         
	for(var i=0;i<column;i++){          
			  arr[i]=new Array(i);    
			  for(var j=0;j<row;j++){   
				 arr[i][j]=1;
				}
	}
	return arr;
}

function create1dArrayFT(fromN,toN,step){
	var arr = new Array();
	for(var i=fromN;i<toN/step;i++){
		var j = i*step;
		j=j.toFixed(2);
		arr.push(parseFloat(j));
	}
	return arr; 
}

function addNumToArray(arr,num){
	for(var i=0;i<arr.length;i++){
		arr[i]+=num;
	}
	return arr;
}

function multiplyNumToArray(arr,num){
	var arr1 = new Array();
	for(var i=0;i<arr.length;i++){
		arr1[i]=arr[i]*num;
	}
	return arr1;
}

function multiplyNumTo2dArray(arr,num){
	var arr1=arr;
	for(var i=0;i<arr.length;i++){
		for(var j=0;j<arr[0].length;j++){
			arr1[i][j]=arr[i][j]*num;
		}
	}
	return arr;
}

function add2Array(arr1,arr2){
	var arr3 = new Array();
	for(var i=0;i<arr1.length;i++){
		arr3[i]=arr1[i]+arr2[i];
	}
	return arr3;
}

function dot(arr1,arr2){
	var num=0;
	for(var i=0;i<arr1.length;i++){
		num += arr1[i]*arr2[i];
	}
	return num;
}

function create2dEmpty(n){
	var arr=[];
	for(var i=0;i<n;i++){
		arr[i]=[];
	}
	return arr;
}
