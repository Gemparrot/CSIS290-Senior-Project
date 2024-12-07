export interface User {
  id: string;  
  userType: 'ambulance' | 'admin'; 
  vehicle_number?: string; 
  username?: string;
}