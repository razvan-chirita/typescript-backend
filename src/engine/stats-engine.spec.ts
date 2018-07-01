import { cacheHit, cacheMiss, fileMiss, getStats, resetStats } from './stats-engine';
import { expect } from 'chai';
import { getFile, clearCache } from './cache-engine';

describe('sample test-suite', () => {
  it('2 cache hit tests', () => {
    resetStats();
    cacheHit();
    cacheHit();
    const res = getStats();
    expect(res.cacheHits).eql(2);
  });

  it('2 cache miss tests', () => {
    resetStats();
    cacheMiss();
    cacheMiss();
    const res = getStats();
    expect(res.cacheMisses).eql(2);
  });

  it('2 file miss tests', () => {
    resetStats();
    fileMiss();
    fileMiss();
    const res = getStats();
    expect(res.fileMisses).eql(2);
  });

  it('1 cache miss', () => {
    resetStats();
    clearCache();

    getFile('test.jpg', null, data => {
      const res = getStats();
      expect(res.cacheMisses).eql(1);
    });
  });

  it('1 cache hit', () => {
    resetStats();
    clearCache();

    getFile('test.jpg', null, data => {
      getFile('test.jpg', null, data => {
        const res = getStats();
        expect(res.cacheHits).eql(1);
      });
    });
  });

  it('1 file miss', () => {
    resetStats();
    clearCache();

    getFile('test-asdasd.jpg', null, data => {
      const res = getStats();
      expect(res.fileMisses).eql(1);
    });
  });
});
