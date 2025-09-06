import GoalSettingChart from '../../components/GoalSetting/GoalSettingChart';
import AIGoalAnalyze from '../../components/GoalSetting/AIGoalAnalyze';
import Footer from '../../components/layout/Footer';
import { useEffect, useState } from 'react';
import { getGoalSettingInfo } from '../../api/goalApi';
export default function GoalSettingPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getGoalSettingInfo();
      if (result) {
        setData(result);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-background h-screen">
      <GoalSettingChart data={data} />
      <div className="self-center">
        <AIGoalAnalyze data={data} />
      </div>
      <Footer />
    </div>
  );
}
