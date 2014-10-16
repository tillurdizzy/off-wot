<?php
require_once ('vo/scheduleVO.php');
//SQL Connection Info 
define( "DATABASE_SERVER", "wotdata.db.10253438.hostedresource.com");
define( "DATABASE_USERNAME", "wotdata");
define( "DATABASE_PASSWORD", "SaDie9954!");
define( "DATABASE_NAME", "wotdata");


//connect to the database.
$con = mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD) or die ('cannot reach database');
mysql_select_db(DATABASE_NAME,$con) or die ("This is not a valid database");

$query = sprintf("SELECT * FROM schedule");
$result = mysql_query($query,$con);

$resultValueObjects = array();
while ($row = mysql_fetch_object($result)) {
	$oneVO = new scheduleVO();
	$oneVO->PRIMARY_ID = $row->PRIMARY_ID;
	$oneVO->member = $row->member;
	$oneVO->gamertag = $row->gamertag;
	$oneVO->age = $row->age;
	$oneVO->zone = $row->zone;
	$oneVO->beg = $row->beg;
	$oneVO->end = $row->end;
	$oneVO->inputBeg = $row->inputBeg;
	$oneVO->inputEnd = $row->inputEnd;
	$oneVO->tier_low = $row->tier_low;
	$oneVO->tier_high = $row->tier_high;
	$oneVO->canEdit = $row->canEdit;
	array_push( $resultValueObjects, $oneVO );
}

echo json_encode($resultValueObjects);
?>