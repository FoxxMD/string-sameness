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

        describe('scores 100 when strings are identical', function() {
            for(const [name, strat] of Object.entries(strategies)) {
                it(`${name}: strings are identical`, function() {
                    const res = strat.strategy(sameString, sameString);
                    assert.equal(res.score, 100);
                });
            }
        });

        describe('scores not 100 when strings are close but not identical', function() {
            for(const [name, strat] of Object.entries(strategies)) {
                it(`${name}: strings are close but not identical`, function() {
                    const res = strat.strategy('Another Brick in the Wall, Pt. 1', 'Another Brick in the Wall, Pt. 2');
                    assert.isAtMost(res.score, 99);
                });
            }
        });

        describe('scores near zero when strings are completely different', function() {
            for(const [name, strat] of Object.entries(strategies)) {
                it(`${name}: strings are completely different`, function() {
                    const res = strat.strategy(sameString, 'pay bull blood for voice');
                    assert.isAtMost(res.score, 10);
                });
            }
        });

    });

});
