import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongdbDataSource} from '../datasources';
import {User, UserRelations, Projectuser, Project,Usercredentials} from '../models';
import {ProjectuserRepository} from './projectuser.repository';
// import {ProjectRepository} from './project.repository';
import {UsercredentialsRepository} from './usercredentials.repository';


export type Credentials = {
  email: string
  password: string

}

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly projectusers: HasManyRepositoryFactory<Projectuser, typeof User.prototype.id>;

  // public readonly project: BelongsToAccessor<Project, typeof User.prototype.id>;

  public readonly usercredentials: HasOneRepositoryFactory<Usercredentials, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongdbDataSource,
    @repository.getter('ProjectuserRepository') protected projectuserRepositoryGetter: Getter<ProjectuserRepository>,
    // @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>,
    @repository.getter('UsercredentialsRepository') protected usercredentialsRepositoryGetter: Getter<UsercredentialsRepository>,
  ) {
    super(User, dataSource);
    this.usercredentials = this.createHasOneRepositoryFactoryFor('usercredentials', usercredentialsRepositoryGetter);
    this.registerInclusionResolver('usercredentials', this.usercredentials.inclusionResolver);
    // this.project = this.createBelongsToAccessorFor('project', projectRepositoryGetter,);
    // this.registerInclusionResolver('project', this.project.inclusionResolver);
    this.projectusers = this.createHasManyRepositoryFactoryFor('projectusers', projectuserRepositoryGetter,);
    this.registerInclusionResolver('projectusers', this.projectusers.inclusionResolver);
  }
  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<Usercredentials | undefined> {
    try {
      return await this.usercredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
