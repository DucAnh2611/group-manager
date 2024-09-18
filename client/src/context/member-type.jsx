import { listMemberTypes } from "@/api/action/member";
import { createContext, useEffect, useState } from "react";

export const MemberTypeContext = createContext({
    types: [],
    reload: () => {},
});

export default function MemberTypeProvider({ children }) {
    const [types, SetTypes] = useState([]);

    const getMemberTypes = async () => {
        const api = await listMemberTypes();

        if (api.success) {
            SetTypes(api.data);
        }
    };

    const reload = () => {
        getMemberTypes();
    };

    useEffect(() => {
        getMemberTypes();
    }, []);

    return (
        <MemberTypeContext.Provider value={{ reload: reload, types }}>
            {children}
        </MemberTypeContext.Provider>
    );
}
