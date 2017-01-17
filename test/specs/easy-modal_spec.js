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

        describe(arg1, function(){
            before(function(){
                getElement('#' + arg1);
            });

            it('has the modal box as its parent element', function(){
                expect(element.parentElement.id)
                    .to.equal(arg1 + '-' + 'modal-box');
            });

        });

        describe('modal outside', function(){

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

        describe('modal box', function(){

            before(function(){
                getElement('.modal-box');
            });

            it('is a div', function(){
                expect(element.nodeName)
                    .to.equal('DIV');
            });

            it('has id prefixed with first initialization argument', function(){
                expect(element.id)
                    .to.equal(arg1 + '-' + name);
            });

            it('has modal outside as its parent element', function(){
                expect(element.parentElement.id)
                    .to.equal(arg1 + '-' + 'modal-outside');
            });

        });

        describe('modal close', function(){

            before(function(){
                getElement('.modal-close');
            });

            it('is a span', function(){
                expect(element.nodeName)
                    .to.equal('SPAN');
            });

            it('has id prefixed with first initialization argument', function(){
                expect(element.id)
                    .to.equal(arg1 + '-' + name);
            });

            it('has inner text for close button', function(){
                expect(element.innerText)
                    .to.not.equal('');
            });

            it('has modal box as its parent element', function(){
                expect(element.parentElement.id)
                    .to.equal(arg1 + '-' + 'modal-box');
            });

        });


    });

});
