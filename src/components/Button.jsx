import { Link } from 'react-router-dom';

export default function Button({ children, to, onClick }) {
  const className = "border-2 border-white rounded-xl px-8 py-4 m-2 text-lg bg-transparent hover:bg-gray-800 transition min-w-[120px] min-h-[60px] flex items-center justify-center";
  if (to) return <Link to={to} className={className}>{children}</Link>;
  return <button className={className} onClick={onClick}>{children}</button>;
} 