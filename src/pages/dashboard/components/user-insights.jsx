import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUserStatsStore from "@/store/use-user-stats-store";
import { ChartPie, Loader2, User } from "lucide-react";
import { useEffect } from "react";
import { Pie, PieChart } from "recharts";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  google: {
    label: "Google",
    color: "var(--chart-1)",
  },
  github: {
    label: "GitHub",
    color: "var(--chart-2)",
  },
  email: {
    label: "Email",
    color: "var(--chart-3)",
  },
};

const UserInsights = () => {
  const { stats, loading, getStats } = useUserStatsStore();

  useEffect(() => {
    getStats();
  }, []);

  // if (loading || !stats) {
  //   return (
  //     <div className="flex justify-center items-center h-[300px]">
  //       <Loader2 className="animate-spin h-8 w-8" />
  //     </div>
  //   );
  // }

  const userStats = [
    {
      label: "Verified Users",
      count: stats?.verified,
    },
    {
      label: "Unverified Users",
      count: stats?.unverified,
    },
    {
      label: "Email Login",
      count: stats?.email,
    },
    {
      label: "Google Login",
      count: stats?.google,
    },
    {
      label: "Github Login",
      count: stats?.github,
    },
  ];

  const loginChartData = [
    {
      accountType: "email",
      visitors: stats?.email,
      fill: "var(--chart-3)",
    },
    {
      accountType: "github",
      visitors: stats?.github,
      fill: "var(--chart-2)",
    },
    {
      accountType: "google",
      visitors: stats?.google,
      fill: "var(--chart-1)",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left: User Stats */}
      <div className="md:w-1/2 w-full p-4">
        <div className="flex flex-row items-center justify-center gap-2 text-md font-medium mb-4">
          <p className="font-medium">User Stats</p>
          <User className="h-4 w-4" />
        </div>

        <Table>
          <TableCaption>A breakdown of all user status.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {loading ? Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-5 w-48 ml-auto" />
                </TableCell>
              </TableRow>
            )) : userStats.map((item) => (
              <TableRow key={item.label}>
                <TableCell className="font-medium">{item.label}</TableCell>
                <TableCell className="text-right">{item.count}</TableCell>
              </TableRow>
            ))
            }

          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-semibold">Total</TableCell>
              <TableCell className="text-right font-semibold">
                {stats?.total}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Right: Login Method Chart */}
      <div className="md:w-1/2 w-full p-4">
        <div className="flex flex-row items-center justify-center gap-2 text-md font-medium mb-4">
          <p className="font-medium">Login Method Distribution</p>
          <ChartPie className="h-4 w-4" />
        </div>




        {loading ? <div className="flex flex-col items-center justify-center gap-6 mt-6">
          <Skeleton className="h-[180px] w-[180px] rounded-full" />
          <div className="flex flex-row gap-3 mt-2">
            <Skeleton className="h-4 w-14 rounded-sm" />
            <Skeleton className="h-4 w-14 rounded-sm" />
            <Skeleton className="h-4 w-14 rounded-sm" />
          </div>
        </div> : <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={loginChartData}
              dataKey="visitors"
              nameKey="accountType"
              innerRadius={60}
              strokeWidth={5}
              label
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="accountType" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>}


        <div className="mt-6 text-center text-sm">
          <div className="font-medium">User Login Breakdown</div>
          <div className="text-muted-foreground">
            Based on all-time user authentication data
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInsights;
