import { Button } from "@/components/ui/button";
import translations from "@/lib/translations";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import useUserInfoStore from "@/store/user-info-store";

const TranslationAvatar = () => {
    const { language, setLanguage } = useUserInfoStore();

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
                aria-label="User menu"
            > <Avatar className="h-7 w-7">
                    <AvatarFallback>{language.toUpperCase()}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{translations?.app?.language?.title[language]}</p>
                    <p className="text-xs leading-none text-muted-foreground">{translations?.app?.language?.subtitle[language]}</p>

                </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => setLanguage("en")} className="justify-between">
                ENGLISH
                <span className="text-muted-foreground text-xs">EN</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("es")} className="justify-between">
                SPANISH
                <span className="text-muted-foreground text-xs">ES</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("hi")} className="justify-between">
                HINDI
                <span className="text-muted-foreground text-xs">HI</span>
            </DropdownMenuItem>

        </DropdownMenuContent>
    </DropdownMenu>
}

export default TranslationAvatar;