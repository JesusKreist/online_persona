import { generatePerson, getBulkAddresses } from "../../helpers";
import { LatitudeResolver, LongitudeResolver } from "graphql-scalars";
import { ApiUserModel } from "../database/apiUser";
import { UserInputError } from "apollo-server";
import { randomBytes } from "crypto";

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
        minAge,
        maxAge,
      }: {
        age: number;
        sex: string;
        passwordLength: number;
        minAge: number;
        maxAge: number;
      }
    ) => {
      return generatePerson({
        age,
        sex,
        passwordLength,
        maxAge,
        minAge,
      });
    },
    getBulkData: (
      _root: any,
      {
        count,
        minAge,
        maxAge,
        sex,
        passwordLength,
      }: {
        count: number;
        minAge: number;
        maxAge: number;
        sex: string;
        passwordLength: number;
      }
    ) => {
      const bulkAddresses = getBulkAddresses(count);
      const bulkPersons = bulkAddresses.map((userAddress) =>
        generatePerson({
          minAge,
          maxAge,
          sex,
          passwordLength,
          userAddress,
        })
      );

      return bulkPersons;
    },
    createUser: async (
      _root: any,
      {
        firstName,
        lastName,
        emailAddress,
      }: {
        firstName: string;
        lastName: string;
        emailAddress: string;
      }
    ) => {
      const isEmailDuplicate = !!(await ApiUserModel.findOne({
        emailAddress: emailAddress.toLowerCase(),
      }));
      if (!!isEmailDuplicate) {
        return new UserInputError("Duplicate email address");
      }

      const newUser = await ApiUserModel.create({
        apiKey: randomBytes(20).toString("hex"),
        firstName,
        lastName,
        emailAddress,
      });
      await newUser.save();

      return {
        apiKey: newUser.apiKey,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        emailAddress: newUser.emailAddress,
        isBulkAllowed: newUser.isBulkAllowed,
      };
    },
  },
};
