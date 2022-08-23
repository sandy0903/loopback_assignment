import { inject } from '@loopback/core';
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
  HttpErrors,
} from '@loopback/rest';
import {Project, Task} from '../models';
import {ProjectRepository, ProjectuserRepository, TaskRepository} from '../repositories';
import {UserProfile, SecurityBindings} from '@loopback/security';

export class ProjectController {
  constructor(
    @repository(ProjectRepository)
    public projectRepository : ProjectRepository,
    @repository(ProjectuserRepository)
    public projectuserRepository : ProjectuserRepository,
    @repository(TaskRepository)
    public taskRepository : TaskRepository,
  ) {}
  @post('/projects/{id}/tasks')
  @response(200, {
    description: 'Project model instance',
    content: {'application/json': {schema: getModelSchemaRef(Task)}},
  })
  async createtaskProject(
    @param.path.string('id') projectId:typeof Project.prototype.id,
    @inject(SecurityBindings.USER)
    currentUser:UserProfile,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {
            title: 'NewProject',
            exclude: ['id'],
          }),
        },
      },
    })
    task: Omit<Task, 'id'>,
  ): Promise<Task> {
    const userId=currentUser?.id;
    const projectUser= await this.projectuserRepository?.findOne({
      where:{
        userId,
        projectId
      }
    })
    if(!projectId){
      throw new HttpErrors.Unauthorized('You have not permistion to access this project')
    }
    const projectRole=projectUser?.role

    return this.taskRepository.create({
      ...task,
      userId,
      projectId
    })
  }
  @get('/projects/{id}/tasks')
  @response(200, {
    description: 'Array of task',
    content: {'application/json': {schema: {
      type:'array',
      items:getModelSchemaRef(Task),
    }}},
  })
  async getTaskByProjectId(
    @param.path.string('id') projectId:typeof Project.prototype.id,
    @inject(SecurityBindings.USER)
    currentUser:UserProfile,
  ): Promise<Task[]> {
    const userId=currentUser.id;
    const projectUser= await this.projectuserRepository.findOne({
      where:{
        userId,
        projectId
      }
    })
    if(!projectUser){
      throw new HttpErrors.Unauthorized('You have not permistion to access this project')
    }
    const tasks:Task[]=await this.taskRepository.find({
      where:{
        userId,
        projectId
      },
      include:[
        {
          relation:'user'
        }
      ]
    })

    const userRole=projectUser.role
    if(userRole=='admin'){
      return tasks
    }
    return tasks.filter(task=>task.createdBy=='user')
  }



  @post('/projects')
  @response(200, {
    description: 'Project model instance',
    content: {'application/json': {schema: getModelSchemaRef(Project)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {
            title: 'NewProject',
            exclude: ['id'],
          }),
        },
      },
    })
    project: Omit<Project, 'id'>,
  ): Promise<Project> {
    return this.projectRepository.create(project);
  }

  @get('/projects/count')
  @response(200, {
    description: 'Project model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Project) where?: Where<Project>,
  ): Promise<Count> {
    return this.projectRepository.count(where);
  }

  @get('/projects')
  @response(200, {
    description: 'Array of Project model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Project, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Project) filter?: Filter<Project>,
  ): Promise<Project[]> {
    return this.projectRepository.find(filter);
  }

  @patch('/projects')
  @response(200, {
    description: 'Project PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {partial: true}),
        },
      },
    })
    project: Project,
    @param.where(Project) where?: Where<Project>,
  ): Promise<Count> {
    return this.projectRepository.updateAll(project, where);
  }

  @get('/projects/{id}')
  @response(200, {
    description: 'Project model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Project, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Project, {exclude: 'where'}) filter?: FilterExcludingWhere<Project>
  ): Promise<Project> {
    return this.projectRepository.findById(id, filter);
  }

  @patch('/projects/{id}')
  @response(204, {
    description: 'Project PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {partial: true}),
        },
      },
    })
    project: Project,
  ): Promise<void> {
    await this.projectRepository.updateById(id, project);
  }

  @put('/projects/{id}')
  @response(204, {
    description: 'Project PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() project: Project,
  ): Promise<void> {
    await this.projectRepository.replaceById(id, project);
  }

  @del('/projects/{id}')
  @response(204, {
    description: 'Project DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.projectRepository.deleteById(id);
  }

}
