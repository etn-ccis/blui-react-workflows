/**
 * @packageDocumentation
 * @module Helpers
 */

/**
 * A string accompanied by a style tag.
 */
export type ParsedJSXText = {
    tag: string;
    text: string;
};

const tagRegex = /^<(\w+?)>(.+?)<\/(\w+?)>/s;
const beforeTagRegex = /^(.+?)(?=<\w+?>)/s;

const parseNextChunk = (textToParse: string): ParsedJSXText[] => {
    const tagMatch = tagRegex.exec(textToParse);
    const beforeTagMatch = beforeTagRegex.exec(textToParse);

    let tag = 'none';
    let text = '';
    let nextIndex = textToParse.length;

    if (tagMatch) {
        tag = tagMatch[1] ?? '';
        text = tagMatch[2] ?? '';
        nextIndex = tagMatch[0].length;
    } else if (beforeTagMatch) {
        text = beforeTagMatch[1] ?? '';
        nextIndex = beforeTagMatch[0].length;
    } else {
        text = textToParse;
    }

    const result = [{ tag, text }];

    if (textToParse.length > 0) {
        return [...result, ...parseNextChunk(textToParse.substring(nextIndex))];
    }

    return result;
};

export const parseTextForJSX = (parseableText: string): ParsedJSXText[] => parseNextChunk(parseableText);
