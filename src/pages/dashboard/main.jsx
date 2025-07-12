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
import { ChartArea, ChartLine, PanelsTopLeft, UploadCloud, UsersRound } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";



const Dashboard = () => {

  
  const { userInfo } = useUserInfoStore();
  const verified = userInfo?.verified

  // useEffect(() => {
  //   if (defaultParsedFile) {
  //     console.log("Got default parsed file:", defaultParsedFile)
  //   }
  // }, [defaultParsedFile])


  const master = [
    {
      id: "intro-header",
      title: "Hello 👋",
      element: <IntroHeader />,
      type: "section",
    },
    ...(userInfo?.accountType === "email" && !verified
      ? [
        {
          id: "verification",
          title: "Verification",
          element: <Verification />,
          type: "section",
        },
      ]
      : []),
    ...(userInfo?.role === "admin") ? [
      {
        id: "admin",
        title: "Admin Dashboard",
        description: "Central hub to manage all users, and files.",
        type: "block",
        col: 2,
        blocks: [
          {
            id: "user-insights",
            title: "User Insights",
            description: "Track key user statistics including total signups, verification status, and login method distribution",
            icon: <ChartArea />,
            element: <UserInsights />,
          },
          {
            id: "users",
            title: "Users",
            description: "View user details, manage accounts, or remove users.",
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
            title: "Upload",
            description: "Upload xlsx file and create charts.",
            icon: <UploadCloud />,
            element: <Upload />,
          },
          {
            id: "files",
            title: "Files",
            description: "Track all the files uploaded, view or delete them",
            icon: <PanelsTopLeft />,
            element: <Files />,

          },
          {
            id: "charts",
            title: "Charts",
            description: "View saved charts, download in PNG or PDF format",
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