import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('access_token');
    if (token) {
      // 토큰 저장
      localStorage.setItem('accessToken', token);
      console.log(token);
      // 로그인 성공 후 이동할 페이지 (예: 온보딩)
      navigate('/onboarding/1');
    } else {
      console.error('카카오 로그인 실패: 토큰 없음');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return <div>로그인 처리 중...</div>;
}

// redirect 주소 : http://localhost:5173/oauth/callback/kakao
