import { Link } from 'react-router-dom';

export default function NoInfo({ title, description, btnText, onButtonClick }) {
    // onButtonClick이 제공되면 button을, 그렇지 않으면 Link를 렌더링
    const isButtonMode = typeof onButtonClick === 'function';

    return (
    <div className="bg-white w-[361px] h-[630px] rounded-[12px] p-[20px]shadow-[0_0_8px_0_rgba(231,233,238,0.8)] flex flex-col gap-[32px] justify-center items-center">
      <div className="flex flex-col gap-[8px] items-center">
        <p className="text-gray-70 text-[16px] font-bold">{title}</p>
        <p className="text-gray-30 text-[14px]">{description}</p>
      </div>
        {isButtonMode ? (
            <button
                onClick={onButtonClick}
                className="w-[232px] h-[39px] bg-primary-2 rounded-[12px] text-[14px] text-white flex justify-center items-center"
            >
                {btnText}
            </button>
        ) : (
            <Link
                to="#" // 기본 Link는 동작하지 않도록 #으로 설정
                className="w-[232px] h-[39px] bg-primary-2 rounded-[12px] text-[14px] text-white flex justify-center items-center"
            >
                {btnText}
            </Link>
        )}
    </div>
  );
}
