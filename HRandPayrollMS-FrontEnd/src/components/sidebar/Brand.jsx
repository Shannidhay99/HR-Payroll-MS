import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <img
        className="w-auto h-8"
        src="/images/smarthrlogo.png"
        alt="brand-logo"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      {/* Fallback logo */}
      <div className="w-12 h-12 bg-gray-900 group-hover:bg-red-600 rounded-lg hidden items-center justify-center transition-colors duration-200">
        <span className="text-white font-bold text-lg">HR</span>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
          SmartHR
        </h2>
        <p className="text-sm text-gray-600">Payroll System</p>
      </div>
    </Link>
  );
}
