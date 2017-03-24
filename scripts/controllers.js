
// 专门管理控制器的模块

angular.module('Ctrls', [])

// 定义一个控制器
.controller('NavsCtrl', ['$scope', function ($scope) {
	// 手动拼凑数据（导航数据）
	// 将数据添加到模型而不是写死在视图上
	// 是这样做可以降低代码的耦合度

	$scope.navs = [
		{text: '今日一刻', icon: 'icon-home', link: '#/today'},
		{text: '往期内容', icon: 'icon-file-empty', link: '#/older'},
		{text: '热门作者', icon: 'icon-pencil', link: '#/author'},
		{text: '栏目浏览', icon: 'icon-menu', link: '#/category'},
		{text: '我的喜欢', icon: 'icon-heart', link: '#/like'},
		{text: '设置', icon: 'icon-cog', link: '#/settings'},
	];
}])

// 定义控制器处理 今日一刻 
.controller('TodayCtrl', ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
	// 获取系统时间，并处理格式为 xxxx-xx-xx
	var today = $filter('date')(new Date(), 'yyyy-MM-dd');

	// 
	$rootScope.loaded = false;

	$rootScope.title = '今日一刻';

	$rootScope.key = 0;

	// 请求服务器数据
	$http({
		// 请求自已服务器
		// 由自已服务器代理取数据
		url: './api/today.php',
		// 传递参数
		params: {today: today}
	}).success(function (info) {
		// console.log(info);
		// 将服务器返回的数据放到模型上
		$scope.posts = info.posts;
		$scope.date = info.date;

		$rootScope.loaded = true;
	});
}])

// 
.controller('OlderCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

	$rootScope.loaded = false;

	$rootScope.title = '往期内容';

	$rootScope.key = 1;

	// 发起请求
	$http({
		url: './api/older.php',
		params: {day: -1}
	}).success(function (info) {
		// console.log(info);

		$scope.posts = info.posts;
		$scope.date = info.date;

		$rootScope.loaded = true;
	});
}])

// 
.controller('AuthorCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

	$rootScope.title = '热门作者';
	$rootScope.key = 2;
	$rootScope.loaded = false;

	$http({
		url: './api/author.php'
	}).success(function (info) {
		// console.log(info);

		$scope.rec = info.rec.authors;
		$scope.all = info.all.authors;

		$rootScope.loaded = true;
	});
}]);