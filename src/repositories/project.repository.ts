import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongdbDataSource} from '../datasources';
import {Project, ProjectRelations, Projectuser, Task} from '../models';
import {ProjectuserRepository} from './projectuser.repository';
import {TaskRepository} from './task.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
> {

  public readonly projectusers: HasManyRepositoryFactory<Projectuser, typeof Project.prototype.id>;

  public readonly tasks: HasManyRepositoryFactory<Task, typeof Project.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongdbDataSource, @repository.getter('ProjectuserRepository') protected projectuserRepositoryGetter: Getter<ProjectuserRepository>, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>,
  ) {
    super(Project, dataSource);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', taskRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
    this.projectusers = this.createHasManyRepositoryFactoryFor('projectusers', projectuserRepositoryGetter,);
    this.registerInclusionResolver('projectusers', this.projectusers.inclusionResolver);
  }
}
