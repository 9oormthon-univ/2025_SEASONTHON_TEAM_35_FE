import PortfolioCard from './PortfolioCard';

export default function Portfolio({ data }) {
  return (
    <div className="px-[24px] py-[20px]">
      <div className="w-[345px] flex justify-between mb-[16px] items-center">
        <h1 className="text-gray-90 text-[16px] font-bold">포트폴리오</h1>
        <p className="text-gray-40 font-medium text-[12px]">
          2025.08.29 08:30 기준
        </p>
      </div>
      <div className="flex flex-col gap-[10px]">
        {data?.etfList?.map((item) => (
          <PortfolioCard
            title={item.symbol}
            summary={item.etfName}
            money={
              item.currency === 'KRW'
                ? `${item.price.toLocaleString()}`
                : `$${item.price.toLocaleString()}`
            }
            percent={item.dayChangePct}
            description={
              '이 ETF는 미국 나스닥 100 지수를 추종하며, 애플, 마이크로소프트, 엔비디아와 같은 미국 대표 기술주에 주로 투자합니다. 이 포트폴리오에서 가장 높은 수익률을 담당하며, 전체 변동성의 약 80% 이상을 차지할 정도로 큰 비중을 차지합니다.'
            }
          />
        ))}
      </div>
    </div>
  );
}
