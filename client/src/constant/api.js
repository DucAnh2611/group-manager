import { getLocalStorage } from "@/lib/str";

export const joinApiUrl = (...path) => {
    return [import.meta.env.VITE_BACKEND_HOST, ...path].join("/");
};

export const API_HEADERS = {
    ContentType: {
        "Content-Type": "application/json",
    },
    Auth: () => {
        const token = getLocalStorage();
        return {
            Authorization: `Bearer ${token}`,
        };
    },
};

export const API_URLS = {
    AUTH: {
        LOGIN: () => ({
            path: joinApiUrl("auth", "login"),
            method: "POST",
            headers: API_HEADERS["ContentType"],
        }),
    },
    HISTORY: {
        EXPORT_XLSX: () => ({
            path: joinApiUrl("history", "export-xlsx"),
            method: "GET",
            headers: {
                ...API_HEADERS.Auth(),
                ...{
                    "Content-Type":
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
            },
        }),
        ADD: (id) => ({
            path: joinApiUrl("history", id),
            method: "POST",
            headers: { ...API_HEADERS.Auth(), ...API_HEADERS["ContentType"] },
        }),
        GET: (id, page, limit) => ({
            path: joinApiUrl("history", `${id}?page=${page}&limit=${limit}`),
            method: "GET",
            headers: { ...API_HEADERS.Auth(), ...API_HEADERS["ContentType"] },
        }),
    },
    MEMBER: {
        LIST: () => ({
            path: joinApiUrl("member"),
            method: "GET",
            headers: { ...API_HEADERS.Auth() },
        }),
        TYPES: () => ({
            path: joinApiUrl("member", "types"),
            method: "GET",
            headers: { ...API_HEADERS.Auth() },
        }),
        ADD: () => ({
            path: joinApiUrl("member"),
            method: "POST",
            headers: { ...API_HEADERS.Auth(), ...API_HEADERS["ContentType"] },
        }),
        UPDATE: (id) => ({
            path: joinApiUrl("member", id),
            method: "PUT",
            headers: { ...API_HEADERS.Auth(), ...API_HEADERS["ContentType"] },
        }),
        DELETE: (id) => ({
            path: joinApiUrl("member", id),
            method: "DELETE",
            headers: { ...API_HEADERS.Auth() },
        }),
    },
    CATEGORY: {
        LIST: () => ({
            path: joinApiUrl("category"),
            method: "POST",
            headers: { ...API_HEADERS.Auth(), ...API_HEADERS["ContentType"] },
        }),
    },
};
