import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/@govflanders/vl-ui-util/dist/js/util.js';
import '/node_modules/@govflanders/vl-ui-accordion/dist/js/accordion.js';

/**
 * VlAccordion
 * @class
 * @classdesc Deccordion component kan gebruikt worden om informatie te tonen of te verbergen aan de hand van een toggle.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {string} data-vl-toggle-text - Attribuut wordt gebruikt als tekst waarop de gebruiker kan klikken om de accordion te openen en te sluiten.
 * @property {string} data-vl-open-toggle-text - Attribuut wordt gebruikt als tekst wanneer de gebruiker de accordion geopend heeft.
 * @property {string} data-vl-close-toggle-text - Attribuut wordt gebruikt als tekst wanneer de gebruiker de accordion gesloten heeft.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-accordion/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-accordion/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-accordion.html|Demo}
 *
 */
export class VlAccordion extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['toggle-text', 'open-toggle-text', 'close-toggle-text'];
  }

  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-accordion/dist/style.css';
      </style>

      <div class="js js-vl-accordion">
        <div class="vl-accordion" data-vl-accordion>
          <button class="vl-toggle vl-link vl-link--bold" data-vl-accordion-toggle>
            <i class="vl-link__icon vl-link__icon--before vl-toggle__icon vl-vi vl-vi-arrow-right-fat" aria-hidden="true"></i>
            <span></span>
          </button>
          <div class="vl-accordion__content js-vl-accordion__content">
            <div class="vl-accordion__panel">
              <slot id="accordion-slot"></slot>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  connectedCallback() {
    this.dress();
  }

  get _accordionElement() {
    return this._element.querySelector('[data-vl-accordion]');
  }

  get _buttonElement() {
    return this._element.querySelector('button');
  }

  get _titleElement() {
    return this._buttonElement.querySelector('span');
  }

  get _openToggleTextAttribute() {
    return this.getAttribute('open-toggle-text');
  }

  get _closeToggleTextAttribute() {
    return this.getAttribute('close-toggle-text');
  }

  get _dressedAttribute() {
    return this.getAttribute('accordion-dressed');
  }

  get _isDressed() {
    return !!this._dressedAttribute;
  }

  get _isOpen() {
    return this._accordionElement.classList.contains('js-vl-accordion--open');
  }

  /**
   * Activeer de accordion functionaliteit.
   *
   * @return {void}
   */
  dress() {
    if (!this._isDressed) {
      vl.accordion.dress(this._element);
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
    if (this._isOpen) {
      this.toggle();
    }
  }

  /**
   * Opent of sluit de accordion afhankelijk van de huidige status (open of gesloten) van de accordion.
   *
   * @return {void}
   */
  toggle() {
    vl.accordion.toggle(this._accordionElement);
  }

  _toggleTextChangedCallback(oldValue, newValue) {
    this._titleElement.textContent = newValue;
  }

  _openToggleTextChangedCallback(oldValue, newValue) {
    this._titleElement.classList.add('js-vl-accordion__toggle__text');
    this._titleElement.setAttribute('data-vl-accordion-open-text', newValue);
  }

  _closeToggleTextChangedCallback(oldValue, newValue) {
    this._titleElement.classList.add('js-vl-accordion__toggle__text');
    this._titleElement.setAttribute('data-vl-accordion-close-text', newValue);
  }
}

define('vl-accordion', VlAccordion);
