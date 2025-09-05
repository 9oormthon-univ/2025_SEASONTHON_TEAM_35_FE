import { useState } from "react";
import { useValidator } from './useValidator';

export function useWizard(steps, options = {}) {
    const { onComplete, initialFormValues = {}, payloadType = 'plan', memberId, debug = true } = options;
    const { error, setError, validateAll } = useValidator();

    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [form, setForm] = useState(initialFormValues || {});

    const updateValue = (key, val, shouldValidate = false) => {
        setForm((prevForm) => ({ ...prevForm, [key]: val }));
        if (shouldValidate) {
            // validateField(key, val); // 필요 시 개별 검증 함수가 있다면 호출
        } else if (error) {
            setError(null);
        }
    };

    /**
     * 최종 페이로드 생성
     * - payloadType === 'plan' : AI 자산 설계 설문 페이로드
     * - payloadType === 'amount': 자산 금액/비율 입력(예시)
     */
    const buildPayload = () => {
        if (payloadType === 'plan') {
            const {
                incomeRange,
                savingRange,
                profitRange,
                investmentPeriod,
                propensity,
                emergencyFund,      // 'true' | 'false' | boolean
                investmentPurpose
            } = form;

            const payload = {
                incomeRange,
                savingRange,
                profitRange,
                investmentPeriod,
                propensity,
                emergencyFund: emergencyFund === true || emergencyFund === 'true',
                investmentPurpose,
                ...(memberId ? { memberId } : {})
            };

            if (debug) {
                console.log('[PAYLOAD][plan]', payload);
            }
            return payload;
        }

        if (payloadType === 'amount') {
            // ✅ 예시: 스웨거 /api/v0/asset/register 형태에 맞춰 변환 (필요 시 키명 수정)
            // - 금액 필드가 프로젝트에 어떻게 저장되는지에 따라 아래 매핑을 조정하세요.
            // - "현금/예금/적금/투자/기타" 구조라면 다음과 같이 구성할 수 있습니다.
            const {
                cashAmount, depositAmount, savingsAmount, investedAmount, otherAmount,
                // 선택적으로 비율도 가지고 있다면 필요 시 포함
                cashRatioPercent, depositRatioPercent, savingsRatioPercent, investedRatioPercent, otherRatioPercent,
                stockRatioPercent, bitcoinRatioPercent, bondRatioPercent, etfRatioPercent,
                // (선택) 투자 세부 금액이 따로 있다면:
                stockAmount, bitcoinAmount, bondAmount, etfAmount,
            } = form;

            const n = (v) => (v === '' || v == null ? 0 : Number(v));

            // 백엔드가 요구하는 최소 스키마: assetList만 필요하다면 이것만 보내세요.
            const payload = {
                assetList: [
                    { assetType: 'CASH',    amount: n(cashAmount) + n(depositAmount) + n(savingsAmount) },
                    { assetType: 'STOCK',   amount: stockAmount != null ? n(stockAmount) : n(investedAmount) }, // 프로젝트 구조에 맞게 조정
                    { assetType: 'BOND',    amount: n(bondAmount) },
                    { assetType: 'ETF',     amount: n(etfAmount) },
                    { assetType: 'BITCOIN', amount: n(bitcoinAmount) },
                    { assetType: 'OTHER',   amount: n(otherAmount) },
                ],
                // 백엔드가 받는다면 이하 보낼 수 있음. 아니라면 삭제.
                ratios: {
                    cashRatioPercent: n(cashRatioPercent),
                    depositRatioPercent: n(depositRatioPercent),
                    savingsRatioPercent: n(savingsRatioPercent),
                    investedRatioPercent: n(investedRatioPercent),
                    otherRatioPercent: n(otherRatioPercent),
                },
                investmentBreakdown: {
                    stockRatioPercent: n(stockRatioPercent),
                    bitcoinRatioPercent: n(bitcoinRatioPercent),
                    bondRatioPercent: n(bondRatioPercent),
                    etfRatioPercent: n(etfRatioPercent),
                },
                ...(memberId ? { memberId } : {})
            };

            // 0원 항목 제거(선택): 백엔드 요구사항에 따라 유지/삭제 판단
            payload.assetList = payload.assetList.filter(item => item.amount > 0);

            if (debug) {
                console.log('[PAYLOAD][amount]', payload);
            }
            return payload;
        }

        // 기본값: 폼 원본
        if (debug) {
            console.log('[PAYLOAD][raw-form]', form);
        }
        return { ...form, ...(memberId ? { memberId } : {}) };
    };

    const next = () => {
        const isAllValid = validateAll(form, steps.slice(0, step + 1));
        if (!isAllValid) return;

        if (step < steps.length - 1) {
            setDirection(1);
            setStep((s) => s + 1);
        } else {
            const payload = buildPayload();
            if (typeof onComplete === 'function') {
                onComplete(payload);
            }
        }
    };

    const prev = () => {
        if (step > 0) {
            setDirection(-1);
            setStep((s) => s - 1);
        }
    };

    return {
        step,
        totalSteps: steps.length,
        currentStepData: steps[step],
        form,
        formValues: form,          // 디버깅 편의 위해 이름 명확화
        error,
        setError,
        direction,
        next,
        prev,
        updateValue,
        buildPayload,              // 필요 시 외부에서 호출해 콘솔 체크 가능
    };
}
