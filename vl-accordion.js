import{VlElement}from"/node_modules/vl-ui-core/vl-core.js";import"/node_modules/vl-ui-button/vl-button.js";import"/node_modules/vl-ui-icon/vl-icon.js";(()=>{function t(t,e,o){if(!document.head.querySelector("#"+t)){let n=document.createElement("script");n.setAttribute("id",t),n.setAttribute("src",e),n.onload=o,document.head.appendChild(n)}}t("util.js","../node_modules/@govflanders/vl-ui-util/dist/js/util.js",()=>{t("accordion.js","/node_modules/vl-ui-accordion/dist/accordion.js")})})();export class VlAccordion extends(VlElement(HTMLElement)){static get _observedAttributes(){return["toggle-text","open-toggle-text","close-toggle-text"]}constructor(){super('\n            <style>\n                @import \'/node_modules/vl-ui-accordion/style.css\';\n            </style>\n\n            <div class="js js-vl-accordion">\n                <div data-vl-accordion>\n                    <button data-vl-accordion-toggle>\n                        <span is="vl-icon" icon="arrow-right-fat" before></span><span></span>\n                    </button>\n                    <div class="vl-accordion__content">\n                        <div class="vl-accordion__panel">\n                            <slot></slot>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ')}get _accordionElement(){return this._element.querySelector("[data-vl-accordion]")}get _buttonElement(){return this._element.querySelector("button")}get _titleElement(){return this._buttonElement.querySelector('span:not([is="vl-icon"])')}get _openToggleTextAttribute(){return this.getAttribute("open-toggle-text")}get _closeToggleTextAttribute(){return this.getAttribute("close-toggle-text")}get _dressedAttribute(){return this.getAttribute("data-vl-accordion-dressed")}dress(){(async()=>{for(;!window.vl||!window.vl.accordion;)await new Promise(t=>setTimeout(t,100));this._isDressed()||vl.accordion.dress(this._buttonElement)})()}open(){vl.accordion.open(this._accordionElement)}close(){vl.accordion.close(this._accordionElement)}toggle(){vl.accordion.toggle(this._accordionElement)}connectedCallback(){this.__setClasses(),this.dress()}_isDressed(){return!!this._dressedAttribute}_toggle_textChangedCallback(t,e){this._titleElement.textContent=e}_open_toggle_textChangedCallback(t,e){this._titleElement.classList.add("js-vl-accordion__toggle__text"),this._titleElement.setAttribute("data-vl-accordion-open-text",e)}_close_toggle_textChangedCallback(t,e){this._titleElement.classList.add("js-vl-accordion__toggle__text"),this._titleElement.setAttribute("data-vl-accordion-close-text",e)}__setClasses(){this.classList.add("js"),this._buttonElement.classList.add("vl-toggle"),this._buttonElement.classList.add("vl-link"),this._buttonElement.classList.add("vl-link--bold")}};customElements.define("vl-accordion",VlAccordion);