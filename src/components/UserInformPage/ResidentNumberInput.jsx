import React, { useState, useEffect, useRef } from 'react';
import visibleIcon from '../../assets/userInformPage/visible.png';
import invisibleIcon from '../../assets/userInformPage/invisible.png';


export default function ResidentNumberInput({ value = {}, onChange, error }) {
    const [part1, setPart1] = useState(value.part1 || '');
    const [part2, setPart2] = useState(value.part2 || '');
    const [isMasked, setIsMasked] = useState(true);

    const part1Ref = useRef(null);
    const part2Ref = useRef(null);

    // 외부에서 value prop이 변경될 때 내부 상태 업데이트
    useEffect(() => {
        setPart1(value.part1 || '');
        setPart2(value.part2 || '');
    }, [value]);

    const handlePartChange = (partName, inputValue) => {
        // 숫자만 입력 가능하도록 필터링
        const filteredValue = inputValue.replace(/[^0-9]/g, '');

        if (partName === 'part1') {
            const newPart1 = filteredValue.slice(0, 6);
            setPart1(newPart1);
            onChange({ ...value, part1: newPart1 });
            // 6자리 모두 입력되면 다음 필드로 포커스 이동
            if (newPart1.length === 6 && part2Ref.current) {
                part2Ref.current.focus();
            }
        } else if (partName === 'part2') {
            const newPart2 = filteredValue.slice(0, 7);
            setPart2(newPart2);
            onChange({ ...value, part2: newPart2 });
        }
    };

    return (
        <div className="flex items-center gap-2">
            {/* 첫 번째 6자리 입력 필드 */}
            <input
                ref={part1Ref}
                type="text"
                value={part1}
                onChange={(e) => handlePartChange('part1', e.target.value)}
                placeholder="생년월일 6자리"
                maxLength={6}
                className={`w-[164px] h-[50px] px-3 rounded-lg border text-lg text-center
                           ${error ? 'border-red-500' : 'border-gray-10'}
                           focus:border-primary-1 focus:ring-1 focus:ring-primary-1
                           focus:shadow-primary-focus-light`}
            />
            <span className="text-gray-40">-</span>

            {/* 두 번째 7자리 입력 필드 (마스킹 처리) */}
            <div className="relative w-[169px] h-[50px] ">
                <input
                    ref={part2Ref}
                    // 마스킹 타입을 'password' 그대로 사용하되, CSS로 별표 모양 생성해야함
                    type={isMasked ? 'password' : 'text'}
                    value={part2}
                    onChange={(e) => handlePartChange('part2', e.target.value)}
                    placeholder="뒤 7자리"
                    maxLength={7}
                    className={`w-full h-[50px] px-4 rounded-lg border text-lg text-center
                               ${error ? 'border-red-500' : 'border-gray-10'}
                               focus:border-primary-1 focus:ring-1 focus:ring-primary-1
                               focus:shadow-primary-focus-light
                               ${isMasked ? 'font-sans-password' : ''}`}
                />
                <button
                    type="button"
                    onClick={() => setIsMasked(!isMasked)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                >
                    <img
                        src={isMasked ? invisibleIcon : visibleIcon}
                        alt={isMasked ? "비밀번호 보이기" : "비밀번호 숨기기"}
                        className="w-4 h-4"
                    />
                </button>
            </div>
        </div>
    );
}