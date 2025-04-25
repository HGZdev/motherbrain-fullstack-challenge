export enum Interval {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  QUARTER = "quarter",
  YEAR = "year",
  TOTAL = "total",
}

export type OrgRoundsGrouped = {
  amountChange: number | null;
  amountChangePercentage: number | null;
  amountTotal: number | null;
  fundingSpeed: number | null;
  organization: { name: string };
  organizationId: string;
  period: string;
  periodEndDate: string;
  periodStartDate: string;
  roundsCount: number;
};
