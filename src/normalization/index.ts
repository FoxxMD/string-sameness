import {StringTransformFunc} from "../atomic.js";

const PUNCTUATION_REGEX = new RegExp(/[`=(){}<>;',.~!@#$%^&*_+|:"?\-\\\[\]\/]/g);
const NON_ALPHANUMERIC_REGEX = new RegExp(/[^\w\s]|_/g);
const WHITESPACE_REGEX = new RegExp(/\s/g);
const MULTI_WHITESPACE_REGEX = new RegExp(/\s{2,}/g);

const lowercase: StringTransformFunc = (str: string) => str.toLocaleLowerCase();
const trim: StringTransformFunc = (str: string) => str.trim();
const replaceUnicode: StringTransformFunc = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
const removePunctuation: StringTransformFunc = (str: string) => str.replace(PUNCTUATION_REGEX, '');
const removeNonAlphanumeric: StringTransformFunc = (str: string) => str.replace(NON_ALPHANUMERIC_REGEX, '');
const removeWhitespace: StringTransformFunc = (str: string) => str.replace(WHITESPACE_REGEX, '');
const replaceMultiWhitespace: StringTransformFunc = (str: string) => str.replace(MULTI_WHITESPACE_REGEX, ' ');

const transforms = {
    lowercase,
    trim,
    replaceMultiWhitespace,
    replaceUnicode,
    removeWhitespace,
    removePunctuation
}

const strDefaultTransforms: StringTransformFunc[] = [
    replaceUnicode,
    removePunctuation,
    trim,
    replaceMultiWhitespace,
    lowercase
];

export {
    lowercase,
    trim,
    replaceUnicode,
    removePunctuation,
    removeWhitespace,
    removeNonAlphanumeric,
    replaceMultiWhitespace,
    transforms,
    strDefaultTransforms
}
