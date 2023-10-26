import { cosineStrategy, levenStrategy, diceStrategy } from "./matchingStrategies/index.js";
const sentenceLengthWeight = (length) => {
    // thanks jordan :')
    // constants are black magic
    return (Math.log(length) / 0.20) - 5;
};
const defaultStrCompareTransformFuncs = [
    // lower case to remove case sensitivity
    (str) => str.toLocaleLowerCase(),
    // remove excess whitespace
    (str) => str.trim(),
    // remove non-alphanumeric characters so that differences in punctuation don't subtract from comparison score
    (str) => str.replace(/[^A-Za-z0-9 ]/g, ""),
    // replace all instances of 2 or more whitespace with one whitespace
    (str) => str.replace(/\s{2,}|\n/g, " ")
];
const defaultStrategies = [
    diceStrategy,
    levenStrategy,
    cosineStrategy
];
const stringSameness = (valA, valB, options) => {
    const { transforms = defaultStrCompareTransformFuncs, strategies = defaultStrategies, } = options || {};
    const cleanA = transforms.reduce((acc, curr) => curr(acc), valA);
    const cleanB = transforms.reduce((acc, curr) => curr(acc), valB);
    const shortest = cleanA.length > cleanB.length ? cleanB : cleanA;
    const stratResults = [];
    for (const strat of strategies) {
        if (strat.isValid !== undefined && !strat.isValid(cleanA, cleanB)) {
            continue;
        }
        const res = strat.strategy(cleanA, cleanB);
        const resObj = typeof res === 'number' ? { score: res } : res;
        stratResults.push({
            ...resObj,
            name: strat.name
        });
    }
    // use shortest sentence for weight
    const weightScore = sentenceLengthWeight(shortest.length);
    // take average score
    const highScore = stratResults.reduce((acc, curr) => acc + curr.score, 0) / stratResults.length;
    // weight score can be a max of 15
    const highScoreWeighted = highScore + Math.min(weightScore, 15);
    const stratObj = stratResults.reduce((acc, curr) => {
        const { name, score, ...rest } = curr;
        acc[curr.name] = {
            ...rest,
            score,
        };
        return acc;
    }, {});
    return {
        strategies: stratObj,
        highScore,
        highScoreWeighted,
    };
};
const createStringSameness = (defaults) => {
    return (valA, valB, options = {}) => stringSameness(valA, valB, { ...defaults, ...options });
};
const strategies = {
    diceStrategy,
    levenStrategy,
    cosineStrategy
};
export { stringSameness, createStringSameness, defaultStrategies, strategies, defaultStrCompareTransformFuncs };
