import axios from "axios";
import { API_BASE_URL } from "../../globals.js";
import { verifyObjectPropertiesExist, verifyToEqual } from "../../utils.js";

export async function checkStatusCodeCategoriesAPI(statusCode=200) {
  let response = await axios.get(`${API_BASE_URL}/categories`);
  verifyToEqual(response.status, statusCode);
}

export async function checkObjectPropertiesCategoriesAPI() {
  let response = await axios.get(`${API_BASE_URL}/categories`);
  let data = response.data;

  data.forEach((category) => {
    verifyObjectPropertiesExist(category, ["id", "name", "subCategories"]);
  });
}

