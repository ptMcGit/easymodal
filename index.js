// Create a modal from an existing div and button

var EasyModal;

(function(){
    'use strict';

    require('./vendor/prepend_polyfill.js');
    var ElementWrapper = require('./lib/element-wrapper.js');

    EasyModal = function EasyModal(modalContentID, modalButtonID, noStyles) {

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

        var placeholder = createElementWrapper('placeholder', 'span');

        // create a document fragment add elements needed to create modal

        var docFrag = document.createDocumentFragment();
        docFrag.append(modalOutside.element);

        modalOutside.insertAdjacentElement('afterbegin', modalBox);
        modalBox.insertAdjacentElement('afterbegin', modalClose);

        modalContent.insertAdjacentElement('beforebegin', placeholder);
        modalClose.insertAdjacentElement('afterend', modalContent);

        // insert document fragment in document
        placeholder.insertAdjacentElement('beforebegin', modalOutside);
        placeholder.remove();

        // create the 'X'
        modalClose.setInnerText("\u2573");

        // ADD EVENT LISTENERS

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

        // CREATE THE STYLESHEET

        var i,
            dss = document.styleSheets,
            ssName = this.constructor.name,
            ss = null;

        // use an existing stylesheet

        for (i = 0; i < dss.length; i++)
            if(dss[i].id === ssName)
                ss = dss[i];

        if (!ss && !noStyles){
           addStyleSheet();
        }

        function addStyleSheet(){

            var ss = document.createElement('style');
            document.head.prepend(ss);

            ss.sheet.id = ssName;

            ss = ss.sheet;

            ss.insertRule('#' + modalOutside.id + '{' +
                          'display: none;' +
                          'position: fixed;' +
                          'z-index: 1;' +
                          'padding-top: 1%;' +
                          'left: 0;' +
                          'top: 0;' +
                          'width: 100%;' +
                          'height: 100%;' +
                          'overflow: auto;' +
                          'background-color: rgb(0,0,0);' +
                          'background-color: rgba(0,0,0,0.4);' +
                          '}', 0);

            ss.insertRule('#' + modalBox.id + '{' +
                          'background-color: #534c48;' +
                          'margin: auto;' +
                          'padding: 1%;' +
                          'border: 1px solid #888;' +
                          'width: 80%;' +
                          'max-width: 800px;' +
                          'border-radius: 2px;' +
                          'border-bottom: 5px solid #606060;' +
                          'opacity: .9;' +
                          '}', 0);

            ss.insertRule('#' + modalContent.id + '{' +
                          'padding: 10%;' +
                          '}', 0);

            ss.insertRule('#' + modalClose.id + '{' +
                          'font-family: Arial, san-serif;' +
                          'color: #aaaaaa;' +
                          'float: right;' +
                          'font-size: 28px;' +
                          'font-weight: bold;' +
                          '}', 0);

            ss.insertRule('#' + modalClose.id + ':hover' + '{' +
                          'text-decoration: none;' +
                          'cursor: pointer;' +
                          '}', 0);

            ss.insertRule('#' + modalClose.id + ':focus' + '{' +
                          'text-decoration: none;' +
                          'cursor: pointer;' +
                          '}', 0);
        }

    };

})();

module.exports = EasyModal;
