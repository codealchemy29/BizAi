import React, { useEffect, useState } from "react";
import { USD_TO_INR_EXCHANGE_RATE_API_URL } from "@/config/env";

const useUsdToInr = () => {
    const [usdToInrRate, setUsdToInrRate] = useState<number | null>(null);
    // Fetch real-time DEOD price
    useEffect(() => {
        const fetchRate = async () => {
            try {
                const response = await fetch(
                    USD_TO_INR_EXCHANGE_RATE_API_URL,
                );
                const data = await response.json();
                const rate =
                    Number(data.rates.INR) /
                    Number(data.rates.USD);
                setUsdToInrRate(rate);
            } catch (error) {
                console.error("Failed to fetch DEOD rate", error);
            }
        };
        fetchRate();
        const interval = setInterval(fetchRate, 60000);
        return () => clearInterval(interval);
    }, []);
    return {
        usdToInrRate,
        setUsdToInrRate,
    };
};

export default useUsdToInr;