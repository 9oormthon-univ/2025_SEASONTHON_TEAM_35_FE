import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getHomePageInfo } from "@/api/homeApi";

const HomeContext = createContext(null);

export function HomeProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    const [home, setHome] = useState({
        name: "",
        totalAsset: 0,
        cashRatio: 0,
        depositRatio: 0,
        savingRatio: 0,
        investRatio: 0,
        etcRatio: 0,
        investmentForecast: {
            horizonTitle: "",
            pointCount: 0,
            currentAmount: 0,
            period: "UNDER_6_MONTHS",
            forecastPoints: [], // {label, years, amount}[]
        },
        targetAmount: 0,
        achievementRate: 0,
    });

    const refresh = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await getHomePageInfo(); // null 또는 result 반환
            if (!result) throw new Error("홈 데이터를 불러오지 못했습니다.");
            setHome(result);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, []);

    const assetRatios = useMemo(() => ([
        { key: "cash",     label: "현금",   ratio: home.cashRatio },
        { key: "deposit",  label: "예금",   ratio: home.depositRatio },
        { key: "saving",   label: "적금",   ratio: home.savingRatio },
        { key: "invest",   label: "투자",   ratio: home.investRatio },
        { key: "etc",      label: "기타",   ratio: home.etcRatio },
    ]), [home]);

    const forecastSeries = useMemo(() => {
        const points = home.investmentForecast?.forecastPoints ?? [];
        return points.map(p => ({
            xLabel: p.label ?? `${p.years}y`,
            years: p.years,
            amount: p.amount,
        }));
    }, [home]);

    const value = {
        loading,
        error,
        home,             // 원본 전체
        assetRatios,      // 그래프/카드에 바로 쓰기 좋게 정리
        forecastSeries,   // 예측 라인차트용
        refresh,          // 재로딩 액션
    };

    return (
        <HomeContext.Provider value={value}>
            {children}
        </HomeContext.Provider>
    );
}

export function useHome() {
    const ctx = useContext(HomeContext);
    if (!ctx) throw new Error("error");
    return ctx;
}
