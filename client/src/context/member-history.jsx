import { getHistory } from "@/api/action/history";
import { createContext, useEffect, useState } from "react";

export const MemberHistoryContext = createContext({
    history: [],
    member: null,
    page: 1,
    limit: 20,
    count: 0,
    isLoading: true,
    setMember: (member) => {},
    changeQuery: (page, limit) => {},
});

export default function MemberHistoryProvider({ children }) {
    const [history, SetHistory] = useState([]);
    const [member, SetMember] = useState(null);
    const [page, SetPage] = useState(1);
    const [limit, SetLimit] = useState(10);
    const [count, SetCount] = useState(0);
    const [isLoading, SetIsLoading] = useState(true);

    const setMember = (member) => {
        SetMember(member);
    };
    const getMemberHistory = async (member, page, limit) => {
        SetIsLoading(true);
        const response = await getHistory(member._id, page, limit);

        if (response.success) {
            SetHistory(response.data.items);
            SetCount(response.data.count);
        }
        SetIsLoading(false);
    };

    const changeQuery = (page, li) => {
        SetPage(page);
        SetLimit(li || limit);
    };

    useEffect(() => {
        if (member) {
            getMemberHistory(member, page, limit);
        }
    }, [member, page, limit]);

    return (
        <MemberHistoryContext.Provider
            value={{
                history,
                member,
                limit,
                page,
                isLoading,
                count,
                setMember,
                changeQuery,
            }}
        >
            {children}
        </MemberHistoryContext.Provider>
    );
}
