const mocha = require('mocha');
const expect = require('chai').expect;
const bigintJSON = require('../index');


describe('Tests for bigint json', () => {

    describe('parse', () => {
        it('Should parse as json', () => {
            let stringified = '{"someKey":"someString","someKey2":1234,"someKey3":"1234n","somekey4":{"nestedKey":"someString","nestedKey2":1234,"nestedKey3":"1234n","nestedKey4":{"nestedNestedKey":{"nestedNestedKey":"someString","nestedNestedKey2":1234,"nestedNestedKey3":"12349912312323891374291847012983471209384712098347012983741029834710298374102983741092837412093847120938471023n"}}}}';
            let parsed = bigintJSON.parse(stringified);

            let expectedObject = {
                someKey: 'someString',
                someKey2: 1234,
                someKey3: 1234n,
                somekey4: {
                    nestedKey: 'someString',
                    nestedKey2: 1234,
                    nestedKey3: 1234n,
                    nestedKey4: {
                        nestedNestedKey: {
                            nestedNestedKey: 'someString',
                            nestedNestedKey2: 1234,
                            nestedNestedKey3: 12349912312323891374291847012983471209384712098347012983741029834710298374102983741092837412093847120938471023n,
                        }
                    }
                }
            };
            expect(parsed).to.eql(expectedObject);
        });

        it('throw error if input is not string', () => {
            expect(bigintJSON.parse.bind(bigintJSON, {})).to.throw('TypeError: Do not know to parse a object');
        });

        it('trow error if input is falsy', () => {
            expect(bigintJSON.parse.bind(bigintJSON)).to.throw('Invalid input');
        });


    });

    describe('stringify', () => {
        it('throw error if input is not object', () => {
            expect(bigintJSON.stringify.bind(bigintJSON, 'sadfsadfasdf')).to.throw('TypeError: Do not know to stringify a string');
        });

        it('trow error if input is falsy', () => {
            expect(bigintJSON.stringify.bind(bigintJSON)).to.throw('Invalid input');
        });

        it('Should be able to stringify with bigints to JSON', () => {
            let object = {
                someKey: 'someString',
                someKey2: 1234,
                someKey3: 1234n,
                somekey4: {
                    nestedKey: 'someString',
                    nestedKey2: 1234,
                    nestedKey3: 1234n,
                    nestedKey4: {
                        nestedNestedKey: {
                            nestedNestedKey: 'someString',
                            nestedNestedKey2: 1234,
                            nestedNestedKey3: 12349912312323891374291847012983471209384712098347012983741029834710298374102983741092837412093847120938471023n,
                        }
                    }
                }
            };
            let stringified = bigintJSON.stringify(object);
            expect(stringified).to.equal('{"someKey":"someString","someKey2":1234,"someKey3":"1234n","somekey4":{"nestedKey":"someString","nestedKey2":1234,"nestedKey3":"1234n","nestedKey4":{"nestedNestedKey":{"nestedNestedKey":"someString","nestedNestedKey2":1234,"nestedNestedKey3":"12349912312323891374291847012983471209384712098347012983741029834710298374102983741092837412093847120938471023n"}}}}')
        });
    });
});
