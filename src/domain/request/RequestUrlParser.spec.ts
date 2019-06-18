const { describe, it } = require('mocha');
const { expect } = require('chai');
const RequestUrlParser = require('./RequestUrlParser');

describe('RequestUrlParser', () => {
  describe('resolving raw url from wrapped url', () => {
    it('should return raw http url', () => {
      // given
      const wrappedUrl = 'json(http://example.com).key1';
      // when
      const rawUrl = RequestUrlParser.resolveRawUrl(wrappedUrl);

      // then
      expect(rawUrl).to.equal('http://example.com');
    });

    it('should return raw https url', () => {
      // given
      const wrappedUrl = 'json(https://example.com).key1';
      // when
      const rawUrl = RequestUrlParser.resolveRawUrl(wrappedUrl);

      // then
      expect(rawUrl).to.equal('https://example.com');
    });

    it('should throw error if now valid url found', () => {
      // given
      const wrappedUrl = 'json(example.com).key1';
      // when
      expect(() => RequestUrlParser.resolveRawUrl(wrappedUrl)).to.throw();
    });
  });

  describe('resolving request type from wrapped url', () => {
    it('should correctly resolve json pattern', () => {
      // given
      const wrappedUrl = 'json(http://someurl.example.com).value1';
      // when
      const type = RequestUrlParser.resolveContentType(wrappedUrl);
      // then
      expect(type).to.equal('json');
    });

    it('should correctly resolve xml pattern', () => {
      // given
      const wrappedUrl = 'xml(http://someurl.example.com)/value1';
      // when
      const type = RequestUrlParser.resolveContentType(wrappedUrl);
      // then
      expect(type).to.equal('xml');
    });

    it('should correctly resolve html pattern', () => {
      // given
      const wrappedUrl = 'html(http://someurl.example.com)/html/head';
      // when
      const type = RequestUrlParser.resolveContentType(wrappedUrl);
      // then
      expect(type).to.equal('html');
    });

    it('should correctly resolve ipfs pattern', () => {
      // given
      const wrappedUrl = 'ipfs(QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o)';
      // when
      const type = RequestUrlParser.resolveContentType(wrappedUrl);
      // then
      expect(type).to.equal('ipfs');
    });

    it('should throw error if cannot resolve request type', () => {
      // given
      const wrappedUrl = 'notexist(http://someurl.example.com).value1';
      // when
      expect(() => RequestUrlParser.resolveContentType(wrappedUrl)).to.throw();
    });
  });

  describe('resolving selection path', () => {
    it('should correctly resolve path from wrapped url', () => {
      // given
      const wrappedUrl = 'json(http://someurl.example.com).value1';
      // when
      const path = RequestUrlParser.resolveSelectionPath(wrappedUrl);
      // then
      expect(path).to.equal('.value1');
    });

    it('should allow to resolve empty path from wrapped url', () => {
      // given
      const wrappedUrl = 'json(http://someurl.example.com)';
      // when
      const path = RequestUrlParser.resolveSelectionPath(wrappedUrl);
      // then
      expect(path).to.equal('');
    });
  });
});
