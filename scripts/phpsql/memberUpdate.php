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

$PRIMARY_ID = mysqli_real_escape_string($con,$data->PRIMARY_ID);
$member = mysqli_real_escape_string($con,$data->member);
$gamertag = mysqli_real_escape_string($con,$data->gamertag);
$age = mysqli_real_escape_string($con,$data->age);
$pword = mysqli_real_escape_string($con,$data->pword);
$residence = mysqli_real_escape_string($con,$data->residence);
$zone = mysqli_real_escape_string($con,$data->zone);
$beg = mysqli_real_escape_string($con,$data->beg);
$end = mysqli_real_escape_string($con,$data->end);
$inputBeg = mysqli_real_escape_string($con,$data->inputBeg);
$inputEnd = mysqli_real_escape_string($con,$data->inputEnd);
$tier_high = mysqli_real_escape_string($con,$data->tier_high);
$tier_low = mysqli_real_escape_string($con,$data->tier_low);

$query = "UPDATE schedule SET 
beg='".$beg."',
end='".$end."',
inputBeg='".$inputBeg."',
inputEnd='".$inputEnd."',
member='".$member."',
age='".$age."',
residence='".$residence."',
tier_high='".$tier_high."',
tier_low='".$tier_low."',
zone='".$zone."'
WHERE PRIMARY_ID='".$PRIMARY_ID."'";
$qry_res = mysqli_query($con,$query);
if ($qry_res) {
	$arr = array('msg' => "Update successful", 'result' => $qry_res, 'params' => $beg . ":" + $end . ":" . $member . ":" . $zone);
	$jsn = json_encode($arr);
	echo($jsn);
} else {
	$arr = array('msg' => "Error updating record", 'result' => $qry_res,'params' => $beg . ":" + $end . ":" . $member . ":" . $zone);
	$jsn = json_encode($arr);
	echo($jsn);
}
?>