import { login } from "@/api/action/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { setLocalStorage } from "@/lib/str";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
    const [otp, SetOtp] = useState("");
    const navigate = useNavigate();

    const handleOnChange = (value) => {
        SetOtp(value);
    };

    const handleLogin = async () => {
        const res = await login(otp);

        if (!res.success) {
            toast({
                title: "Đăng nhập thất bại",
                description: "Sai mật khẩu",
                variant: "destructive",
            });
        } else {
            setLocalStorage(res.data.token);
            navigate("/");
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Đăng nhập bằng mã OTP</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={handleOnChange}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <Button
                            className="w-full mt-3"
                            disabled={!(otp.length === 6)}
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
