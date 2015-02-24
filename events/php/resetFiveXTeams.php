<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
define( "DATABASE_SERVER", "wotdata.db.10253438.hostedresource.com");
define( "DATABASE_USERNAME", "wotdata");
define( "DATABASE_PASSWORD", "SaDie9954!");
define( "DATABASE_NAME", "wotdata");
//connect to the database.
$con = mysqli_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD,DATABASE_NAME) or die ('cannot reach database');

$query = "DELETE FROM teamBattles";

$qry_res = mysqli_query($con,$query);

if ($qry_res) {
	$arr = array('msg' => "Successful", 'result' => $qry_res, 'params' => 1);
	$jsn = json_encode($arr);
	echo($jsn);
} else {
	$arr = array('msg' => "Error", 'result' => $qry_res,'params' => 0);
	$jsn = json_encode($arr);
	echo($jsn);
}
?>