<!DOCTYPE html>
<html lang="en-US">
<head>
	<meta charset="utf-8"> 
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php
		$root = $_SERVER['DOCUMENT_ROOT'];
		$server = $_SERVER['SERVER_NAME'];
		$currentPage = $server . $_SERVER['PHP_SELF'];
	?>
	<title>PhotoViewer Example</title>
	<meta name="author" content="Anton A. Smirnov" />
	<link rel="stylesheet" type="text/css" href="/css/PhotoViewer.css" />
	<?php require $root . '/scripts/PHP_Functions.php'; ?>
	<script src="/scripts/PhotoViewer.js"></script>
	<script src="/scripts/Example.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="/scripts/jquery-mobile-swipe-min.js"></script>
</head>
<body onload="photoViewerExample(initPhotoViewer, 3, false);">
	<h1 style="text-align: center;">Gallery Controls</h1>
	<div style="max-width: 800px; margin: 0px auto; text-align: center;">
		<form>
			<div style="max-width: 800px; margin: 1rem auto;">
				Number of columns:
				<select id="galleryColumns" name="galleryColumns">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3" selected>3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</div>
			<div style="max-width: 800px; margin: 1rem auto;">
				<button type="button" onclick="updateExample(false);">Regular</button>
				<button type="button" onclick="updateExample(true);">Polaroid</button>
			</div>
		</form>
	</div>
	<h1 style="margin-bottom: 3rem; text-align: center;">Example Gallery</h1>
	<div id="ExampleGallery" style="max-width: 800px; margin: 0px auto;">
		
	</div>
</body>
</html>