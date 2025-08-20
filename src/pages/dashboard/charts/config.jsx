import { Area, AreaChart, Bar, BarChart, Line, LineChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart"

export const ChartElementMapping = {
    area: (config, data, xAxisDataKey, type = "linear") => {

        return (
            <ChartContainer config={config}>
                <AreaChart
                    accessibilityLayer
                    data={data}
                    margin={{
                        top: 14,
                        right: 20,
                    }}
                >
                    <CartesianGrid vertical={true} />

                    <XAxis
                        dataKey={xAxisDataKey}
                        tickLine={true}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickCount={6}
                    />
                    {Object.entries(config).map(([key, value]) => (
                        <Area
                            key={key}
                            dataKey={key}
                            type={type}
                            fill={value.color}
                            fillOpacity={0.4}
                            stroke={value.color}
                        />
                    ))}
                    <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
            </ChartContainer>
        );
    },
    barHorizontal: (config, data, xAxisDataKey, yAxisDataKey) => {
        return (
            <ChartContainer config={config}>

                <BarChart
                    accessibilityLayer
                    data={data}
                    layout="vertical"
                    margin={{
                        left: -20,
                    }}
                >
                    <CartesianGrid vertical={true} />
                    <XAxis type="number" dataKey={yAxisDataKey} hide />
                    <YAxis
                        dataKey={xAxisDataKey}
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />

                    {Object.entries(config).map(([key, value]) => (
                        <Bar key={key}
                            dataKey={key} fill={value.color} radius={5} />

                    ))}
                    <ChartLegend content={<ChartLegendContent />} />

                </BarChart>
            </ChartContainer>
        )
    },
    barVertical: (config, data, xAxisDataKey, yAxisDataKey) => {

        console.log("xAxisDataKey", xAxisDataKey, "yAxisDataKey", yAxisDataKey)
        console.log(data)
        return (
            <ChartContainer config={config}>

                <BarChart
                    accessibilityLayer
                    data={data}
                >
                    <CartesianGrid vertical={true} />
                    <XAxis
                        dataKey={xAxisDataKey}
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />


                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />

                    {Object.entries(config).map(([key, value]) => (

                        <Bar key={key}
                            dataKey={key} fill={value.color} radius={5} />

                    ))}
                    <ChartLegend content={<ChartLegendContent />} />

                </BarChart>
            </ChartContainer>
        )
    },
    line: (config, data, xAxisDataKey, type = "linear") => {

        return (
            <ChartContainer config={config}>
                <LineChart
                    accessibilityLayer
                    data={data}
                    margin={{
                        top: 14,
                        right: 20,
                    }}
                >
                    <CartesianGrid vertical={true} />
                    <XAxis
                        dataKey={xAxisDataKey}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />

                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickCount={6}
                    />
                    {Object.entries(config).map(([key, value]) => (
                        <Line
                            dataKey={key}
                            type={type}
                            stroke={value.color}
                            strokeWidth={2}
                            dot={true}
                        />
                    ))}
                    <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
            </ChartContainer>
        );
    },
    radar: (config, data, xAxisDataKey, type = "grid") => {
        return (
            <ChartContainer
                config={config}
                className="mx-auto aspect-square max-h-[250px]"
            >
                <RadarChart data={data}>


                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <PolarAngleAxis dataKey={xAxisDataKey} />
                    {type === "grid" && <PolarGrid />}

                    {Object.entries(config).map(([key, value]) => (
                        <Radar
                            dataKey={key}
                            fill={value.color}
                            fillOpacity={0.6}
                            dot={{
                                r: 4,
                                fillOpacity: 1,
                            }}
                        />

                    ))}
                    <ChartLegend content={<ChartLegendContent />} />
                </RadarChart>
            </ChartContainer>
        );
    }
};
