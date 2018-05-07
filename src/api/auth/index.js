import crypto from 'crypto'
import {assertRightPassword} from '~/api/users/errors'
import NotFoundException from '~/exceptions/NotFoundException'
import {Authorization, User} from '~/models'

export async function logIn (context, next) {
  const logInData = context.request.body
  const user = await User.getByLogin(logInData.login)
  if (!user) {
    throw new NotFoundException(`No user found for login ${logInData.login}.`)
  }
  await assertRightPassword(user, logInData.password)
  context.status = 201
  const token = crypto.randomBytes(16).toString('hex')
  context.body = await Authorization.create(token, user.id)
}

export async function logOut (context, next) {
  if (context.token) {
    await Authorization.destroyByToken(context.token)
  }
  context.status = 204
}
