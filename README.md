# string-sameness

Generate a score that represents how closely the same two strings are. The comparison function uses an average of:

* [Dice's Coefficient](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient)
* [Cosine Similarity](https://en.wikipedia.org/wiki/Cosine_similarity)
* [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance)

weighted by the length of the content being compared (more weight for longer content).

The sameness is then given a **score of 0 to 100.**

* 0 => Totally unique pieces of content
* 100 => Identical content

## Install/Usage

```
npm install @foxxmd/string-sameness
```

```js
import {stringSameness} from '@foxxmd/string-sameness';

const result =  stringSameness('This is one sentence', 'This is another sentence');
console.log(result);
// {
//     "scores": {
//         "dice": 66.66,
//         "cosine": 75,
//         "leven": 79.16
//      },
//     "highScore": 73.61,
//     "highScoreWeighted": 83.58
//  }
```

### Normalization

A third argument may be passed to `stringSameness` to provide a list of functions to apply to the strings to compare. When not explicitly provided a default set of functions is applied to normalize the strings (to remove trivial differences):

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

const result =  stringSameness('This is one sentence', 'This is another sentence', myFuncs);
```
