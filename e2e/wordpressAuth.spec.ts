import { mount } from '@vue/test-utils';
import WordpressAuth from '../src/utils/wordpressAuth';
import test, { expect } from '@playwright/test';

test('constructor handles URL correctly', () => {
    const validURLs = [
        'example.com',
        'http://example.com/',
        'http://www.example.com/',
        'https://www.example.com/',
        'https://example.com/',
    ];

    validURLs.forEach(url => {
        const auth = new WordpressAuth(url);
        expect(auth.uri).toBe('example.com');
    });

    const invalidURLs = [
        '',
        undefined,
        false,
        true,
        0,
        null,
        'example',
        '.com',
        'http://',
        'https://example./com'
    ];

    invalidURLs.forEach(url => {
        expect(() => {
            new WordpressAuth(url as any);
        }).toThrow('Invalid URL.');
    });
});