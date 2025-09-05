import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title }) {
    return (
        <div className="bg-background h-screen overflow-y-auto relative">
            <Header title={title} />

            {/* 스크롤 때문에 Footer 높이만큼 padding-bottom */}
            <main className="px-7 pb-[100px]">
                {children}
            </main>

      <Footer />
    </div>
  );
}
