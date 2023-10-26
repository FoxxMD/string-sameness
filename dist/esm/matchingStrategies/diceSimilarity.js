import stringSimilarity from 'string-similarity';
export const calculateDiceSimilarity = (valA, valB) => stringSimilarity.compareTwoStrings(valA, valB);
export const diceStrategy = {
    name: 'dice',
    strategy: (valA, valB) => {
        const res = calculateDiceSimilarity(valA, valB);
        return {
            score: res * 100,
            rawScore: res
        };
    }
};
//# sourceMappingURL=diceSimilarity.js.map