import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Project, ProjectWithRelations} from './project.model';

@model()
export class Projectuser extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  userId?: number;
  @property({
    type: 'string',
  })
  role?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @belongsTo(() => Project)
  projectId: number;

  constructor(data?: Partial<Projectuser>) {
    super(data);
  }
}

export interface ProjectuserRelations {
  project?: ProjectWithRelations[]
  // describe navigational properties here
}

export type ProjectuserWithRelations = Projectuser & ProjectuserRelations;
