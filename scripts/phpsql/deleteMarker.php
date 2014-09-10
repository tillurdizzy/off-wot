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
$id = mysql_real_escape_string($data->id);


$query = "DELETE FROM maps WHERE PRIMARY_ID = " . "'" . $id ."'";
$qry_res = mysql_query($query,$con);
if ($qry_res) {
	$arr = array('msg' => "Delete successful", 'result' => $qry_res, 'params' => $id);
	$jsn = json_encode($arr);
	echo($jsn);
} else {
	$arr = array('msg' => "Error deleting record", 'result' => $qry_res,'params' => $id);
	$jsn = json_encode($arr);
	echo($jsn);
}
?>