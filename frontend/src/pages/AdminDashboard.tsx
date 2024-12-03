import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Ambulance, 
  Users, 
  LogOut, 
  Bell, 
  Activity 
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeHover, setActiveHover] = useState<number | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const sections = [
    {
      id: 1,
      title: "Manage Ambulances",
      description: "Track and manage emergency vehicles",
      icon: Ambulance,
      route: "/admin/manage-ambulance",
      bgGradient: "from-blue-500 to-blue-700",
      hoverShadow: "hover:shadow-blue-500/50",
    },
    {
      id: 2,
      title: "Manage Team Members",
      description: "Coordinate EMT personnel",
      icon: Users,
      route: "/admin/manage-team-members",
      bgGradient: "from-green-500 to-green-700",
      hoverShadow: "hover:shadow-green-500/50",
    },
    {
      id: 3,
      title: "Emergency Alerts",
      description: "Monitor and respond to critical incidents",
      icon: Bell,
      route: "/admin/emergency-alerts",
      bgGradient: "from-red-500 to-red-700",
      hoverShadow: "hover:shadow-red-500/50",
    },
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <div className="flex items-center space-x-4">
                <img 
                  src="/red-cross-logo.png" 
                  alt="RescueSync Logo" 
                  className="h-10 w-10 rounded-full ring-2 ring-red-500"
                />
                <h1 className="text-2xl font-extrabold text-gray-900">
                  RescueSync <span className="text-red-600">Admin</span>
                </h1>
              </div>
            </div>
            <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
              <button
                onClick={handleLogout}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Admin Dashboard
          </h2>
          <p className="text-xl text-gray-600">
            Manage and coordinate emergency medical services
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <div 
                key={section.id}
                onMouseEnter={() => setActiveHover(section.id)}
                onMouseLeave={() => setActiveHover(null)}
                className={`
                  bg-gradient-to-br ${section.bgGradient} 
                  rounded-2xl p-6 text-white 
                  transform transition-all duration-300 
                  hover:-translate-y-2 ${section.hoverShadow}
                  ${activeHover === section.id ? 'scale-105 shadow-2xl' : 'scale-100'}
                `}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <IconComponent className="h-8 w-8 mr-4" />
                    <h3 className="text-xl font-bold">{section.title}</h3>
                  </div>
                  <p className="text-sm opacity-75 mb-6 flex-grow">
                    {section.description}
                  </p>
                  <button
                    onClick={() => navigate(section.route)}
                    className="
                      mt-auto w-full py-2 
                      bg-white bg-opacity-20 
                      hover:bg-opacity-30 
                      rounded-md 
                      transition-colors
                      flex items-center justify-center
                    "
                  >
                    Manage <Activity className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} RescueSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;