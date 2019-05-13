import { VlElement } from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-button/vl-button.js';
import '/node_modules/vl-ui-icon/vl-icon.js';

(() => {
    loadScript('util.js', '../node_modules/@govflanders/vl-ui-util/dist/js/util.min.js', () => {
        loadScript('accordion.js', '../node_modules/@govflanders/vl-ui-accordion/dist/js/accordion.js', () => {
            document.querySelectorAll('vl-accordion').forEach(accordion => {
                accordion.dress();
            });
        });
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
 * @classdesc Deccordion component kan gebruikt worden om informatie te tonen of te verbergen aan de hand van een toggle. <a href="demo/vl-accordion.html">Demo</a>.
 * 
 * @extends VlElement
 */
export class VlAccordion extends VlElement(HTMLElement) {
    constructor() {
        super(`
            <style>
                @import '../style.css';
            </style>

            <div class="js">
                <div data-vl-accordion>
                    <button data-vl-accordion-toggle>
                        <span is="vl-icon" icon="arrow-right-fat" before></span>Lees meer over de onderwijsdoelstelling
                    </button>
                    <div class="vl-accordion__content">
                        <div class="vl-accordion__panel">
                            Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    get _buttonElement() {
        return this._element.querySelector('button');
    }

    dress() {
        vl.accordion.dress(this._element.querySelector('[data-vl-accordion]'));
    }

    connectedCallback() {
        this.classList.add('js');
        this._buttonElement.classList.add('vl-toggle');
        this._buttonElement.classList.add('vl-link');
        this._buttonElement.classList.add('vl-link--bold');
    }
}

customElements.define('vl-accordion', VlAccordion);