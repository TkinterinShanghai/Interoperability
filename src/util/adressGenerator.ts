import faker from "@faker-js/faker";
import xml from "xml";

export const adressGenerator = () => {
  let _attr = { zip: `${faker.address.zipCode()}`, country: `${faker.address.countryCode()}` };
  return xml({
    adress: [
      { _attr },
      {
        street: [
          { name: faker.address.streetName() },
          { number: faker.datatype.number({ min: 1, max: 2000 }) },
        ],
      },
    ],
  });
};
