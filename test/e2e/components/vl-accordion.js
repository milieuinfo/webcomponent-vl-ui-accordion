const { VlElement } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');
class VlAccordion extends VlElement {  
    constructor(driver, selector) {
        super(driver, selector);
    }

    async _getToggleButton() {
        return this.shadowRoot.findElement(By.css('#accordion-toggle'));
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
        return (await this._content()).isDisplayed();
    }
    
    async isClosed() {
        return !(await (await this._content()).isDisplayed());
    }


    async _content() {
        return this.shadowRoot.findElement(By.css('#accordion-content'));
    }

    async contentElements() {
        const slottedContent = await (await this._content()).findElement(By.css("#accordion-slot"));
        return await this.driver.executeScript(
            'return arguments[0].assignedElements()', slottedContent);
    }
}

module.exports = VlAccordion;
