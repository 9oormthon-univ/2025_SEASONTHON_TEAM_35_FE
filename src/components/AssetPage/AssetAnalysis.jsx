import { Link } from 'react-router-dom'; // react-router-dom을 사용한다고 가정

export default function AssetAnalysis() {
    return (
        <div className="w-[361px]  flex flex-col gap-2">
            {/* 헤더 */}
            <div className="flex justify-between items-center">
                <h2 className="text-base text-gray-100 font-bold">자산 분석</h2>
                <Link to="/asset-input" className="text-xs text-gray-40"> {/* 자산 입력 페이지 경로 */}
                    수정하기 &gt;
                </Link>
            </div>
            {/* 컨텐츠 카드 , h를 살짝 작게 잡아둠*/}
            <div className="w-[361px] h-[250px] bg-white rounded-xl shadow-sm flex items-center justify-center">
                <span className="text-gray-40">자산 분석 내용 표기 예정</span>
            </div>
        </div>
    );
}