<?php
function ezd($dump){
	/*
	$data = http_build_query($dump, "", "&");

	//header
	$header = array(
	    "Content-Type: application/x-www-form-urlencoded",
	    "Content-Length: ".strlen($data)
	);

	$context = array(
	    "http" => array(
	        "method"  => "POST",
	        "header"  => implode("\r\n", $header),
	        "content" => $data
	    )
	);

	try{
		$url = "http://localhost:3000/phpvar";
		$contents = file_get_contents($url, false, stream_context_create($context));
		return '';
	} catch(\Exception $e) {
		echo '�T�[�o�[���牞��������܂���';
	}
	exit();
	*/
	$datas = array();
		$datas['phpvar'] = serialize($dump);
		//�m�[�h�ɗ\������v�b�V��
		$url = 'http://localhost:3000/phpvar';
		$header = array("Content-Type: application/json; charset=utf-8");
		$options = array('http' => array(
			'method' => 'POST',
			'header' => implode("\r\n", $header),
			//'content' => http_build_query($data)
			'content' => json_encode($datas)
		));
	try{
        $contents = file_get_contents($url, false, stream_context_create($options));
        return true;
	}catch(\Exception $e){
		echo '�T�[�o�[���牞��������܂���';
	}
    exit();
}
