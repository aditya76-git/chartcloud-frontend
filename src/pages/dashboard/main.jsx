import Explorer from "@/components/layout/explorer";
import { ThemeToggle } from "@/components/theme-toggle";
import IntroHeader from "@/pages/dashboard/components/intro-header";
import LiveTime from "@/pages/dashboard/components/live-time";
import ProfileCircle from "@/pages/dashboard/components/profile-circle";
import UserInsights from "@/pages/dashboard/components/user-insights";
import Users from "@/pages/dashboard/components/users";
import Files from "@/pages/dashboard/components/files";
import Verification from "@/pages/dashboard/components/verification";
import Upload from "@/pages/dashboard/components/upload";
import useUserInfoStore from "@/store/user-info-store";
import { ChartArea, ChartLine, Download, PanelsTopLeft, UploadCloud, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";


const Dashboard = () => {

  const UserBlock = ({ meta }) => <div className="p-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum soluta provident voluptates molestiae eum ullam consequuntur qui molestias quidem est id assumenda porro, officiis explicabo eligendi consequatur quaerat in expedita alias nisi? Tempora in aliquid id nihil sunt totam architecto animi odit, perferendis ad voluptatibus mollitia reiciendis, exercitationem quo! Mollitia nobis explicabo consectetur quidem, quo sit magnam reiciendis sed! Ipsa quas saepe nemo ab reiciendis dolorum culpa? Maiores, qui vero. Ab dolor illo nemo corrupti labore molestias rem ullam quo. Eligendi officia, nulla fugit enim aspernatur provident doloribus magnam inventore atque quisquam officiis doloremque fuga ad modi nam eius! Magni, velit. Possimus at blanditiis voluptatibus neque maxime culpa labore cumque numquam laudantium id porro ab iste, commodi alias necessitatibus, deserunt dolorum est? Amet animi nulla sequi iusto! Minima commodi non nihil, molestias dolorum explicabo illum dolor porro culpa sint aut exercitationem reiciendis! Fugit iure sint veniam accusantium error, ad quibusdam cupiditate maiores aperiam dolor beatae deserunt vel aspernatur natus debitis saepe nisi quam obcaecati iste mollitia ratione in officiis! Aliquid ratione beatae sit voluptas repellat, fugit similique explicabo, reprehenderit commodi optio officiis consequuntur neque quod? Eveniet ea corporis beatae cum. Numquam suscipit, consequuntur, reprehenderit culpa sapiente modi iste beatae blanditiis, at dolorum sequi doloribus. Sit reiciendis sapiente culpa unde, excepturi iste dolor autem consectetur nulla nisi eligendi dignissimos maxime ad fuga cupiditate ex magni rem, animi provident consequatur dolore dicta atque! Incidunt maiores, repellendus tempora repudiandae voluptatem non itaque pariatur praesentium ratione repellat. Velit sunt dolorem ad maxime tenetur odit corrupti aut ab quas, aliquid modi optio vitae, ipsum sequi, veritatis incidunt fuga. Voluptates unde provident quia ullam, alias voluptatem possimus nam veniam, nobis quidem repellendus, nihil quaerat error cum dolorum sed laudantium laborum ab. Molestias ex quae sint ea debitis non id eveniet facilis vero mollitia at blanditiis maxime nobis quis, incidunt quasi officiis voluptates eligendi expedita tempore voluptatum obcaecati aperiam. Deserunt debitis expedita ab nulla amet sequi doloribus quia quas cum. Quae, dolores! Voluptas numquam repudiandae et quod est ex dignissimos expedita pariatur reiciendis, dicta suscipit enim, aliquam excepturi nemo veniam nulla, sunt iusto animi ab voluptatibus in iste! Dicta earum reiciendis molestias atque quo dignissimos pariatur esse repellendus doloribus fuga omnis provident sapiente, facere, eligendi nulla quas! Earum, enim nam ad ducimus iure laboriosam voluptatem nesciunt veniam eos rem aliquid dolores quidem iste consequuntur aperiam inventore. At quis sit voluptatum odit animi repellendus culpa architecto accusamus vel, ullam rerum, minus omnis, cumque eveniet! Dolor eos et temporibus nesciunt optio adipisci, cum tempore labore, soluta libero est facilis praesentium rem. Sequi ratione nulla officiis assumenda illum, facere voluptatum quis temporibus nobis debitis ipsum repellendus perferendis magni sunt quaerat omnis neque expedita deserunt provident corporis nemo maxime voluptas? Corrupti blanditiis ratione nulla dolores libero, soluta architecto, sed provident nam incidunt culpa explicabo est ad sunt perspiciatis, eligendi quibusdam. Asperiores facere obcaecati quo quos harum eaque velit exercitationem illo aut ad qui hic esse sed perferendis iste, optio quod debitis autem blanditiis consequatur cumque sunt, voluptatum, quam delectus. Aliquam, ipsam!</div>;
  const SettingsBlock = ({ meta }) => <div>Settings: {meta.title}</div>;
  const { userInfo } = useUserInfoStore();
  const verified = userInfo?.verified



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
            id: "files",
            title: "Files",
            description: "Track all the files uploaded, view or delete them",
            icon: <PanelsTopLeft />,
            element: <Files />,
          },
          {
            id: "upload",
            title: "Upload",
            description: "Upload xlsx file and create charts.",
            icon: <UploadCloud />,
            element: <Upload />,
          }
        ],
      }
    ] : [],
  ];




  return <Explorer master={master}>

   

    {/* Navigator Slot */}
    <Explorer.Navigator>
      <div className="flex h-12 items-center gap-2 px-4">
        <Explorer.NavigatorHeader>
          <Explorer.NavigatorLeft>
            <h1 className="text-md font-bold p-3 cursor-pointer">
              <Link to="/">chartcloud</Link>
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
      <div className="flex h-12 items-center gap-2 px-4">
        <Explorer.ViewerLeftNav />
        <Explorer.ViewerRight>
          <div className="flex flex-row gap-2">
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