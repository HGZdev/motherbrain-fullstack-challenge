import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type FundingRound {
    id: String!
    name: String!
    amount: Int!
    createdAt: String!
    organizationId: String!
  }

  type Query {
    fundingRounds: [FundingRound!]
  }
`;
