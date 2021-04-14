const VlAccordion = require('../components/vl-accordion');
const {Page, Config} = require('vl-ui-core').Test;

class VlAccordionMetNietWerkendeInfoTilePage extends Page {
  async _getAccordion(selector) {
    return new VlAccordion(this.driver, selector);
  }

  async getAccordionMetWerkendeInfoTile() {
    return this._getAccordion('#accordion-met-niet-werkende-info-tile');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-accordion-met-niet-werkende-info-tile.html');
  }
}

module.exports = VlAccordionMetNietWerkendeInfoTilePage;
