import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongdbDataSource} from '../datasources';
import {Task, TaskRelations, Projectuser, User} from '../models';
import {ProjectuserRepository} from './projectuser.repository';
import {UserRepository} from './user.repository';

// import {TaskRepository} from './task.repository';

export class TaskRepository extends DefaultCrudRepository<
  Task,
  typeof Task.prototype.id,
  TaskRelations
> {

  public readonly projectuser: BelongsToAccessor<Projectuser, typeof Task.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Task.prototype.id>;

  public readonly linktask: BelongsToAccessor<Task, typeof Task.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongdbDataSource, @repository.getter('ProjectuserRepository') protected projectuserRepositoryGetter: Getter<ProjectuserRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>,
  ) {
    super(Task, dataSource);
    this.linktask = this.createBelongsToAccessorFor('linktask', Getter.fromValue(this)); // for recursive relationship
    this.registerInclusionResolver('linktask', this.linktask.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.projectuser = this.createBelongsToAccessorFor('projectuser', projectuserRepositoryGetter,);
    this.registerInclusionResolver('projectuser', this.projectuser.inclusionResolver);
  }
}
