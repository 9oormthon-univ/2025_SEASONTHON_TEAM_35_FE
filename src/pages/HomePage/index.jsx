import Layout from '../../components/layout/Layout';
import Home from '../../components/HomePage/Home';
export default function HomePage() {
  return (
    <Layout title="홈">
      <div className="px-[20px] h-full bg-graduation flex flex-col mt-[40px] mb-[30px] gap-[24px]">
        <div>
          <h1 className="text-gray-80 text-[20px] font-medium">환영합니다</h1>
          <h1 className="text-gray-80 font-bold text-[20px]">
            <span className="text-primary-1">유저 이름</span> 님!
          </h1>
        </div>
        <Home />
      </div>
    </Layout>
  );
}
