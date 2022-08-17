import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usercredentials,
  User,
} from '../models';
import {UsercredentialsRepository} from '../repositories';

export class UsercredentialsUserController {
  constructor(
    @repository(UsercredentialsRepository)
    public usercredentialsRepository: UsercredentialsRepository,
  ) { }

  @get('/usercredentials/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Usercredentials',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Usercredentials.prototype.id,
  ): Promise<User> {
    return this.usercredentialsRepository.user(id);
  }
}
