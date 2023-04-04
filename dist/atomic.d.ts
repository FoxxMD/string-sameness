export interface StringComparisonOptions {
    transforms?: ((str: string) => string)[];
    strategies?: ComparisonStrategy[];
}
export interface StringSamenessResult {
    strategies: {
        [key: string]: ComparisonStrategyResult;
    };
    highScore: number;
    highScoreWeighted: number;
}
export interface ComparisonStrategyResultObject {
    score: number;
    [key: string]: any;
}
export interface ComparisonStrategyResult extends ComparisonStrategyResultObject {
}
export interface NamedComparisonStrategyObjectResult extends ComparisonStrategyResultObject {
    name: string;
}
export type ComparisonStrategyResultValue = number | ComparisonStrategyResultObject;
export type StrategyFunc = (strA: string, strB: string) => ComparisonStrategyResultValue;
export interface ComparisonStrategy {
    /**
     * The name of this strategy
     * */
    name: string;
    /**
     * A function that accepts two string arguments and returns a number
     * */
    strategy: StrategyFunc;
    /**
     * An optional function that accepts to string arguments and returns whether this strategy should be used
     * */
    isValid?: (strA: string, strB: string) => boolean;
}
