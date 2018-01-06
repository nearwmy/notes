// 有序二分算法，适用于有序的不经常变动又查找频繁的列表


 // https://segmentfault.com/a/1190000008593715
 // http://blog.csdn.net/yzf913214/article/details/56381423
 // https://www.teakki.com/p/590bebc4e8136dfc5f2188a3
function binary_search(target, arr) {

	var low = 0,
			high = arr.length - 1;

	while(low <= high) {
		console.log(low,high);
		var mid = parseInt((high + low) / 2);

		if(target == arr[mid]) {
			return mid;
		}else if(target > arr[mid]) {
			low = mid + 1;
		}else if(target < arr[mid]){
			high = mid - 1;
		}
	}

	return -1;

}

// 递归有序算法
function binary_search(target, arr, low, high) {
	if(low > high) return -1;

	while(low <= high) {
		
		var mid = parseInt((high + low) / 2);
		console.log(mid);
		if(target == arr[mid]) {
			return mid;
		}else if(target > arr[mid]) {
			return binary_search(target, arr, mid+1, high);
		}else if(target < arr[mid]){
			return binary_search(target, arr, low, mid-1);
		}
	}

	return -1;

}

// 无序算法 

// 数组元素都是成对出现 找到那个单个出现的元素
