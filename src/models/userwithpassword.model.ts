import {model, property} from '@loopback/repository';
import {User} from '.';

@model()
export class Userwithpassword extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<Userwithpassword>) {
    super(data);
  }
}

export interface UserwithpasswordRelations {
  // describe navigational properties here
}

export type UserwithpasswordWithRelations = Userwithpassword & UserwithpasswordRelations;
