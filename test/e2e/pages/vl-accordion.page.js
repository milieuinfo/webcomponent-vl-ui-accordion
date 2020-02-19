const VlAccordion = require('../components/vl-accordion');
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

    async getJSAcoordionOpenButton() {
        return this.driver.findElement(By.css('#open-accordion'));
    }

    async getJSAcoordionCloseButton() {
        return this.driver.findElement(By.css('#close-accordion'));
    }

    async getJSAcoordionToggleButton() {
        return this.driver.findElement(By.css('#toggle-accordion'));
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-accordion.html');
    }
}

module.exports = VlAccordionPage;
