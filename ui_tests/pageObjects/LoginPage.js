import { $ } from "@wdio/globals";
import Page from "./Page.js";
import HomePage from "./HomePage.js";

class LoginPage extends Page {
  get emailInput() {
    return $("#emailInput");
  }
  get passwordInput() {
    return $("#passwordInput");
  }
  get loginButton() {
    return $(".flex.flex-col.gap-10.py-8.px-12 > button");
  }

  async login(email, password) {
    await HomePage.loginLink.click();
    await this.waitForDisplayed(this.emailInput);
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
}

export default new LoginPage();
