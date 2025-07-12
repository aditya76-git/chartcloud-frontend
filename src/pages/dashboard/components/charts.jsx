import React, { useEffect, useState, useRef } from 'react';
import {
    Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import html2canvas from "html2canvas";
import {
    Card, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { File, FileText, Trash2, ChartLine, Download, Loader2, Columns2, Rows2, FileDigit, Archive } from 'lucide-react';

import useDashboardStore from "@/store/dashboard-store";
import useApi from "@/hooks/useApi";
import clsx from "clsx";
import { formatTime, camelToLabel, formatFileSize } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { ChartElementMapping } from '@/pages/dashboard/charts/config';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Charts = ({ fullScreen }) => {

    const { fileId } = useParams()
    const {
        byPage,
        getCharts,
        deleteChart,
        pagination,
        loading,
        error,
        response
    } = useDashboardStore();
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedChart, setSelectedChart] = useState({});
    const { request } = useApi();
    const printRef = useRef(null);

    const charts = byPage.charts[currentPage] || [];
    const { total, totalPages = 1 } = pagination.charts || {};

    const isValidObjectId = (id) => {
        return /^[a-fA-F0-9]{24}$/.test(id);
    };


    useEffect(() => {
        if (isValidObjectId(fileId) || location.pathname === "/dashboard") {
            request(() => getCharts(currentPage, 5, false, fileId));
        }
    }, [currentPage]);


    useEffect(() => {
        if (charts.length === 0) return;

        if (selectedChart?._id !== charts[0]?._id) {
            setSelectedChart(charts[0]);
        }
    }, [charts]);

    const [downloadLoading, setDownloadLoading] = useState({ pdf: false, image: false });

    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage >= totalPages;

    const handleDelete = async () => {
        await request(() => deleteChart(selectedChart._id, currentPage));
        setSelectedChart(charts[0]);
    };

    const handleDownloadImage = async () => {
        setDownloadLoading(prev => ({ ...prev, image: true }));
        const element = printRef.current;
        if (!element) return;

        const canvas = await html2canvas(element);
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'chart-preview.png';
        link.click();

        setDownloadLoading(prev => ({ ...prev, image: false }));
    };

    const ChartDialogContent = () => {
        const { config, data, type, subType, xAxisDataKey, yAxisDataKey } = selectedChart;

        switch (type) {
            case "area":
                return ChartElementMapping.area(config, data, xAxisDataKey, subType);
            case "bar":
                return subType === "vertical"
                    ? ChartElementMapping.barVertical(config, data, xAxisDataKey, yAxisDataKey)
                    : ChartElementMapping.barHorizontal(config, data, xAxisDataKey, yAxisDataKey);
            case "line":
                return ChartElementMapping.line(config, data, xAxisDataKey, subType);
            case "radar":
                return ChartElementMapping.radar(config, data, xAxisDataKey, subType);
            default:
                return null;
        }
    };


    if (error || (fileId && !isValidObjectId(fileId))) {
        return <div class="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div class="w-full space-y-6 text-center">
                <div class="space-y-3">
                    <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl">Oops! Lost in Cyberspace</h1>
                    <p class="text-gray-500">The file is either private or not avaialble</p>
                </div>
                <div class="space-x-4">
                    <a href="https://chartcloud.pages.dev" class="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300" target="_blank" rel="noopener noreferrer">Home</a>
                </div>
            </div>
        </div>
    }

    return (
        <div className={clsx(fullScreen && "md: mt-8 md:px-40")}>



            {fileId && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {loading.charts ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="w-full shadow-sm hover:shadow-md transition-all relative p-4 rounded-md border">
                                <Skeleton className="absolute top-5 right-5 h-6 w-6 text-muted-foreground" />
                                <div className="space-y-2 mt-6">
                                    <Skeleton className="h-4 w-2/3" />
                                    <Skeleton className="h-6 w-1/2" />
                                </div>
                            </div>
                        ))
                    ) : <>
                        <Card className="w-full shadow-sm hover:shadow-md transition-all relative">
                            <Rows2 className="absolute top-6 right-5 h-5 w-5 text-muted-foreground" />
                            <CardHeader className="space-y-1">
                                <CardDescription className="text-muted-foreground">Rows</CardDescription>
                                <CardTitle className="text-lg font-semibold">{response?.file?.rows}</CardTitle>
                            </CardHeader>
                        </Card>

                        <Card className="w-full shadow-sm hover:shadow-md transition-all relative">
                            <Columns2 className="absolute top-6 right-5 h-5 w-5 text-muted-foreground" />
                            <CardHeader className="space-y-1">
                                <CardDescription className="text-muted-foreground">Columns</CardDescription>
                                <CardTitle className="text-lg font-semibold">{response?.file?.columns}</CardTitle>
                            </CardHeader>
                        </Card>

                        <Card className="w-full shadow-sm hover:shadow-md transition-all relative">
                            <FileDigit className="absolute top-6 right-5 h-5 w-5 text-muted-foreground" />
                            <CardHeader className="space-y-1">
                                <CardDescription className="text-muted-foreground">Charts Count</CardDescription>
                                <CardTitle className="text-lg font-semibold">{total}</CardTitle>
                            </CardHeader>
                        </Card>

                        <Card className="w-full shadow-sm hover:shadow-md transition-all relative">
                            <Archive className="absolute top-6 right-5 h-5 w-5 text-muted-foreground" />
                            <CardHeader className="space-y-1">
                                <CardDescription className="text-muted-foreground">File Size</CardDescription>
                                <CardTitle className="text-lg font-semibold">{formatFileSize(response?.file?.fileSize)}</CardTitle>
                            </CardHeader>
                        </Card>
                    </>}
                </div>

            )}

            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-[50%] p-4">
                    <div className="flex flex-row items-center gap-2 text-md font-medium mb-4 ml-2">
                        <p className="font-medium">Charts</p>
                        <File className="h-4 w-4" />
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>File Name</TableHead>
                                    <TableHead className="text-right">Type</TableHead>
                                    <TableHead className="text-right">Created at</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading.charts
                                    ? Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-5 w-32 ml-auto" /></TableCell>
                                        </TableRow>
                                    ))
                                    : charts.map(chart => (
                                        <TableRow key={chart._id} onClick={() => setSelectedChart(chart)}>
                                            <TableCell className={clsx("cursor-pointer", selectedChart._id === chart._id && "bg-muted/50")}>
                                                {chart.name ?? "NA"}
                                            </TableCell>
                                            <TableCell className={clsx("text-right cursor-pointer", selectedChart._id === chart._id && "bg-muted/50")}>
                                                {String(chart.type).toUpperCase() ?? "NA"}
                                            </TableCell>
                                            <TableCell className={clsx("text-right cursor-pointer", selectedChart._id === chart._id && "bg-muted/50")}>
                                                {formatTime(new Date(chart.createdAt), {
                                                    year: "numeric", month: "long", day: "numeric",
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                            {/* <TableFooter>
                                <TableRow>
                                    <TableCell className="font-semibold">Total</TableCell>
                                    
                                    <TableCell className="text-right font-semibold">
                                        Current: {charts.length} / Total: {total}
                                    </TableCell>
                                </TableRow>
                            </TableFooter> */}
                        </Table>
                    </div>

                    <Pagination className="mt-4">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    className={clsx("cursor-pointer", prevDisabled && "pointer-events-none opacity-50")}
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        href="#"
                                        isActive={i + 1 === currentPage}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    className={clsx("cursor-pointer", nextDisabled && "pointer-events-none opacity-50")}
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

                <div className="w-full md:w-[50%] p-4">
                    <div className="flex flex-row items-center gap-2 text-md font-medium mb-4 ml-2">
                        <p className="font-medium">Chart Info</p>
                        <FileText className="h-4 w-4" />
                    </div>

                    {loading.charts ? (
                        <Card className="w-full max-w-4xl p-6 space-y-6">
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-60" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </Card>
                    ) : Object.keys(selectedChart).length > 0 && (
                        <Card className="w-full max-w-4xl">
                            <div className="p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                                        <div className="flex flex-col">
                                            <h2 className="text-md font-bold break-all">{selectedChart.name}</h2>
                                            <p className="text-md text-muted-foreground">{response?.file?.filename}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-muted-foreground">Created at</p>
                                        <p>{formatTime(new Date(selectedChart.createdAt), "en-GB")}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">X Axis</p>
                                        <p>{camelToLabel(selectedChart.xAxisDataKey)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Y Axis</p>
                                        <p>{camelToLabel(selectedChart.yAxisDataKey)}</p>
                                    </div>

                                    <div className="mt-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="secondary">
                                                    <ChartLine /> View Chart
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[800px]">
                                                <DialogHeader>
                                                    <DialogTitle>{selectedChart.name}</DialogTitle>
                                                    <DialogDescription>
                                                        <Button className="mt-2" variant="outline" onClick={handleDownloadImage}>
                                                            {downloadLoading.image ? <Loader2 className="animate-spin" /> : <Download />} Download Image
                                                        </Button>
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div ref={printRef}>
                                                    <ChartDialogContent />
                                                </div>
                                                <DialogFooter>
                                                    <p className="text-sm font-medium">X Axis: {camelToLabel(selectedChart.xAxisDataKey)}</p>
                                                    <p className="text-sm font-medium">Y Axis: {camelToLabel(selectedChart.yAxisDataKey)}</p>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    {!fileId && <div>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive">
                                                    <Trash2 className="w-5 h-5" /> Delete Chart
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                    <DialogDescription>
                                                        This action is irreversible. Deleting this chart will permanently remove it. However, the file associated with this chart will remain unaffected.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button variant="success" disabled={loading.chartDelete} onClick={handleDelete}>{loading.chartDelete && <Loader2 className="animate-spin" />}Confirm</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>}
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Charts;
