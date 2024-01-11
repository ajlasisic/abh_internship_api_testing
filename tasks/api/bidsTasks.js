import axios from "axios";
import { API_BASE_URL, API_AUTH_URL } from "../../globals.js";
import { verifyToEqual } from "../../utils.js";
import { validLoginUser } from "../../api_tests/data/login.js";

export async function placeBidWithoutLogin() {
  let new_bid = -1;
  let idProduct=242
  await axios.post(`${API_BASE_URL}/bids`, {
    bid: new_bid,
    productId: idProduct,
  }).then(function (response) {
    verifyToEqual(response.status, 403);
  });
}

export async function placeBidLessThanHighestBid() {
  let token = null;
  await axios.post(`${API_AUTH_URL}/login`, {
    email: validLoginUser.email,
    password: validLoginUser.password,
  }).then(function (response) {
    let data = response.data;
    token = data.token;
  });

  let new_bid = -1;
  let idProduct=242
  await axios.post(`${API_BASE_URL}/bids`, {
    bid: new_bid,
    productId: idProduct,
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(function (response) {
    let data = response.data;
    verifyToEqual(response.status, 400);
    verifyToEqual(data, "Invalid bid.");
  });
}


