"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringSameness = exports.defaultStrCompareTransformFuncs = void 0;
const cosineSimilarity_js_1 = __importDefault(require("./matchingStrategies/cosineSimilarity.js"));
const levenSimilarity_js_1 = __importDefault(require("./matchingStrategies/levenSimilarity.js"));
const string_similarity_1 = __importDefault(require("string-similarity"));
const sentenceLengthWeight = (length) => {
    // thanks jordan :')
    // constants are black magic
    return (Math.log(length) / 0.20) - 5;
};
exports.defaultStrCompareTransformFuncs = [
    // lower case to remove case sensitivity
    (str) => str.toLocaleLowerCase(),
    // remove excess whitespace
    (str) => str.trim(),
    // remove non-alphanumeric characters so that differences in punctuation don't subtract from comparison score
    (str) => str.replace(/[^A-Za-z0-9 ]/g, ""),
    // replace all instances of 2 or more whitespace with one whitespace
    (str) => str.replace(/\s{2,}|\n/g, " ")
];
const stringSameness = (valA, valB, options) => {
    const { transforms = exports.defaultStrCompareTransformFuncs, } = options || {};
    const cleanA = transforms.reduce((acc, curr) => curr(acc), valA);
    const cleanB = transforms.reduce((acc, curr) => curr(acc), valB);
    const shortest = cleanA.length > cleanB.length ? cleanB : cleanA;
    // Dice's Coefficient
    const dice = string_similarity_1.default.compareTwoStrings(cleanA, cleanB) * 100;
    // Cosine similarity
    const cosine = (0, cosineSimilarity_js_1.default)(cleanA, cleanB) * 100;
    // Levenshtein distance
    const ls = (0, levenSimilarity_js_1.default)(cleanA, cleanB);
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
    };
};
exports.stringSameness = stringSameness;
exports.default = exports.stringSameness;
