export interface StringComparisonOptions {
    /**
     * An array of transformations to apply to each string before comparing similarity
     * */
    transforms?: StringTransformFunc[]
    /**
     * An array of strategies used to score similarity. All strategies scores are combined for an average high score.
     * */
    strategies?: ComparisonStrategy<ComparisonStrategyResultValue>[]
    /**
     * Reorder second string so its token match order of first string as closely as possible
     *
     * Useful when only the differences in content are important, but not the order of the content
     * */
    reorder?: boolean

    /**
     * When `reorder` is used this determines how to split each string into the tokens that will be reordered.
     *
     * The value of this property is used in String.split() -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split#separator
     *
     * @default " "
     * */
    delimiter?: string | RegExp
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

export type StrategyFunc<T extends ComparisonStrategyResultValue> = (strA: string, strB: string) => T;

export interface ComparisonStrategy<T extends ComparisonStrategyResultValue> {
    /**
     * The name of this strategy
     * */
    name: string
    /**
     * A function that accepts two string arguments and returns a number
     * */
    strategy: StrategyFunc<T>

    /**
     * An optional function that accepts two string arguments and returns whether this strategy should be used
     * */
    isValid?: (strA: string, strB: string) => boolean
}

export type StringTransformFunc = (str: string) => string;
