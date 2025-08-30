// src/components/Layout.jsx
import { Link } from 'react-router-dom';
import userIcon from '../assets/icons/user.png';

export default function Layout({ children, title }) {
    return (
        // ✨ 1. 여기에 h-screen과 overflow-y-auto를 추가하여
        //    이 컴포넌트 자체를 스크롤 가능한 컨테이너로 만듭니다.
        <div className="bg-background h-screen overflow-y-auto">
            {/* 2. 고정 상단바 */}
            {/* 이제 sticky를 사용해서 스크롤 시에도 상단에 고정되도록 합니다. */}
            <header className="sticky top-0 w-full max-w-[393px] mx-auto h-[108px] bg-background z-10">
                <div className="flex justify-between items-center absolute bottom-2 w-full px-5">
                    <h1 className="text-xl font-bold text-gray-90">{title}</h1>
                    <Link to="/mypage">
                        <img src={userIcon} alt="마이페이지" className="w-[24px] h-[24px]" />
                    </Link>
                </div>
            </header>

            {/* 3. 메인 컨텐츠 영역 */}
            {/* 헤더가 더 이상 fixed가 아니므로, pt(padding-top)는 필요 없습니다. */}
            <main className="px-7 pb-5">
                {children}
            </main>
        </div>
    );
}