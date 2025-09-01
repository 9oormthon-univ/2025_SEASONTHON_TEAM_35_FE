import { Link } from 'react-router-dom';
import pencilIcon from '../../assets/MyPage/pencilIcon.png';

export default function UserInfo() {
  return (
    <div className=" w-[361px] h-[140px] rounded-[12px] pt-[20px] px-[20px] flex flex-col items-center">
      {/* user */}
      <div className="flex flex-col gap-[24px] pb-[24px] items-center ">
        <div className="w-[92px] h-[92px] bg-primary-4 rounded-[50%]" />
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-[20px] text-gray-100">유저 이름</h1>
          <p className="font-medium text-[16px] text-gray-40">
            9ooromthon@goorom.com
          </p>
        </div>
      </div>
      {/* 나의 초기 자금 */}
      <div className=" w-[353px] h-[72px] rounded-[12px] py-[24px] px-[20px] flex justify-between bg-white shadow-[0_0_8px_#E7E9EE] mb-[350px]">
        <h1 lassName="text-gray-100 text-[16px] font-medium">나의 초기 자금</h1>
        <button className="flex items-center gap-[3px]">
          <h1 className="text-gray-100 text-[16px] font-bold">7,200,000 원</h1>
          <img
            src={pencilIcon}
            alt="pencilIcon"
            className="w-[16px] h-[16px]"
          />
        </button>
      </div>
      {/* logout */}
      <Link
        to="/login"
        className="w-[353px] h-[55px] text-[#FF0000] text-[18px] border-t-[1px] border-gray-10 flex justify-center items-center font-normal py-[14px] rounded-[12px]"
      >
        로그아웃
      </Link>
    </div>
  );
}
