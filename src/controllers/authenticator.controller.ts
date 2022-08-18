// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
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
  requestBody

} from '@loopback/rest';
import {User} from '../models';
import { BcryptHasher, validateCredentials, Validator2Service } from '../services';
// import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import { UserRepository} from '../repositories';
// import { createSecureServer } from 'http2';

import { Userwithpassword } from '../models';
import { PasswordHasherBindings } from '../key';


export class AuthenticationUser {

  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(Validator2Service)
    public userService: Validator2Service,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher:BcryptHasher
  ) {}
  @post('/auth/sign-up', {
    responses: {
      '200': {
        description: 'Sign up a new user',
        content: { 'application/json': { schema: getModelSchemaRef(User) } }
      }
    }
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userwithpassword,{
            title: 'NewUser',
            exclude: ['id','createdAt','updatedAt','username']
          })
        }
      }
    })
    newUserRequest: Userwithpassword
  ){
    await validateCredentials(_.pick(newUserRequest, ['email', 'password']),this.userRepository)
    const hashedPassword=await this.hasher.hashPassword(newUserRequest.password)
    const newUser=await this.userRepository.create({email:newUserRequest.email})
    await this.userRepository.usercredentials(newUserRequest?.id).create({password:hashedPassword})
    return newUser
  }

  // @post('/auth/login', {
  //   responses: {
  //     '200': {
  //       description: 'Login user',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //             properties: {
  //               token: {
  //                 type: 'string'
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // })
  // async login(@requestBody(CredentialsRequestBody) credentials: Credentials): Promise<LoginResponse> {
  //   // ensure the user exists, and the password is correct
  //   const user = await this.userService.verifyCredentials(credentials)

  //   // convert a User object into a UserProfile object (reduced set of properties)
  //   const userProfile = this.userService.convertToUserProfile(user)
  //   // create a JSON Web Token based on the user profile
  //   const token = await this.jwtService.generateToken(userProfile)

  //   return {}
  // }
}