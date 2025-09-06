export default function MyInfoCard({ aiAssetData }) {
  const MY_INFO = [
    {
      title: '현재 자산',
      content: aiAssetData?.totalAmount,
    },
    {
      title: '월 저축 금액',
      content: aiAssetData?.savingRange,
    },
    {
      title: '목표 기간',
      content: aiAssetData?.investmentPeriod,
    },
    {
      title: '투자 성향',
      content: aiAssetData?.propensity,
    },
  ];
  const SAVING_RANGE = {
    BELOW_10: '10만원 이하',
    BETWEEN_10_50: '10-50만원',
    BETWEEN_50_100: ' 50-100만원',
    BETWEEN_100_200: '100-200만원',
    ABOVE_200: ' 200만원 이상',
  };
  const INVESTMENT_PERIOD = {
    UNDER_6_MONTHS: ' 6개월 이내',
    UNDER_1_YEAR: '1년 이내',
    UNDER_2_YEARS: '2년 이내',
    UNDER_3_YEARS: '3년 이내',
    UNDER_5_YEARS: ' 5년 이내',
    UNDER_10_YEARS: ' 10년 이내',
    OVER_10_YEARS: '10년 이상',
  };
  const PROPENSITY_MAP = {
    STABLE: '안정형',
    ACTIVE: '공격형',
    COMMON: '보통형',
  };

  return (
    <div className="pt-[20px] pb-[76px] px-[24px] flex flex-col gap-[16px]">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-90 text-[16px] font-bold">나의 입력 정보</h1>
      </div>
      <div className="flex flex-col gap-[7px]">
        {MY_INFO.map((item, idx) => (
          <div key={idx} className="flex gap-[15px]">
            <h1 className="text-gray-50 text-[14px] font-medium w-[70px]">
              {item.title}
            </h1>

            {item.title === '현재 자산' && (
              <p className="text-gray-100 text-[14px] font-medium">
                {item.content?.toLocaleString()} 원
              </p>
            )}
            {item.title === '월 저축 금액' && (
              <p className="text-gray-100 text-[14px] font-medium">
                {SAVING_RANGE[item.content]}
              </p>
            )}
            {item.title === '목표 기간' && (
              <p className="text-gray-100 text-[14px] font-medium">
                {INVESTMENT_PERIOD[item.content]}
              </p>
            )}
            {item.title === '투자 성향' && (
              <p className="text-gray-100 text-[14px] font-medium">
                {PROPENSITY_MAP[item.content]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
