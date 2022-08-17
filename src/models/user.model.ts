import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Projectuser} from './projectuser.model';
import {Project} from './project.model';
import { RoleEnum } from '../enum/user';
import {Usercredentials} from './usercredentials.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'array',
    itemType: 'string',
    jsonSchema: {
      enum: Object.values(RoleEnum)
    }
  })
  roles?: RoleEnum[]

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
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
