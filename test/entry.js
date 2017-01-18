window.addEventListener('load', function(){
    switch(document.documentURI.split('/').pop()){
    case 'index.html':
        require('./specs/easy-modal_spec.js');
        break;
    case 'index-2.html':
        require('./specs/easy-modal_spec-2.js');
        break;
    }
}, false)
