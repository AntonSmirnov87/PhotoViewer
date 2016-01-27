<?php

$root = $_SERVER['DOCUMENT_ROOT'];
require $root . '/scripts/PHP_Functions.php';

$numColumns = $_REQUEST["numColumns"];
$isPolaroid = $_REQUEST["isPolaroid"];
if($isPolaroid == "true"){
	$isPolaroid = true;
}else{
	$isPolaroid = false;
};

CreateGallery("/images/Photos/", $numColumns, $isPolaroid);

?>