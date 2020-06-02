const {VlElement} = require('vl-ui-core').Test;
const {By} = require('selenium-webdriver');
class VlAccordion extends VlElement {
  async _getToggleButton() {
    return this.shadowRoot.findElement(By.css('#accordion-toggle'));
  }

  async _content() {
    return this.shadowRoot.findElement(By.css('#accordion-content'));
  }

  async _accordionDiv() {
    return this.shadowRoot.findElement(By.css('div[data-vl-accordion]'));
  }

  async linkText() {
    return (await this.shadowRoot.findElement(By.css('.js-vl-accordion__toggle__text'))).getText();
  }

  async toggle() {
    return (await this._getToggleButton()).click();
  }

  async open() {
    return (await this.isOpen()) ? Promise.resolve() : this.toggle();
  }

  async close() {
    return (await this.isClosed()) ? Promise.resolve() : this.toggle();
  }

  async isOpen() {
    const div = await this._accordionDiv();
    const classes = (await div.getAttribute('class'));
    return classes.indexOf('js-vl-accordion--open') !== -1;
  }

  async isClosed() {
    return !(await this.isOpen());
  }

  async contentSlotElements() {
    const slottedContent = await (await this._content()).findElement(By.css('#accordion-slot'));
    const slottedElements = await this.driver.executeScript('return arguments[0].assignedElements()', slottedContent);
    return Promise.all(slottedElements.map((slot) => new VlElement(this.driver, slot)));
  }
}

module.exports = VlAccordion;
