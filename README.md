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

When no strategies are explicitly passed a default set of strategies is used, found in `import {defaultStrategies} from @foxxmd/string-sameness;`:

* [Dice's Coefficient](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient) in [`diceSimilarities.ts`](/src/matchingStrategies/diceSimilarity.ts)
* [Cosine Similarity](https://en.wikipedia.org/wiki/Cosine_similarity) in [`cosineSimilarities.ts`](/src/matchingStrategies/cosineSimilarity.ts)
* [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance) in [`levenSimilarities.ts`](/src/matchingStrategies/levenSimilarity.ts)

Strategies can be accessed individually using `import {strategies} from @foxxmd/string-sameness`

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

* normalize unicode EX convert Ö => O
* convert to lowercase
* trim (remove whitespace at beginning/end)
* remove non-alphanumeric characters (punctuation and newlines)
* replace any instances of 2 or more consecutive whitespace with 1 whitespace

* The default set of transformer functions is exported as `import {strDefaultTransforms} from @foxxmd/string-sameness;`
* All built-in transformers can be found at `import {transforms} from @foxxmd/string-sameness;`

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

## Token Re-ordering

If tokens (word) ordering in the strings is not important you can choose to have string-sameness attempt to re-order all words before comparing sameness. This makes comparison scores much closer to "absolute sameness in all characters within string". EX:

* `this is correct order`
* `order correct this is`

Scores 60 **without** reordering 

Scores 100 **with** reordering

Behavior caveats:

* The **second** string argument is reordered to match the **first** string argument
* If the second string is longer than the first than any non-matched words are concatenated to the end of the re-ordered string in the same order they were found

To use:

```js
import {stringSameness} from '@foxxmd/string-sameness';

const res = stringSameness(strA, strB, {reorder: true});
```

## Factory

For convenience, a factory function is also provided:

```ts
import {createStringSameness, strategies} from "@foxxmd/string-sameness";
import {myTransforms, myStrats} from './util';

const {levenStrategy} = strategies;

// sets the default object to used with the third argument for `stringSameness`
const myCompare = createStringSameness({transforms: myTransforms, strategies: [levenStrategy, ...myStrats]});

// uses myTransforms and myStrats
const plainResult = myCompare('This is one sentence', 'This is another sentence');

// override your defaults using the third argument like normal
const overrideResults = myCompare('This is one sentence', 'This is another sentence', {strategies: [levenStrategy]});
```
