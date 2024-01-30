import {describe, it} from 'mocha';
import {assert} from 'chai';
import {
    stringSameness,
    defaultStrCompareTransformFuncs as transforms,
    strategies,
    reorderStr
} from '../src/index.js';

const sameString = 'this string is the same';

describe('String normalization', function() {

    const normalizeStr = (str: string) => transforms.reduce((acc, curr) => curr(acc), str);

    it('should normalize punctuation', async function () {

        const valA = 'this string! is the. same';

        assert.equal(normalizeStr(valA), sameString)
    });

    it('should normalize whitespace', async function () {

        const valA = 'this string   is the   same   ';

        assert.equal(normalizeStr(valA), sameString)
    });

    it('should normalize whitespace at end and beginning', async function () {

        const valA = ' this string is the same ';

        assert.equal(normalizeStr(valA), sameString)
    });

    it('should normalize case', async function () {

        const valA = 'ThIs STRING iS THe SAMe';

        assert.equal(normalizeStr(valA), sameString)
    });

    it('should normalize unicode', async function () {

        const tests = [
            ['enamorate bailando','Enamórate Bailando'],
            ['dina ogon', 'Dina Ögon'],
            ['nana', 'Nanã'],
            ['nana', 'Nanä']
        ]

        for(const test of tests) {
            assert.equal(normalizeStr(test[1]), test[0])
        }
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
                    assert.isAtLeast(res.score, 80);
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


describe('String reordering', () => {

    it('should reorder exact strings', function () {

        const exact = [
            ['this is correct order', 'order correct this is'],
            ['we have a few it he close words', 'close it he a words have we few'],
        ]

        for(const test of exact) {
            const res = reorderStr(test[0], test[1]);
            assert.equal(res[1], test[1])
        }
    });

    it('should reorder strings as closely as possible', function () {

        const a = 'this is correct order';
        const b = 'order correct this is and extra';
        const expected = 'order correct this is'

        const res = reorderStr(a, b);

        assert.equal(res[1], expected);

        const aLong = 'this vorrect order with more tokens';
        const bLong = 'order correct this extra';
        const expectedLong = 'this correct order extra';

        const res2 = reorderStr(aLong, bLong);

        assert.equal(res2[1], expectedLong);

    });

});

describe('Sameness functionality', function() {

    describe('Sanity Checks', function() {
        it(`scores same strings as identical`, function() {
            const res = stringSameness(sameString, sameString);
            assert.equal(res.highScore, 100);
        });

        it(`scores similar strings highly but not as identical`, function() {
            const res = stringSameness('Another Brick in the Wall, Pt. 1', 'Another Brick in the Wall, Pt. 2');
            assert.isAtMost(res.highScore, 99);
            assert.isAtLeast(res.highScore, 95);
        });

        it(`scores completely different strings as near zero`, function() {
            const res = stringSameness(sameString, 'pay bull blood for voice');
            assert.isAtMost(res.highScore, 10);
        });
    });

    it('should score reordered exact strings as identical', function () {
        const res = stringSameness('this is correct order', 'order correct this is', {reorder: true});
        assert.equal(res.highScore, 100);
    });
});
