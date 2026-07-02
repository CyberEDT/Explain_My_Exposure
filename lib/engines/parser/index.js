// Parser Factory Class
import NmapXmlParser from './nmapXmlParser.js';
import NmapTextParser from './nmapTextParser.js';
import JsonParser from './jsonParser.js';

export default class ParserFactory {
  static getParser(type) {
    if (type === 'xml') return new NmapXmlParser();
    if (type === 'text') return new NmapTextParser();
    if (type === 'json') return new JsonParser();
    throw new Error('Unsupported parser type: ' + type);
  }
}
