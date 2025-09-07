import starIcon from '../../../assets/AIAssetPlan/starIcon.png';

export default function AIAssetOpinionCard({ aiAssetData }) {
  console.log(aiAssetData);
  return (
    <div className="w-full py-[20px] flex justify-center">
      <div className="w-[353px] rounded-[16px] bg-white  border-[2px] border-primary-2 shadow-[0_0_10px_#00d6b27d] flex flex-col gap-[16px] py-[20px] px-[24px]">
        <div className="flex gap-[10px] items-center ">
          <img src={starIcon} alt="starIcon" className="w-[24px] h-[24px]" />
          <h1 className="font-bold text-[16px] text-gray-90">AI 자산 의견</h1>
        </div>
        <div className="text-gray-100 text-[14px] flex flex-col gap-[10px] font-medium">
          <p>총 자산 1200만원, 월 저축 50만원 미만으로 6개월 내 10% 이하 수익을 목표하시는군요. 안정형 투자 성향에 저축이 목표입니다. 비상금 필요성도 고려했습니다. 현금 10%(120만원)는 예상치 못한 지출에 대비하는 안전장치입니다.  소액이지만 급한 상황에 유용합니다.예금 50%(600만원)는 원금 손실 위험 없이 안정적인 수익을 추구합니다.  단기 목표와 안정형 성향에 적합합니다. 적금 22%(264만원)는  꾸준한 저축을 통해 목표 금액 달성에 기여합니다. 월 저축액이 적으나, 추가 저축을 위한 여지가 있습니다. 투자 18%(216만원)는  수익률 제한과 단기 목표를 감안하여 소액으로 운용합니다.  과도한 위험 부담 없이 추가 수익을 기대할 수 있습니다. 전반적으로, 안정성을 최우선으로 하되,  단기 목표 달성을 위한 소액 투자를 병행하는 현실적인 분배입니다.  높은 수익률을 기대하기는 어렵지만, 원금 손실 위험은 낮습니다.  다만, 월 저축액이 적어 목표 수익률 달성에는 다소 어려움이 있을 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
}
