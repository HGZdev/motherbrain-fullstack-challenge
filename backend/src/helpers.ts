import { FundingRound, Organization } from "@prisma/client";
import {
  addDays,
  addMonths,
  addQuarters,
  addWeeks,
  addYears,
  format,
  getISOWeek,
  getISOWeekYear,
  getQuarter,
  getYear,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { OrgRoundsGrouped, Interval } from "./types";
import { linearRegression, linearRegressionLine } from "simple-statistics";

/**
 * Calculate the start and end dates of a period based on the given date and interval.
 * @param date - The date to calculate the period for.
 * @param groupBy - The interval to group by (day, week, month, quarter, year, total).
 * @returns An object containing the period start date, end date, and period string.
 */
export function calculatePeriodDates(
  date: Date,
  groupBy: Interval
): { periodStartDate: string; periodEndDate: string; period: string } {
  let periodStartDate: string;
  let periodEndDate: string;
  let period: string;

  switch (groupBy) {
    case "day":
      periodStartDate = format(startOfDay(date), "yyyy-MM-dd");
      periodEndDate = format(
        addDays(addDays(new Date(periodStartDate), 1), -1),
        "yyyy-MM-dd"
      );
      period = periodStartDate;
      break;
    case "week":
      periodStartDate = format(
        startOfWeek(date, { weekStartsOn: 1 }),
        "yyyy-MM-dd"
      );
      periodEndDate = format(
        addDays(addWeeks(new Date(periodStartDate), 1), -1),
        "yyyy-MM-dd"
      );
      period = `${getISOWeekYear(date)}-W${String(getISOWeek(date)).padStart(
        2,
        "0"
      )}`;
      break;
    case "month":
      periodStartDate = format(startOfMonth(date), "yyyy-MM-dd");
      periodEndDate = format(
        addDays(addMonths(new Date(periodStartDate), 1), -1),
        "yyyy-MM-dd"
      );
      period = format(date, "yyyy-MM");
      break;
    case "quarter":
      periodStartDate = format(startOfQuarter(date), "yyyy-MM-dd");
      periodEndDate = format(
        addDays(addQuarters(new Date(periodStartDate), 1), -1),
        "yyyy-MM-dd"
      );
      period = `${getYear(date)}-Q${getQuarter(date)}`;
      break;
    case "year":
      periodStartDate = format(startOfYear(date), "yyyy-MM-dd");
      periodEndDate = format(
        addDays(addYears(new Date(periodStartDate), 1), -1),
        "yyyy-MM-dd"
      );
      period = `${getYear(date)}`;
      break;
    case "total":
      periodStartDate = "";
      periodEndDate = "";
      period = "Total";
      break;
    default:
      throw new Error(`Unsupported period: ${groupBy}`);
  }

  return { periodStartDate, periodEndDate, period };
}

/**
 * Group funding rounds by organization and time interval with additional stats
 * like funding speed and amount change.
 * @param rounds - Array of funding rounds to group.
 * @param groupBy - The interval to group by (day, week, month, quarter, year).
 * @returns An array of grouped funding rounds with additional stats.
 **/
export function groupAmountByOrgAndTimeInterval(
  rounds: (FundingRound & { organization: Pick<Organization, "name"> })[],
  groupBy: Interval
) {
  const sortedRounds = [...rounds].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const grouped = sortedRounds.reduce((acc, round) => {
    const date = new Date(round.createdAt);
    const { periodStartDate, periodEndDate, period } = calculatePeriodDates(
      date,
      groupBy
    );

    const key = `${round.organizationId}__${period}`;

    const currentEntry = acc[key] || {
      organizationId: round.organizationId,
      organization: round.organization,
      period,
      periodStartDate,
      periodEndDate,
      amountTotal: 0,
      amountChange: 0,
      amountChangePercentage: 0,
      roundsCount: 0,
      fundingSpeed: 0,
      trendAmount: null,
    };

    currentEntry.amountTotal += round.amount;
    currentEntry.roundsCount += 1;
    acc[key] = currentEntry;

    return acc;
  }, {} as Record<string, OrgRoundsGrouped>);

  const entries = Object.values(grouped);

  const final: typeof entries = [];
  const lastTotalPerOrg: Record<string, number> = {};
  const lastPeriodEndDatePerOrg: Record<string, string> = {};

  // Calculates absolute and percentage change in funding between intervals.
  // (I initially prepared this data for the chart, but ended up not using it.)
  for (const entry of entries) {
    const prevEndDate = lastPeriodEndDatePerOrg[entry.organizationId];
    if (prevEndDate) {
      // Calculate the number of days between the day after the previous periodEndDate and the current periodEndDate
      const startDate = addDays(new Date(prevEndDate), 1);
      const endDate = new Date(entry.periodEndDate);
      const daysBetween = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1
      );

      entry.fundingSpeed =
        daysBetween > 0 ? entry.amountTotal / daysBetween : 0;
    } else {
      // Calculate the number of days in the first period
      const startDate = new Date(entry.periodStartDate);
      const endDate = new Date(entry.periodEndDate);
      const daysInPeriod = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1
      );

      entry.fundingSpeed =
        daysInPeriod > 0 ? entry.amountTotal / daysInPeriod : 0;
    }

    const prevTotal = lastTotalPerOrg[entry.organizationId];
    if (prevTotal !== undefined) {
      entry.amountChange = entry.amountTotal - prevTotal;
      entry.amountChangePercentage =
        prevTotal !== 0
          ? ((entry.amountTotal - prevTotal) / prevTotal) * 100
          : 0;
    } else {
      entry.amountChange = 0;
      entry.amountChangePercentage = 0;
    }

    lastPeriodEndDatePerOrg[entry.organizationId] = entry.periodEndDate;
    lastTotalPerOrg[entry.organizationId] = entry.amountTotal;
    final.push(entry);
  }

  return final;
}

/**
 * Add missing empty periods to the grouped data this is used to fill the gaps in the data for the chart
 * @param grouped - The grouped data to fill gaps in.
 * @param interval - The interval to group by (day, week, month, quarter, year).
 * @returns The grouped data with missing periods filled in.
 **/
export const addMissingEmptyPeriods = (
  grouped: OrgRoundsGrouped[],
  interval: Interval
): OrgRoundsGrouped[] => {
  if (!grouped?.length) return [];

  const allPeriods: Record<string, OrgRoundsGrouped> = {};
  const allOrgIds = Array.from(
    new Set(grouped.map((item) => item.organizationId))
  );

  // Composite key: orgId__period
  grouped.forEach((item) => {
    const key = `${item.organizationId}__${item.period}`;
    allPeriods[key] = item;
  });

  const startDate = new Date(grouped[0].periodStartDate);
  const endDate = new Date(grouped[grouped.length - 1].periodStartDate);
  let currentDate = startDate;

  const lastFundingSpeedPerOrg: Record<string, number> = {};

  while (currentDate <= endDate) {
    const { periodStartDate, periodEndDate, period } = calculatePeriodDates(
      currentDate,
      interval
    );

    allOrgIds.forEach((orgId) => {
      const key = `${orgId}__${period}`;
      if (!allPeriods[key]) {
        const org = grouped.find(
          (item) => item.organizationId === orgId
        )?.organization;

        allPeriods[key] = {
          organizationId: orgId,
          organization: { name: org?.name || "Unknown" },
          period,
          periodStartDate,
          periodEndDate,
          amountTotal: 0,
          amountChange: 0,
          amountChangePercentage: 0,
          roundsCount: 0,
          fundingSpeed: null,
          trendAmount: null,
        };
      } else {
        // Update the last known fundingSpeed for this organization
        lastFundingSpeedPerOrg[orgId] = allPeriods[key].fundingSpeed;
      }
    });

    currentDate =
      interval === "day"
        ? addDays(currentDate, 1)
        : interval === "week"
        ? addWeeks(currentDate, 1)
        : interval === "month"
        ? addMonths(currentDate, 1)
        : interval === "quarter"
        ? addQuarters(currentDate, 1)
        : interval === "year"
        ? addYears(currentDate, 1)
        : currentDate;
  }

  return Object.values(allPeriods).sort(
    (a, b) =>
      new Date(a.periodStartDate).getTime() -
      new Date(b.periodStartDate).getTime()
  );
};

/**
 * Calculate the linear trend of a dataset using linear regression.
 * @param data - An array of objects containing time and amount properties.
 * @returns An object containing the slope, intercept, and a function to calculate the trend line.
 * If the dataset is empty, returns null.
 * If the dataset has one point, returns a slope of 0 and the amount of that point as the intercept.
 * If the dataset has two points, returns a slope of 0 and the amount of that point as the intercept.
 * If the dataset has more than two points, uses linear regression to calculate the slope and intercept.
 */
export function calculateLinearTrend(data: { time: number; amount: number }[]) {
  if (data.length === 0) {
    return null;
  }

  if (data.length === 1) {
    return {
      slope: 0,
      intercept: data[0].amount,
      trendLine: (x: number) => data[0].amount,
    };
  }

  if (data.length === 2) {
    const [p1, p2] = data;
    const slope = (p2.amount - p1.amount) / (p2.time - p1.time);
    const intercept = p1.amount - slope * p1.time;

    return {
      slope,
      intercept,
      trendLine: (x: number) => slope * x + intercept,
    };
  }

  const regressionData = data.map((point) => [point.time, point.amount]);
  const regression = linearRegression(regressionData);

  return {
    slope: regression.m,
    intercept: regression.b,
    trendLine: linearRegressionLine(regression),
  };
}
