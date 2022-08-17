import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Task,
  Projectuser,
} from '../models';
import {TaskRepository} from '../repositories';

export class TaskProjectuserController {
  constructor(
    @repository(TaskRepository)
    public taskRepository: TaskRepository,
  ) { }

  @get('/tasks/{id}/projectuser', {
    responses: {
      '200': {
        description: 'Projectuser belonging to Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Projectuser)},
          },
        },
      },
    },
  })
  async getProjectuser(
    @param.path.number('id') id: typeof Task.prototype.id,
  ): Promise<Projectuser> {
    return this.taskRepository.projectuser(id);
  }
}
