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

$gamertag = mysqli_real_escape_string($con,$data->gamertag);
$visits = mysqli_real_escape_string($con,$data->visits);

$query = "UPDATE schedule SET 
visits='".$visits."'
WHERE gamertag='".$gamertag."'";

$qry_res = mysqli_query($con,$query);
if ($qry_res) {
	$arr = array('msg' => "Update successful", 'result' => $qry_res);
	$jsn = json_encode($arr);
	echo($jsn);
} else {
	$arr = array('msg' => "Error updating record", 'result' => $qry_res,);
	$jsn = json_encode($arr);
	echo($jsn);
}
?>