<?php
require_once ('battleVO.php');
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

$query = sprintf("SELECT * FROM battleData WHERE memberID = '".$memberID."'");
$result = mysqli_query($con,$query);

$resultValueObjects = array();

while ($row = mysqli_fetch_object($result)) {
	$oneVO = new battleVO();
	$oneVO->One = $row->One;
	$oneVO->Top = $row->Top;
	$oneVO->Mid = $row->Mid;
	$oneVO->Bot = $row->Bot;
	$oneVO->topFirst = $row->topFirst;
	$oneVO->topTop = $row->topTop;
	$oneVO->topMid = $row->topMid;
	$oneVO->topBot = $row->topBot;

	$oneVO->midFirst = $row->midFirst;
	$oneVO->midTop = $row->midTop;
	$oneVO->midMid = $row->midMid;
	$oneVO->midBot = $row->midBot;

	$oneVO->botFirst = $row->botFirst;
	$oneVO->botTop = $row->botTop;
	$oneVO->botMid = $row->botMid;
	$oneVO->botBot = $row->botBot;
	
	array_push( $resultValueObjects, $oneVO );
}

echo json_encode($resultValueObjects);
?>