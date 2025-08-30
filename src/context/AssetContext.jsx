import React, { createContext, useState, useContext, useEffect } from 'react';

const AssetContext = createContext(null);

// 프로바이더(Provider)
// 컨텍스트를 구독하는 모든 자식 컴포넌트에게 데이터를 제공하고, 데이터가 변경되면 알려주는 역할
export function AssetProvider({ children }) {
    const [assetData, setAssetData] = useState(null); // 자산 데이터 상태
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태

    // 앱이 처음 시작될 때 localStorage에서 저장된 자산 데이터를 불러와줌
    useEffect(() => {
        try {
            const savedData = localStorage.getItem("assetPortfolioPayload");
            if (savedData) {
                setAssetData(JSON.parse(savedData));
            }
        } catch (error) {
            console.error("localStorage에서 자산 데이터를 불러오는 데 실패했습니다.", error);
        } finally {
            setLoading(false); // 로딩 완료
        }
    }, []);

    // 자산 데이터를 업데이트하고, 변경된 내용을 localStorage에도 저장하는 함수
    const updateAssetData = (newData) => {
        try {
            setAssetData(newData);
            localStorage.setItem("assetPortfolioPayload", JSON.stringify(newData));
        } catch (error) {
            console.error("localStorage에 자산 데이터를 저장하는 데 실패했습니다.", error);
        }
    };

    // 자식 컴포넌트들에게 전달할 값들
    const value = {
        assetData,
        updateAssetData,
        loading,
        userName: "김민서" // 임시 사용자 이름
    };

    return (
        <AssetContext.Provider value={value}>
            {children}
        </AssetContext.Provider>
    );
}

// 컨텍스트
export function useAssets() {
    const context = useContext(AssetContext);
    if (!context) {
        // AssetProvider 바깥에서 사용하면 에러 발생
        throw new Error('useAssets must be used within an AssetProvider');
    }
    return context;
}