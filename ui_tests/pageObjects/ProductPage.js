import { $, $$ } from "@wdio/globals";
import Page from "./Page.js";
import { convertPriceToNumber, generateHigherBid, verifyToEqual } from "../../utils.js";

class ProductPage extends Page {
  
  get productNames() {
    return $$(".cursor-pointer > h3");
  }
  get productName() {
    return $(".cursor-pointer > h3");
  }
  get navigationPath() {
    return $(".flex .text-base");
  }
  get noProductsMsg() {
    return $(".flex.flex-col.gap-8 > div:nth-child(1)")
  }
  get emptyCategoryInfoMsg() {
    return $(".flex.flex-col.gap-8 > div:nth-child(2)")
  }
  get productPrices() {
    return $$("p > .text-purple")
  }
  get sortingDropdownMenu() {
    return $(".css-1xc3v61-indicatorContainer")
  }
  get placeBidButton() {
    return $(".flex.gap-4.h-min > button")
  }
  get highestBid() {
    return $(".p-12.h-full.pb-20 > div > section:nth-child(2) > div:nth-child(1) > span")
  }
  get enterBid() {
    return $(".flex.gap-4.h-min > input")
  }

  async getProductNames() {
    let names = this.productNames.map((element) => element.getText());
    return names;
  }
  async getPrices(){
    await this.waitForDisplayed(this.navigationPath);
    let prices = await this.productPrices.map((element) => element.getText());
    return prices;
  }
  async verifyProductNames(term) {
    await this.waitForDisplayed(this.navigationPath);
    let test = [];
    test = await this.getProductNames();
    test.forEach((text) => {
      expect(text).toContain(term);
    });
  }
  async verifyEmptyCategoryMsg(){
    await this.waitForDisplayed(this.navigationPath);
    expect(await this.noProductsMsg.getText()).toEqual('No matching products found...')
    expect(await this.emptyCategoryInfoMsg.getText()).toEqual('Check out some of our products in the categories list on the side or try searching for your favorite products.')
  }
  async getPriceArray() {
    let test = [];
    let new_test = []
    test = await this.getPrices();
    test.forEach((text) => {
      new_test.push(Number(text.replace('$', '')))
    });
    return new_test
  }
  async verifyBidButtonIsDisabled(){
    await expect(this.placeBidButton).toBeDisabled()
  }
  async placeBid() {
    let newBid = await generateHigherBid(this.highestBid)
    await this.enterBid.setValue(newBid)
    await this.clickElement(this.placeBidButton)
    await this.highestBid.waitUntil(async function () {
      const currentBidText = await this.getText();
      return currentBidText === '$' + newBid.toString() + '.00';
  }, { timeout: 10000 });
    let newHighestBid = await convertPriceToNumber(this.highestBid)
    await verifyToEqual(newHighestBid, newBid)
  }

}
export default new ProductPage();
