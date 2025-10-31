# HR and Payroll Management System

A comprehensive web-based HR and Payroll Management System built with React.js, Redux Toolkit, and modern web technologies. This system provides a complete solution for managing human resources, employee data, payroll processing, attendance tracking, and organizational workflows.

## 🌟 Features

### 👥 Human Resources Management
- **Employee Management**: Add, edit, and manage employee profiles
- **Department Organization**: Organize employees by departments
- **Role-based Access Control**: Different access levels for admins, HR, and employees

### 💰 Payroll System
- **Salary Management**: Configure and manage employee salaries
- **Payroll Processing**: Automated payroll calculations
- **Payment History**: Track and manage payment records
- **Expense Management**: Handle company expenses and reimbursements

### 📊 Attendance & Time Tracking
- **Real-time Attendance**: Track employee check-in/check-out
- **Leave Management**: Handle leave requests and approvals
- **Attendance Reports**: Generate comprehensive attendance reports
- **Timeline Tracking**: Visual timeline of employee activities

### 📈 Analytics & Reporting
- **Dashboard Analytics**: Interactive charts and statistics
- **Performance Reports**: Employee and department performance metrics
- **Custom Reports**: Generate custom reports based on various parameters

### 🔔 Communication & Notifications
- **Internal Notifications**: System-wide notifications
- **Task Management**: Assign and track tasks
- **Feedback System**: Employee feedback and survey management

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Toggle between theme modes
- **Intuitive UI**: Clean and user-friendly interface
- **Real-time Updates**: Live data updates without page refresh

## 🛠️ Tech Stack

### Frontend
- **React.js 19** - Modern UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

### Charts & Visualization
- **ECharts** - Interactive data visualization
- **echarts-for-react** - React wrapper for ECharts

### UI/UX Libraries
- **React Tooltip** - Interactive tooltips
- **React Toastify** - Toast notifications
- **React Outside Click Handler** - Click outside detection

### Development Tools
- **ESLint** - Code linting and quality
- **Autoprefixer** - CSS vendor prefixing
- **SWC** - Fast JavaScript/TypeScript compiler

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rashedrefat/HR-and-Payroll-Management-System.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd HR-and-Payroll-Management-System
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in the terminal)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
HR-and-Payroll-Management-System/
├── public/                     # Static assets
│   ├── icons/                  # UI icons and graphics
│   └── images/                 # Images and logos
├── src/
│   ├── app/                    # App configuration
│   │   ├── App.jsx            # Main application component
│   │   ├── AuthContext.js     # Authentication context
│   │   └── store.js           # Redux store configuration
│   ├── components/            # Reusable UI components
│   │   ├── charts/            # Chart components
│   │   ├── dashboard/         # Dashboard components
│   │   ├── navbar/            # Navigation components
│   │   ├── sidebar/           # Sidebar components
│   │   └── hooks/             # Custom React hooks
│   ├── features/              # Redux slices and API logic
│   │   ├── auth/              # Authentication features
│   │   ├── crm/               # CRM-related features
│   │   ├── drawer/            # UI drawer management
│   │   └── theme/             # Theme management
│   ├── layouts/               # Layout components
│   ├── pages/                 # Page components
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── Login/             # Login page
│   │   └── Registration/      # Registration page
│   └── Routers/               # Routing configuration
├── constants/                 # Application constants
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## 🎯 Key Components

### Authentication System
- Secure login and registration
- JWT token management
- Role-based access control
- Session management

### Dashboard
- Interactive analytics dashboard
- Real-time data visualization
- Customizable widgets
- Performance metrics

### Employee Management
- Complete employee profiles
- Department assignments
- Role management
- Contact information

### Payroll Processing
- Automated salary calculations
- Tax deductions
- Benefits management
- Payment processing

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory and add your configuration:

```env
VITE_API_BASE_URL=your_api_url_here
VITE_APP_NAME=HR and Payroll Management System
```

### Theme Configuration
The application supports both light and dark themes. Theme settings are managed through Redux and persisted in local storage.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1920px and above)
- Laptops (1024px - 1919px)
- Tablets (768px - 1023px)
- Mobile phones (320px - 767px)

## 🤝 Contributing

We welcome contributions to improve the HR and Payroll Management System! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rashed Refat**
- GitHub: [@rashedrefat](https://github.com/rashedrefat)
- Email: 21303006@iubat.edu

## 🙏 Acknowledgments

- Thanks to the React.js community for excellent documentation
- Redux Toolkit team for state management solutions
- Tailwind CSS for the utility-first CSS framework
- ECharts team for powerful data visualization tools
- All contributors and testers who helped improve this project

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/rashedrefat/HR-and-Payroll-Management-System/issues) page
2. Create a new issue with detailed description
3. Contact the maintainer via email

## 🔄 Version History

- **v1.0.0** - Initial release with core HR and Payroll features
- **v1.1.0** - Added advanced analytics and reporting
- **v1.2.0** - Enhanced UI/UX and mobile responsiveness

---

⭐ **Star this repository if you found it helpful!**
