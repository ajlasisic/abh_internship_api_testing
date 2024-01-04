import { $ } from "@wdio/globals";
import { verifyToEqual } from "../../utils.js";
import Page from "./Page.js";

class HomePage extends Page {
  get inputSearch() {
    return $("form > input");
  }
  get searchIcon() {
    return $("form > button");
  }
  get loginLink() {
    return $("div > a:nth-child(1)");
  }
  get registerLink() {
    return $("div > a:nth-child(3)");
  }
  get welcomeMessage() {
    return $(".text-white.flex.gap-10 > div");
  }
  get logoutButton() {
    return $(".text-white.flex.gap-10 > button");
  }
  get jewelryLink() {
    return $(".bg-white.shadow-lightgrey > ul > li:nth-child(2)");
  }
  get shopLink() {
    return $(".flex.gap-5.uppercase > li:nth-child(2) > a");
  }
  get bidButtonRandomProduct() {
    return $("div > button");
  }
  get fbIcon() {
    return $("nav > .flex.items-center.gap-4 > a:nth-child(1)");
  }
  get igIcon() {
    return $("nav > .flex.items-center.gap-4 > a:nth-child(2)");
  }
  get xIcon() {
    return $("nav > .flex.items-center.gap-4 > a:nth-child(3)");
  }
  get aboutUsLink() {
    return $("footer > section:nth-child(1) > nav > ul > li:nth-child(1) > a");
  }
  get termsLink() {
    return $("footer > section:nth-child(1) > nav > ul > li:nth-child(2) > a");
  }
  get policyLink() {
    return $("footer > section:nth-child(1) > nav > ul > li:nth-child(3) > a");
  }
  async searchProduct(term) {
    await this.inputSearch.addValue(term);
    await this.searchIcon.click();
  }
  async verifyWelcomeMessage(name) {
    await this.waitForText(this.welcomeMessage, "Hi, " + name);
    await expect(await this.welcomeMessage.getText()).toEqual("Hi, " + name);
  }
  async verifyLogout() {
    await expect(await this.registerLink).toBeDisplayed();
  }
  async verifyLinkUrl(selector, url) {
    await this.clickElement(selector);
    await verifyToEqual(await browser.getUrl(), url);
    await browser.back();
  }
}
export default new HomePage();
