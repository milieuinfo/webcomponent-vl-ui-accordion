const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;
class VlAccordion extends VlElement {
  async linkText() {
    return await this.titleText();
  }
  
  async titleText() {
    return (await this.shadowRoot.findElement(By.css('.vl-accordion__title'))).getText();
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
    return div.hasClass('js-vl-accordion--open');
  }

  async isClosed() {
    return !(await this.isOpen());
  }

  async contentSlotElements() {
    const slottedContent = await (await this._content()).findElement(By.css('#accordion-slot'));
    const slottedElements = await this.getAssignedElements(slottedContent);
    return Promise.all(slottedElements.map((slot) => new VlElement(this.driver, slot)));
  }

  async _getToggleButton() {
    return this.shadowRoot.findElement(By.css('button'));
  }

  async _content() {
    return this.shadowRoot.findElement(By.css('.vl-accordion__content'));
  }

  async _accordionDiv() {
    return this.shadowRoot.findElement(By.css('div[data-vl-accordion]'));
  }
}

module.exports = VlAccordion;
