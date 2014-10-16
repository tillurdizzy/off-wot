<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
$data = json_decode(file_get_contents("php://input"));
require_once ('vo/eventVO.php');
//SQL Connection Info 
define( "DATABASE_SERVER", "wotdata.db.10253438.hostedresource.com");
define( "DATABASE_USERNAME", "wotdata");
define( "DATABASE_PASSWORD", "SaDie9954!");
define( "DATABASE_NAME", "wotdata");

//connect to the database.
$con = mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD) or die ('cannot reach database');
mysql_select_db(DATABASE_NAME,$con) or die ("This is not a valid database");

$_eventID = mysql_real_escape_string($data->eventID);
$query = sprintf("SELECT * FROM events WHERE eventID = '".$_eventID."'");
$result = mysql_query($query,$con);

$resultValueObjects = array();
while ($row = mysql_fetch_object($result)) {
	$oneVO = new eventVO();
	$oneVO->PRIMARY_ID = $row->PRIMARY_ID;
	$oneVO->eventID = $row->eventID;
	$oneVO->eventWeek = $row->eventWeek;
	$oneVO->gamerTag = $row->gamerTag;
	array_push( $resultValueObjects, $oneVO );
}

echo json_encode($resultValueObjects);
?>