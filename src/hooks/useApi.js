import { useState } from "react";
import { toast } from "sonner";

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const request = async (
        fn
    ) => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fn();
        
            if (!res) {
                return
            }
            const resData = res?.data;


            console.log(resData)

            setResponse(resData);

            toast.success("Success 🎉", {
                description: resData.message,
                action: {
                    label: "Close"
                }
            });


            return resData;
        } catch (err) {
            let message = "Unknown error";

            if (err?.response?.data?.message) {
                message = err.response.data.message;
            } else {
                message = err.toString();
            }

            setError(message);

            toast.error("Error ❌", {
                description: message,
                action: {
                    label: "Close"
                }
            });


            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, response, request };
};

export default useApi;
