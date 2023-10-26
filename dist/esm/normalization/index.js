const PUNCTUATION_REGEX = new RegExp(/[^\w\s]|_/g);
const WHITESPACE_REGEX = new RegExp(/\s/g);
const MULTI_WHITESPACE_REGEX = new RegExp(/\s{2,}|\n/g);
const lowercase = (str) => str.toLocaleLowerCase();
const trim = (str) => str.trim();
const replaceUnicode = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
const removePunctuation = (str) => str.replace(PUNCTUATION_REGEX, '');
const removeWhitespace = (str) => str.replace(WHITESPACE_REGEX, '');
const replaceMultiWhitespace = (str) => str.replace(MULTI_WHITESPACE_REGEX, '');
const transforms = {
    lowercase,
    trim,
    replaceMultiWhitespace,
    replaceUnicode,
    removeWhitespace,
    removePunctuation
};
const strDefaultTransforms = [
    replaceUnicode,
    removePunctuation,
    trim,
    replaceMultiWhitespace,
    lowercase
];
export { lowercase, trim, replaceUnicode, removePunctuation, removeWhitespace, replaceMultiWhitespace, transforms, strDefaultTransforms };
//# sourceMappingURL=index.js.map