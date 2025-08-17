import Explorer from "@/components/layout/explorer";
import { ThemeToggle } from "@/components/theme-toggle";
import Charts from "@/pages/dashboard/components/charts";
import Files from "@/pages/dashboard/components/files";
import IntroHeader from "@/pages/dashboard/components/intro-header";
import LiveTime from "@/pages/dashboard/components/live-time";
import ProfileCircle from "@/pages/dashboard/components/profile-circle";
import Upload from "@/pages/dashboard/components/upload";
import UserInsights from "@/pages/dashboard/components/user-insights";
import Users from "@/pages/dashboard/components/users";
import Verification from "@/pages/dashboard/components/verification";
import useUserInfoStore from "@/store/user-info-store";
import { ChartArea, ChartLine, PanelsTopLeft, UploadCloud, UsersRound, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import translations from "@/lib/translations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Dashboard = () => {


  const { userInfo, language, setLanguage } = useUserInfoStore();
  const verified = userInfo?.verified
  const { setTheme, theme } = useState("dark")

  // useEffect(() => {
  //   if (defaultParsedFile) {
  //     console.log("Got default parsed file:", defaultParsedFile)
  //   }
  // }, [defaultParsedFile])


  const master = [
    {
      id: "intro-header",
      title: translations?.hello[language],
      element: <IntroHeader />,
      type: "section",
    },
    ...(userInfo?.accountType === "email" && !verified
      ? [
        {
          id: "verification",
          title: translations?.verification[language],
          element: <Verification />,
          type: "section",
        },
      ]
      : []),
    ...(userInfo?.role === "admin") ? [
      {
        id: "admin",
        title: translations?.admin?.title[language],
        description: translations?.admin?.description[language],
        type: "block",
        col: 2,
        blocks: [
          {
            id: "user-insights",
            title: translations?.insights?.title[language],
            description: translations?.insights?.description[language],
            icon: <ChartArea />,
            element: <UserInsights />,
          },
          {
            id: "users",
            title: translations?.users?.title[language],
            description: translations?.users?.description[language],
            icon: <UsersRound />,
            element: <Users />,
          }
        ],
      }
    ] : [],
    ...(userInfo?.verified) ? [
      {
        id: "blocks",
        title: "User Dashboard",
        description: "Central hub to manage all file uploaded, charts made.",
        type: "block",
        col: 2,
        blocks: [
          {
            id: "upload",
            title: translations?.upload?.title[language],
            description: translations?.upload?.description[language],
            icon: <UploadCloud />,
            element: <Upload />,
          },
          {
            id: "files",
            title: translations?.files?.title[language],
            description: translations?.files?.description[language],
            icon: <PanelsTopLeft />,
            element: <Files />,

          },
          {
            id: "charts",
            title: translations?.charts?.title[language],
            description: translations?.charts?.description[language],
            icon: <ChartLine />,
            element: <Charts />,
          },
        ],
      }
    ] : [],
  ];




  return <Explorer master={master}>



    {/* Navigator Slot */}
    <Explorer.Navigator>
      <div className="flex h-[48px] items-center gap-2 px-4">
        <Explorer.NavigatorHeader>
          <Explorer.NavigatorLeft>
            <h1 className="text-md font-bold p-3 cursor-pointer">
              <Link to="/">chartcloud 📊</Link>
            </h1>
          </Explorer.NavigatorLeft>
          <Explorer.NavigatorRight>

            <Explorer.NavigatorMobileOnly>
              <ProfileCircle {...userInfo} />
            </Explorer.NavigatorMobileOnly>

            <Explorer.NavigatorDesktopOnly>
              <LiveTime />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                    aria-label="User menu"
                  >
                    <Avatar className="h-7 w-7">
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
            



                  {/* <DropdownMenuItem onClick={handleLogout}>
                    Log out {loading && <Loader2 className="ml-auto h-4 w-4 animate-spin" />}
                    <DropdownMenuShortcut>⇧ + Q</DropdownMenuShortcut>
                  </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>

            </Explorer.NavigatorDesktopOnly>


          </Explorer.NavigatorRight>
        </Explorer.NavigatorHeader>
      </div>
      <div className="border-t" />
      <Explorer.NavigatorBody />

    </Explorer.Navigator>

    {/* Viewer Slot */}
    <Explorer.Viewer>
      <div className="flex h-[54px] items-center gap-2 px-4">
        <Explorer.ViewerLeftNav />
        <Explorer.ViewerRight>
          <div className="flex flex-row gap-2">
            <Explorer.ToggleFullScreen />
            <ProfileCircle {...userInfo} />
            <ThemeToggle />
          </div>
        </Explorer.ViewerRight>
      </div>
      <div className="border-t" />

      <Explorer.ViewerContent>
        <Explorer.ViewerHeader className="px-6 py-4" />
      </Explorer.ViewerContent>
    </Explorer.Viewer>
  </Explorer>

}

export default Dashboard