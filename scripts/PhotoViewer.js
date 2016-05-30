function initPhotoViewer(){
	var photoFrame;
	var closeButton;
	var photoViewerHistoryID;
	var photoViewerHistory;
	$(".PhotoViewer").click(function(){createPhotoViewer($(this));});
	
	function createPhotoViewer(callerImage, historyCall){
		historyCall = historyCall || false;
		$(window).off("popstate.photoViewer");
		$(window).on("popstate.photoViewer", changeHistoryState);
		
		var callerDiv = callerImage.parent();
		var callerGallery = callerDiv.parent();
		var loadingIcon;
		var photoImage;
		var photoWidth;
		var photoHeight;
		var photoCaption;
		var photoButtonLeft;
		var photoButtonRight;
		var newCallerImage;
		
		if($("#PhotoFrame").length === 0){
			if(!historyCall){
				photoViewerHistoryID = 0;
				photoViewerHistory = [];
				history.pushState(photoViewerHistoryID, "Viewing Photo", location.href);
			}
			createFrame();
		}
		createLoadingIcon();
		createPhoto();
		
		function createFrame(){
			photoFrame = $("<div></div>").attr("id", "PhotoFrame").prependTo($("body")).click(closePhotoViewer);
			closeButton = $("<div>X</div>").attr("id", "CloseButton").prependTo(photoFrame);
			photoFrame.fadeIn(1000).focus();
			if((callerGallery.attr("class") === "PhotoGallery") && (callerGallery.children.length > 1)){
				photoFrame.data("isGallery", true);
			}else{
				photoFrame.data("isGallery", false);
			}
		}

		function createLoadingIcon(){
			loadingIcon = $("<div></div>").attr("id", "LoadingIcon").appendTo(photoFrame);
			loadingIcon.append($("<h2></h2>").text("Image").appendTo(loadingIcon),
				$("<img />").attr("src", "/images/Loading.gif").attr("alt", "Image Loading Icon").appendTo(loadingIcon),
				$("<h2></h2>").text("Loading").appendTo(loadingIcon));
			centerLoadingIcon();
			$(window).on("resize.photoViewer.loadingIcon", centerLoadingIcon);
		
			function centerLoadingIcon(){
				centerElement(loadingIcon);
			}
		}
		
		function deleteLoadingIcon(){
			loadingIcon.fadeOut(500, function(){$(this).remove();});
			$(window).off("resize.photoViewer.loadingIcon");
		}
		
		function createPhoto(){
			var thumbnailSource = callerImage.attr("src");
			var photoSource;
			if(thumbnailSource.indexOf("\/tb\/tb_") !== -1){
				photoSource = thumbnailSource.replace("\/tb\/tb_","\/");
			}else{
				photoSource = thumbnailSource;
			}
			photoImage = $("<img />").attr("id", "Photo").attr("src", photoSource).attr("alt", callerImage.attr("alt")).appendTo(photoFrame);
			photoCaption = $("<div></div>").attr("id", "PhotoCaption").html("<h6 style=\"font-size: 16px; margin: 3.20px 0px;\">" + callerImage.attr("title") + "</h6><p style=\"font-size: 16px;\">" + callerImage.attr("alt") + "</p>").appendTo(photoFrame);
			if(photoFrame.data("isGallery")){
				photoButtonLeft = $("<div></div>").attr("id", "PhotoButtonLeft").appendTo(photoFrame).click(function(event){event.stopPropagation(); switchPhoto(prevPhoto);}).css("opacity", 0.9);
				photoButtonRight = $("<div></div>").attr("id", "PhotoButtonRight").appendTo(photoFrame).click(function(event){event.stopPropagation(); switchPhoto(nextPhoto);}).css("opacity", 0.9);
			}
			photoImage.on("load", function(){
				photoWidth = photoImage.width();
				photoHeight = photoImage.height();
				resizePhoto();
				showPhoto();
			});
		}
		
		function resizePhoto(){
			var photoRatio = photoWidth / photoHeight;
			var newWidth = photoWidth;
			var newHeight = photoHeight;
			var photoBorderTop = parseFloat(photoImage.css("border-top-width"));
			var photoBorderBottom = parseFloat(photoImage.css("border-bottom-width"));
			var photoBorderHeight = photoBorderTop + photoBorderBottom;
			var photoBorderLeft = parseFloat(photoImage.css("border-left-width"));
			var photoBorderRight = parseFloat(photoImage.css("border-right-width"));
			var photoBorderWidth = photoBorderLeft + photoBorderRight;
			if(photoWidth > ($(window).width() - photoBorderWidth)){
				newWidth = $(window).width() - photoBorderWidth;
			}
			if(photoHeight >= ($(window).height() - photoBorderHeight)){
				newHeight = $(window).height() - photoBorderHeight;
			}
			if((newWidth/newHeight) > photoRatio){
				newWidth = newHeight * photoRatio;
			}
			else{
				newHeight = newWidth / photoRatio;
			}
			photoImage.height(newHeight).width(newWidth);
			centerElement(photoImage);
			var photoImageTop = parseFloat(photoImage.css("top"));
			var photoImageLeft = parseFloat(photoImage.css("left"));
			closeButton.css("top", photoImageTop + 1).css("left", photoImageLeft + photoBorderLeft + newWidth - 1);
			if(photoFrame.data("isGallery")){
				photoButtonLeft.height(newHeight).width(newWidth/5).css("top", photoImageTop + photoBorderTop).css("left", photoImageLeft + photoBorderLeft).css("lineHeight", newHeight + "px");//.css("fontSize", Math.ceil(newHeight/3) + "px");
				photoButtonRight.height(newHeight).width(newWidth/5).css("top", photoImageTop + photoBorderTop).css("left", photoImageLeft + photoBorderLeft + (newWidth * 0.8)).css("lineHeight", newHeight + "px");//.css("fontSize", Math.ceil(newHeight/3) + "px");				
			}
			photoCaption.width(newWidth).css("top", photoImageTop + newHeight + photoBorderTop);
			centerElement(photoCaption, true, false);
		}
		
		function centerElement(elementToCenter, x, y){
			if(x){
				var elementWidth = elementToCenter.width();
				var elementBorderWidth = parseFloat(elementToCenter.css("border-left-width")) + parseFloat(elementToCenter.css("border-right-width"));
				elementToCenter.css("left", ($(window).width() - elementWidth - elementBorderWidth)/2);
			}
			if(y){
				var elementHeight = elementToCenter.height();
				var elementBorderHeight = parseFloat(elementToCenter.css("border-top-width")) + parseFloat(elementToCenter.css("border-bottom-width"));
				elementToCenter.css("top", (($(window).height() - elementHeight - elementBorderHeight))/2)
			}
		}
		
		function showPhoto(){
			if(!historyCall){
				photoViewerHistory.push(callerImage);
			}
			deleteLoadingIcon();
			photoImage.show();
			photoCaption.show();
			if(photoFrame.data("isGallery")){
				photoButtonLeft.show();
				photoButtonRight.show();
				setTimeout(function(){photoButtonLeft.css("opacity", ""); photoButtonRight.css("opacity", "");}, 1000);
				$(document).on("swiperight.photoViewer", function(){switchPhoto(prevPhoto);});
				$(document).on("swipeleft.photoViewer",  function(){switchPhoto(nextPhoto);});
			}
			$(window).on("resize.photoViewer.photo", resizePhoto);
			$(document).on("keydown.photoViewer", keyboardResponse);
		}
		
		function keyboardResponse(){
			switch(event.which){
				case 27:// escape
					closePhotoViewer();
				break;
				case 33:case 37:case 38:case 65:case 87:case 100:case 104:// PgUp/left/up/A/W/4/8
					switchPhoto(prevPhoto);
				break;
				case 34:case 39:case 40:case 68:case 83:case 102:case 101:// PgDw/right/down/D/S/6/5
					switchPhoto(nextPhoto);
				break;
			}
		}
		
		function switchPhoto(switchDirection){
			if(photoFrame.data("isGallery")){
				photoViewerHistoryID++;
				history.pushState(photoViewerHistoryID, "Viewing Photo", location.href);
				switchDirection();
				hidePhoto();
				createPhotoViewer(newCallerImage);
			}
		}
		
		function prevPhoto(){
			if(callerDiv.is(callerGallery.children().first("div"))){
				newCallerImage = $(callerGallery.children().last("div").children().first("img").get(0));
			}else{
				newCallerImage = $(callerDiv.prev("div").children().first("img").get(0));
			}
		}
		
		function nextPhoto(){
			if(callerDiv.is(callerGallery.children().last("div"))){
				newCallerImage = $(callerGallery.children().first("div").children().first("img").get(0));
			}else{
				newCallerImage = $(callerDiv.next("div").children().first("img").get(0));
			}
		}
		
		function changeHistoryState(){
			if(typeof history.state !== "number" || history.state <= photoViewerHistoryID){ // Back Button
				if(photoViewerHistoryID > 0){ // Go back to previously displayed photo
					photoViewerHistoryID--;
					hidePhoto();
					createPhotoViewer(photoViewerHistory[photoViewerHistoryID], true);
				}else{ // No more previous photos to go back to
					closePhotoViewer();
				}
			}else{ // Forward Button
				photoViewerHistoryID++;
				hidePhoto();
				createPhotoViewer(photoViewerHistory[photoViewerHistoryID], true);
			}
		}
		
		function hidePhoto(){
			deleteLoadingIcon();
			photoImage.remove();
			photoCaption.remove();
			if(photoFrame.data("isGallery")){
				photoButtonLeft.remove();
				photoButtonRight.remove();
				$(document).off("swiperight.photoViewer");
				$(document).off("swipeleft.photoViewer");
			}
			$(window).off("resize.photoViewer");
			$(document).off("keydown.photoViewer");
			$(window).off("popstate.photoViewer");
		}
		
		function closePhotoViewer(event){
			var viaBack = event === undefined ? true : false;
			hidePhoto();
			photoFrame.fadeOut(500, function(){$(this).remove();});
			$(window).on("popstate.photoViewer", backAtBeginning);
			if(!viaBack){
				history.go(-(photoViewerHistoryID + 1));
			}else{
				backAtBeginning();
			}
		}
		
		function backAtBeginning(){ // This function is necessary to not trigger forwardButtonListener from last history.go
			$(window).off("popstate.photoViewer");
			$(window).on("popstate.photoViewer", forwardButtonListener);
		}
		
		function forwardButtonListener(){
			$(window).off("popstate.photoViewer");
			$(window).on("popstate.photoViewer", restartPhoto);
			if(photoViewerHistoryID > 0){
				history.go(photoViewerHistoryID);
			}else{
				restartPhoto();
			}
		}
		
		function restartPhoto(){
			$(window).off("popstate.photoViewer");
			createPhotoViewer(photoViewerHistory[photoViewerHistoryID], true);
		}
	}
}