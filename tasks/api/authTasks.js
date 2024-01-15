import axios from "axios";
import { API_AUTH_URL } from "../../globals.js";
import { verifyToEqual } from "../../utils.js";

export async function registerUser(email, password, firstName, lastName, statusCode=200, responseData) {
  let response = await axios.post(`${API_AUTH_URL}/register`, {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
  verifyToEqual(response.status, statusCode); 
  verifyToEqual(response.data, responseData);
}

export async function loginUser(email, password, statusCode = 200, responseData) {
  let response = await axios.post(`${API_AUTH_URL}/login`, {
    email: email,
    password: password,
  });
  verifyToEqual(response.status, statusCode);
  verifyToEqual(response.data, responseData);
}

export async function validateToken(token, statusCode) {
  let response = await axios.get(`${API_AUTH_URL}/validate`, {
    params: {
      token: token,
    },
  });
  verifyToEqual(response.status, statusCode);
}


