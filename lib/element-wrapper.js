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
    this.element = $(this.element).remove();
};

ElementWrapper.prototype.addClass = function(className) {
    $(this.element).addClass(className);
};

ElementWrapper.prototype.setInnerText = function(text) {
    if(text)
        this.element.innerText = text;

    return this.element.innerText;
};

ElementWrapper.prototype.before = function(elementWrapper) {
    $(this.element).before(elementWrapper.element);
};

ElementWrapper.prototype.prepend = function(elementWrapper) {
    $(this.element).prepend(elementWrapper.element);
};

ElementWrapper.prototype.addEventListener = function(type, listener, options) {
    this.element.addEventListener.call(this.element, type, listener, options);
};

module.exports = ElementWrapper;
