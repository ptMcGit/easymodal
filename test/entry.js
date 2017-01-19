window.addEventListener('load', function(){
    switch(document.documentURI.split('/').pop()){
    case 'specs-1.html':
        require('./specs/easy-modal_spec.js');
        break;
    case 'specs-2.html':
        require('./specs/easy-modal_spec-2.js');
        break;
    }
}, false)
