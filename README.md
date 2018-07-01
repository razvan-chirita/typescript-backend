# NodeJS challenge

##Features

Endpoint urls/examples:
 - `/image/test.jpg`: gets the image with the default resolution
 - `/image/test.jpg?size=100x200`: gets the image with the specified resolution (currently not working)
 - `/image-html/test.jpg?size=100x200`: gets the image with the default resolution as a webpage
 - `/image-html/test.jpg?size=100x200`: gets the image with the specified resolution (currently not working)
 - `/status`: shows the service status

##Known issues

 - resizing does not work (tested with [resize-image](https://www.npmjs.com/package/resize-image) and [canvas](https://www.npmjs.com/package/canvas))
 - no hdd cache (only memory cache)

 ##Todos

  - Fixes
  - Use [image-size](https://www.npmjs.com/package/image-size) to calculate the original image size


