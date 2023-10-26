import {levenStrategy} from "./levenSimilarity.js";
import {cosineStrategy, cosineStrategyAggressive} from "./cosineSimilarity.js";
import {diceStrategy} from "./diceSimilarity.js";
import {ComparisonStrategy, ComparisonStrategyResultValue, ComparisonStrategyResultObject, StrategyFunc} from '../atomic.js';

export {
    levenStrategy,
    cosineStrategy,
    cosineStrategyAggressive,
    diceStrategy,
    ComparisonStrategy,
    ComparisonStrategyResultObject,
    ComparisonStrategyResultValue,
    StrategyFunc
}
