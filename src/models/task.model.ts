import { UserWithRelations } from '@loopback/authentication-jwt';
import {Entity, model, property, belongsTo} from '@loopback/repository';
import { Project, ProjectWithRelations } from './project.model';
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

  // @property({
  //   type: 'string',
  // })
  // projectId?: string;

  // @property({
  //   type: 'string',
  // })
  // linkedTaskId: string;

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

  @belongsTo(() => Project)
  projectId: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Task)
  linkTaskId: string;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  task?: TaskWithRelations[]
  project?: ProjectWithRelations[]
  user?: UserWithRelations[]
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
