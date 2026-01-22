"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

export const description = "A radial chart with a custom shape";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartRadial({ total }: { total: number }) {
  const chartData = [
    { browser: "safari", visitors: total ?? 0, fill: "var(--color-safari)" },
  ];
  return (
    <Card className="flex h-64 flex-col overflow-hidden">
      {/* Header */}
      <CardHeader className="items-center pb-1 pt-3">
        <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
        <CardDescription className="text-xs">Last 30 days</CardDescription>
      </CardHeader>

      {/* Chart */}
      <CardContent className="flex flex-1 min-h-0 items-center justify-center p-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-35"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius={52}
            outerRadius={82}
          >
            {/* Background circles */}
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[56, 46]}
            />

            {/* Progress bar */}
            <RadialBar dataKey="visitors" background cornerRadius={10} />

            {/* Center label */}
            <PolarRadiusAxis tick={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null;

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan className="fill-foreground text-xl font-bold">
                        {chartData[0].visitors}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 18}
                        className="fill-muted-foreground text-xs"
                      >
                        Accuracy
                      </tspan>
                    </text>
                  );
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      {/* Footer
      <CardFooter className="flex flex-col gap-1 pb-3 pt-1 text-xs">
        <div className="flex items-center gap-1 font-medium">
          +5.2% improvement <TrendingUp className="h-3 w-3" />
        </div>
        <div className="text-muted-foreground">Compared to last month</div>
      </CardFooter> */}
    </Card>
  );
}
