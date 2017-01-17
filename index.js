var EasyModal;

(function(){
    'use strict';

    EasyModal = function(modalContentID, modalButtonID) {

        if((arguments[0] === undefined) || (arguments[1] === undefined))
            throw new Error('Expected two arguments, found ' + arguments.length);

        this.modalElements = {
            'modalContent': document.querySelector(modalContentID),
            'modalButton': document.querySelector(modalButtonID)
        };

        (function(me){
            if(!(me.modalContent && me.modalButton )){
                throw new Error('Did not find one of the element params in document.');
            }
       })(this.modalElements);

        // create a document fragment add elements needed to create modal
        // insert document fragment in document

        (function(me){
            var addPrefix = function(name){
                return me.modalContent.id + '-' + name;
            };

            var e,
//                elements = {},
                docFrag = document.createDocumentFragment();


            var createElement = function(kind, id){
                var renamed = id.replace(/([A-Z]){1}/g,
                                         function(full, a){
                                             return '-' + a.toLowerCase();});

                e = me[id] = document.createElement(kind);
                docFrag.append(e);

                e.id = addPrefix(renamed);
                e.classList.add(renamed);
            };

            createElement('div', 'modalBox');
            createElement('span', 'modalClose');

            // create the 'X'
//            console.log('elements.modalClose: ', me);
            me.modalClose.appendChild(
                document.createTextNode("\u2573"));

            createElement('div', 'modalOutside');

            // nest elements relative to modal_element

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

    };

})();

module.exports = EasyModal;
