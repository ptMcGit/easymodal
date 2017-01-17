var expect = chai.expect;

describe("EasyModal", function(){

    var EasyModal = require("../../index.js");

    describe("initialization", function(){

        it("throws an error if content id parameter not found", function(){
            expect(function(){
                new EasyModal('nonexistent-content-id', 'nonexistent-button-id');
            })
                .to.throw(Error);

        });

    });

    var em = new EasyModal('#test-content', '#test-button');

    describe("post-invocation", function(){

        it("creates div with class modalOutside", function(){
            expect($(".modal-outside")[0].nodeName)
                .to.equal('DIV');
        });

    });

});
