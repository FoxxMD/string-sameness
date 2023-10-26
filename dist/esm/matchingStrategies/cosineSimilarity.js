// reproduced from https://github.com/sumn2u/string-comparison/blob/master/jscosine.js
// https://sumn2u.medium.com/string-similarity-comparision-in-js-with-examples-4bae35f13968
function termFreqMap(str) {
    var words = str.split(' ');
    var termFreq = {};
    words.forEach(function (w) {
        termFreq[w] = (termFreq[w] || 0) + 1;
    });
    return termFreq;
}
function addKeysToDict(map, dict) {
    for (var key in map) {
        dict[key] = true;
    }
}
function termFreqMapToVector(map, dict) {
    var termFreqVector = [];
    for (var term in dict) {
        termFreqVector.push(map[term] || 0);
    }
    return termFreqVector;
}
function vecDotProduct(vecA, vecB) {
    var product = 0;
    for (var i = 0; i < vecA.length; i++) {
        product += vecA[i] * vecB[i];
    }
    return product;
}
function vecMagnitude(vec) {
    var sum = 0;
    for (var i = 0; i < vec.length; i++) {
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}
function cosineSimilarity(vecA, vecB) {
    return vecDotProduct(vecA, vecB) / (vecMagnitude(vecA) * vecMagnitude(vecB));
}
export const calculateCosineSimilarity = (strA, strB) => {
    var termFreqA = termFreqMap(strA);
    var termFreqB = termFreqMap(strB);
    var dict = {};
    addKeysToDict(termFreqA, dict);
    addKeysToDict(termFreqB, dict);
    var termFreqVecA = termFreqMapToVector(termFreqA, dict);
    var termFreqVecB = termFreqMapToVector(termFreqB, dict);
    return cosineSimilarity(termFreqVecA, termFreqVecB);
};
const cosineBaseStrategy = {
    name: 'cosine',
    strategy: (valA, valB) => {
        let res = calculateCosineSimilarity(valA, valB);
        if (res > 0.99999) {
            res = 1;
        }
        return {
            score: res * 100,
            rawScore: res
        };
    }
};
/**
 * Compares whole tokens (words) within a string independent of order
 *
 * This strategy is automatically disabled for strings with less than 4 words because it can lead to inaccurate scores due to not comparing characters IE it is not very useful for short sentences and comparing single words with typos
 *
 * If you'd like to use it even in these scenarios build your own strategy array using cosineStrategyAggressive instead of this one
 * */
export const cosineStrategy = {
    ...cosineBaseStrategy,
    isValid: (valA, valB) => {
        // cosine only compares full tokens (words), rather than characters, in a string
        // which makes its score very inaccurate when comparing low token-count strings (short sentences and/or words with typos)
        // so disable its usage if there are less than 4 tokens
        const valATokenLength = valA.split(' ').length;
        const valBTokenLength = valB.split(' ').length;
        return valATokenLength < 4 || valBTokenLength < 4;
    }
};
/**
 * Always runs (strings are always valid) which may lead to inaccurate scores in low token-count strings
 * */
export const cosineStrategyAggressive = {
    ...cosineBaseStrategy
};
//# sourceMappingURL=cosineSimilarity.js.map