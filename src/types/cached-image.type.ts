import { CachedResolution } from './cached-resolution.type';

export class CachedImage {
  public name: string;
  public extension: string;
  public changeDate: Date;

  public originalImage: CachedResolution;
  public cachedResolutions: CachedResolution[];
}
