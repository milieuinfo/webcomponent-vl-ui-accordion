const VlAccordion = require('../components/vl-accordion');
const {Page, Config} = require('vl-ui-core').Test;

class VlAccordionMetInnerVlInfoTileEnInfoTileAlsEersteGeimporteerdPage extends Page {
  async _getAccordion(selector) {
    return new VlAccordion(this.driver, selector);
  }

  async getAccordionMetInnerInfoTile() {
    return this._getAccordion('#vl-accordion-met-inner-vl-info-tile-en-info-tile-als-eerste-geimporteerd');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-accordion-met-inner-vl-info-tile-en-info-tile-als-eerste-geimporteerd.html');
  }
}

module.exports = VlAccordionMetInnerVlInfoTileEnInfoTileAlsEersteGeimporteerdPage;
