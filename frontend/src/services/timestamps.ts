import axios from '../utils/axiosConfig';

export type TimestampEvent =
  | 'departure_to_case'
  | 'arrival_to_case'
  | 'departure_to_destination'
  | 'arrival_to_destination'
  | 'unit_available'
  | 'arrival_to_station';

export interface CreateTimestampDto {
  event: TimestampEvent;
  timestamp: Date;
}

export interface Timestamp extends CreateTimestampDto {
  id: number;
  missionId: number;
  created_at: Date;
  updated_at: Date;
}

export default {
  create: async (missionId: number, createTimestampDto: CreateTimestampDto): Promise<Timestamp> => {
    const response = await axios.post<Timestamp>(`/missions/${missionId}/timestamps`, createTimestampDto);
    return response.data;
  },

  findAll: async (missionId: number): Promise<Timestamp[]> => {
    const response = await axios.get<Timestamp[]>(`/missions/${missionId}/timestamps`);
    return response.data;
  },

  findOne: async (missionId: number, id: number): Promise<Timestamp> => {
    const response = await axios.get<Timestamp>(`/missions/${missionId}/timestamps/${id}`);
    return response.data;
  },
};