describe("EasyModal", function(){
    var EasyModal = require("../index.js");

    function MockElement(propertiesObj){
        var i;
        var objKeys = Object.keys(propertiesObj);
        for (i = 0; i < objKeys.length; i++)
            this[objKeys[i]] = propertiesObj[objKeys[i]]
    };
    MockElement.prototype.toString = function(){ return this.name }
    MockElement.prototype.classList = {
        add: function(){}
    };
    MockElement.prototype.appendChild = function(){};

    function MockDocument(elementsArray){
        var i;
        this.elements = elementsArray || [];

        this.querySelector = function(selector){
//            console.log('selector: ', selector.slice(1));
            for (i = 0; i < this.elements.length; i++)
                if (this.elements[i].id === selector.slice(1))
                    return this.elements[i];
            return null;
        }.bind(this);

        this.createDocumentFragment = function(){ return new MockDocument(); };
        this.createElement = function(e){
            var me = new MockElement({nodeName: e.toUpperCase()});
//            console.log('me: ', me);
            this.elements.push(me);
            return me;
        };
        this.createTextNode = function(){};
    };

    describe("invocation", function(){
        document = new MockDocument();

        it("throws an error if content id parameter not found", function(){
            expect(function(){
                new EasyModal('nonexistent-content-id', 'nonexistent-button-id');
            })
                .toThrowError();

        });

    });

    describe("post-invocation", function(){
        var content, button, em;
        beforeEach(function(){
            content = new MockElement({'id':'test-content'});
            button = new MockElement({'id': 'test-button'});
            document = new MockDocument([content,button]);
            em = new EasyModal('#test-content','#test-button');
        });

        it("does", function(){
//            console.log(em);
        });

    });

});
