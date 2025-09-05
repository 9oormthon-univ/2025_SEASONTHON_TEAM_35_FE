import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title, variant = 'default' }) {

    // 1. Wizard 페이지일 경우 (variant === 'wizard')
    // Header, Footer 없이 자식 컴포넌트(Wizard 페이지)가 전체 공간을 사용하도록 합니다.
    if (variant === 'wizard') {
        return (
            <div className="h-full bg-white">
                {children}
            </div>
        );
    }

    // 2. 일반 페이지일 경우 (기존 Layout 방식)
    return (
        <div className="bg-background h-[852px] overflow-y-auto">
            <Header title={title} />
            <main className="flex-1 overflow-y-auto pb-[90px] scrollbar-hide">
                {children}
            </main>

            <Footer />
        </div>
    );
}