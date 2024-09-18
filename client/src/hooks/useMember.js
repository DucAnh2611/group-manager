import { MemberContext } from "@/context/member";
import { useContext } from "react";

export default function useMember() {
    return useContext(MemberContext);
}
