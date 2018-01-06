function getMost(string) {
	var arr = string.split(''),
			obj = {};

	arr.forEach(function(item, index){
		if(!obj[item]) {
			obj[item] = 1;
		}
		obj[item]++;

	})

	var index = 0, number = 0;
	for(var key in obj) {
		if(obj[key] > number) {
			number = obj[key];
			index = key;
		}
	}

	return {
		max: number,
		value: index
	}

}

getMost('abbbbsdffggdddss');


function unquie(arr) {
	var res = arr.some(function(item, index){
			return arr.indexOf(item) === index;
	});

	console.log(res)
	return res;

}

unquie([1,2,'1',1,2,'2'])