const getRandomNumber = () => {
  let randomDecimal = Math.random();
  let randomNumberInRange = Math.floor(randomDecimal * (42 - 23 + 1)) + 23;
  return randomNumberInRange;
};

const verifyObjectPropertiesExist = (object, properties) => {
  properties.forEach(property => {
    expect(object[property]).toExist();
  });
};

const verifyResponseStatus = (response, num) => {
  expect(response).toEqual(num);
};

export { getRandomNumber, verifyObjectPropertiesExist, verifyResponseStatus };
