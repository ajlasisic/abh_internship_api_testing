import { expect } from "@wdio/globals";
import axios from "axios";
import { API_AUTH_URL, API_BASE_URL } from "../../globals.js";
import { generateRandomId, verifyObjectPropertiesExist, verifyToEqual } from "../../utils.js";
import { invalidRegistrationData, validRegistrationData } from "../data/register.js";
import { validLoginUser } from "../data/login.js"

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
  idProduct = generateRandomId();
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
describe("Bids API", () => {
  let interceptor;
  beforeEach(()=> {
    interceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response && error.response.status === 403) {
          return Promise.resolve({ status: 403 });
        }
        else if (error.response && error.response.status === 400) {
          return Promise.resolve({
            status: 400,
            data: "Invalid bid."
          });
        } 
        return Promise.reject(error);
      });
  });
  afterEach(() => {
    axios.interceptors.response.eject(interceptor);
  });

  let idProduct=242
  it("Place bid without login - Bids API", async () => {
    let new_bid = -1
      await axios.post(`${API_BASE_URL}/bids`, {
        bid: new_bid,
        productId: idProduct
      }).then(function (response) {
          verifyToEqual(response.status, 403);
      });
  })
  it("Place bid less than highest bid - Bids API", async () => {
      let token = null
      await axios.post(`${API_AUTH_URL}/login`, {
        email: validLoginUser.email,
        password: validLoginUser.password
      })
      .then(function (response) {
        let data = response.data;
        token = data.token
        verifyToEqual(response.status, 200);
        });
        let new_bid = -1
        await axios.post(`${API_BASE_URL}/bids`, {
          bid: new_bid,
          productId: idProduct
        }, {headers: {
          'Authorization': `Bearer ${token}`
        }
        }).then(function (response) {
            let data = response.data
            verifyToEqual(response.status, 400);
            verifyToEqual(data, "Invalid bid.")
        });
    })
  })
describe("Registration and Login API", () => {
  let interceptor;
  beforeEach(()=> {
    interceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response && error.response.status === 401) {
          return Promise.resolve({ status: 401, data: "Could not log in"});
        }
        else if (error.response && error.response.status === 400) {
          return Promise.resolve({
            status: 400,
            data: "Could not create new user account"
          });
        } 
        return Promise.reject(error);
      });
  });
  afterEach(() => {
    axios.interceptors.response.eject(interceptor);
  });

  it("Registration with invalid email", async () => {
    let response;
    response = await axios.post(`${API_AUTH_URL}/register`, {
      email: invalidRegistrationData.email,
      password: validRegistrationData.password,
      firstName: validRegistrationData.firstName,
      lastName: validRegistrationData.lastName,
    });
    let data = response.data;
    verifyToEqual(response.status, 400);
    verifyToEqual(data, "Could not create new user account");
  });
  it("Registration without firstName and lastName body properties", async () => {
    let response;
    response = await axios.post(`${API_AUTH_URL}/register`, {
      email: validRegistrationData.email,
      password: validRegistrationData.password,
    });
    let data = response.data;
    verifyToEqual(response.status, 400);
    verifyToEqual(data, "Could not create new user account");
  });
  it("Login with invalid email", async () => {
    let response;
    response = await axios.post(`${API_AUTH_URL}/login`, {
      email: invalidRegistrationData.email,
      password: validRegistrationData.password,
    });
    let data = response.data;
    verifyToEqual(response.status, 401);
    verifyToEqual(data, "Could not log in");
  });
  it("Login with invalid password", async () => {
    let response;
    response = await axios.post(`${API_AUTH_URL}/login`, {
      email: validRegistrationData.email,
      password: invalidRegistrationData.password,
    });
    let data = response.data;
    verifyToEqual(response.status, 401);
    verifyToEqual(data, "Could not log in");
  });
});
