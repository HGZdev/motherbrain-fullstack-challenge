export interface FundingRound {
  id: string;
  name: string;
  amount: number;
  createdAt: string;
  organizationId: string;
}

export interface FundingRoundsQuery {
  fundingRounds: FundingRound[];
}
