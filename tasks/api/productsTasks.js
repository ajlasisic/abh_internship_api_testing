import { expect } from "@wdio/globals";
import axios from "axios";
import { API_BASE_URL } from "../../globals.js";
import { verifyObjectPropertiesExist, verifyToEqual } from "../../utils.js";

export async function checkStatusCodeProductsAPI(statusCode=200) {
  let response = await axios.get(`${API_BASE_URL}/products`);
  verifyToEqual(response.status, statusCode);
}

export async function checkObjectPropertiesProductsAPI() {
  let response = await axios.get(`${API_BASE_URL}/products`);
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
}

export async function endDateGreaterThanStartDate() {
  let response = await axios.get(`${API_BASE_URL}/products`);
  let data = response.data.content;

  data.forEach((product) => {
    let startDate = new Date(product.dateStart);
    let endDate = new Date(product.dateEnd);
    expect(endDate).toBeGreaterThan(startDate);
  });
}

export async function checkStatusCodeRandomProductAPI(statusCode=200) {
  let response = await axios.get(`${API_BASE_URL}/products/random`);
  verifyToEqual(response.status, statusCode);
}

export async function checkObjectPropertiesRandomProductAPI() {
  let response = await axios.get(`${API_BASE_URL}/products/random`);
  verifyObjectPropertiesExist(response.data, [
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
}

export async function checkStatusCodeProductAPI(idProduct, statusCode=200) {
  let response = await axios.get(`${API_BASE_URL}/products/${idProduct}`);
  verifyToEqual(response.status, statusCode);
}

export async function checkObjectPropertiesProductAPI(idProduct) {
  let response = await axios.get(`${API_BASE_URL}/products/${idProduct}`);
  verifyObjectPropertiesExist(response.data, [
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
}

export async function verifyProductWithValidId(idProduct) {
  let response = await axios.get(`${API_BASE_URL}/products/${idProduct}`);
  let data = response.data;
  verifyToEqual(data.id, idProduct);
}
