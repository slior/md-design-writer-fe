import pako from 'pako';
import { encodeForUrl } from './utils';
import { TextEncoder , TextDecoder } from 'util';
global.TextEncoder = TextEncoder

describe('encodeForUrl', () => {
    // Test basic encoding
    test('should encode a simple string correctly', () => {
        const input = 'Hello World';
        const encoded = encodeForUrl(input);
        
        // Verify it's not empty
        expect(encoded).toBeTruthy();
        // Verify it's a string
        expect(typeof encoded).toBe('string');
        // Verify it's URL-safe (no +, /, or = characters)
        expect(encoded).not.toMatch(/[+/=]/);
    });

    // Test empty string
    test('should handle empty string input', () => {
        const input = '';
        const encoded = encodeForUrl(input);
        expect(encoded).toBeTruthy(); // Should return valid encoding even for empty string
    });

    // Test special characters
    test('should handle special characters correctly', () => {
        const input = '@startuml\nA -> B: Hello\n@enduml';
        const encoded = encodeForUrl(input);
        expect(encoded).toBeTruthy();
        expect(encoded).not.toMatch(/[+/=]/);
    });

    // Test Unicode characters
    test('should handle Unicode characters', () => {
        const input = '你好世界';
        const encoded = encodeForUrl(input);
        expect(encoded).toBeTruthy();
        expect(encoded).not.toMatch(/[+/=]/);
    });

    // Test long input
    test('should handle long input strings', () => {
        const input = '@startuml\n' + 'A -> B: Hello\n'.repeat(100) + '@enduml';
        const encoded = encodeForUrl(input);
        expect(encoded).toBeTruthy();
        expect(encoded).not.toMatch(/[+/=]/);
    });

    // Test compression is working
    test('should produce compressed output', () => {
        const input = 'A'.repeat(1000);
        const encoded = encodeForUrl(input);
        // Compressed output should be significantly shorter than base64 of original
        expect(encoded.length).toBeLessThan(btoa(input).length);
    });

    // Test URL safety
    test('should produce URL-safe output', () => {
        const input = '@startuml\nA -> B: Hello + / = \n@enduml';
        const encoded = encodeForUrl(input);
        expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    // Test error cases
    test('should throw on invalid input', () => {
        const invalidInput = { toString: () => { throw new Error('Invalid input'); } };
        expect(() => encodeForUrl(invalidInput as any)).toThrow();
    });

    // Test roundtrip
    test('should be decodeable', () => {
        const input = '@startuml\nA -> B: Hello\n@enduml';
        const encoded = encodeForUrl(input);
        
        // Decode the string (reverse the encoding process)
        const base64 = encoded
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        const decompressed = pako.inflate(bytes);
        const decoder = new TextDecoder();
        const decoded = decoder.decode(decompressed);
        
        expect(decoded).toBe(input);
    });
});