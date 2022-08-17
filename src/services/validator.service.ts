import { HttpErrors } from "@loopback/rest";
// import { Usercredentials } from "../models";
// import { UsercredentialsRepository } from "../repositories";
import * as isEmail from "isemail";
import { UserRepository } from "../repositories";
import { User, Usercredentials} from "../models";
import {model, property, repository} from '@loopback/repository';
import _ from 'lodash';

@model()
export class UserWithPassword extends User {
  @property({
    type: 'string',
    required: true
  })
  password: string
}
export type Credentials = {
    email: string
    password: string
  }

export async function validateCredentials(usercredentials:Credentials,userRepository:UserRepository) {
    if(!isEmail.validate(usercredentials.email)){
        throw new HttpErrors.UnprocessableEntity('Invalid username')
    }
    const foundUser=await userRepository.findOne({
        where:{
            username:usercredentials.email
        }
    })
    if(foundUser!==null){
        throw new HttpErrors.UnprocessableEntity("This email already exist")

    }
    if(usercredentials.password.length<8){
        throw new HttpErrors.UnprocessableEntity("Password length should be greater than 8")

    }

}

export async function createUser(usercredentials:Credentials,userRepository:UserRepository){
    //* ensure a valid email value and password value
    validateCredentials(_.pick(usercredentials, ['email', 'password']),userRepository)
    // //* encrypt the password
    // const password = await this.passwordHasher.hashPassword(userWithPassword.password)
    try {
      //* create the new user
      const savedUser = await userRepository.create({usercredentials})

    //   //* set the password
    //   await userRepository.usercredentials
    console.log(savedUser)
      return savedUser

    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('email')) {
        throw new HttpErrors.Conflict('email-value-is-already-taken')
      } else {
        throw error
      }
    }
  }