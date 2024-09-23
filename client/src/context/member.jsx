import { listMember } from "@/api/action/member";
import { createContext, useEffect, useState } from "react";

export const MemberContext = createContext({
    members: [],
    isLoading: true,
    reload: () => {},
});

export default function MemberProvider({ children }) {
    const [members, SetMembers] = useState([]);
    const [isLoading, SetIsLoading] = useState(true);

    const getMemberList = async () => {
        SetIsLoading(true);

        const api = await listMember();

        if (api.success) {
            SetMembers(api.data);
        }

        SetIsLoading(false);
    };

    const reload = () => {
        getMemberList();
    };

    useEffect(() => {
        getMemberList();
    }, []);

    return (
        <MemberContext.Provider value={{ members, reload: reload, isLoading }}>
            {children}
        </MemberContext.Provider>
    );
}
