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
      const button = await new VlButton(this.driver, selector);
      await this.driver.executeScript('return arguments[0].scrollIntoView()',
          button);
      return button.click();
  }


    async load() {
        await super.load(Config.baseUrl + '/demo/vl-accordion.html');
    }
}

module.exports = VlAccordionPage;
