import { Link } from 'react-router-dom';

const MY_INFO = [
  {
    title: '현재 자산',
    content: '12,000,000 원',
  },
  {
    title: '월 저축 금액',
    content: '500,000 원',
  },
  {
    title: '목표 기간',
    content: '2년',
  },
  {
    title: '투자 성향',
    content: '안정형',
  },
];

export default function MyInfoCard() {
  return (
    <div className="py-[20px] px-[24px] bg-white flex flex-col gap-[16px]">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-90 text-[16px] font-bold">나의 입력 정보</h1>
      </div>
      <div className="flex flex-col gap-[7px]">
        {MY_INFO.map((item, idx) => (
          <div key={idx} className="flex gap-[15px]">
            <h1 className="text-gray-50 text-[14px] font-medium w-[70px]">
              {item.title}
            </h1>
            <p className="text-gray-100 text-[14px] font-medium">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
