<?php
require_once ('vo/memberVO.php');
//SQL Connection Info 
define( "DATABASE_SERVER", "wotdata.db.10253438.hostedresource.com");
define( "DATABASE_USERNAME", "wotdata");
define( "DATABASE_PASSWORD", "SaDie9954!");
define( "DATABASE_NAME", "wotdata");


//connect to the database.
$con = mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD) or die ('cannot reach database');
mysql_select_db(DATABASE_NAME,$con) or die ("This is not a valid database");

$query = sprintf("SELECT * FROM newmembers");
$result = mysql_query($query,$con);

$resultValueObjects = array();
while ($row = mysql_fetch_object($result)) {
	$oneVO = new memberVO();
	$oneVO->PRIMARY_ID = $row->PRIMARY_ID;
	$oneVO->member = $row->member;
	$oneVO->gamertag = $row->gamertag;
	$oneVO->residence = $row->residence;
	$oneVO->age = $row->age;
	$oneVO->lowtier = $row->lowtier;
	$oneVO->hitier = $row->hitier;
	$oneVO->membersince = $row->membersince;
	array_push( $resultValueObjects, $oneVO );
}

echo json_encode($resultValueObjects);
?>