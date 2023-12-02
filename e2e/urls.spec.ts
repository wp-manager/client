import { mount } from "@vue/test-utils";
import WordpressAuth from "../src/utils/wordpressAuth";
import test, { expect } from "@playwright/test";
import { isValidURL } from "../src/utils/url";

test("URL validator works correctly", () => {
    const validURLs = [
        "example.com",
        "http://example.com/",
        "http://www.example.com/",
        "https://www.example.com/",
        "https://example.com/",
    ];

    validURLs.forEach((url) => {
        const isValid = isValidURL(url);
        expect(isValid).toBeTruthy();
    });

    const invalidURLs = [
        "",
        undefined,
        false,
        true,
        0,
        null,
        "example",
        ".com",
        "http://",
        "https://example./com",
    ];

    invalidURLs.forEach((url) => {
        const isValid = isValidURL(url as any);
        expect(isValid).toBeFalsy();
    });
});
