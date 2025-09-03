import { useNavigate } from 'react-router-dom';

import ETFConcept from '../../../components/AIAssetPlanPage/ETF/ETFConcept';
import Footer from '../../../components/layout/Footer';
import closeBtn from '../../../assets/AIAssetPlan/ETF/closeBtn.png';

export default function ETFExplanation() {
  const navigate = useNavigate();
  return (
    <div className="overflow-y-auto scrollbar-hide bg-white">
      <div className="w-[393px] h-[108px] px-[20px] pb-[8px] flex items-end justify-end">
        <button className="w-[24px] h-[24px]" onClick={() => navigate(-1)}>
          <img src={closeBtn} alt="backIcon" />
        </button>
      </div>
      {/* content */}
      <div className="w-full h-[654px]">
        <ETFConcept />
      </div>
      <Footer />
    </div>
  );
}
