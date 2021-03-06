import { expect } from '@core/config/configuredChai';
import { describe, it } from 'mocha';

import XmlResultConverter from './XmlResultConverter';

describe('XmlResultConverter', () => {
  it('should return null if empty collection passed', () => {
    // given
    const data: any = [];
    // when
    const result: string = XmlResultConverter.toString(data);
    // then
    expect(result).to.equal(null);
  });

  it('should return single element as a string', () => {
    // given
    const data = ['a'];
    // when
    const result = XmlResultConverter.toString(data);
    // then
    expect(result).to.equal('a');
  });

  it('should return serialized collection wrapped by resultlist and resulttag if elements are values', () => {
    // given
    const data = [{ nodeValue: 'a' }, { nodeValue: 'b' }];
    // when
    const result = XmlResultConverter.toString(data);
    // then
    expect(result).to.equal('<resultlist><result>a</result><result>b</result></resultlist>');
  });

  it('should return serialized collection wrapped by resultlist only if elements are nodes', () => {
    // given
    const data = ['<el>a</el>', '<el>b</el>'];
    // when
    const result = XmlResultConverter.toString(data);
    // then
    expect(result).to.equal('<resultlist><el>a</el><el>b</el></resultlist>');
  });
});
