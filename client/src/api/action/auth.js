import { API_URLS } from "@/constant/api";
import { apiCall } from "@/lib/apiCall";

export const login = async (otp) => {
    const api = API_URLS.AUTH.LOGIN();

    const resApi = await apiCall({ ...api, body: JSON.stringify({ otp }) });

    return resApi;
};
