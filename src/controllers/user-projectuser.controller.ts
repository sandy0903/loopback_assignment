import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Projectuser,
} from '../models';
import {UserRepository} from '../repositories';

export class UserProjectuserController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/projectusers', {
    responses: {
      '200': {
        description: 'Array of User has many Projectuser',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Projectuser)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Projectuser>,
  ): Promise<Projectuser[]> {
    return this.userRepository.projectusers(id).find(filter);
  }

  @post('/users/{id}/projectusers', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Projectuser)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectuser, {
            title: 'NewProjectuserInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) projectuser: Omit<Projectuser, 'id'>,
  ): Promise<Projectuser> {
    return this.userRepository.projectusers(id).create(projectuser);
  }

  @patch('/users/{id}/projectusers', {
    responses: {
      '200': {
        description: 'User.Projectuser PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectuser, {partial: true}),
        },
      },
    })
    projectuser: Partial<Projectuser>,
    @param.query.object('where', getWhereSchemaFor(Projectuser)) where?: Where<Projectuser>,
  ): Promise<Count> {
    return this.userRepository.projectusers(id).patch(projectuser, where);
  }

  @del('/users/{id}/projectusers', {
    responses: {
      '200': {
        description: 'User.Projectuser DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Projectuser)) where?: Where<Projectuser>,
  ): Promise<Count> {
    return this.userRepository.projectusers(id).delete(where);
  }
}
