<?php
require_once ('vo/wotVO.php');
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

$query = sprintf("SELECT * FROM maps WHERE map = '". $map ."'");
$result = mysql_query($query,$con);

$resultValueObjects = array();

while ($row = mysql_fetch_object($result)) {
	$oneVO = new wotVO();
	$oneVO->PRIMARY_ID = $row->PRIMARY_ID;
	$oneVO->xpos = $row->xpos;
	$oneVO->ypos = $row->ypos;
	$oneVO->type = $row->type;
	$oneVO->map = $row->map;
	$oneVO->spawn = $row->spawn;
	array_push( $resultValueObjects, $oneVO );
}

echo json_encode($resultValueObjects);
?>