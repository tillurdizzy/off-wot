<?php
require_once ('vo/platoonStrategyVO.php');
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
$data = json_decode(file_get_contents("php://input"));
define( "DATABASE_SERVER", "wotdata.db.10253438.hostedresource.com");
define( "DATABASE_USERNAME", "wotdata");
define( "DATABASE_PASSWORD", "SaDie9954!");
define( "DATABASE_NAME", "wotdata");
//connect to the database.
$con = mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD) or die ('cannot reach database');
mysql_select_db(DATABASE_NAME,$con) or die ("This is not a valid database");
$map = mysql_real_escape_string($data->map);
$author = mysql_real_escape_string($data->author);
$query = sprintf("SELECT * FROM platoonStrategy WHERE map = '".$map."' AND author = '".$author."'");
$result = mysql_query($query,$con);

$resultValueObjects = array();

while ($row = mysql_fetch_object($result)) {
	$oneVO = new platoonStrategyVO();
	$oneVO->PRIMARY_ID = $row->PRIMARY_ID;
	$oneVO->map = $row->map;
	$oneVO->author = $row->author;
	$oneVO->strategy = $row->strategy;
	$oneVO->comment = $row->comment;
	array_push( $resultValueObjects, $oneVO );
}

echo json_encode($resultValueObjects);
?>