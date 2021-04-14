const VlAccordion = require('../components/vl-accordion');
const {Page, Config} = require('vl-ui-core').Test;

class VlAccordionMetWerkendeInfoTilePage extends Page {
  async _getAccordion(selector) {
    return new VlAccordion(this.driver, selector);
  }

  async getAccordionMetWerkendeInfoTile() {
    return this._getAccordion('#accordion-met-werkende-info-tile');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-accordion-met-werkende-info-tile.html');
  }
}

module.exports = VlAccordionMetWerkendeInfoTilePage;
