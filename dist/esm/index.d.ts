import { ComparisonStrategyResult, StringComparisonOptions, StringSamenessResult, StringTransformFunc } from "./atomic.js";
import { strDefaultTransforms, transforms } from "./normalization/index.js";
declare const defaultStrategies: import("./atomic.js").ComparisonStrategy<import("./atomic.js").ComparisonStrategyResultObject>[];
declare const stringSameness: (valA: string, valB: string, options?: StringComparisonOptions) => StringSamenessResult;
declare const createStringSameness: (defaults: StringComparisonOptions) => (valA: string, valB: string, options?: StringComparisonOptions) => StringSamenessResult;
declare const strategies: {
    diceStrategy: import("./atomic.js").ComparisonStrategy<import("./atomic.js").ComparisonStrategyResultObject>;
    levenStrategy: import("./atomic.js").ComparisonStrategy<import("./atomic.js").ComparisonStrategyResultObject>;
    cosineStrategy: import("./atomic.js").ComparisonStrategy<import("./atomic.js").ComparisonStrategyResultObject>;
    cosineStrategyAggressive: import("./atomic.js").ComparisonStrategy<import("./atomic.js").ComparisonStrategyResultObject>;
};
declare const defaultStrCompareTransformFuncs: StringTransformFunc[];
export { StringSamenessResult, StringComparisonOptions, stringSameness, createStringSameness, defaultStrategies, strategies, transforms, defaultStrCompareTransformFuncs, strDefaultTransforms, ComparisonStrategyResult, StringTransformFunc };
