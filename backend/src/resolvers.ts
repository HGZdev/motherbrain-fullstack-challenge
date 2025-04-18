import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();
export const resolvers = {
  Query: {
    fundingRounds: async () => {
      const fundingRounds = await prisma.fundingRound.findMany({
        take: 20,
      });

      return fundingRounds;
    },
    organizations: async () => {
      const organizations = await prisma.organization.findMany({
        take: 20,
      });

      return organizations;
    },
  },
};
