import AuthLayout from "@/layout/auth";
import MainLayout from "@/layout/main";
import LoginScreen from "@/screen/login";
import MainScreen from "@/screen/main";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [{ path: "", element: <MainScreen /> }],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [{ path: "", element: <LoginScreen /> }],
    },
]);
