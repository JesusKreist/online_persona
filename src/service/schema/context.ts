import sanitize from "mongo-sanitize";

interface CustomApolloHeader {
  "x-api-key"?: string;
}

interface ApolloRequestContext {
  headers: CustomApolloHeader;
}

export const context = ({ req }: { req: ApolloRequestContext }) => {
  const apiKey = req.headers["x-api-key"] || "";

  return sanitize({ apiKey });
};
