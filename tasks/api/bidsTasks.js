import axios from "axios";
import { API_BASE_URL, API_AUTH_URL } from "../../globals.js";
import { verifyToEqual } from "../../utils.js";
import { validLoginUser } from "../../api_tests/data/login.js";
import { invalidBid, validProductId } from "../../api_tests/data/bids.js";

export async function placeBidWithoutLogin() {
  let response = await axios.post(`${API_BASE_URL}/bids`, {
    bid: invalidBid.bid,
    productId: validProductId.productId,
  });

  verifyToEqual(response.status, 403);
}

export async function placeBidLessThanHighestBid() {
  let token = null;

  let response = await axios.post(`${API_AUTH_URL}/login`, {
    email: validLoginUser.email,
    password: validLoginUser.password,
  });
  let data = response.data;
  token = data.token;

  response = await axios.post(`${API_BASE_URL}/bids`, {
      bid: invalidBid.bid,
      productId: validProductId.productId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  verifyToEqual(response.status, 400);
  verifyToEqual(response.data, "Invalid bid.");
}
