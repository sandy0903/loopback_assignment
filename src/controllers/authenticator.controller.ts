// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  authenticate,
  TokenService,
  UserService,

} from '@loopback/authentication';
import {Credentials, MyUserService, TokenServiceBindings, UserServiceBindings} from '@loopback/authentication-jwt';

import {authorize} from '@loopback/authorization';
import {inject, service} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';

import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  post,
  put,
  requestBody,
  SchemaObject

} from '@loopback/rest';
import {User, Usercredentials} from '../models';
import { BcryptHasher, validateCredentials, Validator2Service } from '../services';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import { UserRepository,UsercredentialsRepository} from '../repositories';
// import { createSecureServer } from 'http2';
import {PasswordHasher} from '../services';
import { Userwithpassword } from '../models';
import { PasswordHasherBindings } from '../key';
import { promisify } from 'util';
import { genSalt, hash } from 'bcryptjs';


// @authenticate('jwt')
const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      format: 'password'
    }
  },
};
export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};
// @authenticate('jwt')
export class AuthenticationUser {
  private hashAsync = promisify(hash);
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(Validator2Service)
    public userService: Validator2Service,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher:PasswordHasher,
     @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService
    // @inject(UserServiceBindings.USER_SERVICE)
    // public userService: MyUserService,

  ) {}
  @post('/auth/sign-up', {
    responses: {
      '200': {
        description: 'Sign up a new user',
        content: { 'application/json': { schema: getModelSchemaRef(User) } }
      }
    }
  })
  // @authenticate('jwt')
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userwithpassword,{
            title: 'Sign up',
            exclude: ['id','username',"createdAt","updatedAt"]
          })
        }
      }
    })
    newUserRequest: Userwithpassword
  ){
    await validateCredentials(_.pick(newUserRequest,["password","email"]),this.userRepository)
    // const password=await this.hasher.hashPassword(newUserRequest.password)
    const password = await hash(newUserRequest.password, await genSalt());
    const newUser=await this.userRepository.create({email:newUserRequest.email})
    await this.userRepository.usercredentials(newUser.id).create({password})
    
    return newUser
  }

  @post('/auth/login', {
    responses: {
      '200': {
        description: 'Login user',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  })
  // @authenticate('jwt')
  // async login(@requestBody({
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(CredentialsSchema,{
  //         title: 'login user'
  //       })
  //     }
  //   }
  // }) usercredential: Usercredentials){
  //   // ensure the user exists, and the password is correct
  //   const user = await this.userService.verifyCredentials(usercredential)

  //   // convert a User object into a UserProfile object (reduced set of properties)
  //   const userProfilea = this.userService.convertToUserProfile(user);

  //   // create a JSON Web Token based on the user profile
  //   const token = await this.jwtService.generateToken(userProfilea)

  //   return {token}
  // }
  // @authenticate('jwt')
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return Promise.resolve({token:token})
  }
}