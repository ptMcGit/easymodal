'use strict';

function ElementWrapper(element){
    if(element) {
        this.element = element;
        this.id = element.id;
        this.classList = element.classList;
        this.style = element.style;
        this.innerText = element.innerText;
    }
    else
        throw new Error();
}

ElementWrapper.prototype.setInnerText = function(text){
    if(text)
        this.element.innerText = text;

    return this.element.innerText;
};

ElementWrapper.prototype.insertAdjacentElement = function(){
    this.element.insertAdjacentElement.call(this.element, arguments[0], arguments[1].element);
};

ElementWrapper.prototype.addEventListener = function(){
    this.element.addEventListener.apply(this.element, arguments);
};

module.exports = ElementWrapper;
