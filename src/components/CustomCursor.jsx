import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // 마우스 위치 업데이트
            setPosition({ x: e.clientX, y: e.clientY });
        };

        // 마우스 이동 이벤트 리스너 등록
        window.addEventListener('mousemove', handleMouseMove);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: position.y,
                left: position.x,
                // 원형 커서 스타일
                width: '20px',
                height: '20px',
                backgroundColor: 'rgba(220, 220, 220, 0.6)', // 투명한 흰색
                borderRadius: '50%',
                pointerEvents: 'none', // 커서가 다른 요소 클릭 방해 방지
                transform: 'translate(-50%, -50%)', // 커서 정중앙에 위치
                zIndex: 9999, // 다른 요소 위에 표시
            }}
        />
    );
};

export default CustomCursor;