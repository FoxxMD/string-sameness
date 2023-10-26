"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strDefaultTransforms = exports.defaultStrCompareTransformFuncs = exports.transforms = exports.strategies = exports.defaultStrategies = exports.createStringSameness = exports.stringSameness = exports.reorderStr = void 0;
const index_js_1 = require("./matchingStrategies/index.js");
const index_js_2 = require("./normalization/index.js");
Object.defineProperty(exports, "strDefaultTransforms", { enumerable: true, get: function () { return index_js_2.strDefaultTransforms; } });
Object.defineProperty(exports, "transforms", { enumerable: true, get: function () { return index_js_2.transforms; } });
const sentenceLengthWeight = (length) => {
    // thanks jordan :')
    // constants are black magic
    return (Math.log(length) / 0.20) - 5;
};
const defaultStrategies = [
    index_js_1.diceStrategy,
    index_js_1.levenStrategy,
    index_js_1.cosineStrategy
];
exports.defaultStrategies = defaultStrategies;
const stringSameness = (valA, valB, options) => {
    const { transforms = index_js_2.strDefaultTransforms, strategies = defaultStrategies, reorder = false, } = options || {};
    const cleanA = transforms.reduce((acc, curr) => curr(acc), valA);
    let cleanB = transforms.reduce((acc, curr) => curr(acc), valB);
    const shortest = cleanA.length > cleanB.length ? cleanB : cleanA;
    if (reorder) {
        // we want to ignore order of tokens as much as possible (user does not care about differences in word order, just absolute differences in characters overall)
        // so we will reorder cleanB so its tokens match the order or tokens in cleanA as closely as possible
        // before we run strategies
        cleanB = (0, exports.reorderStr)(cleanA, cleanB);
    }
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
const reorderStr = (cleanA, cleanB, options) => {
    // to do the reordering we will use stringSameness with the provided strats to match against each token in cleanA and choose the closest token in cleanB
    // and add the end concat any remaining tokens from cleanB to the reordered string
    const aTokens = cleanA.split(' ');
    const bTokens = cleanB.split(' ');
    const orderedCandidateTokens = aTokens.reduce((acc, curr) => {
        let highScore = 0;
        let highIndex = 0;
        let index = 0;
        for (const token of acc.remaining) {
            const result = stringSameness(curr, token, { ...options, reorder: false });
            if (result.highScore > highScore) {
                highScore = result.highScore;
                highIndex = index;
            }
            index++;
        }
        const splicedRemaining = [...acc.remaining];
        if (highIndex <= splicedRemaining.length - 1) {
            splicedRemaining.splice(highIndex, 1);
        }
        const ordered = highIndex <= acc.remaining.length - 1 ? acc.ordered.concat(acc.remaining[highIndex]) : acc.ordered;
        return { ordered: ordered, remaining: splicedRemaining };
    }, { ordered: [], remaining: bTokens });
    const allOrderedCandidateTokens = orderedCandidateTokens.ordered.concat(orderedCandidateTokens.remaining);
    return allOrderedCandidateTokens.join(' ');
};
exports.reorderStr = reorderStr;
const createStringSameness = (defaults) => {
    return (valA, valB, options = {}) => stringSameness(valA, valB, { ...defaults, ...options });
};
exports.createStringSameness = createStringSameness;
const strategies = {
    diceStrategy: index_js_1.diceStrategy,
    levenStrategy: index_js_1.levenStrategy,
    cosineStrategy: index_js_1.cosineStrategy,
    cosineStrategyAggressive: index_js_1.cosineStrategyAggressive
};
exports.strategies = strategies;
// maintaining compatibility
const defaultStrCompareTransformFuncs = index_js_2.strDefaultTransforms;
exports.defaultStrCompareTransformFuncs = defaultStrCompareTransformFuncs;
//# sourceMappingURL=index.js.map