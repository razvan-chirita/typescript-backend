# NodeJS challenge

## Features

Endpoint urls/examples:
 - `/image/test.jpg`: gets the image with the default resolution
 - `/image/test.jpg?size=100x200`: gets the image with the specified resolution (currently not working)
 - `/status`: shows the service status

How to start:
 - clone or download
 - install required third party (see at the end of the readme)
 - `npm install`: installs required npm packages
 - `npm run test`: runs tests
 - `npm run start`: starts app on localhost on port 8081

## Known issues

### Problems

 - resizing does not work (tested with [resize-image](https://www.npmjs.com/package/resize-image) and [canvas](https://www.npmjs.com/package/canvas))
 - no hdd cache (only memory cache)

### Todos

  - Fixes
  - Use [image-size](https://www.npmjs.com/package/image-size) to calculate the original image size

# Requires

Apps and installation tutorials
 - Visual Studio Code (or other editor)
 - npm/node
 - [node-gyp](https://github.com/nodejs/node-gyp)
 - [canvas](https://github.com/Automattic/node-canvas/wiki/Installation---Windows)
