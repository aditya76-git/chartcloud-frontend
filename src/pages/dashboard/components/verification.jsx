import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Shield } from "lucide-react";
import api from "@/api/client";
import useApi from "@/hooks/useApi";
import useUserInfoStore from "@/store/use-user-info-store";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

const Verification = () => {
    const { loading, request } = useApi();
    const [otp, setOtp] = useState("");
    const [mailSent, setMailSent] = useState(false);

    const verifyButtonDisabled = otp.length !== 6;

    const handleMailSend = async () => {
        const result = await request(() => api.patch("/auth/send-verification-code"));

        if (result?.success) {
            setMailSent(true);
        }
    };

    const handleVerify = async () => {
        const result = await request(
            () => api.patch("/auth/verify-verification-code", { code: Number(otp) })
        );

        if (result?.success) {
            const userRes = await api.get("/user/info");
            if (userRes?.data?.success) {
                useUserInfoStore.getState().setUserInfo(userRes.data.info);
            }
        }
    };

    return (
        <div className="space-y-4">
            {!mailSent ? (
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <p className="text-sm text-muted-foreground">
                        Please verify your email to continue using the app.
                    </p>
                    <Button variant="default" disabled={loading} onClick={handleMailSend}>
                        {loading ? (
                            <>
                                Sending...
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                            </>
                        ) : (
                            <>
                                Send Mail <Send className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            ) : (
                <>
                    <p className="text-sm text-muted-foreground">
                        Please enter the one-time password sent to your email.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-around gap-4">
                        <InputOTP maxLength={6} onChange={(value) => setOtp(value)}>
                            <InputOTPGroup>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <InputOTPSlot key={index} index={index} />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>

                        <Button
                            variant="default"
                            disabled={verifyButtonDisabled || loading}
                            onClick={handleVerify}
                        >
                            {loading ? (
                                <>
                                    Verifying...
                                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                </>
                            ) : (
                                <>
                                    Verify <Shield className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Verification;
