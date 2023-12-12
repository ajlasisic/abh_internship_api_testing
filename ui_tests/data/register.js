import { generateRandomEmail, generateRandomPassword } from "../../utils.js";

export const registerUser = {
  email: generateRandomEmail(),
  password: generateRandomPassword(),
  emptyFirstName: " ", 
  firstName: "RegisterUser",
  lastName: "Test",
  errorMsgFirstName: "Please enter Your first name",
};

export const existingUser = {
  email: "ajla.sisic@stu.ibu.edu.ba",
  password: "Test123",
  firstName: "Test",
  lastName: "Testing",
  errorMsg: "Email already exists",
};
