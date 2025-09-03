import { Link } from 'react-router-dom';
import userIcon from '../../assets/icons/user.png';

export default function Header({ title }) {
  return (
    <header className="sticky top-0 w-full max-w-[393px] mx-auto h-[108px] bg-background z-10">
      <div className="flex justify-between items-center absolute bottom-2 w-full px-5">
        <h1 className="text-xl font-bold text-gray-90">{title}</h1>
        <Link to="/my-page" aria-label="마이페이지">
          <img src={userIcon} alt="마이페이지" className="w-[24px] h-[24px]" />
        </Link>
      </div>
    </header>
  );
}
