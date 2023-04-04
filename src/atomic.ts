export interface StringComparisonOptions {
    transforms?: ((str: string) => string)[]
    strategies?: ComparisonStrategy[]
}

export interface StringSamenessResult {
    strategies: {
        [key: string]: ComparisonStrategyResult
    },
    highScore: number
    highScoreWeighted: number
}

export interface ComparisonStrategyResultObject {
    /**
     * The normalized (0 to 100) score of this comparison
     * */
    score: number
    /**
     * The raw value returned by the comparison (not normalized)
     * */
    rawScore?: number

    [key: string]: any
}

export interface ComparisonStrategyResult extends ComparisonStrategyResultObject {
    // TODO maybe add more things in the future
    //scoreFormatted: string
}

export interface NamedComparisonStrategyObjectResult extends ComparisonStrategyResultObject {
    name: string
}

export type ComparisonStrategyResultValue = number | ComparisonStrategyResultObject;

export type StrategyFunc = (strA: string, strB: string) => ComparisonStrategyResultValue;

export interface ComparisonStrategy {
    /**
     * The name of this strategy
     * */
    name: string
    /**
     * A function that accepts two string arguments and returns a number
     * */
    strategy: StrategyFunc

    /**
     * An optional function that accepts two string arguments and returns whether this strategy should be used
     * */
    isValid?: (strA: string, strB: string) => boolean
}
