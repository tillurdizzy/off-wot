<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
require_once ('vo/eventdataVO.php');
//SQL Connection Info 
define( "DATABASE_SERVER", "wotdata.db.10253438.hostedresource.com");
define( "DATABASE_USERNAME", "wotdata");
define( "DATABASE_PASSWORD", "SaDie9954!");
define( "DATABASE_NAME", "wotdata");

//connect to the database.
$con = mysqli_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD,DATABASE_NAME) or die ('cannot reach database');
$query = sprintf("SELECT * FROM eventdata");
$result = mysqli_query($con,$query);

$resultValueObjects = array();
while ($row = mysqli_fetch_object($result)) {
	$oneVO = new eventdataVO();
	$oneVO->PRIMARY_ID = $row->PRIMARY_ID;
	$oneVO->active = $row->active;
	$oneVO->view = $row->view;
	$oneVO->host = $row->host;
	$oneVO->zone = $row->zone;
	$oneVO->dayOfWeek = $row->dayOfWeek;
	$oneVO->sortVal = $row->sortVal;
	$oneVO->tiers = $row->tiers;
	$oneVO->timeDisplay = $row->timeDisplay;
	$oneVO->title = $row->title;
	$oneVO->photo = $row->photo;
	$oneVO->weekA = $row->weekA;
	$oneVO->weekB = $row->weekB;
	$oneVO->weekC = $row->weekC;
	$oneVO->weekD = $row->weekD;
	$oneVO->weekE = $row->weekE;
	$oneVO->month = $row->month;
	$oneVO->inputBeg = $row->inputBeg;
	$oneVO->inputEnd = $row->inputEnd;
	$oneVO->tier_high = $row->tier_high;
	$oneVO->tier_low = $row->tier_low;
	array_push( $resultValueObjects, $oneVO );
}

echo json_encode($resultValueObjects);
?>