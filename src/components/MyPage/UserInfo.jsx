import seeMoreBtn from '../../assets/icons/seeMoreBtn.png';
import { getMyPageInfo } from '../../api/myPageApi';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

export default function UserInfo() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchDate = async () => {
      const result = await getMyPageInfo();
      if (result) {
        setData(result);
      }
    };
    fetchDate();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };
  return (
    <div className="flex flex-col items-center ">
      <div className="py-[24px] px-[20px] mb-[373px] bg-white w-[353px] h-[270px]  rounded-[12px] flex flex-col items-center shadow-[0_0_8px_#E7E9EECC]">
        {/* user */}
        <div className="flex flex-col gap-[24px] pb-[24px] items-center ">
          <div className="w-[92px] h-[92px] bg-primary-4 rounded-[50%]" />
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-[20px] text-gray-100">
              {data?.name}
            </h1>
            <p className="font-medium text-[16px] text-gray-40">
              {data?.email}
            </p>
          </div>
        </div>
        <Link
            to="/mypage/up-to-date"
            className="w-[124px] h-[30px] flex gap-[4px] border-[1px] border-gray-5 rounded-[16px]  justify-center items-center">
          <p className="text-gray-40 font-normal text-[12px]">
            자산 최신화하기
          </p>
          <img
            src={seeMoreBtn}
            alt="seeMoreBtn"
            className="w-[16px] h-[16px] "
          />
        </Link>
      </div>
      {/* logout */}
      <button
        onClick={handleLogout}
        className="w-[353px] h-[55px] text-[#FF0000] text-[18px] border-t-[1px] border-gray-10 flex justify-center items-center font-normal py-[14px] rounded-[12px]"
      >
        로그아웃
      </button>
    </div>
  );
}
