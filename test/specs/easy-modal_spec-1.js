var expect = chai.expect;

describe('EasyModal', function() {
    var EasyModal = require('../../index.js');

    var arg1 = 'test-content';
    var arg2 = 'test-button';

    var newEasyModal = function() {
        return new EasyModal('#' + arg1, '#' + arg2);
    };

    var em = newEasyModal();

    var getEasyModalSS = function() {
        var i;
        var dss = document.styleSheets;
        for(i = 0; i < dss.length; i ++)
            if(dss[i].id === em.constructor.name) return dss[i];
    };

    describe('initialization', function() {
        it('throws an error if content id parameter not found', function() {
            expect(function() {
                new EasyModal(
                    'nonexistent-content-id', 'nonexistent-button-id'
                );
            })
                .to.throw(Error);
        });
    });

    describe('property elements', function() {
        var element;
        var name;

        var getElement = function(str) {
            name = str.replace(/^./, '');
            element = $(str)[0];
            if(!element) throw new Error();
        };

        describe('modal content with name ' + arg1, function() {
            before(function() {
                getElement('#' + arg1);
            });

            it('has the modal outside as its parent element', function() {
                expect(element.parentElement.id)
                    .to.equal(arg1 + '-' + 'modal-outside');
            });
        });

        describe('modal outside', function() {
            before(function() {
                getElement('.modal-outside');
            });

            it('is a div', function() {
                expect(element.nodeName)
                    .to.equal('DIV');
            });

            it('has id prefixed with first initialization argument',
               function() {
                   expect(element.id)
                       .to.equal(arg1 + '-' + name);
               });
        });

        describe('modal close', function() {
            before(function() {
                getElement('.modal-close');
            });

            it('is a span', function() {
                expect(element.nodeName)
                    .to.equal('SPAN');
            });

            it('has id prefixed with first initialization argument',
               function() {
                   expect(element.id)
                       .to.equal(arg1 + '-' + name);
               });

            it('has inner text for close button', function() {
                expect(element.innerText)
                    .to.not.equal('');
            });

            it('has modal content as its parent element', function() {
                expect(element.parentElement.id)
                    .to.equal(arg1);
            });
        });

        describe('modal transparency', function() {
            before(function() {
                getElement('.modal-transparency');
            });

            it('is a div', function() {
                expect(element.nodeName)
                    .to.equal('DIV');
            });

            it('has id prefixed with first initialization argument',
               function() {
                   expect(element.id)
                       .to.equal(arg1 + '-' + name);
               });

            it('has modal outside as previous sibling', function() {
                expect(element.previousSibling.id)
                    .to.equal(arg1 + '-' + 'modal-outside');
            });
        });
    });
    describe('event listeners', function() {
        var elementDisplay;
        var setDisplay = function(str) {
            elementDisplay = function() {
                return $('#' + arg1 + '-' + str)[0].style.display;
            };
        };

        describe('modal outside', function() {
            before(function() {
                setDisplay('modal-outside');
            });

            beforeEach(function() {
                $('#' + arg2).click();
            });

            it('click on modal button changes modal outside display to block',
               function() {
                   expect(elementDisplay())
                       .to.equal('block');
               });

            it('click on modal close changes modal outside display to none',
               function() {
                   $('#' + arg1 + '-modal-close').click();
                   expect(elementDisplay())
                       .to.equal('none');
               });

            it('click outside modal content changes modal outside display to none',
               function() {
                   $('#test-content-modal-outside')[0].click();
                   expect(elementDisplay())
                       .to.equal('none');
               });
        });

        describe('modal transparency', function() {
            before(function() {
                setDisplay('modal-transparency');
            });

            beforeEach(function() {
                $('#' + arg2).click();
            });

            it(
                'click on modal button changes modal transparency display to block',
               function() {
                   expect(elementDisplay())
                       .to.equal('block');
               });

            it('click on modal close changes modal transparency display to none',
               function() {
                   $('#' + arg1 + '-modal-close').click();
                   expect(elementDisplay())
                       .to.equal('none');
               });
        });
    });

    describe('stylesheet', function() {
        var dss = document.styleSheets;
        var cssRuleSelectors;
        var ss = getEasyModalSS();

        before(function() {
            cssRuleSelectors = (function() {
                var selectorNames = [];
                var i;

                for(i = 0; i < ss.cssRules.length; i++)
                    selectorNames.push(ss.cssRules[i].selectorText);

                return selectorNames;
            })();
        });

        it('creates a stylesheet with the id \'' + em.constructor.name + '\'',
           function() {
               expect(ss).to.exist;
               expect(ss.id).to.equal(em.constructor.name);
           });

        it('creates style rules for modal outside', function() {
            expect(cssRuleSelectors).to.contain('#' + arg1 + '-modal-outside');
        });

        it('creates style rules for modal content', function() {
            expect(cssRuleSelectors).to.contain('#' + arg1);
        });

        it('creates style rules for modal close', function() {
            expect(cssRuleSelectors).to.contain('#' + arg1 + '-modal-close');
        });

        it('creates style rules for modal close :hover', function() {
            expect(cssRuleSelectors).to.contain('#' + arg1 + '-modal-close:hover');
        });

        it('creates style rules for modal close :focus', function() {
            expect(cssRuleSelectors).to.contain('#' + arg1 + '-modal-close:focus');
        });

        it('does not add the stylesheet to the end of the stylesheet list',
           function() {
               if(dss.length > 1)
                   expect(dss[0].id !== ss.id);
           });
    });
    describe('second modal', function() {
        var ss = getEasyModalSS();

        var dss = document.styleSheets;
        var ssCount = dss.length;
        var ruleCount = ss.cssRules.length;

        new EasyModal('#test-content-2', '#test-button-2');

        it('does not add an additional stylesheet', function() {
            expect(ssCount).to.equal(dss.length);
        });

        ss = getEasyModalSS();

        it('it increases the rules by a factor of two', function() {
            expect(ruleCount * 2).to.equal(ss.cssRules.length);
        });
    });
});
