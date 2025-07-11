import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChartElementMapping } from "@/pages/dashboard/charts/config";
import { useEffect, useMemo, useRef, useState } from "react";

import useApi from "@/hooks/useApi";
import { toCamelCase } from "@/lib/utils";
import useDashboardStore from "@/store/dashboard-store";
import clsx from "clsx";
import html2canvas from "html2canvas";
import { ChartArea, ChartColumnIncreasing, ChartLine, Image, Loader2, Maximize2, Radar, Save, UploadIcon } from "lucide-react";
import { toast } from "sonner";
import useUserInfoStore from "@/store/user-info-store";

const Upload = ({ fullScreen, defaultParsedFile = null }) => {
    const [file, setFile] = useState(null);
    const [xAxis, setXAxis] = useState();
    const [yAxis, setYAxis] = useState();
    const [chartType, setChartType] = useState(null);
    const [chartSubType, setChartSubType] = useState("");
    const { uploadFile, loading, saveChart, getCharts, getFiles } = useDashboardStore();

    const { request } = useApi();
    const [parsedData, setParsedData] = useState([]);
    const [color, setColor] = useState("#e4716f")
    const [downloadLoading, setDownloadLoading] = useState(
        {
            "pdf": false,
            "image": false
        }
    )
    const [chartName, setChartName] = useState(`Chart - ${Date.now()}`)
    const [fileId, setFileId] = useState("")
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [filename, setFilename] = useState("")
    const printRef = useRef(null)

    const [showPicker, setShowPicker] = useState(false)
    const pickerRef = useRef(null)

    const { setDefaultParsedFile } = useUserInfoStore()

    useEffect(
        () => { console.log("chartType", chartType) }, [chartType]
    )

    useEffect(() => {
        if (defaultParsedFile?.parsed?.length > 0) {
            setParsedData(defaultParsedFile.parsed);
            setIsFileUploaded(true);
            setFilename(defaultParsedFile.filename);
            setFileId(defaultParsedFile.id);
        }
    }, [defaultParsedFile]);



    // const result = {
    //     "success": true,
    //     "message": "File uploaded and parsed successfully.",
    //     "file": {
    //         "parsed": [
    //             {
    //                 "Month": "Jan",
    //                 "Region": "East",
    //                 "SalesPerson": "Eva",
    //                 "Product": "Smartwatch",
    //                 "Units Sold": 150,
    //                 "Unit Price": 250,
    //                 "Total Revenue": 37500,
    //                 "Profit Margin (%)": 15,
    //                 "Profit": 5625,
    //                 "Units Returned": 7,
    //                 "Customer Rating": 4.2,
    //                 "Sales Channel": "Offline"
    //             },
    //             {
    //                 "Month": "Feb",
    //                 "Region": "West",
    //                 "SalesPerson": "Frank",
    //                 "Product": "Laptop",
    //                 "Units Sold": 85,
    //                 "Unit Price": 900,
    //                 "Total Revenue": 76500,
    //                 "Profit Margin (%)": 20,
    //                 "Profit": 15300,
    //                 "Units Returned": 2,
    //                 "Customer Rating": 4.6,
    //                 "Sales Channel": "Online"
    //             },
    //             {
    //                 "Month": "Mar",
    //                 "Region": "North",
    //                 "SalesPerson": "Grace",
    //                 "Product": "Tablet",
    //                 "Units Sold": 110,
    //                 "Unit Price": 420,
    //                 "Total Revenue": 46200,
    //                 "Profit Margin (%)": 17,
    //                 "Profit": 7854,
    //                 "Units Returned": 3,
    //                 "Customer Rating": 4.5,
    //                 "Sales Channel": "Offline"
    //             },
    //             {
    //                 "Month": "Apr",
    //                 "Region": "South",
    //                 "SalesPerson": "Henry",
    //                 "Product": "Phone",
    //                 "Units Sold": 190,
    //                 "Unit Price": 550,
    //                 "Total Revenue": 104500,
    //                 "Profit Margin (%)": 28,
    //                 "Profit": 29260,
    //                 "Units Returned": 5,
    //                 "Customer Rating": 4.8,
    //                 "Sales Channel": "Online"
    //             },
    //             {
    //                 "Month": "May",
    //                 "Region": "North",
    //                 "SalesPerson": "Ivy",
    //                 "Product": "Laptop",
    //                 "Units Sold": 120,
    //                 "Unit Price": 880,
    //                 "Total Revenue": 105600,
    //                 "Profit Margin (%)": 22,
    //                 "Profit": 23232,
    //                 "Units Returned": 4,
    //                 "Customer Rating": 4.7,
    //                 "Sales Channel": "Offline"
    //             },
    //             {
    //                 "Month": "Jun",
    //                 "Region": "East",
    //                 "SalesPerson": "Jack",
    //                 "Product": "Smartwatch",
    //                 "Units Sold": 140,
    //                 "Unit Price": 260,
    //                 "Total Revenue": 36400,
    //                 "Profit Margin (%)": 14,
    //                 "Profit": 5096,
    //                 "Units Returned": 6,
    //                 "Customer Rating": 4.3,
    //                 "Sales Channel": "Online"
    //             },
    //             {
    //                 "Month": "Jul",
    //                 "Region": "South",
    //                 "SalesPerson": "Karen",
    //                 "Product": "Tablet",
    //                 "Units Sold": 100,
    //                 "Unit Price": 430,
    //                 "Total Revenue": 43000,
    //                 "Profit Margin (%)": 18,
    //                 "Profit": 7740,
    //                 "Units Returned": 3,
    //                 "Customer Rating": 4.6,
    //                 "Sales Channel": "Offline"
    //             },
    //             {
    //                 "Month": "Aug",
    //                 "Region": "West",
    //                 "SalesPerson": "Leo",
    //                 "Product": "Phone",
    //                 "Units Sold": 210,
    //                 "Unit Price": 580,
    //                 "Total Revenue": 121800,
    //                 "Profit Margin (%)": 29,
    //                 "Profit": 35322,
    //                 "Units Returned": 5,
    //                 "Customer Rating": 4.4,
    //                 "Sales Channel": "Online"
    //             },
    //             {
    //                 "Month": "Sep",
    //                 "Region": "North",
    //                 "SalesPerson": "Mia",
    //                 "Product": "Smartwatch",
    //                 "Units Sold": 160,
    //                 "Unit Price": 270,
    //                 "Total Revenue": 43200,
    //                 "Profit Margin (%)": 16,
    //                 "Profit": 6912,
    //                 "Units Returned": 4,
    //                 "Customer Rating": 4.1,
    //                 "Sales Channel": "Offline"
    //             },
    //             {
    //                 "Month": "Oct",
    //                 "Region": "East",
    //                 "SalesPerson": "Nathan",
    //                 "Product": "Laptop",
    //                 "Units Sold": 95,
    //                 "Unit Price": 910,
    //                 "Total Revenue": 86450,
    //                 "Profit Margin (%)": 21,
    //                 "Profit": 18154.5,
    //                 "Units Returned": 2,
    //                 "Customer Rating": 4.9,
    //                 "Sales Channel": "Online"
    //             },
    //             {
    //                 "Month": "Nov",
    //                 "Region": "South",
    //                 "SalesPerson": "Olivia",
    //                 "Product": "Tablet",
    //                 "Units Sold": 105,
    //                 "Unit Price": 450,
    //                 "Total Revenue": 47250,
    //                 "Profit Margin (%)": 19,
    //                 "Profit": 8977.5,
    //                 "Units Returned": 3,
    //                 "Customer Rating": 4.5,
    //                 "Sales Channel": "Offline"
    //             },
    //             {
    //                 "Month": "Dec",
    //                 "Region": "West",
    //                 "SalesPerson": "Paul",
    //                 "Product": "Phone",
    //                 "Units Sold": 230,
    //                 "Unit Price": 590,
    //                 "Total Revenue": 135700,
    //                 "Profit Margin (%)": 30,
    //                 "Profit": 40710,
    //                 "Units Returned": 6,
    //                 "Customer Rating": 4.7,
    //                 "Sales Channel": "Online"
    //             }
    //         ]

    //     }
    // };


    // useEffect(() => {
    //     if (result?.file?.parsed?.length > 0) {
    //         setParsedData(result.file.parsed);
    //     }
    // }, []);


    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        const result = await request(() => uploadFile(formData));
        if (result?.file?.parsed?.length > 0) {
            setParsedData(result.file.parsed);
            setIsFileUploaded(true);
            setFilename(result?.file?.filename)
            setFileId(result?.file?._id)

            await getFiles(1, 5, true)

        }
    };

    // GPT 🙏 
    const aggregateData = (data, xAxis, yAxis) => {
        // Check if the data should be aggregated
        const isNonUniqueXAxis = new Set(data.map(item => item[xAxis])).size !== data.length;

        if (isNonUniqueXAxis) {
            // Aggregate data by xAxis
            const aggregated = data.reduce((acc, row) => {
                const xValue = row[xAxis];
                if (!acc[xValue]) {
                    acc[xValue] = { [xAxis]: xValue };  // Start with xValue
                }
                // Add up numeric fields
                acc[xValue][yAxis] = (acc[xValue][yAxis] || 0) + row[yAxis];
                return acc;
            }, {});

            return Object.values(aggregated); // Return aggregated data as an array
        }

        return data;
    };

    const generateChartData = () => {
        if (!xAxis || !yAxis || parsedData.length === 0) return [];
        return aggregateData(parsedData, xAxis, yAxis).map((row) => ({
            [toCamelCase(xAxis)]: row[xAxis],
            [toCamelCase(yAxis)]: row[yAxis],
        }));
    };


    const generateChartConfig = () => {
        if (!parsedData.length) return {};

        const chartConfig = {
            [toCamelCase(yAxis)]: {
                label: yAxis,
                color: "#e4716f"
            }
        };

        return chartConfig;
    };

    const chartSectionDisabled = !isFileUploaded;


    const chartSelect = {
        area: {
            label: "Area",
            subtypes: ["natural", "linear", "step"],
            icon: <ChartArea />,
            description: "Displays cumulative totals with the area filled."
        },
        bar: {
            label: "Bar",
            subtypes: ["vertical", "horizontal"],
            icon: <ChartColumnIncreasing />,
            description: "Compares quantities across categories."
        },
        line: {
            label: "Line",
            subtypes: ["natural", "linear", "step"],
            icon: <ChartLine />,
            description: "Shows trends over time."
        },
        radar: {
            label: "Radar",
            subtypes: ["grid", "no-grid"],
            icon: <Radar />,
            description: "Shows strengths/weaknesses of multiple variables."
        }
    };

    useEffect(() => {
        if (chartType && chartSelect[chartType]?.subtypes?.length > 0) {
            console.log(chartSelect[chartType].subtypes[0])
            setChartSubType(chartSelect[chartType].subtypes[0]);
        }
    }, [chartType]);




    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) {
            return;
        }

        setDownloadLoading((prev) => ({ ...prev, "pdf": true }));

        const canvas = await html2canvas(element);
        const dataURL = canvas.toDataURL("image/png")
        const link = document.createElement('a');
        console.log(dataURL)
        link.href = dataURL;
        link.download = 'chart-preview.png';
        link.click();
    }

    const handleDownloadImage = async () => {

        setDownloadLoading((prev) => ({ ...prev, "image": true }));

        const element = printRef.current;
        if (!element) {
            return;
        }

        const canvas = await html2canvas(element);
        const dataURL = canvas.toDataURL("image/png")
        const link = document.createElement('a');
        console.log(dataURL)
        link.href = dataURL;
        link.download = 'chart-preview.png';
        link.click();

        setDownloadLoading((prev) => ({ ...prev, "image": false }));
    }

    useEffect(
        () => { console.log("showPicker", showPicker) }, [showPicker]
    )

    const ChartDialogContent = () => {
        if (!xAxis || !yAxis || parsedData.length === 0) return;

        const config = generateChartConfig()
        const data = generateChartData()
        const xAxisDataKey = toCamelCase(xAxis)
        const yAxisDataKey = toCamelCase(yAxis)

        console.log("xAxisDataKey", xAxisDataKey)
        console.log("yAxisDataKey", yAxisDataKey)

        switch (chartType) {
            case "area":
                return ChartElementMapping.area(config, data, xAxisDataKey, chartSubType)
            case "bar":
                console.log("bar")
                switch (chartSubType) {
                    case "vertical":
                        return ChartElementMapping.barVertical(config, data, xAxisDataKey, yAxisDataKey)
                    case "horizontal":
                        return ChartElementMapping.barHorizontal(config, data, xAxisDataKey, yAxisDataKey)
                }
            case "line":
                return ChartElementMapping.line(config, data, xAxisDataKey, chartSubType)
            case "radar":
                return ChartElementMapping.radar(config, data, xAxisDataKey, chartSubType)
        }
    }

    const memoizedChartPreview = useMemo(() => {
        if (!isFileUploaded) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <UploadIcon className="h-12 w-12 mb-4" />
                    <p className="text-lg font-medium">Upload a file to get started</p>
                    <p className="text-sm">Select an Excel file and configure your chart</p>
                </div>
            );
        }

        if (!chartType) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <ChartArea className="h-12 w-12 mb-4" />
                    <p className="text-lg font-medium">Select a chart type to view chart</p>
                    <p className="text-sm">Choose from area, bar, line, or radar charts</p>
                </div>
            );
        }

        return <ChartDialogContent />;
    }, [isFileUploaded, chartType, chartSubType, xAxis, yAxis, parsedData]);


    const ChartPreviewContent = () => {
        if (!isFileUploaded) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <UploadIcon className="h-12 w-12 mb-4" />
                    <p className="text-lg font-medium">Upload a file to get started</p>
                    <p className="text-sm">Select an Excel file and configure your chart</p>
                </div>
            );
        }

        if (!chartType) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <ChartArea className="h-12 w-12 mb-4" />
                    <p className="text-lg font-medium">Select a chart type to view chart</p>
                    <p className="text-sm">Choose from area, bar, line, or radar charts</p>
                </div>
            );
        }

        return <ChartDialogContent />;
    };


    const handleChartSave = async () => {
        const chartData = generateChartData()
        const chartConfig = generateChartConfig()

        const xAxisDataKey = toCamelCase(xAxis)
        const yAxisDataKey = toCamelCase(yAxis)

        if (!chartName) {
            toast.error("Error ❌", {
                description: "Please enter a Chart name",
                action: {
                    label: "Close"
                }
            });
            return
        }

        await request(
            () => saveChart(fileId, chartType, chartSubType, chartName, chartData, chartConfig, xAxisDataKey, yAxisDataKey)
        )
        await getCharts(1, 5, true)
    }

    return (
        <>

            <div className={clsx("grid grid-cols-1 md:grid-cols-2 w-full", fullScreen && "mt-4 px-40"
            )}>

                <div className={clsx("border-r border-b p-4", fullScreen && "border-l border-t")}>
                    {!defaultParsedFile && <div>
                        <div className="p-2 space-y-4">
                            <Label htmlFor="file">Upload Excel File (.xlsx)</Label>
                            <div className="flex flex-row gap-2 w-full">
                                <Input
                                    id="file"
                                    type="file"
                                    accept=".xlsx"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="basis-3/4"
                                />
                                <Button
                                    onClick={handleUpload}
                                    disabled={!file}
                                    className="basis-1/4 flex justify-center"
                                >
                                    {loading.upload ? <Loader2 className="animate-spin" /> : "Upload"}

                                </Button>
                            </div>

                        </div>
                    </div>}


                    {defaultParsedFile && <div>
                        <div className="p-2 space-y-4">
                            <div className="flex flex-row gap-2 w-full">
                                <p className="text-sm font-medium">{defaultParsedFile?.filename}</p>
                                <Button
                                    onClick={() => setDefaultParsedFile(null)}
                                    className="basis-1/4 flex justify-center"
                                >
                                    Go Back

                                </Button>
                            </div>

                            <div className="flex flex-row gap-2 w-full">
                                <p className="text-sm text-muted-foreground font-medium">ID: {defaultParsedFile?.id}</p>
                            </div>

                        </div>
                    </div>}
                </div>


                <div className={clsx("border-b p-4", fullScreen && "border-t border-r", chartSectionDisabled && "opacity-50")}>
                    <div className="p-2 space-y-4">
                        <p className="font-medium text-sm">Select X and Y axis</p>

                        <div className="flex flex-row gap-3">
                            <Select onValueChange={setXAxis} disabled={chartSectionDisabled}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select X-Axis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Rows</SelectLabel>
                                        {
                                            parsedData.length > 0 && Object.keys(parsedData[0]).map((key) => {
                                                const isNumeric = typeof parsedData[0][key] === "number";
                                                return (
                                                    <SelectItem key={key} value={key} disabled={isNumeric}>
                                                        {key}
                                                    </SelectItem>
                                                );
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={setYAxis} disabled={chartSectionDisabled}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Y-Axis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Columns</SelectLabel>
                                        {
                                            parsedData.length > 0 && Object.keys(parsedData[0]).map((key) => {
                                                const isNumeric = typeof parsedData[0][key] === "number";
                                                return (
                                                    <SelectItem key={key} value={key} disabled={!isNumeric}>
                                                        {key}
                                                    </SelectItem>
                                                );
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx("grid grid-cols-1 md:grid-cols-[2fr_3fr] w-full", fullScreen && "mb-8 px-40"
            )}>
                <div className={clsx("border-r border-b", fullScreen && "border-l", chartSectionDisabled && "opacity-50")}>
                    <div className="p-4 border-b items-center">
                        <p className="ml-2 mt-0 text-sm font-medium">Chart Type</p>
                    </div>
                    <div className="grid grid-cols-2">
                        {Object.keys(chartSelect).map((type, index) => {
                            const borderMapping = {
                                0: "border-r",
                                1: "border-b",
                                2: "border-r",
                                3: "border-r"
                            }
                            return (
                                <div
                                    className={clsx(
                                        "p-4 cursor-pointer border-b",
                                        borderMapping[index],
                                        chartType === type && "bg-muted",
                                        !chartSectionDisabled && "hover:bg-muted",
                                        chartSectionDisabled && "cursor-not-allowed"
                                    )}
                                    key={type}
                                    onClick={() => !chartSectionDisabled && setChartType(type)}
                                >
                                    <div className="flex space-x-2">
                                        {chartSelect[type].icon}
                                        <p>{chartSelect[type].label}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">{chartSelect[type].description}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className={clsx("p-4 items-center flex space-x-2 justify-evenly", fullScreen && "border-b")}>
                        <p className="ml-2 mt-0 text-sm font-medium">Chart SubType</p>
                        {chartType && chartSelect[chartType].subtypes.length > 0 && (
                            <Select onValueChange={setChartSubType} className="basis-[60%]" disabled={chartSectionDisabled}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Chart SubType" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Chart SubTypes</SelectLabel>
                                        {chartSelect[chartType].subtypes.map((subtype) => (
                                            <SelectItem key={subtype} value={subtype}>
                                                {subtype.charAt(0).toUpperCase() + subtype.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    </div>




                </div>

                <div className={clsx("border-r border-b")}>
                    <div className="flex flex-col h-full">
                        <div className="border-b flex justify-end h-[52px]">
                            <Input
                                id="chartName"
                                type="text"
                                value={chartName}
                                autoComplete="off"
                                onChange={(e) => setChartName(e.target.value)}
                                className={clsx("mt-2 ml-2 mr-2", chartSectionDisabled && "opacity-50 cursor-not-allowed")}
                                placeholder="Enter Chart name"
                            >
                            </Input>
                            {/* <div className={clsx(
                                "border-l p-3 cursor-pointer hover:bg-muted flex items-center",
                               
                            )}>
                                <div
                                    className={clsx(
                                        "w-6 h-6 rounded-full border border-gray-300 cursor-pointer",
                                        chartSectionDisabled && "opacity-50 cursor-not-allowed"
                                    )}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setShowPicker((prev) => !prev)}
                                ></div>

                                {showPicker && !chartSectionDisabled && <div
                                    ref={pickerRef}
                                    className="absolute bottom-[120px] right-40 z-5 shadow-lg bg-white border rounded-md p-2"
                                >
                                    <HexColorPicker color={color} onChange={setColor} />
                                </div>}

                            </div> */}


                            <div className={clsx(
                                "border-l p-3 cursor-pointer hover:bg-muted flex items-center",
                                !isFileUploaded && "opacity-50 cursor-not-allowed hover:bg-transparent"
                            )}>

                                {loading.chartSave ? <Loader2 className="h-4 w-4 animate-spin" /> :
                                    <Save className="h-4 w-4" onClick={handleChartSave} />
                                }
                            </div>

                            <div
                                onClick={isFileUploaded ? handleDownloadImage : undefined}
                                className={clsx(
                                    "border-l p-3 pl-4 cursor-pointer hover:bg-muted flex items-center",
                                    !isFileUploaded && "opacity-50 cursor-not-allowed hover:bg-transparent"
                                )}
                            >
                                {downloadLoading.image ? <Loader2 className="h-4 w-4" /> : <Image className="h-4 w-4" />}
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className={clsx(
                                        "border-l p-3 pl-4 cursor-pointer hover:bg-muted flex items-center",
                                        !isFileUploaded && "opacity-50 cursor-not-allowed hover:bg-transparent"
                                    )}>
                                        <Maximize2 className="h-4 w-4" />
                                    </div>
                                </DialogTrigger>

                                <DialogContent className="sm:max-w-[800px]">
                                    <DialogHeader className="flex justify-between items-start">
                                        <div>
                                            <DialogTitle>Chart Preview</DialogTitle>
                                            {JSON.stringify(generateChartConfig())}
                                            {JSON.stringify(generateChartData())}

                                            <DialogDescription>
                                                {filename}
                                            </DialogDescription>
                                        </div>
                                    </DialogHeader>
                                    <div ref={printRef}>
                                        <ChartDialogContent />
                                    </div>
                                    <DialogFooter />
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="flex-grow p-3" ref={printRef}>
                            {memoizedChartPreview}
                        </div>
                    </div>
                </div>



            </div>


        </>

    );
};

export default Upload;
