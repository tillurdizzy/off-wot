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
$xpos = mysqli_real_escape_string($con,$data->xpos);
$ypos = mysqli_real_escape_string($con,$data->ypos);
$xpos2 = mysqli_real_escape_string($con,$data->xpos2);
$ypos2 = mysqli_real_escape_string($con,$data->ypos2);
$map = mysqli_real_escape_string($con,$data->map);
$type = mysqli_real_escape_string($con,$data->type);
$spawn = mysqli_real_escape_string($con,$data->spawn);
$author = mysqli_real_escape_string($con,$data->author);

$query = "INSERT INTO maps(map,type,spawn,author,xpos,ypos,xpos2,ypos2)
VALUES(
'" . $map . "', " .
"'" . $type . "', " .
"'" . $spawn . "', " .
"'" . $author . "', " .
"'" . $xpos . "', " .
"'" . $ypos . "', " .
"'" . $xpos2 . "', " .
"'" . $ypos2 . "')";
$qry_res = mysqli_query($con,$query);
if ($qry_res) {
	$arr = array('msg' => "Insert successful", 'result' => $qry_res, 'params' => $map . ":" + $type . ":" . $xpos . ":" . $ypos);
	$jsn = json_encode($arr);
	echo($jsn);
} else {
	$arr = array('msg' => "Error inserting record", 'result' => $qry_res,'params' => $map . ":" + $type . ":" . $xpos . ":" . $ypos);
	$jsn = json_encode($arr);
	echo($jsn);
}
?>