<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
$data = json_decode(file_get_contents("php://input"));
define( "DATABASE_SERVER", "wotdata.db.10253438.hostedresource.com");
define( "DATABASE_USERNAME", "wotdata");
define( "DATABASE_PASSWORD", "SaDie9954!");
define( "DATABASE_NAME", "wotdata");
//connect to the database.
$con = mysqli_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD,DATABASE_NAME) or die ('cannot reach database');
$_gamerTag = mysqli_real_escape_string($con,$data->gamerTag);
$_eventID = mysqli_real_escape_string($con,$data->eventID);
$_eventWeek = mysqli_real_escape_string($con,$data->eventWeek);
$_startTime = mysqli_real_escape_string($con,$data->startTime);

$query = "INSERT INTO events(eventID,eventWeek,gamerTag,startTime)
VALUES(
'" . $_eventID . "', " .
"'" . $_eventWeek . "', " .
"'" . $_gamerTag . "', " .
"'" . $_startTime . "')";
$qry_res = mysqli_query($con,$query);
if ($qry_res) {
	$arr = array('msg' => "Insert successful", 'result' => $qry_res, 'params' => $gamerTag);
	$jsn = json_encode($arr);
	echo($jsn);
} else {
	$arr = array('msg' => "Error inserting record", 'result' => $qry_res,'params' => $gamerTag);
	$jsn = json_encode($arr);
	echo($jsn);
}
?>