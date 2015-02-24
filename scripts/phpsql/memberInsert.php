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
$member = mysqli_real_escape_string($con,$data->member);
$gamertag = mysqli_real_escape_string($con,$data->gamertag);
$residence = mysqli_real_escape_string($con,$data->residence);
$age = mysqli_real_escape_string($con,$data->age);
$lowtier = mysqli_real_escape_string($con,$data->lowtier);
$hitier = mysqli_real_escape_string($con,$data->hitier);
$membersince = mysqli_real_escape_string($con,$data->membersince);

$query = "INSERT INTO newmembers(member,gamertag,residence,age,lowtier,hitier,membersince)
VALUES(
'" . $member . "', " .
"'" . $gamertag . "', " .
"'" . $residence . "', " .
"'" . $age . "', " .
"'" . $lowtier . "', " .
"'" . $hitier . "', " .
"'" . $membersince . "')";
$qry_res = mysqli_query($con,$query);
if ($qry_res) {
	$arr = array('msg' => "Insert successful", 'result' => $qry_res, 'params' => $member . ":" . $gamertag);
	$jsn = json_encode($arr);
	echo($jsn);
} else {
	$arr = array('msg' => "Error inserting record", 'result' => $qry_res,'params' => $member . ":" . $gamertag);
	$jsn = json_encode($arr);
	echo($jsn);
}
?>