
import { Document } from '../model/Document';

export function extractTitleFromContent(doc : Partial<Document>) : string
{
  if (!doc.content)
    return '';
  else
  {
    // get the first non-empty line
    const firstLine = doc.content
        .split('\n')
        .find(line => line.trim().length > 0) || '';

    return firstLine
        .replace(/^#+\s*/, '') // Remove heading markers (#)
        .replace(/[\*_]{1,3}([^\*_]+)[\*_]{1,3}/g, '$1') // Remove bold/italic markers
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove link text, keeping only the description
        .replace(/`([^`]+)`/g, '$1') // Remove inline code
        .trim();
  }
}