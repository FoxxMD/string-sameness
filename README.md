# string-sameness

Generate scores that represents how similar two strings are based on different string comparison algorithms.

Scores from all used algorithms are averaged and then weighted by the length of the content being compared (more weight for longer content).

The sameness is then given a **score of 0 to 100.**

* 0 => Totally unique pieces of content
* 100 => Identical content

# Install/Usage

```
npm install @foxxmd/string-sameness
```

```js
import {stringSameness} from '@foxxmd/string-sameness';

const result =  stringSameness('This is one sentence', 'This is another sentence');
console.log(result);
// {
//     "strategies": {
//         "dice": {
//             "rawScore": 0.6666,
//             "score": 66.66
//         },
//         "leven": {
//             "rawScore": 5,
//             "distance": 5,
//             "score": 79.16
//         },
//         "cosine": {
//             "rawScore": 0.75,
//             "score": 75
//         }
//     },
//     "highScore": 73.61,
//     "highScoreWeighted": 83.58
// }
```

# Options

An optional third argument can be provided to `stringSameness` to customize how strings are normalized before comparison and what strategies are used for comparison.

## Strategies

Pass a list of `ComparisonStrategy` objects using `{strategies: []}` to define which string comparisons should be performed on the given strings.

The average of the scores from all passed strategies is returned as `highScore` (and `highScoreWeighted`) from `stringSameness()`

When no strategies are explicitly passed a default set of strategies is used, found in `@foxxmd/string-sameness/strategies`:

* [Dice's Coefficient](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient) in [`diceSimilarities.ts`](/src/matchingStrategies/diceSimilarity.ts)
* [Cosine Similarity](https://en.wikipedia.org/wiki/Cosine_similarity) in [`cosineSimilarities.ts`](/src/matchingStrategies/cosineSimilarity.ts)
* [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance) in [`levenSimilarities.ts`](/src/matchingStrategies/levenSimilarity.ts)

### Bring Your Own Strategy

Use your own strategy by creating an object that conforms to `ComparisonStrategy`:

```ts
export interface ComparisonStrategy {
    /**
     * The name of this strategy
     * */
    name: string
    /**
     * A function that accepts two string arguments and returns a number between 0 and 100 signifying how closely similar the strings are:
     * 0 => not similar at all
     * 100 => identical
     * */
    strategy: (strA: string, strB: string) => number
    /**
     * An optional function that accepts two string arguments and returns whether this strategy should be used
     * */
    isValid?: (strA: string, strB: string) => boolean
}
```

Example of using your own strategy with the defaults:

```ts
import {stringSameness} from "@foxxmd/string-sameness";
import {ComparisonStrategy, levenStrategy, cosineStrategy, diceStrategy} from "@foxxmd/string-sameness/strategies";

const myStrat: ComparisonStrategy = {
    name: 'MyCoolStrat',
    strategy: (valA: string, valB: string) => {
        const a = valA.concat(valB);
        return a.length;
    },
}
const strats = [
    levenStrategy,
    cosineStrategy,
    diceStrategy,
    myStrat
]

const result = stringSameness('This is one sentence', 'This is another sentence', {strategies: strats});
```

## Normalization

Pass a list of functions using `{transforms: []}` to transform the strings before comparison. When not explicitly provided a default set of functions is applied to normalize the strings (to remove trivial differences):

* convert to lowercase
* trim (remove whitespace at beginning/end)
* remove non-alphanumeric characters (punctuation and newlines)
* replace any instances of 2 or more consecutive whitespace with 1 whitespace

This default set of functions is exported as `defaultStrCompareTransformFuncs`.

Example of supplying your own transform functions:

```js
import {stringSameness, defaultStrCompareTransformFuncs} from '@foxxmd/string-sameness';

const myFuncs = [
    ...defaultStrCompareTransformFuncs,
    // replace all vowels with the letter e
    (str) => str.replace(/[aeiou]/ig, 'e')
]

const result =  stringSameness('This is one sentence', 'This is another sentence', {transforms: myFuncs});
```

## Factory

For convenience, a factory function is also provided:

```ts
import {createStringSameness} from "@foxxmd/string-sameness";
import {levenStrategy} from "@foxxmd/string-sameness/strategies";
import {myTransforms, myStrats} from './util';

// sets the default object to used with the third argument for `stringSameness`
const myCompare = createStringSameness({transforms: myTransforms, strategies: myStrats});

// uses myTransforms and myStrats
const plainResult = myCompare('This is one sentence', 'This is another sentence');

// override your defaults using the third argument like normal
const overrideResults = myCompare('This is one sentence', 'This is another sentence', {strategies: [levenStrategy]});
```
