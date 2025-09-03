import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title }) {
  return (
    <div className="bg-background h-[852px] overflow-y-auto relative">
      <Header title={title} />

      <main className="px-7 h-[654px] overflow-y-auto">{children}</main>

      <Footer />
    </div>
  );
}
