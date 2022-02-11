import faker from "@faker-js/faker";
import {
  flipCoin,
  getDateOfBirth,
  getMiddleNameInitial,
  getRandomAddress,
  randomAge,
} from "../../helpers";
import { generate } from "generate-password";
import { LatitudeResolver, LongitudeResolver } from "graphql-scalars";

export const resolvers = {
  Latitude: LatitudeResolver,
  Longitude: LongitudeResolver,
  Query: {
    getPerson: (
      _root: any,
      {
        age,
        sex,
        passwordLength,
      }: { age: number; sex: string; passwordLength: number }
    ) => {
      age = age || randomAge(18, 62);
      sex = sex || flipCoin("male", "female");
      passwordLength = passwordLength || 12;
      return {
        age: age,
        dateOfBirth: getDateOfBirth(age),
        firstName: faker.name.firstName(sex),
        lastName: faker.name.lastName,
        middleName: getMiddleNameInitial(),
        phoneNumber: faker.phone.phoneNumber("!##-!##-####"),
        address: getRandomAddress(),
        job: faker.name.jobTitle(),
        username: faker.internet.userName(),
        password: generate({
          length: passwordLength,
          numbers: true,
          uppercase: true,
        }),
      };
    },
  },
};
