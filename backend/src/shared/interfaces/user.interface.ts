export interface User {
  id: string;  
  userType: 'ambulance' | 'admin'; // Include userType as a union type
  vehicle_number?: string; // Optional property for ambulance user
  username?: string; // Optional property for admin user
}