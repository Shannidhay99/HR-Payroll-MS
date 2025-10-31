import PropTypes from 'prop-types';

const StatCard = ({ icon, title, value, color = 'blue' }) => {
  const colorSchemes = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex justify-between items-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group">
      <div className="flex-1">
        <h3 className="text-gray-600 text-sm font-medium mb-2 group-hover:text-gray-700 transition-colors">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">{value}</p>
      </div>
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${colorSchemes[color]} flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string,
};

const DashboardStats = ({ totalEmployees, todayPresent, todayAbsent, monthlyPayroll }) => {
  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      color: 'blue',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-1c0-1.1.9-2 2-2s2 .9 2 2v1h2v-1c0-2.2-1.8-4-4-4s-4 1.8-4 4v1h2zm8-10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 1c-2.2 0-4 1.8-4 4v4h2v-4c0-1.1.9-2 2-2s2 .9 2 2v4h2v-4c0-2.2-1.8-4-4-4zm6 2c-1.1 0-2 .9-2 2v4h2v-4c0-.55.45-1 1-1s1 .45 1 1v4h2v-4c0-1.1-.9-2-2-2z"/>
        </svg>
      ),
    },
    {
      title: 'Today Present',
      value: todayPresent,
      color: 'green',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
      ),
    },
    {
      title: 'Today Absent',
      value: todayAbsent,
      color: 'red',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      ),
    },
    {
      title: 'Monthly Payroll',
      value: monthlyPayroll,
      color: 'yellow',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

DashboardStats.propTypes = {
  totalEmployees: PropTypes.number.isRequired,
  todayPresent: PropTypes.number.isRequired,
  todayAbsent: PropTypes.number.isRequired,
  monthlyPayroll: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default DashboardStats;
