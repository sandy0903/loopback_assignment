import {Entity, model, property, hasMany} from '@loopback/repository';
import {Task} from './task.model';

@model()
export class Project extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc: string;

  @property({
    type: 'boolean',
  })
  isDeleted: boolean;

  @property({
    type: 'date',
  })
  updatedAt: string;

  @property({
    type: 'date',
  })
  createdAt: string;

  @property({
    type: 'string',
  })
  status: string;

  @hasMany(() => Task)
  tasks: Task[];

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {

  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;
