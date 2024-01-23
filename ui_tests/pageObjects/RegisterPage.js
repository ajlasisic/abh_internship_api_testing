import { $ } from "@wdio/globals";
import Page from "./Page.js";

class RegisterPage extends Page {
  get inputFirstName() {
    return $("#firstNameInput");
  }
  get inputLastName() {
    return $("#lastNameInput");
  }
  get inputEmail() {
    return $("#emailInput");
  }
  get inputPassword() {
    return $("#passwordInput");
  }
  get buttonRegister() {
    return $(".flex.flex-col.gap-10.py-8.px-12 > button");
  }

  async register(firstName, lastName, email, password) {
    await this.inputFirstName.setValue(firstName);
    await this.inputLastName.setValue(lastName);
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.buttonRegister.click();
  }
}

export default new RegisterPage();
