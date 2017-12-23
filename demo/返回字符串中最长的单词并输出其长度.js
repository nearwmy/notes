function findLongestString(arr) {
	var strLen = 0,
			longestKey = 0;

	arr.every(function(value, key){
		
			if(typeof(value) == 'string' && strLen <= value.length) {
		
				strLen = value.length;	
				longestKey = key;

			}else if(typeof(value) !== 'string') {
				console.log('当前数组包含非字符串元素，请输入字符串:', key, value);
				return false;

			}
			
			return true;
	});

	console.log(arr[longestKey], strLen);

} 

findLongestString(['rrr','world','test','a-text']);