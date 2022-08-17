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
  Project,
} from '../models';
import {UsercredentialsRepository} from '../repositories';

export class UsercredentialsProjectController {
  constructor(
    @repository(UsercredentialsRepository)
    public usercredentialsRepository: UsercredentialsRepository,
  ) { }

  @get('/usercredentials/{id}/project', {
    responses: {
      '200': {
        description: 'Project belonging to Usercredentials',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async getProject(
    @param.path.number('id') id: typeof Usercredentials.prototype.id,
  ): Promise<Project> {
    return this.usercredentialsRepository.project(id);
  }
}
