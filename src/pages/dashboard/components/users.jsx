import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {
    Pagination, PaginationContent, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table, TableBody, TableCell, TableFooter,
    TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import {
    CircleUser,
    Shield, ShieldOff,
    ShieldUser,
    Trash2,
    User,
    UsersRound
} from "lucide-react";
import translations from "@/lib/translations";
import useApi from "@/hooks/useApi";
import { formatTime } from "@/lib/utils";
import useDashboardStore from "@/store/dashboard-store";
import useUserInfoStore from "@/store/user-info-store";

const Users = ({ fullScreen }) => {
    const {
        byPage,
        loading,
        error,
        pagination,
        getUsers,
        deleteUser,
        resetUserStats, getUserStats
    } = useDashboardStore();

    const { language } = useUserInfoStore()

    const [currentPage, setCurrentPage] = useState(1);
    const users = byPage.users?.[currentPage] || [];
    const [selectedUser, setSelectedUser] = useState({});

    const { total = 0, limit = 5, totalPages = 1 } = pagination.users || {};
    const { request } = useApi();

    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage >= totalPages;

    useEffect(() => {
        request(() => getUsers(currentPage));
    }, [currentPage]);

    useEffect(() => {
        if (users.length === 0) return;

        if (selectedUser?._id !== users[0]?._id) {
            setSelectedUser(users[0]);
        }
    }, [users]);


    const handleDelete = async () => {
        await request(() => deleteUser(selectedUser._id, currentPage));
        await resetUserStats();
        await getUserStats();
    };

    return (
        <div className={clsx("flex flex-col md:flex-row", fullScreen && "mt-8 px-40")}>
            {/* Users Table */}
            <div className="w-full md:w-[50%] p-4">
                <div className="flex items-center gap-2 text-md font-medium mb-4">
                    <p>{translations?.users?.header?.left[language]}</p>
                    <UsersRound className="h-4 w-4" />
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{translations?.users?.text?.username[language]}</TableHead>
                                <TableHead className="text-right">{translations?.users?.text?.email[language]}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading.users
                                ? Array.from({ length: limit }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-5 w-48 ml-auto" /></TableCell>
                                    </TableRow>
                                ))
                                : users.map((user) => (
                                    <TableRow
                                        key={user._id}
                                        onClick={() => setSelectedUser(user)}
                                        className="cursor-pointer"
                                    >
                                        <TableCell className={clsx(selectedUser._id === user._id && "bg-muted/50")}>
                                            {user.username}
                                        </TableCell>
                                        <TableCell className={clsx("text-right", selectedUser._id === user._id && "bg-muted/50")}>
                                            {user.accountType === "email" ? user.email : "-"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell className="font-semibold">{translations?.text?.total[language]}</TableCell>
                                <TableCell className="text-right font-semibold">
                                    {translations?.text?.current[language]}: {users.length} / {translations?.text?.total[language]}: {total}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>

                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                className={clsx("cursor-pointer", prevDisabled && "pointer-events-none opacity-50")}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => {
                            const page = i + 1;
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        isActive={page === currentPage}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                className={clsx("cursor-pointer", nextDisabled && "pointer-events-none opacity-50")}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            {/* User Info Card */}
            <div className="w-full md:w-[50%] p-4">
                <div className="flex items-center gap-2 text-md font-medium mb-4">
                    <p>{translations?.users?.header?.right[language]}</p>
                    <User className="h-4 w-4" />
                </div>

                {loading.users && (
                    <Card className="w-full max-w-4xl p-6 space-y-6">
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
                    </Card>
                )}

                {!loading.users && selectedUser._id && (
                    <Card className="w-full max-w-4xl">
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">@{selectedUser.username}</h2>
                                    <p className="text-muted-foreground">{selectedUser.email}</p>
                                    <p className="text-muted-foreground italic">
                                        {formatTime(new Date(selectedUser.createdAt))}
                                    </p>
                                </div>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button variant="destructive" size="icon">
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. Are you sure you want to permanently delete this user?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button onClick={handleDelete} variant="success">Confirm</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    {selectedUser.verified ? <Shield className="w-5 h-5" /> : <ShieldOff className="w-5 h-5" />}
                                    <div>
                                        <p className="text-muted-foreground">{translations?.users?.text?.verified[language]}</p>
                                        <p>{selectedUser.verified ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CircleUser className="w-5 h-5" />
                                    <div>
                                        <p className="text-muted-foreground">{translations?.users?.text?.method[language]}</p>
                                        <p>{selectedUser.accountType?.toUpperCase() || "EMAIL"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldUser className="w-5 h-5" />
                                    <div>
                                        <p className="text-muted-foreground">{translations?.users?.text?.role[language]}</p>
                                        <p>{selectedUser.role?.toUpperCase() || "USER"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Users;
