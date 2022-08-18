import { HttpErrors } from '@loopback/rest'
import isemail from 'isemail'
import { Credentials } from '../repositories/user.repository'

export function validateCredentials(usercredentials: Credentials) {
  // Validate Email
  if (!isemail.validate(usercredentials.email)) {
    throw new HttpErrors.UnprocessableEntity('invalid-email')
  }

  // Validate Password Length
  if (!usercredentials.password || usercredentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity('password-must-be-minimum-8-characters')
  }



}
