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
$memberID = mysqli_real_escape_string($con,$data->memberID);
$One = mysqli_real_escape_string($con,$data->One);
$Top = mysqli_real_escape_string($con,$data->Top);
$Mid = mysqli_real_escape_string($con,$data->Mid);
$Bot = mysqli_real_escape_string($con,$data->Bot);
$topFirst = mysqli_real_escape_string($con,$data->topFirst);
$topTop = mysqli_real_escape_string($con,$data->topTop);
$topMid = mysqli_real_escape_string($con,$data->topMid);
$topBot = mysqli_real_escape_string($con,$data->topBot);

$midFirst = mysqli_real_escape_string($con,$data->midFirst);
$midTop = mysqli_real_escape_string($con,$data->midTop);
$midMid = mysqli_real_escape_string($con,$data->midMid);
$midBot = mysqli_real_escape_string($con,$data->midBot);

$botFirst = mysqli_real_escape_string($con,$data->botFirst);
$botTop = mysqli_real_escape_string($con,$data->botTop);
$botMid = mysqli_real_escape_string($con,$data->botMid);
$botBot = mysqli_real_escape_string($con,$data->botBot);

$query = "INSERT INTO battleData(memberID,One,Top,Mid,Bot,topFirst,topTop,topMid,topBot,midFirst,midTop,midMid,midBot,botFirst,botTop,botMid,botBot)
VALUES(
'" . $memberID . "', " .
"'" . $One . "', " .
"'" . $Top . "', " .
"'" . $Mid . "', " .
"'" . $Bot . "', " .
"'" . $topFirst . "', " .
"'" . $topTop . "', " .
"'" . $topMid . "', " .
"'" . $topBot . "', " .
"'" . $midFirst . "', " .
"'" . $midTop . "', " .
"'" . $midMid . "', " .
"'" . $midBot . "', " .
"'" . $botFirst . "', " .
"'" . $botTop . "', " .
"'" . $botMid . "', " .
"'" . $botBot . "')";
$qry_res = mysqli_query($con,$query);
if ($qry_res) {
	
	$arr = array('msg' => "Insert successful", 'result' => mysqli_insert_id($con));
	$jsn = json_encode($arr);
	echo($jsn);
} else {
	$arr = array('msg' => "Error inserting record", 'result' => $qry_res);
	$jsn = json_encode($arr);
	echo($jsn);
}
?>