import GoalSettingChart from '../../components/GoalSetting/GoalSettingChart';
import AIGoalAnalyze from '../../components/GoalSetting/AIGoalAnalyze';
import Footer from '../../components/layout/Footer';
export default function GoalSettingPage() {
  return (
    <div className="flex flex-col bg-background h-screen">
      {/* header */}
      <div className="w-full h-[108px] flex items-end py-[12px] px-[20px]">
        <h1 className="text-gray-90 text-[20px] font-bold">목표 설정</h1>
      </div>
      <GoalSettingChart />
      <div className="self-center">
        <AIGoalAnalyze />
      </div>
      <Footer />
    </div>
  );
}
