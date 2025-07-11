import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { timeAgo } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import api from "@/api/client";
import useApi from "@/hooks/useApi";
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import useUserInfoStore from "@/store/user-info-store";

const ProfileCircle = ({ username, email, createdAt, profilePicture }) => {
    const { loading, request } = useApi();
    const navigate = useNavigate();
    const { clearUserInfo } = useUserInfoStore()

    const handleLogout = async () => {
        const result = await request(
            () => api.post("/auth/logout")
        );

        if (result?.success) {
            clearUserInfo()
            navigate("/");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                    aria-label="User menu"
                >
                    <Avatar className="h-7 w-7">
                        <AvatarImage src={profilePicture} alt={username} />
                        <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">@{username}</p>
                        <p className="text-xs leading-none text-muted-foreground">{email}</p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DropdownMenuItem>Joined {timeAgo(createdAt)}</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    Log out {loading && <Loader2 className="ml-auto h-4 w-4 animate-spin" />}
                    <DropdownMenuShortcut>⇧ + Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileCircle;
