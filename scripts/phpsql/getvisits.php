<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
$data = json_decode(file_get_contents("php://input"));
require_once ('vo/memberVO.php');
//SQL Connection Info 
define( "DATABASE_SERVER", "wotdata.db.10253438.hostedresource.com");
define( "DATABASE_USERNAME", "wotdata");
define( "DATABASE_PASSWORD", "SaDie9954!");
define( "DATABASE_NAME", "wotdata");


//connect to the database.
$con = mysqli_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD,DATABASE_NAME) or die ('cannot reach database');
$_gamertag = mysqli_real_escape_string($con,$data->gamertag);
$query = sprintf("SELECT visits FROM schedule WHERE gamertag = '".$_gamertag."'");
$result = mysqli_query($con,$query);

$resultValueObjects = array();
while ($row = mysqli_fetch_object($result)) {
	$oneVO = new memberVO();
	$oneVO->visits = $row->visits;
	array_push( $resultValueObjects, $oneVO );
}

echo json_encode($resultValueObjects);
?>