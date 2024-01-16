import HomePage from "../pageObjects/HomePage.js";
import ProductPage from "../pageObjects/ProductPage.js";
import { loginUser } from "../data/login.js";
import { searchTerms } from "../data/search.js";
import { registerUser } from "../data/register.js";
import * as AuthTasks from "../../tasks/ui/authTasks.js"

describe("Smoke test", () => {
  beforeEach(function () {
    browser.url('/');
  });
  it("Register and logout", async () => {
    await AuthTasks.registerUser(
      registerUser.firstName,
      registerUser.lastName,
      registerUser.email,
      registerUser.password
    );
    await HomePage.verifyWelcomeMessage(registerUser.firstName);
    await HomePage.clickElement(HomePage.logoutButton);
    await HomePage.verifyLogout();
  });
  it("Login, search product and place bid", async () => {
    await AuthTasks.loginUser(loginUser.email, loginUser.password)
    await HomePage.verifyWelcomeMessage(loginUser.name);
    await HomePage.searchProduct(searchTerms.term);
    await ProductPage.verifyProductNames(searchTerms.term);
    await ProductPage.clickElement(ProductPage.productName);
    await ProductPage.placeBid();
  });
});
