import { useParams, useNavigate } from "react-router-dom";
import AmountWizard from "../../components/AssetInformPage/AmountWizard.jsx";
import { useAssets } from '../../context/AssetContext.jsx';

const ALL_STEPS = [
    { key: "cash",    title: "계좌 및 예금에 보유 중인\n현금을 입력해 주세요.", keyword: "계좌 및 예금" },
    { key: "stock",   title: "보유 중인 주식 투자\n금액을 입력해 주세요.",   keyword: "주식 투자" },
    { key: "bitcoin", title: "보유 중인 비트코인 투자\n금액을 입력해 주세요.", keyword: "비트코인 투자" },
    { key: "bond",    title: "보유 중인 채권 투자\n금액을 입력해 주세요.",   keyword: "채권 투자" },
    { key: "etf",     title: "보유 중인 ETF 투자\n금액을 입력해 주세요.",    keyword: "ETF 투자" },
    { key: "etc",     title: "그 외 자산에 해당하는 금액을\n입력해 주세요.",     keyword: "그 외 자산" },
];


function formatAmountsForForm(amounts = {}) {
    const formValues = {};
    for (const key of ALL_STEPS.map(s => s.key)) {
        const amount = amounts[key] || 0;
        formValues[key] = amount > 0 ? amount.toLocaleString('en-US') : "";
    }
    return formValues;
}

export default function AssetEditPage() {
    const { mode } = useParams();
    const navigate = useNavigate();
    const { assetData, modifyAssets, isSubmitting } = useAssets();
    // mode에 따라 wizard에 표시할 스텝 결정
    const stepsToEdit = (() => {
        switch (mode) {
            case "cash":
            case "investment":
            case "etc":
                return ALL_STEPS.filter((s) => s.key === mode || (mode === 'investment' && ["stock", "bitcoin", "bond", "etf"].includes(s.key)));
            default: // "all"
                return ALL_STEPS;
        }
    })();

    // 개별 항목 수정인지, 전체 수정인지 판단
    // 개별 항목 수정(cash, etc, investment)이면서 스텝이 1개일 때만 '이전' 버튼을 숨김
    const isSingleStepEdit = stepsToEdit.length === 1 && mode !== 'all';

    //  Wizard 완료 시 실행
    const handleEditComplete = async (updatedPayload) => {
        // mode와 함께 payload를 전달하여 API 호출
        const success = await modifyAssets(mode, updatedPayload);

        if (success) {
            alert("자산 정보가 성공적으로 수정되었습니다.");
            navigate("/asset/main");
        } else {
            alert("자산 정보 수정에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    // 'X' 버튼 클릭 시 실행될 함수
    const handleClose = () => {
        // 사용자에게 변경사항이 저장되지 않음을 알리고 확인 받기 (선택사항)
        if (window.confirm("변경사항이 저장되지 않습니다. 정말로 나가시겠습니까?")) {
            navigate("/asset/main");
        }
    };

    if (isSubmitting) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    const initialFormValues = formatAmountsForForm(assetData?.amounts);

    return (
        <AmountWizard
            wizardSteps={stepsToEdit}
            initialData={initialFormValues}
            onComplete={handleEditComplete}
            onClose={handleClose} // 'X' 버튼 핸들러 전달
            showPrevButton={!isSingleStepEdit} // 개별+단일스텝 수정이 아닐 때만 '이전' 버튼 표시
            submitButtonText="수정하기"
            isSubmitting={isSubmitting} // 제출 상태 전달
        />
    );
}