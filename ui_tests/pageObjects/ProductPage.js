import { $, $$ } from "@wdio/globals";
import { searchTerms } from "../data/search.js";
import Page from "./Page.js";

class ProductPage extends Page {
  get productNames() {
    return $$(".cursor-pointer > h3");
  }
  get navigationPath() {
    return $(".flex .text-base");
  }

  async getProductNames() {
    let names = this.productNames.map((element) => element.getText());
    return names;
  }

  async verifyProductNames() {
    await this.waitForDisplayed(this.navigationPath);
    let test = [];
    test = await this.getProductNames();
    test.forEach((text) => {
      expect(text).toContain(searchTerms.term);
    });
  }
}
export default new ProductPage();
