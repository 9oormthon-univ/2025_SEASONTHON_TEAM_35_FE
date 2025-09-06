import starIcon from '../../../assets/AIAssetPlan/starIcon.png';

export default function AIAssetOpinionCard({ aiAssetData }) {
  return (
    <div className="w-full py-[20px] flex justify-center">
      <div className="w-[353px] rounded-[16px] bg-white  border-[2px] border-primary-2 shadow-[0_0_10px_#00d6b27d] flex flex-col gap-[16px] py-[20px] px-[24px]">
        <div className="flex gap-[10px] items-center ">
          <img src={starIcon} alt="starIcon" className="w-[24px] h-[24px]" />
          <h1 className="font-bold text-[16px] text-gray-90">AI 자산 의견</h1>
        </div>
        <div className="text-gray-100 text-[14px] flex flex-col gap-[10px] font-medium">
          <p>{aiAssetData?.recommendationMessage}</p>
        </div>
      </div>
    </div>
  );
}
