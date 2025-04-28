export type Org = {
  id: string;
  name: string;
  description: string;
};
export type OrgsQuery = {
  orgs: Org[];
};
export type Round = {
  id: string;
  name: string;
  amount: number;
  createdAt: string;
  organizationId: Org["id"];
  organization: Org;
};

export type Interval = "day" | "week" | "month" | "quarter" | "year" | "total";

export type RoundsQuery = {
  rounds: Round[];
};

export type OrgRoundsGrouped = {
  amountTotal: Round["amount"] | null;
  fundingSpeed: number | null;
  organization: Pick<Org, "name">;
  organizationId: Org["id"];
  period: string;
  roundsCount: number;
  trendAmount: number | null;
};

export type Trend = {
  slope: number | null;
  intercept: number | null;
};

export type OrgsRoundsGroupedQuery = {
  data: OrgRoundsGrouped[];
  trend: Trend;
};

export type FilterState = {
  maxDate?: string;
  minDate?: string;
  orgIds?: string[];
  orgSearchText?: string;
  interval: Interval;
};
