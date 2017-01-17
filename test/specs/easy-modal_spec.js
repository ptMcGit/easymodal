var expect = chai.expect;

describe('EasyModal', function(){

    var EasyModal = require('../../index.js');

    describe('initialization', function(){

        it('throws an error if content id parameter not found', function(){
            expect(function(){
                new EasyModal('nonexistent-content-id', 'nonexistent-button-id');
            })
                .to.throw(Error);

        });

    });

    var arg1 = 'test-content',
        arg2 = 'test-button',
        em = new EasyModal('#' + arg1, '#' + arg2);

    describe('elements', function(){
        var element,
            name;

        var getElement = function(str){
            name = str.replace(/^./,'');
            element = $(str)[0];
            if(!element) throw new Error();
        };

        describe('modalOutside', function(){

            before(function(){
                getElement('.modal-outside');
            });

            it('is a div', function(){
                expect(element.nodeName)
                    .to.equal('DIV');
            });

            it('has id prefixed with first initialization argument', function(){
                expect(element.id)
                    .to.equal(arg1 + '-' + name);
            });

        });

    });

});
