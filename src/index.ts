import {cosineStrategy, levenStrategy, diceStrategy, cosineStrategyAggressive} from "./matchingStrategies/index.js";
import {
    ComparisonStrategyResult,
    NamedComparisonStrategyObjectResult,
    StringComparisonOptions,
    StringSamenessResult,
    StringTransformFunc
} from "./atomic.js";
import {strDefaultTransforms, transforms} from "./normalization/index.js";

const sentenceLengthWeight = (length: number) => {
    // thanks jordan :')
    // constants are black magic
    return (Math.log(length) / 0.20) - 5;
}

const defaultStrategies = [
    diceStrategy,
    levenStrategy,
    cosineStrategy
]

const stringSameness = (valA: string, valB: string, options?: StringComparisonOptions): StringSamenessResult => {

    const {
        transforms = strDefaultTransforms,
        strategies = defaultStrategies,
        reorder = false,
    } = options || {};

    const cleanA = transforms.reduce((acc, curr) => curr(acc), valA);
    let cleanB = transforms.reduce((acc, curr) => curr(acc), valB);

    const shortest = cleanA.length > cleanB.length ? cleanB : cleanA;

    if (reorder) {
        // we want to ignore order of tokens as much as possible (user does not care about differences in word order, just absolute differences in characters overall)
        // so we will reorder cleanB so its tokens match the order or tokens in cleanA as closely as possible
        // before we run strategies
        cleanB = reorderStr(cleanA, cleanB);
    }

    const stratResults: NamedComparisonStrategyObjectResult[] = [];

    for (const strat of strategies) {
        if (strat.isValid !== undefined && !strat.isValid(cleanA, cleanB)) {
            continue;
        }
        const res = strat.strategy(cleanA, cleanB);
        const resObj = typeof res === 'number' ? {score: res} : res;
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
    const stratObj = stratResults.reduce((acc: { [key: string]: ComparisonStrategyResult }, curr) => {
        const {name, score, ...rest} = curr;
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
    }
}

export const reorderStr = (cleanA: string, cleanB: string, options?: StringComparisonOptions): string => {
    // to do the reordering we will use stringSameness with the provided strats to match against each token in cleanA and choose the closest token in cleanB
    // and add the end concat any remaining tokens from cleanB to the reordered string
    const aTokens = cleanA.split(' ');
    const bTokens = cleanB.split(' ');
    const orderedCandidateTokens = aTokens.reduce((acc: { ordered: string[], remaining: string[] }, curr) => {
        let highScore = 0;
        let highIndex: undefined | number = 0;
        let index = 0;
        for (const token of acc.remaining) {
            const result = stringSameness(curr, token, {...options, reorder: false});
            if (result.highScore > highScore) {
                highScore = result.highScore;
                highIndex = index;
            }
            index++;
        }

        const splicedRemaining = [...acc.remaining];
        if(highIndex <= splicedRemaining.length - 1) {
            splicedRemaining.splice(highIndex, 1);
        }
        const ordered = highIndex <= acc.remaining.length - 1 ? acc.ordered.concat(acc.remaining[highIndex]) : acc.ordered;

        return {ordered: ordered, remaining: splicedRemaining};
    }, {ordered: [], remaining: bTokens});
    const allOrderedCandidateTokens = orderedCandidateTokens.ordered.concat(orderedCandidateTokens.remaining);
    return allOrderedCandidateTokens.join(' ');
}

const createStringSameness = (defaults: StringComparisonOptions) => {
    return (valA: string, valB: string, options: StringComparisonOptions = {}) => stringSameness(valA, valB, {...defaults, ...options});
}

const strategies = {
    diceStrategy,
    levenStrategy,
    cosineStrategy,
    cosineStrategyAggressive
};

// maintaining compatibility
const defaultStrCompareTransformFuncs = strDefaultTransforms;

export {
    StringSamenessResult,
    StringComparisonOptions,
    stringSameness,
    createStringSameness,
    defaultStrategies,
    strategies,
    transforms,
    defaultStrCompareTransformFuncs,
    strDefaultTransforms,
    ComparisonStrategyResult,
    StringTransformFunc
}
