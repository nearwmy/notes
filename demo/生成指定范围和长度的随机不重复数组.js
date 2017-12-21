function create_arr(n, min, max) {
    var arr = [],
        rand = 0;

    for (var i = 0; i < n; i++) {

        rand = Math.floor(Math.random() * (max - min) + min);

        if (arr.length > 0) {
            
            if(diff(rand,arr)) {
            	arr.push(rand);
            }else {
            	i--;
            }
        }else {
        	arr.push(rand);
        }

    }

    // 判重
    function diff(val, arr) {
    	if(arr.indexOf(val) > -1) {
    		return false
    	}
    	return true;
    }
    console.log(arr);
}

// 生成2-12范围内的长度为10的数组 需注意max - min 不得小于数组长度
create_arr(10,2,12);