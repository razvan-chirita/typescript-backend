import { CachedImage } from '../types/cached-image.type';
import { cacheHit, fileMiss, cacheMiss } from './stats-engine';

var fs = require('fs');
// var Canvas = require('canvas'),
//   Image = Canvas.Image,
//   canvas = new Canvas(200, 200),
//   ctx = canvas.getContext('2d');
var base_path = __dirname + '/../../images/';
var cache: CachedImage[] = [];
var stats: any;
var resizeImage = require('resize-image');

export function getFile(name: string, resolution: string, resolved: any) {
  let image: CachedImage = null;

  // look in cache for the image by name
  for (let index = 0; index < cache.length; index++) {
    const element = cache[index];

    if (element.name === name) {
      image = element;
      cacheHit();
      break;
    }
  }

  console.log('[  gF]: image ' + name + ' was ' + (image == null ? 'not ' : '') + 'found in cache.');

  // if image was not found, then read from disk, and add to cache
  if (image == null) {
    var image_path: string = base_path + name;

    if (fs.existsSync(image_path)) {
      var image_stats = fs.statSync(image_path);
      var image_file = fs.readFileSync(image_path);
      var image_extension = getExtension(image_path);

      image = {
        name: name,
        extension: image_extension,
        changeDate: image_stats.mtime,
        originalImage: {
          image: image_file,
          resolutionX: null,
          resolutionY: null
        },
        cachedResolutions: []
      };

      cache.push(image);
      cacheMiss();
    } else {
      fileMiss();
    }

    console.log('[  gF]: image ' + name + ' was ' + (image == null ? 'not ' : '') + 'found in the file system.');
  } else {
    // TODO check modified time and refresh cache
    // var image_stats = fs.statSync(image_path);
  }

  if (image == null) {
    // still no image found either on disk or in memory cache
    // bad request: TODO return string with error
    resolved(null);
  } else {
    getScaledFileVersion(image, resolution, resolved);
  }
}

export function getScaledFileVersion(cacheEntry: CachedImage, resolution: string, resolved: any) {
  // if no resolution was requested, then return original image
  if (resolution == null || resolution === '') {
    console.log('[gSFV]: image ' + cacheEntry.name + ' was requested with no specific resolution (original).');
    resolved(cacheEntry.originalImage.image);
  } else {
    // else split resolution by X and Y
    let resolutionX: number;
    let resolutionY: number;

    try {
      resolutionX = getResolutionX(resolution);
      resolutionY = getResolutionY(resolution);

      console.log('[gSFV]: image ' + cacheEntry.name + ' was requested with resolutionX: ' + resolutionX);
      console.log('[gSFV]: image ' + cacheEntry.name + ' was requested with resolutionY: ' + resolutionY);
    } catch {
      // resolution is in an invalid format
      // bad request: TODO return string with error
      resolved(null);
      return;
    }

    // for now original image has no resolutionX or resolutionY calculated, but if it will in a later version,
    // it will return original if it fits resolution requirement
    if (cacheEntry.originalImage.resolutionX === resolutionX && cacheEntry.originalImage.resolutionY === resolutionY) {
      resolved(cacheEntry.originalImage.image);
    } else {
      let cached_image: any = null;

      // look in cached resolutions for the requested resolution
      for (let index = 0; index < cacheEntry.cachedResolutions.length; index++) {
        const element = cacheEntry.cachedResolutions[index];

        if (element.resolutionX === resolutionX && element.resolutionY === resolutionY) {
          cached_image = element.image;
          break;
        }
      }

      console.log(
        '[gSFV]: image ' + cacheEntry.name + ' was ' + (cached_image == null ? 'not ' : '') + 'found in the file system (res: ' + resolution + ').'
      );

      // if it was not found, use resize-image to calculate the resized image (this method seems more like a hack than actual resize)
      if (cached_image == null) {
        // var img = new Image;
        // console.log(JSON.stringify(img));
        // img.src = cacheEntry.originalImage.image;
        // var res = ctx.drawImage(img, 0, 0, img.width / 4, img.height / 4);
        // console.log(res);

        var img = new Image;
        img.onload = function() {
          var data = resizeImage.resize(img, resolutionX, resolutionY, getExtensionObject(cacheEntry.extension));

          cached_image = {
            image: Buffer.from(data).toString('base64'),
            resolutionX: resolutionX,
            resolutionY: resolutionY
          };

          console.log(
            '[gSFV]: image ' +
              cacheEntry.name +
              ' was resized (original bytes: ' +
              cacheEntry.originalImage.image.length +
              ' ; resized bytes: ' +
              data.length +
              ').'
          );

          // add new resize to cache
          cacheEntry.cachedResolutions.push(cached_image);

          resolved(data);
        };
        // it uses original image for scaling
        img.src = 'data:image/jpeg;base64,' + cacheEntry.originalImage.image;
      } else {
        console.log('[gSFV]: image ' + cacheEntry.name + ' was returned from cache.');

        resolved(cached_image);
      }
    }
  }
}

export function getExtension(path: string): string {
  return 'JPEG';
}

export function getExtensionObject(extension: string): any {
  return resizeImage.JPEG;
}

export function getResolutionX(resolution: string): number {
  return 200;
}

export function getResolutionY(resolution: string): number {
  return 100;
}
