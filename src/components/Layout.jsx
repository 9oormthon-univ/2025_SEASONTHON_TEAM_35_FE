import { Link } from 'react-router-dom';
import userIcon from '../assets/icons/user.png';

export default function Layout({ children, title }) {
    return (
        // h-screen과 overflow-y-auto 추가 (스크롤 기능)
        <div className="bg-background h-screen overflow-y-auto">
            {/* sticky로 상단에 고정*/}
            <header className="sticky top-0 w-full max-w-[393px] mx-auto h-[108px] bg-background z-10">
                <div className="flex justify-between items-center absolute bottom-2 w-full px-5">
                    <h1 className="text-xl font-bold text-gray-90">{title}</h1>
                    <Link to="/mypage">
                        <img src={userIcon} alt="마이페이지" className="w-[24px] h-[24px]" />
                    </Link>
                </div>
            </header>

            <main className="px-7 pb-5">
                {children}
            </main>
        </div>
    );
}