import { Stats } from "../types/stats.type";

var stats: Stats = new Stats();

export function cacheHit() {
  stats.cacheHits++;
}

export function cacheMiss() {
  stats.cacheMisses++;
}

export function fileMiss() {
  stats.fileMisses++;
}

export function getStats(): Stats {
  return stats;
}

export function resetStats() {
  stats = new Stats();
}
