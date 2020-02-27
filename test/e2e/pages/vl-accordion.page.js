const VlAccordion = require('../components/vl-accordion');
const { VlButton } = require('vl-ui-button').Test;
const { Page, Config } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class VlAccordionPage extends Page {
    async _getAccordion(selector) {
        return new VlAccordion(this.driver, selector);
    }

    async getStandaardAccordion() {
        return this._getAccordion('#accordion-1');
    }

    async getDynamischeAccordion() {
        return this._getAccordion('#accordion-2');
    }

    async getJSAccordion() {
        return this._getAccordion('#accordion-javascript-toggle');
    }

    async getJSAccordionOpenButton() {
        return new VlButton(this.driver, '#open-accordion');
    }

    async getJSAccordionCloseButton() {
        return new VlButton(this.driver, '#close-accordion');
    }

    async getJSAccordionToggleButton() {
        return new VlButton(this.driver, '#toggle-accordion');
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-accordion.html');
    }
}

module.exports = VlAccordionPage;
