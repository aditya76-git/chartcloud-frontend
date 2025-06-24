import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton"

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { formatTime, formatFileSize } from "@/lib/utils";
import { FileText, Trash2, Shield, ShieldOff, Sheet, Lock, Share2, File, FileKey, FileKey2, Archive, Loader2, Fullscreen } from 'lucide-react';
import useFilesStore from "@/store/user-files-store";
import useApi from "@/hooks/useApi";
import clsx from "clsx";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";

const Files = ({ fullScreen }) => {
    const { getFileById, toggleSharing, filesByPage, getFiles, stats, statsLoading, fetchStats, deleteFile, pagination, loading, sharingLoading } = useFilesStore();
    const [currentPage, setCurrentPage] = useState(1);
    const { request } = useApi();

    const [selectedFile, setSelectedFile] = useState({});
    const currentFile = getFileById(selectedFile._id);
    const files = filesByPage[currentPage] || [];

    const { total, totalPages } = pagination;

    useEffect(() => {
        request(() => getFiles(currentPage));
        setSelectedFile(files[0] ?? {})
    }, [currentPage]);

    useEffect(() => {
        request(() =>
            fetchStats()
        );
    }, [])

    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage >= totalPages;

    const handleDelete = async () => {
        await request(() => deleteFile(selectedFile._id, currentPage));
        setSelectedFile({})

        await request(() =>
            fetchStats(true)
        );
    };

    const toggleSharingStatus = async () => {
        await request(() =>
            toggleSharing(currentFile._id, !currentFile?.sharing)
        );

        await request(() =>
            fetchStats(true)
        );
    };

    useEffect(
        () => { console.log(stats) }, [stats]
    )
    return (

        <>
            <div className={fullScreen && "mt-8 px-40"}>
                {statsLoading ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-full shadow-sm hover:shadow-md transition-all relative p-4 rounded-md border"
                        >
                            <Skeleton className="absolute top-5 right-5 h-6 w-6 text-muted-foreground" />

                            <div className="space-y-2 mt-6">
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-6 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div> : <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    <Card className="w-full shadow-sm hover:shadow-md transition-all relative">
                        <File className="absolute top-6 right-5 h-5 w-5 text-muted-foreground" />

                        <CardHeader className="space-y-1">
                            <CardDescription className="text-muted-foreground">Total Files</CardDescription>
                            <CardTitle className="text-lg font-semibold">{stats?.count?.total}</CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="w-full shadow-sm hover:shadow-md transition-all relative">
                        <FileKey2 className="absolute top-6 right-5 h-5 w-5 text-muted-foreground" />

                        <CardHeader className="space-y-1">
                            <CardDescription className="text-muted-foreground">Public Files</CardDescription>
                            <CardTitle className="text-lg font-semibold">{stats?.count?.public}</CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="w-full shadow-sm hover:shadow-md transition-all relative">
                        <FileKey className="absolute top-6 right-5 h-5 w-5 text-muted-foreground" />

                        <CardHeader className="space-y-1">
                            <CardDescription className="text-muted-foreground">Private Files</CardDescription>
                            <CardTitle className="text-lg font-semibold">{stats?.count?.private}</CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="w-full shadow-sm hover:shadow-md transition-all relative">
                        <Archive className="absolute top-6 right-5 h-5 w-5 text-muted-foreground" />

                        <CardHeader className="space-y-1">
                            <CardDescription className="text-muted-foreground">Used Storage</CardDescription>
                            <CardTitle className="text-lg font-semibold">{formatFileSize(stats?.sum?.fileSize)}</CardTitle>
                        </CardHeader>
                    </Card>
                </div>}




                <div className="flex flex-col md:flex-row">

                    <div className="w-full md:w-[50%] p-4">

                        <div className="flex flex-row items-center justify-start gap-2 text-md font-medium mb-4 ml-2">
                            <p className="font-medium">Files</p>
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
                                    {loading ? Array.from({ length: 5 }).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-5 w-32 ml-auto" /></TableCell>
                                        </TableRow>
                                    )) : files.map((file) => (
                                        <TableRow key={file._id} onClick={() => setSelectedFile(file)}>
                                            <TableCell className={clsx("cursor-pointer", selectedFile?._id === file._id && "bg-muted/50")}>
                                                {file.filename}
                                            </TableCell>
                                            <TableCell className={clsx("text-right cursor-pointer", selectedFile?._id === file._id && "bg-muted/50")}>
                                                {formatTime(new Date(file.createdAt), {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell className="font-semibold">Total</TableCell>
                                        <TableCell className="text-right font-semibold">
                                            Current: {files.length} / Total: {total}
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

                        <div className="flex flex-row items-center justify-start gap-2 text-md font-medium mb-4 ml-2">
                            <p className="font-medium">File Info</p>
                            <FileText className="h-4 w-4" />
                        </div>



                        {loading && <Card className="w-full max-w-4xl p-6 space-y-6">
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-60" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </Card>}

                        {!loading && Object.keys(selectedFile).length !== 0 && (
                            <Card className="w-full max-w-4xl">
                                <div className="p-6 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col sm:flex-row justify-between gap-4">

                                            <div className="flex flex-col">
                                                <h2 className="text-md font-bold break-all">{selectedFile.filename}</h2>
                                                <p className="text-md text-muted-foreground">{selectedFile.sheetName}</p>
                                            </div>

                                            <div className="flex flex-col sm:items-end gap-2 sm:gap-1">
                                                <p className="text-muted-foreground italic text-sm">{formatTime(new Date(selectedFile.createdAt), "en-GB")}</p>
                                                <div className="flex gap-2">

                                                    <Toggle
                                                        pressed={currentFile?.sharing}
                                                        onPressedChange={toggleSharingStatus}
                                                        disabled={sharingLoading}
                                                        aria-label="Toggle sharing"
                                                        className="flex items-center gap-2"
                                                    >
                                                        {sharingLoading ? (
                                                            <Loader2 className="animate-spin h-4 w-4" />
                                                        ) : <Share2 className="h-4 w-4" />}
                                                    </Toggle>


                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="destructive" size="icon">
                                                                <Trash2 className="w-5 h-5" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                                <DialogDescription>
                                                                    This action cannot be undone. You will delete this file permanently.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <Button variant="success" onClick={handleDelete}>
                                                                    Confirm
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </div>
                                        </div>



                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-muted-foreground">Rows</p>
                                            <p>{selectedFile.rows}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Columns</p>
                                            <p>{selectedFile.columns}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">File Size</p>
                                            <p>{selectedFile.fileSize ?? "-"} KB</p>
                                        </div>


                                        <div className="mt-2">

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="secondary">
                                                        View Spreadsheet
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>{selectedFile?.filename}</DialogTitle>
                                                        <DialogDescription>
                                                            Hello World
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button variant="success">
                                                            Save Changes
                                                        </Button>
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
            </div></>


    );
};

export default Files;
