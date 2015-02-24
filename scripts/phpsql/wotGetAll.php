<?php
require_once ('vo/wotVO.php');
//SQL Connection Info 
define( "DATABASE_SERVER", "wotdata.db.10253438.hostedresource.com");
define( "DATABASE_USERNAME", "wotdata");
define( "DATABASE_PASSWORD", "SaDie9954!");
define( "DATABASE_NAME", "wotdata");


//connect to the database.
$con = mysqli_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD,DATABASE_NAME) or die ('cannot reach database');
$query = sprintf("SELECT * FROM maps");
$result = mysqli_query($con,$query);

$resultValueObjects = array();
while ($row = mysqli_fetch_object($result)) {
	$oneVO = new wotVO();
	$oneVO->PRIMARY_ID = $row->PRIMARY_ID;
	$oneVO->xpos = $row->xpos;
	$oneVO->ypos = $row->ypos;
	$oneVO->type = $row->type;
	$oneVO->map = $row->map;
	$oneVO->spawn = $row->spawn;
	array_push( $resultValueObjects, $oneVO );
}

echo json_encode($resultValueObjects);
?>