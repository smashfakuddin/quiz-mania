"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

export const description = "A mixed bar chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  total: {
    label: "Total",
    color: "#2563EB",
  },
  right: {
    label: "Right Answer",
    color: "#16A34A",
  },
  wrong: {
    label: "Wrong Answer",
    color: "#DC2626",
  },
} satisfies ChartConfig;

type ChartBarProps = {
  total: number;
  right: number;
  wrong: number;
};
export function ChartBar({ total, right, wrong }: ChartBarProps) {
  const chartData = [
    { type: "total", total: total ?? 0, fill: "var(--color-total)" },
    { type: "right", total: right ?? 0, fill: "var(--color-right)" },
    { type: "wrong", total: wrong ?? 0, fill: "var(--color-wrong)" },
  ];
  return (
    <Card className="flex h-64 flex-col overflow-hidden">
      {/* Header */}
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-sm font-medium">Answer Breakdown</CardTitle>
        <CardDescription className="text-xs">Last 30 days</CardDescription>
      </CardHeader>

      {/* Chart */}
      <CardContent className="flex flex-1 min-h-0 items-center justify-center p-2">
        <ChartContainer config={chartConfig} className="w-full h-35">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0, right: 12, top: 4, bottom: 4 }}
          >
            <YAxis
              dataKey="type"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total" layout="vertical" radius={6} />
          </BarChart>
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
