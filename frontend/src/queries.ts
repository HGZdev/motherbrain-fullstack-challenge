import { gql } from "@apollo/client";

export const FUNDING_ROUND_QUERY = gql`
  fragment FundingRoundFragment on FundingRound {
    id
    name
    amount
    createdAt
    organizationId
    organization {
      id
      name
      description
    }
  }

  query {
    fundingRounds {
      ...FundingRoundFragment
    }
  }
`;
// organizations

export const ORGANIZATION_QUERY = gql`
  fragment OrganizationFragment on Organization {
    id
    name
    description
  }
  query {
    organizations {
      ...OrganizationFragment
    }
  }
`;
