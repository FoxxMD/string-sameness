export interface StringComparisonOptions {
    transforms?: StringTransformFunc[];
    strategies?: ComparisonStrategy<ComparisonStrategyResultValue>[];
}
export interface StringSamenessResult {
    strategies: {
        [key: string]: ComparisonStrategyResult;
    };
    highScore: number;
    highScoreWeighted: number;
}
export interface ComparisonStrategyResultObject {
    /**
     * The normalized (0 to 100) score of this comparison
     * */
    score: number;
    /**
     * The raw value returned by the comparison (not normalized)
     * */
    rawScore?: number;
    [key: string]: any;
}
export interface ComparisonStrategyResult extends ComparisonStrategyResultObject {
}
export interface NamedComparisonStrategyObjectResult extends ComparisonStrategyResultObject {
    name: string;
}
export type ComparisonStrategyResultValue = number | ComparisonStrategyResultObject;
export type StrategyFunc<T extends ComparisonStrategyResultValue> = (strA: string, strB: string) => T;
export interface ComparisonStrategy<T extends ComparisonStrategyResultValue> {
    /**
     * The name of this strategy
     * */
    name: string;
    /**
     * A function that accepts two string arguments and returns a number
     * */
    strategy: StrategyFunc<T>;
    /**
     * An optional function that accepts two string arguments and returns whether this strategy should be used
     * */
    isValid?: (strA: string, strB: string) => boolean;
}
export type StringTransformFunc = (str: string) => string;
