import {Entity, model, property} from '@loopback/repository';

@model()
export class Project extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'boolean',
  })
  isDeleted?: boolean;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'string',
  })
  status?: string;


  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;
