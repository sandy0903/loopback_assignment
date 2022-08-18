import { HttpErrors } from '@loopback/rest'
import isemail from 'isemail'
import { Credentials, UserRepository } from '../repositories/user.repository'

export function validateCredentials(usercredentials: Credentials,userRepository:UserRepository) {
  // Validate Email
  if (!isemail.validate(usercredentials.email)) {
    throw new HttpErrors.UnprocessableEntity('invalid-email')
  }
  const findUser=userRepository.findOne({
    where:{
      email:usercredentials.email
    }
  })
  if(findUser!==null){
    throw new HttpErrors.UnprocessableEntity('Account already exist')

  }else{
    return true
  }

  // Validate Password Length
  if (!usercredentials.password || usercredentials.password.length < 8 ) {
    throw new HttpErrors.UnprocessableEntity('password-must-be-minimum-8-characters')
  }


  // Validate Email Length
  if (!usercredentials.email || usercredentials.email.length < 8 ) {
    throw new HttpErrors.UnprocessableEntity('email-must-be-minimum-8-characters')
  }



}
