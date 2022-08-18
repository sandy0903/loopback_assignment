import {Entity, model, property} from '@loopback/repository';

@model()
export class Userwithpassword extends Entity {
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
  password: string;


  constructor(data?: Partial<Userwithpassword>) {
    super(data);
  }
}

export interface UserwithpasswordRelations {
  // describe navigational properties here
}

export type UserwithpasswordWithRelations = Userwithpassword & UserwithpasswordRelations;
