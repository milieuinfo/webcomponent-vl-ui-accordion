const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlAccordionMetNietWerkendeInfoTilePage = require('./pages/vl-accordion-met-niet-werkende-info-tile.page');
const {By} = require('vl-ui-core').Test.Setup;

describe('vl-accordion met niet werkende info-tile', async () => {
  let driver;
  let vlAccordionMetNietWerkendeInfoTilePage;

  beforeEach(() => {
    driver = getDriver();
    vlAccordionMetNietWerkendeInfoTilePage = new VlAccordionMetNietWerkendeInfoTilePage(driver);
    return vlAccordionMetNietWerkendeInfoTilePage.load();
  });

  it('als gebruiker kan ik een accordion met info-tile openen en sluiten', async () => {
    const accordion = await vlAccordionMetNietWerkendeInfoTilePage.getAccordionMetWerkendeInfoTile();
    await assert.eventually.isTrue(accordion.isClosed(), 'Initieel moet de accordion gesloten zijn');
    await assert.eventually.isFalse(accordion.isContentDisplayed(), 'Initieel wordt de accordion content niet getoond');

    const titleSlotElements = await accordion.getTitleSlotElements();
    const titel = titleSlotElements[0];
    await titel.click();
    await assert.eventually.isTrue(accordion.isOpen(), 'Clicking the title should open the accordion');
    await assert.eventually.isTrue(accordion.isContentDisplayed(), 'Clicking the title should show the accordion content');
  });

  it('als gebruiker kan ik een info-tile in een accordion openen en sluiten', async () => {
    const accordion = await vlAccordionMetNietWerkendeInfoTilePage.getAccordionMetWerkendeInfoTile();
    await assert.eventually.isTrue(accordion.isClosed(), 'Initieel moet de accordion gesloten zijn');
    await assert.eventually.isFalse(accordion.isContentDisplayed(), 'Initieel wordt de accordion content niet getoond');

    await accordion.open();
    await assert.eventually.isTrue(accordion.isOpen(), 'Clicking the title should open the accordion');
    await assert.eventually.isTrue(accordion.isContentDisplayed(), 'Clicking the title should show the accordion content');

    const contentSlotElements = await accordion.contentSlotElements();
    const contentSlotElement = contentSlotElements[0];
    const infoTile = await contentSlotElement.findElement(By.css('vl-info-tile'));

    let text = await infoTile.getText();
    assert.isTrue(text.includes('Info-tile title (klikken op deze titel toggled info-tile niet!)'), 'Initieel moet de info-tile titel getoond worden');
    assert.isTrue(text.includes('Info-tile subtitle'), 'Initieel moet de info-tile subtitel getoond worden');
    infoTile.click();
    text = await infoTile.getText();
    assert.isTrue(text.includes('Info-tile content'), 'Na het openen van de info-tile moet de content getoond worden');
  });
});
