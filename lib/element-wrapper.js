'use strict';

var $ = require('jquery');

function ElementWrapper(element) {
    if(element) {
        this.element = element;
        this.id = element.id;
        this.classList = element.classList;
        this.style = element.style;
        this.defaultStyles = [];
    } else throw new Error();
}

ElementWrapper.prototype.lastClass = function() {
    return this.classList[this.classList.length - 1];
};

ElementWrapper.prototype.remove = function() {
    this.element = $(this.element).remove();
};

ElementWrapper.prototype.addClass = function(className) {
    $(this.element).addClass(className);
};

ElementWrapper.prototype.text = function(text) {
    return $(this.element).text(text);
};

ElementWrapper.prototype.before = function(elementWrapper) {
    $(this.element).before(elementWrapper.element);
};

ElementWrapper.prototype.prepend = function(elementWrapper) {
    $(this.element).prepend(elementWrapper.element);
};

ElementWrapper.prototype.on = function(events, handler) {
    $(this.element).on(events, handler);
};

module.exports = ElementWrapper;
