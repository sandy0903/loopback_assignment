import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Projectuser} from './projectuser.model';
import {User} from './user.model';


@model()
export class Task extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  createdBy?: number;

  @property({
    type: 'number',
  })
  assignedTo?: number;

  @property({
    type: 'number',
  })
  projectId?: number;

  @property({
    type: 'number',
  })
  linkedTaskId?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'boolean',
  })
  isDeleted?: boolean;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @belongsTo(() => Projectuser)
  projectuserId: number;

  @belongsTo(() => User)
  userId: number;

  @belongsTo(() => Task)
  taskId: number;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
