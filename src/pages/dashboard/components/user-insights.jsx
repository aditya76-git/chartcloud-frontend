import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

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
import useDashboardStore from "@/store/dashboard-store";
import useUserInfoStore from "@/store/user-info-store";
import clsx from "clsx";
import { ChartPie, User } from "lucide-react";
import { useEffect } from "react";
import { Pie, PieChart } from "recharts";
import translations from "@/lib/translations";
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

const UserInsights = ({ fullScreen }) => {
  const { userStats, loading, getUserStats } = useDashboardStore();
  const { language } = useUserInfoStore()


  useEffect(() => {
    getUserStats();
  }, []);

  // if (loading.userStats || !stats) {
  //   return (
  //     <div className="flex justify-center items-center h-[300px]">
  //       <Loader2 className="animate-spin h-8 w-8" />
  //     </div>
  //   );
  // }

  const userStatsList = [
    {
      label: translations?.insights?.stats?.verified[language],
      count: userStats?.verified,
    },
    {
      label: translations?.insights?.stats?.unverified[language],
      count: userStats?.unverified,
    },
    {
      label: translations?.insights?.stats?.email[language],
      count: userStats?.email,
    },
    {
      label: translations?.insights?.stats?.google[language],
      count: userStats?.google,
    },
    {
      label: translations?.insights?.stats?.github[language],
      count: userStats?.github,
    },
  ];

  const loginChartData = [
    {
      accountType: "email",
      visitors: userStats?.email,
      fill: "var(--chart-3)",
    },
    {
      accountType: "github",
      visitors: userStats?.github,
      fill: "var(--chart-2)",
    },
    {
      accountType: "google",
      visitors: userStats?.google,
      fill: "var(--chart-1)",
    },
  ];

  return (
    <div className={clsx("flex flex-col md:flex-row", fullScreen && "mt-8 px-40")}>

      <div className="md:w-1/2 w-full p-4">


        <div className="flex flex-row items-center justify-start gap-2 text-md font-medium mb-4 ml-2">
          <p className="font-medium">{translations?.insights?.header?.left[language]}</p>
          <User className="h-4 w-4" />
        </div>


        <div className="rounded-md border">

          <Table>
            <TableCaption className="mb-4">{translations?.insights?.footer?.left?.title[language]}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

              {loading.userStats ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-48 ml-auto" />
                  </TableCell>
                </TableRow>
              )) : userStatsList.map((item) => (
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
                  {userStats?.total}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

        </div>
      </div>

      <div className="md:w-1/2 w-full p-4">



        <div className="flex flex-row items-center justify-center gap-2 text-md font-medium mb-4">
          <p className="font-medium">{translations?.insights?.header?.right[language]}</p>
          <ChartPie className="h-4 w-4" />
        </div>




        {loading.userStats ? <div className="flex flex-col items-center justify-center gap-6 mt-6">
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
          <div className="font-medium">{translations?.insights?.footer?.right?.title[language]}</div>
          <div className="text-muted-foreground">
            {translations?.insights?.footer?.right?.subtitle[language]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInsights;
