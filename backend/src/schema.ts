import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum Interval {
    day
    week
    month
    quarter
    year
    total
  }

  type Round {
    id: String!
    name: String!
    amount: Int!
    createdAt: String!
    organizationId: String!
    organization: Org
  }

  type Org {
    id: String!
    name: String!
    description: String!
  }

  type OrgRoundsGrouped {
    amountChange: Int
    amountChangePercentage: Float
    amountTotal: Int!
    fundingSpeed: Float
    organization: Org
    organizationId: String!
    period: String!
    periodStartDate: String!
    periodEndDate: String!
    roundsCount: Int!
  }

  type Query {
    rounds: [Round!]

    orgs(orgSearchText: String): [Org!]

    orgsRoundsGrouped(
      interval: Interval!
      orgIds: [String]
      minDate: String
      maxDate: String
    ): [OrgRoundsGrouped!]
  }
`;
