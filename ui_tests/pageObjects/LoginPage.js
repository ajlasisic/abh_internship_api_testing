import { $ } from "@wdio/globals";
import { loginUser } from "../data/login.js";
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

  async login() {
    await HomePage.loginLink.click();
    await this.waitForDisplayed(this.emailInput);
    await this.emailInput.setValue(loginUser.email);
    await this.passwordInput.setValue(loginUser.password);
    await this.loginButton.click();
  }
}

export default new LoginPage();
