import { UserWithRelations } from '@loopback/authentication-jwt';
import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Project, ProjectWithRelations} from './project.model';
import {User} from './user.model';

@model()
export class Usercredentials extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required:true
  })
  password: string;

  @property({
    type: 'string',
required:true
  })
  email: string;


  @belongsTo(() => Project)
  projectId?: number;

  @belongsTo(() => User)
  userId?: string;

  constructor(data?: Partial<Usercredentials>) {
    super(data);
  }
}

export interface UsercredentialsRelations {
  user?: UserWithRelations[]

  project?: ProjectWithRelations[]
  // describe navigational properties here
}

export type UsercredentialsWithRelations = Usercredentials & UsercredentialsRelations;
