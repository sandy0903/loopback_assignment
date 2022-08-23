import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongdbDataSource} from '../datasources';
import {Usercredentials, UsercredentialsRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class UsercredentialsRepository extends DefaultCrudRepository<
  Usercredentials,
  typeof Usercredentials.prototype.id,
  UsercredentialsRelations
> {
  public readonly user: BelongsToAccessor<User, typeof Usercredentials.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongdbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Usercredentials, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
