const assert = require('power-assert');
const glib = require('../GLibMock.js');

//const extendGlobal = require('app-script-mock');

describe('doGet', function () {
    // before(() => {
    //     extendGlobal(global);
    // });
    it('should return to BAD ACCESS', function () {
        const query = {
            parameter: {},
            contextPath: '',
            contentLength: -1,
            queryString: '',
            parameters: {},
        };
        assert.equal(glib.doGet(query).content, JSON.stringify({ content: 'Bad access' }));
    });

    it('should return to PROCESS OK', function () {
        const query = {
            parameter: { token: 'PASS_TOKEN' },
            contextPath: '',
            contentLength: -1,
            queryString: 'token=PASS_TOKEN',
            parameters: { token: ['PASS_TOKEN'] },
        };
        assert.equal(glib.doGet(query).content, JSON.stringify({ content: 'Process OK' }));
    });
});