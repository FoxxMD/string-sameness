"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diceStrategy = exports.cosineStrategy = exports.levenStrategy = void 0;
const levenSimilarity_1 = require("./levenSimilarity");
Object.defineProperty(exports, "levenStrategy", { enumerable: true, get: function () { return levenSimilarity_1.levenStrategy; } });
const cosineSimilarity_1 = require("./cosineSimilarity");
Object.defineProperty(exports, "cosineStrategy", { enumerable: true, get: function () { return cosineSimilarity_1.cosineStrategy; } });
const diceSimilarity_1 = require("./diceSimilarity");
Object.defineProperty(exports, "diceStrategy", { enumerable: true, get: function () { return diceSimilarity_1.diceStrategy; } });
