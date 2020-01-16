const { VlElement } = require('vl-ui-core');
const { By } = require('selenium-webdriver');
class VlAccordion extends VlElement {  

    async _getToggleButton() {
        return this.shadowRoot.findElement(By.css('#accordion-toggle'));
    }

    async _getContent() {
        return this.shadowRoot.findElement(By.css('#accordion-content'));
    }

    async _waitUntilHidden() {
        const content = await this._getContent();
        const hidden = await content.getAttribute('aria-hidden');
        return this.driver.wait(() => {
            return hidden == "true"
        }, 2000);
    }

    async _waitUntilVisible() {
        const content = await this._getContent();
        const hidden = await content.getAttribute('aria-hidden');
        return this.driver.wait(() => {
            return hidden == "false"
        }, 2000);
    }

    async linkText() {
        return (await this.shadowRoot.findElement(By.css('.js-vl-accordion__toggle__text'))).getText();
    }

    async toggle() {
        return (await this._getToggleButton()).click();
    }

    async open() {
        const open = await this.isOpen()
        if(open) {
            return Promise.resolve();
         } else {
            await this.toggle();
            return this._waitUntilVisible();
         };
    }

    async close() {
        const closed = await this.isClosed();
        if(closed) {
            return Promise.resolve();
        } else {
            await this.toggle();
            return this._waitUntilHidden();
        }
    }

    async isOpen() {
        return (await this.shadowRoot.findElement(By.css('#accordion-content'))).isDisplayed();
    }
    
    async isClosed() {
        return !(await (await this.shadowRoot.findElement(By.css('#accordion-content'))).isDisplayed());
    }
}

module.exports = VlAccordion;
