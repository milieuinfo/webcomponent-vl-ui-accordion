const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlAccordionMetInnerVlInfoTileEnAccordionAlsEersteGeimporteerdPage = require('./pages/vl-accordion-met-inner-vl-info-tile-en-accordion-als-eerste-geimporteerd.page');
const {By} = require('vl-ui-core').Test.Setup;

describe('vl-accordion met inner vl-info-tile waarbij de accordion als eerste wordt geïmporteerd', async () => {
  let driver;
  let vlAccordionMetInnerVlInfoTileEnAccordionAlsEersteGeimporteerdPage;

  beforeEach(() => {
    driver = getDriver();
    vlAccordionMetInnerVlInfoTileEnAccordionAlsEersteGeimporteerdPage = new VlAccordionMetInnerVlInfoTileEnAccordionAlsEersteGeimporteerdPage(driver);
    return vlAccordionMetInnerVlInfoTileEnAccordionAlsEersteGeimporteerdPage.load();
  });

  it('als gebruiker kan ik een accordion met info-tile openen en sluiten', async () => {
    const accordion = await vlAccordionMetInnerVlInfoTileEnAccordionAlsEersteGeimporteerdPage.getAccordionMetInnerInfoTile();
    await assert.eventually.isTrue(accordion.isClosed(), 'Initieel moet de accordion gesloten zijn');
    await assert.eventually.isFalse(accordion.isContentDisplayed(), 'Initieel wordt de accordion zijn inhoud niet getoond');

    const titleSlotElements = await accordion.getTitleSlotElements();
    const titel = titleSlotElements[0];
    await titel.click();
    await assert.eventually.isTrue(accordion.isOpen(), 'Klikken op de titel moet de accordion openen');
    await assert.eventually.isTrue(accordion.isContentDisplayed(), 'Klikken op de titel moet de accordion zijn inhoud tonen');
  });

  it('als gebruiker kan ik een info-tile in een accordion openen en sluiten', async () => {
    const accordion = await vlAccordionMetInnerVlInfoTileEnAccordionAlsEersteGeimporteerdPage.getAccordionMetInnerInfoTile();
    await assert.eventually.isTrue(accordion.isClosed(), 'Initieel moet de accordion gesloten zijn');
    await assert.eventually.isFalse(accordion.isContentDisplayed(), 'Initieel wordt de accordion zijn inhoud niet getoond');

    await accordion.open();
    await assert.eventually.isTrue(accordion.isOpen(), 'Klikken op de titel moet de accordion openen');
    await assert.eventually.isTrue(accordion.isContentDisplayed(), 'Klikken op de titel moet de accordion zijn inhoud tonen');

    const contentSlotElements = await accordion.contentSlotElements();
    const contentSlotElement = contentSlotElements[0];
    const infoTile = await contentSlotElement.findElement(By.css('vl-info-tile'));

    let text = await infoTile.getText();
    assert.isTrue(text.includes('Info-tile title (klikken op deze titel toggled info-tile niet!)'), 'Initieel moet de info-tile titel getoond worden');
    assert.isTrue(text.includes('Info-tile subtitle'), 'Initieel moet de info-tile subtitel getoond worden');
    await infoTile.click();
    text = await infoTile.getText();
    assert.isTrue(text.includes('Info-tile content'), 'Na het openen van de info-tile moet de inhoud getoond worden');
  });
});
