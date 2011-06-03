<?php

require_once('lib.php');
$db = db_connect();

$sth = $db->prepare('SELECT * FROM plots WHERE id = ?');
$sth->execute(array($_GET['id']));
$plot_info = $sth->fetch();

print_r($plot_info);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Wikiplots</title>
		<link rel="stylesheet" href="css/blueprint/screen.css" type="text/css">
		<!--[if lt IE 8]><link rel="stylesheet" href="/css/blueprint/ie.css" type="text/css"><![endif]-->
		<link rel="stylesheet" href="css/blueprint/plugins/fancy-type/screen.css" type="text/css">
		<!--[if lte IE 8]><script language="javascript" type="text/javascript" src="../excanvas.min.js"></script><![endif]-->
		
		<link rel="stylesheet" href="css/base.css" type="text/css">
		<script src="scripts/jquery-1.6.1.min.js"></script>
		<script src="scripts/date.js"></script>
		<script src="scripts/data_frame.js"></script>
		<script src="scripts/parse.js"></script>
		<script src="scripts/jquery.flot.min.js"></script>
		<script src="scripts/plot.js"></script>
		<script>
			var url = 'http://en.wikipedia.org/wiki/World_population';
		</script>
		<script src="scripts/gallery.js"></script>
	</head>

	<body>
	<div class="container">
		<hr class="space" style="height:50px">
		<div id='panels' class="span-24 last"></div>
	</div>
	
	</body>

</html>
