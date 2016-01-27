function updateExample(isPolaroid){
	var numColumns = $("#galleryColumns").val();
	photoViewerExample(initPhotoViewer, numColumns, isPolaroid);
}

function photoViewerExample(callback, numColumns, isPolaroid){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState < 4){
			$("#ExampleGallery").html("<div style=\"text-align: center;\"><h2>Gallery</h2><img src=\"/images/Loading.gif\" alt=\"Gallery Loading\" /><h2>Loading</h2></div>");
		} else if (xhttp.readyState == 4 && xhttp.status == 200) {
			$("#ExampleGallery").html(xhttp.responseText);
			callback();
		} else {
			$("#ExampleGallery").html("<p>An error has occurred. Please <a href=\"mailto:AntonSmirnov87@gmail.com\">the programmer</a> to let him know. Thanks!</p>");
		}
	};
	xhttp.open("GET", "ExampleGallery.php?numColumns=" + numColumns + "&isPolaroid=" + isPolaroid, true);
	xhttp.send();
}