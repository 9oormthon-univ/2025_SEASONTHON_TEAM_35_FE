import seeMoreBtn from '../../assets/icons/seeMoreBtn.png';
import { getMyPageInfo } from '../../api/myPageApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../../assets/MyPage/profile.png'

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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        await fetch('https://growplanserver.shop/api/v0/member/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      localStorage.removeItem('accessToken');
    } catch (err) {
      console.error('로그아웃 에러:', err);
    } finally {
      const redirectUri = encodeURIComponent('http://localhost:5173/login');
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=4b5e28ec03160488f7d0cac9750a11c4&logout_redirect_uri=${redirectUri}`;
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="py-[24px] px-[20px] mb-[373px] bg-white w-[353px] h-[270px]  rounded-[12px] flex flex-col items-center shadow-[0_0_8px_#E7E9EECC]">
        {/* user */}
        <div className="flex flex-col gap-[24px] pb-[24px] items-center ">
          <img src={profile} alt='profile' className='w-[92px] h=[92px]' />
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
          className="w-[124px] h-[30px] flex gap-[4px] border-[1px] border-gray-5 rounded-[16px]  justify-center items-center"
        >
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
