// Create a modal from an existing div and button

var EasyModal;

(function() {
    'use strict';

    var $ = require('jquery');

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

        modalContent.addClass('modal-content');
        modalButton.addClass('modal-button');

        function createElementWrapper(name, element) {
            var e = document.createElement(element);
            e.id = modalContent.id + '-' + name;

            var me = new ElementWrapper(e);
            me.addClass(name);
            return me;
        };

        var modalOutside = createElementWrapper('modal-outside', 'div');
        var modalClose = createElementWrapper('modal-close', 'span');
        var modalTransparency = createElementWrapper(
            'modal-transparency', 'div'
        );

        var placeholder = createElementWrapper('placeholder', 'div');

        // create a document fragment add elements needed to create modal

        var docFrag = document.createDocumentFragment();
        $(docFrag).append(modalOutside.element);

        modalContent.before(placeholder);
        modalOutside.prepend(modalContent);
        modalContent.prepend(modalClose);

        // insert document fragment in document
        placeholder.before(modalOutside);
        placeholder.before(modalTransparency);

        placeholder.remove();

        // create the 'X'
        modalClose.text('\u2573');

        // CREATE THE STYLESHEET

        var i;
        var dss = document.styleSheets;
        var ssName = this.constructor.name;
        var ss = null;

        // use an existing stylesheet

        for (i = 0; i < dss.length; i++)
            if(dss[i].id === ssName)
                ss = dss[i];

        if (!noStyles) {
           addStyleSheet(ss);
        }

        // ADD EVENT LISTENERS

        modalButton.on(
            'click',
            (function() {
                var moOriginalDisplay = modalOutside.css('display');
                var mtOriginalDisplay = modalTransparency.css('display');

                modalOutside.style.display = 'none';
                modalTransparency.style.display = 'none';

                return function() {
                    modalOutside.style.display = moOriginalDisplay;
                    modalTransparency.style.display = mtOriginalDisplay;
                };
            })()
        );

        modalClose.on(
            'click',
            function() {
                modalOutside.style.display = 'none';
                modalTransparency.style.display = 'none';
            }
        );

        $(window).on(
            'click',
            function(event) {
                    if (event.target == modalOutside.element) {
                        modalOutside.style.display = 'none';
                        modalTransparency.style.display = 'none';
                    }
            }
        );

        function addStyleSheet(styleSheet) {
            var cssStyleText = function(classSelector, stylesArr) {
                return '#' + classSelector + '{' + stylesArr.join('; ') + '}';
            };

            var styles = '';

            styles +=
                cssStyleText(modalOutside.id,
                             [
                                 'display: block',
                                 'position: fixed',
                                 'z-index: 2',
                                 'left: 0',
                                 'top: 0',
                                 'width: 100%',
                                 'height: 100%',
                                 'overflow: auto',
                             ]
                            );

            styles +=
                cssStyleText(modalTransparency.id,
                             [
                                 'display: block',
                                 'z-index: 1',
                                 'position: fixed',
                                 'left: 0',
                                 'top: 0',
                                 'width: 100%',
                                 'height: 100%',
                                 'overflow: auto',
                                 'background-color: rgb(0,0,0)',
                                 'opacity: .6',
                                 'background-color: rgba(0,0,0,0.6)',
                             ]
                            );

            styles +=
                cssStyleText(modalContent.id,
                             [
                                 'background-color: #534c48',
                                 'margin-left: auto',
                                 'margin-right: auto',
                                 'padding: 5%',
                                 'border: 1px solid #888',
                                 'width: 50%',
                                 'border-radius: 2px',
                                 'border-bottom: 5px solid #606060',
                             ]
                            );

            styles +=
                cssStyleText(modalClose.id,
                             [
                                 'font-family: Arial, san-serif',
                                 'color: #aaaaaa',
                                 'float: right',
                                 'font-size: 2em',
                                 'font-weight: bold',
                             ]
                            );

            styles +=
                cssStyleText(modalClose.id + ':hover',
                             [
                                 'text-decoration: none',
                                 'cursor: pointer',
                             ]
                            );

            styles +=
                cssStyleText(modalClose.id + ':focus',
                             [
                                 'text-decoration: none',
                                 'cursor: pointer',
                             ]
                            );

            var ss;

            if(!styleSheet) {
                ss = $('<style>')
                    .prop('type', 'text/css')
                    .prependTo('head');
                ss.html(styles);
            } else {
                ss = $(styleSheet.ownerNode);
                $(styleSheet.ownerNode)
                    .html($(styleSheet.ownerNode).html() + styles);
            }
            ss[0].sheet.id = ssName;
        }
    };
})();

module.exports = EasyModal;
