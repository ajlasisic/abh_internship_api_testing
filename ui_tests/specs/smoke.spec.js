import HomePage from "../pageObjects/HomePage.js";
import ProductPage from "../pageObjects/ProductPage.js";
import LoginPage from "../pageObjects/LoginPage.js";
import { loginUser } from "../data/login.js";
import { searchTerms } from "../data/search.js";

describe("Smoke test", () => {
  it("Login and search product", async () => {
    await LoginPage.login(loginUser.email, loginUser.password);
    await HomePage.verifyWelcomeMessage(loginUser.name);
    await HomePage.searchProduct(searchTerms.term);
    await ProductPage.verifyProductNames(searchTerms.term);
  });
});
