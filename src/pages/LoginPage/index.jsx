import { Link } from 'react-router-dom';

import kakaoIcon from '../../assets/Login/kakaoIcon.png';

export default function LoginPage() {
  return (
    <div className="h-full flex flex-col justify-end">
      <div className="flex flex-col font-bold text-[30px] mb-[317px] ml-[24px]">
        <h1 className="text-gray-100">AI 맞춤형 자산관리</h1>
        <h2 className="text-primary-2">그로우플랜</h2>
      </div>
      <Link
        to="/on-boarding"
        className="w-[350px] h-[56px] rounded-[12px] bg-[#FFEB3B] flex text-[16px] text-[#111111] font-bold justify-center items-center mb-[179px] self-center"
      >
        <img
          src={kakaoIcon}
          alt="kakaoIcon"
          className="w-[32px] h-[27px] mr-[6px]"
        />
        카카오톡으로 시작하기
      </Link>
    </div>
  );
}
