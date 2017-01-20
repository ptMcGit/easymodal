'use strict';

var $ = require('jquery');

function ElementWrapper(element) {
    if(element) {
        this.element = element;
        this.id = element.id;
        this.classList = element.classList;
        this.style = element.style;
        this.innerText = element.innerText;
    } else throw new Error();
}

ElementWrapper.prototype.remove = function() {
    this.element = this.element.parentElement.removeChild(this.element);
};

ElementWrapper.prototype.addClass = function(className) {
    $(this.element).addClass(className);
};

ElementWrapper.prototype.setInnerText = function(text) {
    if(text)
        this.element.innerText = text;

    return this.element.innerText;
};

ElementWrapper.prototype.insertAdjacentElement =
    function(where, elementWrapper) {
        this.element.insertAdjacentElement.call(
            this.element, where, elementWrapper.element
        );
    };

ElementWrapper.prototype.addEventListener = function(type, listener, options) {
    this.element.addEventListener.call(this.element, type, listener, options);
};

module.exports = ElementWrapper;
