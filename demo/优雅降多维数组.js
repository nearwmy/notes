/**
 * 优雅降多维数组
 * 
 */
function reduceArray(arr) {

    var result = [];

    for (var i = 0, len = arr.length; i < len; i++) {
        if (a[i] instanceof Array) {
            result = Array.prototype.concat.apply(result, arr[i]);
        } else {
            result = result.concat(arr[i]);
        }
    }

    return result;
}


/**
 * 降级二维数组
 */
function reduceTwoArray(arr) {
	
	var result = [];
	result = arr.reduce(function(prev, curr){
		return prev.concat(curr)
	});

	return result
}
