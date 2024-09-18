import withoutAuth from "@/HOC/withoutAuth";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <Outlet />
        </>
    );
}
const AuthLayout = withoutAuth(Layout);
export default AuthLayout;
