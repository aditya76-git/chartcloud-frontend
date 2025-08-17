import { formatTime } from "@/lib/utils";
import useUserInfoStore from "@/store/user-info-store";
import { Calendar } from "lucide-react";
import React, { useEffect } from 'react';
import translations from "@/lib/translations";

const IntroHeader = ({ meta }) => {
    const today = formatTime(new Date());
    const { userInfo, language } = useUserInfoStore();
    
    const welcomeMessage = translations.introHeader[language]?.(userInfo?.username || "") || "";

    return (
        <div className="text-sm text-muted-foreground">
            <p dangerouslySetInnerHTML={{ __html: welcomeMessage }} />
            <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <p>{today}</p>
            </div>
        </div>
    );
};

export default IntroHeader;
