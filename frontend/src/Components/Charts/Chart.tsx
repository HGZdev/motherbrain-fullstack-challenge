import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  ComposedChart,
  Line,
  TooltipProps,
} from "recharts";
import { OrgRoundsGrouped } from "../../types";
import { Card } from "../ui/card";
import { useIsMobile, useIsTablet } from "../../helpersHooks";
import { formatMoney } from "../../helpers";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { ReactNode } from "react";

export const Chart = ({ data }: { data: OrgRoundsGrouped[] }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const groupedData = Object.groupBy(data, (item) => item.period);
  const orgIds = Array.from(new Set(data.map((item) => item.organizationId)));
  const orgIdsToOrgNames = Object.fromEntries(
    data.map((item) => [item.organizationId, item.organization.name])
  );

  const transformedData = Object.entries(groupedData).map(
    ([period, items = []]) => {
      const periodData: Record<string, number | string | null> = { period };
      items.forEach((item) => {
        periodData[`${item.organizationId}_amountTotal`] = item.amountTotal;
        periodData[`${item.organizationId}_roundsCount`] = item.roundsCount;
        periodData[`${item.organizationId}_fundingSpeed`] = item.fundingSpeed;
        periodData[`${item.organizationId}_trendAmount`] = item.trendAmount;
      });
      return periodData;
    }
  );

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (!(active && payload && payload.length)) return null;
    const data: Record<string, number | null> = payload[0].payload;

    if (
      !Object.values(data).some(
        (value) => typeof value === "number" && value > 0
      )
    )
      return null;

    const dataGroupedByOrg = Object.entries(data).reduce(
      (acc, [key, value]) => {
        const [orgId, metric] = key.split("_") as [
          string,
          "total" | "rounds" | "speed"
        ];
        if (!acc[orgId])
          acc[orgId] = { total: null, rounds: null, speed: null };
        acc[orgId][metric] = value;

        return acc;
      },
      {} as Record<
        string,
        {
          total: number | null;
          rounds: number | null;
          speed: number | null;
        }
      >
    );

    return (
      <div className="flex flex-col gap-2 bg-white p-2 shadow-lg rounded-md text-base text-left">
        <h4>Period: {label}</h4>
        {Object.entries(dataGroupedByOrg).map(
          ([orgId, { total, rounds, speed }]) => {
            if (!total) return null;
            const orgName = orgIdsToOrgNames[orgId];
            return (
              <div key={orgId} className="text-xs md:text-sm">
                <span className="font-bold">{orgName}:</span> €
                {formatMoney(total)} in {rounds}{" "}
                {rounds! > 1 ? "rounds" : "round"} [€
                {formatMoney(speed || 0)} / day]
              </div>
            );
          }
        )}
      </div>
    );
  };

  const CustomLegend = ({ payload }: { payload?: Payload[] }): ReactNode => {
    if (!payload) return null;
    payload.sort((a, b) => String(a.dataKey).localeCompare(String(b.dataKey)));

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 pt-4 md:px-6 lg:px-8">
        {payload?.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <span
              className="w-4 h-4 inline-block"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-left text-xs md:text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const XAxisOptions = {
    tick: { fontSize: isMobile ? 8 : 16 },
    label: {
      value: "Period",
      position: isMobile ? "insideBottom" : "insideBottomLeft",
      offset: isMobile ? -5 : 0,
      fontSize: isMobile ? 14 : 16,
    },
    fontSize: isMobile ? 10 : isTablet ? 12 : 16,
  };

  const YAxisOptions = ({
    title,
    orientation,
    shorterUnits = false,
  }: {
    title: string;
    orientation: "left" | "right";
    shorterUnits?: boolean;
  }) => ({
    orientation,
    label: {
      value: title,
      style: { textAnchor: "middle" },
      angle: orientation === "left" ? -90 : 90,
      position: orientation === "left" ? "left" : "right",
      offset: orientation === "left" ? (isMobile ? 5 : 0) : isMobile ? 5 : 0,
      fontSize: isMobile ? 14 : 16,
    },
    fontSize: isMobile ? 10 : isTablet ? 12 : 16,
    tickFormatter: (value: number) => formatMoney(value, shorterUnits),
  });

  return (
    <Card>
      <ResponsiveContainer
        width="100%"
        height="100%"
        aspect={isMobile ? 0.8 : isTablet ? 1.3 : 1.77}
      >
        <ComposedChart
          data={transformedData}
          margin={
            isMobile
              ? { top: 10, right: 10, left: 10, bottom: 10 }
              : { top: 30, right: 30, left: 30, bottom: 30 }
          }
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" {...XAxisOptions} />
          <YAxis
            yAxisId="left"
            {...YAxisOptions({
              shorterUnits: true,
              orientation: "left",
              title: "Funding raised [€]",
            })}
          />
          <YAxis
            yAxisId="right"
            {...YAxisOptions({
              orientation: "right",
              title: "trend line",
            })}
          />
          {/* <YAxis
            yAxisId="right"
            {...YAxisOptions({
              orientation: "right",
              title: "Funding speed [€ / day]",
            })}
          /> */}
          <Tooltip content={CustomTooltip} />
          <Legend content={CustomLegend} />
          {orgIds.map((orgId, i) => (
            <Bar
              key={`${orgId}_amountTotal`}
              dataKey={`${orgId}_amountTotal`}
              yAxisId="left"
              stackId="a"
              name={`${
                data.find((item) => item.organizationId === orgId)?.organization
                  .name
              } - total`}
              fill={`var(--chart-${i + 1}-50)`}
              stroke={`var(--chart-${i + 1})`}
              opacity={0.8}
            />
          ))}
          {orgIds.map((orgId, i) => (
            <Line
              key={`${orgId}_trendAmount`}
              dataKey={`${orgId}_trendAmount`}
              yAxisId="right"
              name={`${
                data.find((item) => item.organizationId === orgId)?.organization
                  .name
              } - trend line`}
              stroke={`var(--chart-${i + 1})`}
              strokeWidth={2.5}
              strokeDasharray="3 5"
              fill={`var(--chart-${i + 1})`}
              type="monotone"
              connectNulls
            ></Line>
          ))}
          {/* {orgIds.map((orgId, i) => (
            <Line
              key={`${orgId}_fundingSpeed`}
              dataKey={`${orgId}_fundingSpeed`}
              yAxisId="right"
              name={`${
                data.find((item) => item.organizationId === orgId)?.organization
                  .name
              } - funding speed`}
              stroke={`var(--chart-${i + 1})`}
              strokeWidth={2.5}
              strokeDasharray="3 5"
              fill={`var(--chart-${i + 1})`}
              type="monotone"
              connectNulls
            ></Line>
          ))} */}
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
