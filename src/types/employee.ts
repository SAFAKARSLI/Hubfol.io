import { EMPLOYEE_STATUS } from '@prisma/client';
import Project from './project';

export default interface Employee {
  uuid: string;
  name: string;
  email: string;
  title: string;
  status: EMPLOYEE_STATUS;
  hourlyRate: number;
  phoneNumber: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  projects: Project[];
}
