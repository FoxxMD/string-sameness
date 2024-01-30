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
        delimiter = ' '
    } = options || {};

    let cleanA = transforms.reduce((acc, curr) => curr(acc), valA);
    let cleanB = transforms.reduce((acc, curr) => curr(acc), valB);

    if (reorder) {
        // we want to ignore order of tokens as much as possible (user does not care about differences in word order, just absolute differences in characters overall)
        // so we will reorder the shorter of the two strings so its tokens match the order of tokens in the longer string as closely as possible
        // before we run strategies
        const [orderedX, orderedY] = reorderStr(cleanA, cleanB);
        cleanA = orderedX;
        cleanB = orderedY;
    }

    const shortest = cleanA.length > cleanB.length ? cleanB : cleanA;

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

export const reorderStr = (strA: string, strB: string, options?: StringComparisonOptions): [string, string] => {

    const {
        transforms = strDefaultTransforms,
        strategies = defaultStrategies,
        delimiter = ' '
    } = options || {};

    const cleanA = transforms.reduce((acc, curr) => curr(acc), strA);
    const cleanB = transforms.reduce((acc, curr) => curr(acc), strB);

    // split by "token"
    const eTokens = cleanA.split(delimiter);
    const cTokens = cleanB.split(delimiter);


    let longerTokens: string[],
        shorterTokens: string[];

    if (eTokens.length > cTokens.length) {
        longerTokens = eTokens;
        shorterTokens = cTokens;
    } else {
        longerTokens = cTokens;
        shorterTokens = eTokens;
    }

    // we will use longest string (token list) as the reducer and order the shorter list to match it
    // so we don't have to deal with undefined positions in the shorter list

    const orderedCandidateTokens = longerTokens.reduce((acc: { ordered: string[], remaining: string[] }, curr) => {
        // if we've run out of tokens in the shorter list just return
        if (acc.remaining.length === 0) {
            return acc;
        }

        // on each iteration of tokens in the long list
        // we iterate through remaining tokens from the shorter list and find the token with the most sameness

        let highScore = 0;
        let highIndex = 0;
        let index = 0;
        for (const token of acc.remaining) {
            const result = stringSameness(curr, token, {strategies});
            if (result.highScoreWeighted > highScore) {
                highScore = result.highScoreWeighted;
                highIndex = index;
            }
            index++;
        }

        // then remove the most same token from the remaining short list tokens
        const splicedRemaining = [...acc.remaining];
        splicedRemaining.splice(highIndex, 1);

        return {
            // finally add the most same token to the ordered short list
            ordered: acc.ordered.concat(acc.remaining[highIndex]),
            // and return the remaining short list tokens
            remaining: splicedRemaining
        };
    }, {
        // "ordered" is the result of ordering tokens in the shorter list to match longer token order
        ordered: [],
        // remaining is the initial shorter list
        remaining: shorterTokens
    });

    return [longerTokens.join(' '), orderedCandidateTokens.ordered.join(' ')];
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
