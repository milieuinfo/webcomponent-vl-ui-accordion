const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlAccordionMetWerkendeInfoTilePage = require('./pages/vl-accordion-met-werkende-info-tile.page');

describe('vl-accordion met werkende info-tile', async () => {
  let driver;
  let vlAccordionMetWerkendeInfoTilePage;

  beforeEach(() => {
    driver = getDriver();
    vlAccordionMetWerkendeInfoTilePage = new VlAccordionMetWerkendeInfoTilePage(driver);
    return vlAccordionMetWerkendeInfoTilePage.load();
  });

  it('als gebruiker kan ik een accordion met info-tile openen en sluiten', async () => {
    const accordion = await vlAccordionMetWerkendeInfoTilePage.getAccordionMetWerkendeInfoTile();
    await assert.eventually.isTrue(accordion.isClosed(), 'Initieel moet de accordion gesloten zijn');
    await assert.eventually.isFalse(accordion.isContentDisplayed(), 'Initieel wordt de accordion content niet getoond');

    const titleSlotElements = await accordion.getTitleSlotElements();
    const titel = titleSlotElements[0];
    await titel.click();
    await assert.eventually.isTrue(accordion.isOpen(), 'Clicking the title should open the accordion');
    await assert.eventually.isTrue(accordion.isContentDisplayed(), 'Clicking the title should show the accordion content');
  });

  it('als gebruiker kan ik een info-tile in een accordion openen en sluiten', async () => {
    const accordion = await vlAccordionMetWerkendeInfoTilePage.getAccordionMetWerkendeInfoTile();
    await assert.eventually.isTrue(accordion.isClosed(), 'Initieel moet de accordion gesloten zijn');
    await assert.eventually.isFalse(accordion.isContentDisplayed(), 'Initieel wordt de accordion content niet getoond');

    const toggleButton = await accordion.getTitleButton();
    // TODO: 14/04/2021 expliciet openen via de button werkt niet, ook niet via de accordion.open() methode!
    toggleButton.click();
    await assert.eventually.isTrue(accordion.isOpen(), 'Clicking the title should open the accordion');
    await assert.eventually.isTrue(accordion.isContentDisplayed(), 'Clicking the title should show the accordion content');
  });
});
