<?php

	header('Content-Type', 'application/json');

	// 推荐作者
	$recUrl = 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

	// 热门作者
	$allUrl = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

	// json
	$recResult = file_get_contents($recUrl);

	// json
	$allResult = file_get_contents($allUrl);

	// echo $recResult; // {}
	// echo $allResult; // {}

	// echo 'hello';

	// echo 'world';

	// [{},{}]

	$recResult = json_decode($recResult, true);
	$allResult = json_decode($allResult, true);

	$result = array('rec'=>$recResult, 'all'=>$allResult);

	echo json_encode($result);

?>