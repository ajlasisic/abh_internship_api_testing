import { generateRandomEmail, generateRandomPassword } from "../../utils.js";

export const validRegistrationData = {
  email: generateRandomEmail(),
  password: generateRandomPassword(),
  firstName: "User",
  lastName: "Test",
};
export const invalidRegistrationData = {
  email: "test_email",
  password: 123,
};