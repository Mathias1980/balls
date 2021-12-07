'use strict';

const dom = {

    create({
        inhalt = '',
        typ = 'div',
        eltern = false,
        klassen = [],
        attr = {},
        listeners = {},
        styles = {},
        amEnde = true,
        id = false
    } = {}) {
        let neu = document.createElement(typ);
        if (inhalt) neu.innerHTML = inhalt;
        if (id) neu.id = id;
        if (klassen.length) neu.className = klassen.join(' ');
    
        Object.entries(attr).forEach(el => neu.setAttribute(...el));
        Object.entries(listeners).forEach(el => neu.addEventListener(...el));
        Object.entries(styles).forEach(style => neu.style[style[0]] = style[1]);
    
        if (eltern) {
            if (!amEnde && eltern.children.length) eltern.prepend(neu);
            else eltern.append(neu);
        }
    
        return neu;
    },
    $(sel){
        return document.querySelector(sel);
    },
    $$(sel){
        return Array.from(document.querySelectorAll(sel));
    }

}
