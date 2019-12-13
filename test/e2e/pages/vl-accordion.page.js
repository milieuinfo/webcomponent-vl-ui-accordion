const VlAccordion = require('../components/vl-accordion');
const { Page } = require('vl-ui-core');
const { Config } = require('vl-ui-core');

class VlAccordionPage extends Page {
    async _getAccordion(selector) {
        return new VlAccordion(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-accordion.html');
    }
}

module.exports = VlAccordionPage;
