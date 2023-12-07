import HomePage from "../pageObjects/HomePage.js";
import ProductPage from "../pageObjects/ProductPage.js";
import LoginPage from "../pageObjects/LoginPage.js";

describe("Smoke test", () => {
  it("Login and search product", async () => {
    await LoginPage.login();
    await HomePage.verifyWelcomeMessage();
    await HomePage.searchProduct();
    await ProductPage.verifyProductNames();
  });
});
