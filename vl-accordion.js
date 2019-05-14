import{VlElement}from"/node_modules/vl-ui-core/vl-core.js";import"/node_modules/vl-ui-button/vl-button.js";import"/node_modules/vl-ui-icon/vl-icon.js";(()=>{function t(t,e,n){if(!document.head.querySelector("#"+t)){let o=document.createElement("script");o.setAttribute("id",t),o.setAttribute("src",e),o.onload=n,document.head.appendChild(o)}}t("util.js","../node_modules/@govflanders/vl-ui-util/dist/js/util.js",()=>{t("accordion.js","../node_modules/@govflanders/vl-ui-accordion/dist/js/accordion.js",()=>{document.querySelectorAll("vl-accordion").forEach(t=>{t.dress()})})})})();export class VlAccordion extends VlElement(HTMLElement){static get _observedAttributes(){return["toggle-text","open-toggle-text","close-toggle-text"]}constructor(){super(`
            <style>
                @import '/node_modules/vl-ui-accordion/style.css';
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
        `)}get _buttonElement(){return this._element.querySelector("button")}get _titleElement(){return this._buttonElement.querySelector('span:not([is="vl-icon"])')}get _openToggleTextAttribute(){return this.getAttribute("open-toggle-text")}get _closeToggleTextAttribute(){return this.getAttribute("close-toggle-text")}dress(){vl.accordion.dress(this._element.querySelector("[data-vl-accordion]"))}connectedCallback(){this.__setClasses()}_toggle_textChangedCallback(oldValue,newValue){this._titleElement.textContent=newValue}_open_toggle_textChangedCallback(oldValue,newValue){this._titleElement.classList.add("js-vl-accordion__toggle__text");this._titleElement.setAttribute("data-vl-accordion-open-text",newValue)}_close_toggle_textChangedCallback(oldValue,newValue){this._titleElement.classList.add("js-vl-accordion__toggle__text");this._titleElement.setAttribute("data-vl-accordion-close-text",newValue)}__setClasses(){this.classList.add("js");this._buttonElement.classList.add("vl-toggle");this._buttonElement.classList.add("vl-link");this._buttonElement.classList.add("vl-link--bold")}};customElements.define("vl-accordion",VlAccordion);