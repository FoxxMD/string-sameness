export declare const defaultStrCompareTransformFuncs: ((str: string) => string)[];
export interface StringComparisonOptions {
    transforms?: ((str: string) => string)[];
}
export interface StringSamenessResult {
    scores: {
        dice: number;
        cosine: number;
        leven: number;
    };
    highScore: number;
    highScoreWeighted: number;
}
export declare const stringSameness: (valA: string, valB: string, options?: StringComparisonOptions) => StringSamenessResult;
export default stringSameness;
