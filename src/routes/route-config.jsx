import Dashboard from "@/pages/dashboard/main";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Google from "@/pages/callback/google";
import Github from "@/pages/callback/github";
import Charts from "@/pages/dashboard/components/charts";

// Here isPrivate mean auth users can only access, checks the localstorage for accessToken, refreshToken and expiry



const RouteConfig = [
    {
        path: '/',
        element: <Landing />,
        isPrivate: false
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        isPrivate: true
    },
    {
        path: '/login',
        element: <Login />,
        isPrivate: false
    },
    {
        path: '/signup',
        element: <Signup />,
        isPrivate: false
    },
    {
        path: '/callback/google',
        element: <Google />,
        isPrivate: false
    },
    {
        path: '/callback/github',
        element: <Github />,
        isPrivate: false
    },
    {
        path: '/file/:fileId',
        element: <Charts fullScreen = {true} />,
    },
]

export default RouteConfig
