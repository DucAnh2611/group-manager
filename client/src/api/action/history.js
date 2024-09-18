import { API_URLS } from "@/constant/api";
import { apiCall } from "@/lib/apiCall";
import { clearLocalStorage } from "@/lib/str";

export const exportXlsx = async () => {
    const { path, ...options } = API_URLS.HISTORY.EXPORT_XLSX();

    const resApi = await fetch(path, options);
    if (!resApi.ok) {
        const json = await resApi.json();
        if (!json.success && json.message && json.message === "INVALID_TOKEN") {
            clearLocalStorage();
        }

        return null;
    }
    const blob = await resApi.blob();

    return blob;
};

export const addHistory = async (memberId, body) => {
    const api = API_URLS.HISTORY.ADD(memberId);

    const resApi = await apiCall({ ...api, body: JSON.stringify(body) });

    return resApi;
};

export const getHistory = async (memberId, page, limit) => {
    const api = API_URLS.HISTORY.GET(memberId, page, limit);

    const resApi = await apiCall({ ...api });

    return resApi;
};
