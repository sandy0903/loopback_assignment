import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Projectuser,
  Project,
} from '../models';
import {ProjectuserRepository} from '../repositories';

export class ProjectuserProjectController {
  constructor(
    @repository(ProjectuserRepository)
    public projectuserRepository: ProjectuserRepository,
  ) { }

  @get('/projectusers/{id}/project', {
    responses: {
      '200': {
        description: 'Project belonging to Projectuser',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async getProject(
    @param.path.number('id') id: typeof Projectuser.prototype.id,
  ): Promise<Project> {
    return this.projectuserRepository.project(id);
  }
}
