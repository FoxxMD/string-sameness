import calculateCosineSimilarity from "./matchingStrategies/cosineSimilarity.js";
import levenSimilarity from "./matchingStrategies/levenSimilarity.js";
import stringSimilarity from 'string-similarity';
const sentenceLengthWeight = (length: number) => {
    // thanks jordan :')
    // constants are black magic
    return (Math.log(length) / 0.20) - 5;
}

export const defaultStrCompareTransformFuncs = [
    // lower case to remove case sensitivity
    (str: string) => str.toLocaleLowerCase(),
    // remove excess whitespace
    (str: string) => str.trim(),
    // remove non-alphanumeric characters so that differences in punctuation don't subtract from comparison score
    (str: string) => str.replace(/[^A-Za-z0-9 ]/g, ""),
    // replace all instances of 2 or more whitespace with one whitespace
    (str: string) => str.replace(/\s{2,}|\n/g, " ")
];

export interface StringComparisonOptions {
    transforms?: ((str: string) => string)[]
}

export interface StringSamenessResult {
    scores: {
        dice: number
        cosine: number
        leven: number
    },
    highScore: number
    highScoreWeighted: number
}


export const stringSameness = (valA: string, valB: string, options?: StringComparisonOptions): StringSamenessResult => {

    const {
        transforms = defaultStrCompareTransformFuncs,
    } = options || {};

    const cleanA = transforms.reduce((acc, curr) => curr(acc), valA);
    const cleanB = transforms.reduce((acc, curr) => curr(acc), valB);

    const shortest = cleanA.length > cleanB.length ? cleanB : cleanA;

    // Dice's Coefficient
    const dice = stringSimilarity.compareTwoStrings(cleanA, cleanB) * 100;
    // Cosine similarity
    const cosine = calculateCosineSimilarity(cleanA, cleanB) * 100;
    // Levenshtein distance
    const ls = levenSimilarity(cleanA, cleanB);
    const levenSimilarPercent = ls[1];

    // use shortest sentence for weight
    const weightScore = sentenceLengthWeight(shortest.length);

    // take average score
    const highScore = (dice + cosine + levenSimilarPercent) / 3;
    // weight score can be a max of 15
    const highScoreWeighted = highScore + Math.min(weightScore, 15);
    return {
        scores: {
            dice,
            cosine,
            leven: levenSimilarPercent
        },
        highScore,
        highScoreWeighted,
    }
}

export default stringSameness;
