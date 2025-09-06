import { useNavigate } from 'react-router-dom';
import UserInfo from '../../components/MyPage/UserInfo';
import backIcon from '../../assets/MyPage/backIcon.png';
import { getMyPageInfo } from '../../api/myPageApi';
import { useState, useEffect } from 'react';

export default function MyPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getMyPageInfo();
      if (result) {
        setData(result);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="h-full bg-background flex flex-col items-center">
      <div className="w-full h-[108px] flex gap-[16px] items-center pl-[20px] pt-[68px] mb-[11px]">
        <button onClick={() => navigate(-1)} className="w-[24px] h-[24px]">
          <img src={backIcon} alt="backIcon" />
        </button>
        <h1 className="text-gray-90 font-bold text-[20px]">마이페이지</h1>
      </div>
      <UserInfo data={data} />
    </div>
  );
}
