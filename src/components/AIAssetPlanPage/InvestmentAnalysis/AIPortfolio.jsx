import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import explainIcon from '../../../assets/AIAssetPlan/explainIcon.png';
import ExplanationModal from './ExplanationModal';

const TEMP_DATA = [
  {
    name: 'QQQM',
    value: 49.58,
  },
  {
    name: '272910.KS',
    value: 23.31,
  },
  {
    name: '277630.KS',
    value: 27.12,
  },
];
// 색상
const COLORS = ['#00D6B3', '#58A9FF', '#FFD562'];

const AI_PORTFOLIO = [
  {
    title: '예상 연 수익률',
    value: 16.29,
  },
  {
    title: '예상 연변동성',
    value: 16.29,
  },
  {
    title: '샤프지수',
    value: 1.35,
  },
  {
    title: '최대낙폭',
    value: -14.4,
  },
];
export default function AIPortfolio() {
  const [onClicked, setOnClicked] = useState('');
  const [modalOpen, setModalOpen] = useState({
    '예상 연 수익률': false,
    '예상 연변동성': false,
    샤프지수: false,
    최대낙폭: false,
  });
  return (
    <div className="px-[24px] py-[20px]">
      <div className="flex justify-between">
        <div>
          <h1 className="text-[16px] text-gray-90 font-bold">
            AI 추천 포트폴리오
          </h1>
          <Link
            to="ETF"
            className="text-gray-40 text-[12px] font-medium underline"
          >
            ETF란?
          </Link>
        </div>
        <Link
            to="/ai/plan/start"
            className="w-[66px] h-[26px] text-gray-50 text-[12px] border-[1px] border-gray-5 flex justify-center items-center rounded-[12px]">
          다시하기
        </Link>
      </div>
      {/* 그래프 */}
      <div className="border-b-[1px] border-gray-5 pb-[20px] flex flex-col items-center mt-[16px] gap-[24px]">
        <PieChart width={220} height={220}>
          <Pie
            data={TEMP_DATA}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={110}
            startAngle={90}
            endAngle={-270}
          >
            {COLORS.map((item, idx) => (
              <Cell key={`cell-${idx}`} fill={item} stroke="none" />
            ))}
          </Pie>
        </PieChart>
        <div className="w-full px-[20px] grid-cols-2 grid">
          {TEMP_DATA.map((item, idx) => (
            <div
              key={item.name}
              className="flex w-[150.5px] h-[24px] items-center text-[12px] font-normal px-[8px]"
            >
              <div
                className="w-[8px] h-[8px] rounded-[50%] mr-[8px]"
                style={{ backgroundColor: COLORS[idx] }}
              />
              <span className="text-gray-60">{item.name}</span>
              <span className="ml-auto text-gray-60">
                {item.value.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 mt-[16px] ">
        {AI_PORTFOLIO.map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="flex gap-[4px] items-center">
              <h1 className={`text-gray-80 text-[14px] font-medium `}>
                {item.title}
              </h1>
              <button
                className="w-[16px] h-[16px]"
                onClick={() => {
                  setOnClicked(item.title);
                  setModalOpen((prev) => ({ ...prev, [item.title]: true }));
                }}
              >
                <img src={explainIcon} alt="explainIcon" />
              </button>
            </div>
            <p
              className="text-[20px] font-bold"
              style={{
                color:
                  item.title === '예상 연 수익률' ||
                  item.title === '예상 연변동성'
                    ? '#0073FF'
                    : item.title === '샤프지수'
                    ? '#171F27'
                    : item.title === '최대낙폭'
                    ? '#FF0000'
                    : '#171F27',
              }}
            >
              {item.value.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
      {modalOpen['예상 연 수익률'] && (
        <ExplanationModal
          ModalOpen={modalOpen}
          setModalOpen={setModalOpen}
          title={onClicked}
          description="투자 자산을 1년 동안 유지했을 때 기대할 수 있는 평균적인 수익률"
        />
      )}
      {modalOpen['예상 연변동성'] && (
        <ExplanationModal
          ModalOpen={modalOpen}
          setModalOpen={setModalOpen}
          title={onClicked}
          description="1년 동안 투자 자산의 수익률이 얼마나 오르내릴 수 있는지를 보여주는 지표"
        />
      )}
      {modalOpen['샤프지수'] && (
        <ExplanationModal
          ModalOpen={modalOpen}
          setModalOpen={setModalOpen}
          title={onClicked}
          description="투자 수익률의 위험 대비 효율을 나타내는 지표"
          example={[
            '1 이하 : 낮음',
            '1 ~ 1.5 : 보통',
            '1.5 ~ 2 : 좋음',
            '2 이상 : 매우 좋음',
          ]}
        />
      )}
      {modalOpen['최대낙폭'] && (
        <ExplanationModal
          ModalOpen={modalOpen}
          setModalOpen={setModalOpen}
          title={onClicked}
          description="과거 특정 구간에서 자산 가치가 가장 크게 떨어진 최대 손실률을 나타내는 지표"
        />
      )}
    </div>
  );
}
