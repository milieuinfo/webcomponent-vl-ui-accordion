const VlAccordion = require('../components/vl-accordion');
const {Page, Config} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlAccordionPage extends Page {
  async _getAccordion(selector) {
    return new VlAccordion(this.driver, selector);
  }

  async getStandaardAccordion() {
    return this._getAccordion('#accordion-standard');
  }

  async getDynamischeAccordion() {
    return this._getAccordion('#accordion-dynamic-toggle');
  }

  async getJSAccordion() {
    return this._getAccordion('#accordion-javascript-toggle');
  }

  async clickJSAccordionOpenButton() {
    return this._clickJSAccordionButton('#open-accordion');
  }

  async clickJSAccordionCloseButton() {
    return this._clickJSAccordionButton('#close-accordion');
  }

  async clickJSAccordionToggleButton() {
    return this._clickJSAccordionButton('#toggle-accordion');
  }

  async _clickJSAccordionButton(selector) {
    const element = await this.driver.findElement(By.css(selector));
    await element.click();
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-accordion.html');
  }
}

module.exports = VlAccordionPage;
