import { expect } from "@wdio/globals";
import axios from "axios";
import { API_AUTH_URL, API_BASE_URL } from "../../globals.js";
import { generateRandomEmail, generateRandomNumber, generateRandomPassword, verifyObjectPropertiesExist, verifyToEqual } from "../../utils.js"

describe("Categories API tests", () => {
  it("Check status code - Categories API", async () => {
    await axios.get(`${API_BASE_URL}/categories`).then(function (response) {
      verifyToEqual(response.status, 200);
    });
  });
  it("Check object properties - Categories API", async () => {
    await axios.get(`${API_BASE_URL}/categories`).then(function (response) {
      let data = response.data;
      data.forEach((product) => {
        verifyObjectPropertiesExist(product, ["id", "name", "subCategories"]);
      });
    });
  });
});

describe("Products API tests", () => {
  it("Check status code - Products API", async () => {
    await axios.get(`${API_BASE_URL}/products`).then(function (response) {
      verifyToEqual(response.status, 200);
    });
  });
  it("Check object properties - Products API", async () => {
    await axios.get(`${API_BASE_URL}/products`).then(function (response) {
      let data = response.data.content;
      data.forEach((product) => {
        verifyObjectPropertiesExist(product, [
          "id",
          "name",
          "description",
          "startBid",
          "highestBid",
          "numberOfBids",
          "dateStart",
          "dateEnd",
          "dateCreated",
          "subCategory",
          "images",
          "user",
        ]);
      });
    });
  });
  it("End date bigger than start date - Products API", async () => {
    await axios.get(`${API_BASE_URL}/products`).then(function (response) {
      let data = response.data.content;
      data.forEach((product) => {
        let startDate = new Date(product.dateStart);
        let endDate = new Date(product.dateEnd);
        expect(endDate).toBeGreaterThan(startDate);
      });
    });
  });
it("Check status code - Random product API", async () => {
  await axios.get(`${API_BASE_URL}/products/random`).then(function (response) {
    verifyToEqual(response.status, 200);
  });
});
it("Check object properties - Random product API", async () => {
  await axios.get(`${API_BASE_URL}/products/random`).then(function (response) {
    let data = response.data;
    verifyObjectPropertiesExist(data, [
      "id",
      "name",
      "description",
      "startBid",
      "highestBid",
      "numberOfBids",
      "dateStart",
      "dateEnd",
      "dateCreated",
      "subCategory",
      "images",
      "user",
    ]);
  });
});
let idProduct = null;

beforeAll(() => {
  idProduct = generateRandomNumber();
});
it("Check status code - Product API", async () => {
  await axios.get(`${API_BASE_URL}/products/${idProduct}`).then(function (response) {
    verifyToEqual(response.status, 200);
    });
});
it("Check object properties - Product API", async () => {
  await axios.get(`${API_BASE_URL}/products/${idProduct}`).then(function (response) {
      let data = response.data;
      verifyObjectPropertiesExist(data, [
        "id",
        "name",
        "description",
        "startBid",
        "highestBid",
        "numberOfBids",
        "dateStart",
        "dateEnd",
        "dateCreated",
        "subCategory",
        "images",
        "user",
      ]);
    });
});
it("Product with valid id is displayed - Product API", async () => {
  await axios.get(`${API_BASE_URL}/products/${idProduct}`).then(function (response) {
      let data = response.data;
      verifyToEqual(data.id, idProduct);
    });
});
});
describe("Registration and Login API tests", () => {
  let test_email = generateRandomEmail()
  let test_password = generateRandomPassword()
  let id = null
  it("Check status code - Registration", async () => {
    await axios.post(`${API_AUTH_URL}/register`, {
      email: test_email,
      password: test_password,
      firstName: "Ajla",
      lastName: "Test"
    })
    .then(function (response) {
      let data = response.data;
      id = data.user.id
      verifyToEqual(response.status, 200);
      verifyObjectPropertiesExist(data, ["user", "token"]);
    })
  });
  it("Check status code - Login", async () => {
    let id_login = null
    await axios.post(`${API_AUTH_URL}/login`, {
      email: test_email,
      password: test_password
    })
    .then(function (response) {
      let data = response.data;
      id_login = data.user.id
      verifyToEqual(response.status, 200);
      verifyObjectPropertiesExist(data, ["user", "token"]);
      verifyToEqual(id_login, id)
      });
    });
  });

