export class CreateMissionPatientDto {
    missionId: number;
    patientName: string;
  }
  
  export class UpdateMissionPatientDto {
    missionId?: number;
    patientName?: string;
  }