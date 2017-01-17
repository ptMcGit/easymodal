var EasyModal;

(function(){
    'use strict';

    EasyModal = function EasyModal(modalContentID, modalButtonID) {

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
            me.modalClose.innerText = "\u2573";

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
