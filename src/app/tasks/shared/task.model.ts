export class Task {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  title: string;
  description: string;
  createdBy: string;
  requiredDate: Date;
}

export class CreateTask {
  title: string;
  description: string;
  createdBy: string;
  requiredDate: string;
  completed: boolean;
}
