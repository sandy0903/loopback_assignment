import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { inject } from '@loopback/core';
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
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';

import {
  Project,
  Task,
} from '../models';
import {ProjectRepository, ProjectuserRepository, TaskRepository} from '../repositories';
@authenticate('jwt')
export class ProjectTaskController {
  constructor(
    @repository(ProjectRepository) protected projectRepository: ProjectRepository,
    @repository(ProjectuserRepository) protected projectUserRepository: ProjectuserRepository,
    @repository(TaskRepository) protected taskRepository: TaskRepository,


  ) { }

  @get('/projects/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of Project has many Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Task)},
          },
        },
      },
    },
  })
  async getTaskByProjectId(
    @inject(SecurityBindings.USER) user: UserProfile,
    @param.path.string('id') projectId: string,
  ): Promise<Task[]> {
    // console.log(user)
    const userId=user?.id;
    const projectUser=await this.projectUserRepository.findOne({
      where:{
        userId,
        projectId
      }
    })
    if(!projectUser){
      throw new HttpErrors.Unauthorized("Do not have access")

    }
    // const tasks:Task[]=await this.taskRepository.find({
    //   where:{
    //     projectId,
    //   },
    //   include:[
    //     {
    //       relation:'user'
    //     }
    //   ]
    // })
    // const projectRole=projectUser.role;
    // if(projectRole=='admin'){
    //   return tasks
    // }
    return this.taskRepository.find({
      where:{
        projectId
      }
    })
  }

  @post('/projects/{id}/tasks', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: {'application/json': {schema: getModelSchemaRef(Task)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Project.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {
            title: 'NewTaskInProject',
            exclude: ['id'],
            optional: ['projectId']
          }),
        },
      },
    }) task: Omit<Task, 'id'>,
  ): Promise<Task> {
    return this.projectRepository.tasks(id).create(task);
  }

  @patch('/projects/{id}/tasks', {
    responses: {
      '200': {
        description: 'Project.Task PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {partial: true}),
        },
      },
    })
    task: Partial<Task>,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.projectRepository.tasks(id).patch(task, where);
  }

  @del('/projects/{id}/tasks', {
    responses: {
      '200': {
        description: 'Project.Task DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.projectRepository.tasks(id).delete(where);
  }
}
