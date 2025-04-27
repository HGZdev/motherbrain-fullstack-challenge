import {
  ApolloClient,
  InMemoryCache,
  InMemoryCacheConfig,
} from "@apollo/client";
export { ApolloProvider } from "@apollo/client";

// This is the configuration for the Apollo Client cache.
const config: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        orgsRoundsGrouped: {
          // organizationId and period are used as cache keys
          keyArgs: ["organizationId", "period"],
        },
      },
    },
  },
};

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
