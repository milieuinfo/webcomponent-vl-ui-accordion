import { VlElement } from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-button/vl-button.js';
import '/node_modules/vl-ui-icon/vl-icon.js';

(() => {
    loadScript('util.js', '../node_modules/@govflanders/vl-ui-util/dist/js/util.js', () => {
        loadScript('accordion.js', '../node_modules/@govflanders/vl-ui-accordion/dist/js/accordion.js')
    });
  
    function loadScript(id, src, onload) {
        if (!document.head.querySelector('#' + id)) {
            let script = document.createElement('script');
            script.setAttribute('id', id);
            script.setAttribute('src', src);
            script.onload = onload;
            document.head.appendChild(script);
        }
    }
 })();

/**
 * VlAccordion
 * @class
 * @classdesc Deccordion component kan gebruikt worden om informatie te tonen of te verbergen aan de hand van een toggle.
 * 
 * @extends VlElement
 * 
 * @property {string} toggle-text - Attribuut wordt gebruikt als tekst waarop de gebruiker kan klikken om de accordion te openen en te sluiten.
 * @property {string} open-toggle-text - Attribuut wordt gebruikt als tekst wanneer de gebruiker de accordion geopend heeft.
 * @property {string} close-toggle-text - Attribuut wordt gebruikt als tekst wanneer de gebruiker de accordion gesloten heeft.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-accordion/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-accordion/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-accordion.html|Demo}
 * 
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
        (async() => {
            while(!window.vl || !window.vl.accordion) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            if (!this._isDressed()) {
                vl.accordion.dress(this._buttonElement);
            }
        })();
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

customElements.define('vl-accordion', VlAccordion);
