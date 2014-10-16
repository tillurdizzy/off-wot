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
$con = mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD) or die ('cannot reach database');
mysql_select_db(DATABASE_NAME,$con) or die ("This is not a valid database");
$_gamertag = mysql_real_escape_string($data->gamertag);
$query = sprintf("SELECT * FROM schedule WHERE gamertag = '".$_gamertag."'");
$result = mysql_query($query,$con);

$resultValueObjects = array();
while ($row = mysql_fetch_object($result)) {
	$oneVO = new memberVO();
	$oneVO->PRIMARY_ID = $row->PRIMARY_ID;
	$oneVO->pword = $row->pword;
	$oneVO->gamertag = $row->gamertag;
	$oneVO->canEdit = $row->canEdit;
	array_push( $resultValueObjects, $oneVO );
}

echo json_encode($resultValueObjects);
?>