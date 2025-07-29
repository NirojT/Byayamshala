import { TaskStatus } from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "../../../../../../global/interface";
 

export type IListTaskStore = {
  tasks: ITaskDetails[];
  getTask: () => Promise<void>;

  totalLength: number;

  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;
  openModal: boolean;
  setOpenModal: (openModel: boolean) => void;
selectedTask: ITaskDetails | null;
  setSelectedTask: (task: ITaskDetails | null) => void;
  

  taskStatus: TaskStatus;
  setTaskStatus: (status: TaskStatus) => void;
  delete: (id: number) => Promise<IResponse>;
  changeStatus: (id: number) => Promise<IResponse>;
};

export interface ITaskDetails extends IAuditDetails {
    

    trainerName: string;
    memberName: string;
    startDate: string;
    endDate: string;
    taskStatus: TaskStatus;
    sessionDuration: number;
    notes: string;
 
}

 
