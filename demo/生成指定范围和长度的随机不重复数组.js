function create_arr(n) {
    var arr = [],
        rand = 0;

    for (var i = 0; i < n; i++) {

        rand = Math.floor(Math.random() * (32 - 2) + 2);

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
}

create_arr(20);