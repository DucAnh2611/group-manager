import { listMember } from "@/api/action/member";
import { createContext, useEffect, useState } from "react";

export const MemberContext = createContext({
    members: [],
    reload: () => {},
});

export default function MemberProvider({ children }) {
    const [members, SetMembers] = useState([]);

    const getMemberList = async () => {
        const api = await listMember();

        if (api.success) {
            SetMembers(api.data);
        }
    };

    const reload = () => {
        getMemberList();
    };

    useEffect(() => {
        getMemberList();
    }, []);

    return (
        <MemberContext.Provider value={{ members, reload: reload }}>
            {children}
        </MemberContext.Provider>
    );
}
