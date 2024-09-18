import { MemberTypeContext } from "@/context/member-type";
import { useContext } from "react";

export default function useMemberType() {
    return useContext(MemberTypeContext);
}
