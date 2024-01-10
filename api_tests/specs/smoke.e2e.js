import axios from "axios";
import { API_AUTH_URL, API_BASE_URL } from "../../globals.js";
import { verifyObjectPropertiesExist, verifyToEqual } from "../../utils.js"
import { registerValidData } from "../data/register.js";

describe("API smoke test", () => {
    let test_email = registerValidData.email
    let test_password = registerValidData.password
    let id = null
    it("Register new user", async () => {
      await axios.post(`${API_AUTH_URL}/register`, {
        email: test_email,
        password: test_password,
        firstName: registerValidData.firstName,
        lastName: registerValidData.lastName
      })
      .then(function (response) {
        let data = response.data;
        id = data.user.id
        verifyToEqual(response.status, 200);
        verifyObjectPropertiesExist(data, ["user", "token"]);
      })
    });
    it("Login with newly created user and place bid", async () => {
      let id_login = null
      let idProduct=242
      let token = null
      await axios.post(`${API_AUTH_URL}/login`, {
        email: test_email,
        password: test_password
      })
      .then(function (response) {
        let data = response.data;
        id_login = data.user.id
        token = data.token
        verifyToEqual(response.status, 200);
        verifyObjectPropertiesExist(data, ["user", "token"]);
        verifyToEqual(id_login, id)
        });
        let highestBid = null
        await axios.get(`${API_BASE_URL}/products/${idProduct}`).then(function (response) {
          verifyToEqual(response.status, 200);
          highestBid = response.data.highestBid
        })
        let new_bid = highestBid+1
        await axios.post(`${API_BASE_URL}/bids`, {
          bid: new_bid,
          productId: idProduct
        }, {headers: {
          'Authorization': `Bearer ${token}`
        }
        })
          .then(function (response) {
            let data = response.data;
            verifyToEqual(response.status, 200);
            verifyToEqual(data.bid, new_bid)
            verifyToEqual(id_login, data.bidder.id)
          });
          await axios.get(`${API_BASE_URL}/products/${idProduct}`).then(function (response) {
            let data = response.data;
            verifyToEqual(response.status, 200);
            verifyToEqual(data.highestBid, new_bid)
          })
      });
    });