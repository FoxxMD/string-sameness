import {describe, it} from 'mocha';
import {assert} from 'chai';
import {
    stringSameness,
    defaultStrCompareTransformFuncs as transforms,
    strategies,
    defaultStrategies
} from '../src/index.js';

const sameString = 'this string is the same';

describe('String normalization', function() {

    const normalizeStr = (str: string) => transforms.reduce((acc, curr) => curr(acc), str);

    it('should normalize punctuation', async function () {

        const valA = 'this string! is the. same';
        const valB = 'this string is the same';

        assert.equal(normalizeStr(valA), normalizeStr(valB))
    });

    it('should normalize whitespace', async function () {

        const valA = 'this string   is the   same   ';
        const valB = 'this string is the same';

        assert.equal(normalizeStr(valA), normalizeStr(valB))
    });

    it('should normalize whitespace at end and beginning', async function () {

        const valA = ' this string is the same ';
        const valB = 'this string is the same';

        assert.equal(normalizeStr(valA), normalizeStr(valB))
    });

    it('should normalize case', async function () {

        const valA = 'ThIs STRING iS THe SAMe';
        const valB = 'this string is the same';

        assert.equal(normalizeStr(valA), normalizeStr(valB))
    });
});

describe('Strategies', function() {

    describe('Sanity Checks', function() {
        for(const [name, strat] of Object.entries(strategies)) {
            it(`${name}: scores identical when strings are identical`, function() {
                const res = strat.strategy(sameString, sameString);
                assert.equal(100, res.score);
            });
        }
    });

});
