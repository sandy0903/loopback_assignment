import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Project, ProjectWithRelations} from './project.model';

@model()
export class Projectuser extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  userId: string;
  @property({
    type: 'string',
  })
  role: string;

  @property({
    type: 'date',
  })
  createdAt: string;

  @property({
    type: 'date',
  })
  updatedAt: string;

  @belongsTo(() => Project)
  projectId: string;

  constructor(data?: Partial<Projectuser>) {
    super(data);
  }
}

export interface ProjectuserRelations {
  project?: ProjectWithRelations[]
  // describe navigational properties here
}

export type ProjectuserWithRelations = Projectuser & ProjectuserRelations;
