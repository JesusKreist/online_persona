import { books } from "../database/books";

export const resolvers = {
  Query: {
    books: () => books,
  },
};
