
const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlAccordionPage = require('./pages/vl-accordion.page');

describe('vl-accordion', async () => {
  let driver;
  let vlAccordionPage;

  beforeEach(() => {
    driver = getDriver();
    vlAccordionPage = new VlAccordionPage(driver);
    return vlAccordionPage.load();
  });

  it('als gebruiker kan ik een standaard accordion openen en sluiten', async () => {
    const accordion = await vlAccordionPage.getStandaardAccordion();
    await assert.eventually.isTrue(accordion.isClosed());
    await accordion.open();
    await assert.eventually.isTrue(accordion.isOpen());
    await accordion.close();
    await assert.eventually.isTrue(accordion.isClosed());
  });

  it('als gebruiker kan ik een dynamische accordion openen en sluiten', async () => {
    const accordion = await vlAccordionPage.getDynamischeAccordion();
    await assert.eventually.isTrue(accordion.isClosed());
    await accordion.open();
    await assert.eventually.isTrue(accordion.isOpen());
    await accordion.close();
    await assert.eventually.isTrue(accordion.isClosed());
  });

  it('als gebruiker kan ik een accordion via Javascript openen en sluiten', async () => {
    const accordion = await vlAccordionPage.getJSAccordion();
    await vlAccordionPage.clickJSAccordionOpenButton();
    await assert.eventually.isTrue(accordion.isOpen());
    await vlAccordionPage.clickJSAccordionCloseButton();
    await assert.eventually.isTrue(accordion.isClosed());
    await vlAccordionPage.clickJSAccordionToggleButton();
    await assert.eventually.isTrue(accordion.isOpen());
    await vlAccordionPage.clickJSAccordionToggleButton();
    await assert.eventually.isTrue(accordion.isClosed());
  });

  it('als gebruiker kan ik aan de tekst zien wanneer een dynamische accordion open of gesloten is', async () => {
    const accordion = await vlAccordionPage.getDynamischeAccordion();
    await assert.eventually.equal(accordion.linkText(), 'Open de onderwijsdoelstelling');
    await accordion.open();
    await assert.eventually.equal(accordion.linkText(), 'Sluit de onderwijsdoelstelling');
    await accordion.close();
  });

  it('als gebruiker kan ik de inhoud van een accordion bekijken', async () => {
    const accordion = await vlAccordionPage.getStandaardAccordion();
    const slotElement = (await accordion.contentSlotElements())[0];
    await assert.eventually.equal(slotElement.getText(), 'Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.');
  });
});
