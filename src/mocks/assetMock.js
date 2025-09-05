// 가짜 Summary 응답(백엔드 응답 스키마와 유사)
// GET /api/v0/asset/summary API 응답과 동일한 구조의 Mock 데이터
export const MOCK_SUMMARY = {
    totalAmount: 25000000,
    cashAmount: 3000000,
    cashRatioPercent: 12.0,
    depositAmount: 10000000,
    depositRatioPercent: 40.0,
    savingsAmount: 5000000,
    savingsRatioPercent: 20.0,
    investedAmount: 6000000,
    investedRatioPercent: 24.0,
    otherAmount: 1000000,
    otherRatioPercent: 4.0,

    // 👇 총 투자액(investedAmount) 내에서의 비율
    stockRatioPercent: 50.0,    // 주식 300만원
    bitcoinRatioPercent: 16.7,  // 비트코인 100만원
    bondRatioPercent: 25.0,     // 채권 150만원
    etfRatioPercent: 8.3,       // ETF 50만원
};

// 네트워크 지연 흉내 (선택)
const wait = (ms = 300) => new Promise(r => setTimeout(r, ms));

// 실제 API 대체 모킹 함수
export async function mockGetAssetSummary() {
    await wait();
    return { isSuccess: true, data: MOCK_SUMMARY };
}

// 최초 등록/수정 등도 UI 흐름만 성공 처리
export async function mockRegisterAssets() { await wait(); return { isSuccess: true }; }
export async function mockModifyCashAsset() { await wait(); return { isSuccess: true }; }
export async function mockModifyInvestmentAsset() { await wait(); return { isSuccess: true }; }
export async function mockModifyOtherAsset() { await wait(); return { isSuccess: true }; }

// AI 설계 제출도 성공 처리
export async function mockSubmitPlan() { await wait(); return { isSuccess: true }; }
