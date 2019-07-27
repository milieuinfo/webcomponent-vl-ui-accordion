import {define, VlElement} from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-button/vl-button.js';
import '/node_modules/vl-ui-icon/vl-icon.js';

/**
 * VlAccordion
 * @class
 * @classdesc Deccordion component kan gebruikt worden om informatie te tonen of te verbergen aan de hand van een toggle. <a href="demo/vl-accordion.html">Demo</a>.
 *
 * @extends VlElement
 *
 * @property {string} toggle-text - Attribuut wordt gebruikt als tekst waarop de gebruiker kan klikken om de accordion te openen en te sluiten.
 * @property {string} open-toggle-text - Attribuut wordt gebruikt als tekst wanneer de gebruiker de accordion geopend heeft.
 * @property {string} close-toggle-text - Attribuut wordt gebruikt als tekst wanneer de gebruiker de accordion gesloten heeft.
 */
export class VlAccordion extends VlElement(HTMLElement) {
    static get _observedAttributes() {
        return ['toggle-text', 'open-toggle-text', 'close-toggle-text'];
    }

    constructor() {
        super(`
            <style>
                @import '../style.css';
            </style>

            <div class="js js-vl-accordion">
                <div data-vl-accordion>
                    <button data-vl-accordion-toggle>
                        <span is="vl-icon" icon="arrow-right-fat" before></span><span></span>
                    </button>
                    <div class="vl-accordion__content">
                        <div class="vl-accordion__panel">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    get _accordionElement() {
        return this._element.querySelector('[data-vl-accordion]');
    }

    get _buttonElement() {
        return this._element.querySelector('button');
    }

    get _titleElement() {
        return this._buttonElement.querySelector('span:not([is="vl-icon"])');
    }

    get _openToggleTextAttribute() {
        return this.getAttribute('open-toggle-text');
    }

    get _closeToggleTextAttribute() {
        return this.getAttribute('close-toggle-text');
    }

    get _dressedAttribute() {
        return this.getAttribute('data-vl-accordion-dressed');
    }

    /**
     * Activeer de accordion functionaliteit.
     *
     * @return {void}
     */
    dress() {
        if (!this._isDressed()) {
            vl.accordion.dress(this._buttonElement);
        }
    }

    /**
     * Opent de accordion.
     *
     * @return {void}
     */
    open() {
        vl.accordion.open(this._accordionElement);
    }

    /**
     * Sluit de accordion.
     *
     * @return {void}
     */
    close() {
        vl.accordion.close(this._accordionElement);
    }

    /**
     * Opent of sluit de accordion afhankelijk van de huidige status (open of gesloten) van de accordion.
     *
     * @return {void}
     */
    toggle() {
        vl.accordion.toggle(this._accordionElement);
    }

    connectedCallback() {
        this.__setClasses();
        this.dress();
    }

    _isDressed() {
        return !!this._dressedAttribute;
    }

    _toggle_textChangedCallback(oldValue, newValue) {
        this._titleElement.textContent = newValue;
    }

    _open_toggle_textChangedCallback(oldValue, newValue) {
        this._titleElement.classList.add('js-vl-accordion__toggle__text');
        this._titleElement.setAttribute('data-vl-accordion-open-text', newValue);
    }

    _close_toggle_textChangedCallback(oldValue, newValue) {
        this._titleElement.classList.add('js-vl-accordion__toggle__text');
        this._titleElement.setAttribute('data-vl-accordion-close-text', newValue);
    }

    __setClasses() {
        this.classList.add('js');
        this._buttonElement.classList.add('vl-toggle');
        this._buttonElement.classList.add('vl-link');
        this._buttonElement.classList.add('vl-link--bold');
    }
}

(() => {

    // cfr https://www.html5rocks.com/en/tutorials/speed/script-loading/
    // download as fast as possible in the provided order

    const awaitScript = (id, src) => {
        if (document.head.querySelector('#' + id)) {
            console.log(`script with id '${id}' is already loaded`);
            return Promise.resolve();
        }

        let script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.async = false;

        const promise = new Promise((resolve, reject) => {
            script.onload = () => {
                resolve();
            };
        });

        document.head.appendChild(script);
        return promise;
    };

    const awaitUntil = (condition) => {
        return new Promise((resolve, reject) => {
            (async () => {
              console.log(`condition ${condition}` );
                while (!condition()) {
                    await new Promise(r => setTimeout(r, 50));
                }
                resolve();
            })();
        });
    };

    Promise.all([
        awaitScript('util', '/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js'),
        awaitScript('accordion', '/node_modules/@govflanders/vl-ui-accordion/dist/js/accordion.js'),
        awaitUntil(() => window.vl && window.vl.accordion)]
    ).then(() => {
        define('vl-accordion', VlAccordion);
    });
})();