import { describe, test, expect } from "vitest";
import {
  groupAmountByOrgAndTimeInterval,
  addMissingEmptyPeriods,
  calculateLinearTrend,
} from "./helpers";
import { mockRoundsTwoOrgs } from "./mocks/rounds";
import { OrgRoundsGrouped } from "./types";

describe("groupAmountByOrgAndTimeInterval", () => {
  test("should group by day", () => {
    const result = groupAmountByOrgAndTimeInterval(mockRoundsTwoOrgs, "day");

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 18034,
          "fundingSpeed": 18034,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-04-11",
          "periodEndDate": "2024-04-11",
          "periodStartDate": "2024-04-11",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 26932,
          "fundingSpeed": 26932,
          "organization": {
            "name": "Terry, Fadel and Pouros",
          },
          "organizationId": "org2",
          "period": "2024-05-05",
          "periodEndDate": "2024-05-05",
          "periodStartDate": "2024-05-05",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 24056,
          "amountChangePercentage": 133.39248086946878,
          "amountTotal": 42090,
          "fundingSpeed": 1202.5714285714287,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-05-16",
          "periodEndDate": "2024-05-16",
          "periodStartDate": "2024-05-16",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 63122,
          "amountChangePercentage": 234.37546413188772,
          "amountTotal": 90054,
          "fundingSpeed": 8186.727272727273,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-05-16",
          "periodEndDate": "2024-05-16",
          "periodStartDate": "2024-05-16",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 11900,
          "amountChangePercentage": 28.272748871465907,
          "amountTotal": 53990,
          "fundingSpeed": 6748.75,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-05-24",
          "periodEndDate": "2024-05-24",
          "periodStartDate": "2024-05-24",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 3305,
          "amountChangePercentage": 6.12150398221893,
          "amountTotal": 57295,
          "fundingSpeed": 1364.1666666666667,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-07-05",
          "periodEndDate": "2024-07-05",
          "periodStartDate": "2024-07-05",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 37284,
          "amountChangePercentage": 65.07374116415045,
          "amountTotal": 94579,
          "fundingSpeed": 47289.5,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-07-07",
          "periodEndDate": "2024-07-07",
          "periodStartDate": "2024-07-07",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -22529,
          "amountChangePercentage": -25.017211895085172,
          "amountTotal": 67525,
          "fundingSpeed": 900.3333333333334,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-07-30",
          "periodEndDate": "2024-07-30",
          "periodStartDate": "2024-07-30",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -1110,
          "amountChangePercentage": -1.1736220514067606,
          "amountTotal": 93469,
          "fundingSpeed": 1947.2708333333333,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-08-24",
          "periodEndDate": "2024-08-24",
          "periodStartDate": "2024-08-24",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -5347,
          "amountChangePercentage": -7.918548685671974,
          "amountTotal": 62178,
          "fundingSpeed": 1413.1363636363637,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-09-12",
          "periodEndDate": "2024-09-12",
          "periodStartDate": "2024-09-12",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -67916,
          "amountChangePercentage": -72.66152414169403,
          "amountTotal": 25553,
          "fundingSpeed": 1216.8095238095239,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-09-14",
          "periodEndDate": "2024-09-14",
          "periodStartDate": "2024-09-14",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 3621,
          "amountChangePercentage": 14.170547489531563,
          "amountTotal": 29174,
          "fundingSpeed": 5834.8,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-09-19",
          "periodEndDate": "2024-09-19",
          "periodStartDate": "2024-09-19",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -20827,
          "amountChangePercentage": -33.4957702081122,
          "amountTotal": 41351,
          "fundingSpeed": 1148.638888888889,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-10-18",
          "periodEndDate": "2024-10-18",
          "periodStartDate": "2024-10-18",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 29820,
          "amountChangePercentage": 72.11433822640323,
          "amountTotal": 71171,
          "fundingSpeed": 4448.1875,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-11-03",
          "periodEndDate": "2024-11-03",
          "periodStartDate": "2024-11-03",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -5267,
          "amountChangePercentage": -7.400486153067963,
          "amountTotal": 65904,
          "fundingSpeed": 1497.8181818181818,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-12-17",
          "periodEndDate": "2024-12-17",
          "periodStartDate": "2024-12-17",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 16026,
          "amountChangePercentage": 54.932474120792484,
          "amountTotal": 45200,
          "fundingSpeed": 311.7241379310345,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2025-02-11",
          "periodEndDate": "2025-02-11",
          "periodStartDate": "2025-02-11",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -32735,
          "amountChangePercentage": -72.42256637168141,
          "amountTotal": 12465,
          "fundingSpeed": 656.0526315789474,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2025-03-02",
          "periodEndDate": "2025-03-02",
          "periodStartDate": "2025-03-02",
          "roundsCount": 1,
          "trendAmount": null,
        },
      ]
    `);
  });
  test("should group by week", () => {
    const result = groupAmountByOrgAndTimeInterval(mockRoundsTwoOrgs, "week");

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 18034,
          "fundingSpeed": 2576.285714285714,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-W15",
          "periodEndDate": "2024-04-14",
          "periodStartDate": "2024-04-08",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 26932,
          "fundingSpeed": 3847.4285714285716,
          "organization": {
            "name": "Terry, Fadel and Pouros",
          },
          "organizationId": "org2",
          "period": "2024-W18",
          "periodEndDate": "2024-05-05",
          "periodStartDate": "2024-04-29",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 24056,
          "amountChangePercentage": 133.39248086946878,
          "amountTotal": 42090,
          "fundingSpeed": 1202.5714285714287,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-W20",
          "periodEndDate": "2024-05-19",
          "periodStartDate": "2024-05-13",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 63122,
          "amountChangePercentage": 234.37546413188772,
          "amountTotal": 90054,
          "fundingSpeed": 6432.428571428572,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-W20",
          "periodEndDate": "2024-05-19",
          "periodStartDate": "2024-05-13",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 11900,
          "amountChangePercentage": 28.272748871465907,
          "amountTotal": 53990,
          "fundingSpeed": 7712.857142857143,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-W21",
          "periodEndDate": "2024-05-26",
          "periodStartDate": "2024-05-20",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 97884,
          "amountChangePercentage": 181.30024078533063,
          "amountTotal": 151874,
          "fundingSpeed": 3616.0476190476193,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-W27",
          "periodEndDate": "2024-07-07",
          "periodStartDate": "2024-07-01",
          "roundsCount": 2,
          "trendAmount": null,
        },
        {
          "amountChange": -22529,
          "amountChangePercentage": -25.017211895085172,
          "amountTotal": 67525,
          "fundingSpeed": 876.9480519480519,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-W31",
          "periodEndDate": "2024-08-04",
          "periodStartDate": "2024-07-29",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -58405,
          "amountChangePercentage": -38.45622028787021,
          "amountTotal": 93469,
          "fundingSpeed": 1907.530612244898,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-W34",
          "periodEndDate": "2024-08-25",
          "periodStartDate": "2024-08-19",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -5347,
          "amountChangePercentage": -7.918548685671974,
          "amountTotal": 62178,
          "fundingSpeed": 1480.4285714285713,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-W37",
          "periodEndDate": "2024-09-15",
          "periodStartDate": "2024-09-09",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -67916,
          "amountChangePercentage": -72.66152414169403,
          "amountTotal": 25553,
          "fundingSpeed": 1216.8095238095239,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-W37",
          "periodEndDate": "2024-09-15",
          "periodStartDate": "2024-09-09",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 3621,
          "amountChangePercentage": 14.170547489531563,
          "amountTotal": 29174,
          "fundingSpeed": 4167.714285714285,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-W38",
          "periodEndDate": "2024-09-22",
          "periodStartDate": "2024-09-16",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -20827,
          "amountChangePercentage": -33.4957702081122,
          "amountTotal": 41351,
          "fundingSpeed": 1181.4571428571428,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-W42",
          "periodEndDate": "2024-10-20",
          "periodStartDate": "2024-10-14",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 29820,
          "amountChangePercentage": 72.11433822640323,
          "amountTotal": 71171,
          "fundingSpeed": 5083.642857142857,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-W44",
          "periodEndDate": "2024-11-03",
          "periodStartDate": "2024-10-28",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -5267,
          "amountChangePercentage": -7.400486153067963,
          "amountTotal": 65904,
          "fundingSpeed": 1344.9795918367347,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-W51",
          "periodEndDate": "2024-12-22",
          "periodStartDate": "2024-12-16",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": 16026,
          "amountChangePercentage": 54.932474120792484,
          "amountTotal": 45200,
          "fundingSpeed": 307.4829931972789,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2025-W07",
          "periodEndDate": "2025-02-16",
          "periodStartDate": "2025-02-10",
          "roundsCount": 1,
          "trendAmount": null,
        },
        {
          "amountChange": -32735,
          "amountChangePercentage": -72.42256637168141,
          "amountTotal": 12465,
          "fundingSpeed": 890.3571428571429,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2025-W09",
          "periodEndDate": "2025-03-02",
          "periodStartDate": "2025-02-24",
          "roundsCount": 1,
          "trendAmount": null,
        },
      ]
    `);
  });
  test("should group by quarter", () => {
    const result = groupAmountByOrgAndTimeInterval(
      mockRoundsTwoOrgs,
      "quarter"
    );
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 114114,
          "fundingSpeed": 1254,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-Q2",
          "periodEndDate": "2024-06-30",
          "periodStartDate": "2024-04-01",
          "roundsCount": 3,
          "trendAmount": null,
        },
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 116986,
          "fundingSpeed": 1285.5604395604396,
          "organization": {
            "name": "Terry, Fadel and Pouros",
          },
          "organizationId": "org2",
          "period": "2024-Q2",
          "periodEndDate": "2024-06-30",
          "periodStartDate": "2024-04-01",
          "roundsCount": 2,
          "trendAmount": null,
        },
        {
          "amountChange": 185956,
          "amountChangePercentage": 162.95634190371032,
          "amountTotal": 300070,
          "fundingSpeed": 3261.6304347826085,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024-Q3",
          "periodEndDate": "2024-09-30",
          "periodStartDate": "2024-07-01",
          "roundsCount": 5,
          "trendAmount": null,
        },
        {
          "amountChange": 12717,
          "amountChangePercentage": 10.87053151659173,
          "amountTotal": 129703,
          "fundingSpeed": 1409.8152173913043,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-Q3",
          "periodEndDate": "2024-09-30",
          "periodStartDate": "2024-07-01",
          "roundsCount": 2,
          "trendAmount": null,
        },
        {
          "amountChange": 48723,
          "amountChangePercentage": 37.565052466018514,
          "amountTotal": 178426,
          "fundingSpeed": 1939.4130434782608,
          "organization": {
            "name": "org2 ",
          },
          "organizationId": "org2",
          "period": "2024-Q4",
          "periodEndDate": "2024-12-31",
          "periodStartDate": "2024-10-01",
          "roundsCount": 3,
          "trendAmount": null,
        },
        {
          "amountChange": -242405,
          "amountChangePercentage": -80.78281734262005,
          "amountTotal": 57665,
          "fundingSpeed": 316.84065934065933,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2025-Q1",
          "periodEndDate": "2025-03-31",
          "periodStartDate": "2025-01-01",
          "roundsCount": 2,
          "trendAmount": null,
        },
      ]
    `);
  });
  test("should group by year", () => {
    const result = groupAmountByOrgAndTimeInterval(mockRoundsTwoOrgs, "year");
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 414184,
          "fundingSpeed": 1131.6502732240438,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2024",
          "periodEndDate": "2024-12-31",
          "periodStartDate": "2024-01-01",
          "roundsCount": 8,
          "trendAmount": null,
        },
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 425115,
          "fundingSpeed": 1161.516393442623,
          "organization": {
            "name": "Terry, Fadel and Pouros",
          },
          "organizationId": "org2",
          "period": "2024",
          "periodEndDate": "2024-12-31",
          "periodStartDate": "2024-01-01",
          "roundsCount": 7,
          "trendAmount": null,
        },
        {
          "amountChange": -356519,
          "amountChangePercentage": -86.07744384138451,
          "amountTotal": 57665,
          "fundingSpeed": 157.986301369863,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "2025",
          "periodEndDate": "2025-12-31",
          "periodStartDate": "2025-01-01",
          "roundsCount": 2,
          "trendAmount": null,
        },
      ]
    `);
  });

  test("should group by total", () => {
    const result = groupAmountByOrgAndTimeInterval(mockRoundsTwoOrgs, "total");
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 471849,
          "fundingSpeed": 0,
          "organization": {
            "name": "Wilderman - Shields",
          },
          "organizationId": "org1",
          "period": "Total",
          "periodEndDate": "",
          "periodStartDate": "",
          "roundsCount": 10,
          "trendAmount": null,
        },
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 425115,
          "fundingSpeed": 0,
          "organization": {
            "name": "Terry, Fadel and Pouros",
          },
          "organizationId": "org2",
          "period": "Total",
          "periodEndDate": "",
          "periodStartDate": "",
          "roundsCount": 7,
          "trendAmount": null,
        },
      ]
    `);
  });

  test("should handle invalid period", () => {
    expect(() =>
      groupAmountByOrgAndTimeInterval(mockRoundsTwoOrgs, "invalid" as any)
    ).toThrow("Unsupported period: invalid");
  });

  test("should handle null period", () => {
    expect(() =>
      groupAmountByOrgAndTimeInterval(mockRoundsTwoOrgs, null as any)
    ).toThrow("Unsupported period: null");
  });

  test("should handle empty rounds array", () => {
    const result = groupAmountByOrgAndTimeInterval([], "month");
    expect(result).toMatchInlineSnapshot([]);
  });

  test("should handle rounds with invalid dates", () => {
    const invalidRounds = [
      {
        organizationId: "1b0a7445-c4d0-441d-828a-5c8b06ba3230",
        organization: { name: "Org 1" },
        createdAt: "invalid-date",
        amount: 1000,
      },
    ];
    expect(() =>
      groupAmountByOrgAndTimeInterval(invalidRounds as any, "month")
    ).toThrow();
  });
});

describe("addMissingEmptyPeriods", () => {
  test("should add missing weekly periods", () => {
    const grouped: OrgRoundsGrouped[] = [
      {
        organizationId: "1",
        organization: { name: "Org 1" },
        period: "2024-W14",
        periodStartDate: "2024-04-01",
        periodEndDate: "2024-04-07",
        amountTotal: 100,
        amountChange: 0,
        amountChangePercentage: 0,
        roundsCount: 1,
        fundingSpeed: 100,
      },
      {
        organizationId: "1",
        organization: { name: "Org 1" },
        period: "2024-W16",
        periodStartDate: "2024-04-15",
        periodEndDate: "2024-04-21",
        amountTotal: 200,
        amountChange: 100,
        amountChangePercentage: 100,
        roundsCount: 1,
        fundingSpeed: 200,
      },
    ];

    const result = addMissingEmptyPeriods(grouped, "week");

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 100,
          "fundingSpeed": 100,
          "organization": {
            "name": "Org 1",
          },
          "organizationId": "1",
          "period": "2024-W14",
          "periodEndDate": "2024-04-07",
          "periodStartDate": "2024-04-01",
          "roundsCount": 1,
        },
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 0,
          "fundingSpeed": null,
          "organization": {
            "name": "Org 1",
          },
          "organizationId": "1",
          "period": "2024-W15",
          "periodEndDate": "2024-04-14",
          "periodStartDate": "2024-04-08",
          "roundsCount": 0,
          "trendAmount": null,
        },
        {
          "amountChange": 100,
          "amountChangePercentage": 100,
          "amountTotal": 200,
          "fundingSpeed": 200,
          "organization": {
            "name": "Org 1",
          },
          "organizationId": "1",
          "period": "2024-W16",
          "periodEndDate": "2024-04-21",
          "periodStartDate": "2024-04-15",
          "roundsCount": 1,
        },
      ]
    `);
  });

  // should add missing weekly periods, when two orgs have value in the same week
  test("should add missing weekly periods with two orgs", () => {
    const grouped: OrgRoundsGrouped[] = [
      {
        organizationId: "1",
        organization: { name: "Org 1" },
        period: "2024-W14",
        periodStartDate: "2024-04-01",
        periodEndDate: "2024-04-07",
        amountTotal: 100,
        amountChange: 0,
        amountChangePercentage: 0,
        roundsCount: 1,
        fundingSpeed: 100,
      },
      {
        organizationId: "2",
        organization: { name: "Org 2" },
        period: "2024-W14",
        periodStartDate: "2024-04-01",
        periodEndDate: "2024-04-07",
        amountTotal: 200,
        amountChange: 0,
        amountChangePercentage: 0,
        roundsCount: 1,
        fundingSpeed: 200,
      },
      {
        organizationId: "1",
        organization: { name: "Org 1" },
        period: "2024-W16",
        periodStartDate: "2024-04-15",
        periodEndDate: "2024-04-21",
        amountTotal: 300,
        amountChange: 200,
        amountChangePercentage: 200,
        roundsCount: 1,
        fundingSpeed: 300,
      },
      {
        organizationId: "2",
        organization: { name: "Org 2" },
        period: "2024-W16",
        periodStartDate: "2024-04-15",
        periodEndDate: "2024-04-21",
        amountTotal: 400,
        amountChange: 200,
        amountChangePercentage: 100,
        roundsCount: 1,
        fundingSpeed: 400,
      },
    ];
    const result = addMissingEmptyPeriods(grouped, "week");
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 100,
          "fundingSpeed": 100,
          "organization": {
            "name": "Org 1",
          },
          "organizationId": "1",
          "period": "2024-W14",
          "periodEndDate": "2024-04-07",
          "periodStartDate": "2024-04-01",
          "roundsCount": 1,
        },
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 200,
          "fundingSpeed": 200,
          "organization": {
            "name": "Org 2",
          },
          "organizationId": "2",
          "period": "2024-W14",
          "periodEndDate": "2024-04-07",
          "periodStartDate": "2024-04-01",
          "roundsCount": 1,
        },
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 0,
          "fundingSpeed": null,
          "organization": {
            "name": "Org 1",
          },
          "organizationId": "1",
          "period": "2024-W15",
          "periodEndDate": "2024-04-14",
          "periodStartDate": "2024-04-08",
          "roundsCount": 0,
          "trendAmount": null,
        },
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 0,
          "fundingSpeed": null,
          "organization": {
            "name": "Org 2",
          },
          "organizationId": "2",
          "period": "2024-W15",
          "periodEndDate": "2024-04-14",
          "periodStartDate": "2024-04-08",
          "roundsCount": 0,
          "trendAmount": null,
        },
        {
          "amountChange": 200,
          "amountChangePercentage": 200,
          "amountTotal": 300,
          "fundingSpeed": 300,
          "organization": {
            "name": "Org 1",
          },
          "organizationId": "1",
          "period": "2024-W16",
          "periodEndDate": "2024-04-21",
          "periodStartDate": "2024-04-15",
          "roundsCount": 1,
        },
        {
          "amountChange": 200,
          "amountChangePercentage": 100,
          "amountTotal": 400,
          "fundingSpeed": 400,
          "organization": {
            "name": "Org 2",
          },
          "organizationId": "2",
          "period": "2024-W16",
          "periodEndDate": "2024-04-21",
          "periodStartDate": "2024-04-15",
          "roundsCount": 1,
        },
      ]
    `);
  });

  test("should add missing monthly periods", () => {
    const grouped: OrgRoundsGrouped[] = [
      {
        organizationId: "1",
        organization: { name: "Org 1" },
        period: "2024-01",
        periodStartDate: "2024-01-01",
        periodEndDate: "2024-01-31",
        amountTotal: 100,
        amountChange: 0,
        amountChangePercentage: 0,
        roundsCount: 1,
        fundingSpeed: 100,
      },
      {
        organizationId: "1",
        organization: { name: "Org 1" },
        period: "2024-03",
        periodStartDate: "2024-03-01",
        periodEndDate: "2024-03-31",
        amountTotal: 200,
        amountChange: 100,
        amountChangePercentage: 100,
        roundsCount: 1,
        fundingSpeed: 200,
      },
    ];

    const result = addMissingEmptyPeriods(grouped, "month");

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 100,
          "fundingSpeed": 100,
          "organization": {
            "name": "Org 1",
          },
          "organizationId": "1",
          "period": "2024-01",
          "periodEndDate": "2024-01-31",
          "periodStartDate": "2024-01-01",
          "roundsCount": 1,
        },
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 0,
          "fundingSpeed": null,
          "organization": {
            "name": "Org 1",
          },
          "organizationId": "1",
          "period": "2024-02",
          "periodEndDate": "2024-02-29",
          "periodStartDate": "2024-02-01",
          "roundsCount": 0,
          "trendAmount": null,
        },
        {
          "amountChange": 100,
          "amountChangePercentage": 100,
          "amountTotal": 200,
          "fundingSpeed": 200,
          "organization": {
            "name": "Org 1",
          },
          "organizationId": "1",
          "period": "2024-03",
          "periodEndDate": "2024-03-31",
          "periodStartDate": "2024-03-01",
          "roundsCount": 1,
        },
      ]
    `);
  });

  test("should add missing quarterly periods", () => {
    const grouped: OrgRoundsGrouped[] = [
      {
        organizationId: "1",
        organization: { name: "Org 1" },
        period: "2024-Q1",
        periodStartDate: "2024-01-01",
        periodEndDate: "2024-03-31",
        amountTotal: 100,
        amountChange: 0,
        amountChangePercentage: 0,
        roundsCount: 1,
        fundingSpeed: 100,
      },
      {
        organizationId: "1",
        organization: { name: "Org 1" },
        period: "2024-Q3",
        periodStartDate: "2024-07-01",
        periodEndDate: "2024-09-30",
        amountTotal: 200,
        amountChange: 100,
        amountChangePercentage: 100,
        roundsCount: 1,
        fundingSpeed: 220,
      },
    ];

    const result = addMissingEmptyPeriods(grouped, "quarter");

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 100,
          "fundingSpeed": 100,
          "organization": {
            "name": "Org 1",
          },
          "organizationId": "1",
          "period": "2024-Q1",
          "periodEndDate": "2024-03-31",
          "periodStartDate": "2024-01-01",
          "roundsCount": 1,
        },
        {
          "amountChange": 0,
          "amountChangePercentage": 0,
          "amountTotal": 0,
          "fundingSpeed": null,
          "organization": {
            "name": "Org 1",
          },
          "organizationId": "1",
          "period": "2024-Q2",
          "periodEndDate": "2024-06-30",
          "periodStartDate": "2024-04-01",
          "roundsCount": 0,
          "trendAmount": null,
        },
        {
          "amountChange": 100,
          "amountChangePercentage": 100,
          "amountTotal": 200,
          "fundingSpeed": 220,
          "organization": {
            "name": "Org 1",
          },
          "organizationId": "1",
          "period": "2024-Q3",
          "periodEndDate": "2024-09-30",
          "periodStartDate": "2024-07-01",
          "roundsCount": 1,
        },
      ]
    `);
  });

  test("should handle empty input", () => {
    const grouped: OrgRoundsGrouped[] = [];

    const result = addMissingEmptyPeriods(grouped, "month");

    expect(result).toEqual([]);
  });
});

describe("calculateLinearTrend", () => {
  test("should return null for an empty dataset", () => {
    const data: { time: number; amount: number }[] = [];
    const result = calculateLinearTrend(data);
    expect(result).toBeNull();
  });

  test("should return slope 0 and intercept equal to the amount for a single data point", () => {
    const data = [{ time: new Date("2024-01-01").getTime(), amount: 100 }];
    const result = calculateLinearTrend(data);
    expect(result).toEqual({
      slope: 0,
      intercept: 100,
      trendLine: expect.any(Function),
    });
    expect(result?.trendLine(data[0].time)).toBe(100);
  });

  test("should calculate slope and intercept for two data points", () => {
    const data = [
      { time: new Date("2024-01-01").getTime(), amount: 100 },
      { time: new Date("2024-01-02").getTime(), amount: 200 },
    ];
    const result = calculateLinearTrend(data);
    expect(result).toEqual({
      slope: 100 / (data[1].time - data[0].time),
      intercept: 100 - (100 / (data[1].time - data[0].time)) * data[0].time,
      trendLine: expect.any(Function),
    });
    expect(result?.trendLine(data[0].time)).toBeCloseTo(100);
    expect(result?.trendLine(data[1].time)).toBeCloseTo(200);
  });

  test("should calculate slope and intercept for multiple data points using linear regression", () => {
    const data = [
      { time: new Date("2024-01-01").getTime(), amount: 100 },
      { time: new Date("2024-01-02").getTime(), amount: 200 },
      { time: new Date("2024-01-03").getTime(), amount: 300 },
    ];
    const result = calculateLinearTrend(data);
    expect(result).toEqual({
      slope: expect.any(Number),
      intercept: expect.any(Number),
      trendLine: expect.any(Function),
    });
    expect(result?.trendLine(data[0].time)).toBeCloseTo(100);
    expect(result?.trendLine(data[1].time)).toBeCloseTo(200);
    expect(result?.trendLine(data[2].time)).toBeCloseTo(300);
  });
});
