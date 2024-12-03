import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ambulanceService from "../services/ambulance";
import MissionForm from "../components/forms/MissionForm";

interface Ambulance {
  vehicle_number: string;
}

const AmbulanceDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [vehicleNumber, setVehicleNumber] = useState<string | null>(null);
  const [isMissionFormOpen, setIsMissionFormOpen] = useState(false);

  useEffect(() => {
    const fetchAmbulanceDetails = async () => {
      try {
        const response = await ambulanceService.getMyAmbulance();
        const ambulance = response as Ambulance;
        setVehicleNumber(ambulance.vehicle_number);
      } catch (error) {
        console.error("Error fetching ambulance details:", error);
        setVehicleNumber("Error loading");
      }
    };

    fetchAmbulanceDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ambulanceId");
    navigate("/login");
  };

  const sections = [
    {
      id: 1,
      title: "Pending PCR",
      description: "View and manage pending missions",
      route: "/pending-missions",
      bgGradient: "from-yellow-500 to-yellow-700",
      hoverShadow: "hover:shadow-yellow-500/50",
    },
    {
      id: 2,
      title: "Equipment Checkup",
      description: "Ensure emergency gear readiness",
      route: "/equipment-checkup",
      bgGradient: "from-green-500 to-green-700",
      hoverShadow: "hover:shadow-green-500/50",
    },
    {
      id: 3,
      title: "Vehicle Checkup",
      description: "Maintain vehicle condition",
      route: "/vehicle-checkups",
      bgGradient: "from-blue-500 to-blue-700",
      hoverShadow: "hover:shadow-blue-500/50",
    },
    {
      id: 4,
      title: "Create Mission",
      description: "Plan and execute new missions",
      onClick: () => setIsMissionFormOpen(true),
      bgGradient: "from-red-500 to-red-700",
      hoverShadow: "hover:shadow-red-500/50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src="/red-cross-logo.png"
                alt="RescueSync Logo"
                className="h-10 w-10 rounded-full"
              />
              <h1 className="text-2xl font-extrabold ml-4">
                RescueSync <span className="text-white">Ambulance</span>
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Ambulance Dashboard
          </h2>
          <p className="text-xl text-gray-600">
            Manage ambulance missions and patient information
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={section.onClick || (() => navigate(section.route))}
              className={`
                bg-gradient-to-br ${section.bgGradient} 
                rounded-2xl p-6 text-white cursor-pointer
                transform transition-all duration-300 
                hover:-translate-y-2 ${section.hoverShadow}
              `}
            >
              <h3 className="text-xl font-bold mb-4">{section.title}</h3>
              <p className="text-sm opacity-75">{section.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-700 p-4 text-center">
        Vehicle Number: {vehicleNumber || "Loading..."}
      </footer>

      {/* Mission Form Modal */}
      <MissionForm
        isOpen={isMissionFormOpen}
        onClose={() => setIsMissionFormOpen(false)}
      />
    </div>
  );
};

export default AmbulanceDashboard;
