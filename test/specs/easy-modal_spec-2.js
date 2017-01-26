var expect = chai.expect;

describe('EasyModal', function() {
    var EasyModal = require('../../index.js');
    var ssCount = document.styleSheets.length;
    var arg1 = 'test-content';
    var arg2 = 'test-button';
    new EasyModal('#' + arg1, '#' + arg2, true);

    describe('stylesheets', function() {
        it('when initialized with true as the third argument,' +
           'it does not add a stylesheet',
           function() {
               expect(ssCount).to.equal(document.styleSheets.length);
           });
    });
});
