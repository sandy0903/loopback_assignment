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
  Project,
  Projectuser,
} from '../models';
import {ProjectRepository} from '../repositories';

export class ProjectProjectuserController {
  constructor(
    @repository(ProjectRepository) protected projectRepository: ProjectRepository,
  ) { }

  @get('/projects/{id}/projectusers', {
    responses: {
      '200': {
        description: 'Array of Project has many Projectuser',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Projectuser)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Projectuser>,
  ): Promise<Projectuser[]> {
    return this.projectRepository.projectusers(id).find(filter);
  }

  @post('/projects/{id}/projectusers', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: {'application/json': {schema: getModelSchemaRef(Projectuser)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Project.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectuser, {
            title: 'NewProjectuserInProject',
            exclude: ['id'],
            optional: ['projectId']
          }),
        },
      },
    }) projectuser: Omit<Projectuser, 'id'>,
  ): Promise<Projectuser> {
    return this.projectRepository.projectusers(id).create(projectuser);
  }

  @patch('/projects/{id}/projectusers', {
    responses: {
      '200': {
        description: 'Project.Projectuser PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
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
    return this.projectRepository.projectusers(id).patch(projectuser, where);
  }

  @del('/projects/{id}/projectusers', {
    responses: {
      '200': {
        description: 'Project.Projectuser DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Projectuser)) where?: Where<Projectuser>,
  ): Promise<Count> {
    return this.projectRepository.projectusers(id).delete(where);
  }
}
