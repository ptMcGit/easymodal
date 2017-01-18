var EasyModal;

(function(){
    'use strict';

    EasyModal = function EasyModal(modalContentID, modalButtonID) {

        if((arguments[0] === undefined) || (arguments[1] === undefined))
            throw new Error('Expected two arguments, found ' + arguments.length);

        function ElementWrapper(element){
            if(element) {
                this.element = element;
                this.id = element.id;
                this.classList = element.classList;
                this.style = element.style;
                this.innerText = element.innerText;
            }
            else
                throw new Error();
        }

        ElementWrapper.prototype.setInnerText = function(text){
            if(text)
                this.element.innerText = text;

            return this.element.innerText;
        };

        ElementWrapper.prototype.insertAdjacentElement = function(){
            this.element.insertAdjacentElement.call(this.element, arguments[0], arguments[1].element);
        };

        ElementWrapper.prototype.addEventListener = function(){
            this.element.addEventListener.apply(this.element, arguments);
        };

        var createElementWrapper = function(name, element){
            var e = document.createElement(element);
            e.id = modalContent.id + '-' + name;
            e.classList.add(name);

            var me = new ElementWrapper(e);
            return me;
        };

        var modalContent = new ElementWrapper(document.querySelector(arguments[0]));
        var modalButton = new ElementWrapper(document.querySelector(arguments[1]));

        if(!(modalContent && modalButton ))
            throw new Error('Did not find one of the element params in document.');

        modalContent.classList.add('modal-content');
        modalButton.classList.add('modal-button');

        var modalOutside = createElementWrapper('modal-outside','div');
        var modalBox = createElementWrapper('modal-box', 'div');
        var modalClose = createElementWrapper('modal-close', 'span');
        // create the 'X'
        var placeholder = createElementWrapper('placeholder', 'span');

        // create a document fragment add elements needed to create modal
        // insert document fragment in document

        var docFrag = document.createDocumentFragment();
        docFrag.append(modalOutside.element);

        modalOutside.insertAdjacentElement('afterbegin', modalBox);
        modalBox.insertAdjacentElement('afterbegin', modalClose);

        modalContent.insertAdjacentElement('beforebegin', placeholder);
        modalClose.insertAdjacentElement('afterend', modalContent);

        placeholder.insertAdjacentElement('beforebegin', modalOutside);

        modalClose.setInnerText("\u2573");

            me.modalBox.insertAdjacentElement(
                "afterbegin",
                me.modalClose
            );

            me.modalContent.insertAdjacentElement(
                "beforebegin",
                me.modalOutside
            );

            me.modalClose.insertAdjacentElement(
                "afterend",
                me.modalContent
            );

        })(this.modalElements);

        // create the stylesheet

        var i,
            dss = document.styleSheets,
            title = this.constructor.name,
            ss = null;

        // is there a stylesheet already?
        for (i = 0; i < dss.length; i++)
            if(dss[i].title === title)
                ss = dss[i];

        if (!ss){
            ss = document.createElement('style');
            document.head.append(ss);
            ss.title = title;
        }

    };

})();

module.exports = EasyModal;
