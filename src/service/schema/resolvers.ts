import { generatePerson, getBulkAddresses } from "../../helpers";
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
        minAge,
        maxAge,
      }: {
        age: number;
        sex: string;
        passwordLength: number;
        minAge: number | undefined;
        maxAge: number | undefined;
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
      const bulkPersons = null;

      console.log(bulkAddresses.length);
      return "Default String";
    },
  },
};
