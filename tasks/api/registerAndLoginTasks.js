import axios from "axios";
import { API_AUTH_URL } from "../../globals.js";
import { verifyToEqual } from "../../utils.js";
import { invalidRegistrationData, validRegistrationData } from "../../api_tests/data/register.js";
import { invalidLoginUser } from "../../api_tests/data/login.js";

export async function registrationWithInvalidEmail() {
  let response = await axios.post(`${API_AUTH_URL}/register`, {
    email: invalidRegistrationData.email,
    password: validRegistrationData.password,
    firstName: validRegistrationData.firstName,
    lastName: validRegistrationData.lastName,
  });

  let data = response.data;
  verifyToEqual(response.status, 400);
  verifyToEqual(data, "Could not create new user account");
}
export async function registerWithoutFirstNameAndLastName() {
  let response = await axios.post(`${API_AUTH_URL}/register`, {
    email: validRegistrationData.email,
    password: validRegistrationData.password,
  });
  let data = response.data;
  verifyToEqual(response.status, 400);
  verifyToEqual(data, "Could not create new user account");
}

export async function loginWithInvalidEmail() {
  let response = await axios.post(`${API_AUTH_URL}/login`, {
    email: invalidRegistrationData.email,
    password: validRegistrationData.password,
  });
  let data = response.data;
  verifyToEqual(response.status, 401);
  verifyToEqual(data, "Could not log in");
}

export async function loginWithInvalidPassword() {
  let response = await axios.post(`${API_AUTH_URL}/login`, {
    email: validRegistrationData.email,
    password: invalidRegistrationData.password,
  });
  let data = response.data;
  verifyToEqual(response.status, 401);
  verifyToEqual(data, "Could not log in");
}

export async function validateIncorrectToken() {
  let response = await axios.get(`${API_AUTH_URL}/validate`, {
    params: {
      token: invalidLoginUser.token,
    },
  });
  verifyToEqual(response.status, 401);
}


