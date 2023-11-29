import { expect } from "@wdio/globals";
import axios from "axios";

describe("Categories API tests", () => {
  it("Check status code", async () => {
    await axios
      .get("http://localhost:8080/api/categories")
      .then(function (response) {
        expect(response.status).toEqual(200);
      });
  });
  it("Check object properties", async () => {
    await axios
      .get("http://localhost:8080/api/categories")
      .then(function (response) {
        let data = response.data;
        data.forEach((category) => {
          expect(category.id).toExist();
          expect(category.name).toExist();
          expect(category.subCategories).toExist();
        });
      });
  });
});
describe("Products API tests", () => {
  it("Check status code", async () => {
    await axios
      .get("http://localhost:8080/api/products")
      .then(function (response) {
        expect(response.status).toEqual(200);
      });
  });
  it("Check object properties", async () => {
    await axios
      .get("http://localhost:8080/api/products")
      .then(function (response) {
        let data = response.data.content;
        data.forEach((product) => {
          expect(product.id).toExist();
          expect(product.name).toExist();
          expect(product.description).toExist();
          expect(product.startBid).toExist();
          expect(product.highestBid).toExist();
          expect(product.numberOfBids).toExist();
          expect(product.dateStart).toExist();
          expect(product.dateEnd).toExist();
          expect(product.dateCreated).toExist();
          expect(product.subCategory).toExist();
          expect(product.images).toExist();
          expect(product.user).toExist();
        });
      });
  });
  it("End date bigger than start date", async () => {
    await axios
      .get("http://localhost:8080/api/products")
      .then(function (response) {
        let data = response.data.content;
        data.forEach((product) => {
          let startDate = new Date(product.dateStart);
          let endDate = new Date(product.dateEnd);
          expect(endDate).toBeGreaterThan(startDate);
        });
      });
  });
});
describe("Random product API tests", () => {
  it("Check status code", async () => {
    await axios
      .get("http://localhost:8080/api/products/random")
      .then(function (response) {
        expect(response.status).toEqual(200);
      });
  });
  it("Check object properties", async () => {
    await axios
      .get("http://localhost:8080/api/products/random")
      .then(function (response) {
        let data = response.data;
        expect(data.id).toExist();
        expect(data.name).toExist();
        expect(data.description).toExist();
        expect(data.startBid).toExist();
        expect(data.highestBid).toExist();
        expect(data.numberOfBids).toExist();
        expect(data.dateStart).toExist();
        expect(data.dateEnd).toExist();
        expect(data.dateCreated).toExist();
        expect(data.subCategory).toExist();
        expect(data.images).toExist();
        expect(data.user).toExist();
      });
  });
});
describe("Product API tests", () => {
  let idProduct = null;

  beforeAll(() => {
    const getRandomNumber = () => {
      let randomDecimal = Math.random();
      let randomNumberInRange = Math.floor(randomDecimal * (42 - 23 + 1)) + 23;
      return randomNumberInRange;
    };
    let randomNum = getRandomNumber();
    idProduct = randomNum;
  });
  it("Check status code", async () => {
    await axios
      .get(`http://localhost:8080/api/products/${idProduct}`)
      .then(function (response) {
        expect(response.status).toEqual(200);
      });
  });
  it("Check object properties", async () => {
    await axios
      .get(`http://localhost:8080/api/products/${idProduct}`)
      .then(function (response) {
        let data = response.data;
        expect(data.id).toExist();
        expect(data.name).toExist();
        expect(data.description).toExist();
        expect(data.startBid).toExist();
        expect(data.highestBid).toExist();
        expect(data.numberOfBids).toExist();
        expect(data.dateStart).toExist();
        expect(data.dateEnd).toExist();
        expect(data.dateCreated).toExist();
        expect(data.subCategory).toExist();
        expect(data.images).toExist();
        expect(data.user).toExist();
      });
  });
  it("Product with valid id is displayed", async () => {
    await axios
      .get(`http://localhost:8080/api/products/${idProduct}`)
      .then(function (response) {
        let data = response.data;
        expect(data.id).toEqual(idProduct);
      });
  });
});
