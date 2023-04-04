"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leven_1 = __importDefault(require("leven"));
const levenSimilarity = (valA, valB) => {
    let longer;
    let shorter;
    if (valA.length > valB.length) {
        longer = valA;
        shorter = valB;
    }
    else {
        longer = valB;
        shorter = valA;
    }
    const distance = (0, leven_1.default)(longer, shorter);
    const diff = (distance / longer.length) * 100;
    return [distance, 100 - diff];
};
exports.default = levenSimilarity;
