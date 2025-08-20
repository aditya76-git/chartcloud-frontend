import Explorer from "@/components/layout/explorer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import translations from "@/lib/translations";
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
import { ChartArea, ChartLine, PanelsTopLeft, UploadCloud, UsersRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import TranslationAvatar from "./components/translation-avatar";

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
              {/* <ProfileCircle {...userInfo} /> */}
              <TranslationAvatar />
            </Explorer.NavigatorMobileOnly>

            <Explorer.NavigatorDesktopOnly>
              <LiveTime />
              <TranslationAvatar />


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