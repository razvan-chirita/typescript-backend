import { getExtension, getResolutionY, getResolutionX, getFile } from './cache-engine';
import { expect } from 'chai';

describe('cache engine operations', () => {
  it('extension of test.jpg should be jpg', () => {
    expect(getExtension('test.jpg')).eql('jpg');
  });

  it('X of 200x100 is 200', () => {
    expect(getResolutionX('200x100')).eql(200);
  });

  it('Y of 200x100 is 100', () => {
    expect(getResolutionY('200x100')).eql(100);
  });

  it('test.jpg should exist', () => {
    getFile('test.jpg', null, (data) => {
      expect(data != null).eql(true);
    });
  });

  it('test-asdasd.png should not exist', () => {
    getFile('test-asdasd.png', null, (data) => {
      expect(data == null).eql(true);
    });
  });
});
