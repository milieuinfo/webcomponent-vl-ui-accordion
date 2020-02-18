
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlAccordionPage = require('./pages/vl-accordion.page');

describe('vl-accordion', async () => {
    const vlAccordionPage = new VlAccordionPage(driver);
    
    beforeEach(() => {
        return vlAccordionPage.load();
    });

    it('als gebruiker kan ik een standaard accordion openen en sluiten', async () => {
        const accordion = await vlAccordionPage.getStandaardAccordion();
        await assert.eventually.isTrue(accordion.isClosed());
        await vlAccordionPage.openStandaardAccordion();
        await assert.eventually.isTrue(accordion.isOpen());
        await vlAccordionPage.sluitStandaardAccordion();
        await assert.eventually.isTrue(accordion.isClosed());
    });

    it('als gebruiker kan ik een dynamische accordion openen en sluiten', async () => {
        const accordion = await vlAccordionPage.getDynamischeAccordion();
        await assert.eventually.isTrue(accordion.isClosed());
        await vlAccordionPage.openDynamischeAccordion();
        await assert.eventually.isTrue(accordion.isOpen());
        await vlAccordionPage.sluitDynamischeAccordion();
        await assert.eventually.isTrue(accordion.isClosed());
    });

    it('als gebruiker kan ik een accordion via Javascript openen en sluiten', async () => {
        const accordion = await vlAccordionPage.getJSAccordion();
        await assert.eventually.isTrue(accordion.isClosed());
        await vlAccordionPage.openJavascriptAccordion();
        await assert.eventually.isTrue(accordion.isOpen());
        await vlAccordionPage.sluitJavascriptAccordion();
        await assert.eventually.isTrue(accordion.isClosed());
        await vlAccordionPage.openJSAccordionViaButton();
        await assert.eventually.isTrue(accordion.isOpen());
        await vlAccordionPage.sluitJSAccordionViaButton();
        await assert.eventually.isTrue(accordion.isClosed());
        await vlAccordionPage.toggleJSAccordionViaButton();
        await assert.eventually.isTrue(accordion.isOpen());
        await vlAccordionPage.toggleJSAccordionViaButton();
        await assert.eventually.isTrue(accordion.isClosed());
    });

    it('als een dynamische accordion opent en sluit, verandert de linktext', async () => {
        await assert.eventually.equal(vlAccordionPage.getDynamischeAccordionLinktext(), 'Open de onderwijsdoelstelling');
        await vlAccordionPage.openDynamischeAccordion();
        await assert.eventually.equal(vlAccordionPage.getDynamischeAccordionLinktext(), 'Sluit de onderwijsdoelstelling');
        await vlAccordionPage.sluitDynamischeAccordion();
    });

    it('de content elements zijn raadpleegbaar', async () => {
      await assert.eventually.include(vlAccordionPage.getStandaardAccordionTextContent(), 'Onderwijs helpt jonge mensen ');
    });

    after(() => driver.quit());
});
