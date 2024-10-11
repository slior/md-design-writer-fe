
import { extractTitleFromContent } from "./utils";

describe('extractTitleFromContent', () => 
{
    it('should handle empty or undefined content', () =>
    {
        expect(extractTitleFromContent({})).toBe('');
        expect(extractTitleFromContent({ content: '' })).toBe('');
        expect(extractTitleFromContent({ content: '\n\n' })).toBe('');
    });

    it('should extract simple text titles', () =>
    {
        expect(extractTitleFromContent({ content: 'Simple Title\nBody text' }))
                .toBe('Simple Title');
        
        expect(extractTitleFromContent({ content: 'Simple Title\n\nBody text' }))
                .toBe('Simple Title');
    });

    it('should remove markdown heading syntax', () =>
    {
        expect(extractTitleFromContent({ content: '# Heading 1\nBody'  }))
                .toBe('Heading 1');
        
        expect(extractTitleFromContent({ content: '## Heading 2\nBody' }))
                .toBe('Heading 2');
        
        expect(extractTitleFromContent({ content: '### Heading 3\nBody' }))
                .toBe('Heading 3');
    });

    it('should remove bold and italic markers', () => 
    {
        expect(extractTitleFromContent({  content: '**Bold Title**\nBody'  }))
                .toBe('Bold Title');
        
        expect(extractTitleFromContent({ content: '*Italic Title*\nBody' }))
                .toBe('Italic Title');
        
        expect(extractTitleFromContent({ content: '***Bold Italic***\nBody' }))
                .toBe('Bold Italic');
        
        expect(extractTitleFromContent({ content: '_Underscore Italic_\nBody' }))
                .toBe('Underscore Italic');
    });

    it('should handle links correctly', () =>
    {
        expect(extractTitleFromContent({ content: '[Link Text](http://example.com)\nBody' }))
                .toBe('Link Text');
        
        expect(extractTitleFromContent({ content: 'Title with [link](http://example.com) in middle\nBody' }))
                .toBe('Title with link in middle');
    });

    it('should remove inline code markers', () => 
    { 
        expect(extractTitleFromContent({ content: '`Code Title`\nBody'  }))
                .toBe('Code Title');
        
        expect(extractTitleFromContent({ content: 'Title with `code` in middle\nBody' }))
                .toBe('Title with code in middle');
    });

    it('should handle complex combinations of markdown', () =>
    {
        expect(extractTitleFromContent({  content: '## **Bold** _Italic_ [`Code`](http://example.com)\nBody' }))
                .toBe('Bold Italic Code');
        
        expect(extractTitleFromContent({ content: '# The *Quick* **Brown** `Fox`\nJumps over' }))
                .toBe('The Quick Brown Fox');
    });

    it('should skip empty first lines', () =>
    {
        expect(extractTitleFromContent({  content: '\n\nReal Title\nBody' }))
                .toBe('Real Title');
        
        expect(extractTitleFromContent({ content: '   \n  \nReal Title\nBody' }))
                .toBe('Real Title');
    });
});
