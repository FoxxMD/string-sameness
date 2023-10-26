"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diceStrategy = exports.calculateDiceSimilarity = void 0;
const string_similarity_1 = __importDefault(require("string-similarity"));
const calculateDiceSimilarity = (valA, valB) => string_similarity_1.default.compareTwoStrings(valA, valB);
exports.calculateDiceSimilarity = calculateDiceSimilarity;
exports.diceStrategy = {
    name: 'dice',
    strategy: (valA, valB) => {
        const res = (0, exports.calculateDiceSimilarity)(valA, valB);
        return {
            score: res * 100,
            rawScore: res
        };
    }
};
