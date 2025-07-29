import { IAuditDetails, IResponse } from "@/global/interface";

// Request payload for registering/updating a biometric device
export interface IBiometricsData {
  deviceName: string;
  deviceSN: string;
  deviceModel?: string;
  deviceType?: string;
  brand?: string;
  locationDescription?: string;
}

// Server response details (should match BiometricDeviceRes)
export interface IBiometricsDetails extends IAuditDetails {
  deviceName: string;
  deviceSN: string;
  deviceModel?: string;
  deviceType?: string;
  brand?: string;
  locationDescription?: string;
  status: string;


  allowAutoDoorLock: boolean;
  blockShiftAccess: boolean;

  lastHeartbeatAt?: string;
  createdAt?: string;
  cloudServerUrl?: string;
}
export interface IBiometricsCommands extends IAuditDetails {
  
  
   
  deviceSN: string; // Serial Number of the biometric device
  commandType: string; // e.g., "ADD_USER", "DELETE_USER", "
  
  commandPayload: string; // The actual command string for the specific device protocol
  status: string; // Renamed enum
  createdAt: string; // Timestamp when the command was created
  sentAt?: string; // Timestamp when the command was sent to the device
  processedAt?: string; // Timestamp when the command was processed by the device
  retryCount: number; // Number of times the command has been retried
  errorMessage?: string; // Error message if the command failed
  memberId?: number; // ID of the member associated with the command
}

export interface IBiometricsStore {
  data: IBiometricsData;
  setData: (data: IBiometricsData) => void;
  clearData: () => void;
  create: () => Promise<IResponse>;
  update: (id: number) => Promise<IResponse>;
  delete: (id: number) => Promise<IResponse>;

  biometrics: IBiometricsDetails[];
  getBiometrics: () => Promise<void>;

  doorUnlock: (deviceSN: string) => Promise<IResponse>;
  getBiometricsCommnads: (deviceSN: string) => Promise<void>;
  getUsersCommnads: (deviceSN: string) => Promise<void>;
  commands: IBiometricsCommands[];
  doorAccessLogic: (
    id: number,
    allowAutoDoorLock: boolean,
    blockShiftAccess: boolean
  ) => Promise<IResponse>;

  openDelete: boolean;
  setOpenDelete: (openDelete: boolean) => void;
  deleteId: number;
  setDeleteId: (id: number) => void;

  totalLength: number;
  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;
}
