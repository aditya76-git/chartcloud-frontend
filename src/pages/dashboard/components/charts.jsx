import React, { useEffect, useState, useRef } from 'react';
import {
    Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import html2canvas from "html2canvas";
import {
    Card
} from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { File, FileText, Trash2, ChartLine, Download, Loader2 } from 'lucide-react';

import useDashboardStore from "@/store/dashboard-store";
import useApi from "@/hooks/useApi";
import clsx from "clsx";
import { formatTime, camelToLabel } from "@/lib/utils";
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

const Charts = ({ fullScreen }) => {
    const {
        getFileById,
        byPage,
        getCharts,
        deleteChart,
        pagination,
        loading
    } = useDashboardStore();

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedChart, setSelectedChart] = useState({});
    const { request } = useApi();
    const printRef = useRef(null);

    const charts = byPage.charts[currentPage] || [];
    const { total = 0, totalPages = 1 } = pagination.charts || {};

    useEffect(() => {
        request(() => getCharts(currentPage));
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

    return (
        <div className={fullScreen ? "mt-8 px-40" : ""}>
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
                                            <p className="text-md text-muted-foreground">{selectedChart._id}</p>
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

                                    <div>
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
                                                    <Button variant="success" disabled={loading.chartDelete} onClick={handleDelete}>{loading.chartDelete && <Loader2 className = "animate-spin"/>}Confirm</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
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
