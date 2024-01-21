import { verifyToEqual } from "../../utils.js";
import { validRegistrationData } from "../data/register.js";
import { loginAndCreateHigherBid } from "../../states/api/apiStates.js";
import * as AuthAPI from "../../tasks/api/authTasks.js";
import * as BidsAPI from "../../tasks/api/bidsTasks.js";
import * as ProductsAPI from "../../tasks/api/productsTasks.js";

describe("API smoke test", () => {
  let test_email = validRegistrationData.email;
  let test_password = validRegistrationData.password;
  it("Smoke test", async () => {
    await AuthAPI.registerUser({
      email: test_email,
      password: test_password,
      firstName: validRegistrationData.firstName,
      lastName: validRegistrationData.lastName,
    });
    let { new_bid, token, idProduct, id_login } = await loginAndCreateHigherBid(
      test_email,
      test_password
    );
    let response = await BidsAPI.placeBid({
      bid: new_bid,
      productId: idProduct,
      token
    })
    let data = response.data;
    verifyToEqual(data.bid, new_bid);
    verifyToEqual(id_login, data.bidder.id);
    response = await ProductsAPI.checkStatusCodeProductAPI(idProduct)
    data = response.data;
    verifyToEqual(data.highestBid, new_bid);
  });
});
