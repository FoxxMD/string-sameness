"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultStrCompareTransformFuncs = exports.strategies = exports.defaultStrategies = exports.createStringSameness = exports.stringSameness = void 0;
const index_js_1 = require("./matchingStrategies/index.js");
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
exports.defaultStrCompareTransformFuncs = defaultStrCompareTransformFuncs;
const defaultStrategies = [
    index_js_1.diceStrategy,
    index_js_1.levenStrategy,
    index_js_1.cosineStrategy
];
exports.defaultStrategies = defaultStrategies;
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
exports.stringSameness = stringSameness;
const createStringSameness = (defaults) => {
    return (valA, valB, options = {}) => stringSameness(valA, valB, { ...defaults, ...options });
};
exports.createStringSameness = createStringSameness;
const strategies = {
    diceStrategy: index_js_1.diceStrategy,
    levenStrategy: index_js_1.levenStrategy,
    cosineStrategy: index_js_1.cosineStrategy
};
exports.strategies = strategies;
