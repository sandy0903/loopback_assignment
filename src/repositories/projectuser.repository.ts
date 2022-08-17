import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongdbDataSource} from '../datasources';
import {Projectuser, ProjectuserRelations, Project} from '../models';
import {ProjectRepository} from './project.repository';

export class ProjectuserRepository extends DefaultCrudRepository<
  Projectuser,
  typeof Projectuser.prototype.id,
  ProjectuserRelations
> {

  public readonly project: BelongsToAccessor<Project, typeof Projectuser.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongdbDataSource, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>,
  ) {
    super(Projectuser, dataSource);
    this.project = this.createBelongsToAccessorFor('project', projectRepositoryGetter,);
    this.registerInclusionResolver('project', this.project.inclusionResolver);
  }
}
