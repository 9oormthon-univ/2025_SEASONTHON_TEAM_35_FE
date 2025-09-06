import GoalSettingChart from '../../components/GoalSetting/GoalSettingChart';
import AIGoalAnalyze from '../../components/GoalSetting/AIGoalAnalyze';
import Footer from '../../components/layout/Footer';
import { useEffect, useState } from 'react';
import { getGoalSettingInfo } from '../../api/goalApi';
import NoInfo from '../../components/NoInfo/NoInfo';
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
      {data ? (
        <>
          <GoalSettingChart data={data} />
          <div className="self-center">
            <AIGoalAnalyze data={data} />
          </div>
          <Footer />
        </>
      ) : (
        <div className="flex justify-center">
          <NoInfo
            link="/ai/plan/start"
            title="아직 AI 자산 설계를 받지 않았습니다."
            description="가장 알맞은 자산 비율을 찾아보세요!"
            btnText="AI 자산 설계 받기"
          />
        </div>
      )}
    </div>
  );
}
