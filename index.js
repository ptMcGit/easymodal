// Create a modal from an existing div and button

var EasyModal;

(function() {
    'use strict';

    require('./vendor/prepend_polyfill.js');
    var ElementWrapper = require('./lib/element-wrapper.js');

    EasyModal = function EasyModal(modalContentID, modalButtonID, noStyles) {
        if((modalContentID === undefined) || (modalButtonID === undefined))
            throw new Error(
                'Expected two arguments, found ' + arguments.length
            );

        var modalContent = new ElementWrapper(
            document.querySelector(modalContentID)
        );
        var modalButton = new ElementWrapper(
            document.querySelector(modalButtonID)
        );

        if(!(modalContent && modalButton ))
            throw new Error(
                'Did not find one of the element params in document.'
            );

        modalContent.classList.add('modal-content');
        modalButton.classList.add('modal-button');

        function createElementWrapper(name, element) {
            var e = document.createElement(element);
            e.id = modalContent.id + '-' + name;
            e.classList.add(name);

            var me = new ElementWrapper(e);
            return me;
        };

        var modalOutside = createElementWrapper('modal-outside', 'div');
        var modalClose = createElementWrapper('modal-close', 'span');
        var modalTransparency = createElementWrapper(
            'modal-transparency', 'div'
        );

        var placeholder = createElementWrapper('placeholder', 'span');

        // create a document fragment add elements needed to create modal

        var docFrag = document.createDocumentFragment();
        docFrag.append(modalOutside.element);

        modalContent.insertAdjacentElement('beforebegin', placeholder);

        modalOutside.insertAdjacentElement('afterbegin', modalContent);
        modalContent.insertAdjacentElement('beforebegin', modalClose);

        // insert document fragment in document
        placeholder.insertAdjacentElement('beforebegin', modalOutside);
        placeholder.insertAdjacentElement('beforebegin', modalTransparency);

        placeholder.remove();

        // create the 'X'
        modalClose.setInnerText('\u2573');

        // ADD EVENT LISTENERS

        modalButton.addEventListener(
            'click',
            function() {
                modalOutside.style.display = 'block';
                modalTransparency.style.display = 'block';
            },
            false
        );

        modalClose.addEventListener(
            'click',
            function() {
                modalOutside.style.display = 'none';
                modalTransparency.style.display = 'none';
            },
            false
        );

        window.addEventListener(
            'click',
            function(event) {
                    if (event.target == modalOutside.element) {
                        modalOutside.style.display = 'none';
                        modalTransparency.style.display = 'none';
                    }
            },
            false
        );

        // CREATE THE STYLESHEET

        var i;
        var dss = document.styleSheets;
        var ssName = this.constructor.name;
        var ss = null;

        // use an existing stylesheet

        for (i = 0; i < dss.length; i++)
            if(dss[i].id === ssName)
                ss = dss[i];

        if (!ss && !noStyles) {
           addStyleSheet();
        }

        function addStyleSheet() {
            var ss = document.createElement('style');
            document.head.prepend(ss);

            ss.sheet.id = ssName;

            ss = ss.sheet;

            ss.insertRule('.' + modalOutside.classList[0] + '{' +
                          'display: none;' +
                          'position: fixed;' +
                          'z-index: 2;' +
                          'padding-top: 1%;' +
                          'left: 0;' +
                          'top: 0;' +
                          'width: 100%;' +
                          'height: 100%;' +
                          'overflow: auto;' +
                          '}', 0);

            ss.insertRule('.' + modalTransparency.classList[0] + '{' +
                          'display: none;' +
                          'z-index: 1;' +
                          'position: fixed;' +
                          'left: 0;' +
                          'top: 0;' +
                          'width: 100%;' +
                          'height: 100%;' +
                          'overflow: auto;' +
                          'background-color: rgb(0,0,0);' +
                          'opacity: .4;' +
                          'background-color: rgba(0,0,0,0.4);' +
                          '}', 0);

            ss.insertRule('.' + modalContent.classList[0] + '{' +
                          'background-color: #534c48;' +
                          'margin: auto;' +
                          'padding: 1%;' +
                          'border: 1px solid #888;' +
                          'width: 80%;' +
                          'max-width: 800px;' +
                          'border-radius: 2px;' +
                          'border-bottom: 5px solid #606060;' +
                          'padding: 10%;' +
                          '}', 0);

            ss.insertRule('.' + modalClose.classList[0] + '{' +
                          'font-family: Arial, san-serif;' +
                          'color: #aaaaaa;' +
                          'float: right;' +
                          'font-size: 28px;' +
                          'font-weight: bold;' +
                          '}', 0);

            ss.insertRule('.' + modalClose.classList[0] + ':hover' + '{' +
                          'text-decoration: none;' +
                          'cursor: pointer;' +
                          '}', 0);

            ss.insertRule('.' + modalClose.classList[0] + ':focus' + '{' +
                          'text-decoration: none;' +
                          'cursor: pointer;' +
                          '}', 0);
        }
    };
})();

module.exports = EasyModal;
