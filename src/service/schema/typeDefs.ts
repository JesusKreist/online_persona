import { gql } from "apollo-server";
export const typeDefs = gql`
  scalar Latitude

  scalar Longitude

  type Coordinates {
    """
    Latitudinal coordinate of the person's address.
    """
    lat: Latitude!
    """
    Longitudinal coordinate of the person's address.
    """
    lng: Longitude!
  }

  type Address {
    """
    Street address of the person.
    """
    address1: String!
    """
    Apartment, suite or space number (or any other designation not literally part of the physical address) if any.
    """
    address2: String
    """
    City where the address is located.
    """
    city: String!
    """
    Postal code of the person.
    """
    postalCode: String!
    """
    Geo coordinates of the person's address location.
    """
    coordinates: Coordinates!
  }

  type Person {
    """
    First name of the person. Sex can be supplied optionally as "male" or "female".
    """
    firstName: String!
    """
    Last name of the person.
    """
    lastName: String!
    """
    Middle name initial of the person.
    """
    middleName: String!
    """
    Phone number of the person. It is randomly generated and it may or may not exist.
    """
    phoneNumber: String!
    """
    Random address that geocodes successfully (tested on Google's Geocoding API service). The address data comes from the OpenAddresses project, and the address is in the public domain. The address is deliberately not linked to people or businesses; the only guarantee is that it is a real address that geocodes successfully.

    The address was pulled from OpenAddress where the "Required attribute" field was present and not "Yes". More info here https://github.com/EthanRBrown/rrad
    """
    address: Address!
    """
    Job of the person.
    """
    job: String!
    """
    Username of the person.
    """
    username: String!
    """
    Password of the person.
    """
    password: String!
    """
    Date of birth of the person.
    """
    dateOfBirth: String!
    """
    Age of the person.
    """
    age: String!
  }

  type User {
    apiKey: String!
    firstName: String!
    lastName: String!
    isBulkAllowed: Boolean!
    emailAddress: String!
  }

  type Query {
    """
    Return selected data for a person.
    """
    getPerson(
      age: Int
      sex: String
      minAge: String
      maxAge: String
      passwordLength: String
    ): Person!
    """
    Return selected data for a number of persons. The number of results is determined by the user.
    """
    getBulkData(
      count: Int!
      minAge: Int
      maxAge: Int
      passwordLength: Int
    ): [Person!]!
    """
    Create authorised users for the api.
    """
    createUser(
      firstName: String!
      lastName: String!
      emailAddress: String!
    ): User
  }
`;
