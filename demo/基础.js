// add(2,5) 7
function add(x, y) {
    var a = x && typeof x === 'number' ? x : 0,
        b = y && typeof y === 'number' ? y : 0;
    return parseInt(a + b)
}

// add(2)(5) 7
function add(x) { 

	var a = x && typeof x === 'number' ? x : 0; 

	return function(y) { 

		var b = y && typeof y === 'number' ? y : 0; 

		return parseInt(a + b);
	} 
}


