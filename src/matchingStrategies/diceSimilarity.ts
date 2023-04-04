import stringSimilarity from 'string-similarity';
import {ComparisonStrategy} from "../atomic";

export const calculateDiceSimilarity = (valA: string, valB: string) => stringSimilarity.compareTwoStrings(valA, valB);
export const diceStrategy: ComparisonStrategy = {
    name: 'dice',
    strategy: (valA: string, valB: string) => stringSimilarity.compareTwoStrings(valA, valB) * 100
}
