import {injectable, inject, BindingScope} from '@loopback/core';
import { HttpErrors } from "@loopback/rest";
// import { Usercredentials } from "../models";
// import { UsercredentialsRepository } from "../repositories";
import * as isEmail from "isemail";
import { UserRepository } from "../repositories";
import { User, Usercredentials,Userwithpassword} from "../models";
import {model, property, repository} from '@loopback/repository';
import _ from 'lodash';
import { BindingKey } from '@loopback/context'
import { validateCredentials } from './validator.service';
import { PasswordHasherBindings } from '../key';
import { PasswordHasher } from './hash.password.bcryptjs';
@injectable({scope: BindingScope.TRANSIENT})

export class Validator2Service {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher
  ) {}



  async createUser(userWithPassword: Userwithpassword): Promise<User> {
    const password = await this.passwordHasher.hashPassword(
      userWithPassword.password,
    );
    userWithPassword.password = password;
    const user = await this.userRepository.create(
      _.omit(userWithPassword, 'password'),
    );
    // // user.id = user.id.toString();
    // await this.userRepository.userWithPassword(user.id).create({password});
    return user;
  }

  /*
   * Add service methods here
   */
}
