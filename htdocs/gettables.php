<?php

$tables = array();

if ( isset($_GET['url']) ) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $_GET['url']);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	$response = curl_exec($ch);
	curl_close($ch);
	
	if ($response) {
		preg_match_all("/<table.*?<\/table>/s", $response, $tbls);
		if ($tbls) {
			$tbls = $tbls[0];
			foreach ($tbls as $table) {
				if (!preg_match("/id=\"toc\"/", $table)) {
					array_push($tables, $table);
				}
			}
		}
	}
}

/* output results */
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($tables);

?>
