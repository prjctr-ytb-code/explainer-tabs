import {Tabs} from './Tabs.js';

(() => {
    const readyState = document.readyState;

    if (readyState === 'interactive' || readyState === 'complete') {
        new Tabs();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            new Tabs();
        })
    }
})();
