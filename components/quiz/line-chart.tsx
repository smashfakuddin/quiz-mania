"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A line chart";

const chartData = [
  { month: "January", total: 186 },
  { month: "February", total: 305 },
  { month: "March", total: 237 },
  { month: "April", total: 73 },
  { month: "May", total: 209 },
  { month: "June", total: 214 },
];
type ChartDataItem = {
  month: string;
  total: number;
};
type ChartDataProps = ChartDataItem[];
const chartConfig = {
  total: {
    label: "Accuracy",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartLine({ chartData }: { chartData: ChartDataProps }) {
  return (
    <Card className="flex h-64 flex-col overflow-hidden flex-1">
      {/* Header */}
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-sm font-medium">Performance Trend</CardTitle>
        <CardDescription className="text-xs">Last 6 months</CardDescription>
      </CardHeader>

      {/* Chart */}
      <CardContent className="flex flex-1 min-h-0 items-center justify-center p-2">
        <ChartContainer config={chartConfig} className="w-full h-35">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12, top: 4, bottom: 4 }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Line
              dataKey="total"
              type="natural"
              stroke="var(--color-total)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      {/* Footer */}
      {/* <CardFooter className="flex flex-col gap-1 pb-3 pt-1 text-xs">
        <div className="flex items-center gap-1 font-medium">
          +5.2% improvement <TrendingUp className="h-3 w-3" />
        </div>
        <div className="text-muted-foreground">Compared to last month</div>
      </CardFooter> */}
    </Card>
  );
}
