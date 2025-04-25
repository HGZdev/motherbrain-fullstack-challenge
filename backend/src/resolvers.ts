import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import {
  addMissingEmptyPeriods,
  groupAmountByOrgAndTimeInterval,
} from "./helpers";
import { Interval } from "./types";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    rounds: async () => {
      const rounds = await prisma.fundingRound.findMany();
      return rounds;
    },
    orgs: async (_, args: { orgSearchText?: string }) => {
      const { orgSearchText } = args;

      const orgs = await prisma.organization.findMany({
        where: {
          ...(orgSearchText && {
            OR: [
              { name: { contains: orgSearchText } },
              { description: { contains: orgSearchText } },
            ],
          }),
        },
      });

      return orgs;
    },
    orgsRoundsGrouped: async (
      _,
      args: {
        interval: Interval;
        orgIds?: string[];
        minDate?: string;
        maxDate?: string;
      }
    ) => {
      const { interval, minDate, maxDate, orgIds } = args;

      const queryOptions = {
        where: {
          ...(minDate && { createdAt: { gte: new Date(minDate) } }),
          ...(maxDate && { createdAt: { lte: new Date(maxDate) } }),
          ...(orgIds &&
            orgIds.length > 0 && { organizationId: { in: orgIds } }),
        },
        include: { organization: true },
      };

      const rounds = await prisma.fundingRound.findMany(queryOptions);

      const grouped = groupAmountByOrgAndTimeInterval(rounds, interval);
      return addMissingEmptyPeriods(grouped, interval);
    },
  },
};
