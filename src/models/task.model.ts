import { UserWithRelations } from '@loopback/authentication-jwt';
import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Projectuser, ProjectuserWithRelations} from './projectuser.model';
import {User} from './user.model';

// import {Task} from './task.model';

@model()
export class Task extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  createdBy?: string;

  @property({
    type: 'number',
  })
  assignedTo?: number;

  @property({
    type: 'string',
  })
  projectId?: string;

  @property({
    type: 'string',
  })
  linkedTaskId: string;

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
  projectuserId: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Task)
  linktaskId: string;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  tasks?: TaskWithRelations[]
  projectusers?: ProjectuserWithRelations[]
  user?: UserWithRelations[]
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
