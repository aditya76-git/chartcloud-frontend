import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Card, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";

import useDashboardStore from "@/store/dashboard-store";
import useApi from "@/hooks/useApi";
import { formatFileSize, formatTime } from "@/lib/utils";
import clsx from "clsx";
import { Archive, Copy, Check, File, FileKey, FileKey2, FileText, Loader2, Share2, Trash2, Eye, Plus } from 'lucide-react';
import Upload from '@/pages/dashboard/components/upload';
import useUserInfoStore from '@/store/user-info-store';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
import translations from '@/lib/translations';

const Files = ({ fullScreen }) => {
    const {
        getFileById,
        byPage,
        getFiles,
        userFilesStats,
        getUserFilesStats,
        deleteFile,
        pagination,
        toggleSharing,
        loading,
    } = useDashboardStore();

    const { defaultParsedFile, setDefaultParsedFile, language } = useUserInfoStore()

    const { request } = useApi();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFile, setSelectedFile] = useState({});
    const files = byPage.files[currentPage] || [];
    const currentFile = getFileById(selectedFile._id);
    const { total = 0, totalPages = 1 } = pagination.files || {};
    const [isCopied, setIsCopied] = useState(false);


    useEffect(
        () => { console.log("defaultParsedFile", defaultParsedFile) }, [defaultParsedFile]
    )

    useEffect(() => {
        request(() => getFiles(currentPage));
    }, [currentPage]);

    useEffect(() => {
        request(() => getUserFilesStats());
    }, []);

    useEffect(() => {
        if (files.length === 0) return;

        if (selectedFile?._id !== files[0]?._id) {
            setSelectedFile(files[0]);
        }
    }, [files]);

    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage >= totalPages;

    const handleDelete = async () => {
        await request(() => deleteFile(selectedFile._id, currentPage));
        setSelectedFile(files[0] ?? {});
        await request(() => getUserFilesStats(true));
    };

    const toggleSharingStatus = async () => {
        await request(() => toggleSharing(currentFile._id, !currentFile?.sharing));

        await request(() => getUserFilesStats(true));
    };

    const createChart = () => {
        const file = {
            parsed: selectedFile?.parsed,
            filename: selectedFile?.filename,
            id: selectedFile?._id,
        };
        setDefaultParsedFile(file)
    };



    const SpreadSheet = ({ data = [] }) => {
        if (!data.length) return null;
        const headers = Object.keys(data[0]);
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map(header => <TableHead key={header}>{header}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {headers.map(header => <TableCell key={header}>{row[header]}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };

    const copyUrl = (url) => {
        navigator.clipboard.writeText(url)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            })
            .catch((err) => {
                console.error('Failed to copy URL: ', err);
            });
    };



    if (defaultParsedFile) {
        return <Upload defaultParsedFile={defaultParsedFile} />
    }

    return (
        <div className={fullScreen ? "mt-8 px-40" : ""}>
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                {loading.userFilesStats ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-full shadow-sm hover:shadow-md transition-all relative p-4 rounded-md border">
                            <Skeleton className="absolute top-5 right-5 h-6 w-6 text-muted-foreground" />
                            <div className="space-y-2 mt-6">
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-6 w-1/2" />
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        <Card className="w-full shadow-sm hover:shadow-md transition-all relative">
                            <File className="absolute top-6 right-5 h-5 w-5 text-muted-foreground" />
                            <CardHeader className="space-y-1">
                                <CardDescription className="text-muted-foreground">{translations?.files?.top?.total[language]}</CardDescription>
                                <CardTitle className="text-lg font-semibold">{userFilesStats?.count?.total}</CardTitle>
                            </CardHeader>
                        </Card>

                        <Card className="w-full shadow-sm hover:shadow-md transition-all relative">
                            <FileKey2 className="absolute top-6 right-5 h-5 w-5 text-muted-foreground" />
                            <CardHeader className="space-y-1">
                                <CardDescription className="text-muted-foreground">{translations?.files?.top?.public[language]}</CardDescription>
                                <CardTitle className="text-lg font-semibold">{userFilesStats?.count?.public}</CardTitle>
                            </CardHeader>
                        </Card>

                        <Card className="w-full shadow-sm hover:shadow-md transition-all relative">
                            <FileKey className="absolute top-6 right-5 h-5 w-5 text-muted-foreground" />
                            <CardHeader className="space-y-1">
                                <CardDescription className="text-muted-foreground">{translations?.files?.top?.private[language]}</CardDescription>
                                <CardTitle className="text-lg font-semibold">{userFilesStats?.count?.private}</CardTitle>
                            </CardHeader>
                        </Card>

                        <Card className="w-full shadow-sm hover:shadow-md transition-all relative">
                            <Archive className="absolute top-6 right-5 h-5 w-5 text-muted-foreground" />
                            <CardHeader className="space-y-1">
                                <CardDescription className="text-muted-foreground">{translations?.files?.top?.storage[language]}</CardDescription>
                                <CardTitle className="text-lg font-semibold">{formatFileSize(userFilesStats?.sum?.fileSize)}</CardTitle>
                            </CardHeader>
                        </Card>
                    </>
                )}
            </div>

            {/* File List & Detail Section */}
            <div className="flex flex-col md:flex-row">
                {/* File List */}
                <div className="w-full md:w-[50%] p-4">
                    <div className="flex flex-row items-center gap-2 text-md font-medium mb-4 ml-2">
                        <p className="font-medium">{translations?.files?.header?.left[language]}</p>
                        <File className="h-4 w-4" />
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>File Name</TableHead>
                                    <TableHead className="text-right">Created at</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading.files
                                    ? Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-5 w-32 ml-auto" /></TableCell>
                                        </TableRow>
                                    ))
                                    : files.map(file => (
                                        <TableRow key={file._id} onClick={() => setSelectedFile(file)}>
                                            <TableCell className={clsx("cursor-pointer", selectedFile?._id === file._id && "bg-muted/50")}>
                                                {file.filename}
                                            </TableCell>
                                            <TableCell className={clsx("text-right cursor-pointer", selectedFile?._id === file._id && "bg-muted/50")}>
                                                {formatTime(new Date(file.createdAt), {
                                                    year: "numeric", month: "long", day: "numeric"
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell className="font-semibold">{translations?.text?.total[language]}</TableCell>
                                    <TableCell className="text-right font-semibold">
                                        {translations?.text?.current[language]}: {files.length} / {translations?.text?.total[language]}: {total}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
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
                                    <PaginationLink href="#" isActive={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
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

                {/* File Info */}
                <div className="w-full md:w-[50%] p-4">
                    <div className="flex flex-row items-center gap-2 text-md font-medium mb-4 ml-2">
                        <p className="font-medium">{translations?.files?.header?.right[language]}</p>
                        <FileText className="h-4 w-4" />
                    </div>

                    {loading.files ? (
                        <Card className="w-full max-w-4xl p-6 space-y-6">
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-60" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </Card>
                    ) : (
                        Object.keys(selectedFile).length > 0 && (
                            <Card className="w-full max-w-4xl">
                                <div className="p-6 space-y-6">
                                    <div className="flex justify-between flex-col sm:flex-row gap-4">
                                        <div>
                                            <h2 className="text-md font-bold break-all">{selectedFile.filename}</h2>
                                            <p className="text-md text-muted-foreground">{selectedFile.sheetName}</p>
                                        </div>
                                        <div className="flex flex-col sm:items-end gap-2 sm:gap-1">
                                            <p className="text-muted-foreground italic text-sm">
                                                {formatTime(new Date(selectedFile.createdAt), "en-GB")}
                                            </p>
                                            <div className="flex gap-2">
                                                <Toggle
                                                    pressed={currentFile?.sharing}
                                                    onPressedChange={toggleSharingStatus}
                                                    disabled={loading.fileSharing}
                                                    className="flex items-center gap-2"
                                                >
                                                    {loading.fileSharing ? <Loader2 className="animate-spin h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                                                </Toggle>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="destructive" size="icon">
                                                            <Trash2 className="w-5 h-5" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>{translations?.files?.delete?.title[language]}</DialogTitle>
                                                            <DialogDescription>{translations?.files?.delete?.description[language]}

                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <Button variant="success" disabled={loading.fileDelete} onClick={handleDelete}>{loading.fileDelete && <Loader2 className="animate-spin" />}{translations?.files?.text?.confirm[language]}</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div><p className="text-muted-foreground">{translations?.files?.text?.rows[language]}</p><p>{selectedFile.rows}</p></div>
                                        <div><p className="text-muted-foreground">{translations?.files?.text?.columns[language]}</p><p>{selectedFile.columns}</p></div>
                                        <div><p className="text-muted-foreground">{translations?.files?.text?.size[language]}</p><p>{selectedFile.fileSize ?? "-"} KB</p></div>

                                        <div className="mt-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="secondary"><Eye />{translations?.files?.text?.view[language]}</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[800px]">
                                                    <DialogHeader>
                                                        <DialogTitle>{selectedFile?.filename}</DialogTitle>
                                                        <DialogDescription>
                                                            <ScrollArea className="sm:max-w-[760px] mt-2 rounded-md border h-min-screen">
                                                                <SpreadSheet data={selectedFile?.parsed} />
                                                                <ScrollBar orientation="horizontal" />
                                                            </ScrollArea>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter className="sm:justify-start">
                                                        <DialogClose asChild>
                                                            <Button type="button" variant="secondary">Close</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>

                                        <div>
                                            <Button variant="success" onClick={createChart}><Plus /> {translations?.files?.text?.create[language]}</Button>
                                        </div>


                                        {currentFile?.sharing && <div>
                                            <Button variant="secondary" onClick={() => copyUrl(`${window.location.origin}/file/${selectedFile?._id}`)}> {isCopied ? <Check /> : <Copy />} {translations?.files?.text?.copy[language]}</Button>
                                        </div>}


                                    </div>
                                </div>
                            </Card>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Files;
