import { MemberHistoryContext } from "@/context/member-history";
import { useContext } from "react";

export default function useMemberHistory() {
    return useContext(MemberHistoryContext);
}
