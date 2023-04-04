import leven from "leven";
import {ComparisonStrategy} from "../atomic";

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
    const diff = (distance / longer.length) * 100;
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

export const levenStrategy: ComparisonStrategy = {
    name: 'leven',
    strategy: stratFunc
}
