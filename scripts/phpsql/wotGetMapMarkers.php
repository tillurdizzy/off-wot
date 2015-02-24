<?php
require_once ('vo/wotVO.php');
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
$data = json_decode(file_get_contents("php://input"));
define( "DATABASE_SERVER", "wotdata.db.10253438.hostedresource.com");
define( "DATABASE_USERNAME", "wotdata");
define( "DATABASE_PASSWORD", "SaDie9954!");
define( "DATABASE_NAME", "wotdata");
//connect to the database.
$con = mysqli_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD,DATABASE_NAME) or die ('cannot reach database');
$map = mysqli_real_escape_string($con,$data->map);
$author = mysqli_real_escape_string($con,$data->author);
$query = sprintf("SELECT * FROM maps WHERE map = '".$map."' AND author = '".$author."'");
$result = mysqli_query($con,$query);

$resultValueObjects = array();

while ($row = mysqli_fetch_object($result)) {
	$oneVO = new wotVO();
	$oneVO->PRIMARY_ID = $row->PRIMARY_ID;
	$oneVO->xpos = $row->xpos;
	$oneVO->ypos = $row->ypos;
	$oneVO->xpos2 = $row->xpos2;
	$oneVO->ypos2 = $row->ypos2;
	$oneVO->type = $row->type;
	$oneVO->map = $row->map;
	$oneVO->spawn = $row->spawn;
	$oneVO->author = $row->author;
	array_push( $resultValueObjects, $oneVO );
}

echo json_encode($resultValueObjects);
?>