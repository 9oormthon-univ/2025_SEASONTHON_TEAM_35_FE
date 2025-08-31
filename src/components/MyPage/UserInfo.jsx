import { Link } from 'react-router-dom';
export default function UserInfo() {
  return (
    <div className="bg-white w-[361px] h-[140px] rounded-[12px] pt-[20px] px-[20px] flex flex-col">
      <div className="flex gap-[16px] pb-[20px]">
        <div className="w-[48px] h-[48px] bg-primary-3 rounded-[12px]" />
        <h1 className="font-bold text-[18px] self-center">유저 1</h1>
      </div>
      <Link
        to="/login"
        className="h-[52px] text-gray-40 text-[14px] border-t-[1px] flex justify-center items-center"
      >
        로그아웃
      </Link>
    </div>
  );
}
