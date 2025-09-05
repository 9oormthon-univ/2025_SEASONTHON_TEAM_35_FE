import GoalSettingChart from '../../components/GoalSetting/GoalSettingChart';
import AIGoalAnalyze from '../../components/GoalSetting/AIGoalAnalyze';
import Footer from '../../components/layout/Footer';
export default function GoalSettingPage() {
  return (
    <div className="flex flex-col bg-background h-screen">
      <GoalSettingChart />
      <div className="self-center">
        <AIGoalAnalyze />
      </div>
      <Footer />
    </div>
  );
}
