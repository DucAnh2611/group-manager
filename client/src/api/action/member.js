import { API_URLS } from "@/constant/api";
import { apiCall } from "@/lib/apiCall";

export const listMember = async () => {
    const api = API_URLS.MEMBER.LIST();

    const resApi = await apiCall({ ...api });

    return resApi;
};

export const listMemberTypes = async () => {
    const api = API_URLS.MEMBER.TYPES();

    const resApi = await apiCall({ ...api });

    return resApi;
};

export const updateMember = async (id, body) => {
    const api = API_URLS.MEMBER.UPDATE(id);

    const resApi = await apiCall({ ...api, body: JSON.stringify(body) });

    return resApi;
};

export const deleteMember = async (id) => {
    const api = API_URLS.MEMBER.DELETE(id);

    const resApi = await apiCall({ ...api });

    return resApi;
};

export const addMember = async (body) => {
    const api = API_URLS.MEMBER.ADD();

    const resApi = await apiCall({ ...api, body: JSON.stringify(body) });

    return resApi;
};
