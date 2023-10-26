import leven from "leven";
export const calculateLevenSimilarity = (valA, valB) => {
    let longer;
    let shorter;
    if (valA.length > valB.length) {
        longer = valA;
        shorter = valB;
    }
    else {
        longer = valB;
        shorter = valA;
    }
    const distance = leven(longer, shorter);
    const diff = (distance / longer.length) * 100;
    return [distance, 100 - diff];
};
const stratFunc = (valA, valB) => {
    const res = calculateLevenSimilarity(valA, valB);
    return {
        rawScore: res[0],
        distance: res[0],
        score: res[1]
    };
};
export const levenStrategy = {
    name: 'leven',
    strategy: stratFunc
};
