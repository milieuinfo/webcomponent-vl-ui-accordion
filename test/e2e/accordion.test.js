
const { assert, driver } = require('vl-ui-core').Test;
const VlAccordionPage = require('./pages/vl-accordion.page');

describe('vl-accordion', async () => {
    const vlAccordionPage = new VlAccordionPage(driver);

    before(() => {
        return vlAccordionPage.load();
    });

});
