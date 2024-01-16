import HomePage from "../../ui_tests/pageObjects/HomePage.js"
import LoginPage from "../../ui_tests/pageObjects/LoginPage.js"
import RegisterPage from "../../ui_tests/pageObjects/RegisterPage.js";

export const loginUser = async (email, password) => {
    await HomePage.loginLink.click();
    await LoginPage.login(email, password);
  };
export const registerUser = async (firstName, lastName, email, password) => {
    await HomePage.registerLink.click();
    await RegisterPage.register(firstName, lastName, email,password)
  };