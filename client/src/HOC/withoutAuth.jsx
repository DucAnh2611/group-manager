import { getLocalStorage } from "@/lib/str";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function withoutAuth(WrappedComponent) {
    const ComponentWithAuth = (props) => {
        const [token, SetToken] = useState("");
        const navigate = useNavigate();

        useEffect(() => {
            const t = getLocalStorage();

            if (t) {
                navigate("/");
            }
            SetToken(t);
        }, [token, navigate]);

        if (!token) {
            return <WrappedComponent {...props} />;
        }

        return <div>Loading...</div>;
    };
    return ComponentWithAuth;
}
