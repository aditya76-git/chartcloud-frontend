import api from '@/api/client';
import useApi from '@/hooks/useApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react"
const Google = () => {
    const { loading, request } = useApi();
    const code = window.location.search.match(/\?code=([^]*)/)?.[1];


    const navigate = useNavigate()

    useEffect(() => {

        const handleGoogleCallback = async () => {
            if (!code) return;

            const result = await request(() =>
                api.post(`/auth/login/google/callback?code=${code}`)
            );

            console.log(result)

            if (result.success) {
                const { access, refresh } = result.token;
                const expiryTime = Date.now() + 10 * 60 * 1000;

                localStorage.setItem("accessToken", access);
                localStorage.setItem("refreshToken", refresh);
                localStorage.setItem("expiry", expiryTime.toString());

                navigate("/dashboard");
            }
            else {
                navigate("/login");
            }
        };

        handleGoogleCallback();
    }, []);

    return <div className="flex flex-col items-center h-screen"><Loader2 /></div>;
};

export default Google;
