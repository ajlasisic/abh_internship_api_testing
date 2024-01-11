import { expect } from "@wdio/globals";
import axios from "axios";
import { API_BASE_URL } from "../../globals.js";
import { verifyObjectPropertiesExist, verifyToEqual } from "../../utils.js";

export async function checkStatusCodeProductsAPI() {
  await axios.get(`${API_BASE_URL}/products`).then(function (response) {
    verifyToEqual(response.status, 200);
  });
}

export async function checkObjectPropertiesProductsAPI() {
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
}

export async function endDateGreaterThanStartDate() {
  await axios.get(`${API_BASE_URL}/products`).then(function (response) {
    let data = response.data.content;
    data.forEach((product) => {
      let startDate = new Date(product.dateStart);
      let endDate = new Date(product.dateEnd);
      expect(endDate).toBeGreaterThan(startDate);
    });
  });
}

export async function checkStatusCodeRandomProductAPI() {
  await axios.get(`${API_BASE_URL}/products/random`).then(function (response) {
    verifyToEqual(response.status, 200);
  });
}

export async function checkObjectPropertiesRandomProductAPI() {
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
}

export async function checkStatusCodeProductAPI(idProduct) {
  await axios.get(`${API_BASE_URL}/products/${idProduct}`).then(function (response) {
      verifyToEqual(response.status, 200);
    });
}

export async function checkObjectPropertiesProductAPI(idProduct) {
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
}

export async function verifyProductWithValidId(idProduct) {
  await axios.get(`${API_BASE_URL}/products/${idProduct}`).then(function (response) {
      let data = response.data;
      verifyToEqual(data.id, idProduct);
    });
}
