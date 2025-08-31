import NoInfo from '../../components/NoInfo/NoInfo';
import Footer from '../../components/layout/Footer';

export default function HomePage() {
  return (
    <div className="h-full bg-background flex flex-col items-center">
      {/* layout */}
      {/* content */}
      <NoInfo
        title="아직 자산을 입력하지 않았습니다."
        description="보유하신 자산을 입력해주세요!
"
        btnText="자산 입력하기"
        link="inform"
      />
      {/* footer */}
      <Footer />
    </div>
  );
}
