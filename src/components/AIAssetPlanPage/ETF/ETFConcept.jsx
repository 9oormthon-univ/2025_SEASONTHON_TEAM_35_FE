import number1Icon from '../../../assets/AIAssetPlan/ETF/number1.png';
import number2Icon from '../../../assets/AIAssetPlan/ETF/number2.png';
import number3Icon from '../../../assets/AIAssetPlan/ETF/number3.png';
import number4Icon from '../../../assets/AIAssetPlan/ETF/number4.png';

import Icon1 from '../../../assets/AIAssetPlan/ETF/boon.png';
import Icon2 from '../../../assets/AIAssetPlan/ETF/ju.png';
import Icon3 from '../../../assets/AIAssetPlan/ETF/to.png';
import Icon4 from '../../../assets/AIAssetPlan/ETF/gan.png';

const ETF_MERIT = [
  {
    trait: '분산투자',
    description: '여러 종목에 나누어 투자함으로써 위험을 줄일 수 있어요',
    icon: Icon1,
  },
  {
    trait: '저렴한 비용',
    description: '펀드보다 수수료가 낮아요',
    icon: Icon2,
  },
  {
    trait: '투명성',
    description: '구성 종목과 비율이 공개돼요',
    icon: Icon3,
  },
  {
    trait: '간편성',
    description: '주식처럼 증권사 앱에서 쉽게 거래할 수 있어요',
    icon: Icon4,
  },
];

const ETF_TRAIT = [
  {
    name: '주식형 ETF',
    description: '코스피200, 나스닥 등 주가지수 추종',
    icon: number1Icon,
  },
  {
    name: '채권형 ETF',
    description: '국채, 회사채 투자',
    icon: number2Icon,
  },
  {
    name: '원자재형 ETF',
    description: '금, 은, 원유 등 원자재 추종',
    icon: number3Icon,
  },
  {
    name: '테마형 ETF',
    description: '2차전지, AI, 반도체 등 특정 산업',
    icon: number4Icon,
  },
];

export default function ETFConcept() {
  return (
    <div className="pt-[40px]">
      <div className="flex flex-col gap-[19px] mb-[74px] px-[24px] ">
        <h1 className="text-[30px] font-bold text-gray-90">
          <span className="text-primary-1">ETF</span>가 무엇인가요?
        </h1>
        <p className="text-gray-90 text-[16px] font-medium">
          주식처럼 거래할 수 있는 펀드로, 여러 자산을 하나의 바구니에 담아
          투자할 수 있습니다.
        </p>
      </div>
      <div className="mb-[74px] flex flex-col gap-[24px] px-[24px]">
        <h2 className="text-gray-90 text-[20px] font-bold">
          ETF는 뭐가 좋나요?
        </h2>
        <div className="flex flex-col gap-[20px]">
          {ETF_MERIT.map((item, idx) => (
            <div key={idx} className="flex gap-[14px] items-center">
              <img className="w-[32px] h-[32px]" src={item.icon} />
              <div className="flex flex-col">
                <h1 className="text-primary-1 text-[14px] font-bold">
                  {item.trait}
                </h1>
                <h1 className="w-[309px] text-gray-90 font-medium text-[18px]">
                  {item.description}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-[60px] px-[24px]">
        <h2 className="text-gray-90 text-[20px] font-bold mb-[24px]">
          ETF의 종류에는 무엇이 있나요?
        </h2>
        <div className="flex flex-col gap-[20px]">
          {ETF_TRAIT.map((item, idx) => (
            <div key={idx} className="flex gap-[14px] items-center">
              <img
                src={item.icon}
                alt="numberIcon"
                className="w-[20px] h-[20px] "
              />
              <div className="flex flex-col w-[309px]">
                <h1 className="text-gray-90 font-medium text-[18px]">
                  {item.name}
                </h1>
                <p className="text-gray-50 font-medium text-[14px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="pt-[30px] pb-[18px] text-gray-50 text-[12px] font-normal bg-background px-[24px]">
        GrowPlan은 사용자의 투자 성향과 목표에 맞춰 적합한 ETF 비율을 추천하고,
        맞춤형 투자 계획을 제시합니다.
      </p>
    </div>
  );
}
