import { ComparisonStrategy, ComparisonStrategyResultObject } from "../atomic.js";
export declare const calculateCosineSimilarity: (strA: string, strB: string) => number;
/**
 * Compares whole tokens (words) within a string independent of order
 *
 * This strategy is automatically disabled for strings with less than 4 words because it can lead to inaccurate scores due to not comparing characters IE it is not very useful for short sentences and comparing single words with typos
 *
 * If you'd like to use it even in these scenarios build your own strategy array using cosineStrategyAggressive instead of this one
 * */
export declare const cosineStrategy: ComparisonStrategy<ComparisonStrategyResultObject>;
/**
 * Always runs (strings are always valid) which may lead to inaccurate scores in low token-count strings
 * */
export declare const cosineStrategyAggressive: ComparisonStrategy<ComparisonStrategyResultObject>;
