var EasyModal;

(function(){
    'use strict';

    EasyModal = function EasyModal(modalContentID, modalButtonID) {

        if((arguments[0] === undefined) || (arguments[1] === undefined))
            throw new Error('Expected two arguments, found ' + arguments.length);

        function ElementWrapper(element){
            if(element)
                this.element = element;
            else
                throw new Error();
        }

        var createElementWrapper = function(name, element){
            var e = document.create(element),
                e.id = modalContent.id + '-' + name,
                me = new ElementWrapper(e);
            e.classList.add(name)
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
        modalClose.innerText = "\u2573";

        // create a document fragment add elements needed to create modal
        // insert document fragment in document

        var placeholder = document.createElement('span'),
            docFrag = document.createDocumentFragment();

        modalContent.insertAdjacentElement('beforebegin', placeholder)

        docFrag.append(modalContent.element);
        docFrag.append(

        me.modalOutside.insertAdjacentElement(
                "afterbegin",
                me.modalBox
            );

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
