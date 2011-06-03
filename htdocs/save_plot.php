<?php

require_once('lib.php');

$plot_id = false;

if (isset($_GET['url']) && isset($_GET['table_offset']) && isset($_GET['x_axis']) && isset($_GET['y_axis']) && isset($_GET['geom'])) {
	$db = db_connect();
	
	$plot_id = rand_str(5);
	$sth = $db->prepare('INSERT INTO plots SET id = ?, url = ?, table_offset = ?, x_axis = ?, y_axis = ?, geom = ?, ts = NOW(), ip = ?');
	$sth->execute(array($plot_id, $_GET['url'], $_GET['table_offset'], $_GET['x_axis'], $_GET['y_axis'], $_GET['geom'], $_SERVER['REMOTE_ADDR']));
}

/* output results */
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($plot_id);

?>
