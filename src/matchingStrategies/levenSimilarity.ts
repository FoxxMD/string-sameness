import leven from "leven";
import {ComparisonStrategy, ComparisonStrategyResultObject} from "../atomic.js";

export const calculateLevenSimilarity = (valA: string, valB: string) => {
    let longer: string;
    let shorter: string;
    if (valA.length > valB.length) {
        longer = valA;
        shorter = valB;
    } else {
        longer = valB;
        shorter = valA;
    }

    const distance = leven(longer, shorter);
    // use the shorter length
    // because if we have more move/change operations than the length of the shortest string than we have two unique strings
    // and if we use the longer length the score actually gets *better* as the length gap gets larger (not what we want)
    // -- cap at 100% diff
    const diff = Math.min((distance / shorter.length) * 100, 100);
    return [distance, 100 - diff];
}

const stratFunc = (valA: string, valB: string) => {
    const res = calculateLevenSimilarity(valA, valB);
    return {
        rawScore: res[0],
        distance: res[0],
        score: res[1]
    };
}

export const levenStrategy: ComparisonStrategy<ComparisonStrategyResultObject> = {
    name: 'leven',
    strategy: stratFunc
}
