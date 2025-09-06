import seeMoreBtn from '../../assets/icons/seeMoreBtn.png';
import { Link } from 'react-router-dom';

export default function NoInfoCard({ title, description, buttonTitle, to }) {
  return (
    <>
      <div className="flex flex-col gap-[16px] bg-white h-[188px] rounded-[12px] justify-center items-center shadow-[0_0_8px_#E7E9EECC]">
        <p className="text-gray-30 text-[14px] font-medium">{description}</p>
        <Link
          to={to}
          className={`flex gap-[4px] ${
            title === 'goalSetting' ? ' w-[114px] ' : 'w-[130px]'
          } border-[1px] h-[30px] border-gray-5 rounded-[16px] justify-center items-center`}
        >
          <h1 className="text-gray-40 text-[12px] font-normal">
            {buttonTitle}
          </h1>
          <img
            src={seeMoreBtn}
            alt="seeMoreBtn"
            className="w-[16px] h-[16px]"
          />
        </Link>
      </div>
    </>
  );
}
