import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongdbDataSource} from '../datasources';
import {Project, ProjectRelations, Projectuser} from '../models';
import { ProjectuserRepository } from './projectuser.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
> {
  public readonly projectusers: HasManyRepositoryFactory<Projectuser, typeof Project.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongdbDataSource,@repository.getter('ProjectuserRepository') protected projectuserRepositoryGetter: Getter<ProjectuserRepository>
  ) {
    super(Project, dataSource);
    this.projectusers = this.createHasManyRepositoryFactoryFor('projectusers', projectuserRepositoryGetter,);
    this.registerInclusionResolver('projectusers', this.projectusers.inclusionResolver);
  }
}
