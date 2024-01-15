import axios from "axios";
import * as CategoriesAPI from "../../tasks/api/categoriesTasks.js";
import * as ProductsAPI from "../../tasks/api/productsTasks.js";
import * as BidsAPI from "../../tasks/api/bidsTasks.js";
import * as AuthAPI from "../../tasks/api/authTasks.js";
import { generateRandomId } from "../../utils.js";
import { invalidRegistrationData, validRegistrationData } from "../data/register.js";
import { invalidLoginData, validLoginData } from "../data/login.js";

describe("Categories API tests", () => {
  it("Check status code - Categories API", async () => {
    CategoriesAPI.checkStatusCodeCategoriesAPI();
  });

  it("Check object properties - Categories API", async () => {
    CategoriesAPI.checkObjectPropertiesCategoriesAPI();
  });
});

describe("Product API tests", () => {
  let idProduct = null;

  beforeAll(() => {
    idProduct = generateRandomId();
  });
  it("Check status code - Products API", async () => {
    await ProductsAPI.checkStatusCodeProductsAPI();
  });

  it("Check object properties - Products API", async () => {
    await ProductsAPI.checkObjectPropertiesProductsAPI();
  });

  it("End date greater than start date - Products API", async () => {
    await ProductsAPI.endDateGreaterThanStartDate();
  });

  it("Check status code - Random Product API", async () => {
    await ProductsAPI.checkStatusCodeRandomProductAPI();
  });

  it("Check object properties - Random Product API", async () => {
    await ProductsAPI.checkObjectPropertiesRandomProductAPI();
  });

  it("Check status code - Product API", async () => {
    await ProductsAPI.checkStatusCodeProductAPI(idProduct);
  });

  it("Check object properties - Product API", async () => {
    await ProductsAPI.checkObjectPropertiesProductAPI(idProduct);
  });

  it("Product with valid id is displayed - Product API", async () => {
    await ProductsAPI.verifyProductWithValidId(idProduct);
  });
});

describe("Bids API", () => {
  let interceptor;
  beforeEach(() => {
    interceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response && error.response.status === 403) {
          return Promise.resolve({ status: 403 });
        } else if (error.response && error.response.status === 400) {
          return Promise.resolve({
            status: 400,
            data: "Invalid bid.",
          });
        }
        return Promise.reject(error);
      }
    );
  });
  afterEach(() => {
    axios.interceptors.response.eject(interceptor);
  });
  it("Place bid without login", async () => {
    await BidsAPI.placeBidWithoutLogin();
  });

  it("Place bid less than highest bid", async () => {
    await BidsAPI.placeBidLessThanHighestBid();
  });
});
describe("Auth API", () => {
  let interceptor;
  beforeEach(() => {
    interceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response && error.response.status === 401) {
          return Promise.resolve({ status: 401, data: "Could not log in" });
        } else if (error.response && error.response.status === 400) {
          return Promise.resolve({
            status: 400,
            data: "Could not create new user account",
          });
        } else if (error.response && error.response.status === 500) {
          return Promise.resolve({
            status: 500,
          });
        }
        return Promise.reject(error);
      }
    );
  });
  afterEach(() => {
    axios.interceptors.response.eject(interceptor);
  });
  it("Registration with invalid email", async () => {
    await AuthAPI.registerUser(
      invalidRegistrationData.email,
      validRegistrationData.password,
      validRegistrationData.firstName,
      validRegistrationData.lastName,
      400,
      "Could not create new user account"
  );
  });

  it("Registration without email", async () => {
    await AuthAPI.registerUser(
      null,
      validRegistrationData.password,
      validRegistrationData.firstName,
      validRegistrationData.lastName,
      400,
      "Could not create new user account"
    );
  });

  it("Login with invalid email", async () => {
    await AuthAPI.loginUser(
      invalidLoginData.email,
      validLoginData.password,
      401,
      "Could not log in"
  );
  });

  it("Login with invalid password", async () => {
    await AuthAPI.loginUser(
      validLoginData.email,
      invalidLoginData.password,
      401,
      "Could not log in"
    );
  });

  it("Validate incorrect token", async () => {
    await AuthAPI.validateToken(invalidLoginData.token, 401)
  });
});
