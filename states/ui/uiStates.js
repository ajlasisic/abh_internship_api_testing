import HomePage from "../../ui_tests/pageObjects/HomePage.js";
import ProductPage from "../../ui_tests/pageObjects/ProductPage.js";

export async function searchAndNavigateToProduct(searchTerm, product) {
    await HomePage.searchProduct(searchTerm);
    await ProductPage.clickElement(product);
}
    