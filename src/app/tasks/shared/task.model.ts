export class Task {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  title: string;
  description: string;
  createdBy: string;
  requiredDate: Date;
  completed: boolean;
}

export class CreateTask {
  title: string;
  description: string;
  createdBy: string;
  requiredDate: Date;
  completed: boolean;
}
