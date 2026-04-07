import React, { useEffect, useState } from "react";

const useDeodPrice = () => {
    const [deodRate, setDeodRate] = useState<number | null>(null);
    // Fetch real-time DEOD price
    useEffect(() => {
        const fetchRate = async () => {
            try {
                const response = await fetch(
                    "https://api.paraswap.io/prices/?srcToken=0x55d398326f99059fF775485246999027B3197955&destToken=0x3510FbBC13090F991Ffa523527113A166161683e&amount=1000000000000000000&srcDecimals=18&destDecimals=18&side=SELL&network=56",
                );
                const data = await response.json();
                const rate =
                    Number(data.priceRoute.destAmount) /
                    Number(data.priceRoute.srcAmount);
                setDeodRate(rate);
            } catch (error) {
                console.error("Failed to fetch DEOD rate", error);
            }
        };
        fetchRate();
        const interval = setInterval(fetchRate, 60000);
        return () => clearInterval(interval);
    }, []);
    return {
        deodRate,
        setDeodRate,
    };
};

export default useDeodPrice;
