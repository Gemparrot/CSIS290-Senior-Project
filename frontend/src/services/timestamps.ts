import axios from '../utils/axiosConfig';

// Define the allowed event types
export type TimestampEvent =
  | 'departure_to_case'
  | 'arrival_to_case'
  | 'departure_to_destination'
  | 'arrival_to_destination'
  | 'unit_available'
  | 'arrival_to_station';

// Define the Timestamp DTO for creating a timestamp
export interface CreateTimestampDto {
  event: TimestampEvent;
  timestamp: Date; // ISO string or Date object
}

// Define the Timestamp response interface
export interface Timestamp extends CreateTimestampDto {
  id: number;
  missionId: number;
  created_at: Date;
  updated_at: Date;
}

// Change from const to export default
export default {
  /**
   * Create a new timestamp for a specific mission.
   * @param missionId - The ID of the mission.
   * @param createTimestampDto - The payload for creating a timestamp.
   * @returns The created timestamp.
   */
  create: async (missionId: number, createTimestampDto: CreateTimestampDto): Promise<Timestamp> => {
    const response = await axios.post<Timestamp>(`/missions/${missionId}/timestamps`, createTimestampDto);
    return response.data;
  },

  /**
   * Get all timestamps for a specific mission.
   * @param missionId - The ID of the mission.
   * @returns An array of timestamps for the mission.
   */
  findAll: async (missionId: number): Promise<Timestamp[]> => {
    const response = await axios.get<Timestamp[]>(`/missions/${missionId}/timestamps`);
    return response.data;
  },

  /**
   * Get a specific timestamp by ID for a mission.
   * @param missionId - The ID of the mission.
   * @param id - The ID of the timestamp.
   * @returns The requested timestamp.
   */
  findOne: async (missionId: number, id: number): Promise<Timestamp> => {
    const response = await axios.get<Timestamp>(`/missions/${missionId}/timestamps/${id}`);
    return response.data;
  },
};