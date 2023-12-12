import RegisterPage from "../pageObjects/RegisterPage.js";
import { invalidEmail, invalidPassword, loginUser } from "../data/login.js";
import { existingUser, registerUser } from "../data/register.js"
import LoginPage from "../pageObjects/LoginPage.js";

describe("Regression test", () => {
  it("Login with incorrect email", async () => {
    await LoginPage.login(invalidEmail.email, loginUser.password);
    await LoginPage.verifyErrorMsgText(LoginPage.errorMessage, invalidEmail.errorEmail)
  });
  it("Login with incorrect password", async () => {
    await LoginPage.login(loginUser.email, invalidPassword.password);
    await LoginPage.verifyErrorMsgText(LoginPage.errorMessage, invalidPassword.errorPassword)
  });
  it("Register with existing email", async () => {
    await RegisterPage.register(existingUser.firstName, existingUser.lastName, existingUser.email, existingUser.password)
    await RegisterPage.verifyErrorMsgText(RegisterPage.errorMessage, existingUser.errorMsg)
  });
  it("Register with weak password", async () => {
    await RegisterPage.register(registerUser.firstName, registerUser.lastName, registerUser.email, invalidPassword.password)
    await RegisterPage.verifyErrorMsgText(RegisterPage.errorMessage, invalidPassword.errorPassword)
  });
});