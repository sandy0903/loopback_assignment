import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Projectuser} from '../models';
import {ProjectuserRepository} from '../repositories';

export class ProjectuserController {
  constructor(
    @repository(ProjectuserRepository)
    public projectuserRepository : ProjectuserRepository,
  ) {}

  @post('/projectusers')
  @response(200, {
    description: 'Projectuser model instance',
    content: {'application/json': {schema: getModelSchemaRef(Projectuser)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectuser, {
            title: 'NewProjectuser',
            exclude: ['id'],
          }),
        },
      },
    })
    projectuser: Omit<Projectuser, 'id'>,
  ): Promise<Projectuser> {
    return this.projectuserRepository.create(projectuser);
  }

  @get('/projectusers/count')
  @response(200, {
    description: 'Projectuser model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Projectuser) where?: Where<Projectuser>,
  ): Promise<Count> {
    return this.projectuserRepository.count(where);
  }

  @get('/projectusers')
  @response(200, {
    description: 'Array of Projectuser model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Projectuser, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Projectuser) filter?: Filter<Projectuser>,
  ): Promise<Projectuser[]> {
    return this.projectuserRepository.find(filter);
  }

  @patch('/projectusers')
  @response(200, {
    description: 'Projectuser PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectuser, {partial: true}),
        },
      },
    })
    projectuser: Projectuser,
    @param.where(Projectuser) where?: Where<Projectuser>,
  ): Promise<Count> {
    return this.projectuserRepository.updateAll(projectuser, where);
  }

  @get('/projectusers/{id}')
  @response(200, {
    description: 'Projectuser model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Projectuser, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Projectuser, {exclude: 'where'}) filter?: FilterExcludingWhere<Projectuser>
  ): Promise<Projectuser> {
    return this.projectuserRepository.findById(id, filter);
  }

  @patch('/projectusers/{id}')
  @response(204, {
    description: 'Projectuser PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectuser, {partial: true}),
        },
      },
    })
    projectuser: Projectuser,
  ): Promise<void> {
    await this.projectuserRepository.updateById(id, projectuser);
  }

  @put('/projectusers/{id}')
  @response(204, {
    description: 'Projectuser PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() projectuser: Projectuser,
  ): Promise<void> {
    await this.projectuserRepository.replaceById(id, projectuser);
  }

  @del('/projectusers/{id}')
  @response(204, {
    description: 'Projectuser DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.projectuserRepository.deleteById(id);
  }
}
