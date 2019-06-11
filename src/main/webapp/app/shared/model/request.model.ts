import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export const enum Priority {
  High = 'High',
  Normal = 'Normal',
  Low = 'Low'
}

export const enum Status {
  Pending = 'Pending',
  Approved = 'Approved',
  Assigned = 'Assigned'
}

export interface IRequest {
  id?: number;
  name?: string;
  description?: string;
  priority?: Priority;
  created?: Moment;
  approved?: Moment;
  assigned?: Moment;
  status?: Status;
  technician?: IUser;
}

export const defaultValue: Readonly<IRequest> = {};
