import MemberProvider from "@/context/member";
import MemberHistoryProvider from "@/context/member-history";
import MemberTypeProvider from "@/context/member-type";
import withAuth from "@/HOC/withAuth";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <MemberTypeProvider>
                <MemberProvider>
                    <MemberHistoryProvider>
                        <Outlet />
                    </MemberHistoryProvider>
                </MemberProvider>
            </MemberTypeProvider>
        </>
    );
}

const MainLayout = withAuth(Layout);
export default MainLayout;
