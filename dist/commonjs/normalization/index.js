"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strDefaultTransforms = exports.transforms = exports.replaceMultiWhitespace = exports.removeWhitespace = exports.removePunctuation = exports.replaceUnicode = exports.trim = exports.lowercase = void 0;
const PUNCTUATION_REGEX = new RegExp(/[^\w\s]|_/g);
const WHITESPACE_REGEX = new RegExp(/\s/g);
const MULTI_WHITESPACE_REGEX = new RegExp(/\s{2,}/g);
const lowercase = (str) => str.toLocaleLowerCase();
exports.lowercase = lowercase;
const trim = (str) => str.trim();
exports.trim = trim;
const replaceUnicode = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
exports.replaceUnicode = replaceUnicode;
const removePunctuation = (str) => str.replace(PUNCTUATION_REGEX, '');
exports.removePunctuation = removePunctuation;
const removeWhitespace = (str) => str.replace(WHITESPACE_REGEX, '');
exports.removeWhitespace = removeWhitespace;
const replaceMultiWhitespace = (str) => str.replace(MULTI_WHITESPACE_REGEX, ' ');
exports.replaceMultiWhitespace = replaceMultiWhitespace;
const transforms = {
    lowercase,
    trim,
    replaceMultiWhitespace,
    replaceUnicode,
    removeWhitespace,
    removePunctuation
};
exports.transforms = transforms;
const strDefaultTransforms = [
    replaceUnicode,
    removePunctuation,
    trim,
    replaceMultiWhitespace,
    lowercase
];
exports.strDefaultTransforms = strDefaultTransforms;
//# sourceMappingURL=index.js.map