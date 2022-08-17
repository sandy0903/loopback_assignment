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
import {Usercredentials} from '../models';
import {UsercredentialsRepository} from '../repositories';

export class UsercredentialController {
  constructor(
    @repository(UsercredentialsRepository)
    public usercredentialsRepository : UsercredentialsRepository,
  ) {}

  @post('/usercredentials')
  @response(200, {
    description: 'Usercredentials model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usercredentials)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usercredentials, {
            title: 'NewUsercredentials',
            exclude: ['id'],
          }),
        },
      },
    })
    usercredentials: Omit<Usercredentials, 'id'>,
  ): Promise<Usercredentials> {
    return this.usercredentialsRepository.create(usercredentials);
  }

  @get('/usercredentials/count')
  @response(200, {
    description: 'Usercredentials model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usercredentials) where?: Where<Usercredentials>,
  ): Promise<Count> {
    return this.usercredentialsRepository.count(where);
  }

  @get('/usercredentials')
  @response(200, {
    description: 'Array of Usercredentials model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usercredentials, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usercredentials) filter?: Filter<Usercredentials>,
  ): Promise<Usercredentials[]> {
    return this.usercredentialsRepository.find(filter);
  }

  @patch('/usercredentials')
  @response(200, {
    description: 'Usercredentials PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usercredentials, {partial: true}),
        },
      },
    })
    usercredentials: Usercredentials,
    @param.where(Usercredentials) where?: Where<Usercredentials>,
  ): Promise<Count> {
    return this.usercredentialsRepository.updateAll(usercredentials, where);
  }

  @get('/usercredentials/{id}')
  @response(200, {
    description: 'Usercredentials model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usercredentials, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usercredentials, {exclude: 'where'}) filter?: FilterExcludingWhere<Usercredentials>
  ): Promise<Usercredentials> {
    return this.usercredentialsRepository.findById(id, filter);
  }

  @patch('/usercredentials/{id}')
  @response(204, {
    description: 'Usercredentials PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usercredentials, {partial: true}),
        },
      },
    })
    usercredentials: Usercredentials,
  ): Promise<void> {
    await this.usercredentialsRepository.updateById(id, usercredentials);
  }

  @put('/usercredentials/{id}')
  @response(204, {
    description: 'Usercredentials PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usercredentials: Usercredentials,
  ): Promise<void> {
    await this.usercredentialsRepository.replaceById(id, usercredentials);
  }

  @del('/usercredentials/{id}')
  @response(204, {
    description: 'Usercredentials DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usercredentialsRepository.deleteById(id);
  }
}
