'use strict';

const ajax = {
    get(url, callback, isXML) {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                if (isXML) callback(xhr.responseXML);
                else callback(xhr.responseText);
            } else console.log(xhr.statusText);
        });
        xhr.send();
    }
}