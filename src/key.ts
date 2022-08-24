// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/context';
import {User} from './models';
import {Credentials} from './repositories';
import {PasswordHasher} from './services';

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER =
    BindingKey.create<PasswordHasher>('services.hasher');
  export const ROUNDS = BindingKey.create<number>('10');
}
export declare namespace TokenServiceBindings {
  const TOKEN_SECRET: BindingKey<string>;
  // const TOKEN_EXPIRES_IN: BindingKey<string>;
  const TOKEN_SERVICE: BindingKey<TokenService>;
}
export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<User, Credentials>>(
    'services.user.service',
  );
}
// export const USER = BindingKey.create<UserProfile>('security.user');
