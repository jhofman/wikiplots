<?php

require_once('config.php');

// connect to database
function db_connect() 
{
	global $db_user, $db_pass;
  $dbh = new PDO('mysql:host=localhost;dbname=wikiplots',
                 $db_user, $db_pass, 
		 array(PDO::ATTR_PERSISTENT => true,
		       PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
		       PDO::ATTR_EMULATE_PREPARES => true));
  return $dbh;
}

# generate a random string of the specified length
function rand_str($length)
{
  # [0-9a-zA-Z]
  $charset = array_merge(range(48,57), range(65,90), range(97,122));
  
  $str = "";
  for ($i = 0; $i < $length; $i++) {
    $str .= chr($charset[array_rand($charset)]);
  }
  return $str;
}

?>

