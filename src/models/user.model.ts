import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Projectuser, ProjectuserWithRelations} from './projectuser.model';
import {Project, ProjectWithRelations} from './project.model';
import { RoleEnum } from '../enum/user';
import {Usercredentials, UsercredentialsWithRelations} from './usercredentials.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  role?: string;

@property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'boolean',
  })
  isDeleted?: boolean;

  @property({
    type: 'boolean',
  })
  isActive?: boolean;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @hasMany(() => Projectuser)
  projectusers: Projectuser[];

  @belongsTo(() => Project)
  projectId: number;

  @hasOne(() => Usercredentials)
  usercredentials: Usercredentials;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  project?: ProjectWithRelations[]
  projectusers?: ProjectuserWithRelations[]
  usercredentials?: UsercredentialsWithRelations[]
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
