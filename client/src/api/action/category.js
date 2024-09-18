import { API_URLS } from "@/constant/api";
import { apiCall } from "@/lib/apiCall";

export const listCategory = async (memberId, type) => {
    const api = API_URLS.CATEGORY.LIST();

    const resApi = await apiCall({
        ...api,
        body: JSON.stringify({ memberId, type }),
    });

    return resApi;
};
