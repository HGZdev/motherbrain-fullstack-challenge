import { gql, useQuery } from "@apollo/client";
import {
  RoundsQuery,
  OrgsQuery,
  Interval,
  OrgsRoundsGroupedQuery,
} from "./types";

export const ROUNDS_QUERY = gql`
  fragment RoundFragment on Round {
    id
    name
    amount
    createdAt
    organizationId
    organization {
      name
    }
  }

  query rounds {
    ...RoundFragment
  }
`;

export const ORGS_QUERY = gql`
  fragment OrgFragment on Org {
    id
    name
  }
  query orgs($orgSearchText: String) {
    orgs(orgSearchText: $orgSearchText) {
      ...OrgFragment
    }
  }
`;

export const ORGS_ROUNDS_GROUPED = gql`
  fragment TrendFragment on Trend {
    slope
    intercept
  }

  fragment OrgRoundsGroupedFragment on OrgRoundsGrouped {
    amountTotal
    fundingSpeed
    organizationId
    organization {
      name
    }
    period
    roundsCount
    trendAmount
  }

  query orgsRoundsGrouped(
    $interval: Interval!
    $orgIds: [String]
    $minDate: String
    $maxDate: String
  ) {
    orgsRoundsGrouped(
      interval: $interval
      orgIds: $orgIds
      minDate: $minDate
      maxDate: $maxDate
    ) {
      data {
        ...OrgRoundsGroupedFragment
      }
      trend {
        ...TrendFragment
      }
    }
  }
`;

/**
 * Custom hook to fetch funding rounds
 * @returns QueryResult<RoundsQuery, OperationVariables>
 */
export const useRounds = () => {
  const query = useQuery<RoundsQuery>(ROUNDS_QUERY);
  return query;
};

/**
 * Custom hook to fetch organizations
 *
 * @param args
 * @param args.orgSearchText - Optional search text to filter organizations by name
 * @param args.orgIds - Optional array of organization IDs to filter by
 * @returns
 */
export const useOrgs = (args: { orgSearchText?: string } = {}) => {
  const query = useQuery<OrgsQuery>(ORGS_QUERY, {
    variables: args,
  });
  return query;
};

/**
 * Custom hook to fetch organizations and their rounds grouped by a given interval
 *
 * @param args
 * @param args.interval - Interval to group rounds by (day, week, month, quarter, year, total)
 * @param args.orgIds - Optional array of organization IDs to filter by
 * @param args.minDate - Optional minimum date to filter rounds by
 * @param args.maxDate - Optional maximum date to filter rounds by
 * @param args.orgSearchText - Optional search text to filter organizations by name
 * @param options
 * @returns QueryResult<OrgsRoundsGroupedQuery, OperationVariables>
 */
export const useOrgsRoundsGrouped = (
  args: {
    interval: Interval;
    orgIds?: string[];
    minDate?: string;
    maxDate?: string;
  } = { interval: "day" },
  options = {}
) => {
  const query = useQuery<{ orgsRoundsGrouped: OrgsRoundsGroupedQuery }>(
    ORGS_ROUNDS_GROUPED,
    {
      ...options,
      variables: args,
    }
  );
  return query;
};
