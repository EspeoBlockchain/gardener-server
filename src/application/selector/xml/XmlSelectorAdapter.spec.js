const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const XmlSelectorAdapter = require('./XmlSelectorAdapter');

describe('XmlSelectorAdapter', () => {
  let sut;

  beforeEach(() => {
    sut = new XmlSelectorAdapter();
  });

  it('should accept xml content type', () => {
    // given
    const contentType = 'xml';
    // when
    const result = sut.canHandle(contentType);
    // then
    expect(result).to.equal(true);
  });

  it('should accept html content type', () => {
    // given
    const contentType = 'html';
    // when
    const result = sut.canHandle(contentType);
    // then
    expect(result).to.equal(true);
  });

  it('should return null if no match found', () => {
    // given
    const xmlString = '<key1>value1</key1>';
    const responsePath = '/key2';

    // when
    const res = sut.select(xmlString, responsePath);

    // then
    expect(res).to.equal(null, 'Selected data doesn\'t match');
  });

  it('should select all data when no xpath passed', () => {
    // given
    const xmlString = '<key1>value1</key1>';
    // when
    const res = sut.select(xmlString, null);
    // then
    expect(res).to.equal('<key1>value1</key1>');
  });

  it('should throw an error when invalid xpath passed', () => {
    // given
    const xmlString = '<key1>value1</key1>';
    const responsePath = '!?X';

    // when, then
    expect(() => sut.select(xmlString, responsePath)).to.throw();
  });

  it('should throw an error when invalid xml passed', () => {
    // given
    const xmlString = 'value1</key1>';
    const responsePath = '/key1';

    // when, then
    expect(() => sut.select(xmlString, responsePath)).to.throw();
  });

  it('should select simple node from payload', () => {
    // given
    const xmlString = '<key1>value1</key1>';
    const responsePath = '/key1';

    // when
    const res = sut.select(xmlString, responsePath);

    // then
    expect(res).to.equal('<key1>value1</key1>', 'Selected data doesn\'t match');
  });

  it('should select node text from payload', () => {
    // given
    const xmlString = '<key1>value1</key1>';
    const responsePath = '/key1/text()';

    // when
    const res = sut.select(xmlString, responsePath);

    // then
    expect(res).to.equal('value1', 'Selected data doesn\'t match');
  });

  it('should select node attribute from payload', () => {
    // given
    const xmlString = '<key1 a="123">value1</key1>';
    const responsePath = 'string(/key1/@a)';

    // when
    const res = sut.select(xmlString, responsePath);

    // then
    expect(res).to.equal('123', 'Selected data doesn\'t match');
  });

  it('should select multiple nodes and wrapped them into resultlist tag', () => {
    // given
    const xmlString = '<root><child><subchild>a</subchild><subchild>b</subchild>c</child><child><subchild>d</subchild>e</child><single>value</single></root>';
    const responsePath = '//root/child';

    // when
    const res = sut.select(xmlString, responsePath);

    // then
    const expected = '<resultlist><child><subchild>a</subchild><subchild>b</subchild>c</child><child><subchild>d</subchild>e</child></resultlist>';
    expect(res).to.equal(expected);
  });

  it('should select multiple nested nodes and wrapped them into resultlist tag', () => {
    // given
    const xmlString = '<root><child><subchild>a</subchild><subchild>b</subchild>c</child><child><subchild>d</subchild>e</child><single>value</single></root>';
    const responsePath = '//root/child/subchild';

    // when
    const res = sut.select(xmlString, responsePath);

    // then
    const expected = '<resultlist><subchild>a</subchild><subchild>b</subchild><subchild>d</subchild></resultlist>';
    expect(res).to.equal(expected);
  });

  it('should select multiple raw values and wrapped them into result tags into one resultlist tag', () => {
    // given
    const xmlString = '<root><child><subchild>a</subchild><subchild>b</subchild>c</child><child><subchild>d</subchild>e</child><single>value</single></root>';
    const responsePath = '//root/child/subchild/text()';

    // when
    const res = sut.select(xmlString, responsePath);

    // then
    const expected = '<resultlist><result>a</result><result>b</result><result>d</result></resultlist>';
    expect(res).to.equal(expected);
  });
});
