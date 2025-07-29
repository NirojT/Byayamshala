import { TaskStatus } from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "@/global/interface";

export interface IEquipmentDetails {
  id: number;
  name: string;
  quantity: number;
  rate: number;
  description: string;
}
export interface IEquipmentData {
  name: string;
  quantity: number;
  rate: number;
  description: string;
}
export type IEquipmentStore = {
  equipmentData: IEquipmentData;
  setEquipmentData: (equipmentData: IEquipmentData) => void;
  clearEquipmentData: () => void;
  equipmentId: number;
  setEquipmentId: (data: number) => void;
  equipments: IEquipmentDetails[];

  create: () => Promise<IResponse>;
  getEquipments: () => Promise<void>;
  deleteEquipment: (equipmentId: number) => Promise<IResponse>;
  //task
  data: IMaintainanceTaskData;
  setData: (data: IMaintainanceTaskData) => void;
  clearData: () => void;
  createTask: (data: IMaintainanceTaskData) => Promise<IResponse>;
  getTasks: () => Promise<void>;
  tasks: IMaintainanceTaskDetails[];
  setTasks: (data: IMaintainanceTaskDetails[]) => void;
  changeTaskStatus: (taskId: number, status: TaskStatus) => Promise<IResponse>;
  deleteTask: (taskId: number) => Promise<IResponse>;

  totalLength: number;
  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;
};

export interface IMaintainanceTaskDetails extends IAuditDetails {
  equipmentName: string;
  taskDate: string;
  description: string;
  status: TaskStatus;
}
export interface IMaintainanceTaskData {
  id: number;
  equipmentId: number;
  taskDate: string;
  description: string;
  status: TaskStatus;
}
