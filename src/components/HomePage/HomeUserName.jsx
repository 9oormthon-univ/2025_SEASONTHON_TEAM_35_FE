import { useHome } from "@/context/HomeContext.jsx";

export default function HomeUserName() {
    const { loading, error, home } = useHome();
    const name = home?.name || "";

    if (loading) return (
        <div>
            <h1 className="text-gray-80 text-[20px] font-medium">환영합니다</h1>
            <h1 className="text-gray-80 font-bold text-[20px]">
                <span className="text-primary-1">로딩 중</span> …
            </h1>
        </div>
    );

    if (error) return (
        <div>
            <h1 className="text-gray-80 text-[20px] font-medium">환영합니다</h1>
            <h1 className="text-gray-80 font-bold text-[20px]">
                <span className="text-primary-1">사용자</span> 님!
            </h1>
            <p className="text-[12px] text-gray-40 mt-1">이름을 불러오지 못했어요.</p>
        </div>
    );

    return (
        <div>
            <h1 className="text-gray-80 text-[20px] font-medium">환영합니다</h1>
            <h1 className="text-gray-80 font-bold text-[20px]">
                <span className="text-primary-1">{name || "사용자"}</span> 님!
            </h1>
        </div>
    );
}
