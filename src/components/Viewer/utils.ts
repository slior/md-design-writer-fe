
import pako from 'pako'

//Utility function to convert string to Uint8Array (browser-compatible replacement for Buffer)
const stringToUint8Array = (str: string): Uint8Array => {
    const encoder = new TextEncoder();
    return encoder.encode(str); // Convert the string to Uint8Array
};

// Utility function to convert Uint8Array to base64 URL-safe string
const uint8ArrayToBase64Url = (array: Uint8Array): string => {
    
    const base64 = btoa(String.fromCharCode.apply(null, Array.from(array))) // Convert Uint8Array to regular base64
    
    return base64 // Make it URL-safe
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};

export const encodeForUrl = (code: string): string => {
    try
    {
        const data = stringToUint8Array(code); // Convert string to Uint8Array
        const compressed = pako.deflate(data, { level: 9}); // Compress using pako
        let result = uint8ArrayToBase64Url(compressed)
        return result;
    }
    catch (error)
    {
        // console.error('Encoding failed:', error);
        throw error;
    }
};
