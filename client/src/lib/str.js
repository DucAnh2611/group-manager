export const setLocalStorage = (data) => {
    localStorage.setItem("my_group_managment", data);
};
export const clearLocalStorage = () => {
    localStorage.removeItem("my_group_managment");
};

export const getLocalStorage = () => {
    const str = localStorage.getItem("my_group_managment");
    if (!str) {
        return;
    }

    return str;
};
