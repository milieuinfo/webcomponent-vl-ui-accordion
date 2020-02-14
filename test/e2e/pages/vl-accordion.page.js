const VlAccordion = require('../components/vl-accordion');
const { Page, Config } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class VlAccordionPage extends Page {
    async _getAccordion(selector) {
        return new VlAccordion(this.driver, selector);
    }

    async _openAccordion(selector) {
        return (await this._getAccordion(selector)).open();
    }

    async _sluitAccordion(selector) {
        return (await this._getAccordion(selector)).close();   
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

    async openStandaardAccordion() {
        return this._openAccordion('#accordion-1');
    }

    async openDynamischeAccordion() {
        return this._openAccordion('#accordion-2');
    }

    async openJavascriptAccordion() {
        return this._openAccordion('#accordion-javascript-toggle');
    }

    async openJSAccordionViaButton() {
        return (await this.driver.findElement(By.css('#open-accordion'))).click();
    }
   
    async sluitStandaardAccordion() {
        return this._sluitAccordion('#accordion-1');
    }

    async sluitDynamischeAccordion() {
        return this._sluitAccordion('#accordion-2');
    }

    async sluitJavascriptAccordion() {
        return this._sluitAccordion('#accordion-javascript-toggle');
    }

    async sluitJSAccordionViaButton() {
        return (await this.driver.findElement(By.css('#close-accordion'))).click();
    }

    async toggleJSAccordionViaButton() {
        return (await this.driver.findElement(By.css('#toggle-accordion'))).click();
    }

    async getDynamischeAccordionLinktext() {
        return (await this.getDynamischeAccordion()).linkText();
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-accordion.html');
    }
}

module.exports = VlAccordionPage;
