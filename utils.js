const generateRandomNumber = () => {
  let randomDecimal = Math.random();
  let randomNumberInRange = Math.floor(randomDecimal * (42 - 23 + 1)) + 23;
  return randomNumberInRange;
};

const generateRandomEmail = function () {
  let rndnum = Math.random();
  let emailValue = "random.test+" + rndnum + "@test.com";
  return emailValue;
};

function generateRandomPassword() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

const verifyObjectPropertiesExist = (object, properties) => {
  properties.forEach((property) => {
    expect(object[property]).toExist();
  });
};

const verifyToEqual = (first, second) => {
  expect(first).toEqual(second);
};

export {
  generateRandomNumber,
  generateRandomEmail,
  generateRandomPassword,
  verifyObjectPropertiesExist,
  verifyToEqual,
};
