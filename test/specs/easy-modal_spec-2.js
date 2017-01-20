var expect = chai.expect;

describe('EasyModal', function() {
    var EasyModal = require('../../index.js');

    var arg1 = 'test-content';
    var arg2 = 'test-button';
    var em = new EasyModal('#' + arg1, '#' + arg2, true);

    describe('stylesheets', function() {
        it('when initialized with true as the third argument,' +
           'it does not add a stylesheet',
           function() {
               expect((function() {
                   var i;
                   var ss = [];
                   var ds = document.styleSheets;

                   for(i = 0; i < ds.length; i++)
                       ss.push(ds[i].id);
                   return ss;
               })())
                   .to.not.include(em.constructor.name);
           });
    });
});
