import React, { useEffect, useState } from 'react';
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
import { UsersRound, User, Loader2, DollarSignIcon, UsersIcon, CalendarIcon, FilePenIcon, SirenIcon, TrainTrackIcon, Trash2, Shield, ShieldOff, CircleUser, ShieldUser } from 'lucide-react';
import useUsersStore from "@/store/users-store";
import useUserStatsStore from "@/store/user-stats-store";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatTime } from "@/lib/utils";
import useApi from "@/hooks/useApi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import clsx from "clsx"

const Users = ({ fullScreen }) => {
    const { usersByPage, loading, error, pagination, deleteUser, getUsers } = useUsersStore();
    const [currentPage, setCurrentPage] = useState(1);
    const { resetStats, getStats } = useUserStatsStore();

    const { total: totalItems, limit = 5, totalPages } = pagination;
    const [selectedUser, setSelectedUser] = useState({})

    const users = usersByPage[currentPage] || [];

    useEffect(() => {
        request(() => getUsers(currentPage))
        setSelectedUser(users[0] ?? {})

    }, [currentPage]);

    const prevDisabled = currentPage == 1
    const nextDisabled = currentPage >= totalPages;
    const { request } = useApi();


    const handleDelete = async () => {
        await request(() => deleteUser(selectedUser._id, currentPage));
        await resetStats();
        await getStats();
    };


    return (
        <div className={clsx("flex flex-col md:flex-row", fullScreen && "mt-8 px-40")}>
            <div className="w-full md:w-[50%] p-4">
                <div className="flex flex-row items-center justify-center gap-2 text-md font-medium mb-4">
                    <p className="font-medium">Users</p>
                    <UsersRound className="h-4 w-4" />
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead className="text-right">Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {loading ? Array.from({ length: nextDisabled ? Math.floor(totalItems / totalPages) : 5 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton className="h-5 w-32" />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Skeleton className="h-5 w-48 ml-auto" />
                                    </TableCell>
                                </TableRow>
                            )) : users.map((item) => (
                                <TableRow onClick={() => setSelectedUser(item)} key={item._id}>
                                    <TableCell
                                        className={clsx(
                                            "font-medium cursor-pointer",
                                            selectedUser?._id === item._id && "bg-muted/50"
                                        )}
                                    >
                                        {item.username}
                                    </TableCell>

                                    <TableCell className={clsx(
                                        "text-right cursor-pointer",
                                        selectedUser?._id === item._id && "bg-muted/50"
                                    )}>{item.email}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                        <TableFooter className="mt-4">
                            <TableRow>
                                <TableCell className="font-semibold">Total</TableCell>
                                <TableCell className="text-right font-semibold">
                                    Current : {users.length} / Total : {totalItems}
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
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => {
                            const pageNumber = i + 1;
                            return (
                                <PaginationItem key={pageNumber}>
                                    <PaginationLink
                                        href="#"
                                        isActive={pageNumber === currentPage}
                                        onClick={() => setCurrentPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationNext
                                className={clsx("cursor-pointer", nextDisabled && "pointer-events-none opacity-50")}
                                onClick={() =>
                                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>


            <div className="w-full md:w-[50%] p-4">
                <div className="flex flex-row items-center justify-center gap-2 text-md font-medium mb-4">
                    <p className="font-medium">User Info</p>
                    <User className="h-4 w-4" />
                </div>


                {loading && <Card className="w-full max-w-4xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-60" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-md" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                        ))}
                    </div>
                </Card>}

                {!loading && Object.keys(selectedUser).length != 0 && <Card className="w-full max-w-4xl">
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">@{selectedUser?.username}</h2>
                                <p className="text-muted-foreground">{selectedUser?.email}</p>
                                <p className="text-muted-foreground italic">{formatTime(new Date(selectedUser?.createdAt))}</p>
                            </div>
                            <div className="flex gap-2">

                                <Dialog>
                                    <DialogTrigger>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. Are you sure you want to permanently
                                                delete this user?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button onClick={handleDelete} variant="success">Confirm</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>





                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                {selectedUser?.verified ? <Shield className="w-5 h-5" /> : <ShieldOff className="w-5 h-5" />}

                                <div>
                                    <p className="text-muted-foreground">Verified</p>
                                    <p>{selectedUser?.verified ? "Yes" : "No"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CircleUser className="w-5 h-5" />
                                <div>
                                    <p className="text-muted-foreground">Login Method</p>
                                    <p>{selectedUser?.accountType ? selectedUser?.accountType.toUpperCase() : "EMAIL"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldUser className="w-5 h-5" />
                                <div>
                                    <p className="text-muted-foreground">Role</p>
                                    <p>{selectedUser?.role ? selectedUser?.role.toUpperCase() : "USER"}</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </Card>}

            </div>
        </div>
    );
};

export default Users;
