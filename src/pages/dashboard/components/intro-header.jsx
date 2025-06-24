import { formatTime } from "@/lib/utils";
import useUserInfoStore from "@/store/user-info-store";
import { Calendar } from "lucide-react";
import React from 'react';


const IntroHeader = ({ meta }) => {
    const today = formatTime(new Date())
    const userInfo = useUserInfoStore((state) => state.userInfo);

    return (
        <div className="text-sm text-muted-foreground">
            <p>Welcome back, <i>@{userInfo?.username}</i>. Ready to work?</p>
            <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <p>{today}</p>
            </div>
        </div>
    );
}

export default IntroHeader