const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlAccordionMetInnerVlInfoTileEnInfoTileAlsEersteGeimporteerdPage = require('./pages/vl-accordion-met-inner-vl-info-tile-en-info-tile-als-eerste-geimporteerd.page');

describe('vl-accordion met werkende info-tile', async () => {
  let driver;
  let vlAccordionMetInnerVlInfoTileEnInfoTileAlsEersteGeimporteerdPage;

  beforeEach(() => {
    driver = getDriver();
    vlAccordionMetInnerVlInfoTileEnInfoTileAlsEersteGeimporteerdPage = new VlAccordionMetInnerVlInfoTileEnInfoTileAlsEersteGeimporteerdPage(driver);
    return vlAccordionMetInnerVlInfoTileEnInfoTileAlsEersteGeimporteerdPage.load();
  });

  it('als gebruiker kan ik een accordion met info-tile openen en sluiten', async () => {
    const accordion = await vlAccordionMetInnerVlInfoTileEnInfoTileAlsEersteGeimporteerdPage.getAccordionMetInnerInfoTile();
    await assert.eventually.isTrue(accordion.isClosed(), 'Initieel moet de accordion gesloten zijn');
    await assert.eventually.isFalse(accordion.isContentDisplayed(), 'Initieel wordt de accordion zijn inhoud niet getoond');

    const titleSlotElements = await accordion.getTitleSlotElements();
    const titel = titleSlotElements[0];
    await titel.click();
    await assert.eventually.isTrue(accordion.isOpen(), 'Klikken op de titel moet de accordion openen');
    await assert.eventually.isTrue(accordion.isContentDisplayed(), 'Klikken op de titel moet de accordion zijn inhoud tonen');
  });

  it('als gebruiker kan ik een info-tile in een accordion openen en sluiten', async () => {
    const accordion = await vlAccordionMetInnerVlInfoTileEnInfoTileAlsEersteGeimporteerdPage.getAccordionMetInnerInfoTile();
    await assert.eventually.isTrue(accordion.isClosed(), 'Initieel moet de accordion gesloten zijn');
    await assert.eventually.isFalse(accordion.isContentDisplayed(), 'Initieel wordt de accordion zijn inhoud niet getoond');

    const toggleButton = await accordion.getTitleButton();
    // TODO: 14/04/2021 expliciet openen via de button werkt niet, ook niet via de accordion.open() methode!
    await toggleButton.click();
    await assert.eventually.isTrue(accordion.isOpen(), 'Klikken op de titel moet de accordion openen');
    await assert.eventually.isTrue(accordion.isContentDisplayed(), 'Klikken op de titel moet de accordion zijn inhoud tonen');
  });
});
