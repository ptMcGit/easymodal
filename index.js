var EasyModal;

(function(){
    'use strict';

    var ElementWrapper = require('./lib/element-wrapper.js');

    EasyModal = function EasyModal(modalContentID, modalButtonID) {

        if((arguments[0] === undefined) || (arguments[1] === undefined))
            throw new Error('Expected two arguments, found ' + arguments.length);

        var modalContent = new ElementWrapper(document.querySelector(arguments[0]));
        var modalButton = new ElementWrapper(document.querySelector(arguments[1]));

        if(!(modalContent && modalButton ))
            throw new Error('Did not find one of the element params in document.');

        modalContent.classList.add('modal-content');
        modalButton.classList.add('modal-button');

        function createElementWrapper(name, element){
            var e = document.createElement(element);
            e.id = modalContent.id + '-' + name;
            e.classList.add(name);

            var me = new ElementWrapper(e);
            return me;
        };

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

        // add event listeners

        modalButton.addEventListener(
            "click",
            function () { modalOutside.style.display = "block"; },
            false
        );

        modalClose.addEventListener(
            "click",
            function () { modalOutside.style.display = "none"; },
            false
        );

        window.addEventListener(
            "click",
            function (event) {
                    if (event.target == modalOutside.element) {
                        modalOutside.style.display = "none";
                    }
            },
            false
        );

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
