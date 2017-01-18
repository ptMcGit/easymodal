var expect = chai.expect;

describe('EasyModal', function(){

    var EasyModal = require('../../index.js');

    var arg1 = 'test-content',
        arg2 = 'test-button',
        em = new EasyModal('#' + arg1, '#' + arg2, true);

    describe('stylesheets', function(){

        it('when initialized with true as the third argument, it does not add a stylesheet', function(){
            expect(document.styleSheets.length)
                .to.equal(1);
        });

    });

});
