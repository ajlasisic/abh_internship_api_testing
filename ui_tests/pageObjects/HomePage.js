import { $ } from "@wdio/globals";
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
    return $(".text-white");
  }

  async searchProduct(term) {
    await this.inputSearch.addValue(term);
    await this.searchIcon.click();
  }
  async verifyWelcomeMessage(name) {
    await this.waitForText(this.welcomeMessage, "Hi, " + name);
    await expect(await this.welcomeMessage.getText()).toEqual("Hi, " + name);
  }
}
export default new HomePage();
