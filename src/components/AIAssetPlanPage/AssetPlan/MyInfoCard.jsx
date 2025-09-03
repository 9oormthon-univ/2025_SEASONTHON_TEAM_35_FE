import { Link } from 'react-router-dom';

const MY_INFO = [
  {
    title: '현재 자산',
    content: 12000000,
  },
  {
    title: '월 저축 금액',
    content: 0,
    min: 500000,
    max: 1000000,
  },
  {
    title: '목표 기간',
    content: 2,
  },
  {
    title: '투자 성향',
    content: '안정형',
  },
];

export default function MyInfoCard() {
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
                {item.content.toLocaleString()} 원
              </p>
            )}
            {item.title === '월 저축 금액' && (
              <p className="text-gray-100 text-[14px] font-medium">
                {item.min.toLocaleString()} 원 ~ {item.max.toLocaleString()} 원
              </p>
            )}
            {item.title === '목표 기간' && (
              <p className="text-gray-100 text-[14px] font-medium">
                {item.content}년
              </p>
            )}
            {item.title === '투자 성향' && (
              <p className="text-gray-100 text-[14px] font-medium">
                {item.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
