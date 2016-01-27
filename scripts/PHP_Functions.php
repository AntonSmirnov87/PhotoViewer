<?php

function CreateGallery($folder, $columns = 3, $polaroid = false)
{
	$root = $_SERVER['DOCUMENT_ROOT'];
	$photoFolder = $root . $folder;
	$width = (100 / $columns) - 2;

	if(is_dir($photoFolder))
	{
		$photo = scandir($photoFolder);
		$captionFile = $photoFolder . "/Captions.csv";
		if(file_exists($captionFile)){
			$captionCSV = fopen($captionFile, "r");
			$captionString = file_get_contents($captionFile);
			$captions = explode("|", $captionString);
			$captions = explode("\n", $captionString);
			fclose($captionCSV);
		}
		echo "<div class=\"PhotoGallery\">";
		$j = 0; //Counter for captions
		foreach($photo as $i => $i_value){
			if(strlen($i_value) > 4){
				if(strripos($i_value, ".jpg", strlen($i_value) - 4) || strripos($i_value, ".png", strlen($i_value) - 4)){
					if($polaroid == true){
						$rotDegs = rand(-30, 30);
						$transX = rand(-2, 2);
						$transY = rand(-2, 2);
						$polaroidStyle = "style=\"border: 1em solid #FFFFFF; border-bottom: 4em solid #FFFFFF; border-radius: 0px; outline: 1px solid #000000; width: 100%; -ms-transform: rotate(" . $rotDegs . "deg) translate(" . $transX . "em, " . $transY . "em); -webkit-transform: rotate(" . $rotDegs . "deg) translate(" . $transX . "em, " . $transY . "em); transform: rotate(" . $rotDegs . "deg) translate(" . $transX . "em, " . $transY . "em);\"";
					}else{
						$polaroidStyle = "";
					}
					if(file_exists($captionFile)){
							$caption = explode("~", $captions[$j]);
							$title = $caption[0];
							$description = $caption[1];
					}else{
						$title = $i_value;
						$description = "";
					}
					echo "<div style=\"display: inline-block; margin: 1%; width: " . $width . "%;\">";
					$tbFile = $root . $folder . "/tb/tb_" . $i_value;
					if(file_exists($tbFile)){
						$hasTB = "/tb/tb_";
					}else{
						$hasTB = "/";
					}
					echo "<img src=\"" . $folder . $hasTB . $i_value . "\" title=\"" . $title . "\" alt=\"" . $description . "\" class=\"PhotoViewer\"" . $polaroidStyle . "/>";
					echo "</div>";
					$j++;
				}
			}
		}
		echo "</div>";
	}
}

?>