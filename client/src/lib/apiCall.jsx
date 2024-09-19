import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { clearLocalStorage } from "./str";

export const apiCall = async ({ path, ...options }) => {
    const call = await fetch(path, options);
    const results = await call.json();

    if (
        !results.success &&
        results.message &&
        results.message === "INVALID_TOKEN"
    ) {
        toast({
            title: "Phiên đăng nhập không hợp lệ",
            description: "Đang nhập lại",
            action: (
                <Button
                    onClick={() => {
                        clearLocalStorage();
                        window.location.reload();
                    }}
                >
                    Đăng nhập lại
                </Button>
            ),
        });
    }
    return results;
};
