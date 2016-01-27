# PhotoViewer
Creates a simple and clean way of displaying photos in a responsive and mobile-friendly way.

To initialize when adding to your own page, include the following files:

- /scripts/PhotoViewer.js
- /scripts/jquery-mobile-swipe-min.js
- /scripts/PHP_Functions.php
- /css/PhotoViewer.css
- The latest version of JQuery

Add 'initPhotoViewer()' JS function to `<body onload=`.
Mark individual images with class "PhotoViewer" or create a scrollable gallery from a folder of images by running the "CreateGallery" PHP function at the location of your choosing. The two parameters to pass are the number of columns you want the photos to be in (they will be resized according to available space) and whether or not you want them in haphazard Polaroid style (true/false).