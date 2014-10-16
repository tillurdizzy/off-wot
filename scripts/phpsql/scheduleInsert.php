<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
$data = json_decode(file_get_contents("php://input"));
define( "DATABASE_SERVER", "wotdata.db.10253438.hostedresource.com");
define( "DATABASE_USERNAME", "wotdata");
define( "DATABASE_PASSWORD", "SaDie9954!");
define( "DATABASE_NAME", "wotdata");
//connect to the database.
$con = mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD) or die ('cannot reach database');
mysql_select_db(DATABASE_NAME,$con) or die ("This is not a valid database");
$member = mysql_real_escape_string($data->member);
$gamertag = mysql_real_escape_string($data->gamertag);
$age = mysql_real_escape_string($data->age);
$pword = mysql_real_escape_string($data->pword);
$residence = mysql_real_escape_string($data->residence);
$zone = mysql_real_escape_string($data->zone);
$beg = mysql_real_escape_string($data->beg);
$end = mysql_real_escape_string($data->end);
$inputBeg = mysql_real_escape_string($data->inputBeg);
$inputEnd = mysql_real_escape_string($data->inputEnd);
$tier_high = mysql_real_escape_string($data->tier_high);
$tier_low = mysql_real_escape_string($data->tier_low);

$query = "INSERT INTO schedule(beg,end,inputBeg,inputEnd,member,gamertag,age,pword,residence,tier_high,tier_low,zone)
VALUES(
'" . $beg . "', " .
"'" . $end . "', " .
"'" . $inputBeg . "', " .
"'" . $inputEnd . "', " .
"'" . $member . "', " .
"'" . $gamertag . "', " .
"'" . $age . "', " .
"'" . $pword . "', " .
"'" . $residence . "', " .
"'" . $tier_high . "', " .
"'" . $tier_low . "', " .
"'" . $zone . "')";
$qry_res = mysql_query($query,$con);
if ($qry_res) {
	$arr = array('msg' => "Insert successful", 'result' => $qry_res, 'params' => $beg . ":" + $end . ":" . $member . ":" . $zone);
	$jsn = json_encode($arr);
	echo($jsn);
} else {
	$arr = array('msg' => "Error inserting record", 'result' => $qry_res,'params' => $beg . ":" + $end . ":" . $member . ":" . $zone);
	$jsn = json_encode($arr);
	echo($jsn);
}
?>