import { generatePerson, getBulkAddresses } from "../../helpers";
import { LatitudeResolver, LongitudeResolver } from "graphql-scalars";
import { ApiUserModel } from "../database/apiUser";
import { ApolloError, UserInputError } from "apollo-server";
import { randomBytes } from "crypto";

interface ResolverContext {
  apiKey: string;
}

export const resolvers = {
  Latitude: LatitudeResolver,
  Longitude: LongitudeResolver,
  Query: {
    getPerson: async (
      _root: any,
      {
        age,
        sex,
        passwordLength,
        minAge,
        maxAge,
        userId,
      }: {
        age: number;
        sex: string;
        passwordLength: number;
        minAge: number;
        maxAge: number;
        userId: string;
      },
      { apiKey }: ResolverContext
    ) => {
      // todo sanitize user id
      const user = await ApiUserModel.findById(userId);
      console.log(user);
      if (!user) return new UserInputError("Api key or user invalid");

      const isApiKeyValid = user.apiKey == apiKey;
      console.log(isApiKeyValid);
      console.log(apiKey);
      if (!isApiKeyValid) return new UserInputError("Api key or user invalid");

      return generatePerson({
        age,
        sex,
        passwordLength,
        maxAge,
        minAge,
      });
    },
    getBulkData: async (
      _root: any,
      {
        count,
        minAge,
        maxAge,
        sex,
        passwordLength,
        userId,
      }: {
        count: number;
        minAge: number;
        maxAge: number;
        sex: string;
        passwordLength: number;
        userId: string;
      }
    ) => {
      const user = await ApiUserModel.findById(userId);
      if (!user) return new UserInputError("Api key or user invalid");

      // const isApiKeyValid = user.apiKey == apiKey;
      // if (!isApiKeyValid) return new UserInputError("Api key or user invalid");

      if (!user.isBulkAllowed) {
        return new ApolloError("User cannot make bulk requests");
      }

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

// todo
// sanitize inputs for mutations
