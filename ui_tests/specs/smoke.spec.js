import HomePage from "../pageObjects/HomePage.js";
import ProductPage from "../pageObjects/ProductPage.js";
import { searchTerms } from "../data/search.js";
import { registerUser } from "../data/register.js";
import * as AuthTasks from "../../tasks/ui/authTasks.js"
import { searchAndNavigateToProduct } from "../../states/ui/uiStates.js";

describe("Smoke test", () => {
  beforeEach(function () {
    browser.url('/');
  });
  let test_email = registerUser.email
  let test_password = registerUser.password
  it("Register and logout", async () => {
    await AuthTasks.registerUser(
      registerUser.firstName,
      registerUser.lastName,
      test_email,
      test_password
    );
    await HomePage.verifyWelcomeMessage(registerUser.firstName)
    await AuthTasks.logoutUser()
  });
  it("Login, search product and place bid", async () => {
    await AuthTasks.loginUser(test_email, test_password)
    await HomePage.verifyWelcomeMessage(registerUser.firstName);
    await searchAndNavigateToProduct(searchTerms.floral, ProductPage.productName);
    await ProductPage.placeBid();
  });
});
