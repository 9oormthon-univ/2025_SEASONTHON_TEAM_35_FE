import seeMoreBtn from '../../assets/icons/seeMoreBtn.png';
import { Link } from 'react-router-dom';
import AssetAnalysis from "@/components/AssetPage/AssetAnalysis.jsx";
import TotalAssets from "@/components/AssetPage/TotalAssets.jsx";
import ROA from "@/components/AIAssetPlanPage/InvestmentAnalysis/ROA.jsx";
export default function Home() {

  return (
    <div className="flex flex-col gap-[24px]">
      {/* 총 자산 */}
      <TotalAssets/>
      {/* 자산 분석 */}
      <AssetAnalysis/>

      {/* AI 자산 설계 */}
      {/*<div className="flex flex-col gap-[12px]">*/}
      {/*  <div className="flex justify-between">*/}
      {/*    <h1 className="text-gray-100 text-[16px] font-bold">AI 자산 설계</h1>*/}
      {/*    <Link className="flex gap-[4px] items-center">*/}
      {/*      <p className="text-gray-40 text-[12px] font-medium">더보기</p>*/}
      {/*      <img*/}
      {/*        src={seeMoreBtn}*/}
      {/*        alt="seeMoreBtn"*/}
      {/*        className="w-[16px] h-[16px]"*/}
      {/*      />*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-col gap-[16px] bg-white h-[188px] rounded-[12px] justify-center items-center shadow-[0_0_8px_#E7E9EECC]">*/}
      {/*    <p className="text-gray-30 text-[14px] font-medium">*/}
      {/*      AI를 통해 자산 관리를 시작해보세요!*/}
      {/*    </p>*/}
      {/*    <Link className="flex gap-[4px] w-[130px] h-[30px] border-[1px] border-gray-5 rounded-[16px] justify-center items-center ">*/}
      {/*      <h1 className="text-gray-40 text-[12px] font-normal">*/}
      {/*        AI 자산 설계 받기*/}
      {/*      </h1>*/}
      {/*      <img*/}
      {/*        src={seeMoreBtn}*/}
      {/*        alt="seeMoreBtn"*/}
      {/*        className="w-[16px] h-[16px]"*/}
      {/*      />*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="w-[350px] h-[300px]">
        <ROA />
      </div>

      {/* 목표 관리 */}
      <div className="flex flex-col gap-[12px]">
        <div className="flex justify-between">
          <h1 className="text-gray-100 text-[16px] font-bold">목표 관리</h1>
          <Link className="flex gap-[4px] items-center">
            <p className="text-gray-40 text-[12px] font-medium">더보기</p>
            <img
              src={seeMoreBtn}
              alt="seeMoreBtn"
              className="w-[16px] h-[16px]"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-[16px] bg-white h-[188px] rounded-[12px] justify-center items-center shadow-[0_0_8px_#E7E9EECC]">
          <p className="text-gray-30 text-[14px] font-medium">
            AI가 목표에 맞는 자산 설계를 도와드려요!
          </p>
          <Link className="flex gap-[4px] w-[114px] h-[30px] border-[1px] border-gray-5 rounded-[16px] justify-center items-center">
            <h1 className="text-gray-40 text-[12px] font-normal">
              목표 설정하기
            </h1>
            <img
              src={seeMoreBtn}
              alt="seeMoreBtn"
              className="w-[16px] h-[16px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
