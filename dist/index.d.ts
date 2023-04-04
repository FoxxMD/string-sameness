import { StringComparisonOptions, StringSamenessResult } from "./atomic";
declare const defaultStrCompareTransformFuncs: ((str: string) => string)[];
declare const defaultStrategies: import("./atomic").ComparisonStrategy[];
declare const stringSameness: (valA: string, valB: string, options?: StringComparisonOptions) => StringSamenessResult;
declare const createStringSameness: (defaults: StringComparisonOptions) => (valA: string, valB: string, options?: StringComparisonOptions) => StringSamenessResult;
export { StringSamenessResult, StringComparisonOptions, stringSameness, createStringSameness, defaultStrategies, defaultStrCompareTransformFuncs };
