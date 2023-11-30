import { expect } from "@wdio/globals";
import axios from "axios";
import { API_BASE_URL } from "./globals.js";
import { getRandomNumber, verifyObjectPropertiesExist, verifyResponseStatus } from "./apiUtils.js";

describe("Categories API tests", () => {
  it("Check status code - Categories API", async () => {
    await axios.get(`${API_BASE_URL}/categories`).then(function (response) {
      verifyResponseStatus(response.status, 200);
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
      verifyResponseStatus(response.status, 200);
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
});

describe("Random Product API tests", () => {
  it("Check status code - Random product API", async () => {
    await axios.get(`${API_BASE_URL}/products/random`).then(function (response) {
        verifyResponseStatus(response.status, 200);
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
});
describe("Product API tests", () => {
  let idProduct = null;

  beforeAll(() => {
    idProduct = getRandomNumber();
  });
  it("Check status code - Product API", async () => {
    await axios.get(`${API_BASE_URL}/products/${idProduct}`).then(function (response) {
        verifyResponseStatus(response.status, 200);
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
    await axios
      .get(`${API_BASE_URL}/products/${idProduct}`)
      .then(function (response) {
        let data = response.data;
        expect(data.id).toEqual(idProduct);
      });
  });
});
