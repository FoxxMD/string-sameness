"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diceStrategy = exports.cosineStrategy = exports.levenStrategy = void 0;
const levenSimilarity_js_1 = require("./levenSimilarity.js");
Object.defineProperty(exports, "levenStrategy", { enumerable: true, get: function () { return levenSimilarity_js_1.levenStrategy; } });
const cosineSimilarity_js_1 = require("./cosineSimilarity.js");
Object.defineProperty(exports, "cosineStrategy", { enumerable: true, get: function () { return cosineSimilarity_js_1.cosineStrategy; } });
const diceSimilarity_js_1 = require("./diceSimilarity.js");
Object.defineProperty(exports, "diceStrategy", { enumerable: true, get: function () { return diceSimilarity_js_1.diceStrategy; } });
