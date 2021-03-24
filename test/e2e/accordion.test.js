
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

  it('WCAG', async () => {
    await assert.eventually.isFalse(vlAccordionPage.hasWcagIssues());
  });

  it('als gebruiker kan ik een standaard accordion openen en sluiten', async () => {
    const accordion = await vlAccordionPage.getStandaardAccordion();
    await assertAccordionCanBeOpenedAndClosed(accordion);
  });

  it('als gebruiker kan ik een dynamische accordion openen en sluiten', async () => {
    const accordion = await vlAccordionPage.getDynamischeAccordion();
    await assertAccordionCanBeOpenedAndClosed(accordion);
  });

  it('als gebruiker kan ik een accordion via Javascript openen en sluiten', async () => {
    const accordion = await vlAccordionPage.getJSAccordion();

    await vlAccordionPage.clickJSAccordionOpenButton();
    await assert.eventually.isTrue(accordion.isOpen());
    await assert.eventually.isTrue(accordion.isContentDisplayed());

    await vlAccordionPage.clickJSAccordionCloseButton();
    await assert.eventually.isTrue(accordion.isClosed());
    await assert.eventually.isFalse(accordion.isContentDisplayed());

    await vlAccordionPage.clickJSAccordionToggleButton();
    await assert.eventually.isTrue(accordion.isOpen());
    await assert.eventually.isTrue(accordion.isContentDisplayed());

    await vlAccordionPage.clickJSAccordionToggleButton();
    await assert.eventually.isTrue(accordion.isClosed());
    await assert.eventually.isFalse(accordion.isContentDisplayed());
  });

  it('als gebruiker kan ik een accordion met title slot openen en sluiten', async () => {
    const accordion = await vlAccordionPage.getAccordionMetTitleSlot();
    await assertAccordionCanBeOpenedAndClosed(accordion);
  });

  it('als gebruiker kan ik een accordion met dynamische toggle text openen en sluiten', async () => {
    const accordion = await vlAccordionPage.getAccordionMetDynamischeAttributen();
    await assertAccordionCanBeOpenedAndClosed(accordion);
  });

  it('als gebruiker kan ik de titel zien van een standaard accordion', async () => {
    const accordion = await vlAccordionPage.getStandaardAccordion();
    await assert.eventually.equal(accordion.titleText(), 'Lees meer over de onderwijsdoelstelling');
    assert.equal((await accordion.getTitleSlotElements()).length, 0);
  });

  it('als gebruiker kan ik de titel zien van een accordion met title slot', async () => {
    const accordion = await vlAccordionPage.getAccordionMetTitleSlot();
    await assert.eventually.equal(accordion.titleText(), 'Lees meer over de onderwijsdoelstelling');
    assert.eventually.equal((await accordion.getTitleSlotElements())[0].getText(), 'Lees meer over de onderwijsdoelstelling');
  });

  it('als gebruiker kan ik aan de tekst zien wanneer een dynamische accordion open of gesloten is', async () => {
    const accordion = await vlAccordionPage.getDynamischeAccordion();
    await assert.eventually.equal(accordion.titleText(), 'Open de onderwijsdoelstelling');
    await accordion.open();
    await assert.eventually.equal(accordion.titleText(), 'Sluit de onderwijsdoelstelling');
    await accordion.close();
  });

  it('als gebruiker kan ik de inhoud van een accordion bekijken', async () => {
    const accordion = await vlAccordionPage.getStandaardAccordion();
    const slotElement = (await accordion.contentSlotElements())[0];
    await assert.eventually.equal(slotElement.getText(), 'Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.');
  });

  const assertAccordionCanBeOpenedAndClosed = async (accordion) => {
    await assert.eventually.isTrue(accordion.isClosed());
    await assert.eventually.isFalse(accordion.isContentDisplayed());
    await accordion.open();
    await assert.eventually.isTrue(accordion.isOpen());
    await assert.eventually.isTrue(accordion.isContentDisplayed());
    await accordion.close();
    await assert.eventually.isTrue(accordion.isClosed());
    await assert.eventually.isFalse(accordion.isContentDisplayed());
  };
});
