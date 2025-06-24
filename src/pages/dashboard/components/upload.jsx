import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import useApi from "@/hooks/useApi";
import useFilesStore from "@/store/user-files-store";
import { Loader2 } from "lucide-react";
import AreaChart from "@/pages/dashboard/charts/area-chart"
import clsx from "clsx";

const Upload = ({fullScreen}) => {
    const [file, setFile] = useState(null);
    const [headers, setHeaders] = useState([]);
    const [xAxis, setXAxis] = useState();
    const [yAxis, setYAxis] = useState();
    const [chartType, setChartType] = useState();
    const { uploadFile, loading } = useFilesStore();
    const { request } = useApi();
    const [parsedData, setParsedData] = useState([])


    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const result = await request(() => uploadFile(formData));

        if (result?.file?.parsed?.length > 0) {
            const parsed = result.file.parsed;
            const sampleRow = parsed[0];
            setHeaders(Object.keys(sampleRow));
            setParsedData(parsed);
        }
    };

    const selectedOutput = () => {
        if (!xAxis || !yAxis || parsedData.length === 0) return [];
        return parsedData.map((row) => ({
            [xAxis]: row[xAxis],
            [yAxis]: row[yAxis],
        }));
    };





    const chartSectionDisabled = headers.length === 0;

    // return <div className="flex flex-1 items-center justify-center text-muted-foreground px-4">
    //     Under Construction 🚧
    // </div>

    return (
        <div className={clsx("flex flex-col md:flex-row", fullScreen && "mt-8 px-40")}>

            <div className="w-full md:w-1/2 p-4">
                <Card className="p-6 space-y-4">
                    <Label htmlFor="file">Upload Excel File (.xlsx)</Label>
                    <Input
                        id="file"
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <Button onClick={handleUpload} disabled={!file}>
                        {loading ? <Loader2 className="animate-spin" /> : "Upload"}
                    </Button>
                </Card>
            </div>


            <div className="w-full md:w-1/2 p-4">
                <Card className="p-6 space-y-4 opacity-100 transition-opacity duration-300" style={{ opacity: chartSectionDisabled ? 0.5 : 1, pointerEvents: chartSectionDisabled ? "none" : "auto" }}>
                    <Label>Select X and Y axis</Label>
                    <div className="flex gap-2">
                        <Select onValueChange={setXAxis}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select X-Axis" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Columns</SelectLabel>
                                    {headers.map((header) => (
                                        <SelectItem key={header} value={header}>
                                            {header}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select onValueChange={setYAxis}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Y-Axis" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Columns</SelectLabel>
                                    {headers.map((header) => (
                                        <SelectItem key={header} value={header}>
                                            {header}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2 items-center">
                        <Select onValueChange={setChartType}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Chart Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Chart Types</SelectLabel>
                                    <SelectItem value="area">Area</SelectItem>
                                    <SelectItem value="bar">Bar</SelectItem>
                                    <SelectItem value="line">Line</SelectItem>
                                    <SelectItem value="pie">Pie</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button disabled={!xAxis || !yAxis || !chartType}>
                                    Create Chart
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>Demo...</DialogTitle>
                                    <DialogDescription>
                                        Chart configuration preview
                                    </DialogDescription>
                                </DialogHeader>
                                {/* <pre className="bg-muted p-4 rounded text-sm">
                                    {JSON.stringify(selectedOutput(), null, 2)}
                                </pre> */}
                                <AreaChart
                                    chartData={selectedOutput()}
                                />
                                <DialogFooter />
                            </DialogContent>
                        </Dialog>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Upload;
