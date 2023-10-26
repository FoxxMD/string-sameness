import { StringComparisonOptions, StringSamenessResult } from "./atomic.js";
declare const defaultStrCompareTransformFuncs: ((str: string) => string)[];
declare const defaultStrategies: import("./atomic.js").ComparisonStrategy[];
declare const stringSameness: (valA: string, valB: string, options?: StringComparisonOptions) => StringSamenessResult;
declare const createStringSameness: (defaults: StringComparisonOptions) => (valA: string, valB: string, options?: StringComparisonOptions) => StringSamenessResult;
declare const strategies: {
    diceStrategy: import("./atomic.js").ComparisonStrategy;
    levenStrategy: import("./atomic.js").ComparisonStrategy;
    cosineStrategy: import("./atomic.js").ComparisonStrategy;
};
export { StringSamenessResult, StringComparisonOptions, stringSameness, createStringSameness, defaultStrategies, strategies, defaultStrCompareTransformFuncs };
