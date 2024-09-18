import { clearLocalStorage } from "./str";

export const apiCall = async ({ path, ...options }) => {
    const call = await fetch(path, options);
    const results = await call.json();

    if (
        !results.success &&
        results.message &&
        results.message === "INVALID_TOKEN"
    ) {
        clearLocalStorage();
    }
    return results;
};
