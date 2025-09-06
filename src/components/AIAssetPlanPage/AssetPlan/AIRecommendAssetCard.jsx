import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';

import moneyIcon from '../../../assets/AIAssetPlan/money.png';
import investmentIcon from '../../../assets/AIAssetPlan/investment.png';
import depositIcon from '../../../assets/AIAssetPlan/deposit.png';
import savingIcon from '../../../assets/AIAssetPlan/saving.png';
// 색상
const COLORS = ['#00D6B3', '#FFD562', '#FF92A1', '#58A9FF', '#E4E7EA'];

export default function AIRecommendAssetCard({ aiAssetData }) {
  const DATA = [
    { name: '현금', icon: moneyIcon, value: aiAssetData?.cashAmount },
    { name: '예금', icon: depositIcon, value: aiAssetData?.depositAmount },
    { name: '적금', icon: savingIcon, value: aiAssetData?.savingsAmount },
    {
      name: '투자',
      icon: investmentIcon,
      value: aiAssetData?.investmentAmount,
    },
  ];
  const navigate = useNavigate();

  const handleRetry = () => {
    console.log('[RETRY] navigating to /ai/plan/start?mode=update');
    navigate('/ai/plan/start?mode=update');
  };
  const total = DATA.reduce((acc, cur) => acc + cur.value, 0);
  return (
    <div className="pt-[20px] pb-[12px] px-[24px]">
      <div className="flex justify-between items-center mb-[16px]">
        <h1 className="text-gray-90 text-[16px] font-bold">
          AI 추천 자산 비율
        </h1>
        <button
            onClick={handleRetry}
            className="w-[66px] h-[26px] text-gray-50 text-[12px] border-[1px] border-gray-5 flex justify-center items-center rounded-[12px]"
        >
          다시하기
        </button>
      </div>

      {/* 그래프 */}
      <div className="flex flex-col items-center gap-[24px]">
        <PieChart width={220} height={220}>
          <Pie
            data={DATA}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={110}
            startAngle={90}
            endAngle={-270}
          >
            {COLORS.map((item, idx) => (
              <Cell key={`cell-${idx}`} fill={item} stroke="none" />
            ))}
          </Pie>
        </PieChart>

        <div className="w-full px-[20px] gap-[8px] flex flex-col items-center">
          {DATA.map((item, idx) => (
            <div
              key={idx}
              className="flex w-[353px] h-[52px] bg-white rounded-[12px] items-center text-[12px] font-normal px-[12px] gap-[12px]"
            >
              <img src={item.icon} alt="icon" className="w-[24px] h-[24px]" />
              <div className="flex justify-between w-full items-center">
                <div>
                  <h1 className="text-gray-100 text-[12px] font-semibold">
                    {item.name}
                  </h1>
                  <p className="text-gray-30 font-medium text-[12px]">
                    ({((item.value / total) * 100).toFixed(1)}%)
                  </p>
                </div>
                <p className="text-gray-100 text-[12px] font-semibold">
                  {item.value?.toLocaleString()}원
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
