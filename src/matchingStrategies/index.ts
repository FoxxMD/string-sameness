import {levenStrategy} from "./levenSimilarity.js";
import {cosineStrategy, cosineStrategyAggressive} from "./cosineSimilarity.js";
import {diceStrategy} from "./diceSimilarity.js";
import {ComparisonStrategy, ComparisonStrategyResultValue, ComparisonStrategyResultObject, StrategyFunc} from '../atomic.js';

export {
    levenStrategy,
    cosineStrategy,
    cosineStrategyAggressive,
    diceStrategy,
}

export type {
    ComparisonStrategy,
    ComparisonStrategyResultObject,
    ComparisonStrategyResultValue,
    StrategyFunc
}
