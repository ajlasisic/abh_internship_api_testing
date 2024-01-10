import { generateRandomEmail, generateRandomPassword } from "../../utils.js";

export const registerValidData = {
  email: generateRandomEmail(),
  password: generateRandomPassword(),
  firstName: "User",
  lastName: "Test",
};