import axios from "axios";
import { API_BASE_URL } from "../../globals.js";
import { verifyObjectPropertiesExist, verifyToEqual } from "../../utils.js";

export function checkStatusCodeCategoriesAPI() {
  axios.get(`${API_BASE_URL}/categories`).then(function (response) {
    verifyToEqual(response.status, 200);
  });
}

export function checkObjectPropertiesCategoriesAPI() {
  axios.get(`${API_BASE_URL}/categories`).then(function (response) {
    let data = response.data;
    data.forEach((product) => {
      verifyObjectPropertiesExist(product, ["id", "name", "subCategories"]);
    });
  });
}
