import { StringTransformFunc } from "../atomic.js";
declare const lowercase: StringTransformFunc;
declare const trim: StringTransformFunc;
declare const replaceUnicode: StringTransformFunc;
declare const removePunctuation: StringTransformFunc;
declare const removeWhitespace: StringTransformFunc;
declare const replaceMultiWhitespace: StringTransformFunc;
declare const transforms: {
    lowercase: StringTransformFunc;
    trim: StringTransformFunc;
    replaceMultiWhitespace: StringTransformFunc;
    replaceUnicode: StringTransformFunc;
    removeWhitespace: StringTransformFunc;
    removePunctuation: StringTransformFunc;
};
declare const strDefaultTransforms: StringTransformFunc[];
export { lowercase, trim, replaceUnicode, removePunctuation, removeWhitespace, replaceMultiWhitespace, transforms, strDefaultTransforms };
