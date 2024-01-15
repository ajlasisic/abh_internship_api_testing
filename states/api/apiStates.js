import axios from "axios";
import { API_AUTH_URL, API_BASE_URL } from "../../globals.js";
import { validProductId } from "../../api_tests/data/bids.js";

export async function loginAndCreateHigherBid(email, password) {
  let token = null;
  let highestBid = null;
  let id_login = null;
  let idProduct = validProductId.productId
  let response = await axios.post(`${API_AUTH_URL}/login`, {
    email: email,
    password: password,
  });
  let data = response.data;
  id_login = data.user.id
  token = data.token;
  response = await axios.get(`${API_BASE_URL}/products/${idProduct}`);
  data = response.data
  highestBid = data.highestBid;
  let new_bid = highestBid + 1;
  return {new_bid, token, idProduct, id_login};
}
