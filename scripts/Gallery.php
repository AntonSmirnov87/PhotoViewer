<?php 

function CreateRandomGallery($Folder, $Columns = 3){
	$Root = $_SERVER['DOCUMENT_ROOT'];
	$PhotoFolder = $Root . $Folder;
	$Width = round(((100 / $Columns) - 6), 3);

	if (is_dir($PhotoFolder))
	{
		$Photos = scandir($PhotoFolder);
		echo "<div class=\"PhotoGallery\">";
		foreach($Photos as $i => $i_value){
			$RotDegs = rand(-30, 30);
			$TransX = rand(-2, 2);
			$TransY = rand(-2, 2);
			if(strlen($i_value) > 4){
				if(strripos($i_value, ".jpg", strlen($i_value)-4)){
					echo "<div style=\"display: inline-block; margin: 2%; width: " . $Width . "%;\">";
					$PhotoFile = $Root. $Folder . "/tb/tb_" . $i_value;
					if(file_exists($PhotoFile)){
						echo "<img src=\"" . $Folder . "/tb/tb_" . $i_value . "\" alt=\"\" title=\"\" onclick=\"PhotoViewer(this)\" class=\"Photo\" style=\"border: .75em solid #FFFFFF; border-bottom: 3em solid #FFFFFF; outline: 1px solid #000000; width: 100%; -ms-transform: rotate(" . $RotDegs . "deg) translate(" . $TransX . "em, " . $TransY . "em); -webkit-transform: rotate(" . $RotDegs . "deg) translate(" . $TransX . "em, " . $TransY . "em); transform: rotate(" . $RotDegs . "deg) translate(" . $TransX . "em, " . $TransY . "em);\" />";
					}
					else{
						echo "<img src=\"" . $Folder . "/" . $i_value . "\" alt=\"\" title=\"\" onclick=\"PhotoViewer(this)\" class=\"Photo\" style=\"border: .75em solid #FFFFFF; border-bottom: 3em solid #FFFFFF; outline: 1px solid #000000; width: 100%; -ms-transform: rotate(" . $RotDegs . "deg) translate(" . $TransX . "em, " . $TransY . "em); -webkit-transform: rotate(" . $RotDegs . "deg) translate(" . $TransX . "em, " . $TransY . "em); transform: rotate(" . $RotDegs . "deg) translate(" . $TransX . "em, " . $TransY . "em);\" />";
					}
					echo "</div>";
				}
			}
		}
		echo "</div>";
	}
}

?>