import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title }) {
  return (
    <div className="bg-background h-[852px] overflow-y-auto">
      <Header title={title} />

      <main className="flex-1 overflow-y-auto pb-[90px]">{children}</main>

      <Footer />
    </div>
  );
}
