import { $ } from "@wdio/globals";
import { searchTerms } from "../data/search.js";
import { loginUser } from "../data/login.js";
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

  async searchProduct() {
    await this.inputSearch.addValue(searchTerms.term);
    await this.searchIcon.click();
  }
  async verifyWelcomeMessage() {
    await this.waitForText(this.welcomeMessage, "Hi, " + loginUser.name);
    await expect(await this.welcomeMessage.getText()).toEqual(
      "Hi, " + loginUser.name
    );
  }
}
export default new HomePage();
