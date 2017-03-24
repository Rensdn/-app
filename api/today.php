<?php
	
	// 获取前端传递的日期参数
	$today = $_GET['today'];

	// 豆瓣数据接口
	$url = 'https://moment.douban.com/api/stream/date/'.$today.'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

	// 获取豆瓣数据
	$result = file_get_contents($url);
	
	// 将服务端获取的豆瓣数据返回给浏览器
	echo $result;

?>