import stringSimilarity from 'string-similarity';
import {ComparisonStrategy, ComparisonStrategyResultObject} from "../atomic.js";

export const calculateDiceSimilarity = (valA: string, valB: string) => stringSimilarity.compareTwoStrings(valA, valB);
export const diceStrategy: ComparisonStrategy<ComparisonStrategyResultObject> = {
    name: 'dice',
    strategy: (valA: string, valB: string) => {
        const res = calculateDiceSimilarity(valA, valB);
        return {
            score: res * 100,
            rawScore: res
        }
    }
}
