import { useQuery } from "@apollo/client";
import { FundingRoundsQuery } from "./types";
import { FUNDING_ROUND_QUERY } from "./queries";

export default function FundingRoundTable() {
  const { data, loading, error } =
    useQuery<FundingRoundsQuery>(FUNDING_ROUND_QUERY);
  console.log(" data:", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  if (!data?.fundingRounds) {
    return <p>No data</p>;
  }
  return (
    <table cellSpacing={8}>
      <thead>
        <tr>
          <th align="left">Name</th>
          <th align="left">Amount</th>
          <th align="left">Created at</th>
        </tr>
      </thead>

      <tbody>
        {data.fundingRounds.map((fundingRound) => (
          <tr key={fundingRound.id}>
            <td style={{ verticalAlign: "top" }}>{fundingRound.name}</td>
            <td style={{ verticalAlign: "top" }}>{fundingRound.amount} EUR</td>
            <td style={{ verticalAlign: "top" }}>
              {new Date(Number(fundingRound.createdAt)).getFullYear()}-
              {new Date(Number(fundingRound.createdAt)).getMonth()}-
              {new Date(Number(fundingRound.createdAt)).getDate()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
